/*
  Mechanism Step Explorer MicroSim
  Step 2.5 planning:
  - Control inventory (rows placed under drawing region using slider alignment template):
      1. Slider: rate-determining step speed (0-1)
      2. Slider: initial count of A (5-30)
      3. Slider: initial count of B (5-30)
      4. Slider: initial count of D (5-30)
      5. Buttons: Play/Pause and Reset
  - Layout calculations:
      drawHeight = 520
      controlHeight = 220
      canvasHeight = 740 (iframe height 742px)
      animation panel occupies 60% width on left, concentration graph occupies right 40%
*/

let canvasWidth = 800;
let drawHeight = 560;
let controlHeight = 260;
let canvasHeight = drawHeight + controlHeight;
const titleText = 'Mechanism Step Explorer';

let molecules = [];
let isRunning = false;
let animationPanel;
let graphPanel;
let animationProgress = 0;
let controlRows = [];
let speedSlider;
let aSlider;
let bSlider;
let dSlider;
let playButton;
let resetButton;
let instructions;

const colors = {
  A: '#1E88E5',
  B: '#43A047',
  C: '#FDD835',
  D: '#8E24AA',
  E: '#E53935'
};

const radius = 8;
const speedRange = 1.2;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const main = document.querySelector('main');
  if (main) canvas.parent(main);
  textFont('Arial');
  animationPanel = { x: 20, y: 80, width: canvasWidth * 0.58, height: drawHeight - 120 };
  graphPanel = { x: animationPanel.x + animationPanel.width + 30, y: 80, width: canvasWidth - animationPanel.width - 70, height: drawHeight - 120 };
  createControls();
  initializeMolecules();
  describe('Simulate a two-step mechanism showing intermediate buildup and regeneration of A while tracking concentrations.', 'Mechanism Step Explorer');
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
  drawPanels();
  if (isRunning) updateMolecules();
  drawMolecules();
  drawCounts();
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
  animationPanel = { x: 20, y: 80, width: canvasWidth * 0.58, height: drawHeight - 120 };
  graphPanel = { x: animationPanel.x + animationPanel.width + 30, y: 80, width: canvasWidth - animationPanel.width - 70, height: drawHeight - 120 };
}

function createControls() {
  createControlRows();

  speedSlider = createSlider(0.1, 1, 0.5, 0.01);
  speedSlider.parent(controlRows[0].row);
  styleSlider(speedSlider);
  speedSlider.input(updateControlLabels);

  aSlider = createSlider(5, 30, 18, 1);
  aSlider.parent(controlRows[1].row);
  styleSlider(aSlider);
  aSlider.input(updateControlLabels);

  bSlider = createSlider(5, 30, 18, 1);
  bSlider.parent(controlRows[2].row);
  styleSlider(bSlider);
  bSlider.input(updateControlLabels);

  dSlider = createSlider(5, 30, 15, 1);
  dSlider.parent(controlRows[3].row);
  styleSlider(dSlider);
  dSlider.input(updateControlLabels);

  playButton = createButton('Start');
  playButton.mousePressed(togglePlay);
  resetButton = createButton('Reset');
  resetButton.mousePressed(() => {
    initializeMolecules();
    animationProgress = 0;
  });

  instructions = createSpan('Adjust counts, then press Start to run.');
  instructions.style('margin-left', '16px');
  instructions.style('font-weight', '600');

  updateControlLabels();
}

