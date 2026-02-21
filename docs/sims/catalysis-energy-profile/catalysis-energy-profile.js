/*
  Catalyzed vs. Uncatalyzed Energy Profile MicroSim
  Step 2.5 planning:
  - Control inventory:
      1. Slider: catalyst strength (0-1)
      2. Toggle: exothermic vs endothermic (radio buttons)
      3. Checkbox: show intermediate (two-peak catalyzed path)
      4. Radio buttons: animation path selection
  - Layout calculations:
      drawHeight = 480 (diagram + title)
      controlHeight = 180 (control rows)
      canvasHeight = 660 (iframe height 662px)
      energy diagram spans most of draw area with margins
*/

let canvasWidth = 800;
let drawHeight = 480;
let controlHeight = 180;
let canvasHeight = drawHeight + controlHeight;
let margin = 40;
const titleText = 'Catalyzed vs. Uncatalyzed Energy Profile';

let catalystSlider;
let thermoRadio;
let intermediateCheckbox;
let pathRadio;
let controlRows = [];

let reactantEnergy = 200;
let productEnergy = 120;
let uncatalyzedPeak = 430;
let baseCatalyzedPeak = 320;
let animationProgress = 0;
let animatePath = 'uncat';

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
  catalystSlider.input(() => animationProgress = 0);
  styleSlider(catalystSlider);

  thermoRadio = createRadio();
  thermoRadio.option('Exothermic', 'exo');
  thermoRadio.option('Endothermic', 'endo');
  thermoRadio.value('exo');
  thermoRadio.parent(controlRows[1].row);
  thermoRadio.changed(updateThermo);

  intermediateCheckbox = createCheckbox('Show Intermediate', false);
  intermediateCheckbox.parent(controlRows[2].row);
  intermediateCheckbox.changed(() => animationProgress = 0);

  pathRadio = createRadio();
  pathRadio.option('Animate Uncatalyzed', 'uncat');
  pathRadio.option('Animate Catalyzed', 'cat');
  pathRadio.value('uncat');
  pathRadio.parent(controlRows[3].row);
  pathRadio.changed(() => {
    animatePath = pathRadio.value();
    animationProgress = 0;
  });
}
*** End Patch
