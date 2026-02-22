/*
  Nernst Equation Explorer
  - drawHeight = 600 px (diagram + voltmeter + math panels)
  - controlHeight = 340 px (five aligned control rows below canvas)
  - Canvas drawing area background: aliceblue, control area background: white
*/

let canvasWidth = 960;
const drawHeight = 550;
const controlHeight = 340;
let canvasHeight = drawHeight + controlHeight;
const margin = 28;
const controlRowSpacing = 70;
const sliderLeftMargin = 240;
const FARADAY = 96485;
const NERNST_CONSTANT = 0.05916; // at 25 C

const reactionOptions = [
  {
    id: 'zn-cu',
    label: 'Zn(s) + Cu2+ -> Zn2+ + Cu(s)',
    defaultE0: 1.10,
    defaultN: 2,
    oxidizedLabel: '[Zn2+]',
    reducedLabel: '[Cu2+]',
    numeratorExponent: 1,
    denominatorExponent: 1,
    reactionText: 'Zn(s) + Cu2+(aq) -> Zn2+(aq) + Cu(s)'
  },
  {
    id: 'fe-cu',
    label: 'Fe(s) + Cu2+ -> Fe2+ + Cu(s)',
    defaultE0: 0.78,
    defaultN: 2,
    oxidizedLabel: '[Fe2+]',
    reducedLabel: '[Cu2+]',
    numeratorExponent: 1,
    denominatorExponent: 1,
    reactionText: 'Fe(s) + Cu2+(aq) -> Fe2+(aq) + Cu(s)'
  },
  {
    id: 'concentration',
    label: 'Cu concentration cell',
    defaultE0: 0.00,
    defaultN: 2,
    oxidizedLabel: '[Cu2+] (anode)',
    reducedLabel: '[Cu2+] (cathode)',
    numeratorExponent: 1,
    denominatorExponent: 1,
    reactionText: 'Cu(s) + Cu2+(aq,dilute) -> Cu2+(aq,conc) + Cu(s)'
  },
  {
    id: 'custom',
    label: 'Custom reaction',
    defaultE0: 0.50,
    defaultN: 2,
    oxidizedLabel: '[Ox]',
    reducedLabel: '[Red]',
    numeratorExponent: 1,
    denominatorExponent: 1,
    reactionText: 'Custom: Ox + ne- -> Red'
  }
];

let selectedReaction = reactionOptions[0];
let e0Value = selectedReaction.defaultE0;
let nValue = selectedReaction.defaultN;
let oxidizedConc = 1.0;
let reducedConc = 1.0;
let customOxLabel = '[Ox]';
let customRedLabel = '[Red]';
let customReactionText = 'Ox + ne- -> Red';

let reactionSelect;
let e0Slider;
let nSlider;
let oxidizedSlider;
let reducedSlider;
let customOxInput;
let customRedInput;
let customReactionInput;

const controlRows = [];
let selectValueSpan;
let e0ValueSpan;
let nValueSpan;
let oxidizedValueSpan;
let reducedValueSpan;

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
  describe('Use the Nernst equation to see how concentration changes affect cell voltage.');
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

  const state = getReactionState();
  const calc = computeNernst(state);

  drawTitle();
  drawDiagram(state, calc);
  drawEquationPanel(state, calc);
  drawGraph(state, calc);
  positionControls();
}

function drawTitle() {
  drawText('Nernst Equation Explorer', canvasWidth / 2, 16, CENTER, TOP, 32, '#000000');
}

function drawDiagram(state, calc) {
  const diagramTop = 180;
  const beakerWidth = 150;
  const beakerHeight = 100;
  const gap = 50;
  const totalWidth = beakerWidth * 2 + gap;
  const startX = (canvasWidth - totalWidth) / 2;
  const leftX = startX;
  const rightX = startX + beakerWidth + gap;

  // beakers
  drawBeaker(leftX, diagramTop-70, beakerWidth, beakerHeight);
  drawBeaker(rightX, diagramTop-70, beakerWidth, beakerHeight);

  drawSolution(leftX, diagramTop-70, beakerWidth, beakerHeight, '#90caf9', oxidizedConc);
  drawSolution(rightX, diagramTop-70, beakerWidth, beakerHeight, '#ffcc80', reducedConc);

  // electrodes
  const leftElectrodeTop = drawElectrode(leftX + beakerWidth * 0.4, diagramTop - 80, '#546e7a');
  const rightElectrodeTop = drawElectrode(rightX + beakerWidth * 0.6, diagramTop - 80, '#795548');

  drawText(state.oxidizedLabel, leftX + beakerWidth / 2, diagramTop + 8, CENTER, TOP, 14, '#0d47a1');
  drawText(state.reducedLabel, rightX + beakerWidth / 2, diagramTop + 8, CENTER, TOP, 14, '#bf360c');
  drawText('Oxidized side (anode)', leftX + beakerWidth / 2, diagramTop + beakerHeight + 8, CENTER, TOP, 14, '#37474f');
  drawText('Reduced side (cathode)', rightX + beakerWidth / 2, diagramTop + beakerHeight + 8, CENTER, TOP, 14, '#37474f');

  // wire and voltmeter
  const wirePath = buildWirePath(leftElectrodeTop, rightElectrodeTop);
  drawWire(wirePath);
  drawVoltmeter((leftElectrodeTop.x + rightElectrodeTop.x) / 2, leftElectrodeTop.y - 80, calc.actual);
  drawElectronFlowArrow(wirePath, calc.actual >= 0);
}

