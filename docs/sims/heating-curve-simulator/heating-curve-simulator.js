/*
  Heating Curve Simulator MicroSim
  Pre-generation layout planning (Step 2.5 requirement):
  - Control inventory:
      1. Start/Pause button - toggles animation (row 1, left)
      2. Select dropdown - "Select substance" (row 1, right)
      3. Slider - "Heating rate" 1x-5x (row 2, right)
      4. Checkbox - "Show energy breakdown pie chart" (row 3, right)
  - Layout calculations:
      drawHeight = 420
      number of control rows = 3
      controlHeight = (3 x 35) + 10 = 115 (rounded up to 120 for spacing)
      canvasHeight = drawHeight + controlHeight = 540
      iframeHeight target = canvasHeight + 2 = 542px
      margin = 25
      sliderLeftMargin = 230 to leave room for the button/labels on the left
  - Control positions:
      Start/Pause button: position(10, drawHeight + 8)
      Select: position(sliderLeftMargin, drawHeight + 5)
      Slider: position(sliderLeftMargin, drawHeight + 40)
      Checkbox: position(sliderLeftMargin, drawHeight + 75)
  - Label positions:
      text('Select substance:', sliderLeftMargin - 150, drawHeight + 15)
      text('Heating rate:', sliderLeftMargin - 150, drawHeight + 50)
      text('Energy breakdown:', sliderLeftMargin - 150, drawHeight + 85)
*/

let canvasWidth = 800;
let drawHeight = 420;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 230;
let defaultTextSize = 16;

let startPauseButton;
let substanceSelect;
let rateSlider;
let pieCheckbox;

const sampleMass = 100; // grams for calculations
let heatingRate = 1;
let showPieChart = false;
let animationProgress = 0;
let isRunning = false;

let currentSubstance;
let curveData;

