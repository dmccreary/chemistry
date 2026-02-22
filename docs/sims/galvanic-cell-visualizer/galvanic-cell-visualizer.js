/*
  Galvanic Cell Visualizer
  - drawHeight = 600 px (title, twin beakers, salt bridge, info bands)
  - controlHeight = 280 px (selector row + three slider rows)
  - Canvas background follows MicroSim standard: aliceblue drawing area, white control area
*/

let canvasWidth = 960;
const drawHeight = 600;
const controlHeight = 280;
let canvasHeight = drawHeight + controlHeight;
const margin = 26;
const controlRowSpacing = 70;
const sliderLeftMargin = 240;
const electronCountDefault = 2;

const cellOptions = [
  {
    id: 'zn-cu',
    label: 'Zn | Cu',
    anode: {
      metal: 'Zn',
      ion: 'Zn2+',
      ionLabel: 'Zn^{2+}',
      electrons: 2,
      reductionPotential: -0.76,
      color: '#9e9e9e',
      halfReaction: 'Zn(s) -> Zn2+(aq) + 2 e-'
    },
    cathode: {
      metal: 'Cu',
      ion: 'Cu2+',
      ionLabel: 'Cu^{2+}',
      electrons: 2,
      reductionPotential: 0.34,
      color: '#b87333',
      halfReaction: 'Cu2+(aq) + 2 e- -> Cu(s)'
    },
    salt: 'KNO3'
  },
  {
    id: 'fe-cu',
    label: 'Fe | Cu',
    anode: {
      metal: 'Fe',
      ion: 'Fe2+',
      ionLabel: 'Fe^{2+}',
      electrons: 2,
      reductionPotential: -0.44,
      color: '#6d6d6d',
      halfReaction: 'Fe(s) -> Fe2+(aq) + 2 e-'
    },
    cathode: {
      metal: 'Cu',
      ion: 'Cu2+',
      ionLabel: 'Cu^{2+}',
      electrons: 2,
      reductionPotential: 0.34,
      color: '#b87333',
      halfReaction: 'Cu2+(aq) + 2 e- -> Cu(s)'
    },
    salt: 'KNO3'
  },
  {
    id: 'zn-ag',
    label: 'Zn | Ag',
    anode: {
      metal: 'Zn',
      ion: 'Zn2+',
      ionLabel: 'Zn^{2+}',
      electrons: 2,
      reductionPotential: -0.76,
      color: '#9e9e9e',
      halfReaction: 'Zn(s) -> Zn2+(aq) + 2 e-'
    },
    cathode: {
      metal: 'Ag',
      ion: 'Ag+',
      ionLabel: 'Ag^{+}',
      electrons: 1,
      reductionPotential: 0.80,
      color: '#c0c0c0',
      halfReaction: 'Ag+(aq) + e- -> Ag(s)'
    },
    salt: 'KNO3'
  },
  {
    id: 'custom',
    label: 'Custom pair',
    salt: 'Generic salt'
  }
];

let selectedCell = cellOptions[0];
let anodeConc = 1.0;
let cathodeConc = 1.0;
let temperatureK = 298;

let customAnodeMetal = 'Metal A';
let customAnodeIon = 'A2+';
let customAnodePotential = -0.40;
let customCathodeMetal = 'Metal B';
let customCathodeIon = 'B2+';
let customCathodePotential = 0.60;

let cellSelect;
let anodeSlider;
let cathodeSlider;
let tempSlider;
let customAnodeMetalInput;
let customAnodeIonInput;
let customAnodePotentialInput;
let customCathodeMetalInput;
let customCathodeIonInput;
let customCathodePotentialInput;

let controlRows = [];
let selectValueSpan;
let anodeValueSpan;
let cathodeValueSpan;
let tempValueSpan;

let electronDots = [];
let cationDots = [];
let anionDots = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const main = document.querySelector('main');
  if (main) {
    canvas.parent(main);
  }
  textFont('Arial, Helvetica, sans-serif');
  createControls();
  updateControlDisplays();
  initParticles();
  describe('Visualize galvanic cell components, ion flow, and Nernst potentials.');
}

function draw() {
  updateCanvasSize();
  background('aliceblue');
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  noStroke();

  const cellState = getActiveCellState();
  const electroData = computeElectrochemistry(cellState);
  updateParticles(electroData.spontaneous);

  drawTitle();
  drawCellDiagram(cellState, electroData);
  drawInfoPanel(cellState, electroData);
  positionControls();
}

