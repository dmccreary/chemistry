/*
  Weak Acid ICE Solver MicroSim
  - drawHeight = 580 px (title, summary, ICE table, algebra panel, gauge)
  - controlHeight = 200 px with four aligned rows beneath the drawing region
  - Canvas background: aliceblue; control region: white
  - sliderLeftMargin constant retained for alignment consistency (180 px)
*/

let canvasWidth = 920;
const drawHeight = 580;
const controlHeight = 200;
let canvasHeight = drawHeight + controlHeight;
const margin = 24;
const sliderLeftMargin = 180;
const controlRowSpacing = 55;

const acidOptions = [
  { id: 'acetic', name: 'Acetic acid', label: 'Acetic acid (Ka 1.8e-5)', ka: '1.8e-5', defaultCa: 0.100 },
  { id: 'formic', name: 'Formic acid', label: 'Formic acid (Ka 1.8e-4)', ka: '1.8e-4', defaultCa: 0.050 },
  { id: 'hydrofluoric', name: 'Hydrofluoric acid', label: 'Hydrofluoric acid (Ka 7.2e-4)', ka: '7.2e-4', defaultCa: 0.020 },
  { id: 'hypochlorous', name: 'Hypochlorous acid', label: 'Hypochlorous acid (Ka 3.0e-8)', ka: '3.0e-8', defaultCa: 0.100 },
  { id: 'custom', name: 'Custom acid', label: 'Custom acid (enter name)', ka: '', defaultCa: 0.050 }
];

let selectedAcidOption = acidOptions[0];

let acidSelect;
let customAcidInput;
let haSlider;
let haSliderSlot;
let kaSlider;
let kaSliderSlot;
let calculateButton;
let customAcidLabel = 'Custom acid';

let acidValueSpan;
let concentrationValueSpan;
let kaValueSpan;
let statusValueSpan;

let controlRows = [];
let solutionData = null;
let statusMessage = 'Enter values and press Calculate to populate the table.';
let errorMessage = '';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const main = document.querySelector('main');
  if (main) {
    canvas.parent(main);
  }
  textFont('Arial');
  createControlPanel();
  updateInputDisplays();
  calculateSolution();
  describe('Enter a weak acid and Ka to see the ICE table, quadratic solution, and percent ionization gauges.');
}

function draw() {
  updateCanvasSize();
  background('aliceblue');
  stroke('silver');
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  noStroke();

  drawTitle();
  drawInputSummary();
  drawIceTable();
  drawResultsPanel();
  drawGauge();
  positionControls();
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(30);
  text('Weak Acid ICE Table Solver', canvasWidth / 2, 20);
}

function drawInputSummary() {
  const panelX = margin;
  const panelY = 70;
  const panelWidth = canvasWidth - margin * 2;
  const panelHeight = 90;

  stroke('lightgray');
  fill('white');
  rect(panelX, panelY, panelWidth, panelHeight, 12);

  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(16);
  const acidLabel = solutionData ? solutionData.acidLabel : 'Acid input summary';
  text(acidLabel, panelX + 14, panelY + 12);

  textSize(13);
  const caText = solutionData ? formatValue(solutionData.ca, 4) + ' M' : 'Initial [HA] pending';
  const kaText = solutionData ? formatValue(solutionData.ka, 3) : 'Ka pending';
  text('Initial [HA]: ' + caText, panelX + 14, panelY + 38);
  text('Ka value: ' + kaText, panelX + 14, panelY + 56);

  fill(errorMessage ? 'firebrick' : 'dimgray');
  text('Status: ' + statusMessage, panelX + 14, panelY + panelHeight - 24);
}

