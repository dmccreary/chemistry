// Mole Conversion Triangle MicroSim
// CANVAS_HEIGHT: 580
// AP Chemistry - Chapter 2: Atomic Structure and Mass Spectrometry (Section 2.7)
// Learning objective (Bloom: Apply): Students will apply mole conversion factors
// to convert between mass, moles, and number of particles.
//
// Chemistry model:
//   n = m / M          (moles = mass in grams divided by molar mass in g/mol)
//   N = n x N_A        (particles = moles times Avogadro's number)
//   N_A = 6.022 x 10^23 particles per mole
// There is no one-step road between mass and particles: every conversion
// passes through moles, which is why moles sits at the top of the triangle.

// ---- Layout constants -------------------------------------------------------
let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 80;          // two rows of controls
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let defaultTextSize = 16;

// ---- Chemistry constants ----------------------------------------------------
const AVOGADRO_MANTISSA = 6.022;  // N_A = 6.022 x 10^23 mol^-1
const AVOGADRO = 6.022e23;

// name, formula in rich-text markup, molar mass (g/mol), particle word
const SUBSTANCES = [
  { name: 'Carbon',         formula: 'C',                    option: 'Carbon, C',                 M: 12.011,  particle: 'atoms' },
  { name: 'Iron',           formula: 'Fe',                   option: 'Iron, Fe',                  M: 55.845,  particle: 'atoms' },
  { name: 'Water',          formula: 'H_{2}O',               option: 'Water, H₂O',           M: 18.015,  particle: 'molecules' },
  { name: 'Carbon dioxide', formula: 'CO_{2}',               option: 'Carbon dioxide, CO₂',  M: 44.009,  particle: 'molecules' },
  { name: 'Glucose',        formula: 'C_{6}H_{12}O_{6}',     option: 'Glucose, C₆H₁₂O₆', M: 180.156, particle: 'molecules' },
  { name: 'Sodium chloride', formula: 'NaCl',                option: 'Sodium chloride, NaCl',     M: 58.44,   particle: 'formula units' }
];

const GIVEN_OPTIONS = ['Mass (g)', 'Moles (mol)', 'Particles (× 10²³)'];
const GIVEN_KEYS = ['mass', 'moles', 'particles'];

// ---- State ------------------------------------------------------------------
let substanceSelect, givenSelect, amountInput, exampleButton;
let nodes = {};        // geometry of the three triangle nodes, rebuilt every frame

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  // Row 1: substance + reset-to-example button
  substanceSelect = createSelect();
  substanceSelect.parent(mainElement);
  for (let i = 0; i < SUBSTANCES.length; i++) {
    substanceSelect.option(SUBSTANCES[i].option, i);
  }
  substanceSelect.selected(0);

  exampleButton = createButton('Reset Example');
  exampleButton.parent(mainElement);
  exampleButton.mousePressed(resetExample);

  // Row 2: which quantity is given + its value
  givenSelect = createSelect();
  givenSelect.parent(mainElement);
  for (let i = 0; i < GIVEN_OPTIONS.length; i++) {
    givenSelect.option(GIVEN_OPTIONS[i], GIVEN_KEYS[i]);
  }
  givenSelect.selected('mass');

  amountInput = createInput('24.0');
  amountInput.parent(mainElement);
  amountInput.size(80);
  amountInput.attribute('inputmode', 'decimal');
  amountInput.attribute('aria-label', 'Amount of the given quantity');

  positionControls();

  describe('Mole conversion triangle. Three boxes for mass in grams, moles, and number of particles are joined by arrows labeled with the conversion factors molar mass and Avogadro\'s number. Choose a substance, choose which quantity is given, and type an amount to see the other two quantities and a step-by-step worked solution.', LABEL);
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
  textSize(canvasWidth < 500 ? 20 : 24);
  text('Mole Conversion Triangle', canvasWidth / 2, 10);

  const calc = calculate();

  layoutNodes();
  drawEdges(calc);
  drawNodes(calc);
  drawSolutionPanel(calc);
  drawControlLabels();
}

