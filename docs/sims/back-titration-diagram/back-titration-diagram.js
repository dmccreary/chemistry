// Back Titration Step by Step MicroSim
// CANVAS_HEIGHT: 580
// AP Chemistry - Chapter 9: Stoichiometry, Titrations, and Analysis (Section 9.5)
// Learning objective (Bloom: Evaluate, with Apply for the calculation): Students
// will judge when a back titration is preferable to a direct titration and
// correctly apply the subtraction calculation.
//
// The worked example is the one in the chapter text: a 1.250 g antacid tablet
// (CaCO3 plus inactive fillers) is treated with 50.00 mL of 0.5000 M HCl, and the
// leftover HCl is titrated with 0.2500 M NaOH.
//   CaCO3 + 2 HCl = CaCl2 + H2O + CO2       (2 mol HCl per mol CaCO3)
//   HCl + NaOH = NaCl + H2O                 (1 to 1)
//   n(HCl added)   = M x V
//   n(HCl excess)  = n(NaOH) = M x V
//   n(HCl reacted) = n(HCl added) - n(HCl excess)
//   n(CaCO3)       = n(HCl reacted) / 2
// With 20.00 mL of NaOH: 0.02500 - 0.005000 = 0.02000 mol HCl reacted,
// 0.01000 mol CaCO3, 1.0009 g, 80.07% of the tablet.

// ---- Layout constants -------------------------------------------------------
let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 80;          // two rows: step buttons; NaOH volume slider
let canvasHeight = drawHeight + controlHeight;
let margin = 12;
let defaultTextSize = 16;
let sliderLeftMargin = 250;

// ---- Chemistry constants (chapter worked example) ------------------------------
const TABLET_MASS = 1.250;       // g
const HCL_MOLARITY = 0.5000;     // mol/L
const HCL_VOLUME = 50.00;        // mL
const NAOH_MOLARITY = 0.2500;    // mol/L
const M_CACO3 = 100.09;          // g/mol
const HCL_PER_CACO3 = 2;         // mole ratio from the balanced equation
const NAOH_DEFAULT = 20.00;      // mL
const NAOH_MIN = 5.00;           // mL (keeps the purity below 100%)
const NAOH_MAX = 40.00;          // mL

const SCENE_TOP = 44;
const SCENE_HEIGHT = 196;
const STEP_COLORS = ['lightblue', 'lightgreen', 'khaki', 'bisque'];
const STEP_TITLES = ['Weigh the sample', 'Add excess HCl', 'Titrate the excess', 'Calculate'];

// Text for the strip under the pictures: a sentence, then a second line that is
// either a sentence or a chemical equation {left, right}
const STEP_NOTES = [
  { text: 'CaCO_{3} is a solid that does not dissolve in water and reacts too slowly for a sharp endpoint.',
    second: 'A direct titration will not work, so use a back titration.' },
  { text: 'Add more standard HCl than the CaCO_{3} can use up. The reaction finishes and some HCl is left over.',
    equation: { left: 'CaCO_{3} + 2HCl', right: 'CaCl_{2} + H_{2}O + CO_{2}' } },
  { text: 'Titrate the leftover HCl with standard NaOH. This measures the HCl that did not react.',
    equation: { left: 'HCl + NaOH', right: 'NaCl + H_{2}O' } },
  { text: 'Subtract to find the HCl that reacted, then use the 2 to 1 mole ratio to find the CaCO_{3}.',
    second: 'More NaOH at the endpoint means more HCl was left over, so less CaCO_{3} was in the tablet.' }
];

