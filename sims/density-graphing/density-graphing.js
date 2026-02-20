// Interactive Density Graphing MicroSim
// Students plot mass vs. volume data, run a regression, and match density to known materials.

const substances = [
    {
        id: 'A',
        label: 'Mystery Substance A',
        density: 2.70,
        matchId: 'aluminum',
        notes: 'Light metal with density near 2.7 g/cm³.',
        data: [
            { volume: 2.0, mass: 5.4 },
            { volume: 3.1, mass: 8.4 },
            { volume: 4.3, mass: 11.8 },
            { volume: 5.8, mass: 15.7 },
            { volume: 7.0, mass: 19.0 },
            { volume: 8.5, mass: 23.5 }
        ]
    },
    {
        id: 'B',
        label: 'Mystery Substance B',
        density: 7.90,
        matchId: 'iron',
        notes: 'Dense structural metal near 7.9 g/cm³.',
        data: [
            { volume: 1.5, mass: 11.4 },
            { volume: 2.4, mass: 19.1 },
            { volume: 3.0, mass: 23.8 },
            { volume: 4.2, mass: 33.1 },
            { volume: 5.8, mass: 46.0 },
            { volume: 7.2, mass: 57.5 }
        ]
    },
    {
        id: 'C',
        label: 'Mystery Substance C',
        density: 0.80,
        matchId: 'ethanol',
        notes: 'Low-density liquid close to 0.8 g/cm³.',
        data: [
            { volume: 5.0, mass: 4.0 },
            { volume: 7.5, mass: 6.2 },
            { volume: 9.0, mass: 7.3 },
            { volume: 10.0, mass: 8.1 },
            { volume: 11.5, mass: 9.2 },
            { volume: 13.0, mass: 10.4 }
        ]
    }
];

const referenceMaterials = [
    { id: 'aluminum', name: 'Aluminum', density: 2.70, note: 'Light metal used in cans and aircraft.' },
    { id: 'iron', name: 'Iron', density: 7.87, note: 'Structural metal for beams and machinery.' },
    { id: 'copper', name: 'Copper', density: 8.96, note: 'Conductive metal for wiring.' },
    { id: 'ethanol', name: 'Ethanol', density: 0.79, note: 'Laboratory alcohol, less dense than water.' },
    { id: 'water', name: 'Water', density: 1.00, note: 'Baseline liquid density at 4°C.' },
    { id: 'oak', name: 'Oak Wood', density: 0.75, note: 'Natural material with variable density.' }
];

const axisLimits = {
    volumeMax: 14,
    massMax: 70
};

const graphPadding = { left: 80, right: 30, top: 40, bottom: 70 };
let canvasWidth = 720;
const canvasHeight = 450;

const simState = {
    selectedSubstance: substances[0],
    points: [],
    showBestFit: false,
    latestSlope: null
};

let tableBody, noteEl, pointCountEl, slopeOutputEl, statusMessageEl;
let identifySelect, identifyResultEl;
let referenceTableBody, substanceSelect;
let showLineBtn, calcSlopeBtn, resetPointsBtn, checkSubstanceBtn;
let canvasReady = false;
let uiElementsReady = false;
let fallbackInjected = false;

window.addEventListener('DOMContentLoaded', () => {
    uiElementsReady = cacheDom();
    if (!uiElementsReady) {
        console.warn('Density Graphing MicroSim: UI elements unavailable; running canvas-only mode.');
        return;
    }
    populateControls();
    selectSubstance(substances[0].id);
});