// ---- Calculation ------------------------------------------------------------
// Returns the three quantities for the current inputs.
function calculate() {
  const sub = SUBSTANCES[int(substanceSelect.value())];
  const given = givenSelect.value();
  const raw = amountInput.value().trim();
  const v = Number(raw);
  const result = { sub: sub, given: given, raw: raw, valid: false };
  if (raw === '' || !isFinite(v) || v <= 0) {
    return result;
  }
  result.valid = true;
  if (given === 'mass') {
    result.mass = v;
    result.moles = v / sub.M;                 // n = m / M
    result.particles = result.moles * AVOGADRO; // N = n x N_A
  } else if (given === 'moles') {
    result.moles = v;
    result.mass = v * sub.M;                  // m = n x M
    result.particles = v * AVOGADRO;          // N = n x N_A
  } else {
    result.particles = v * 1e23;              // input is in units of 10^23
    result.moles = result.particles / AVOGADRO; // n = N / N_A
    result.mass = result.moles * sub.M;       // m = n x M
  }
  return result;
}

// ---- Triangle geometry ------------------------------------------------------
function layoutNodes() {
  const nodeW = constrain(canvasWidth * 0.27, 112, 215);
  const nodeH = 66;
  const sideX = max(nodeW / 2 + 8, canvasWidth * 0.19);
  nodes.moles = { x: canvasWidth / 2, y: 78, w: nodeW, h: nodeH, color: 'royalblue', label: 'Moles' };
  nodes.mass = { x: sideX, y: 250, w: nodeW, h: nodeH, color: 'forestgreen', label: 'Mass' };
  nodes.particles = { x: canvasWidth - sideX, y: 250, w: nodeW, h: nodeH, color: 'crimson', label: 'Particles' };
}

// Point where the line from the center of node a toward node b leaves a's rectangle
function boundaryPoint(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const sx = dx === 0 ? Infinity : (a.w / 2 + 4) / abs(dx);
  const sy = dy === 0 ? Infinity : (a.h / 2 + 4) / abs(dy);
  const s = min(sx, sy);
  return { x: a.x + dx * s, y: a.y + dy * s };
}

function drawEdges(calc) {
  const small = canvasWidth < 560;
  const bigSize = small ? 14 : 18;
  const noteSize = small ? 11 : 13;

  // Which one-step conversions does the current calculation use?
  const active = { massToMoles: false, molesToMass: false, molesToParticles: false, particlesToMoles: false };
  if (calc.given === 'mass') { active.massToMoles = true; active.molesToParticles = true; }
  if (calc.given === 'moles') { active.molesToMass = true; active.molesToParticles = true; }
  if (calc.given === 'particles') { active.particlesToMoles = true; active.molesToMass = true; }

  // Left edge: mass <-> moles
  let a = boundaryPoint(nodes.mass, nodes.moles);
  let b = boundaryPoint(nodes.moles, nodes.mass);
  drawArrowPair(a, b, active.massToMoles, active.molesToMass);
  let mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  // outside label (upper left): mass to moles
  setLabelStyle(active.massToMoles, bigSize);
  drawRich('÷ M', mid.x - 26, mid.y - 20, bigSize, RIGHT);
  textStyle(NORMAL);
  fill('dimgray');
  drawRich('(molar mass)', mid.x - 26, mid.y - 20 + bigSize, noteSize, RIGHT);
  // inside label: moles to mass
  setLabelStyle(active.molesToMass, bigSize);
  drawRich('× M', mid.x + 24, mid.y + 14, bigSize, LEFT);

  // Right edge: moles <-> particles
  a = boundaryPoint(nodes.moles, nodes.particles);
  b = boundaryPoint(nodes.particles, nodes.moles);
  drawArrowPair(a, b, active.molesToParticles, active.particlesToMoles);
  mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  // outside label (upper right): moles to particles
  setLabelStyle(active.molesToParticles, bigSize);
  drawRich('× N_{A}', mid.x + 26, mid.y - 20, bigSize, LEFT);
  textStyle(NORMAL);
  fill('dimgray');
  drawRich('(6.022 × 10^{23})', mid.x + 26, mid.y - 20 + bigSize, noteSize, LEFT);
  // inside label: particles to moles
  setLabelStyle(active.particlesToMoles, bigSize);
  drawRich('÷ N_{A}', mid.x - 24, mid.y + 14, bigSize, RIGHT);

  // Bottom edge: mass <-> particles is always a two-step trip through moles
  const y = nodes.mass.y;
  const x1 = nodes.mass.x + nodes.mass.w / 2 + 6;
  const x2 = nodes.particles.x - nodes.particles.w / 2 - 6;
  stroke('gray');
  strokeWeight(2);
  drawingContext.setLineDash([7, 6]);
  line(x1 + 8, y, x2 - 8, y);
  drawingContext.setLineDash([]);
  drawArrowHead(x1, y, PI, 'gray', 10);
  drawArrowHead(x2, y, 0, 'gray', 10);
  textStyle(NORMAL);
  const comboSize = small ? 12 : 14;
  const cx = (x1 + x2) / 2;
  fill('black');
  drawRich('two steps, through moles', cx, y - 40, comboSize, CENTER);
  fill('dimgray');
  if (small) {
    // short form with drawn direction markers so the labels fit between the boxes
    const toParticles = '\u00F7 M, then \u00D7 N_{A}';
    const toMass = '\u00F7 N_{A}, then \u00D7 M';
    drawRich(toParticles, cx - 5, y - 16, comboSize, CENTER);
    drawArrowHead(cx - 5 + richWidth(toParticles, comboSize) / 2 + 11, y - 16, 0, 'dimgray', 8);
    drawRich(toMass, cx + 5, y + 17, comboSize, CENTER);
    drawArrowHead(cx + 5 - richWidth(toMass, comboSize) / 2 - 11, y + 17, PI, 'dimgray', 8);
  } else {
    drawRich('to particles: \u00F7 M, then \u00D7 N_{A}', cx, y - 16, comboSize, CENTER);
    drawRich('to mass: \u00F7 N_{A}, then \u00D7 M', cx, y + 17, comboSize, CENTER);
  }
}

