/*
  Gibbs Free Energy Spontaneity Explorer
  Step 2.5 plan:
  - Control rows beneath drawing area:
      1. Sliders for ΔH, ΔS, Temperature
      2. Preset button row
      3. Checkbox to show crossover info
  - Layout: drawHeight 500, controlHeight 240
*/

let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 240;
let canvasHeight = drawHeight + controlHeight;
const titleText = 'Gibbs Free Energy Spontaneity Explorer';

let hSlider;
let sSlider;
let tSlider;
let presetButtons = [];
let infoCheckbox;
let controlRows = [];

const presets = {
  haber: { label: 'Haber Process', h: -92, s: -198 },
  melting: { label: 'Ice Melting', h: 6.0, s: 22 },
  combustion: { label: 'Methane Combustion', h: -891, s: -242 },
  atp: { label: 'ATP Hydrolysis', h: -30, s: -45 }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const main = document.querySelector('main');
  if (main) canvas.parent(main);
  textFont('Arial');
  createControls();
  describe('Adjust ΔH, ΔS, and Temperature to see how ΔG and spontaneity change.', 'Gibbs Free Energy Spontaneity Explorer');
}

function draw() {
  updateCanvasSize();
  positionControlRows();
  background('#ffffff');
  fill('aliceblue');
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);
  fill('#ffffff');
  rect(0, drawHeight, canvasWidth, controlHeight);
  drawTitle();
  drawGraph();
  drawFooter();
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = container.offsetWidth;
  canvasHeight = drawHeight + controlHeight;
}

function createControls() {
  createControlRows();

  hSlider = createSlider(-300, 300, -92, 10);
  hSlider.parent(controlRows[0].row);
  styleSlider(hSlider);
  hSlider.input(redraw);

  sSlider = createSlider(-300, 300, -198, 10);
  sSlider.parent(controlRows[1].row);
  styleSlider(sSlider);
  sSlider.input(redraw);

  tSlider = createSlider(0, 1500, 298, 10);
  tSlider.parent(controlRows[2].row);
  styleSlider(tSlider);
  tSlider.input(redraw);

  presetRow = createDiv();
  presetRow.style('display', 'inline-block');
  presetRow.style('background', '#ffffff');
  presetRow.style('padding', '6px 10px');
  presetRow.style('border-radius', '6px');
  presetRow.style('box-shadow', '0 1px 3px rgba(0,0,0,0.1)');
  presetRow.style('font-family', 'Arial, Helvetica, sans-serif');
  Object.values(presets).forEach(preset => {
    const btn = createButton(preset.label);
    btn.parent(presetRow);
    btn.style('margin-right', '10px');
    btn.mousePressed(() => setPreset(preset));
    presetButtons.push(btn);
  });

  infoCheckbox = createCheckbox('Show crossover info', true);
  infoCheckbox.parent(controlRows[3].row);
}

function createControlRows() {
  const configs = [
    { label: 'Enthalpy ΔH (kJ/mol)', width: 360 },
    { label: 'Entropy ΔS (J/mol·K)', width: 360 },
    { label: 'Temperature T (K)', width: 360 },
    { label: 'Options', width: 360 }
  ];
  controlRows = configs.map(cfg => {
    const row = createDiv();
    row.style('display', 'inline-block');
    row.style('width', cfg.width + 'px');
    row.style('background', '#ffffff');
    row.style('padding', '4px 8px');
    row.style('border-radius', '6px');
    row.style('box-shadow', '0 1px 3px rgba(0,0,0,0.1)');
    row.style('font-family', 'Arial, Helvetica, sans-serif');
    const labelSpan = createSpan(cfg.label + ': ');
    labelSpan.parent(row);
    styleLabel(labelSpan);
    const valueSpan = createSpan('');   
    valueSpan.parent(row);
    styleValue(valueSpan);
    return { row, value: valueSpan };
  });
}

function styleLabel(el) {
  el.style('display', 'inline-block');
  el.style('min-width', '230px');
  el.style('font-weight', '600');
}

function styleValue(el) {
  el.style('display', 'inline-block');
  el.style('min-width', '80px');
}

function styleSlider(slider) {
  slider.style('width', '260px');
  slider.style('margin-left', '10px');
}

function positionControlRows() {
  const canvasEl = document.querySelector('main canvas');
  if (!canvasEl) return;
  const rect = canvasEl.getBoundingClientRect();
  const baseX = rect.left + window.scrollX + 20;
  const baseY = rect.top + window.scrollY + drawHeight + 15;
  controlRows[0].row.position(baseX, baseY);
  controlRows[1].row.position(baseX + 380, baseY);
  controlRows[2].row.position(baseX, baseY + 60);
  controlRows[3].row.position(baseX + 380, baseY + 60);
  if (presetRow) presetRow.position(baseX, baseY + 120);
}

