/*
  Weak Acid ICE Table Solver

  Layout plan (p5 guide compliant)
  --------------------------------
  drawHeight = 560 px
    - Title centered at top
    - Input panel across top (three inputs + button)
    - ICE table (middle)
    - Results panel + gauge (bottom portion of draw region)
  controlHeight = 260 px (for future controls; currently used for spacing and instructions)
  Canvas background: aliceblue; control background: white
  iframe height: 820 px
*/

let canvasWidth = 920;
let drawHeight = 560;
let controlHeight = 260;
let canvasHeight = drawHeight + controlHeight;
const margin = 24;

let acidInput;
let concentrationInput;
let kaInput;
let calculateButton;
let statusMessage = '';

const defaultAcid = 'Acetic acid';
const defaultConcentration = '0.100';
const defaultKa = '1.8e-5';

let solutionData = null;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const main = document.querySelector('main');
  if (main) {
    canvas.parent(main);
  }
  textFont('Arial');
  createInputs();
  resetSolution();
  describe('Solve weak acid ICE tables by entering concentration and Ka, then view pH and percent ionization.');
}

function draw() {
  updateCanvasSize();
  background('aliceblue');
  drawTitle();
  drawInputPanel();
  drawIceTable();
  drawResultsPanel();
  drawControlBackground();
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionInputs();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
  canvasHeight = drawHeight + controlHeight;
}

function createInputs() {
  acidInput = createInput(defaultAcid);
  concentrationInput = createInput(defaultConcentration);
  concentrationInput.attribute('type', 'text');
  kaInput = createInput(defaultKa);
  kaInput.attribute('type', 'text');

  [acidInput, concentrationInput, kaInput].forEach(input => {
    input.style('padding', '6px');
    input.style('border', '1px solid lightgray');
    input.style('border-radius', '4px');
    input.style('font-size', '14px');
  });

  calculateButton = createButton('Calculate');
  calculateButton.style('padding', '6px 14px');
  calculateButton.style('border', 'none');
  calculateButton.style('border-radius', '6px');
  calculateButton.style('background', 'dodgerblue');
  calculateButton.style('color', 'white');
  calculateButton.style('cursor', 'pointer');
  calculateButton.mousePressed(handleCalculate);

  positionInputs();
}

function positionInputs() {
  const canvasEl = document.querySelector('main canvas');
  if (!canvasEl) return;
  const rect = canvasEl.getBoundingClientRect();
  const baseX = rect.left + window.scrollX + margin;
  const topY = rect.top + window.scrollY + 80;
  const spacing = 220;

  acidInput.position(baseX, topY);
  concentrationInput.position(baseX + spacing, topY);
  kaInput.position(baseX + 2 * spacing, topY);
  calculateButton.position(baseX + 3 * spacing + 20, topY);

  acidInput.size(200);
  concentrationInput.size(140);
  kaInput.size(140);
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(30);
  text('Weak Acid ICE Table Solver', canvasWidth / 2, 20);
}

function drawInputPanel() {
  const labels = ['Acid name (optional)', '[HA] initial (M)', 'Ka'];
  const positions = [acidInput, concentrationInput, kaInput].map(input => input.position());
  fill('black');
  textAlign(LEFT, BOTTOM);
  textSize(14);
  labels.forEach((label, idx) => {
    text(label, positions[idx].x, positions[idx].y - 6);
  });
  textAlign(LEFT, TOP);
  textSize(12);
  fill('dimgray');
  text(statusMessage, margin, positions[0].y + 40);
}

function drawIceTable() {
  const tableX = margin;
  const tableY = 160;
  const tableWidth = canvasWidth - margin * 2;
  const columnWidth = tableWidth / 3;
  const rowHeight = 60;
  const headers = ['HA', 'H₃O⁺', 'A⁻'];
  const rows = ['Initial (I)', 'Change (C)', 'Equilibrium (E)'];

  stroke('lightgray');
  fill('white');
  rect(tableX, tableY, tableWidth, rowHeight * 4, 12);

  fill('black');
  textAlign(CENTER, CENTER);
  textSize(16);
  headers.forEach((header, idx) => {
    text(header, tableX + columnWidth * (idx + 0.5), tableY + rowHeight * 0.5);
  });

  for (let i = 0; i <= 3; i += 1) {
    line(tableX, tableY + rowHeight * (i + 1), tableX + tableWidth, tableY + rowHeight * (i + 1));
  }
  for (let j = 1; j < 3; j += 1) {
    line(tableX + columnWidth * j, tableY, tableX + columnWidth * j, tableY + rowHeight * 4);
  }

  if (!solutionData) {
    return;
  }

  textAlign(CENTER, CENTER);
  textSize(15);
  const dataRows = [
    [solutionData.initial.ha, solutionData.initial.h3o, solutionData.initial.a],
    [solutionData.change.ha, solutionData.change.h3o, solutionData.change.a],
    [solutionData.equilibrium.ha, solutionData.equilibrium.h3o, solutionData.equilibrium.a]
  ];

  rows.forEach((rowLabel, rowIdx) => {
    textAlign(LEFT, CENTER);
    text(rowLabel, tableX + 8, tableY + rowHeight * (rowIdx + 1.5));
    textAlign(CENTER, CENTER);
    dataRows[rowIdx].forEach((value, colIdx) => {
      const x = tableX + columnWidth * (colIdx + 0.5);
      const y = tableY + rowHeight * (rowIdx + 1.5);
      if (rowLabel.startsWith('Equilibrium')) {
        fill('khaki');
        noStroke();
        rect(x - columnWidth / 2 + 2, tableY + rowHeight * rowIdx + 2, columnWidth - 4, rowHeight - 4, 6);
        fill('black');
      }
      text(value, x, y);
    });
  });
}

