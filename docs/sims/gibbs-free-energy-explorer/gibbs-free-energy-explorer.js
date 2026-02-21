/*
  Gibbs Free Energy Spontaneity Explorer

  Step 2.5 layout plan
  ---------------------
  Control inventory:
    1. Slider: ΔH (kJ/mol)
    2. Slider: ΔS (J/mol·K)
    3. Slider: Temperature (K)
    4. Button row: Preset industrial/biological scenarios
    5. Checkbox: Show crossover (ΔG = 0) info

  Layout constants:
    drawHeight = 520 px (padding for centered title + legend area)
    controlHeight = 260 px (space for three slider rows, options row, preset row)
    canvasHeight = drawHeight + controlHeight = 780 px (iframe height = 782 px)
    margin = 24 px, sliderLeftMargin = 260 px, sliderRowSpacing = 54 px
    control rows positioned relative to canvas bottom to keep alignment consistent
*/

let canvasWidth = 840;
let drawHeight = 520;
let controlHeight = 260;
let canvasHeight = drawHeight + controlHeight;
const margin = 24;
const sliderLeftMargin = 260;
const sliderRowSpacing = 54;
const titleText = 'Gibbs Free Energy Spontaneity Explorer';
const tempMax = 1500;
const gMin = -420;
const gMax = 420;

let canvasElement = null;
let hSlider;
let sSlider;
let tSlider;
let infoCheckbox;
let sliderRows = [];
let optionsRow = null;
let presetRow = null;
let presetButtons = [];
let currentControlColumnWidth = 420;

const presets = {
  haber: { label: 'Haber process', h: -92, s: -198 },
  melting: { label: 'Ice melting', h: 6, s: 22 },
  combustion: { label: 'Methane combustion', h: -891, s: -242 },
  atp: { label: 'ATP hydrolysis', h: -30, s: -45 }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const main = document.querySelector('main');
  if (main) {
    canvas.parent(main);
  }
  canvasElement = canvas;
  textFont('Arial');
  createControls();
  describe('Adjust ΔH, ΔS, and temperature to see how ΔG and spontaneity change.', titleText);
}

function draw() {
  updateCanvasSize();
  positionControlRows();
  background('aliceblue');
  drawCanvasRegions();
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
  if (container) {
    canvasWidth = container.offsetWidth;
  }
  canvasHeight = drawHeight + controlHeight;
}

function drawCanvasRegions() {
  noStroke();
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
}

function createControls() {
  sliderRows = [
    createBaseRow('Enthalpy ΔH (kJ/mol)', true),
    createBaseRow('Entropy ΔS (J/mol·K)', true),
    createBaseRow('Temperature (K)', true)
  ];

  hSlider = createSlider(-300, 300, -92, 2);
  sSlider = createSlider(-300, 300, -198, 2);
  tSlider = createSlider(0, tempMax, 298, 5);

  [hSlider, sSlider, tSlider].forEach(slider => {
    slider.style('width', '300px');
    slider.style('margin', '0 12px');
  });

  hSlider.parent(sliderRows[0].slot);
  sSlider.parent(sliderRows[1].slot);
  tSlider.parent(sliderRows[2].slot);

  hSlider.input(handleControlChange);
  sSlider.input(handleControlChange);
  tSlider.input(handleControlChange);

  optionsRow = createBaseRow('Show crossover info', true);
  infoCheckbox = createCheckbox('', true);
  infoCheckbox.parent(optionsRow.slot);
  infoCheckbox.changed(handleControlChange);

  presetRow = createBaseRow('Preset scenarios', false);
  buildPresetButtons();

  updateControlValues();
}

