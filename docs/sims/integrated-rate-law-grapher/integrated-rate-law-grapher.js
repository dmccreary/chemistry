/*
  Integrated Rate Law Grapher MicroSim
  Step 2.5 layout planning:
  - Control inventory (bottom control region using slider alignment template):
      Row 1: Dropdown for reaction order
      Row 2: Slider for rate constant k
      Row 3: Slider for initial concentration [A]0
      Row 4: Slider for time range (tmax)
      Row 5: Reset button + info text
  - Layout calculations:
      drawHeight = 520 (space for title + stacked plots)
      controlHeight = 180 (five control rows)
      canvasHeight = drawHeight + controlHeight = 700 (iframe height 702px)
      left panel width = 200px (labels, summary text)
      right panel width = remainder for plots
  - Control placement: each row created via createDiv per slider template; rows positioned inside control region below drawHeight
*/

let canvasWidth = 800;
let drawHeight = 520;
let controlHeight = 180;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
const titleText = 'Integrated Rate Law Grapher';

let orderSelect;
let kSlider;
let a0Slider;
let timeSlider;
let resetButton;
let controlRows = [];

const orders = ['Zero', 'First', 'Second'];
let plotData = [];
let linearPlotIndex = 1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const main = document.querySelector('main');
  if (main) {
    canvas.parent(main);
  }
  textFont('Arial');
  createControls();
  recalcData();
  describe('Compare [A], ln[A], and 1/[A] plots to identify reaction order and rate constant from slopes.', 'Integrated Rate Law Grapher');
}

function draw() {
  updateCanvasSize();
  background('#f8f9fa');
  drawTitle();
  drawPanels();
  drawPlots();
  drawControlRegion();
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
  createControlRows();

  orderSelect = createSelect();
  orders.forEach(o => orderSelect.option(o));
  orderSelect.value('First');
  orderSelect.changed(recalcData);
  orderSelect.parent(controlRows[0].row);
  styleDropdown(orderSelect);

  kSlider = createSlider(0.05, 1.0, 0.2, 0.01);
  kSlider.input(recalcData);
  kSlider.parent(controlRows[1].row);
  styleSlider(kSlider);

  a0Slider = createSlider(0.1, 2.0, 1.0, 0.05);
  a0Slider.input(recalcData);
  a0Slider.parent(controlRows[2].row);
  styleSlider(a0Slider);

  timeSlider = createSlider(5, 60, 20, 5);
  timeSlider.input(recalcData);
  timeSlider.parent(controlRows[3].row);
  styleSlider(timeSlider);

  resetButton = createButton('Reset');
  resetButton.mousePressed(resetControls);
  resetButton.parent(controlRows[4].row);
  resetButton.addClass('irl-button');

  updateControlLabels();
}

function createControlRows() {
  const labels = ['Reaction Order', 'k', '[A]₀', 'Time Range', ''];
  controlRows = labels.map(label => {
    const row = createDiv();
    row.style('display', 'inline-block');
    row.style('background', '#ffffff');
    row.style('border-radius', '6px');
    row.style('padding', '4px 8px');
    row.style('box-shadow', '0 1px 3px rgba(0,0,0,0.1)');
    const labelSpan = createSpan(label ? label + ':' : '');
    labelSpan.parent(row);
    styleLabel(labelSpan);
    const valueSpan = createSpan('');
    valueSpan.parent(row);
    styleValue(valueSpan);
    return { row, label: labelSpan, value: valueSpan };
  });
}

function positionControlRows() {
  const canvasEl = document.querySelector('main canvas');
  if (!canvasEl) {
    return;
  }
  const rect = canvasEl.getBoundingClientRect();
  const baseX = rect.left + window.scrollX + margin + 10;
  const baseY = rect.top + window.scrollY + drawHeight + 10;
  controlRows.forEach((entry, index) => {
    entry.row.position(baseX, baseY + index * 35);
  });
}

function styleLabel(el) {
  el.style('display', 'inline-block');
  el.style('min-width', '130px');
  el.style('font-weight', '600');
}

function styleValue(el) {
  el.style('display', 'inline-block');
  el.style('min-width', '70px');
}

function styleSlider(slider) {
  slider.style('width', '200px');
  slider.style('margin-left', '12px');
}

function styleDropdown(dropdown) {
  dropdown.style('margin-left', '12px');
  dropdown.style('padding', '2px 6px');
}

function resetControls() {
  orderSelect.value('First');
  kSlider.value(0.2);
  a0Slider.value(1.0);
  timeSlider.value(20);
  recalcData();
}

function recalcData() {
  positionControlRows();
  updateControlLabels();
  const order = orderSelect.value();
  const k = parseFloat(kSlider.value());
  const a0 = parseFloat(a0Slider.value());
  const tmax = parseFloat(timeSlider.value());
  plotData = generatePlotData(order, k, a0, tmax);
  linearPlotIndex = order === 'Zero' ? 0 : order === 'First' ? 1 : 2;
}

