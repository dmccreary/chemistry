// Heterogeneous Catalysis: Surface Adsorption and Reaction Steps
// CANVAS_HEIGHT: 630
// AP Chemistry - Chapter 11: Reaction Mechanisms and Catalysis (Section 11.12)
// Learning objective (Bloom: Understand): identify the adsorption, surface
// reaction, and desorption stages of heterogeneous catalysis, and explain why
// the surface area of a solid catalyst affects the reaction rate.
//
// Reference system: the Haber process on an iron surface
//   N2(g) + 3 H2(g) gives 2 NH3(g)
// The scene holds exactly one N2 and three H2 (2 N atoms and 6 H atoms), and
// the same eight atoms end up as two NH3 molecules, so atoms are conserved in
// every step. The iron atoms never change: the catalyst is not consumed.
//
// Surface area panel: a block of 12 x 12 = 144 iron atoms (a cross-section)
// is cut into n x n equal pieces. A piece that is k atoms on a side has
// 4k - 4 atoms on its edge (1 if k = 1), and only those atoms can act as
// active sites.

// ---- Layout constants -------------------------------------------------------
let canvasWidth = 800;
let drawHeight = 550;
let controlHeight = 80;          // two rows of controls
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let defaultTextSize = 16;

const TAB_Y = 44;                // stage tabs
const TAB_H = 30;
const FE_Y = 258;                // y of the centers of the top row of iron atoms
const SLAB_BOTTOM = 330;         // bottom of the iron slab
const CAPTION_Y = 338;
const CAPTION_H = 74;
const AREA_Y = 420;              // surface area panel
const AREA_H = 122;

