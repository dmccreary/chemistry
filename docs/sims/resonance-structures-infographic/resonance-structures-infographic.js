// Resonance Structures Comparison MicroSim
// CANVAS_HEIGHT: 604
// AP Chemistry - Chapter 4: Chemical Bonding and Lewis Structures (Section 4.6)
// Learning objectives:
//   Understand: explain what resonance structures represent and distinguish
//               them from the resonance hybrid
//   Analyze:    identify which resonance structures contribute more to the
//               hybrid by comparing formal charges
//
// Chemistry rules encoded here:
//   - Resonance structures share one atomic skeleton; only electrons move.
//   - Formal charge FC = V - N - B/2  (V valence electrons of the free atom,
//     N nonbonding electrons, B bonding electrons). FC values must add up to
//     the charge on the species.
//   - For equivalent structures the hybrid bond order is the simple average.
// Every structure below is checked at startup (electron count and FC sum).
// No animation is used on purpose: a molecule does NOT flip between its
// resonance structures, and motion would reinforce that misconception.

// ---- Layout constants -------------------------------------------------------
let canvasWidth = 800;
let drawHeight = 524;
let controlHeight = 80;          // two rows: species menu, two checkboxes
let canvasHeight = drawHeight + controlHeight;
let margin = 12;
let defaultTextSize = 16;

// ---- Chemistry data ---------------------------------------------------------
const VALENCE = { H: 1, C: 4, N: 5, O: 6 };

// Atom coordinates are in bond-length units; +y is down the screen.
// Each structure lists bonds [atomA, atomB, order] and lone pairs per atom.
const SPECIES = [
  {
    option: 'Ozone, O₃', name: 'Ozone', formula: 'O_{3}', charge: 0, electrons: 18,
    atoms: [
      { el: 'O', x: -1, y: 0.3, tag: 'left O' },
      { el: 'O', x: 0, y: -0.3, tag: 'central O' },
      { el: 'O', x: 1, y: 0.3, tag: 'right O' }
    ],
    structures: [
      { bonds: [[0, 1, 1], [1, 2, 2]], lp: [3, 1, 2], rank: 'contributes equally' },
      { bonds: [[0, 1, 2], [1, 2, 1]], lp: [2, 1, 3], rank: 'contributes equally' }
    ],
    equivalent: true,
    width: 2, height: 0.6, fontScale: 1,
    summary: [
      '18 valence electrons. The double bond can be drawn on either side, giving two equivalent structures.',
      'Both have formal charges of −1, +1, and 0, so they contribute equally.',
      'Real ozone: both O–O bonds are identical, about 128 pm. That is between a single bond (148 pm) and a double bond (121 pm). Bond order = 1.5.'
    ]
  },
  {
    option: 'Nitrate ion, NO₃⁻', name: 'Nitrate ion', formula: 'NO_{3}^{-}', charge: -1, electrons: 24,
    atoms: [
      { el: 'N', x: 0, y: 0, tag: 'N' },
      { el: 'O', x: 0, y: -1, tag: 'top O' },
      { el: 'O', x: -0.866, y: 0.5, tag: 'left O' },
      { el: 'O', x: 0.866, y: 0.5, tag: 'right O' }
    ],
    structures: [
      { bonds: [[0, 1, 2], [0, 2, 1], [0, 3, 1]], lp: [0, 2, 3, 3], rank: 'contributes equally' },
      { bonds: [[0, 1, 1], [0, 2, 2], [0, 3, 1]], lp: [0, 3, 2, 3], rank: 'contributes equally' },
      { bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 2]], lp: [0, 3, 3, 2], rank: 'contributes equally' }
    ],
    equivalent: true,
    width: 1.732, height: 1.5, fontScale: 1,
    summary: [
      '24 valence electrons. The double bond can point to any of the three oxygens, giving three equivalent structures.',
      'Each has N at +1 and two oxygens at −1, so they contribute equally.',
      'Real nitrate: all three N–O bonds are identical. Bond order = 4/3, about 1.33, and each O carries an average charge of −2/3.'
    ]
  },
  {
    option: 'Benzene, C₆H₆', name: 'Benzene', formula: 'C_{6}H_{6}', charge: 0, electrons: 30,
    atoms: benzeneAtoms(),
    structures: [
      { bonds: benzeneBonds(0), lp: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], rank: 'contributes equally' },
      { bonds: benzeneBonds(1), lp: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], rank: 'contributes equally' }
    ],
    equivalent: true,
    ring: 6,            // atoms 0-5 form a ring: second bond lines are drawn inside it
    width: 3.0, height: 3.3, fontScale: 0.85,
    summary: [
      '30 valence electrons. The three double bonds can be drawn in two alternating patterns.',
      'Every formal charge is zero in both structures, so they contribute equally.',
      'Real benzene: all six C–C bonds are identical, about 139 pm. That is between a single bond (154 pm) and a double bond (134 pm). Bond order = 1.5.'
    ]
  },
  {
    option: 'Cyanate ion, OCN⁻', name: 'Cyanate ion', formula: 'OCN^{-}', charge: -1, electrons: 16,
    atoms: [
      { el: 'N', x: -1.15, y: 0, tag: 'N' },
      { el: 'C', x: 0, y: 0, tag: 'C' },
      { el: 'O', x: 1.15, y: 0, tag: 'O' }
    ],
    structures: [
      { bonds: [[0, 1, 3], [1, 2, 1]], lp: [1, 0, 3], rank: 'major contributor' },
      { bonds: [[0, 1, 2], [1, 2, 2]], lp: [2, 0, 2], rank: 'minor contributor' },
      { bonds: [[0, 1, 1], [1, 2, 3]], lp: [3, 0, 1], rank: 'negligible contributor' }
    ],
    equivalent: false,
    // hybrid is weighted toward structure 1: [atomA, atomB, solid lines, dashed lines]
    hybridBonds: [[0, 1, 2, 1], [1, 2, 1, 1]],
    hybridCharges: ['δ−', '', 'δ−'],
    width: 2.3, height: 0.2, fontScale: 1,
    summary: [
      '16 valence electrons. These three structures are NOT equivalent, so compare their formal charges.',
      'Structure 1: smallest charges, with −1 on O, the most electronegative atom. Major contributor.',
      'Structure 2: −1 on N. Minor. Structure 3: charges of −2 and +1. Negligible.',
      'The hybrid looks most like Structure 1.'
    ]
  }
];