function createControlRows() {
  const labels = ['Rate-Determining Step Speed', 'Initial A', 'Initial B', 'Initial D'];
  controlRows = labels.map(label => {
    const row = createDiv();
    row.style('display', 'inline-block');
    row.style('padding', '4px 8px');
    row.style('background', '#ffffff');
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

function positionControlRows() {
  const canvasEl = document.querySelector('main canvas');
  if (!canvasEl) return;
  const rect = canvasEl.getBoundingClientRect();
  const baseX = rect.left + window.scrollX + 20;
  const baseY = rect.top + window.scrollY + drawHeight + 15;
  controlRows.forEach((entry, idx) => {
    entry.row.position(baseX, baseY + idx * 40);
  });
  const buttonY = baseY + controlRows.length * 40 + 20;
  playButton.position(baseX, buttonY);
  resetButton.position(baseX + 130, buttonY);
  instructions.position(baseX + 280, buttonY + 5);
}

function styleLabel(el) {
  el.style('display', 'inline-block');
  el.style('min-width', '200px');
  el.style('font-weight', '600');
}

function styleValue(el) {
  el.style('display', 'inline-block');
  el.style('min-width', '70px');
}

function styleSlider(slider) {
  slider.style('width', '200px');
  slider.style('margin-left', '12px');
}

function updateControlLabels() {
  if (!controlRows.length) return;
  controlRows[0].value.html(nf(speedSlider.value(), 0, 2));
  controlRows[1].value.html(aSlider.value());
  controlRows[2].value.html(bSlider.value());
  controlRows[3].value.html(dSlider.value());
  playButton.html(isRunning ? 'Pause' : 'Start');
}

function togglePlay() {
  isRunning = !isRunning;
  updateControlLabels();
}

function initializeMolecules() {
  molecules = [];
  addSpecies('A', aSlider.value());
  addSpecies('B', bSlider.value());
  addSpecies('D', dSlider.value());
  animationProgress = 0;
}

function addSpecies(type, count) {
  for (let i = 0; i < count; i += 1) {
    molecules.push({
      type,
      x: random(animationPanel.x + radius, animationPanel.x + animationPanel.width - radius),
      y: random(animationPanel.y + radius, animationPanel.y + animationPanel.height - radius),
      vx: random(-speedRange, speedRange),
      vy: random(-speedRange, speedRange)
    });
  }
}

function drawTitle() {
  fill('#111111');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(26);
  text(titleText, canvasWidth / 2, 10);
}

function drawPanels() {
  fill('#ffffff');
  stroke('#cfd8dc');
  rect(animationPanel.x - 10, animationPanel.y - 10, animationPanel.width + 20, animationPanel.height + 20, 12);
  rect(graphPanel.x - 10, graphPanel.y - 10, graphPanel.width + 20, graphPanel.height + 20, 12);
}

function updateMolecules() {
  molecules.forEach(mol => {
    mol.x += mol.vx;
    mol.y += mol.vy;
    if (mol.x < animationPanel.x + radius || mol.x > animationPanel.x + animationPanel.width - radius) {
      mol.vx *= -1;
      mol.x = constrain(mol.x, animationPanel.x + radius, animationPanel.x + animationPanel.width - radius);
    }
    if (mol.y < animationPanel.y + radius || mol.y > animationPanel.y + animationPanel.height - radius) {
      mol.vy *= -1;
      mol.y = constrain(mol.y, animationPanel.y + radius, animationPanel.y + animationPanel.height - radius);
    }
  });
  handleReactions();
}

function handleReactions() {
  for (let i = 0; i < molecules.length; i += 1) {
    for (let j = i + 1; j < molecules.length; j += 1) {
      const mol1 = molecules[i];
      const mol2 = molecules[j];
      const distSq = (mol1.x - mol2.x) ** 2 + (mol1.y - mol2.y) ** 2;
      const threshold = (radius * 2) ** 2;
      if (distSq <= threshold) {
        const changed = attemptReaction(mol1, mol2);
        if (changed) {
          j -= 1;
        }
      }
    }
  }
}

function attemptReaction(m1, m2) {
  const slowFactor = speedSlider.value();
  const chance1 = 0.004 * slowFactor;
  const chance2 = 0.01;
  const pair = [m1.type, m2.type].sort().join('');
  if (pair === 'AB' && random() < chance1) {
    convertABtoC(m1, m2);
    return true;
  } else if (pair === 'CD' && random() < chance2) {
    convertCDtoEA(m1, m2);
    return false;
  }
  return false;
}

function convertABtoC(m1, m2) {
  const aMol = m1.type === 'A' ? m1 : m2;
  const bMol = aMol === m1 ? m2 : m1;
  aMol.type = 'C';
  removeMolecule(bMol);
}

function convertCDtoEA(m1, m2) {
  const cMol = m1.type === 'C' ? m1 : m2;
  const dMol = m1.type === 'D' ? m1 : m2;
  cMol.type = 'E';
  dMol.type = 'A';
}

function removeMolecule(target) {
  const index = molecules.indexOf(target);
  if (index >= 0) {
    molecules.splice(index, 1);
  }
}

function drawMolecules() {
  molecules.forEach(mol => {
    fill(colors[mol.type]);
    noStroke();
    circle(mol.x, mol.y, radius * 2);
  });
}

function drawCounts() {
  const counts = countSpecies();
  const species = ['A', 'B', 'C', 'D', 'E'];
  const barWidth = graphPanel.width - 40;
  const barHeight = 24;
  species.forEach((type, idx) => {
    const y = graphPanel.y + 20 + idx * 40;
    fill('#eceff1');
    rect(graphPanel.x + 10, y - 10, barWidth, barHeight, 6);
    const fraction = counts[type] / max(1, aSlider.value() + bSlider.value() + dSlider.value());
    fill(colors[type]);
    rect(graphPanel.x + 10, y - 10, barWidth * fraction, barHeight, 6);
    fill('#111111');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);
    text(type + ': ' + counts[type], graphPanel.x + 15, y + 2);
  });

  fill('#263238');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('C builds up when step 1 is slow.\nStep 2 consumes C and regenerates A.', graphPanel.x + 10, graphPanel.y + graphPanel.height - 70);
}

function countSpecies() {
  const counts = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  molecules.forEach(m => counts[m.type]++);
  return counts;
}

function drawFooter() {
  fill('#111111');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text('Observe how C accumulates when step 1 is slow and is consumed quickly when step 2 is fast.', canvasWidth / 2, drawHeight + controlHeight - 10);
}
