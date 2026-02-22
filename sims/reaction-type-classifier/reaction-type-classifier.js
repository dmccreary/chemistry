/*
  Reaction Type Classifier MicroSim
  Step 2.5 Layout Planning:
  - Control inventory:
      1. Five reaction-type buttons (row 1)
      2. Show Hint checkbox (row 2)
      3. Next Equation button (row 2)
  - Layout calculations:
      drawHeight = 460 (extra room for centered title)
      number of control rows = 2
      controlHeight = (2 x 35) + 10 = 80 (rounded to 100 for spacing)
      canvasHeight = drawHeight + controlHeight = 560
      iframeHeight = canvasHeight + 2 = 562px
      buttonRowY = drawHeight + 10
      checkboxY = drawHeight + 55
      nextButtonY = drawHeight + 50
  - Control positions:
      Type buttons: evenly spaced from margin to width - margin (height 32)
      Show Hint checkbox: position(10, checkboxY)
      Next Equation button: position(canvasWidth - 160, nextButtonY)
  - Label positions:
      text('Classify the reaction:', 10, drawHeight + 5)
      text('Hint & navigation:', 10, drawHeight + 45)
*/

let canvasWidth = 800;
let drawHeight = 460;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
const titleText = 'Reaction Type Classifier';
const reactionTypes = ['Synthesis', 'Decomposition', 'Single Replacement', 'Double Replacement', 'Combustion'];

const reactionPool = [
  {
    equation: '2H\u2082(g) + O\u2082(g) \u2192 2H\u2082O(l)',
    type: 'Synthesis',
    hint: 'Multiple reactants combine to form one product.',
    explanation: 'Two elements combine into one compound, the hallmark of synthesis.'
  },
  {
    equation: '2KClO\u2083(s) \u2192 2KCl(s) + 3O\u2082(g)',
    type: 'Decomposition',
    hint: 'One reactant breaks into multiple products.',
    explanation: 'A single compound splits apart, indicating decomposition.'
  },
  {
    equation: 'Zn(s) + CuSO\u2084(aq) \u2192 ZnSO\u2084(aq) + Cu(s)',
    type: 'Single Replacement',
    hint: 'An element swaps places with another in a compound.',
    explanation: 'Zinc replaces copper in a compound, so it is single replacement.'
  },
  {
    equation: 'AgNO\u2083(aq) + NaCl(aq) \u2192 AgCl(s) + NaNO\u2083(aq)',
    type: 'Double Replacement',
    hint: 'Two ionic compounds exchange partners.',
    explanation: 'Cations and anions swap partners, which is double replacement.'
  },
  {
    equation: 'C\u2083H\u2088(l) + 5O\u2082(g) \u2192 3CO\u2082(g) + 4H\u2082O(g)',
    type: 'Combustion',
    hint: 'Hydrocarbon reacts with O\u2082 to form CO\u2082 and H\u2082O.',
    explanation: 'Hydrocarbon plus oxygen produces CO2 and H2O, typical combustion.'
  },
  {
    equation: '2Na(s) + Cl\u2082(g) \u2192 2NaCl(s)',
    type: 'Synthesis',
    hint: 'Two elements combine.',
    explanation: 'Two elements form one ionic compound, a synthesis reaction.'
  },
  {
    equation: 'CaCO\u2083(s) \u2192 CaO(s) + CO\u2082(g)',
    type: 'Decomposition',
    hint: 'Single reactant forming two products.',
    explanation: 'A carbonate decomposes when heated, classic decomposition.'
  },
  {
    equation: '2Al(s) + Fe\u2082O\u2083(s) \u2192 Al\u2082O\u2083(s) + 2Fe(l)',
    type: 'Single Replacement',
    hint: 'Metal element replaces another metal ion.',
    explanation: 'Aluminum replaces iron in iron(III) oxide, so it is single replacement.'
  },
  {
    equation: 'H\u2082SO\u2084(aq) + 2NaOH(aq) \u2192 Na\u2082SO\u2084(aq) + 2H\u2082O(l)',
    type: 'Double Replacement',
    hint: 'Acid-base neutralization is a double replacement.',
    explanation: 'H+ and OH- combine while the ions swap partners.'
  },
  {
    equation: 'C\u2086H\u2086(l) + \u2071\u2085/\u2082 O\u2082(g) \u2192 6CO\u2082(g) + 3H\u2082O(g)',
    type: 'Combustion',
    hint: 'Hydrocarbon + O2 yields CO2 and H2O.',
    explanation: 'Benzene burning in oxygen is a combustion reaction.'
  },
  {
    equation: 'Fe(s) + CuCl\u2082(aq) \u2192 FeCl\u2082(aq) + Cu(s)',
    type: 'Single Replacement',
    hint: 'One element displaces another in a compound.',
    explanation: 'Iron replaces copper, signaling single replacement.'
  },
  {
    equation: 'BaCl\u2082(aq) + Na\u2082SO\u2084(aq) \u2192 BaSO\u2084(s) + 2NaCl(aq)',
    type: 'Double Replacement',
    hint: 'Two aqueous reactants swap ions.',
    explanation: 'Ions swap partners and form a precipitate, a double replacement reaction.'
  },
  {
    equation: '2HgO(s) \u2192 2Hg(l) + O\u2082(g)',
    type: 'Decomposition',
    hint: 'One compound splits into simpler substances.',
    explanation: 'Mercury(II) oxide splits apart when heated, so decomposition.'
  },
  {
    equation: '2NO(g) + O\u2082(g) \u2192 2NO\u2082(g)',
    type: 'Synthesis',
    hint: 'Two gases combine to make one product gas.',
    explanation: 'Two molecules form one product, a synthesis reaction.'
  },
  {
    equation: 'CH\u2084(g) + 2O\u2082(g) \u2192 CO\u2082(g) + 2H\u2082O(g)',
    type: 'Combustion',
    hint: 'Hydrocarbon burning in oxygen.',
    explanation: 'Methane burning is the archetypal combustion reaction.'
  }
];