const substances = [
  {
    id: 'water',
    label: 'Water',
    meltingPoint: 0,
    boilingPoint: 100,
    deltaHfus: 334,
    deltaHvap: 2260,
    cSolid: 2.09,
    cLiquid: 4.18,
    cGas: 2.01
  },
  {
    id: 'ethanol',
    label: 'Ethanol',
    meltingPoint: -114,
    boilingPoint: 78,
    deltaHfus: 109,
    deltaHvap: 841,
    cSolid: 2.46,
    cLiquid: 2.44,
    cGas: 1.42
  },
  {
    id: 'benzene',
    label: 'Benzene',
    meltingPoint: 5.5,
    boilingPoint: 80,
    deltaHfus: 127,
    deltaHvap: 394,
    cSolid: 1.74,
    cLiquid: 1.72,
    cGas: 1.04
  },
  {
    id: 'naphthalene',
    label: 'Naphthalene',
    meltingPoint: 80,
    boilingPoint: 218,
    deltaHfus: 151,
    deltaHvap: 316,
    cSolid: 1.30,
    cLiquid: 1.72,
    cGas: 1.02
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textFont('Arial');

  startPauseButton = createButton('Start Animation');
  startPauseButton.position(10, drawHeight + 8);
  startPauseButton.mousePressed(toggleSimulation);

  substanceSelect = createSelect();
  for (let i = 0; i < substances.length; i += 1) {
    substanceSelect.option(substances[i].label, substances[i].id);
  }
  substanceSelect.position(sliderLeftMargin, drawHeight + 5);
  substanceSelect.changed(function () {
    const id = substanceSelect.value();
    currentSubstance = getSubstanceById(id);
    curveData = computeCurveData(currentSubstance);
    resetAnimation();
  });

  rateSlider = createSlider(1, 5, 2, 0.1);
  rateSlider.position(sliderLeftMargin, drawHeight + 40);
  rateSlider.size(canvasWidth - sliderLeftMargin - margin);
  rateSlider.input(function () {
    heatingRate = rateSlider.value();
  });

  pieCheckbox = createCheckbox('Show energy breakdown pie chart', false);
  pieCheckbox.position(sliderLeftMargin, drawHeight + 75);
  pieCheckbox.changed(function () {
    showPieChart = pieCheckbox.checked();
  });

  currentSubstance = substances[0];
  curveData = computeCurveData(currentSubstance);
  heatingRate = rateSlider.value();

  describe('Interactive heating curve simulator with animated energy graph and thermodynamic data controls.', 'Heating Curve Simulator');
}

function draw() {
  updateCanvasSize();
  background('white');

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawPanels();
  drawControlLabels();

  if (isRunning) {
    animationProgress += 0.0015 * heatingRate;
  }
  animationProgress = constrain(animationProgress, 0, 1);

  drawHeatingCurve(animationProgress);
  drawInfoPanel();
  drawAnnotations();
}

function drawPanels() {
  const leftPanelWidth = canvasWidth * 0.65;
  noStroke();
  fill('#f5f5f5');
  rect(margin * 0.5, margin * 0.5, leftPanelWidth - margin, drawHeight - margin);
  fill('white');
  rect(leftPanelWidth + (margin * 0.25), margin * 0.5, canvasWidth - leftPanelWidth - (margin * 0.75), drawHeight - margin);
}

function drawHeatingCurve(progress) {
  if (!curveData) {
    return;
  }

  const leftPanelWidth = canvasWidth * 0.65;
  const graphLeft = margin;
  const graphRight = leftPanelWidth - margin;
  const graphTop = margin;
  const graphBottom = drawHeight - margin;
  const graphHeight = graphBottom - graphTop;

  stroke('#d0d0d0');
  fill('#f5f5f5');
  rect(graphLeft, graphTop, graphRight - graphLeft, graphHeight);

  // axes
  stroke('#333333');
  strokeWeight(2);
  line(graphLeft, graphBottom, graphRight, graphBottom);
  line(graphLeft, graphBottom, graphLeft, graphTop);

  noStroke();
  fill('#333333');
  textSize(14);
  textAlign(CENTER, CENTER);
  text('Heat Added (kJ)', (graphLeft + graphRight) / 2, graphBottom + 30);
  push();
  translate(graphLeft - 35, (graphTop + graphBottom) / 2);
  rotate(-HALF_PI);
  text('Temperature (deg C)', 0, 0);
  pop();

  drawGridlines(graphLeft, graphTop, graphRight, graphBottom);

  const totalEnergy = curveData.totalEnergy;
  const drawnEnergy = totalEnergy * progress;

  strokeWeight(3);
  noFill();

  const segments = curveData.segments;
  let currentPoint = null;

  for (let i = 0; i < segments.length; i += 1) {
    const segment = segments[i];
    const energySpan = segment.endEnergy - segment.startEnergy;
    const segStart = segment.startEnergy;
    const segEnd = min(segment.endEnergy, drawnEnergy);
    if (segEnd <= segStart) {
      continue;
    }

    const fraction = (segEnd - segment.startEnergy) / energySpan;
    const startX = map(segment.startEnergy, 0, totalEnergy, graphLeft, graphRight);
    const endX = map(segEnd, 0, totalEnergy, graphLeft, graphRight);
    const startTemp = getSegmentTempAtEnergy(segment, segment.startEnergy);
    const endTemp = getSegmentTempAtEnergy(segment, segEnd);
    const startY = map(startTemp, curveData.yMin, curveData.yMax, graphBottom, graphTop);
    const endY = map(endTemp, curveData.yMin, curveData.yMax, graphBottom, graphTop);

    stroke(segment.color);
    line(startX, startY, endX, endY);

    currentPoint = {
      x: endX,
      y: endY,
      energy: segEnd
    };

    if (fraction < 1) {
      break;
    }
  }

  if (currentPoint) {
    fill('white');
    stroke('#333333');
    strokeWeight(1.5);
    circle(currentPoint.x, currentPoint.y, 10);
    fill('#333333');
    noStroke();
    circle(currentPoint.x, currentPoint.y, 4);
    drawTooltip(graphLeft, graphTop, graphRight, graphBottom, drawnEnergy, currentPoint);
  }
}

function drawGridlines(left, top, right, bottom) {
  stroke('#e0e0e0');
  strokeWeight(1);
  const yRange = curveData.yMax - curveData.yMin;
  const xRange = curveData.totalEnergy;
  for (let i = 1; i < 5; i += 1) {
    const y = lerp(top, bottom, i / 5);
    line(left, y, right, y);
  }
  for (let j = 1; j < 5; j += 1) {
    const x = lerp(left, right, j / 5);
    line(x, top, x, bottom);
  }

  fill('#555555');
  noStroke();
  textSize(12);
  textAlign(RIGHT, CENTER);
  for (let k = 0; k <= 5; k += 1) {
    const temp = lerp(curveData.yMax, curveData.yMin, k / 5);
    const y = map(temp, curveData.yMin, curveData.yMax, bottom, top);
    text(nf(temp, 0, 0) + ' deg C', left - 5, y);
  }

  textAlign(CENTER, TOP);
  for (let m = 0; m <= 5; m += 1) {
    const energy = lerp(0, xRange, m / 5);
    const x = map(energy, 0, xRange, left, right);
    text(nf(energy, 0, 1) + ' kJ', x, bottom + 8);
  }
}

function drawTooltip(graphLeft, graphTop, graphRight, graphBottom, drawnEnergy, currentPoint) {
  if (!curveData) {
    return;
  }
  if (mouseX < graphLeft || mouseX > graphRight || mouseY < graphTop || mouseY > graphBottom) {
    return;
  }

  const hoverEnergy = map(mouseX, graphLeft, graphRight, 0, curveData.totalEnergy);
  if (hoverEnergy > drawnEnergy) {
    return;
  }

  const state = getStateAtEnergy(hoverEnergy);
  const tooltipWidth = 200;
  const tooltipHeight = 70;
  let tooltipX = mouseX + 15;
  let tooltipY = mouseY - tooltipHeight - 10;
  if (tooltipX + tooltipWidth > graphRight) {
    tooltipX = mouseX - tooltipWidth - 15;
  }
  if (tooltipY < graphTop) {
    tooltipY = mouseY + 15;
  }

  fill(255, 255, 255, 240);
  stroke('#333333');
  rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 8);
  noStroke();
  fill('#111111');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Temp: ' + nf(state.temperature, 0, 1) + ' deg C', tooltipX + 10, tooltipY + 8);
  text('Phase: ' + state.phase, tooltipX + 10, tooltipY + 28);
  text('Heat: ' + nf(state.energy, 0, 1) + ' kJ', tooltipX + 10, tooltipY + 48);
}

