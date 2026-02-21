// IMF Strength Explorer MicroSim
// Title centered top, controls in control strip

let containerWidth;
let canvasWidth = 860;
let drawHeight = 520;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

const margin = 20;
const defaultTextSize = 16;

let filterSelect;
let selectedMolecule = 'H2O';
let hoverMolecule = null;

const molecules = [
  { id: 'CH4', name: 'Methane', formula: 'CH₄', boiling: -161, imf: 'London Dispersion Only', molarMass: 16, explanation: 'Small, nonpolar molecule held only by dispersion forces.', color: '#95a5a6' },
  { id: 'C4H10', name: 'Butane', formula: 'C₄H₁₀', boiling: -1, imf: 'London Dispersion Only', molarMass: 58, explanation: 'Longer carbon chain increases surface area and dispersion strength.', color: '#95a5a6' },
  { id: 'I2', name: 'Iodine', formula: 'I₂', boiling: 184, imf: 'London Dispersion Only', molarMass: 254, explanation: 'Large polarizable electron cloud yields strong dispersion forces.', color: '#95a5a6' },
  { id: 'HCl', name: 'Hydrogen Chloride', formula: 'HCl', boiling: -85, imf: 'Dipole-Dipole', molarMass: 36.5, explanation: 'Polarity creates dipole interactions stronger than dispersion alone.', color: '#5dade2' },
  { id: 'SO2', name: 'Sulfur Dioxide', formula: 'SO₂', boiling: -10, imf: 'Dipole-Dipole', molarMass: 64, explanation: 'Bent geometry produces net dipole and moderate IMF strength.', color: '#5dade2' },
  { id: 'NH3', name: 'Ammonia', formula: 'NH₃', boiling: -33, imf: 'Hydrogen Bonding', molarMass: 17, explanation: 'N–H bonds enable hydrogen bonding, raising boiling point.', color: '#e74c3c' },
  { id: 'HF', name: 'Hydrogen Fluoride', formula: 'HF', boiling: 19, imf: 'Hydrogen Bonding', molarMass: 20, explanation: 'Strong H–F hydrogen bonds elevate boiling point above heavier molecules.', color: '#e74c3c' },
  { id: 'H2O', name: 'Water', formula: 'H₂O', boiling: 100, imf: 'Hydrogen Bonding', molarMass: 18, explanation: 'Extensive hydrogen bonding network gives exceptionally high boiling point.', color: '#e74c3c' }
];

const filters = ['Show All', 'London Dispersion Only', 'Dipole-Dipole', 'Hydrogen Bonding'];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  const main = document.querySelector('main');
  canvas.parent(main);
  textSize(defaultTextSize);

  filterSelect = createSelect();
  filters.forEach(f => filterSelect.option(f, f));
  filterSelect.value('Show All');
  filterSelect.changed(() => redraw());
  positionControls();

  describe('Intermolecular force explorer comparing boiling points across IMF categories with interactive info panel.', LABEL);
}

function draw() {
  updateCanvasSize();
  hoverMolecule = null;
  fill('#0e1826');
  stroke('#20324a');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawTitle();
  drawChart();
  drawInfoPanel();
  drawControlLabels();
}

function drawTitle() {
  fill('white');
  textAlign(CENTER, TOP);
  textSize(30);
  text('IMF Strength Explorer: Boiling Points', canvasWidth / 2, margin / 2);
}

