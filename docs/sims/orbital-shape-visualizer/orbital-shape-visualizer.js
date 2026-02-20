// Interactive Orbital Shape Visualizer MicroSim
// Rewritten to follow the p5.js MicroSim guide exactly.

let containerWidth;
let canvasWidth = 860;
let drawHeight = 520;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

const margin = 20;
const sliderLeftMargin = 260;
const defaultTextSize = 16;

let subshellSelect;
let orientationSelect;
let nSlider;

let selectedSubshell = 's';
let selectedOrientation = 's';
let principalN = 1;

const ORIENTATION_OPTIONS = {
  s: ['s'],
  p: ['px', 'py', 'pz'],
  d: ['dxy', 'dxz', 'dyz', 'dx2-y2', 'dz2']
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  subshellSelect = createSelect();
  subshellSelect.option('s');
  subshellSelect.option('p');
  subshellSelect.option('d');
  subshellSelect.changed(handleSubshellChange);

  orientationSelect = createSelect();
  orientationSelect.changed(handleOrientationChange);

  nSlider = createSlider(1, 4, 1, 1);

  updateOrientationOptions();
  positionControls();

  describe('Interactive orbital probability visualizer showing s, p, and d orbitals with adjustable quantum number.', LABEL);
}

function draw() {
  updateCanvasSize();
  principalN = nSlider.value();
  selectedOrientation = orientationSelect.value();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawInformationPanel();
  drawVisualization();
  drawControlLabels();
}

function drawInformationPanel() {
  const panelWidth = 280;
  fill('#f3f6ff');
  noStroke();
  rect(0, 0, panelWidth, drawHeight);

  fill('#073b4c');
  textSize(22);
  textAlign(LEFT, TOP);
  text('Orbital Controls', margin, margin);

  textSize(defaultTextSize);
  text('Subshell type (l): ' + selectedSubshell, margin, margin + 40);
  text('Orientation: ' + selectedOrientation, margin, margin + 70);
  text('Principal quantum number (n): ' + principalN, margin, margin + 100);

  fill('#1c2a44');
  text("Legend: probability density", margin, margin + 150);
  const legendY = margin + 180;
  const legendWidth = panelWidth - margin * 2;
  const legendHeight = 90;
  for (let i = 0; i < legendWidth; i++) {
    const t = i / (legendWidth - 1);
    stroke(viridisColor(t));
    line(margin + i, legendY, margin + i, legendY + legendHeight);
  }
  noStroke();
  fill('#0c223a');
  textSize(12);
  text('Low', margin, legendY + legendHeight + 14);
  textAlign(RIGHT, TOP);
  text('High', margin + legendWidth, legendY + legendHeight + 14);
  textAlign(LEFT, BASELINE);

  fill('#0c223a');
  textSize(14);
  text('Nucleus shown as red dot', margin, drawHeight - 80);
  text('Right panel axes in Bohr radii', margin, drawHeight - 55);
}

function drawVisualization() {
  const panelWidth = 280;
  const vizWidth = canvasWidth - panelWidth;
  push();
  translate(panelWidth, 0);

  fill('#0d1529');
  rect(0, 0, vizWidth, drawHeight);

  drawAxes(vizWidth);
  drawProbabilityGrid(vizWidth);

  fill('#d7263d');
  noStroke();
  const centerX = vizWidth / 2;
  const centerY = drawHeight / 2;
  circle(centerX, centerY, 10);

  fill('#cfd6e6');
  textSize(18);
  textAlign(CENTER, TOP);
  text('Probability density cross-section', vizWidth / 2, margin / 2);
  text(`n = ${principalN}, subshell ${selectedSubshell} (${selectedOrientation})`, vizWidth / 2, margin / 2 + 24);
  pop();
}

function drawAxes(vizWidth) {
  stroke('#243550');
  strokeWeight(1);
  const centerX = vizWidth / 2;
  const centerY = drawHeight / 2;
  line(centerX, margin, centerX, drawHeight - margin);
  line(margin, centerY, vizWidth - margin, centerY);

  noStroke();
  fill('#8aaecd');
  textSize(12);
  textAlign(CENTER, TOP);
  text('x (Bohr radii)', centerX, drawHeight - margin + 4);
  push();
  translate(margin / 2 + 5, centerY);
  rotate(-HALF_PI);
  text('y (Bohr radii)', 0, 0);
  pop();
}

