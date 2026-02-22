/*
  Electrolysis Stoichiometry Calculator
  - drawHeight = 540 px (title, diagram, step-by-step panel)
  - controlHeight = 280 px (four control rows beneath drawing region)
  - Canvas backgrounds follow MicroSim standards: aliceblue drawing region, white control region
*/

let canvasWidth = 920;
const drawHeight = 540;
const controlHeight = 280;
let canvasHeight = drawHeight + controlHeight;
const margin = 26;
const controlRowSpacing = 70;
const sliderLeftMargin = 252; // space used by label (150px) + value (90px) + gap (12px)

const FARADAY = 96485; // C/mol e-

const metals = [
  { id: 'cu', label: 'Copper (Cu2+)', molarMass: 63.55, electrons: 2, color: '#b87333' },
  { id: 'ag', label: 'Silver (Ag+)', molarMass: 107.87, electrons: 1, color: '#c0c0c0' },
  { id: 'au', label: 'Gold (Au3+)', molarMass: 196.97, electrons: 3, color: '#ffb300' },
  { id: 'al', label: 'Aluminum (Al3+)', molarMass: 26.98, electrons: 3, color: '#b0bec5' },
  { id: 'fe', label: 'Iron (Fe2+)', molarMass: 55.85, electrons: 2, color: '#757575' },
  { id: 'custom', label: 'Custom metal', molarMass: 50, electrons: 2, color: '#90a4ae' }
];

const MODES = {
  MASS: 'mass',
  TIME: 'time',
  CURRENT: 'current'
};

let selectedMode = MODES.MASS;
let selectedMetal = metals[0];
let customMolarMass = 50;
let customElectrons = 2;
let currentValue = 2.50; // A
let timeValue = 30; // minutes
let massValue = 1.50; // grams

let modeRadio;
let metalSelect;
let currentInput;
let timeInput;
let massInput;
let customMolarInput;
let customElectronsInput;
let calculateButton;
let resetButton;

const controlRows = [];
let modeValueSpan;
let metalValueSpan;
let inputValueSpan;
let buttonValueSpan;

let stepResults = {
  charge: null,
  electrons: null,
  molesMetal: null,
  mass: null
};

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
  describe('Use Faraday\'s law to solve for mass, current, or time in an electrolysis process.');
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

  drawTitle();
  drawDiagram();
  drawStepPanel();
  drawResultCard();
  positionControls();
}

function drawTitle() {
  drawText('Electrolysis Stoichiometry Calculator', canvasWidth / 2, 18, CENTER, TOP, 32, '#000000');
}

function drawDiagram() {
  const cellWidth = 220;
  const cellHeight = 200;
  const startX = margin + 40;
  const startY = 90;

  stroke('#90a4ae');
  strokeWeight(2);
  noFill();
  rect(startX, startY, cellWidth, cellHeight, 18);
  rect(startX + cellWidth + 80, startY, cellWidth, cellHeight, 18);

  drawText('Anode (+)', startX + cellWidth / 2, startY - 20, CENTER, TOP, 16, '#c62828');
  drawText('Cathode (-)', startX + cellWidth + 80 + cellWidth / 2, startY - 20, CENTER, TOP, 16, '#1b5e20');

  drawSolution(startX, startY, cellWidth, cellHeight, '#90caf9');
  drawSolution(startX + cellWidth + 80, startY, cellWidth, cellHeight, '#ffe082');

  drawElectrode(startX + cellWidth * 0.3, startY - 10, '#6d4c41');
  drawElectrode(startX + cellWidth + 80 + cellWidth * 0.7, startY - 10, '#6d4c41');

  drawText('Plating metal: ' + getMetalLabel(), canvasWidth / 2, startY + cellHeight + 10, CENTER, TOP, 16, '#37474f');

  drawParticles(startX, startY, cellWidth, cellHeight);
  drawParticles(startX + cellWidth + 80, startY, cellWidth, cellHeight, true);
}

function drawSolution(x, y, width, height, colorHex) {
  noStroke();
  const colorObj = color(colorHex);
  colorObj.setAlpha(180);
  fill(colorObj);
  rect(x + 6, y + 30, width - 12, height - 40, 12);
}

function drawElectrode(xCenter, topY, colorHex) {
  noStroke();
  fill(colorHex);
  rectMode(CENTER);
  rect(xCenter, topY + 170 / 2, 24, 170, 8);
  rectMode(CORNER);
}

function drawParticles(x, y, width, height, depositing = false) {
  const colorHex = depositing ? selectedMetal.color : '#cfd8dc';
  fill(colorHex);
  noStroke();
  const count = mapResultToParticles();
  for (let i = 0; i < count; i += 1) {
    const px = x + random(20, width - 20);
    const py = y + random(40, height - 20);
    ellipse(px, py, 6, 6);
  }
}

function mapResultToParticles() {
  if (stepResults.mass == null) {
    return 10;
  }
  const normalized = constrain(stepResults.mass / 2.0, 0, 1);
  return 10 + Math.floor(normalized * 40);
}

