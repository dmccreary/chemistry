/*
  Buffer System Visualizer

  Layout (per p5 guide)
  ---------------------
  drawHeight = 560 px: title, beakers, pH scale, info panels.
  controlHeight = 260 px: sliders, dropdown, add button.
  Canvas background = aliceblue; control region = white.
*/

let canvasWidth = 900;
let drawHeight = 520;
let controlHeight = 260;
let canvasHeight = drawHeight + controlHeight;
const margin = 28;

let haSlider;
let aSlider;
let pkaSlider;
let additionSelect;
let addButton;

let haConc = 0.30;
let aConc = 0.30;
let pKa = 4.75;

const controlRows = [];
let haValueSpan;
let aValueSpan;
let pkaValueSpan;

let bufferPH = 0;
let waterPH = 7;
let lastBufferPH = 0;
let lastWaterPH = 7;
let statusMessage = 'Adjust sliders, then add acid/base.';

let haParticles = [];
let aParticles = [];
const particleMax = 30;

const additions = [
  { label: 'Nothing', value: 'none' },
  { label: '0.010 M HCl', value: 'acid-0.01', type: 'acid', amount: 0.01 },
  { label: '0.010 M NaOH', value: 'base-0.01', type: 'base', amount: 0.01 },
  { label: '0.050 M HCl', value: 'acid-0.05', type: 'acid', amount: 0.05 },
  { label: '0.050 M NaOH', value: 'base-0.05', type: 'base', amount: 0.05 }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const main = document.querySelector('main');
  if (main) {
    canvas.parent(main);
  }
  textFont('Arial');
  createControls();
  updateChemistry();
  seedParticles();
  describe('Adjust HA/A- concentrations, set pKa, and add strong acid or base to compare buffer vs. water pH.');
}

