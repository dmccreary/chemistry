// Sigma and Pi Bond Overlap MicroSim
// CANVAS_HEIGHT: 570
// AP Chemistry - Chapter 5: Molecular Geometry and Polarity (Section 5.8)
// Learning objectives (Bloom: Understand / Analyze):
//   - distinguish sigma and pi bonds by their orbital overlap patterns
//   - explain why pi bonds restrict rotation
//   - count sigma and pi bonds in single, double, and triple bonds
//
// Chemistry model:
//   sigma bond: end-on overlap along the internuclear axis. The electron density
//               is a circle when viewed down the axis, so twisting one atom does
//               not change the overlap: rotation is free.
//   pi bond:    side-by-side overlap of two parallel p orbitals, above and below
//               the axis, with a node on the axis. If one p orbital is twisted by
//               an angle theta about the axis, the overlap falls as cos(theta) and
//               is zero at 90 degrees: rotating means breaking the pi bond.
//   single = 1 sigma;  double = 1 sigma + 1 pi;  triple = 1 sigma + 2 pi
// The twist is controlled by a slider (no free-running animation).

// ---- Layout constants -------------------------------------------------------
let canvasWidth = 800;
let drawHeight = 490;
let controlHeight = 80;          // two rows: twist slider, bond type menu
let canvasHeight = drawHeight + controlHeight;
let margin = 10;
let sliderLeftMargin = 170;      // room for "Twist angle: 90 degrees"
let defaultTextSize = 16;

const BONDS = [
  { option: 'Single bond (C–C in ethane)', name: 'Single bond', sigma: 1, pi: 0, example: 'ethane, C_{2}H_{6}' },
  { option: 'Double bond (C=C in ethene)', name: 'Double bond', sigma: 1, pi: 1, example: 'ethene, C_{2}H_{4}' },
  { option: 'Triple bond (C≡C in ethyne)', name: 'Triple bond', sigma: 1, pi: 2, example: 'ethyne, C_{2}H_{2}' }
];

// ---- State ------------------------------------------------------------------
let twistSlider, bondSelect;
let cards = [];                  // clickable bond cards, rebuilt every frame

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  twistSlider = createSlider(0, 90, 0, 1);
  twistSlider.parent(mainElement);
  twistSlider.position(sliderLeftMargin, drawHeight + 8);
  twistSlider.size(canvasWidth - sliderLeftMargin - 20);
  twistSlider.attribute('aria-label', 'Twist angle of atom 2 about the internuclear axis, in degrees');

  bondSelect = createSelect();
  bondSelect.parent(mainElement);
  for (let i = 0; i < BONDS.length; i++) {
    bondSelect.option(BONDS[i].option, i);
  }
  bondSelect.selected(1);
  bondSelect.position(95, drawHeight + 45);
  bondSelect.changed(bondChanged);

  describe('Side-by-side comparison of a sigma bond and a pi bond. The sigma panel shows two orbital lobes overlapping end-on along the internuclear axis, and a circular cross-section. The pi panel shows two p orbitals overlapping side by side above and below the axis, and a two-lobed cross-section. A twist slider rotates one atom: the sigma overlap is unchanged while the pi overlap falls to zero at 90 degrees. Cards at the bottom count the sigma and pi bonds in single, double, and triple bonds.', LABEL);
}

// The twist test is shown for single and double bonds. A triple bond is linear,
// so the slider is switched off and reset for it.
function bondChanged() {
  if (int(bondSelect.value()) === 2) {
    twistSlider.value(0);
    twistSlider.attribute('disabled', '');
  } else {
    twistSlider.removeAttribute('disabled');
  }
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  const small = canvasWidth < 640;
  const bondIndex = int(bondSelect.value());
  const bond = BONDS[bondIndex];
  const twistDeg = twistSlider.value();
  const theta = radians(twistDeg);

  // Title
  noStroke();
  fill('black');
  textStyle(NORMAL);
  drawRich('Sigma and Pi Bond Overlap', canvasWidth / 2, 23, small ? 20 : 24, CENTER);

  // ---- two panels --------------------------------------------------------------
  const panelY = 44;
  const panelH = 356;
  const pw = (canvasWidth - 3 * margin) / 2;
  drawSigmaPanel(margin, panelY, pw, panelH, theta, twistDeg, small);
  drawPiPanel(2 * margin + pw, panelY, pw, panelH, theta, twistDeg, bond, small);

  // ---- bond cards ----------------------------------------------------------------
  drawCards(margin, panelY + panelH + 8, canvasWidth - 2 * margin, drawHeight - (panelY + panelH + 8) - 8, bondIndex, small);

  // ---- control labels --------------------------------------------------------------
  noStroke();
  fill(bondIndex === 2 ? 'gray' : 'black');
  textStyle(NORMAL);
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Twist angle: ' + twistDeg + '°', 10, drawHeight + 19);
  fill('black');
  text('Bond type:', 10, drawHeight + 57);
}

