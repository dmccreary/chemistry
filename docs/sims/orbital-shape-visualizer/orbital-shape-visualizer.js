// Interactive Orbital Shape Visualizer MicroSim
// Visualizes s, p, and d orbitals with adjustable quantum numbers.

let canvasWidth = 960;
const drawHeight = 520;
const controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
const leftPanelWidth = 300;
const rightPanelWidth = () => canvasWidth - leftPanelWidth;

let parentEl;
let subshellSelect;
let orientationSelect;
let nSlider;

let selectedSubshell = 's';
let selectedOrientation = 's';
let principalN = 1;

const ORIENTATIONS = {
  s: ['s'],
  p: ['px', 'py', 'pz'],
  d: ['dxy', 'dxz', 'dyz', 'dx2-y2', 'dz2']
};

function setup() {
  parentEl = document.querySelector('main');
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(parentEl);

  subshellSelect = createSelect();
  ['s', 'p', 'd'].forEach(option => subshellSelect.option(option));
  subshellSelect.changed(() => {
    selectedSubshell = subshellSelect.value();
    updateOrientationSelect();
  });

  orientationSelect = createSelect();
  updateOrientationSelect();

  nSlider = createSlider(1, 4, 1, 1);
  nSlider.input(() => principalN = nSlider.value());

  positionControls();
}

function updateOrientationSelect() {
  const orientations = ORIENTATIONS[selectedSubshell];
  orientationSelect.html('');
  orientations.forEach(opt => orientationSelect.option(opt));
  orientationSelect.value(orientations[0]);
  selectedOrientation = orientationSelect.value();
}

function updateCanvasSize() {
  const containerWidth = parentEl ? parentEl.clientWidth : window.innerWidth || canvasWidth;
  const targetWidth = max(containerWidth, 720);
  if (abs(targetWidth - canvasWidth) > 5) {
    canvasWidth = targetWidth;
    canvasHeight = drawHeight + controlHeight;
    resizeCanvas?.(canvasWidth, canvasHeight);
    positionControls();
  }
}

function positionControls() {
  const baseY = drawHeight + 15;
  subshellSelect.position(20, baseY);
  orientationSelect.position(150, baseY);
  nSlider.position(320, baseY + 5);
}

function draw() {
  updateCanvasSize();
  principalN = nSlider.value();
  selectedOrientation = orientationSelect.value();

  noStroke();
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);

  fill('#f8fbff');
  rect(0, 0, leftPanelWidth, drawHeight);
  drawControlPanel();

  drawOrbitalVisualization();

  fill('#ffffff');
  rect(0, drawHeight, canvasWidth, controlHeight);
  stroke('#d7e1f5');
  line(0, drawHeight, canvasWidth, drawHeight);
}

function drawControlPanel() {
  const padding = 24;
  fill('#073b4c');
  textSize(22);
  textStyle(BOLD);
  text('Orbital Controls', padding, 40);

  textSize(14);
  textStyle(NORMAL);
  fill('#0d3a5f');
  text('Subshell Type (l)', padding, 80);

  text(`Orientation`, padding, 130);
  if (selectedSubshell === 's') {
    fill('#5c6c7c');
    text('(only one orientation)', padding, 150);
  }

  fill('#0d3a5f');
  text(`Principal Quantum Number (n): ${principalN}`, padding, 200);

  drawLegend(padding, 240);

  fill('#0d3a5f');
  text(`Text overlay:`, padding, drawHeight - 140);
  text(`n = ${principalN}`, padding, drawHeight - 120);
  text(`Subshell: ${selectedSubshell}`, padding, drawHeight - 100);
  const count = selectedSubshell === 's' ? 1 : selectedSubshell === 'p' ? 3 : 5;
  text(`# of orbitals: ${count}`, padding, drawHeight - 80);
}

function drawLegend(x, y) {
  const width = leftPanelWidth - 2 * x;
  const height = 80;
  for (let i = 0; i <= width; i++) {
    const t = i / width;
    const col = viridis(t);
    stroke(col);
    line(x + i, y, x + i, y + height);
  }
  noStroke();
  fill('#f8fbff');
  textSize(12);
  text('Low probability', x, y + height + 16);
  textAlign(RIGHT, TOP);
  text('High probability', x + width, y + height + 16);
  textAlign(LEFT, BASELINE);
}

