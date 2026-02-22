// VSEPR Molecular Geometry Builder MicroSim
// Title centered top, DOM controls confined to control strip

let containerWidth;
let canvasWidth = 860;
let drawHeight = 520;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

const margin = 20;
const defaultTextSize = 16;

let electronGroups = 4;
let lonePairs = 0;

let egMinusBtn, egPlusBtn, lpMinusBtn, lpPlusBtn;

let displayPositions = [];
let targetPositions = [];

// Plain objects used at module level to avoid calling createVector() before p5 initializes.
// updateTargets() converts these to p5 vectors at runtime.
const basePositionsRaw = {
  2: [
    {x: -220, y: 0, z: 0},
    {x:  220, y: 0, z: 0}
  ],
  3: [
    {x:    0, y: -210, z:   0},
    {x: -190, y:  120, z:   0},
    {x:  190, y:  120, z:   0}
  ],
  4: [
    {x:    0, y: -200, z:    0},
    {x: -160, y:  120, z:  120},
    {x:  160, y:  120, z:  120},
    {x:    0, y:   60, z: -200}
  ],
  5: [
    {x: -200, y:   40, z:    0},
    {x:  200, y:   40, z:    0},
    {x:    0, y:  160, z:    0},
    {x:    0, y: -180, z:  150},
    {x:    0, y: -180, z: -150}
  ],
  6: [
    {x:    0, y: -220, z:    0},
    {x:    0, y:  220, z:    0},
    {x: -200, y:    0, z:    0},
    {x:  200, y:    0, z:    0},
    {x:    0, y:    0, z: -200},
    {x:    0, y:    0, z:  200}
  ]
};

const geometryMap = {
  '2-0': { electron: 'Linear', molecular: 'Linear', angles: '180°', example: 'CO₂', lonePref: [] },
  '3-0': { electron: 'Trigonal Planar', molecular: 'Trigonal Planar', angles: '120°', example: 'BF₃', lonePref: [] },
  '3-1': { electron: 'Trigonal Planar', molecular: 'Bent', angles: '<120°', example: 'SO₂', lonePref: [0] },
  '4-0': { electron: 'Tetrahedral', molecular: 'Tetrahedral', angles: '109.5°', example: 'CH₄', lonePref: [] },
  '4-1': { electron: 'Tetrahedral', molecular: 'Trigonal Pyramidal', angles: '<109.5°', example: 'NH₃', lonePref: [0] },
  '4-2': { electron: 'Tetrahedral', molecular: 'Bent', angles: '<109.5°', example: 'H₂O', lonePref: [0, 3] },
  '5-0': { electron: 'Trigonal Bipyramidal', molecular: 'Trigonal Bipyramidal', angles: '90° / 120°', example: 'PCl₅', lonePref: [] },
  '5-1': { electron: 'Trigonal Bipyramidal', molecular: 'Seesaw', angles: '<90° / <120°', example: 'SF₄', lonePref: [0] },
  '5-2': { electron: 'Trigonal Bipyramidal', molecular: 'T-Shape', angles: '<90°', example: 'ClF₃', lonePref: [0, 1] },
  '5-3': { electron: 'Trigonal Bipyramidal', molecular: 'Linear', angles: '180°', example: 'XeF₂', lonePref: [0, 1, 2] },
  '6-0': { electron: 'Octahedral', molecular: 'Octahedral', angles: '90°', example: 'SF₆', lonePref: [] },
  '6-1': { electron: 'Octahedral', molecular: 'Square Pyramidal', angles: '<90°', example: 'BrF₅', lonePref: [0] },
  '6-2': { electron: 'Octahedral', molecular: 'Square Planar', angles: '90°', example: 'XeF₄', lonePref: [0, 1] }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  createControls();
  updateTargets();
  describe('Interactive VSEPR geometry builder with electron group and lone pair controls plus animated visualization.', 'VSEPR Molecular Geometry Builder');
}

function draw() {
  updateCanvasSize();
  fill('#0d1b2a');
  stroke('#33425a');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawTitle();
  drawControlPanel();
  drawVisualization();
  drawControlLabels();
}

function drawTitle() {
  fill('white');
  textAlign(CENTER, TOP);
  textSize(30);
  noStroke();
  text('VSEPR Molecular Geometry Builder', canvasWidth / 2, margin / 2);
}

function drawControlPanel() {
  const panelWidth = 260;
  fill('#1e2d3d');
  noStroke();
  rect(margin, margin + 50, panelWidth, drawHeight - margin - 60, 12);
  const info = getGeometryData();

  fill('white');
  textAlign(CENTER, TOP);
  textSize(18);
  text('Electron Groups', margin + panelWidth / 2, margin + 70);
  textSize(36);
  text(electronGroups, margin + panelWidth / 2, margin + 110);

  textSize(18);
  text('Lone Pairs', margin + panelWidth / 2, margin + 180);
  textSize(36);
  text(lonePairs, margin + panelWidth / 2, margin + 220);

  textAlign(LEFT, TOP);
  textSize(16);
  fill('#f4d03f');
  text(`Electron Geometry: ${info.electron}`, margin + 18, margin + 280);
  fill('#5dade2');
  text(`Molecular Geometry: ${info.molecular}`, margin + 18, margin + 310);
  fill('white');
  text(`Bond Angles: ${info.angles}`, margin + 18, margin + 340);
  fill('#58d68d');
  text(`Example: ${info.example}`, margin + 18, margin + 370);

  fill('#cdd9e8');
  textSize(14);
  text('Legend:', margin + 18, margin + 410);
  drawLegend(margin + 18, margin + 430);
}