function benzeneAtoms() {
  const atoms = [];
  for (let i = 0; i < 6; i++) {
    const a = (-90 + 60 * i) * Math.PI / 180;
    atoms.push({ el: 'C', x: Math.cos(a), y: Math.sin(a), tag: 'C' });
  }
  for (let i = 0; i < 6; i++) {
    const a = (-90 + 60 * i) * Math.PI / 180;
    atoms.push({ el: 'H', x: 1.65 * Math.cos(a), y: 1.65 * Math.sin(a), tag: 'H' });
  }
  return atoms;
}

// Ring bonds alternate double/single starting at ring position "offset"; plus six C-H bonds
function benzeneBonds(offset) {
  const bonds = [];
  for (let i = 0; i < 6; i++) {
    bonds.push([i, (i + 1) % 6, (i + offset) % 2 === 0 ? 2 : 1]);
  }
  for (let i = 0; i < 6; i++) {
    bonds.push([i, i + 6, 1]);
  }
  return bonds;
}

// ---- State ------------------------------------------------------------------
let speciesSelect, chargeCheckbox, hybridCheckbox;
let hits = [];          // hover targets rebuilt every frame
let pinned = null;      // item selected by a click or tap
let hoverItem = null;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  speciesSelect = createSelect();
  speciesSelect.parent(mainElement);
  for (let i = 0; i < SPECIES.length; i++) {
    speciesSelect.option(SPECIES[i].option, i);
  }
  speciesSelect.selected(0);
  speciesSelect.position(80, drawHeight + 9);
  speciesSelect.changed(clearPinned);

  chargeCheckbox = createCheckbox(' Formal charges', true);
  chargeCheckbox.parent(mainElement);
  chargeCheckbox.position(10, drawHeight + 46);

  hybridCheckbox = createCheckbox(' Hybrid and ranking', true);
  hybridCheckbox.parent(mainElement);
  hybridCheckbox.position(165, drawHeight + 46);
  hybridCheckbox.changed(clearPinned);

  verifyStructures();

  describe('Resonance structures comparison. For ozone, the nitrate ion, benzene, or the cyanate ion, every contributing Lewis structure is drawn side by side with lone pairs and formal charges, joined by double-headed resonance arrows. Below them the resonance hybrid is drawn with dashed partial bonds. Pointing at an atom shows its formal charge calculation, and pointing at a hybrid bond shows its bond order.', LABEL);
}

function clearPinned() {
  pinned = null;
}

// Check every structure: electron count and sum of formal charges
function verifyStructures() {
  for (let sp of SPECIES) {
    for (let k = 0; k < sp.structures.length; k++) {
      const st = sp.structures[k];
      let electrons = 0;
      let fcSum = 0;
      for (let i = 0; i < sp.atoms.length; i++) {
        electrons += 2 * st.lp[i];
        fcSum += formalCharge(sp, st, i);
      }
      for (let b of st.bonds) electrons += 2 * b[2];
      if (electrons !== sp.electrons || fcSum !== sp.charge) {
        console.error('Structure check failed: ' + sp.name + ' structure ' + (k + 1) +
          ' electrons ' + electrons + ' (expected ' + sp.electrons + '), formal charge sum ' + fcSum);
      }
    }
  }
}

