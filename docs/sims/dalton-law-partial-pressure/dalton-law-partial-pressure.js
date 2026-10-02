// Dalton's Law of Partial Pressures MicroSim
// CANVAS_HEIGHT: 560
// AP Chemistry - Chapter 6: Intermolecular Forces and States of Matter (Section 7)
// Learning objective (Bloom: Apply): Students will calculate mole fractions and
// partial pressures for a gas mixture and verify that the partial pressures add
// up to the total pressure.
//
// Chemistry model (ideal gases that do not react):
//   mole fraction      chi_i   = n_i / n_total        (the chi_i add up to 1)
//   partial pressure   P_i     = chi_i x P_total
//   Dalton's law       P_total = P_A + P_B + P_C
// The four flasks have the same volume and temperature, so the number of dots
// drawn for each gas is proportional to its partial pressure (40 dots per atm).
// The mixture flask is the three single-gas flasks laid on top of one another:
// every dot keeps the same position, which is Dalton's law in picture form.

// ---- Layout constants -------------------------------------------------------
let canvasWidth = 800;
let drawHeight = 480;
let controlHeight = 80;          // two rows of sliders, two sliders per row
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let defaultTextSize = 16;

// ---- Model constants --------------------------------------------------------
const GASES = [
  { key: 'A', color: 'tomato',         textColor: 'firebrick',   start: 1.6 },
  { key: 'B', color: 'cornflowerblue', textColor: 'royalblue',   start: 1.4 },
  { key: 'C', color: 'forestgreen',    textColor: 'darkgreen',   start: 1.0 }
];
const DOTS_PER_ATM = 40;         // dots drawn per atmosphere of partial pressure
const MOLES_MIN = 0.5;
const MOLES_MAX = 3.0;
const PRESSURE_MIN = 0.5;        // atm
const PRESSURE_MAX = 2.0;        // atm
const FLASK_BOTTOM = 205;        // y of the bottom of every flask

// ---- State ------------------------------------------------------------------
let moleSliders = [];
let pressureSlider;
let dotSites = [];               // shuffled lattice points inside the unit disk

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  for (let i = 0; i < GASES.length; i++) {
    const s = createSlider(MOLES_MIN, MOLES_MAX, GASES[i].start, 0.1);
    s.parent(mainElement);
    s.attribute('aria-label', 'Moles of gas ' + GASES[i].key);
    moleSliders.push(s);
  }
  pressureSlider = createSlider(PRESSURE_MIN, PRESSURE_MAX, 1.0, 0.05);
  pressureSlider.parent(mainElement);
  pressureSlider.attribute('aria-label', 'Total pressure in atmospheres');

  buildDotSites();
  positionControls();

  describe('Dalton\'s law of partial pressures. Three flasks each hold one gas alone, and a fourth flask holds the mixture of all three. A pie chart shows the mole fractions and a table lists moles, mole fraction, and partial pressure for each gas. Sliders set the moles of gas A, B, and C and the total pressure; all values update as the sliders move.', LABEL);
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
  textSize(canvasWidth < 500 ? 19 : 24);
  text('Dalton\'s Law of Partial Pressures', canvasWidth / 2, 10);

  const calc = calculate();
  drawFlasks(calc);
  drawEquation(calc);
  drawPie(calc);
  drawTable(calc);
  drawControlLabels(calc);
}

// ---- Calculation ------------------------------------------------------------
function calculate() {
  const n = [];
  let nTotal = 0;
  for (let i = 0; i < GASES.length; i++) {
    // sliders move in steps of 0.1 mol; round away floating point noise
    const v = Math.round(moleSliders[i].value() * 10) / 10;
    n.push(v);
    nTotal += v;
  }
  const pTotal = Math.round(pressureSlider.value() * 100) / 100;
  const x = [];
  const p = [];
  const dots = [];
  for (let i = 0; i < GASES.length; i++) {
    x.push(n[i] / nTotal);            // chi_i = n_i / n_total
    p.push(x[i] * pTotal);            // P_i = chi_i x P_total
    dots.push(Math.round(p[i] * DOTS_PER_ATM));
  }
  return { n: n, nTotal: nTotal, pTotal: pTotal, x: x, p: p, dots: dots };
}

