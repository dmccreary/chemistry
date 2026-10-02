// Reaction Energy Diagram MicroSim
// CANVAS_HEIGHT: 575
// AP Chemistry - Chapter 10: Reaction Rates and Rate Laws (Section 10.8)
// Learning objectives:
//   (Bloom: Remember) identify reactants, products, the transition state,
//   Ea (forward), Ea (reverse), and delta H on a reaction coordinate diagram;
//   (Bloom: Understand) relate the sign of delta H to whether the reaction is
//   exothermic or endothermic.
//
// Model. Energies are in kJ/mol on a fixed vertical scale, so moving a slider
// changes a height on the diagram directly.
//   E(transition state) = E(reactants) + Ea(forward)
//   E(products)         = E(reactants) + delta H
//   Ea(reverse)         = E(transition state) - E(products) = Ea(forward) - delta H
// delta H is negative for an exothermic reaction and positive for an endothermic
// one. For an endothermic reaction delta H must be smaller than Ea(forward),
// because the products cannot lie above the transition state.

// ---- Layout constants -------------------------------------------------------
let canvasWidth = 800;
let drawHeight = 460;
let controlHeight = 115;         // three rows: buttons; Ea slider; delta H slider
let canvasHeight = drawHeight + controlHeight;
let margin = 12;
let defaultTextSize = 16;
let sliderLeftMargin = 250;

const PLOT_TOP = 52;
const PLOT_BOTTOM = 322;
const ENERGY_MAX = 400;          // kJ/mol at the top of the plot
const REACTANT_ENERGY = { exo: 180, endo: 60 };   // where the reactant level is drawn
const MINUS = '−';
const DELTA = 'Δ';

const FEATURES = {
  reactants: { name: 'the reactants',
    info: 'Reactants: the starting substances, shown at their potential energy before the reaction.' },
  products: { name: 'the products',
    info: 'Products: the substances formed. Their energy compared with the reactants sets ' + DELTA + 'H.' },
  ts: { name: 'the transition state',
    info: 'Transition state (activated complex): the highest-energy arrangement, with old bonds partly broken and new bonds partly formed.' },
  eaf: { name: 'E_{a} (forward)',
    info: 'E_{a} (forward): the energy needed to climb from the reactants up to the transition state.' },
  ear: { name: 'E_{a} (reverse)',
    info: 'E_{a} (reverse): the energy needed to climb from the products up to the transition state.' },
  dh: { name: DELTA + 'H',
    info: DELTA + 'H: energy of the products minus energy of the reactants. Negative is exothermic, positive is endothermic.' }
};
const FEATURE_KEYS = ['reactants', 'products', 'ts', 'eaf', 'ear', 'dh'];

// ---- State ------------------------------------------------------------------
let modeButton, quizButton, eaSlider, dhSlider;
let exothermic = true;
let quizMode = false;
let quizOrder = [];
let quizIndex = 0;
let quizScore = 0;               // answered correctly on the first try
let quizFirstTry = true;
let quizFeedback = '';
let quizFeedbackGood = true;
let geom = null;                 // geometry of the current diagram, rebuilt every frame

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  modeButton = createButton('Switch to Endothermic');
  modeButton.parent(mainElement);
  modeButton.mousePressed(toggleMode);

  quizButton = createButton('Quiz Me');
  quizButton.parent(mainElement);
  quizButton.mousePressed(toggleQuiz);

  eaSlider = createSlider(50, 200, 120, 5);
  eaSlider.parent(mainElement);
  eaSlider.attribute('aria-label', 'Forward activation energy in kilojoules per mole');

  dhSlider = createSlider(20, 150, 80, 5);
  dhSlider.parent(mainElement);
  dhSlider.attribute('aria-label', 'Size of the enthalpy change in kilojoules per mole');

  positionControls();

  describe('Reaction energy diagram. A curve rises from the reactant energy level over a peak, the transition state, and falls to the product energy level. Arrows mark the forward activation energy, the reverse activation energy, and the enthalpy change. A button switches between an exothermic and an endothermic reaction, sliders set the forward activation energy and the size of the enthalpy change, and a quiz asks you to click on each labeled feature.', LABEL);
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

  const v = values();
  buildGeometry(v);
  drawPlot(v);

  // Title (drawn after the plot background so nothing covers it)
  fill('black');
  noStroke();
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  textSize(canvasWidth < 500 ? 19 : 24);
  text('Reaction Energy Diagram', canvasWidth / 2, 10);

  drawInfoPanel(v);
  drawControlLabels(v);
}