function drawTitle() {
  drawText('Galvanic Cell Visualizer', canvasWidth / 2, 18, CENTER, TOP, 32, '#000000');
}

function drawCellDiagram(cellState, electroData) {
  const beakerWidth = 200;
  const beakerHeight = 260;
  const beakerY = 140 + 110;
  const anodeX = margin + 40;
  const cathodeX = canvasWidth - margin - beakerWidth - 40;
  const saltBridgeY = beakerY - 40;
  const saltBridgeHeight = 60;
  const bridgeInnerWidth = (cathodeX - anodeX - beakerWidth + 40);

  // Draw beakers
  drawBeaker(anodeX, beakerY, beakerWidth, beakerHeight, '#dbe9ff');
  drawBeaker(cathodeX, beakerY, beakerWidth, beakerHeight, '#dbe9ff');

  // Solutions and electrodes
  drawSolution(anodeX, beakerY, beakerWidth, beakerHeight, cellState.anodeColor, anodeConc);
  drawSolution(cathodeX, beakerY, beakerWidth, beakerHeight, cellState.cathodeColor, cathodeConc);
  const leftElectrodeTop = drawElectrode(anodeX + beakerWidth * 0.25, beakerY - 10, cellState.anodeColor);
  const rightElectrodeTop = drawElectrode(cathodeX + beakerWidth * 0.75, beakerY - 10, cellState.cathodeColor);

  // Salt bridge
  drawSaltBridge(anodeX + beakerWidth * 0.75, beakerY - 20, cathodeX + beakerWidth * 0.25, saltBridgeY, saltBridgeHeight, cellState.saltLabel);
  drawSaltParticles(electroData.spontaneous, saltBridgeY, saltBridgeHeight, anodeX + beakerWidth * 0.75, cathodeX + beakerWidth * 0.25);

  // Wire and electrons
  const wirePath = buildWirePath(leftElectrodeTop, rightElectrodeTop);
  drawWire(wirePath);
  drawLightBulb((leftElectrodeTop.x + rightElectrodeTop.x) / 2, leftElectrodeTop.y - 70, electroData.spontaneous);
  drawElectronParticles(wirePath, electroData.spontaneous);

  // Labels
  drawText(`Anode (-): ${cellState.anode.metal}`, anodeX + beakerWidth / 2, beakerY + beakerHeight + 12, CENTER, TOP, 16, '#37474f');
  drawText(`Cathode (+): ${cellState.cathode.metal}`, cathodeX + beakerWidth / 2, beakerY + beakerHeight + 12, CENTER, TOP, 16, '#37474f');
  drawText(`${cellState.anode.ionLabel} solution`, anodeX + beakerWidth / 2, beakerY + 10, CENTER, TOP, 14, '#0d47a1');
  drawText(`${cellState.cathode.ionLabel} solution`, cathodeX + beakerWidth / 2, beakerY + 10, CENTER, TOP, 14, '#0d47a1');
}

function drawInfoPanel(cellState, electroData) {
  const panelX = margin;
  const panelY = drawHeight - 140;
  const panelWidth = canvasWidth - margin * 2;
  const panelHeight = 120;
  stroke('#cfd8dc');
  fill('white');
  rect(panelX, panelY, panelWidth, panelHeight, 16);

  const columnWidth = panelWidth / 3;
  drawText('Cell notation', panelX + 12, panelY + 10, LEFT, TOP, 16, '#0c4f74');
  drawText(cellState.notation, panelX + 12, panelY + 34, LEFT, TOP, 14, '#37474f');

  drawText('Half-reactions', panelX + columnWidth + 12, panelY + 10, LEFT, TOP, 16, '#0c4f74');
  drawText(`Anode: ${cellState.anodeHalf}`, panelX + columnWidth + 12, panelY + 34, LEFT, TOP, 14, '#bf360c');
  drawText(`Cathode: ${cellState.cathodeHalf}`, panelX + columnWidth + 12, panelY + 60, LEFT, TOP, 14, '#1b5e20');
  drawText(`Overall: ${cellState.overallReaction}`, panelX + columnWidth + 12, panelY + 86, LEFT, TOP, 14, '#37474f');

  const thirdX = panelX + columnWidth * 2 + 12;
  drawText('Cell potential', thirdX, panelY + 10, LEFT, TOP, 16, '#0c4f74');
  drawText(`E0 = ${electroData.standard.toFixed(3)} V`, thirdX, panelY + 34, LEFT, TOP, 14, '#37474f');
  drawText(`Q = ${electroData.q.toPrecision(3)}`, thirdX, panelY + 56, LEFT, TOP, 14, '#37474f');
  drawText(`T = ${temperatureK.toFixed(0)} K`, thirdX, panelY + 78, LEFT, TOP, 14, '#37474f');
  const statusColor = electroData.spontaneous ? '#1b5e20' : '#c62828';
  const statusText = electroData.spontaneous ? 'Spontaneous (E > 0)' : 'Non-spontaneous (E <= 0)';
  drawText(`E = ${electroData.actual.toFixed(3)} V`, thirdX, panelY + 100, LEFT, TOP, 14, statusColor);
  if (!electroData.spontaneous) {
    drawWarningOverlay();
  }
}

