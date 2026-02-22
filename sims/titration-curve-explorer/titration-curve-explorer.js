/*
  Titration Curve Comparison Explorer
  - drawHeight = 600 px (title, summary column, plot, indicator panel)
  - controlHeight = 340 px (radio group + four slider rows below canvas)
  - Canvas drawing background: aliceblue; control background: white
*/

let canvasWidth = 960;
const drawHeight = 600;
const controlHeight = 340;
let canvasHeight = drawHeight + controlHeight;
const margin = 28;
const summaryWidth = 220;
const plotHeight = 360;
const indicatorHeight = 100;
const sliderLeftMargin = 240;
const controlRowSpacing = 70;
const KW = 1e-14;

const titrationTypes = [
  {
    id: 'strong-strong',
    label: 'Strong acid + Strong base',
    requiresPka: false,
    analyteKind: 'strong-acid',
    steepRange: [3.5, 10.5],
    description: 'Steep jump spans most indicators.'
  },
  {
    id: 'weak-acid-strong-base',
    label: 'Weak acid + Strong base',
    requiresPka: true,
    analyteKind: 'weak-acid',
    steepRange: [7.0, 10.5],
    description: 'Equivalence above pH 7; buffer region present.'
  },
  {
    id: 'strong-acid-weak-base',
    label: 'Strong acid + Weak base',
    requiresPka: true,
    analyteKind: 'weak-base',
    steepRange: [3.0, 6.5],
    description: 'Equivalence below pH 7; mirror-image buffer.'
  }
];

const indicators = [
  { name: 'Methyl orange', low: 3.1, high: 4.4, color: '#ef6c00' },
  { name: 'Methyl red', low: 4.4, high: 6.2, color: '#d81b60' },
  { name: 'Bromothymol blue', low: 6.0, high: 7.6, color: '#2196f3' },
  { name: 'Phenolphthalein', low: 8.2, high: 10.0, color: '#8e24aa' }
];

let selectedType = titrationTypes[0];
let analyteConc = 0.100;
let titrantConc = 0.100;
let analyteVolume = 25; // mL
let weakPka = 4.75;

let typeRadio;
let caSlider;
let cbSlider;
let vaSlider;
let pkaSlider;

let controlRows = [];
let typeValueSpan;
let caValueSpan;
let cbValueSpan;
let vaValueSpan;
let pkaValueSpan;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const main = document.querySelector('main');
  if (main) {
    canvas.parent(main);
  }
  textFont('Arial, Helvetica, sans-serif');
  createControls();
  updateControlDisplays();
  describe('Explore titration curves with annotations for equivalence, buffer regions, and indicator choices.');
}

function draw() {
  updateCanvasSize();
  background('aliceblue');
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  noStroke();

  drawTitle();
  const data = computeCurveData();
  drawSummaryPanel(data);
  drawPlot(data);
  drawIndicatorPanel(data);
  positionControls();
}

function drawTitle() {
  drawText('Titration Curve Comparison Explorer', canvasWidth / 2, 18, CENTER, TOP, 30, '#000000');
}

function drawSummaryPanel(data) {
  const x = margin;
  const y = 70;
  const width = summaryWidth;
  const height = plotHeight + 60;
  stroke('#d3d7df');
  fill('white');
  rect(x, y, width, height, 14);
  let cursorY = y + 16;
  drawText(selectedType.label, x + 14, cursorY, LEFT, TOP, 17, '#0c4f74');
  cursorY += 30;
  drawText(selectedType.description, x + 14, cursorY, LEFT, TOP, 13, '#455a64');
  cursorY += 42;
  drawText(`Initial pH: ${data.initialPh.toFixed(2)}`, x + 14, cursorY);
  cursorY += 22;
  drawText(`Equivalence: ${data.equivalence.volume.toFixed(2)} mL`, x + 14, cursorY);
  cursorY += 20;
  drawText(`pH at equivalence: ${data.equivalence.pH.toFixed(2)}`, x + 14, cursorY);
  cursorY += 24;
  if (data.showHalf) {
    drawText(`Half-equivalence: ${data.half.volume.toFixed(2)} mL`, x + 14, cursorY);
    cursorY += 20;
    drawText(`pH = pKa = ${data.half.pH.toFixed(2)}`, x + 14, cursorY);
    cursorY += 24;
  }
  drawText(`Steep jump: pH ${data.steepRange[0].toFixed(1)}-${data.steepRange[1].toFixed(1)}`, x + 14, cursorY);
  cursorY += 24;
  drawText(`Buffer region: ${data.bufferLabel}`, x + 14, cursorY, LEFT, TOP, 13, '#5d4037');
}

