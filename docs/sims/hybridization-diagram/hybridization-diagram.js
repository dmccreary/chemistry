// Hybridization Orbital Mixing MicroSim
// CANVAS_HEIGHT: 575
// AP Chemistry - Chapter 5: Molecular Geometry and Polarity (Section 5.7)
// Learning objectives (Bloom: Understand / Apply):
//   - explain how atomic orbitals combine to form hybrid orbitals
//   - connect hybridization type to geometry and bond angle
//   - determine the hybridization of a central atom from its number of
//     electron groups
//
// Chemistry model:
//   one s + one p   gives 2 sp  hybrids, linear,          180 degrees, 2 p orbitals left over
//   one s + two p   gives 3 sp2 hybrids, trigonal planar, 120 degrees, 1 p orbital left over
//   one s + three p gives 4 sp3 hybrids, tetrahedral,     109.5 degrees, no p orbitals left over
//   The number of hybrid orbitals always equals the number of atomic orbitals mixed.
//   Electron groups = atoms bonded to the central atom + lone pairs on it
//   (a double or triple bond counts as ONE group).
// In each panel a higher box means higher energy: hybrids lie between 2s and 2p.

// ---- Layout constants -------------------------------------------------------
let canvasWidth = 800;
let drawHeight = 525;
let controlHeight = 50;          // one row: practice menu
let canvasHeight = drawHeight + controlHeight;
let margin = 10;
let defaultTextSize = 16;

// ---- Chemistry data ---------------------------------------------------------
const HYBRIDS = [
  { label: 'sp', nP: 1, nHybrid: 2, leftover: 2, geometry: 'linear', angle: '180°',
    color: 'yellowgreen', textColor: 'black',
    mixed: 'one 2s + one 2p', examples: 'BeCl_{2}, C_{2}H_{2} (each carbon), CO_{2}' },
  { label: 'sp^{2}', nP: 2, nHybrid: 3, leftover: 1, geometry: 'trigonal planar', angle: '120°',
    color: 'mediumturquoise', textColor: 'black',
    mixed: 'one 2s + two 2p', examples: 'BF_{3}, C_{2}H_{4} (each carbon)' },
  { label: 'sp^{3}', nP: 3, nHybrid: 4, leftover: 0, geometry: 'tetrahedral', angle: '109.5°',
    color: 'forestgreen', textColor: 'white',
    mixed: 'one 2s + three 2p', examples: 'CH_{4}, NH_{3}, H_{2}O' }
];

// Practice molecules: bonded = atoms attached to the central atom, lone = its lone pairs
const PRACTICE = [
  { option: 'BeCl₂ (central Be)', formula: 'BeCl_{2}', atom: 'Be', bonded: 2, lone: 0, answer: 0,
    bondsText: 'two single bonds', after: 'The molecule is linear, with a 180° bond angle.' },
  { option: 'CO₂ (central C)', formula: 'CO_{2}', atom: 'C', bonded: 2, lone: 0, answer: 0,
    bondsText: 'two double bonds (each counts as one group)', after: 'The 2 leftover p orbitals on carbon form one pi bond to each oxygen.' },
  { option: 'C₂H₂ (each C)', formula: 'C_{2}H_{2}', atom: 'C', bonded: 2, lone: 0, answer: 0,
    bondsText: 'one single bond to H and one triple bond to C', after: 'The 2 leftover p orbitals on each carbon form the two pi bonds of the triple bond.' },
  { option: 'BF₃ (central B)', formula: 'BF_{3}', atom: 'B', bonded: 3, lone: 0, answer: 1,
    bondsText: 'three single bonds', after: 'The molecule is flat, with 120° bond angles. The leftover p orbital on boron is empty.' },
  { option: 'C₂H₄ (each C)', formula: 'C_{2}H_{4}', atom: 'C', bonded: 3, lone: 0, answer: 1,
    bondsText: 'two single bonds to H and one double bond to C', after: 'The leftover p orbital on each carbon forms the pi bond of the double bond.' },
  { option: 'CH₄ (central C)', formula: 'CH_{4}', atom: 'C', bonded: 4, lone: 0, answer: 2,
    bondsText: 'four single bonds', after: 'Four identical C–H bonds point to the corners of a tetrahedron, 109.5° apart.' },
  { option: 'NH₃ (central N)', formula: 'NH_{3}', atom: 'N', bonded: 3, lone: 1, answer: 2,
    bondsText: 'three single bonds', after: 'One sp^{3} orbital holds the lone pair, so the molecular shape is trigonal pyramidal (about 107°).' },
  { option: 'H₂O (central O)', formula: 'H_{2}O', atom: 'O', bonded: 2, lone: 2, answer: 2,
    bondsText: 'two single bonds', after: 'Two sp^{3} orbitals hold lone pairs, so the molecule is bent (about 104.5°).' }
];

