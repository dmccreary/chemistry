// PES Spectrum Interactive Visualizer
// Follows the standard p5.js MicroSim template

let containerWidth;
let canvasWidth = 860;
let drawHeight = 520;
let controlHeight = 110;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

const margin = 24;
const sliderLeftMargin = 260;
const defaultTextSize = 16;
const controlPanelWidth = 260;

let elementSelect;
let configCheckbox;
let annotateCheckbox;

let showConfig = true;
let showAnnotations = true;
let selectedElement = 'Na';

let peakHitRegions = [];

const SUBSHELL_ORDER = ['1s', '2s', '2p', '3s', '3p'];
const ENERGY_BASE = { '1s': 1100, '2s': 350, '2p': 280, '3s': 140, '3p': 90 };
const ENERGY_FACTOR = { '1s': 30, '2s': 11, '2p': 9, '3s': 5, '3p': 4 };
const SUBSHELL_COLOR = {
  '1s': '#2196F3',
  '2s': '#2196F3',
  '3s': '#2196F3',
  '2p': '#4CAF50',
  '3p': '#4CAF50'
};

const ELEMENT_DATA = {
  H: { atomic: 1, config: '1s1', distribution: { '1s': 1 } },
  He: { atomic: 2, config: '1s2', distribution: { '1s': 2 } },
  Li: { atomic: 3, config: '1s2 2s1', distribution: { '1s': 2, '2s': 1 } },
  Be: { atomic: 4, config: '1s2 2s2', distribution: { '1s': 2, '2s': 2 } },
  B: { atomic: 5, config: '1s2 2s2 2p1', distribution: { '1s': 2, '2s': 2, '2p': 1 } },
  C: { atomic: 6, config: '1s2 2s2 2p2', distribution: { '1s': 2, '2s': 2, '2p': 2 } },
  N: { atomic: 7, config: '1s2 2s2 2p3', distribution: { '1s': 2, '2s': 2, '2p': 3 } },
  O: { atomic: 8, config: '1s2 2s2 2p4', distribution: { '1s': 2, '2s': 2, '2p': 4 } },
  F: { atomic: 9, config: '1s2 2s2 2p5', distribution: { '1s': 2, '2s': 2, '2p': 5 } },
  Ne: { atomic: 10, config: '1s2 2s2 2p6', distribution: { '1s': 2, '2s': 2, '2p': 6 } },
  Na: { atomic: 11, config: '1s2 2s2 2p6 3s1', distribution: { '1s': 2, '2s': 2, '2p': 6, '3s': 1 } },
  Mg: { atomic: 12, config: '1s2 2s2 2p6 3s2', distribution: { '1s': 2, '2s': 2, '2p': 6, '3s': 2 } },
  Al: { atomic: 13, config: '1s2 2s2 2p6 3s2 3p1', distribution: { '1s': 2, '2s': 2, '2p': 6, '3s': 2, '3p': 1 } },
  Si: { atomic: 14, config: '1s2 2s2 2p6 3s2 3p2', distribution: { '1s': 2, '2s': 2, '2p': 6, '3s': 2, '3p': 2 } },
  P: { atomic: 15, config: '1s2 2s2 2p6 3s2 3p3', distribution: { '1s': 2, '2s': 2, '2p': 6, '3s': 2, '3p': 3 } },
  S: { atomic: 16, config: '1s2 2s2 2p6 3s2 3p4', distribution: { '1s': 2, '2s': 2, '2p': 6, '3s': 2, '3p': 4 } },
  Cl: { atomic: 17, config: '1s2 2s2 2p6 3s2 3p5', distribution: { '1s': 2, '2s': 2, '2p': 6, '3s': 2, '3p': 5 } },
  Ar: { atomic: 18, config: '1s2 2s2 2p6 3s2 3p6', distribution: { '1s': 2, '2s': 2, '2p': 6, '3s': 2, '3p': 6 } }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  elementSelect = createSelect();
  const elementKeys = Object.keys(ELEMENT_DATA);
  for (let i = 0; i < elementKeys.length; i++) {
    elementSelect.option(elementKeys[i]);
  }
  elementSelect.value('Na');
  elementSelect.changed(handleElementChange);

  configCheckbox = createCheckbox('Show electron configuration', true);
  configCheckbox.changed(handleConfigToggle);

  annotateCheckbox = createCheckbox('Annotate peaks', true);
  annotateCheckbox.changed(handleAnnotateToggle);

  positionControls();

  describe('Interactive PES spectrum with element dropdown, configuration display, and peak annotations.', LABEL);
}

