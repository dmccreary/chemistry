/*
  Catalyzed vs. Uncatalyzed Energy Profile MicroSim
  Step 2.5 planning:
  - Control inventory:
      1. Slider: catalyst strength (0-1)
      2. Radio buttons: exothermic vs. endothermic
      3. Checkbox: show intermediate (two-peak catalyzed path)
      4. Radio buttons: animation path selection
  - Layout calculations:
      drawHeight = 480 (title + diagram)
      controlHeight = 200 (four control rows using slider alignment template)
      canvasHeight = 680 (iframe height 682px)
*/

let canvasWidth = 800;
let drawHeight = 480;
let controlHeight = 200;
let canvasHeight = drawHeight + controlHeight;
let margin = 40;
const titleText = 'Catalyzed vs. Uncatalyzed Energy Profile';

let catalystSlider;
let thermoRadio;
let intermediateCheckbox;
let pathRadio;
let controlRows = [];

let reactantEnergy = 200;
let productEnergy = 80;
let uncatalyzedPeak = 430;
let baseCatalyzedPeak = 320;
let animationProgress = 0;
let animatePath = 'uncat';
let tooltips = [];
let pathCache = { unc: [], cat: [] };

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const main = document.querySelector('main');
  if (main) canvas.parent(main);
  textFont('Arial');
  createControls();
  describe('Adjust catalyst strength and enthalpy to compare activation energies for catalyzed vs. uncatalyzed reactions.', 'Catalysis Energy Profile');
}

function draw() {
  updateCanvasSize();
  positionControlRows();
  background('#f5f5f5');
  drawTitle();
  drawEnergyDiagram();
  drawLegend();
  drawFooter();
  updateAnimation();
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

  catalystSlider = createSlider(0, 1, 0.5, 0.01);
  catalystSlider.parent(controlRows[0].row);
  catalystSlider.input(() => {
    animationProgress = 0;
    updateControlValues();
  });
  styleSlider(catalystSlider);

  thermoRadio = createRadio();
  thermoRadio.option('Exothermic', 'exo');
  thermoRadio.option('Endothermic', 'endo');
  thermoRadio.value('exo');
  thermoRadio.parent(controlRows[1].row);
  thermoRadio.changed(() => {
    updateThermo();
    updateControlValues();
  });

  intermediateCheckbox = createCheckbox('Show intermediate', false);
  intermediateCheckbox.parent(controlRows[2].row);
  intermediateCheckbox.changed(() => {
    animationProgress = 0;
    updateControlValues();
  });

  pathRadio = createRadio();
  pathRadio.option('Uncatalyzed', 'uncat');
  pathRadio.option('Catalyzed', 'cat');
  pathRadio.value('uncat');
  pathRadio.parent(controlRows[3].row);
  pathRadio.changed(() => {
    animatePath = pathRadio.value();
    animationProgress = 0;
    updateControlValues();
  });

  updateControlValues();
}