function drawTitle() {
  fill('#111111');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(24);
  text(titleText, canvasWidth / 2, 10);
}

function drawGraph() {
  const graphX = 60;
  const graphY = 80;
  const graphWidth = canvasWidth - 140;
  const graphHeight = drawHeight - 180;
  stroke('#CFD8DC');
  fill('#ffffff');
  rect(graphX - 20, graphY - 20, graphWidth + 40, graphHeight + 40, 12);

  stroke('#E8F5E9');
  fill(0, 200, 0, 40);
  rect(graphX, graphY + graphHeight / 2, graphWidth, graphHeight / 2);

  fill(255, 0, 0, 30);
  stroke('#FFCDD2');
  rect(graphX, graphY, graphWidth, graphHeight / 2);

  stroke('#B0BEC5');
  line(graphX, graphY + graphHeight / 2, graphX + graphWidth, graphY + graphHeight / 2);

  const hVal = hSlider.value();
  const sVal = sSlider.value();
  const tVal = tSlider.value();
  const data = [];
  for (let T = 0; T <= 1500; T += 10) {
    const g = hVal - T * (sVal / 1000);
    data.push({ T, g });
  }
  stroke('#1E88E5');
  noFill();
  beginShape();
  data.forEach(point => {
    const x = map(point.T, 0, 1500, graphX, graphX + graphWidth);
    const y = map(point.g, -400, 400, graphY + graphHeight, graphY);
    vertex(x, y);
  });
  endShape();

  const currentG = hVal - tVal * (sVal / 1000);
  const markerX = map(tVal, 0, 1500, graphX, graphX + graphWidth);
  const markerY = map(currentG, -400, 400, graphY + graphHeight, graphY);
  stroke('#FFA000');
  line(markerX, graphY, markerX, graphY + graphHeight);
  fill(currentG < 0 ? '#2E7D32' : '#C62828');
  noStroke();
  circle(markerX, markerY, 14);

  drawInfoBox(hVal, sVal, tVal, currentG);
  drawQuadrantLegend();
}

function drawInfoBox(h, s, t, g) {
  const x = canvasWidth - 220;
  const y = 90;
  fill('#ffffff');
  stroke('#B0BEC5');
  rect(x, y, 180, 100, 8);
  fill('#111111');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);
  text(`ΔH = ${h} kJ/mol`, x + 10, y + 10);
  text(`TΔS = ${(t * s / 1000).toFixed(1)} kJ/mol`, x + 10, y + 30);
  text(`ΔG = ${g.toFixed(1)} kJ/mol`, x + 10, y + 50);
  text(`Spontaneous: ${g < 0 ? 'Yes' : 'No'}`, x + 10, y + 70);
}

function drawQuadrantLegend() {
  const legendX = 60;
  const legendY = drawHeight - 80;
  const boxW = 320;
  const boxH = 90;
  fill('#ffffff');
  stroke('#B0BEC5');
  rect(legendX, legendY, boxW, boxH, 8);

  const mode = { h: Math.sign(hSlider.value()), s: Math.sign(sSlider.value()) };
  const combos = [
    { h: -1, s: 1, text: 'ΔH < 0, ΔS > 0 → Always spontaneous', y: legendY + 20 },
    { h: 1, s: -1, text: 'ΔH > 0, ΔS < 0 → Never spontaneous', y: legendY + 40 },
    { h: -1, s: -1, text: 'ΔH < 0, ΔS < 0 → Low T spontaneous', y: legendY + 60 },
    { h: 1, s: 1, text: 'ΔH > 0, ΔS > 0 → High T spontaneous', y: legendY + 80 }
  ];
  combos.forEach(entry => {
    const highlight = entry.h === mode.h && entry.s === mode.s;
    fill(highlight ? '#FFF59D' : 'transparent');
    if (highlight) rect(legendX + 5, entry.y - 12, boxW - 10, 18, 4);
    fill('#111111');
    text(entry.text, legendX + 10, entry.y);
  });
}

function drawFooter() {
  fill('#111111');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(15);
  text('ΔG = ΔH - TΔS — use sliders to explore how temperature shifts spontaneity.', canvasWidth / 2, drawHeight + controlHeight - 20);
}

function setPreset(preset) {
  hSlider.value(preset.h);
  sSlider.value(preset.s);
  redraw();
}