function drawOrbitalVisualization() {
  const visualX = leftPanelWidth;
  const visualWidth = rightPanelWidth();
  push();
  translate(visualX, 0);
  fill('#0f1625');
  rect(0, 0, visualWidth, drawHeight);
  drawAxes(visualWidth);

  const centerX = visualWidth / 2;
  const centerY = drawHeight / 2;
  const maxRadius = min(visualWidth, drawHeight) * 0.35;

  const sampleCount = 140;
  for (let i = 0; i < sampleCount; i++) {
    for (let j = 0; j < sampleCount; j++) {
      const xNorm = map(i, 0, sampleCount - 1, -1, 1);
      const yNorm = map(j, 0, sampleCount - 1, -1, 1);
      const prob = orbitalProbability(xNorm, yNorm);
      if (prob <= 0) continue;
      const col = viridis(prob);
      stroke(col);
      point(centerX + xNorm * maxRadius, centerY + yNorm * maxRadius);
    }
  }

  fill('#d7263d');
  noStroke();
  circle(centerX, centerY, 8);

  fill('#cfd6e6');
  textAlign(CENTER, TOP);
  textSize(16);
  text(`n = ${principalN}, ${selectedSubshell} orbital (${selectedOrientation})`, visualWidth / 2, 20);
  pop();
}

function drawAxes(width) {
  stroke('#1f2f46');
  strokeWeight(1);
  line(width / 2, 20, width / 2, drawHeight - 20);
  line(20, drawHeight / 2, width - 20, drawHeight / 2);
  fill('#9fb3c8');
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('x (Bohr radii)', width / 2, drawHeight - 18);
  push();
  translate(30, drawHeight / 2);
  rotate(-HALF_PI);
  text('y (Bohr radii)', 0, 0);
  pop();
}

function orbitalProbability(x, y) {
  const r = sqrt(x * x + y * y) * (principalN / 2);
  if (r > 1.2) return 0;
  switch (selectedSubshell) {
    case 's':
      return sProbability(r);
    case 'p':
      return pProbability(x, y, selectedOrientation);
    case 'd':
      return dProbability(x, y, selectedOrientation);
    default:
      return 0;
  }
}

function sProbability(r) {
  const radial = exp(-3 * r / principalN) * (1 - 0.5 * r);
  return constrain(radial, 0, 1);
}

function pProbability(x, y, orientation) {
  const axis = orientation.charAt(1); // x or y or z (mapped to x,y)
  const component = axis === 'x' ? x : axis === 'y' ? y : (x + y) / sqrt(2);
  const radial = exp(-2.5 * sqrt(x * x + y * y));
  const prob = abs(component) * radial;
  return constrain(prob, 0, 1);
}

function dProbability(x, y, orientation) {
  const r = sqrt(x * x + y * y);
  let value = 0;
  switch (orientation) {
    case 'dxy':
      value = abs(x * y);
      break;
    case 'dxz':
      value = abs(x * (x + y) / sqrt(2));
      break;
    case 'dyz':
      value = abs(y * (x + y) / sqrt(2));
      break;
    case 'dx2-y2':
      value = abs(x * x - y * y);
      break;
    case 'dz2':
      value = abs(2 * (x + y) ** 2 - x * x - y * y);
      break;
  }
  const radial = exp(-2 * r);
  return constrain(value * radial * 2, 0, 1);
}

function viridis(t) {
  const colors = [
    [68, 1, 84],
    [59, 82, 139],
    [33, 145, 140],
    [94, 201, 98],
    [253, 231, 37]
  ];
  const scaled = constrain(t, 0, 1) * (colors.length - 1);
  const i = floor(scaled);
  const frac = scaled - i;
  const c1 = colors[i];
  const c2 = colors[min(i + 1, colors.length - 1)];
  return color(
    lerp(c1[0], c2[0], frac),
    lerp(c1[1], c2[1], frac),
    lerp(c1[2], c2[2], frac)
  );
}