function drawBeaker(x, y, width, height, strokeColor) {
  stroke('#90a4ae');
  strokeWeight(2);
  noFill();
  beginShape();
  vertex(x, y);
  vertex(x, y + height - 20);
  bezierVertex(x, y + height, x + width, y + height, x + width, y + height - 20);
  vertex(x + width, y);
  endShape();
}

function drawSolution(x, y, width, height, colorHex, concentration) {
  const liquidTop = y + height * 0.2;
  const liquidHeight = height - height * 0.2;
  const intensity = constrain(concentration / 2, 0.1, 1);
  const colorObj = color(colorHex);
  colorObj.setAlpha(120 + intensity * 80);
  noStroke();
  fill(colorObj);
  rect(x + 6, liquidTop, width - 12, liquidHeight - 20, 12);
}

function drawElectrode(xCenter, topY, colorHex) {
  const electrodeWidth = 28;
  const electrodeHeight = 200;
  noStroke();
  fill(colorHex);
  rectMode(CENTER);
  rect(xCenter, topY + electrodeHeight / 2, electrodeWidth, electrodeHeight, 6);
  rectMode(CORNER);
  return { x: xCenter, y: topY };
}

function drawSaltBridge(leftX, liquidY, rightX, bridgeTopY, bridgeHeight, label) {
  stroke('#6d4c41');
  strokeWeight(8);
  noFill();
  const midY = bridgeTopY - bridgeHeight;
  beginShape();
  vertex(leftX, liquidY);
  vertex(leftX, bridgeTopY);
  bezierVertex(leftX, midY, rightX, midY, rightX, bridgeTopY);
  vertex(rightX, liquidY);
  endShape();
  drawText(`Salt bridge (${label})`, (leftX + rightX) / 2, bridgeTopY - bridgeHeight - 24, CENTER, TOP, 14, '#5d4037');
}

function buildWirePath(leftTop, rightTop) {
  const peakY = leftTop.y - 120;
  const midX = (leftTop.x + rightTop.x) / 2;
  return [
    { x: leftTop.x, y: leftTop.y },
    { x: leftTop.x, y: peakY + 30 },
    { x: midX - 60, y: peakY },
    { x: midX + 60, y: peakY },
    { x: rightTop.x, y: peakY + 30 },
    { x: rightTop.x, y: rightTop.y }
  ];
}

function drawWire(path) {
  stroke('#455a64');
  strokeWeight(6);
  noFill();
  beginShape();
  path.forEach(function (pt) {
    vertex(pt.x, pt.y);
  });
  endShape();
}

function drawLightBulb(x, y, isOn) {
  stroke('#757575');
  strokeWeight(2);
  fill(isOn ? '#fff176' : '#eceff1');
  ellipse(x, y, 60, 80);
  fill('#757575');
  ellipse(x, y + 40, 50, 12);
}

function initParticles() {
  electronDots = [];
  cationDots = [];
  anionDots = [];
  for (let i = 0; i < 10; i += 1) {
    electronDots.push({ t: random(), speed: 0.003 + random() * 0.002 });
  }
  for (let i = 0; i < 12; i += 1) {
    cationDots.push({ t: random(), speed: 0.002 + random() * 0.001 });
    anionDots.push({ t: random(), speed: 0.002 + random() * 0.001 });
  }
}