// ---- State ------------------------------------------------------------------
let prevButton, nextButton, volumeSlider;
let currentStep = 1;             // 1 to 4

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  prevButton = createButton('Previous Step');
  prevButton.parent(mainElement);
  prevButton.mousePressed(previousStep);

  nextButton = createButton('Next Step');
  nextButton.parent(mainElement);
  nextButton.mousePressed(nextStep);

  volumeSlider = createSlider(NAOH_MIN, NAOH_MAX, NAOH_DEFAULT, 0.05);
  volumeSlider.parent(mainElement);
  volumeSlider.attribute('aria-label', 'Volume of NaOH needed to reach the endpoint, in milliliters');

  positionControls();
  updateButtons();

  describe('Back titration shown as four steps. Three flask pictures show an antacid tablet being weighed, an excess of hydrochloric acid being added, and the leftover acid being titrated with sodium hydroxide from a burette. A calculation panel then finds the moles of acid that reacted by subtraction and the mass and percent of calcium carbonate in the tablet. Buttons step through the procedure and a slider changes the volume of sodium hydroxide at the endpoint.', LABEL);
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
  text('Back Titration Step by Step', canvasWidth / 2, 10);

  const calc = calculate();
  drawScenes(calc);
  drawNote();
  drawCalculation(calc);
  drawControlLabels(calc);
}

// ---- Calculation ------------------------------------------------------------
function calculate() {
  const vNaOH = Math.round(volumeSlider.value() * 100) / 100;     // mL
  const nAdded = HCL_MOLARITY * HCL_VOLUME / 1000;                // mol HCl added
  const nNaOH = NAOH_MOLARITY * vNaOH / 1000;                     // mol NaOH used
  const nExcess = nNaOH;                                          // 1 to 1 with HCl
  const nReacted = nAdded - nExcess;                              // mol HCl that reacted
  const nCaCO3 = nReacted / HCL_PER_CACO3;
  const mass = nCaCO3 * M_CACO3;
  const purity = mass / TABLET_MASS * 100;
  return { vNaOH: vNaOH, nAdded: nAdded, nNaOH: nNaOH, nExcess: nExcess,
    nReacted: nReacted, nCaCO3: nCaCO3, mass: mass, purity: purity };
}

function sig4(x) {
  return x.toPrecision(4);
}

// ---- The three pictures -------------------------------------------------------
function sceneGeometry(i) {
  const gap = canvasWidth < 560 ? 16 : 34;        // space for the arrows between pictures
  const w = (canvasWidth - 2 * margin - 2 * gap) / 3;
  return { x: margin + i * (w + gap), y: SCENE_TOP, w: w, h: SCENE_HEIGHT, gap: gap };
}

