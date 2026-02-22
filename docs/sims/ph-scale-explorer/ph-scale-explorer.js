/*
  Interactive pH Scale Explorer
  Drawing region (drawHeight = 520): pH gradient bar, pins, cursor, info panel
  Control region (controlHeight = 60): label+value text drawn on canvas, HTML slider
*/

let canvasWidth = 900;
let drawHeight = 460;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let sliderLeftMargin = 190;
const margin = 24;
// this is the rainbow bar area where we draw the gradient, pins, and cursor
const scaleRect = { x: margin, y: 100, width: 620, height: 70 };
let phSlider;
let currentPh = 7;

const pins = [
  { name: 'Battery acid',   ph: 0.5  },
  { name: 'Gastric acid',   ph: 1.5  },
  { name: 'Lemon juice',    ph: 2.4  },
  { name: 'Vinegar',        ph: 2.9  },
  { name: 'Coffee',         ph: 5.0  },
  { name: 'Rainwater',      ph: 5.6  },
  { name: 'Milk',           ph: 6.5  },
  { name: 'Pure water',     ph: 7.0  },
  { name: 'Blood',          ph: 7.4  },
  { name: 'Seawater',       ph: 8.1  },
  { name: 'Baking soda',    ph: 8.3  },
  { name: 'Egg whites',     ph: 9.0  },
  { name: 'Borax',          ph: 9.5  },
  { name: 'Mild detergent', ph: 10.5 },
  { name: 'Ammonia',        ph: 11.6 },
  { name: 'Bleach',         ph: 12.5 },
  { name: 'Drain cleaner',  ph: 13.5 }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const parent = document.querySelector('main');
  if (parent) canvas.parent(parent);
  textFont('Arial');

  phSlider = createSlider(0, 14, currentPh, 0.1);
  // the slider size will be updates when the window is resized, but we need an initial size here to avoid a flash of default width
  phSlider.size(280);
  phSlider.input(() => { currentPh = phSlider.value(); });

  describe('Drag the pH slider to compare real-world substances and compute [H+], [OH-], and pOH.');
}

function draw() {
  updateCanvasSize();
  fill('aliceblue');
  // light silver border around BOTH the drawing region and the control region for a unified look
  stroke('silver');
  rect(0, 0, canvasWidth, canvasHeight);
  // control region background
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawTitle();
  // this is the spectrum bar with gradient, tick marks, and labels
  drawPhScale();
  drawPins();
  drawCursor();
  drawInfoPanel();
  drawControlRegion();
  positionSlider();
}


// Draw white control background and label+value as a single text() call.
function drawControlRegion() {
  fill(getPhColor(currentPh));
  textSize(24);
  textAlign(LEFT, CENTER);
  text('Choose pH: ' + currentPh.toFixed(1), margin, drawHeight + controlHeight / 2);
}

// Position the HTML slider to the right of the label text.
function positionSlider() {
  const canvasEl = document.querySelector('main canvas');
  if (!canvasEl) return;
  const rect = canvasEl.getBoundingClientRect();
  phSlider.position(
    rect.left + window.scrollX + margin + sliderLeftMargin,
    rect.top + window.scrollY + drawHeight + 16
  );
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(28);
  text('Interactive pH Scale Explorer', canvasWidth / 2, 20);
}

function drawPhScale() {
  const barY = scaleRect.y;
  const barH = scaleRect.height;

  stroke('black');
  fill('white');
  rect(scaleRect.x, barY, scaleRect.width, barH, 12);

  for (let i = 0; i < scaleRect.width; i++) {
    stroke(getColorFromGradient(i / scaleRect.width));
    line(scaleRect.x + i, barY, scaleRect.x + i, barY + barH);
  }

  stroke('black');
  for (let ph = 0; ph <= 14; ph++) {
    const x = map(ph, 0, 14, scaleRect.x, scaleRect.x + scaleRect.width);
    line(x, barY + barH, x, barY + barH + 12);
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    text(ph, x, barY + barH + 16);
  }

  fill('black');
  noStroke();
  textAlign(LEFT, BOTTOM);
  textSize(18);
  text('pH scale (0 = acidic, 14 = basic)', scaleRect.x, barY - 12);
}

function drawPins() {
  pins.forEach(pin => {
    const x = map(pin.ph, 0, 14, scaleRect.x, scaleRect.x + scaleRect.width);
    noStroke();
    fill('black');
    circle(x, scaleRect.y + scaleRect.height / 2, 6);
  });
}

function drawCursor() {
  const x = map(currentPh, 0, 14, scaleRect.x, scaleRect.x + scaleRect.width);
  stroke(getPhColor(currentPh));
  strokeWeight(4);
  line(x, scaleRect.y - 10, x, scaleRect.y + scaleRect.height + 20);
  strokeWeight(1);
}

function drawInfoPanel() {
  const panelX = margin;
  const panelWidth = canvasWidth - margin * 2;
  const panelY = scaleRect.y + scaleRect.height + 50;
  const panelHeight = 220;

  stroke('lightgray');
  fill('white');
  rect(panelX, panelY, panelWidth, panelHeight, 14);

  fill(getPhColor(currentPh));
  textSize(48);
  textAlign(CENTER, TOP);
  text(currentPh.toFixed(1), panelX + panelWidth / 2, panelY + 25);

  const h = pow(10, -currentPh);
  const poh = 14 - currentPh;
  const oh = pow(10, -poh);
  const closest = pins.reduce((best, pin) => {
    const diff = abs(pin.ph - currentPh);
    return diff < best.diff ? { pin, diff } : best;
  }, { pin: pins[0], diff: abs(pins[0].ph - currentPh) }).pin;

  const lines = [
    `[H⁺] = ${formatSci(h)} M`,
    `[OH⁻] = ${formatSci(oh)} M`,
    `pOH = ${poh.toFixed(2)}`,
    `Classification: ${classifyPh(currentPh)}`,
    `Closest example: ${closest.name} (pH ${closest.ph})`
  ];
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  lines.forEach((line, idx) => {
    text(line, panelX + 18, panelY + 80 + idx * 26);
  });
}

function formatSci(value) {
  const exponent = floor(log10(value));
  const mantissa = value / pow(10, exponent);
  return `${mantissa.toFixed(2)} × 10^${exponent}`;
}

function classifyPh(ph) {
  if (ph < 3)              return 'Strongly acidic';
  if (ph < 7)              return 'Weakly acidic';
  if (abs(ph - 7) < 0.05) return 'Neutral';
  if (ph < 11)             return 'Weakly basic';
  return 'Strongly basic';
}

function getPhColor(ph) {
  return getColorFromGradient(constrain(ph / 14, 0, 1));
}

function getColorFromGradient(t) {
  const stops = [
    color('crimson'),
    color('orangered'),
    color('gold'),
    color('mediumseagreen'),
    color('deepskyblue'),
    color('royalblue'),
    color('purple')
  ];
  const segment = 1 / (stops.length - 1);
  const index = floor(constrain(t / segment, 0, stops.length - 2));
  return lerpColor(stops[index], stops[index + 1], (t - index * segment) / segment);
}

function log10(value) {
  return Math.log(value) / Math.log(10);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
  // responsive for fullscreen
  canvasHeight = drawHeight + controlHeight;
  scaleRect.width = canvasWidth - margin * 2;
  if (phSlider) phSlider.size(canvasWidth - margin * 2 - sliderLeftMargin);
}