// ---- Colors -----------------------------------------------------------------------
function atomColor(which, alpha) {
  const c = color(which === 1 ? 'dodgerblue' : 'tomato');
  c.setAlpha(alpha);
  return c;
}

function overlapColor(alpha) {
  const c = color('darkorchid');
  c.setAlpha(alpha);
  return c;
}

// ---- Ellipse helpers ----------------------------------------------------------------
// e = { x, y, w, h, rot }
function drawLobe(e, which, alpha) {
  push();
  translate(e.x, e.y);
  rotate(e.rot || 0);
  stroke(which === 0 ? 'gray' : (which === 1 ? 'royalblue' : 'firebrick'));
  strokeWeight(1.5);
  fill(which === 0 ? color(190, 190, 190, alpha) : atomColor(which, alpha));
  ellipse(0, 0, e.w, e.h);
  pop();
}

// Fill the region shared by two ellipses with the overlap color
function drawOverlap(e1, e2, alpha) {
  if (alpha <= 0) return;
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.ellipse(e1.x, e1.y, e1.w / 2, e1.h / 2, e1.rot || 0, 0, TWO_PI);
  drawingContext.clip();
  push();
  translate(e2.x, e2.y);
  rotate(e2.rot || 0);
  noStroke();
  fill(overlapColor(alpha));
  ellipse(0, 0, e2.w, e2.h);
  pop();
  drawingContext.restore();
}

function drawNucleus(x, y, u) {
  stroke('black');
  strokeWeight(1);
  fill('dimgray');
  circle(x, y, max(7, 9 * u));
}

function drawAxis(x1, x2, y) {
  stroke('gray');
  strokeWeight(1);
  drawingContext.setLineDash([5, 4]);
  line(x1, y, x2, y);
  drawingContext.setLineDash([]);
}

// Curved "twist" marker around the axis, to the right of atom 2
function drawTwistMarker(x, y, u, twistDeg, labelAbove) {
  noFill();
  stroke('darkorange');
  strokeWeight(2);
  arc(x, y, 14 * u, 40 * u, -HALF_PI * 0.85, HALF_PI * 0.85);
  noStroke();
  fill('darkorange');
  const ax = x + 7 * u * cos(-HALF_PI * 0.85);
  const ay = y + 20 * u * sin(-HALF_PI * 0.85);
  triangle(ax - 7, ay - 1, ax + 3, ay - 6, ax + 2, ay + 5);
  textStyle(BOLD);
  if (labelAbove) {
    drawRich(twistDeg + '°', x + 2, y - 20 * u - 10, max(11, 12 * u), CENTER);
  } else {
    drawRich(twistDeg + '°', x + 9 * u + 4, y - 22 * u, max(11, 12 * u), LEFT);
  }
  textStyle(NORMAL);
}

function panelFrame(px, py, pw, ph, title, small) {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(px, py, pw, ph, 8);
  noStroke();
  fill('black');
  textStyle(BOLD);
  drawRich(title, px + pw / 2, py + 17, small ? 13 : 17, CENTER);
  textStyle(NORMAL);
}

// Positions of the two views inside a panel: side by side when wide, stacked when narrow.
// sideHalf and endHalf are the half-heights (in units of u) each view needs, labels included.
function viewLayout(px, py, pw, sideHalf, endHalf) {
  if (pw >= 330) {
    const u = min(1.4, pw / 300);
    return { u: u, sideX: px + pw * 0.38, sideY: py + 138, endX: px + pw * 0.87, endY: py + 138,
      textY: py + 244, stacked: false };
  }
  const u = constrain(pw / 215, 0.66, 1);
  const sideY = py + 34 + sideHalf * u;
  const endY = sideY + sideHalf * u + 22 + endHalf * u;
  return { u: u, sideX: px + pw / 2 - 10 * u, sideY: sideY, endX: px + pw / 2, endY: endY,
    textY: endY + endHalf * u + 8, stacked: true };
}

function viewLabel(str, v, px, py, x, y, size) {
  noStroke();
  fill('dimgray');
  textStyle(ITALIC);
  drawRich(str, x, y, size, CENTER);
  textStyle(NORMAL);
}

