/*
  ICE Table Interactive Solver MicroSim

  Step 2.5 layout plan
  ---------------------
  Controls below drawing area (left column width = 430 px):
    1. Reaction preset dropdown
    2. Kc input (scientific notation supported)
    3. Mode buttons (Guided Solve / Practice Mode)
    4. Solve, Reset, Next Step buttons
    5. Dynamic rows for each species' initial concentration input
  Drawing area (drawHeight = 540 px):
    - ICE table grid (660 × 300 px) with I/C/E row colors
    - Progress indicator and animated highlight for guided steps
    - Algebra panel, approximation decision box, quadratic panel, result summary
  Control area height = 360 px, canvas height = 900 px (iframe height = 902 px)
*/

let canvasWidth = 920;
let drawHeight = 540;
let controlHeight = 360;
let canvasHeight = drawHeight + controlHeight;
const margin = 24;
const controlColumnWidth = 430;
const stepDescriptions = [
  'Step 1 of 5: Review Initial row (I)',
  'Step 2 of 5: Write Change row (C)',
  'Step 3 of 5: Write Equilibrium row (E)',
  'Step 4 of 5: Substitute into K expression',
  'Step 5 of 5: Solve for x and list equilibrium concentrations'
];

const rowStyles = {
  initial: { fill: '#E3F2FD', label: 'Initial (I)' },
  change: { fill: '#FFE0B2', label: 'Change (C)' },
  equilibrium: { fill: '#E8F5E9', label: 'Equilibrium (E)' }
};

const reactions = [
  {
    id: 'hi',
    label: 'H₂ + I₂ ⇌ 2 HI',
    description: 'Combination reaction with 1:1:2 stoichiometry',
    defaultK: 55,
    species: [
      { key: 'H2', label: 'H₂', role: 'reactant', stoich: 1 },
      { key: 'I2', label: 'I₂', role: 'reactant', stoich: 1 },
      { key: 'HI', label: 'HI', role: 'product', stoich: 2 }
    ],
    initial: { H2: 0.50, I2: 0.50, HI: 0.00 }
  },
  {
    id: 'pcl5',
    label: 'PCl₅ ⇌ PCl₃ + Cl₂',
    description: 'Single reactant decomposing into two products',
    defaultK: 0.018,
    species: [
      { key: 'PCl5', label: 'PCl₅', role: 'reactant', stoich: 1 },
      { key: 'PCl3', label: 'PCl₃', role: 'product', stoich: 1 },
      { key: 'Cl2', label: 'Cl₂', role: 'product', stoich: 1 }
    ],
    initial: { PCl5: 0.25, PCl3: 0.00, Cl2: 0.00 }
  },
  {
    id: 'n2o4',
    label: 'N₂O₄ ⇌ 2 NO₂',
    description: 'Dimerization between N₂O₄ and NO₂',
    defaultK: 0.15,
    species: [
      { key: 'N2O4', label: 'N₂O₄', role: 'reactant', stoich: 1 },
      { key: 'NO2', label: 'NO₂', role: 'product', stoich: 2 }
    ],
    initial: { N2O4: 0.40, NO2: 0.00 }
  },
  {
    id: 'cocl2',
    label: 'COCl₂ ⇌ CO + Cl₂',
    description: 'Phosgene decomposition',
    defaultK: 1.6e-3,
    species: [
      { key: 'COCl2', label: 'COCl₂', role: 'reactant', stoich: 1 },
      { key: 'CO', label: 'CO', role: 'product', stoich: 1 },
      { key: 'Cl2', label: 'Cl₂', role: 'product', stoich: 1 }
    ],
    initial: { COCl2: 0.10, CO: 0.00, Cl2: 0.00 }
  }
];

