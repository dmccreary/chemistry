// MO Energy Diagram Explorer MicroSim
// Title centered top, controls in control strip

let containerWidth;
let canvasWidth = 860;
let drawHeight = 560;
let controlHeight = 110;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

const margin = 20;
const defaultTextSize = 16;

let moleculeSelect;
let currentMolecule = 'O2';
let occupancy = [];
let bondingCount = 0;
let antibondingCount = 0;
let unpairedCount = 0;

const schemes = {
  early: [
    { id: 'sigma1s', label: 'σ1s', type: 'bonding', degeneracy: 1 },
    { id: 'sigma1s_star', label: 'σ*1s', type: 'antibonding', degeneracy: 1 },
    { id: 'sigma2s', label: 'σ2s', type: 'bonding', degeneracy: 1 },
    { id: 'sigma2s_star', label: 'σ*2s', type: 'antibonding', degeneracy: 1 },
    { id: 'pi2p', label: 'π2p', type: 'bonding', degeneracy: 2 },
    { id: 'sigma2p', label: 'σ2p', type: 'bonding', degeneracy: 1 },
    { id: 'pi2p_star', label: 'π*2p', type: 'antibonding', degeneracy: 2 },
    { id: 'sigma2p_star', label: 'σ*2p', type: 'antibonding', degeneracy: 1 }
  ],
  late: [
    { id: 'sigma1s', label: 'σ1s', type: 'bonding', degeneracy: 1 },
    { id: 'sigma1s_star', label: 'σ*1s', type: 'antibonding', degeneracy: 1 },
    { id: 'sigma2s', label: 'σ2s', type: 'bonding', degeneracy: 1 },
    { id: 'sigma2s_star', label: 'σ*2s', type: 'antibonding', degeneracy: 1 },
    { id: 'sigma2p', label: 'σ2p', type: 'bonding', degeneracy: 1 },
    { id: 'pi2p', label: 'π2p', type: 'bonding', degeneracy: 2 },
    { id: 'pi2p_star', label: 'π*2p', type: 'antibonding', degeneracy: 2 },
    { id: 'sigma2p_star', label: 'σ*2p', type: 'antibonding', degeneracy: 1 }
  ]
};

const molecules = {
  H2: { label: 'H₂', electrons: 2, scheme: 'early', lewis: '−' },
  He2: { label: 'He₂', electrons: 4, scheme: 'early', lewis: '×' },
  Li2: { label: 'Li₂', electrons: 2, scheme: 'early', lewis: '−' },
  B2: { label: 'B₂', electrons: 6, scheme: 'early', lewis: '−' },
  C2: { label: 'C₂', electrons: 8, scheme: 'early', lewis: '=' },
  N2: { label: 'N₂', electrons: 10, scheme: 'early', lewis: '≡' },
  O2: { label: 'O₂', electrons: 12, scheme: 'late', lewis: '=' },
  F2: { label: 'F₂', electrons: 14, scheme: 'late', lewis: '−' },
  Ne2: { label: 'Ne₂', electrons: 16, scheme: 'late', lewis: '×' },
  O2minus: { label: 'O₂⁻', electrons: 13, scheme: 'late', lewis: '=' },
  O2plus: { label: 'O₂⁺', electrons: 11, scheme: 'late', lewis: '=' },
  NO: { label: 'NO', electrons: 11, scheme: 'late', lewis: '≡' },
  CO: { label: 'CO', electrons: 10, scheme: 'late', lewis: '≡' }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  moleculeSelect = createSelect();
  for (const key of Object.keys(molecules)) {
    moleculeSelect.option(key, key);
  }
  moleculeSelect.value(currentMolecule);
  moleculeSelect.changed(() => {
    currentMolecule = moleculeSelect.value();
    fillMOs();
    redraw();
  });

  fillMOs();
  positionControls();
  describe('Interactive MO energy diagram with molecule selector, bond order calculation, and magnetism indicator.', LABEL);
}

function draw() {
  updateCanvasSize();
  fill('#0a1420');
  stroke('#32435a');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawTitle();
  drawInfoPanel();
  drawDiagram();
  drawResultsPanel();
  drawControlLabels();
}

function drawTitle() {
  fill('white');
  textAlign(CENTER, TOP);
  textSize(30);
  text('Molecular Orbital Energy Diagram', canvasWidth / 2, margin / 2);
}

function drawInfoPanel() {
  const panelWidth = 200;
  const x = margin;
  const y = margin + 60;
  fill('#172334');
  rect(x, y, panelWidth, drawHeight - y - margin, 10);
  fill('white');
  textAlign(CENTER, TOP);
  textSize(18);
  const molecule = molecules[currentMolecule];
  text(`Molecule: ${molecule.label}`, x + panelWidth / 2, y + 20);
  textSize(16);
  text(`Valence electrons: ${molecule.electrons}`, x + panelWidth / 2, y + 60);
  textAlign(LEFT, TOP);
  textSize(14);
  text('AO Levels (per atom):', x + 16, y + 110);
  fill('#9fbad6');
  text('- 1s', x + 16, y + 135);
  text('- 2s', x + 16, y + 155);
  text('- 2p (degenerate)', x + 16, y + 175);
}