function drawInfoPanel() {
  const leftPanelWidth = canvasWidth * 0.65;
  const panelX = leftPanelWidth + margin * 0.5;
  const panelWidth = canvasWidth - panelX - margin * 0.5;
  const panelTop = margin;
  const panelBottom = drawHeight - margin;

  fill('#333333');
  textSize(20);
  textAlign(LEFT, TOP);
  text(currentSubstance.label + ' heating curve', panelX + 10, panelTop + 5);

  textSize(14);
  const lineHeight = 20;
  const startY = panelTop + 40;
  const props = [
    'Melting point: ' + nf(currentSubstance.meltingPoint, 0, 1) + ' deg C',
    'Boiling point: ' + nf(currentSubstance.boilingPoint, 0, 1) + ' deg C',
    'Delta H_fus: ' + nf(currentSubstance.deltaHfus, 0, 0) + ' J/g',
    'Delta H_vap: ' + nf(currentSubstance.deltaHvap, 0, 0) + ' J/g',
    'c_solid: ' + currentSubstance.cSolid + ' J/(g*C)',
    'c_liquid: ' + currentSubstance.cLiquid + ' J/(g*C)',
    'c_gas: ' + currentSubstance.cGas + ' J/(g*C)'
  ];
  for (let i = 0; i < props.length; i += 1) {
    text(props[i], panelX + 10, startY + i * lineHeight);
  }

  const state = getStateAtEnergy(curveData.totalEnergy * animationProgress);
  const statusY = startY + props.length * lineHeight + 10;
  textSize(15);
  text('Current phase: ' + state.phase, panelX + 10, statusY);
  text('Temperature: ' + nf(state.temperature, 0, 1) + ' deg C', panelX + 10, statusY + 20);
  text('Heat added: ' + nf(state.energy, 0, 1) + ' kJ', panelX + 10, statusY + 40);

  if (showPieChart) {
    drawPieChart(panelX + panelWidth / 2, panelBottom - 90, 120);
  }
}

function drawPieChart(centerX, centerY, diameter) {
  const energies = [];
  let total = 0;
  for (let i = 0; i < curveData.segments.length; i += 1) {
    const segment = curveData.segments[i];
    const value = segment.endEnergy - segment.startEnergy;
    energies.push({
      label: segment.label,
      value: value,
      color: segment.color
    });
    total += value;
  }

  let startAngle = -HALF_PI;
  stroke('#333333');
  strokeWeight(1);
  for (let j = 0; j < energies.length; j += 1) {
    const portion = energies[j].value / total;
    const endAngle = startAngle + TWO_PI * portion;
    fill(energies[j].color);
    arc(centerX, centerY, diameter, diameter, startAngle, endAngle, PIE);
    startAngle = endAngle;
  }

  fill('#111111');
  noStroke();
  textAlign(CENTER, TOP);
  text('Energy use by segment', centerX, centerY + diameter / 2 + 10);
}

function drawAnnotations() {
  const leftPanelWidth = canvasWidth * 0.65;
  const graphLeft = margin;
  const graphRight = leftPanelWidth - margin;
  const graphTop = margin;
  const graphBottom = drawHeight - margin;

  textSize(13);
  textAlign(CENTER, BOTTOM);
  fill('#222222');
  noStroke();

  for (let i = 0; i < curveData.segments.length; i += 1) {
    const segment = curveData.segments[i];
    const midEnergy = (segment.startEnergy + segment.endEnergy) / 2;
    const x = map(midEnergy, 0, curveData.totalEnergy, graphLeft, graphRight);
    const midTemp = (segment.startTemp + segment.endTemp) / 2;
    const y = map(midTemp, curveData.yMin, curveData.yMax, graphBottom, graphTop) - 8;
    text(segment.label, x, y);
  }
}