function createControlRows() {
  const labels = ['Catalyst Strength', 'Reaction Profile', 'Intermediate', 'Animate Path'];
  controlRows = labels.map(label => {
    const row = createDiv();
    row.style('display', 'inline-block');
    row.style('padding', '4px 8px');
    row.style('background', '#ffffff');
    row.style('border-radius', '6px');
    row.style('box-shadow', '0 1px 3px rgba(0,0,0,0.1)');
    row.style('font-family', 'Arial, Helvetica, sans-serif');
    row.addClass('cep-row');
    const labelSpan = createSpan(label + ': ');
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
  el.style('min-width', '150px');
  el.style('font-weight', '600');
}

function styleValue(el) {
  el.style('display', 'inline-block');
  el.style('min-width', '80px');
}

function styleSlider(slider) {
  slider.style('width', '200px');
  slider.style('margin-left', '12px');
}

function positionControlRows() {
  const canvasEl = document.querySelector('main canvas');
  if (!canvasEl) return;
  const rect = canvasEl.getBoundingClientRect();
  const baseX = rect.left + window.scrollX + margin;
  const baseY = rect.top + window.scrollY + drawHeight + 15;
  controlRows.forEach((entry, idx) => {
    entry.row.position(baseX, baseY + idx * 40);
  });
}

function updateControlValues() {
  if (!controlRows.length) return;
  controlRows[0].value.html(nf(catalystSlider.value(), 0, 2));
  controlRows[1].value.html(thermoRadio.value() === 'exo' ? 'Exothermic' : 'Endothermic');
  controlRows[2].value.html(intermediateCheckbox.checked() ? 'On' : 'Off');
  controlRows[3].value.html(pathRadio.value() === 'uncat' ? 'Uncatalyzed' : 'Catalyzed');
}

function updateThermo() {
  productEnergy = thermoRadio.value() === 'endo' ? 260 : 80;
  animationProgress = 0;
}

function getCatalyzedPeak() {
  return baseCatalyzedPeak - catalystSlider.value() * 130;
}

function drawTitle() {
  fill('#111111');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(26);
  text(titleText, canvasWidth / 2, 10);
}

function drawEnergyDiagram() {
  const paths = computePaths();
  pathCache = paths;
  const energyToY = paths.energyToY;
  tooltips = paths.tooltips;

  stroke('#B0BEC5');
  strokeWeight(1);
  drawingContext.setLineDash([6, 6]);
  line(margin, energyToY(reactantEnergy), canvasWidth - margin, energyToY(reactantEnergy));
  line(margin, energyToY(productEnergy), canvasWidth - margin, energyToY(productEnergy));
  line(margin, energyToY(uncatalyzedPeak), canvasWidth - margin, energyToY(uncatalyzedPeak));
  line(margin, energyToY(getCatalyzedPeak()), canvasWidth - margin, energyToY(getCatalyzedPeak()));
  drawingContext.setLineDash([]);

  drawCurve(paths.unc, '#1565C0');
  drawCurve(paths.cat, '#EF6C00');
  drawEnergyArrows(paths, energyToY);
  drawTooltips();
}

function computePaths() {
  const startX = margin + 20;
  const endX = canvasWidth - margin - 20;
  const energyMax = 450;
  const energyMin = 40;
  const energyToY = energy => map(energy, energyMin, energyMax, drawHeight - 60, margin + 80);
  const showIntermediate = intermediateCheckbox.checked();
  const catalyzedPeak = getCatalyzedPeak();

  const unc = [];
  const cat = [];
  for (let i = 0; i <= 200; i += 1) {
    const t = i / 200;
    const x = lerp(startX, endX, t);
    const energy = getEnergyPoint(t, reactantEnergy, productEnergy, uncatalyzedPeak);
    unc.push({ x, y: energyToY(energy), energy });
  }

  for (let i = 0; i <= 200; i += 1) {
    const t = i / 200;
    const x = lerp(startX, endX, t);
    const energy = getCatalyzedEnergy(t, catalyzedPeak, showIntermediate);
    cat.push({ x, y: energyToY(energy), energy });
  }

  const tooltips = [
    { x: startX, energy: reactantEnergy, label: 'Reactants' },
    { x: endX, energy: productEnergy, label: 'Products' },
    { x: lerp(startX, endX, 0.45), energy: uncatalyzedPeak, label: 'Ea (uncatalyzed)' },
    { x: lerp(startX, endX, showIntermediate ? 0.25 : 0.45), energy: catalyzedPeak, label: 'Ea (catalyzed)' }
  ];

  return { unc, cat, energyToY, tooltips };
}

function getEnergyPoint(t, react, product, peak) {
  return react + (peak - react) * Math.sin(Math.PI * t) + (product - react) * t;
}

function getCatalyzedEnergy(t, peak, showIntermediate) {
  if (!showIntermediate) {
    return getEnergyPoint(t, reactantEnergy, productEnergy, peak);
  }
  const midEnergy = (reactantEnergy + productEnergy) / 2 - 40;
  if (t < 0.5) {
    const localT = t * 2;
    return getEnergyPoint(localT, reactantEnergy, midEnergy, peak);
  }
  const localT = (t - 0.5) * 2;
  return getEnergyPoint(localT, midEnergy, productEnergy, peak - 20);
}

function drawCurve(points, strokeColor) {
  if (!points.length) return;
  noFill();
  stroke(strokeColor);
  strokeWeight(3);
  beginShape();
  points.forEach(pt => vertex(pt.x, pt.y));
  endShape();
}

function drawEnergyArrows(paths, energyToY) {
  const left = margin + 10;
  const catPeak = getCatalyzedPeak();
  drawDoubleArrow(left, energyToY(reactantEnergy), left, energyToY(uncatalyzedPeak), '#1565C0', 'Ea (uncat)');
  drawDoubleArrow(left + 50, energyToY(reactantEnergy), left + 50, energyToY(catPeak), '#EF6C00', 'Ea (cat)');
  drawDoubleArrow(canvasWidth - margin - 30, energyToY(productEnergy), canvasWidth - margin - 30, energyToY(reactantEnergy), '#37474F', 'ΔH');
}

function drawDoubleArrow(x1, y1, x2, y2, colorVal, label) {
  stroke(colorVal);
  strokeWeight(2);
  line(x1, y1, x2, y2);
  const arrowSize = 8;
  drawArrowhead(x1, y1, (x2 - x1), (y2 - y1));
  drawArrowhead(x2, y2, (x1 - x2), (y1 - y2));
  fill(colorVal);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  const labelY = (y1 + y2) / 2;
  text(label, x1 - 5, labelY);
}

function drawArrowhead(x, y, dx, dy) {
  push();
  translate(x, y);
  const angle = Math.atan2(dy, dx);
  rotate(angle);
  triangle(0, 0, 0, 8, 8, 4);
  pop();
}

function drawLegend() {
  const legendX = canvasWidth - margin - 170;
  const legendY = margin + 20;
  fill('#ffffff');
  stroke('#cfd8dc');
  rect(legendX, legendY, 160, 70, 8);
  fill('#1565C0');
  noStroke();
  rect(legendX + 10, legendY + 15, 18, 4);
  fill('#111111');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('Uncatalyzed', legendX + 35, legendY + 8);
  fill('#EF6C00');
  rect(legendX + 10, legendY + 40, 18, 4);
  fill('#111111');
  noStroke();
  text('Catalyzed', legendX + 35, legendY + 33);
}

function drawFooter() {
  fill('#111111');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text('Catalysts lower Ea but do not change ΔH. Adjust the controls to visualize this effect.', canvasWidth / 2, drawHeight + controlHeight - 25);
}

function drawTooltips() {
  if (!tooltips.length) return;
  const radius = 8;
  tooltips.forEach(point => {
    const y = energyToPixel(point.energy);
    if (dist(mouseX, mouseY, point.x, y) < radius + 5) {
      const textContent = point.label + ': ' + nf(point.energy, 0, 0) + ' kJ/mol';
      const boxWidth = textWidth(textContent) + 12;
      fill(255, 255, 255, 235);
      stroke('#b0bec5');
      rect(mouseX + 10, mouseY - 20, boxWidth, 24, 6);
      noStroke();
      fill('#111111');
      textAlign(LEFT, CENTER);
      text(textContent, mouseX + 16, mouseY - 8);
    }
  });
}

function energyToPixel(energy) {
  const energyMax = 450;
  const energyMin = 40;
  return map(energy, energyMin, energyMax, drawHeight - 60, margin + 80);
}

function updateAnimation() {
  const path = animatePath === 'uncat' ? pathCache.unc : pathCache.cat;
  if (!path.length) return;
  animationProgress = (animationProgress + 0.004) % 1;
  const index = Math.floor(animationProgress * (path.length - 1));
  const point = path[index];
  fill('#00BCD4');
  noStroke();
  circle(point.x, point.y, 14);
}