function drawPlot(data) {
  const plotX = margin + summaryWidth + 20;
  const plotY = 60;
  const plotWidth = canvasWidth - plotX - margin;

  // Background
  stroke('#cfd8dc');
  fill('white');
  rect(plotX, plotY, plotWidth, plotHeight, 16);

  // Axes
  stroke('#90a4ae');
  line(plotX + 40, plotY + plotHeight - 40, plotX + plotWidth - 20, plotY + plotHeight - 40);
  line(plotX + 60, plotY + 20, plotX + 60, plotY + plotHeight - 40);

  const chartX = plotX + 60;
  const chartY = plotY + 20;
  const chartWidth = plotWidth - 90;
  const chartHeight = plotHeight - 80;

  // Buffer region shading
  if (data.bufferRange) {
    const bufferStart = map(data.bufferRange[0], 0, data.maxVolume, chartX, chartX + chartWidth);
    const bufferEnd = map(data.bufferRange[1], 0, data.maxVolume, chartX, chartX + chartWidth);
    noStroke();
    fill('rgba(100,181,246,0.25)');
    rect(bufferStart, chartY, bufferEnd - bufferStart, chartHeight);
    drawText('Buffer region', bufferStart + 4, chartY + 8, LEFT, TOP, 12, '#1565c0');
  }

  // Steep jump band
  const steepMinY = map(constrain(data.steepRange[1], 0, 14), 0, 14, chartY + chartHeight, chartY);
  const steepMaxY = map(constrain(data.steepRange[0], 0, 14), 0, 14, chartY + chartHeight, chartY);
  noStroke();
  fill('rgba(255,202,40,0.3)');
  rect(chartX, steepMinY, chartWidth, steepMaxY - steepMinY);

  // Curve
  noFill();
  stroke('#1e88e5');
  strokeWeight(2);
  beginShape();
  data.points.forEach(function (pt) {
    const px = map(pt.volume, 0, data.maxVolume, chartX, chartX + chartWidth);
    const py = map(constrain(pt.pH, 0, 14), 0, 14, chartY + chartHeight, chartY);
    vertex(px, py);
  });
  endShape();

  // Vertical dashed line at equivalence
  const eqX = map(data.equivalence.volume, 0, data.maxVolume, chartX, chartX + chartWidth);
  stroke('#8d6e63');
  strokeWeight(1.5);
  drawingContext.setLineDash([6, 6]);
  line(eqX, chartY, eqX, chartY + chartHeight);
  drawingContext.setLineDash([]);
  drawText('Equivalence', eqX, chartY - 8, CENTER, BOTTOM, 12, '#5d4037');

  // Initial pH point
  drawPointAnnotation(chartX, map(data.initialPh, 0, 14, chartY + chartHeight, chartY), `Initial pH ${data.initialPh.toFixed(2)}`, '#00838f', chartY);

  // Equivalence annotation
  drawPointAnnotation(eqX, map(data.equivalence.pH, 0, 14, chartY + chartHeight, chartY), `Eq pH ${data.equivalence.pH.toFixed(2)}`, '#bf360c', chartY);

  // Half equivalence
  if (data.showHalf) {
    const halfX = map(data.half.volume, 0, data.maxVolume, chartX, chartX + chartWidth);
    const halfY = map(data.half.pH, 0, 14, chartY + chartHeight, chartY);
    drawPointAnnotation(halfX, halfY, `1/2-equiv pH ${data.half.pH.toFixed(2)}`, '#6a1b9a', chartY);
  }

  // Axis labels
  drawText('Volume of titrant added (mL)', chartX + chartWidth / 2, chartY + chartHeight + 32, CENTER, TOP, 14, '#37474f');
  push();
  translate(chartX - 46, chartY + chartHeight / 2);
  rotate(-HALF_PI);
  drawText('pH', 0, 0, CENTER, CENTER, 14, '#37474f');
  pop();
}

