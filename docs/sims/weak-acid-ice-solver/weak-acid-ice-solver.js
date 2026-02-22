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

const defaultAcid = 'Acetic acid';
const defaultConcentration = '0.100';
const defaultKa = '1.8e-5';

let acidInput;
let concentrationInput;
let kaInput;
let calculateButton;

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
  acidInput = createInput(defaultAcid);
  concentrationInput = createInput(defaultConcentration);
  kaInput = createInput(defaultKa);

  const acidRow = createControlRow('Acid name');
  acidValueSpan = acidRow.value;
  acidInput.parent(acidRow.slot);
  styleTextInput(acidInput);

  const concentrationRow = createControlRow('Initial [HA] (M)');
  concentrationValueSpan = concentrationRow.value;
  concentrationInput.parent(concentrationRow.slot);
  styleTextInput(concentrationInput);

  const kaRow = createControlRow('Ka value');
  kaValueSpan = kaRow.value;
  kaInput.parent(kaRow.slot);
  styleTextInput(kaInput);

  const actionRow = createControlRow('Action');
  statusValueSpan = actionRow.value;
  calculateButton = createButton('Calculate');
  stylePrimaryButton(calculateButton);
  calculateButton.parent(actionRow.slot);
  calculateButton.mousePressed(handleCalculate);
  statusValueSpan.html('Ready');

  acidInput.input(function () {
    updateInputDisplays();
  });
  concentrationInput.input(function () {
    updateInputDisplays();
  });
  kaInput.input(function () {
    updateInputDisplays();
  });
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
  const acidLabel = acidInput.value().trim() || 'Unnamed acid';
  const ca = parseScientific(concentrationInput.value());
  const ka = parseScientific(kaInput.value());

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
    const trimmed = acidInput.value().trim();
    acidValueSpan.html(limitText(trimmed || 'Not set', 22));
  }
  if (concentrationValueSpan) {
    const ca = parseScientific(concentrationInput.value());
    concentrationValueSpan.html(Number.isFinite(ca) ? formatValue(ca, 4) + ' M' : '--');
  }
  if (kaValueSpan) {
    const ka = parseScientific(kaInput.value());
    kaValueSpan.html(Number.isFinite(ka) ? formatValue(ka, 3) : '--');
  }
}

function parseScientific(value) {
  if (typeof value !== 'string') {
    return NaN;
  }
  const cleaned = value.replace(/,/g, '').trim();
  if (cleaned === '') {
    return NaN;
  }
  return Number(cleaned);
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

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
  canvasHeight = drawHeight + controlHeight;
}
