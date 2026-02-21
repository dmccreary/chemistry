/*
  Arrhenius Equation Explorer MicroSim
  Step 2.5 Layout Plan:
  - Control inventory:
      1. Slider: Ea (kJ/mol)
      2. Slider: A multiplier (×10^10 s^-1)
      3. Slider: T_max (K)
      4. Checkbox: show reference curve (Ea=40 kJ/mol)
      5. Readout box: k(298 K), k(500 K)
  - Layout calculations:
      drawHeight = 520 (extra padding for centered title and plot labels)
      controlHeight = 100 (footer instructions)
      canvasHeight = drawHeight + controlHeight = 620 (iframe height = 622px)
      leftPanelWidth = 230px fixed, rightPanel fills remaining width
      slider positions: starting y = panelTop + 60, spacing = 70px
  - Control positions: sliders and checkbox placed directly in canvas (using absolute positioning relative to canvas bounding box)
  - Label positions: text next to sliders describing current values; readout box near bottom of left panel
*/

let canvasWidth = 800;
let drawHeight = 420;
let controlHeight = 200;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
const titleText = 'Arrhenius Equation Explorer';

let eaSlider;
let aSlider;
let tMaxSlider;
let referenceCheckbox;

let leftPanelWidth = 230;
let controlRows = [];
let canvasElement = null;

const R = 8.314; // J/(mol·K)
const minTemp = 200;
const defaultEa = 60;
const defaultA = 10; // ×10^10 s^-1 multiplier
const defaultTmax = 800;

let curveData = [];
let referenceCurveData = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const parent = document.querySelector('main');
  if (parent) {
    canvas.parent(parent);
  }
  canvasElement = canvas;
  textFont('Arial');
  createControls();
  recalcCurves();
  describe('Adjust activation energy, frequency factor, and temperature range to see Arrhenius plots and k vs T curves.', 'Arrhenius Equation Explorer');
}