function drawControlLabels() {
  fill('#111111');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  const labelX = sliderLeftMargin - 150;
  text('Select substance:', labelX, drawHeight + 15);
  text('Heating rate: ' + nf(heatingRate, 0, 1) + 'x', labelX, drawHeight + 50);
  text('Energy breakdown:', labelX, drawHeight + 85);
}

function getSubstanceById(id) {
  for (let i = 0; i < substances.length; i += 1) {
    if (substances[i].id === id) {
      return substances[i];
    }
  }
  return substances[0];
}

function computeCurveData(substance) {
  const startTemp = substance.meltingPoint - 30;
  const yMin = startTemp - 30;
  const endTemp = substance.boilingPoint + 50;
  const yMax = endTemp;

  const qSolid = energyJToKJ(sampleMass * substance.cSolid * (substance.meltingPoint - startTemp));
  const qFus = energyJToKJ(sampleMass * substance.deltaHfus);
  const qLiquid = energyJToKJ(sampleMass * substance.cLiquid * (substance.boilingPoint - substance.meltingPoint));
  const qVap = energyJToKJ(sampleMass * substance.deltaHvap);
  const qGas = energyJToKJ(sampleMass * substance.cGas * (endTemp - substance.boilingPoint));

  const segments = [
    createSegment('Solid heating', startTemp, substance.meltingPoint, qSolid, color('#4682B4'), 'Solid Heating'),
    createSegment('Melting (Delta H_fus)', substance.meltingPoint, substance.meltingPoint, qFus, color('#FF8C00'), 'Melting Plateau'),
    createSegment('Liquid heating', substance.meltingPoint, substance.boilingPoint, qLiquid, color('#3CB371'), 'Liquid Heating'),
    createSegment('Boiling (Delta H_vap)', substance.boilingPoint, substance.boilingPoint, qVap, color('#FF8C00'), 'Boiling Plateau'),
    createSegment('Gas heating', substance.boilingPoint, endTemp, qGas, color('#FF6347'), 'Gas Heating')
  ];

  let cumulative = 0;
  for (let i = 0; i < segments.length; i += 1) {
    const segment = segments[i];
    segment.startEnergy = cumulative;
    cumulative += segment.energy;
    segment.endEnergy = cumulative;
  }

  return {
    segments: segments,
    totalEnergy: cumulative,
    yMin: yMin,
    yMax: yMax,
    startTemp: startTemp,
    endTemp: endTemp
  };
}

function createSegment(label, startTemp, endTemp, energy, segmentColor, phaseLabel) {
  return {
    label: label,
    startTemp: startTemp,
    endTemp: endTemp,
    energy: energy,
    color: segmentColor,
    phaseLabel: phaseLabel,
    startEnergy: 0,
    endEnergy: energy
  };
}

function energyJToKJ(value) {
  return value / 1000;
}

function getSegmentTempAtEnergy(segment, energyValue) {
  const span = segment.endEnergy - segment.startEnergy;
  if (span === 0) {
    return segment.startTemp;
  }
  const ratio = (energyValue - segment.startEnergy) / span;
  return segment.startTemp + ratio * (segment.endTemp - segment.startTemp);
}

function getStateAtEnergy(energyValue) {
  const totalEnergy = curveData.totalEnergy;
  const clamped = constrain(energyValue, 0, totalEnergy);
  for (let i = 0; i < curveData.segments.length; i += 1) {
    const segment = curveData.segments[i];
    if (clamped >= segment.startEnergy && clamped <= segment.endEnergy) {
      const span = segment.endEnergy - segment.startEnergy;
      let temperature = segment.startTemp;
      if (span > 0) {
        const ratio = (clamped - segment.startEnergy) / span;
        temperature = segment.startTemp + ratio * (segment.endTemp - segment.startTemp);
      }
      return {
        phase: segment.phaseLabel,
        temperature: temperature,
        energy: clamped
      };
    }
  }
  const lastSegment = curveData.segments[curveData.segments.length - 1];
  return {
    phase: lastSegment.phaseLabel,
    temperature: lastSegment.endTemp,
    energy: totalEnergy
  };
}

function resetAnimation() {
  animationProgress = 0;
  isRunning = false;
  startPauseButton.html('Start Animation');
}

function toggleSimulation() {
  isRunning = !isRunning;
  startPauseButton.html(isRunning ? 'Pause Animation' : 'Start Animation');
}

function mousePressed() {
  const leftPanelWidth = canvasWidth * 0.65;
  const graphLeft = margin;
  const graphRight = leftPanelWidth - margin;
  const graphTop = margin;
  const graphBottom = drawHeight - margin;
  if (mouseX >= graphLeft && mouseX <= graphRight && mouseY >= graphTop && mouseY <= graphBottom) {
    resetAnimation();
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  rateSlider.size(canvasWidth - sliderLeftMargin - margin);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
  canvasHeight = drawHeight + controlHeight;
}