// ---- State ------------------------------------------------------------------
let practiceSelect;
let selectedPanel = 1;       // panel highlighted in explore mode
let guess = -1;              // panel clicked in practice mode (-1 = none yet)
let panels = [];             // panel rectangles, rebuilt every frame

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  practiceSelect = createSelect();
  practiceSelect.parent(mainElement);
  practiceSelect.option('Explore (click a panel)', -1);
  for (let i = 0; i < PRACTICE.length; i++) {
    practiceSelect.option('Practice: ' + PRACTICE[i].option, i);
  }
  practiceSelect.selected(-1);
  practiceSelect.position(70, drawHeight + 13);
  practiceSelect.changed(modeChanged);

  describe('Orbital hybridization diagram with three panels for sp, sp2, and sp3. Each panel shows the 2s and 2p atomic orbitals as boxes before mixing and the hybrid orbitals plus any leftover p orbitals after mixing, with a small picture of the resulting geometry and bond angle. Clicking a panel shows its details. A practice menu asks for the hybridization of the central atom in common molecules.', LABEL);
}

function modeChanged() {
  guess = -1;
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  const small = canvasWidth < 620;
  const practiceIndex = int(practiceSelect.value());
  const practicing = practiceIndex >= 0;

  // Title
  noStroke();
  fill('black');
  textStyle(NORMAL);
  drawRich('Orbital Hybridization: sp, sp^{2}, and sp^{3}', canvasWidth / 2, 23, small ? 18 : 24, CENTER);

  // ---- three panels ----------------------------------------------------------
  const panelY = 44;
  const panelH = 312;
  const pw = (canvasWidth - 4 * margin) / 3;
  panels = [];
  for (let k = 0; k < 3; k++) {
    const px = margin + k * (pw + margin);
    panels.push({ x: px, y: panelY, w: pw, h: panelH });
    let state = 'normal';
    if (practicing) {
      if (guess === k) state = k === PRACTICE[practiceIndex].answer ? 'correct' : 'wrong';
    } else if (selectedPanel === k) {
      state = 'selected';
    }
    drawPanel(HYBRIDS[k], px, panelY, pw, panelH, state, small);
  }

  // ---- details / practice box ------------------------------------------------
  const boxY = panelY + panelH + 8;
  drawDetails(margin, boxY, canvasWidth - 2 * margin, drawHeight - boxY - 8, practicing ? PRACTICE[practiceIndex] : null, small);

  // control label
  noStroke();
  fill('black');
  textStyle(NORMAL);
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Mode:', 10, drawHeight + 25);
}

