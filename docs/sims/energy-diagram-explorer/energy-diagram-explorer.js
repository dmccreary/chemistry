/*
  Energy Diagram Explorer MicroSim
  Step 2.5 planning:
  - Control rows (slider alignment template) beneath drawing area:
      1. Radio buttons for exothermic/endothermic toggle
      2. Slider for activation energy Ea
      3. Slider for enthalpy change ΔH (sign flips with mode)
      4. Checkbox for catalyst
  - Layout: drawHeight 460, controlHeight 240
*/

let canvasWidth = 800;
let drawHeight = 460;
let controlHeight = 280;
let canvasHeight = drawHeight + controlHeight;
const titleText = 'Interactive Exothermic & Endothermic Energy Diagrams';

let modeRadio;
let eaSlider;
let dhSlider;
let catalystCheckbox;
let controlRows = [];
let instructionsRow;

const reactantEnergy = 200;
const baseRange = 450;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const main = document.querySelector('main');
  if (main) canvas.parent(main);
  textFont('Arial');
  createControls();
  describe('Adjust activation energy, ΔH, and catalyst effect for exothermic vs. endothermic energy diagrams.', 'Energy Diagram Explorer');
}

function draw() {
  updateCanvasSize();
  positionControlRows();
  background('#ffffff');
  noStroke();
  fill('aliceblue');
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

  modeRadio = createRadio();
  modeRadio.option('Exothermic', 'exo');
  modeRadio.option('Endothermic', 'endo');
  modeRadio.value('exo');
  modeRadio.parent(controlRows[0].row);
  modeRadio.changed(() => updateControlValues());

  eaSlider = createSlider(60, 240, 150, 1);
  eaSlider.parent(controlRows[1].row);
  styleSlider(eaSlider);
  eaSlider.input(updateControlValues);

  dhSlider = createSlider(40, 200, 120, 1);
  dhSlider.parent(controlRows[2].row);
  styleSlider(dhSlider);
  dhSlider.input(updateControlValues);

  catalystCheckbox = createCheckbox('Show catalyst', false);
  catalystCheckbox.parent(controlRows[3].row);
  catalystCheckbox.changed(updateControlValues);

  updateControlValues();
}

function createControlRows() {
  const labels = ['Reaction Type', 'Activation Energy Ea (kJ/mol)', 'Enthalpy ΔH (|kJ/mol|)', 'Catalyst'];
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
  instructionsRow = createDiv();
  instructionsRow.style('display', 'inline-block');
  instructionsRow.style('background', '#ffffff');
  instructionsRow.style('padding', '4px 8px');
  instructionsRow.style('border-radius', '6px');
  instructionsRow.style('box-shadow', '0 1px 3px rgba(0,0,0,0.1)');
  instructionsRow.style('font-family', 'Arial, Helvetica, sans-serif');
  const instructionsText = createSpan('Use the toggles and sliders to compare Ea and ΔH, then enable the catalyst to lower Ea.');
  instructionsText.parent(instructionsRow);
  instructionsText.style('font-weight', '600');
  instructionsText.style('display', 'inline-block');
  instructionsText.style('min-width', '600px');
}

function styleLabel(el) {
  el.style('display', 'inline-block');
  el.style('min-width', '200px');
  el.style('font-weight', '600');
}

function styleValue(el) {
  el.style('display', 'inline-block');
  el.style('min-width', '100px');
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
  const baseY = rect.top + window.scrollY + drawHeight + 15;
  controlRows.forEach((entry, idx) => {
    entry.row.position(baseX, baseY + idx * 45);
  });
  if (instructionsRow) {
    instructionsRow.position(baseX, baseY + controlRows.length * 45 + 12);
  }
}

function updateControlValues() {
  if (!controlRows.length) return;
  controlRows[1].value.html(nf(eaSlider.value(), 0, 0));
  controlRows[2].value.html((modeRadio.value() === 'exo' ? '-' : '+') + nf(dhSlider.value(), 0, 0));
}

function drawTitle() {
  fill('#111111');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(24);
  text(titleText, canvasWidth / 2, 10);
}