let currentReaction = reactions[0];
let reactionSelect;
let kInput;
let modeButtons = {};
let solveButton;
let resetButton;
let nextStepButton;
let baseRows = [];
let speciesRows = [];
let speciesInputs = {};
let solution = null;
let guidedMode = true;
let guidedStep = 1;
let stepStartTime = 0;
const autoStepInterval = 1500;
let practiceResponses = {};
let practiceInput;
let practiceActiveCell = null;
let cellRegions = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const main = document.querySelector('main');
  if (main) {
    canvas.parent(main);
  }
  textFont('Arial');
  createControls();
  rebuildSpeciesRows();
  createPracticeInput();
  describe('Step through ICE tables with guided animation or practice inputs to compare approximation vs quadratic solutions.', 'ICE Table Interactive Solver');
}

function draw() {
  updateCanvasSize();
  background('#f4f7fb');
  drawIceTable();
  drawPanels();
  drawControlBackground();
  positionControlRows();
  handleGuidedAutoAdvance();
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
  canvasHeight = drawHeight + controlHeight;
}

function drawControlBackground() {
  noStroke();
  fill('aliceblue');
  rect(0, drawHeight, canvasWidth, controlHeight);
}

function createControls() {
  baseRows = [];

  const reactionRow = createControlRow('Reaction preset');
  reactionSelect = createSelect();
  reactionSelect.parent(reactionRow.slot);
  reactions.forEach(reaction => reactionSelect.option(reaction.label, reaction.id));
  reactionSelect.changed(() => {
    currentReaction = reactions.find(r => r.id === reactionSelect.value()) || reactions[0];
    rebuildSpeciesRows();
    resetSolver();
  });
  baseRows.push(reactionRow);

  const kRow = createControlRow('Kc (equilibrium constant)');
  kInput = createInput(currentReaction.defaultK.toString());
  kInput.attribute('type', 'text');
  kInput.parent(kRow.slot);
  kInput.input(() => {
    if (!guidedMode) {
      // keep practice responses consistent
      practiceResponses = {};
    }
  });
  baseRows.push(kRow);

  const modeRow = createControlRow('Mode');
  const guidedBtn = createButton('Guided Solve');
  const practiceBtn = createButton('Practice Mode');
  guidedBtn.parent(modeRow.slot);
  practiceBtn.parent(modeRow.slot);
  styleToggleButton(guidedBtn, true);
  styleToggleButton(practiceBtn, false);
  guidedBtn.mousePressed(() => setMode(true));
  practiceBtn.mousePressed(() => setMode(false));
  modeButtons = { guided: guidedBtn, practice: practiceBtn };
  baseRows.push(modeRow);

  const actionRow = createControlRow('Actions');
  solveButton = createButton('Solve');
  resetButton = createButton('Reset');
  nextStepButton = createButton('Next step');
  [solveButton, resetButton, nextStepButton].forEach(btn => {
    btn.parent(actionRow.slot);
    stylePrimaryButton(btn);
  });
  solveButton.mousePressed(() => {
    computeSolution();
    guidedStep = 1;
    stepStartTime = millis();
  });
  resetButton.mousePressed(() => resetSolver());
  nextStepButton.mousePressed(() => advanceGuidedStep());
  baseRows.push(actionRow);
}

function rebuildSpeciesRows() {
  speciesRows.forEach(entry => entry.row.remove());
  speciesRows = [];
  speciesInputs = {};
  currentReaction.species.forEach(spec => {
    const row = createControlRow(`Initial [${spec.label}] (mol/L)`);
    const input = createInput(nf(currentReaction.initial[spec.key], 0, 3));
    input.attribute('type', 'text');
    input.parent(row.slot);
    speciesInputs[spec.key] = input;
    speciesRows.push({ row, spec, input });
  });
  reactionSelect.selected(currentReaction.id);
  if (kInput) {
    kInput.value(currentReaction.defaultK);
  }
  practiceResponses = {};
  hidePracticeInput();
}

function createControlRow(labelText) {
  const row = createDiv();
  row.style('display', 'inline-block');
  row.style('background', '#ffffff');
  row.style('padding', '6px 10px');
  row.style('border-radius', '8px');
  row.style('box-shadow', '0 1px 3px rgba(0,0,0,0.12)');
  row.style('font-family', 'Arial, Helvetica, sans-serif');
  row.style('font-size', '14px');

  const labelSpan = createSpan(labelText + ':');
  labelSpan.parent(row);
  styleLabel(labelSpan);

  const slot = createDiv();
  slot.parent(row);
  slot.style('display', 'inline-block');
  slot.style('width', '220px');
  slot.style('margin-left', '12px');

  return { row, slot };
}