function drawIndicatorPanel(data) {
  const panelX = margin + summaryWidth + 20;
  const panelY = drawHeight - indicatorHeight - 20;
  const panelWidth = canvasWidth - panelX - margin;
  stroke('#d3d7df');
  fill('white');
  rect(panelX, panelY, panelWidth, indicatorHeight, 14);
  drawText('Indicator transition ranges', panelX + 12, panelY + 10, LEFT, TOP, 16, '#0c4f74');

  const bandMin = data.steepRange[0];
  const bandMax = data.steepRange[1];
  const barWidth = (panelWidth - 40) / indicators.length;
  indicators.forEach(function (indicator, index) {
    const barX = panelX + 20 + index * barWidth;
    const overlap = indicator.high >= bandMin && indicator.low <= bandMax;
    const barColor = overlap ? indicator.color : '#cfd8dc';
    fill(barColor);
    stroke('#90a4ae');
    rect(barX, panelY + 40, barWidth - 16, 20, 6);
    drawText(`${indicator.low.toFixed(1)}-${indicator.high.toFixed(1)}`, barX + (barWidth - 16) / 2, panelY + 66, CENTER, TOP, 12, '#37474f');
    drawText(indicator.name + (overlap ? ' (OK)' : ' (No)'), barX + (barWidth - 16) / 2, panelY + 84, CENTER, TOP, 12, overlap ? '#1b5e20' : '#b71c1c');
  });
}

function drawPointAnnotation(x, y, label, colorHex, chartTop) {
  const size = 10;
  stroke(colorHex);
  fill(colorHex);
  circle(x, y, size);
  drawText(label, x + 8, y - 12, LEFT, BOTTOM, 12, colorHex);
}

function createControls() {
  const typeRow = createControlRow('Titration type');
  typeValueSpan = typeRow.value;
  typeRadio = createRadio();
  typeRadio.parent(typeRow.slot);
  titrationTypes.forEach(function (option) {
    typeRadio.option(option.label, option.id);
  });
  typeRadio.selected(selectedType.id);
  typeRadio.changed(function () {
    const chosenId = typeRadio.value();
    selectedType = titrationTypes.find(function (opt) { return opt.id === chosenId; }) || titrationTypes[0];
    if (!selectedType.requiresPka) {
      weakPka = 4.75;
    }
    adjustPkaSlider();
    updateControlDisplays();
  });

  const caRow = createSliderRow('Analyte concentration (M)', 0.01, 0.20, analyteConc, 0.005, function (value) {
    analyteConc = value;
  });
  caSlider = caRow.slider;
  caValueSpan = caRow.valueSpan;

  const cbRow = createSliderRow('Titrant concentration (M)', 0.01, 0.20, titrantConc, 0.005, function (value) {
    titrantConc = value;
  });
  cbSlider = cbRow.slider;
  cbValueSpan = cbRow.valueSpan;

  const vaRow = createSliderRow('Analyte volume (mL)', 10, 50, analyteVolume, 1, function (value) {
    analyteVolume = value;
  });
  vaSlider = vaRow.slider;
  vaValueSpan = vaRow.valueSpan;

  const pkaRow = createSliderRow('pKa (weak only)', 3.0, 11.0, weakPka, 0.1, function (value) {
    weakPka = value;
  });
  pkaSlider = pkaRow.slider;
  pkaValueSpan = pkaRow.valueSpan;

  updateSliderWidths();
  adjustPkaSlider();
}

function createControlRow(labelText) {
  const row = createDiv();
  row.style('display', 'inline-block');
  row.style('background', 'white');
  row.style('padding', '8px 12px');
  row.style('border-radius', '10px');
  row.style('box-shadow', '0 1px 4px rgba(0,0,0,0.15)');
  row.style('font-family', 'Arial, Helvetica, sans-serif');
  row.style('font-size', '14px');

  const labelSpan = createSpan(labelText + ': ');
  labelSpan.parent(row);
  labelSpan.style('display', 'inline-block');
  labelSpan.style('width', '150px');
  labelSpan.style('font-weight', '600');

  const valueSpan = createSpan('');
  valueSpan.parent(row);
  valueSpan.style('display', 'inline-block');
  valueSpan.style('width', '90px');
  valueSpan.style('font-weight', '600');
  valueSpan.style('color', '#0c4f74');

  const slot = createDiv();
  slot.parent(row);
  slot.style('display', 'inline-block');
  slot.style('width', '260px');
  slot.style('margin-left', '12px');

  controlRows.push({ row: row, value: valueSpan, slot: slot });
  return { row: row, value: valueSpan, slot: slot };
}