// Number of bonding electrons on atom i (2 per bond order)
function bondingElectrons(st, i) {
  let b = 0;
  for (let bond of st.bonds) {
    if (bond[0] === i || bond[1] === i) b += 2 * bond[2];
  }
  return b;
}

// FC = V - N - B/2
function formalCharge(sp, st, i) {
  return VALENCE[sp.atoms[i].el] - 2 * st.lp[i] - bondingElectrons(st, i) / 2;
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  const sp = SPECIES[int(speciesSelect.value())];
  const showFC = chargeCheckbox.checked();
  const showHybrid = hybridCheckbox.checked();
  const small = canvasWidth < 600;

  // Title
  noStroke();
  fill('black');
  textStyle(NORMAL);
  drawRich('Resonance Structures: ' + sp.name + ', ' + sp.formula, canvasWidth / 2, 22, small ? 18 : 24, CENTER);

  drawLegend(small);

  hits = [];

  // ---- top row: the contributing structures --------------------------------
  const n = sp.structures.length;
  const rowY = 62;
  const rowH = 200;
  const arrowGap = small ? 26 : 44;
  const pw = (canvasWidth - 2 * margin - (n - 1) * arrowGap) / n;
  for (let k = 0; k < n; k++) {
    const px = margin + k * (pw + arrowGap);
    stroke('silver');
    strokeWeight(1);
    fill('white');
    rect(px, rowY, pw, rowH, 8);
    // caption
    noStroke();
    fill('black');
    textStyle(BOLD);
    drawRich('Structure ' + (k + 1), px + pw / 2, rowY + 14, small ? 13 : 15, CENTER);
    textStyle(NORMAL);
    if (showHybrid) {
      fill(sp.structures[k].rank === 'major contributor' ? 'darkgreen' : 'dimgray');
      drawRich(sp.structures[k].rank, px + pw / 2, rowY + rowH - 12, small ? 11 : 13, CENTER);
    }
    drawStructure(sp, k, px, rowY + 26, pw, rowH - 50, showFC);
    // resonance arrow to the next structure
    if (k < n - 1) {
      drawResonanceArrow(px + pw + 3, rowY + rowH / 2, arrowGap - 6);
    }
  }

  // ---- bottom row: hybrid + explanation -------------------------------------
  const botY = rowY + rowH + 10;
  const botH = 186;
  const hybW = small ? canvasWidth * 0.38 : min(300, canvasWidth * 0.36);
  stroke('steelblue');
  strokeWeight(2);
  fill('white');
  rect(margin, botY, hybW, botH, 8);
  noStroke();
  fill('navy');
  textStyle(BOLD);
  drawRich('Resonance hybrid', margin + hybW / 2, botY + 14, small ? 13 : 15, CENTER);
  textStyle(NORMAL);
  if (showHybrid) {
    fill('dimgray');
    drawRich('the one real structure', margin + hybW / 2, botY + botH - 12, small ? 11 : 13, CENTER);
    drawStructure(sp, -1, margin, botY + 26, hybW, botH - 50, showFC);
  } else {
    fill('gray');
    textStyle(BOLD);
    drawRich('?', margin + hybW / 2, botY + botH / 2 - 8, 60, CENTER);
    textStyle(NORMAL);
    fill('dimgray');
    drawRich('predict it, then check the box', margin + hybW / 2, botY + botH - 12, small ? 11 : 13, CENTER);
  }

  // hover / pinned item
  hoverItem = findHit(mouseX, mouseY);
  const active = hoverItem || pinned;
  if (active) highlight(active);

  drawInfoBox(sp, active, margin + hybW + 10, botY, canvasWidth - margin - (margin + hybW + 10), botH, showHybrid, small);

  // footer
  noStroke();
  fill('black');
  textStyle(ITALIC);
  textSize(small ? 12 : 14);
  textAlign(CENTER, TOP);
  text('The resonance hybrid is the single true structure. The individual resonance structures are bookkeeping tools, not real forms that the molecule flips between.',
    margin + 6, botY + botH + 8, canvasWidth - 2 * margin - 12, 44);
  textStyle(NORMAL);

  drawControlLabels();
}

