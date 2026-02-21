/*
  Limiting Reagent & Percent Yield MicroSim
  Step 2.5 Layout Planning:
  - Control inventory:
      1. Three numeric inputs (masses of reactant A, reactant B, actual yield)
      2. Reaction select dropdown
      3. Calculate button
      4. Reset button
      5. Show Work toggle button
  - Layout calculations:
      drawHeight = 520 (extra padding for centered title and panel headers)
      number of control rows = 2
      controlHeight = (2 x 35) + 10 = 80 (rounded to 100 for spacing)
      canvasHeight = drawHeight + controlHeight = 620
      iframeHeight target = canvasHeight + 2 = 622px
      leftPanelWidth = 35% of canvas width, rightPanelWidth = remaining 65%
      input vertical spacing = 45px beginning at y = panelTop + 40
  - Control positions (relative to canvas left/top):
      Inputs & dropdown: placed inside left panel (x = margin + 10, y increments of 45)
      Calculate button: left panel near bottom of input stack
      Reset button: right of calculate button
      Show Work button: inside right panel near the bottom (x = rightPanelX + 20, y = drawHeight - 40)
  - Label positions:
      text('Mass of Reactant A (g)', leftPanelX + 10, panelTop + 25)
      text('Mass of Reactant B (g)', leftPanelX + 10, panelTop + 70)
      text('Actual Yield (g)', leftPanelX + 10, panelTop + 115)
      text('Reaction', leftPanelX + 10, panelTop + 160)
      text('Results Panel', rightPanelX + 10, panelTop + 20)
*/

let canvasWidth = 800;
let drawHeight = 520;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
const titleText = 'Limiting Reagent and Percent Yield Calculator';

let canvasRef;
let massAInput;
let massBInput;
let actualYieldInput;
let reactionSelect;
let calculateButton;
let resetButton;
let showWorkButton;

let showWork = false;
let percentDisplay = 0;
let barAnimA = 0;
let barAnimB = 0;

const reactionOptions = [
  {
    id: 'ammonia',
    label: 'N₂ + 3H₂ → 2NH₃ (product: NH₃)',
    reactantA: { name: 'N₂', molarMass: 28.02, coeff: 1 },
    reactantB: { name: 'H₂', molarMass: 2.016, coeff: 3 },
    product: { name: 'NH₃', molarMass: 17.03, coeff: 2 }
  },
  {
    id: 'water',
    label: '2H₂ + O₂ → 2H₂O (product: H₂O)',
    reactantA: { name: 'H₂', molarMass: 2.016, coeff: 2 },
    reactantB: { name: 'O₂', molarMass: 32.00, coeff: 1 },
    product: { name: 'H₂O', molarMass: 18.02, coeff: 2 }
  },
  {
    id: 'iron-sulfide',
    label: 'Fe + S → FeS (product: FeS)',
    reactantA: { name: 'Fe', molarMass: 55.85, coeff: 1 },
    reactantB: { name: 'S', molarMass: 32.06, coeff: 1 },
    product: { name: 'FeS', molarMass: 87.91, coeff: 1 }
  },
  {
    id: 'combustion',
    label: 'CH₄ + 2O₂ → CO₂ + 2H₂O (product: CO₂)',
    reactantA: { name: 'CH₄', molarMass: 16.04, coeff: 1 },
    reactantB: { name: 'O₂', molarMass: 32.00, coeff: 2 },
    product: { name: 'CO₂', molarMass: 44.01, coeff: 1 }
  }
];

const calcState = {
  reaction: reactionOptions[0],
  massA: 50,
  massB: 10,
  actualYield: 20,
  molesA: 0,
  molesB: 0,
  normalizedA: 0,
  normalizedB: 0,
  limitingName: '',
  theoreticalMass: 0,
  percentYield: 0,
  stepLines: [],
  status: 'Enter reactant masses and press Calculate.'
};

function setup() {
  updateCanvasSize();
  canvasRef = createCanvas(canvasWidth, canvasHeight);
  canvasRef.parent(document.querySelector('main'));
  textFont('Arial');
  createControls();
  calculateStoichiometry();
  describe('Calculate limiting reagent, theoretical yield, and percent yield for common reactions.', 'Limiting Reagent and Percent Yield Calculator');
}

function draw() {
  updateCanvasSize();
  background('white');
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  positionInputs();
  drawTitle();
  drawPanels();
  drawLeftPanel();
  drawRightPanel();
  drawControlArea();
  animateValues();
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
}