function drawIceTable() {
  const tableX = margin;
  const tableY = 180;
  const tableWidth = canvasWidth - margin * 2;
  const rowHeight = 60;
  const columnWidth = tableWidth / 3;

  stroke('lightgray');
  fill('white');
  rect(tableX, tableY, tableWidth, rowHeight * 4, 12);

  noStroke();
  fill('#FFF9D6');
  rect(tableX + 4, tableY + rowHeight * 3 + 4, tableWidth - 8, rowHeight - 8, 8);

  stroke('lightgray');
  for (let r = 1; r < 4; r += 1) {
    line(tableX, tableY + rowHeight * r, tableX + tableWidth, tableY + rowHeight * r);
  }
  for (let c = 1; c < 3; c += 1) {
    line(tableX + columnWidth * c, tableY, tableX + columnWidth * c, tableY + rowHeight * 4);
  }

  noStroke();
  fill('black');
  textAlign(CENTER, CENTER);
  textSize(16);
  const headers = ['HA', 'H3O+', 'A-'];
  for (let i = 0; i < headers.length; i += 1) {
    text(headers[i], tableX + columnWidth * (i + 0.5), tableY + rowHeight / 2);
  }

  const rows = ['Initial (I)', 'Change (C)', 'Equilibrium (E)'];
  textAlign(LEFT, CENTER);
  for (let r = 0; r < rows.length; r += 1) {
    text(rows[r], tableX + 8, tableY + rowHeight * (r + 1.5));
  }

  textAlign(CENTER, CENTER);
  textSize(15);
  const displayRows = buildTableStrings();
  for (let r = 0; r < displayRows.length; r += 1) {
    const rowValues = displayRows[r];
    for (let c = 0; c < rowValues.length; c += 1) {
      text(rowValues[c], tableX + columnWidth * (c + 0.5), tableY + rowHeight * (r + 1.5));
    }
  }
}

function drawResultsPanel() {
  const panelX = margin;
  const panelWidth = canvasWidth - margin * 2;
  const panelHeight = 130;
  const panelY = drawHeight - panelHeight - 80;

  stroke('lightgray');
  fill('white');
  rect(panelX, panelY, panelWidth, panelHeight, 12);

  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(15);
  text('Ka expression', panelX + 14, panelY + 12);
  text('Ka = x^2 / (Ca - x)', panelX + 14, panelY + 34);

  if (!solutionData) {
    fill('dimgray');
    text('Enter values and press Calculate to see the algebra details.', panelX + 14, panelY + 60);
    return;
  }

  const substitution = buildKaSubstitutionText(solutionData);
  textSize(13);
  text(substitution, panelX + 14, panelY + 56);
  text('Quadratic root: ' + formatValue(solutionData.x, 4) + ' M', panelX + 14, panelY + 76);

  const approxPercent = (solutionData.approxRatio * 100).toFixed(2) + '%';
  const verdict = solutionData.approxValid ? 'Small-x valid (' + approxPercent + ')' : 'Small-x invalid (' + approxPercent + ')';
  text('Approximation check: ' + verdict, panelX + 14, panelY + 96);

  const rightColumnX = panelX + panelWidth / 2 + 10;
  textSize(14);
  text('x = [H3O+]: ' + formatValue(solutionData.h3o, 4) + ' M', rightColumnX, panelY + 12);
  text('pH: ' + solutionData.ph.toFixed(2), rightColumnX, panelY + 34);
  text('pOH: ' + solutionData.poh.toFixed(2), rightColumnX, panelY + 54);
  text('[OH-]: ' + formatValue(solutionData.oh, 3) + ' M', rightColumnX, panelY + 74);
  const percentLine = solutionData.percentIonization > 100 ? '>100% (fully dissociated)' : solutionData.percentIonization.toFixed(2) + '%';
  text('% ionization: ' + percentLine, rightColumnX, panelY + 94);

  if (solutionData.kaGreaterThanCa) {
    fill('firebrick');
    text('Warning: Ka exceeds Ca, so the quadratic solution dominates.', rightColumnX, panelY + 114);
  }
}

