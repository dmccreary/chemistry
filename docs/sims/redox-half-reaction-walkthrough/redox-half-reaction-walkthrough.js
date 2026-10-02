// Redox Half-Reaction Balancing Walkthrough MicroSim
// CANVAS_HEIGHT: 500
// AP Chemistry - Chapter 8: Chemical Reactions and Equations (Section 7)
// Learning objective (Bloom: Apply, with Evaluate for the checks): Students will
// step through the half-reaction method for a redox equation, identifying what
// each step balances and verifying conservation of mass and charge at each stage.
//
// Nothing in the walkthrough is typed in by hand except the two skeleton
// half-reactions. Every later line is produced by the textbook procedure:
//   3. balance atoms other than H and O (coefficients supplied with the skeleton)
//   4. balance O by adding H2O          5. balance H by adding H+
//   6. balance charge by adding e-      7. multiply so electrons are equal
//   8. add and cancel                   9. verify atoms and charge
//   10-12 (basic solution): add OH- to both sides, form H2O, cancel H2O
// The atom and charge counters are computed from the species table below, so
// the green and red checks always describe the equation that is on screen.

// ---- Layout constants -------------------------------------------------------
let canvasWidth = 800;
let drawHeight = 420;
let controlHeight = 80;          // two rows: reaction menu; step buttons
let canvasHeight = drawHeight + controlHeight;
let margin = 12;
let defaultTextSize = 16;

// ---- Species table: display text, atoms, charge --------------------------------
const MINUS = '−';
const SPECIES = {
  'MnO4-':   { rich: 'MnO_{4}^{' + MINUS + '}',          atoms: { Mn: 1, O: 4 },       charge: -1 },
  'Mn2+':    { rich: 'Mn^{2+}',                          atoms: { Mn: 1 },             charge: 2 },
  'MnO2':    { rich: 'MnO_{2}',                          atoms: { Mn: 1, O: 2 },       charge: 0 },
  'Fe2+':    { rich: 'Fe^{2+}',                          atoms: { Fe: 1 },             charge: 2 },
  'Fe3+':    { rich: 'Fe^{3+}',                          atoms: { Fe: 1 },             charge: 3 },
  'Fe(OH)2': { rich: 'Fe(OH)_{2}',                       atoms: { Fe: 1, O: 2, H: 2 }, charge: 0 },
  'Fe(OH)3': { rich: 'Fe(OH)_{3}',                       atoms: { Fe: 1, O: 3, H: 3 }, charge: 0 },
  'Cr2O7^2-': { rich: 'Cr_{2}O_{7}^{2' + MINUS + '}',    atoms: { Cr: 2, O: 7 },       charge: -2 },
  'Cr3+':    { rich: 'Cr^{3+}',                          atoms: { Cr: 1 },             charge: 3 },
  'C2O4^2-': { rich: 'C_{2}O_{4}^{2' + MINUS + '}',      atoms: { C: 2, O: 4 },        charge: -2 },
  'CO2':     { rich: 'CO_{2}',                           atoms: { C: 1, O: 2 },        charge: 0 },
  'Cl2':     { rich: 'Cl_{2}',                           atoms: { Cl: 2 },             charge: 0 },
  'Cl-':     { rich: 'Cl^{' + MINUS + '}',               atoms: { Cl: 1 },             charge: -1 },
  'Br2':     { rich: 'Br_{2}',                           atoms: { Br: 2 },             charge: 0 },
  'Br-':     { rich: 'Br^{' + MINUS + '}',               atoms: { Br: 1 },             charge: -1 },
  'H2O':     { rich: 'H_{2}O',                           atoms: { H: 2, O: 1 },        charge: 0 },
  'H+':      { rich: 'H^{+}',                            atoms: { H: 1 },              charge: 1 },
  'OH-':     { rich: 'OH^{' + MINUS + '}',               atoms: { O: 1, H: 1 },        charge: -1 },
  'e-':      { rich: 'e^{' + MINUS + '}',                atoms: {},                    charge: -1 }
};