function drawEquationPanel(state, calc) {
  const panelX = margin;
  const panelY = drawHeight - 200;
  const panelWidth = canvasWidth - margin * 2;
  const panelHeight = 130;
  stroke('#cfd8dc');
  fill('white');
  rect(panelX, panelY, panelWidth, panelHeight, 16);

  const colWidth = panelWidth / 3;
  drawText('Reaction', panelX + 12, panelY + 8, LEFT, TOP, 16, '#0c4f74');
  drawText(state.reactionText, panelX + 12, panelY + 34, LEFT, TOP, 14, '#37474f');

  drawText('Nernst substitution', panelX + colWidth + 12, panelY + 8, LEFT, TOP, 16, '#0c4f74');
  const slope = (NERNST_CONSTANT / Math.max(nValue, 1)).toFixed(4);
  drawText(`E = ${e0Value.toFixed(3)} - (${slope}) * log(Q)`, colWidth + panelX + 12, panelY + 34, LEFT, TOP, 14, '#37474f');
  drawText(`Q = ${formatSci(calc.q)} (log Q = ${calc.logQ.toFixed(3)})`, colWidth + panelX + 12, panelY + 56, LEFT, TOP, 14, '#37474f');
  drawText(`E = ${calc.actual.toFixed(3)} V`, colWidth + panelX + 12, panelY + 78, LEFT, TOP, 14, calc.actual >= 0 ? '#1b5e20' : '#c62828');

  drawText('Energy connection', panelX + colWidth * 2 + 12, panelY + 8, LEFT, TOP, 16, '#0c4f74');
  drawText(`n = ${nValue.toFixed(0)} e-`, panelX + colWidth * 2 + 12, panelY + 34, LEFT, TOP, 14, '#37474f');
  drawText(`Delta G = ${calc.deltaG.toFixed(1)} kJ/mol`, panelX + colWidth * 2 + 12, panelY + 56, LEFT, TOP, 14, calc.actual >= 0 ? '#1b5e20' : '#c62828');
  if (calc.actual < 0) {
    drawText('Non-spontaneous (E < 0)', panelX + colWidth * 2 + 12, panelY + 78, LEFT, TOP, 14, '#c62828');
  } else if (Math.abs(calc.actual) < 1e-6) {
    drawText('At equilibrium (E = 0)', panelX + colWidth * 2 + 12, panelY + 78, LEFT, TOP, 14, '#f9a825');
  } else {
    drawText('Forward reaction favored', panelX + colWidth * 2 + 12, panelY + 78, LEFT, TOP, 14, '#1b5e20');
  }
}

function drawGraph(state, calc) {
  const graphX = margin;
  const graphY = drawHeight - 60;
  const graphWidth = canvasWidth - margin * 2;
  const graphHeight = 140;
  const logMin = -4;
  const logMax = 4;
  const yMin = -1.5;
  const yMax = 1.5;
  stroke('#cfd8dc');
  fill('white');
  rect(graphX, graphY - graphHeight, graphWidth, graphHeight, 12);
  drawText('E vs log Q', graphX + 8, graphY - graphHeight + 6, LEFT, TOP, 14, '#0c4f74');

  const slope = NERNST_CONSTANT / Math.max(nValue, 1);
  let prevPoint = null;
  noFill();
  stroke('#1e88e5');
  strokeWeight(2);
  beginShape();
  for (let x = logMin; x <= logMax; x += 0.25) {
    const eValue = e0Value - slope * x;
    const px = map(x, logMin, logMax, graphX + 30, graphX + graphWidth - 30);
    const py = map(eValue, yMin, yMax, graphY - 20, graphY - graphHeight + 20);
    vertex(px, py);
    prevPoint = { px, py };
  }
  endShape();

  const pointX = map(constrain(calc.logQ, logMin, logMax), logMin, logMax, graphX + 30, graphX + graphWidth - 30);
  const pointY = map(constrain(calc.actual, yMin, yMax), yMin, yMax, graphY - 20, graphY - graphHeight + 20);
  noStroke();
  fill(calc.actual >= 0 ? '#1b5e20' : '#c62828');
  circle(pointX, pointY, 10);
  drawText(`log Q = ${calc.logQ.toFixed(2)}, E = ${calc.actual.toFixed(2)} V`, pointX + 8, pointY - 10, LEFT, BOTTOM, 12, '#37474f');
}