let typeButtons = [];
let showHintCheckbox;
let nextButton;
let currentReaction;
let feedbackText = '';
let feedbackColor = '#333333';
let showHint = false;
let awaitingNext = false;
let score = 0;
let attempts = 0;
let celebrationParticles = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');
  createControls();
  pickNewReaction();
  describe('Classify displayed chemical equations into reaction types with immediate feedback and scoring.', 'Reaction Type Classifier');
}

function draw() {
  updateCanvasSize();
  background('white');
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawTitle();
  drawEquationPanel();
  drawButtonArea();
  drawFeedbackPanel();
  drawControlLabels();
  drawCelebration();
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  layoutControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
  canvasHeight = drawHeight + controlHeight;
}

function createControls() {
  for (let i = 0; i < reactionTypes.length; i += 1) {
    const btn = createButton(reactionTypes[i]);
    btn.mousePressed(() => handleSelection(reactionTypes[i]));
    btn.addClass('reaction-button');
    typeButtons.push(btn);
  }

  showHintCheckbox = createCheckbox('Show Hint', false);
  showHintCheckbox.changed(() => {
    showHint = showHintCheckbox.checked();
  });

  nextButton = createButton('Next Equation');
  nextButton.mousePressed(() => {
    awaitingNext = false;
    feedbackText = '';
    feedbackColor = '#333333';
    showHintCheckbox.checked(false);
    showHint = false;
    pickNewReaction();
    nextButton.attribute('disabled', 'true');
  });
  nextButton.attribute('disabled', 'true');

  layoutControls();
}

function layoutControls() {
  const buttonWidth = (canvasWidth - margin * 2 - 40) / reactionTypes.length;
  for (let i = 0; i < typeButtons.length; i += 1) {
    const x = margin + i * (buttonWidth + 10);
    typeButtons[i].size(buttonWidth, 32);
    typeButtons[i].position(x, drawHeight + 10);
  }

  showHintCheckbox.position(10, drawHeight + 55);
  nextButton.position(canvasWidth - 170, drawHeight + 50);
}

function pickNewReaction() {
  const index = floor(random(reactionPool.length));
  currentReaction = reactionPool[index];
}

