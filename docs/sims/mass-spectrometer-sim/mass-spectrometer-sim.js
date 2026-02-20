// Mass Spectrometer MicroSim (p5.js)
// AP Chemistry — Chapter 2
// Learning targets:
//   - Analyze a mass spectrum to determine isotopic composition
//   - Predict how isotopic abundance affects average atomic mass

// Canvas metrics
let canvasWidth = 820;
let drawHeight = 410;
const controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;

// Layout helpers (computed in updateCanvasSize)
let leftPanelWidth = 460;
let rightPanelWidth = 360;
let panelGap = 10;

// UI
let elementSelect;
let playButton;
let isPlaying = false;
let parentEl;

// Visualization state
let currentElement;
let selectedIsotopeIndex = 0;
let ions = [];
const MAX_IONS = 28;
let barHitboxes = [];

// Element + isotope data
const ELEMENTS = [
  {
    id: 'chlorine',
    name: 'Chlorine',
    symbol: 'Cl',
    color: '#ffb347',
    isotopes: [
      { label: '35Cl', mass: 34.96885, abundance: 75.77, color: '#f94144' },
      { label: '37Cl', mass: 36.96590, abundance: 24.23, color: '#577590' }
    ]
  },
  {
    id: 'neon',
    name: 'Neon',
    symbol: 'Ne',
    color: '#6cafff',
    isotopes: [
      { label: '20Ne', mass: 19.99244, abundance: 90.48, color: '#06d6a0' },
      { label: '21Ne', mass: 20.99385, abundance: 0.27, color: '#ffd166' },
      { label: '22Ne', mass: 21.99138, abundance: 9.25, color: '#118ab2' }
    ]
  },
  {
    id: 'carbon',
    name: 'Carbon',
    symbol: 'C',
    color: '#f4a259',
    isotopes: [
      { label: '12C', mass: 12.00000, abundance: 98.93, color: '#90be6d' },
      { label: '13C', mass: 13.00335, abundance: 1.07, color: '#577590' }
    ]
  },
  {
    id: 'magnesium',
    name: 'Magnesium',
    symbol: 'Mg',
    color: '#f6bd60',
    isotopes: [
      { label: '24Mg', mass: 23.98504, abundance: 78.99, color: '#ff6b6b' },
      { label: '25Mg', mass: 24.98584, abundance: 10.00, color: '#4ecdc4' },
      { label: '26Mg', mass: 25.98259, abundance: 11.01, color: '#1a759f' }
    ]
  }
];

// Ion entity that marches through the spectrometer diagram
class Ion {
  constructor(iso) {
    this.isotope = iso;
    this.reset(true);
  }

  reset(randomizeProgress = false) {
    this.progress = randomizeProgress ? random() : 0;
    this.speed = random(0.18, 0.26); // controls rate of travel through the instrument
  }

  update() {
    if (!isPlaying) return;
    this.progress += (deltaTime / 1000) * this.speed * 0.6;
    if (this.progress > 1) {
      this.progress = 0;
    }
  }

  draw() {
    const pos = getIonPosition(this.progress, this.isotope);
    noStroke();
    fill(this.isotope.color);
    circle(pos.x, pos.y, 10);
  }
}

function setup() {
  parentEl = document.querySelector('main');
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(parentEl);

  elementSelect = createSelect();
  ELEMENTS.forEach(el => elementSelect.option(`${el.name} (${el.symbol})`, el.id));
  elementSelect.position(20, drawHeight + 15);
  elementSelect.changed(() => {
    const id = elementSelect.value();
    currentElement = ELEMENTS.find(el => el.id === id);
    selectedIsotopeIndex = 0;
    rebuildIonStream();
  });

  playButton = createButton('Play Animation');
  playButton.position(260, drawHeight + 12);
  playButton.mousePressed(() => {
    isPlaying = !isPlaying;
    playButton.html(isPlaying ? 'Pause Animation' : 'Play Animation');
  });

  currentElement = ELEMENTS[0];
  elementSelect.value(currentElement.id);
  rebuildIonStream();

  describe('Interactive mass spectrometer visualization with animated ions and a live isotope bar chart.', LABEL);
}

function draw() {
  updateCanvasSize();
  background('aliceblue');

  drawSpectrometerPanel();
  drawSpectrumPanel();
  drawControlStrip();

  ions.forEach(ion => {
    ion.update();
    ion.draw();
  });
}