// ---- Model ------------------------------------------------------------------
const N_ADS = 0.75;              // height of an adsorbed N atom, in site units
const H_ADS = 0.56;              // height of an adsorbed H atom, in site units
const ATOM_KEYS = ['N1', 'N2', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

// Atom positions for each step: [x, y] in site units. x is measured from the
// center of the scene and y is the height above the top row of iron atoms.
const STEP_POSITIONS = [
  // 0: reactant molecules in the gas phase
  { N1: [-3.2, 3.4], N2: [-2.4, 3.8], H1: [-5.5, 2.5], H2: [-4.95, 2.9],
    H3: [0.5, 3.5], H4: [1.17, 3.35], H5: [3.8, 2.7], H6: [4.4, 3.05] },
  // 1: molecules adsorbed on the surface, bonds stretched and weakened
  { N1: [-2.5, N_ADS], N2: [-1.5, N_ADS], H1: [-5.5, H_ADS], H2: [-4.5, H_ADS],
    H3: [0.5, H_ADS], H4: [1.5, H_ADS], H5: [3.5, H_ADS], H6: [4.5, H_ADS] },
  // 2: bonds broken, separate atoms held on the surface
  { N1: [-2.5, N_ADS], N2: [2.5, N_ADS], H1: [-4.5, H_ADS], H2: [-3.5, H_ADS],
    H3: [-1.5, H_ADS], H4: [1.5, H_ADS], H5: [3.5, H_ADS], H6: [4.5, H_ADS] },
  // 3: first N-H bond on each N atom (NH)
  { N1: [-2.5, N_ADS], N2: [2.5, N_ADS], H1: [-4.5, H_ADS], H2: [-3.5, H_ADS],
    H3: [-1.7, 1.25], H4: [1.7, 1.25], H5: [3.5, H_ADS], H6: [4.5, H_ADS] },
  // 4: second N-H bond (NH2)
  { N1: [-2.5, N_ADS], N2: [2.5, N_ADS], H1: [-4.5, H_ADS], H2: [-3.3, 1.25],
    H3: [-1.7, 1.25], H4: [1.7, 1.25], H5: [3.3, 1.25], H6: [4.5, H_ADS] },
  // 5: third N-H bond (NH3, still adsorbed)
  { N1: [-2.5, N_ADS], N2: [2.5, N_ADS], H1: [-2.5, 1.7], H2: [-3.3, 1.25],
    H3: [-1.7, 1.25], H4: [1.7, 1.25], H5: [3.3, 1.25], H6: [2.5, 1.7] },
  // 6: NH3 desorbs, surface is bare again
  { N1: [-2.9, 2.75], N2: [2.7, 3.15], H1: [-2.9, 3.7], H2: [-3.7, 3.25],
    H3: [-2.1, 3.25], H4: [1.9, 3.65], H5: [3.5, 3.65], H6: [2.7, 4.1] }
];

// Bonds for each step: [atom, atom, style]. Styles: 'triple', 'single',
// 'tripleWeak' and 'singleWeak' (dashed, drawn for adsorbed molecules).
const NH_BONDS_1 = [['N1', 'H3', 'single'], ['N2', 'H4', 'single']];
const NH_BONDS_2 = NH_BONDS_1.concat([['N1', 'H2', 'single'], ['N2', 'H5', 'single']]);
const NH_BONDS_3 = NH_BONDS_2.concat([['N1', 'H1', 'single'], ['N2', 'H6', 'single']]);
const STEP_BONDS = [
  [['N1', 'N2', 'triple'], ['H1', 'H2', 'single'], ['H3', 'H4', 'single'], ['H5', 'H6', 'single']],
  [['N1', 'N2', 'tripleWeak'], ['H1', 'H2', 'singleWeak'], ['H3', 'H4', 'singleWeak'], ['H5', 'H6', 'singleWeak']],
  [],
  NH_BONDS_1,
  NH_BONDS_2,
  NH_BONDS_3,
  NH_BONDS_3
];

// Which of the three stages each step belongs to
const STEP_STAGE = [0, 0, 1, 1, 1, 1, 2];
const STAGE_FIRST_STEP = [0, 2, 6];
const STAGE_NAMES = ['1. Adsorption', '2. Surface reaction', '3. Desorption'];

const STEP_CAPTIONS = [
  { title: 'Stage 1: Adsorption (reactants arrive)',
    body: 'N_{2} and H_{2} gas molecules collide with the surface of the solid iron catalyst. The catalyst and the reactants are in different phases. Overall: N_{2} + 3 H_{2} makes 2 NH_{3}.' },
  { title: 'Stage 1: Adsorption (reactants bind to the surface)',
    body: 'The molecules stick to iron atoms at active sites. Bonding to the surface stretches and weakens the triple bond in N_{2} and the bond in each H_{2} (dashed lines).' },
  { title: 'Stage 2: Surface reaction (weakened bonds break)',
    body: 'The weakened bonds break. Separate N atoms and H atoms are held by the iron surface and can move from site to site.' },
  { title: 'Stage 2: Surface reaction (NH forms)',
    body: 'Neighboring atoms recombine. One H atom bonds to each N atom, making NH that is still attached to the surface.' },
  { title: 'Stage 2: Surface reaction (NH_{2} forms)',
    body: 'A second H atom bonds to each N atom, making NH_{2} on the surface.' },
  { title: 'Stage 2: Surface reaction (NH_{3} forms)',
    body: 'A third H atom completes each NH_{3} molecule. The product (orange glow) is still held on the surface.' },
  { title: 'Stage 3: Desorption (product leaves, sites freed)',
    body: 'NH_{3} leaves the surface. The iron atoms are unchanged and not used up, so the active sites are free for new N_{2} and H_{2}. This surface pathway has a lower E_{a} than the gas-phase reaction.' }
];

// Labels drawn in the scene when "Show Labels" is on: [text, x, y, color]
const STEP_LABELS = [
  [['N_{2}', -2.8, 4.4, 'navy'], ['H_{2}', -5.2, 3.45, 'dimgray'], ['H_{2}', 0.85, 4.05, 'dimgray'], ['H_{2}', 4.1, 3.6, 'dimgray']],
  [['N_{2} (bond weakened)', -2.0, 1.55, 'navy'], ['H_{2}', -5.0, 1.25, 'dimgray'], ['H_{2}', 1.0, 1.25, 'dimgray'], ['H_{2}', 4.0, 1.25, 'dimgray']],
  [['N', -2.5, 1.55, 'navy'], ['N', 2.5, 1.55, 'navy'], ['H atoms', -4.0, 1.25, 'dimgray'], ['H', -1.5, 1.25, 'dimgray'], ['H', 1.5, 1.25, 'dimgray'], ['H atoms', 4.0, 1.25, 'dimgray']],
  [['NH', -2.3, 2.0, 'navy'], ['NH', 2.3, 2.0, 'navy']],
  [['NH_{2}', -2.5, 2.0, 'navy'], ['NH_{2}', 2.5, 2.0, 'navy']],
  [['NH_{3}', -2.5, 2.45, 'saddlebrown'], ['NH_{3}', 2.5, 2.45, 'saddlebrown']],
  [['NH_{3}', -4.35, 3.4, 'saddlebrown'], ['NH_{3}', 4.15, 3.8, 'saddlebrown'], ['active sites free again', 0, 1.05, 'darkgreen']]
];

// Surface area comparison: pieces along each edge of the 12 x 12 atom block
const LATTICE_SIZE = 12;
const CUT_OPTIONS = [1, 2, 3, 4, 6];
const CUT_NAMES = ['one solid block', 'large chunks', 'crushed granules', 'fine granules', 'nanoparticle powder'];

// ---- State ------------------------------------------------------------------
let currentStep = 0;
let previousStep = 0;
let transition = 1;              // 0 to 1 while atoms move between steps
let backButton, nextButton, labelsCheckbox, cutSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  backButton = createButton('Back');
  backButton.parent(mainElement);
  backButton.mousePressed(goBack);

  nextButton = createButton('Next Step');
  nextButton.parent(mainElement);
  nextButton.mousePressed(goNext);

  labelsCheckbox = createCheckbox(' Show Labels', true);
  labelsCheckbox.parent(mainElement);
  labelsCheckbox.style('font-size', '15px');

  cutSlider = createSlider(0, CUT_OPTIONS.length - 1, 0, 1);
  cutSlider.parent(mainElement);
  cutSlider.attribute('aria-label', 'Number of pieces the iron is cut into');

  positionControls();
  updateButtons();

  describe('Step-through diagram of heterogeneous catalysis for the Haber process. Nitrogen and hydrogen molecules adsorb on an iron surface, their bonds break, nitrogen-hydrogen bonds form one at a time to make ammonia, and the ammonia leaves the unchanged surface. A second panel shows a block of 144 iron atoms cut into smaller pieces, with the atoms on a surface counted as active sites. Controls: Back and Next Step buttons, a Show Labels checkbox, and a slider for the number of pieces.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing region (aliceblue) and control region (white)
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  textSize(canvasWidth < 520 ? 18 : 24);
  text(canvasWidth < 520 ? 'Heterogeneous Catalysis on Iron' : 'Heterogeneous Catalysis: Making Ammonia on Iron', canvasWidth / 2, 10);

  if (transition < 1) {
    transition = min(1, transition + deltaTime / 650);
  }

  drawStageTabs();
  drawScene();
  drawCaption();
  drawAreaPanel();
  drawControlLabels();
}

// ---- Stage tabs -------------------------------------------------------------
function tabRect(i) {
  const gap = 8;
  const w = (canvasWidth - 2 * margin - 2 * gap) / 3;
  return { x: margin + i * (w + gap), y: TAB_Y, w: w, h: TAB_H };
}

function drawStageTabs() {
  const stage = STEP_STAGE[currentStep];
  // one text size for all three tabs, small enough for the longest name in bold
  let size = 16;
  textStyle(BOLD);
  textSize(size);
  while (textWidth(STAGE_NAMES[1]) > tabRect(1).w - 10 && size > 10) {
    size -= 1;
    textSize(size);
  }
  for (let i = 0; i < 3; i++) {
    const r = tabRect(i);
    stroke(i === stage ? 'midnightblue' : 'silver');
    strokeWeight(i === stage ? 2 : 1);
    fill(i === stage ? 'steelblue' : 'white');
    rect(r.x, r.y, r.w, r.h, 8);
    noStroke();
    fill(i === stage ? 'white' : 'dimgray');
    textStyle(i === stage ? BOLD : NORMAL);
    textSize(size);
    textAlign(CENTER, CENTER);
    text(STAGE_NAMES[i], r.x + r.w / 2, r.y + r.h / 2 + 1);
  }
  textStyle(NORMAL);
}

// ---- Scene ------------------------------------------------------------------
function siteUnit() {
  return min(40, (canvasWidth - 24) / 12.4);
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - pow(-2 * t + 2, 2) / 2;
}

// Position of an atom in pixels, blended between the previous and current step.
// Atoms that travel sideways rise in a small arc, as if hopping between sites.
function atomPixel(key) {
  const u = siteUnit();
  const a = STEP_POSITIONS[previousStep][key];
  const b = STEP_POSITIONS[currentStep][key];
  const t = easeInOut(transition);
  const hop = min(1.3, 0.3 * abs(b[0] - a[0])) * sin(PI * t);
  const x = lerp(a[0], b[0], t);
  const y = lerp(a[1], b[1], t) + hop;
  return { x: canvasWidth / 2 + x * u, y: FE_Y - y * u };
}

function drawScene() {
  const u = siteUnit();
  const positions = {};
  for (let i = 0; i < ATOM_KEYS.length; i++) {
    positions[ATOM_KEYS[i]] = atomPixel(ATOM_KEYS[i]);
  }
  const settled = transition >= 1;

  // Orange glow behind each finished NH3 molecule
  if (currentStep >= 5 && (settled || previousStep >= 5)) {
    noStroke();
    fill(255, 165, 0, 110);
    circle(positions.N1.x, positions.N1.y - 0.4 * u, 2.5 * u);
    circle(positions.N2.x, positions.N2.y - 0.4 * u, 2.5 * u);
  }

  drawIronSlab(u);
  if (settled) drawMotionArrows(u, positions);
  drawBonds(u, positions);
  drawAtoms(u, positions);
  if (settled && labelsCheckbox.checked()) drawSceneLabels(u);
}

function drawIronSlab(u) {
  noStroke();
  fill('gray');
  rect(1, FE_Y, canvasWidth - 2, SLAB_BOTTOM - FE_Y);

  // second row of iron atoms, then the top row (these are the active sites)
  const count = ceil(canvasWidth / u / 2) + 2;
  stroke('black');
  strokeWeight(1);
  fill('darkgray');
  for (let k = -count; k <= count; k++) {
    circle(canvasWidth / 2 + (k + 0.5) * u, FE_Y + 0.87 * u, u);
  }
  for (let k = -count; k <= count; k++) {
    circle(canvasWidth / 2 + k * u, FE_Y, u);
  }

  // name band along the bottom of the slab (also trims the second row)
  noStroke();
  fill('dimgray');
  rect(1, SLAB_BOTTOM - 22, canvasWidth - 2, 22);
  fill('aliceblue');
  rect(1, SLAB_BOTTOM, canvasWidth - 2, CAPTION_Y - SLAB_BOTTOM);
  fill('white');
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  textSize(canvasWidth < 520 ? 13 : 15);
  text('Solid iron catalyst (Fe atoms)', canvasWidth / 2, SLAB_BOTTOM - 11);
  textStyle(NORMAL);

  // repaint the side borders that the edge atoms covered
  stroke('silver');
  strokeWeight(1);
  line(0, FE_Y - u, 0, CAPTION_Y);
  line(canvasWidth, FE_Y - u, canvasWidth, CAPTION_Y);
}

function drawBonds(u, positions) {
  const prev = STEP_BONDS[previousStep];
  const cur = STEP_BONDS[currentStep];
  function findBond(list, a, b) {
    for (let i = 0; i < list.length; i++) {
      if (list[i][0] === a && list[i][1] === b) return list[i];
    }
    return null;
  }
  const toDraw = [];
  for (let i = 0; i < cur.length; i++) {
    const old = findBond(prev, cur[i][0], cur[i][1]);
    if (transition >= 1) toDraw.push(cur[i]);
    else if (old) toDraw.push(transition > 0.5 ? cur[i] : old);
    else if (transition > 0.85) toDraw.push(cur[i]);
  }
  if (transition < 0.15) {
    for (let i = 0; i < prev.length; i++) {
      if (!findBond(cur, prev[i][0], prev[i][1])) toDraw.push(prev[i]);
    }
  }
  for (let i = 0; i < toDraw.length; i++) {
    const a = positions[toDraw[i][0]];
    const b = positions[toDraw[i][1]];
    const style = toDraw[i][2];
    const weak = style === 'tripleWeak' || style === 'singleWeak';
    const triple = style === 'triple' || style === 'tripleWeak';
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = max(1, sqrt(dx * dx + dy * dy));
    const nx = -dy / len;
    const ny = dx / len;
    stroke(weak ? 'crimson' : 'black');
    strokeWeight(weak ? 2 : 2.5);
    drawingContext.setLineDash(weak ? [3, 3] : []);
    const offsets = triple ? [-0.11 * u, 0, 0.11 * u] : [0];
    for (let k = 0; k < offsets.length; k++) {
      line(a.x + nx * offsets[k], a.y + ny * offsets[k], b.x + nx * offsets[k], b.y + ny * offsets[k]);
    }
    drawingContext.setLineDash([]);
  }
}

function drawAtoms(u, positions) {
  for (let i = 0; i < ATOM_KEYS.length; i++) {
    const key = ATOM_KEYS[i];
    const p = positions[key];
    const isN = key.charAt(0) === 'N';
    stroke(isN ? 'navy' : 'gray');
    strokeWeight(1.5);
    fill(isN ? 'royalblue' : 'white');
    circle(p.x, p.y, (isN ? 0.68 : 0.44) * u);
    noStroke();
    fill(isN ? 'white' : 'black');
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    textSize(isN ? 0.36 * u : 0.27 * u);
    text(isN ? 'N' : 'H', p.x, p.y + 1);
  }
  textStyle(NORMAL);
}

// Arrows drawn as shapes: downward for arriving reactants, upward for products
function drawMotionArrows(u, positions) {
  if (currentStep === 0) {
    const pairs = [['N1', 'N2'], ['H1', 'H2'], ['H3', 'H4'], ['H5', 'H6']];
    for (let i = 0; i < pairs.length; i++) {
      const a = positions[pairs[i][0]];
      const b = positions[pairs[i][1]];
      const x = (a.x + b.x) / 2;
      const top = max(a.y, b.y) + 0.55 * u;
      drawBlockArrow(x, top, x, FE_Y - 1.0 * u, 'slategray');
    }
  }
  if (currentStep === 6) {
    drawBlockArrow(positions.N1.x, FE_Y - 0.85 * u, positions.N1.x, positions.N1.y + 0.6 * u, 'darkorange');
    drawBlockArrow(positions.N2.x, FE_Y - 0.85 * u, positions.N2.x, positions.N2.y + 0.6 * u, 'darkorange');
  }
}

function drawBlockArrow(x1, y1, x2, y2, col) {
  const dir = y2 > y1 ? 1 : -1;
  stroke(col);
  strokeWeight(3);
  line(x1, y1, x2, y2 - dir * 8);
  noStroke();
  fill(col);
  triangle(x2, y2, x2 - 7, y2 - dir * 11, x2 + 7, y2 - dir * 11);
}

function drawSceneLabels(u) {
  const list = STEP_LABELS[currentStep];
  const size = canvasWidth < 520 ? 13 : 16;
  textStyle(BOLD);
  for (let i = 0; i < list.length; i++) {
    let x = canvasWidth / 2 + list[i][1] * u;
    const y = FE_Y - list[i][2] * u;
    // keep the label inside the canvas
    const half = richWidth(list[i][0], size) / 2;
    x = constrain(x, half + 6, canvasWidth - half - 6);
    fill(list[i][3]);
    drawRich(list[i][0], x, y, size, CENTER);
  }
  textStyle(NORMAL);
}

// ---- Caption ----------------------------------------------------------------
function drawCaption() {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(margin, CAPTION_Y, canvasWidth - 2 * margin, CAPTION_H, 8);
  noStroke();
  const x = margin + 10;
  const w = canvasWidth - 2 * margin - 20;
  const narrow = canvasWidth < 560;
  if (!labelsCheckbox.checked()) {
    fill('dimgray');
    textStyle(ITALIC);
    drawRichWrapped('Labels are hidden. Say what is happening in this step in your own words, then turn Show Labels back on to check.', x, CAPTION_Y + 12, w, narrow ? 13 : 15, narrow ? 17 : 20);
    textStyle(NORMAL);
    return;
  }
  const c = STEP_CAPTIONS[currentStep];
  fill('midnightblue');
  textStyle(BOLD);
  let titleSize = narrow ? 14 : 16;
  while (richWidth(c.title, titleSize) > w && titleSize > 10) titleSize -= 1;
  drawRich(c.title, x, CAPTION_Y + 13, titleSize, LEFT);
  textStyle(NORMAL);
  fill('black');
  // shrink the body text until it fits in the lines available
  let size = narrow ? 13 : 15;
  let leading = size + 4;
  const maxLines = narrow ? 3 : 2;
  while (countRichLines(c.body, w, size) > maxLines && size > 10) {
    size -= 0.5;
    leading = size + 3.5;
  }
  drawRichWrapped(c.body, x, CAPTION_Y + 32, w, size, leading);
}

// ---- Surface area panel -----------------------------------------------------
function surfaceAtomCount(pieces) {
  const k = LATTICE_SIZE / pieces;          // atoms along one edge of a piece
  const perPiece = k === 1 ? 1 : 4 * k - 4;
  return perPiece * pieces * pieces;
}

function drawAreaPanel() {
  const index = cutSlider.value();
  const pieces = CUT_OPTIONS[index];
  const k = LATTICE_SIZE / pieces;
  const total = LATTICE_SIZE * LATTICE_SIZE;
  const surface = surfaceAtomCount(pieces);
  const ratio = surface / surfaceAtomCount(1);
  const narrow = canvasWidth < 560;

  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(margin, AREA_Y, canvasWidth - 2 * margin, AREA_H, 8);

  // lattice drawing
  const cell = 7;
  const gap = 3;
  const size = LATTICE_SIZE * cell + (pieces - 1) * gap;
  const maxSize = LATTICE_SIZE * cell + 5 * gap;
  const left = margin + 8 + (maxSize - size) / 2;
  const top = AREA_Y + (AREA_H - size) / 2;
  noStroke();
  for (let row = 0; row < LATTICE_SIZE; row++) {
    for (let col = 0; col < LATTICE_SIZE; col++) {
      const inRow = row % k;
      const inCol = col % k;
      const onSurface = inRow === 0 || inRow === k - 1 || inCol === 0 || inCol === k - 1;
      fill(onSurface ? 'tomato' : 'silver');
      const x = left + col * cell + floor(col / k) * gap + cell / 2;
      const y = top + row * cell + floor(row / k) * gap + cell / 2;
      circle(x, y, cell - 1);
    }
  }

  // text
  const tx = margin + 8 + maxSize + 12;
  const tw = canvasWidth - margin - 8 - tx;
  const fs = narrow ? 12.5 : 15;
  const lh = narrow ? 16 : 20;
  let y = AREA_Y + (narrow ? 12 : 14);
  noStroke();
  fill('midnightblue');
  textStyle(BOLD);
  drawRich('Why surface area matters', tx, y, narrow ? 14 : 16, LEFT);
  textStyle(NORMAL);
  fill('black');
  y += lh + 2;
  const pieceWord = pieces === 1 ? CUT_NAMES[index] : pieces * pieces + ' pieces (' + CUT_NAMES[index] + ')';
  const lines = [
    'The same ' + total + ' iron atoms as ' + pieceWord + '.',
    'Atoms on a surface (red) are active sites: ' + surface + ' of ' + total + '.',
    pieces === 1 ?
      'Interior atoms (gray) never touch the reactants.' :
      ratio.toFixed(1) + ' times the active sites of the solid block, so the reaction is faster.'
  ];
  for (let i = 0; i < lines.length; i++) {
    const used = drawRichWrapped(lines[i], tx, y - fs / 2, tw, fs, lh);
    y += used * lh;
  }
}

// ---- Controls ---------------------------------------------------------------
function goNext() {
  if (currentStep < STEP_POSITIONS.length - 1) changeStep(currentStep + 1);
}

function goBack() {
  if (currentStep > 0) changeStep(currentStep - 1);
}

function changeStep(target) {
  previousStep = currentStep;
  currentStep = target;
  // animate only between neighboring steps; a jump shows the new step at once
  transition = abs(currentStep - previousStep) === 1 ? 0 : 1;
  updateButtons();
}

function updateButtons() {
  if (currentStep === 0) backButton.attribute('disabled', '');
  else backButton.removeAttribute('disabled');
  if (currentStep === STEP_POSITIONS.length - 1) nextButton.attribute('disabled', '');
  else nextButton.removeAttribute('disabled');
}

// Clicking a stage tab jumps to the first step of that stage
function mousePressed() {
  for (let i = 0; i < 3; i++) {
    const r = tabRect(i);
    if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
      if (STAGE_FIRST_STEP[i] !== currentStep) changeStep(STAGE_FIRST_STEP[i]);
      return;
    }
  }
}

