/*
  Ksp Precipitation Predictor MicroSim

  Step 2.5 layout plan
  ---------------------
  Drawing area (drawHeight = 460 px):
    - Left panel with two beakers and particle animations (260×320 px)
    - Mix button rendered inside left panel (clickable region)
    - Center/right area displays Q expression, Q vs Ksp bar, and verdict panel
  Controls (controlHeight = 380 px):
    - Rows: salt dropdown, direct concentration inputs, mixing-mode toggle,
      optional volume inputs (2 rows), Calculate button row
    - Controls aligned using slider-row styling beneath drawing area
  Canvas height = 840 px (iframe height = 842 px)
*/

let canvasWidth = 860;
let drawHeight = 460;
let controlHeight = 380;
let canvasHeight = drawHeight + controlHeight;
const margin = 24;

const salts = [
  {
    id: 'agcl',
    name: 'AgCl (s)',
    cation: 'Ag⁺',
    anion: 'Cl⁻',
    ksp: 1.8e-10,
    stoich: { cation: 1, anion: 1 },
    colors: { cation: '#B0BEC5', anion: '#FFC107' }
  },
  {
    id: 'pbi2',
    name: 'PbI₂ (s)',
    cation: 'Pb²⁺',
    anion: 'I⁻',
    ksp: 7.1e-9,
    stoich: { cation: 1, anion: 2 },
    colors: { cation: '#757575', anion: '#7E57C2' }
  },
  {
    id: 'baso4',
    name: 'BaSO₄ (s)',
    cation: 'Ba²⁺',
    anion: 'SO₄²⁻',
    ksp: 1.1e-10,
    stoich: { cation: 1, anion: 1 },
    colors: { cation: '#6A1B9A', anion: '#B3E5FC' }
  },
  {
    id: 'ag2cro4',
    name: 'Ag₂CrO₄ (s)',
    cation: 'Ag⁺',
    anion: 'CrO₄²⁻',
    ksp: 1.2e-12,
    stoich: { cation: 2, anion: 1 },
    colors: { cation: '#BDBDBD', anion: '#F4511E' }
  },
  {
    id: 'caco3',
    name: 'CaCO₃ (s)',
    cation: 'Ca²⁺',
    anion: 'CO₃²⁻',
    ksp: 4.8e-9,
    stoich: { cation: 1, anion: 1 },
    colors: { cation: '#26A69A', anion: '#90CAF9' }
  }
];

let currentSalt = salts[0];
let cationSlider;
let anionSlider;
let mixModeCheckbox;
let cationVolumeInput;
let cationMixInput;
let anionVolumeInput;
let anionMixInput;
let calculateButton;

let controlRows = [];
let mixMode = false;
let lastResult = null;
let displayQ = 0;
let cationRowRef = null;
let anionRowRef = null;

const beakerLeft = { x: margin + 10, y: 100, width: 120, height: 180 };
const beakerRight = { x: margin + 160, y: 100, width: 120, height: 180 };
const mixingZone = {
  x: beakerLeft.x - 10,
  y: beakerLeft.y + beakerLeft.height + 15,
  width: beakerRight.x + beakerRight.width - beakerLeft.x + 20,
  height: 60
};
const mixButtonArea = { x: margin + 70, y: mixingZone.y + mixingZone.height + 10, width: 140, height: 38 };
let mixTimer = 0;
let precipitateLevel = 0;

let particlesLeft = [];
let particlesRight = [];
let mixedParticles = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const main = document.querySelector('main');
  if (main) canvas.parent(main);
  textFont('Arial');
  createControls();
  initParticles();
  calculateQ();
  describe('Input ion concentrations (or mixing data) to compute Q vs Ksp and visualize whether a precipitate forms.', 'Ksp Precipitation Predictor');
}