function updateCanvasSize() {
  const containerWidth = parentEl ? parentEl.clientWidth : windowWidth;
  const targetWidth = containerWidth || canvasWidth;
  if (abs(targetWidth - canvasWidth) > 2) {
    canvasWidth = targetWidth;
    leftPanelWidth = canvasWidth * 0.55;
    rightPanelWidth = canvasWidth - leftPanelWidth - panelGap;
    canvasHeight = drawHeight + controlHeight;
    resizeCanvas?.(canvasWidth, canvasHeight);
    elementSelect?.size(220, 28);
  }
}

function windowResized() {
  updateCanvasSize();
}

function drawSpectrometerPanel() {
  push();
  noStroke();
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  fill('#1a1a2e');
  rect(0, 0, leftPanelWidth, drawHeight);

  const margin = 28;
  const midY = drawHeight * 0.55;

  // Sample inlet
  fill('#121529');
  rect(margin, midY - 25, 45, 50, 6);
  fill(255);
  textSize(13);
  textAlign(CENTER, CENTER);
  text('Sample', margin + 22, midY);

  // Ionization chamber
  fill('#1f2848');
  rect(margin + 70, midY - 45, 90, 90, 12);
  stroke('#ffd369');
  strokeWeight(2);
  line(margin + 88, midY - 20, margin + 120, midY + 20);
  line(margin + 120, midY - 20, margin + 150, midY + 15);
  noStroke();
  fill('#ffd369');
  textSize(14);
  text('Ionization', margin + 115, midY - 55);

  // Acceleration plates
  stroke('#80ffdb');
  strokeWeight(4);
  line(margin + 190, midY - 40, margin + 190, midY + 40);
  line(margin + 230, midY - 40, margin + 230, midY + 40);
  noFill();
  strokeWeight(1);
  stroke(255);
  textAlign(CENTER);
  text('Acceleration Plates', margin + 210, midY - 55);

  // Magnetic field region
  const magnetX = leftPanelWidth - 210;
  noStroke();
  fill('#142850');
  rect(magnetX, midY - 120, 140, 240, 16);
  fill('#5bc0be');
  textAlign(CENTER);
  text('Magnetic Field', magnetX + 70, midY - 135);

  pop();
}

function drawSpectrumPanel() {
  const startX = leftPanelWidth + panelGap;
  push();
  noStroke();
  fill('#0f172a');
  rect(startX, 0, rightPanelWidth, drawHeight);

  const chartMargin = 30;
  const chart = {
    x: startX + chartMargin,
    y: 60,
    w: rightPanelWidth - chartMargin * 2,
    h: drawHeight - 120
  };

  // Title
  fill(255);
  textAlign(LEFT, TOP);
  textSize(20);
  text(`${currentElement.name} Isotopes`, chart.x, 20);
  textSize(13);
  fill('#9fb3c8');
  text('Relative Abundance vs m/z', chart.x, 40);

  // Axes
  stroke('#d9d9d9');
  strokeWeight(1);
  line(chart.x, chart.y, chart.x, chart.y + chart.h);
  line(chart.x, chart.y + chart.h, chart.x + chart.w, chart.y + chart.h);
  noStroke();
  textAlign(CENTER);
  for (let pct = 0; pct <= 100; pct += 20) {
    const y = map(pct, 0, 100, chart.y + chart.h, chart.y);
    stroke('#2d3b52');
    line(chart.x, y, chart.x + chart.w, y);
    noStroke();
    fill('#9fb3c8');
    textSize(11);
    text(pct, chart.x - 18, y + 3);
  }
  textAlign(CENTER);
  text('m/z', chart.x + chart.w / 2, chart.y + chart.h + 28);
  push();
  translate(chart.x - 32, chart.y + chart.h / 2);
  rotate(-HALF_PI);
  text('Relative Abundance (%)', 0, 0);
  pop();

  // Bars
  const isoCount = currentElement.isotopes.length;
  const barWidth = chart.w / (isoCount * 1.5);
  barHitboxes = [];
  currentElement.isotopes.forEach((iso, idx) => {
    const x = chart.x + (idx + 1) * (barWidth * 1.5) - barWidth;
    const barHeight = map(iso.abundance, 0, 100, 0, chart.h);
    const y = chart.y + chart.h - barHeight;

    const isSelected = idx === selectedIsotopeIndex;
    fill(iso.color);
    if (isSelected) {
      stroke('#ffffff');
      strokeWeight(2);
    } else {
      noStroke();
    }
    rect(x, y, barWidth, barHeight, 6);
    noStroke();
    fill('#e2e8f0');
    textSize(13);
    textAlign(CENTER, TOP);
    text(iso.label, x + barWidth / 2, chart.y + chart.h + 6);

    barHitboxes.push({ x, y, w: barWidth, h: barHeight, index: idx });
  });

  drawSpectrumTooltip(chart);
  pop();
}