function drawLegend(x, y) {
  fill('#ff7043');
  ellipse(x + 12, y + 10, 18, 18);
  fill('white');
  text('Bonding pair', x + 30, y + 2);
  fill('rgba(120,150,200,0.6)');
  ellipse(x + 12, y + 34, 18, 18);
  fill('white');
  text('Lone pair cloud', x + 30, y + 26);
  stroke('white');
  strokeWeight(3);
  line(x, y + 54, x + 24, y + 54);
  fill('white');
  noStroke();
  text('Bond axis', x + 30, y + 46);
}

function drawVisualization() {
  const panelX = margin + 260 + 20;
  const panelWidth = canvasWidth - panelX - margin;
  const centerX = panelX + panelWidth / 2;
  const centerY = drawHeight / 2 + 40;

  if (displayPositions.length !== targetPositions.length) {
    displayPositions = targetPositions.map(tp => ({ pos: tp.pos.copy(), isLone: tp.isLone }));
  } else {
    for (let i = 0; i < displayPositions.length; i++) {
      displayPositions[i].pos.lerp(targetPositions[i].pos, 0.15);
      displayPositions[i].isLone = targetPositions[i].isLone;
    }
  }

  fill('#b0bec5');
  noStroke();
  ellipse(centerX, centerY, 42, 42);

  const bonds = displayPositions.filter(p => !p.isLone);
  const lone = displayPositions.filter(p => p.isLone);

  stroke('white');
  strokeWeight(4);
  for (const b of bonds) {
    const proj = projectVector(b.pos);
    line(centerX, centerY, centerX + proj.x, centerY + proj.y);
  }

  fill('#ff7043');
  noStroke();
  for (const b of bonds) {
    const proj = projectVector(b.pos);
    ellipse(centerX + proj.x, centerY + proj.y, 26, 26);
  }

  fill('rgba(120,150,200,0.6)');
  for (const lp of lone) {
    const proj = projectVector(lp.pos.copy().setMag(80));
    ellipse(centerX + proj.x, centerY + proj.y, 40, 24);
  }

  drawAngleArc(centerX, centerY, bonds);
}

function drawAngleArc(cx, cy, bonds) {
  if (bonds.length < 2) {
    return;
  }
  const projA = projectVector(bonds[0].pos);
  const projB = projectVector(bonds[1].pos);
  const start = atan2(projA.y, projA.x);
  const end = atan2(projB.y, projB.x);
  stroke('rgba(255,255,255,0.6)');
  strokeWeight(2);
  noFill();
  const radius = 70;
  arc(cx, cy, radius * 2, radius * 2, start, end);
  const info = getGeometryData();
  noStroke();
  fill('white');
  textAlign(CENTER, CENTER);
  text(info.angles, cx + radius * cos((start + end) / 2), cy + radius * sin((start + end) / 2));
}

function projectVector(v) {
  const depth = v.z + 500;
  const scale = 300 / depth;
  return createVector(v.x * scale, v.y * scale);
}

function drawControlLabels() {
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Controls:', margin, drawHeight + 24);
  text('Electron Groups', margin + 40, drawHeight + 60);
  text('Lone Pairs', margin + 240, drawHeight + 60);
}

function createControls() {
  egMinusBtn = createButton('–');
  egPlusBtn = createButton('+');
  lpMinusBtn = createButton('–');
  lpPlusBtn = createButton('+');

  egMinusBtn.mousePressed(() => updateElectronGroups(-1));
  egPlusBtn.mousePressed(() => updateElectronGroups(1));
  lpMinusBtn.mousePressed(() => updateLonePairs(-1));
  lpPlusBtn.mousePressed(() => updateLonePairs(1));

  positionControlButtons();
}

function positionControlButtons() {
  const baseY = drawHeight + 50;
  egMinusBtn.position(margin + 80, baseY);
  egPlusBtn.position(margin + 140, baseY);
  lpMinusBtn.position(margin + 280, baseY);
  lpPlusBtn.position(margin + 340, baseY);
  egMinusBtn.size(40, 40);
  egPlusBtn.size(40, 40);
  lpMinusBtn.size(40, 40);
  lpPlusBtn.size(40, 40);
}

function updateElectronGroups(delta) {
  electronGroups = constrain(electronGroups + delta, 2, 6);
  lonePairs = constrain(lonePairs, 0, electronGroups - 1);
  updateTargets();
}

function updateLonePairs(delta) {
  lonePairs = constrain(lonePairs + delta, 0, electronGroups - 1);
  updateTargets();
}

function updateTargets() {
  const base = basePositionsRaw[electronGroups].map(v => createVector(v.x, v.y, v.z));
  const pref = getLonePairPreference();
  targetPositions = base.map((vec, idx) => ({ pos: vec, isLone: pref.includes(idx) }));
}

function getLonePairPreference() {
  const key = `${electronGroups}-${lonePairs}`;
  const data = geometryMap[key];
  if (!data) {
    return [];
  }
  const pref = data.lonePref || [];
  if (pref.length >= lonePairs) {
    return pref.slice(0, lonePairs);
  }
  const allIndexes = [...Array(electronGroups).keys()];
  const additional = allIndexes.filter(idx => !pref.includes(idx)).slice(0, Math.max(0, lonePairs - pref.length));
  return pref.concat(additional);
}

function getGeometryData() {
  return geometryMap[`${electronGroups}-${lonePairs}`] || { electron: 'Unknown', molecular: 'Unknown', angles: '—', example: '—', lonePref: [] };
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  positionControlButtons();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width) || 800;
  canvasWidth = containerWidth;
  canvasHeight = drawHeight + controlHeight;
  containerHeight = canvasHeight;
}
