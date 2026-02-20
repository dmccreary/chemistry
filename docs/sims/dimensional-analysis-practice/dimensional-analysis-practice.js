// Dimensional Analysis Practice MicroSim
// Students build conversion chains by selecting factor tiles.

let canvasWidth = 960;
const drawHeight = 520;
const controlHeight = 80;
const canvasHeight = drawHeight + controlHeight;
const margin = 20;
const workspaceCardWidth = 155;
const workspaceCardHeight = 80;
const workspaceCardSpacing = 20;
let parentEl;
let newProblemBtn;
let checkBtn;
let undoBtn;

let currentProblem = null;
let workspaceChain = [];
let availableFactorIds = [];
let factorCardLayout = [];
let statusMessage = 'Click a conversion tile to add it to the workspace.';
let scoreCorrect = 0;
let scoreAttempts = 0;
let celebrationParticles = [];

const FACTORS = {
  'kg_to_g': {
    label: '1000 g / 1 kg',
    numeratorValue: 1000,
    denominatorValue: 1,
    numeratorUnits: ['g'],
    denominatorUnits: ['kg'],
    color: '#1d7874'
  },
  'g_to_kg': {
    label: '1 kg / 1000 g',
    numeratorValue: 1,
    denominatorValue: 1000,
    numeratorUnits: ['kg'],
    denominatorUnits: ['g'],
    color: '#b33951'
  },
  'cm_to_m': {
    label: '1 m / 100 cm',
    numeratorValue: 1,
    denominatorValue: 100,
    numeratorUnits: ['m'],
    denominatorUnits: ['cm'],
    color: '#1d7874'
  },
  'm_to_cm': {
    label: '100 cm / 1 m',
    numeratorValue: 100,
    denominatorValue: 1,
    numeratorUnits: ['cm'],
    denominatorUnits: ['m'],
    color: '#b33951'
  },
  'L_to_mL': {
    label: '1000 mL / 1 L',
    numeratorValue: 1000,
    denominatorValue: 1,
    numeratorUnits: ['mL'],
    denominatorUnits: ['L'],
    color: '#1d7874'
  },
  'mL_to_L': {
    label: '1 L / 1000 mL',
    numeratorValue: 1,
    denominatorValue: 1000,
    numeratorUnits: ['L'],
    denominatorUnits: ['mL'],
    color: '#b33951'
  },
  'km_to_m': {
    label: '1000 m / 1 km',
    numeratorValue: 1000,
    denominatorValue: 1,
    numeratorUnits: ['m'],
    denominatorUnits: ['km'],
    color: '#118ab2'
  },
  'm_to_km': {
    label: '1 km / 1000 m',
    numeratorValue: 1,
    denominatorValue: 1000,
    numeratorUnits: ['km'],
    denominatorUnits: ['m'],
    color: '#b33951'
  },
  'hr_to_s': {
    label: '1 hr / 3600 s',
    numeratorValue: 1,
    denominatorValue: 3600,
    numeratorUnits: ['hr'],
    denominatorUnits: ['s'],
    color: '#118ab2'
  },
  's_to_hr': {
    label: '3600 s / 1 hr',
    numeratorValue: 3600,
    denominatorValue: 1,
    numeratorUnits: ['s'],
    denominatorUnits: ['hr'],
    color: '#b33951'
  },
  'mol_to_particles': {
    label: '6.022×10^23 particles / 1 mol',
    numeratorValue: 6.022e23,
    denominatorValue: 1,
    numeratorUnits: ['particles'],
    denominatorUnits: ['mol'],
    color: '#ef476f'
  },
  'particles_to_mol': {
    label: '1 mol / 6.022×10^23 particles',
    numeratorValue: 1,
    denominatorValue: 6.022e23,
    numeratorUnits: ['mol'],
    denominatorUnits: ['particles'],
    color: '#b33951'
  },
  'grams_to_moles_h2o': {
    label: '1 mol H₂O / 18.02 g H₂O',
    numeratorValue: 1,
    denominatorValue: 18.02,
    numeratorUnits: ['mol'],
    denominatorUnits: ['g'],
    color: '#ef476f'
  },
  'grams_to_moles_nacl': {
    label: '1 mol NaCl / 58.44 g NaCl',
    numeratorValue: 1,
    denominatorValue: 58.44,
    numeratorUnits: ['mol'],
    denominatorUnits: ['g'],
    color: '#ef476f'
  },
  'mol_to_liters_stp': {
    label: '22.4 L / 1 mol',
    numeratorValue: 22.4,
    denominatorValue: 1,
    numeratorUnits: ['L'],
    denominatorUnits: ['mol'],
    color: '#06d6a0'
  },
  'liters_to_mol_stp': {
    label: '1 mol / 22.4 L',
    numeratorValue: 1,
    denominatorValue: 22.4,
    numeratorUnits: ['mol'],
    denominatorUnits: ['L'],
    color: '#b33951'
  }
};

