// Combustion Analysis Flow Chart - Mermaid MicroSim interaction script
// CANVAS_HEIGHT: 700
// AP Chemistry - Chapter 2: Atomic Structure and Mass Spectrometry (Section 2.10)
// Learning objective (Bloom: Create / Evaluate): construct the step-by-step
// combustion analysis procedure and evaluate whether the empirical formula is
// consistent with a given molar mass.
//
// The flowchart itself is declared in main.html. This script adds the worked
// example: every calculation step is computed from the selected sample's data,
// so the numbers in the panel always agree with each other.

// ---- Chemistry constants ------------------------------------------------------
const ATOMIC_MASS = { C: 12.011, H: 1.008, O: 15.999 };          // g/mol
const M_CO2 = 44.009;                                            // 12.011 + 2(15.999)
const M_H2O = 18.015;                                            // 2(1.008) + 15.999
const H_PER_H2O = 2 * ATOMIC_MASS.H;                             // 2.016 g H per mole of water

// Sample A is the worked example in the chapter text. Samples B and C were
// generated from known formulas (C6H8O6 and C2H6O) and rounded to 4 significant
// figures. molarMass is the value "measured by mass spectrometry".
const SAMPLES = [
    { label: 'Sample A (chapter example)', sample: 0.2000, co2: 0.2988, h2o: 0.1217, molarMass: 180.16 },
    { label: 'Sample B', sample: 0.2000, co2: 0.2998, h2o: 0.08183, molarMass: 176.12 },
    { label: 'Sample C', sample: 0.2500, co2: 0.4776, h2o: 0.2933, molarMass: 46.07 }
];

// Order in which the Previous / Next buttons walk through the flowchart nodes
const STEP_ORDER = ['Weigh', 'Burn', 'AbsH2O', 'AbsCO2', 'MassC', 'MassH', 'MassO', 'Moles', 'Ratio', 'EF'];

let currentSample = 0;
let currentStep = 0;

// ---- Number helpers -----------------------------------------------------------
// Round to 4 significant figures and carry the rounded value forward, exactly
// as a student does when working the problem by hand.
function r4(x) {
    return Number(x.toPrecision(4));
}

function f4(x) {
    return x.toPrecision(4);
}

function formulaHTML(counts) {
    let html = '';
    ['C', 'H', 'O'].forEach(function (el) {
        const n = counts[el];
        if (n > 0) {
            html += el + (n > 1 ? '<sub>' + n + '</sub>' : '');
        }
    });
    return html;
}

function formulaMass(counts) {
    return counts.C * ATOMIC_MASS.C + counts.H * ATOMIC_MASS.H + counts.O * ATOMIC_MASS.O;
}

// ---- The combustion analysis calculation --------------------------------------
function analyze(s) {
    const r = {};
    // Step 4: all C is in CO2 (1 C per CO2); all H is in H2O (2 H per H2O)
    r.mC = r4(s.co2 * ATOMIC_MASS.C / M_CO2);
    r.mH = r4(s.h2o * H_PER_H2O / M_H2O);
    // Step 5: oxygen by difference
    r.mO = r4(s.sample - r.mC - r.mH);
    // Step 6: moles of each element
    r.nC = r4(r.mC / ATOMIC_MASS.C);
    r.nH = r4(r.mH / ATOMIC_MASS.H);
    r.nO = r4(r.mO / ATOMIC_MASS.O);
    // Step 7: divide by the smallest
    r.smallest = Math.min(r.nC, r.nH, r.nO);
    r.ratio = { C: r4(r.nC / r.smallest), H: r4(r.nH / r.smallest), O: r4(r.nO / r.smallest) };
    // If a ratio is not close to a whole number, multiply all by 2, 3, 4 ...
    r.multiplier = 1;
    for (let k = 1; k <= 6; k++) {
        const ok = ['C', 'H', 'O'].every(function (el) {
            const v = r.ratio[el] * k;
            return Math.abs(v - Math.round(v)) <= 0.1;
        });
        if (ok) { r.multiplier = k; break; }
    }
    r.counts = {
        C: Math.round(r.ratio.C * r.multiplier),
        H: Math.round(r.ratio.H * r.multiplier),
        O: Math.round(r.ratio.O * r.multiplier)
    };
    // Step 8 and the molar mass check
    r.efMass = formulaMass(r.counts);
    r.n = s.molarMass / r.efMass;
    r.nRounded = Math.round(r.n);
    r.consistent = Math.abs(r.n - r.nRounded) <= 0.05 && r.nRounded >= 1;
    r.molecular = {
        C: r.counts.C * r.nRounded,
        H: r.counts.H * r.nRounded,
        O: r.counts.O * r.nRounded
    };
    return r;
}