function updateControlLabels() {
  controlRows[1].value.html(nf(kSlider.value(), 0, 2) + ' ' + kUnits());
  controlRows[2].value.html(nf(a0Slider.value(), 0, 2) + ' M');
  controlRows[3].value.html(nf(timeSlider.value(), 0, 0) + ' s');
}

function kUnits() {
  const ord = orderSelect.value();
  if (ord === 'Zero') return 'M·s⁻¹';
  if (ord === 'First') return 's⁻¹';
  return 'M⁻¹·s⁻¹';
}

function generatePlotData(order, k, a0, tmax) {
  const points = { concentration: [], ln: [], inv: [], times: [] };
  const steps = 200;
  for (let i = 0; i <= steps; i += 1) {
    const t = (tmax * i) / steps;
    let conc;
    if (order === 'Zero') {
      conc = Math.max(a0 - k * t, 0);
    } else if (order === 'First') {
      conc = a0 * Math.exp(-k * t);
    } else {
      conc = 1 / (1 / a0 + k * t);
    }
    points.times.push(t);
    points.concentration.push(conc);
    points.ln.push(conc > 0 ? Math.log(conc) : -Infinity);
    points.inv.push(conc > 0 ? 1 / conc : Infinity);
  }
  return points;
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
  const panelHeight = drawHeight - panelTop - margin;
  stroke('#dfe3eb');
  fill('#ffffff');
  rect(margin, panelTop, canvasWidth - margin * 2, panelHeight, 12);
}

function drawPlots() {
  const plotAreaX = margin + 10;
  const plotAreaY = 80;
  const plotWidth = canvasWidth - margin * 2 - 20;
  const plotHeight = (drawHeight - plotAreaY - margin) / 3 - 10;
  drawPlot(plotAreaX, plotAreaY, plotWidth, plotHeight, plotData.concentration, '[A] (M)', true, 0);
  drawPlot(plotAreaX, plotAreaY + plotHeight + 20, plotWidth, plotHeight, plotData.ln, 'ln [A]', true, 1);
  drawPlot(plotAreaX, plotAreaY + (plotHeight + 20) * 2, plotWidth, plotHeight, plotData.inv, '1/[A] (M⁻¹)', true, 2);
}

function drawPlot(x, y, width, height, dataArray, ylabel, showAxes, index) {
  fill(index === linearPlotIndex ? '#e8f5e9' : '#ffffff');
  stroke('#cfd8dc');
  rect(x - 5, y - 5, width + 10, height + 10, 10);

  const times = plotData.times;
  if (!times || !times.length) return;

  const validData = dataArray.filter(value => isFinite(value));
  const minValue = Math.min(...validData);
  const maxValue = Math.max(...validData);
  const paddedMin = minValue - Math.abs(maxValue - minValue) * 0.05;
  const paddedMax = maxValue + Math.abs(maxValue - minValue) * 0.05;

  stroke('#b0bec5');
  strokeWeight(1);
  line(x, y + height, x + width, y + height);
  line(x, y, x, y + height);

  const color = index === linearPlotIndex ? '#2e7d32' : '#90a4ae';
  stroke(color);
  strokeWeight(index === linearPlotIndex ? 3 : 1.5);
  noFill();
  beginShape();
  for (let i = 0; i < times.length; i += 1) {
    const px = map(times[i], 0, timeSlider.value(), x, x + width);
    const py = map(dataArray[i], paddedMin, paddedMax, y + height, y);
    vertex(px, py);
  }
  endShape();

  fill('#111111');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text(ylabel + ' vs Time', x + 5, y - 18);
  textSize(12);
  text('t (s)', x + width - 40, y + height + 10);

  if (index === linearPlotIndex) {
    fill('#2e7d32');
    noStroke();
    textAlign(RIGHT, TOP);
    textSize(13);
    text('LINEAR — Order ' + orders[index], x + width - 10, y - 18);
    drawSlopeInfo(x, y + height + 25);
  }
}

function drawSlopeInfo(x, y) {
  fill('#1b5e20');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  let slopeText = '';
  const order = orderSelect.value();
  const k = parseFloat(kSlider.value());
  if (order === 'Zero') {
    slopeText = 'slope = -k = ' + nf(-k, 0, 3) + ' M·s⁻¹';
  } else if (order === 'First') {
    slopeText = 'slope = -k = ' + nf(-k, 0, 3) + ' s⁻¹';
  } else {
    slopeText = 'slope = +k = ' + nf(k, 0, 3) + ' M⁻¹·s⁻¹';
  }
  text(slopeText, x, y);
}

function drawControlRegion() {
  fill('#111111');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text('Identify the linear plot and read the slope to determine k.', canvasWidth / 2, drawHeight + controlHeight - 20);
}