function drawProbabilityGrid(vizWidth) {
  const centerX = vizWidth / 2;
  const centerY = drawHeight / 2;
  const radius = min(vizWidth, drawHeight) * (0.28 + principalN * 0.12);
  const samples = 140;

  strokeWeight(1);
  for (let i = 0; i < samples; i++) {
    for (let j = 0; j < samples; j++) {
      const xNorm = map(i, 0, samples - 1, -1, 1);
      const yNorm = map(j, 0, samples - 1, -1, 1);
      const prob = orbitalProbability(xNorm, yNorm);
      if (prob <= 0) {
        continue;
      }
      stroke(viridisColor(prob));
      point(centerX + xNorm * radius, centerY + yNorm * radius);
    }
  }
}

function drawControlLabels() {
  const baseY = drawHeight + 56;
  fill('black');
  noStroke();
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Subshell:', 20, baseY);
  text('Orientation:', 140, baseY);
  text(`Principal Quantum Number n: ${principalN}`, sliderLeftMargin - 180, baseY);
}

function handleSubshellChange() {
  selectedSubshell = subshellSelect.value();
  updateOrientationOptions();
}

function handleOrientationChange() {
  selectedOrientation = orientationSelect.value();
}

function updateOrientationOptions() {
  const options = ORIENTATION_OPTIONS[selectedSubshell];
  orientationSelect.html('');
  for (let i = 0; i < options.length; i++) {
    orientationSelect.option(options[i]);
  }
  orientationSelect.value(options[0]);
  selectedOrientation = options[0];
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  positionControls();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
  canvasHeight = drawHeight + controlHeight;
  containerHeight = canvasHeight;
}

function positionControls() {
  const baseY = drawHeight + 34;
  if (subshellSelect) {
    subshellSelect.position(20, baseY - 18);
  }
  if (orientationSelect) {
    orientationSelect.position(140, baseY - 18);
  }
  if (nSlider) {
    nSlider.position(sliderLeftMargin, baseY - 24);
    nSlider.size(canvasWidth - sliderLeftMargin - margin);
  }
}

function orbitalProbability(x, y) {
  const r = sqrt(x * x + y * y);
  let probability = 0;
  if (selectedSubshell === 's') {
    probability = sProbability(r);
  } else if (selectedSubshell === 'p') {
    probability = pProbability(x, y, selectedOrientation);
  } else {
    probability = dProbability(x, y, selectedOrientation);
  }
  return constrain(probability, 0, 1);
}

function sProbability(r) {
  const sizeScale = exp(-2.3 * r * principalN) * (1 + principalN * 0.1);
  const radialTerm = pow(max(0.0001, 1 - r), principalN);
  return sizeScale * radialTerm;
}

function pProbability(x, y, orientation) {
  const axis = orientation.charAt(1);
  let directionValue = 0;
  if (axis === 'x') {
    directionValue = x;
  } else if (axis === 'y') {
    directionValue = y;
  } else {
    directionValue = (x + y) / sqrt(2);
  }
  const radial = exp(-1.8 * sqrt(x * x + y * y) * principalN);
  return abs(directionValue) * radial * (0.8 + 0.2 * principalN);
}

function dProbability(x, y, orientation) {
  const r = sqrt(x * x + y * y);
  let value = 0;
  if (orientation === 'dxy') {
    value = abs(x * y);
  } else if (orientation === 'dxz') {
    value = abs(x * (x + y));
  } else if (orientation === 'dyz') {
    value = abs(y * (x + y));
  } else if (orientation === 'dx2-y2') {
    value = abs(x * x - y * y);
  } else {
    value = abs(2 * (x + y) * (x + y) - x * x - y * y);
  }
  const radial = exp(-1.4 * r * principalN) * (1 + 0.3 * principalN);
  return value * radial;
}

function viridisColor(t) {
  const palette = [
    [68, 1, 84],
    [59, 82, 139],
    [33, 145, 140],
    [94, 201, 98],
    [253, 231, 37]
  ];
  const value = constrain(t, 0, 1) * (palette.length - 1);
  const index = floor(value);
  const fraction = value - index;
  const start = palette[index];
  const end = palette[min(index + 1, palette.length - 1)];
  const r = lerp(start[0], end[0], fraction);
  const g = lerp(start[1], end[1], fraction);
  const b = lerp(start[2], end[2], fraction);
  return color(r, g, b);
}