function createControls() {
  const selectRow = createControlRow('Reaction');
  selectValueSpan = selectRow.value;
  reactionSelect = createSelect();
  reactionOptions.forEach(function (opt) {
    reactionSelect.option(opt.label, opt.id);
  });
  reactionSelect.selected(selectedReaction.id);
  reactionSelect.parent(selectRow.slot);
  reactionSelect.changed(function () {
    const id = reactionSelect.value();
    selectedReaction = reactionOptions.find(function (opt) { return opt.id === id; }) || reactionOptions[0];
    e0Value = selectedReaction.defaultE0;
    nValue = selectedReaction.defaultN;
    oxidizedConc = 1.0;
    reducedConc = 1.0;
    if (selectedReaction.id !== 'custom') {
      customReactionText = selectedReaction.reactionText;
      customOxLabel = selectedReaction.oxidizedLabel;
      customRedLabel = selectedReaction.reducedLabel;
    }
    updateControlDisplays();
  });
  createCustomInputs(selectRow.slot);

  const e0Row = createSliderRow('Standard potential (E0, V)', -1.5, 1.5, e0Value, 0.01, function (value) {
    e0Value = value;
  });
  e0Slider = e0Row.slider;
  e0ValueSpan = e0Row.valueSpan;

  const nRow = createSliderRow('Electrons transferred (n)', 1, 4, nValue, 1, function (value) {
    nValue = value;
  });
  nSlider = nRow.slider;
  nValueSpan = nRow.valueSpan;

  const oxidizedRow = createSliderRow('Oxidized concentration (M)', 0.001, 2.0, oxidizedConc, 0.001, function (value) {
    oxidizedConc = value;
  });
  oxidizedSlider = oxidizedRow.slider;
  oxidizedValueSpan = oxidizedRow.valueSpan;

  const reducedRow = createSliderRow('Reduced concentration (M)', 0.001, 2.0, reducedConc, 0.001, function (value) {
    reducedConc = value;
  });
  reducedSlider = reducedRow.slider;
  reducedValueSpan = reducedRow.valueSpan;

  updateSliderWidths();
}