function createControls() {
  massAInput = createInput(calcState.massA.toString(), 'number');
  massAInput.attribute('min', '0');
  massAInput.attribute('step', '0.1');

  massBInput = createInput(calcState.massB.toString(), 'number');
  massBInput.attribute('min', '0');
  massBInput.attribute('step', '0.1');

  actualYieldInput = createInput(calcState.actualYield.toString(), 'number');
  actualYieldInput.attribute('min', '0');
  actualYieldInput.attribute('step', '0.1');

  reactionSelect = createSelect();
  reactionOptions.forEach(option => reactionSelect.option(option.label, option.id));

  calculateButton = createButton('Calculate');
  calculateButton.mousePressed(calculateStoichiometry);

  resetButton = createButton('Reset');
  resetButton.mousePressed(resetInputs);

  showWorkButton = createButton('Show Work');
  showWorkButton.mousePressed(toggleShowWork);
}

function resetInputs() {
  calcState.massA = 50;
  calcState.massB = 10;
  calcState.actualYield = 20;
  massAInput.value(calcState.massA);
  massBInput.value(calcState.massB);
  actualYieldInput.value(calcState.actualYield);
  reactionSelect.value(reactionOptions[0].id);
  showWork = false;
  showWorkButton.html('Show Work');
  calculateStoichiometry();
}

function toggleShowWork() {
  showWork = !showWork;
  showWorkButton.html(showWork ? 'Hide Work' : 'Show Work');
}

function positionInputs() {
  if (!canvasRef) {
    return;
  }
  const rect = canvasRef.elt.getBoundingClientRect();
  const offsetX = rect.left + window.scrollX;
  const offsetY = rect.top + window.scrollY;
  const leftWidth = canvasWidth * 0.35;
  const panelTop = 70;
  const panelX = margin;
  const fieldWidth = leftWidth - 50;

  massAInput.size(fieldWidth, 24);
  massAInput.position(offsetX + panelX + 10, offsetY + panelTop + 45);

  massBInput.size(fieldWidth, 24);
  massBInput.position(offsetX + panelX + 10, offsetY + panelTop + 90);

  actualYieldInput.size(fieldWidth, 24);
  actualYieldInput.position(offsetX + panelX + 10, offsetY + panelTop + 135);

  reactionSelect.size(fieldWidth + 4, 28);
  reactionSelect.position(offsetX + panelX + 10, offsetY + panelTop + 180);

  calculateButton.size(fieldWidth * 0.6, 32);
  calculateButton.position(offsetX + panelX + 10, offsetY + panelTop + 230);

  resetButton.size(fieldWidth * 0.35, 32);
  resetButton.position(offsetX + panelX + 20 + fieldWidth * 0.6, offsetY + panelTop + 230);

  const rightPanelX = panelX + leftWidth + margin;
  showWorkButton.size(120, 32);
  showWorkButton.position(offsetX + rightPanelX + 10, offsetY + drawHeight - 50);
}