function createSliderRow(labelText, min, max, initial, step, callback) {
  const row = createControlRow(labelText);
  const slider = createSlider(min, max, initial, step);
  slider.parent(row.slot);
  slider.style('width', '260px');
  slider.input(function () {
    callback(parseFloat(slider.value()));
    updateControlDisplays();
  });
  return { slider: slider, valueSpan: row.value };
}

function positionControls() {
  const canvasEl = document.querySelector('main canvas');
  if (!canvasEl) {
    return;
  }
  const rect = canvasEl.getBoundingClientRect();
  const baseX = rect.left + window.scrollX + margin;
  const baseY = rect.top + window.scrollY + drawHeight + 30;
  controlRows.forEach(function (record, index) {
    record.row.position(baseX, baseY + index * controlRowSpacing);
  });
}

function updateControlDisplays() {
  if (typeValueSpan) {
    typeValueSpan.html(selectedType.label);
  }
  if (caValueSpan) {
    caValueSpan.html(analyteConc.toFixed(3) + ' M');
  }
  if (cbValueSpan) {
    cbValueSpan.html(titrantConc.toFixed(3) + ' M');
  }
  if (vaValueSpan) {
    vaValueSpan.html(analyteVolume.toFixed(0) + ' mL');
  }
  if (pkaValueSpan) {
    pkaValueSpan.html(weakPka.toFixed(2));
  }
  if (pkaSlider) {
    pkaSlider.elt.parentElement.parentElement.style.display = selectedType.requiresPka ? 'inline-block' : 'none';
  }
}

function adjustPkaSlider() {
  if (pkaSlider) {
    pkaSlider.value(weakPka);
  }
}

function updateSliderWidths() {
  const sliderWidth = Math.max(canvasWidth - sliderLeftMargin - margin * 2, 200);
  [caSlider, cbSlider, vaSlider, pkaSlider].forEach(function (slider) {
    if (slider) {
      slider.size(sliderWidth);
    }
  });
  controlRows.forEach(function (record) {
    if (record.slot) {
      record.slot.style('width', sliderWidth + 'px');
    }
  });
}

function computeCurveData() {
  const molesAnalyte = analyteConc * (analyteVolume / 1000);
  const equivalenceVolume = (molesAnalyte / titrantConc) * 1000;
  const maxVolume = equivalenceVolume * 1.5;
  const points = [];
  const step = maxVolume / 200;
  let initialPh = getPhAtVolume(0, selectedType);
  for (let vol = 0; vol <= maxVolume + 0.001; vol += step) {
    const ph = getPhAtVolume(vol, selectedType);
    if (vol === 0) {
      initialPh = ph;
    }
    points.push({ volume: vol, pH: ph });
  }
  const eqPh = getPhAtVolume(equivalenceVolume, selectedType);
  const showHalf = selectedType.analyteKind !== 'strong-acid' && selectedType.analyteKind !== 'strong-base';
  const halfVolume = equivalenceVolume / 2;
  const halfPh = showHalf ? getHalfPh(selectedType) : null;
  let bufferRange = null;
  let bufferLabel = 'Not present';
  if (selectedType.analyteKind === 'weak-acid') {
    bufferRange = [Math.max(0.05 * equivalenceVolume, 0), equivalenceVolume];
    bufferLabel = '0 to equivalence volume';
  } else if (selectedType.analyteKind === 'weak-base') {
    bufferRange = [0, equivalenceVolume];
    bufferLabel = '0 to equivalence volume (acidic buffer)';
  }
  return {
    points: points,
    maxVolume: maxVolume,
    initialPh: clampPh(initialPh),
    equivalence: { volume: equivalenceVolume, pH: clampPh(eqPh) },
    half: { volume: halfVolume, pH: showHalf ? clampPh(halfPh) : null },
    showHalf: showHalf,
    bufferRange: bufferRange,
    bufferLabel: bufferLabel,
    steepRange: selectedType.steepRange
  };
}