// ---- The four reactions ----------------------------------------------------------
// skeleton = unbalanced half-reaction; atomsBalanced = same with coefficients that
// balance every element except H and O (step 3).
const REACTIONS = [
  {
    option: 'MnO₄⁻ + Fe²⁺ (acidic)',
    medium: 'acidic',
    overall: eq([[1, 'MnO4-'], [1, 'Fe2+']], [[1, 'Mn2+'], [1, 'Fe3+']]),
    red: { skeleton: eq([[1, 'MnO4-']], [[1, 'Mn2+']]), atomsBalanced: eq([[1, 'MnO4-']], [[1, 'Mn2+']]),
      element: 'Mn', change: 'Mn goes from +7 to +2' },
    ox: { skeleton: eq([[1, 'Fe2+']], [[1, 'Fe3+']]), atomsBalanced: eq([[1, 'Fe2+']], [[1, 'Fe3+']]),
      element: 'Fe', change: 'Fe goes from +2 to +3' }
  },
  {
    option: 'Cr₂O₇²⁻ + C₂O₄²⁻ (acidic)',
    medium: 'acidic',
    overall: eq([[1, 'Cr2O7^2-'], [1, 'C2O4^2-']], [[1, 'Cr3+'], [1, 'CO2']]),
    red: { skeleton: eq([[1, 'Cr2O7^2-']], [[1, 'Cr3+']]), atomsBalanced: eq([[1, 'Cr2O7^2-']], [[2, 'Cr3+']]),
      element: 'Cr', change: 'Cr goes from +6 to +3' },
    ox: { skeleton: eq([[1, 'C2O4^2-']], [[1, 'CO2']]), atomsBalanced: eq([[1, 'C2O4^2-']], [[2, 'CO2']]),
      element: 'C', change: 'C goes from +3 to +4' }
  },
  {
    option: 'Cl₂ + Br⁻',
    medium: 'acidic',
    overall: eq([[1, 'Cl2'], [1, 'Br-']], [[1, 'Cl-'], [1, 'Br2']]),
    red: { skeleton: eq([[1, 'Cl2']], [[1, 'Cl-']]), atomsBalanced: eq([[1, 'Cl2']], [[2, 'Cl-']]),
      element: 'Cl', change: 'Cl goes from 0 to ' + MINUS + '1' },
    ox: { skeleton: eq([[1, 'Br-']], [[1, 'Br2']]), atomsBalanced: eq([[2, 'Br-']], [[1, 'Br2']]),
      element: 'Br', change: 'Br goes from ' + MINUS + '1 to 0' }
  },
  {
    option: 'MnO₄⁻ + Fe(OH)₂ (basic)',
    medium: 'basic',
    overall: eq([[1, 'MnO4-'], [1, 'Fe(OH)2']], [[1, 'MnO2'], [1, 'Fe(OH)3']]),
    red: { skeleton: eq([[1, 'MnO4-']], [[1, 'MnO2']]), atomsBalanced: eq([[1, 'MnO4-']], [[1, 'MnO2']]),
      element: 'Mn', change: 'Mn goes from +7 to +4' },
    ox: { skeleton: eq([[1, 'Fe(OH)2']], [[1, 'Fe(OH)3']]), atomsBalanced: eq([[1, 'Fe(OH)2']], [[1, 'Fe(OH)3']]),
      element: 'Fe', change: 'Fe goes from +2 to +3' }
  }
];

const STEP_TEXT = [
  { title: 'Write the unbalanced net ionic equation',
    why: 'Include only the species that change. Spectator ions are left out.' },
  { title: 'Separate into two half-reactions',
    why: 'One for the species that is reduced, one for the species that is oxidized.' },
  { title: 'Balance atoms other than H and O',
    why: 'Use coefficients. Leave H and O for the next two steps.' },
  { title: 'Balance O by adding H_{2}O',
    why: 'Add H_{2}O to the side that needs oxygen.' },
  { title: 'Balance H by adding H^{+}',
    why: 'Add H^{+} to the side that needs hydrogen.' },
  { title: 'Balance charge by adding electrons',
    why: 'Add e^{' + MINUS + '} to the more positive side until the charges match.' },
  { title: 'Make the electrons equal',
    why: 'Electrons lost in oxidation must equal electrons gained in reduction.' },
  { title: 'Add the half-reactions and cancel',
    why: 'Electrons cancel completely. Cancel any H^{+} or H_{2}O found on both sides.' },
  { title: 'Verify atoms and charge',
    why: 'Count every atom and the total charge on each side.' },
  { title: 'Basic solution: add OH^{' + MINUS + '} to both sides',
    why: 'Add one OH^{' + MINUS + '} to each side for every H^{+} in the equation.' },
  { title: 'Combine H^{+} and OH^{' + MINUS + '} into H_{2}O',
    why: 'On the side that has both, each H^{+} and OH^{' + MINUS + '} pair becomes one H_{2}O.' },
  { title: 'Cancel H_{2}O and verify again',
    why: 'Remove H_{2}O that appears on both sides, then recount atoms and charge.' }
];

// ---- State ------------------------------------------------------------------
let reactionSelect, prevButton, nextButton, resetButton;
let reactionIndex = 0;
let stepIndex = 0;
let steps = [];
let mouseOverCanvas = false;
let flowPhase = 0;

// ---- Equation helpers ---------------------------------------------------------
function eq(left, right) {
  function side(list) {
    return list.map(function (t) { return { c: t[0], sp: t[1] }; });
  }
  return { L: side(left), R: side(right) };
}

function cloneEq(e) {
  return {
    L: e.L.map(function (t) { return { c: t.c, sp: t.sp }; }),
    R: e.R.map(function (t) { return { c: t.c, sp: t.sp }; })
  };
}