// ---- Model values -------------------------------------------------------------
function values() {
  const ea = eaSlider.value();
  let size = dhSlider.value();
  // endothermic: products must stay below the transition state
  if (!exothermic && size > ea - 10) {
    size = ea - 10;
    dhSlider.value(size);
  }
  const dH = exothermic ? -size : size;
  const eR = exothermic ? REACTANT_ENERGY.exo : REACTANT_ENERGY.endo;
  return {
    eaForward: ea,
    dH: dH,
    eaReverse: ea - dH,          // Ea(reverse) = Ea(forward) - delta H
    eReactants: eR,
    eTS: eR + ea,
    eProducts: eR + dH,
    limited: !exothermic && size >= ea - 10
  };
}

function signedValue(n) {
  return (n < 0 ? MINUS : '+') + Math.abs(n);
}

// ---- Geometry -----------------------------------------------------------------
function energyY(e) {
  return PLOT_BOTTOM - e / ENERGY_MAX * (PLOT_BOTTOM - PLOT_TOP);
}

function buildGeometry(v) {
  const small = canvasWidth < 560;
  const xL = margin + (small ? 34 : 52);
  const xR = canvasWidth - margin - 8;
  const w = xR - xL;
  geom = {
    small: small,
    xL: xL, xR: xR, w: w,
    x1: xL + w * 0.18,           // end of the reactant plateau
    xp: xL + w * 0.5,            // peak
    x2: xL + w * 0.82,           // start of the product plateau
    yR: energyY(v.eReactants),
    yTS: energyY(v.eTS),
    yP: energyY(v.eProducts)
  };
  geom.xEaF = geom.xp - (small ? 16 : 26);
  geom.xEaR = geom.xp + (small ? 16 : 26);
  geom.xDH = xR - (small ? 12 : 18);
}

// Energy of the curve at horizontal position x
function curveEnergy(x, v) {
  if (x <= geom.x1) return v.eReactants;
  if (x >= geom.x2) return v.eProducts;
  if (x <= geom.xp) {
    const u = (x - geom.x1) / (geom.xp - geom.x1);
    return v.eReactants + (v.eTS - v.eReactants) * (1 - Math.cos(Math.PI * u)) / 2;
  }
  const u = (x - geom.xp) / (geom.x2 - geom.xp);
  return v.eTS + (v.eProducts - v.eTS) * (1 - Math.cos(Math.PI * u)) / 2;
}

// ---- The diagram -----------------------------------------------------------------
function drawPlot(v) {
  const g = geom;
  const small = g.small;

  // plot background
  noStroke();
  fill('white');
  rect(g.xL, PLOT_TOP, g.w, PLOT_BOTTOM - PLOT_TOP);

  // shaded reactant and product zones
  const blue = color('lightblue');
  blue.setAlpha(120);
  fill(blue);
  rect(g.xL, PLOT_TOP, g.x1 - g.xL, PLOT_BOTTOM - PLOT_TOP);
  const pink = color('pink');
  pink.setAlpha(120);
  fill(pink);
  rect(g.x2, PLOT_TOP, g.xR - g.x2, PLOT_BOTTOM - PLOT_TOP);

  // dashed energy levels
  drawingContext.setLineDash([6, 5]);
  strokeWeight(1);
  stroke('gray');
  line(g.xL, g.yR, g.xR, g.yR);
  line(g.xL, g.yP, g.xR, g.yP);
  line(g.xL, g.yTS, g.xR, g.yTS);
  drawingContext.setLineDash([]);

  // the reaction curve
  noFill();
  stroke('darkslategray');
  strokeWeight(3);
  beginShape();
  for (let x = g.xL; x <= g.xR; x += 2) {
    vertex(x, energyY(curveEnergy(x, v)));
  }
  vertex(g.xR, g.yP);
  endShape();

  // arrows: neutral gray during the quiz so color is not a clue
  const colF = quizMode ? 'dimgray' : 'crimson';
  const colR = quizMode ? 'dimgray' : 'darkorange';
  const colH = quizMode ? 'dimgray' : 'royalblue';
  drawArrow(g.xEaF, g.yR, g.yTS, colF);
  drawArrow(g.xEaR, g.yP, g.yTS, colR);
  drawArrow(g.xDH, g.yR, g.yP, colH);

  // transition state marker
  stroke('white');
  strokeWeight(2);
  fill(quizMode ? 'dimgray' : 'red');
  circle(g.xp, g.yTS, 16);

  // axes with arrowheads
  stroke('black');
  strokeWeight(2);
  line(g.xL, PLOT_BOTTOM, g.xL, PLOT_TOP - 6);
  line(g.xL, PLOT_BOTTOM, g.xR + 4, PLOT_BOTTOM);
  noStroke();
  fill('black');
  triangle(g.xL, PLOT_TOP - 14, g.xL - 5, PLOT_TOP - 4, g.xL + 5, PLOT_TOP - 4);
  triangle(g.xR + 12, PLOT_BOTTOM, g.xR + 2, PLOT_BOTTOM - 5, g.xR + 2, PLOT_BOTTOM + 5);
  const axisSize = small ? 12 : 15;
  drawRich('Reaction coordinate', (g.xL + g.xR) / 2, PLOT_BOTTOM + 16, axisSize, CENTER);
  push();
  translate(g.xL - (small ? 16 : 26), (PLOT_TOP + PLOT_BOTTOM) / 2);
  rotate(-HALF_PI);
  drawRich(small ? 'Potential energy' : 'Potential energy (kJ/mol)', 0, 0, axisSize, CENTER);
  pop();

  if (!quizMode) drawLabels(v, colF, colR, colH);

  // highlight ring on the feature under the pointer (not during the quiz)
  if (!quizMode) {
    const hover = featureAt(mouseX, mouseY);
    if (hover) highlightFeature(hover);
  }
}