function calculateStoichiometry() {
  const selectedId = reactionSelect.value();
  const reaction = reactionOptions.find(r => r.id === selectedId) || reactionOptions[0];
  calcState.reaction = reaction;

  const massA = parseFloat(massAInput.value());
  const massB = parseFloat(massBInput.value());
  const actualYield = parseFloat(actualYieldInput.value());

  calcState.massA = isNaN(massA) ? 0 : massA;
  calcState.massB = isNaN(massB) ? 0 : massB;
  calcState.actualYield = isNaN(actualYield) ? 0 : actualYield;

  if (calcState.massA <= 0 || calcState.massB <= 0) {
    calcState.status = 'Enter positive masses for both reactants.';
    calcState.molesA = 0;
    calcState.molesB = 0;
    calcState.normalizedA = 0;
    calcState.normalizedB = 0;
    calcState.limitingName = '';
    calcState.theoreticalMass = 0;
    calcState.percentYield = 0;
    calcState.stepLines = [];
    return;
  }

  const molesA = calcState.massA / reaction.reactantA.molarMass;
  const molesB = calcState.massB / reaction.reactantB.molarMass;

  const normalizedA = molesA / reaction.reactantA.coeff;
  const normalizedB = molesB / reaction.reactantB.coeff;

  const limitingIsA = normalizedA <= normalizedB;
  const limitingReactant = limitingIsA ? reaction.reactantA : reaction.reactantB;
  const limitingMoles = limitingIsA ? molesA : molesB;
  const theoreticalMolesProduct = limitingMoles * (reaction.product.coeff / limitingReactant.coeff);
  const theoreticalMass = theoreticalMolesProduct * reaction.product.molarMass;
  const percentYield = theoreticalMass > 0 ? (calcState.actualYield / theoreticalMass) * 100 : 0;

  calcState.molesA = molesA;
  calcState.molesB = molesB;
  calcState.normalizedA = normalizedA;
  calcState.normalizedB = normalizedB;
  calcState.limitingName = limitingReactant.name;
  calcState.theoreticalMass = theoreticalMass;
  calcState.percentYield = constrain(percentYield, 0, 150);
  calcState.status = 'The limiting reagent is ' + limitingReactant.name + '.';
  calcState.stepLines = [
    '1. n(' + reaction.reactantA.name + ') = ' + nf(molesA, 0, 3) + ' mol',
    '2. n(' + reaction.reactantB.name + ') = ' + nf(molesB, 0, 3) + ' mol',
    '3. n/coefficient comparison → ' + reaction.reactantA.name + ': ' + nf(normalizedA, 0, 3) + ', ' +
      reaction.reactantB.name + ': ' + nf(normalizedB, 0, 3),
    '4. Limiting reagent: ' + limitingReactant.name,
    '5. Theoretical n(' + reaction.product.name + ') = ' + nf(theoreticalMolesProduct, 0, 3) + ' mol',
    '6. Theoretical yield = ' + nf(theoreticalMass, 0, 2) + ' g ' + reaction.product.name,
    '7. Percent yield = ' + nf(calcState.percentYield, 0, 1) + '%'
  ];
}

function drawTitle() {
  fill('#111111');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(26);
  text(titleText, canvasWidth / 2, 10);
}

function drawPanels() {
  const panelTop = 60;
  const leftWidth = canvasWidth * 0.35;
  const rightWidth = canvasWidth - leftWidth - margin * 3;
  const panelHeight = drawHeight - panelTop - margin;

  noStroke();
  fill('#ffffff');
  rect(margin, panelTop, leftWidth, panelHeight, 12);
  rect(margin + leftWidth + margin, panelTop, rightWidth, panelHeight, 12);
}

function drawLeftPanel() {
  const panelTop = 60;
  const leftWidth = canvasWidth * 0.35;
  const panelX = margin;
  fill('#0d47a1');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(16);
  text('Input Controls', panelX + 10, panelTop + 10);

  fill('#111111');
  textSize(14);
  text('Mass of Reactant A (g)', panelX + 10, panelTop + 30);
  text('Mass of Reactant B (g)', panelX + 10, panelTop + 75);
  text('Actual Yield (g)', panelX + 10, panelTop + 120);
  text('Reaction Selection', panelX + 10, panelTop + 165);

  fill('#546e7a');
  textSize(13);
  text('Product reported: ' + calcState.reaction.product.name, panelX + 10, panelTop + 205);
}

function drawRightPanel() {
  const panelTop = 60;
  const leftWidth = canvasWidth * 0.35;
  const rightX = margin + leftWidth + margin;
  const rightWidth = canvasWidth - leftWidth - margin * 3;
  const panelHeight = drawHeight - panelTop - margin;

  fill('#263238');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(16);
  text('Results & Visualizations', rightX + 10, panelTop + 10);

  drawMoleSummary(rightX, panelTop + 40, rightWidth);
  drawBarChart(rightX, panelTop + 110, rightWidth, 140);
  drawYieldText(rightX, panelTop + 260);
  drawGauge(rightX + rightWidth / 2, panelTop + 380, 140);
  drawShowWorkPanel(rightX, panelTop + panelHeight - 110, rightWidth, 100);
}

function drawMoleSummary(x, y, width) {
  fill('#004d40');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text('Moles of ' + calcState.reaction.reactantA.name + ': ' + nf(calcState.molesA, 0, 3), x + 10, y);
  text('Moles of ' + calcState.reaction.reactantB.name + ': ' + nf(calcState.molesB, 0, 3), x + 10, y + 22);
  text('Status: ' + calcState.status, x + 10, y + 44);
}

