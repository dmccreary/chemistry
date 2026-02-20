// Atomic Structure Diagram MicroSim
// AP Chemistry - Chapter 2: Atomic Structure and Mass Spectrometry
// Learning objectives:
//   L1 Remember: Identify the location and charge of each subatomic particle
//   L2 Understand: Explain how atomic number determines elemental identity
//
// Canvas layout:
//   drawHeight = 390  (dark navy atom visualization)
//   controlHeight = 50  (white control strip)
//   canvasHeight = 440  total
//   iframeHeight = 442px

// ── Layout constants ────────────────────────────────────────────────────────
let canvasWidth  = 600;
let drawHeight   = 390;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin       = 20;
let sliderLeftMargin = 220; // room for "Atomic Number (Z): 18 "

// ── State ────────────────────────────────────────────────────────────────────
let zSlider;
let mouseOverCanvas = false;

// Animation angles for each shell (radians)
let shellAngles = [0, 0, 0];
// Pre-computed nucleus particle positions (reset when Z changes)
let nucleusParticles = [];   // {x, y, type: 'p'|'n'}
let prevZ = -1;

// Tooltip state
let tooltipText = '';
let tooltipX    = 0;
let tooltipY    = 0;

// ── Element data Z=1..18 ─────────────────────────────────────────────────────
// [symbol, name, neutrons, [shell1, shell2, shell3]]
const ELEMENTS = [
  null, // index 0 unused
  ['H',  'Hydrogen',   1,  [1, 0, 0]],
  ['He', 'Helium',     2,  [2, 0, 0]],
  ['Li', 'Lithium',    4,  [2, 1, 0]],
  ['Be', 'Beryllium',  5,  [2, 2, 0]],
  ['B',  'Boron',      6,  [2, 3, 0]],
  ['C',  'Carbon',     6,  [2, 4, 0]],
  ['N',  'Nitrogen',   7,  [2, 5, 0]],
  ['O',  'Oxygen',     8,  [2, 6, 0]],
  ['F',  'Fluorine',  10,  [2, 7, 0]],
  ['Ne', 'Neon',      10,  [2, 8, 0]],
  ['Na', 'Sodium',    12,  [2, 8, 1]],
  ['Mg', 'Magnesium', 12,  [2, 8, 2]],
  ['Al', 'Aluminum',  14,  [2, 8, 3]],
  ['Si', 'Silicon',   14,  [2, 8, 4]],
  ['P',  'Phosphorus',16,  [2, 8, 5]],
  ['S',  'Sulfur',    16,  [2, 8, 6]],
  ['Cl', 'Chlorine',  18,  [2, 8, 7]],
  ['Ar', 'Argon',     22,  [2, 8, 8]],
];

// ── Shell geometry ───────────────────────────────────────────────────────────
// Radii of the three electron shells (will scale with drawHeight)
function shellRadiusX(shellIndex) {
  // Shells at ~20%, 35%, 48% of the drawing-area half-width available to atom
  const atomAreaW = canvasWidth * 0.52; // left 52% is atom zone
  const fractions = [0.22, 0.36, 0.48];
  return atomAreaW * fractions[shellIndex];
}
function shellRadiusY(shellIndex) {
  // Ellipses slightly flattened
  return shellRadiusX(shellIndex) * 0.55;
}

// ── Nucleus packing ──────────────────────────────────────────────────────────
// Generate stable packed positions for protons+neutrons
function buildNucleus(Z) {
  const neutrons = ELEMENTS[Z][2];
  const total    = Z + neutrons;
  const particles = [];
  const r = 6; // particle radius
  // Packing: place in concentric rings
  // ring radii step: 2*r+2
  const ringCapacities = [1, 6, 12, 18, 24]; // max particles per ring
  let placed = 0;
  let ringIdx = 0;

  // Mix protons and neutrons alternately
  const types = [];
  for (let i = 0; i < total; i++) {
    types.push(i % 2 === 0 ? 'p' : 'n');
  }
  // Ensure exactly Z protons
  let protonCount = 0;
  for (let i = 0; i < types.length; i++) {
    if (types[i] === 'p') protonCount++;
  }
  // Adjust: if too many protons, flip excess to neutrons and vice versa
  // Simple approach: first Z are protons, rest neutrons
  for (let i = 0; i < types.length; i++) {
    types[i] = i < Z ? 'p' : 'n';
  }
  // Shuffle types with a deterministic seed based on Z
  // Simple Fisher-Yates with seeded LCG
  let seed = Z * 1997 + 31;
  function lcg() { seed = (seed * 1664525 + 1013904223) & 0xffffffff; return (seed >>> 0) / 0xffffffff; }
  for (let i = types.length - 1; i > 0; i--) {
    const j = Math.floor(lcg() * (i + 1));
    [types[i], types[j]] = [types[j], types[i]];
  }

  // Ring step = 2*r - 1 = 11px: circles just barely overlap, staying tightly packed
  const ringStep = r * 2 - 1;

  while (placed < total && ringIdx < ringCapacities.length) {
    const cap       = ringCapacities[ringIdx];
    const ringR     = ringIdx === 0 ? 0 : ringStep * ringIdx;
    const inRing    = Math.min(cap, total - placed);
    const angleStep = inRing === 1 ? 0 : TWO_PI / inRing;

    for (let i = 0; i < inRing; i++) {
      const angle = ringIdx === 0 ? 0 : i * angleStep;
      particles.push({
        x: cos(angle) * ringR,
        y: sin(angle) * ringR,
        type: types[placed]
      });
      placed++;
    }
    ringIdx++;
  }
  return particles;
}

