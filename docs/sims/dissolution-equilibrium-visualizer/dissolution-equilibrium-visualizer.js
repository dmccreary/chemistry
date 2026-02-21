/*
  Dissolution Equilibrium Visualizer

  Step 2.5 layout plan
  ---------------------
  Drawing area (drawHeight = 520 px):
    - Left simulation panel (solution box 460×350 px)
    - Right chart/status panel (200×350 px)
    - Bottom info bar
    - Background color: aliceblue, consistent with guide
  Controls (controlHeight = 260 px):
    1. Salt selector dropdown
    2. Temperature slider with live value
    3. Button row: Add Common Ion, Add More Solid
    4. Button row: Reset Simulation
  Canvas height = 520 + 260 = 780 px (iframe height = 780 px)
*/

let canvasWidth = 900;
let drawHeight = 520;
let controlHeight = 260;
let canvasHeight = drawHeight + controlHeight;
const margin = 24;
const solutionPanel = { x: margin, y: 100, width: 460, height: 350 };
const rightPanel = { x: solutionPanel.x + solutionPanel.width + 30, y: 100, width: 220, height: 350 };

const salts = [
  {
    id: 'agcl',
    label: 'AgCl',
    formula: 'AgCl (s) ⇌ Ag⁺ + Cl⁻',
    ksp: 1.8e-10,
    stoich: { cation: 1, anion: 1 },
    molarSolubility: 1.3e-3,
    colors: { cation: 'royalblue', anion: 'tomato', solid: 'gainsboro' }
  },
  {
    id: 'baso4',
    label: 'BaSO₄',
    formula: 'BaSO₄ (s) ⇌ Ba²⁺ + SO₄²⁻',
    ksp: 1.1e-10,
    stoich: { cation: 1, anion: 1 },
    molarSolubility: 1.0e-3,
    colors: { cation: 'mediumslateblue', anion: 'lightseagreen', solid: 'lightgray' }
  },
  {
    id: 'pbi2',
    label: 'PbI₂',
    formula: 'PbI₂ (s) ⇌ Pb²⁺ + 2 I⁻',
    ksp: 7.1e-9,
    stoich: { cation: 1, anion: 2 },
    molarSolubility: 1.2e-3,
    colors: { cation: 'darkslategray', anion: 'orchid', solid: 'silver' }
  },
  {
    id: 'caco3',
    label: 'CaCO₃',
    formula: 'CaCO₃ (s) ⇌ Ca²⁺ + CO₃²⁻',
    ksp: 4.8e-9,
    stoich: { cation: 1, anion: 1 },
    molarSolubility: 6.9e-3,
    colors: { cation: 'teal', anion: 'lightsalmon', solid: 'lightsteelblue' }
  }
];

let currentSalt = salts[0];
let cationConc = 0;
let anionConc = 0;
let solidLevel = 1;
let temperatureSlider;
let saltSelect;
let controlRows = [];
let temperatureRow = null;

let cationParticles = [];
let anionParticles = [];
const maxParticles = 200;

let statusText = 'Dissolving...';
let qValue = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const main = document.querySelector('main');
  if (main) canvas.parent(main);
  textFont('Arial');
  createControls();
  resetSimulation();
  describe('Visualize dissolution equilibrium, track Q vs Ksp, and test the common-ion effect with animated ions.', 'Dissolution Equilibrium Visualizer');
}

