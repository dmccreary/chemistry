// Ionic Crystal Lattice Visualizer MicroSim
// Follows the standard p5.js MicroSim template

let containerWidth;
let canvasWidth = 860;
let drawHeight = 520;
let controlHeight = 65;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

const margin = 20;
const defaultTextSize = 16;

let compoundSelect;
let gridSlider;
let rotateButton;
let labelCheckbox;

let showLabels = true;
let autoRotate = false;
let currentCompound = 'NaCl';
let gridSize = 3;

let rotationX = -0.6;
let rotationY = 0.6;
let isDragging = false;
let previousMouseX = 0;
let previousMouseY = 0;

let ions = [];
let tooltip = null;

const COMPOUNDS = {
  NaCl: {
    name: 'Sodium Chloride',
    latticeEnergy: 787,
    structure: 'rocksalt',
    cation: { symbol: 'Na+', color: '#1E88E5', radius: 1.02 },
    anion: { symbol: 'Cl-', color: '#E53935', radius: 1.81 }
  },
  MgO: {
    name: 'Magnesium Oxide',
    latticeEnergy: 3795,
    structure: 'rocksalt',
    cation: { symbol: 'Mg2+', color: '#1E88E5', radius: 0.72 },
    anion: { symbol: 'O2-', color: '#E53935', radius: 1.40 }
  },
  CaF2: {
    name: 'Calcium Fluoride',
    latticeEnergy: 2634,
    structure: 'fluorite',
    cation: { symbol: 'Ca2+', color: '#1E88E5', radius: 1.00 },
    anion: { symbol: 'F-', color: '#E53935', radius: 1.33 }
  },
  CsCl: {
    name: 'Cesium Chloride',
    latticeEnergy: 657,
    structure: 'bcc',
    cation: { symbol: 'Cs+', color: '#1E88E5', radius: 1.67 },
    anion: { symbol: 'Cl-', color: '#E53935', radius: 1.81 }
  }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  compoundSelect = createSelect();
  const keys = Object.keys(COMPOUNDS);
  for (let i = 0; i < keys.length; i++) {
    compoundSelect.option(keys[i]);
  }
  compoundSelect.value(currentCompound);
  compoundSelect.changed(handleCompoundChange);

  gridSlider = createSlider(2, 4, gridSize, 1);
  gridSlider.input(handleGridChange);

  rotateButton = createButton('');
  setRotateButtonLabel();
  rotateButton.mousePressed(toggleRotation);

  labelCheckbox = createCheckbox('Show Ion Labels', true);
  labelCheckbox.changed(handleLabelToggle);

  positionControls();
  generateLattice();
  describe('Interactive ionic lattice visualizer with compound selector, grid size slider, and rotation toggle.', LABEL);
}

function draw() {
  updateCanvasSize();
  fill('#0d1117');
  stroke('#203040');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawInfoPanel();
  drawLattice();
  drawInset();
  drawControlLabels();
}

function drawInfoPanel() {
  fill('#15202f');
  noStroke();
  rect(0, 0, 220, drawHeight);
  fill('#f5f8ff');
  textAlign(LEFT, TOP);
  textSize(22);
  text('Ionic Lattice', margin, margin);

  const compound = COMPOUNDS[currentCompound];
  textSize(defaultTextSize);
  text(`Compound: ${compound.name}`, margin, margin + 40);
  text(`Lattice Energy: ${compound.latticeEnergy} kJ/mol`, margin, margin + 70);
  text(`Grid Size: ${gridSize} × ${gridSize} × ${gridSize}`, margin, margin + 100);

  textSize(14);
  text('Legend:', margin, margin + 140);
  fill(compound.cation.color);
  ellipse(margin + 10, margin + 170, 16, 16);
  fill('#f5f8ff');
  text(`${compound.cation.symbol} (cation)`, margin + 30, margin + 162);
  fill(compound.anion.color);
  ellipse(margin + 10, margin + 200, 16, 16);
  fill('#f5f8ff');
  text(`${compound.anion.symbol} (anion)`, margin + 30, margin + 192);
}