// ---- One hybridization panel ----------------------------------------------------
function drawPanel(hyb, px, py, pw, ph, state, small) {
  const hover = mouseX >= px && mouseX <= px + pw && mouseY >= py && mouseY <= py + ph;
  // background: light yellow when selected, per the specification
  let bg = 'white';
  let border = hover ? 'gray' : 'silver';
  let weight = hover ? 2 : 1;
  if (state === 'selected') { bg = 'lightyellow'; border = 'darkorange'; weight = 3; }
  if (state === 'correct') { bg = 'honeydew'; border = 'forestgreen'; weight = 4; }
  if (state === 'wrong') { bg = 'mistyrose'; border = 'crimson'; weight = 4; }
  stroke(border);
  strokeWeight(weight);
  fill(bg);
  rect(px, py, pw, ph, 8);

  const cx = px + pw / 2;
  const labelSize = small ? 11 : 13;

  // header
  noStroke();
  fill('black');
  textStyle(BOLD);
  drawRich(hyb.label + (pw < 150 ? ' Hybrids' : ' Hybridization'), cx, py + 17, small ? 13 : 17, CENTER);
  textStyle(NORMAL);

  // geometry of the four orbital slots
  const bw = constrain((pw - 26) / 4 - 5, 20, 42);
  const bh = small ? 24 : 28;
  const gapX = min(8, (pw - 16 - 4 * bw) / 3);
  const groupW = 4 * bw + 3 * gapX;
  const x0 = cx - groupW / 2;
  const slotX = function (i) { return x0 + i * (bw + gapX); };

  // ---- before mixing: 2p boxes high, 2s box low (energy) ----
  const beforeTop = py + 46;
  fill('dimgray');
  drawRich('Before mixing', cx, py + 36, labelSize, CENTER);
  const pY = beforeTop;                 // 2p level
  const sY = beforeTop + bh + 8;        // 2s level (lower energy)
  drawOrbitalBox(slotX(0), sY, bw, bh, '2s', 'lightskyblue', 'black', true, small);
  for (let i = 1; i <= 3; i++) {
    const willMix = i <= hyb.nP;
    drawOrbitalBox(slotX(i), pY, bw, bh, '2p', willMix ? 'sandybrown' : 'bisque', 'black', willMix, small);
  }

  // ---- mixing arrow ----
  const arrowTop = sY + bh + 5;
  const arrowBottom = arrowTop + 24;
  stroke('black');
  strokeWeight(2.5);
  line(cx, arrowTop, cx, arrowBottom - 7);
  noStroke();
  fill('black');
  triangle(cx, arrowBottom, cx - 6, arrowBottom - 9, cx + 6, arrowBottom - 9);
  textStyle(BOLD);
  drawRich('mix', cx - 10, (arrowTop + arrowBottom) / 2 - 1, labelSize, RIGHT);
  drawRich('s + ' + (hyb.nP === 1 ? 'p' : hyb.nP + ' p'), cx + 10, (arrowTop + arrowBottom) / 2 - 1, labelSize, LEFT);
  textStyle(NORMAL);

  // ---- after mixing: hybrids at an in-between energy, leftover p unchanged ----
  const afterLabelY = arrowBottom + 12;
  fill('dimgray');
  drawRich('After mixing', cx, afterLabelY, labelSize, CENTER);
  const afterTop = afterLabelY + 10;
  const hybY = afterTop + (bh + 8) * 0.5;     // between the 2p and 2s levels
  for (let i = 0; i < 4; i++) {
    if (i < hyb.nHybrid) {
      drawOrbitalBox(slotX(i), hybY, bw, bh, hyb.label, hyb.color, hyb.textColor, true, small);
    } else {
      drawOrbitalBox(slotX(i), afterTop, bw, bh, '2p', 'sandybrown', 'black', false, small);
    }
  }

  // ---- energy arrow at the left edge (only when there is room) ----
  if (x0 - px >= 26) {
    const ex = px + 13;
    stroke('gray');
    strokeWeight(1.5);
    line(ex, sY + bh, ex, pY + 6);
    noStroke();
    fill('gray');
    triangle(ex, pY - 2, ex - 4, pY + 7, ex + 4, pY + 7);
    fill('dimgray');
    push();
    translate(ex - 1, (sY + bh + pY) / 2 + 4);
    rotate(-HALF_PI);
    textAlign(CENTER, BOTTOM);
    textSize(12);
    text('energy', 0, -2);
    pop();
  }

  // ---- geometry picture and caption ----
  const iconTop = hybY + bh + 6;
  const iconBottom = py + ph - 26;
  const iconLen = min(small ? 28 : 36, (iconBottom - iconTop) / 2 - 2);
  drawGeometryIcon(hyb, cx, (iconTop + iconBottom) / 2 + (hyb.nHybrid === 3 ? 5 : 0), iconLen);
  noStroke();
  fill('black');
  textStyle(BOLD);
  drawRich(hyb.geometry + ', ' + hyb.angle, cx, py + ph - 13, small ? 11 : 14, CENTER);
  textStyle(NORMAL);
}

