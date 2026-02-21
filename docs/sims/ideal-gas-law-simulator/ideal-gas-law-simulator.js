// Ideal Gas Law Interactive Simulator
// Title centered top, controls in control strip

let containerWidth;
let canvasWidth = 860;
let drawHeight = 520;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

const margin = 20;
const sliderLeftMargin = 150;
const sliderSpacing = 30;
const R = 0.08206;

let pressure = 1.0;
let volume = 22.4;
let temperature = 273;
let moles = 1.0;
let solveFor = 'P';

let pressureSlider, volumeSlider, temperatureSlider, molesSlider;
let solveRadio;
let resetButton, hintButton;

let hintMessage = 'PV = nRT';
let particles = [];
let lastChanged = 'V';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(16);

  createControls();
  initializeParticles();
  updateSolveState();
  describe('Ideal gas law simulator with piston visualization and sliders that solve for a chosen variable.', LABEL);
}

function draw() {
  updateCanvasSize();
  background('aliceblue');
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawTitle();
  drawCylinder();
  drawRightPanel();
  drawEquationDisplay();
  drawHint();
  drawControlLabels();
}

function drawTitle() {
  fill('white');
  textAlign(CENTER, TOP);
  textSize(30);
  text('Ideal Gas Law Interactive Simulator', canvasWidth / 2, margin / 2);
}

function drawCylinder() {
  const panelWidth = canvasWidth * 0.5 - margin * 2;
  const x = margin * 2;
  const y = margin + 60;
  const baseHeight = drawHeight - y - 80;
  const pistonY = y + map(volume, 1, 20, baseHeight * 0.1, baseHeight * 0.9);

  stroke('#6c7a89');
  strokeWeight(3);
  fill('rgba(255,255,255,0.05)');
  rect(x, y, panelWidth, baseHeight, 20);
  fill('#5dade2');
  rect(x - 10, y - 30, panelWidth + 20, 30);
  fill('#6c7a89');
  rect(x - 10, pistonY - 10, panelWidth + 20, 20, 10);

  const chamber = { x: x + 10, y: y + 10, w: panelWidth - 20, h: pistonY - y - 20 };
  animateParticles(chamber);

  fill('#9fbad6');
  textAlign(LEFT, TOP);
  textSize(14);
  text(`Particles: ${particles.length}`, x, pistonY + 20);
}

function animateParticles(chamber) {
  const speedFactor = map(temperature, 100, 600, 0.8, 2.5);
  for (const p of particles) {
    p.x += p.vx * speedFactor;
    p.y += p.vy * speedFactor;

    if (p.x < chamber.x || p.x > chamber.x + chamber.w) {
      p.vx *= -1;
    }
    if (p.y < chamber.y || p.y > chamber.y + chamber.h) {
      p.vy *= -1;
    }

    const speed = sqrt(p.vx * p.vx + p.vy * p.vy);
    const colorFactor = constrain(map(speed, 0.5, 3, 0, 1), 0, 1);
    const r = lerpColor(color('#6495ED'), color('#FF6347'), colorFactor);
    fill(r);
    noStroke();
    ellipse(p.x, p.y, 6, 6);
  }
}

function drawRightPanel() {
  const x = canvasWidth * 0.5 + margin;
  const y = margin + 60;
  const width = canvasWidth * 0.45 - margin;
  fill('#162439');
  rect(x, y, width, drawHeight - y - margin, 12);

  fill('white');
  textAlign(LEFT, TOP);
  textSize(16);
  text(`P (atm): ${pressure.toFixed(2)}`, x + 16, y + 20);
  text(`V (L): ${volume.toFixed(1)}`, x + 16, y + 50);
  text(`T (K): ${temperature.toFixed(0)}`, x + 16, y + 80);
  text(`n (mol): ${moles.toFixed(2)}`, x + 16, y + 110);

  const result = getSolvedValue();
  fill('#FFFACD');
  rect(x + 16, y + 150, width - 32, 100, 10);
  fill('#2d4059');
  textAlign(CENTER, CENTER);
  textSize(18);
  text(`Solving for ${solveFor}: ${result.text}`, x + width / 2, y + 200);
}

function drawEquationDisplay() {
  const eq = computeEquationString();
  fill('white');
  textAlign(CENTER, TOP);
  textSize(16);
  text(eq, canvasWidth / 2, drawHeight - 40);
}

function drawHint() {
  fill('#f1c40f');
  textAlign(CENTER, TOP);
  textSize(14);
  text(hintMessage, canvasWidth / 2, drawHeight - 20);
}

