// Electromagnetic Spectrum MicroSim
// CANVAS_HEIGHT: 640
// AP Chemistry - Chapter 3: Electron Configuration and Periodic Trends (Section 3.5)
// Learning objectives:
//   Remember:   identify the regions of the electromagnetic spectrum
//   Understand: compare the wavelength, frequency, and photon energy of
//               different kinds of radiation using c = (wavelength)(frequency)
//               and E = h(frequency)
//
// Physics model (constants from the AP Chemistry equation sheet):
//   c = 2.998 x 10^8 m/s        f = c / wavelength
//   h = 6.626 x 10^-34 J s      E = h f
//   1 eV = 1.602 x 10^-19 J
// Region boundaries are the usual textbook conventions; neighboring regions
// really blend into one another.

// ---- Layout constants -------------------------------------------------------
let canvasWidth = 800;
let drawHeight = 560;
let controlHeight = 80;          // two rows: wavelength slider, example menu
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 215;      // room for "Wavelength: 5.01 x 10^-7 m"
let defaultTextSize = 16;

// ---- Physical constants -----------------------------------------------------
const C_LIGHT = 2.998e8;         // m/s
const PLANCK = 6.626e-34;        // J s
const EV = 1.602e-19;            // J per eV

// ---- Spectrum scale ---------------------------------------------------------
// Horizontal axis is log10(wavelength in meters); long wavelengths on the left.
const LOG_MAX = 3;               // 10^3 m (left edge)
const LOG_MIN = -13;             // 10^-13 m (right edge)
const VIS_LONG = 700e-9;         // red end of visible light, m
const VIS_SHORT = 400e-9;        // violet end of visible light, m

// Each region: long-wavelength limit (m), short-wavelength limit (m)
const REGIONS = [
  { name: 'Radio waves', short: 'Radio', hi: 1e3, lo: 1, color: 'thistle',
    range: 'longer than 1 m',
    matter: 'Flips nuclear spins in a magnetic field (the basis of NMR and MRI). Far too little energy to disturb electrons or bonds.',
    uses: 'AM and FM radio, television, MRI scanners' },
  { name: 'Microwaves', short: 'Microwave', hi: 1, lo: 1e-3, color: 'lightblue',
    range: '1 mm to 1 m',
    matter: 'Makes molecules rotate faster.',
    uses: 'microwave ovens, cell phones, Wi-Fi, radar' },
  { name: 'Infrared', short: 'Infrared', hi: 1e-3, lo: VIS_LONG, color: 'peachpuff',
    range: '700 nm to 1 mm',
    matter: 'Makes chemical bonds vibrate (stretch and bend). We feel it as heat.',
    uses: 'heat lamps, remote controls, thermal cameras' },
  { name: 'Visible light', short: 'Visible', hi: VIS_LONG, lo: VIS_SHORT, color: 'white',
    range: 'about 400 nm to 700 nm',
    matter: 'Moves valence electrons between energy levels. Atoms emit these colors in their line spectra.',
    uses: 'human vision, photography, flame tests' },
  { name: 'Ultraviolet', short: 'UV', hi: VIS_SHORT, lo: 1e-8, color: 'plum',
    range: '10 nm to 400 nm',
    matter: 'Excites valence electrons and can break chemical bonds. The shortest wavelengths can ionize atoms.',
    uses: 'sterilizing lamps, sunburn, fluorescence' },
  { name: 'X-rays', short: 'X-ray', hi: 1e-8, lo: 1e-11, color: 'palegreen',
    range: '0.01 nm to 10 nm',
    matter: 'Ejects tightly held core electrons. Ionizing radiation.',
    uses: 'medical and dental imaging, X-ray crystallography' },
  { name: 'Gamma rays', short: 'Gamma', hi: 1e-11, lo: 1e-13, color: 'khaki',
    range: 'shorter than 0.01 nm',
    matter: 'Released by changes inside atomic nuclei. The most energetic ionizing radiation.',
    uses: 'nuclear medicine, cancer radiation therapy' }
];