function drawChart() {
  const chartX = margin;
  const chartWidth = canvasWidth * 0.6 - margin * 2;
  const chartY = margin + 60;
  const chartHeight = drawHeight - chartY - margin;
  const minTemp = -200;
  const maxTemp = 200;

  stroke('#f0f3f9');
  strokeWeight(1.5);
  line(chartX, chartY, chartX, chartY + chartHeight);
  line(chartX, chartY + chartHeight, chartX + chartWidth, chartY + chartHeight);
  fill('white');
  noStroke();
  textAlign(CENTER, TOP);
  text('Boiling Point (°C)', chartX + chartWidth / 2, chartY - 40);

  // zero reference
  const zeroY = map(0, minTemp, maxTemp, chartY + chartHeight, chartY);
  stroke('rgba(255,255,255,0.4)');
  strokeWeight(1);
  drawingContext.setLineDash([6, 6]);
  line(chartX, zeroY, chartX + chartWidth, zeroY);
  drawingContext.setLineDash([]);
  fill('white');
  textAlign(LEFT, CENTER);
  text('0°C reference', chartX + chartWidth - 120, zeroY - 10);

  const filtered = getFilteredMolecules();
  const barWidth = chartWidth / filtered.length * 0.7;

  textAlign(RIGHT, CENTER);
  for (let t = minTemp; t <= maxTemp; t += 100) {
    const y = map(t, minTemp, maxTemp, chartY + chartHeight, chartY);
    stroke('rgba(255,255,255,0.2)');
    line(chartX - 6, y, chartX + chartWidth, y);
    noStroke();
    fill('#cbd5f5');
    text(t, chartX - 12, y);
  }

  textAlign(CENTER, TOP);
  filtered.forEach((mol, index) => {
    const x = chartX + (index + 0.5) * (chartWidth / filtered.length);
    const barHeight = map(mol.boiling, minTemp, maxTemp, 0, chartHeight);
    const y = chartY + chartHeight - barHeight;
    const isSelected = mol.id === selectedMolecule;
    fill(mol.color);
    stroke(isSelected ? '#f1c40f' : 'rgba(0,0,0,0.4)');
    strokeWeight(isSelected ? 4 : 1.5);
    rect(x - barWidth / 2, y, barWidth, barHeight);
    noStroke();
    fill('white');
    push();
    translate(x, chartY + chartHeight + 10);
    rotate(PI / 4);
    text(mol.name, 0, 0);
    pop();

    if (
      mouseX >= x - barWidth / 2 &&
      mouseX <= x + barWidth / 2 &&
      mouseY >= y &&
      mouseY <= chartY + chartHeight
    ) {
      hoverMolecule = mol;
      if (mouseIsPressed) {
        selectedMolecule = mol.id;
      }
    }
  });

  drawLegend(chartX + chartWidth - 200, chartY + 10);
  drawTooltip();
}

function drawLegend(x, y) {
  const legendData = [
    { label: 'London Dispersion Only', color: '#95a5a6' },
    { label: 'Dipole-Dipole', color: '#5dade2' },
    { label: 'Hydrogen Bonding', color: '#e74c3c' }
  ];
  legendData.forEach((item, idx) => {
    fill(item.color);
    rect(x, y + idx * 26, 20, 20);
    fill('white');
    textAlign(LEFT, CENTER);
    text(item.label, x + 30, y + idx * 26 + 10);
  });
}

function drawTooltip() {
  if (!hoverMolecule) return;
  fill('rgba(15,31,50,0.9)');
  noStroke();
  const textVal = `${hoverMolecule.name}: ${hoverMolecule.boiling}°C`;
  const width = textWidth(textVal) + 20;
  const x = mouseX + 15;
  const y = mouseY - 20;
  rect(x, y, width, 32, 6);
  fill('white');
  textAlign(LEFT, CENTER);
  text(textVal, x + 10, y + 16);
}

function drawInfoPanel() {
  const panelX = canvasWidth * 0.6 + 40;
  const panelWidth = canvasWidth * 0.35 - margin;
  const panelY = margin + 60;
  fill('#162236');
  rect(panelX, panelY, panelWidth, drawHeight - panelY - margin, 12);

  const mol = molecules.find(m => m.id === selectedMolecule) || molecules[0];
  fill('white');
  textAlign(CENTER, TOP);
  textSize(20);
  text(mol.name, panelX + panelWidth / 2, panelY + 16);
  textSize(16);
  text(mol.formula, panelX + panelWidth / 2, panelY + 44);
  textAlign(LEFT, TOP);
  textSize(15);
  fill('#5dade2');
  text(`IMF Type: ${mol.imf}`, panelX + 16, panelY + 80);
  fill('#f1c40f');
  text(`Boiling Point: ${mol.boiling}°C`, panelX + 16, panelY + 110);
  fill('#ecf0f1');
  text(`Molar Mass: ${mol.molarMass} g/mol`, panelX + 16, panelY + 140);
  textWrap(WORD);
  text(`Why? ${mol.explanation}`, panelX + 16, panelY + 170, panelWidth - 32);
}

function drawControlLabels() {
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Filter IMF Type:', margin, drawHeight + 26);
}

function getFilteredMolecules() {
  const filter = filterSelect.value();
  if (filter === 'Show All') {
    return molecules;
  }
  return molecules.filter(m => m.imf === filter);
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
  filterSelect.position(margin + 180, baseY - 12);
}