function addSpecies(e, sideKey, sp, n) {
  if (n <= 0) return;
  const side = e[sideKey];
  for (let i = 0; i < side.length; i++) {
    if (side[i].sp === sp) { side[i].c += n; return; }
  }
  side.push({ c: n, sp: sp });
}

function coefficientOf(e, sideKey, sp) {
  const side = e[sideKey];
  for (let i = 0; i < side.length; i++) {
    if (side[i].sp === sp) return side[i].c;
  }
  return 0;
}

function removeSpecies(e, sideKey, sp, n) {
  const side = e[sideKey];
  for (let i = side.length - 1; i >= 0; i--) {
    if (side[i].sp === sp) {
      side[i].c -= n;
      if (side[i].c <= 0) side.splice(i, 1);
    }
  }
}

// Atom and charge totals for each side of an equation
function totals(e) {
  const out = { L: { atoms: {}, charge: 0 }, R: { atoms: {}, charge: 0 } };
  ['L', 'R'].forEach(function (key) {
    e[key].forEach(function (t) {
      const s = SPECIES[t.sp];
      Object.keys(s.atoms).forEach(function (el) {
        out[key].atoms[el] = (out[key].atoms[el] || 0) + t.c * s.atoms[el];
      });
      out[key].charge += t.c * s.charge;
    });
  });
  return out;
}

function atomCount(e, sideKey, el) {
  return totals(e)[sideKey].atoms[el] || 0;
}