function draw() {
  updateCanvasSize();
  background('#f5f5f5');
  drawTitle();
  drawPanels();
  drawLeftPanel();
  drawRightPanel();
  drawFooter();
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

function createControls() {
  createControlRows();

  eaSlider = createSlider(20, 150, defaultEa, 1);
  eaSlider.input(recalcCurves);
  eaSlider.parent(controlRows[0].row);
  styleSlider(eaSlider);

  aSlider = createSlider(1, 100, defaultA, 1);
  aSlider.input(recalcCurves);
  aSlider.parent(controlRows[1].row);
  styleSlider(aSlider);

  tMaxSlider = createSlider(400, 1200, defaultTmax, 50);
  tMaxSlider.input(recalcCurves);
  tMaxSlider.parent(controlRows[2].row);
  styleSlider(tMaxSlider);

  referenceCheckbox = createCheckbox('', false);
  referenceCheckbox.changed(recalcCurves);
  referenceCheckbox.parent(controlRows[3].row);
  referenceCheckbox.addClass('arr-checkbox');

  updateControlValues();
}

function positionControls() {
  const canvasEl = getCanvasElement();
  if (!canvasEl) {
    return;
  }
  const rect = canvasEl.getBoundingClientRect();
  const offsetX = rect.left + window.scrollX;
  const offsetY = rect.top + window.scrollY;
  const baseY = offsetY + drawHeight + 10;
  for (let i = 0; i < controlRows.length; i += 1) {
    const row = controlRows[i];
    if (!row) continue;
    row.position(offsetX + margin + 10, baseY + i * 40);
  }
}

function getCanvasElement() {
  if (canvasElement && canvasElement.elt) {
    return canvasElement.elt;
  }
  const mainCanvas = document.querySelector('main canvas');
  return mainCanvas || (canvasElement ? canvasElement.elt : null);
}

function createControlRows() {
  const labels = ['Ea (kJ/mol)', 'A (×10¹⁰ s⁻¹)', 'Tₘₐₓ (K)', 'Reference Curve'];
  controlRows = [];
  for (let i = 0; i < labels.length; i += 1) {
    const row = createDiv();
    row.addClass('arr-slider-row');
    row.style('font-family', 'Arial, Helvetica, sans-serif');
    row.style('font-size', '14px');
    row.style('display', 'inline-block');
    row.style('background-color', '#ffffff');
    row.style('padding', '4px 8px');
    row.style('border-radius', '6px');
    row.style('box-shadow', '0 1px 3px rgba(0,0,0,0.08)');

    const labelSpan = createSpan(labels[i] + ': ');
    labelSpan.parent(row);
    styleLabel(labelSpan);

    const valueSpan = createSpan('');
    valueSpan.parent(row);
    styleValue(valueSpan);

    controlRows.push({ row, label: labelSpan, value: valueSpan });
  }
}

function styleLabel(el) {
  el.style('display', 'inline-block');
  el.style('min-width', '140px');
}

function styleValue(el) {
  el.style('display', 'inline-block');
  el.style('min-width', '60px');
  el.style('font-weight', '600');
}

function styleSlider(slider) {
  slider.addClass('arr-slider');
  slider.style('width', '200px');
  slider.style('margin-left', '12px');
}

function updateControlValues() {
  if (!controlRows.length) {
    return;
  }
  controlRows[0].value.html(nf(eaSlider.value(), 0, 0));
  controlRows[1].value.html(nf(aSlider.value(), 0, 0));
  controlRows[2].value.html(nf(tMaxSlider.value(), 0, 0));
  controlRows[3].value.html(referenceCheckbox.checked() ? 'On' : 'Off');
}

function recalcCurves() {
  positionControls();
  const Ea = eaSlider.value();
  const A = aSlider.value() * 1e10;
  const Tmax = tMaxSlider.value();
  const showReference = referenceCheckbox.checked();
  curveData = generateCurveData(Ea, A, Tmax);
  referenceCurveData = showReference ? generateCurveData(40, A, Tmax) : [];
  updateControlValues();
}

function generateCurveData(EaKJ, A, Tmax) {
  const data = [];
  const steps = 200;
  const EaJ = EaKJ * 1000;
  for (let i = 0; i <= steps; i += 1) {
    const T = lerp(minTemp, Tmax, i / steps);
    const k = A * Math.exp(-EaJ / (R * T));
    const invT = 1 / T;
    data.push({ T, k, lnK: Math.log(k), invT });
  }
  return data;
}

function drawTitle() {
  fill('#111111');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(26);
  text(titleText, canvasWidth / 2, 10);
}

function drawPanels() {
  positionControls();
  const panelTop = 60;
  const panelHeight = drawHeight - panelTop - margin;
  fill('#ffffff');
  stroke('#dfe3eb');
  rect(margin, panelTop, leftPanelWidth, panelHeight, 12);
  rect(margin + leftPanelWidth + margin, panelTop, canvasWidth - (margin * 3 + leftPanelWidth), panelHeight, 12);
}

function drawLeftPanel() {
  const panelTop = 60;
  fill('#0d47a1');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(16);
  text('Controls', margin + 10, panelTop + 10);

  fill('#111111');
  textSize(14);
  noStroke();
  text('Ea = ' + nf(eaSlider.value(), 0, 0) + ' kJ/mol', margin + 10, panelTop + 30);
  noStroke();
  text('A = ' + nf(aSlider.value(), 0, 0) + ' ×10¹⁰ s⁻¹', margin + 10, panelTop + 100);
  noStroke();
  text('Tₘₐₓ = ' + nf(tMaxSlider.value(), 0, 0) + ' K', margin + 10, panelTop + 170);
  noStroke();
  text('R = 8.314 J/(mol·K)', margin + 10, panelTop + 210);

  const k298 = computeK(298, eaSlider.value(), aSlider.value() * 1e10);
  const k500 = computeK(500, eaSlider.value(), aSlider.value() * 1e10);
  fill('#263238');
  textSize(13);
  noStroke();
  text('k @ 298 K = ' + formatSci(k298) + ' s⁻¹', margin + 10, panelTop + 270);
  noStroke();
  text('k @ 500 K = ' + formatSci(k500) + ' s⁻¹', margin + 10, panelTop + 290);
}

function drawRightPanel() {
  const panelTop = 60;
  const rightX = margin + leftPanelWidth + margin;
  const rightWidth = canvasWidth - rightX - margin;
  const panelHeight = drawHeight - panelTop - margin;
  const plotWidth = (rightWidth - margin) / 2;

  drawKvsTPlot(rightX + 10, panelTop + 30, plotWidth, panelHeight - 60);
  drawArrheniusPlot(rightX + 20 + plotWidth, panelTop + 30, plotWidth, panelHeight - 60);
}

function drawKvsTPlot(x, y, width, height) {
  fill('#111111');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(15);
  noStroke();
  text('k vs Temperature', x, y - 20);

  const graphLeft = x;
  const graphTop = y;
  const graphRight = x + width;
  const graphBottom = y + height;

  drawGrid(graphLeft, graphTop, graphRight, graphBottom, 'Temperature (K)', 'k (s⁻¹)', true);
  drawCurveData(curveData, graphLeft, graphTop, graphRight, graphBottom, false);
  if (referenceCurveData.length) {
    drawCurveData(referenceCurveData, graphLeft, graphTop, graphRight, graphBottom, true);
  }
}

function drawArrheniusPlot(x, y, width, height) {
  fill('#111111');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(15);
  noStroke();
  text('Arrhenius Plot (ln k vs 1/T)', x, y - 20);

  const graphLeft = x;
  const graphTop = y;
  const graphRight = x + width;
  const graphBottom = y + height;

  drawGrid(graphLeft, graphTop, graphRight, graphBottom, '1/T (×10⁻³ K⁻¹)', 'ln k', false);
  drawLineData(curveData, graphLeft, graphTop, graphRight, graphBottom, false);
  if (referenceCurveData.length) {
    drawLineData(referenceCurveData, graphLeft, graphTop, graphRight, graphBottom, true);
  }

  const slope = -eaSlider.value() * 1000 / R;
  fill('#c62828');
  textSize(13);
  noStroke();
  text('slope = −Ea/R = ' + nf(slope, 0, 0) + ' K', x + 10, y + 20);
}

function drawGrid(left, top, right, bottom, xlabel, ylabel, xIsTemp) {
  stroke('#d7d7d7');
  strokeWeight(1);
  for (let i = 0; i < 6; i += 1) {
    const y = lerp(bottom, top, i / 5);
    line(left, y, right, y);
  }
  for (let i = 0; i < 6; i += 1) {
    const x = lerp(left, right, i / 5);
    line(x, top, x, bottom);
  }
  fill('#424242');
  textAlign(CENTER, TOP);
  noStroke();
  text(xlabel, (left + right) / 2, bottom + 25);
  textAlign(CENTER, CENTER);
  push();
  translate(left - 40, (top + bottom) / 2);
  rotate(-HALF_PI);
  noStroke();
  text(ylabel, 0, 0);
  pop();
}

function drawCurveData(data, left, top, right, bottom, isReference) {
  if (!data.length) return;
  const maxTempValue = tMaxSlider.value();
  const maxK = Math.max(...data.map(d => d.k));
  const minK = Math.min(...data.map(d => d.k));

  noFill();
  stroke(isReference ? '#9E9E9E' : '#1565C0');
  strokeWeight(isReference ? 1.5 : 2.5);
  if (isReference) {
    drawingContext.setLineDash([6, 6]);
  }
  beginShape();
  for (let i = 0; i < data.length; i += 1) {
    const x = map(data[i].T, minTemp, maxTempValue, left, right);
    const y = map(data[i].k, Math.min(minK, 1e-6), maxK, bottom, top);
    vertex(x, y);
  }
  endShape();
  if (isReference) {
    drawingContext.setLineDash([]);
    noStroke();
    fill('#616161');
    textAlign(RIGHT, BOTTOM);
    text('Ea = 40 kJ/mol', right, top + 15);
  }
}

function drawLineData(data, left, top, right, bottom, isReference) {
  if (!data.length) return;
  const invValues = data.map(d => d.invT);
  const maxInv = Math.max(...invValues);
  const minInv = Math.min(...invValues);
  const lnValues = data.map(d => d.lnK);
  const maxLn = Math.max(...lnValues);
  const minLn = Math.min(...lnValues);

  stroke(isReference ? '#BDBDBD' : '#C62828');
  strokeWeight(isReference ? 1.5 : 2.5);
  if (isReference) {
    drawingContext.setLineDash([6, 6]);
  }
  noFill();
  beginShape();
  for (let i = 0; i < data.length; i += 1) {
    const x = map(data[i].invT, minInv, maxInv, right, left);
    const y = map(data[i].lnK, minLn, maxLn, bottom, top);
    vertex(x, y);
  }
  endShape();
  if (isReference) {
    drawingContext.setLineDash([]);
    fill('#616161');
    textAlign(RIGHT, BOTTOM);
    noStroke();
    text('Ea = 40 kJ/mol', right, top + 15);
  }
}

function drawFooter() {
  fill('#111111');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text('Arrhenius equation: k = A·e^{−Ea/(RT)} and ln k = −Ea/(RT) + ln A', canvasWidth / 2, drawHeight + 35);
  textSize(13);
  fill('#555555');
  noStroke();
  text('Use the reference curve to compare different activation energies.', canvasWidth / 2, drawHeight + 65);
}

function computeK(tempK, EaKJ, A) {
  return A * Math.exp(-(EaKJ * 1000) / (R * tempK));
}

function formatSci(value) {
  if (value === 0) return '0.00';
  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / Math.pow(10, exponent);
  return mantissa.toFixed(2) + '×10^' + exponent;
}
