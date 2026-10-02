// Titration Curve Comparison - Chart.js MicroSim
// CANVAS_HEIGHT: 540
// AP Chemistry - Chapter 8: Chemical Reactions and Equations (Section 5)
// Learning objective (Bloom: Analyze): Students will compare titration curves for
// strong acid-strong base and weak acid-strong base titrations, identify the
// equivalence point and buffer region, and explain differences in curve shape.
//
// Both curves are calculated from equilibrium expressions, not sketched.
//   Analyte:  25.0 mL of 0.100 M acid      Titrant: 0.100 M NaOH
//   Strong acid (HCl):   charge balance  [H+] + [Na+] = [OH-] + [Cl-]
//   Weak acid (CH3COOH): charge balance  [H+] + [Na+] = [OH-] + [A-]
//                        with [A-] = C_acid x Ka / (Ka + [H+]),  pKa = 4.74 (Ka = 1.8 x 10^-5)
//   Kw = [H+][OH-] = 1.0 x 10^-14 at 25 C
// Solving the charge balance gives the pH at every volume with no switch between
// approximate formulas, so there are no artificial kinks in the curves.
// Hand checks (see index.md): weak acid starts at pH 2.87, pH = pKa = 4.74 at
// 12.5 mL, pH 8.72 at the 25.0 mL equivalence point; strong acid pH 7.00 there.

// ---- Chemistry constants ------------------------------------------------------
const KW = 1.0e-14;
const PKA_ACETIC = 4.74;                         // acetic acid, as used in the textbook
const KA_ACETIC = Math.pow(10, -PKA_ACETIC);     // 1.8 x 10^-5
const C_ACID = 0.100;                            // mol/L
const V_ACID = 25.0;                             // mL
const C_BASE = 0.100;                            // mol/L
const V_EQ = C_ACID * V_ACID / C_BASE;           // 25.0 mL
const V_MAX = 50;                                // mL, right end of the x axis

const COLOR_STRONG = '#6a1b9a';
const COLOR_WEAK = '#2e7d32';
const COLOR_EQ = '#c62828';
const COLOR_HALF = '#1565c0';

// Indicator transition ranges quoted in the chapter text
const INDICATORS = {
    strong: { name: 'Bromothymol blue', low: 6.0, high: 7.6 },
    weak: { name: 'Phenolphthalein', low: 8.2, high: 10.0 }
};

// ---- pH calculations ----------------------------------------------------------
// Strong acid: [H+] - Kw/[H+] = ([Cl-] - [Na+]) = d, a quadratic in [H+]
function phStrong(vBase) {
    const vTotal = V_ACID + vBase;
    const d = (C_ACID * V_ACID - C_BASE * vBase) / vTotal;
    let h;
    if (d >= 0) {
        h = (d + Math.sqrt(d * d + 4 * KW)) / 2;
    } else {
        // solve for [OH-] instead to avoid subtracting nearly equal numbers
        const oh = (-d + Math.sqrt(d * d + 4 * KW)) / 2;
        h = KW / oh;
    }
    return -Math.log10(h);
}

// Weak acid: find [H+] where the charge balance is zero, by bisection on pH
function phWeak(vBase) {
    const vTotal = V_ACID + vBase;
    const cA = C_ACID * V_ACID / vTotal;          // total acetate (HA + A-)
    const na = C_BASE * vBase / vTotal;
    function balance(pH) {
        const h = Math.pow(10, -pH);
        return h + na - KW / h - cA * KA_ACETIC / (KA_ACETIC + h);
    }
    let lo = 0;      // balance > 0 (too much H+)
    let hi = 14;     // balance < 0
    for (let i = 0; i < 60; i++) {
        const mid = (lo + hi) / 2;
        if (balance(mid) > 0) lo = mid; else hi = mid;
    }
    return (lo + hi) / 2;
}