// Vertical arrow from yFrom to yTo with one arrowhead at yTo
function drawArrow(x, yFrom, yTo, col) {
  const dir = yTo < yFrom ? -1 : 1;
  const len = Math.abs(yTo - yFrom);
  const head = Math.min(11, len * 0.6);
  stroke(col);
  strokeWeight(3);
  line(x, yFrom, x, yTo - dir * head);
  // small foot where the arrow starts
  strokeWeight(2);
  line(x - 5, yFrom, x + 5, yFrom);
  noStroke();
  fill(col);
  triangle(x, yTo, x - 6, yTo - dir * head, x + 6, yTo - dir * head);
}

function drawLabels(v, colF, colR, colH) {
  const g = geom;
  const small = g.small;
  const fs = small ? 11 : 14;

  // level names
  textStyle(BOLD);
  labelBox('Reactants', (g.xL + g.x1) / 2, g.yR - 13, fs, CENTER, 'navy');
  labelBox('Products', g.x2 + (g.xDH - 8 - g.x2) / 2, g.yP - 13, fs, CENTER, 'mediumvioletred');
  labelBox(small ? 'Transition state' : 'Transition state (activated complex)', g.xp, g.yTS - 20, fs, CENTER, 'firebrick');

  // forward activation energy: label left of its arrow, low in the hump where it is widest
  const yF = g.yR - (g.yR - g.yTS) * 0.3;
  labelBox(small ? 'E_{a} fwd' : 'E_{a} (forward)', g.xEaF - 8, yF - fs * 0.7, fs, RIGHT, colF);
  textStyle(NORMAL);
  labelBox(v.eaForward + ' kJ/mol', g.xEaF - 8, yF + fs * 0.7, fs, RIGHT, colF);

  // reverse activation energy: label right of its arrow
  const yRv = g.yP - (g.yP - g.yTS) * 0.3;
  textStyle(BOLD);
  labelBox(small ? 'E_{a} rev' : 'E_{a} (reverse)', g.xEaR + 8, yRv - fs * 0.7, fs, LEFT, colR);
  textStyle(NORMAL);
  labelBox(v.eaReverse + ' kJ/mol', g.xEaR + 8, yRv + fs * 0.7, fs, LEFT, colR);

  // enthalpy change: label left of its arrow, or below the lower level if the gap is small
  const gap = Math.abs(g.yP - g.yR);
  let yH = (g.yR + g.yP) / 2;
  if (gap < 62) yH = Math.max(g.yR, g.yP) + fs * 1.6;
  textStyle(BOLD);
  labelBox(DELTA + 'H', g.xDH - 9, yH - fs * 0.7, fs, RIGHT, colH);
  textStyle(NORMAL);
  labelBox(signedValue(v.dH) + ' kJ/mol', g.xDH - 9, yH + fs * 0.7, fs, RIGHT, colH);

  // mode heading inside the plot
  textStyle(BOLD);
  const head = exothermic
    ? (small ? 'Exothermic: ' + DELTA + 'H < 0' : 'Exothermic: products lower than reactants, ' + DELTA + 'H < 0')
    : (small ? 'Endothermic: ' + DELTA + 'H > 0' : 'Endothermic: products higher than reactants, ' + DELTA + 'H > 0');
  noStroke();
  fill(exothermic ? 'darkgreen' : 'firebrick');
  drawRichFit(head, g.xL + 10, PLOT_TOP + 12, small ? 12 : 15, LEFT, g.w - 20);
  textStyle(NORMAL);
}