function cacheDom() {
    if (!ensureLayoutStructure()) {
        console.warn('Density Graphing MicroSim: could not build fallback layout.');
        return false;
    }

    tableBody = document.getElementById('data-table-body');
    noteEl = document.getElementById('substance-note');
    pointCountEl = document.getElementById('point-count');
    slopeOutputEl = document.getElementById('slope-output');
    statusMessageEl = document.getElementById('status-message');
    identifySelect = document.getElementById('identify-select');
    identifyResultEl = document.getElementById('identify-result');
    referenceTableBody = document.getElementById('reference-table');
    substanceSelect = document.getElementById('substance-select');
    showLineBtn = document.getElementById('show-line-btn');
    calcSlopeBtn = document.getElementById('calc-slope-btn');
    resetPointsBtn = document.getElementById('reset-points');
    checkSubstanceBtn = document.getElementById('check-substance-btn');

    if (!tableBody || !noteEl || !pointCountEl || !slopeOutputEl || !statusMessageEl ||
        !identifySelect || !identifyResultEl || !referenceTableBody || !substanceSelect ||
        !showLineBtn || !calcSlopeBtn || !resetPointsBtn || !checkSubstanceBtn) {
        return false;
    }

    resetPointsBtn.addEventListener('click', () => {
        simState.points = [];
        simState.showBestFit = false;
        simState.latestSlope = null;
        showLineBtn.textContent = 'Show Best Fit Line';
        updatePointCount();
        slopeOutputEl.textContent = 'Slope (density): --';
        statusMessageEl.textContent = 'Plot new points for the selected substance.';
    });

    showLineBtn.addEventListener('click', () => {
        if (simState.points.length < 2) {
            statusMessageEl.textContent = 'Add at least two points to draw a best fit line.';
            return;
        }
        simState.showBestFit = !simState.showBestFit;
        showLineBtn.textContent = simState.showBestFit ? 'Hide Best Fit Line' : 'Show Best Fit Line';
    });

    calcSlopeBtn.addEventListener('click', () => {
        const regression = computeRegression(simState.points);
        if (!regression) {
            statusMessageEl.textContent = 'Need at least two points to compute a slope.';
            return;
        }
        simState.latestSlope = regression.slope;
        slopeOutputEl.textContent = `Slope (density): ${regression.slope.toFixed(2)} g/cm³`;

        const delta = Math.abs(regression.slope - simState.selectedSubstance.density);
        if (delta < 0.3) {
            statusMessageEl.textContent = 'Great! Your slope is within experimental scatter of the true density.';
        } else if (delta < 1) {
            statusMessageEl.textContent = 'Reasonable slope, but try plotting each data point carefully.';
        } else {
            statusMessageEl.textContent = 'Large difference detected—double-check the data table and your plotted points.';
        }
    });

    checkSubstanceBtn.addEventListener('click', () => {
        if (identifySelect.value === '') {
            identifyResultEl.textContent = 'Choose a material to compare with your density.';
            return;
        }
        if (simState.latestSlope === null) {
            identifyResultEl.textContent = 'Calculate the slope first so you can justify your match.';
            return;
        }

        const guess = referenceMaterials.find(mat => mat.id === identifySelect.value);
        const actual = simState.selectedSubstance;
        const diff = Math.abs(simState.latestSlope - guess.density);
        if (guess.id === actual.matchId) {
            identifyResultEl.textContent = `Correct! ${guess.name} has a density of ${guess.density.toFixed(2)} g/cm³. Your slope was off by ${diff.toFixed(2)} g/cm³.`;
        } else {
            identifyResultEl.textContent = `Not quite. ${guess.name} is ${guess.density.toFixed(2)} g/cm³, but the plotted slope fits ${actual.label} better.`;
        }
    });
    return true;
}

function populateControls() {
    substances.forEach(sub => {
        const option = document.createElement('option');
        option.value = sub.id;
        option.textContent = sub.label;
        substanceSelect.appendChild(option);
    });

    substanceSelect.addEventListener('change', (event) => {
        selectSubstance(event.target.value);
    });

    const defaultIdentifyOption = document.createElement('option');
    defaultIdentifyOption.value = '';
    defaultIdentifyOption.textContent = 'Select a material';
    identifySelect.appendChild(defaultIdentifyOption);

    referenceMaterials.forEach(mat => {
        const option = document.createElement('option');
        option.value = mat.id;
        option.textContent = `${mat.name} (${mat.density.toFixed(2)} g/cm³)`;
        identifySelect.appendChild(option);

        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const densityCell = document.createElement('td');
        const noteCell = document.createElement('td');
        nameCell.textContent = mat.name;
        densityCell.textContent = mat.density.toFixed(2);
        noteCell.textContent = mat.note;
        row.appendChild(nameCell);
        row.appendChild(densityCell);
        row.appendChild(noteCell);
        referenceTableBody.appendChild(row);
    });
}