function draw() {
  updateCanvasSize();
  background('#f6f7fb');
  if (lastResult) {
    displayQ = lerp(displayQ, lastResult.q, 0.08);
  }
  updateParticles();
  drawTitle();
  drawBeakers();
  drawMixButton();
  drawInfoPanels();
  drawControlBackground();
  positionControlRows();
  if (mixTimer > 0) mixTimer -= deltaTime / 1000;
  if (lastResult && lastResult.precipitate) {
    precipitateLevel = min(1, precipitateLevel + 0.01);
  } else {
    precipitateLevel = max(0, precipitateLevel - 0.02);
  }
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
  controlRows = [];
  controlRows.push(createControlRow('Select salt', addSaltDropdown));
  cationRowRef = createControlRow('Cation concentration (mol/L)', row => {
    cationSlider = createSlider(0, 0.1, 0.001, 0.0005);
    cationSlider.parent(row.slot);
    styleSlider(cationSlider);
    cationSlider.input(updateSliderDisplays);
  }, true);
  controlRows.push(cationRowRef);
  anionRowRef = createControlRow('Anion concentration (mol/L)', row => {
    anionSlider = createSlider(0, 0.1, 0.001, 0.0005);
    anionSlider.parent(row.slot);
    styleSlider(anionSlider);
    anionSlider.input(updateSliderDisplays);
  }, true);
  controlRows.push(anionRowRef);
  controlRows.push(createControlRow('Mixing mode (enter volumes)', row => {
    mixModeCheckbox = createCheckbox('Enable mixing mode', false);
    mixModeCheckbox.parent(row.slot);
    mixModeCheckbox.changed(() => toggleMixMode(mixModeCheckbox.checked()));
    row.value.html('Off');
  }, true));
  controlRows.push(createControlRow('Solution A (cation) volume mL / concentration M', row => {
    cationVolumeInput = createInput('50', 'text');
    cationMixInput = createInput('0.010', 'text');
    cationVolumeInput.parent(row.slot);
    cationMixInput.parent(row.slot);
    styleInput(cationVolumeInput);
    styleInput(cationMixInput);
    row.row.hide();
  }));
  controlRows.push(createControlRow('Solution B (anion) volume mL / concentration M', row => {
    anionVolumeInput = createInput('50', 'text');
    anionMixInput = createInput('0.010', 'text');
    anionVolumeInput.parent(row.slot);
    anionMixInput.parent(row.slot);
    styleInput(anionVolumeInput);
    styleInput(anionMixInput);
    row.row.hide();
  }));
  controlRows.push(createControlRow('Actions', row => {
    calculateButton = createButton('Calculate Q');
    calculateButton.parent(row.slot);
    stylePrimaryButton(calculateButton);
    calculateButton.mousePressed(() => calculateQ());
  }));
  updateSliderDisplays();
}

function addSaltDropdown(row) {
  const select = createSelect();
  select.parent(row.slot);
  salts.forEach(salt => select.option(salt.name, salt.id));
  select.changed(() => {
    currentSalt = salts.find(s => s.id === select.value()) || salts[0];
     initParticles();
    calculateQ();
  });
}

function createControlRow(labelText, populateFn, showValue = false) {
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
  labelSpan.style('display', 'inline-block');
  labelSpan.style('min-width', '280px');
  labelSpan.style('font-weight', '600');

  const slot = createDiv();
  slot.parent(row);
  slot.style('display', 'inline-block');
  slot.style('width', '260px');
  slot.style('margin-left', '12px');

  const value = createSpan('');
  value.parent(row);
  value.style('display', showValue ? 'inline-block' : 'none');
  value.style('min-width', '80px');
  value.style('color', '#546E7A');

  const wrapper = { row, slot, value };
  populateFn(wrapper);
  return wrapper;
}

function styleInput(input) {
  input.attribute('type', 'text');
  input.style('width', '110px');
  input.style('margin-right', '8px');
  input.style('padding', '4px 6px');
  input.style('border', '1px solid #90A4AE');
  input.style('border-radius', '4px');
}

