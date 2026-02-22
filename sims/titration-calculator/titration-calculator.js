/*
  Titration Calculator MicroSim
  Step 2.5 layout planning:
  - Control inventory:
      1. Dropdown: titration type (row 1)
      2. Slider: acid concentration (row 2)
      3. Slider: acid volume (row 3)
      4. Slider: base concentration (row 4)
      5. Calculate button (row 5) – though computation is live, button reinforces affordability
      6. Instruction text rows (row 6)
  - Layout calculations:
      drawHeight = 520 (extra room for centered title and axis labels)
      controlHeight = 100 (two rows of text beneath canvas)
      canvasHeight = drawHeight + controlHeight = 620 (iframe height = 622px)
      leftPanelWidth = 0.42 * canvasWidth, rightPanelWidth = remaining space
      sliderLeftMargin = margin + 10 inside left panel
      slider width = leftPanelWidth - 40
  - Control positions:
      Dropdown: (panelX + 10, panelTop + 60)
      Sliders start at y = panelTop + 120 with 70px spacing
      Calculate button near panel bottom (panelTop + 360)
  - Label positions:
      text('Ca (acid concentration) = X.XX M', ...), etc. placed just above sliders
      text('Volume at equivalence point:' ... ) near panel bottom
*/

let canvasWidth = 800;
let drawHeight = 520;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
const titleText = 'Interactive Titration Calculator';

let titrationTypeSelect;
let acidConcSlider;
let acidVolSlider;
let baseConcSlider;
let calculateButton;

let curvePoints = [];
let equivalenceVolume = 0;
let equivalencepH = 7;
let statusText = '';
let showAnimationValue = 0;

const weakAcidKa = 1.8e-5;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');
  createControls();
  updateCalculations();
  describe('Adjust acid/base concentrations and volumes to visualize titration curves and equivalence points.', 'Titration Calculator');
}

function draw() {
  updateCanvasSize();
  background('white');
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawTitle();
  positionControls();
  drawPanels();
  drawLeftPanel();
  drawRightPanel();
  drawFooter();
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
  titrationTypeSelect = createSelect();
  titrationTypeSelect.option('Strong Acid / Strong Base', 'strong');
  titrationTypeSelect.option('Weak Acid / Strong Base', 'weak');
  titrationTypeSelect.changed(updateCalculations);

  acidConcSlider = createSlider(0.05, 1.0, 0.10, 0.01);
  acidConcSlider.input(updateCalculations);
  acidVolSlider = createSlider(5, 50, 25, 1);
  acidVolSlider.input(updateCalculations);
  baseConcSlider = createSlider(0.05, 1.0, 0.10, 0.01);
  baseConcSlider.input(updateCalculations);

  calculateButton = createButton('Recalculate');
  calculateButton.mousePressed(updateCalculations);
}

function positionControls() {
  const panelTop = 70;
  const leftWidth = canvasWidth * 0.42;
  const panelX = margin;
  const sliderWidth = leftWidth - 40;
  const rect = canvasRef().getBoundingClientRect();
  const offsetX = rect.left + window.scrollX;
  const offsetY = rect.top + window.scrollY;

  titrationTypeSelect.size(sliderWidth, 28);
  titrationTypeSelect.position(offsetX + panelX + 10, offsetY + panelTop + 40);

  acidConcSlider.size(sliderWidth, 20);
  acidConcSlider.position(offsetX + panelX + 10, offsetY + panelTop + 110);

  acidVolSlider.size(sliderWidth, 20);
  acidVolSlider.position(offsetX + panelX + 10, offsetY + panelTop + 180);

  baseConcSlider.size(sliderWidth, 20);
  baseConcSlider.position(offsetX + panelX + 10, offsetY + panelTop + 250);

  calculateButton.size(sliderWidth, 32);
  calculateButton.position(offsetX + panelX + 10, offsetY + panelTop + 320);
}

function canvasRef() {
  return document.querySelector('main canvas');
}

function updateCalculations() {
  const Ca = acidConcSlider.value(); // mol/L
  const Va = acidVolSlider.value(); // mL
  const Cb = baseConcSlider.value(); // mol/L
  const type = titrationTypeSelect.value();

  const acidMoles = Ca * Va / 1000;
  equivalenceVolume = (acidMoles / Cb) * 1000;
  equivalencepH = type === 'strong' ? 7.0 : 8.5;

  statusText = 'Volume at equivalence point = ' + nf(equivalenceVolume, 0, 2) + ' mL';
  statusText += '\nEquivalence point pH ≈ ' + nf(equivalencepH, 0, 1);

  curvePoints = [];
  const maxVolume = equivalenceVolume * 2;
  const steps = 120;
  for (let i = 0; i <= steps; i += 1) {
    const volume = (maxVolume * i) / steps;
    const pH = computePH(volume / 1000, acidMoles, Cb, type, Ca, Va / 1000);
    curvePoints.push({ volume: volume, pH: constrain(pH, 0, 14) });
  }
}