function drawDiagram() {
  const leftX = margin + 220;
  const rightX = canvasWidth - margin - 220;
  const centerX = (leftX + rightX) / 2;
  const topY = margin + 40;
  const height = drawHeight - topY - margin;

  stroke('#5c6f82');
  strokeWeight(1.5);
  // Atomic orbital columns
  drawAOColumn(leftX, topY, height, 'Atom A');
  drawAOColumn(rightX, topY, height, 'Atom B');

  // MO levels
  const scheme = schemes[molecules[currentMolecule].scheme];
  const levelSpacing = height / (scheme.length + 1);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < scheme.length; i++) {
    const level = scheme[i];
    const y = topY + levelSpacing * (i + 1);
    const colorValue = level.type === 'bonding' ? '#3498db' : '#e74c3c';
    stroke(colorValue);
    strokeWeight(3);
    line(centerX - 60, y, centerX + 60, y);
    noStroke();
    fill('white');
    text(level.label, centerX, y - 12);

    // dashed connectors
    stroke('rgba(255,255,255,0.3)');
    drawingContext.setLineDash([6, 6]);
    line(leftX + 40, y, centerX - 60, y);
    line(centerX + 60, y, rightX - 40, y);
    drawingContext.setLineDash([]);

    drawElectrons(level, y, centerX);
  }
}

function drawAOColumn(x, topY, height, label) {
  fill('white');
  textAlign(CENTER, TOP);
  text(label, x, topY - 10);
  stroke('white');
  strokeWeight(2);
  const levels = ['2p', '2s', '1s'];
  const spacing = height / (levels.length + 1);
  for (let i = 0; i < levels.length; i++) {
    const y = topY + spacing * (i + 1);
    line(x - 50, y, x + 50, y);
    noStroke();
    fill('white');
    text(levels[i], x, y - 12);
    stroke('white');
  }
}

function drawElectrons(level, y, centerX) {
  const entry = occupancy.find(o => o.id === level.id);
  if (!entry) return;
  const spacing = 30;
  for (let i = 0; i < entry.orbitals.length; i++) {
    const electrons = entry.orbitals[i];
    const x = centerX - spacing * (entry.orbitals.length - 1) / 2 + spacing * i;
    if (electrons >= 1) {
      drawArrow(x, y - 20, true);
    }
    if (electrons === 2) {
      drawArrow(x, y - 20, false);
    }
  }
}

function drawArrow(x, y, up) {
  stroke('black');
  strokeWeight(2);
  line(x, y, x, y - 18 * (up ? 1 : -1));
  if (up) {
    line(x, y - 18, x - 4, y - 10);
    line(x, y - 18, x + 4, y - 10);
  } else {
    line(x, y + 18, x - 4, y + 10);
    line(x, y + 18, x + 4, y + 10);
  }
}

function drawResultsPanel() {
  const panelWidth = 160;
  const x = canvasWidth - panelWidth - margin;
  const y = margin + 60;
  fill('#172334');
  rect(x, y, panelWidth, drawHeight - y - margin, 10);
  fill('white');
  textAlign(CENTER, TOP);
  textSize(18);
  text('Results', x + panelWidth / 2, y + 16);
  textAlign(LEFT, TOP);
  textSize(16);
  const bondOrder = (bondingCount - antibondingCount) / 2;
  const classification = classifyBondOrder(bondOrder);
  text(`Bonding e⁻: ${bondingCount}`, x + 16, y + 60);
  text(`Antibonding e⁻: ${antibondingCount}`, x + 16, y + 90);
  fill(classification.color);
  textSize(22);
  text(`Bond order: ${bondOrder.toFixed(1)}`, x + 16, y + 130);
  text(`${classification.label}`, x + 16, y + 160);
  fill('white');
  textSize(16);
  const magnetism = unpairedCount > 0 ? `Paramagnetic (${unpairedCount} unpaired)` : 'Diamagnetic';
  text(magnetism, x + 16, y + 200);
  const lewis = molecules[currentMolecule].lewis;
  text(`Lewis bond: ${lewis}`, x + 16, y + 230);
}

function drawControlLabels() {
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Select Molecule:', margin, drawHeight + 30);
}

function classifyBondOrder(order) {
  if (order >= 2.5) return { label: 'Triple bond', color: '#27ae60' };
  if (order >= 1.5) return { label: 'Double bond', color: '#2980b9' };
  if (order >= 0.5) return { label: 'Single bond', color: '#e67e22' };
  return { label: 'No bond', color: '#e74c3c' };
}

function fillMOs() {
  const molecule = molecules[currentMolecule];
  const scheme = schemes[molecule.scheme];
  const totalElectrons = molecule.electrons;
  occupancy = scheme.map(level => ({ id: level.id, orbitals: new Array(level.degeneracy).fill(0), type: level.type }));

  let remaining = totalElectrons;
  // single occupancy pass
  for (const entry of occupancy) {
    for (let i = 0; i < entry.orbitals.length && remaining > 0; i++) {
      entry.orbitals[i] = 1;
      remaining--;
    }
  }
  // pairing pass
  let changed = true;
  while (remaining > 0 && changed) {
    changed = false;
    for (const entry of occupancy) {
      for (let i = 0; i < entry.orbitals.length && remaining > 0; i++) {
        if (entry.orbitals[i] === 1) {
          entry.orbitals[i] = 2;
          remaining--;
          changed = true;
        }
      }
    }
  }

  bondingCount = 0;
  antibondingCount = 0;
  unpairedCount = 0;
  for (const entry of occupancy) {
    const total = entry.orbitals.reduce((sum, val) => sum + val, 0);
    const singles = entry.orbitals.filter(val => val === 1).length;
    unpairedCount += singles;
    if (entry.type === 'bonding') {
      bondingCount += total;
    } else {
      antibondingCount += total;
    }
  }
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
  moleculeSelect.position(margin + 180, baseY - 5);
}