function setLabelStyle(isActive, size) {
  noStroke();
  textStyle(isActive ? BOLD : NORMAL);
  fill(isActive ? 'black' : 'dimgray');
  textSize(size);
}

// Two parallel arrows between points a and b: a-to-b and b-to-a
function drawArrowPair(a, b, forwardActive, backActive) {
  const ang = atan2(b.y - a.y, b.x - a.x);
  const off = 6;
  const px = -sin(ang) * off;
  const py = cos(ang) * off;
  // forward arrow (a to b) is drawn on the upper/outer side
  drawArrow(a.x + px * -1, a.y + py * -1, b.x + px * -1, b.y + py * -1, forwardActive);
  // return arrow (b to a) is drawn on the lower/inner side
  drawArrow(b.x + px, b.y + py, a.x + px, a.y + py, backActive);
}

function drawArrow(x1, y1, x2, y2, isActive) {
  const col = isActive ? 'darkorange' : 'silver';
  const ang = atan2(y2 - y1, x2 - x1);
  const head = isActive ? 13 : 10;
  stroke(col);
  strokeWeight(isActive ? 5 : 3);
  line(x1, y1, x2 - cos(ang) * head * 0.8, y2 - sin(ang) * head * 0.8);
  drawArrowHead(x2, y2, ang, col, head);
}

function drawArrowHead(x, y, ang, col, size) {
  push();
  translate(x, y);
  rotate(ang);
  noStroke();
  fill(col);
  triangle(0, 0, -size, -size * 0.55, -size, size * 0.55);
  pop();
}

function drawNodes(calc) {
  const small = canvasWidth < 560;
  const keys = ['moles', 'mass', 'particles'];
  for (let k of keys) {
    const nd = nodes[k];
    const isGiven = calc.given === k;
    // box
    stroke(isGiven ? 'darkorange' : 'white');
    strokeWeight(isGiven ? 5 : 2);
    fill(nd.color);
    rect(nd.x - nd.w / 2, nd.y - nd.h / 2, nd.w, nd.h, 12);

    // heading line
    noStroke();
    fill('white');
    textStyle(BOLD);
    let heading = nd.label;
    if (k === 'mass') heading = 'Mass (g)';
    if (k === 'moles') heading = 'Moles (mol)';
    if (k === 'particles') heading = small ? 'Particles' : 'Particles (' + calc.sub.particle + ')';
    drawRich(heading, nd.x, nd.y - 15, small ? 13 : 15, CENTER);

    // value line
    textStyle(NORMAL);
    let valueText = '?';
    if (calc.valid) {
      if (k === 'mass') valueText = formatValue(calc.mass, isGiven, calc) + ' g';
      if (k === 'moles') valueText = formatValue(calc.moles, isGiven, calc) + ' mol';
      if (k === 'particles') valueText = formatValue(calc.particles, isGiven, calc);
    }
    drawRich(valueText, nd.x, nd.y + 12, small ? 14 : 18, CENTER);

    // "given" tag: a small white pill sitting on the edge of the box
    if (isGiven) {
      const tagY = k === 'moles' ? nd.y - nd.h / 2 : nd.y + nd.h / 2;
      stroke('darkorange');
      strokeWeight(2);
      fill('white');
      rect(nd.x - 27, tagY - 9, 54, 18, 9);
      noStroke();
      fill('chocolate');
      textStyle(BOLD);
      drawRich('given', nd.x, tagY, 13, CENTER);
      textStyle(NORMAL);
    }
  }
}