// ---- Panel content for each flowchart node ------------------------------------
function calcLine(html, extraClass) {
    return '<div class="calc-line' + (extraClass ? ' ' + extraClass : '') + '">' + html + '</div>';
}

function nodeInfo(nodeId) {
    const s = SAMPLES[currentSample];
    const r = analyze(s);
    const CO2 = 'CO<sub>2</sub>';
    const H2O = 'H<sub>2</sub>O';
    const O2 = 'O<sub>2</sub>';

    switch (nodeId) {
    case 'Weigh':
        return {
            title: 'Weigh the organic sample',
            body: '<p>Weigh a small sample of the pure compound on an analytical balance. ' +
                'Every later result is compared with this mass.</p>' +
                calcLine('Sample mass = ' + f4(s.sample) + ' g')
        };
    case 'Burn':
        return {
            title: 'Burn in excess ' + O2,
            body: '<p>The sample burns completely in a stream of pure oxygen. All of its carbon ends up in ' +
                CO2 + ' and all of its hydrogen ends up in ' + H2O + '.</p>' +
                '<p>Excess ' + O2 + ' guarantees complete combustion, with no CO or soot left behind.</p>'
        };
    case 'AbsH2O':
        return {
            title: 'Absorb ' + H2O,
            body: '<p>The product gases pass through a tube packed with a drying agent that traps water vapor. ' +
                'The tube is weighed before and after; its gain in mass is the mass of ' + H2O + ' produced.</p>' +
                '<p>In a real apparatus this tube comes first, so the gas is dry before it reaches the ' + CO2 + ' absorber.</p>' +
                calcLine('Mass of ' + H2O + ' = ' + f4(s.h2o) + ' g')
        };
    case 'AbsCO2':
        return {
            title: 'Absorb ' + CO2,
            body: '<p>A second tube, packed with sodium hydroxide, traps the ' + CO2 + '. ' +
                'Its gain in mass is the mass of ' + CO2 + ' produced.</p>' +
                calcLine('Mass of ' + CO2 + ' = ' + f4(s.co2) + ' g')
        };
    case 'MassC':
        return {
            title: 'Mass of C from ' + CO2,
            body: '<p>Every carbon atom from the sample is now in ' + CO2 + '. One mole of ' + CO2 +
                ' (44.009 g) contains one mole of C (12.011 g).</p>' +
                calcLine('m<sub>C</sub> = ' + f4(s.co2) + ' g ' + CO2 + ' &times; (12.011 g C &divide; 44.009 g ' + CO2 + ')') +
                calcLine('m<sub>C</sub> = ' + f4(r.mC) + ' g C', 'answer')
        };
    case 'MassH':
        return {
            title: 'Mass of H from ' + H2O,
            body: '<p>Every hydrogen atom from the sample is now in ' + H2O + '. One mole of ' + H2O +
                ' (18.015 g) contains <b>two</b> moles of H (2 &times; 1.008 = 2.016 g).</p>' +
                calcLine('m<sub>H</sub> = ' + f4(s.h2o) + ' g ' + H2O + ' &times; (2.016 g H &divide; 18.015 g ' + H2O + ')') +
                calcLine('m<sub>H</sub> = ' + f4(r.mH) + ' g H', 'answer')
        };
    case 'MassO':
        return {
            title: 'Mass of O by subtraction',
            body: '<p>Oxygen cannot be found from the products, because they also contain oxygen from the ' + O2 +
                ' that was supplied. Whatever part of the sample is not C or H must be O.</p>' +
                calcLine('m<sub>O</sub> = ' + f4(s.sample) + ' g &minus; ' + f4(r.mC) + ' g &minus; ' + f4(r.mH) + ' g') +
                calcLine('m<sub>O</sub> = ' + f4(r.mO) + ' g O', 'answer')
        };
    case 'Moles':
        return {
            title: 'Convert masses to moles',
            body: '<p>Formulas count atoms, not grams. Divide each mass by that element\'s molar mass (n = m &divide; M).</p>' +
                calcLine('n<sub>C</sub> = ' + f4(r.mC) + ' g &divide; 12.011 g/mol = <b>' + f4(r.nC) + ' mol</b>') +
                calcLine('n<sub>H</sub> = ' + f4(r.mH) + ' g &divide; 1.008 g/mol = <b>' + f4(r.nH) + ' mol</b>') +
                calcLine('n<sub>O</sub> = ' + f4(r.mO) + ' g &divide; 15.999 g/mol = <b>' + f4(r.nO) + ' mol</b>')
        };
    case 'Ratio': {
        let body = '<p>Divide every mole value by the smallest one (' + f4(r.smallest) + ' mol) to get the simplest ratio of atoms.</p>' +
            calcLine('C: ' + f4(r.nC) + ' &divide; ' + f4(r.smallest) + ' = <b>' + f4(r.ratio.C) + '</b>') +
            calcLine('H: ' + f4(r.nH) + ' &divide; ' + f4(r.smallest) + ' = <b>' + f4(r.ratio.H) + '</b>') +
            calcLine('O: ' + f4(r.nO) + ' &divide; ' + f4(r.smallest) + ' = <b>' + f4(r.ratio.O) + '</b>');
        if (r.multiplier > 1) {
            body += '<p>These are not all close to whole numbers, so multiply every ratio by ' + r.multiplier + ':</p>' +
                calcLine('C ' + f4(r.ratio.C * r.multiplier) + ', H ' + f4(r.ratio.H * r.multiplier) +
                    ', O ' + f4(r.ratio.O * r.multiplier), 'answer');
        } else {
            body += '<p>Each value is within experimental error of a whole number, so round them.</p>';
        }
        return { title: 'Divide by the smallest mole value', body: body };
    }
    case 'EF': {
        let body = '<p>The whole-number ratio C : H : O = ' + r.counts.C + ' : ' + r.counts.H + ' : ' + r.counts.O + ' gives</p>' +
            calcLine('Empirical formula: ' + formulaHTML(r.counts), 'answer') +
            '<p><b>Check it against the molar mass.</b> Mass spectrometry gives M = ' + s.molarMass + ' g/mol.</p>' +
            calcLine('Empirical formula mass = ' + r.efMass.toFixed(2) + ' g/mol', 'check') +
            calcLine(s.molarMass + ' &divide; ' + r.efMass.toFixed(2) + ' = ' + r.n.toFixed(2), 'check');
        if (r.consistent) {
            body += '<p>The result is a whole number, so the data are consistent.</p>' +
                calcLine('Molecular formula: ' + formulaHTML(r.molecular) +
                    (r.nRounded === 1 ? ' (same as the empirical formula)' : ''), 'answer');
        } else {
            body += '<p>The result is not a whole number, so the empirical formula and molar mass are not consistent. Recheck the data.</p>';
        }
        return { title: 'Empirical formula', body: body };
    }
    default:
        return { title: '', body: '' };
    }
}