Object.entries(FACTORS).forEach(([id, data]) => {
  data.id = id;
});

const PROBLEMS = [
  {
    id: 'kg_to_g_problem',
    level: 1,
    prompt: 'Convert 2.50 kg to grams.',
    startValue: 2.5,
    startUnits: { num: ['kg'], den: [] },
    targetUnits: { num: ['g'], den: [] },
    startUnitLabel: 'kg',
    targetUnitLabel: 'g',
    factorIds: ['kg_to_g'],
    distractors: ['g_to_kg', 'm_to_cm', 'mL_to_L']
  },
  {
    id: 'cm_to_m_problem',
    level: 1,
    prompt: 'Convert 450 cm to meters.',
    startValue: 450,
    startUnits: { num: ['cm'], den: [] },
    targetUnits: { num: ['m'], den: [] },
    startUnitLabel: 'cm',
    targetUnitLabel: 'm',
    factorIds: ['cm_to_m'],
    distractors: ['m_to_cm', 'kg_to_g', 's_to_hr']
  },
  {
    id: 'l_to_ml_problem',
    level: 1,
    prompt: 'Convert 1.80 L to milliliters.',
    startValue: 1.8,
    startUnits: { num: ['L'], den: [] },
    targetUnits: { num: ['mL'], den: [] },
    startUnitLabel: 'L',
    targetUnitLabel: 'mL',
    factorIds: ['L_to_mL'],
    distractors: ['mL_to_L', 'g_to_kg', 'm_to_cm']
  },
  {
    id: 'kmh_to_ms_problem',
    level: 2,
    prompt: 'Convert 65.0 km/hr to m/s.',
    startValue: 65,
    startUnits: { num: ['km'], den: ['hr'] },
    targetUnits: { num: ['m'], den: ['s'] },
    startUnitLabel: 'km/hr',
    targetUnitLabel: 'm/s',
    factorIds: ['km_to_m', 'hr_to_s'],
    distractors: ['m_to_km', 's_to_hr', 'mL_to_L']
  },
  {
    id: 'ms_to_kmh_problem',
    level: 2,
    prompt: 'Convert 12.0 m/s to km/hr.',
    startValue: 12,
    startUnits: { num: ['m'], den: ['s'] },
    targetUnits: { num: ['km'], den: ['hr'] },
    startUnitLabel: 'm/s',
    targetUnitLabel: 'km/hr',
    factorIds: ['m_to_km', 's_to_hr'],
    distractors: ['km_to_m', 'hr_to_s', 'mL_to_L']
  },
  {
    id: 'kmh_to_ms_problem_2',
    level: 2,
    prompt: 'Convert 90.0 km/hr to m/s.',
    startValue: 90,
    startUnits: { num: ['km'], den: ['hr'] },
    targetUnits: { num: ['m'], den: ['s'] },
    startUnitLabel: 'km/hr',
    targetUnitLabel: 'm/s',
    factorIds: ['km_to_m', 'hr_to_s'],
    distractors: ['m_to_km', 's_to_hr', 'g_to_kg']
  },
  {
    id: 'mol_to_particles_problem',
    level: 3,
    prompt: 'Convert 0.750 mol to number of particles.',
    startValue: 0.75,
    startUnits: { num: ['mol'], den: [] },
    targetUnits: { num: ['particles'], den: [] },
    startUnitLabel: 'mol',
    targetUnitLabel: 'particles',
    factorIds: ['mol_to_particles'],
    distractors: ['particles_to_mol', 'grams_to_moles_h2o', 'mol_to_liters_stp']
  },
  {
    id: 'grams_h2o_to_particles_problem',
    level: 3,
    prompt: 'Convert 18.0 g of H₂O to number of molecules.',
    startValue: 18.0,
    startUnits: { num: ['g'], den: [] },
    targetUnits: { num: ['particles'], den: [] },
    startUnitLabel: 'g H₂O',
    targetUnitLabel: 'molecules',
    factorIds: ['grams_to_moles_h2o', 'mol_to_particles'],
    distractors: ['grams_to_moles_nacl', 'mol_to_liters_stp', 's_to_hr']
  },
  {
    id: 'grams_nacl_to_moles_problem',
    level: 3,
    prompt: 'Convert 25.0 g of NaCl to moles.',
    startValue: 25.0,
    startUnits: { num: ['g'], den: [] },
    targetUnits: { num: ['mol'], den: [] },
    startUnitLabel: 'g NaCl',
    targetUnitLabel: 'mol',
    factorIds: ['grams_to_moles_nacl'],
    distractors: ['grams_to_moles_h2o', 'mol_to_particles', 'mol_to_liters_stp']
  },
  {
    id: 'mol_to_liters_problem',
    level: 3,
    prompt: 'Convert 2.50 mol of CO₂ to liters at STP.',
    startValue: 2.5,
    startUnits: { num: ['mol'], den: [] },
    targetUnits: { num: ['L'], den: [] },
    startUnitLabel: 'mol',
    targetUnitLabel: 'L at STP',
    factorIds: ['mol_to_liters_stp'],
    distractors: ['liters_to_mol_stp', 'mol_to_particles', 'g_to_kg']
  }
];