// Elements in an equation, with O and H listed last
function elementList(e) {
  const t = totals(e);
  const seen = {};
  const order = [];
  ['L', 'R'].forEach(function (key) {
    Object.keys(t[key].atoms).forEach(function (el) {
      if (!seen[el]) { seen[el] = true; order.push(el); }
    });
  });
  const main = order.filter(function (el) { return el !== 'O' && el !== 'H'; });
  if (seen.O) main.push('O');
  if (seen.H) main.push('H');
  return main;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function signed(n) {
  if (n === 0) return '0';
  return (n > 0 ? '+' : MINUS) + Math.abs(n);
}

// ---- The half-reaction method, steps 4 to 6, applied to one half-reaction -----------
function balanceOxygen(e) {
  const out = cloneEq(e);
  const diff = atomCount(e, 'L', 'O') - atomCount(e, 'R', 'O');
  let note;
  if (diff > 0) {
    addSpecies(out, 'R', 'H2O', diff);
    note = 'O is ' + atomCount(e, 'L', 'O') + ' | ' + atomCount(e, 'R', 'O') + ': add ' + diff + ' H_{2}O to the right';
  } else if (diff < 0) {
    addSpecies(out, 'L', 'H2O', -diff);
    note = 'O is ' + atomCount(e, 'L', 'O') + ' | ' + atomCount(e, 'R', 'O') + ': add ' + (-diff) + ' H_{2}O to the left';
  } else if (atomCount(e, 'L', 'O') === 0) {
    note = 'No O atoms: nothing to add';
  } else {
    note = 'O is already balanced: nothing to add';
  }
  return { eq: out, note: note };
}

function balanceHydrogen(e) {
  const out = cloneEq(e);
  const diff = atomCount(e, 'L', 'H') - atomCount(e, 'R', 'H');
  let note;
  if (diff > 0) {
    addSpecies(out, 'R', 'H+', diff);
    note = 'H is ' + atomCount(e, 'L', 'H') + ' | ' + atomCount(e, 'R', 'H') + ': add ' + diff + ' H^{+} to the right';
  } else if (diff < 0) {
    addSpecies(out, 'L', 'H+', -diff);
    note = 'H is ' + atomCount(e, 'L', 'H') + ' | ' + atomCount(e, 'R', 'H') + ': add ' + (-diff) + ' H^{+} to the left';
  } else if (atomCount(e, 'L', 'H') === 0) {
    note = 'No H atoms: nothing to add';
  } else {
    note = 'H is already balanced: nothing to add';
  }
  return { eq: out, note: note };
}

function balanceCharge(e) {
  const out = cloneEq(e);
  const t = totals(e);
  const diff = t.L.charge - t.R.charge;
  let note = 'Charge is ' + signed(t.L.charge) + ' | ' + signed(t.R.charge) + ': ';
  if (diff > 0) {
    addSpecies(out, 'L', 'e-', diff);
    note += 'add ' + diff + ' e^{' + MINUS + '} to the left';
  } else if (diff < 0) {
    addSpecies(out, 'R', 'e-', -diff);
    note += 'add ' + (-diff) + ' e^{' + MINUS + '} to the right';
  } else {
    note += 'already balanced';
  }
  return { eq: out, note: note };
}

function multiplyEq(e, k) {
  const out = cloneEq(e);
  ['L', 'R'].forEach(function (key) {
    out[key].forEach(function (t) { t.c *= k; });
  });
  return out;
}

function electronCount(e) {
  return coefficientOf(e, 'L', 'e-') + coefficientOf(e, 'R', 'e-');
}

// ---- Build every step of the walkthrough for one reaction ----------------------
function buildSteps(rx) {
  const list = [];
  // Step 1: unbalanced overall equation
  list.push({ kind: 'single', eq: rx.overall });
  // Step 2: skeleton half-reactions
  list.push({ kind: 'halves', red: rx.red.skeleton, ox: rx.ox.skeleton,
    redNote: rx.red.change + ': gains electrons', oxNote: rx.ox.change + ': loses electrons' });
  // Step 3: atoms other than H and O
  function atomNote(half) {
    const el = half.element;
    const before = atomCount(half.skeleton, 'L', el) + ' | ' + atomCount(half.skeleton, 'R', el);
    const after = atomCount(half.atomsBalanced, 'L', el) + ' | ' + atomCount(half.atomsBalanced, 'R', el);
    if (before === after) return el + ' is already balanced: ' + after;
    return el + ' was ' + before + ': a coefficient makes it ' + after;
  }
  list.push({ kind: 'halves', red: rx.red.atomsBalanced, ox: rx.ox.atomsBalanced,
    redNote: atomNote(rx.red), oxNote: atomNote(rx.ox) });
  // Steps 4 to 6
  const redO = balanceOxygen(rx.red.atomsBalanced);
  const oxO = balanceOxygen(rx.ox.atomsBalanced);
  list.push({ kind: 'halves', red: redO.eq, ox: oxO.eq, redNote: redO.note, oxNote: oxO.note });
  const redH = balanceHydrogen(redO.eq);
  const oxH = balanceHydrogen(oxO.eq);
  list.push({ kind: 'halves', red: redH.eq, ox: oxH.eq, redNote: redH.note, oxNote: oxH.note });
  const redE = balanceCharge(redH.eq);
  const oxE = balanceCharge(oxH.eq);
  list.push({ kind: 'halves', red: redE.eq, ox: oxE.eq, redNote: redE.note, oxNote: oxE.note });
  // Step 7: equalize electrons with the least common multiple
  const nRed = electronCount(redE.eq);
  const nOx = electronCount(oxE.eq);
  const lcm = nRed * nOx / gcd(nRed, nOx);
  const redM = multiplyEq(redE.eq, lcm / nRed);
  const oxM = multiplyEq(oxE.eq, lcm / nOx);
  function multNote(k) {
    return k === 1 ? 'Multiply by 1: no change needed' : 'Multiply every coefficient by ' + k;
  }
  list.push({ kind: 'halves', red: redM, ox: oxM, transfer: lcm,
    redNote: multNote(lcm / nRed) + ' (' + lcm + ' e^{' + MINUS + '} gained)',
    oxNote: multNote(lcm / nOx) + ' (' + lcm + ' e^{' + MINUS + '} lost)' });
  // Step 8: add and cancel
  const raw = { L: [], R: [] };
  [redM, oxM].forEach(function (h) {
    h.L.forEach(function (t) { addSpecies(raw, 'L', t.sp, t.c); });
    h.R.forEach(function (t) { addSpecies(raw, 'R', t.sp, t.c); });
  });
  const net = cloneEq(raw);
  const canceled = [];
  ['e-', 'H+', 'H2O'].forEach(function (sp) {
    const n = Math.min(coefficientOf(net, 'L', sp), coefficientOf(net, 'R', sp));
    if (n > 0) {
      removeSpecies(net, 'L', sp, n);
      removeSpecies(net, 'R', sp, n);
      canceled.push({ sp: sp, n: n });
    }
  });
  list.push({ kind: 'combine', raw: raw, eq: net, canceled: canceled });
  // Step 9: verify
  list.push({ kind: 'verify', eq: net, final: rx.medium === 'acidic' });

  if (rx.medium === 'basic') {
    // Step 10: add OH- to both sides, one for each H+
    const nH = coefficientOf(net, 'L', 'H+') + coefficientOf(net, 'R', 'H+');
    const withOH = cloneEq(net);
    addSpecies(withOH, 'L', 'OH-', nH);
    addSpecies(withOH, 'R', 'OH-', nH);
    list.push({ kind: 'single', eq: withOH,
      note: nH + ' H^{+} in the equation: add ' + nH + ' OH^{' + MINUS + '} to each side' });
    // Step 11: H+ + OH- on the same side become H2O
    const water = cloneEq(withOH);
    ['L', 'R'].forEach(function (key) {
      const n = Math.min(coefficientOf(water, key, 'H+'), coefficientOf(water, key, 'OH-'));
      if (n > 0) {
        removeSpecies(water, key, 'H+', n);
        removeSpecies(water, key, 'OH-', n);
        addSpecies(water, key, 'H2O', n);
      }
    });
    list.push({ kind: 'single', eq: water,
      note: nH + ' H^{+} + ' + nH + ' OH^{' + MINUS + '} become ' + nH + ' H_{2}O' });
    // Step 12: cancel H2O found on both sides
    const done = cloneEq(water);
    const nW = Math.min(coefficientOf(done, 'L', 'H2O'), coefficientOf(done, 'R', 'H2O'));
    if (nW > 0) {
      removeSpecies(done, 'L', 'H2O', nW);
      removeSpecies(done, 'R', 'H2O', nW);
    }
    list.push({ kind: 'verify', eq: done, final: true,
      note: nW > 0 ? 'Cancel ' + nW + ' H_{2}O from each side' : 'H_{2}O is on one side only: nothing to cancel' });
  }
  return list;
}

// ---- Checklist: which balancing requirements does the screen satisfy? -----------
function checklist(step) {
  const eqs = step.kind === 'halves' ? [step.red, step.ox] : [step.eq];
  const result = { atoms: true, oxygen: true, hydrogen: true, charge: true, electrons: false };
  eqs.forEach(function (e) {
    const t = totals(e);
    elementList(e).forEach(function (el) {
      const same = (t.L.atoms[el] || 0) === (t.R.atoms[el] || 0);
      if (el === 'O') { if (!same) result.oxygen = false; }
      else if (el === 'H') { if (!same) result.hydrogen = false; }
      else if (!same) result.atoms = false;
    });
    if (t.L.charge !== t.R.charge) result.charge = false;
  });
  if (step.kind === 'halves') {
    const a = electronCount(step.red);
    const b = electronCount(step.ox);
    result.electrons = a > 0 && a === b;
  } else if (step.kind === 'combine' || step.kind === 'verify') {
    result.electrons = true;
  } else {
    // single equations after the electrons have canceled (basic-solution steps)
    result.electrons = stepIndex >= 7;
  }
  return result;
}

// ---- p5 setup and draw --------------------------------------------------------
function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  canvas.mouseOver(function () { mouseOverCanvas = true; });
  canvas.mouseOut(function () { mouseOverCanvas = false; });
  textSize(defaultTextSize);

  reactionSelect = createSelect();
  reactionSelect.parent(mainElement);
  for (let i = 0; i < REACTIONS.length; i++) {
    reactionSelect.option(REACTIONS[i].option, i);
  }
  reactionSelect.selected(0);
  reactionSelect.changed(changeReaction);
  reactionSelect.attribute('aria-label', 'Select reaction');

  prevButton = createButton('Previous Step');
  prevButton.parent(mainElement);
  prevButton.mousePressed(previousStep);

  nextButton = createButton('Next Step');
  nextButton.parent(mainElement);
  nextButton.mousePressed(nextStep);

  resetButton = createButton('Start Over');
  resetButton.parent(mainElement);
  resetButton.mousePressed(startOver);

  steps = buildSteps(REACTIONS[reactionIndex]);
  positionControls();
  updateButtons();

  describe('Step-by-step walkthrough of the half-reaction method for balancing redox equations. Choose one of four reactions, then use the Previous Step and Next Step buttons. Each step shows the reduction and oxidation half-reactions, counts of every atom and of charge on each side colored green when balanced and red when not, and a checklist of the balancing requirements met so far.', LABEL);
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
  textSize(canvasWidth < 560 ? 17 : 24);
  text('Redox Half-Reaction Balancing Walkthrough', canvasWidth / 2, 10);

  if (mouseOverCanvas) flowPhase = (flowPhase + 0.008) % 1;

  const step = steps[stepIndex];
  const previous = stepIndex > 0 ? steps[stepIndex - 1] : null;
  drawBanner();
  if (step.kind === 'halves') {
    drawHalves(step, previous);
  } else {
    drawSingle(step, previous);
  }
  drawChecklist(step);
  drawControlLabels();
}

