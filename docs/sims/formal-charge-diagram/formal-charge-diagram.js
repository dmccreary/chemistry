// Formal Charge Calculator MicroSim
// CANVAS_HEIGHT: 540
// AP Chemistry - Chapter 4: Chemical Bonding and Lewis Structures (Section 4.7)
// Learning objectives:
//   Apply:    calculate the formal charge on each atom of a Lewis structure
//             using FC = V - N - B/2
//   Evaluate: use formal charges to judge which Lewis structure best
//             represents a molecule or ion
//
// Formal charge model:
//   V = valence electrons of the free atom (its main-group number)
//   N = nonbonding (lone pair) electrons on the atom in the structure
//   B = bonding electrons around the atom (2 per single bond, 4 per double, 6 per triple)
//   FC = V - N - B/2, and the formal charges add up to the charge on the species.
// Every structure below is checked at startup (electron count and FC sum).

// ---- Layout constants -------------------------------------------------------
let canvasWidth = 800;
let drawHeight = 460;
let controlHeight = 80;          // two rows: structure menu; atom buttons + checkbox
let canvasHeight = drawHeight + controlHeight;
let margin = 12;
let defaultTextSize = 16;

// ---- Chemistry data ---------------------------------------------------------
const ELEMENTS = {
  H: { valence: 1, group: 'Group 1' },
  C: { valence: 4, group: 'Group 14' },
  N: { valence: 5, group: 'Group 15' },
  O: { valence: 6, group: 'Group 16' },
  S: { valence: 6, group: 'Group 16' }
};

// Atom coordinates are in bond-length units; +y is down the screen.
// bonds: [atomA, atomB, order]; lp: lone pairs on each atom.
const STRUCTURES = [
  {
    option: 'Ammonia, NH₃', formula: 'NH_{3}', charge: 0, electrons: 8,
    atoms: [
      { el: 'N', x: 0, y: 0 }, { el: 'H', x: -1, y: 0 }, { el: 'H', x: 1, y: 0 }, { el: 'H', x: 0, y: 1 }
    ],
    bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], lp: [1, 0, 0, 0],
    note: 'Every formal charge is zero, the sign of a good Lewis structure.'
  },
  {
    option: 'Ammonium ion, NH₄⁺', formula: 'NH_{4}^{+}', charge: 1, electrons: 8,
    atoms: [
      { el: 'N', x: 0, y: 0 }, { el: 'H', x: -1, y: 0 }, { el: 'H', x: 1, y: 0 }, { el: 'H', x: 0, y: -1 }, { el: 'H', x: 0, y: 1 }
    ],
    bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], lp: [0, 0, 0, 0, 0],
    note: 'The +1 on nitrogen accounts for the +1 charge of the ion.'
  },
  {
    option: 'Carbon dioxide, CO₂ (two double bonds)', formula: 'CO_{2}', charge: 0, electrons: 16,
    atoms: [
      { el: 'C', x: 0, y: 0 }, { el: 'O', x: -1.25, y: 0 }, { el: 'O', x: 1.25, y: 0 }
    ],
    bonds: [[0, 1, 2], [0, 2, 2]], lp: [0, 2, 2],
    note: 'All zeros. This is the best structure for CO_{2}. Compare it with the triple-bond version.'
  },
  {
    option: 'Carbon dioxide, CO₂ (triple + single bond)', formula: 'CO_{2}', charge: 0, electrons: 16,
    atoms: [
      { el: 'C', x: 0, y: 0 }, { el: 'O', x: -1.25, y: 0 }, { el: 'O', x: 1.25, y: 0 }
    ],
    bonds: [[0, 1, 3], [0, 2, 1]], lp: [0, 1, 3],
    note: 'Octets are complete, but the charges are +1 and −1, with +1 on oxygen. The two-double-bond structure (all zeros) is better.'
  },
  {
    option: 'Carbon monoxide, CO', formula: 'CO', charge: 0, electrons: 10,
    atoms: [
      { el: 'C', x: -0.65, y: 0 }, { el: 'O', x: 0.65, y: 0 }
    ],
    bonds: [[0, 1, 3]], lp: [1, 1],
    note: 'Carbon is −1 and oxygen is +1. It looks odd, but only the triple bond gives both atoms an octet.'
  },
  {
    option: 'Ozone, O₃', formula: 'O_{3}', charge: 0, electrons: 18,
    atoms: [
      { el: 'O', x: 0, y: -0.3 }, { el: 'O', x: -1.05, y: 0.35 }, { el: 'O', x: 1.05, y: 0.35 }
    ],
    bonds: [[0, 1, 1], [0, 2, 2]], lp: [1, 3, 2],
    note: 'Nonzero charges cannot be avoided here. The mirror-image structure is just as good, so ozone has resonance.'
  },
  {
    option: 'Sulfate ion, SO₄²⁻ (four single bonds)', formula: 'SO_{4}^{2−}', charge: -2, electrons: 32,
    atoms: [
      { el: 'S', x: 0, y: 0 }, { el: 'O', x: 0, y: -1.2 }, { el: 'O', x: 1.2, y: 0 }, { el: 'O', x: 0, y: 1.2 }, { el: 'O', x: -1.2, y: 0 }
    ],
    bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], lp: [0, 3, 3, 3, 3],
    note: 'Every atom has an octet, but sulfur is +2 and each oxygen is −1. Compare with the two-double-bond structure.'
  },
  {
    option: 'Sulfate ion, SO₄²⁻ (two double bonds)', formula: 'SO_{4}^{2−}', charge: -2, electrons: 32,
    atoms: [
      { el: 'S', x: 0, y: 0 }, { el: 'O', x: 0, y: -1.2 }, { el: 'O', x: 1.2, y: 0 }, { el: 'O', x: 0, y: 1.2 }, { el: 'O', x: -1.2, y: 0 }
    ],
    bonds: [[0, 1, 2], [0, 2, 1], [0, 3, 2], [0, 4, 1]], lp: [0, 2, 3, 2, 3],
    note: 'Sulfur expands its octet to 12 electrons, and the formal charges are smaller (S is 0). The AP exam accepts either sulfate structure.'
  }
];