function getPhAtVolume(volume, type) {
  const Ca = analyteConc;
  const Cb = titrantConc;
  const VaL = analyteVolume / 1000;
  const VbL = volume / 1000;
  const totalVolume = VaL + VbL;
  const molesAnalyte = Ca * VaL;
  const molesTitrant = Cb * VbL;
  if (type.id === 'strong-strong') {
    if (molesTitrant < molesAnalyte) {
      const h = (molesAnalyte - molesTitrant) / totalVolume;
      return negLog10(h);
    } else if (molesTitrant > molesAnalyte) {
      const oh = (molesTitrant - molesAnalyte) / totalVolume;
      return 14 - negLog10(oh);
    }
    return 7.00;
  }
  if (type.id === 'weak-acid-strong-base') {
    const Ka = Math.pow(10, -weakPka);
    if (volume === 0) {
      return solveWeakAcidPH(Ca, Ka);
    }
    if (molesTitrant < molesAnalyte && molesTitrant > 0) {
      const molesHa = molesAnalyte - molesTitrant;
      const molesA = molesTitrant;
      const ratio = molesA / molesHa;
      if (ratio > 0) {
        return weakPka + log10Safe(ratio);
      }
      return solveWeakAcidPH(Ca, Ka);
    }
    if (Math.abs(molesTitrant - molesAnalyte) < 1e-9) {
      const concA = molesAnalyte / totalVolume;
      const Kb = KW / Ka;
      const oh = solveWeakBaseOH(concA, Kb);
      return 14 - negLog10(oh);
    }
    if (molesTitrant > molesAnalyte) {
      const oh = (molesTitrant - molesAnalyte) / totalVolume;
      return 14 - negLog10(oh);
    }
    return solveWeakAcidPH(Ca, Ka);
  }
  if (type.id === 'strong-acid-weak-base') {
    const KaConjugate = Math.pow(10, -weakPka);
    const Kb = KW / KaConjugate;
    const molesBase = molesAnalyte;
    const molesAcidAdded = molesTitrant;
    if (volume === 0) {
      return 14 - solveWeakBasePOH(Ca, Kb);
    }
    if (molesAcidAdded < molesBase && molesAcidAdded > 0) {
      const molesB = molesBase - molesAcidAdded;
      const molesBH = molesAcidAdded;
      const ratio = molesB / molesBH;
      if (ratio > 0) {
        const pH = weakPka + log10Safe(ratio);
        return clampPh(pH);
      }
    }
    if (Math.abs(molesAcidAdded - molesBase) < 1e-9) {
      const concBH = molesBase / totalVolume;
      const h = solveWeakAcidH(concBH, KaConjugate);
      return negLog10(h);
    }
    if (molesAcidAdded > molesBase) {
      const h = (molesAcidAdded - molesBase) / totalVolume;
      return negLog10(h);
    }
    return 14 - solveWeakBasePOH(Ca, Kb);
  }
  return 7;
}

function getHalfPh(type) {
  if (type.id === 'weak-acid-strong-base') {
    return weakPka;
  }
  if (type.id === 'strong-acid-weak-base') {
    return weakPka;
  }
  return 7;
}

function solveWeakAcidPH(concentration, Ka) {
  const h = solveWeakAcidH(concentration, Ka);
  return negLog10(h);
}

function solveWeakAcidH(concentration, Ka) {
  const a = 1;
  const b = Ka;
  const c = -Ka * concentration;
  return (-b + Math.sqrt(Math.max(b * b - 4 * a * c, 0))) / (2 * a);
}

function solveWeakBasePOH(concentration, Kb) {
  const oh = solveWeakBaseOH(concentration, Kb);
  return negLog10(oh);
}

function solveWeakBaseOH(concentration, Kb) {
  const a = 1;
  const b = Kb;
  const c = -Kb * concentration;
  return (-b + Math.sqrt(Math.max(b * b - 4 * a * c, 0))) / (2 * a);
}

function clampPh(value) {
  if (!Number.isFinite(value)) {
    return 7;
  }
  return constrain(value, 0, 14);
}

function log10Safe(value) {
  if (value <= 0) {
    return Math.log(1e-8) / Math.log(10);
  }
  return Math.log(value) / Math.log(10);
}

function negLog10(value) {
  if (value <= 0) {
    return 14;
  }
  return -Math.log(value) / Math.log(10);
}

function drawText(content, x, y, alignX = LEFT, alignY = TOP, size = 14, colorValue = '#37474f') {
  noStroke();
  fill(colorValue);
  textAlign(alignX, alignY);
  textSize(size);
  text(content, x, y);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateSliderWidths();
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
  canvasHeight = drawHeight + controlHeight;
}
