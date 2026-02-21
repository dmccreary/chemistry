// Periodic Trends Explorer MicroSim
// Built using the standard p5.js MicroSim template

let containerWidth;
let canvasWidth = 860;
let drawHeight = 520;
let controlHeight = 130;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

const margin = 20;
const defaultTextSize = 16;

let trendButtons = [];
let currentTrend = 'atomicRadius';
let transitionProgress = 0;
let transitioning = false;
let previousTrend = 'atomicRadius';

const trends = [
  { id: 'atomicRadius', label: 'Atomic Radius', units: 'pm', arrows: '↓ Increases  → Decreases' },
  { id: 'ionizationEnergy', label: 'Ionization Energy', units: 'kJ/mol', arrows: '↓ Decreases  → Increases' },
  { id: 'electronAffinity', label: 'Electron Affinity', units: 'kJ/mol', arrows: '↓ Decreases  → Increases' },
  { id: 'electronegativity', label: 'Electronegativity', units: 'Pauling', arrows: '↓ Decreases  → Increases' },
  { id: 'zeff', label: 'Effective Nuclear Charge', units: 'Zeff', arrows: '↓ Slight decrease  → Increases' }
];

const colorScale = [
  { stop: 0, color: [33, 102, 172] },
  { stop: 0.5, color: [255, 255, 255] },
  { stop: 1, color: [178, 24, 43] }
];