// ---- Dot positions ----------------------------------------------------------
// A jittered hexagonal lattice inside the unit disk, ordered with a fixed seed.
// Gas A uses sites 0, 3, 6, ...; gas B uses 1, 4, 7, ...; gas C uses 2, 5, 8, ...
// so a gas has exactly the same dot positions alone and in the mixture.
function buildDotSites() {
  const spacing = 0.122;
  const sites = [];
  let seed = 20261;
  function rand() {                 // small deterministic generator
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  }
  let row = 0;
  for (let y = -1; y <= 1; y += spacing * 0.866) {
    const offset = (row % 2) * spacing / 2;
    for (let x = -1 + offset; x <= 1; x += spacing) {
      const jx = x + (rand() - 0.5) * spacing * 0.3;
      const jy = y + (rand() - 0.5) * spacing * 0.3;
      if (jx * jx + jy * jy <= 0.88 * 0.88) {
        sites.push({ x: jx, y: jy });
      }
    }
    row++;
  }
  // Order the sites with best-candidate sampling: each new dot for a gas is the
  // one of 10 random unused sites that lies farthest from that gas's earlier
  // dots. This keeps every gas spread evenly through the flask at any count.
  const ordered = [];
  const chosen = [[], [], []];
  const perGas = Math.floor(sites.length / 3);
  for (let d = 0; d < perGas; d++) {
    for (let gas = 0; gas < 3; gas++) {
      let best = 0;
      let bestDist = -1;
      for (let c = 0; c < 10; c++) {
        const idx = Math.floor(rand() * sites.length);
        let nearest = 99;
        for (let k = 0; k < chosen[gas].length; k++) {
          const dx = sites[idx].x - chosen[gas][k].x;
          const dy = sites[idx].y - chosen[gas][k].y;
          nearest = Math.min(nearest, dx * dx + dy * dy);
        }
        if (nearest > bestDist) {
          bestDist = nearest;
          best = idx;
        }
      }
      const site = sites.splice(best, 1)[0];
      chosen[gas].push(site);
      ordered.push(site);
    }
  }
  dotSites = ordered;
}

// ---- Flasks -----------------------------------------------------------------
function drawFlasks(calc) {
  const small = canvasWidth < 560;
  const opW = small ? 16 : 30;
  const slotW = (canvasWidth - 2 * margin - 3 * opW) / 4;
  const R = constrain(slotW * 0.40, 26, 60);
  const cy = FLASK_BOTTOM - R;
  const nameSize = small ? 12 : 16;
  const valueSize = small ? 12 : 16;
  const ops = ['+', '+', '='];

  for (let k = 0; k < 4; k++) {
    const cx = margin + slotW / 2 + k * (slotW + opW);
    drawFlaskGlass(cx, cy, R);
    const dotR = max(1.8, R * 0.047);
    for (let i = 0; i < GASES.length; i++) {
      if (k < 3 && k !== i) continue;       // single-gas flasks hold one gas
      noStroke();
      fill(GASES[i].color);
      for (let d = 0; d < calc.dots[i]; d++) {
        const site = dotSites[d * 3 + i];
        if (!site) break;
        circle(cx + site.x * R, cy + site.y * R, dotR * 2);
      }
    }

    // labels under the flask
    noStroke();
    if (k < 3) {
      fill(GASES[k].textColor);
      textStyle(BOLD);
      drawRich(small ? 'Gas ' + GASES[k].key : 'Gas ' + GASES[k].key + ' alone', cx, FLASK_BOTTOM + 17, nameSize, CENTER);
      textStyle(NORMAL);
      fill('black');
      drawRich('P_{' + GASES[k].key + '} = ' + calc.p[k].toFixed(3) + (small ? '' : ' atm'), cx, FLASK_BOTTOM + 38, valueSize, CENTER);
    } else {
      fill('black');
      textStyle(BOLD);
      drawRich(small ? 'Mixture' : 'Mixture of A, B, C', cx, FLASK_BOTTOM + 17, nameSize, CENTER);
      drawRich('P_{total} = ' + calc.pTotal.toFixed(2) + (small ? '' : ' atm'), cx, FLASK_BOTTOM + 38, valueSize, CENTER);
      textStyle(NORMAL);
    }

    // operator between flasks
    if (k < 3) {
      fill('black');
      textStyle(BOLD);
      drawRich(ops[k], cx + slotW / 2 + opW / 2, cy, small ? 20 : 30, CENTER);
      textStyle(NORMAL);
    }
  }
}