// ---- Sigma panel -----------------------------------------------------------------------
function drawSigmaPanel(px, py, pw, ph, theta, twistDeg, small) {
  panelFrame(px, py, pw, ph, pw >= 330 ? 'Sigma bond (σ): end-on overlap' : 'Sigma bond (σ)', small);
  const v = viewLayout(px, py, pw, 34, 30);
  const u = v.u;
  const labelSize = small ? 11 : 13;

  // side view
  const cx = v.sideX;
  const cy = v.sideY;
  const x1 = cx - 62 * u;
  const x2 = cx + 62 * u;
  drawAxis(x1 - (v.stacked ? 22 : 34) * u, x2 + (v.stacked ? 22 : 34) * u, cy);
  const lobe1 = { x: x1 + 41 * u, y: cy, w: 82 * u, h: 46 * u };
  const lobe2 = { x: x2 - 41 * u, y: cy, w: 82 * u, h: 46 * u };
  // small back lobes
  drawLobe({ x: x1 - 10 * u, y: cy, w: 20 * u, h: 16 * u }, 1, 150);
  drawLobe({ x: x2 + 10 * u, y: cy, w: 20 * u, h: 16 * u }, 2, 150);
  drawLobe(lobe1, 1, 150);
  drawLobe(lobe2, 2, 150);
  drawOverlap(lobe1, lobe2, 235);
  drawNucleus(x1, cy, u);
  drawNucleus(x2, cy, u);
  drawTwistMarker(x2 + 30 * u, cy, u, twistDeg, v.stacked);
  noStroke();
  if (!v.stacked) {
    fill('royalblue');
    drawRich('atom 1', x1, cy + 38 * u, labelSize, CENTER);
    fill('firebrick');
    drawRich('atom 2', x2, cy + 38 * u, labelSize, CENTER);
    fill('darkorchid');
    textStyle(BOLD);
    drawRich('end-on overlap', cx, cy - 38 * u, labelSize, CENTER);
    textStyle(NORMAL);
    fill('dimgray');
    drawRich('internuclear axis', cx, cy + 58 * u, labelSize, CENTER);
    viewLabel('side view', v, px, py, cx, py + 46, labelSize);
  }

  // end view: a circle of density around the axis; the orange tick shows atom 2 turning
  const ex = v.endX;
  const ey = v.endY;
  const r = 28 * u;
  viewLabel(v.stacked ? 'looking along the axis' : 'along the axis', v, px, py, ex, v.stacked ? ey - r - 11 : py + 46, labelSize);
  stroke('rebeccapurple');
  strokeWeight(1.5);
  fill(overlapColor(110));
  circle(ex, ey, 2 * r);
  fill(overlapColor(170));
  noStroke();
  circle(ex, ey, 1.25 * r);
  stroke('darkorange');
  strokeWeight(3);
  line(ex + cos(theta - HALF_PI) * r * 0.78, ey + sin(theta - HALF_PI) * r * 0.78,
    ex + cos(theta - HALF_PI) * r * 1.14, ey + sin(theta - HALF_PI) * r * 1.14);
  drawNucleus(ex, ey, u);

  // text
  const tx = px + 10;
  const tw = pw - 20;
  let ty = v.textY;
  const fs = small ? 11.5 : 14.5;
  const lh = fs + 5;
  noStroke();
  fill('black');
  ty = drawWrapped(v.stacked ? 'All single bonds, and the first bond of double and triple bonds.'
    : 'Every single bond is a sigma bond. So is the first bond of a double or triple bond.', tx, ty, tw, fs, lh) + 3;
  fill('darkgreen');
  textStyle(BOLD);
  ty = drawWrapped('Overlap at ' + twistDeg + '° twist: 100%', tx, ty, tw, fs, lh);
  textStyle(NORMAL);
  fill('black');
  drawWrapped(v.stacked ? 'A circle around the axis: rotation is free.'
    : 'The density is a circle around the axis, so twisting changes nothing. Rotation is free.', tx, ty, tw, fs, lh);
}