function updateParticles(spontaneous) {
  const direction = spontaneous ? 1 : -1;
  electronDots.forEach(function (dot) {
    dot.t = (dot.t + dot.speed * direction + 1) % 1;
  });
  cationDots.forEach(function (dot) {
    dot.t = (dot.t + dot.speed * direction + 1) % 1;
  });
  anionDots.forEach(function (dot) {
    dot.t = (dot.t - dot.speed * direction + 1) % 1;
  });
}

function drawElectronParticles(path, spontaneous) {
  electronDots.forEach(function (dot) {
    const point = pointOnPath(path, dot.t);
    noStroke();
    fill('#ffd600');
    circle(point.x, point.y, 8);
  });
  const arrowX = (path[0].x + path[path.length - 1].x) / 2;
  const arrowY = path[1].y - 10;
  drawText(spontaneous ? 'e- flow: anode -> cathode' : 'e- flow reverses', arrowX, arrowY, CENTER, BOTTOM, 13, spontaneous ? '#1b5e20' : '#c62828');
}

function drawSaltParticles(spontaneous, bridgeY, bridgeHeight, leftX, rightX) {
  const topY = bridgeY - bridgeHeight;
  cationDots.forEach(function (dot) {
    const x = lerp(leftX, rightX, dot.t);
    const y = topY + (bridgeHeight / 3) + (Math.sin(dot.t * TWO_PI) * 6);
    noStroke();
    fill('#ff8a65');
    circle(x, y, 6);
  });
  anionDots.forEach(function (dot) {
    const x = lerp(rightX, leftX, dot.t);
    const y = topY + (2 * bridgeHeight / 3) + (Math.cos(dot.t * TWO_PI) * 6);
    noStroke();
    fill('#64b5f6');
    circle(x, y, 6);
  });
}

function pointOnPath(path, t) {
  const segments = [];
  let totalLength = 0;
  for (let i = 0; i < path.length - 1; i += 1) {
    const len = dist(path[i].x, path[i].y, path[i + 1].x, path[i + 1].y);
    segments.push({ start: path[i], end: path[i + 1], length: len });
    totalLength += len;
  }
  let distance = t * totalLength;
  for (let seg of segments) {
    if (distance <= seg.length) {
      const ratio = distance / seg.length;
      return {
        x: lerp(seg.start.x, seg.end.x, ratio),
        y: lerp(seg.start.y, seg.end.y, ratio)
      };
    }
    distance -= seg.length;
  }
  const last = path[path.length - 1];
  return { x: last.x, y: last.y };
}

function drawWarningOverlay() {
  fill('rgba(198,40,40,0.12)');
  rect(margin, 60, canvasWidth - margin * 2, drawHeight - 160, 12);
  drawText('Conditions favor the reverse reaction (E < 0). Electrons move toward the former anode.', canvasWidth / 2, 80, CENTER, TOP, 16, '#c62828');
}

function getActiveCellState() {
  if (selectedCell.id !== 'custom') {
    return normalizeCell(selectedCell);
  }
  const anode = {
    metal: customAnodeMetal || 'Metal A',
    ion: customAnodeIon || 'A2+',
    ionLabel: customAnodeIon || 'A2+',
    electrons: electronCountDefault,
    reductionPotential: parseFloat(customAnodePotential) || -0.40,
    color: '#8d8d8d',
    halfReaction: `${customAnodeMetal || 'Metal A'}(s) -> ${customAnodeIon || 'A2+'}(aq) + ${electronCountDefault} e-`
  };
  const cathode = {
    metal: customCathodeMetal || 'Metal B',
    ion: customCathodeIon || 'B2+',
    ionLabel: customCathodeIon || 'B2+',
    electrons: electronCountDefault,
    reductionPotential: parseFloat(customCathodePotential) || 0.40,
    color: '#a1887f',
    halfReaction: `${customCathodeIon || 'B2+'}(aq) + ${electronCountDefault} e- -> ${customCathodeMetal || 'Metal B'}(s)`
  };
  return normalizeCell({
    anode: anode,
    cathode: cathode,
    salt: 'Custom salt'
  });
}

