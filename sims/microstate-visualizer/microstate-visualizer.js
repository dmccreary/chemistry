/*
  Microstate Visualizer MicroSim
  Step 2.5 plan:
  - Control rows (template) below drawing:
      1. Slider for number of particles N
      2. Button row with Randomize/Remove Wall
      3. Dropdown for macrostate highlight
  - Layout: drawHeight 520, controlHeight 240
*/

let canvasWidth = 800;
let drawHeight = 520;
let controlHeight = 240;
let canvasHeight = drawHeight + controlHeight;
const titleText = 'Microstate Visualizer';

let particles = [];
let particleCount = 6;
let distribution = 3;
let randomizeButton;
let removeWallButton;
let playButton;
let resetButton;
let buttonRow;
let highlightSelect;
let countSlider;
let controlRows = [];
let wallPresent = true;
let isRunning = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const main = document.querySelector('main');
  if (main) canvas.parent(main);
  textFont('Arial');
  createControls();
  initializeParticles(particleCount);
  describe('Explore microstates by distributing particles between two halves and tracking W values.', 'Microstate Visualizer');
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
  drawContainer();
  drawBarChart();
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

  countSlider = createSlider(2, 20, particleCount, 1);
  countSlider.parent(controlRows[0].row);
  styleSlider(countSlider);
  countSlider.input(() => {
    particleCount = countSlider.value();
    initializeParticles(particleCount);
    updateControlLabels();
  });

  highlightSelect = createSelect();
  highlightSelect.parent(controlRows[1].row);
  highlightSelect.changed(redraw);

  buttonRow = createDiv();
  buttonRow.style('display', 'inline-block');
  buttonRow.style('background', '#ffffff');
  buttonRow.style('padding', '6px 10px');
  buttonRow.style('border-radius', '6px');
  buttonRow.style('box-shadow', '0 1px 3px rgba(0,0,0,0.1)');
  buttonRow.style('font-family', 'Arial, Helvetica, sans-serif');

  playButton = createButton('Start');
  playButton.parent(buttonRow);
  playButton.style('margin-right', '12px');
  playButton.mousePressed(togglePlay);

  randomizeButton = createButton('Randomize Distribution');
  randomizeButton.parent(buttonRow);
  randomizeButton.style('margin-right', '12px');
  randomizeButton.mousePressed(() => {
    particles.forEach(p => p.side = random() < 0.5 ? 'L' : 'R');
    updateDistribution();
  });

  removeWallButton = createButton('Remove Wall');
  removeWallButton.parent(buttonRow);
  removeWallButton.style('margin-right', '12px');
  removeWallButton.mousePressed(handleRemoveWall);

  resetButton = createButton('Reset');
  resetButton.parent(buttonRow);
  resetButton.mousePressed(resetSimulation);

  updateControlLabels();
}

