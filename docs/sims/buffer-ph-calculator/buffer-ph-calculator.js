/*
  Buffer pH Interactive Calculator

  Layout per p5 guide:
    - drawHeight = 560 px (title, dual panels, number line)
    - controlHeight = 260 px (buffer selector, custom pKa input, slider rows)
    - Canvas background: aliceblue; control background: white
*/

let canvasWidth = 920;
let drawHeight = 420;
let controlHeight = 260;
let canvasHeight = drawHeight + controlHeight;
const margin = 20;

const bufferSystems = [
  { label: 'Acetate (pKa 4.74)', pKa: 4.74, id: 'acetate' },
  { label: 'Phosphate (pKa 7.21)', pKa: 7.21, id: 'phosphate' },
  { label: 'Ammonia (pKa 9.25)', pKa: 9.25, id: 'ammonia' },
  { label: 'Custom', pKa: 7.00, id: 'custom' }
];

let systemSelect;
let customInput;
let controlRows = [];
let haSlider, aSlider, targetSlider;
let haValueSpan, aValueSpan, targetValueSpan;

let selectedSystem = bufferSystems[0];
let currentPka = selectedSystem.pKa;
let haConc = 0.50;
let aConc = 0.50;
let targetPH = currentPka;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const main = document.querySelector('main');
  if (main) canvas.parent(main);
  textFont('Arial');
  createControls();
  describe('Calculate buffer pH from [HA]/[A-] or find ratio for a target pH using Henderson-Hasselbalch.');
}

function draw() {
  updateCanvasSize();

  // Draw background drawing area and control area
  fill('aliceblue')
  // Draw a light border around both the drawing and control areas
  stroke('sliver');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawTitle();
  drawPanels();
  drawNumberLine();
  positionControls();
}

function drawTitle() {
  fill('black');
  textAlign(CENTER, TOP);
  textSize(30);
  text('Buffer pH Interactive Calculator', canvasWidth / 2, 15);
}

function drawPanels() {
  const panelWidth = (canvasWidth - margin * 3) / 2;
  const panelHeight = 280;
  const panelY = 70;

  drawCompositionPanel(margin, panelY, panelWidth, panelHeight);
  drawTargetPanel(margin * 2 + panelWidth, panelY, panelWidth, panelHeight);
}

function drawCompositionPanel(x, y, width, height) {
  stroke('lightgray');
  fill('white');
  rect(x, y, width, height, 12);
  fill('black');
  textAlign(LEFT, TOP);
  textSize(16);
  text('Calculate pH from composition', x + 12, y + 12);

  const ratio = aConc / haConc;
  const ph = currentPka + log10(ratio);
  textSize(14);
  text(`Buffer system 1: ${selectedSystem.label}`, x + 12, y + 40);
  text(`[A⁻]/[HA] = ${ratio.toFixed(2)}`, x + 12, y + 68);

  fill(getPhColor(ph));
  textAlign(CENTER, CENTER);
  textSize(48);
  text(ph.toFixed(2), x + width / 2, y + height / 2 - 20);
  fill('black');
  textSize(16);
  text('pH', x + width / 2, y + height / 2 + 30);

  const barY = y + height - 60;
  const barWidth = width - 40;
  drawRatioBar(x + 20, barY, barWidth, 20, haConc, aConc);
}

function drawTargetPanel(x, y, width, height) {
  stroke('lightgray');
  fill('white');
  rect(x, y, width, height, 12);
  fill('black');
  textAlign(LEFT, TOP);
  textSize(16);
  text('Calculate ratio for target pH', x + 12, y + 12);

  const requiredRatio = pow(10, targetPH - currentPka);
  const molesNaohPerMolHa = requiredRatio - 1;
  textSize(14);
  text(`Target pH: ${targetPH.toFixed(2)}`, x + 12, y + 40);
  text(`[A⁻]/[HA] required = ${requiredRatio.toFixed(2)}`, x + 12, y + 64);
  text(`If starting with 1.00 mol HA, add ${max(molesNaohPerMolHa, 0).toFixed(2)} mol NaOH`, x + 12, y + 88);
  const rangeText = `Effective buffer range: ${ (currentPka - 1).toFixed(2)} to ${(currentPka + 1).toFixed(2)}`;
  text(rangeText, x + 12, y + 112);
  if (targetPH < currentPka - 1 || targetPH > currentPka + 1) {
    fill('firebrick');
    text('Warning: Target pH outside buffer range!', x + 12, y + 140);
  }
}