// ---- Worked solution --------------------------------------------------------
function drawSolutionPanel(calc) {
  const px = margin;
  const py = 300;
  const pw = canvasWidth - 2 * margin;
  const ph = drawHeight - py - 10;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(px, py, pw, ph, 10);

  const small = canvasWidth < 640;
  const fs = small ? 13 : (canvasWidth >= 760 ? 18 : 16);
  const lh = fs + 8;
  const left = px + 12;
  const right = px + pw - 12;
  let y = py + 8 + lh / 2;
  const sub = calc.sub;

  noStroke();
  fill('black');
  if (!calc.valid) {
    textStyle(BOLD);
    drawRich('Enter a positive number for the given amount.', left, y, fs, LEFT);
    textStyle(NORMAL);
    return;
  }

  // Line 1: what is given, plus the two conversion factors
  const givenText = 'Given: ' + givenPhrase(calc) + ' of ' + sub.name.toLowerCase() + ' (' + sub.formula + ')';
  const constText = 'M = ' + sub.M + ' g/mol      N_{A} = 6.022 × 10^{23} mol^{-1}';
  textStyle(BOLD);
  drawRich(givenText, left, y, fs, LEFT);
  const givenW = richWidth(givenText, fs);
  textStyle(NORMAL);
  fill('dimgray');
  if (left + givenW + 30 + richWidth(constText, fs) <= right) {
    drawRich(constText, right, y, fs, RIGHT);
  } else {
    y += lh;
    drawRich(constText, left, y, fs, LEFT);
  }
  y += lh + 4;

  // Build the two steps for this starting point
  const steps = buildSteps(calc);
  for (let i = 0; i < steps.length; i++) {
    fill('darkorange');
    textStyle(BOLD);
    drawRich('Step ' + (i + 1) + ':', left, y, fs, LEFT);
    const stepW = richWidth('Step 1:', fs) + 8;
    fill('black');
    drawRich(steps[i].title, left + stepW, y, fs, LEFT);
    textStyle(NORMAL);
    y += lh;
    // flow the equation pieces, wrapping when the line is full
    let x = left + 18;
    for (let j = 0; j < steps[i].parts.length; j++) {
      const part = steps[i].parts[j];
      const w = richWidth(part, fs);
      if (x + w > right && x > left + 18) {
        x = left + 36;
        y += lh;
      }
      const isAnswer = j === steps[i].parts.length - 1;
      textStyle(isAnswer ? BOLD : NORMAL);
      fill(isAnswer ? steps[i].color : 'black');
      drawRich(part, x, y, fs, LEFT);
      x += w + richWidth(' ', fs) * 1.5;
    }
    textStyle(NORMAL);
    y += lh + 4;
  }
}

function givenPhrase(calc) {
  if (calc.given === 'mass') return calc.raw + ' g';
  if (calc.given === 'moles') return calc.raw + ' mol';
  return calc.raw + ' × 10^{23} ' + calc.sub.particle;
}