function drawBarChart(x, y, width, height) {
  const barWidth = width * 0.3;
  const gap = width * 0.1;
  const maxValue = max(calcState.normalizedA, calcState.normalizedB, 0.0001);
  const leftX = x + width / 2 - barWidth - gap / 2;
  const rightX = x + width / 2 + gap / 2;

  stroke('#cfd8dc');
  fill('#eceff1');
  rect(x + 5, y - 30, width - 10, height + 40, 10);
  noStroke();
  fill('#263238');
  textAlign(CENTER, TOP);
  textSize(14);
  text('Moles / Coefficient Comparison', x + width / 2, y - 25);

  const chartHeight = height;
  const barHeightA = map(barAnimA, 0, maxValue, 0, chartHeight - 20);
  const barHeightB = map(barAnimB, 0, maxValue, 0, chartHeight - 20);
  const limitingColor = '#ef5350';
  const excessColor = '#42a5f5';

  // Reactant A bar
  fill(calcState.limitingName === calcState.reaction.reactantA.name ? limitingColor : excessColor);
  rect(leftX, y + chartHeight - barHeightA, barWidth, barHeightA, 8);
  fill('#111111');
  noStroke();
  textAlign(CENTER, TOP);
  text(calcState.reaction.reactantA.name, leftX + barWidth / 2, y + chartHeight + 5);

  // Reactant B bar
  fill(calcState.limitingName === calcState.reaction.reactantB.name ? limitingColor : excessColor);
  rect(rightX, y + chartHeight - barHeightB, barWidth, barHeightB, 8);
  fill('#111111');
  noStroke();
  text(calcState.reaction.reactantB.name, rightX + barWidth / 2, y + chartHeight + 5);

  fill('#004d40');
  textSize(14);
  text('Limiting Reagent: ' + (calcState.limitingName || '—'), x + width / 2, y + chartHeight + 30);
}

function drawYieldText(x, y) {
  fill('#1b5e20');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(16);
  text('Theoretical Yield: ' + nf(calcState.theoreticalMass, 0, 2) + ' g ' + calcState.reaction.product.name, x + 10, y);
  fill('#37474f');
  textSize(14);
  text('Actual Yield: ' + nf(calcState.actualYield, 0, 2) + ' g → Percent Yield: ' + nf(calcState.percentYield, 0, 1) + '%', x + 10, y + 24);
}

function drawGauge(cx, cy, diameter) {
  const startAngle = -PI;
  const endAngle = 0;
  const percent = constrain(percentDisplay, 0, 120);
  const mappedAngle = map(constrain(percent, 0, 100), 0, 100, startAngle, endAngle);

  stroke('#eceff1');
  strokeWeight(18);
  noFill();
  arc(cx, cy, diameter, diameter, startAngle, endAngle);

  stroke(getGaugeColor(percent));
  strokeWeight(18);
  arc(cx, cy, diameter, diameter, startAngle, mappedAngle);

  noStroke();
  fill('#111111');
  textAlign(CENTER, CENTER);
  textSize(18);
  text(nf(calcState.percentYield, 0, 1) + '%', cx, cy);
  textSize(12);
  fill('#546e7a');
  text('Percent Yield', cx, cy + 22);
}

function getGaugeColor(percent) {
  if (percent < 60) {
    return '#c62828';
  }
  if (percent < 85) {
    return '#f9a825';
  }
  return '#2e7d32';
}

function drawShowWorkPanel(x, y, width, height) {
  stroke('#cfd8dc');
  fill('#ffffff');
  rect(x + 5, y, width - 10, height, 8);
  noStroke();
  fill('#263238');
  textAlign(LEFT, TOP);
  textSize(14);
  text('Show Work', x + 15, y + 8);

  if (showWork) {
    fill('#37474f');
    textSize(12);
    const startY = y + 28;
    for (let i = 0; i < calcState.stepLines.length; i += 1) {
      text(calcState.stepLines[i], x + 15, startY + i * 16);
    }
  } else {
    fill('#546e7a');
    textSize(12);
    text('Press "Show Work" to view all intermediate steps.', x + 15, y + 32);
  }
}

function drawControlArea() {
  fill('#111111');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(16);
  text('Adjust values, then press Calculate to recompute limiting reagent and yields.', 10, drawHeight + 60);
}

function animateValues() {
  percentDisplay = lerp(percentDisplay, calcState.percentYield, 0.1);
  barAnimA = lerp(barAnimA, calcState.normalizedA, 0.15);
  barAnimB = lerp(barAnimB, calcState.normalizedB, 0.15);
}