function drawSpectrumTooltip(chart) {
  const iso = currentElement.isotopes[selectedIsotopeIndex];
  const boxX = chart.x;
  const boxY = chart.y - 50;
  const boxW = chart.w;
  const boxH = 52;
  fill('#1f2937');
  rect(boxX, boxY, boxW, boxH, 6);
  fill('#f9fafb');
  textAlign(LEFT, TOP);
  textSize(14);
  const line1 = `${iso.label} • mass ${iso.mass.toFixed(3)} amu`;
  const line2 = `${iso.abundance.toFixed(2)}% abundance`;
  text(line1, boxX + 12, boxY + 10);
  text(line2, boxX + 12, boxY + 28);
}

function drawControlStrip() {
  noStroke();
  fill('#ffffff');
  rect(0, drawHeight, canvasWidth, controlHeight);
  stroke('#cbd5f5');
  line(0, drawHeight, canvasWidth, drawHeight);

  fill('#0f172a');
  textSize(14);
  textAlign(LEFT, CENTER);
  text('Select an element to update the ion animation and the mass spectrum display.', 20, drawHeight + controlHeight - 12);
}

function getIonPosition(progress, isotope) {
  const margin = 28;
  const midY = drawHeight * 0.55;
  const sample = createVector(margin + 20, midY);
  const ionization = createVector(margin + 110, midY - 10);
  const acceleration = createVector(margin + 240, midY - 10);
  const magnetEntry = createVector(leftPanelWidth - 210, midY - 30);
  const detectorX = leftPanelWidth - 30;

  const isotopes = currentElement.isotopes;
  const masses = isotopes.map(iso => iso.mass);
  const minMass = min(...masses);
  const maxMass = max(...masses);
  const massRatio = map(isotope.mass, minMass, maxMass, 0, 1);
  const detectorY = map(massRatio, 0, 1, midY - 90, midY + 70);

  const segments = [
    { start: sample, end: ionization, length: 0.18 },
    { start: ionization, end: acceleration, length: 0.22 },
    { start: acceleration, end: magnetEntry, length: 0.18 },
    { start: magnetEntry, end: createVector(detectorX, detectorY), length: 0.42, deflect: true }
  ];

  let remaining = progress;
  for (const seg of segments) {
    if (remaining <= seg.length) {
      const t = constrain(remaining / seg.length, 0, 1);
      if (seg.deflect) {
        const ctrl = createVector(
          magnetEntry.x + 80,
          lerp(magnetEntry.y - 120, magnetEntry.y + 120, massRatio)
        );
        return quadraticPoint(seg.start, ctrl, seg.end, smoothStep(t));
      }
      return p5.Vector.lerp(seg.start, seg.end, smoothStep(t));
    }
    remaining -= seg.length;
  }
  return createVector(detectorX, detectorY);
}

function quadraticPoint(p0, p1, p2, t) {
  const x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
  const y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
  return createVector(x, y);
}

function smoothStep(t) {
  return t * t * (3 - 2 * t);
}

function rebuildIonStream() {
  ions = [];
  for (let i = 0; i < MAX_IONS; i++) {
    ions.push(new Ion(pickIsotope(currentElement)));
    ions[i].reset(true);
  }
}

function pickIsotope(element) {
  const total = element.isotopes.reduce((sum, iso) => sum + iso.abundance, 0);
  const target = random(total);
  let accum = 0;
  for (const iso of element.isotopes) {
    accum += iso.abundance;
    if (target <= accum) return iso;
  }
  return element.isotopes[element.isotopes.length - 1];
}

function mousePressed() {
  for (const hit of barHitboxes) {
    if (
      mouseX >= hit.x &&
      mouseX <= hit.x + hit.w &&
      mouseY >= hit.y &&
      mouseY <= hit.y + hit.h
    ) {
      selectedIsotopeIndex = hit.index;
      return;
    }
  }
}