// Example sources: label and wavelength in meters
const EXAMPLES = [
  { label: 'AM radio station (1000 kHz)', lambda: C_LIGHT / 1.0e6 },
  { label: 'FM radio station (100 MHz)', lambda: C_LIGHT / 1.0e8 },
  { label: 'Microwave oven (2.45 GHz)', lambda: C_LIGHT / 2.45e9 },
  { label: 'Thermal infrared (10 µm)', lambda: 1.0e-5 },
  { label: 'Red light (700 nm)', lambda: 700e-9 },
  { label: 'Green light (550 nm)', lambda: 550e-9 },
  { label: 'Violet light (400 nm)', lambda: 400e-9 },
  { label: 'Germicidal UV lamp (254 nm)', lambda: 254e-9 },
  { label: 'Medical X-ray (0.02 nm)', lambda: 2.0e-11 },
  { label: 'Gamma ray, Tc-99m tracer (140 keV)', lambda: PLANCK * C_LIGHT / (1.40e5 * EV) }
];

// ---- State ------------------------------------------------------------------
let wavelength = 550e-9;         // current wavelength in meters
let wavelengthSlider, exampleSelect;

// geometry shared between draw() and the mouse handlers
let barX, barW, barY = 70, barH = 46;
let insetX, insetW, insetY = 142, insetH = 22;
const RULER_Y = [214, 268, 322]; // y of the three ruler lines

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  // Row 1: logarithmic wavelength slider. Slider value s maps to
  // log10(wavelength) = LOG_MAX - s / 100, so sliding right shortens the wavelength.
  wavelengthSlider = createSlider(0, (LOG_MAX - LOG_MIN) * 100, sliderFromWavelength(wavelength), 1);
  wavelengthSlider.parent(mainElement);
  wavelengthSlider.position(sliderLeftMargin, drawHeight + 8);
  wavelengthSlider.size(canvasWidth - sliderLeftMargin - margin);
  wavelengthSlider.input(sliderMoved);
  wavelengthSlider.attribute('aria-label', 'Wavelength on a logarithmic scale');

  // Row 2: example sources
  exampleSelect = createSelect();
  exampleSelect.parent(mainElement);
  exampleSelect.option('Choose an example...', -1);
  for (let i = 0; i < EXAMPLES.length; i++) {
    exampleSelect.option(EXAMPLES[i].label, i);
  }
  exampleSelect.selected(5);          // green light, the default wavelength
  exampleSelect.position(90, drawHeight + 45);
  exampleSelect.changed(exampleChosen);

  describe('Electromagnetic spectrum from radio waves to gamma rays drawn on a logarithmic wavelength scale, with matching frequency and photon energy rulers and a magnified view of visible light. A slider or example menu moves a marker; a panel shows the region, its wavelength range, how it interacts with matter, and the calculated frequency and photon energy.', LABEL);
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

  barX = margin;
  barW = canvasWidth - 2 * margin;
  insetW = min(360, barW * 0.62);
  insetX = constrain(xOfLambda(Math.sqrt(VIS_LONG * VIS_SHORT)) - insetW / 2, barX, barX + barW - insetW);

  // Title
  noStroke();
  fill('black');
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  textSize(canvasWidth < 500 ? 20 : 24);
  text('Electromagnetic Spectrum', canvasWidth / 2, 10);

  drawDirectionArrows();
  drawRegionBar();
  drawVisibleInset();
  drawRulers();
  drawMarker();
  drawInfoPanel();
  drawControlLabels();
}

// ---- Coordinate helpers -----------------------------------------------------
function xOfLog(logLambda) {
  return barX + (LOG_MAX - logLambda) / (LOG_MAX - LOG_MIN) * barW;
}

function xOfLambda(lambda) {
  return xOfLog(Math.log10(lambda));
}

function sliderFromWavelength(lambda) {
  return Math.round((LOG_MAX - Math.log10(lambda)) * 100);
}

function regionOf(lambda) {
  // the visible limits (400 nm and 700 nm) count as visible light
  if (lambda <= VIS_LONG && lambda >= VIS_SHORT) return REGIONS[3];
  for (let r of REGIONS) {
    if (lambda <= r.hi && lambda >= r.lo) return r;
  }
  return lambda > 1 ? REGIONS[0] : REGIONS[REGIONS.length - 1];
}