function drawGauge() {
  const gaugeX = margin;
  const gaugeWidth = canvasWidth - margin * 2;
  const gaugeHeight = 34;
  const gaugeY = drawHeight - gaugeHeight - 24;

  stroke('lightgray');
  fill('white');
  rect(gaugeX, gaugeY, gaugeWidth, gaugeHeight, 18);

  if (solutionData) {
    const percent = constrain(solutionData.percentIonization, 0, 100);
    const fillWidth = gaugeWidth * (percent / 100);
    noStroke();
    fill('#4CAF50');
    rect(gaugeX, gaugeY, fillWidth, gaugeHeight, 18, percent >= 99 ? 18 : 0, percent >= 99 ? 18 : 0, 18);
  }

  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  text('0%', gaugeX + 8, gaugeY + gaugeHeight / 2);
  textAlign(RIGHT, CENTER);
  text('100%', gaugeX + gaugeWidth - 8, gaugeY + gaugeHeight / 2);
  textAlign(CENTER, CENTER);
  let gaugeLabel = 'Percent ionization gauge';
  if (solutionData) {
    gaugeLabel = solutionData.percentIonization > 100 ? '>100% ionized (Ka >> Ca)' : solutionData.percentIonization.toFixed(2) + '% ionized';
  }
  text(gaugeLabel, gaugeX + gaugeWidth / 2, gaugeY + gaugeHeight / 2);
}

function buildTableStrings() {
  if (!solutionData) {
    return [
      ['--', '--', '--'],
      ['--', '--', '--'],
      ['--', '--', '--']
    ];
  }
  const table = solutionData.table;
  return [
    [formatValue(table.initial.ha, 4) + ' M', '0.000 M', '0.000 M'],
    [formatSigned(table.change.ha) + ' M', formatSigned(table.change.h3o) + ' M', formatSigned(table.change.a) + ' M'],
    [formatValue(table.equilibrium.ha, 4) + ' M', formatValue(table.equilibrium.h3o, 4) + ' M', formatValue(table.equilibrium.a, 4) + ' M']
  ];
}

function buildKaSubstitutionText(data) {
  const numerator = formatValue(data.x * data.x, 4);
  const computed = data.kaRecalc === Infinity ? 'approaches infinity' : formatValue(data.kaRecalc, 4);
  return formatValue(data.ka, 4) + ' = ' + numerator + ' / (' + formatValue(data.ca, 4) + ' - ' + formatValue(data.x, 4) + ') ~ ' + computed;
}

function createControlPanel() {
  const acidRow = createControlRow('Acid selection');
  acidValueSpan = acidRow.value;
  acidSelect = createSelect();
  acidOptions.forEach(function (option) {
    acidSelect.option(option.label, option.id);
  });
  acidSelect.selected(selectedAcidOption.id);
  acidSelect.parent(acidRow.slot);
  acidSelect.changed(handleAcidChange);

  customAcidInput = createInput('Custom acid');
  styleTextInput(customAcidInput);
  customAcidInput.style('width', '180px');
  customAcidInput.parent(acidRow.slot);
  customAcidInput.style('margin-left', '10px');
  customAcidInput.style('display', 'none');
  customAcidInput.attribute('maxlength', '40');
  customAcidInput.input(function () {
    customAcidLabel = customAcidInput.value();
    updateInputDisplays();
  });

  const concentrationRow = createControlRow('Initial [HA] (M)');
  concentrationValueSpan = concentrationRow.value;
  haSliderSlot = concentrationRow.slot;
  haSlider = createSlider(0.005, 1.0, selectedAcidOption.defaultCa, 0.005);
  haSlider.parent(concentrationRow.slot);
  haSlider.style('width', '240px');
  haSlider.style('margin-top', '8px');
  haSlider.input(function () {
    updateInputDisplays();
  });

  const kaRow = createControlRow('Ka value');
  kaValueSpan = kaRow.value;
  kaSliderSlot = kaRow.slot;
  const initialKa = selectedAcidOption.ka ? parseFloat(selectedAcidOption.ka) : 1e-5;
  kaSlider = createSlider(-10, -2, Math.log10(initialKa), 0.01);
  kaSlider.parent(kaRow.slot);
  kaSlider.style('width', '240px');
  kaSlider.style('margin-top', '8px');
  kaSlider.input(function () {
    updateInputDisplays();
  });

  const actionRow = createControlRow('Action');
  statusValueSpan = actionRow.value;
  calculateButton = createButton('Calculate');
  stylePrimaryButton(calculateButton);
  calculateButton.parent(actionRow.slot);
  calculateButton.mousePressed(handleCalculate);
  statusValueSpan.html('Ready');

  updateSliderLayout();
  handleAcidChange();
}