PROBLEMS.forEach(problem => {
  if (!problem.targetValue) {
    let val = problem.startValue;
    problem.factorIds.forEach(id => {
      const f = FACTORS[id];
      val *= f.numeratorValue / f.denominatorValue;
    });
    problem.targetValue = val;
  }
});

function setup() {
  parentEl = document.querySelector('main');
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(parentEl);

  newProblemBtn = createButton('New Problem');
  newProblemBtn.mousePressed(() => startNewProblem());

  checkBtn = createButton('Check Answer');
  checkBtn.mousePressed(() => checkAnswer());

  undoBtn = createButton('Undo Last Factor');
  undoBtn.mousePressed(() => {
    workspaceChain.pop();
    statusMessage = 'Removed the most recent conversion factor.';
  });

  positionControls();
  startNewProblem();
}

function positionControls() {
  const y = drawHeight + 12;
  if (newProblemBtn) newProblemBtn.position(margin, y);
  if (checkBtn) checkBtn.position(margin + 160, y);
  if (undoBtn) undoBtn.position(margin + 320, y);
}

function updateCanvasSize() {
  const containerWidth = parentEl ? parentEl.clientWidth : 0;
  const fallbackWidth = window.innerWidth || windowWidth || 960;
  const targetWidth = containerWidth > 0 ? containerWidth : fallbackWidth;
  if (Math.abs(targetWidth - canvasWidth) > 2) {
    canvasWidth = targetWidth;
    resizeCanvas?.(canvasWidth, canvasHeight);
    positionControls();
  }
}

function windowResized() {
  updateCanvasSize();
}

function startNewProblem() {
  currentProblem = random(PROBLEMS);
  workspaceChain = [];
  statusMessage = 'Click a conversion tile to add it to the workspace.';
  buildFactorSet();
}

function buildFactorSet() {
  const ids = [...currentProblem.factorIds];
  const distractors = [...(currentProblem.distractors || [])];
  shuffleArray(distractors);
  while (ids.length < Math.min(6, currentProblem.factorIds.length + distractors.length)) {
    const next = distractors.shift();
    if (!next) break;
    if (!ids.includes(next)) ids.push(next);
  }
  shuffleArray(ids);
  availableFactorIds = ids;
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  noStroke();
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);

  // Control strip background
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  stroke('#c7d7ef');
  line(0, drawHeight, canvasWidth, drawHeight);
  noStroke();

  if (!currentProblem) return;

  drawHeader();
  drawWorkspace();
  drawUnitPanel();
  drawFactorTray();
  drawCelebration();
  drawControlStrip();
}

