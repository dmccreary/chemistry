/*
  Beer-Lambert Calibration MicroSim
  Pre-generation layout planning (Step 2.5):
  - Control inventory
      1. Plot Curve button (row 1, left)
      2. Reset button (row 1, left)
      3. Unknown absorbance input + Find Concentration button (row 2)
      4. Crosshair concentration slider (row 3)
      5. Twelve data-entry inputs (6 concentration + 6 absorbance fields) arranged in rows 4-9
  - Layout calculations
      drawHeight = 460
      number of control rows = 9
      controlHeight = (9 x 35) + 10 = 325 (rounded to 330 for spacing)
      canvasHeight = drawHeight + controlHeight = 790
      iframeHeight target = canvasHeight + 2 = 792px
      sliderLeftMargin = 260 so labels and buttons fit on the left
  - Control positions
      Plot button: (10, drawHeight + 10)
      Reset button: (120, drawHeight + 10)
      Unknown absorb input: (10, drawHeight + 50)
      Find concentration button: (180, drawHeight + 50)
      Slider: (sliderLeftMargin, drawHeight + 85)
      Data table inputs start at y = drawHeight + 140 with 28px spacing per row (concentration column x = 10, absorbance column x = 130)
  - Label positions
      text('Unknown absorbance A:', 10, drawHeight + 45)
      text('Crosshair concentration:', sliderLeftMargin - 150, drawHeight + 95)
      text('Concentration (mol/L)', 10, drawHeight + 125)
      text('Absorbance (A)', 150, drawHeight + 125)
*/

let canvasWidth = 800;
let drawHeight = 460;
let controlHeight = 330;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 260;
let defaultTextSize = 16;
const titleOffset = 40;
const titleText = 'Beer-Lambert Law Calibration Curve Builder';

const defaultData = [
  { conc: 0.0001, absorb: 0.15 },
  { conc: 0.0002, absorb: 0.30 },
  { conc: 0.0004, absorb: 0.60 },
  { conc: 0.0006, absorb: 0.90 },
  { conc: 0.0008, absorb: 1.20 },
  { conc: 0.0010, absorb: 1.50 }
];

let concInputs = [];
let absorbInputs = [];
let plotButton;
let resetButton;
let unknownAbsInput;
let findButton;
let crosshairSlider;

let dataPoints = [];
let regression = { slope: 0, intercept: 0, r2: 0 };
let unknownPoint = null;
let crosshairConc = 0.0005;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');

  createControls();
  resetData();

  describe('Calibration curve builder showing Beer-Lambert absorbance data, regression slope, and unknown concentration calculator.', 'Beer-Lambert Calibration Curve Builder');
}

function draw() {
  updateCanvasSize();
  background('white');

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawPanels();
  drawGraph();
  drawTitle();
  drawInfoPanel();
  drawControlLabels();
}

function createControls() {
  plotButton = createButton('Plot Curve');
  plotButton.mousePressed(plotCurve);

  resetButton = createButton('Reset Data');
  resetButton.mousePressed(resetData);

  unknownAbsInput = createInput('0.85', 'number');
  unknownAbsInput.attribute('step', '0.01');
  unknownAbsInput.attribute('min', '0');
  findButton = createButton('Find Concentration');
  findButton.mousePressed(findUnknownConcentration);

  crosshairSlider = createSlider(0, 0.001, crosshairConc, 0.00001);
  crosshairSlider.input(function () {
    crosshairConc = crosshairSlider.value();
  });

  for (let i = 0; i < defaultData.length; i += 1) {
    const cInput = createInput('', 'number');
    cInput.attribute('step', '0.0001');
    cInput.attribute('min', '0');
    const aInput = createInput('', 'number');
    aInput.attribute('step', '0.01');
    aInput.attribute('min', '0');
    concInputs.push(cInput);
    absorbInputs.push(aInput);
  }

  layoutControls();
}