function handleSelection(choice) {
  attempts += 1;
  if (awaitingNext) {
    return;
  }
  if (choice === currentReaction.type) {
    score += 1;
    feedbackText = 'Correct! ' + currentReaction.explanation;
    feedbackColor = '#2E7D32';
    awaitingNext = true;
    nextButton.removeAttribute('disabled');
    triggerCelebration();
  } else {
    feedbackText = 'Try again — look at reactant/product structure.';
    feedbackColor = '#C62828';
  }
}

function drawTitle() {
  fill('#111111');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(26);
  text(titleText, canvasWidth / 2, 10);
}

function drawEquationPanel() {
  const panelTop = 60;
  const panelHeight = drawHeight * 0.3;
  fill('#e8f0fe');
  stroke('#90caf9');
  rect(margin, panelTop, canvasWidth - margin * 2, panelHeight, 12);
  noStroke();
  fill('#1a237e');
  textAlign(CENTER, CENTER);
  textSize(22);
  text(currentReaction.equation, canvasWidth / 2, panelTop + panelHeight / 2 - 10);

  fill('#555555');
  textSize(16);
  textAlign(RIGHT, TOP);
  text(score + ' / ' + attempts + ' correct', canvasWidth - margin, panelTop - 30);

  if (showHint) {
    const hintBoxHeight = 50;
    const hintY = panelTop + panelHeight - hintBoxHeight - 10;
    fill(255, 255, 255, 235);
    stroke('#90caf9');
    rect(margin + 10, hintY, canvasWidth - (margin + 10) * 2, hintBoxHeight, 8);
    noStroke();
    fill('#0d47a1');
    textAlign(CENTER, CENTER);
    textSize(16);
    text('Hint: ' + currentReaction.hint, canvasWidth / 2, hintY + hintBoxHeight / 2);
  }
}

function drawButtonArea() {
  const labelY = drawHeight * 0.4 + 8;
  noStroke();
  fill('#37474f');
  textAlign(CENTER, TOP);
  textSize(18);
  text('Select the reaction type', canvasWidth / 2, labelY);
}

function drawFeedbackPanel() {
  const bottomTop = drawHeight * 0.7;
  const bottomHeight = drawHeight * 0.28;
  stroke('#cfd8dc');
  fill('#ffffff');
  rect(margin, bottomTop, canvasWidth - margin * 2, bottomHeight, 10);
  noStroke();
  fill(feedbackColor);
  textAlign(CENTER, CENTER);
  textSize(18);
  text(feedbackText || 'Classify the reaction to see feedback here.', canvasWidth / 2, bottomTop + bottomHeight / 2);
}

function drawControlLabels() {
  fill('#111111');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(16);
  text('Classify the reaction:', 10, drawHeight + 5);
  text('Hint & navigation:', 10, drawHeight + 45);
}

function triggerCelebration() {
  celebrationParticles = [];
  const count = 60;
  for (let i = 0; i < count; i += 1) {
    celebrationParticles.push({
      x: canvasWidth / 2,
      y: drawHeight * 0.6,
      vx: random(-3.5, 3.5),
      vy: random(-5, -2),
      size: random(8, 16),
      life: 90,
      color: color(random(180, 255), random(80, 200), random(120, 255))
    });
  }
}

function drawCelebration() {
  for (let i = celebrationParticles.length - 1; i >= 0; i -= 1) {
    const p = celebrationParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.08;
    p.life -= 1;
    push();
    translate(p.x, p.y);
    noStroke();
    fill(p.color);
    drawStar(p.size);
    pop();
    if (p.life <= 0) {
      celebrationParticles.splice(i, 1);
    }
  }
}

function drawStar(size) {
  beginShape();
  for (let i = 0; i < 5; i += 1) {
    const angle = (TWO_PI / 5) * i - HALF_PI;
    vertex(cos(angle) * size, sin(angle) * size);
    const innerAngle = angle + TWO_PI / 10;
    vertex(cos(innerAngle) * (size / 2), sin(innerAngle) * (size / 2));
  }
  endShape(CLOSE);
}