// A labeled orbital box. Orbitals that take part in mixing get a heavy outline.
function drawOrbitalBox(x, y, w, h, label, bg, fg, bold, small) {
  stroke(bold ? 'black' : 'gray');
  strokeWeight(bold ? 2 : 1);
  fill(bg);
  rect(x, y, w, h, 4);
  noStroke();
  fill(fg);
  textStyle(bold ? BOLD : NORMAL);
  let fs = small ? 11 : 14;
  while (richWidth(label, fs) > w - 4 && fs > 8) fs -= 1;
  drawRich(label, x + w / 2, y + h / 2, fs, CENTER);
  textStyle(NORMAL);
}

// Hybrid orbital lobes around a central atom
function drawGeometryIcon(hyb, cx, cy, len) {
  let dirs;
  if (hyb.nHybrid === 2) {
    dirs = [{ a: 0, s: 1 }, { a: PI, s: 1 }];
  } else if (hyb.nHybrid === 3) {
    dirs = [{ a: -HALF_PI, s: 1 }, { a: -HALF_PI + TWO_PI / 3, s: 1 }, { a: -HALF_PI - TWO_PI / 3, s: 1 }];
  } else {
    // tetrahedron drawn in perspective: one lobe up, two in the plane of the screen,
    // and a shorter fourth lobe pointing toward the viewer
    dirs = [{ a: -HALF_PI, s: 1 }, { a: radians(160), s: 0.95 }, { a: radians(20), s: 0.95 }, { a: radians(80), s: 0.62 }];
    cy -= 4;
  }
  const c = color(hyb.color);
  for (let d of dirs) {
    push();
    translate(cx, cy);
    rotate(d.a);
    stroke('black');
    strokeWeight(1);
    c.setAlpha(210);
    fill(c);
    // large front lobe and small back lobe of a hybrid orbital
    ellipse(len * d.s * 0.52, 0, len * d.s, len * 0.4);
    ellipse(-len * 0.12, 0, len * 0.24, len * 0.2);
    pop();
  }
  noStroke();
  fill('black');
  circle(cx, cy, 6);
}