// Round-bottom flask with a short neck and a stopper
function drawFlaskGlass(cx, cy, R) {
  const neckHalf = R * 0.26;
  const neckH = R * 0.5;
  const theta0 = asin(neckHalf / R);          // angle from vertical where neck joins body
  const joinY = cy - R * cos(theta0);
  stroke('dimgray');
  strokeWeight(2);
  fill('white');
  beginShape();
  vertex(cx - neckHalf, joinY - neckH);
  vertex(cx - neckHalf, joinY);
  // around the body, counterclockwise from the left neck joint to the right one
  const steps = 60;
  for (let s = 0; s <= steps; s++) {
    const a = -HALF_PI - theta0 - (TWO_PI - 2 * theta0) * s / steps;
    vertex(cx + R * cos(a), cy + R * sin(a));
  }
  vertex(cx + neckHalf, joinY - neckH);
  endShape();
  // stopper
  stroke('saddlebrown');
  strokeWeight(1);
  fill('peru');
  rect(cx - neckHalf - 2, joinY - neckH - 8, 2 * neckHalf + 4, 12, 3);
}

// ---- Dalton's law equation --------------------------------------------------
function drawEquation(calc) {
  const y = 262;
  const h = 32;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(margin, y, canvasWidth - 2 * margin, h, 8);

  const numbers = calc.p[0].toFixed(3) + ' + ' + calc.p[1].toFixed(3) + ' + ' + calc.p[2].toFixed(3) +
    ' = ' + (calc.p[0] + calc.p[1] + calc.p[2]).toFixed(3) + ' atm';
  const full = 'P_{total} = P_{A} + P_{B} + P_{C} = ' + numbers;
  const medium = 'P_{A} + P_{B} + P_{C} = ' + numbers;
  const avail = canvasWidth - 2 * margin - 16;
  let str = full;
  let size = 18;
  if (richWidth(str, size) > avail) size = 16;
  if (richWidth(str, size) > avail) str = medium;
  while (richWidth(str, size) > avail && size > 10) size -= 1;
  noStroke();
  fill('black');
  textStyle(NORMAL);
  drawRich(str, canvasWidth / 2, y + h / 2, size, CENTER);
}

// ---- Pie chart of mole fractions --------------------------------------------
function pieGeometry() {
  const small = canvasWidth < 560;
  const r = small ? 44 : 66;
  return { r: r, cx: margin + r + (small ? 2 : 14), cy: 398 };
}

function drawPie(calc) {
  const g = pieGeometry();
  const small = canvasWidth < 560;
  noStroke();
  fill('black');
  textStyle(BOLD);
  drawRich(small ? 'Mole fractions' : 'Mole fractions', g.cx, 314, small ? 12 : 15, CENTER);
  textStyle(NORMAL);

  let start = -HALF_PI;
  for (let i = 0; i < GASES.length; i++) {
    const sweep = calc.x[i] * TWO_PI;
    stroke('white');
    strokeWeight(2);
    fill(GASES[i].color);
    arc(g.cx, g.cy, g.r * 2, g.r * 2, start, start + sweep, PIE);
    // sector label: letter and percent
    const mid = start + sweep / 2;
    noStroke();
    fill('white');
    textStyle(BOLD);
    if (calc.x[i] >= 0.2) {
      const lx = g.cx + cos(mid) * g.r * 0.6;
      const ly = g.cy + sin(mid) * g.r * 0.6;
      drawRich(GASES[i].key, lx, ly - (small ? 6 : 8), small ? 12 : 15, CENTER);
      textStyle(NORMAL);
      drawRich((calc.x[i] * 100).toFixed(1) + '%', lx, ly + (small ? 6 : 8), small ? 10 : 13, CENTER);
    } else {
      // narrow sector: letter only (the percent is in the table as the mole fraction)
      drawRich(GASES[i].key, g.cx + cos(mid) * g.r * 0.74, g.cy + sin(mid) * g.r * 0.74, small ? 11 : 14, CENTER);
      textStyle(NORMAL);
    }
    start += sweep;
  }
}