function normalizeCell(cell) {
  const lcmValue = lcm(cell.anode.electrons, cell.cathode.electrons);
  const anodeFactor = lcmValue / cell.anode.electrons;
  const cathodeFactor = lcmValue / cell.cathode.electrons;
  const notation = `${cell.anode.metal}(s) | ${cell.anode.ionLabel}(aq) || ${cell.cathode.ionLabel}(aq) | ${cell.cathode.metal}(s)`;
  const anodeHalf = cell.anode.halfReaction;
  const cathodeHalf = cell.cathode.halfReaction;
  const overall = `${formatCoefficient(anodeFactor)}${cell.anode.metal}(s) + ${formatCoefficient(cathodeFactor)}${cell.cathode.ionLabel}(aq) -> ${formatCoefficient(anodeFactor)}${cell.anode.ionLabel}(aq) + ${formatCoefficient(cathodeFactor)}${cell.cathode.metal}(s)`;
  return {
    anode: cell.anode,
    cathode: cell.cathode,
    anodeFactor: anodeFactor,
    cathodeFactor: cathodeFactor,
    n: lcmValue,
    notation: notation,
    anodeHalf: anodeHalf,
    cathodeHalf: cathodeHalf,
    overallReaction: overall,
    saltLabel: cell.salt || 'KNO3',
    anodeColor: cell.anode.color || '#9e9e9e',
    cathodeColor: cell.cathode.color || '#b87333'
  };
}

function formatCoefficient(value) {
  return value === 1 ? '' : value.toString() + ' ';
}

function computeElectrochemistry(cellState) {
  const standard = cellState.cathode.reductionPotential - cellState.anode.reductionPotential;
  const qNumerator = Math.pow(Math.max(anodeConc, 1e-6), cellState.anodeFactor);
  const qDenominator = Math.pow(Math.max(cathodeConc, 1e-6), cellState.cathodeFactor);
  const q = qNumerator / qDenominator;
  const temperatureFactor = (0.05916 * (temperatureK / 298)) / cellState.n;
  const actual = standard - temperatureFactor * log10Safe(q);
  return {
    standard: standard,
    actual: actual,
    q: q,
    spontaneous: actual >= 0
  };
}

function createControls() {
  const selectRow = createControlRow('Galvanic cell');
  selectValueSpan = selectRow.value;
  cellSelect = createSelect();
  cellOptions.forEach(function (opt) {
    cellSelect.option(opt.label, opt.id);
  });
  cellSelect.selected(selectedCell.id);
  cellSelect.parent(selectRow.slot);
  cellSelect.changed(function () {
    const id = cellSelect.value();
    selectedCell = cellOptions.find(function (opt) { return opt.id === id; }) || cellOptions[0];
    updateControlDisplays();
  });
  createCustomInputs(selectRow.slot);

  const anodeRow = createSliderRow('Anode ion concentration (M)', 0.001, 2.0, anodeConc, 0.001, function (value) {
    anodeConc = value;
  });
  anodeSlider = anodeRow.slider;
  anodeValueSpan = anodeRow.valueSpan;

  const cathodeRow = createSliderRow('Cathode ion concentration (M)', 0.001, 2.0, cathodeConc, 0.001, function (value) {
    cathodeConc = value;
  });
  cathodeSlider = cathodeRow.slider;
  cathodeValueSpan = cathodeRow.valueSpan;

  const tempRow = createSliderRow('Temperature (K)', 273, 323, temperatureK, 1, function (value) {
    temperatureK = value;
  });
  tempSlider = tempRow.slider;
  tempValueSpan = tempRow.valueSpan;

  updateSliderWidths();
}

function createCustomInputs(slot) {
  const container = createDiv();
  container.parent(slot);
  container.id('custom-inputs');
  container.style('display', 'block');
  container.style('margin-top', '8px');

  customAnodeMetalInput = createInput(customAnodeMetal);
  customAnodeMetalInput.parent(container);
  customAnodeMetalInput.attribute('placeholder', 'Anode metal');
  customAnodeMetalInput.input(function () {
    customAnodeMetal = customAnodeMetalInput.value();
  });

  customAnodeIonInput = createInput(customAnodeIon);
  customAnodeIonInput.parent(container);
  customAnodeIonInput.attribute('placeholder', 'Anode ion');
  customAnodeIonInput.input(function () {
    customAnodeIon = customAnodeIonInput.value();
  });

  customAnodePotentialInput = createInput(customAnodePotential.toString());
  customAnodePotentialInput.parent(container);
  customAnodePotentialInput.attribute('type', 'number');
  customAnodePotentialInput.attribute('step', '0.01');
  customAnodePotentialInput.input(function () {
    customAnodePotential = parseFloat(customAnodePotentialInput.value()) || -0.40;
  });

  customCathodeMetalInput = createInput(customCathodeMetal);
  customCathodeMetalInput.parent(container);
  customCathodeMetalInput.attribute('placeholder', 'Cathode metal');
  customCathodeMetalInput.input(function () {
    customCathodeMetal = customCathodeMetalInput.value();
  });

  customCathodeIonInput = createInput(customCathodeIon);
  customCathodeIonInput.parent(container);
  customCathodeIonInput.attribute('placeholder', 'Cathode ion');
  customCathodeIonInput.input(function () {
    customCathodeIon = customCathodeIonInput.value();
  });

  customCathodePotentialInput = createInput(customCathodePotential.toString());
  customCathodePotentialInput.parent(container);
  customCathodePotentialInput.attribute('type', 'number');
  customCathodePotentialInput.attribute('step', '0.01');
  customCathodePotentialInput.input(function () {
    customCathodePotential = parseFloat(customCathodePotentialInput.value()) || 0.60;
  });
}

