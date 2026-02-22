/*
  Hess's Law Pathway Visualizer MicroSim
  Step 2.5 planning:
  - Control rows (slider alignment template) beneath drawing area:
      1. Dropdown for example selection
      2. Slider for step scaling (multiplies step enthalpies)
      3. Checkbox to animate alternate path
  - Layout: drawHeight = 480, controlHeight = 220
*/

let canvasWidth = 800;
let drawHeight = 480;
let controlHeight = 220;
let canvasHeight = drawHeight + controlHeight;
const titleText = "Hess's Law Pathway Visualizer";

let exampleSelect;
let adjustSlider;
let arrowCheckbox;
let controlRows = [];

const examples = {
  carbonCombustion: {
    label: 'C + O₂ → CO + ½O₂',
    steps: [
      { label: 'C + O₂ → CO₂', delta: -393 },
      { label: 'CO₂ → CO + ½O₂', delta: 283 }
    ],
    direct: { label: 'C + O₂ → CO + ½O₂', delta: -110 },
    levels: ['C + O₂', 'CO₂', 'CO + ½O₂']
  },
  waterFormation: {
    label: 'H₂ + ½O₂ → H₂O(l)',
    steps: [
      { label: 'H₂ + ½O₂ → H₂O(g)', delta: -242 },
      { label: 'H₂O(g) → H₂O(l)', delta: -44 }
    ],
    direct: { label: 'H₂ + ½O₂ → H₂O(l)', delta: -286 },
    levels: ['H₂ + ½O₂', 'H₂O(g)', 'H₂O(l)']
  }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const main = document.querySelector('main');
  if (main) canvas.parent(main);
  textFont('Arial');
  createControls();
  describe('Compare direct and multi-step pathways to verify Hess\'s Law (same total ΔH).', "Hess's Law Pathway Visualizer");
}

function draw() {
  updateCanvasSize();
  positionControlRows();
  background('#ffffff');
  fill('aliceblue');
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);
  fill('#ffffff');
  rect(0, drawHeight, canvasWidth, controlHeight);
  drawTitle();
  drawDiagram();
  drawFooter();
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
  canvasHeight = drawHeight + controlHeight;
}

function createControls() {
  createControlRows();
  exampleSelect = createSelect();
  Object.entries(examples).forEach(([key, ex]) => exampleSelect.option(ex.label, key));
  exampleSelect.parent(controlRows[0].row);
  exampleSelect.changed(redraw);

  adjustSlider = createSlider(0.5, 1.5, 1, 0.01);
  adjustSlider.parent(controlRows[1].row);
  styleSlider(adjustSlider);
  adjustSlider.input(redraw);

  arrowCheckbox = createCheckbox('Animate alternate path', false);
  arrowCheckbox.parent(controlRows[2].row);
  arrowCheckbox.changed(redraw);
}

function createControlRows() {
  const labels = ['Reaction example', 'Step multiplier', 'Animation'];
  controlRows = labels.map(label => {
    const row = createDiv();
    row.style('display', 'inline-block');
    row.style('background', '#ffffff');
    row.style('padding', '4px 8px');
    row.style('border-radius', '6px');
    row.style('box-shadow', '0 1px 3px rgba(0,0,0,0.1)');
    row.style('font-family', 'Arial, Helvetica, sans-serif');
    const labelSpan = createSpan(label + ': ');
    labelSpan.parent(row);
    styleLabel(labelSpan);
    const valueSpan = createSpan('');
    valueSpan.parent(row);
    styleValue(valueSpan);
    return { row, value: valueSpan };
  });
}

function styleLabel(el) {
  el.style('display', 'inline-block');
  el.style('min-width', '220px');
  el.style('font-weight', '600');
}

function styleValue(el) {
  el.style('display', 'inline-block');
  el.style('min-width', '80px');
}

function styleSlider(slider) {
  slider.style('width', '240px');
  slider.style('margin-left', '12px');
}