function createBaseRow(labelText, includeValue) {
  const row = createDiv();
  row.style('display', 'inline-block');
  row.style('background-color', 'white');
  row.style('padding', '6px 10px');
  row.style('border-radius', '8px');
  row.style('box-shadow', '0 1px 3px rgba(0,0,0,0.12)');
  row.style('font-family', 'Arial, Helvetica, sans-serif');
  row.style('font-size', '14px');

  const labelSpan = createSpan(labelText + ':');
  labelSpan.parent(row);
  styleLabel(labelSpan);

  const slot = createDiv();
  slot.parent(row);
  slot.style('display', 'inline-block');
  slot.style('width', '320px');
  slot.style('margin', '0 12px');

  let valueSpan = null;
  if (includeValue) {
    valueSpan = createSpan('');
    valueSpan.parent(row);
    styleValue(valueSpan);
  }

  return { row, label: labelSpan, slot, value: valueSpan };
}

function buildPresetButtons() {
  const group = createDiv();
  group.parent(presetRow.slot);
  group.style('display', 'flex');
  group.style('flex-wrap', 'wrap');
  group.style('gap', '8px');
  Object.values(presets).forEach(preset => {
    const btn = createButton(preset.label);
    btn.parent(group);
    btn.style('padding', '4px 10px');
    btn.style('border', '1px solid dodgerblue');
    btn.style('background', 'white');
    btn.style('border-radius', '4px');
    btn.style('margin', '0');
    btn.style('cursor', 'pointer');
    btn.mousePressed(() => setPreset(preset));
    presetButtons.push(btn);
  });
}

function handleControlChange() {
  updateControlValues();
  redraw();
}

function updateControlValues() {
  if (!sliderRows.length) {
    return;
  }
  sliderRows[0].value.html(`${hSlider.value()} kJ/mol`);
  sliderRows[1].value.html(`${sSlider.value()} J/mol·K`);
  sliderRows[2].value.html(`${tSlider.value()} K`);
  if (optionsRow && optionsRow.value) {
    optionsRow.value.html(infoCheckbox.checked() ? 'On' : 'Off');
  }
}

function positionControlRows() {
  const canvasEl = getCanvasElement();
  if (!canvasEl) {
    return;
  }
  const rect = canvasEl.getBoundingClientRect();
  const baseX = rect.left + window.scrollX + margin;
  const baseY = rect.top + window.scrollY + drawHeight + 16;
  const rowWidth = Math.min(canvasWidth - margin * 2, 820);
  const leftWidth = Math.min(rowWidth, Math.max(320, rowWidth * 0.6));
  currentControlColumnWidth = leftWidth;

  const sliderEntries = [...sliderRows, optionsRow].filter(Boolean);
  sliderEntries.forEach((entry, index) => {
    entry.row.position(baseX, baseY + index * sliderRowSpacing);
    entry.row.style('width', leftWidth + 'px');
  });

  if (presetRow) {
    const presetY = baseY + sliderEntries.length * sliderRowSpacing + 18;
    presetRow.row.position(baseX, presetY);
    presetRow.row.style('width', leftWidth + 'px');
  }
}

function getCanvasElement() {
  if (canvasElement && canvasElement.elt) {
    return canvasElement.elt;
  }
  const mainCanvas = document.querySelector('main canvas');
  return mainCanvas || null;
}

function styleLabel(el) {
  el.style('display', 'inline-block');
  el.style('min-width', sliderLeftMargin + 'px');
  el.style('font-weight', '600');
}

function styleValue(el) {
  el.style('display', 'inline-block');
  el.style('min-width', '110px');
  el.style('font-weight', '600');
}

function drawTitle() {
  fill('black');
  textSize(26);
  drawSafeText(titleText, canvasWidth / 2, 16, CENTER, TOP);
}

function drawGraph() {
  const graphX = margin + 18;
  const graphY = 70;
  const graphWidth = canvasWidth - (margin + 18) * 2;
  const graphHeight = drawHeight - 160;

  drawGraphBackground(graphX, graphY, graphWidth, graphHeight);
  const hVal = hSlider.value();
  const sVal = sSlider.value();
  const tVal = tSlider.value();
  const currentG = computeDeltaG(hVal, sVal, tVal);

  drawDeltaGCurve(graphX, graphY, graphWidth, graphHeight, hVal, sVal);
  drawTemperatureMarker(graphX, graphY, graphWidth, graphHeight, tVal, currentG);
  drawInfoBox(hVal, sVal, tVal, currentG, graphX + graphWidth - 180, graphY + 12);
  drawQuadrantLegend(graphX, graphY + graphHeight + 20, graphWidth);
  if (infoCheckbox.checked()) {
    drawCrossoverGuidance(hVal, sVal, graphX, graphY, graphWidth, graphHeight);
  }
}