function createControlRow(labelText) {
  const row = createDiv();
  row.style('display', 'inline-block');
  row.style('background', 'white');
  row.style('padding', '8px 12px');
  row.style('border-radius', '10px');
  row.style('box-shadow', '0 1px 4px rgba(0,0,0,0.15)');
  row.style('font-family', 'Arial, Helvetica, sans-serif');
  row.style('font-size', '14px');

  const labelSpan = createSpan(labelText + ': ');
  labelSpan.parent(row);
  labelSpan.style('display', 'inline-block');
  labelSpan.style('width', '150px');
  labelSpan.style('font-weight', '600');

  const valueSpan = createSpan('');
  valueSpan.parent(row);
  valueSpan.style('display', 'inline-block');
  valueSpan.style('width', '90px');
  valueSpan.style('font-weight', '600');
  valueSpan.style('color', '#0c4f74');

  const slot = createDiv();
  slot.parent(row);
  slot.style('display', 'inline-block');
  slot.style('width', '320px');
  slot.style('margin-left', '12px');

  controlRows.push({ row: row, value: valueSpan, slot: slot });
  return { row: row, value: valueSpan, slot: slot };
}

function createSliderRow(labelText, min, max, initial, step, callback) {
  const row = createControlRow(labelText);
  const slider = createSlider(min, max, initial, step);
  slider.parent(row.slot);
  slider.style('width', '320px');
  slider.input(function () {
    callback(parseFloat(slider.value()));
    updateControlDisplays();
  });
  return { slider: slider, valueSpan: row.value };
}

function positionControls() {
  const canvasEl = document.querySelector('main canvas');
  if (!canvasEl) {
    return;
  }
  const rect = canvasEl.getBoundingClientRect();
  const baseX = rect.left + window.scrollX + margin;
  const baseY = rect.top + window.scrollY + drawHeight + 25;
  controlRows.forEach(function (record, index) {
    record.row.position(baseX, baseY + index * controlRowSpacing);
  });
  const customBlock = document.getElementById('custom-inputs');
  if (customBlock) {
    customBlock.style.display = selectedCell.id === 'custom' ? 'block' : 'none';
  }
}

function updateControlDisplays() {
  if (selectValueSpan) {
    selectValueSpan.html(selectedCell.label);
  }
  if (anodeValueSpan) {
    anodeValueSpan.html(anodeConc.toFixed(3) + ' M');
  }
  if (cathodeValueSpan) {
    cathodeValueSpan.html(cathodeConc.toFixed(3) + ' M');
  }
  if (tempValueSpan) {
    tempValueSpan.html(temperatureK.toFixed(0) + ' K');
  }
  positionControls();
}

function updateSliderWidths() {
  const sliderWidth = Math.max(canvasWidth - sliderLeftMargin - margin * 2, 220);
  [anodeSlider, cathodeSlider, tempSlider].forEach(function (slider) {
    if (slider) {
      slider.size(sliderWidth);
    }
  });
  controlRows.forEach(function (record) {
    if (record.slot) {
      record.slot.style('width', sliderWidth + 'px');
    }
  });
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateSliderWidths();
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
  canvasHeight = drawHeight + controlHeight;
}

function log10Safe(value) {
  if (value <= 0) {
    value = 1e-6;
  }
  return Math.log(value) / Math.log(10);
}

function drawText(content, x, y, alignX = LEFT, alignY = TOP, size = 14, colorValue = '#37474f') {
  noStroke();
  fill(colorValue);
  textAlign(alignX, alignY);
  textSize(size);
  text(content, x, y);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}
