/*
  Buffer pH Interactive Calculator
  - drawHeight = 540 px (title, two panels, number line)
  - controlHeight = 240 px (four aligned control rows beneath the drawing area)
  - Canvas background: aliceblue; control background: white
*/

let canvasWidth = 920;
const drawHeight = 540;
const controlHeight = 240;
let canvasHeight = drawHeight + controlHeight;
const margin = 24;
const sliderLeftMargin = 220;
const controlRowSpacing = 65;

const bufferSystems = [
  { id: 'acetate', label: 'Acetate (pKa 4.74)', pKa: 4.74 },
  { id: 'phosphate', label: 'Phosphate (pKa 7.21)', pKa: 7.21 },
  { id: 'ammonia', label: 'Ammonia (pKa 9.25)', pKa: 9.25 },
  { id: 'custom', label: 'Custom system', pKa: 7.00 }
];

let currentSystem = bufferSystems[0];
let currentPka = currentSystem.pKa;
let customPka = 7.00;

let haConc = 0.50;
let aConc = 0.50;
let targetPh = currentPka;

let systemSelect;
let customPkaInput;
let haSlider;
let aSlider;
let targetSlider;

let systemValueSpan;
let haValueSpan;
let aValueSpan;
let targetValueSpan;

const controlRows = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const main = document.querySelector('main');
  if (main) {
    canvas.parent(main);
  }
  textFont('Arial, Helvetica, sans-serif');
  createControls();
  updateControlDisplays();
  describe('Adjust buffer composition and target pH with Henderson-Hasselbalch visual cues.');
}

function draw() {
  updateCanvasSize();
  background('aliceblue');
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  noStroke();

  drawTitle();
  drawPanels();
  drawNumberLine();
  positionControls();
}

function drawTitle() {
  drawText('Buffer pH Interactive Calculator', canvasWidth / 2, 18, CENTER, TOP, 30, '#000000');
}

function drawPanels() {
  const panelWidth = (canvasWidth - margin * 3) / 2;
  const panelHeight = 320;
  const panelY = 70;

  drawCompositionPanel(margin, panelY, panelWidth, panelHeight);
  drawTargetPanel(margin * 2 + panelWidth, panelY, panelWidth, panelHeight);
}

function drawCompositionPanel(x, y, width, height) {
  stroke('#d5dbe0');
  fill('white');
  rect(x, y, width, height, 16);
  drawText('Calculate pH from composition', x + 16, y + 14, LEFT, TOP, 18, '#0c4f74');

  const ratio = aConc / haConc;
  const ph = currentPka + log10(ratio);
  const sanitizedPh = constrain(ph, 0, 14);

  drawText('Selected buffer: ' + getSystemName(), x + 16, y + 46);
  drawText(`[A-]/[HA] = ${ratio.toFixed(2)}`, x + 16, y + 68);

  drawText(ph.toFixed(2), x + width / 2, y + height / 2 - 10, CENTER, CENTER, 48, getPhColor(sanitizedPh));
  drawText('pH', x + width / 2, y + height / 2 + 42, CENTER, CENTER, 18, '#37474f');

  drawRatioBar(x + 24, y + height - 90, width - 48, 24);
}

function drawTargetPanel(x, y, width, height) {
  stroke('#d5dbe0');
  fill('white');
  rect(x, y, width, height, 16);
  drawText('Calculate ratio for target pH', x + 16, y + 14, LEFT, TOP, 18, '#0c4f74');

  const ratioRequired = pow(10, targetPh - currentPka);
  const molNaoh = ratioRequired / (1 + ratioRequired);
  const lowerRange = currentPka - 1;
  const upperRange = currentPka + 1;
  const outsideRange = targetPh < lowerRange || targetPh > upperRange;

  drawText(`Target pH: ${targetPh.toFixed(2)}`, x + 16, y + 52);
  drawText(`[A-]/[HA] required = ${ratioRequired.toFixed(2)}`, x + 16, y + 74);
  drawText(`Add ${molNaoh.toFixed(2)} mol NaOH per 1.00 mol HA`, x + 16, y + 96);
  drawText(`Effective buffer range: ${lowerRange.toFixed(2)} to ${upperRange.toFixed(2)}`, x + 16, y + 118);

  if (outsideRange) {
    drawText('Warning: Target pH lies outside the useful buffer range.', x + 16, y + 142, LEFT, TOP, 14, '#c62828');
  }
}