const elements = [
  { symbol: 'H', name: 'Hydrogen', atomic: 1, period: 1, group: 1, trends: { atomicRadius: 53, ionizationEnergy: 1312, electronAffinity: -73, electronegativity: 2.20, zeff: 1 } },
  { symbol: 'He', name: 'Helium', atomic: 2, period: 1, group: 18, trends: { atomicRadius: 31, ionizationEnergy: 2372, electronAffinity: 0, electronegativity: 0, zeff: 2 } },
  { symbol: 'Li', name: 'Lithium', atomic: 3, period: 2, group: 1, trends: { atomicRadius: 167, ionizationEnergy: 520, electronAffinity: -60, electronegativity: 0.98, zeff: 1.3 } },
  { symbol: 'Be', name: 'Beryllium', atomic: 4, period: 2, group: 2, trends: { atomicRadius: 112, ionizationEnergy: 899, electronAffinity: 0, electronegativity: 1.57, zeff: 1.9 } },
  { symbol: 'B', name: 'Boron', atomic: 5, period: 2, group: 13, trends: { atomicRadius: 87, ionizationEnergy: 801, electronAffinity: -27, electronegativity: 2.04, zeff: 2.6 } },
  { symbol: 'C', name: 'Carbon', atomic: 6, period: 2, group: 14, trends: { atomicRadius: 67, ionizationEnergy: 1086, electronAffinity: -122, electronegativity: 2.55, zeff: 3.2 } },
  { symbol: 'N', name: 'Nitrogen', atomic: 7, period: 2, group: 15, trends: { atomicRadius: 56, ionizationEnergy: 1402, electronAffinity: 0, electronegativity: 3.04, zeff: 3.9 } },
  { symbol: 'O', name: 'Oxygen', atomic: 8, period: 2, group: 16, trends: { atomicRadius: 48, ionizationEnergy: 1314, electronAffinity: -141, electronegativity: 3.44, zeff: 4.5 } },
  { symbol: 'F', name: 'Fluorine', atomic: 9, period: 2, group: 17, trends: { atomicRadius: 42, ionizationEnergy: 1681, electronAffinity: -328, electronegativity: 3.98, zeff: 5.1 } },
  { symbol: 'Ne', name: 'Neon', atomic: 10, period: 2, group: 18, trends: { atomicRadius: 38, ionizationEnergy: 2080, electronAffinity: 0, electronegativity: 0, zeff: 5.8 } },
  { symbol: 'Na', name: 'Sodium', atomic: 11, period: 3, group: 1, trends: { atomicRadius: 190, ionizationEnergy: 496, electronAffinity: -53, electronegativity: 0.93, zeff: 1.3 } },
  { symbol: 'Mg', name: 'Magnesium', atomic: 12, period: 3, group: 2, trends: { atomicRadius: 145, ionizationEnergy: 738, electronAffinity: 0, electronegativity: 1.31, zeff: 1.8 } },
  { symbol: 'Al', name: 'Aluminum', atomic: 13, period: 3, group: 13, trends: { atomicRadius: 118, ionizationEnergy: 578, electronAffinity: -44, electronegativity: 1.61, zeff: 2.5 } },
  { symbol: 'Si', name: 'Silicon', atomic: 14, period: 3, group: 14, trends: { atomicRadius: 111, ionizationEnergy: 786, electronAffinity: -134, electronegativity: 1.90, zeff: 3.1 } },
  { symbol: 'P', name: 'Phosphorus', atomic: 15, period: 3, group: 15, trends: { atomicRadius: 98, ionizationEnergy: 1012, electronAffinity: -72, electronegativity: 2.19, zeff: 3.9 } },
  { symbol: 'S', name: 'Sulfur', atomic: 16, period: 3, group: 16, trends: { atomicRadius: 88, ionizationEnergy: 1000, electronAffinity: -200, electronegativity: 2.58, zeff: 4.6 } },
  { symbol: 'Cl', name: 'Chlorine', atomic: 17, period: 3, group: 17, trends: { atomicRadius: 79, ionizationEnergy: 1251, electronAffinity: -349, electronegativity: 3.16, zeff: 5.3 } },
  { symbol: 'Ar', name: 'Argon', atomic: 18, period: 3, group: 18, trends: { atomicRadius: 71, ionizationEnergy: 1521, electronAffinity: 0, electronegativity: 0, zeff: 5.9 } },
  { symbol: 'K', name: 'Potassium', atomic: 19, period: 4, group: 1, trends: { atomicRadius: 243, ionizationEnergy: 419, electronAffinity: -48, electronegativity: 0.82, zeff: 1.2 } },
  { symbol: 'Ca', name: 'Calcium', atomic: 20, period: 4, group: 2, trends: { atomicRadius: 194, ionizationEnergy: 590, electronAffinity: -2, electronegativity: 1.00, zeff: 1.7 } },
  { symbol: 'Sc', name: 'Scandium', atomic: 21, period: 4, group: 3, trends: { atomicRadius: 184, ionizationEnergy: 633, electronAffinity: -18, electronegativity: 1.36, zeff: 1.8 } },
  { symbol: 'Ti', name: 'Titanium', atomic: 22, period: 4, group: 4, trends: { atomicRadius: 176, ionizationEnergy: 658, electronAffinity: -8, electronegativity: 1.54, zeff: 2.2 } },
  { symbol: 'V', name: 'Vanadium', atomic: 23, period: 4, group: 5, trends: { atomicRadius: 171, ionizationEnergy: 651, electronAffinity: -51, electronegativity: 1.63, zeff: 2.5 } },
  { symbol: 'Cr', name: 'Chromium', atomic: 24, period: 4, group: 6, trends: { atomicRadius: 166, ionizationEnergy: 653, electronAffinity: -64, electronegativity: 1.66, zeff: 2.7 } },
  { symbol: 'Mn', name: 'Manganese', atomic: 25, period: 4, group: 7, trends: { atomicRadius: 161, ionizationEnergy: 717, electronAffinity: 0, electronegativity: 1.55, zeff: 3.0 } },
  { symbol: 'Fe', name: 'Iron', atomic: 26, period: 4, group: 8, trends: { atomicRadius: 156, ionizationEnergy: 762, electronAffinity: -16, electronegativity: 1.83, zeff: 3.2 } },
  { symbol: 'Co', name: 'Cobalt', atomic: 27, period: 4, group: 9, trends: { atomicRadius: 152, ionizationEnergy: 760, electronAffinity: -64, electronegativity: 1.88, zeff: 3.5 } },
  { symbol: 'Ni', name: 'Nickel', atomic: 28, period: 4, group: 10, trends: { atomicRadius: 149, ionizationEnergy: 737, electronAffinity: -112, electronegativity: 1.91, zeff: 3.7 } },
  { symbol: 'Cu', name: 'Copper', atomic: 29, period: 4, group: 11, trends: { atomicRadius: 145, ionizationEnergy: 745, electronAffinity: -118, electronegativity: 1.90, zeff: 3.9 } },
  { symbol: 'Zn', name: 'Zinc', atomic: 30, period: 4, group: 12, trends: { atomicRadius: 142, ionizationEnergy: 906, electronAffinity: 0, electronegativity: 1.65, zeff: 4.1 } },
  { symbol: 'Ga', name: 'Gallium', atomic: 31, period: 4, group: 13, trends: { atomicRadius: 136, ionizationEnergy: 579, electronAffinity: -29, electronegativity: 1.81, zeff: 4.3 } },
  { symbol: 'Ge', name: 'Germanium', atomic: 32, period: 4, group: 14, trends: { atomicRadius: 125, ionizationEnergy: 762, electronAffinity: -119, electronegativity: 2.01, zeff: 4.7 } },
  { symbol: 'As', name: 'Arsenic', atomic: 33, period: 4, group: 15, trends: { atomicRadius: 114, ionizationEnergy: 947, electronAffinity: -78, electronegativity: 2.18, zeff: 5.1 } },
  { symbol: 'Se', name: 'Selenium', atomic: 34, period: 4, group: 16, trends: { atomicRadius: 103, ionizationEnergy: 941, electronAffinity: -195, electronegativity: 2.55, zeff: 5.5 } },
  { symbol: 'Br', name: 'Bromine', atomic: 35, period: 4, group: 17, trends: { atomicRadius: 94, ionizationEnergy: 1140, electronAffinity: -325, electronegativity: 2.96, zeff: 5.9 } },
  { symbol: 'Kr', name: 'Krypton', atomic: 36, period: 4, group: 18, trends: { atomicRadius: 88, ionizationEnergy: 1350, electronAffinity: 0, electronegativity: 3.00, zeff: 6.2 } }
];