function styleSlider(slider) {
  slider.style('width', '240px');
  slider.style('margin', '4px 0');
}

function stylePrimaryButton(btn) {
  btn.style('padding', '6px 12px');
  btn.style('background', '#1E88E5');
  btn.style('color', '#ffffff');
  btn.style('border', 'none');
  btn.style('border-radius', '6px');
  btn.style('cursor', 'pointer');
}

function toggleMixMode(enabled) {
  mixMode = enabled;
  controlRows[3].value.html(enabled ? 'On' : 'Off');
  if (cationSlider && anionSlider) {
    cationSlider.attribute('disabled', enabled ? true : null);
    anionSlider.attribute('disabled', enabled ? true : null);
    const opacity = enabled ? '0.5' : '1';
    cationSlider.style('opacity', opacity);
    anionSlider.style('opacity', opacity);
  }
  const mixRows = [controlRows[4], controlRows[5]];
  mixRows.forEach(entry => {
    if (enabled) {
      entry.row.show();
    } else {
      entry.row.hide();
    }
  });
}

function positionControlRows() {
  const canvasEl = document.querySelector('main canvas');
  if (!canvasEl) return;
  const rect = canvasEl.getBoundingClientRect();
  const baseX = rect.left + window.scrollX + margin;
  const baseY = rect.top + window.scrollY + drawHeight + 20;
  const width = Math.min(canvasWidth - margin * 2, 620);
  const visibleRows = controlRows.filter(entry => entry.row.elt.style.display !== 'none');
  visibleRows.forEach((entry, index) => {
    entry.row.position(baseX, baseY + index * 52);
    entry.row.style('width', width + 'px');
  });
}

function updateParticles() {
  const jitter = () => random(-0.5, 0.5);
  particlesLeft.forEach(p => {
    p.x += jitter();
    p.y += jitter();
    wrapParticle(p, beakerLeft);
  });
  particlesRight.forEach(p => {
    p.x += jitter();
    p.y += jitter();
    wrapParticle(p, beakerRight);
  });
  mixedParticles.forEach(p => {
    p.x += jitter();
    p.y += jitter();
    wrapParticle(p, mixingZone, 6);
  });

  if (mixTimer > 0) {
    transferParticles(particlesLeft, mixedParticles, 1);
    transferParticles(particlesRight, mixedParticles, 1);
  }
}

function wrapParticle(p, region, padding = 10) {
  p.x = constrain(p.x, region.x + padding, region.x + region.width - padding);
  p.y = constrain(p.y, region.y + padding, region.y + region.height - padding);
}

function transferParticles(source, target, count) {
  for (let i = 0; i < count; i += 1) {
    if (!source.length) return;
    const particle = source.splice(floor(random(source.length)), 1)[0];
    particle.x = random(mixingZone.x + 12, mixingZone.x + mixingZone.width - 12);
    particle.y = random(mixingZone.y + 12, mixingZone.y + mixingZone.height - 12);
    target.push(particle);
  }
}

function initParticles() {
  particlesLeft = [];
  particlesRight = [];
  mixedParticles = [];
  for (let i = 0; i < 40; i += 1) {
    particlesLeft.push(createIonParticle(beakerLeft, currentSalt.colors.cation));
    particlesRight.push(createIonParticle(beakerRight, currentSalt.colors.anion));
  }
}

function createIonParticle(region, color) {
  return {
    x: random(region.x + 12, region.x + region.width - 12),
    y: random(region.y + 12, region.y + region.height - 12),
    color,
    size: random(5, 8)
  };
}

function drawTitle() {
  fill('#1F2933');
  textAlign(CENTER, TOP);
  textSize(22);
  text('Ksp precipitation predictor', canvasWidth / 2, 18);
}