function drawScenes(calc) {
  const small = canvasWidth < 560;
  for (let i = 0; i < 3; i++) {
    const g = sceneGeometry(i);
    const active = currentStep === i + 1;
    // panel
    stroke(active ? 'black' : 'silver');
    strokeWeight(active ? 3 : 1);
    fill(STEP_COLORS[i]);
    rect(g.x, g.y, g.w, g.h, 10);

    // step badge and title
    const badgeR = small ? 10 : 12;
    noStroke();
    fill('black');
    circle(g.x + 8 + badgeR, g.y + 8 + badgeR, badgeR * 2);
    fill('white');
    textStyle(BOLD);
    drawRich(String(i + 1), g.x + 8 + badgeR, g.y + 8 + badgeR, small ? 12 : 14, CENTER);
    fill('black');
    drawRichFit(STEP_TITLES[i], g.x + 14 + 2 * badgeR, g.y + 8 + badgeR, small ? 12 : 15, LEFT, g.w - 2 * badgeR - 20);
    textStyle(NORMAL);

    // flask
    const cx = g.x + g.w / 2;
    const flaskW = constrain(g.w * 0.42, 54, 96);
    const flaskH = 72;
    const flaskTop = g.y + 80;
    if (i === 0) {
      drawFlask(cx, flaskTop, flaskW, flaskH, 0, 'white');
      // tablet resting on the bottom
      stroke('gray');
      strokeWeight(1);
      fill('white');
      rect(cx - flaskW * 0.2, flaskTop + flaskH - 13, flaskW * 0.4, 10, 5);
      line(cx, flaskTop + flaskH - 13, cx, flaskTop + flaskH - 3);
      noStroke();
      fill('black');
      drawRichFit('solid tablet', cx, g.y + 56, small ? 11 : 13, CENTER, g.w - 10);
    } else if (i === 1) {
      drawFlask(cx, flaskTop, flaskW, flaskH, 0.5, 'paleturquoise');
      drawBubbles(cx, flaskTop, flaskW, flaskH);
      // acid being poured in: a short arrow into the neck
      stroke('dimgray');
      strokeWeight(3);
      line(cx, g.y + 46, cx, flaskTop - 12);
      noStroke();
      fill('dimgray');
      triangle(cx, flaskTop - 4, cx - 6, flaskTop - 14, cx + 6, flaskTop - 14);
      fill('black');
      drawRichFit('HCl', cx + 12, g.y + 54, small ? 11 : 13, LEFT, g.w / 2 - 14);
      drawRichFit('CO_{2}', cx - flaskW * 0.5 - 4, flaskTop + 8, small ? 10 : 12, RIGHT, g.w / 2 - flaskW / 2);
    } else {
      drawBurette(cx, g.y + 30, flaskTop, calc.vNaOH);
      drawFlask(cx, flaskTop, flaskW, flaskH, 0.62, 'pink');
      noStroke();
      fill('black');
      drawRichFit('NaOH', cx + 14, g.y + 46, small ? 11 : 13, LEFT, g.w / 2 - 16);
      fill('mediumvioletred');
      drawRichFit('pale pink', cx + flaskW * 0.5 + 3, flaskTop + flaskH - 26, small ? 10 : 12, LEFT, g.w / 2 - flaskW / 2 - 4);
      drawRichFit('endpoint', cx + flaskW * 0.5 + 3, flaskTop + flaskH - 12, small ? 10 : 12, LEFT, g.w / 2 - flaskW / 2 - 4);
    }

    // captions
    const capSize = small ? 11 : 14;
    const capY = flaskTop + flaskH + 15;
    noStroke();
    fill('black');
    let cap1, cap2;
    if (i === 0) {
      cap1 = TABLET_MASS.toFixed(3) + ' g antacid tablet';
      cap2 = 'CaCO_{3} plus inactive fillers';
    } else if (i === 1) {
      cap1 = HCL_VOLUME.toFixed(2) + ' mL of ' + HCL_MOLARITY.toFixed(4) + ' M HCl';
      cap2 = 'a known excess; some is left over';
    } else {
      cap1 = calc.vNaOH.toFixed(2) + ' mL of ' + NAOH_MOLARITY.toFixed(4) + ' M NaOH';
      cap2 = 'neutralizes the leftover HCl';
    }
    textStyle(BOLD);
    drawRichFit(cap1, cx, capY, capSize, CENTER, g.w - 8);
    textStyle(NORMAL);
    drawRichFit(cap2, cx, capY + capSize + 5, capSize - 1, CENTER, g.w - 8);

    // thick arrow to the next picture
    if (i < 2) {
      const ax = g.x + g.w + 3;
      const ay = g.y + g.h / 2;
      const aw = g.gap - 6;
      stroke('dimgray');
      strokeWeight(4);
      line(ax, ay, ax + aw - 9, ay);
      noStroke();
      fill('dimgray');
      triangle(ax + aw, ay, ax + aw - 11, ay - 8, ax + aw - 11, ay + 8);
    }
  }
}