// ---- Step banner (yellow highlight for the active step) ---------------------------
function drawBanner() {
  const small = canvasWidth < 560;
  const x = margin;
  const y = 44;
  const w = canvasWidth - 2 * margin;
  const h = 50;
  stroke('goldenrod');
  strokeWeight(1);
  fill('lemonchiffon');
  rect(x, y, w, h, 8);
  const info = STEP_TEXT[stepIndex];
  const head = 'Step ' + (stepIndex + 1) + ' of ' + steps.length + ': ' + info.title;
  noStroke();
  fill('black');
  textStyle(BOLD);
  drawRichFit(head, canvasWidth / 2, y + 16, small ? 14 : 18, CENTER, w - 16);
  textStyle(NORMAL);
  drawRichFit(info.why, canvasWidth / 2, y + 37, small ? 12 : 15, CENTER, w - 16);
}

// ---- Two half-reaction panels (steps 2 to 7) ----------------------------------------
function drawHalves(step, previous) {
  const top = 102;
  const h = 118;
  const gap = 8;
  const prevHalves = previous && previous.kind === 'halves' ? previous : null;
  drawHalfPanel('Reduction half-reaction', 'royalblue', step.red, prevHalves ? prevHalves.red : null,
    step.redNote, top, h, step.transfer);
  drawHalfPanel('Oxidation half-reaction', 'chocolate', step.ox, prevHalves ? prevHalves.ox : null,
    step.oxNote, top + h + gap, h, step.transfer);
  if (step.transfer) drawElectronFlow(step.transfer, top, h, gap);
}