// ---- Legend -----------------------------------------------------------------
function drawLegend(small) {
  const fs = small ? 11 : 13;
  const y = 48;
  const items = ['lone pair', 'formal charge', 'partial bond (hybrid)'];
  textStyle(NORMAL);
  textSize(fs);
  const iconW = [18, 40, 30];
  let total = 0;
  for (let i = 0; i < items.length; i++) total += iconW[i] + 4 + textWidth(items[i]) + (small ? 10 : 22);
  let x = canvasWidth / 2 - total / 2;
  for (let i = 0; i < items.length; i++) {
    if (i === 0) {
      noStroke();
      fill('crimson');
      circle(x + 5, y, 5);
      circle(x + 12, y, 5);
    } else if (i === 1) {
      noStroke();
      textStyle(BOLD);
      fill('green');
      drawRich('−1', x + 8, y, fs, CENTER);
      fill('crimson');
      drawRich('+1', x + 30, y, fs, CENTER);
      textStyle(NORMAL);
    } else {
      stroke('dodgerblue');
      strokeWeight(2.5);
      drawingContext.setLineDash([5, 4]);
      line(x, y, x + 26, y);
      drawingContext.setLineDash([]);
    }
    noStroke();
    fill('black');
    textSize(fs);
    textAlign(LEFT, CENTER);
    text(items[i], x + iconW[i] + 4, y);
    x += iconW[i] + 4 + textWidth(items[i]) + (small ? 10 : 22);
  }
}

// ---- Structure drawing --------------------------------------------------------
// k >= 0 draws contributing structure k; k === -1 draws the resonance hybrid.
function drawStructure(sp, k, px, py, pw, ph, showFC) {
  const isHybrid = k === -1;
  const st = isHybrid ? null : sp.structures[k];
  // pad = room around the atoms for lone pairs, charge labels, and ion brackets.
  // Narrow panels (phone widths) drop the brackets; the charge is still in the title.
  const compact = pw < 200;
  const showBrackets = sp.charge !== 0 && !compact;
  let pad = sp.atoms.length > 6 ? 14 : 34;
  if (showBrackets) pad += 12;
  if (isHybrid && sp.atoms.length <= 6) pad += 18;   // fraction labels are wider
  pad = min(pad, pw * 0.3);
  if (compact && sp.atoms.length <= 6) pad = 19;
  const padY = isHybrid && sp.atoms.length <= 6 ? 34 : min(pad, 30);   // less room is needed above and below
  const chargeRoom = showBrackets ? 14 : 0;          // the ion charge sits outside the right bracket
  const scale = min((pw - 2 * pad - chargeRoom) / max(sp.width, 0.5), (ph - 2 * padY) / max(sp.height, 0.5), 78);
  const fs = constrain(scale * 0.42 * sp.fontScale, 11, 20);
  const atomR = fs * 0.68;
  const cx = px + pw / 2 - chargeRoom / 2;
  const cy = py + ph / 2;

  // center the structure on the middle of its bounding box
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (let a of sp.atoms) {
    minX = min(minX, a.x); maxX = max(maxX, a.x);
    minY = min(minY, a.y); maxY = max(maxY, a.y);
  }
  const ox = cx - (minX + maxX) / 2 * scale;
  const oy = cy - (minY + maxY) / 2 * scale;
  const pos = sp.atoms.map(function (a) { return { x: ox + a.x * scale, y: oy + a.y * scale }; });

  // ---- bonds ----
  const bondList = isHybrid ? hybridBondList(sp) : st.bonds.map(function (b) { return [b[0], b[1], b[2], 0]; });
  const bondAngles = sp.atoms.map(function () { return []; });
  for (let b of bondList) {
    const p1 = pos[b[0]];
    const p2 = pos[b[1]];
    const ang = atan2(p2.y - p1.y, p2.x - p1.x);
    bondAngles[b[0]].push(ang);
    bondAngles[b[1]].push(ang + PI);
    const inRing = sp.ring && b[0] < sp.ring && b[1] < sp.ring;
    drawBond(p1, p2, ang, atomR, b[2], b[3], scale, inRing ? { x: ox, y: oy } : null);
    if (isHybrid) {
      hits.push({ type: 'hbond', a: b[0], b: b[1], x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y });
    }
  }

  // ---- atoms, lone pairs, charges ----
  for (let i = 0; i < sp.atoms.length; i++) {
    const p = pos[i];
    noStroke();
    fill('black');
    textStyle(BOLD);
    drawRich(sp.atoms[i].el, p.x, p.y, fs, CENTER);
    textStyle(NORMAL);

    let occupied = bondAngles[i].slice();
    if (!isHybrid) {
      const lpAngles = lonePairAngles(bondAngles[i], st.lp[i]);
      for (let ang of lpAngles) {
        drawLonePair(p.x, p.y, ang, atomR + 4, fs);
        occupied.push(ang);
      }
    }

    // charge label
    let label = '';
    let value = 0;
    if (isHybrid) {
      if (sp.equivalent) {
        let sum = 0;
        for (let s of sp.structures) sum += formalCharge(sp, s, i);
        value = sum / sp.structures.length;
        label = fractionLabel(sum, sp.structures.length);
      } else {
        label = sp.hybridCharges[i];
        value = label === '' ? 0 : -1;
      }
    } else {
      value = formalCharge(sp, st, i);
      label = value === 0 ? '' : (value > 0 ? '+' + value : '−' + abs(value));
    }
    if (showFC && label !== '' && label !== '0') {
      const ang = freeAngle(occupied, -PI / 4);
      const d = atomR + (isHybrid ? 13 : 17);
      noStroke();
      fill(value > 0 ? 'crimson' : 'green');
      textStyle(BOLD);
      drawRich(label, p.x + cos(ang) * d, p.y + sin(ang) * d, max(11, fs * 0.72), CENTER);
      textStyle(NORMAL);
    }
    hits.push({ type: isHybrid ? 'hatom' : 'atom', k: k, i: i, x: p.x, y: p.y, r: atomR + 5 });
  }

  // ---- brackets and overall charge for ions ----
  if (showBrackets) {
    const bx1 = ox + minX * scale - pad + 2;
    const bx2 = ox + maxX * scale + pad - 2;
    const by1 = max(py + 2, oy + minY * scale - padY - 4);
    const by2 = min(py + ph - 2, oy + maxY * scale + padY + 4);
    stroke('black');
    strokeWeight(1.5);
    noFill();
    line(bx1, by1, bx1, by2); line(bx1, by1, bx1 + 6, by1); line(bx1, by2, bx1 + 6, by2);
    line(bx2, by1, bx2, by2); line(bx2, by1, bx2 - 6, by1); line(bx2, by2, bx2 - 6, by2);
    noStroke();
    fill('black');
    const q = abs(sp.charge) === 1 ? '' : String(abs(sp.charge));
    drawRich(q + (sp.charge < 0 ? '−' : '+'), bx2 + 7, by1 + 2, 14, CENTER);
  }
}