// ---- Rendering ----------------------------------------------------------------
function showNode(nodeId) {
    const info = nodeInfo(nodeId);
    document.getElementById('info-display').innerHTML =
        '<div class="info-title">' + info.title + '</div>' +
        '<div class="info-content">' + info.body + '</div>';
}

function nodeElement(nodeId) {
    const nodes = document.querySelectorAll('.node');
    for (let i = 0; i < nodes.length; i++) {
        if (getNodeId(nodes[i]) === nodeId) return nodes[i];
    }
    return null;
}

// Mermaid v11 emits ids such as "mermaid-123-flowchart-Weigh-0"
function getNodeId(el) {
    return (el.id.match(/flowchart-(.+)-\d+$/) || [])[1];
}

function render() {
    const s = SAMPLES[currentSample];
    document.getElementById('given-data').innerHTML =
        '<b>Lab data</b> (compound contains only C, H, and O)<br/>' +
        '<span class="datum">Sample: ' + f4(s.sample) + ' g</span> ' +
        '<span class="datum">CO<sub>2</sub>: ' + f4(s.co2) + ' g</span> ' +
        '<span class="datum">H<sub>2</sub>O: ' + f4(s.h2o) + ' g</span>';
    document.getElementById('stepCounter').textContent = 'Step ' + (currentStep + 1) + ' of ' + STEP_ORDER.length;
    document.getElementById('prevBtn').disabled = currentStep === 0;
    document.getElementById('nextBtn').disabled = currentStep === STEP_ORDER.length - 1;

    // Highlight the active node with a heavy black outline. Mermaid writes the
    // classDef stroke as an inline "!important" style, so the highlight must be
    // set inline as well; the original style is saved and restored.
    STEP_ORDER.forEach(function (id, i) {
        const el = nodeElement(id);
        if (!el) return;
        const shape = el.querySelector('rect, polygon, path');
        if (!shape) return;
        if (shape.dataset.baseStyle === undefined) {
            shape.dataset.baseStyle = shape.getAttribute('style') || '';
        }
        shape.setAttribute('style', shape.dataset.baseStyle);
        if (i === currentStep) {
            shape.style.setProperty('stroke', 'black', 'important');
            shape.style.setProperty('stroke-width', '5px', 'important');
        }
        el.classList.toggle('active-step', i === currentStep);
    });
    showNode(STEP_ORDER[currentStep]);
}