function createControls() {
  pressureSlider = createSlider(0.5, 3.0, pressure, 0.1);
  volumeSlider = createSlider(1.0, 20.0, volume, 0.5);
  temperatureSlider = createSlider(100, 600, temperature, 10);
  molesSlider = createSlider(0.5, 3.0, moles, 0.1);

  pressureSlider.input(() => handleSliderChange('P', () => pressure = pressureSlider.value()));
  volumeSlider.input(() => handleSliderChange('V', () => volume = volumeSlider.value()));
  temperatureSlider.input(() => handleSliderChange('T', () => temperature = temperatureSlider.value()));
  molesSlider.input(() => handleSliderChange('n', () => moles = molesSlider.value()));

  solveRadio = createRadio();
  solveRadio.option('P');
  solveRadio.option('V');
  solveRadio.option('T');
  solveRadio.option('n');
  solveRadio.selected('P');
  solveRadio.changed(() => {
    solveFor = solveRadio.value();
    updateSolveState();
  });

  resetButton = createButton('Reset');
  resetButton.mousePressed(resetValues);

  hintButton = createButton('Hint');
  hintButton.mousePressed(showHint);

  positionControls();
}

function handleSliderChange(variable, updateFn) {
  if (solveFor === variable) return;
  updateFn();
  lastChanged = variable;
  solveVariable();
}

function updateSolveState() {
  solveVariable();
}

function solveVariable() {
  switch (solveFor) {
    case 'P':
      pressure = (moles * R * temperature) / volume;
      pressureSlider.value(pressure);
      break;
    case 'V':
      volume = (moles * R * temperature) / pressure;
      volumeSlider.value(volume);
      break;
    case 'T':
      temperature = (pressure * volume) / (moles * R);
      temperatureSlider.value(temperature);
      break;
    case 'n':
      moles = (pressure * volume) / (R * temperature);
      molesSlider.value(moles);
      break;
  }
  initializeParticles();
}

function getSolvedValue() {
  const value = solveFor === 'P' ? pressure : solveFor === 'V' ? volume : solveFor === 'T' ? temperature : moles;
  const unit = solveFor === 'P' ? 'atm' : solveFor === 'V' ? 'L' : solveFor === 'T' ? 'K' : 'mol';
  return { text: `${value.toFixed(unit === 'K' ? 0 : 2)} ${unit}` };
}

function computeEquationString() {
  return `PV = nRT → (${pressure.toFixed(2)})(${volume.toFixed(1)}) = (${moles.toFixed(2)})(0.08206)(${temperature.toFixed(0)})`;
}

function initializeParticles() {
  const count = int(map(moles, 0.5, 3, 20, 70));
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: random(margin * 2 + 20, canvasWidth * 0.5 - margin * 2),
      y: random(margin + 80, drawHeight - 150),
      vx: random(-1, 1),
      vy: random(-1, 1)
    });
  }
}

function resetValues() {
  pressure = 1.0;
  volume = 22.4;
  temperature = 273;
  moles = 1.0;
  pressureSlider.value(pressure);
  volumeSlider.value(volume);
  temperatureSlider.value(temperature);
  molesSlider.value(moles);
  solveFor = 'P';
  solveRadio.selected('P');
  updateSolveState();
  hintMessage = 'PV = nRT';
}

function showHint() {
  hintMessage = determineHint();
}

function determineHint() {
  if ((solveFor === 'P' && lastChanged === 'V') || (solveFor === 'V' && lastChanged === 'P')) {
    return 'Boyle\'s Law: P ∝ 1/V at constant T and n';
  }
  if ((solveFor === 'V' && lastChanged === 'T') || (solveFor === 'T' && lastChanged === 'V')) {
    return 'Charles\' Law: V ∝ T at constant P and n';
  }
  if ((solveFor === 'V' && lastChanged === 'n') || (solveFor === 'n' && lastChanged === 'V')) {
    return 'Avogadro\'s Law: V ∝ n at constant P and T';
  }
  return 'Combined Gas Law: PV = nRT';
}

function drawHint() {
  fill('#f1c40f');
  textAlign(CENTER, TOP);
  textSize(14);
  text(hintMessage, canvasWidth / 2, drawHeight - 20);
}

function drawControlLabels() {
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(15);
  text(`P (atm): ${pressure.toFixed(2)}`, margin, drawHeight + 20);
  text(`V (L): ${volume.toFixed(1)}`, margin, drawHeight + 20 + sliderSpacing);
  text(`T (K): ${temperature.toFixed(0)}`, margin, drawHeight + 20 + sliderSpacing * 2);
  text(`n (mol): ${moles.toFixed(2)}`, margin, drawHeight + 20 + sliderSpacing * 3);
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
  const width = canvasWidth - sliderLeftMargin - margin;
  let y = drawHeight + 10;
  const sliderHeightSpacing = 30;
  pressureSlider.position(sliderLeftMargin, y);
  pressureSlider.size(width);
  y += sliderHeightSpacing;
  volumeSlider.position(sliderLeftMargin, y);
  volumeSlider.size(width);
  y += sliderHeightSpacing;
  temperatureSlider.position(sliderLeftMargin, y);
  temperatureSlider.size(width);
  y += sliderHeightSpacing;
  molesSlider.position(sliderLeftMargin, y);
  molesSlider.size(width);

  const controlsY = drawHeight + sliderHeightSpacing * 4 + 20;
  solveRadio.position(sliderLeftMargin, controlsY);
  resetButton.position(sliderLeftMargin + 160, controlsY);
  hintButton.position(sliderLeftMargin + 240, controlsY);
}