function drawLattice() {
  const centerX = canvasWidth / 2 + 60;
  const centerY = drawHeight / 2 + 40;
  const baseScale = 40 / gridSize;
  if (autoRotate && !isDragging) {
    rotationY += 0.01;
  }

  tooltip = null;
  stroke('rgba(255,255,255,0.2)');
  for (let i = 0; i < ions.length; i++) {
    const ion = ions[i];
    const projected = projectIon(ion.position, baseScale);
    for (let j = 0; j < ion.neighbors.length; j++) {
      const neighborProj = projectIon(ion.neighbors[j], baseScale);
      line(centerX + projected.x, centerY + projected.y, centerX + neighborProj.x, centerY + neighborProj.y);
    }
  }

  noStroke();
  for (let i = ions.length - 1; i >= 0; i--) {
    const ion = ions[i];
    const projected = projectIon(ion.position, baseScale);
    const screenX = centerX + projected.x;
    const screenY = centerY + projected.y;
    const colorValue = ion.isCation ? COMPOUNDS[currentCompound].cation.color : COMPOUNDS[currentCompound].anion.color;
    fill(colorValue);
    const drawRadius = max(6, ion.radius * projected.scale * 1.8);
    ellipse(screenX, screenY, drawRadius, drawRadius);

    if (showLabels) {
      fill('rgba(255,255,255,0.95)');
      textAlign(CENTER, CENTER);
      textSize(12);
      text(ion.label, screenX, screenY);
    }

    if (
      mouseX >= screenX - drawRadius / 2 && mouseX <= screenX + drawRadius / 2 &&
      mouseY >= screenY - drawRadius / 2 && mouseY <= screenY + drawRadius / 2
    ) {
      tooltip = {
        text: `${ion.label}\nRadius: ${ion.radius.toFixed(2)} Å`,
        x: mouseX + 15,
        y: mouseY - 10
      };
    }
  }

  if (tooltip) {
    fill('rgba(15,15,30,0.85)');
    noStroke();
    rect(tooltip.x, tooltip.y, 140, 42, 6);
    fill('white');
    textAlign(LEFT, TOP);
    textSize(12);
    text(tooltip.text, tooltip.x + 8, tooltip.y + 6);
  }
}

function drawInset() {
  const insetWidth = 180;
  const insetHeight = 180;
  const x = canvasWidth - insetWidth - margin;
  const y = drawHeight - insetHeight - margin;
  fill('rgba(0,0,0,0.55)');
  stroke('rgba(255,255,255,0.4)');
  rect(x, y, insetWidth, insetHeight, 12);
  fill('white');
  textAlign(CENTER, TOP);
  textSize(14);
  text('Unit Cell (schematic)', x + insetWidth / 2, y + 8);
  drawUnitCell(x + insetWidth / 2, y + insetHeight / 2 + 10);
}

function drawUnitCell(centerX, centerY) {
  const size = 70;
  const half = size / 2;
  stroke('rgba(255,255,255,0.5)');
  noFill();
  // front square
  rect(centerX - half, centerY - half, size, size);
  // back square
  rect(centerX - half + 20, centerY - half - 15, size, size);
  // edges
  line(centerX - half, centerY - half, centerX - half + 20, centerY - half - 15);
  line(centerX + half, centerY - half, centerX + half + 20, centerY - half - 15);
  line(centerX - half, centerY + half, centerX - half + 20, centerY + half - 15);
  line(centerX + half, centerY + half, centerX + half + 20, centerY + half - 15);

  const compound = COMPOUNDS[currentCompound];
  fill(compound.cation.color);
  noStroke();
  ellipse(centerX, centerY, 16, 16);
  fill(compound.anion.color);
  ellipse(centerX - half, centerY - half, 12, 12);
  ellipse(centerX + half, centerY + half, 12, 12);
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Compound:', margin, drawHeight + 20);
  text('Grid Size:', margin + 210, drawHeight + 20);
  text('Rotation:', margin, drawHeight + 45);
}

function generateLattice() {
  const compound = COMPOUNDS[currentCompound];
  ions = [];
  if (compound.structure === 'rocksalt') {
    buildRockSalt(compound);
  } else if (compound.structure === 'fluorite') {
    buildFluorite(compound);
  } else {
    buildBCC(compound);
  }
  assignNeighbors();
}