function drawRatioBar(x, y, width, height, ha, a) {
  const total = ha + a;
  const haWidth = (ha / total) * width;
  const aWidth = width - haWidth;
  fill('#F57C00');
  rect(x, y, haWidth, height, 6, 0, 0, 6);
  fill('#1976D2');
  rect(x + haWidth, y, aWidth, height, 0, 6, 6, 0);
  fill('black');
  textAlign(LEFT, TOP);
  text('HA', x, y + height + 4);
  textAlign(RIGHT, TOP);
  text('A⁻', x + width, y + height + 4);
}

function drawNumberLine() {
  const lineY = 380;
  const lineX = margin;
  const lineWidth = canvasWidth - margin * 2;
  stroke('lightgray');
  line(lineX, lineY, lineX + lineWidth, lineY);
  for (let ph = 0; ph <= 14; ph += 1) {
    const x = map(ph, 0, 14, lineX, lineX + lineWidth);
    stroke('lightgray');
    line(x, lineY - 8, x, lineY + 8);
    noStroke();
    fill('black');
    textAlign(CENTER, TOP);
    text(ph.toString(), x, lineY + 10);
  }
  const start = max(currentPka - 1, 0);
  const end = min(currentPka + 1, 14);
  const startX = map(start, 0, 14, lineX, lineX + lineWidth);
  const endX = map(end, 0, 14, lineX, lineX + lineWidth);
  fill('lightgreen');
  noStroke();
  rect(startX, lineY - 4, endX - startX, 8);
  stroke('black');
  line(map(currentPka, 0, 14, lineX, lineX + lineWidth), lineY - 12, map(currentPka, 0, 14, lineX, lineX + lineWidth), lineY + 12);
  noStroke();
  fill('black');
  textAlign(CENTER, BOTTOM);
  text(`pKa = ${currentPka.toFixed(2)}`, map(currentPka, 0, 14, lineX, lineX + lineWidth), lineY - 14);
}

function createControls() {

  // right side: buffer system select top selection list
  systemLabel = createSpan('Buffer system 2: ');
  styleLabel(systemLabel);
  // standard p5.js select element - we will populate options and handle changes manually
  systemSelect = createSelect();
  bufferSystems.forEach(function (system) {
    systemSelect.option(system.label, system.id);
  });
  systemSelect.changed(handleSystemChange);
  const systemRow = createSelectRow('Buffer system', systemSelect);

  customInput = createInput(currentPka.toFixed(2));
  customInput.attribute('type', 'number');
  customInput.attribute('step', '0.01');
  customInput.attribute('min', '1');
  customInput.attribute('max', '13');
  customInput.input(handleCustomChange);
  customRowRef = createSelectRow('Custom pKa', customInput);
  customRowRef.row.hide();

  const haControl = createSliderRow('Initial [HA] (M)', 0.01, 1.0, haConc, 0.01, function (value) {
    haConc = value;
  });
  haSlider = haControl.slider;
  haValueSpan = haControl.valueSpan;

  const aControl = createSliderRow('Initial [A⁻] (M)', 0.01, 1.0, aConc, 0.01, function (value) {
    aConc = value;
  });
  aSlider = aControl.slider;
  aValueSpan = aControl.valueSpan;

  const targetControl = createSliderRow('Target pH', currentPka - 2, currentPka + 2, targetPH, 0.05, function (value) {
    targetPH = value;
  });
  targetSlider = targetControl.slider;
  targetValueSpan = targetControl.valueSpan;

  updateSliderValues();
}