function styleLabel(el) {
  el.style('display', 'inline-block');
  el.style('min-width', '220px');
  el.style('font-weight', '600');
}

function styleToggleButton(btn, active) {
  btn.style('margin-right', '8px');
  btn.style('padding', '4px 12px');
  btn.style('border-radius', '6px');
  btn.style('border', active ? '2px solid #1e88e5' : '1px solid #b0bec5');
  btn.style('background', active ? '#E3F2FD' : '#ffffff');
  btn.style('cursor', 'pointer');
}

function stylePrimaryButton(btn) {
  btn.style('margin-right', '10px');
  btn.style('padding', '6px 12px');
  btn.style('border-radius', '6px');
  btn.style('border', 'none');
  btn.style('background', '#1e88e5');
  btn.style('color', '#ffffff');
  btn.style('cursor', 'pointer');
}

function positionControlRows() {
  const canvasEl = document.querySelector('main canvas');
  if (!canvasEl) return;
  const rect = canvasEl.getBoundingClientRect();
  const baseX = rect.left + window.scrollX + margin;
  const baseY = rect.top + window.scrollY + drawHeight + 16;
  const availableWidth = Math.min(canvasWidth - margin * 2, controlColumnWidth);
  const rows = [...baseRows, ...speciesRows.map(entry => entry.row)];
  const spacing = 48;
  rows.forEach((entry, index) => {
    entry.row.position(baseX, baseY + index * spacing);
    entry.row.style('width', availableWidth + 'px');
  });
}

function setMode(isGuided) {
  guidedMode = isGuided;
  styleToggleButton(modeButtons.guided, guidedMode);
  styleToggleButton(modeButtons.practice, !guidedMode);
  nextStepButton.attribute('disabled', guidedMode ? null : true);
  if (!guidedMode) {
    guidedStep = 5;
  } else {
    guidedStep = 1;
    stepStartTime = millis();
  }
  practiceResponses = {};
  hidePracticeInput();
}

function resetSolver() {
  currentReaction.species.forEach(spec => {
    const input = speciesInputs[spec.key];
    if (input) input.value(nf(currentReaction.initial[spec.key], 0, 3));
  });
  kInput.value(currentReaction.defaultK);
  solution = null;
  guidedStep = guidedMode ? 1 : 5;
  stepStartTime = millis();
  practiceResponses = {};
  hidePracticeInput();
}

function computeSolution() {
  const initial = {};
  let validInputs = true;
  currentReaction.species.forEach(spec => {
    const input = speciesInputs[spec.key];
    const val = parseFloat(input.value());
    if (Number.isNaN(val)) {
      validInputs = false;
    }
    initial[spec.key] = Number.isNaN(val) ? 0 : val;
  });
  if (!validInputs) {
    return;
  }
  const K = parseFloat(kInput.value());
  if (!Number.isFinite(K) || K <= 0) {
    return;
  }

  const changeCoeffs = {};
  currentReaction.species.forEach(spec => {
    const direction = spec.role === 'product' ? 1 : -1;
    changeCoeffs[spec.key] = direction * spec.stoich;
  });

  const { numeratorPoly, denominatorPoly } = buildPolynomials(currentReaction, initial, changeCoeffs);
  const scaledDen = scalePoly(denominatorPoly, K);
  const equationPoly = subtractPolys(numeratorPoly, scaledDen);
  const { a, b, c } = extractQuadratic(equationPoly);
  const quadraticDetail = { a, b, c };
  const roots = solveQuadratic(a, b, c);
  let chosenX = null;
  let otherRoot = null;
  roots.forEach(root => {
    if (chosenX !== null) return;
    if (Number.isNaN(root)) return;
    if (isValidExtent(root, initial, changeCoeffs)) {
      chosenX = root;
    } else {
      otherRoot = root;
    }
  });
  if (chosenX === null) {
    chosenX = roots[0];
    otherRoot = roots[1];
  } else {
    otherRoot = roots.find(r => r !== chosenX) ?? null;
  }
  quadraticDetail.rootUsed = chosenX;
  quadraticDetail.otherRoot = otherRoot;
  quadraticDetail.discriminant = b * b - 4 * a * c;

  const changeRow = {};
  const eqRow = {};
  currentReaction.species.forEach(spec => {
    changeRow[spec.key] = changeCoeffs[spec.key] * chosenX;
    eqRow[spec.key] = initial[spec.key] + changeRow[spec.key];
  });

  const approxInfo = evaluateApproximation(initial, changeRow);
  const progressText = approxInfo.valid ? 'Approximation OK (≤5%)' : 'Approximation fails (>5%)';

  solution = {
    initial,
    change: changeRow,
    equilibrium: eqRow,
    extent: chosenX,
    approx: approxInfo,
    progressText,
    quadratic: quadraticDetail,
    K
  };
  practiceResponses = {};
  hidePracticeInput();
}