function selectSubstance(subId) {
    const selected = substances.find(sub => sub.id === subId);
    if (!selected) return;

    simState.selectedSubstance = selected;
    simState.points = [];
    simState.showBestFit = false;
    simState.latestSlope = null;

    showLineBtn.textContent = 'Show Best Fit Line';
    slopeOutputEl.textContent = 'Slope (density): --';
    identifyResultEl.textContent = 'Use the slope to match a known density.';
    statusMessageEl.textContent = 'Click points that match the volumes and masses listed in the table.';
    identifySelect.value = '';

    noteEl.textContent = `${selected.label}: ${selected.data.length} trials with a true density near ${selected.density.toFixed(2)} g/cm³.`;
    buildDataTable(selected.data);
    updatePointCount();
}

function buildDataTable(dataRows) {
    tableBody.innerHTML = '';
    dataRows.forEach((pair, index) => {
        const tr = document.createElement('tr');
        const trialCell = document.createElement('td');
        const volumeCell = document.createElement('td');
        const massCell = document.createElement('td');

        trialCell.textContent = `#${index + 1}`;
        volumeCell.textContent = pair.volume.toFixed(2);
        massCell.textContent = pair.mass.toFixed(2);

        tr.appendChild(trialCell);
        tr.appendChild(volumeCell);
        tr.appendChild(massCell);
        tableBody.appendChild(tr);
    });
}

function updatePointCount() {
    pointCountEl.textContent = `Points plotted: ${simState.points.length} / ${simState.selectedSubstance.data.length} trials`;
}

function setup() {
    const holder = document.getElementById('canvas-holder');
    if (!holder) return;
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(holder);
    canvasReady = true;
    describe('Interactive scatter plot for plotting mass vs volume data points to determine density', LABEL);
}

function draw() {
    if (!canvasReady) return;
    background('#ffffff');
    drawGraphArea();
    drawGridLines();
    drawAxisLabels();
    drawPoints();
    if (simState.showBestFit) {
        const regression = computeRegression(simState.points);
        if (regression) {
            drawBestFit(regression, simState.points);
        }
    }
}

function drawGraphArea() {
    noStroke();
    fill('#f4faff');
    const bounds = getGraphBounds();
    rect(bounds.left, bounds.top, bounds.right - bounds.left, bounds.bottom - bounds.top, 10);
}

function drawGridLines() {
    const bounds = getGraphBounds();
    const width = bounds.right - bounds.left;
    const height = bounds.bottom - bounds.top;

    stroke('#d8e6f5');
    strokeWeight(1);

    for (let volume = 0; volume <= axisLimits.volumeMax; volume += 1) {
        const x = bounds.left + (volume / axisLimits.volumeMax) * width;
        line(x, bounds.top, x, bounds.bottom);
    }

    for (let mass = 0; mass <= axisLimits.massMax; mass += 5) {
        const y = bounds.bottom - (mass / axisLimits.massMax) * height;
        line(bounds.left, y, bounds.right, y);
    }

    stroke('#0f273a');
    strokeWeight(2);
    line(bounds.left, bounds.bottom, bounds.right, bounds.bottom);
    line(bounds.left, bounds.top, bounds.left, bounds.bottom);
}

function drawAxisLabels() {
    const bounds = getGraphBounds();
    fill('#0f273a');
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);

    for (let volume = 0; volume <= axisLimits.volumeMax; volume += 2) {
        const x = map(volume, 0, axisLimits.volumeMax, bounds.left, bounds.right);
        text(volume.toString(), x, bounds.bottom + 18);
    }
    text('Volume (cm³)', (bounds.left + bounds.right) / 2, bounds.bottom + 45);

    textAlign(RIGHT, CENTER);
    for (let mass = 0; mass <= axisLimits.massMax; mass += 10) {
        const y = map(mass, 0, axisLimits.massMax, bounds.bottom, bounds.top);
        text(mass.toString(), bounds.left - 10, y);
    }

    push();
    textAlign(CENTER, CENTER);
    translate(bounds.left - 50, (bounds.top + bounds.bottom) / 2);
    rotate(-HALF_PI);
    text('Mass (g)', 0, 0);
    pop();
}