// ---- Table: gas, moles, mole fraction, partial pressure -----------------------
function drawTable(calc) {
  const g = pieGeometry();
  const small = canvasWidth < 560;
  const x0 = g.cx + g.r + (small ? 8 : 26);
  const x1 = canvasWidth - margin;
  const w = x1 - x0;
  const top = 302;
  const headH = 46;
  const rowH = 28;
  const fs = small ? 12 : 16;
  const headSize = small ? 11 : 14;
  const noteSize = small ? (canvasWidth < 400 ? 9 : 10) : 12;

  // column centers
  const cGas = x0 + w * 0.09;
  const cMol = x0 + w * (small ? 0.26 : 0.30);
  const cFrac = x0 + w * (small ? 0.50 : 0.56);
  const cP = x0 + w * (small ? 0.83 : 0.84);

  // table frame
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(x0, top, w, headH + rowH * 4, 8);
  // header band
  noStroke();
  fill('lavender');
  rect(x0 + 1, top + 1, w - 2, headH - 1, 7, 7, 0, 0);

  fill('black');
  textStyle(BOLD);
  drawRich('Gas', cGas, top + 14, headSize, CENTER);
  drawRich(small ? 'Moles' : 'Moles (mol)', cMol, top + 14, headSize, CENTER);
  drawRich('Mole fraction', cFrac, top + 14, headSize, CENTER);
  drawRich(small ? 'P (atm)' : 'Partial pressure (atm)', cP, top + 14, headSize, CENTER);
  textStyle(NORMAL);
  fill('dimgray');
  drawRich('n_{i}', cMol, top + 34, noteSize, CENTER);
  drawRich('χ_{i} = n_{i} ÷ n_{total}', cFrac, top + 34, noteSize, CENTER);
  drawRich('P_{i} = χ_{i} × P_{total}', cP, top + 34, noteSize, CENTER);

  for (let i = 0; i < GASES.length; i++) {
    const y = top + headH + rowH * i + rowH / 2;
    stroke('gainsboro');
    strokeWeight(1);
    line(x0 + 4, y - rowH / 2, x1 - 4, y - rowH / 2);
    noStroke();
    fill(GASES[i].color);
    circle(cGas - 14, y, 12);
    fill('black');
    textStyle(BOLD);
    drawRich(GASES[i].key, cGas + 6, y, fs, CENTER);
    textStyle(NORMAL);
    drawRich(calc.n[i].toFixed(1), cMol, y, fs, CENTER);
    drawRich(calc.x[i].toFixed(3), cFrac, y, fs, CENTER);
    drawRich(calc.p[i].toFixed(3), cP, y, fs, CENTER);
  }

  // totals row
  const yT = top + headH + rowH * 3 + rowH / 2;
  stroke('gray');
  strokeWeight(1.5);
  line(x0 + 4, yT - rowH / 2, x1 - 4, yT - rowH / 2);
  noStroke();
  fill('black');
  textStyle(BOLD);
  drawRich('Total', cGas, yT, fs, CENTER);
  drawRich(calc.nTotal.toFixed(1), cMol, yT, fs, CENTER);
  drawRich((calc.x[0] + calc.x[1] + calc.x[2]).toFixed(3), cFrac, yT, fs, CENTER);
  drawRich((calc.p[0] + calc.p[1] + calc.p[2]).toFixed(3), cP, yT, fs, CENTER);
  textStyle(NORMAL);

  // footnote
  fill('dimgray');
  const noteFs = small ? 10 : 12;
  const notes = [
    'Same flask volume and temperature. Dots drawn: 40 per atm. Values rounded to 3 decimal places.',
    'Dots drawn: 40 per atm. Values rounded to 3 decimal places.',
    'Values rounded to 3 decimal places.'
  ];
  let note = notes[2];
  for (let k = 0; k < notes.length; k++) {
    if (richWidth(notes[k], noteFs) <= w) { note = notes[k]; break; }
  }
  drawRich(note, (x0 + x1) / 2, top + headH + rowH * 4 + 12, noteFs, CENTER);
}

// ---- Controls ---------------------------------------------------------------
function controlGeometry() {
  const small = canvasWidth < 600;
  const colW = canvasWidth / 2;
  const labelW = small ? 96 : 152;
  return { small: small, colW: colW, labelW: labelW };
}

function drawControlLabels(calc) {
  const g = controlGeometry();
  noStroke();
  fill('black');
  textStyle(NORMAL);
  const fs = g.small ? 13 : 16;
  for (let i = 0; i < 3; i++) {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const label = (g.small ? '' : 'Gas ') + GASES[i].key + ': ' + calc.n[i].toFixed(1) + ' mol';
    drawRich(label, col * g.colW + 10, drawHeight + 21 + row * 36, fs, LEFT);
  }
  const pLabel = (g.small ? 'P_{total}: ' : 'Total P: ') + calc.pTotal.toFixed(2) + ' atm';
  drawRich(pLabel, g.colW + 10, drawHeight + 21 + 36, fs, LEFT);
}

function positionControls() {
  if (moleSliders.length < 3 || !pressureSlider) return;
  const g = controlGeometry();
  const sliderW = max(40, g.colW - g.labelW - 18);
  const all = [moleSliders[0], moleSliders[1], moleSliders[2], pressureSlider];
  for (let i = 0; i < all.length; i++) {
    const col = i % 2;
    const row = Math.floor(i / 2);
    all[i].position(col * g.colW + g.labelW, drawHeight + 10 + row * 36);
    all[i].size(sliderW);
  }
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