function draw() {
  updateCanvasSize();
  background('aliceblue');
  drawTitle();
  drawBeakers();
  drawPHScale();
  drawInfoPanels();
  drawControlBackground();
  positionControls();
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

function createControls() {
  createSliderRow('Initial [HA] (M)', function (slider, valueSpan) {
    haSlider = slider;
    haValueSpan = valueSpan;
    haSlider.attribute('step', '0.01');
    haSlider.attribute('min', '0.01');
    haSlider.attribute('max', '1.0');
    haSlider.value(haConc);
    haSlider.style('width', '220px');
    haSlider.input(function () {
      haConc = parseFloat(haSlider.value());
      updateChemistry();
      updateParticles();
      haValueSpan.html(haConc.toFixed(2));
    });
  });

  createSliderRow('Initial [A-] (M)', function (slider, valueSpan) {
    aSlider = slider;
    aValueSpan = valueSpan;
    aSlider.attribute('step', '0.01');
    aSlider.attribute('min', '0.01');
    aSlider.attribute('max', '1.0');
    aSlider.value(aConc);
    aSlider.style('width', '220px');
    aSlider.input(function () {
      aConc = parseFloat(aSlider.value());
      updateChemistry();
      updateParticles();
      aValueSpan.html(aConc.toFixed(2));
    });
  });

  createSliderRow('pKa', function (slider, valueSpan) {
    pkaSlider = slider;
    pkaValueSpan = valueSpan;
    pkaSlider.attribute('step', '0.1');
    pkaSlider.attribute('min', '2.0');
    pkaSlider.attribute('max', '12.0');
    pkaSlider.value(pKa);
    pkaSlider.style('width', '220px');
    pkaSlider.input(function () {
      pKa = parseFloat(pkaSlider.value());
      updateChemistry();
      pkaValueSpan.html(pKa.toFixed(2));
    });
  });

  additionSelect = createSelect();
  additions.forEach(function (option) {
    additionSelect.option(option.label, option.value);
  });

  addButton = createButton('Add');
  addButton.style('padding', '6px 14px');
  addButton.style('background', 'dodgerblue');
  addButton.style('border', 'none');
  addButton.style('border-radius', '6px');
  addButton.style('color', 'white');
  addButton.style('cursor', 'pointer');

  addButton.mousePressed(handleAddition);

  haValueSpan.html(haConc.toFixed(2));
  aValueSpan.html(aConc.toFixed(2));
  pkaValueSpan.html(pKa.toFixed(2));
}

function createSliderRow(labelText, callback) {
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

  const slider = createSlider(0, 1, 0.5, 0.01);
  slider.parent(row);

  controlRows.push(row);
  callback(slider, valueSpan);
}

function positionControls() {
  const canvasEl = document.querySelector('main canvas');
  if (!canvasEl) return;
  const rect = canvasEl.getBoundingClientRect();
  const baseX = rect.left + window.scrollX + margin;
  const baseY = rect.top + window.scrollY + drawHeight + 70;
  controlRows.forEach(function (row, index) {
    row.position(baseX, baseY + index * 70);
    row.style('width', Math.min(canvasWidth - margin * 2, 320) + 'px');
  });

  additionSelect.position(baseX + 360, baseY);
  addButton.position(baseX + 360, baseY + 40);
}

function drawControlBackground() {
  noStroke();
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text(`Status: ${statusMessage}`, margin, drawHeight + 16);
  text(`Slider order: [HA], [A-], pKa`, margin, drawHeight + 46);
  text(`Current values: [HA] ${haConc.toFixed(2)} M, [A-] ${aConc.toFixed(2)} M, pKa ${pKa.toFixed(2)}`, margin, drawHeight + 76);
}

function drawTitle() {
  fill('black');
  textAlign(CENTER, TOP);
  textSize(30);
  text('Buffer System Visualizer', canvasWidth / 2, 18);
}

function drawBeakers() {
  const beakerWidth = (canvasWidth - margin * 3) / 2;
  const beakerHeight = 220;
  const bufferX = margin;
  const waterX = margin * 2 + beakerWidth;
  const beakerY = 90;

  drawBeaker(bufferX, beakerY, beakerWidth, beakerHeight, 'Buffer Solution', bufferPH, haParticles, aParticles);
  drawWaterBeaker(waterX, beakerY, beakerWidth, beakerHeight, 'Water (no buffer)', waterPH);
}

function drawBeaker(x, y, width, height, label, phValue, haList, aList) {
  const bgColor = phValue >= 6 && phValue <= 8 ? color(205, 235, 205) : color(244, 210, 210);
  stroke('dimgray');
  fill(bgColor);
  rect(x, y, width, height, 18);
  fill('black');
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(16);
  text(`${label} (pH ${phValue.toFixed(2)})`, x + width / 2, y - 8);

  haList.forEach(function (particle) {
    if (!particle.active) return;
    fill('#F57C00');
    noStroke();
    circle(particle.x * width + x, particle.y * height + y, particle.size);
  });
  aList.forEach(function (particle) {
    if (!particle.active) return;
    fill('#1976D2');
    noStroke();
    circle(particle.x * width + x, particle.y * height + y, particle.size);
  });
}

function drawWaterBeaker(x, y, width, height, label, phValue) {
  const colorScale = getPhColor(phValue);
  stroke('dimgray');
  fill(colorScale);
  rect(x, y, width, height, 18);
  fill('black');
  textAlign(CENTER, BOTTOM);
  textSize(16);
  text(`${label} (pH ${phValue.toFixed(2)})`, x + width / 2, y - 8);
}

function drawPHScale() {
  const barX = margin;
  // The pH scale bar is drawn near the bottom of the draw area, with some margin.
  const barY = 330;
  const barWidth = canvasWidth - margin * 2;
  const barHeight = 30;

  for (let i = 0; i < barWidth; i += 1) {
    const pct = i / barWidth;
    stroke(getGradientColor(pct));
    line(barX + i, barY, barX + i, barY + barHeight);
  }

  stroke('black');
  noFill();
  rect(barX, barY, barWidth, barHeight);
  for (let ph = 0; ph <= 14; ph += 1) {
    const x = map(ph, 0, 14, barX, barX + barWidth);
    stroke('black');
    line(x, barY + barHeight, x, barY + barHeight + 10);
    noStroke();
    fill('black');
    textAlign(CENTER, TOP);
    text(ph.toString(), x, barY + barHeight + 12);
  }
  drawPointer(barX, barWidth, barY, bufferPH, 'Buffer');
  drawPointer(barX, barWidth, barY, waterPH, 'Water');
}

function drawPointer(barX, barWidth, barY, phValue, label) {
  const x = map(phValue, 0, 14, barX, barX + barWidth);
  stroke('white');
  strokeWeight(3);
  line(x, barY, x, barY + 30);
  strokeWeight(1);
  noStroke();
  fill('black');
  textAlign(CENTER, BOTTOM);
  text(`${label} pH`, x, barY);
}

function drawInfoPanels() {
  const panelX = margin;
  const panelY = 400;
  const panelWidth = (canvasWidth - margin * 3) / 2;
  const panelHeight = 110;

  drawInfoPanel(panelX, panelY, panelWidth, panelHeight, 'Buffer ΔpH', bufferPH, lastBufferPH);
  drawInfoPanel(panelX + panelWidth + margin, panelY, panelWidth, panelHeight, 'Water ΔpH', waterPH, lastWaterPH);
}

function drawInfoPanel(x, y, width, height, label, current, previous) {
  stroke('lightgray');
  fill('white');
  rect(x, y, width, height, 10);
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  const delta = current - previous;
  const lines = [
    label,
    `Before: ${previous.toFixed(2)}`,
    `After: ${current.toFixed(2)}`,
    `ΔpH = ${delta >= 0 ? '+' : ''}${delta.toFixed(2)}`
  ];
  lines.forEach(function (line, index) {
    text(line, x + 10, y + 12 + index * 22);
  });
}

function updateChemistry() {
  const ratio = max(aConc, 0.0001) / max(haConc, 0.0001);
  bufferPH = pKa + log10(ratio);
  bufferPH = constrain(bufferPH, 0, 14);
  if (!lastBufferPH) {
    lastBufferPH = bufferPH;
  }
  if (!lastWaterPH) {
    lastWaterPH = waterPH;
  }
}

function handleAddition() {
  const choice = additionSelect.value();
  const option = additions.find(function (item) { return item.value === choice; });
  if (!option || option.value === 'none') {
    statusMessage = 'No reagent selected.';
    return;
  }

  lastBufferPH = bufferPH;
  lastWaterPH = waterPH;

  if (option.type === 'acid') {
    const change = min(option.amount, aConc);
    aConc = max(aConc - change, 0.0001);
    haConc += change;
    waterPH = -log10(option.amount);
  } else {
    const change = min(option.amount, haConc);
    haConc = max(haConc - change, 0.0001);
    aConc += change;
    const pOH = -log10(option.amount);
    waterPH = 14 - pOH;
  }
  waterPH = constrain(waterPH, 0, 14);
  updateChemistry();
  updateParticles();
  statusMessage = `Added ${option.label}.`;
}

function seedParticles() {
  haParticles = [];
  aParticles = [];
  for (let i = 0; i < particleMax; i += 1) {
    haParticles.push(makeParticle());
    aParticles.push(makeParticle());
  }
  updateParticles();
}

function makeParticle() {
  return {
    x: random(0.1, 0.9),
    y: random(0.1, 0.9),
    size: random(6, 12),
    active: true
  };
}

function updateParticles() {
  const total = haConc + aConc;
  const haCount = floor((haConc / total) * particleMax);
  const aCount = particleMax - haCount;
  haParticles.forEach(function (particle, index) {
    particle.active = index < haCount;
    if (particle.active) {
      particle.x = random(0.15, 0.85);
      particle.y = random(0.15, 0.85);
    }
  });
  aParticles.forEach(function (particle, index) {
    particle.active = index < aCount;
    if (particle.active) {
      particle.x = random(0.15, 0.85);
      particle.y = random(0.15, 0.85);
    }
  });
}

function getGradientColor(pct) {
  return lerpColor(color('crimson'), color('purple'), pct);
}

function getPhColor(phValue) {
  const pct = constrain(phValue / 14, 0, 1);
  return getGradientColor(pct);
}

function styleLabel(el) {
  el.style('display', 'inline-block');
  el.style('width', '150px');
  el.style('font-weight', '600');
}

function styleValue(el) {
  el.style('display', 'inline-block');
  el.style('width', '40px');
  el.style('font-weight', '600');
}

function log10(value) {
  return Math.log(value) / Math.log(10);
}