// ---- State ------------------------------------------------------------------
let structureSelect, prevButton, nextButton, showAllCheckbox;
let selectedAtom = 0;
let visited = [];        // visited[s][i] is true once atom i of structure s has been worked
let atomPos = [];        // pixel positions of the atoms, rebuilt every frame
let atomRadius = 20;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  for (let s = 0; s < STRUCTURES.length; s++) {
    visited.push(STRUCTURES[s].atoms.map(function () { return false; }));
    visited[s][0] = true;      // the central atom is worked first
  }

  structureSelect = createSelect();
  structureSelect.parent(mainElement);
  for (let i = 0; i < STRUCTURES.length; i++) {
    structureSelect.option(STRUCTURES[i].option, i);
  }
  structureSelect.selected(0);
  structureSelect.position(90, drawHeight + 9);
  structureSelect.changed(structureChanged);

  prevButton = createButton('Previous Atom');
  prevButton.parent(mainElement);
  prevButton.position(10, drawHeight + 44);
  prevButton.mousePressed(previousAtom);

  nextButton = createButton('Next Atom');
  nextButton.parent(mainElement);
  nextButton.position(122, drawHeight + 44);
  nextButton.mousePressed(nextAtom);

  showAllCheckbox = createCheckbox(' Show all charges', false);
  showAllCheckbox.parent(mainElement);
  showAllCheckbox.position(212, drawHeight + 46);

  verifyStructures();

  describe('Formal charge calculator. A Lewis structure is drawn on the left with atoms as circles, bonds as lines, and lone pairs as dots. Selecting an atom highlights its lone pairs and bonds and shows three boxes on the right with V, the valence electrons; N, the nonbonding electrons; and B, the bonding electrons, followed by the equation FC equals V minus N minus B over 2 with the numbers substituted and the resulting formal charge. A strip at the bottom lists the formal charge of every atom and checks that they add up to the charge on the species.', LABEL);
}

function current() {
  return STRUCTURES[int(structureSelect.value())];
}

function structureChanged() {
  selectedAtom = 0;
}