// Erlenmeyer flask: liquid first, then the glass outline
function drawFlask(cx, top, w, h, liquidFraction, liquidColor) {
  const neckW = w * 0.3;
  const neckH = h * 0.3;
  const bottom = top + h;
  function halfWidth(y) {
    if (y <= top + neckH) return neckW / 2;
    return neckW / 2 + (w / 2 - neckW / 2) * (y - top - neckH) / (h - neckH);
  }
  if (liquidFraction > 0) {
    const level = bottom - liquidFraction * (h - neckH);
    noStroke();
    fill(liquidColor);
    beginShape();
    vertex(cx - halfWidth(level), level);
    vertex(cx - w / 2, bottom);
    vertex(cx + w / 2, bottom);
    vertex(cx + halfWidth(level), level);
    endShape(CLOSE);
  }
  stroke('dimgray');
  strokeWeight(2);
  noFill();
  beginShape();
  vertex(cx - neckW / 2, top);
  vertex(cx - neckW / 2, top + neckH);
  vertex(cx - w / 2, bottom);
  vertex(cx + w / 2, bottom);
  vertex(cx + neckW / 2, top + neckH);
  vertex(cx + neckW / 2, top);
  endShape();
  // rim
  line(cx - neckW / 2 - 3, top, cx + neckW / 2 + 3, top);
}

// Carbon dioxide bubbles rising through the acid and out of the neck
function drawBubbles(cx, top, w, h) {
  const spots = [[-0.22, 0.86, 5], [0.12, 0.8, 4], [0.28, 0.9, 5], [-0.05, 0.68, 6],
    [0.16, 0.6, 4], [-0.14, 0.52, 5], [0.02, 0.36, 5], [-0.03, 0.16, 4], [0.03, -0.04, 5], [-0.1, -0.2, 4]];
  stroke('gray');
  strokeWeight(1);
  fill('white');
  for (let i = 0; i < spots.length; i++) {
    circle(cx + spots[i][0] * w, top + spots[i][1] * h, spots[i][2]);
  }
}

// Burette above the flask; the liquid level drops as more NaOH is delivered
function drawBurette(cx, top, flaskTop, vNaOH) {
  const tubeW = 10;
  const tubeBottom = flaskTop - 16;
  const tubeH = tubeBottom - top;
  // liquid: full at 0 mL delivered, lower as the delivered volume rises (50 mL burette)
  const level = top + 3 + (tubeH - 6) * constrain(vNaOH / 50, 0, 1);
  noStroke();
  fill('lightcyan');
  rect(cx - tubeW / 2, level, tubeW, tubeBottom - level);
  stroke('dimgray');
  strokeWeight(1.5);
  noFill();
  rect(cx - tubeW / 2, top, tubeW, tubeH);
  // graduation marks
  strokeWeight(1);
  for (let k = 1; k < 5; k++) {
    const y = top + tubeH * k / 5;
    line(cx - tubeW / 2, y, cx - tubeW / 2 + 4, y);
  }
  // stopcock and tip
  strokeWeight(2);
  line(cx - 8, tubeBottom + 3, cx + 8, tubeBottom + 3);
  strokeWeight(1.5);
  line(cx, tubeBottom, cx, tubeBottom + 10);
  // one drop falling into the neck
  noStroke();
  fill('steelblue');
  ellipse(cx, tubeBottom + 17, 4, 6);
}

// ---- Explanation strip for the current step ---------------------------------------
function drawNote() {
  const small = canvasWidth < 560;
  const x = margin;
  const y = SCENE_TOP + SCENE_HEIGHT + 8;
  const w = canvasWidth - 2 * margin;
  const h = 50;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(x, y, w, h, 8);
  noStroke();
  fill(STEP_COLORS[currentStep - 1]);
  rect(x, y, 8, h, 8, 0, 0, 8);

  const note = STEP_NOTES[currentStep - 1];
  const fs = small ? 12 : 15;
  noStroke();
  fill('black');
  textStyle(BOLD);
  const lead = 'Step ' + currentStep + ': ';
  drawRich(lead, x + 16, y + 15, fs, LEFT);
  const leadW = richWidth(lead, fs);
  textStyle(NORMAL);
  drawRichFit(note.text, x + 16 + leadW, y + 15, fs, LEFT, w - 28 - leadW);
  if (note.equation) {
    drawReaction(note.equation.left, note.equation.right, x + w / 2, y + 36, fs, w - 30);
  } else {
    fill('dimgray');
    drawRichFit(note.second, x + 16 + leadW, y + 36, fs, LEFT, w - 28 - leadW);
  }
}