// ---- Drawing ----------------------------------------------------------------
function drawDirectionArrows() {
  const y = 50;
  const small = canvasWidth < 560;
  const fs = small ? 12 : 14;
  const mid = canvasWidth / 2;
  // left: longer wavelength
  stroke('dimgray');
  strokeWeight(2);
  line(barX + 8, y, mid - 14, y);
  drawArrowHead(barX, y, PI, 'dimgray', 10);
  // right: higher frequency and energy
  stroke('dimgray');
  strokeWeight(2);
  line(mid + 14, y, barX + barW - 8, y);
  drawArrowHead(barX + barW, y, 0, 'dimgray', 10);
  // captions sit on aliceblue patches over the lines
  noStroke();
  textStyle(NORMAL);
  textSize(fs);
  const leftText = small ? 'longer wavelength' : 'longer wavelength';
  const rightText = small ? 'higher f and energy' : 'higher frequency and energy';
  const lw = textWidth(leftText) + 12;
  const rw = textWidth(rightText) + 12;
  const lx = barX + barW * 0.25;
  const rx = barX + barW * 0.75;
  fill('aliceblue');
  rect(lx - lw / 2, y - 9, lw, 18);
  rect(rx - rw / 2, y - 9, rw, 18);
  fill('black');
  textAlign(CENTER, CENTER);
  text(leftText, lx, y);
  text(rightText, rx, y);
}

function drawRegionBar() {
  const small = canvasWidth < 620;
  const current = regionOf(wavelength);
  for (let r of REGIONS) {
    const x1 = xOfLambda(r.hi);
    const x2 = xOfLambda(r.lo);
    const hovered = mouseY >= barY && mouseY <= barY + barH && mouseX >= x1 && mouseX < x2;
    if (r.short === 'Visible') {
      drawRainbow(x1, barY, x2 - x1, barH);
      noFill();
    } else {
      fill(r.color);
    }
    stroke(r === current ? 'black' : 'gray');
    strokeWeight(r === current ? 3 : (hovered ? 2 : 1));
    rect(x1, barY, x2 - x1, barH);

    noStroke();
    fill('black');
    textStyle(r === current ? BOLD : NORMAL);
    if (r.short === 'Visible') continue;   // labeled below, next to the magnified view
    const label = small ? r.short : r.name;
    let fs = small ? 12 : 15;
    textSize(fs);
    while (textWidth(label) > x2 - x1 - 6 && fs > 9) {
      fs -= 1;
      textSize(fs);
    }
    textAlign(CENTER, CENTER);
    text(label, (x1 + x2) / 2, barY + barH / 2);
  }
  textStyle(NORMAL);
}

// Rainbow from red (700 nm, left) to violet (400 nm, right)
function drawRainbow(x, y, w, h) {
  noStroke();
  const steps = max(2, Math.ceil(w));
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const nm = 700 - t * 300;
    fill(colorOfWavelength(nm));
    rect(x + (w * i) / steps, y, w / steps + 1, h);
  }
}

// Approximate RGB color of a visible wavelength in nm (piecewise-linear model)
function colorOfWavelength(nm) {
  let r = 0, g = 0, b = 0;
  if (nm >= 380 && nm < 440) { r = (440 - nm) / 60; b = 1; }
  else if (nm >= 440 && nm < 490) { g = (nm - 440) / 50; b = 1; }
  else if (nm >= 490 && nm < 510) { g = 1; b = (510 - nm) / 20; }
  else if (nm >= 510 && nm < 580) { r = (nm - 510) / 70; g = 1; }
  else if (nm >= 580 && nm < 645) { r = 1; g = (645 - nm) / 65; }
  else if (nm >= 645 && nm <= 780) { r = 1; }
  // eye sensitivity falls off toward both ends of the visible range
  let k = 1;
  if (nm > 700) k = 0.3 + 0.7 * (780 - nm) / 80;
  else if (nm < 420) k = 0.3 + 0.7 * (nm - 380) / 40;
  return color(255 * r * k, 255 * g * k, 255 * b * k);
}