function nextAtom() {
  const st = current();
  selectedAtom = (selectedAtom + 1) % st.atoms.length;
  visited[int(structureSelect.value())][selectedAtom] = true;
}

function previousAtom() {
  const st = current();
  selectedAtom = (selectedAtom + st.atoms.length - 1) % st.atoms.length;
  visited[int(structureSelect.value())][selectedAtom] = true;
}

// ---- Chemistry helpers --------------------------------------------------------
function bondingElectrons(st, i) {
  let b = 0;
  for (let bond of st.bonds) {
    if (bond[0] === i || bond[1] === i) b += 2 * bond[2];
  }
  return b;
}

// FC = V - N - B/2
function formalCharge(st, i) {
  return ELEMENTS[st.atoms[i].el].valence - 2 * st.lp[i] - bondingElectrons(st, i) / 2;
}

function verifyStructures() {
  for (let st of STRUCTURES) {
    let electrons = 0;
    let sum = 0;
    for (let i = 0; i < st.atoms.length; i++) {
      electrons += 2 * st.lp[i];
      sum += formalCharge(st, i);
    }
    for (let b of st.bonds) electrons += 2 * b[2];
    if (electrons !== st.electrons || sum !== st.charge) {
      console.error('Structure check failed: ' + st.option + ' electrons ' + electrons +
        ' (expected ' + st.electrons + '), formal charge sum ' + sum);
    }
  }
}

function signed(v) {
  if (v === 0) return '0';
  return (v > 0 ? '+' : '−') + abs(v);
}

// Words such as "1 double bond + 2 single bonds" for the bonds around atom i
function bondDescription(st, i) {
  const counts = [0, 0, 0, 0];
  for (let bond of st.bonds) {
    if (bond[0] === i || bond[1] === i) counts[bond[2]]++;
  }
  const names = ['', 'single', 'double', 'triple'];
  const parts = [];
  for (let order = 3; order >= 1; order--) {
    if (counts[order] > 0) {
      parts.push(counts[order] + ' ' + names[order] + (counts[order] > 1 ? ' bonds' : ' bond'));
    }
  }
  return parts.join(' + ');
}

// ---- Main draw ----------------------------------------------------------------
function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  const st = current();
  const sIndex = int(structureSelect.value());
  if (selectedAtom >= st.atoms.length) selectedAtom = 0;
  const small = canvasWidth < 620;
  const showAll = showAllCheckbox.checked();

  // Title
  noStroke();
  fill('black');
  textStyle(NORMAL);
  drawRich('Formal Charge Calculator: ' + st.formula, canvasWidth / 2, 23, small ? 19 : 24, CENTER);

  const topY = 46;
  const panelH = 286;
  const leftW = (canvasWidth - 3 * margin) * (small ? 0.46 : 0.44);
  const rightX = margin + leftW + margin;
  const rightW = canvasWidth - rightX - margin;

  // ---- left: the Lewis structure ---------------------------------------------
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(margin, topY, leftW, panelH, 8);
  drawStructure(st, sIndex, margin, topY, leftW, panelH - 22, showAll, small);
  noStroke();
  fill('dimgray');
  textStyle(ITALIC);
  drawRich('click an atom to select it', margin + leftW / 2, topY + panelH - 13, small ? 11 : 13, CENTER);
  textStyle(NORMAL);

  // ---- right: V, N, B boxes, equation, result ----------------------------------
  drawCalculation(st, rightX, topY, rightW, panelH, small);

  // ---- bottom: every atom + sum check -------------------------------------------
  drawSummary(st, sIndex, margin, topY + panelH + 10, canvasWidth - 2 * margin, drawHeight - (topY + panelH + 10) - 10, showAll, small);

  drawControlLabels();
}