function drawRatioBar(x, y, width, height) {
  const total = haConc + aConc;
  const haWidth = (haConc / total) * width;
  const aWidth = width - haWidth;
  stroke('#cccccc');
  fill('#F57C00');
  rect(x, y, haWidth, height, 8, 0, 0, 8);
  fill('#1976D2');
  rect(x + haWidth, y, aWidth, height, 0, 8, 8, 0);
  drawText('HA', x, y + height + 6);
  drawText('A-', x + width, y + height + 6, RIGHT, TOP);
}

function drawNumberLine() {
  const lineY = drawHeight - 80;
  const lineX = margin;
  const lineWidth = canvasWidth - margin * 2;

  stroke('#90a4ae');
  strokeWeight(2);
  line(lineX, lineY, lineX + lineWidth, lineY);

  const lowerRange = constrain(currentPka - 1, 0, 14);
  const upperRange = constrain(currentPka + 1, 0, 14);
  const startX = map(lowerRange, 0, 14, lineX, lineX + lineWidth);
  const endX = map(upperRange, 0, 14, lineX, lineX + lineWidth);
  noStroke();
  fill('rgba(129,199,132,0.5)');
  rect(startX, lineY - 8, endX - startX, 16, 6);

  for (let p = 0; p <= 14; p += 1) {
    const tick = map(p, 0, 14, lineX, lineX + lineWidth);
    stroke('#90a4ae');
    line(tick, lineY - 6, tick, lineY + 6);
    drawText(p.toString(), tick, lineY + 10, CENTER, TOP, 12);
  }

  const pkaX = map(currentPka, 0, 14, lineX, lineX + lineWidth);
  drawText(`pKa = ${currentPka.toFixed(2)}`, pkaX, lineY - 10, CENTER, BOTTOM, 13, '#0c4f74');

  const targetX = map(targetPh, 0, 14, lineX, lineX + lineWidth);
  stroke('#c62828');
  line(targetX, lineY - 14, targetX, lineY + 14);
  drawText(`Target pH ${targetPh.toFixed(2)}`, targetX, lineY + 26, CENTER, TOP, 13, '#c62828');
}

function createControls() {
  const systemRow = createControlRow('Buffer system');
  systemValueSpan = systemRow.value;
  systemSelect = createSelect();
  bufferSystems.forEach(function (system) {
    systemSelect.option(system.label, system.id);
  });
  systemSelect.selected(currentSystem.id);
  systemSelect.parent(systemRow.slot);
  systemSelect.changed(handleSystemChange);

  customPkaInput = createInput(currentPka.toFixed(2));
  customPkaInput.attribute('type', 'number');
  customPkaInput.attribute('step', '0.01');
  customPkaInput.attribute('min', '1');
  customPkaInput.attribute('max', '13');
  customPkaInput.style('width', '90px');
  customPkaInput.style('margin-left', '12px');
  customPkaInput.parent(systemRow.slot);
  customPkaInput.input(function () {
    const parsed = parseFloat(customPkaInput.value());
    if (Number.isFinite(parsed)) {
      customPka = constrain(parsed, 1, 13);
      if (currentSystem.id === 'custom') {
        currentPka = customPka;
        adjustTargetSlider();
      }
    }
    updateControlDisplays();
  });

  const haRow = createSliderRow('Initial [HA] (M)', 0.01, 1.00, haConc, 0.01, function (value) {
    haConc = value;
  });
  haSlider = haRow.slider;
  haValueSpan = haRow.valueSpan;

  const aRow = createSliderRow('[A-] (M)', 0.01, 1.00, aConc, 0.01, function (value) {
    aConc = value;
  });
  aSlider = aRow.slider;
  aValueSpan = aRow.valueSpan;

  const targetRow = createSliderRow('Target pH', Math.max(currentPka - 2, 0), Math.min(currentPka + 2, 14), targetPh, 0.05, function (value) {
    targetPh = value;
  });
  targetSlider = targetRow.slider;
  targetValueSpan = targetRow.valueSpan;

  updateSliderWidths();
  handleSystemChange();
}