function drawGraphBackground(x, y, w, h) {
  stroke('lightsteelblue');
  fill('white');
  rect(x - 16, y - 16, w + 32, h + 32, 16);

  fill(0, 200, 0, 35);
  stroke('lightgreen');
  rect(x, y + h / 2, w, h / 2);

  fill(255, 0, 0, 35);
  stroke('lightpink');
  rect(x, y, w, h / 2);

  stroke('lightslategray');
  line(x, y + h / 2, x + w, y + h / 2);

  const tickCount = 6;
  for (let i = 0; i <= tickCount; i += 1) {
    const t = i / tickCount;
    const px = lerp(x, x + w, t);
    stroke('lightgray');
    line(px, y + h, px, y + h + 6);
    fill('darkslategray');
    textSize(12);
    drawSafeText(`${round(tempMax * t)}`, px, y + h + 12, CENTER, TOP);
  }
}

function drawDeltaGCurve(x, y, w, h, hVal, sVal) {
  stroke('dodgerblue');
  noFill();
  beginShape();
  for (let T = 0; T <= tempMax; T += 10) {
    const g = computeDeltaG(hVal, sVal, T);
    const px = map(T, 0, tempMax, x, x + w);
    const py = map(g, gMin, gMax, y + h, y);
    vertex(px, py);
  }
  endShape();
}

function drawTemperatureMarker(x, y, w, h, tVal, currentG) {
  const markerX = map(tVal, 0, tempMax, x, x + w);
  const markerY = map(currentG, gMin, gMax, y + h, y);
  stroke('goldenrod');
  line(markerX, y, markerX, y + h);
  fill(currentG < 0 ? 'seagreen' : 'firebrick');
  noStroke();
  circle(markerX, markerY, 16);
}

function drawInfoBox(hVal, sVal, tVal, gVal, x, y) {
  stroke('lightgray');
  fill('white');
  rect(x, y, 170, 118, 10);
  fill('darkslategray');
  textSize(13);
  drawSafeText(`ΔH = ${hVal} kJ/mol`, x + 12, y + 12, LEFT, TOP);
  drawSafeText(`TΔS = ${(tVal * sVal / 1000).toFixed(1)} kJ/mol`, x + 12, y + 34, LEFT, TOP);
  drawSafeText(`ΔG = ${gVal.toFixed(1)} kJ/mol`, x + 12, y + 56, LEFT, TOP);
  drawSafeText(`Spontaneous: ${gVal < 0 ? 'Yes' : 'No'}`, x + 12, y + 78, LEFT, TOP);
}

function drawQuadrantLegend(x, y, width) {
  const legendWidth = min(360, width);
  const legendHeight = 110;
  stroke('lightgray');
  fill('white');
  rect(x, y, legendWidth, legendHeight, 10);

  const signH = Math.sign(hSlider.value());
  const signS = Math.sign(sSlider.value());
  const combos = [
    { h: -1, s: 1, text: 'ΔH < 0, ΔS > 0 → Always spontaneous' },
    { h: 1, s: -1, text: 'ΔH > 0, ΔS < 0 → Never spontaneous' },
    { h: -1, s: -1, text: 'ΔH < 0, ΔS < 0 → Spontaneous at low T' },
    { h: 1, s: 1, text: 'ΔH > 0, ΔS > 0 → Spontaneous at high T' }
  ];

  combos.forEach((entry, index) => {
    const highlight = entry.h === signH && entry.s === signS;
    if (highlight) {
      fill('lightgoldenrodyellow');
      noStroke();
      rect(x + 8, y + 12 + index * 22, legendWidth - 16, 20, 6);
    }
    fill('darkslategray');
    textSize(13);
    drawSafeText(entry.text, x + 16, y + 16 + index * 22, LEFT, TOP);
  });
}

