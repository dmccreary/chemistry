// Precision vs Accuracy Target Diagram MicroSim
// Demonstrates the difference between precision and accuracy in measurements

// Canvas dimensions
let canvasWidth = 600;
let drawHeight = 620;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Target configuration
let targetRadius = 90;  // 10% smaller to give more room for labels
let targetCenterX, targetCenterY;
let ringCount = 5;

// Dart positions for each target (will be generated)
let targets = [];
let dartsPerTarget = 6;

// Colors for each target type
let colors = {
    accurate_precise: '#22AA22',      // Green
    accurate_imprecise: '#2266DD',    // Blue
    inaccurate_precise: '#DD8800',    // Orange
    inaccurate_imprecise: '#DD2222'   // Red
};

// Button
let regenerateButton;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Generate initial dart positions
    generateAllDarts();

    // Create regenerate button
    regenerateButton = createButton('Regenerate Darts');
    regenerateButton.position(20, drawHeight + 12);
    regenerateButton.mousePressed(generateAllDarts);

    describe('Four targets showing precision vs accuracy: accurate and precise (green), accurate but imprecise (blue), precise but inaccurate (orange), neither (red)', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area background
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Draw title
    fill('black');
    textSize(22);
    textAlign(CENTER, TOP);
    noStroke();
    text('Precision vs. Accuracy in Measurements', canvasWidth/2, 10);

    // Draw axis labels
    textSize(20);
    fill('black');

    // PRECISION label (horizontal, bottom)
    textAlign(CENTER, TOP);
    text('PRECISION →', canvasWidth/2, drawHeight - 25);
    text('Low', canvasWidth/4, drawHeight - 25);
    text('High', 3*canvasWidth/4, drawHeight - 25);

    // ACCURACY label (vertical, left side)
    push();
    translate(35, drawHeight/2 - 20);
    rotate(-PI/2);
    textAlign(CENTER, BOTTOM);
    text('ACCURACY →', 0, 0);
    pop();

    push();
    translate(35, drawHeight/4 + 30);
    rotate(-PI/2);
    textAlign(CENTER, BOTTOM);
    text('High', 0, 0);
    pop();

    push();
    translate(35, 3*drawHeight/4 - 30);
    rotate(-PI/2);
    textAlign(CENTER, BOTTOM);
    text('Low', 0, 0);
    pop();

    // Calculate target centers
    let leftX = canvasWidth * 0.28;
    let rightX = canvasWidth * 0.72;
    let topY = 175;
    let bottomY = 445;

    // Draw all four targets (left=low precision, right=high precision, top=high accuracy, bottom=low accuracy)
    drawTarget(leftX, topY, 'Accurate but Imprecise', colors.accurate_imprecise, targets[1], 'Measurements average to true value\nbut widely spread');
    drawTarget(rightX, topY, 'Accurate & Precise', colors.accurate_precise, targets[0], 'Measurements close to true value\nand tightly grouped');
    drawTarget(leftX, bottomY, 'Neither Accurate nor Precise', colors.inaccurate_imprecise, targets[3], 'Measurements scattered\nand offset from true value');
    drawTarget(rightX, bottomY, 'Precise but Inaccurate', colors.inaccurate_precise, targets[2], 'Measurements tightly grouped\nbut offset (systematic error)');

    // Draw legend
    drawLegend();

    // Draw "True Value" label on Accurate & Precise target
    fill('black');
    textSize(10);
    textAlign(CENTER, CENTER);
    text('True Value', rightX, topY);
}

function drawTarget(cx, cy, label, dotColor, darts, caption) {
    // Draw concentric rings
    noFill();
    strokeWeight(1);

    for (let i = ringCount; i >= 1; i--) {
        let radius = (targetRadius / ringCount) * i;
        if (i === ringCount) {
            fill('#FFFFFF');
        } else if (i === 1) {
            fill('#FFDD44');  // Yellow bullseye
        } else {
            fill(255 - (ringCount - i) * 35);  // Gradient gray
        }
        stroke('#888888');
        ellipse(cx, cy, radius * 2, radius * 2);
    }

    // Draw darts
    fill(dotColor);
    noStroke();
    for (let dart of darts) {
        ellipse(cx + dart.x, cy + dart.y, 12, 12);
    }

    // Draw label above target
    fill('black');
    textSize(13);
    textAlign(CENTER, BOTTOM);
    textStyle(BOLD);
    text(label, cx, cy - targetRadius - 8);
    textStyle(NORMAL);

    // Draw caption below target
    textSize(10);
    textAlign(CENTER, TOP);
    fill('#555555');
    let lines = caption.split('\n');
    for (let i = 0; i < lines.length; i++) {
        text(lines[i], cx, cy + targetRadius + 8 + i * 12);
    }
}

function drawLegend() {
    let legendX = 150;
    let legendY = drawHeight + 10;

    fill('black');
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);

    // Accuracy definition
    text('Accuracy: How close to TRUE VALUE', legendX, legendY + 10);

    // Precision definition
    text('Precision: How close to EACH OTHER', legendX + 280, legendY + 10);
}

function generateAllDarts() {
    targets = [];

    // Target 1: Accurate and Precise - tight cluster at center
    targets.push(generateDarts(0, 0, 15));

    // Target 2: Accurate but Imprecise - scattered around center
    targets.push(generateDarts(0, 0, 60));

    // Target 3: Precise but Inaccurate - tight cluster offset from center
    targets.push(generateDarts(45, -35, 12));

    // Target 4: Neither - scattered and offset
    targets.push(generateScatteredDarts());
}

function generateDarts(offsetX, offsetY, spread) {
    let darts = [];
    for (let i = 0; i < dartsPerTarget; i++) {
        darts.push({
            x: offsetX + randomGaussian(0, spread/3),
            y: offsetY + randomGaussian(0, spread/3)
        });
    }
    return darts;
}

function generateScatteredDarts() {
    let darts = [];
    for (let i = 0; i < dartsPerTarget; i++) {
        let angle = random(TWO_PI);
        let radius = random(20, targetRadius - 20);
        darts.push({
            x: cos(angle) * radius,
            y: sin(angle) * radius
        });
    }
    return darts;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    if (regenerateButton) {
        regenerateButton.position(15, drawHeight + 12);
    }
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
    }
}