// ---- Lewis structure ------------------------------------------------------------
function drawStructure(st, sIndex, px, py, pw, ph, showAll, small) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (let a of st.atoms) {
    minX = min(minX, a.x); maxX = max(maxX, a.x);
    minY = min(minY, a.y); maxY = max(maxY, a.y);
  }
  const pad = small ? 40 : 56;      // room for lone pairs and charge badges
  const scale = min((pw - 2 * pad) / max(maxX - minX, 0.8), (ph - 2 * pad) / max(maxY - minY, 0.8), 86);
  atomRadius = constrain(scale * 0.27, 11, 21);
  const r = atomRadius;
  const ox = px + pw / 2 - (minX + maxX) / 2 * scale;
  const oy = py + ph / 2 - (minY + maxY) / 2 * scale;
  atomPos = st.atoms.map(function (a) { return { x: ox + a.x * scale, y: oy + a.y * scale }; });

  // bond angles around each atom
  const bondAngles = st.atoms.map(function () { return []; });
  for (let b of st.bonds) {
    const ang = atan2(atomPos[b[1]].y - atomPos[b[0]].y, atomPos[b[1]].x - atomPos[b[0]].x);
    bondAngles[b[0]].push(ang);
    bondAngles[b[1]].push(ang + PI);
  }

  // bonds (the selected atom's bonds get a green highlight underneath)
  for (let b of st.bonds) {
    const p1 = atomPos[b[0]];
    const p2 = atomPos[b[1]];
    const ang = atan2(p2.y - p1.y, p2.x - p1.x);
    const gap = constrain(scale * 0.08, 4, 6.5);
    if (b[0] === selectedAtom || b[1] === selectedAtom) {
      stroke('lightgreen');
      strokeWeight((b[2] - 1) * gap + 13);
      line(p1.x + cos(ang) * r, p1.y + sin(ang) * r, p2.x - cos(ang) * r, p2.y - sin(ang) * r);
    }
    for (let m = 0; m < b[2]; m++) {
      const off = (m - (b[2] - 1) / 2) * gap;
      stroke('black');
      strokeWeight(2.5);
      line(p1.x + cos(ang) * r - sin(ang) * off, p1.y + sin(ang) * r + cos(ang) * off,
        p2.x - cos(ang) * r - sin(ang) * off, p2.y - sin(ang) * r + cos(ang) * off);
    }
  }

  // atoms, lone pairs, badges
  for (let i = 0; i < st.atoms.length; i++) {
    const p = atomPos[i];
    const isSel = i === selectedAtom;
    const hover = dist(mouseX, mouseY, p.x, p.y) <= r + 3;

    // lone pairs (the selected atom's lone pairs are circled in gold)
    const lpAngles = lonePairAngles(bondAngles[i], st.lp[i]);
    const lpDist = r + 8;
    for (let ang of lpAngles) {
      const cx = p.x + cos(ang) * lpDist;
      const cy = p.y + sin(ang) * lpDist;
      if (isSel) {
        push();
        translate(cx, cy);
        rotate(ang);
        stroke('goldenrod');
        strokeWeight(2);
        fill('khaki');
        ellipse(0, 0, 12, 24);
        pop();
      }
      noStroke();
      fill('crimson');
      circle(cx - sin(ang) * 5, cy + cos(ang) * 5, 5.5);
      circle(cx + sin(ang) * 5, cy - cos(ang) * 5, 5.5);
    }

    // atom circle
    stroke(isSel ? 'darkorange' : (hover ? 'gray' : 'silver'));
    strokeWeight(isSel ? 4 : 2);
    fill(isSel ? 'lightyellow' : 'whitesmoke');
    circle(p.x, p.y, 2 * r);
    noStroke();
    fill('black');
    textStyle(BOLD);
    drawRich(st.atoms[i].el, p.x, p.y, constrain(r * 0.95, 12, 20), CENTER);
    textStyle(NORMAL);

    // formal charge badge: known once the atom has been selected, or when "show all" is on
    const known = showAll || visited[sIndex][i];
    const occupied = bondAngles[i].concat(lpAngles);
    const ang = freeAngle(occupied, -PI / 4);
    const bd = r + (st.lp[i] > 0 ? 19 : 13);
    drawBadge(p.x + cos(ang) * bd, p.y + sin(ang) * bd, known ? formalCharge(st, i) : null, small ? 9 : 10.5);
  }
}