// ---- Pi panel ---------------------------------------------------------------------------
function drawPiPanel(px, py, pw, ph, theta, twistDeg, bond, small) {
  panelFrame(px, py, pw, ph, pw >= 330 ? 'Pi bond (π): side-by-side overlap' : 'Pi bond (π)', small);
  const v = viewLayout(px, py, pw, 62, 34);
  const u = v.u;
  const labelSize = small ? 11 : 13;
  const present = bond.pi > 0;
  const alpha = present ? 150 : 70;
  const c = cos(theta);

  // side view: p orbitals on two nuclei that are closer together than in the sigma picture
  const cx = v.sideX;
  const cy = v.sideY;
  const x1 = cx - 20 * u;
  const x2 = cx + 20 * u;
  const lobeW = 54 * u;
  const lobeH = 58 * u;
  const off = 33 * u;
  drawAxis(x1 - 58 * u, x2 + 58 * u, cy);

  // second pi bond of a triple bond: p orbitals pointing toward and away from the viewer
  if (bond.pi === 2) {
    const front1 = { x: x1, y: cy, w: 36 * u, h: 36 * u };
    const front2 = { x: x2, y: cy, w: 36 * u, h: 36 * u };
    drawLobe(front1, 1, 90);
    drawLobe(front2, 2, 90);
    drawOverlap(front1, front2, 200);
  }

  // atom 1: p orbital straight up and down
  const up1 = { x: x1, y: cy - off, w: lobeW, h: lobeH };
  const dn1 = { x: x1, y: cy + off, w: lobeW, h: lobeH };
  // atom 2: p orbital twisted about the axis by theta, drawn as seen from the side
  const h2 = sqrt(sq(lobeH * c) + sq(lobeW * 0.75 * sin(theta)));
  const up2 = { x: x2, y: cy - off * c, w: lobeW, h: h2 };
  const dn2 = { x: x2, y: cy + off * c, w: lobeW, h: h2 };
  drawLobe(up1, present ? 1 : 0, alpha);
  drawLobe(dn1, present ? 1 : 0, alpha);
  drawLobe(up2, present ? 2 : 0, alpha);
  drawLobe(dn2, present ? 2 : 0, alpha);
  if (present) {
    // the purple fades as the real overlap, cos(theta), falls
    drawOverlap(up1, up2, 235 * c);
    drawOverlap(dn1, dn2, 235 * c);
  }
  drawNucleus(x1, cy, u);
  drawNucleus(x2, cy, u);
  if (bond.pi === 1) drawTwistMarker(x2 + 40 * u, cy, u, twistDeg, v.stacked);
  noStroke();
  if (!v.stacked) {
    viewLabel('side view', v, px, py, px + 44, py + 46, labelSize);
    if (present) {
      fill('darkorchid');
      textStyle(BOLD);
      const note = c > 0.02 ? 'side-by-side' : 'no overlap';
      drawRich(note, x1 - lobeW / 2 - 8, cy - off, labelSize, RIGHT);
      if (c > 0.02) drawRich('overlap', x1 - lobeW / 2 - 8, cy - off + labelSize + 3, labelSize, RIGHT);
      textStyle(NORMAL);
    }
    fill('dimgray');
    drawRich('node on', x1 - lobeW / 2 - 8, cy + off - 2, labelSize, RIGHT);
    drawRich('the axis', x1 - lobeW / 2 - 8, cy + off + labelSize + 1, labelSize, RIGHT);
  }

  // end view: two lobes with a node at the axis (four lobes for a triple bond)
  const ex = v.endX;
  const ey = v.endY;
  const ew = 26 * u;
  const eh = 34 * u;
  const eo = 19 * u;
  viewLabel(v.stacked ? 'looking along the axis' : 'along the axis', v, px, py, ex, v.stacked ? ey - 34 * u - 11 : py + 46, labelSize);
  const angles = bond.pi === 2 ? [0, HALF_PI] : [0];
  for (let a of angles) {
    for (let sgn of [-1, 1]) {
      // atom 1 lobe (fixed) and atom 2 lobe (twisted by theta) for this p orbital
      const e1 = { x: ex + sgn * eo * sin(a), y: ey - sgn * eo * cos(a), w: ew, h: eh, rot: a };
      const e2 = { x: ex + sgn * eo * sin(a + theta), y: ey - sgn * eo * cos(a + theta), w: ew, h: eh, rot: a + theta };
      drawLobe(e1, present ? 1 : 0, alpha);
      drawLobe(e2, present ? 2 : 0, alpha);
      if (present) drawOverlap(e1, e2, 235 * c);
    }
  }
  drawNucleus(ex, ey, u);

  // text
  const tx = px + 10;
  const tw = pw - 20;
  let ty = v.textY;
  const fs = small ? 11.5 : 14.5;
  const lh = fs + 5;
  noStroke();
  fill('black');
  ty = drawWrapped(v.stacked ? 'Second bond of a double bond; second and third of a triple bond.'
    : 'The second bond of a double bond, and the second and third bonds of a triple bond.', tx, ty, tw, fs, lh) + 3;
  textStyle(BOLD);
  if (bond.pi === 0) {
    fill('dimgray');
    ty = drawWrapped('A single bond has no pi bond (shown in gray).', tx, ty, tw, fs, lh);
    textStyle(NORMAL);
    fill('black');
    drawWrapped(v.stacked ? 'The two ends rotate freely.' : 'With only a sigma bond, the two ends are free to rotate.', tx, ty, tw, fs, lh);
  } else if (bond.pi === 2) {
    fill('darkgreen');
    ty = drawWrapped('Two pi bonds at right angles to each other.', tx, ty, tw, fs, lh);
    textStyle(NORMAL);
    fill('black');
    drawWrapped(v.stacked ? 'Use the double bond for the twist test.'
      : 'One is above and below the axis; the other is in front of and behind it. Use the double bond for the twist test.', tx, ty, tw, fs, lh);
  } else {
    const pct = Math.round(100 * c);
    fill(pct > 60 ? 'darkgreen' : (pct > 0 ? 'chocolate' : 'crimson'));
    ty = drawWrapped('Overlap at ' + twistDeg + '° twist: ' + pct + '%' + (pct === 0 ? ' (pi bond broken)' : ''), tx, ty, tw, fs, lh);
    textStyle(NORMAL);
    fill('black');
    drawWrapped(v.stacked ? 'Rotation would break the pi bond, so it is blocked.'
      : 'Twisting pulls the p orbitals out of line. Rotation would break the pi bond, so it is blocked.', tx, ty, tw, fs, lh);
  }
  textStyle(NORMAL);
}

