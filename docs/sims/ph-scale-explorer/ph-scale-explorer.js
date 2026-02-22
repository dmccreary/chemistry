/*
  Interactive pH Scale Explorer

  Step 2.5 layout plan
  ---------------------
  Drawing region (drawHeight = 520):
    - pH gradient bar + tick marks + pins (top 60%)
    - Info box on right
  Control region (controlHeight = 260):
    - Single slider row with label/value, pointer color preview
  Canvas background: aliceblue; control background: white per guide
  Responsive width; iframe height 780 px
*/

let canvasWidth = 900;
let drawHeight = 520;
let controlHeight = 260;
let canvasHeight = drawHeight + controlHeight;
const margin = 24;
const scaleRect = { x: margin, y: 140, width: 620, height: 70 };
let phSlider;
let sliderRow;

const pins = [
  { name: 'Battery acid', ph: 0.5 },
  { name: 'Gastric acid', ph: 1.5 },
  { name: 'Lemon juice', ph: 2.4 },
  { name: 'Vinegar', ph: 2.9 },
  { name: 'Coffee', ph: 5.0 },
  { name: 'Rainwater', ph: 5.6 },
  { name: 'Milk', ph: 6.5 },
  { name: 'Pure water', ph: 7.0 },
  { name: 'Blood', ph: 7.4 },
  { name: 'Seawater', ph: 8.1 },
  { name: 'Baking soda', ph: 8.3 },
  { name: 'Egg whites', ph: 9.0 },
  { name: 'Borax', ph: 9.5 },
  { name: 'Mild detergent', ph: 10.5 },
  { name: 'Ammonia', ph: 11.6 },
  { name: 'Bleach', ph: 12.5 },
  { name: 'Drain cleaner', ph: 13.5 }
];

let currentPh = 7;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const parent = document.querySelector('main');
  if (parent) canvas.parent(parent);
  textFont('Arial');
  createControls();
  describe('Drag the pH slider to compare real-world substances and compute [H+], [OH-], and pOH.');
}

function draw() {
  updateCanvasSize();
  background('aliceblue');
  drawTitle();
  drawPhScale();
  drawPins();
  drawCursor();
  drawInfoPanel();
  drawControlBackground();
  positionControls();
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
  canvasHeight = drawHeight + controlHeight;
  scaleRect.width = canvasWidth - margin * 2;
}

function createControls() {
  sliderRow = createControlRow('Choose pH');
  phSlider = createSlider(0, 14, currentPh, 0.1);
  phSlider.parent(sliderRow.slot);
  styleSlider(phSlider);
  phSlider.input(function () {
    currentPh = phSlider.value();
    updateRowValue();
  });
  updateRowValue();
}

function updateRowValue() {
  if (sliderRow.value) {
    sliderRow.value.html(currentPh.toFixed(1));
  sliderRow.value.style('color', getPhColor(currentPh));
  }
}

function createControlRow(label) {
  const row = createDiv();
  row.style('display', 'inline-block');
  row.style('background', 'white');
  row.style('padding', '6px 10px');
  row.style('border-radius', '8px');
  row.style('box-shadow', '0 1px 3px rgba(0,0,0,0.12)');
  row.style('font-family', 'Arial, Helvetica, sans-serif');
  row.style('font-size', '14px');

  const labelSpan = createSpan(label);
  labelSpan.parent(row);
  labelSpan.style('display', 'inline-block');
  labelSpan.style('min-width', '220px');
  labelSpan.style('font-weight', '600');

  const slot = createDiv();
  slot.parent(row);
  slot.style('display', 'inline-block');
  slot.style('width', '280px');
  slot.style('margin-left', '12px');

  const value = createSpan('');
  value.parent(row);
  value.style('display', 'inline-block');
  value.style('min-width', '60px');
  value.style('font-weight', '600');

  return { row, slot, value };
}

function positionControls() {
  const canvasEl = document.querySelector('main canvas');
  if (!canvasEl) return;
  const rect = canvasEl.getBoundingClientRect();
  const baseX = rect.left + window.scrollX + margin;
  const baseY = rect.top + window.scrollY + drawHeight + 9;
  sliderRow.row.position(baseX, baseY);
  sliderRow.row.style('width', Math.min(canvasWidth - margin * 2, 700) + 'px');
}

function drawControlBackground() {
  noStroke();
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
}

function drawPhScale() {
  stroke('black');
  fill('white');
  const barY = scaleRect.y;
  const barH = scaleRect.height;
  rect(scaleRect.x, barY, scaleRect.width, barH, 12);

  for (let i = 0; i < scaleRect.width; i += 1) {
    const pct = i / scaleRect.width;
    stroke(getColorFromGradient(pct));
    line(scaleRect.x + i, barY, scaleRect.x + i, barY + barH);
  }

  stroke('black');
  for (let ph = 0; ph <= 14; ph += 1) {
    const x = map(ph, 0, 14, scaleRect.x, scaleRect.x + scaleRect.width);
    line(x, barY + barH, x, barY + barH + 12);
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    text(ph.toString(), x, barY + barH + 16);
  }

  fill('black');
  noStroke();
  textAlign(LEFT, BOTTOM);
  textSize(18);
  text('pH scale (0 = acidic, 14 = basic)', scaleRect.x, barY - 12);
}

function drawPins() {
  textSize(12);
  pins.forEach((pin, index) => {
    const x = map(pin.ph, 0, 14, scaleRect.x, scaleRect.x + scaleRect.width);
    noStroke();
    fill('black');
    circle(x, scaleRect.y + scaleRect.height / 2, 6);
  });
}

function drawCursor() {
  const x = map(currentPh, 0, 14, scaleRect.x, scaleRect.x + scaleRect.width);
  const color = getPhColor(currentPh);
  stroke(color);
  strokeWeight(4);
  line(x, scaleRect.y - 10, x, scaleRect.y + scaleRect.height + 20);
  strokeWeight(1);
}

function drawInfoPanel() {
  const panelX = margin;
  const panelWidth = canvasWidth - margin * 2;
  const panelY = scaleRect.y + scaleRect.height + 80;
  const panelHeight = 220;
  stroke('lightgray');
  fill('white');
  rect(panelX, panelY, panelWidth, panelHeight, 14);
  const color = getPhColor(currentPh);

  fill(color);
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

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(28);
  text('Interactive pH Scale Explorer', canvasWidth / 2, 20);
}

function formatSci(value) {
  const exponent = floor(log10(value));
  const mantissa = value / pow(10, exponent);
  return `${mantissa.toFixed(2)} × 10^${exponent}`;
}

function classifyPh(ph) {
  if (ph < 3) return 'Strongly acidic';
  if (ph < 7) return 'Weakly acidic';
  if (abs(ph - 7) < 0.05) return 'Neutral';
  if (ph < 11) return 'Weakly basic';
  return 'Strongly basic';
}

function getPhColor(ph) {
  const pct = constrain(ph / 14, 0, 1);
  return getColorFromGradient(pct);
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
  const localT = (t - index * segment) / segment;
  return lerpColor(stops[index], stops[index + 1], localT);
}

function styleSlider(slider) {
  slider.style('width', '280px');
}

function log10(value) {
  return Math.log(value) / Math.log(10);
}