function draw() {
  updateCanvasSize();
  showConfig = configCheckbox.checked();
  showAnnotations = annotateCheckbox.checked();

  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawControlPanel();
  drawSpectrum();
  drawControlLabels();
  drawTooltip();
}

function drawControlPanel() {
  fill('#f5f7ff');
  noStroke();
  rect(0, 0, controlPanelWidth, drawHeight);

  fill('#072c49');
  textSize(22);
  textAlign(LEFT, TOP);
  text('PES Controls', margin, margin);

  textSize(defaultTextSize);
  text(`Element: ${selectedElement}`, margin, margin + 40);
  text(`Electrons: ${ELEMENT_DATA[selectedElement].config.replace(/ /g, '')}`, margin, margin + 70);

  fill('#0e4768');
  text('Legend', margin, margin + 110);
  drawLegend(margin, margin + 140);

  fill('#0e4768');
  textSize(14);
  text('Binding energies increase left to right', margin, drawHeight - 80);
  text('Peaks scale with electron counts', margin, drawHeight - 55);
}

function drawLegend(x, y) {
  const entries = [
    { label: 's subshell', color: '#2196F3' },
    { label: 'p subshell', color: '#4CAF50' }
  ];
  for (let i = 0; i < entries.length; i++) {
    fill(entries[i].color);
    rect(x, y + i * 30, 20, 20, 4);
    fill('#0d304c');
    text(entries[i].label, x + 28, y + i * 30 + 14);
  }
}

function drawSpectrum() {
  const panelX = controlPanelWidth;
  const panelWidth = canvasWidth - controlPanelWidth;
  const panelMargin = 30;

  push();
  translate(panelX, 0);
  fill('#fdfdfd');
  rect(0, 0, panelWidth, drawHeight);

  stroke('#93a2b8');
  line(panelMargin, drawHeight - panelMargin, panelWidth - panelMargin, drawHeight - panelMargin);
  line(panelMargin, panelMargin, panelMargin, drawHeight - panelMargin);

  noStroke();
  fill('#1c2c44');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Binding Energy (MJ/mol)', panelWidth / 2, drawHeight - panelMargin + 6);
  push();
  translate(panelMargin - 18, drawHeight / 2);
  rotate(-HALF_PI);
  text('Relative Number of Electrons', 0, 0);
  pop();

  peakHitRegions = [];
  const peaks = getPeaksForElement(selectedElement);
  const energyRange = getEnergyRange(peaks);

  for (let i = 0; i < peaks.length; i++) {
    const peak = peaks[i];
    const centerX = map(peak.energy, energyRange.min, energyRange.max, panelMargin, panelWidth - panelMargin);
    const height = peak.electrons * 28;
    drawPeak(centerX, drawHeight - panelMargin, height, peak.subshell);

    if (showAnnotations) {
      fill('#0b314f');
      textAlign(CENTER, BOTTOM);
      text(`${peak.subshell} (${peak.electrons})`, centerX, drawHeight - panelMargin - height - 6);
    }

    peakHitRegions.push({
      x: centerX,
      y: drawHeight - panelMargin - height / 2,
      height: height,
      electrons: peak.electrons,
      subshell: peak.subshell,
      energy: peak.energy
    });
  }

  if (showConfig) {
    fill('#0b314f');
    textAlign(CENTER, TOP);
    textSize(16);
    text(`Configuration: ${ELEMENT_DATA[selectedElement].config}`, panelWidth / 2, drawHeight - panelMargin + 32);
  }

  pop();
}