// Volumes at which the curves are sampled: fine steps close to equivalence
function sampleVolumes() {
    const set = {};
    function add(v) { set[v.toFixed(3)] = true; }
    for (let v = 0; v <= V_MAX + 1e-9; v += 0.25) add(v);
    for (let v = 23; v <= 27 + 1e-9; v += 0.05) add(v);
    for (let v = 24.8; v <= 25.2 + 1e-9; v += 0.005) add(v);
    return Object.keys(set).map(Number).sort(function (a, b) { return a - b; });
}

function buildCurve(phFunction) {
    return sampleVolumes().map(function (v) {
        return { x: v, y: phFunction(v) };
    });
}

const curveStrong = buildCurve(phStrong);
const curveWeak = buildCurve(phWeak);

// ---- State --------------------------------------------------------------------
let overlay = false;
let probeVolume = 12.5;
let chartStrong = null;
let chartWeak = null;

// ---- Annotation plugin ----------------------------------------------------------
// Bands are drawn under the curves; lines and labels above them but under tooltips.
function isNarrow(chart) {
    return chart.chartArea.right - chart.chartArea.left < 300;
}

function drawLabel(ctx, text, x, y, color, align, size, bold) {
    ctx.save();
    ctx.font = (bold ? 'bold ' : '') + size + 'px Arial, Helvetica, sans-serif';
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';
    const w = ctx.measureText(text).width;
    let left = x;
    if (align === 'center') left = x - w / 2;
    if (align === 'right') left = x - w;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fillRect(left - 3, y - size * 0.7, w + 6, size * 1.4);
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    ctx.restore();
}