// Small round badge: green for 0, gold for +1 or -1, red for larger charges, gray "?" if unknown
function drawBadge(x, y, fc, radius) {
  let bg = 'gainsboro';
  let fg = 'dimgray';
  let label = '?';
  if (fc !== null) {
    label = signed(fc);
    if (fc === 0) { bg = 'forestgreen'; fg = 'white'; }
    else if (abs(fc) === 1) { bg = 'gold'; fg = 'black'; }
    else { bg = 'crimson'; fg = 'white'; }
  }
  stroke('white');
  strokeWeight(1.5);
  fill(bg);
  circle(x, y, radius * 2);
  noStroke();
  fill(fg);
  textStyle(BOLD);
  drawRich(label, x, y, radius * 1.15, CENTER);
  textStyle(NORMAL);
}

// ---- Calculation panel ----------------------------------------------------------
function drawCalculation(st, x, y, w, h, small) {
  const atom = st.atoms[selectedAtom];
  const V = ELEMENTS[atom.el].valence;
  const N = 2 * st.lp[selectedAtom];
  const B = bondingElectrons(st, selectedAtom);
  const fc = formalCharge(st, selectedAtom);

  const boxH = 58;
  const gap = 7;
  const lpCount = st.lp[selectedAtom];
  const boxes = [
    { sym: 'V', value: V, bg: 'lightskyblue', border: 'steelblue',
      text: 'valence electrons in a free ' + atom.el + ' atom (' + ELEMENTS[atom.el].group + ')' },
    { sym: 'N', value: N, bg: 'khaki', border: 'goldenrod',
      text: lpCount === 0 ? 'nonbonding electrons: no lone pairs on this atom'
        : 'nonbonding electrons: ' + lpCount + (lpCount === 1 ? ' lone pair' : ' lone pairs') + ' (circled)' },
    { sym: 'B', value: B, bg: 'lightgreen', border: 'forestgreen',
      text: 'bonding electrons: ' + bondDescription(st, selectedAtom) + ' (highlighted)' }
  ];
  for (let k = 0; k < 3; k++) {
    const by = y + k * (boxH + gap);
    stroke(boxes[k].border);
    strokeWeight(2);
    fill(boxes[k].bg);
    rect(x, by, w, boxH, 8);
    noStroke();
    fill('black');
    textStyle(BOLD);
    const headSize = small ? 17 : 22;
    const head = boxes[k].sym + ' = ' + boxes[k].value;
    if (small) {
      drawRich(head, x + 8, by + 13, headSize, LEFT);
      textStyle(NORMAL);
      drawWrapped(boxes[k].text, x + 8, by + 25, w - 14, 11, 13.5);
    } else {
      drawRich(head, x + 12, by + boxH / 2, headSize, LEFT);
      textStyle(NORMAL);
      const tx = x + 100;
      const lines = countWrappedLines(boxes[k].text, w - 110, 15);
      drawWrapped(boxes[k].text, tx, by + boxH / 2 - lines * 9.5, w - 110, 15, 19);
    }
  }

  // equation with the substituted numbers color-coded to match the boxes
  const eqY = y + 3 * (boxH + gap) + 20;
  const eqSize = small ? 14 : 20;
  const general = 'FC = V − N − B/2';
  const parts = [
    { t: ' = ', c: 'black' },
    { t: String(V), c: 'mediumblue' },
    { t: ' − ', c: 'black' },
    { t: String(N), c: 'darkgoldenrod' },
    { t: ' − ', c: 'black' },
    { t: B + '/2', c: 'darkgreen' },
    { t: ' = ' + signed(fc), c: 'black' }
  ];
  textStyle(BOLD);
  let partsW = 0;
  for (let p of parts) partsW += richWidth(p.t, eqSize);
  const generalW = richWidth(general, eqSize);
  let cx, lineY = eqY;
  if (generalW + partsW <= w) {
    cx = x + (w - generalW - partsW) / 2;
    fill('black');
    drawRich(general, cx, lineY, eqSize, LEFT);
    cx += generalW;
  } else {
    fill('black');
    drawRich(general, x + w / 2, lineY - 4, eqSize, CENTER);
    lineY += eqSize + 3;
    cx = x + (w - partsW) / 2;
  }
  for (let p of parts) {
    fill(p.c);
    drawRich(p.t, cx, lineY, eqSize, LEFT);
    cx += richWidth(p.t, eqSize);
  }
  textStyle(NORMAL);

  // result badge: green for 0, gold for +1 or -1, red for larger charges
  const badgeH = small ? 30 : 36;
  const badgeY = y + h - badgeH;
  let bg = 'forestgreen';
  let fg = 'white';
  if (abs(fc) === 1) { bg = 'gold'; fg = 'black'; }
  if (abs(fc) >= 2) { bg = 'crimson'; fg = 'white'; }
  noStroke();
  fill(bg);
  rect(x, badgeY, w, badgeH, badgeH / 2);
  fill(fg);
  textStyle(BOLD);
  drawRich('Formal charge on ' + atom.el + ' = ' + signed(fc), x + w / 2, badgeY + badgeH / 2, small ? 15 : 19, CENTER);
  textStyle(NORMAL);
}