function drawStepPanel() {
  const panelX = margin;
  const panelY = drawHeight - 220;
  const panelWidth = canvasWidth - margin * 2;
  const panelHeight = 160;
  stroke('#cfd8dc');
  fill('white');
  rect(panelX, panelY, panelWidth, panelHeight, 16);

  const stepWidth = (panelWidth - 40) / 4;
  const steps = ['Charge (q = I * t)', 'Mol e- (q / F)', 'Mol metal (mol e- / z)', 'Mass (mol * M)'];
  const values = [formatValue(stepResults.charge, 'C'), formatValue(stepResults.electrons, 'mol e-'), formatValue(stepResults.molesMetal, 'mol'), formatValue(stepResults.mass, 'g')];

  for (let i = 0; i < 4; i += 1) {
    const x = panelX + 20 + i * stepWidth;
    drawStepBox(x, panelY + 20, stepWidth - 20, 110, steps[i], values[i], i);
  }
}

function drawStepBox(x, y, width, height, title, value, index) {
  const active = stepResults.mass != null;
  stroke(active ? '#43a047' : '#cfd8dc');
  strokeWeight(2);
  fill(active ? 'rgba(67,160,71,0.12)' : 'white');
  rect(x, y, width, height, 12);
  drawText(title, x + width / 2, y + 10, CENTER, TOP, 12, '#37474f');
  drawText(value || '--', x + width / 2, y + height / 2, CENTER, CENTER, 16, '#1b5e20');
}

function drawResultCard() {
  const cardX = canvasWidth - margin - 260;
  const cardY = 80;
  stroke('#cfd8dc');
  fill('white');
  rect(cardX, cardY, 240, 140, 16);
  drawText('Result', cardX + 20, cardY + 10, LEFT, TOP, 16, '#0c4f74');
  const text = buildResultText();
  drawText(text, cardX + 20, cardY + 40, LEFT, TOP, 14, '#37474f');
}

function buildResultText() {
  if (stepResults.mass == null) {
    return 'Enter values and click Calculate to see the solution.';
  }
  if (selectedMode === MODES.MASS) {
    return `Mass deposited: ${formatValue(stepResults.mass, 'g')}`;
  }
  if (selectedMode === MODES.TIME) {
    const minutes = formatValue(stepResults.timeMinutes, 'min');
    return `Time required: ${minutes}`;
  }
  if (selectedMode === MODES.CURRENT) {
    const amps = formatValue(stepResults.current, 'A');
    return `Current required: ${amps}`;
  }
  return '';
}

function createControls() {
  const modeRow = createControlRow('Solve for');
  modeValueSpan = modeRow.value;
  modeRadio = createRadio();
  modeRadio.option('Mass', MODES.MASS);
  modeRadio.option('Time', MODES.TIME);
  modeRadio.option('Current', MODES.CURRENT);
  modeRadio.selected(selectedMode);
  modeRadio.parent(modeRow.slot);
  modeRadio.changed(function () {
    selectedMode = modeRadio.value();
    stepResults = { charge: null, electrons: null, molesMetal: null, mass: null };
    updateControlDisplays();
  });

  const metalRow = createControlRow('Metal');
  metalValueSpan = metalRow.value;
  metalSelect = createSelect();
  metals.forEach(function (metal) {
    metalSelect.option(metal.label, metal.id);
  });
  metalSelect.selected(selectedMetal.id);
  metalSelect.parent(metalRow.slot);
  metalSelect.changed(function () {
    const id = metalSelect.value();
    selectedMetal = metals.find(function (metal) { return metal.id === id; }) || metals[0];
    updateControlDisplays();
  });
  createCustomInputs(metalRow.slot);

  const inputRow = createControlRow('Inputs');
  inputValueSpan = inputRow.value;
  currentInput = createNumberInput(inputRow.slot, currentValue, 'Current (A)', function (value) {
    currentValue = value;
  });
  timeInput = createNumberInput(inputRow.slot, timeValue, 'Time (min)', function (value) {
    timeValue = value;
  });
  massInput = createNumberInput(inputRow.slot, massValue, 'Mass (g)', function (value) {
    massValue = value;
  });

  const buttonRow = createControlRow('Actions');
  buttonValueSpan = buttonRow.value;
  calculateButton = createButton('Calculate');
  calculateButton.parent(buttonRow.slot);
  calculateButton.mousePressed(handleCalculate);
  calculateButton.addClass('primary-button');

  resetButton = createButton('Reset');
  resetButton.parent(buttonRow.slot);
  resetButton.mousePressed(handleReset);

  updateSliderWidths();
}

function createCustomInputs(slot) {
  const customGroup = createDiv();
  customGroup.parent(slot);
  customGroup.id('custom-input-group');
  customGroup.style('display', 'block');
  customGroup.style('margin-top', '8px');

  customMolarInput = createInput(customMolarMass.toString());
  customMolarInput.parent(customGroup);
  customMolarInput.attribute('type', 'number');
  customMolarInput.attribute('step', '0.01');
  customMolarInput.attribute('placeholder', 'Molar mass (g/mol)');
  customMolarInput.input(function () {
    customMolarMass = parseFloat(customMolarInput.value()) || customMolarMass;
  });

  customElectronsInput = createInput(customElectrons.toString());
  customElectronsInput.parent(customGroup);
  customElectronsInput.attribute('type', 'number');
  customElectronsInput.attribute('step', '1');
  customElectronsInput.attribute('placeholder', 'Electrons per ion');
  customElectronsInput.input(function () {
    customElectrons = parseInt(customElectronsInput.value(), 10) || customElectrons;
  });
}