function createControlRow(labelText) {
  const row = createDiv();
  row.style('display', 'inline-block');
  row.style('background', 'white');
  row.style('padding', '6px 10px');
  row.style('border-radius', '10px');
  row.style('box-shadow', '0 1px 4px rgba(0,0,0,0.15)');
  row.style('font-family', 'Arial, Helvetica, sans-serif');
  row.style('font-size', '14px');
  controlRows.push(row);

  const labelSpan = createSpan(labelText + ': ');
  labelSpan.parent(row);
  labelSpan.style('display', 'inline-block');
  labelSpan.style('width', '150px');
  labelSpan.style('font-weight', '600');

  const valueSpan = createSpan('');
  valueSpan.parent(row);
  valueSpan.style('display', 'inline-block');
  valueSpan.style('width', '80px');
  valueSpan.style('font-weight', '600');
  valueSpan.style('color', '#0c4f74');

  const slot = createDiv();
  slot.parent(row);
  slot.style('display', 'inline-block');
  slot.style('width', (sliderLeftMargin + 80) + 'px');
  slot.style('margin-left', '12px');

  return { row: row, value: valueSpan, slot: slot };
}

function handleAcidChange() {
  if (!acidSelect) {
    return;
  }
  const selectedId = acidSelect.value();
  selectedAcidOption = acidOptions.find(function (option) {
    return option.id === selectedId;
  }) || acidOptions[0];

  if (selectedAcidOption.id === 'custom') {
    if (customAcidInput) {
      customAcidInput.style('display', 'inline-block');
      if (!customAcidLabel.trim()) {
        customAcidLabel = 'Custom acid';
      }
      customAcidInput.value(customAcidLabel);
    }
  } else if (customAcidInput) {
    customAcidInput.style('display', 'none');
  }

  if (kaSlider) {
    const kaValue = selectedAcidOption.ka ? parseFloat(selectedAcidOption.ka) : 1e-5;
    if (kaValue > 0) {
      kaSlider.value(Math.log10(kaValue));
    }
  }
  if (haSlider && selectedAcidOption.defaultCa) {
    haSlider.value(selectedAcidOption.defaultCa);
  }
  updateInputDisplays();
}

function getCurrentAcidLabel() {
  if (!selectedAcidOption) {
    return 'Unnamed acid';
  }
  if (selectedAcidOption.id === 'custom') {
    const customLabelSource = customAcidInput ? customAcidInput.value() : customAcidLabel;
    const trimmed = (customLabelSource || '').trim();
    return trimmed || 'Custom acid';
  }
  return selectedAcidOption.name;
}

function updateSliderLayout() {
  const sliderWidth = Math.max(canvasWidth - sliderLeftMargin - margin * 2, 160);
  if (haSlider) {
    haSlider.size(sliderWidth);
  }
  if (haSliderSlot) {
    haSliderSlot.style('width', sliderWidth + 'px');
  }
  if (kaSlider) {
    kaSlider.size(sliderWidth);
  }
  if (kaSliderSlot) {
    kaSliderSlot.style('width', sliderWidth + 'px');
  }
}

function styleTextInput(input) {
  input.attribute('type', 'text');
  input.style('width', '220px');
  input.style('padding', '6px');
  input.style('border', '1px solid #b0bec5');
  input.style('border-radius', '6px');
  input.style('font-size', '14px');
}

function stylePrimaryButton(button) {
  button.style('padding', '8px 18px');
  button.style('background', '#1976D2');
  button.style('color', 'white');
  button.style('border', 'none');
  button.style('border-radius', '6px');
  button.style('font-size', '15px');
  button.style('cursor', 'pointer');
}

function positionControls() {
  const canvasEl = document.querySelector('main canvas');
  if (!canvasEl) {
    return;
  }
  const rect = canvasEl.getBoundingClientRect();
  const baseX = rect.left + window.scrollX + margin;
  const baseY = rect.top + window.scrollY + drawHeight + 20;

  for (let i = 0; i < controlRows.length; i += 1) {
    controlRows[i].position(baseX, baseY + i * controlRowSpacing);
  }
}

function handleCalculate() {
  calculateSolution();
}