function drawPeak(centerX, baselineY, peakHeight, subshell) {
  const width = 70;
  const steps = 60;
  const colorValue = SUBSHELL_COLOR[subshell] || '#FF9800';
  stroke(colorValue);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i <= steps; i++) {
    const xOffset = map(i, 0, steps, -width / 2, width / 2);
    const gaussian = exp(-((xOffset) ** 2) / (2 * (width / 4) ** 2));
    const y = baselineY - gaussian * peakHeight;
    vertex(centerX + xOffset, y);
  }
  endShape();

  fill(colorValue + '33');
  noStroke();
  beginShape();
  vertex(centerX - width / 2, baselineY);
  for (let i = 0; i <= steps; i++) {
    const xOffset = map(i, 0, steps, -width / 2, width / 2);
    const gaussian = exp(-((xOffset) ** 2) / (2 * (width / 4) ** 2));
    const y = baselineY - gaussian * peakHeight;
    vertex(centerX + xOffset, y);
  }
  vertex(centerX + width / 2, baselineY);
  endShape(CLOSE);
}

function drawControlLabels() {
  const labelY = drawHeight + 30;
  fill('black');
  noStroke();
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('Element:', 20, labelY);
}

function drawTooltip() {
  for (let i = 0; i < peakHitRegions.length; i++) {
    const region = peakHitRegions[i];
    if (dist(mouseX - controlPanelWidth, mouseY, region.x, region.y) < 35) {
      fill('#0b314f');
      noStroke();
      const tooltip = `${region.subshell} | ${region.electrons} e⁻ | ${region.energy.toFixed(0)} MJ/mol`;
      const tooltipWidth = textWidth(tooltip) + 20;
      const tooltipX = mouseX + 10;
      const tooltipY = mouseY - 20;
      fill('rgba(11,49,79,0.9)');
      rect(tooltipX, tooltipY, tooltipWidth, 26, 6);
      fill('#fefefe');
      textAlign(LEFT, CENTER);
      text(tooltip, tooltipX + 10, tooltipY + 13);
      break;
    }
  }
}

function handleElementChange() {
  selectedElement = elementSelect.value();
}

function handleConfigToggle() {
  showConfig = configCheckbox.checked();
}

function handleAnnotateToggle() {
  showAnnotations = annotateCheckbox.checked();
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
  const baseY = drawHeight + 70;
  if (elementSelect) {
    elementSelect.position(120, baseY - 10);
  }
  if (configCheckbox) {
    configCheckbox.position(sliderLeftMargin, baseY - 36);
  }
  if (annotateCheckbox) {
    annotateCheckbox.position(sliderLeftMargin, baseY);
  }
}

function getPeaksForElement(symbol) {
  const info = ELEMENT_DATA[symbol];
  const peaks = [];
  for (let i = 0; i < SUBSHELL_ORDER.length; i++) {
    const subshell = SUBSHELL_ORDER[i];
    if (!info.distribution[subshell]) {
      continue;
    }
    const energy = ENERGY_BASE[subshell] + ENERGY_FACTOR[subshell] * info.atomic;
    peaks.push({ subshell: subshell, electrons: info.distribution[subshell], energy: energy });
  }
  return peaks;
}

function getEnergyRange(peaks) {
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < peaks.length; i++) {
    min = Math.min(min, peaks[i].energy);
    max = Math.max(max, peaks[i].energy);
  }
  if (min === max) {
    max = min + 200;
  }
  return { min, max };
}

function viridisColor(t) {
  const palette = [
    [68, 1, 84],
    [59, 82, 139],
    [33, 145, 140],
    [94, 201, 98],
    [253, 231, 37]
  ];
  const value = constrain(t, 0, 1) * (palette.length - 1);
  const index = floor(value);
  const fraction = value - index;
  const start = palette[index];
  const end = palette[min(index + 1, palette.length - 1)];
  const r = lerp(start[0], end[0], fraction);
  const g = lerp(start[1], end[1], fraction);
  const b = lerp(start[2], end[2], fraction);
  return color(r, g, b);
}
