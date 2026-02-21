/*
  Le Chatelier's Principle Explorer

  Step 2.5 layout plan
  ---------------------
  Drawing area (drawHeight = 520 px):
    - Left panel (particle animation box) 340×360 px
    - Right panel (bar chart + status cards) 360×360 px
    - Status strip below panels displaying K, Q, verdict text
  Control area (controlHeight = 240 px):
    - Four button rows (concentration, pressure/volume, temperature, catalyst/reset)
    - Buttons styled with consistent spacing; instructions remain unobstructed
  Canvas height = 760 px (matches iframe)
*/

let canvasWidth = 900;
let drawHeight = 520;
let controlHeight = 240;
let canvasHeight = drawHeight + controlHeight;
const margin = 24;
const titleText = 'Le Chatelier’s Principle Explorer — Haber Process';

const speciesVisuals = {
  N2: { color: '#1565C0', radius: 11 },
  H2: { color: '#ECEFF1', radius: 6 },
  NH3: { color: '#2E7D32', radius: 9 }
};

let concentrations = { N2: 1.0, H2: 3.0, NH3: 0.6 };
let displayConcentrations = { ...concentrations };
let referenceConcentrations = { N2: 1.0, H2: 3.0, NH3: 0.6 };

let baseK = 0.45;
let temperatureC = 450;
let Kvalue = baseK;
let rateForward = 0.55;
let rateReverse = rateForward / Kvalue;
let rateMultiplier = 1;
let catalystTimer = 0;

let verdict = 'At equilibrium ✓';
let verdictColor = '#2E7D32';

let callouts = [];
let particles = [];
const particleBox = { x: margin, y: 100, width: 340, height: 360 };

let controlRows = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const main = document.querySelector('main');
  if (main) canvas.parent(main);
  textFont('Arial');
  initParticles();
  createControls();
  describe('Apply Le Chatelier stresses (concentration, pressure, temperature, inert gas, catalyst) to the Haber equilibrium and monitor Q vs K.', 'Le Chatelier Explorer');
}