function drawResultsPanel() {
  if (!solutionData) return;
  const panelX = margin;
  const panelY = 420;
  const panelWidth = canvasWidth - margin * 2;
  const panelHeight = 140;

  stroke('lightgray');
  fill('white');
  rect(panelX, panelY, panelWidth, panelHeight, 12);

  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  const approxText = solutionData.approxValid ? 'Small-x approximation valid (<5%)' : 'Approximation NOT valid—quadratic used';
  const infoLines = [
    `Ka expression: Ka = x^2 / (${solutionData.initialValue} - x)`,
    `x (=[H⁺]) = ${solutionData.h.toExponential(2)} M, pH = ${solutionData.pH.toFixed(2)}`,
    `pOH = ${solutionData.pOH.toFixed(2)}, [OH⁻] = ${solutionData.oh.toExponential(2)} M`,
    `Percent ionization = ${solutionData.percentIonization.toFixed(2)}%`,
    approxText
  ];
  infoLines.forEach((line, index) => {
    text(line, panelX + 12, panelY + 12 + index * 22);
  });

  drawGauge(panelX + panelWidth - 180, panelY + panelHeight - 40, 160, solutionData.percentIonization);
}

function drawGauge(x, y, width, percent) {
  fill('aliceblue');
  stroke('lightgray');
  rect(x, y, width, 18, 10);
  const fillWidth = constrain((percent / 100) * width, 0, width);
  fill('seagreen');
  noStroke();
  rect(x, y, fillWidth, 18, 10);
  fill('black');
  textAlign(CENTER, CENTER);
  text(`${percent.toFixed(1)}% ionization`, x + width / 2, y + 9);
}

function drawControlBackground() {
  noStroke();
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
}

function handleCalculate() {
  const label = acidInput.value().trim() || 'Weak acid';
  const initial = parseFloat(concentrationInput.value());
  const Ka = parseFloat(kaInput.value());

  if (!Number.isFinite(initial) || initial <= 0 || !Number.isFinite(Ka) || Ka <= 0) {
    statusMessage = 'Please enter positive numeric values for [HA] and Ka.';
    return;
  }

  const solution = solveWeakAcid(initial, Ka, label);
  solutionData = solution;
  statusMessage = `Solution for ${label}`;
}

function solveWeakAcid(initial, Ka, label) {
  const a = 1;
  const b = Ka;
  const c = -Ka * initial;
  const discriminant = b * b - 4 * a * c;
  const sqrtD = sqrt(discriminant);
  const x1 = (-b + sqrtD) / (2 * a);
  const x2 = (-b - sqrtD) / (2 * a);
  const h = x1 > 0 ? x1 : x2;
  const pH = -log10(h);
  const pOH = 14 - pH;
  const oh = pow(10, -pOH);
  const percentIon = (h / initial) * 100;
  const approxValid = percentIon < 5;

  return {
    label,
    initialValue: formatNumber(initial),
    h,
    pH,
    pOH,
    oh,
    percentIonization: percentIon,
    approxValid,
    initial: {
      ha: formatNumber(initial),
      h3o: '0',
      a: '0'
    },
    change: {
      ha: '-x',
      h3o: '+x',
      a: '+x'
    },
    equilibrium: {
      ha: `${formatNumber(initial)} - x`,
      h3o: 'x',
      a: 'x'
    }
  };
}

function formatNumber(value) {
  if (abs(value) < 0.001 || abs(value) > 1000) {
    return value.toExponential(2);
  }
  return value.toFixed(3);
}

function resetSolution() {
  solutionData = null;
  statusMessage = 'Enter values and press Calculate.';
}
