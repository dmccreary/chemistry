// Lewis Structure Builder MicroSim
// Follows p5.js MicroSim template (title centered top, controls in control strip)

let containerWidth;
let canvasWidth = 860;
let drawHeight = 520;
let controlHeight = 110;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

const margin = 20;
const defaultTextSize = 16;

let moleculeSelect;
let nextButton;
let resetButton;
let countCheckbox;

let showCounts = true;
let currentMoleculeKey = 'H2O';
let currentStep = 1;

const steps = [
  '1. Count total valence electrons',
  '2. Choose the central atom',
  '3. Connect terminals with single bonds',
  '4. Complete octets on terminals',
  '5. Place remaining lone pairs on central atom',
  '6. Form multiple bonds if needed'
];

const molecules = {
  H2O: {
    name: 'Water',
    totalValence: 8,
    atoms: [
      { symbol: 'O', role: 'central', x: 0, y: 0 },
      { symbol: 'H', role: 'terminal', x: -120, y: 60 },
      { symbol: 'H', role: 'terminal', x: 120, y: 60 }
    ],
    bonds: [
      { a: 0, b: 1, finalOrder: 1 },
      { a: 0, b: 2, finalOrder: 1 }
    ],
    electronNeeds: { central: 4, terminals: 2 }
  },
  NH3: {
    name: 'Ammonia',
    totalValence: 8,
    atoms: [
      { symbol: 'N', role: 'central', x: 0, y: -10 },
      { symbol: 'H', role: 'terminal', x: -150, y: 60 },
      { symbol: 'H', role: 'terminal', x: 0, y: 90 },
      { symbol: 'H', role: 'terminal', x: 150, y: 60 }
    ],
    bonds: [
      { a: 0, b: 1, finalOrder: 1 },
      { a: 0, b: 2, finalOrder: 1 },
      { a: 0, b: 3, finalOrder: 1 }
    ],
    electronNeeds: { central: 2, terminals: 2 }
  },
  CO2: {
    name: 'Carbon Dioxide',
    totalValence: 16,
    atoms: [
      { symbol: 'O', role: 'terminal', x: -200, y: 20 },
      { symbol: 'C', role: 'central', x: 0, y: 20 },
      { symbol: 'O', role: 'terminal', x: 200, y: 20 }
    ],
    bonds: [
      { a: 0, b: 1, finalOrder: 2 },
      { a: 1, b: 2, finalOrder: 2 }
    ],
    electronNeeds: { central: 0, terminals: 4 }
  },
  SO2: {
    name: 'Sulfur Dioxide',
    totalValence: 18,
    atoms: [
      { symbol: 'O', role: 'terminal', x: -160, y: 50 },
      { symbol: 'S', role: 'central', x: 0, y: 0 },
      { symbol: 'O', role: 'terminal', x: 160, y: 50 }
    ],
    bonds: [
      { a: 0, b: 1, finalOrder: 2 },
      { a: 1, b: 2, finalOrder: 1 }
    ],
    electronNeeds: { central: 2, terminals: 4 }
  },
  PCl3: {
    name: 'Phosphorus Trichloride',
    totalValence: 26,
    atoms: [
      { symbol: 'P', role: 'central', x: 0, y: -20 },
      { symbol: 'Cl', role: 'terminal', x: -170, y: 80 },
      { symbol: 'Cl', role: 'terminal', x: 0, y: 110 },
      { symbol: 'Cl', role: 'terminal', x: 170, y: 80 }
    ],
    bonds: [
      { a: 0, b: 1, finalOrder: 1 },
      { a: 0, b: 2, finalOrder: 1 },
      { a: 0, b: 3, finalOrder: 1 }
    ],
    electronNeeds: { central: 2, terminals: 6 }
  },
  CH4: {
    name: 'Methane',
    totalValence: 8,
    atoms: [
      { symbol: 'C', role: 'central', x: 0, y: 0 },
      { symbol: 'H', role: 'terminal', x: -150, y: -10 },
      { symbol: 'H', role: 'terminal', x: 150, y: -10 },
      { symbol: 'H', role: 'terminal', x: -80, y: 110 },
      { symbol: 'H', role: 'terminal', x: 80, y: 110 }
    ],
    bonds: [
      { a: 0, b: 1, finalOrder: 1 },
      { a: 0, b: 2, finalOrder: 1 },
      { a: 0, b: 3, finalOrder: 1 },
      { a: 0, b: 4, finalOrder: 1 }
    ],
    electronNeeds: { central: 0, terminals: 2 }
  },
  HCN: {
    name: 'Hydrogen Cyanide',
    totalValence: 10,
    atoms: [
      { symbol: 'H', role: 'terminal', x: -220, y: 20 },
      { symbol: 'C', role: 'central', x: -20, y: 20 },
      { symbol: 'N', role: 'terminal', x: 200, y: 20 }
    ],
    bonds: [
      { a: 0, b: 1, finalOrder: 1 },
      { a: 1, b: 2, finalOrder: 3 }
    ],
    electronNeeds: { central: 0, terminals: 4 }
  }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  moleculeSelect = createSelect();
  for (const key of Object.keys(molecules)) {
    moleculeSelect.option(key);
  }
  moleculeSelect.value(currentMoleculeKey);
  moleculeSelect.changed(handleMoleculeChange);

  nextButton = createButton('Next Step');
  nextButton.mousePressed(handleNextStep);

  resetButton = createButton('Reset');
  resetButton.mousePressed(handleReset);

  countCheckbox = createCheckbox('Show Electron Counts', true);
  countCheckbox.changed(() => {
    showCounts = countCheckbox.checked();
  });

  positionControls();
  describe('Step-by-step Lewis structure builder with molecule selector, procedure checklist, and electron tracker.', LABEL);
}