function drawControlLabels() {
  const narrow = canvasWidth < 520;
  noStroke();
  fill('black');
  textStyle(NORMAL);
  textAlign(LEFT, CENTER);
  textSize(narrow ? 14 : 16);
  const counter = (narrow ? '' : 'Step ') + (currentStep + 1) + ' of ' + STEP_POSITIONS.length;
  text(counter, 160, drawHeight + 21);
  const pieces = CUT_OPTIONS[cutSlider.value()];
  const label = (narrow ? 'Pieces: ' : 'Iron cut into pieces: ') + pieces * pieces;
  text(label, 10, drawHeight + 57);
}

function positionControls() {
  if (!backButton || !nextButton || !labelsCheckbox || !cutSlider) return;
  const narrow = canvasWidth < 520;
  backButton.position(10, drawHeight + 9);
  nextButton.position(66, drawHeight + 9);
  labelsCheckbox.position(narrow ? 218 : 262, drawHeight + 10);
  const sliderLeft = narrow ? 100 : 200;
  cutSlider.position(sliderLeft, drawHeight + 47);
  cutSlider.size(max(60, canvasWidth - sliderLeft - 20));
}

// ---- Rich text: "_{...}" is a subscript, "^{...}" is a superscript ------------
function parseRich(str) {
  const segs = [];
  let buf = '';
  let i = 0;
  while (i < str.length) {
    const ch = str[i];
    if ((ch === '_' || ch === '^') && str[i + 1] === '{') {
      if (buf) { segs.push({ t: buf, m: 0 }); buf = ''; }
      const j = str.indexOf('}', i);
      segs.push({ t: str.substring(i + 2, j), m: ch === '_' ? -1 : 1 });
      i = j + 1;
    } else {
      buf += ch;
      i++;
    }
  }
  if (buf) segs.push({ t: buf, m: 0 });
  return segs;
}