function computePH(baseVolumeL, acidMoles, Cb, type, Ca, VaL) {
  const addedMolesBase = Cb * baseVolumeL;
  if (type === 'strong') {
    const totalVolumeL = baseVolumeL + VaL;
    const netH = acidMoles - addedMolesBase;
    if (netH > 0) {
      const hConc = netH / totalVolumeL;
      return -log10Safe(hConc);
    }
    if (netH === 0) {
      return 7.0;
    }
    const ohConc = Math.abs(netH) / totalVolumeL;
    const pOH = -log10Safe(ohConc);
    return 14 - pOH;
  }
  // weak acid titrated with strong base (assume monoprotic, Ka given)
  const totalVolumeL = baseVolumeL + VaL;
  const saltMoles = Math.max(addedMolesBase - acidMoles, 0);
  const remainingAcidMoles = Math.max(acidMoles - addedMolesBase, 0);

  if (remainingAcidMoles > 0 && addedMolesBase > 0) {
    const ratio = addedMolesBase / remainingAcidMoles;
    const pKa = -log10Safe(weakAcidKa);
    return pKa + log10Safe(ratio);
  }
  if (remainingAcidMoles > 0) {
    // before any base added: weak acid equilibrium approximation (sqrt)
    const CaInit = acidMoles / totalVolumeL;
    const hConc = Math.sqrt(weakAcidKa * CaInit);
    return -log10Safe(hConc);
  }
  if (remainingAcidMoles === 0) {
    const pKa = -log10Safe(weakAcidKa);
    return (14 + pKa) / 2;
  }
  // after equivalence: base dominates
  const excessBase = addedMolesBase - acidMoles;
  const ohConc = excessBase / totalVolumeL;
  const pOH = -log10Safe(ohConc);
  return 14 - pOH;
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
  const leftWidth = canvasWidth * 0.42;
  const rightX = margin + leftWidth + margin;
  const rightWidth = canvasWidth - rightX - margin;
  const panelHeight = drawHeight - panelTop - margin;

  stroke('#dfe3eb');
  fill('#ffffff');
  rect(margin, panelTop, leftWidth, panelHeight, 12);
  rect(rightX, panelTop, rightWidth, panelHeight, 12);
}

function drawLeftPanel() {
  const panelTop = 60;
  const leftWidth = canvasWidth * 0.42;
  const panelX = margin;
  fill('#0d47a1');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(16);
  text('Input Parameters', panelX + 10, panelTop + 10);

  fill('#111111');
  textSize(14);
  text(acidConcLabel(), panelX + 10, panelTop + 100);
  text(acidVolLabel(), panelX + 10, panelTop + 170);
  text(baseConcLabel(), panelX + 10, panelTop + 240);

  fill('#1b5e20');
  textSize(14);
  text(statusText, panelX + 10, panelTop + 360);
}

function drawRightPanel() {
  const panelTop = 60;
  const leftWidth = canvasWidth * 0.42;
  const rightX = margin + leftWidth + margin;
  const rightWidth = canvasWidth - rightX - margin;
  const panelHeight = drawHeight - panelTop - margin;
  const graphTop = panelTop + 30;
  const graphBottom = panelTop + panelHeight - 20;

  fill('#111111');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(16);
  text('Titration Curve', rightX + 10, panelTop + 8);

  const graphLeft = rightX + 50;
  const graphRight = rightX + rightWidth - 40;
  drawAxes(graphLeft, graphTop, graphRight, graphBottom);
  drawCurve(graphLeft, graphTop, graphRight, graphBottom);
  drawEquivalenceMarkers(graphLeft, graphTop, graphRight, graphBottom);
}

function drawAxes(left, top, right, bottom) {
  stroke('#37474f');
  strokeWeight(2);
  line(left, bottom, right, bottom);
  line(left, bottom, left, top);

  fill('#111111');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  text('Volume base added (mL)', (left + right) / 2, bottom + 25);
  textAlign(CENTER, CENTER);
  push();
  translate(left - 35, (top + bottom) / 2);
  rotate(-HALF_PI);
  text('pH', 0, 0);
  pop();

  stroke('#cfd8dc');
  strokeWeight(1);
  for (let i = 0; i <= 14; i += 2) {
    const y = map(i, 0, 14, bottom, top);
    line(left, y, right, y);
    noStroke();
    fill('#546e7a');
    textAlign(RIGHT, CENTER);
    text(i, left - 8, y);
    stroke('#cfd8dc');
  }
}

function drawCurve(left, top, right, bottom) {
  if (!curvePoints.length) return;
  const maxVolume = equivalenceVolume * 2;
  noFill();
  stroke('#1a73e8');
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < curvePoints.length; i += 1) {
    const x = map(curvePoints[i].volume, 0, maxVolume, left, right);
    const y = map(curvePoints[i].pH, 0, 14, bottom, top);
    curveVertex(x, y);
  }
  endShape();
}

function drawEquivalenceMarkers(left, top, right, bottom) {
  const maxVolume = equivalenceVolume * 2;
  const eqX = map(equivalenceVolume, 0, maxVolume, left, right);
  stroke('#ef5350');
  strokeWeight(1);
  drawingContext.setLineDash([6, 6]);
  line(eqX, bottom, eqX, top);
  drawingContext.setLineDash([]);

  stroke('#8bc34a');
  line(left, map(7, 0, 14, bottom, top), right, map(7, 0, 14, bottom, top));

  noStroke();
  fill('#d32f2f');
  textAlign(CENTER, TOP);
  text('Equivalence', eqX, top - 20);
}

function drawFooter() {
  fill('#111111');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text('Titration relationship: MₐVₐ = MᵦVᵦ', canvasWidth / 2, drawHeight + 35);
  textSize(13);
  fill('#546e7a');
  text('Use sliders to see how acid/base strengths shift the titration curve and equivalence marker.', canvasWidth / 2, drawHeight + 70);
}

function acidConcLabel() {
  return 'Ca = ' + nf(acidConcSlider.value(), 0, 2) + ' M';
}

function acidVolLabel() {
  return 'Va = ' + nf(acidVolSlider.value(), 0, 0) + ' mL';
}

function baseConcLabel() {
  return 'Cb = ' + nf(baseConcSlider.value(), 0, 2) + ' M';
}

function log10Safe(value) {
  return Math.log10(Math.max(value, 1e-9));
}