function createControlRow(labelText) {
  const row = createDiv();
  row.style('display', 'inline-block');
  row.style('background', 'white');
  row.style('padding', '8px 12px');
  row.style('border-radius', '10px');
  row.style('box-shadow', '0 1px 4px rgba(0,0,0,0.15)');
  row.style('font-family', 'Arial, Helvetica, sans-serif');
  row.style('font-size', '14px');

  const labelSpan = createSpan(labelText + ': ');
  labelSpan.parent(row);
  labelSpan.style('display', 'inline-block');
  labelSpan.style('width', '150px');
  labelSpan.style('font-weight', '600');

  const valueSpan = createSpan('');
  valueSpan.parent(row);
  valueSpan.style('display', 'inline-block');
  valueSpan.style('width', '70px');
  valueSpan.style('font-weight', '600');
  valueSpan.style('color', '#0c4f74');

  const slot = createDiv();
  slot.parent(row);
  slot.style('display', 'inline-block');
  slot.style('width', '260px');
  slot.style('margin-left', '12px');

  const record = { row: row, value: valueSpan, slot: slot };
  controlRows.push(record);
  return record;
}

function createSliderRow(labelText, min, max, initial, step, callback) {
  const row = createControlRow(labelText);
  const slider = createSlider(min, max, initial, step);
  slider.parent(row.slot);
  slider.style('width', '240px');
  slider.input(function () {
    callback(parseFloat(slider.value()));
    updateControlDisplays();
  });
  return { slider: slider, valueSpan: row.value };
}

function positionControls() {
  const canvasEl = document.querySelector('main canvas');
  if (!canvasEl) {
    return;
  }
  const rect = canvasEl.getBoundingClientRect();
  const baseX = rect.left + window.scrollX + margin;
  const baseY = rect.top + window.scrollY + drawHeight + 25;

  controlRows.forEach(function (record, index) {
    record.row.position(baseX, baseY + index * controlRowSpacing);
  });
}

function updateControlDisplays() {
  if (systemValueSpan) {
    systemValueSpan.html(`pKa ${currentPka.toFixed(2)}`);
  }
  if (customPkaInput) {
    customPkaInput.style('display', currentSystem.id === 'custom' ? 'inline-block' : 'none');
    if (currentSystem.id === 'custom') {
      customPkaInput.value(customPka.toFixed(2));
    }
  }
  if (haValueSpan) {
    haValueSpan.html(haConc.toFixed(2) + ' M');
  }
  if (aValueSpan) {
    aValueSpan.html(aConc.toFixed(2) + ' M');
  }
  if (targetValueSpan) {
    targetValueSpan.html(targetPh.toFixed(2));
  }
}

function handleSystemChange() {
  const selectedId = systemSelect ? systemSelect.value() : bufferSystems[0].id;
  currentSystem = bufferSystems.find(function (system) {
    return system.id === selectedId;
  }) || bufferSystems[0];

  if (currentSystem.id === 'custom') {
    currentPka = customPka;
  } else {
    currentPka = currentSystem.pKa;
    customPka = currentPka;
  }
  adjustTargetSlider();
  updateControlDisplays();
}

function adjustTargetSlider() {
  if (!targetSlider) {
    return;
  }
  const min = Math.max(currentPka - 2, 0);
  const max = Math.min(currentPka + 2, 14);
  targetSlider.attribute('min', min);
  targetSlider.attribute('max', max);
  targetPh = constrain(currentPka, min, max);
  targetSlider.value(targetPh);
}

function updateSliderWidths() {
  const sliderWidth = Math.max(canvasWidth - sliderLeftMargin - margin * 2, 180);
  [haSlider, aSlider, targetSlider].forEach(function (slider) {
    if (slider) {
      slider.size(sliderWidth);
    }
  });
  controlRows.forEach(function (record) {
    if (record.slot) {
      record.slot.style('width', sliderWidth + 'px');
    }
  });
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateSliderWidths();
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
  canvasHeight = drawHeight + controlHeight;
}

function getSystemName() {
  if (currentSystem.id === 'custom') {
    return `Custom (pKa ${currentPka.toFixed(2)})`;
  }
  return currentSystem.label;
}

function getPhColor(value) {
  const pct = constrain(value / 14, 0, 1);
  const acidic = color('#c62828');
  const basic = color('#283593');
  return lerpColor(acidic, basic, pct);
}

function log10(value) {
  return Math.log(value) / Math.log(10);
}

function drawText(content, x, y, alignX = LEFT, alignY = TOP, size = 14, color = '#37474f') {
  noStroke();
  fill(color);
  textAlign(alignX, alignY);
  textSize(size);
  text(content, x, y);
}