function drawHalfPanel(title, col, e, prevEq, note, y, h, transfer) {
  const small = canvasWidth < 560;
  const x = margin;
  const w = canvasWidth - 2 * margin;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(x, y, w, h, 10);
  noStroke();
  fill(col);
  rect(x, y, 7, h, 10, 0, 0, 10);

  // heading and what-changed note
  textStyle(BOLD);
  fill(col);
  drawRich(title, x + 16, y + 15, small ? 13 : 15, LEFT);
  textStyle(NORMAL);
  fill('dimgray');
  const noteSize = small ? 11 : 14;
  const headW = richWidth(title, small ? 13 : 15);
  // room on the right for the electron arrow in step 7
  const reserve = transfer ? (small ? 46 : 70) : 0;
  // the note sits to the right of the heading; it is shrunk if it does not fit
  if (small) {
    // narrow canvas: the note goes on its own line under the heading
    drawRichFit(note || '', x + 16, y + 32, noteSize, LEFT, w - 28 - reserve);
  } else {
    drawRichFit(note || '', x + w - 12 - reserve, y + 15, noteSize, RIGHT, w - headW - 44 - reserve);
  }

  const cx = x + (w - reserve) / 2 + 4;
  drawEquationFit(e, prevEq, cx, y + (small ? 61 : 52), small ? 17 : 24, w - reserve - 30);

  // atom and charge counters
  drawCounters(e, cx, y + h - (small ? 17 : 22), w - reserve - 24);
}

// Electrons moving from the oxidation half-reaction up to the reduction half-reaction
function drawElectronFlow(n, top, h, gap) {
  const small = canvasWidth < 560;
  const x = canvasWidth - margin - (small ? 22 : 34);
  const yBottom = top + h + gap + h / 2 + 4;
  const yTop = top + h / 2 - 4;
  stroke('steelblue');
  strokeWeight(3);
  line(x, yBottom, x, yTop + 10);
  noStroke();
  fill('steelblue');
  triangle(x, yTop, x - 7, yTop + 13, x + 7, yTop + 13);
  // one small blue circle per electron
  for (let i = 0; i < n; i++) {
    const t = ((i + 0.5) / n + flowPhase) % 1;
    const y = yBottom - 6 - t * (yBottom - yTop - 30);
    stroke('white');
    strokeWeight(1);
    fill('dodgerblue');
    circle(x, y, small ? 9 : 11);
  }
  noStroke();
  fill('steelblue');
  textStyle(BOLD);
  push();
  translate(x - (small ? 13 : 20), (yTop + yBottom) / 2);
  rotate(-HALF_PI);
  drawRich(n + ' e^{' + MINUS + '} transferred', 0, 0, small ? 11 : 13, CENTER);
  pop();
  textStyle(NORMAL);
}

// ---- One wide panel (steps 1, 8, 9, and the basic-solution steps) ---------------------
function drawSingle(step, previous) {
  const small = canvasWidth < 560;
  const x = margin;
  const y = 102;
  const w = canvasWidth - 2 * margin;
  const h = 244;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(x, y, w, h, 10);
  const cx = canvasWidth / 2;
  const labelSize = small ? 12 : 15;
  noStroke();

  if (step.kind === 'combine') {
    fill('dimgray');
    drawRich('Sum of the two half-reactions:', cx, y + 22, labelSize, CENTER);
    const cancelSet = {};
    step.canceled.forEach(function (c) { cancelSet[c.sp] = c.n; });
    drawEquationFit(step.raw, null, cx, y + 52, small ? 14 : 19, w - 30, cancelSet);
    // what cancels
    fill('firebrick');
    let msg = 'Cancel from each side: ';
    msg += step.canceled.map(function (c) { return c.n + ' ' + SPECIES[c.sp].rich; }).join(', ');
    drawRichFit(msg, cx, y + 86, labelSize, CENTER, w - 30);
    fill('dimgray');
    drawRich('Balanced equation' + (REACTIONS[reactionIndex].medium === 'basic' ? ' (acidic form):' : ':'), cx, y + 122, labelSize, CENTER);
    drawEquationFit(step.eq, null, cx, y + 156, small ? 17 : 24, w - 30);
    drawCounters(step.eq, cx, y + h - 26, w - 24);
    return;
  }

  // steps 1, 9, 10, 11, 12
  let heading = 'Unbalanced net ionic equation:';
  if (step.kind === 'verify') {
    heading = step.final ? 'Balanced net ionic equation:' : 'Balanced for acidic solution (continue for basic):';
  } else if (stepIndex >= 9) {
    heading = 'Converting to basic solution:';
  }
  fill('dimgray');
  drawRich(heading, cx, y + 26, labelSize, CENTER);
  const prevEq = previous && previous.eq && stepIndex >= 9 ? previous.eq : null;
  drawEquationFit(step.eq, prevEq, cx, y + 76, small ? 17 : 24, w - 30);
  if (step.note) {
    fill('dimgray');
    drawRichFit(step.note, cx, y + 116, labelSize, CENTER, w - 30);
  }
  drawCounters(step.eq, cx, y + 158, w - 24);

  // verdict line
  const c = checklist(step);
  const balanced = c.atoms && c.oxygen && c.hydrogen && c.charge;
  const t = totals(step.eq);
  textStyle(BOLD);
  if (step.kind === 'verify') {
    fill(balanced ? 'darkgreen' : 'firebrick');
    const verdict = balanced
      ? 'Mass is conserved (every atom matches) and charge is conserved (' + signed(t.L.charge) + ' on each side).'
      : 'Not balanced yet.';
    drawRichFit(verdict, cx, y + 206, labelSize + 1, CENTER, w - 30);
  } else if (stepIndex === 0) {
    fill('firebrick');
    drawRichFit('Red counters show what is not balanced yet. Press Next Step to begin.', cx, y + 206, labelSize, CENTER, w - 30);
  }
  textStyle(NORMAL);
}