function drawCrossoverGuidance(hVal, sVal, graphX, graphY, graphWidth, graphHeight) {
  fill('white');
  stroke('plum');
  const cardX = graphX + 16;
  const cardY = graphY - 58;
  rect(cardX, cardY, 260, 46, 10);
  fill('indigo');
  textSize(13);

  if (sVal === 0) {
    drawSafeText('ΔS = 0 → ΔG shifts only with ΔH', cardX + 12, cardY + 10, LEFT, TOP);
    drawSafeText('No crossover temperature.', cardX + 12, cardY + 26, LEFT, TOP);
    return;
  }

  const crossoverTemp = (hVal * 1000) / sVal;
  const withinWindow = crossoverTemp >= 0 && crossoverTemp <= tempMax;

  drawSafeText(`ΔG = 0 at T = ${crossoverTemp.toFixed(0)} K`, cardX + 12, cardY + 10, LEFT, TOP);
  const favor = determineFavorability(hVal, sVal);
  drawSafeText(favor, cardX + 12, cardY + 26, LEFT, TOP);

  if (!withinWindow) {
    return;
  }
  const crossoverX = map(crossoverTemp, 0, tempMax, graphX, graphX + graphWidth);
  stroke('orchid');
  drawingContext.save();
  drawingContext.setLineDash([6, 4]);
  line(crossoverX, graphY, crossoverX, graphY + graphHeight);
  drawingContext.restore();
  fill('orchid');
  textSize(12);
  drawSafeText('ΔG = 0', crossoverX + 6, graphY + 8, LEFT, TOP);
}

function determineFavorability(hVal, sVal) {
  if (hVal < 0 && sVal > 0) return 'Always spontaneous (ΔH<0, ΔS>0).';
  if (hVal > 0 && sVal < 0) return 'Never spontaneous (ΔH>0, ΔS<0).';
  if (hVal < 0 && sVal < 0) return 'Spontaneous below this T.';
  if (hVal > 0 && sVal > 0) return 'Spontaneous above this T.';
  return 'Mixed case — evaluate ΔG directly.';
}

function drawFooter() {
  const available = canvasWidth - (margin * 2 + currentControlColumnWidth);
  if (available >= 240) {
    const cardWidth = Math.min(360, available - 12);
    const cardX = canvasWidth - margin - cardWidth;
    const cardY = drawHeight + 18;
    const cardHeight = 150;
  stroke('lightgray');
  fill('white');
    rect(cardX, cardY, cardWidth, cardHeight, 10);
  fill('darkslategray');
    textSize(14);
    drawSafeText('How to explore', cardX + 14, cardY + 12, LEFT, TOP);
    const steps = [
      'Set ΔH for intercept and ΔS for slope.',
      'Drag the temperature marker to read ΔG.',
      'Toggle crossover info to see ΔG = 0.',
      'Use presets to compare real processes.'
    ];
    textSize(12);
    steps.forEach((step, idx) => {
      drawSafeText(`${idx + 1}. ${step}`, cardX + 14, cardY + 38 + idx * 20, LEFT, TOP);
    });
  } else {
  fill('darkslategray');
    textSize(15);
    drawSafeText('ΔG = ΔH − TΔS — match sign quadrants or use crossover highlights to justify spontaneity.', canvasWidth / 2, drawHeight + controlHeight - 24, CENTER, CENTER);
  }
}

function computeDeltaG(hVal, sVal, temp) {
  return hVal - temp * (sVal / 1000);
}

function setPreset(preset) {
  hSlider.value(preset.h);
  sSlider.value(preset.s);
  handleControlChange();
}

function drawSafeText(content, x, y, alignX, alignY) {
  if (alignX) {
    textAlign(alignX, alignY || BASELINE);
  }
  noStroke();
  text(content, x, y);
}