// Hybrid bonds as [a, b, solid lines, dashed lines]
function hybridBondList(sp) {
  if (sp.hybridBonds) return sp.hybridBonds;
  const first = sp.structures[0].bonds;
  const list = [];
  for (let j = 0; j < first.length; j++) {
    let sum = 0;
    for (let s of sp.structures) sum += s.bonds[j][2];
    const avg = sum / sp.structures.length;
    const whole = Math.floor(avg + 1e-9);
    list.push([first[j][0], first[j][1], whole, avg - whole > 1e-9 ? 1 : 0]);
  }
  return list;
}

// solid = number of solid lines, dashed = number of dashed (partial bond) lines.
// ringCenter (optional): extra lines are drawn on the inside of the ring.
function drawBond(p1, p2, ang, atomR, solid, dashed, scale, ringCenter) {
  const total = solid + dashed;
  const gap = constrain(scale * 0.11, 3.5, 6);
  const sx = p1.x + cos(ang) * atomR;
  const sy = p1.y + sin(ang) * atomR;
  const ex = p2.x - cos(ang) * atomR;
  const ey = p2.y - sin(ang) * atomR;
  // unit normal; for ring bonds it points toward the ring center
  let nx = -sin(ang);
  let ny = cos(ang);
  if (ringCenter) {
    const mx = (p1.x + p2.x) / 2;
    const my = (p1.y + p2.y) / 2;
    if ((ringCenter.x - mx) * nx + (ringCenter.y - my) * ny < 0) { nx = -nx; ny = -ny; }
  }
  for (let m = 0; m < total; m++) {
    // ring bonds: first line on the ring, others stepped inward and shortened
    const off = ringCenter ? m * gap * 1.5 : (m - (total - 1) / 2) * gap;
    const shrink = ringCenter && m > 0 ? gap * 0.9 : 0;
    const x1 = sx + nx * off + cos(ang) * shrink;
    const y1 = sy + ny * off + sin(ang) * shrink;
    const x2 = ex + nx * off - cos(ang) * shrink;
    const y2 = ey + ny * off - sin(ang) * shrink;
    if (m < solid) {
      stroke('black');
      strokeWeight(2);
      line(x1, y1, x2, y2);
    } else {
      stroke('dodgerblue');
      strokeWeight(2.5);
      drawingContext.setLineDash([5, 4]);
      line(x1, y1, x2, y2);
      drawingContext.setLineDash([]);
    }
  }
}