function draw() {
  updateCanvasSize();
  background('aliceblue');
  updateSimulation();
  drawPanels();
  drawInfoBar();
  drawControlBackground();
  positionControlRows();
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
  controlRows = [];

  const saltRow = createControlRow('Select salt');
  saltSelect = createSelect();
  saltSelect.parent(saltRow.slot);
  salts.forEach(salt => saltSelect.option(`${salt.label} (Ksp ${salt.ksp.toExponential(1)})`, salt.id));
  saltSelect.changed(() => {
    currentSalt = salts.find(item => item.id === saltSelect.value()) || salts[0];
    resetSimulation();
  });
  controlRows.push(saltRow);

  temperatureRow = createControlRow('Temperature (°C)', true);
  temperatureSlider = createSlider(10, 80, 30, 1);
  temperatureSlider.parent(temperatureRow.slot);
  styleSlider(temperatureSlider);
  temperatureSlider.input(updateTemperatureDisplay);
  controlRows.push(temperatureRow);

  const buttonRow = createControlRow('Actions');
  const addIonBtn = createButton('Add common ion');
  const addSolidBtn = createButton('Add more solid');
  [addIonBtn, addSolidBtn].forEach(btn => {
    btn.parent(buttonRow.slot);
    styleButton(btn);
  });
  addIonBtn.mousePressed(addCommonIon);
  addSolidBtn.mousePressed(addSolid);
  controlRows.push(buttonRow);

  const resetRow = createControlRow('Reset controls');
  const resetBtn = createButton('Reset simulation');
  resetBtn.parent(resetRow.slot);
  stylePrimaryButton(resetBtn);
  resetBtn.mousePressed(resetSimulation);
  controlRows.push(resetRow);

  updateTemperatureDisplay();
}

function createControlRow(label, showValue = false) {
  const row = createDiv();
  row.style('display', 'inline-block');
  row.style('background', 'white');
  row.style('padding', '6px 10px');
  row.style('border-radius', '8px');
  row.style('box-shadow', '0 1px 3px rgba(0,0,0,0.12)');
  row.style('font-family', 'Arial, Helvetica, sans-serif');
  row.style('font-size', '14px');

  const labelSpan = createSpan(label + ':');
  labelSpan.parent(row);
  labelSpan.style('display', 'inline-block');
  labelSpan.style('min-width', '220px');
  labelSpan.style('font-weight', '600');

  const slot = createDiv();
  slot.parent(row);
  slot.style('display', 'inline-block');
  slot.style('width', '250px');
  slot.style('margin-left', '12px');

  const value = createSpan('');
  value.parent(row);
  value.style('display', showValue ? 'inline-block' : 'none');
  value.style('min-width', '80px');
  value.style('color', 'slategray');

  return { row, slot, value };
}

function positionControlRows() {
  const canvasEl = document.querySelector('main canvas');
  if (!canvasEl) return;
  const rect = canvasEl.getBoundingClientRect();
  const baseX = rect.left + window.scrollX + margin;
  const baseY = rect.top + window.scrollY + drawHeight + 20;
  const width = Math.min(canvasWidth - margin * 2, 640);
  let currentY = baseY;
  controlRows.forEach(entry => {
    entry.row.position(baseX, currentY);
    entry.row.style('width', width + 'px');
    const h = entry.row.elt.offsetHeight || 54;
    currentY += h + 12;
  });
}

function updateSimulation() {
  const tempFactor = map(temperatureSlider.value(), 10, 80, 0.6, 1.4);
  const baseRate = 0.0005 * tempFactor;
  const ksp = currentSalt.ksp;

  qValue = computeQ();
  let direction = 'equilibrium';
  if (qValue < ksp * 0.98 && solidLevel > 0) {
    direction = 'dissolving';
    const delta = baseRate;
    cationConc += delta * currentSalt.stoich.cation;
    anionConc += delta * currentSalt.stoich.anion;
    solidLevel = max(0, solidLevel - delta * 0.4);
  } else if (qValue > ksp * 1.02) {
    direction = 'precipitating';
    const delta = baseRate;
    cationConc = max(0, cationConc - delta * currentSalt.stoich.cation);
    anionConc = max(0, anionConc - delta * currentSalt.stoich.anion);
    solidLevel = min(1.3, solidLevel + delta * 0.5);
  }

  statusText = direction === 'dissolving' ? 'Dissolving...' :
    direction === 'precipitating' ? 'Precipitating...' : 'Equilibrium!';

  syncParticles();
  moveParticles();
}