function calculateSolution() {
  updateInputDisplays();
  const acidLabel = getCurrentAcidLabel();
  const ca = haSlider ? parseFloat(haSlider.value()) : NaN;
  const ka = getKaFromSlider();

  if (!Number.isFinite(ca) || ca <= 0) {
    solutionData = null;
    errorMessage = 'Enter a positive initial concentration.';
    statusMessage = errorMessage;
    setStatusValue('Input error', true);
    return;
  }
  if (!Number.isFinite(ka) || ka <= 0) {
    solutionData = null;
    errorMessage = 'Enter a positive Ka value.';
    statusMessage = errorMessage;
    setStatusValue('Input error', true);
    return;
  }

  const discriminant = (ka * ka) + (4 * ka * ca);
  if (!Number.isFinite(discriminant) || discriminant < 0) {
    solutionData = null;
    errorMessage = 'Inputs produced an invalid discriminant.';
    statusMessage = errorMessage;
    setStatusValue('Input error', true);
    return;
  }

  const sqrtTerm = Math.sqrt(discriminant);
  const root = (-ka + sqrtTerm) / 2;
  if (!Number.isFinite(root) || root <= 0) {
    solutionData = null;
    errorMessage = 'Unable to compute a physical [H3O+] root.';
    statusMessage = errorMessage;
    setStatusValue('Input error', true);
    return;
  }

  const ratio = ca > 0 ? root / ca : 1;
  const percentIonization = ratio * 100;
  const eqHa = Math.max(ca - root, 0);
  const ph = root > 0 ? -Math.log10(root) : 14;
  const poh = 14 - ph;
  const oh = Math.pow(10, -poh);
  const recalculatedKa = eqHa > 0 ? (root * root) / eqHa : Infinity;

  solutionData = {
    acidLabel: acidLabel,
    ca: ca,
    ka: ka,
    x: root,
    h3o: root,
    ph: ph,
    poh: poh,
    oh: oh,
    approxRatio: ratio,
    approxValid: ratio < 0.05,
    percentIonization: percentIonization,
    kaGreaterThanCa: ka > ca,
    kaRecalc: recalculatedKa,
    table: {
      initial: { ha: ca, h3o: 0, a: 0 },
      change: { ha: -root, h3o: root, a: root },
      equilibrium: { ha: eqHa, h3o: root, a: root }
    }
  };

  errorMessage = '';
  statusMessage = 'Solved using quadratic root.';
  setStatusValue('Solved', false);
}

function setStatusValue(text, isError) {
  if (statusValueSpan) {
    statusValueSpan.html(text);
    statusValueSpan.style('color', isError ? '#c62828' : '#0c4f74');
  }
}

function updateInputDisplays() {
  if (acidValueSpan) {
    acidValueSpan.html(limitText(getCurrentAcidLabel(), 24));
  }
  if (concentrationValueSpan && haSlider) {
    const ca = parseFloat(haSlider.value());
    concentrationValueSpan.html(Number.isFinite(ca) ? ca.toFixed(3) + ' M' : '--');
  }
  if (kaValueSpan) {
    const ka = getKaFromSlider();
    kaValueSpan.html(Number.isFinite(ka) ? formatValue(ka, 3) : '--');
  }
}

function formatValue(value, decimals) {
  if (!Number.isFinite(value)) {
    return '--';
  }
  const absValue = Math.abs(value);
  const places = typeof decimals === 'number' ? decimals : 3;
  if (absValue >= 0.001 && absValue < 1000) {
    return value.toFixed(places);
  }
  return value.toExponential(Math.max(places - 1, 1));
}

function formatSigned(value) {
  if (!Number.isFinite(value)) {
    return '--';
  }
  const sign = value >= 0 ? '+' : '';
  return sign + formatValue(value, 4);
}

function limitText(text, maxLen) {
  if (!text) {
    return '';
  }
  if (text.length <= maxLen) {
    return text;
  }
  return text.substring(0, maxLen - 3) + '...';
}

function getKaFromSlider() {
  if (!kaSlider) {
    return NaN;
  }
  const exponent = kaSlider.value();
  return Math.pow(10, exponent);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateSliderLayout();
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
  canvasHeight = drawHeight + controlHeight;
}