function createControlRows() {
  const configs = [
    { label: 'Number of particles N', width: 360 },
    { label: 'Highlight macrostate', width: 360 }
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
  el.style('min-width', '220px');
  el.style('font-weight', '600');
}

function styleValue(el) {
  el.style('display', 'inline-block');
  el.style('min-width', '80px');
}

function styleSlider(slider) {
  slider.style('width', '260px');
  slider.style('margin-left', '8px');
}

function positionControlRows() {
  const canvasEl = document.querySelector('main canvas');
  if (!canvasEl) return;
  const rect = canvasEl.getBoundingClientRect();
  const baseX = rect.left + window.scrollX + 20;
  const baseY = rect.top + window.scrollY + drawHeight + 15;
  if (controlRows[0]) controlRows[0].row.position(baseX, baseY);
  if (controlRows[1]) controlRows[1].row.position(baseX + 380, baseY);
  if (buttonRow) buttonRow.position(baseX, baseY + 80);
}

function updateControlLabels() {
  if (controlRows[0]) controlRows[0].value.html(particleCount);
  if (highlightSelect) populateHighlights();
  if (controlRows[1]) controlRows[1].value.html(highlightSelect.value());
  if (playButton) playButton.html(isRunning ? 'Pause' : 'Start');
}

function togglePlay() {
  isRunning = !isRunning;
  if (playButton) playButton.html(isRunning ? 'Pause' : 'Start');
}

function handleRemoveWall() {
  wallPresent = false;
  removeWallButton.attribute('disabled', 'true');
  removeWallButton.style('opacity', '0.6');
}

function resetSimulation() {
  isRunning = false;
  wallPresent = true;
  removeWallButton.removeAttribute('disabled');
  removeWallButton.style('opacity', '1');
  initializeParticles(particleCount);
  updateDistribution();
  updateControlLabels();
}

function populateHighlights() {
  highlightSelect.html('');
  for (let k = 0; k <= particleCount; k += 1) {
    const label = `${k}:${particleCount - k}`;
    highlightSelect.option(label, k);
  }
  highlightSelect.value(distribution);
}

function initializeParticles(count) {
  particles = [];
  for (let i = 0; i < count; i += 1) {
    particles.push({
      x: random(80, canvasWidth / 2 - 60),
      y: random(100, drawHeight - 120),
      vx: random(-1, 1),
      vy: random(-1, 1),
      side: random() < 0.5 ? 'L' : 'R'
    });
  }
  updateDistribution();
}

function updateDistribution() {
  distribution = particles.filter(p => p.side === 'L').length;
}

function drawContainer() {
  const leftX = 80;
  const rightX = canvasWidth / 2 - 20;
  const topY = 100;
  const bottomY = drawHeight - 80;
  stroke('#90A4AE');
  noFill();
  rect(leftX, topY, rightX - leftX, bottomY - topY, 6);
  if (wallPresent) {
    stroke('#B0BEC5');
    line((leftX + rightX) / 2, topY, (leftX + rightX) / 2, bottomY);
  }
  particles.forEach(p => {
    if (isRunning) {
      p.x += p.vx;
      p.y += p.vy;
    }
    const halfMid = (leftX + rightX) / 2;
    if (wallPresent) {
      if (p.side === 'L') {
        if (p.x < leftX + 6 || p.x > halfMid - 6) p.vx *= -1;
      } else {
        if (p.x < halfMid + 6 || p.x > rightX - 6) p.vx *= -1;
      }
    } else {
      if (p.x < leftX + 6 || p.x > rightX - 6) p.vx *= -1;
      p.side = p.x < halfMid ? 'L' : 'R';
    }
    if (p.y < topY + 6 || p.y > bottomY - 6) p.vy *= -1;
    noStroke();
    fill(p.side === 'L' ? '#1E88E5' : '#F4511E');
    circle(p.x, p.y, 16);
  });
  const leftCount = particles.filter(p => p.side === 'L').length;
  distribution = leftCount;
}

function drawBarChart() {
  const chartX = canvasWidth / 2 + 80;
  const chartY = 120;
  const chartWidth = canvasWidth / 2 - 140;
  const chartHeight = drawHeight - 160;
  const maxW = binomial(particleCount, Math.floor(particleCount / 2));
  stroke('#CFD8DC');
  noFill();
  rect(chartX - 20, chartY - 20, chartWidth + 40, chartHeight + 40, 12);
  for (let k = 0; k <= particleCount; k += 1) {
    const w = binomial(particleCount, k);
    const barWidth = chartWidth / (particleCount + 1);
    const barHeight = map(w, 0, maxW, 0, chartHeight);
    const x = chartX + k * barWidth;
    const isHighlight = parseInt(highlightSelect.value() || 0, 10) === k;
    fill(isHighlight ? '#FDD835' : '#90A4AE');
    noStroke();
    rect(x, chartY + chartHeight - barHeight, barWidth - 4, barHeight);
  }
  fill('#111111');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text(`Current macrostate: ${distribution}:${particleCount - distribution}`,
       chartX, chartY + chartHeight + 10);
  const wCurr = binomial(particleCount, distribution);
  const kB = 1.38e-23;
  text(`W = ${wCurr} , ln W = ${nf(Math.log(wCurr), 0, 2)}`,
       chartX, chartY + chartHeight + 30);
  text(`S = k_B ln W ≈ ${nf(kB * Math.log(wCurr), 0, 2)} J/K`,
       chartX, chartY + chartHeight + 50);
}

function drawTitle() {
  fill('#111111');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(26);
  text(titleText, canvasWidth / 2, 10);
}

function drawFooter() {
  fill('#111111');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(15);
  text('Microstates (W) peak at 50:50 distributions. Remove the wall to simulate mixing.', canvasWidth / 2, drawHeight + controlHeight - 20);
}

function binomial(n, k) {
  if (k < 0 || k > n) return 0;
  k = min(k, n - k);
  let result = 1;
  for (let i = 1; i <= k; i += 1) {
    result = (result * (n - k + i)) / i;
  }
  return Math.round(result);
}