function draw() {
  updateCanvasSize();
  fill('#f5f5f5');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawTitle();
  drawStepPanel();
  drawStructureCanvas();
  drawElectronPanel();
  drawControlLabels();
}

function drawTitle() {
  fill('#1b2d42');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(30);
  text('Lewis Structure Builder', canvasWidth / 2, margin / 2);
}

function drawStepPanel() {
  const panelWidth = 220;
  const panelX = margin;
  const panelY = margin + 50;
  fill('#eff2fa');
  stroke('#c7d0e0');
  rect(panelX, panelY, panelWidth, drawHeight - panelY - margin, 12);
  textAlign(LEFT, TOP);
  noStroke();
  textSize(14);
  fill('#2b3953');
  text('Six-Step Checklist', panelX + 12, panelY + 12);
  for (let i = 0; i < steps.length; i++) {
    const stepY = panelY + 40 + i * 50;
    const active = currentStep === i + 1;
    fill(active ? '#1e88e5' : '#dee6f5');
    rect(panelX + 12, stepY, panelWidth - 24, 36, 8);
    fill(active ? 'white' : '#233149');
    text(steps[i], panelX + 22, stepY + 10);
  }
}

function drawStructureCanvas() {
  const originX = canvasWidth / 2;
  const originY = drawHeight / 2 + 20;
  const molecule = molecules[currentMoleculeKey];

  // Step-specific visuals
  const bondsToDraw = molecule.bonds.filter(() => currentStep >= 3);

  // Background area
  fill('white');
  stroke('#dcdcdc');
  rect(margin + 240, margin + 90, canvasWidth - 240 - margin - 210, drawHeight - (margin + 110), 14);
  fill('#2d3a4d');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text(`Selected Molecule: ${molecule.name}`, margin + 260, margin + 102);

  push();
  translate(originX, originY);
  // Bonds
  stroke('#222');
  strokeWeight(3);
  for (const bond of bondsToDraw) {
    const atomA = molecule.atoms[bond.a];
    const atomB = molecule.atoms[bond.b];
    const order = currentStep >= 6 ? bond.finalOrder : 1;
    drawBond(atomA, atomB, order);
  }

  // Atoms
  for (const atom of molecule.atoms) {
    drawAtom(atom);
    if (showCounts && currentStep >= 4) {
      drawElectronBadge(atom);
    }
  }
  pop();
}