function drawVisibleInset() {
  const small = canvasWidth < 560;
  const vx1 = xOfLambda(VIS_LONG);
  const vx2 = xOfLambda(VIS_SHORT);
  // connector lines from the thin visible band to the magnified strip
  stroke('gray');
  strokeWeight(1);
  line(vx1, barY + barH, insetX, insetY);
  line(vx2, barY + barH, insetX + insetW, insetY);

  drawRainbow(insetX, insetY, insetW, insetH);
  noFill();
  stroke(regionOf(wavelength).short === 'Visible' ? 'black' : 'gray');
  strokeWeight(regionOf(wavelength).short === 'Visible' ? 3 : 1);
  rect(insetX, insetY, insetW, insetH);

  // nm ticks: 700 on the left to 400 on the right
  noStroke();
  fill('black');
  textStyle(NORMAL);
  textSize(small ? 11 : 13);
  textAlign(CENTER, TOP);
  for (let nm = 700; nm >= 400; nm -= (small ? 100 : 50)) {
    const x = insetX + (700 - nm) / 300 * insetW;
    stroke('black');
    strokeWeight(1);
    line(x, insetY + insetH, x, insetY + insetH + 4);
    noStroke();
    text(nm + ' nm', x, insetY + insetH + 6);
  }
  // caption to the left (or above when there is no room)
  textStyle(BOLD);
  textSize(small ? 12 : 14);
  const caption = 'Visible light, magnified';
  if (insetX - barX > textWidth(caption) + 12) {
    textAlign(RIGHT, CENTER);
    text(caption, insetX - 10, insetY + insetH / 2);
  } else {
    textAlign(CENTER, BOTTOM);
    text(caption, insetX + insetW / 2, insetY - 2);
  }
  textStyle(NORMAL);
}

function drawRulers() {
  const small = canvasWidth < 560;
  const names = ['Wavelength (m)', 'Frequency (Hz)', 'Photon energy (eV)'];
  const labelSize = small ? 12 : 14;
  for (let k = 0; k < 3; k++) {
    const y = RULER_Y[k];
    // ruler name
    noStroke();
    fill('navy');
    textStyle(BOLD);
    textSize(small ? 12 : 14);
    textAlign(LEFT, BOTTOM);
    text(names[k], barX, y - 7);
    textStyle(NORMAL);
    // ruler line
    stroke('black');
    strokeWeight(1.5);
    line(barX, y, barX + barW, y);

    // ticks at every power of ten of the quantity on this ruler
    for (let p = -12; p <= 22; p++) {
      let logLambda;
      if (k === 0) logLambda = p;                                            // wavelength = 10^p m
      if (k === 1) logLambda = Math.log10(C_LIGHT) - p;                      // f = 10^p Hz
      if (k === 2) logLambda = Math.log10(PLANCK * C_LIGHT / EV) - p;        // E = 10^p eV
      if (logLambda > LOG_MAX + 1e-9 || logLambda < LOG_MIN - 1e-9) continue;
      const x = xOfLog(logLambda);
      const major = ((p % 3) + 3) % 3 === 0;
      stroke('black');
      strokeWeight(1);
      line(x, y, x, y + (major ? 8 : 4));
      if (major) {
        noStroke();
        fill('black');
        const label = p === 0 ? '1' : '10^{' + p + '}';
        // keep the end labels inside the canvas
        let lx = x;
        const half = richWidth(label, labelSize) / 2;
        lx = constrain(lx, 4 + half, canvasWidth - 4 - half);
        drawRich(label, lx, y + 17, labelSize, CENTER);
      }
    }
  }
}

function drawMarker() {
  const x = xOfLambda(wavelength);
  const top = barY - 9;
  const bottom = RULER_Y[2] + 8;
  // the marker is not drawn across the magnified visible strip and its labels
  stroke('crimson');
  strokeWeight(2);
  line(x, top, x, barY + barH + 2);
  if (x < insetX - 24 || x > insetX + insetW + 24) {
    drawingContext.setLineDash([4, 4]);
    line(x, barY + barH + 2, x, RULER_Y[0] - 24);
    drawingContext.setLineDash([]);
  }
  line(x, RULER_Y[0] - 24, x, bottom);
  drawArrowHead(x, barY - 1, HALF_PI, 'crimson', 10);
  // dots where the marker crosses each ruler
  noStroke();
  fill('crimson');
  for (let k = 0; k < 3; k++) {
    circle(x, RULER_Y[k], 8);
  }
  // marker on the magnified strip when the wavelength is visible
  if (wavelength <= VIS_LONG && wavelength >= VIS_SHORT) {
    const nm = wavelength * 1e9;
    const ix = insetX + (700 - nm) / 300 * insetW;
    stroke('black');
    strokeWeight(3);
    line(ix, insetY - 4, ix, insetY + insetH + 4);
    stroke('white');
    strokeWeight(1);
    line(ix, insetY - 4, ix, insetY + insetH + 4);
  }
}