const cellSize = 48;
const tableOrigin = { x: 0, y: 200 };

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);
  createTrendButtons();
  positionControls();
  describe('Interactive periodic trends visualization with trend buttons and color-coded periodic table.', LABEL);
}

function draw() {
  updateCanvasSize();
  updateTableOrigin();
  fill('#f5f5f5');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawTitle();
  drawTrendButtons();
  drawInfoBox();
  drawPeriodicTable();
  drawLegend();
}

function drawTitle() {
  fill('#0c2d4f');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(28);
  text('Periodic Trends Explorer', canvasWidth / 2, margin / 2);
}

function updateTableOrigin() {
  const width = getTableWidth();
  tableOrigin.x = (canvasWidth - width) / 2;
}

function createTrendButtons() {
  trendButtons = trends.map((trend, index) => {
    const button = createButton(trend.label);
    button.size(170, 36);
    button.mousePressed(() => handleTrendChange(trend.id));
    return { trend: trend.id, button };
  });
}

function handleTrendChange(newTrend) {
  if (newTrend === currentTrend) {
    return;
  }
  previousTrend = currentTrend;
  currentTrend = newTrend;
  transitioning = true;
  transitionProgress = 0;
}

function drawTrendButtons() {
  for (let i = 0; i < trendButtons.length; i++) {
    const button = trendButtons[i];
    if (button.trend === currentTrend) {
      button.button.addClass('selected');
    } else {
      button.button.removeClass('selected');
    }
  }
}

function drawInfoBox() {
  const info = trends.find(t => t.id === currentTrend);
  fill('#0d2f4f');
  noStroke();
  textSize(18);
  textAlign(RIGHT, TOP);
  text(`${info.label} (${info.units})`, canvasWidth - margin, margin + 40);
  textSize(14);
  text(info.arrows, canvasWidth - margin, margin + 64);
}