function drawBeakers() {
  drawBeaker(beakerLeft, 'Solution A (cation)', particlesLeft, currentSalt.colors.cation);
  drawBeaker(beakerRight, 'Solution B (anion)', particlesRight, currentSalt.colors.anion);
  drawMixingChannel();

  // precipitation heap
  if (precipitateLevel > 0) {
    const baseY = beakerLeft.y + beakerLeft.height + 50;
    fill('#795548');
    noStroke();
    const width = 180 * precipitateLevel;
    rect(beakerLeft.x + 40, baseY, width, 14, 6);
  }
}

function drawBeaker(region, label, particles, color) {
  stroke('#90A4AE');
  fill('#ffffff');
  rect(region.x, region.y, region.width, region.height, 20);
  noStroke();
  fill('#1F2933');
  textAlign(CENTER, TOP);
  textSize(12);
  text(label, region.x + region.width / 2, region.y - 18);
  particles.forEach(p => {
    fill(color);
    circle(p.x, p.y, p.size);
  });
}

function drawMixingChannel() {
  fill('#E0F2F1');
  stroke('#80CBC4');
  rect(mixingZone.x, mixingZone.y, mixingZone.width, mixingZone.height, 14);
  noStroke();
  if (mixedParticles.length) {
    mixedParticles.forEach(p => {
      fill(p.color || '#90CAF9');
      circle(p.x, p.y, p.size || 6);
    });
  }
}

function drawMixButton() {
  const hover = mouseX >= mixButtonArea.x && mouseX <= mixButtonArea.x + mixButtonArea.width &&
    mouseY >= mixButtonArea.y && mouseY <= mixButtonArea.y + mixButtonArea.height;
  fill(hover ? '#1E88E5' : '#2196F3');
  noStroke();
  rect(mixButtonArea.x, mixButtonArea.y, mixButtonArea.width, mixButtonArea.height, 10);
  fill('#ffffff');
  textAlign(CENTER, CENTER);
  text('Mix solutions', mixButtonArea.x + mixButtonArea.width / 2, mixButtonArea.y + mixButtonArea.height / 2);
}

function drawInfoPanels() {
  const panelX = margin + 320;
  const panelWidth = canvasWidth - panelX - margin;
  drawExpressionPanel(panelX, 80, panelWidth, 110);
  drawComparisonBar(panelX, 210, panelWidth, 90);
  drawResultPanel(panelX, 310, panelWidth, 110);
}

function drawExpressionPanel(x, y, width, height) {
  stroke('#B0BEC5');
  fill('#ffffff');
  rect(x, y, width, height, 12);
  fill('#1F2933');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Ion product expression', x + 14, y + 8);
  if (!lastResult) return;
  textSize(12);
  const stoich = currentSalt.stoich;
  const expression = `Q = [${currentSalt.cation}]${stoich.cation > 1 ? `^${stoich.cation}` : ''} · [${currentSalt.anion}]${stoich.anion > 1 ? `^${stoich.anion}` : ''}`;
  const substituted = `= (${formatValue(lastResult.cation)}${stoich.cation > 1 ? `^${stoich.cation}` : ''}) · (${formatValue(lastResult.anion)}${stoich.anion > 1 ? `^${stoich.anion}` : ''})`;
  const numeric = `Q = ${lastResult.q.toExponential(2)}`;
  text(expression, x + 14, y + 32);
  text(substituted, x + 14, y + 50);
  text(numeric, x + 14, y + 68);
}