function buildPolynomials(reaction, initial, changeCoeffs) {
  let numeratorPoly = [1];
  let denominatorPoly = [1];
  reaction.species.forEach(spec => {
    const coef = changeCoeffs[spec.key];
    const termPoly = expandTerm(initial[spec.key], coef, spec.stoich);
    if (spec.role === 'product') {
      numeratorPoly = multiplyPolys(numeratorPoly, termPoly);
    } else {
      denominatorPoly = multiplyPolys(denominatorPoly, termPoly);
    }
  });
  return { numeratorPoly, denominatorPoly };
}

function expandTerm(initialValue, changeCoeff, exponent) {
  if (exponent === 0) return [1];
  const poly = new Array(exponent + 1).fill(0);
  for (let k = 0; k <= exponent; k += 1) {
    const binom = combination(exponent, k);
    poly[k] = binom * pow(changeCoeff, k) * pow(initialValue, exponent - k);
  }
  return poly;
}

function multiplyPolys(a, b) {
  const result = new Array(a.length + b.length - 1).fill(0);
  for (let i = 0; i < a.length; i += 1) {
    for (let j = 0; j < b.length; j += 1) {
      result[i + j] += a[i] * b[j];
    }
  }
  return result;
}

function subtractPolys(a, b) {
  const length = Math.max(a.length, b.length);
  const result = new Array(length).fill(0);
  for (let i = 0; i < length; i += 1) {
    const ai = i < a.length ? a[i] : 0;
    const bi = i < b.length ? b[i] : 0;
    result[i] = ai - bi;
  }
  return trimPoly(result);
}

function scalePoly(poly, scalar) {
  return poly.map(coef => coef * scalar);
}

function trimPoly(poly) {
  let lastIndex = poly.length - 1;
  while (lastIndex > 0 && abs(poly[lastIndex]) < 1e-10) {
    lastIndex -= 1;
  }
  return poly.slice(0, lastIndex + 1);
}

function extractQuadratic(poly) {
  const degree = poly.length - 1;
  return {
    a: degree >= 2 ? poly[2] : 0,
    b: degree >= 1 ? poly[1] : 0,
    c: poly[0] ?? 0
  };
}

function solveQuadratic(a, b, c) {
  const epsilon = 1e-10;
  if (abs(a) < epsilon) {
    if (abs(b) < epsilon) {
      return [0, 0];
    }
    return [-c / b, -c / b];
  }
  const discriminant = max(0, b * b - 4 * a * c);
  const sqrtD = sqrt(discriminant);
  const denom = 2 * a;
  const root1 = (-b + sqrtD) / denom;
  const root2 = (-b - sqrtD) / denom;
  return [root1, root2];
}

function isValidExtent(x, initial, changeCoeffs) {
  return Object.keys(initial).every(key => {
    const value = initial[key] + changeCoeffs[key] * x;
    return value >= -1e-6;
  });
}