// Text on a translucent white pad so it stays readable over lines and shading
function labelBox(str, x, y, size, align, col) {
  const w = richWidth(str, size);
  let left = x;
  if (align === CENTER) left = x - w / 2;
  if (align === RIGHT) left = x - w;
  noStroke();
  fill(255, 255, 255, 205);
  rect(left - 3, y - size * 0.7, w + 6, size * 1.4, 4);
  fill(col);
  drawRich(str, x, y, size, align);
}

// ---- Hit testing: which labeled feature is at (mx, my)? --------------------------
function featureAt(mx, my) {
  const g = geom;
  if (!g || my < PLOT_TOP - 10 || my > PLOT_BOTTOM) return null;
  function between(v, a, b) { return v >= Math.min(a, b) - 6 && v <= Math.max(a, b) + 6; }
  if (dist(mx, my, g.xp, g.yTS) <= 14) return 'ts';
  if (Math.abs(mx - g.xEaF) <= 11 && between(my, g.yR, g.yTS)) return 'eaf';
  if (Math.abs(mx - g.xEaR) <= 11 && between(my, g.yP, g.yTS)) return 'ear';
  if (Math.abs(mx - g.xDH) <= 11 && between(my, g.yR, g.yP)) return 'dh';
  if (mx >= g.xL && mx <= g.x1 + 10 && Math.abs(my - g.yR) <= 22) return 'reactants';
  if (mx >= g.x2 - 10 && mx <= g.xR && Math.abs(my - g.yP) <= 22) return 'products';
  return null;
}

function highlightFeature(key) {
  const g = geom;
  noFill();
  stroke('gold');
  strokeWeight(4);
  if (key === 'ts') circle(g.xp, g.yTS, 30);
  if (key === 'eaf') rect(g.xEaF - 11, Math.min(g.yR, g.yTS) - 6, 22, Math.abs(g.yR - g.yTS) + 12, 6);
  if (key === 'ear') rect(g.xEaR - 11, Math.min(g.yP, g.yTS) - 6, 22, Math.abs(g.yP - g.yTS) + 12, 6);
  if (key === 'dh') rect(g.xDH - 11, Math.min(g.yR, g.yP) - 6, 22, Math.abs(g.yR - g.yP) + 12, 6);
  if (key === 'reactants') line(g.xL, g.yR, g.x1, g.yR);
  if (key === 'products') line(g.x2, g.yP, g.xR, g.yP);
  noStroke();
}

// ---- Panel under the diagram: values, the Ea relationship, and explanations ----------
function drawInfoPanel(v) {
  const small = canvasWidth < 560;
  const x = margin;
  const y = PLOT_BOTTOM + 34;
  const w = canvasWidth - 2 * margin;
  const h = drawHeight - y - 8;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(x, y, w, h, 8);
  const fs = small ? 12 : 15;
  const left = x + 12;
  const avail = w - 24;
  noStroke();

  if (quizMode) {
    fill('black');
    textStyle(BOLD);
    if (quizIndex < quizOrder.length) {
      drawRichFit('Question ' + (quizIndex + 1) + ' of ' + quizOrder.length + ': click on ' +
        FEATURES[quizOrder[quizIndex]].name + '.', left, y + 20, fs + 1, LEFT, avail);
    } else {
      drawRichFit('Quiz complete: ' + quizScore + ' of ' + quizOrder.length + ' correct on the first try.',
        left, y + 20, fs + 1, LEFT, avail);
    }
    textStyle(NORMAL);
    if (quizFeedback) {
      fill(quizFeedbackGood ? 'darkgreen' : 'firebrick');
      drawWrapped(quizFeedback, left, y + 46, fs, avail, 2);
    }
    fill('dimgray');
    drawRichFit('The labels are hidden. Press Show Labels to review them.', left, y + h - 14, fs - 1, LEFT, avail);
    return;
  }

  // line 1: the Ea relationship with the current numbers substituted
  fill('black');
  textStyle(BOLD);
  const dHText = v.dH < 0 ? '(' + signedValue(v.dH) + ')' : String(v.dH);
  drawRichFit('E_{a} (reverse) = E_{a} (forward) ' + MINUS + ' ' + DELTA + 'H = ' + v.eaForward + ' ' + MINUS + ' ' +
    dHText + ' = ' + v.eaReverse + ' kJ/mol', left, y + 18, fs, LEFT, avail);
  textStyle(NORMAL);

  // lines 2 and 3: what the pointer is on, or the classification of the reaction
  const hover = featureAt(mouseX, mouseY);
  let msg;
  if (hover) {
    fill('black');
    msg = FEATURES[hover].info;
  } else if (v.limited) {
    fill('firebrick');
    msg = DELTA + 'H is at its largest possible value: the products cannot be higher in energy than the transition state.';
  } else if (exothermic) {
    fill('darkgreen');
    msg = DELTA + 'H is negative: the products are lower in energy than the reactants, so energy is released. The reverse barrier is the larger one.';
  } else {
    fill('firebrick');
    msg = DELTA + 'H is positive: the products are higher in energy than the reactants, so energy is absorbed. The forward barrier is the larger one.';
  }
  drawWrapped(msg, left, y + 42, fs, avail, 2);
  fill('dimgray');
  drawRichFit('Point at any part of the diagram to see what it means.', left, y + h - 13, fs - 2, LEFT, avail);
}