function draw() {
  updateCanvasSize();
  background('#f5f7fb');
  updateDynamics();
  drawTitle();
  drawPanels();
  drawStatusBar();
  drawCallouts();
  drawControlBackground();
  positionControlRows();
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

function initParticles() {
  const total = 70;
  particles = [];
  for (let i = 0; i < total; i += 1) {
    const type = i % 3 === 0 ? 'NH3' : (random() < 0.5 ? 'N2' : 'H2');
    particles.push(createParticle(type));
  }
}

function createParticle(type) {
  return {
    type,
    x: random(particleBox.x + 20, particleBox.x + particleBox.width - 20),
    y: random(particleBox.y + 20, particleBox.y + particleBox.height - 20),
    vx: random(-1, 1),
    vy: random(-1, 1)
  };
}

function updateDynamics() {
  const dt = 0.01;
  rateReverse = rateForward / max(Kvalue, 1e-4);
  const reactionRate = rateMultiplier * (rateForward * concentrations.N2 * pow(concentrations.H2, 3) - rateReverse * pow(concentrations.NH3, 2));
  concentrations.N2 = max(0.01, concentrations.N2 - reactionRate * dt);
  concentrations.H2 = max(0.05, concentrations.H2 - 3 * reactionRate * dt);
  concentrations.NH3 = max(0.01, concentrations.NH3 + 2 * reactionRate * dt);

  Object.keys(displayConcentrations).forEach(key => {
    displayConcentrations[key] = lerp(displayConcentrations[key], concentrations[key], 0.05);
  });

  updateParticles(reactionRate);
  syncParticleCounts();
  updateCatalystTimer();
  computeVerdict();
}

function updateParticles(rate) {
  particles.forEach(p => {
    p.x += p.vx * 1.2;
    p.y += p.vy * 1.2;
    if (p.x < particleBox.x + 10 || p.x > particleBox.x + particleBox.width - 10) p.vx *= -1;
    if (p.y < particleBox.y + 10 || p.y > particleBox.y + particleBox.height - 10) p.vy *= -1;
    p.x = constrain(p.x, particleBox.x + 8, particleBox.x + particleBox.width - 8);
    p.y = constrain(p.y, particleBox.y + 8, particleBox.y + particleBox.height - 8);
  });

  const conversions = constrain(floor(abs(rate) * 8), 0, 4);
  if (conversions > 0) {
    if (rate > 0) {
      convertParticles(['N2', 'H2'], 'NH3', conversions);
    } else {
      convertParticles(['NH3'], random() < 0.5 ? 'N2' : 'H2', conversions);
    }
  }
}

function convertParticles(sourceTypes, targetType, count) {
  for (let i = 0; i < count; i += 1) {
    const candidates = particles.filter(p => sourceTypes.includes(p.type));
    if (!candidates.length) return;
    const chosen = random(candidates);
    chosen.type = targetType;
  }
}

function syncParticleCounts() {
  Object.keys(speciesVisuals).forEach(key => {
    const scale = 18;
    const desired = floor(concentrations[key] * scale);
    const current = particles.filter(p => p.type === key).length;
    if (current < desired) {
      for (let i = 0; i < desired - current; i += 1) {
        particles.push(createParticle(key));
      }
    } else if (current > desired) {
      let removed = 0;
      for (let i = particles.length - 1; i >= 0 && removed < current - desired; i -= 1) {
        if (particles[i].type === key) {
          particles.splice(i, 1);
          removed += 1;
        }
      }
    }
  });
}

function updateCatalystTimer() {
  if (catalystTimer > 0) {
    catalystTimer -= deltaTime / 1000;
    if (catalystTimer <= 0) {
      rateMultiplier = 1;
    }
  }
}

function computeVerdict() {
  const Q = computeQ();
  const tolerance = 0.05 * Kvalue;
  if (abs(Q - Kvalue) <= tolerance) {
    verdict = 'At equilibrium ✓';
    verdictColor = '#2E7D32';
  } else if (Q < Kvalue) {
    verdict = 'Shifting forward ▶';
    verdictColor = '#1E88E5';
  } else {
    verdict = 'Shifting reverse ◀';
    verdictColor = '#C62828';
  }
}

function drawTitle() {
  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  text(titleText, canvasWidth / 2, 16);
}

function drawPanels() {
  drawParticlePanel();
  drawBarPanel();
}

function drawParticlePanel() {
  fill('#FFFFFF');
  stroke('#CFD8DC');
  rect(particleBox.x - 10, particleBox.y - 40, particleBox.width + 20, particleBox.height + 60, 16);
  fill('#1F2933');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text('Particle view (N₂ blue, H₂ silver, NH₃ green)', particleBox.x, particleBox.y - 28);

  stroke('#90A4AE');
  noFill();
  rect(particleBox.x, particleBox.y, particleBox.width, particleBox.height, 12);

  particles.forEach(p => {
    fill(speciesVisuals[p.type].color);
    noStroke();
    circle(p.x, p.y, speciesVisuals[p.type].radius);
  });
}

function drawBarPanel() {
  const panelX = particleBox.x + particleBox.width + 40;
  const panelY = 90;
  const panelWidth = canvasWidth - panelX - margin;
  const panelHeight = 360;
  fill('#FFFFFF');
  stroke('#CFD8DC');
  rect(panelX - 10, panelY - 30, panelWidth + 20, panelHeight + 60, 16);
  noStroke();
  fill('#1F2933');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Concentration bar chart (dashed = baseline equilibrium)', panelX, panelY - 18);

  const barWidth = (panelWidth - 80) / 3;
  const maxHeight = panelHeight - 60;
  const speciesOrder = ['N2', 'H2', 'NH3'];
  speciesOrder.forEach((key, index) => {
    const value = displayConcentrations[key];
    const barHeight = map(value, 0, 4, 0, maxHeight);
    const x = panelX + index * (barWidth + 30);
    const y = panelY + panelHeight - 40 - barHeight;
    fill('#E0E0E0');
    rect(x, panelY + 40, barWidth, maxHeight, 6);
    stroke('#90A4AE');
    const refHeight = map(referenceConcentrations[key], 0, 4, 0, maxHeight);
    const refY = panelY + panelHeight - 40 - refHeight;
    drawingContext.setLineDash([6, 4]);
    line(x, refY, x + barWidth, refY);
    drawingContext.setLineDash([]);
    noStroke();
    fill(speciesVisuals[key].color);
    rect(x, y, barWidth, barHeight, 6, 6, 0, 0);
    fill('#1F2933');
    textAlign(CENTER, TOP);
    text(`${key} (${value.toFixed(2)} M)`, x + barWidth / 2, panelY + panelHeight - 32);
  });
}

function drawStatusBar() {
  const barY = drawHeight - 40;
  fill('#FFFFFF');
  stroke('#CFD8DC');
  rect(margin, barY, canvasWidth - margin * 2, 56, 12);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  fill('#1F2933');
  text(`Temperature: ${temperatureC} °C`, margin + 16, barY + 28);
  text(`K = ${Kvalue.toFixed(2)}`, margin + 180, barY + 28);
  const Q = computeQ();
  text(`Q = ${Q.toFixed(2)}`, margin + 300, barY + 28);
  fill(verdictColor);
  textAlign(RIGHT, CENTER);
  text(verdict, canvasWidth - margin - 20, barY + 28);
}

function computeQ() {
  const numerator = pow(concentrations.NH3, 2);
  const denominator = max(concentrations.N2 * pow(concentrations.H2, 3), 1e-4);
  return numerator / denominator;
}

function drawCallouts() {
  const now = millis() / 1000;
  callouts = callouts.filter(c => c.expires > now);
  textSize(13);
  callouts.forEach((callout, index) => {
    const width = textWidth(callout.text) + 40;
    const x = (canvasWidth - width) / 2;
    const y = 20 + index * 36;
    fill('rgba(255,255,255,0.95)');
    stroke('#90A4AE');
    rect(x, y, width, 30, 8);
    noStroke();
    fill('#1F2933');
    textAlign(CENTER, CENTER);
    text(callout.text, x + width / 2, y + 15);
  });
}

function drawControlBackground() {
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);
}