// ---- Details box --------------------------------------------------------------------
function drawDetails(x, y, w, h, practice, small) {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(x, y, w, h, 8);
  const fs = small ? 12 : 15;
  const lh = fs + 6;
  const left = x + 12;
  const innerW = w - 24;
  let ty = y + 9;
  noStroke();

  if (!practice) {
    const hyb = HYBRIDS[selectedPanel];
    fill('navy');
    textStyle(BOLD);
    ty = drawWrappedRich(hyb.label + ' hybridization', left, ty, innerW, fs + 2, lh + 3);
    textStyle(NORMAL);
    fill('black');
    ty = drawWrappedRich('Orbitals mixed: ' + hyb.mixed + '.  Hybrid orbitals formed: ' + hyb.nHybrid + ' (always the same as the number mixed).', left, ty, innerW, fs, lh);
    ty = drawWrappedRich('Electron groups around the atom: ' + hyb.nHybrid + '.  Electron geometry: ' + hyb.geometry + ', bond angles ' + hyb.angle + '.', left, ty, innerW, fs, lh);
    ty = drawWrappedRich('Unhybridized p orbitals left for pi bonding: ' + hyb.leftover + '.', left, ty, innerW, fs, lh);
    ty = drawWrappedRich('Examples: ' + hyb.examples, left, ty, innerW, fs, lh);
    fill('dimgray');
    textStyle(ITALIC);
    if (ty + lh <= y + h - 2) {
      drawWrappedRich('Higher boxes mean higher energy: the hybrids lie between 2s and 2p.', left, ty, innerW, fs, lh);
    }
    textStyle(NORMAL);
    return;
  }

  // practice mode
  const groups = practice.bonded + practice.lone;
  fill('navy');
  textStyle(BOLD);
  ty = drawWrappedRich('Practice: what is the hybridization of ' + practice.atom + ' in ' + practice.formula + '?', left, ty, innerW, fs + 2, lh + 3);
  textStyle(NORMAL);
  fill('black');
  ty = drawWrappedRich(practice.atom + ' has ' + practice.bondsText + ' and ' +
    (practice.lone === 0 ? 'no lone pairs' : practice.lone + (practice.lone === 1 ? ' lone pair' : ' lone pairs')) + '.', left, ty, innerW, fs, lh);
  ty = drawWrappedRich('Electron groups = bonded atoms + lone pairs = ' + practice.bonded + ' + ' + practice.lone + ' = ' + groups + '.', left, ty, innerW, fs, lh);
  if (guess === -1) {
    fill('darkorange');
    textStyle(BOLD);
    drawWrappedRich('Which hybridization makes ' + groups + ' hybrid orbitals? Click a panel above.', left, ty + 2, innerW, fs, lh);
    textStyle(NORMAL);
  } else if (guess === practice.answer) {
    fill('darkgreen');
    textStyle(BOLD);
    ty = drawWrappedRich('Correct: ' + groups + ' electron groups need ' + groups + ' hybrid orbitals, so ' + practice.atom + ' is ' + HYBRIDS[guess].label + ' hybridized.', left, ty + 2, innerW, fs, lh);
    textStyle(NORMAL);
    fill('black');
    drawWrappedRich(practice.after, left, ty, innerW, fs, lh);
  } else {
    fill('crimson');
    textStyle(BOLD);
    drawWrappedRich('Not yet: ' + HYBRIDS[guess].label + ' makes ' + HYBRIDS[guess].nHybrid + ' hybrid orbitals, but ' + practice.atom + ' has ' + groups + ' electron groups. Try another panel.', left, ty + 2, innerW, fs, lh);
    textStyle(NORMAL);
  }
}

// ---- Mouse ------------------------------------------------------------------------------
function mousePressed() {
  for (let k = 0; k < panels.length; k++) {
    const p = panels[k];
    if (mouseX >= p.x && mouseX <= p.x + p.w && mouseY >= p.y && mouseY <= p.y + p.h) {
      if (int(practiceSelect.value()) >= 0) {
        guess = k;
      } else {
        selectedPanel = k;
      }
      return;
    }
  }
}

// ---- Rich text: "_{...}" is a subscript, "^{...}" is a superscript ----------------------
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

// Word-wrapped rich text; y is the top of the first line. Returns the y below the last line.
function drawWrappedRich(str, x, y, w, fs, lh) {
  const words = str.split(' ');
  let line = '';
  let cy = y + fs / 2 + 1;
  for (let i = 0; i < words.length; i++) {
    const test = line === '' ? words[i] : line + ' ' + words[i];
    if (richWidth(test, fs) > w && line !== '') {
      drawRich(line, x, cy, fs, LEFT);
      cy += lh;
      line = words[i];
    } else {
      line = test;
    }
  }
  if (line !== '') {
    drawRich(line, x, cy, fs, LEFT);
    cy += lh;
  }
  return cy - fs / 2 - 1;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = max(320, container.offsetWidth);
  }
}