function computeQ() {
  const cationTerm = pow(max(cationConc, 1e-6), currentSalt.stoich.cation);
  const anionTerm = pow(max(anionConc, 1e-6), currentSalt.stoich.anion);
  return cationTerm * anionTerm;
}

function syncParticles() {
  const targetCations = floor(map(cationConc, 0, currentSalt.molarSolubility * 3, 0, maxParticles / 2));
  const targetAnions = floor(map(anionConc, 0, currentSalt.molarSolubility * 3, 0, maxParticles / 2));
  adjustParticleArray(cationParticles, targetCations, currentSalt.colors.cation);
  adjustParticleArray(anionParticles, targetAnions, currentSalt.colors.anion);
}

function adjustParticleArray(array, targetCount, color) {
  while (array.length < targetCount) {
    array.push(createParticle(color));
  }
  while (array.length > targetCount) {
    array.pop();
  }
}

function createParticle(color) {
  return {
    x: random(solutionPanel.x + 10, solutionPanel.x + solutionPanel.width - 10),
    y: random(solutionPanel.y + 10, solutionPanel.y + solutionPanel.height - 40),
    vx: random(-0.6, 0.6),
    vy: random(-0.6, 0.6),
    color,
    size: random(5, 9)
  };
}

function moveParticles() {
  const particles = [...cationParticles, ...anionParticles];
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < solutionPanel.x + 10 || p.x > solutionPanel.x + solutionPanel.width - 10) p.vx *= -1;
    if (p.y < solutionPanel.y + 10 || p.y > solutionPanel.y + solutionPanel.height - 40) p.vy *= -1;
  });
}

function drawPanels() {
  drawSolutionPanel();
  drawRightPanel();
}

function drawSolutionPanel() {
  stroke('darkslategray');
  fill('white');
  rect(solutionPanel.x, solutionPanel.y, solutionPanel.width, solutionPanel.height, 16);

  const crystalHeight = max(20, solidLevel * 80);
  fill(currentSalt.colors.solid);
  noStroke();
  rect(solutionPanel.x + 40, solutionPanel.y + solutionPanel.height - crystalHeight - 10, solutionPanel.width - 80, crystalHeight, 10);

  cationParticles.forEach(p => {
    fill(p.color);
    noStroke();
    circle(p.x, p.y, p.size);
  });
  anionParticles.forEach(p => {
    fill(p.color);
    noStroke();
    circle(p.x, p.y, p.size);
  });

  drawFlowArrows();

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(18);
  text('Dissolution tank', solutionPanel.x, solutionPanel.y - 32);
}

function drawFlowArrows() {
  const centerX = solutionPanel.x + solutionPanel.width / 2;
  const baseY = solutionPanel.y + solutionPanel.height - 30;
  const arrowColor = statusText === 'Precipitating...' ? 'firebrick' : (statusText === 'Dissolving...' ? 'seagreen' : 'slategray');
  stroke(arrowColor);
  strokeWeight(2);
  noFill();
  const dir = statusText === 'Precipitating...' ? -1 : 1;
  beginShape();
  for (let i = 0; i < 5; i += 1) {
    const x = centerX - 60 + i * 30;
    const y = baseY - dir * 20;
    vertex(x, y);
  }
  endShape();
  strokeWeight(1);
}

function drawRightPanel() {
  stroke('darkslategray');
  fill('white');
  rect(rightPanel.x, rightPanel.y, rightPanel.width, rightPanel.height, 16);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(16);
  text('Concentration chart', rightPanel.x + 12, rightPanel.y + 12);

  const barWidth = rightPanel.width - 60;
  const barSpacing = 60;
  drawBar(rightPanel.x + 30, rightPanel.y + 60, barWidth, cationConc, currentSalt.molarSolubility * 3, currentSalt.colors.cation, `[${currentSalt.label}⁺]`);
  drawBar(rightPanel.x + 30, rightPanel.y + 60 + barSpacing, barWidth, anionConc, currentSalt.molarSolubility * 3, currentSalt.colors.anion, `[anion]`);

  drawQCompare(rightPanel.x + 20, rightPanel.y + rightPanel.height - 120, rightPanel.width - 40, 80);
}