// ---- Counters: left | right count for each element and for charge ---------------------
function drawCounters(e, cx, y, maxWidth) {
  const t = totals(e);
  const items = elementList(e).map(function (el) {
    const a = t.L.atoms[el] || 0;
    const b = t.R.atoms[el] || 0;
    return { text: el + '  ' + a + ' | ' + b, ok: a === b };
  });
  items.push({ text: 'charge  ' + signed(t.L.charge) + ' | ' + signed(t.R.charge), ok: t.L.charge === t.R.charge });

  let fs = canvasWidth < 560 ? 12 : 15;
  let padX = 9;
  let gap = 8;
  function totalWidth() {
    let sum = 0;
    for (let i = 0; i < items.length; i++) sum += richWidth(items[i].text, fs) + 2 * padX;
    return sum + gap * (items.length - 1);
  }
  while (totalWidth() > maxWidth && fs > 9) {
    fs -= 0.5;
    padX = 5;
    gap = 4;
  }
  let x = cx - totalWidth() / 2;
  const h = fs + 12;
  for (let i = 0; i < items.length; i++) {
    const w = richWidth(items[i].text, fs) + 2 * padX;
    stroke(items[i].ok ? 'forestgreen' : 'crimson');
    strokeWeight(1.5);
    fill(items[i].ok ? 'honeydew' : 'mistyrose');
    rect(x, y - h / 2, w, h, 6);
    noStroke();
    fill(items[i].ok ? 'darkgreen' : 'firebrick');
    textStyle(BOLD);
    drawRich(items[i].text, x + padX, y, fs, LEFT);
    textStyle(NORMAL);
    x += w + gap;
  }
}

// ---- Checklist strip ---------------------------------------------------------------
function drawChecklist(step) {
  const small = canvasWidth < 560;
  const c = checklist(step);
  const items = [
    { label: small ? 'Atoms' : 'Other atoms', ok: c.atoms },
    { label: small ? 'O' : 'Oxygen', ok: c.oxygen },
    { label: small ? 'H' : 'Hydrogen', ok: c.hydrogen },
    { label: 'Charge', ok: c.charge },
    { label: small ? 'e^{' + MINUS + '} equal' : 'Electrons equal', ok: c.electrons }
  ];
  const x = margin;
  const y = 354;
  const w = canvasWidth - 2 * margin;
  const h = 56;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(x, y, w, h, 10);
  noStroke();
  fill('black');
  textStyle(BOLD);
  drawRich(small ? 'Checklist' : 'Checklist: balanced so far?', x + 12, y + 14, small ? 12 : 14, LEFT);
  textStyle(NORMAL);

  const fs = small ? 12 : 15;
  const cellW = (w - 16) / items.length;
  for (let i = 0; i < items.length; i++) {
    const cxCell = x + 8 + cellW * i;
    const iy = y + 38;
    drawMark(cxCell + 12, iy, items[i].ok);
    fill(items[i].ok ? 'darkgreen' : 'firebrick');
    drawRichFit(items[i].label, cxCell + 26, iy, fs, LEFT, cellW - 30);
  }
}

// Green check mark or red X, drawn as shapes
function drawMark(x, y, ok) {
  noFill();
  strokeWeight(3);
  if (ok) {
    stroke('forestgreen');
    line(x - 7, y, x - 2, y + 6);
    line(x - 2, y + 6, x + 8, y - 7);
  } else {
    stroke('crimson');
    line(x - 6, y - 6, x + 6, y + 6);
    line(x - 6, y + 6, x + 6, y - 6);
  }
  noStroke();
}