function drawPoints() {
    const bounds = getGraphBounds();
    const width = bounds.right - bounds.left;
    const height = bounds.bottom - bounds.top;

    fill('#00a5ad');
    stroke('#006c71');
    strokeWeight(1.5);

    simState.points.forEach(point => {
        const x = bounds.left + (point.volume / axisLimits.volumeMax) * width;
        const y = bounds.bottom - (point.mass / axisLimits.massMax) * height;
        ellipse(x, y, 10, 10);
    });
}

function drawBestFit({ slope, intercept }, points) {
    if (!points || points.length < 2) return;
    const bounds = getGraphBounds();
    const width = bounds.right - bounds.left;
    const height = bounds.bottom - bounds.top;

    const volumes = points.map(pt => pt.volume);
    const startVolume = Math.min(...volumes);
    const endVolume = Math.max(...volumes);
    const startMass = slope * startVolume + intercept;
    const endMass = slope * endVolume + intercept;

    stroke('#ff8c42');
    strokeWeight(3);
    const x1 = bounds.left + (startVolume / axisLimits.volumeMax) * width;
    const y1 = bounds.bottom - (constrain(startMass, 0, axisLimits.massMax) / axisLimits.massMax) * height;
    const x2 = bounds.left + (endVolume / axisLimits.volumeMax) * width;
    const y2 = bounds.bottom - (constrain(endMass, 0, axisLimits.massMax) / axisLimits.massMax) * height;
    line(x1, y1, x2, y2);

    fill('#ff8c42');
    noStroke();
    textSize(13);
    textAlign(LEFT, BOTTOM);
    text('Best Fit Line (density = slope)', bounds.left + 10, bounds.top + 15);
}

function mousePressed() {
    if (!canvasReady) return;
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;
    const bounds = getGraphBounds();
    if (mouseX < bounds.left || mouseX > bounds.right || mouseY < bounds.top || mouseY > bounds.bottom) return;

    const graphWidth = bounds.right - bounds.left;
    const graphHeight = bounds.bottom - bounds.top;

    const volume = ((mouseX - bounds.left) / graphWidth) * axisLimits.volumeMax;
    const mass = ((bounds.bottom - mouseY) / graphHeight) * axisLimits.massMax;

    simState.points.push({ volume, mass });
    simState.latestSlope = null;
    simState.showBestFit = false;
    if (uiElementsReady) {
        showLineBtn.textContent = 'Show Best Fit Line';
        slopeOutputEl.textContent = 'Slope (density): --';
        statusMessageEl.textContent = `Plotted: V=${volume.toFixed(2)} cm³, m=${mass.toFixed(2)} g`;
        updatePointCount();
    }
}

function ensureLayoutStructure() {
    const requiredIds = [
        'data-table-body',
        'substance-note',
        'point-count',
        'substance-select',
        'reset-points',
        'show-line-btn',
        'calc-slope-btn',
        'slope-output',
        'status-message',
        'identify-select',
        'check-substance-btn',
        'identify-result',
        'reference-table',
        'canvas-holder'
    ];

    const missing = requiredIds.some(id => !document.getElementById(id));
    if (!missing) {
        return true;
    }

    if (!document.body) {
        return false;
    }

    if (!fallbackInjected) {
        injectFallbackLayout();
        fallbackInjected = true;
    }

    const stillMissing = requiredIds.some(id => !document.getElementById(id));
    return !stillMissing;
}