function drawDiagram() {
  const startX = margin();
  const endX = canvasWidth - margin();
  const baseY = drawHeight - 80;
  const energyToY = energy => map(energy, 0, baseRange, baseY, margin() + 40);

  const mode = modeRadio.value();
  const delta = dhSlider.value() * (mode === 'exo' ? -1 : 1);
  const productEnergy = reactantEnergy + delta;
  const peakEnergy = reactantEnergy + eaSlider.value();
  const catalystPeak = catalystCheckbox.checked() ? reactantEnergy + eaSlider.value() * 0.6 : null;

  stroke('#B0BEC5');
  strokeWeight(1);
  drawingContext.setLineDash([6, 6]);
  line(startX, energyToY(reactantEnergy), endX, energyToY(reactantEnergy));
  line(startX, energyToY(productEnergy), endX, energyToY(productEnergy));
  line(startX, energyToY(peakEnergy), endX, energyToY(peakEnergy));
  if (catalystPeak) line(startX, energyToY(catalystPeak), endX, energyToY(catalystPeak));
  drawingContext.setLineDash([]);

  drawEnergyCurve(startX, endX, reactantEnergy, peakEnergy, productEnergy, '#1A73E8');
  if (catalystPeak) {
    drawEnergyCurve(startX, endX, reactantEnergy, catalystPeak, productEnergy, '#2E7D32');
  }

  drawEaArrow(startX + 40, energyToY(reactantEnergy), energyToY(peakEnergy));
  drawDeltaArrow(endX - 60, energyToY(reactantEnergy), energyToY(productEnergy), mode);

  fill('#111111');
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  text('Reactants', startX + 10, energyToY(reactantEnergy) - 10);
  text('Products', endX - 110, energyToY(productEnergy) + 15);
  textAlign(CENTER, BOTTOM);
  text('Transition State', lerp(startX, endX, 0.5), energyToY(peakEnergy) - 10);

  drawValueBox(reactantEnergy, productEnergy, peakEnergy, delta);
}

function margin() {
  return 40;
}

function drawEnergyCurve(startX, endX, react, peak, product, colorVal) {
  noFill();
  stroke(colorVal);
  strokeWeight(3);
  beginShape();
  for (let i = 0; i <= 200; i += 1) {
    const t = i / 200;
    const x = lerp(startX, endX, t);
    const energy = react + (peak - react) * sin(PI * t) + (product - react) * t;
    const y = map(energy, 0, baseRange, drawHeight - 80, margin() + 40);
    vertex(x, y);
  }
  endShape();
}

function drawEaArrow(x, yReact, yPeak) {
  stroke('#C62828');
  strokeWeight(2);
  line(x, yReact, x, yPeak);
  drawArrowHead(x, yReact, -PI / 2);
  drawArrowHead(x, yPeak, PI / 2);
  fill('#C62828');
  noStroke();
  textAlign(CENTER, CENTER);
  text('Ea', x, (yReact + yPeak) / 2);
}

function drawDeltaArrow(x, yReact, yProduct, mode) {
  const colorVal = mode === 'exo' ? '#E53935' : '#1E88E5';
  stroke(colorVal);
  strokeWeight(2);
  line(x, yReact, x, yProduct);
  drawArrowHead(x, yReact, -PI / 2);
  drawArrowHead(x, yProduct, PI / 2);
  fill(colorVal);
  noStroke();
  textAlign(CENTER, CENTER);
  text('ΔH', x - 5, (yReact + yProduct) / 2);
}

function drawArrowHead(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);
  triangle(0, 0, -6, 10, 6, 10);
  pop();
}

function drawValueBox(reactEnergy, productEnergy, peakEnergy, delta) {
  const boxWidth = 180;
  const boxHeight = 70;
  const x = canvasWidth - boxWidth - 20;
  const y = margin() + 20;
  fill('#ffffff');
  stroke('#B0BEC5');
  rect(x, y, boxWidth, boxHeight, 8);
  fill('#111111');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);
  text('Ea: ' + nf(peakEnergy - reactEnergy, 0, 0) + ' kJ/mol', x + 10, y + 10);
  text('ΔH: ' + nf(delta, 0, 0) + ' kJ/mol', x + 10, y + 30);
  text('Mode: ' + (modeRadio.value() === 'exo' ? 'Exothermic' : 'Endothermic'), x + 10, y + 50);
}

function drawFooter() {
  fill('#111111');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(15);
  text('Catalysts lower Ea but not ΔH. Toggle modes and sliders to explore energy profiles.', canvasWidth / 2, drawHeight + controlHeight - 20);
}