function goToStep(i) {
    currentStep = Math.max(0, Math.min(STEP_ORDER.length - 1, i));
    render();
}

function setupNodeInteractions() {
    document.querySelectorAll('.node').forEach(function (node) {
        const nodeId = getNodeId(node);
        if (STEP_ORDER.indexOf(nodeId) === -1) return;
        // Hover previews a step; leaving returns to the current step
        node.addEventListener('mouseenter', function () { showNode(nodeId); });
        node.addEventListener('mouseleave', function () { showNode(STEP_ORDER[currentStep]); });
        // Click (or tap) jumps to that step
        node.addEventListener('click', function () { goToStep(STEP_ORDER.indexOf(nodeId)); });
    });
}

function setupControls() {
    const select = document.getElementById('sampleSelect');
    SAMPLES.forEach(function (s, i) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = s.label;
        select.appendChild(opt);
    });
    select.addEventListener('change', function () {
        currentSample = Number(select.value);
        currentStep = 0;
        render();
    });
    document.getElementById('prevBtn').addEventListener('click', function () { goToStep(currentStep - 1); });
    document.getElementById('nextBtn').addEventListener('click', function () { goToStep(currentStep + 1); });
}

// Robust polling: wait for Mermaid to finish rendering before wiring up the nodes
function waitForMermaid() {
    const mermaidDiv = document.querySelector('.mermaid');
    const svg = mermaidDiv ? mermaidDiv.querySelector('svg') : null;
    if (svg && document.querySelectorAll('.node').length > 0) {
        // keep the chart pinned to the top of its panel when it is scaled down
        svg.setAttribute('preserveAspectRatio', 'xMidYMin meet');
        setupNodeInteractions();
        render();
    } else {
        setTimeout(waitForMermaid, 100);
    }
}

function start() {
    setupControls();
    render();
    setTimeout(waitForMermaid, 100);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}