function drawComparisonBar(x, y, width, height) {
  stroke('#B0BEC5');
  fill('#ffffff');
  rect(x, y, width, height, 12);
  fill('#1F2933');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Compare Q vs Ksp', x + 14, y + 8);
  if (!lastResult) return;
  const barX = x + 14;
  const barY = y + 40;
  const barW = width - 28;
  const barH = 24;
  fill('#E0E0E0');
  rect(barX, barY, barW, barH, 12);
  const minLog = Math.log10(currentSalt.ksp) - 4;
  const maxLog = Math.log10(currentSalt.ksp) + 4;
  const kspPos = map(Math.log10(currentSalt.ksp), minLog, maxLog, barX, barX + barW);
  const qPos = map(Math.log10(max(displayQ, 1e-16)), minLog, maxLog, barX, barX + barW);
  stroke('#8E24AA');
  line(kspPos, barY - 4, kspPos, barY + barH + 4);
  fill('#8E24AA');
  textAlign(CENTER, TOP);
  text('Ksp', kspPos, barY + barH + 6);
  fill(lastResult.precipitate ? '#C62828' : '#2E7D32');
  noStroke();
  circle(qPos, barY + barH / 2, 14);
  fill('#1F2933');
  textAlign(LEFT, TOP);
  text(`Q = ${displayQ.toExponential(2)}`, barX, barY + barH + 24);
}

function drawResultPanel(x, y, width, height) {
  stroke('#B0BEC5');
  fill('#ffffff');
  rect(x, y, width, height, 12);
  fill('#1F2933');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Result', x + 14, y + 10);
  if (!lastResult) return;
  textSize(20);
  fill(lastResult.precipitate ? '#C62828' : '#2E7D32');
  const verdict = lastResult.precipitate ? '✗ Precipitate forms! (Q > Ksp)' : '✓ No precipitate (Q < Ksp)';
  text(verdict, x + 14, y + 40);
  textSize(12);
  fill('#546E7A');
  const detail = mixMode ? 'Mixing volumes accounted for diluted concentrations.' : 'Direct concentrations used.';
  text(detail, x + 14, y + 74);
}

function calculateQ() {
  let cationConc = cationSlider ? parseFloat(cationSlider.value()) : 0;
  let anionConc = anionSlider ? parseFloat(anionSlider.value()) : 0;
  if (mixMode) {
    const va = parseFloat(cationVolumeInput.value());
    const ca = parseFloat(cationMixInput.value());
    const vb = parseFloat(anionVolumeInput.value());
    const cb = parseFloat(anionMixInput.value());
    const totalVolume = (va + vb) / 1000;
    if (totalVolume > 0) {
      cationConc = (ca * (va / 1000)) / totalVolume;
      anionConc = (cb * (vb / 1000)) / totalVolume;
    }
  }
  if (!Number.isFinite(cationConc) || !Number.isFinite(anionConc)) {
    return;
  }
  const stoich = currentSalt.stoich;
  const q = pow(max(cationConc, 0), stoich.cation) * pow(max(anionConc, 0), stoich.anion);
  const precipitate = q > currentSalt.ksp;
  lastResult = { cation: cationConc, anion: anionConc, q, precipitate };
  displayQ = q;
}

function formatValue(value) {
  if (!Number.isFinite(value)) return '—';
  if (abs(value) < 1e-4) return value.toExponential(2);
  return nf(value, 0, 4);
}

function drawControlBackground() {
  noStroke();
  fill('aliceblue');
  rect(0, drawHeight, canvasWidth, controlHeight);
}

function updateSliderDisplays() {
  if (cationRowRef && cationRowRef.value) {
    cationRowRef.value.style('display', 'inline-block');
    cationRowRef.value.html(`${formatSliderValue(cationSlider)} M`);
  }
  if (anionRowRef && anionRowRef.value) {
    anionRowRef.value.style('display', 'inline-block');
    anionRowRef.value.html(`${formatSliderValue(anionSlider)} M`);
  }
}

function formatSliderValue(slider) {
  if (!slider) return '0.000';
  const numeric = parseFloat(slider.value());
  return numeric.toFixed(3);
}

function mousePressed() {
  if (mouseX >= mixButtonArea.x && mouseX <= mixButtonArea.x + mixButtonArea.width &&
      mouseY >= mixButtonArea.y && mouseY <= mixButtonArea.y + mixButtonArea.height) {
    mixTimer = 2;
    initParticles();
  }
}