// ---- Summary strip ----------------------------------------------------------------
function drawSummary(st, sIndex, x, y, w, h, showAll, small) {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(x, y, w, h, 8);

  const fs = small ? 12 : 15;
  let allKnown = true;
  let sum = 0;
  const items = [];
  for (let i = 0; i < st.atoms.length; i++) {
    const known = showAll || visited[sIndex][i];
    if (!known) allKnown = false;
    const fc = formalCharge(st, i);
    sum += fc;
    items.push(st.atoms[i].el + ' ' + (known ? signed(fc) : '?'));
  }
  noStroke();
  fill('black');
  textStyle(BOLD);
  const head = 'All atoms:  ';
  let line = head + items.join('   ');
  drawRich(line, x + 12, y + 16, fs, LEFT);
  const lineW = richWidth(line, fs);
  let sumText;
  if (allKnown) {
    sumText = 'Sum = ' + signed(sum) + ', the charge on ' + st.formula;
    fill('darkgreen');
  } else {
    sumText = 'Sum = ?';
    fill('dimgray');
  }
  if (x + 12 + lineW + 24 + richWidth(sumText, fs) < x + w - 10) {
    drawRich(sumText, x + w - 12, y + 16, fs, RIGHT);
  } else {
    drawRich(sumText, x + 12, y + 16 + fs + 5, fs, LEFT);
    y += fs + 5;
  }
  textStyle(NORMAL);
  fill('black');
  const noteY = y + 30;
  if (allKnown) {
    drawWrappedRich(st.note, x + 12, noteY, w - 24, fs, fs + 5);
  } else {
    fill('dimgray');
    drawWrappedRich('Predict each formal charge, then click the atom (or press Next Atom) to check. The formal charges must add up to the charge on the species.', x + 12, noteY, w - 24, fs, fs + 5);
  }
}

// ---- Geometry helpers for lone pairs and badges ------------------------------------
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

// ---- Text helpers -------------------------------------------------------------------
function countWrappedLines(str, w, fs) {
  textSize(fs);
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

// Word-wrapped rich text (subscripts allowed inside words); y is the top of the first line
function drawWrappedRich(str, x, y, w, fs, lh) {
  const words = str.split(' ');
  let line = '';
  let cy = y + fs / 2;
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
  if (line !== '') drawRich(line, x, cy, fs, LEFT);
}

// Rich text: "_{...}" is a subscript, "^{...}" is a superscript.
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

// A superscript that directly follows a subscript is stacked above it (as in SO4 2-).
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

// ---- Controls -----------------------------------------------------------------------
function drawControlLabels() {
  noStroke();
  fill('black');
  textStyle(NORMAL);
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Structure:', 10, drawHeight + 21);
}

// Click an atom to select it
function mousePressed() {
  if (mouseY > drawHeight || mouseY < 0) return;
  for (let i = 0; i < atomPos.length; i++) {
    if (dist(mouseX, mouseY, atomPos[i].x, atomPos[i].y) <= atomRadius + 4) {
      selectedAtom = i;
      visited[int(structureSelect.value())][i] = true;
      return;
    }
  }
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