function createSliderRow(labelText, min, max, initial, step, callback) {
  const row = createControlRow(labelText);
  controlRows.push(row.row);
  const slider = createSlider(min, max, initial, step);
  slider.parent(row.slot);
  slider.size(260);
  slider.input(function () {
    row.value.html(slider.value().toFixed(2));
    callback(parseFloat(slider.value()));
  });
  row.value.html(initial.toFixed(2));
  return { slider, valueSpan: row.value, row: row.row };
}

function createSelectRow(labelText, element) {
  const row = createControlRow(labelText);
  controlRows.push(row.row);
  element.parent(row.slot);
  element.size(260);
  row.value.hide();
  return row;
}

function createControlRow(labelText) {
  const row = createDiv();
  row.style('display', 'inline-block');
  row.style('background', 'white');
  row.style('padding', '6px 10px');
  row.style('border-radius', '8px');
  row.style('box-shadow', '0 1px 3px rgba(0,0,0,0.12)');
  row.style('font-family', 'Arial, Helvetica, sans-serif');
  row.style('font-size', '14px');

  const labelSpan = createSpan(labelText + ': ');
  labelSpan.parent(row);
  styleLabel(labelSpan);

  const valueSpan = createSpan('');
  valueSpan.parent(row);
  styleValue(valueSpan);

  const slot = createDiv();
  slot.parent(row);
  slot.style('display', 'inline-block');
  slot.style('width', '260px');
  slot.style('margin-left', '12px');

  return { row, label: labelSpan, value: valueSpan, slot };
}

function positionControls() {
  const canvasEl = document.querySelector('main canvas');
  if (!canvasEl) return;
  const rect = canvasEl.getBoundingClientRect();
  const baseX = rect.left + window.scrollX + margin;
  const baseY = rect.top + window.scrollY + drawHeight + 20;
  const spacing = 70;

  controlRows.forEach(function (row, index) {
    row.position(baseX, baseY + index * spacing);
  });
}

function handleSystemChange() {
  const id = systemSelect.value();
  selectedSystem = bufferSystems.find(function (sys) { return sys.id === id; }) || bufferSystems[0];
  if (selectedSystem.id === 'custom') {
    customRowRef.row.show();
  } else {
    customRowRef.row.hide();
    currentPka = selectedSystem.pKa;
    targetSlider.attribute('min', currentPka - 2);
    targetSlider.attribute('max', currentPka + 2);
    targetPH = currentPka;
  }
  updateSliderValues();
}

function handleCustomChange() {
  const value = parseFloat(customInput.value());
  if (!Number.isFinite(value)) return;
  currentPka = constrain(value, 1, 13);
  targetSlider.attribute('min', currentPka - 2);
  targetSlider.attribute('max', currentPka + 2);
  targetPH = currentPka;
  updateSliderValues();
}

function updateSliderValues() {
  haValueSpan.html(haConc.toFixed(2));
  aValueSpan.html(aConc.toFixed(2));
  targetSlider.value(targetPH);
  targetValueSpan.html(targetPH.toFixed(2));
  customInput.value(currentPka.toFixed(2));
}

function styleLabel(el) {
  el.style('display', 'inline-block');
  el.style('width', '140px');
  el.style('font-weight', '600');
}

function styleValue(el) {
  el.style('display', 'inline-block');
  el.style('width', '50px');
  el.style('font-weight', '600');
}

function log10(value) {
  return Math.log(value) / Math.log(10);
}

function getGradientColor(pct) {
  // the lerpColor function is a built-in p5 function that interpolates between two colors based on a percentage (0 to 1)
  return lerpColor(color('crimson'), color('purple'), pct);
}

function getPhColor(phValue) {
  return getGradientColor(constrain(phValue / 14, 0, 1));
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
  canvasHeight = drawHeight + controlHeight;
}