function drawHeader() {
  fill('#073b4c');
  textSize(24);
  textStyle(BOLD);
  text('Dimensional Analysis Practice', margin, 32);

  textSize(16);
  textStyle(NORMAL);
  text(`Level ${currentProblem.level} • ${currentProblem.prompt}`, margin, 60);

  fill('#073b4c');
  const scoreText = scoreAttempts > 0 ? `${scoreCorrect}/${scoreAttempts} correct` : '0 problems attempted';
  textAlign(RIGHT, TOP);
  text(`Score: ${scoreText}`, canvasWidth - margin, 20);
  textAlign(LEFT, BASELINE);
}

function drawWorkspace() {
  const y = 190;
  fill('#ffffff');
  stroke('#d1e8e2');
  const workspaceHeight = workspaceCardHeight * 1.6;
  rect(margin - 8, y - workspaceCardHeight, canvasWidth - margin * 2 + 16, workspaceHeight, 12);
  noStroke();

  let currentLeft = margin;
  const startLabel = `${currentProblem.startValue.toFixed(3)} ${currentProblem.startUnitLabel}`;
  drawValueCard(currentLeft, y, startLabel);
  let lastRight = currentLeft + workspaceCardWidth;

  workspaceChain.forEach(factor => {
    fill('#073b4c');
    textSize(24);
    textAlign(CENTER, CENTER);
    text('×', lastRight + workspaceCardSpacing / 2, y);
    textAlign(LEFT, BASELINE);
    currentLeft = lastRight + workspaceCardSpacing;
    drawFractionCard(currentLeft, y, factor);
    lastRight = currentLeft + workspaceCardWidth;
  });

  fill('#073b4c');
  textSize(24);
  textAlign(CENTER, CENTER);
  text('=', lastRight + workspaceCardSpacing / 2, y);
  textAlign(LEFT, BASELINE);

  const evaluation = evaluateChain();
  const finalUnits = formatUnits(evaluation.numCounts, evaluation.denCounts);
  const valueText = `${formatValue(evaluation.value)} ${finalUnits}`;
  drawValueCard(lastRight + workspaceCardSpacing, y, valueText, '#ffd166');

  fill('#0b3954');
  textSize(16);
  text(statusMessage, margin, y + workspaceCardHeight);
}

function drawValueCard(x, y, textValue, fillColor = '#118ab2') {
  fill(fillColor);
  noStroke();
  rect(x, y - workspaceCardHeight / 2, workspaceCardWidth, workspaceCardHeight, 14);
  fill('#ffffff');
  textSize(16);
  textAlign(CENTER, CENTER);
  text(textValue, x + workspaceCardWidth / 2, y);
  textAlign(LEFT, BASELINE);
}

function drawFractionCard(x, y, factor) {
  fill('#ffffff');
  stroke(factor.color);
  strokeWeight(2);
  rect(x, y - workspaceCardHeight / 2, workspaceCardWidth, workspaceCardHeight, 14);
  noStroke();
  fill('#073b4c');
  textSize(15);
  textAlign(CENTER, CENTER);
  text(`${factor.numeratorValue} ${factor.numeratorUnits.join('·')}`, x + workspaceCardWidth / 2, y - 14);
  text(`${factor.denominatorValue} ${factor.denominatorUnits.join('·')}`, x + workspaceCardWidth / 2, y + 14);
  textAlign(LEFT, BASELINE);
}

function drawUnitPanel() {
  const result = evaluateChain();
  const panelY = 290;
  const panelH = 90;
  fill('#f0f4ff');
  noStroke();
  rect(margin - 10, panelY, canvasWidth - margin * 2 + 20, panelH, 12);

  fill('#073b4c');
  textSize(16);
  text('Unit cancellation tracker', margin, panelY + 24);

  textSize(14);
  drawUnitColumn(margin, panelY + 50, 'Numerator', result.rawNumerator, result.numCounts);
  drawUnitColumn(canvasWidth / 2, panelY + 50, 'Denominator', result.rawDenominator, result.denCounts);
}