function drawBond(atomA, atomB, order) {
  const offset = createVector(atomB.x - atomA.x, atomB.y - atomA.y);
  const normal = createVector(-offset.y, offset.x).setMag(8);
  for (let i = 0; i < order; i++) {
    const shift = (i - (order - 1) / 2) * 6;
    const shiftVec = normal.copy().setMag(shift);
    line(
      atomA.x + shiftVec.x,
      atomA.y + shiftVec.y,
      atomB.x + shiftVec.x,
      atomB.y + shiftVec.y
    );
  }
}

function drawAtom(atom) {
  fill(atom.role === 'central' ? '#1e88e5' : '#546e7a');
  noStroke();
  ellipse(atom.x, atom.y, 54, 54);
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(18);
  text(atom.symbol, atom.x, atom.y);
  if (currentStep >= 4) {
    drawLonePairs(atom);
  }
}

function drawLonePairs(atom) {
  const molecule = molecules[currentMoleculeKey];
  const stepsFactor = atom.role === 'central' ? 5 : 4;
  if (currentStep < stepsFactor) {
    return;
  }
  const pairCount = atom.role === 'central' ? molecule.electronNeeds.central : molecule.electronNeeds.terminals;
  stroke('#f5d142');
  strokeWeight(3);
  noFill();
  const radius = 32;
  for (let i = 0; i < pairCount; i++) {
    const angle = (TWO_PI / pairCount) * i;
    const x = atom.x + cos(angle) * radius;
    const y = atom.y + sin(angle) * radius;
    line(x - 4, y, x + 4, y);
  }
}

function drawElectronBadge(atom) {
  const satisfied = atom.role === 'central' ? currentStep >= 5 : currentStep >= 4;
  const badgeColor = satisfied ? '#4caf50' : '#e53935';
  fill(badgeColor);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  const x = atom.x + 25;
  const y = atom.y - 25;
  ellipse(x, y, 36, 20);
  fill('white');
  text(satisfied ? 'Octet OK' : 'Needs e⁻', x, y);
}

function drawElectronPanel() {
  const panelWidth = 200;
  const x = canvasWidth - panelWidth - margin;
  const y = margin + 70;
  fill('#f0f7ff');
  stroke('#c2d7f5');
  rect(x, y, panelWidth, drawHeight - y - margin, 12);
  noStroke();
  fill('#18314f');
  textAlign(CENTER, TOP);
  textSize(16);
  text('Electron Tracker', x + panelWidth / 2, y + 12);

  const molecule = molecules[currentMoleculeKey];
  fill('#1f2f46');
  textSize(14);
  textAlign(LEFT, TOP);
  const totals = getElectronTotals(molecule);
  text(`Valence total: ${molecule.totalValence}`, x + 16, y + 48);
  text(`Bonding used: ${totals.bondElectrons}`, x + 16, y + 74);
  text(`Lone pairs used: ${totals.loneElectrons}`, x + 16, y + 100);
  text(`Remaining: ${max(0, molecule.totalValence - totals.totalUsed)}`, x + 16, y + 126);
}

function getElectronTotals(molecule) {
  const bondElectrons = molecule.bonds.length * 2 * (currentStep >= 3 ? 1 : 0);
  const loneElectrons = currentStep >= 4 ? (molecule.totalValence - bondElectrons) : 0;
  return { bondElectrons, loneElectrons, totalUsed: bondElectrons + loneElectrons };
}

function drawControlLabels() {
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Molecule:', margin, drawHeight + 28);
}

function handleMoleculeChange() {
  currentMoleculeKey = moleculeSelect.value();
  currentStep = 1;
}

function handleNextStep() {
  currentStep = min(6, currentStep + 1);
}

function handleReset() {
  currentStep = 1;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  positionControls();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
  canvasHeight = drawHeight + controlHeight;
  containerHeight = canvasHeight;
}

function positionControls() {
  const baseY = drawHeight + 40;
  if (moleculeSelect) {
    moleculeSelect.position(margin + 110, baseY - 25);
  }
  if (nextButton) {
    nextButton.position(margin + 320, baseY - 30);
  }
  if (resetButton) {
    resetButton.position(margin + 420, baseY - 30);
  }
  if (countCheckbox) {
    countCheckbox.position(margin + 520, baseY - 28);
  }
}