function evaluateApproximation(initial, changeRow) {
  let maxPercent = 0;
  Object.keys(initial).forEach(key => {
    if (initial[key] === 0) return;
    const percent = abs(changeRow[key]) / max(abs(initial[key]), 1e-8) * 100;
    if (percent > maxPercent) {
      maxPercent = percent;
    }
  });
  return {
    percent: maxPercent,
    valid: maxPercent <= 5
  };
}

function drawIceTable() {
  const tableWidth = min(canvasWidth - margin * 2, 720);
  const tableHeight = 300;
  const startX = (canvasWidth - tableWidth) / 2;
  const startY = 40;
  const columnCount = currentReaction.species.length + 1;
  const columnWidth = tableWidth / columnCount;
  const rowHeight = tableHeight / 3;

  fill('#ffffff');
  stroke('#CFD8DC');
  rect(startX - 10, startY - 30, tableWidth + 20, tableHeight + 80, 12);

  const progress = guidedMode ? stepDescriptions[guidedStep - 1] : 'Practice mode: click cells to enter values';
  fill('#263238');
  textAlign(CENTER, TOP);
  textSize(16);
  text(progress, canvasWidth / 2, startY - 24);

  cellRegions = [];

  ['initial', 'change', 'equilibrium'].forEach((rowKey, rowIndex) => {
    const rowY = startY + rowIndex * rowHeight;
    fill(rowStyles[rowKey].fill);
    noStroke();
    rect(startX, rowY, tableWidth, rowHeight);

    stroke('#90A4AE');
    line(startX, rowY, startX + tableWidth, rowY);
    line(startX, rowY + rowHeight, startX + tableWidth, rowY + rowHeight);

    const highlight = guidedMode && (
      (rowKey === 'initial' && guidedStep === 1) ||
      (rowKey === 'change' && guidedStep === 2) ||
      (rowKey === 'equilibrium' && guidedStep === 3)
    );
    if (highlight) {
      const pulse = 180 + 60 * sin(frameCount / 10);
      stroke(`rgba(30,136,229,${map(pulse, 120, 240, 0.2, 0.4)})`);
      strokeWeight(3);
      noFill();
      rect(startX + 2, rowY + 2, tableWidth - 4, rowHeight - 4, 8);
      strokeWeight(1);
    }

    fill('#1F2933');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(rowStyles[rowKey].label, startX + columnWidth / 2, rowY + rowHeight / 2);

    currentReaction.species.forEach((spec, colIndex) => {
      const colX = startX + columnWidth * (colIndex + 1);
      stroke('#90A4AE');
      line(colX, rowY, colX, rowY + rowHeight);

      const cellValue = getCellDisplay(rowKey, spec.key);
      const region = {
        rowKey,
        species: spec.key,
        x: colX,
        y: rowY,
        width: columnWidth,
        height: rowHeight
      };
      cellRegions.push(region);

      const practiceCell = practiceResponses[`${rowKey}-${spec.key}`];
      if (practiceCell) {
        const bg = practiceCell.correct ? '#C8E6C9' : '#FFCDD2';
        noStroke();
        fill(bg);
        rect(colX + 1, rowY + 1, columnWidth - 2, rowHeight - 2);
      }

      fill('#1D3557');
      textAlign(CENTER, CENTER);
      textSize(15);
      text(cellValue, colX + columnWidth / 2, rowY + rowHeight / 2);
    });
  });

  // Column headers
  currentReaction.species.forEach((spec, index) => {
    const colX = startX + columnWidth * (index + 1) + columnWidth / 2;
    fill('#394B59');
    textAlign(CENTER, BOTTOM);
    textSize(15);
    text(spec.label, colX, startY - 6);
  });

  if (practiceActiveCell) {
    drawPracticePrompt();
  }
}

function getCellDisplay(rowKey, speciesKey) {
  if (!solution) return '—';
  const value = solution[rowKey][speciesKey];
  if (guidedMode || rowKey === 'initial') {
    return formatValue(value);
  }
  const response = practiceResponses[`${rowKey}-${speciesKey}`];
  if (!response) {
    return '?';
  }
  return formatValue(value);
}

function formatValue(value) {
  if (!Number.isFinite(value)) return '—';
  if (abs(value) < 1e-4) {
    return value.toExponential(2);
  }
  return nf(value, 0, 3);
}