function positionControlRows() {
  const canvasEl = document.querySelector('main canvas');
  if (!canvasEl) return;
  const rect = canvasEl.getBoundingClientRect();
  const baseX = rect.left + window.scrollX + 20;
  const baseY = rect.top + window.scrollY + drawHeight + 20;
  controlRows.forEach((entry, idx) => entry.row.position(baseX, baseY + idx * 45));
}

function drawTitle() {
  fill('#111111');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(26);
  text(titleText, canvasWidth / 2, 10);
}

function drawDiagram() {
  const ex = examples[exampleSelect.value()];
  if (!ex) return;
  const multiplier = adjustSlider.value();
  const startX = 120;
  const baseY = 120;
  const step = 140;

  fill('#ffffff');
  stroke('#CFD8DC');
  rect(startX - 40, baseY - 60, canvasWidth - (startX - 40) * 2, step * 2 + 140, 12);

  drawPlatform(startX, baseY, ex.levels[0]);
  drawPlatform(startX, baseY + step * 2, ex.levels[2]);
  drawPlatform(startX, baseY + step, ex.levels[1]);

  const midX = canvasWidth / 2;
  const rightX = canvasWidth - startX - 100;
  drawArrow(startX + 40, baseY, rightX, baseY + step * 2, '#1565C0', `Direct: ${ex.direct.delta} kJ`);
  drawArrow(startX + 60, baseY, midX, baseY + step, '#E53935', `${ex.steps[0].delta * multiplier < 0 ? '' : '+'}${(ex.steps[0].delta * multiplier).toFixed(0)} kJ`);
  drawArrow(midX, baseY + step, rightX, baseY + step * 2, '#E53935', `${ex.steps[1].delta * multiplier < 0 ? '' : '+'}${(ex.steps[1].delta * multiplier).toFixed(0)} kJ`);

  const totalSteps = (ex.steps[0].delta + ex.steps[1].delta) * multiplier;
  fill('#111111');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  text(`Total multi-step ΔH = ${totalSteps.toFixed(0)} kJ`, canvasWidth / 2, baseY - 30);

  if (arrowCheckbox.checked()) animateAlternate(startX + 60, baseY, midX, baseY + step, rightX, baseY + step * 2);
}

function drawPlatform(x, y, label) {
  fill('#ECEFF1');
  stroke('#B0BEC5');
  rect(x, y - 10, canvasWidth - x * 2, 20, 6);
  fill('#111111');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text(label, x + 10, y + 4);
}

function drawArrow(x1, y1, x2, y2, colorVal, label) {
  stroke(colorVal);
  strokeWeight(2);
  line(x1, y1, x2, y2);
  drawArrowHead(x2, y2, atan2(y2 - y1, x2 - x1));
  fill(colorVal);
  noStroke();
  textAlign(CENTER, CENTER);
  text(label, (x1 + x2) / 2, (y1 + y2) / 2 - 20);
}

function drawArrowHead(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);
  triangle(0, 0, -8, 12, 8, 12);
  pop();
}

function animateAlternate(x1, y1, midX, midY, x2, y2) {
  const t = (sin(frameCount * 0.02) + 1) / 2;
  if (t < 0.5) {
    const localT = t * 2;
    const x = lerp(x1, midX, localT);
    const y = lerp(y1, midY, localT);
    drawParticle(x, y);
  } else {
    const localT = (t - 0.5) * 2;
    const x = lerp(midX, x2, localT);
    const y = lerp(midY, y2, localT);
    drawParticle(x, y);
  }
}

function drawParticle(x, y) {
  fill('#00BCD4');
  noStroke();
  circle(x, y, 14);
}

function drawFooter() {
  fill('#111111');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(15);
  text('Hess\'s Law: sum of steps matches the direct ΔH regardless of pathway.', canvasWidth / 2, drawHeight + controlHeight - 20);
}