// ── Setup ────────────────────────────────────────────────────────────────────
function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Mouse hover tracking for animation gating
  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(()  => mouseOverCanvas = false);

  // Z slider (Atomic Number 1–18, default 6 = Carbon)
  zSlider = createSlider(1, 18, 6, 1);
  zSlider.position(sliderLeftMargin, drawHeight + 12);
  zSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Interactive atomic structure diagram. Use the slider to change the atomic number and observe protons, neutrons, and electron shells.', LABEL);
}

// ── Draw ─────────────────────────────────────────────────────────────────────
function draw() {
  updateCanvasSize();

  const Z = zSlider.value();
  const el = ELEMENTS[Z];
  const [symbol, name, neutrons, shells] = el;
  const totalElectrons = Z;

  // Rebuild nucleus only when Z changes
  if (Z !== prevZ) {
    nucleusParticles = buildNucleus(Z);
    prevZ = Z;
  }

  // ── Drawing region (dark navy) ─────────────────────────────────────────────
  noStroke();
  fill('#0d1117');
  rect(0, 0, canvasWidth, drawHeight);

  // ── Control region (white) ─────────────────────────────────────────────────
  fill(255);
  rect(0, drawHeight, canvasWidth, controlHeight);
  stroke('silver');
  strokeWeight(1);
  line(0, drawHeight, canvasWidth, drawHeight);

  // ── Atom centre (left ~52% of canvas) ─────────────────────────────────────
  const cx = canvasWidth * 0.37;
  const cy = drawHeight * 0.50;

  // ── Electron shells (dashed ellipses) ─────────────────────────────────────
  noFill();
  stroke(100, 140, 200, 180);
  strokeWeight(1.5);
  drawingContext.setLineDash([6, 5]);
  for (let s = 0; s < 3; s++) {
    if (shells[s] > 0) {
      ellipse(cx, cy, shellRadiusX(s) * 2, shellRadiusY(s) * 2);
    }
  }
  drawingContext.setLineDash([]);

  // ── Animate electron angles when mouse over ────────────────────────────────
  if (mouseOverCanvas) {
    shellAngles[0] += 0.025;
    shellAngles[1] += 0.016;
    shellAngles[2] += 0.011;
  }

  // ── Electrons on shells ────────────────────────────────────────────────────
  noStroke();
  fill(80, 140, 255);
  for (let s = 0; s < 3; s++) {
    const n = shells[s];
    if (n === 0) continue;
    const rx = shellRadiusX(s);
    const ry = shellRadiusY(s);
    const baseAngle = shellAngles[s];
    for (let i = 0; i < n; i++) {
      const angle = baseAngle + (TWO_PI / n) * i;
      const ex = cx + cos(angle) * rx;
      const ey = cy + sin(angle) * ry;
      circle(ex, ey, 9);
    }
  }

  // ── Nucleus particles ──────────────────────────────────────────────────────
  // No scaling — buildNucleus already places particles at correct touching distances
  let hoveredParticle = null;
  let hoveredType = '';

  for (let i = 0; i < nucleusParticles.length; i++) {
    const p = nucleusParticles[i];
    const px = cx + p.x;
    const py = cy + p.y;
    const isHovered = dist(mouseX, mouseY, px, py) < 8;

    if (p.type === 'p') {
      fill(isHovered ? color(255, 100, 100) : color(220, 50, 50));
    } else {
      fill(isHovered ? color(200, 200, 200) : color(140, 140, 140));
    }
    noStroke();
    circle(px, py, 14);

    // Slight highlight ring
    if (isHovered) {
      noFill();
      stroke(255, 255, 100);
      strokeWeight(1.5);
      circle(px, py, 18);
      noStroke();
      hoveredParticle = {x: px, y: py};
      hoveredType = p.type === 'p' ? 'Proton (+1)' : 'Neutron (0)';
    }
  }

  // ── Title ──────────────────────────────────────────────────────────────────
  noStroke();
  fill(220, 220, 255);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(20);
  text('Atomic Structure', cx, 12);
  textStyle(NORMAL);

  // ── Legend panel (right side) ──────────────────────────────────────────────
  const lx = canvasWidth * 0.66;
  const lw = canvasWidth * 0.30;
  const ly = drawHeight * 0.10;
  const lh = drawHeight * 0.82;

  // Panel background
  fill(20, 28, 46, 220);
  stroke(70, 100, 160);
  strokeWeight(1);
  rect(lx, ly, lw, lh, 10);

  const lp = 14; // inner padding
  let ty = ly + lp + 8;

  // Element symbol (large)
  noStroke();
  fill(255, 230, 80);
  textAlign(CENTER, TOP);
  textSize(48);
  textStyle(BOLD);
  text(symbol, lx + lw / 2, ty);
  ty += 54;

  // Element name
  textSize(15);
  textStyle(NORMAL);
  fill(200, 215, 255);
  text(name, lx + lw / 2, ty);
  ty += 28;

  // Divider
  stroke(70, 100, 160);
  strokeWeight(1);
  line(lx + lp, ty, lx + lw - lp, ty);
  ty += 12;
  noStroke();

  // Legend rows
  const legendItems = [
    { label: 'Protons',   value: Z,           col: color(220, 70, 70)  },
    { label: 'Neutrons',  value: neutrons,     col: color(170, 170, 170)},
    { label: 'Electrons', value: totalElectrons, col: color(80, 140, 255) },
  ];

  textAlign(LEFT, TOP);
  for (const item of legendItems) {
    // Colour swatch
    fill(item.col);
    noStroke();
    circle(lx + lp + 8, ty + 8, 14);

    // Label
    fill(200, 215, 255);
    textSize(14);
    text(item.label + ':', lx + lp + 22, ty);

    // Value (right-aligned)
    fill(255, 230, 80);
    textSize(15);
    textStyle(BOLD);
    textAlign(RIGHT, TOP);
    text(item.value, lx + lw - lp, ty);
    textAlign(LEFT, TOP);
    textStyle(NORMAL);

    ty += 30;
  }

  // Electron shell breakdown
  ty += 4;
  stroke(70, 100, 160);
  strokeWeight(1);
  line(lx + lp, ty, lx + lw - lp, ty);
  ty += 10;
  noStroke();

  fill(180, 195, 240);
  textSize(13);
  textAlign(CENTER, TOP);
  text('Electron configuration', lx + lw / 2, ty);
  ty += 20;

  const shellNames = ['Shell 1 (1s)', 'Shell 2 (2s2p)', 'Shell 3 (3s3p)'];
  for (let s = 0; s < 3; s++) {
    if (shells[s] > 0) {
      fill(130, 155, 220);
      textSize(12);
      textAlign(LEFT, TOP);
      text(shellNames[s] + ':', lx + lp, ty);
      fill(255, 230, 80);
      textSize(13);
      textStyle(BOLD);
      textAlign(RIGHT, TOP);
      text(shells[s] + (shells[s] === 1 ? ' e⁻' : ' e⁻'), lx + lw - lp, ty);
      textAlign(LEFT, TOP);
      textStyle(NORMAL);
      ty += 22;
    }
  }

  // ── Tooltip ────────────────────────────────────────────────────────────────
  if (hoveredParticle) {
    const tx = hoveredParticle.x + 14;
    const ttY = hoveredParticle.y - 14;
    const tw  = textWidth(hoveredType) + 16;
    fill(30, 30, 50, 230);
    stroke(200, 200, 100);
    strokeWeight(1);
    rect(tx, ttY - 14, tw, 24, 5);
    noStroke();
    fill(255, 240, 120);
    textSize(13);
    textAlign(LEFT, CENTER);
    text(hoveredType, tx + 8, ttY - 2);
  }

  // ── Control region labels ──────────────────────────────────────────────────
  textAlign(LEFT, CENTER);
  textSize(15);
  noStroke();
  fill(30);
  textStyle(BOLD);
  text('Atomic Number (Z): ', 10, drawHeight + 25);
  fill(0, 80, 180);
  text(Z, 190, drawHeight + 25);
  textStyle(NORMAL);
}

// ── Responsive resize ─────────────────────────────────────────────────────────
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  zSlider.position(sliderLeftMargin, drawHeight + 12);
  zSlider.size(canvasWidth - sliderLeftMargin - margin);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