function drawPanels() {
  if (!solution) return;
  const panelWidth = min(canvasWidth - margin * 2, 720);
  const panelX = (canvasWidth - panelWidth) / 2;
  const algebraY = 360;
  const approxY = 430;

  drawAlgebraPanel(panelX, algebraY, panelWidth, 70);
  drawApproxPanel(panelX, approxY, panelWidth / 2 - 10, 120);
  drawQuadraticPanel(panelX + panelWidth / 2 + 10, approxY, panelWidth / 2 - 10, 120);
  drawResultPanel(panelX, approxY + 140, panelWidth, 80);
}

function drawAlgebraPanel(x, y, width, height) {
  stroke('#B0BEC5');
  fill('#ffffff');
  rect(x, y, width, height, 10);
  if (guidedMode && guidedStep === 4) {
    highlightPanel(x, y, width, height);
  }
  fill('#1F2933');
  textSize(14);
  textAlign(LEFT, TOP);
  text('K expression substitution', x + 14, y + 12);

  const { symbolicNumerator, symbolicDenominator, numericNumerator, numericDenominator } = buildExpressionStrings();
  const expression = `Kc = (${symbolicNumerator}) / (${symbolicDenominator})`;
  const substituted = `= (${numericNumerator}) / (${numericDenominator}) ≈ ${solution.K.toExponential(2)}`;
  textSize(12);
  text(expression, x + 14, y + 32);
  text(substituted, x + 14, y + 52);
}

function buildExpressionStrings() {
  const symbolicProducts = [];
  const symbolicReactants = [];
  const numericProducts = [];
  const numericReactants = [];
  currentReaction.species.forEach(spec => {
    const power = spec.stoich > 1 ? `^${spec.stoich}` : '';
    const symbolicTerm = `[${spec.label}]${power}`;
    const numericTerm = `${formatValue(solution.equilibrium[spec.key])}${power}`;
    if (spec.role === 'product') {
      symbolicProducts.push(symbolicTerm);
      numericProducts.push(numericTerm);
    } else {
      symbolicReactants.push(symbolicTerm);
      numericReactants.push(numericTerm);
    }
  });
  return {
    symbolicNumerator: symbolicProducts.join(' × ') || '1',
    symbolicDenominator: symbolicReactants.join(' × ') || '1',
    numericNumerator: numericProducts.join(' × ') || '1',
    numericDenominator: numericReactants.join(' × ') || '1'
  };
}

function highlightPanel(x, y, width, height) {
  const pulse = 150 + 90 * sin(frameCount / 10);
  noFill();
  stroke(`rgba(255,193,7,${map(pulse, 60, 240, 0.4, 0.8)})`);
  strokeWeight(3);
  rect(x + 3, y + 3, width - 6, height - 6, 8);
  strokeWeight(1);
}

function drawApproxPanel(x, y, width, height) {
  stroke('#B0BEC5');
  fill('#ffffff');
  rect(x, y, width, height, 10);
  fill('#1F2933');
  textAlign(LEFT, TOP);
  textSize(14);
  text('Approximation check (5% rule)', x + 12, y + 12);
  const percent = solution.approx.percent.toFixed(2);
  fill(solution.approx.valid ? '#2E7D32' : '#C62828');
  textSize(13);
  text(`${percent}% change ${solution.approx.valid ? '≤ 5% ✔' : '> 5% ✗'}`, x + 12, y + 36);
  fill('#546E7A');
  textSize(12);
  text('Largest percent change among reactants', x + 12, y + 56);
}

function drawQuadraticPanel(x, y, width, height) {
  stroke('#B0BEC5');
  fill('#ffffff');
  rect(x, y, width, height, 10);
  if (guidedMode && guidedStep === 5) {
    highlightPanel(x, y, width, height);
  }
  fill('#1F2933');
  textAlign(LEFT, TOP);
  textSize(14);
  text('Quadratic setup', x + 12, y + 12);
  const { a, b, c, discriminant, rootUsed, otherRoot } = solution.quadratic;
  textSize(12);
  text(`a = ${a.toExponential(2)}, b = ${b.toExponential(2)}, c = ${c.toExponential(2)}`, x + 12, y + 32);
  text(`Δ = b² - 4ac = ${discriminant.toExponential(2)}`, x + 12, y + 48);
  text(`x = ${formatValue(rootUsed)} (valid)`, x + 12, y + 66);
  if (otherRoot !== null && Number.isFinite(otherRoot)) {
    text(`discarded root: ${formatValue(otherRoot)}`, x + 12, y + 82);
  }
}