const annotationPlugin = {
    id: 'titrationAnnotations',
    beforeDatasetsDraw: function (chart) {
        const kinds = chart.config.options.plugins.titrationAnnotations.kinds;
        const ctx = chart.ctx;
        const area = chart.chartArea;
        const xs = chart.scales.x;
        const ys = chart.scales.y;
        ctx.save();
        // buffer region of the weak acid curve: pH within 1 unit of pKa
        if (kinds.indexOf('weak') !== -1) {
            const v1 = V_EQ / 11;            // [A-]/[HA] = 1/10
            const v2 = V_EQ * 10 / 11;       // [A-]/[HA] = 10
            ctx.fillStyle = 'rgba(100, 181, 246, 0.22)';
            ctx.fillRect(xs.getPixelForValue(v1), area.top, xs.getPixelForValue(v2) - xs.getPixelForValue(v1), area.bottom - area.top);
        }
        // indicator bands
        kinds.forEach(function (kind) {
            const ind = INDICATORS[kind];
            ctx.fillStyle = 'rgba(255, 213, 79, 0.45)';
            ctx.fillRect(area.left, ys.getPixelForValue(ind.high), area.right - area.left,
                ys.getPixelForValue(ind.low) - ys.getPixelForValue(ind.high));
        });
        ctx.restore();
    },
    afterDatasetsDraw: function (chart) {
        const kinds = chart.config.options.plugins.titrationAnnotations.kinds;
        const ctx = chart.ctx;
        const area = chart.chartArea;
        const xs = chart.scales.x;
        const ys = chart.scales.y;
        const narrow = isNarrow(chart);
        const fs = narrow ? 10 : 12;
        const xEq = xs.getPixelForValue(V_EQ);
        ctx.save();

        // probe line at the slider volume
        const xProbe = xs.getPixelForValue(probeVolume);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.55)';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(xProbe, area.top);
        ctx.lineTo(xProbe, area.bottom);
        ctx.stroke();

        // equivalence point: vertical dashed red line
        ctx.strokeStyle = COLOR_EQ;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(xEq, area.top);
        ctx.lineTo(xEq, area.bottom);
        ctx.stroke();

        // half-equivalence: dashed blue lines meeting at (12.5 mL, pKa)
        if (kinds.indexOf('weak') !== -1) {
            const xHalf = xs.getPixelForValue(V_EQ / 2);
            const yHalf = ys.getPixelForValue(PKA_ACETIC);
            ctx.strokeStyle = COLOR_HALF;
            ctx.beginPath();
            ctx.moveTo(area.left, yHalf);
            ctx.lineTo(xHalf, yHalf);
            ctx.lineTo(xHalf, area.bottom);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = COLOR_HALF;
            ctx.beginPath();
            ctx.arc(xHalf, yHalf, 4, 0, 2 * Math.PI);
            ctx.fill();
        }
        ctx.setLineDash([]);

        // equivalence point dots
        kinds.forEach(function (kind) {
            const pH = kind === 'strong' ? phStrong(V_EQ) : phWeak(V_EQ);
            ctx.fillStyle = COLOR_EQ;
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(xEq, ys.getPixelForValue(pH), 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        });

        // labels
        if (kinds.length === 1) {
            const kind = kinds[0];
            const pHEq = kind === 'strong' ? phStrong(V_EQ) : phWeak(V_EQ);
            const ind = INDICATORS[kind];
            drawLabel(ctx, narrow ? 'Equivalence' : 'Equivalence point', xEq + 6, ys.getPixelForValue(13.1), COLOR_EQ, 'left', fs, true);
            drawLabel(ctx, 'pH ' + pHEq.toFixed(2) + (narrow ? '' : ' at 25.0 mL'), xEq + 6, ys.getPixelForValue(13.1) + fs + 3, COLOR_EQ, 'left', fs, false);
            drawLabel(ctx, narrow ? 'Indicator' : ind.name + ' range',
                area.right - 5, ys.getPixelForValue((ind.low + ind.high) / 2), '#5d4037', 'right', fs, false);
            if (kind === 'weak') {
                const xMid = xs.getPixelForValue(V_EQ / 2);
                drawLabel(ctx, 'Buffer region', xMid, ys.getPixelForValue(2.0), COLOR_HALF, 'center', fs, true);
                drawLabel(ctx, narrow ? 'pH = pKa' : 'Half-equivalence: pH = pKa = ' + PKA_ACETIC.toFixed(2),
                    xs.getPixelForValue(0.6), ys.getPixelForValue(PKA_ACETIC) - fs, COLOR_HALF, 'left', fs, false);
            }
        } else {
            drawLabel(ctx, narrow ? 'Equivalence' : 'Equivalence point, 25.0 mL', xEq + 6, ys.getPixelForValue(13.1), COLOR_EQ, 'left', fs, true);
            drawLabel(ctx, 'weak acid: pH ' + phWeak(V_EQ).toFixed(2), xEq + 9, ys.getPixelForValue(phWeak(V_EQ)) - 2, COLOR_WEAK, 'left', fs, false);
            drawLabel(ctx, 'strong acid: pH ' + phStrong(V_EQ).toFixed(2), xEq + 9, ys.getPixelForValue(phStrong(V_EQ)) + 2, COLOR_STRONG, 'left', fs, false);
            const xMid = xs.getPixelForValue(V_EQ / 2);
            drawLabel(ctx, narrow ? 'Buffer region' : 'Buffer region (weak acid only)', xMid, ys.getPixelForValue(3.2), COLOR_HALF, 'center', fs, true);
            ['strong', 'weak'].forEach(function (kind) {
                const ind = INDICATORS[kind];
                drawLabel(ctx, narrow ? 'Indicator' : ind.name + ' range',
                    area.right - 5, ys.getPixelForValue((ind.low + ind.high) / 2), '#5d4037', 'right', fs, false);
            });
            drawLabel(ctx, narrow ? 'pH = pKa' : 'Half-equivalence: pH = pKa = ' + PKA_ACETIC.toFixed(2),
                xs.getPixelForValue(0.6), ys.getPixelForValue(PKA_ACETIC) - fs, COLOR_HALF, 'left', fs, false);
            if (!narrow) {
                drawLabel(ctx, 'Curves merge after equivalence: excess NaOH sets the pH', area.right - 5, ys.getPixelForValue(11.1), '#333', 'right', fs, false);
            }
        }
        ctx.restore();
    }
};