function drawPeriodicTable() {
  const info = trends.find(t => t.id === currentTrend);
  const prevInfo = trends.find(t => t.id === previousTrend);
  if (transitioning) {
    transitionProgress += 0.02;
    if (transitionProgress >= 1) {
      transitionProgress = 1;
      transitioning = false;
    }
  }

  const values = elements.map(el => el.trends[currentTrend]);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const prevValues = elements.map(el => el.trends[previousTrend]);
  const prevMin = Math.min(...prevValues);
  const prevMax = Math.max(...prevValues);

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    const col = getGroupOffset(el.group);
    const row = el.period - 1;
    const x = tableOrigin.x + col * cellSize;
    const y = tableOrigin.y + row * cellSize;

    const value = el.trends[currentTrend];
    const prevValue = el.trends[previousTrend];
    const normalizedValue = map(value, minValue, maxValue, 0, 1);
    const normalizedPrev = map(prevValue, prevMin, prevMax, 0, 1);
    const colorValue = transitioning ? lerp(normalizedPrev, normalizedValue, transitionProgress) : normalizedValue;

    fill(mapColor(colorValue));
    stroke('#222');
    rect(x, y, cellSize, cellSize);

    fill('#0c1a2b');
    textSize(16);
    textAlign(CENTER, CENTER);
    text(el.symbol, x + cellSize / 2, y + cellSize / 2);

    if (
      mouseX >= x && mouseX <= x + cellSize &&
      mouseY >= y && mouseY <= y + cellSize
    ) {
      drawElementTooltip(el, info, value);
    }
  }
}

function drawLegend() {
  const width = 220;
  const height = 24;
  const x = canvasWidth - width - margin;
  const y = drawHeight - height - margin;
  for (let i = 0; i < width; i++) {
    const t = i / (width - 1);
    stroke(mapColor(t));
    line(x + i, y, x + i, y + height);
  }
  noStroke();
  fill('#0c2035');
  textAlign(CENTER, CENTER);
  text('Low', x, y + height + 14);
  text('High', x + width, y + height + 14);
}

function drawElementTooltip(el, info, value) {
  const tooltip = `${el.name} (${el.symbol})\nZ = ${el.atomic}\n${info.label}: ${value} ${info.units}`;
  const tooltipWidth = max(180, textWidth(info.label) + 60);
  const tooltipHeight = 70;
  const tooltipX = mouseX + 20;
  const tooltipY = mouseY - 10;
  fill('rgba(6, 32, 60, 0.92)');
  noStroke();
  rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 8);
  fill('#fdfdfd');
  textAlign(LEFT, TOP);
  text(tooltip, tooltipX + 12, tooltipY + 10);
}

function getGroupOffset(group) {
  if (group <= 2) {
    return group - 1;
  }
  if (group >= 13) {
    return group - 11;
  }
  return group - 3;
}

function getTableWidth() {
  let maxCol = 0;
  for (let i = 0; i < elements.length; i++) {
    maxCol = Math.max(maxCol, getGroupOffset(elements[i].group));
  }
  return (maxCol + 1) * cellSize;
}

function mapColor(t) {
  const clamped = constrain(t, 0, 1);
  if (clamped <= colorScale[1].stop) {
    const ratio = map(clamped, colorScale[0].stop, colorScale[1].stop, 0, 1);
    return lerpColorRGB(colorScale[0].color, colorScale[1].color, ratio);
  }
  const ratio = map(clamped, colorScale[1].stop, colorScale[2].stop, 0, 1);
  return lerpColorRGB(colorScale[1].color, colorScale[2].color, ratio);
}

function lerpColorRGB(start, end, amount) {
  const r = lerp(start[0], end[0], amount);
  const g = lerp(start[1], end[1], amount);
  const b = lerp(start[2], end[2], amount);
  return color(r, g, b);
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Show Trend:', margin, drawHeight + 25);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  positionControls();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
  canvasHeight = drawHeight + controlHeight;
  containerHeight = canvasHeight;
}

function positionControls() {
  const baseY = drawHeight + 40;
  const buttonWidth = 170;
  const buttonHeight = 36;
  const gap = 10;
  let currentX = margin;
  let currentY = baseY;
  for (let i = 0; i < trendButtons.length; i++) {
    const button = trendButtons[i];
    if (currentX + buttonWidth > canvasWidth - margin) {
      currentX = margin;
      currentY += buttonHeight + gap;
    }
    if (button.button) {
      button.button.position(currentX, currentY);
    }
    currentX += buttonWidth + gap;
  }
}