function buildRockSalt(compound) {
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      for (let z = 0; z < gridSize; z++) {
        const isCation = (x + y + z) % 2 === 0;
        const ionInfo = isCation ? compound.cation : compound.anion;
        ions.push(createIon(x, y, z, ionInfo, isCation));
      }
    }
  }
}

function buildBCC(compound) {
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      for (let z = 0; z < gridSize; z++) {
        ions.push(createIon(x, y, z, compound.anion, false));
        ions.push(createIon(x + 0.5, y + 0.5, z + 0.5, compound.cation, true));
      }
    }
  }
}

function buildFluorite(compound) {
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      for (let z = 0; z < gridSize; z++) {
        ions.push(createIon(x, y, z, compound.cation, true));
        const offsets = [
          [0.25, 0.25, 0.25],
          [0.75, 0.75, 0.25],
          [0.25, 0.75, 0.75],
          [0.75, 0.25, 0.75]
        ];
        for (let i = 0; i < offsets.length; i++) {
          const off = offsets[i];
          ions.push(createIon(x + off[0], y + off[1], z + off[2], compound.anion, false));
        }
      }
    }
  }
}

function createIon(x, y, z, ionInfo, isCation) {
  return {
    position: createVector((x - gridSize / 2) * 20, (y - gridSize / 2) * 20, (z - gridSize / 2) * 20),
    radius: ionInfo.radius,
    label: ionInfo.symbol,
    isCation: isCation,
    neighbors: []
  };
}

function assignNeighbors() {
  for (let i = 0; i < ions.length; i++) {
    ions[i].neighbors = [];
    for (let j = 0; j < ions.length; j++) {
      if (i === j) {
        continue;
      }
      const distance = p5.Vector.dist(ions[i].position, ions[j].position);
      if (distance < 95) {
        ions[i].neighbors.push(ions[j].position.copy());
      }
    }
  }
}

function projectIon(position, baseScale) {
  const rotatedY = rotateAroundY(position.copy(), rotationY);
  const rotatedX = rotateAroundX(rotatedY, rotationX);
  const depth = rotatedX.z + 400;
  const scale = baseScale * (400 / depth);
  return {
    x: rotatedX.x * scale,
    y: rotatedX.y * scale,
    scale: scale
  };
}

function rotateAroundY(vec, angle) {
  const cosA = cos(angle);
  const sinA = sin(angle);
  const x = vec.x * cosA - vec.z * sinA;
  const z = vec.x * sinA + vec.z * cosA;
  return createVector(x, vec.y, z);
}

function rotateAroundX(vec, angle) {
  const cosA = cos(angle);
  const sinA = sin(angle);
  const y = vec.y * cosA - vec.z * sinA;
  const z = vec.y * sinA + vec.z * cosA;
  return createVector(vec.x, y, z);
}

function handleCompoundChange() {
  currentCompound = compoundSelect.value();
  generateLattice();
}

function handleGridChange() {
  gridSize = gridSlider.value();
  generateLattice();
}

function toggleRotation() {
  autoRotate = !autoRotate;
  setRotateButtonLabel();
}

function handleLabelToggle() {
  showLabels = labelCheckbox.checked();
}

function setRotateButtonLabel() {
  if (rotateButton) {
    rotateButton.html(autoRotate ? 'Pause Rotation' : 'Start Rotation');
  }
}

function mousePressed() {
  if (mouseY < drawHeight) {
    isDragging = true;
    previousMouseX = mouseX;
    previousMouseY = mouseY;
  }
}

function mouseDragged() {
  if (isDragging) {
    rotationY += (mouseX - previousMouseX) * 0.01;
    rotationX += (mouseY - previousMouseY) * 0.01;
    previousMouseX = mouseX;
    previousMouseY = mouseY;
  }
}

function mouseReleased() {
  isDragging = false;
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
  const baseY = drawHeight + 25;
  if (compoundSelect) {
    compoundSelect.position(margin + 90, baseY - 5);
  }
  if (gridSlider) {
    gridSlider.position(margin + 260, baseY - 2);
    gridSlider.size(140);
  }
  if (rotateButton) {
    rotateButton.position(margin, baseY + 20);
  }
  if (labelCheckbox) {
    labelCheckbox.position(margin + 600, baseY - 5);
  }
}