function drawUnitColumn(x, y, label, rawCounts, remainingCounts) {
  fill('#118ab2');
  text(label, x, y);
  let offset = 18;
  Object.keys(rawCounts).forEach(unit => {
    const raw = rawCounts[unit] || 0;
    const remaining = remainingCounts[unit] || 0;
    if (raw === 0) return;
    const textY = y + offset;
    if (remaining === 0) {
      fill('#118a0a');
      text(`${unit} canceled`, x, textY);
      stroke('#118a0a');
      line(x, textY - 6, x + textWidth(`${unit} canceled`), textY - 6);
      noStroke();
    } else {
      fill('#ef476f');
      textStyle(BOLD);
      text(`${unit} × ${remaining}`, x, textY);
      textStyle(NORMAL);
    }
    offset += 20;
  });
}

function drawFactorTray() {
  const trayHeight = 190;
  const trayY = drawHeight - trayHeight - 12;
  fill('#083d77');
  rect(0, trayY, canvasWidth, trayHeight);
  fill('#f7fff7');
  textSize(16);
  textAlign(CENTER, TOP);
  text('Conversion factor tiles (click to add to the workspace):', canvasWidth / 2, trayY + 14);

  const columns = max(3, floor(canvasWidth / 220));
  const totalPadding = 40;
  const available = canvasWidth - totalPadding;
  const spacing = 12;
  const cardWidth = (available - (columns - 1) * spacing) / columns;
  const cardHeight = 58;
  factorCardLayout = [];

  availableFactorIds.forEach((id, idx) => {
    const factor = FACTORS[id];
    const row = floor(idx / columns);
    const col = idx % columns;
    const startX = (canvasWidth - (cardWidth * columns + spacing * (columns - 1))) / 2;
    const x = startX + col * (cardWidth + spacing);
    const y = trayY + 44 + row * (cardHeight + 12);

    const hovered = mouseX >= x && mouseX <= x + cardWidth && mouseY >= y && mouseY <= y + cardHeight;
    fill(hovered ? '#ffe066' : '#ffffff');
    stroke(factor.color);
    strokeWeight(2);
    rect(x, y, cardWidth, cardHeight, 10);
    noStroke();
    fill('#073b4c');
    textAlign(CENTER, CENTER);
    textSize(14);
    text(factor.label, x + cardWidth / 2, y + cardHeight / 2);
    textAlign(LEFT, BASELINE);

    factorCardLayout.push({ id, x, y, w: cardWidth, h: cardHeight });
  });
}

function drawControlStrip() {
  fill('#0f172a');
  textSize(15);
  textAlign(LEFT, CENTER);
  const message = 'Click tiles to build the conversion chain, then press Check Answer. Undo removes the last tile.';
  text(message, margin, drawHeight + controlHeight / 2);
  textAlign(LEFT, BASELINE);
}

function mousePressed() {
  for (const card of factorCardLayout) {
    if (mouseX >= card.x && mouseX <= card.x + card.w && mouseY >= card.y && mouseY <= card.y + card.h) {
      workspaceChain.push(FACTORS[card.id]);
      statusMessage = `Added ${FACTORS[card.id].label}`;
      return;
    }
  }
}

function evaluateChain() {
  if (!currentProblem) {
    return {
      value: 0,
      numCounts: {},
      denCounts: {},
      rawNumerator: {},
      rawDenominator: {}
    };
  }
  let value = currentProblem.startValue;
  const rawNumerator = {};
  const rawDenominator = {};
  const numCounts = {};
  const denCounts = {};

  const addUnits = (counts, units) => {
    units.forEach(unit => {
      counts[unit] = (counts[unit] || 0) + 1;
    });
  };

  addUnits(rawNumerator, currentProblem.startUnits.num);
  addUnits(numCounts, currentProblem.startUnits.num);
  addUnits(rawDenominator, currentProblem.startUnits.den);
  addUnits(denCounts, currentProblem.startUnits.den);

  workspaceChain.forEach(factor => {
    value *= factor.numeratorValue / factor.denominatorValue;
    addUnits(rawNumerator, factor.numeratorUnits);
    addUnits(numCounts, factor.numeratorUnits);
    addUnits(rawDenominator, factor.denominatorUnits);
    addUnits(denCounts, factor.denominatorUnits);
  });

  const allUnits = new Set([...Object.keys(numCounts), ...Object.keys(denCounts)]);
  allUnits.forEach(unit => {
    const common = Math.min(numCounts[unit] || 0, denCounts[unit] || 0);
    if (common > 0) {
      numCounts[unit] -= common;
      denCounts[unit] -= common;
    }
  });

  return { value, numCounts, denCounts, rawNumerator, rawDenominator };
}