function drawLonePair(x, y, ang, dist, fs) {
  const sep = max(3, fs * 0.2);
  const dotSize = max(3.5, fs * 0.24);
  const cx = x + cos(ang) * dist;
  const cy = y + sin(ang) * dist;
  noStroke();
  fill('crimson');
  circle(cx - sin(ang) * sep, cy + cos(ang) * sep, dotSize);
  circle(cx + sin(ang) * sep, cy - cos(ang) * sep, dotSize);
}

// Spread k lone pairs into the largest open angles around an atom
function lonePairAngles(bondAngles, k) {
  const out = [];
  if (k === 0) return out;
  if (bondAngles.length === 0) {
    for (let m = 0; m < k; m++) out.push(m * TWO_PI / k);
    return out;
  }
  const gaps = angleGaps(bondAngles);
  for (let n = 0; n < k; n++) {
    let best = gaps[0];
    for (let g of gaps) {
      if (g.size / (g.count + 1) > best.size / (best.count + 1) + 1e-9) best = g;
    }
    best.count++;
  }
  for (let g of gaps) {
    for (let m = 1; m <= g.count; m++) out.push(g.start + g.size * m / (g.count + 1));
  }
  return out;
}

function angleGaps(angles) {
  const sorted = angles.map(function (a) { return ((a % TWO_PI) + TWO_PI) % TWO_PI; }).sort(function (a, b) { return a - b; });
  const gaps = [];
  for (let i = 0; i < sorted.length; i++) {
    const next = i < sorted.length - 1 ? sorted[i + 1] : sorted[0] + TWO_PI;
    gaps.push({ start: sorted[i], size: next - sorted[i], count: 0 });
  }
  return gaps;
}

// Middle of the widest open angle; ties go to the one nearest the preferred direction
function freeAngle(occupied, preferred) {
  if (occupied.length === 0) return preferred;
  const gaps = angleGaps(occupied);
  let best = null;
  let bestScore = -Infinity;
  for (let g of gaps) {
    const mid = g.start + g.size / 2;
    let diff = abs((((mid - preferred) % TWO_PI) + TWO_PI) % TWO_PI);
    if (diff > PI) diff = TWO_PI - diff;
    const score = g.size - diff * 0.01;
    if (score > bestScore) { bestScore = score; best = mid; }
  }
  return best;
}

// Signed fraction such as -1/2, -2/3, +1, or 0
function fractionLabel(sum, n) {
  if (sum === 0) return '0';
  const sign = sum < 0 ? '−' : '+';
  let num = abs(sum);
  let den = n;
  for (let d = den; d > 1; d--) {
    if (num % d === 0 && den % d === 0) { num /= d; den /= d; }
  }
  return den === 1 ? sign + num : sign + num + '/' + den;
}

function drawResonanceArrow(x, y, w) {
  const col = 'mediumblue';
  const head = min(10, w * 0.32);
  stroke(col);
  strokeWeight(3);
  line(x + head * 0.8, y, x + w - head * 0.8, y);
  drawArrowHead(x, y, PI, col, head);
  drawArrowHead(x + w, y, 0, col, head);
}

function drawArrowHead(x, y, ang, col, size) {
  push();
  translate(x, y);
  rotate(ang);
  noStroke();
  fill(col);
  triangle(0, 0, -size, -size * 0.6, -size, size * 0.6);
  pop();
}

// ---- Hover handling -----------------------------------------------------------
function findHit(mx, my) {
  if (my > drawHeight || my < 0) return null;
  // atoms first, then hybrid bonds
  for (let h of hits) {
    if ((h.type === 'atom' || h.type === 'hatom') && dist(mx, my, h.x, h.y) <= h.r) return h;
  }
  for (let h of hits) {
    if (h.type === 'hbond' && distToSegment(mx, my, h.x1, h.y1, h.x2, h.y2) <= 8) return h;
  }
  return null;
}

function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len2 = dx * dx + dy * dy;
  let t = len2 === 0 ? 0 : ((px - x1) * dx + (py - y1) * dy) / len2;
  t = constrain(t, 0, 1);
  return dist(px, py, x1 + t * dx, y1 + t * dy);
}

// Re-find a pinned item in this frame's geometry (positions change on resize)
function resolve(item) {
  for (let h of hits) {
    if (h.type !== item.type) continue;
    if (h.type === 'hbond' && h.a === item.a && h.b === item.b) return h;
    if (h.type !== 'hbond' && h.k === item.k && h.i === item.i) return h;
  }
  return null;
}