function drawInfoPanel() {
  const px = margin - 8;
  const py = 352;
  const pw = canvasWidth - 2 * px;
  const ph = drawHeight - py - 10;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(px, py, pw, ph, 10);

  const small = canvasWidth < 640;
  const fs = small ? 12 : 15;
  const lh = fs + 6;
  const region = regionOf(wavelength);
  const f = C_LIGHT / wavelength;          // f = c / wavelength
  const E = PLANCK * f;                    // E = h f
  const eV = E / EV;

  // ---- left column: the region --------------------------------------------
  const colGap = 16;
  const leftW = pw * (small ? 0.5 : 0.52) - colGap;
  const lx = px + 12;
  let y = py + 12;

  // region name with a color chip
  if (region.short === 'Visible') {
    stroke('gray');
    strokeWeight(1);
    fill(colorOfWavelength(wavelength * 1e9));
  } else {
    stroke('gray');
    strokeWeight(1);
    fill(region.color);
  }
  rect(lx, y, 18, 18, 4);
  noStroke();
  fill('black');
  textStyle(BOLD);
  textSize(small ? 15 : 18);
  textAlign(LEFT, CENTER);
  text(region.name, lx + 26, y + 10);
  y += 28;

  textSize(fs);
  y = drawLabeledParagraph('Range: ', region.range, lx, y, leftW, lh);
  y = drawLabeledParagraph('Effect on matter: ', region.matter, lx, y, leftW, lh);
  y = drawLabeledParagraph('Uses: ', region.uses, lx, y, leftW, lh);

  // ---- right column: the numbers ------------------------------------------
  const rx = px + pw * (small ? 0.5 : 0.52) + 4;
  let ry = py + 20;
  const vfs = small ? 12 : 16;
  const vlh = vfs + 11;
  // divider
  stroke('gainsboro');
  strokeWeight(1);
  line(rx - 10, py + 10, rx - 10, py + ph - 10);

  // each line is a prefix in normal weight followed by the value in bold
  drawValueLine('λ = ', friendlyWavelength(wavelength), '  = ' + sci(wavelength) + ' m', rx, ry, vfs);
  ry += vlh;
  drawValueLine('f = c ÷ λ = ', sci(f) + ' Hz', '', rx, ry, vfs);
  ry += vlh;
  drawValueLine('E = h f = ', sci(E) + ' J', '', rx, ry, vfs);
  ry += vlh;
  drawValueLine('    = ', friendlyEV(eV) + ' eV', ' per photon', rx, ry, vfs);
  ry += vlh + 2;

  fill('dimgray');
  const cfs = small ? 10 : 13;
  if (small) {
    drawRich('c = 2.998 × 10^{8} m/s', rx, ry, cfs, LEFT);
    drawRich('h = 6.626 × 10^{-34} J s', rx, ry + cfs + 5, cfs, LEFT);
  } else {
    drawRich('c = 2.998 × 10^{8} m/s     h = 6.626 × 10^{-34} J s', rx, ry, cfs, LEFT);
  }
}

// One line of the numbers column: normal prefix, bold value, gray suffix
function drawValueLine(prefix, value, suffix, x, y, size) {
  textStyle(NORMAL);
  const prefixW = richWidth(prefix, size);
  fill('black');
  drawRich(prefix, x, y, size, LEFT);
  textStyle(BOLD);
  const valueW = richWidth(value, size);
  drawRich(value, x + prefixW, y, size, LEFT);
  textStyle(NORMAL);
  if (suffix !== '') {
    fill('dimgray');
    drawRich(suffix, x + prefixW + valueW, y, size, LEFT);
  }
  fill('black');
}