function checkAnswer() {
  if (!currentProblem) return;
  const result = evaluateChain();
  if (workspaceChain.length === 0) {
    statusMessage = 'Add at least one conversion factor before checking.';
    return;
  }
  scoreAttempts += 1;

  const unitsOK = unitsMatchTarget(result);
  const valueOK = valueMatches(result.value, currentProblem.targetValue);

  if (unitsOK && valueOK) {
    scoreCorrect += 1;
    statusMessage = 'Great job! Units cancel and the numeric value matches the target.';
    triggerCelebration();
    startNewProblem();
  } else if (!unitsOK) {
    statusMessage = 'Units do not match the target yet. Revisit your factors.';
  } else {
    statusMessage = `Numeric value off target. Current: ${formatValue(result.value)} ${formatUnits(result.numCounts, result.denCounts)}`;
  }
}

function unitsMatchTarget(result) {
  const compare = (counts, targetList) => {
    const targetCounts = {};
    targetList.forEach(unit => {
      targetCounts[unit] = (targetCounts[unit] || 0) + 1;
    });
    const keys = new Set([...Object.keys(counts), ...Object.keys(targetCounts)]);
    for (const key of keys) {
      if ((counts[key] || 0) !== (targetCounts[key] || 0)) {
        return false;
      }
    }
    return true;
  };
  return compare(result.numCounts, currentProblem.targetUnits.num) && compare(result.denCounts, currentProblem.targetUnits.den);
}

function valueMatches(value, target) {
  if (!isFinite(value)) return false;
  const tolerance = Math.max(0.01, Math.abs(target) * 0.01);
  return Math.abs(value - target) <= tolerance;
}

function formatUnits(numCounts, denCounts) {
  const top = Object.keys(numCounts)
    .filter(key => numCounts[key] > 0)
    .map(key => (numCounts[key] > 1 ? `${key}^${numCounts[key]}` : key));
  const bottom = Object.keys(denCounts)
    .filter(key => denCounts[key] > 0)
    .map(key => (denCounts[key] > 1 ? `${key}^${denCounts[key]}` : key));
  if (top.length === 0 && bottom.length === 0) return '';
  if (bottom.length === 0) return top.join('·');
  if (top.length === 0) return `1/${bottom.join('·')}`;
  return `${top.join('·')}/${bottom.join('·')}`;
}

function formatValue(val) {
  if (Math.abs(val) >= 1000 || Math.abs(val) <= 0.01) {
    return val.toExponential(2);
  }
  return val.toFixed(3);
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function triggerCelebration() {
  celebrationParticles = [];
  const count = 90;
  for (let i = 0; i < count; i++) {
    celebrationParticles.push({
      x: canvasWidth / 2,
      y: drawHeight / 2,
      vx: random(-4.5, 4.5),
      vy: random(-6, -1.5),
      size: random(8, 18),
      life: 120,
      color: color(random(200, 255), random(120, 220), random(120, 255))
    });
  }
}

function drawCelebration() {
  for (let i = celebrationParticles.length - 1; i >= 0; i--) {
    const p = celebrationParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.05;
    p.life -= 1;
    push();
    translate(p.x, p.y);
    fill(p.color);
    noStroke();
    drawStar(p.size);
    pop();
    if (p.life <= 0) celebrationParticles.splice(i, 1);
  }
}

function drawStar(size) {
  beginShape();
  for (let i = 0; i < 5; i++) {
    const angle = i * TWO_PI / 5 - HALF_PI;
    const x = cos(angle) * size;
    const y = sin(angle) * size;
    vertex(x, y);
    const innerAngle = angle + TWO_PI / 10;
    const innerX = cos(innerAngle) * (size / 2);
    const innerY = sin(innerAngle) * (size / 2);
    vertex(innerX, innerY);
  }
  endShape(CLOSE);
}