function highlight(item) {
  const h = resolve(item);
  if (!h) return;
  noFill();
  stroke('darkorange');
  strokeWeight(3);
  if (h.type === 'hbond') {
    const ang = atan2(h.y2 - h.y1, h.x2 - h.x1);
    push();
    translate((h.x1 + h.x2) / 2, (h.y1 + h.y2) / 2);
    rotate(ang);
    rect(-dist(h.x1, h.y1, h.x2, h.y2) / 2 + 8, -9, dist(h.x1, h.y1, h.x2, h.y2) - 16, 18, 8);
    pop();
  } else {
    circle(h.x, h.y, h.r * 2 + 2);
  }
}

function mousePressed() {
  if (mouseY > drawHeight || mouseY < 0 || mouseX < 0 || mouseX > canvasWidth) return;
  pinned = findHit(mouseX, mouseY);
}

// ---- Explanation box ------------------------------------------------------------
function drawInfoBox(sp, item, x, y, w, h, showHybrid, small) {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(x, y, w, h, 8);
  const fs = small ? 11.5 : 14;
  const lh = fs + 5;
  const left = x + 10;
  const innerW = w - 20;
  let ty = y + 10;

  noStroke();
  fill('black');
  if (item && item.type === 'atom') {
    const st = sp.structures[item.k];
    const atom = sp.atoms[item.i];
    const V = VALENCE[atom.el];
    const N = 2 * st.lp[item.i];
    const B = bondingElectrons(st, item.i);
    const fc = formalCharge(sp, st, item.i);
    ty = drawHeading('Structure ' + (item.k + 1) + ': formal charge on ' + atom.tag, left, ty, innerW, fs);
    ty = drawWrapped('V = ' + V + '  valence electrons in a free ' + atom.el + ' atom', left, ty, innerW, fs, lh);
    ty = drawWrapped('N = ' + N + '  nonbonding (lone pair) electrons', left, ty, innerW, fs, lh);
    ty = drawWrapped('B = ' + B + '  bonding electrons around this atom', left, ty, innerW, fs, lh);
    ty += 4;
    textStyle(BOLD);
    fill(fc === 0 ? 'black' : (fc > 0 ? 'crimson' : 'green'));
    ty = drawWrapped('FC = V − N − B/2 = ' + V + ' − ' + N + ' − ' + (B / 2) + ' = ' + signed(fc), left, ty, innerW, fs + 1, lh + 2);
    textStyle(NORMAL);
    fill('dimgray');
    ty += 2;
    drawWrapped('The formal charges in a structure always add up to the charge on the species (' + signed(sp.charge) + ' here).', left, ty, innerW, fs, lh);
  } else if (item && item.type === 'hatom') {
    const atom = sp.atoms[item.i];
    ty = drawHeading('Hybrid: charge on ' + atom.tag, left, ty, innerW, fs);
    if (sp.equivalent) {
      const vals = sp.structures.map(function (s) { return formalCharge(sp, s, item.i); });
      let sum = 0;
      for (let v of vals) sum += v;
      ty = drawWrapped('The structures contribute equally, so average the formal charges:', left, ty, innerW, fs, lh);
      textStyle(BOLD);
      ty = drawWrapped('(' + vals.map(signed).join(' + ') + ') ÷ ' + vals.length + ' = ' + fractionLabel(sum, vals.length), left, ty + 2, innerW, fs + 1, lh + 2);
      textStyle(NORMAL);
      fill('dimgray');
      drawWrapped('The charge is spread out (delocalized) instead of sitting on one atom.', left, ty + 2, innerW, fs, lh);
    } else {
      const vals = sp.structures.map(function (s) { return formalCharge(sp, s, item.i); });
      ty = drawWrapped('Formal charge in Structures 1, 2, 3: ' + vals.map(signed).join(', '), left, ty, innerW, fs, lh);
      ty = drawWrapped('These structures are not equivalent, so this is not a simple average. Structure 1 counts the most, which puts most of the negative charge on oxygen.', left, ty + 2, innerW, fs, lh);
    }
  } else if (item && item.type === 'hbond') {
    const tagA = sp.atoms[item.a].tag;
    const tagB = sp.atoms[item.b].tag;
    const idx = bondIndex(sp, item.a, item.b);
    const orders = sp.structures.map(function (s) { return s.bonds[idx][2]; });
    let sum = 0;
    for (let v of orders) sum += v;
    ty = drawHeading('Hybrid: bond between ' + tagA + ' and ' + tagB, left, ty, innerW, fs);
    ty = drawWrapped('Bond order in each structure: ' + orders.join(', '), left, ty, innerW, fs, lh);
    if (sp.equivalent) {
      const avg = sum / orders.length;
      textStyle(BOLD);
      ty = drawWrapped('Bond order = (' + orders.join(' + ') + ') ÷ ' + orders.length + ' = ' + (Number.isInteger(avg) ? avg : avg.toFixed(2).replace(/0$/, '')), left, ty + 2, innerW, fs + 1, lh + 2);
      textStyle(NORMAL);
      fill('dimgray');
      if (Number.isInteger(avg)) {
        drawWrapped('This bond is the same in every structure, so it is an ordinary single bond.', left, ty + 2, innerW, fs, lh);
      } else {
        drawWrapped('A fractional bond order means the bond is shorter and stronger than a single bond but longer and weaker than a double bond.', left, ty + 2, innerW, fs, lh);
      }
    } else {
      ty = drawWrapped('The structures are not equivalent. Weighted toward Structure 1, this bond is ' +
        (orders[0] === 3 ? 'between a double and a triple bond.' : 'between a single and a double bond.'), left, ty + 2, innerW, fs, lh);
    }
  } else {
    const lines = showHybrid ? sp.summary : [
      sp.summary[0],
      'Only electrons move between structures. The atoms stay in the same places.',
      'Which structures matter most? What will the real bonds look like? Decide, then check the box.'
    ];
    // shrink the text a little if the summary would not fit in the box
    let sfs = fs;
    while (sfs > 10 && summaryHeight(lines, innerW, sfs) > h - 40) sfs -= 0.5;
    const slh = sfs + (sfs < fs ? 3.5 : 5);
    ty = drawHeading(showHybrid ? 'What the comparison shows' : 'Compare the structures', left, ty, innerW, min(fs, sfs + 1));
    for (let line of lines) {
      ty = drawWrapped(line, left, ty, innerW, sfs, slh) + 3;
    }
    if (ty + 2 + slh <= y + h - 4) {
      fill('dimgray');
      textStyle(ITALIC);
      drawWrapped('Point at any atom or hybrid bond to see the calculation.', left, ty + 2, innerW, sfs, slh);
      textStyle(NORMAL);
    }
  }
}