// ---- Equation drawing ---------------------------------------------------------------
// Returns the list of pieces to draw: terms, plus signs, and the reaction arrow
function equationPieces(e, prevEq, cancelSet) {
  const pieces = [];
  ['L', 'R'].forEach(function (key, sideIndex) {
    if (sideIndex === 1) pieces.push({ type: 'arrow' });
    e[key].forEach(function (t, i) {
      if (i > 0) pieces.push({ type: 'plus' });
      const isNew = prevEq ? coefficientOf(prevEq, key, t.sp) !== t.c : false;
      pieces.push({
        type: 'term',
        text: (t.c > 1 ? String(t.c) : '') + SPECIES[t.sp].rich,
        isNew: isNew,
        // 'full' = the whole term cancels, 'part' = only some of it does
        cancel: cancelSet && cancelSet[t.sp] ? (cancelSet[t.sp] >= t.c ? 'full' : 'part') : ''
      });
    });
  });
  return pieces;
}

function equationWidth(pieces, size) {
  let w = 0;
  for (let i = 0; i < pieces.length; i++) {
    const p = pieces[i];
    if (p.type === 'term') w += richWidth(p.text, size);
    else if (p.type === 'plus') w += richWidth(' + ', size);
    else w += size * 2.4;
  }
  return w;
}

// Draw an equation centered at cx, shrinking the type until it fits maxWidth.
// Terms that changed since the previous step get a yellow highlight.
function drawEquationFit(e, prevEq, cx, y, size, maxWidth, cancelSet) {
  const pieces = equationPieces(e, prevEq, cancelSet);
  let fs = size;
  while (equationWidth(pieces, fs) > maxWidth && fs > 9) fs -= 0.5;
  let x = cx - equationWidth(pieces, fs) / 2;
  textStyle(NORMAL);
  for (let i = 0; i < pieces.length; i++) {
    const p = pieces[i];
    if (p.type === 'term') {
      const w = richWidth(p.text, fs);
      if (p.isNew) {
        noStroke();
        fill('gold');
        rect(x - 3, y - fs * 0.85, w + 6, fs * 1.7, 5);
      }
      noStroke();
      fill(p.cancel ? 'firebrick' : 'black');
      drawRich(p.text, x, y, fs, LEFT);
      if (p.cancel === 'full') {
        stroke('firebrick');
        strokeWeight(1.5);
        line(x - 2, y + fs * 0.35, x + w + 2, y - fs * 0.35);
        noStroke();
      }
      x += w;
    } else if (p.type === 'plus') {
      noStroke();
      fill('black');
      drawRich(' + ', x, y, fs, LEFT);
      x += richWidth(' + ', fs);
    } else {
      // reaction arrow drawn as a line with a triangular head
      const aw = fs * 2.4;
      stroke('black');
      strokeWeight(max(1.5, fs * 0.09));
      line(x + fs * 0.45, y, x + aw - fs * 0.7, y);
      noStroke();
      fill('black');
      triangle(x + aw - fs * 0.45, y, x + aw - fs * 0.95, y - fs * 0.26, x + aw - fs * 0.95, y + fs * 0.26);
      x += aw;
    }
  }
}

// ---- Controls ---------------------------------------------------------------------
function drawControlLabels() {
  noStroke();
  fill('black');
  textStyle(NORMAL);
  drawRich(canvasWidth < 560 ? 'Reaction:' : 'Select Reaction:', 10, drawHeight + 22, canvasWidth < 560 ? 14 : 16, LEFT);
}

function positionControls() {
  if (!reactionSelect) return;
  const small = canvasWidth < 560;
  reactionSelect.position(small ? 78 : 136, drawHeight + 10);
  prevButton.position(10, drawHeight + 45);
  const pw = prevButton.elt.offsetWidth || 104;
  nextButton.position(10 + pw + 8, drawHeight + 45);
  const nw = nextButton.elt.offsetWidth || 82;
  resetButton.position(10 + pw + 8 + nw + 8, drawHeight + 45);
}

function updateButtons() {
  if (!prevButton) return;
  if (stepIndex === 0) prevButton.attribute('disabled', ''); else prevButton.removeAttribute('disabled');
  if (stepIndex === steps.length - 1) nextButton.attribute('disabled', ''); else nextButton.removeAttribute('disabled');
}

function changeReaction() {
  reactionIndex = int(reactionSelect.value());
  steps = buildSteps(REACTIONS[reactionIndex]);
  stepIndex = 0;
  updateButtons();
}

function previousStep() {
  if (stepIndex > 0) stepIndex--;
  updateButtons();
}

function nextStep() {
  if (stepIndex < steps.length - 1) stepIndex++;
  updateButtons();
}

function startOver() {
  stepIndex = 0;
  updateButtons();
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

// Same, but shrink the type until the text fits in maxWidth
function drawRichFit(str, x, y, size, align, maxWidth) {
  let fs = size;
  while (richWidth(str, fs) > maxWidth && fs > 8) fs -= 0.5;
  drawRich(str, x, y, fs, align);
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