function createControls() {
  controlRows = [];
  controlRows.push(createButtonRow('Concentration stresses', [
    { label: 'Add N₂', action: () => adjustSpecies('N2', 0.25, 'Added N₂ — Q decreases, system shifts forward.') },
    { label: 'Remove N₂', action: () => adjustSpecies('N2', -0.2, 'Removed N₂ — Q increases, shifts reverse.') },
    { label: 'Add NH₃', action: () => adjustSpecies('NH3', 0.25, 'Added NH₃ — Q spikes above K.') },
    { label: 'Remove NH₃', action: () => adjustSpecies('NH3', -0.25, 'Removed NH₃ — Q drops, shifts forward.') }
  ]));

  controlRows.push(createButtonRow('Pressure / Volume', [
    { label: 'Compress (↑P)', action: () => scalePressure(1.2) },
    { label: 'Expand (↓P)', action: () => scalePressure(0.85) },
    { label: 'Add Ar (const V)', action: () => addInertGas() }
  ]));

  controlRows.push(createButtonRow('Temperature (ΔH < 0)', [
    { label: 'Increase Temp', action: () => adjustTemperature(50) },
    { label: 'Decrease Temp', action: () => adjustTemperature(-50) }
  ]));

  controlRows.push(createButtonRow('Catalyst & Reset', [
    { label: 'Add Catalyst', action: () => addCatalyst() },
    { label: 'Reset to Equilibrium', action: () => resetSystem() }
  ]));
}

function createButtonRow(labelText, buttons) {
  const row = createDiv();
  row.style('display', 'inline-block');
  row.style('background', '#ffffff');
  row.style('padding', '6px 10px');
  row.style('border-radius', '8px');
  row.style('box-shadow', '0 1px 3px rgba(0,0,0,0.12)');
  row.style('font-family', 'Arial, Helvetica, sans-serif');
  row.style('font-size', '14px');

  const labelSpan = createSpan(labelText + ':');
  labelSpan.parent(row);
  labelSpan.style('display', 'inline-block');
  labelSpan.style('min-width', '230px');
  labelSpan.style('font-weight', '600');

  const slot = createDiv();
  slot.parent(row);
  slot.style('display', 'inline-flex');
  slot.style('flex-wrap', 'wrap');
  slot.style('gap', '8px');
  slot.style('width', '280px');

  buttons.forEach(btnConfig => {
    const btn = createButton(btnConfig.label);
    btn.parent(slot);
    styleControlButton(btn);
    btn.mousePressed(btnConfig.action);
  });

  return { row };
}

function styleControlButton(btn) {
  btn.style('padding', '6px 10px');
  btn.style('border-radius', '6px');
  btn.style('border', '1px solid #1e88e5');
  btn.style('background', '#ffffff');
  btn.style('cursor', 'pointer');
}

function positionControlRows() {
  const canvasEl = document.querySelector('main canvas');
  if (!canvasEl) return;
  const rect = canvasEl.getBoundingClientRect();
  const baseX = rect.left + window.scrollX + margin;
  const baseY = rect.top + window.scrollY + drawHeight + 20;
  const availableWidth = Math.min(canvasWidth - margin * 2, 620);
  const visibleRows = controlRows.filter(entry => entry.row.elt.style.display !== 'none');
  let currentY = baseY;
  visibleRows.forEach(entry => {
    entry.row.position(baseX, currentY);
    entry.row.style('width', availableWidth + 'px');
    const rowHeight = entry.row.elt.offsetHeight || 54;
    currentY += rowHeight + 12;
  });
}

function adjustSpecies(key, delta, message) {
  concentrations[key] = max(0.05, concentrations[key] + delta);
  pushCallout(message);
}

function scalePressure(factor) {
  concentrations.N2 *= factor;
  concentrations.H2 *= factor;
  concentrations.NH3 *= factor;
  const direction = factor > 1 ? 'Compression favors products (fewer moles of gas).' : 'Expansion favors reactants (more moles of gas).';
  pushCallout(direction);
}

function addInertGas() {
  pushCallout('Inert gas at constant volume: partial pressures unchanged → no shift.');
}

function adjustTemperature(delta) {
  temperatureC = constrain(temperatureC + delta, 350, 650);
  const exponent = (temperatureC - 450) / 120;
  Kvalue = constrain(baseK * exp(-0.9 * exponent), 0.03, 8);
  pushCallout(delta > 0 ? 'Higher T (exothermic) → K decreases, shifts reverse.' : 'Lower T → K increases, shifts forward.');
}

function addCatalyst() {
  rateMultiplier = 2;
  catalystTimer = 5;
  pushCallout('Catalyst speeds approach to equilibrium, position unchanged.');
}

function resetSystem() {
  concentrations = { N2: 1.0, H2: 3.0, NH3: 0.6 };
  displayConcentrations = { ...concentrations };
  temperatureC = 450;
  Kvalue = baseK;
  rateMultiplier = 1;
  callouts = [];
  initParticles();
}

function pushCallout(text) {
  const expires = millis() / 1000 + 4;
  callouts.push({ text, expires });
}