// ---- Chart construction ---------------------------------------------------------
function curveDataset(kind) {
    const strong = kind === 'strong';
    return {
        label: strong ? 'Strong acid (HCl) + NaOH' : 'Weak acid (CH₃COOH) + NaOH',
        data: strong ? curveStrong : curveWeak,
        borderColor: strong ? COLOR_STRONG : COLOR_WEAK,
        backgroundColor: strong ? COLOR_STRONG : COLOR_WEAK,
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHitRadius: 6,
        tension: 0
    };
}

function probeDataset(kind) {
    const strong = kind === 'strong';
    return {
        label: 'probe-' + kind,
        data: [{ x: probeVolume, y: strong ? phStrong(probeVolume) : phWeak(probeVolume) }],
        borderColor: 'white',
        backgroundColor: 'darkorange',
        borderWidth: 2,
        pointRadius: 7,
        pointHoverRadius: 7,
        showLine: false
    };
}

function makeChart(canvasId, kinds) {
    const datasets = [];
    kinds.forEach(function (kind) { datasets.push(curveDataset(kind)); });
    kinds.forEach(function (kind) { datasets.push(probeDataset(kind)); });
    let title;
    let subtitle;
    if (kinds.length === 2) {
        title = 'Both titrations on one chart';
        subtitle = '25.0 mL of 0.100 M acid titrated with 0.100 M NaOH';
    } else if (kinds[0] === 'strong') {
        title = 'Strong acid + strong base';
        subtitle = '25.0 mL of 0.100 M HCl with 0.100 M NaOH';
    } else {
        title = 'Weak acid + strong base';
        subtitle = '25.0 mL of 0.100 M CH₃COOH with 0.100 M NaOH';
    }
    const small = window.innerWidth < 620;
    return new Chart(document.getElementById(canvasId), {
        type: 'line',
        data: { datasets: datasets },
        plugins: [annotationPlugin],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            parsing: false,
            interaction: { mode: 'nearest', axis: 'x', intersect: false },
            scales: {
                x: {
                    type: 'linear',
                    min: 0,
                    max: V_MAX,
                    title: { display: true, text: small ? 'NaOH added (mL)' : 'Volume of NaOH added (mL)', color: 'black', font: { size: small ? 11 : 14 } },
                    ticks: { stepSize: small ? 10 : 5, color: 'black', font: { size: small ? 10 : 12 } },
                    grid: { color: 'rgba(0, 0, 0, 0.08)' }
                },
                y: {
                    min: 0,
                    max: 14,
                    title: { display: true, text: 'pH', color: 'black', font: { size: small ? 11 : 14 } },
                    ticks: { stepSize: 2, color: 'black', font: { size: small ? 10 : 12 } },
                    grid: { color: 'rgba(0, 0, 0, 0.08)' }
                }
            },
            plugins: {
                titrationAnnotations: { kinds: kinds },
                title: { display: true, text: title, color: 'black', font: { size: small ? 12 : 16, weight: 'bold' }, padding: { top: 2, bottom: 0 } },
                subtitle: { display: true, text: subtitle, color: '#333', font: { size: small ? 9.5 : 12.5 }, padding: { top: 0, bottom: 6 } },
                legend: {
                    display: kinds.length === 2,
                    position: 'bottom',
                    labels: {
                        boxWidth: 26,
                        boxHeight: 2,
                        color: 'black',
                        font: { size: small ? 10 : 12 },
                        filter: function (item) { return item.text.indexOf('probe-') !== 0; }
                    }
                },
                tooltip: {
                    filter: function (item) { return item.dataset.label.indexOf('probe-') !== 0; },
                    callbacks: {
                        title: function (items) {
                            if (!items.length) return '';
                            return items[0].parsed.x.toFixed(2) + ' mL NaOH added';
                        },
                        label: function (item) {
                            const name = item.dataset.label.indexOf('Strong') === 0 ? 'Strong acid' : 'Weak acid';
                            return name + ': pH ' + item.parsed.y.toFixed(2);
                        }
                    }
                }
            }
        }
    });
}