function drawBar(x, y, width, value, maxValue, color, label) {
  fill('aliceblue');
  stroke('lightgray');
  rect(x, y, width, 30, 8);
  const filled = constrain(map(value, 0, maxValue, 0, width), 0, width);
  fill(color);
  noStroke();
  rect(x, y, filled, 30, 8);
  fill('black');
  textAlign(LEFT, CENTER);
  text(`${label} = ${value.toExponential(2)} M`, x, y - 18);
}

function drawQCompare(x, y, width, height) {
  fill('aliceblue');
  stroke('lightgray');
  rect(x, y, width, height, 10);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  text('Q vs Ksp', x + 10, y + 8);
  const barY = y + 40;
  const barWidth = width - 20;
  fill('white');
  stroke('lightgray');
  rect(x + 10, barY, barWidth, 18, 8);
  const minLog = log10(currentSalt.ksp) - 4;
  const maxLog = log10(currentSalt.ksp) + 4;
  const kspPos = map(log10(currentSalt.ksp), minLog, maxLog, x + 10, x + 10 + barWidth);
  stroke('plum');
  line(kspPos, barY - 6, kspPos, barY + 24);
  fill('plum');
  noStroke();
  textAlign(CENTER, TOP);
  text('Ksp', kspPos, barY + 24);
  const qPos = map(log10(max(qValue, 1e-16)), minLog, maxLog, x + 10, x + 10 + barWidth);
  fill(statusText === 'Precipitating...' ? 'firebrick' : statusText === 'Dissolving...' ? 'seagreen' : 'slategray');
  circle(qPos, barY + 9, 14);
  fill('black');
  textAlign(LEFT, TOP);
  text(`Q = ${qValue.toExponential(2)}`, x + 12, barY + 34);
  text(`Status: ${statusText}`, x + 12, barY + 52);
}

function drawInfoBar() {
  const barY = drawHeight - 50;
  fill('white');
  stroke('lightgray');
  rect(margin, barY, canvasWidth - margin * 2, 70, 12);
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text(`Formula: ${currentSalt.formula}`, margin + 16, barY + 12);
  text(`Ksp = ${currentSalt.ksp}`, margin + 16, barY + 32);
  text(`Molar solubility ≈ ${currentSalt.molarSolubility.toExponential(2)} M`, margin + 250, barY + 12);
  text(`Current Q = ${qValue.toExponential(2)}`, margin + 250, barY + 32);
}

function drawControlBackground() {
  noStroke();
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
}

function updateTemperatureDisplay() {
  if (temperatureRow && temperatureRow.value) {
    temperatureRow.value.style('display', 'inline-block');
    temperatureRow.value.html(`${temperatureSlider.value()} °C`);
  }
}

function addCommonIon() {
  anionConc += currentSalt.molarSolubility * 0.5;
}

function addSolid() {
  solidLevel = min(1.4, solidLevel + 0.2);
}

function resetSimulation() {
  cationConc = 0;
  anionConc = 0;
  solidLevel = 1;
  qValue = 0;
  cationParticles = [];
  anionParticles = [];
  saltSelect.selected(currentSalt.id);
  updateTemperatureDisplay();
}

function styleSlider(slider) {
  slider.style('width', '240px');
}

function styleButton(btn) {
  btn.style('padding', '6px 10px');
  btn.style('margin-right', '8px');
  btn.style('border-radius', '6px');
  btn.style('border', '1px solid dodgerblue');
  btn.style('background', 'white');
  btn.style('cursor', 'pointer');
}

function stylePrimaryButton(btn) {
  btn.style('padding', '6px 12px');
  btn.style('border-radius', '6px');
  btn.style('border', 'none');
  btn.style('background', 'dodgerblue');
  btn.style('color', 'white');
  btn.style('cursor', 'pointer');
}

function log10(value) {
  return Math.log(value) / Math.log(10);
}