function richWidth(str, size) {
  let w = 0;
  const segs = parseRich(str);
  for (let i = 0; i < segs.length; i++) {
    textSize(segs[i].m === 0 ? size : size * 0.7);
    w += textWidth(segs[i].t);
  }
  textSize(size);
  return w;
}

// Draw rich text with its vertical center at y. Uses the current fill and textStyle.
function drawRich(str, x, y, size, align) {
  const segs = parseRich(str);
  const total = richWidth(str, size);
  let cx = x;
  if (align === CENTER) cx = x - total / 2;
  if (align === RIGHT) cx = x - total;
  const baseline = y + size * 0.36;
  noStroke();
  textAlign(LEFT, BASELINE);
  for (let i = 0; i < segs.length; i++) {
    if (segs[i].m === 0) {
      textSize(size);
      text(segs[i].t, cx, baseline);
    } else {
      textSize(size * 0.7);
      text(segs[i].t, cx, baseline + (segs[i].m === -1 ? size * 0.22 : -size * 0.42));
    }
    cx += textWidth(segs[i].t);
  }
  textSize(size);
}

// Break rich text into lines no wider than maxWidth
function richLines(str, maxWidth, size) {
  const words = str.split(' ');
  const lines = [];
  let current = '';
  for (let i = 0; i < words.length; i++) {
    const trial = current ? current + ' ' + words[i] : words[i];
    if (current && richWidth(trial, size) > maxWidth) {
      lines.push(current);
      current = words[i];
    } else {
      current = trial;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function countRichLines(str, maxWidth, size) {
  return richLines(str, maxWidth, size).length;
}

// Draw wrapped rich text; y is the top of the first line. Returns the line count.
function drawRichWrapped(str, x, y, maxWidth, size, leading) {
  const lines = richLines(str, maxWidth, size);
  for (let i = 0; i < lines.length; i++) {
    drawRich(lines[i], x, y + size / 2 + i * leading, size, LEFT);
  }
  return lines.length;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = max(320, container.offsetWidth);
  }
}