// Height the summary paragraphs need at font size fs
function summaryHeight(lines, w, fs) {
  let total = 0;
  textSize(fs);
  for (let str of lines) {
    total += countWrappedLines(str, w) * (fs + 3.5) + 3;
  }
  return total;
}

function countWrappedLines(str, w) {
  const words = str.split(' ');
  let line = '';
  let count = 0;
  for (let i = 0; i < words.length; i++) {
    const test = line === '' ? words[i] : line + ' ' + words[i];
    if (textWidth(test) > w && line !== '') {
      count++;
      line = words[i];
    } else {
      line = test;
    }
  }
  return line === '' ? count : count + 1;
}

function bondIndex(sp, a, b) {
  const bonds = sp.structures[0].bonds;
  for (let j = 0; j < bonds.length; j++) {
    if ((bonds[j][0] === a && bonds[j][1] === b) || (bonds[j][0] === b && bonds[j][1] === a)) return j;
  }
  return 0;
}

function signed(v) {
  if (v === 0) return '0';
  return (v > 0 ? '+' : '−') + abs(v);
}

function drawHeading(str, x, y, w, fs) {
  noStroke();
  fill('navy');
  textStyle(BOLD);
  const ny = drawWrapped(str, x, y, w, fs + 1, fs + 6);
  textStyle(NORMAL);
  fill('black');
  return ny + 3;
}

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

// A superscript that directly follows a subscript is stacked above it (as in NO3-).
function richWidth(str, size) {
  let w = 0;
  let prevSubW = 0;
  const segs = parseRich(str);
  for (let i = 0; i < segs.length; i++) {
    const sg = segs[i];
    textSize(sg.m === 0 ? size : size * 0.7);
    const sw = textWidth(sg.t);
    if (sg.m === 1 && i > 0 && segs[i - 1].m === -1) {
      w += max(0, sw - prevSubW);
    } else {
      w += sw;
    }
    prevSubW = sg.m === -1 ? sw : 0;
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
  let prevSubW = 0;
  noStroke();
  textAlign(LEFT, BASELINE);
  for (let i = 0; i < segs.length; i++) {
    const sg = segs[i];
    if (sg.m === 0) {
      textSize(size);
      text(sg.t, cx, baseline);
      cx += textWidth(sg.t);
      prevSubW = 0;
    } else if (sg.m === -1) {
      textSize(size * 0.7);
      text(sg.t, cx, baseline + size * 0.22);
      prevSubW = textWidth(sg.t);
      cx += prevSubW;
    } else {
      textSize(size * 0.7);
      const sw = textWidth(sg.t);
      const stacked = i > 0 && segs[i - 1].m === -1;
      const sx = stacked ? cx - prevSubW : cx;
      text(sg.t, sx, baseline - size * 0.42);
      cx = stacked ? max(cx, sx + sw) : cx + sw;
      prevSubW = 0;
    }
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
  text('Species:', 10, drawHeight + 21);
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