function injectFallbackLayout() {
    if (!document.getElementById('density-fallback-root')) {
        const fallback = document.createElement('main');
        fallback.id = 'density-fallback-root';
        fallback.innerHTML = `
            <div class="fallback-layout">
                <section class="fallback-panel">
                    <h2>Mass vs. Volume Data</h2>
                    <p id="substance-note">Select a mystery substance to view measurement pairs.</p>
                    <table>
                        <thead>
                            <tr><th>Trial</th><th>Volume (cm³)</th><th>Mass (g)</th></tr>
                        </thead>
                        <tbody id="data-table-body"></tbody>
                    </table>
                </section>
                <section class="fallback-panel">
                    <h2>Plot the Data</h2>
                    <div id="canvas-holder" class="fallback-canvas"></div>
                    <div class="point-status" id="point-count">Points plotted: 0</div>
                </section>
                <section class="fallback-panel">
                    <div class="fallback-controls">
                        <label for="substance-select">Mystery Substance</label>
                        <select id="substance-select"></select>
                        <button id="reset-points">Clear Points</button>
                    </div>
                    <div class="fallback-controls">
                        <button id="show-line-btn">Show Best Fit Line</button>
                        <button id="calc-slope-btn">Calculate Slope</button>
                    </div>
                    <div id="slope-output" class="status-line">Slope (density): --</div>
                    <div id="status-message" class="status-line">Click inside the graph to add points.</div>
                </section>
                <section class="fallback-panel">
                    <div class="fallback-controls">
                        <label for="identify-select">Identify Substance</label>
                        <select id="identify-select"></select>
                        <button id="check-substance-btn">Check Answer</button>
                    </div>
                    <div id="identify-result" class="status-line">Use the slope to match a known density.</div>
                </section>
                <section class="fallback-panel">
                    <h3>Reference Densities</h3>
                    <table>
                        <thead>
                            <tr><th>Material</th><th>Density (g/cm³)</th><th>Notes</th></tr>
                        </thead>
                        <tbody id="reference-table"></tbody>
                    </table>
                </section>
            </div>
        `;
        document.body.prepend(fallback);
    }

    if (!document.getElementById('density-fallback-style')) {
        const style = document.createElement('style');
        style.id = 'density-fallback-style';
        style.textContent = `
            #density-fallback-root {
                font-family: "Inter", "Segoe UI", Arial, sans-serif;
                padding: 16px;
                background: #f4f7fb;
            }
            .fallback-layout {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            .fallback-panel {
                background: #ffffff;
                padding: 16px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(15, 39, 58, 0.12);
            }
            .fallback-panel table {
                width: 100%;
                border-collapse: collapse;
            }
            .fallback-panel th,
            .fallback-panel td {
                padding: 6px 8px;
                border-bottom: 1px solid #d9e3f0;
                text-align: left;
            }
            .fallback-panel th {
                background: #eef4fb;
            }
            .fallback-controls {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin-bottom: 10px;
                align-items: center;
            }
            .fallback-controls label {
                font-weight: 600;
            }
            #density-fallback-root button,
            #density-fallback-root select {
                padding: 6px 10px;
                border-radius: 8px;
                border: 1px solid #008C95;
                font-size: 0.95rem;
            }
            #density-fallback-root button {
                background: #008C95;
                color: #ffffff;
                cursor: pointer;
            }
            #density-fallback-root button:hover {
                background: #006d73;
            }
            .status-line {
                background: #eef9fa;
                border-radius: 8px;
                padding: 8px 12px;
                color: #055b63;
                font-size: 0.95rem;
            }
            .point-status {
                margin-top: 10px;
                font-weight: 600;
            }
            .fallback-canvas {
                min-height: 260px;
                border: 1px dashed #c3d6ea;
                border-radius: 8px;
                background: #ffffff;
            }
        `;
        document.head.appendChild(style);
    }
}

function computeRegression(points) {
    if (!points || points.length < 2) return null;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumX2 = 0;
    const n = points.length;

    points.forEach(pt => {
        sumX += pt.volume;
        sumY += pt.mass;
        sumXY += pt.volume * pt.mass;
        sumX2 += pt.volume * pt.volume;
    });

    const denominator = n * sumX2 - sumX * sumX;
    if (denominator === 0) return null;
    const slope = (n * sumXY - sumX * sumY) / denominator;
    const intercept = (sumY - slope * sumX) / n;
    return { slope, intercept };
}

function windowResized() {
    updateCanvasSize();
    if (canvasReady) {
        resizeCanvas(canvasWidth, canvasHeight);
    }
}

function updateCanvasSize() {
    const holder = document.getElementById('canvas-holder');
    if (!holder) return;
    const holderWidth = holder.offsetWidth;
    if (holderWidth && holderWidth !== canvasWidth) {
        canvasWidth = holderWidth;
    }
}

function getGraphBounds() {
    return {
        left: graphPadding.left,
        right: canvasWidth - graphPadding.right,
        top: graphPadding.top,
        bottom: canvasHeight - graphPadding.bottom
    };
}