function layoutControls() {
  plotButton.position(10, drawHeight + 10);
  resetButton.position(120, drawHeight + 10);

  unknownAbsInput.size(140, 24);
  unknownAbsInput.position(10, drawHeight + 55);
  findButton.position(180, drawHeight + 55);

  crosshairSlider.position(sliderLeftMargin, drawHeight + 85);
  crosshairSlider.size(canvasWidth - sliderLeftMargin - margin);

  const dataStartY = drawHeight + 140;
  for (let i = 0; i < defaultData.length; i += 1) {
    const rowY = dataStartY + i * 28;
    concInputs[i].size(100, 22);
    concInputs[i].position(10, rowY);
    absorbInputs[i].size(100, 22);
    absorbInputs[i].position(230, rowY);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  layoutControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
  canvasHeight = drawHeight + controlHeight;
}

function resetData() {
  for (let i = 0; i < defaultData.length; i += 1) {
    concInputs[i].value(defaultData[i].conc.toFixed(4));
    absorbInputs[i].value(defaultData[i].absorb.toFixed(2));
  }
  unknownAbsInput.value('0.85');
  crosshairConc = 0.0005;
  crosshairSlider.value(crosshairConc);
  unknownPoint = null;
  plotCurve();
}

function plotCurve() {
  dataPoints = [];
  for (let i = 0; i < concInputs.length; i += 1) {
    const c = parseFloat(concInputs[i].value());
    const a = parseFloat(absorbInputs[i].value());
    if (!isNaN(c) && !isNaN(a) && c >= 0 && a >= 0) {
      dataPoints.push({ conc: c, absorb: a });
    }
  }
  if (dataPoints.length >= 2) {
    regression = computeRegression(dataPoints);
  } else {
    regression = { slope: 0, intercept: 0, r2: 0 };
  }
}

function computeRegression(points) {
  const n = points.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;
  let sumYY = 0;
  for (let i = 0; i < n; i += 1) {
    const x = points[i].conc;
    const y = points[i].absorb;
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumXX += x * x;
    sumYY += y * y;
  }
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  const ssTot = sumYY - (sumY * sumY) / n;
  const ssRes = ssTot - slope * (sumXY - (sumX * sumY) / n);
  const r2 = ssTot === 0 ? 0 : 1 - ssRes / ssTot;
  return { slope: slope, intercept: intercept, r2: r2 };
}

function drawPanels() {
  const mid = canvasWidth * 0.5;
  noStroke();
  fill('#f5f5f5');
  rect(margin, margin, mid - margin * 1.5, drawHeight - margin * 1.5);
  fill('white');
  rect(mid + margin * 0.25, margin, canvasWidth - mid - margin * 1.25, drawHeight - margin * 1.5);
}

function drawGraph() {
  const graphLeft = margin * 1.5;
  const graphTop = margin * 1.5 + titleOffset;
  const graphRight = canvasWidth * 0.5 - margin;
  const graphBottom = drawHeight - margin * 1.5;

  stroke('#d0d0d0');
  fill('#ffffff');
  rect(graphLeft, graphTop, graphRight - graphLeft, graphBottom - graphTop);

  drawAxes(graphLeft, graphTop, graphRight, graphBottom);
  plotData(graphLeft, graphTop, graphRight, graphBottom);
  plotRegressionLine(graphLeft, graphTop, graphRight, graphBottom);
  drawCrosshair(graphLeft, graphTop, graphRight, graphBottom);
  drawUnknownPoint(graphLeft, graphTop, graphRight, graphBottom);
}

function drawAxes(left, top, right, bottom) {
  stroke('#333333');
  strokeWeight(2);
  line(left, bottom, right, bottom);
  line(left, bottom, left, top);

  fill('#333333');
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text('Concentration (mol/L)', (left + right) / 2, bottom + 25);
  push();
  translate(left - 35, (top + bottom) / 2);
  rotate(-HALF_PI);
  noStroke();
  text('Absorbance (A)', 0, 0);
  pop();

  textSize(12);
  const maxConc = 0.001;
  const maxAbs = 2.5;
  for (let i = 0; i <= 5; i += 1) {
    const x = lerp(left, right, i / 5);
    const concValue = (maxConc * i) / 5;
    fill('#555555');
    noStroke();
    textAlign(CENTER, TOP);
    text(concValue.toFixed(4), x, bottom + 5);
    stroke('#e0e0e0');
    line(x, top, x, bottom);
  }
  for (let j = 0; j <= 5; j += 1) {
    const y = lerp(bottom, top, j / 5);
    const absValue = (maxAbs * j) / 5;
    fill('#555555');
    noStroke();
    textAlign(RIGHT, CENTER);
    text(absValue.toFixed(2), left - 5, y);
    stroke('#e0e0e0');
    line(left, y, right, y);
  }
}

function plotData(left, top, right, bottom) {
  if (!dataPoints.length) {
    return;
  }
  const maxConc = 0.001;
  const maxAbs = 2.5;
  strokeWeight(0);
  fill('#4169E1');
  for (let i = 0; i < dataPoints.length; i += 1) {
    const x = map(dataPoints[i].conc, 0, maxConc, left, right);
    const y = map(dataPoints[i].absorb, 0, maxAbs, bottom, top);
    circle(x, y, 10);
  }
}

function plotRegressionLine(left, top, right, bottom) {
  if (regression.slope === 0 && regression.intercept === 0) {
    return;
  }
  const maxConc = 0.001;
  const maxAbs = 2.5;
  stroke('#FF4500');
  strokeWeight(2);
  const startY = regression.intercept;
  const endY = regression.slope * maxConc + regression.intercept;
  const x1 = map(0, 0, maxConc, left, right);
  const y1 = map(startY, 0, maxAbs, bottom, top);
  const x2 = map(maxConc, 0, maxConc, left, right);
  const y2 = map(endY, 0, maxAbs, bottom, top);
  line(x1, y1, x2, y2);
}

function drawCrosshair(left, top, right, bottom) {
  if (regression.slope === 0) {
    return;
  }
  const maxConc = 0.001;
  const maxAbs = 2.5;
  const predictedAbs = regression.slope * crosshairConc + regression.intercept;
  const clampedAbs = constrain(predictedAbs, 0, maxAbs);
  const x = map(crosshairConc, 0, maxConc, left, right);
  const y = map(clampedAbs, 0, maxAbs, bottom, top);
  stroke('#B22222');
  strokeWeight(1.5);
  line(x, top, x, bottom);
  line(left, y, right, y);
  fill('#B22222');
  noStroke();
  circle(x, y, 8);
}

function findUnknownConcentration() {
  const absorbValue = parseFloat(unknownAbsInput.value());
  if (isNaN(absorbValue) || regression.slope === 0) {
    unknownPoint = null;
    return;
  }
  const conc = (absorbValue - regression.intercept) / regression.slope;
  unknownPoint = {
    conc: max(0, conc),
    absorb: absorbValue
  };
}

function drawUnknownPoint(left, top, right, bottom) {
  if (!unknownPoint) {
    return;
  }
  const maxConc = 0.001;
  const maxAbs = 2.5;
  const x = map(unknownPoint.conc, 0, maxConc, left, right);
  const y = map(unknownPoint.absorb, 0, maxAbs, bottom, top);
  stroke('#2E8B57');
  strokeWeight(2);
  fill('#2E8B57');
  rectMode(CENTER);
  rect(x, y, 12, 12);
  rectMode(CORNER);
}

function drawInfoPanel() {
  const panelLeft = canvasWidth * 0.5 + margin;
  const panelTop = margin * 1.5 + titleOffset;
  const panelWidth = canvasWidth - panelLeft - margin;

  fill('#111111');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(20);
  text('Calibration Details', panelLeft, panelTop);

  textSize(14);
  const infoY = panelTop + 35;
  noStroke();
  text('Slope (epsilon * l): ' + regression.slope.toFixed(0) + ' L/mol·cm', panelLeft, infoY);
  noStroke();
  text('Intercept: ' + regression.intercept.toFixed(2), panelLeft, infoY + 22);
  noStroke();
  text('R^2: ' + regression.r2.toFixed(3), panelLeft, infoY + 44);
  const predictedAbs = regression.slope * crosshairConc + regression.intercept;
  noStroke();
  text('Crosshair concentration: ' + nf(crosshairConc, 0, 5) + ' mol/L', panelLeft, infoY + 70);
  noStroke();
  text('Predicted absorbance: ' + predictedAbs.toFixed(2), panelLeft, infoY + 92);

  if (unknownPoint) {
    noStroke();
    text('Unknown concentration: ' + unknownPoint.conc.toExponential(3) + ' mol/L', panelLeft, infoY + 120);
  } else {
    noStroke();
    text('Unknown concentration: --', panelLeft, infoY + 120);
  }

  textSize(13);
  const notesY = infoY + 160;
  noStroke();
  text('Notes:', panelLeft, notesY);
  noStroke();
  text('- Edit data table to see how poor points affect slope.', panelLeft, notesY + 18);
  noStroke();
  text('- Plot curve before solving for unknowns.', panelLeft, notesY + 34);
  noStroke();
  text('- The best-fit line uses least squares across all visible points.', panelLeft, notesY + 50);
}

function drawControlLabels() {
  fill('#111111');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  noStroke();
  text('Unknown absorbance A:', 10, drawHeight + 45);
  noStroke();
  text('Crosshair concentration (mol/L):', sliderLeftMargin - 230, drawHeight + 95);
  noStroke();
  text('Concentration (mol/L)', 10, drawHeight + 125);
  noStroke();
  text('Absorbance (A)', 250, drawHeight + 125);
}

function drawTitle() {
  fill('#111111');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(24);
  text(titleText, canvasWidth / 2, 10);
}