// A chemical equation with the reaction arrow drawn as a shape
function drawReaction(left, right, cx, y, size, maxWidth) {
  let fs = size;
  function total(s) { return richWidth(left, s) + richWidth(right, s) + s * 2.6; }
  while (total(fs) > maxWidth && fs > 8) fs -= 0.5;
  let x = cx - total(fs) / 2;
  noStroke();
  fill('black');
  drawRich(left, x, y, fs, LEFT);
  x += richWidth(left, fs);
  const aw = fs * 2.6;
  stroke('black');
  strokeWeight(1.5);
  line(x + fs * 0.5, y, x + aw - fs * 0.8, y);
  noStroke();
  fill('black');
  triangle(x + aw - fs * 0.5, y, x + aw - fs * 1.0, y - fs * 0.26, x + aw - fs * 1.0, y + fs * 0.26);
  x += aw;
  drawRich(right, x, y, fs, LEFT);
}

// ---- Step 4: the calculation ---------------------------------------------------------
function drawCalculation(calc) {
  const small = canvasWidth < 560;
  const x = margin;
  const y = SCENE_TOP + SCENE_HEIGHT + 66;
  const w = canvasWidth - 2 * margin;
  const h = drawHeight - y - 8;
  const active = currentStep === 4;
  stroke(active ? 'black' : 'silver');
  strokeWeight(active ? 3 : 1);
  fill(STEP_COLORS[3]);
  rect(x, y, w, h, 10);

  // badge, title, and the general relationship
  const badgeR = small ? 10 : 12;
  noStroke();
  fill('black');
  circle(x + 8 + badgeR, y + 8 + badgeR, badgeR * 2);
  fill('white');
  textStyle(BOLD);
  drawRich('4', x + 8 + badgeR, y + 8 + badgeR, small ? 12 : 14, CENTER);
  fill('black');
  const titleSize = small ? 12 : 15;
  drawRich(STEP_TITLES[3], x + 14 + 2 * badgeR, y + 8 + badgeR, titleSize, LEFT);
  const titleW = richWidth(STEP_TITLES[3], titleSize) + 2 * badgeR + 30;
  textStyle(NORMAL);
  fill('saddlebrown');
  drawRichFit('n(analyte) = [ n(A added) ' + '−' + ' n(A excess) ] × mole ratio',
    x + w - 12, y + 8 + badgeR, small ? 11 : 14, RIGHT, w - titleW - 14);

  const va = (HCL_VOLUME / 1000).toFixed(5);
  const vb = (calc.vNaOH / 1000).toFixed(5);
  const lines = [
    { step: 2, label: 'n(HCl added)',
      work: ' = ' + HCL_MOLARITY.toFixed(4) + ' mol/L × ' + va + ' L',
      result: ' = ' + sig4(calc.nAdded) + ' mol' },
    { step: 3, label: 'n(HCl excess)',
      work: ' = n(NaOH) = ' + NAOH_MOLARITY.toFixed(4) + ' mol/L × ' + vb + ' L',
      result: ' = ' + sig4(calc.nExcess) + ' mol' },
    { step: 4, label: 'n(HCl reacted)',
      work: ' = ' + sig4(calc.nAdded) + ' mol − ' + sig4(calc.nExcess) + ' mol',
      result: ' = ' + sig4(calc.nReacted) + ' mol' },
    { step: 4, label: 'n(CaCO_{3})',
      work: ' = ' + sig4(calc.nReacted) + ' mol HCl × (1 mol CaCO_{3} ÷ 2 mol HCl)',
      result: ' = ' + sig4(calc.nCaCO3) + ' mol' },
    { step: 4, label: 'mass of CaCO_{3}',
      work: ' = ' + sig4(calc.nCaCO3) + ' mol × ' + M_CACO3.toFixed(2) + ' g/mol',
      result: ' = ' + calc.mass.toFixed(4) + ' g' },
    { step: 4, label: 'percent of tablet',
      work: ' = ' + calc.mass.toFixed(4) + ' g ÷ ' + TABLET_MASS.toFixed(3) + ' g × 100',
      result: ' = ' + calc.purity.toFixed(2) + '%' }
  ];

  const fs = small ? 11.5 : 15;
  const top = y + 2 * badgeR + 22;
  const lineH = (y + h - 8 - top) / lines.length;
  const left = x + 14;
  const avail = w - 28;
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];
    const ly = top + lineH * i + lineH / 2;
    const shown = currentStep >= ln.step;
    const full = ln.label + (shown ? ln.work + ln.result : ' = ?');
    // shrink the whole line if it is too long for the panel
    let size = fs;
    while (richWidth(full, size) > avail && size > 8) size -= 0.5;
    noStroke();
    textStyle(BOLD);
    fill(shown ? 'black' : 'dimgray');
    drawRich(ln.label, left, ly, size, LEFT);
    let cx = left + richWidth(ln.label, size);
    textStyle(NORMAL);
    if (shown) {
      fill('black');
      drawRich(ln.work, cx, ly, size, LEFT);
      cx += richWidth(ln.work, size);
      textStyle(BOLD);
      fill('darkgreen');
      drawRich(ln.result, cx, ly, size, LEFT);
      textStyle(NORMAL);
    } else {
      fill('dimgray');
      drawRich(' = ?   (step ' + ln.step + ')', cx, ly, size, LEFT);
    }
  }
}