function createNumberInput(parent, initial, label, callback) {
  const wrapper = createDiv();
  wrapper.parent(parent);
  wrapper.style('display', 'inline-block');
  wrapper.style('margin-right', '12px');
  const span = createSpan(label + ': ');
  span.parent(wrapper);
  span.style('display', 'inline-block');
  span.style('width', '120px');
  span.style('font-weight', '600');
  const input = createInput(initial.toString(), 'number');
  input.parent(wrapper);
  input.attribute('step', '0.01');
  input.attribute('style', 'width:100px;padding:4px;');
  input.input(function () {
    const value = parseFloat(input.value());
    if (Number.isFinite(value)) {
      callback(value);
    }
  });
  return input;
}

function handleCalculate() {
  const metalData = getMetalData();
  if (!validateInputs()) {
    return;
  }
  stepResults = computeStoichiometry(metalData);
}

function handleReset() {
  currentValue = 2.5;
  timeValue = 30;
  massValue = 1.5;
  stepResults = { charge: null, electrons: null, molesMetal: null, mass: null };
  updateControlDisplays();
}

function validateInputs() {
  if (selectedMode === MODES.MASS) {
    return currentValue > 0 && timeValue > 0;
  }
  if (selectedMode === MODES.TIME) {
    return currentValue > 0 && massValue > 0;
  }
  if (selectedMode === MODES.CURRENT) {
    return timeValue > 0 && massValue > 0;
  }
  return false;
}

function computeStoichiometry(metalData) {
  const electronsPerIon = metalData.electrons;
  const molarMass = metalData.molarMass;

  if (selectedMode === MODES.MASS) {
    const charge = currentValue * (timeValue * 60);
    const molesE = charge / FARADAY;
    const molesMetal = molesE / electronsPerIon;
    const mass = molesMetal * molarMass;
    return { charge, electrons: molesE, molesMetal, mass };
  }
  if (selectedMode === MODES.TIME) {
    const molesMetal = massValue / molarMass;
    const molesE = molesMetal * electronsPerIon;
    const charge = molesE * FARADAY;
    const timeSeconds = charge / currentValue;
    const timeMinutes = timeSeconds / 60;
    return { charge, electrons: molesE, molesMetal, mass: massValue, timeMinutes };
  }
  if (selectedMode === MODES.CURRENT) {
    const molesMetal = massValue / molarMass;
    const molesE = molesMetal * electronsPerIon;
    const charge = molesE * FARADAY;
    const timeSeconds = timeValue * 60;
    const current = charge / timeSeconds;
    return { charge, electrons: molesE, molesMetal, mass: massValue, current };
  }
  return { charge: null, electrons: null, molesMetal: null, mass: null };
}

function getMetalData() {
  if (selectedMetal.id === 'custom') {
    return { molarMass: customMolarMass, electrons: customElectrons, color: '#90a4ae' };
  }
  return selectedMetal;
}

function getMetalLabel() {
  if (selectedMetal.id === 'custom') {
    return `Custom (M = ${customMolarMass} g/mol, z = ${customElectrons})`;
  }
  return selectedMetal.label;
}

function updateControlDisplays() {
  if (modeValueSpan) {
    modeValueSpan.html(selectedMode.toUpperCase());
  }
  if (metalValueSpan) {
    metalValueSpan.html(getMetalLabel());
  }
  if (inputValueSpan) {
    inputValueSpan.html('');
  }
  const customGroup = document.getElementById('custom-input-group');
  if (customGroup) {
    customGroup.style.display = selectedMetal.id === 'custom' ? 'block' : 'none';
  }
  currentInput.value(currentValue.toFixed(2));
  timeInput.value(timeValue.toFixed(1));
  massInput.value(massValue.toFixed(2));
  positionControls();
}

function formatValue(value, unit) {
  if (value == null) {
    return '--';
  }
  if (Math.abs(value) >= 0.01 && Math.abs(value) < 1000) {
    return `${value.toFixed(3)} ${unit}`;
  }
  return `${value.toExponential(2)} ${unit}`;
}

function drawText(content, x, y, alignX = LEFT, alignY = TOP, size = 14, colorValue = '#37474f') {
  noStroke();
  fill(colorValue);
  textAlign(alignX, alignY);
  textSize(size);
  text(content, x, y);
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
  controlRows.push({ row, slot: null, value: null });

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
  slot.style('width', '280px');
  slot.style('margin-left', '12px');

  const record = { row, value: valueSpan, slot };
  controlRows[controlRows.length - 1] = record;
  return record;
}

function updateSliderWidths() {
  const sliderWidth = Math.max(canvasWidth - sliderLeftMargin - margin * 2, 200);
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
    canvasWidth = container.offsetWidth || 800;
  }
  canvasHeight = drawHeight + controlHeight;
}