// Bold label followed by word-wrapped text; returns the y for the next paragraph
function drawLabeledParagraph(label, body, x, y, w, lh) {
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text(label, x, y);
  const labelW = textWidth(label);
  textStyle(NORMAL);
  const words = body.split(' ');
  let line = '';
  let cx = x + labelW;
  let avail = w - labelW;
  for (let i = 0; i < words.length; i++) {
    const test = line === '' ? words[i] : line + ' ' + words[i];
    if (textWidth(test) > avail && line !== '') {
      text(line, cx, y);
      y += lh;
      cx = x;
      avail = w;
      line = words[i];
    } else {
      line = test;
    }
  }
  if (line !== '') {
    text(line, cx, y);
    y += lh;
  }
  return y + 4;
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

// ---- Number formatting ------------------------------------------------------
// Three significant figures in scientific notation, as rich text
function sci(x) {
  let e = Math.floor(Math.log10(x));
  let m = x / Math.pow(10, e);
  let ms = m.toFixed(2);
  if (Number(ms) >= 10) { e += 1; ms = (m / 10).toFixed(2); }
  if (e === 0) return ms;
  return ms + ' × 10^{' + e + '}';
}

function friendlyWavelength(lambda) {
  const units = [
    { f: 1e3, u: 'km' }, { f: 1, u: 'm' }, { f: 1e-2, u: 'cm' }, { f: 1e-3, u: 'mm' },
    { f: 1e-6, u: 'µm' }, { f: 1e-9, u: 'nm' }, { f: 1e-12, u: 'pm' }
  ];
  for (let un of units) {
    // 0.9995 so that a value which rounds up to 1.00 uses the larger unit
    if (lambda >= un.f * 0.9995) {
      return trim3(lambda / un.f) + ' ' + un.u;
    }
  }
  return trim3(lambda / 1e-12) + ' pm';
}

function friendlyEV(eV) {
  if (eV >= 0.01 && eV < 1000) return trim3(eV);
  return sci(eV);
}

// Three significant figures without exponent notation (for values from 0.01 to 999)
function trim3(v) {
  const s = v.toPrecision(3);
  return s.indexOf('e') === -1 ? s : String(Math.round(v));
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
  drawRich('Wavelength: ' + sci(wavelength) + ' m', 10, drawHeight + 19, defaultTextSize, LEFT);
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Example:', 10, drawHeight + 57);
}

function sliderMoved() {
  wavelength = Math.pow(10, LOG_MAX - wavelengthSlider.value() / 100);
  exampleSelect.selected(-1);
}

function exampleChosen() {
  const i = int(exampleSelect.value());
  if (i < 0) return;
  wavelength = EXAMPLES[i].lambda;
  wavelengthSlider.value(sliderFromWavelength(wavelength));
}

// Click or drag on the spectrum bar, the rulers, or the magnified strip
function mousePressed() {
  pickWavelength();
}

function mouseDragged() {
  pickWavelength();
}

function pickWavelength() {
  if (barX === undefined || mouseY > drawHeight) return;
  // magnified visible strip
  if (mouseY >= insetY - 2 && mouseY <= insetY + insetH + 2 && mouseX >= insetX && mouseX <= insetX + insetW) {
    const nm = 700 - (mouseX - insetX) / insetW * 300;
    wavelength = constrain(nm, 400, 700) * 1e-9;
  } else if (mouseX >= barX && mouseX <= barX + barW &&
    ((mouseY >= barY - 10 && mouseY <= barY + barH) || (mouseY >= RULER_Y[0] - 24 && mouseY <= RULER_Y[2] + 24))) {
    const logLambda = LOG_MAX - (mouseX - barX) / barW * (LOG_MAX - LOG_MIN);
    wavelength = Math.pow(10, constrain(logLambda, LOG_MIN, LOG_MAX));
  } else {
    return;
  }
  wavelengthSlider.value(sliderFromWavelength(wavelength));
  exampleSelect.selected(-1);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = max(320, container.offsetWidth);
    if (typeof wavelengthSlider !== 'undefined' && wavelengthSlider) {
      wavelengthSlider.size(canvasWidth - sliderLeftMargin - margin);
    }
  }
}