// ---- Controls ---------------------------------------------------------------
function drawControlLabels(calc) {
  const small = canvasWidth < 560;
  noStroke();
  fill('black');
  textStyle(NORMAL);
  const fs = small ? 13 : 16;
  const bw = stepButtonsWidth();
  drawRich('Step ' + currentStep + ' of 4', 10 + bw + 12, drawHeight + 21, fs, LEFT);
  drawRich((small ? 'NaOH: ' : 'NaOH at endpoint: ') + calc.vNaOH.toFixed(2) + ' mL', 10, drawHeight + 57, fs, LEFT);
}

function stepButtonsWidth() {
  if (!prevButton) return 200;
  return (prevButton.elt.offsetWidth || 104) + 8 + (nextButton.elt.offsetWidth || 82);
}

function positionControls() {
  if (!prevButton) return;
  const small = canvasWidth < 560;
  prevButton.position(10, drawHeight + 9);
  nextButton.position(10 + (prevButton.elt.offsetWidth || 104) + 8, drawHeight + 9);
  sliderLeftMargin = small ? 130 : 250;
  volumeSlider.position(sliderLeftMargin, drawHeight + 46);
  volumeSlider.size(canvasWidth - sliderLeftMargin - 20);
}

function updateButtons() {
  if (!prevButton) return;
  if (currentStep === 1) prevButton.attribute('disabled', ''); else prevButton.removeAttribute('disabled');
  if (currentStep === 4) nextButton.attribute('disabled', ''); else nextButton.removeAttribute('disabled');
}

function previousStep() {
  if (currentStep > 1) currentStep--;
  updateButtons();
}

function nextStep() {
  if (currentStep < 4) currentStep++;
  updateButtons();
}

// Clicking a picture or the calculation panel jumps to that step
function mousePressed() {
  if (mouseY > drawHeight) return;
  for (let i = 0; i < 3; i++) {
    const g = sceneGeometry(i);
    if (mouseX >= g.x && mouseX <= g.x + g.w && mouseY >= g.y && mouseY <= g.y + g.h) {
      currentStep = i + 1;
      updateButtons();
      return;
    }
  }
  if (mouseY >= SCENE_TOP + SCENE_HEIGHT + 66) {
    currentStep = 4;
    updateButtons();
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