function createCustomInputs(slot) {
  const container = createDiv();
  container.parent(slot);
  container.id('custom-reaction-inputs');
  container.style('display', 'block');
  container.style('margin-top', '8px');

  customReactionInput = createInput(customReactionText);
  customReactionInput.parent(container);
  customReactionInput.attribute('placeholder', 'Overall reaction text');
  customReactionInput.input(function () {
    customReactionText = customReactionInput.value();
  });

  customOxInput = createInput(customOxLabel);
  customOxInput.parent(container);
  customOxInput.attribute('placeholder', 'Oxidized label');
  customOxInput.input(function () {
    customOxLabel = customOxInput.value();
  });

  customRedInput = createInput(customRedLabel);
  customRedInput.parent(container);
  customRedInput.attribute('placeholder', 'Reduced label');
  customRedInput.input(function () {
    customRedLabel = customRedInput.value();
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
  const customBlock = document.getElementById('custom-reaction-inputs');
  if (customBlock) {
    customBlock.style.display = selectedReaction.id === 'custom' ? 'block' : 'none';
  }
}

function updateControlDisplays() {
  if (selectValueSpan) {
    selectValueSpan.html(selectedReaction.label);
  }
  if (e0ValueSpan) {
    e0ValueSpan.html(e0Value.toFixed(3) + ' V');
  }
  if (nValueSpan) {
    nValueSpan.html(nValue.toFixed(0));
  }
  if (oxidizedValueSpan) {
    oxidizedValueSpan.html(formatSci(oxidizedConc) + ' M');
  }
  if (reducedValueSpan) {
    reducedValueSpan.html(formatSci(reducedConc) + ' M');
  }
  const customBlock = document.getElementById('custom-reaction-inputs');
  if (customBlock) {
    customBlock.style.display = selectedReaction.id === 'custom' ? 'block' : 'none';
  }
}

function updateSliderWidths() {
  const sliderWidth = Math.max(canvasWidth - sliderLeftMargin - margin * 2, 220);
  [e0Slider, nSlider, oxidizedSlider, reducedSlider].forEach(function (slider) {
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

function getReactionState() {
  if (selectedReaction.id === 'custom') {
    return {
      oxidizedLabel: customOxLabel || '[Ox]',
      reducedLabel: customRedLabel || '[Red]',
      reactionText: customReactionText || 'Custom reaction',
      numeratorExponent: selectedReaction.numeratorExponent,
      denominatorExponent: selectedReaction.denominatorExponent
    };
  }
  return selectedReaction;
}

function computeNernst(state) {
  const numerator = Math.pow(Math.max(oxidizedConc, 1e-6), state.numeratorExponent || 1);
  const denominator = Math.pow(Math.max(reducedConc, 1e-6), state.denominatorExponent || 1);
  const q = numerator / denominator;
  const logQ = log10Safe(q);
  const slope = NERNST_CONSTANT / Math.max(nValue, 1);
  const actual = e0Value - slope * logQ;
  const deltaG = (-nValue * FARADAY * actual) / 1000; // kJ/mol
  return {
    q: q,
    logQ: logQ,
    actual: actual,
    deltaG: deltaG
  };
}

function drawBeaker(x, y, width, height) {
  stroke('#90a4ae');
  strokeWeight(2);
  noFill();
  beginShape();
  vertex(x, y);
  vertex(x, y + height);
  vertex(x + width, y + height);
  vertex(x + width, y);
  endShape();
}

function drawSolution(x, y, width, height, colorHex, concentration) {
  const intensity = constrain(concentration / 2, 0.1, 1);
  const solutionColor = color(colorHex);
  solutionColor.setAlpha(120 + intensity * 80);
  noStroke();
  fill(solutionColor);
  rect(x + 4, y + height * 0.25, width - 8, height * 0.7, 12);
}

function drawElectrode(xCenter, topY, colorHex) {
  const electrodeWidth = 25;
  const electrodeHeight = 100;
  noStroke();
  fill(colorHex);
  rectMode(CENTER);
  rect(xCenter, topY + electrodeHeight / 2, electrodeWidth, electrodeHeight, 6);
  rectMode(CORNER);
  return { x: xCenter, y: topY };
}

function buildWirePath(leftTop, rightTop) {
  const peakY = leftTop.y - 80;
  const midX = (leftTop.x + rightTop.x) / 2;
  return [
    { x: leftTop.x, y: leftTop.y },
    { x: leftTop.x, y: peakY + 20 },
    { x: midX - 50, y: peakY },
    { x: midX + 50, y: peakY },
    { x: rightTop.x, y: peakY + 20 },
    { x: rightTop.x, y: rightTop.y }
  ];
}

function drawWire(path) {
  stroke('#455a64');
  strokeWeight(5);
  noFill();
  beginShape();
  path.forEach(function (pt) {
    vertex(pt.x, pt.y);
  });
  endShape();
}

function drawVoltmeter(x, y, value) {
  stroke('#757575');
  strokeWeight(2);
  fill('#eceff1');
  rectMode(CENTER);
  rect(x, y, 160, 90, 12);
  rectMode(CORNER);
  drawText('E (V)', x, y - 24, CENTER, TOP, 14, '#37474f');
  const colorValue = value > 0 ? '#1b5e20' : value < 0 ? '#c62828' : '#f9a825';
  drawText(value.toFixed(3), x, y + 4, CENTER, TOP, 28, colorValue);
}

function drawElectronFlowArrow(path, forward) {
  const midIndex = Math.floor(path.length / 2);
  const start = path[1];
  const end = path[path.length - 2];
  const arrowStart = forward ? start : end;
  const arrowEnd = forward ? end : start;
  stroke('#ffb300');
  strokeWeight(4);
  line(arrowStart.x, arrowStart.y - 14, arrowEnd.x, arrowEnd.y - 14);
  const angle = atan2(arrowEnd.y - arrowStart.y, arrowEnd.x - arrowStart.x);
  push();
  translate(arrowEnd.x, arrowEnd.y - 14);
  rotate(angle);
  noStroke();
  fill('#ffb300');
  triangle(0, 0, -10, 4, -10, -4);
  pop();
  drawText(forward ? 'Electrons flow right' : 'Electrons flow left', (arrowStart.x + arrowEnd.x) / 2, arrowStart.y - 34, CENTER, TOP, 12, forward ? '#1b5e20' : '#c62828');
}

function formatSci(value) {
  if (value >= 0.01 && value < 100) {
    return value.toFixed(3);
  }
  return value.toExponential(2);
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