// ---- Bond cards ------------------------------------------------------------------------------
function drawCards(x, y, w, h, bondIndex, small) {
  const gap = 8;
  const cw = (w - 2 * gap) / 3;
  cards = [];
  for (let k = 0; k < 3; k++) {
    const cx = x + k * (cw + gap);
    cards.push({ x: cx, y: y, w: cw, h: h, k: k });
    const selected = k === bondIndex;
    const hover = mouseX >= cx && mouseX <= cx + cw && mouseY >= y && mouseY <= y + h;
    stroke(selected ? 'darkorange' : (hover ? 'gray' : 'silver'));
    strokeWeight(selected ? 3 : 1);
    fill(selected ? 'lightyellow' : 'white');
    rect(cx, y, cw, h, 8);

    // little picture: two atoms joined by 1, 2, or 3 lines
    const lineX1 = cx + (small ? 11 : 14);
    const lineX2 = cx + (small ? 34 : 58);
    const midY = y + h / 2;
    stroke('black');
    strokeWeight(2.5);
    for (let m = 0; m <= k; m++) {
      const offY = (m - k / 2) * 6;
      line(lineX1, midY + offY, lineX2, midY + offY);
    }
    noStroke();
    fill('black');
    circle(lineX1, midY, 9);
    circle(lineX2, midY, 9);

    // text
    const tx = lineX2 + (small ? 9 : 14);
    const b = BONDS[k];
    textStyle(BOLD);
    drawRich(small ? b.name.replace(' bond', '') : b.name, tx, y + h * 0.28, small ? 12 : 15, LEFT);
    const sigmaText = '1 σ';
    const piText = b.pi === 0 ? '' : ' + ' + b.pi + ' π';
    const fs = small ? 14 : 18;
    fill('rebeccapurple');
    drawRich(sigmaText + piText, tx, y + h * 0.68, fs, LEFT);
    textStyle(NORMAL);
    if (!small) {
      fill('dimgray');
      drawRich(b.example, cx + cw - 10, y + h * 0.68, 13, RIGHT);
    }
  }
}

// ---- Mouse ---------------------------------------------------------------------------------------
function mousePressed() {
  for (let cd of cards) {
    if (mouseX >= cd.x && mouseX <= cd.x + cd.w && mouseY >= cd.y && mouseY <= cd.y + cd.h) {
      bondSelect.selected(cd.k);
      bondChanged();
      return;
    }
  }
}

// ---- Text helpers ----------------------------------------------------------------------------------
// Word-wrapped plain text; returns the y below the last line
function drawWrapped(str, x, y, w, fs, lh) {
  noStroke();
  textSize(fs);
  textAlign(LEFT, TOP);
  const words = str.split(' ');
  let line = '';
  for (let i = 0; i < words.length; i++) {
    const test = line === '' ? words[i] : line + ' ' + words[i];
    if (textWidth(test) > w && line !== '') {
      text(line, x, y);
      y += lh;
      line = words[i];
    } else {
      line = test;
    }
  }
  if (line !== '') {
    text(line, x, y);
    y += lh;
  }
  return y;
}

// Rich text: "_{...}" is a subscript, "^{...}" is a superscript
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
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = max(320, container.offsetWidth);
    if (typeof twistSlider !== 'undefined' && twistSlider) {
      twistSlider.size(canvasWidth - sliderLeftMargin - 20);
    }
  }
}