// Word-wrap rich text over at most maxLines lines
function drawWrapped(str, x, y, size, maxWidth, maxLines) {
  const words = str.split(' ');
  const lines = [];
  let current = '';
  for (let i = 0; i < words.length; i++) {
    const trial = current ? current + ' ' + words[i] : words[i];
    if (richWidth(trial, size) > maxWidth && current) {
      lines.push(current);
      current = words[i];
    } else {
      current = trial;
    }
  }
  if (current) lines.push(current);
  if (lines.length > maxLines) {
    // too long for the space: shrink the type and try again
    drawWrapped(str, x, y, size - 0.5, maxWidth, maxLines);
    return;
  }
  for (let i = 0; i < lines.length; i++) {
    drawRich(lines[i], x, y + i * (size + 5), size, LEFT);
  }
}

// ---- Quiz --------------------------------------------------------------------------
function toggleQuiz() {
  quizMode = !quizMode;
  quizButton.html(quizMode ? 'Show Labels' : 'Quiz Me');
  if (quizMode) {
    quizOrder = shuffle(FEATURE_KEYS.slice());
    quizIndex = 0;
    quizScore = 0;
    quizFirstTry = true;
    quizFeedback = '';
  }
  positionControls();
}

function mousePressed() {
  if (!quizMode || mouseY > drawHeight || quizIndex >= quizOrder.length) return;
  const clicked = featureAt(mouseX, mouseY);
  if (!clicked) return;
  const target = quizOrder[quizIndex];
  if (clicked === target) {
    if (quizFirstTry) quizScore++;
    quizFeedbackGood = true;
    quizFeedback = 'Correct. ' + FEATURES[target].info;
    quizIndex++;
    quizFirstTry = true;
  } else {
    quizFirstTry = false;
    quizFeedbackGood = false;
    quizFeedback = 'Not quite: that is ' + FEATURES[clicked].name + '. Try again.';
  }
}

function toggleMode() {
  exothermic = !exothermic;
  modeButton.html(exothermic ? 'Switch to Endothermic' : 'Switch to Exothermic');
  positionControls();
}

// ---- Controls ---------------------------------------------------------------
function drawControlLabels(v) {
  const small = canvasWidth < 560;
  noStroke();
  fill('black');
  textStyle(NORMAL);
  const fs = small ? 13 : 16;
  drawRich((small ? 'E_{a} fwd: ' : 'E_{a} (forward): ') + v.eaForward + ' kJ/mol', 10, drawHeight + 58, fs, LEFT);
  drawRich((small ? 'Size of ' + DELTA + 'H: ' : 'Size of ' + DELTA + 'H: ') + Math.abs(v.dH) + ' kJ/mol', 10, drawHeight + 93, fs, LEFT);
}

function positionControls() {
  if (!modeButton) return;
  const small = canvasWidth < 560;
  modeButton.position(10, drawHeight + 9);
  quizButton.position(10 + (modeButton.elt.offsetWidth || 170) + 8, drawHeight + 9);
  sliderLeftMargin = small ? 165 : 250;
  eaSlider.position(sliderLeftMargin, drawHeight + 47);
  eaSlider.size(canvasWidth - sliderLeftMargin - 20);
  dhSlider.position(sliderLeftMargin, drawHeight + 82);
  dhSlider.size(canvasWidth - sliderLeftMargin - 20);
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