function buildSteps(calc) {
  const sub = calc.sub;
  const M = sub.M + ' g/mol';
  const NA = '6.022 × 10^{23} mol^{-1}';
  const massStr = (calc.given === 'mass' ? calc.raw : sig4(calc.mass)) + ' g';
  const molStr = (calc.given === 'moles' ? calc.raw : sig4(calc.moles)) + ' mol';
  const partStr = (calc.given === 'particles' ? calc.raw + ' × 10^{23}' : sig4(calc.particles)) + ' ' + sub.particle;
  const partNoUnit = calc.given === 'particles' ? calc.raw + ' × 10^{23}' : sig4(calc.particles);

  const massToMoles = {
    title: 'mass to moles, divide by molar mass',
    parts: ['n = m ÷ M', '= ' + massStr + ' ÷ ' + M, '= ' + molStr],
    color: 'royalblue'
  };
  const molesToMass = {
    title: 'moles to mass, multiply by molar mass',
    parts: ['m = n × M', '= ' + molStr + ' × ' + M, '= ' + massStr],
    color: 'forestgreen'
  };
  const molesToParticles = {
    title: 'moles to ' + sub.particle + ', multiply by Avogadro\'s number',
    parts: ['N = n × N_{A}', '= ' + molStr + ' × ' + NA, '= ' + partStr],
    color: 'crimson'
  };
  const particlesToMoles = {
    title: sub.particle + ' to moles, divide by Avogadro\'s number',
    parts: ['n = N ÷ N_{A}', '= ' + partNoUnit + ' ÷ ' + NA, '= ' + molStr],
    color: 'royalblue'
  };

  if (calc.given === 'mass') return [massToMoles, molesToParticles];
  if (calc.given === 'moles') return [molesToMass, molesToParticles];
  return [particlesToMoles, molesToMass];
}

// ---- Number formatting ------------------------------------------------------
// Four significant figures; scientific notation for very large or small values
function sig4(x) {
  if (x === 0) return '0';
  const ax = abs(x);
  if (ax >= 0.001 && ax < 10000) {
    const plain = x.toPrecision(4);     // keeps trailing zeros, e.g. 0.2000
    if (plain.indexOf('e') === -1) return plain;
  }
  let e = Math.floor(Math.log10(ax));
  let m = x / Math.pow(10, e);
  let ms = m.toFixed(3);
  if (Number(ms) >= 10) {      // rounding pushed the mantissa to 10.000
    e += 1;
    ms = (m / 10).toFixed(3);
  }
  return ms + ' × 10^{' + e + '}';
}

function formatValue(x, isGiven, calc) {
  if (isGiven) {
    if (calc.given === 'particles') return calc.raw + ' × 10^{23}';
    return calc.raw;
  }
  return sig4(x);
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
  for (let s of segs) {
    textSize(s.m === 0 ? size : size * 0.7);
    w += textWidth(s.t);
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
  for (let s of segs) {
    if (s.m === 0) {
      textSize(size);
      text(s.t, cx, baseline);
    } else {
      textSize(size * 0.7);
      text(s.t, cx, baseline + (s.m === -1 ? size * 0.22 : -size * 0.42));
    }
    cx += textWidth(s.t);
  }
  textSize(size);
}

// ---- Controls ---------------------------------------------------------------
function drawControlLabels() {
  noStroke();
  fill('black');
  textStyle(NORMAL);
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Substance:', 10, drawHeight + 21);
  text('Given:', 10, drawHeight + 58);
}

function positionControls() {
  if (!substanceSelect) return;
  substanceSelect.position(95, drawHeight + 9);
  const subW = substanceSelect.elt.offsetWidth || 190;
  exampleButton.position(95 + subW + 12, drawHeight + 8);
  givenSelect.position(62, drawHeight + 46);
  const givenW = givenSelect.elt.offsetWidth || 150;
  amountInput.position(62 + givenW + 10, drawHeight + 46);
}

function resetExample() {
  // The worked example from the chapter specification: 24.0 g of carbon
  substanceSelect.selected(0);
  givenSelect.selected('mass');
  amountInput.value('24.0');
}

// Clicking a box in the triangle makes that quantity the "given" one,
// keeping the same physical amount of substance.
function mousePressed() {
  if (mouseY > drawHeight) return;
  const calc = calculate();
  for (let k of GIVEN_KEYS) {
    const nd = nodes[k];
    if (!nd) continue;
    if (abs(mouseX - nd.x) <= nd.w / 2 && abs(mouseY - nd.y) <= nd.h / 2) {
      if (k === calc.given) return;
      if (calc.valid) {
        if (k === 'mass') amountInput.value(plainNumber(calc.mass));
        if (k === 'moles') amountInput.value(plainNumber(calc.moles));
        if (k === 'particles') amountInput.value(plainNumber(calc.particles / 1e23));
      }
      givenSelect.selected(k);
      return;
    }
  }
}

// Four significant figures as a plain decimal string for the input box
function plainNumber(x) {
  return Number(x.toPrecision(4)).toString();
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