function drawResultPanel(x, y, width, height) {
  stroke('#B0BEC5');
  fill('#ffffff');
  rect(x, y, width, height, 10);
  fill('#1F2933');
  textAlign(LEFT, TOP);
  textSize(14);
  text('Equilibrium concentrations (3 s.f.)', x + 12, y + 12);
  textSize(12);
  const lineY = y + 34;
  currentReaction.species.forEach((spec, index) => {
    const value = formatValue(solution.equilibrium[spec.key]);
    text(`${spec.label}: ${value} M`, x + 12 + index * 180, lineY);
  });
}

function handleGuidedAutoAdvance() {
  if (!guidedMode || !solution) return;
  if (guidedStep >= stepDescriptions.length) return;
  if (millis() - stepStartTime > autoStepInterval) {
    advanceGuidedStep();
  }
}

function advanceGuidedStep() {
  if (!guidedMode) return;
  guidedStep = min(guidedStep + 1, stepDescriptions.length);
  stepStartTime = millis();
}

function createPracticeInput() {
  practiceInput = createInput('');
  practiceInput.attribute('type', 'text');
  practiceInput.style('position', 'absolute');
  practiceInput.style('padding', '4px 6px');
  practiceInput.style('border', '2px solid #1e88e5');
  practiceInput.style('border-radius', '4px');
  practiceInput.hide();
  practiceInput.elt.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      submitPracticeValue();
    } else if (event.key === 'Escape') {
      hidePracticeInput();
    }
  });
}

function mousePressed() {
  if (!guidedMode && solution) {
    const cell = cellRegions.find(region =>
      mouseX >= region.x && mouseX <= region.x + region.width &&
      mouseY >= region.y && mouseY <= region.y + region.height &&
      region.rowKey !== 'initial'
    );
    if (cell) {
      activatePracticeCell(cell);
    }
  }
}

function activatePracticeCell(cell) {
  const canvasEl = document.querySelector('main canvas');
  if (!canvasEl) return;
  practiceActiveCell = cell;
  const rect = canvasEl.getBoundingClientRect();
  const absoluteX = rect.left + window.scrollX + cell.x + 6;
  const absoluteY = rect.top + window.scrollY + cell.y + 6;
  practiceInput.position(absoluteX, absoluteY);
  practiceInput.size(cell.width - 12, cell.height - 12);
  practiceInput.value('');
  practiceInput.show();
  practiceInput.elt.focus();
}

function hidePracticeInput() {
  if (practiceInput) {
    practiceInput.hide();
  }
  practiceActiveCell = null;
}

function submitPracticeValue() {
  if (!practiceActiveCell || !solution) return;
  const entered = parseFloat(practiceInput.value());
  const actual = solution[practiceActiveCell.rowKey][practiceActiveCell.species];
  const tolerance = max(0.005, abs(actual) * 0.02);
  const correct = !Number.isNaN(entered) && abs(entered - actual) <= tolerance;
  practiceResponses[`${practiceActiveCell.rowKey}-${practiceActiveCell.species}`] = {
    entered,
    correct
  };
  hidePracticeInput();
}

function drawPracticePrompt() {
  if (!practiceActiveCell) return;
  fill('#263238');
  textSize(12);
  textAlign(LEFT, TOP);
  const promptY = practiceActiveCell.y + practiceActiveCell.height + 12;
  text('Enter value, press Enter to submit (Esc to cancel).', practiceActiveCell.x + 4, promptY);
}

function combination(n, k) {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 1; i <= k; i += 1) {
    result = result * (n - k + i) / i;
  }
  return result;
}