function buildCharts() {
    if (chartStrong) chartStrong.destroy();
    if (chartWeak) chartWeak.destroy();
    chartStrong = null;
    chartWeak = null;
    const cardWeak = document.getElementById('cardWeak');
    if (overlay) {
        cardWeak.classList.add('hidden');
        chartStrong = makeChart('chartStrong', ['strong', 'weak']);
    } else {
        cardWeak.classList.remove('hidden');
        chartStrong = makeChart('chartStrong', ['strong']);
        chartWeak = makeChart('chartWeak', ['weak']);
    }
}

// ---- Readout: what is in each flask at the slider volume -------------------------
function near(a, b) {
    return Math.abs(a - b) < 0.05;
}

function describeStrong(v) {
    if (near(v, 0)) return 'Only HCl, fully ionized: [H<sup>+</sup>] = 0.100 M.';
    if (near(v, V_EQ)) return 'Equivalence point. Only NaCl and water remain, so the solution is neutral.';
    if (v < V_EQ) return 'Excess HCl remains. pH stays low until almost all of the acid is used up.';
    return 'Excess NaOH sets the pH.';
}

function describeWeak(v) {
    if (near(v, 0)) return 'Only CH<sub>3</sub>COOH, partly ionized, so pH starts higher than for HCl.';
    if (near(v, V_EQ / 2)) return 'Half-equivalence: [CH<sub>3</sub>COOH] = [CH<sub>3</sub>COO<sup>&minus;</sup>], so pH = pK<sub>a</sub> = 4.74.';
    if (near(v, V_EQ)) return 'Equivalence point. CH<sub>3</sub>COO<sup>&minus;</sup> is a weak base, so pH is above 7.';
    if (v < V_EQ) return 'Buffer: CH<sub>3</sub>COOH and CH<sub>3</sub>COO<sup>&minus;</sup> are both present and resist pH change.';
    return 'Excess NaOH sets the pH, the same as on the strong acid curve.';
}

function updateReadout() {
    const v = probeVolume;
    document.getElementById('volumeLabel').textContent = 'NaOH added: ' + v.toFixed(1) + ' mL';
    document.getElementById('readoutStrong').innerHTML =
        '<div class="who">Strong acid, HCl</div>' +
        '<span class="ph">pH ' + phStrong(v).toFixed(2) + '</span>' + describeStrong(v);
    document.getElementById('readoutWeak').innerHTML =
        '<div class="who">Weak acid, CH<sub>3</sub>COOH</div>' +
        '<span class="ph">pH ' + phWeak(v).toFixed(2) + '</span>' + describeWeak(v);
}

function updateProbe() {
    [chartStrong, chartWeak].forEach(function (chart) {
        if (!chart) return;
        chart.data.datasets.forEach(function (ds) {
            if (ds.label === 'probe-strong') ds.data = [{ x: probeVolume, y: phStrong(probeVolume) }];
            if (ds.label === 'probe-weak') ds.data = [{ x: probeVolume, y: phWeak(probeVolume) }];
        });
        chart.update('none');
    });
    updateReadout();
}

// ---- Start-up -------------------------------------------------------------------
function start() {
    Chart.defaults.font.family = 'Arial, Helvetica, sans-serif';
    buildCharts();
    updateReadout();

    const slider = document.getElementById('volumeSlider');
    slider.addEventListener('input', function () {
        probeVolume = Number(slider.value);
        updateProbe();
    });

    const button = document.getElementById('overlayBtn');
    button.addEventListener('click', function () {
        overlay = !overlay;
        button.textContent = overlay ? 'Show Side by Side' : 'Show Both on One Chart';
        buildCharts();
    });

    // clicking a chart moves the probe to that volume
    ['chartStrong', 'chartWeak'].forEach(function (id) {
        document.getElementById(id).addEventListener('click', function (evt) {
            const chart = id === 'chartStrong' ? chartStrong : chartWeak;
            if (!chart) return;
            const rect = evt.target.getBoundingClientRect();
            const v = chart.scales.x.getValueForPixel(evt.clientX - rect.left);
            probeVolume = Math.min(V_MAX, Math.max(0, Math.round(v * 10) / 10));
            slider.value = probeVolume;
            updateProbe();
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}
