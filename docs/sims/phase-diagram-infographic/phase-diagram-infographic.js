// Phase Diagram Infographic: Water and Carbon Dioxide Compared
// CANVAS_HEIGHT: 562
// AP Chemistry - Chapter 7: Phase Changes, Solutions, and Gas Laws (Section 3)
// Learning objective (Bloom: Understand): Students will locate and interpret the
// triple point, critical point, and phase regions on a phase diagram, and explain
// how the slope of water's solid-liquid boundary differs from most substances.
//
// The boundary curves are calculated, not sketched:
//   Water   liquid-gas   Wagner and Pruss saturation equation (IAPWS-95)
//           solid-gas    IAPWS 2011 sublimation pressure of ice Ih
//           solid-liquid IAPWS 2011 melting pressure of ice Ih (valid to 2058 atm)
//   CO2     all three    Span and Wagner (1996) auxiliary equations
// Checks against reference data (see index.md): water 611.657 Pa at 273.16 K and
// 101325 Pa at 373.124 K; CO2 0.51795 MPa at 216.592 K and 101325 Pa at 194.686 K.
// The pressure axis is logarithmic. On it the fusion curves look almost vertical,
// so a zoomed inset with a linear pressure axis shows which way each one leans.

// ---- Layout constants -------------------------------------------------------
let canvasWidth = 800;
let drawHeight = 512;
let controlHeight = 50;          // one row: view button and jump-to menu
let canvasHeight = drawHeight + controlHeight;
let margin = 10;
let defaultTextSize = 16;

const PLOT_TOP = 66;
const PLOT_BOTTOM = 330;
const ATM = 101325;              // Pa per atm

// ---- Substances -------------------------------------------------------------
// Temperatures in kelvin and pressures in pascal inside the equations.
const WATER = {
  key: 'water', name: 'Water', formula: 'H_{2}O',
  Tt: 273.16, Pt: 611.657, Tc: 647.096, Pc: 22.064e6,
  tMin: -100, tMax: 520, logPMin: -4, logPMax: 3.3,
  tTicks: [-100, 0, 100, 200, 300, 400, 500],
  meltLo: 251.165, meltHi: 273.16,          // range of the ice Ih melting curve
  leans: 'left',
  curveColor: 'navy',
  tripleText: '0.01 °C, 0.006 atm',
  criticalText: '374 °C, 218 atm',
  labels: {
    solid: [-50, 20], liquid: [150, 30], gas: [300, 0.25], scf: [447, 650],
    critical: 'left'
  },
  pvap: function (T) {
    const t = 1 - T / this.Tc;
    return this.Pc * Math.exp(this.Tc / T * (-7.85951783 * t + 1.84408259 * Math.pow(t, 1.5) -
      11.7866497 * Math.pow(t, 3) + 22.6807411 * Math.pow(t, 3.5) -
      15.9618719 * Math.pow(t, 4) + 1.80122502 * Math.pow(t, 7.5)));
  },
  psub: function (T) {
    const th = T / this.Tt;
    return this.Pt * Math.exp((-21.2144006 * Math.pow(th, 0.00333333333) +
      27.3203819 * Math.pow(th, 1.20666667) - 6.10598130 * Math.pow(th, 1.70333333)) / th);
  },
  pmelt: function (T) {
    const th = T / this.Tt;
    return this.Pt * (1 + 1195393.37 * (1 - Math.pow(th, 3)) +
      80818.3159 * (1 - Math.pow(th, 25.75)) + 3338.2686 * (1 - Math.pow(th, 103.75)));
  }
};

const CO2 = {
  key: 'co2', name: 'Carbon Dioxide', formula: 'CO_{2}',
  Tt: 216.592, Pt: 517950, Tc: 304.1282, Pc: 7.3773e6,
  tMin: -120, tMax: 100, logPMin: -3, logPMax: 3.3,
  tTicks: [-120, -80, -40, 0, 40, 80],
  meltLo: 216.592, meltHi: 262,             // 262 K is beyond the top of the axis
  leans: 'right',
  curveColor: 'navy',
  tripleText: '−56.6 °C, 5.11 atm',
  criticalText: '31.0 °C, 72.8 atm',
  labels: {
    solid: [-95, 60], liquid: [-12, 600], gas: [58, 5], scf: [66, 380],
    critical: 'right'
  },
  pvap: function (T) {
    const t = 1 - T / this.Tc;
    return this.Pc * Math.exp(this.Tc / T * (-7.0602087 * t + 1.9391218 * Math.pow(t, 1.5) -
      1.6463597 * Math.pow(t, 2) - 3.2995634 * Math.pow(t, 4)));
  },
  psub: function (T) {
    const th = 1 - T / this.Tt;
    return this.Pt * Math.exp(this.Tt / T * (-14.740846 * th + 2.4327015 * Math.pow(th, 1.9) -
      5.3061778 * Math.pow(th, 2.9)));
  },
  pmelt: function (T) {
    const x = T / this.Tt - 1;
    return this.Pt * (1 + 1955.5390 * x + 2055.4593 * x * x);
  }
};

const SUBSTANCES = [WATER, CO2];

const REGION_COLORS = {
  solid: 'lightblue',
  liquid: 'cornflowerblue',
  gas: 'gainsboro',
  scf: 'plum'
};

const PHASE_TEXT = {
  solid: 'Solid',
  liquid: 'Liquid',
  gas: 'Gas',
  scf: 'Supercritical fluid',
  sl: 'Solid and liquid coexist (melting point)',
  lg: 'Liquid and gas coexist (boiling point)',
  sg: 'Solid and gas coexist (sublimation point)',
  triple: 'Triple point: solid, liquid, and gas coexist',
  critical: 'Critical point: liquid and gas become one phase'
};

// Jump-to menu: temperature in Celsius, pressure in atm. snap = substance whose
// curve or special point the probe should land on exactly.
const PRESETS = [
  { label: 'Room conditions: 25 °C, 1 atm', T: 25, P: 1 },
  { label: 'Water boiling at 1 atm', sub: 'water', point: 'bp' },
  { label: 'Ice melting at 1 atm', sub: 'water', point: 'mp' },
  { label: 'Triple point of water', sub: 'water', point: 'triple' },
  { label: 'Critical point of water', sub: 'water', point: 'critical' },
  { label: 'Dry ice subliming at 1 atm', sub: 'co2', point: 'sp' },
  { label: 'Triple point of carbon dioxide', sub: 'co2', point: 'triple' },
  { label: 'Critical point of carbon dioxide', sub: 'co2', point: 'critical' },
  { label: 'Supercritical carbon dioxide: 40 °C, 100 atm', T: 40, P: 100 }
];

// ---- State ------------------------------------------------------------------
let overlayMode = false;
let probe = { T: 25, P: 1 };     // Celsius, atm
let viewButton, jumpSelect;
let plots = [];                  // rebuilt every frame

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  // Points on the 1 atm line, found from the curve equations
  WATER.mpT = meltTemperature(WATER, ATM);          // about 273.15 K
  WATER.bpT = vaporTemperature(WATER, ATM);         // about 373.12 K
  CO2.spT = sublimationTemperature(CO2, ATM);       // about 194.69 K
  // Ends of the fusion curves at 1000 atm, used by the zoom insets
  WATER.melt1000 = meltTemperature(WATER, 1000 * ATM);
  CO2.melt1000 = meltTemperature(CO2, 1000 * ATM);

  viewButton = createButton('Overlay Both Diagrams');
  viewButton.parent(mainElement);
  viewButton.mousePressed(toggleView);

  jumpSelect = createSelect();
  jumpSelect.parent(mainElement);
  jumpSelect.option('Choose a point...', -1);
  for (let i = 0; i < PRESETS.length; i++) {
    jumpSelect.option(PRESETS[i].label, i);
  }
  jumpSelect.selected(-1);
  jumpSelect.changed(jumpToPreset);
  jumpSelect.attribute('aria-label', 'Jump the probe to a point');

  positionControls();

  describe('Phase diagrams of water and carbon dioxide on pressure versus temperature axes, with solid, liquid, gas, and supercritical regions, the triple point, and the critical point marked. Click or drag on a diagram to move a probe; the phase of each substance at that temperature and pressure is reported below. A button overlays both diagrams on one set of axes.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing region (aliceblue) and control region (white)
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  textSize(canvasWidth < 560 ? 17 : 24);
  text('Phase Diagrams: Water and Carbon Dioxide', canvasWidth / 2, 10);

  buildPlots();
  for (let i = 0; i < plots.length; i++) {
    drawPlot(plots[i]);
  }
  drawLegends();
  drawReadout();
  drawControlLabels();
}

// ---- Inverse curve functions (bisection) --------------------------------------
function bisect(fn, target, lo, hi, increasing) {
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2;
    const v = fn(mid);
    if ((v < target) === increasing) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

function vaporTemperature(sub, P) {
  return bisect(function (T) { return sub.pvap(T); }, P, sub.Tt, sub.Tc, true);
}

function sublimationTemperature(sub, P) {
  return bisect(function (T) { return sub.psub(T); }, P, 100, sub.Tt, true);
}

// Melting temperature at pressure P (P at or above the triple-point pressure)
function meltTemperature(sub, P) {
  const increasing = sub.leans === 'right';
  return bisect(function (T) { return sub.pmelt(T); }, P, sub.meltLo, sub.meltHi, increasing);
}

// ---- Phase of a substance at (T in Celsius, P in atm) -------------------------
// Returns one of: solid, liquid, gas, scf, sl, lg, sg, triple, critical.
// A two-phase result needs the point to sit on a boundary curve (within 0.02 K
// or 0.5% in pressure). Clicking within 4 pixels of a curve snaps the probe
// onto it, so those results are easy to reach with the mouse.
function phaseOf(sub, tC, pAtm) {
  const T = tC + 273.15;
  const P = pAtm * ATM;
  const logP = Math.log10(P);
  const tolT = 0.02;             // kelvin
  const tolLogP = 0.002;         // about 0.5% in pressure

  if (Math.abs(T - sub.Tt) <= 0.05 && Math.abs(logP - Math.log10(sub.Pt)) <= 0.003) return 'triple';
  if (Math.abs(T - sub.Tc) <= 0.05 && Math.abs(logP - Math.log10(sub.Pc)) <= 0.003) return 'critical';

  // liquid-gas curve
  if (T >= sub.Tt && T <= sub.Tc) {
    if (Math.abs(logP - Math.log10(sub.pvap(T))) <= tolLogP) return 'lg';
  }
  // solid-gas curve
  if (T <= sub.Tt) {
    if (Math.abs(logP - Math.log10(sub.psub(T))) <= tolLogP) return 'sg';
  }
  // solid-liquid curve
  if (P >= sub.Pt && P <= sub.pmelt(sub.leans === 'right' ? sub.meltHi : sub.meltLo)) {
    if (Math.abs(T - meltTemperature(sub, P)) <= tolT) return 'sl';
  }

  if (T >= sub.Tc) return P >= sub.Pc ? 'scf' : 'gas';
  if (T >= sub.Tt) {
    if (P < sub.pvap(T)) return 'gas';
    if (sub.leans === 'right' && T < sub.meltHi && P > sub.pmelt(T)) return 'solid';
    return 'liquid';
  }
  if (P < sub.psub(T)) return 'gas';
  if (sub.leans === 'left' && T >= sub.meltLo && P > sub.pmelt(T)) return 'liquid';
  return 'solid';
}

// ---- Plot geometry ------------------------------------------------------------
function buildPlots() {
  plots = [];
  const small = canvasWidth < 560;
  const leftPad = small ? 40 : 58;      // room for pressure tick labels and axis title
  if (overlayMode) {
    plots.push({
      subs: [WATER, CO2], overlay: true,
      x0: margin + leftPad, x1: canvasWidth - margin - 8, y0: PLOT_TOP, y1: PLOT_BOTTOM,
      tMin: -120, tMax: 500, logPMin: -4, logPMax: 3.3,
      tTicks: [-100, 0, 100, 200, 300, 400, 500],
      panelLeft: margin, panelRight: canvasWidth - margin
    });
  } else {
    const panelW = (canvasWidth - 3 * margin) / 2;
    for (let i = 0; i < 2; i++) {
      const sub = SUBSTANCES[i];
      const left = margin + i * (panelW + margin);
      plots.push({
        subs: [sub], overlay: false,
        x0: left + leftPad, x1: left + panelW - 6, y0: PLOT_TOP, y1: PLOT_BOTTOM,
        tMin: sub.tMin, tMax: sub.tMax, logPMin: sub.logPMin, logPMax: sub.logPMax,
        tTicks: sub.tTicks,
        panelLeft: left, panelRight: left + panelW
      });
    }
  }
}

function plotX(pl, tC) {
  return pl.x0 + (tC - pl.tMin) / (pl.tMax - pl.tMin) * (pl.x1 - pl.x0);
}

function plotY(pl, pPa) {
  const lp = Math.log10(pPa / ATM);
  return pl.y1 - (lp - pl.logPMin) / (pl.logPMax - pl.logPMin) * (pl.y1 - pl.y0);
}

function clampY(pl, y) {
  return constrain(y, pl.y0, pl.y1);
}

// ---- One diagram --------------------------------------------------------------
function drawPlot(pl) {
  const small = canvasWidth < 560;

  // plot background
  noStroke();
  fill('white');
  rect(pl.x0, pl.y0, pl.x1 - pl.x0, pl.y1 - pl.y0);

  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(pl.x0, pl.y0, pl.x1 - pl.x0, pl.y1 - pl.y0);
  drawingContext.clip();

  if (!pl.overlay) {
    fillRegions(pl, pl.subs[0]);
  } else {
    drawGrid(pl);
  }

  for (let s = 0; s < pl.subs.length; s++) {
    const sub = pl.subs[s];
    const col = pl.overlay ? (sub.key === 'water' ? 'navy' : 'green') : sub.curveColor;
    drawGuides(pl, sub, col);
    drawCurves(pl, sub, col);
  }
  for (let s = 0; s < pl.subs.length; s++) {
    const sub = pl.subs[s];
    const col = pl.overlay ? (sub.key === 'water' ? 'navy' : 'green') : sub.curveColor;
    drawMarkers(pl, sub, col);
    if (!pl.overlay) drawRegionLabels(pl, sub);
  }
  drawProbe(pl, true);
  if (!pl.overlay && pl.x1 - pl.x0 >= 230) {
    drawInset(pl, pl.subs[0]);
  }
  if (pl.overlay) drawOverlayKey(pl);
  drawProbe(pl, false);
  drawingContext.restore();

  drawAxes(pl, small);
}

// Region fill: one narrow vertical strip per two pixels of temperature
function fillRegions(pl, sub) {
  noStroke();
  const step = 2;
  for (let x = pl.x0; x < pl.x1; x += step) {
    const tC = pl.tMin + (x + step / 2 - pl.x0) / (pl.x1 - pl.x0) * (pl.tMax - pl.tMin);
    const T = tC + 273.15;
    const w = Math.min(step, pl.x1 - x) + 0.5;
    if (T >= sub.Tc) {
      const yc = clampY(pl, plotY(pl, sub.Pc));
      strip(x, pl.y0, yc, w, REGION_COLORS.scf);
      strip(x, yc, pl.y1, w, REGION_COLORS.gas);
    } else if (T >= sub.Tt) {
      const yv = clampY(pl, plotY(pl, sub.pvap(T)));
      strip(x, yv, pl.y1, w, REGION_COLORS.gas);
      let ym = pl.y0;
      if (sub.leans === 'right' && T < sub.meltHi) {
        ym = clampY(pl, plotY(pl, sub.pmelt(T)));
        strip(x, pl.y0, ym, w, REGION_COLORS.solid);
      }
      strip(x, ym, yv, w, REGION_COLORS.liquid);
    } else {
      const ys = clampY(pl, plotY(pl, sub.psub(T)));
      strip(x, ys, pl.y1, w, REGION_COLORS.gas);
      let ym = pl.y0;
      if (sub.leans === 'left' && T >= sub.meltLo) {
        ym = clampY(pl, plotY(pl, sub.pmelt(T)));
        strip(x, pl.y0, ym, w, REGION_COLORS.liquid);
      }
      strip(x, ym, ys, w, REGION_COLORS.solid);
    }
  }
}

function strip(x, yTop, yBottom, w, col) {
  if (yBottom - yTop <= 0) return;
  fill(col);
  rect(x, yTop, w, yBottom - yTop);
}

function drawGrid(pl) {
  stroke('gainsboro');
  strokeWeight(1);
  for (let lp = Math.ceil(pl.logPMin); lp <= pl.logPMax; lp++) {
    const y = plotY(pl, Math.pow(10, lp) * ATM);
    line(pl.x0, y, pl.x1, y);
  }
  for (let i = 0; i < pl.tTicks.length; i++) {
    const x = plotX(pl, pl.tTicks[i]);
    line(x, pl.y0, x, pl.y1);
  }
}

// Dashed helper lines: 1 atm, drop lines from the normal points, supercritical edges
function drawGuides(pl, sub, col) {
  drawingContext.setLineDash([5, 4]);
  strokeWeight(1);
  stroke('dimgray');
  const y1atm = plotY(pl, ATM);
  line(pl.x0, y1atm, pl.x1, y1atm);
  const drops = normalPoints(sub);
  for (let i = 0; i < drops.length; i++) {
    const x = plotX(pl, drops[i].T - 273.15);
    line(x, y1atm, x, pl.y1);
  }
  // supercritical region edges
  stroke(pl.overlay ? col : 'purple');
  const xc = plotX(pl, sub.Tc - 273.15);
  const yc = plotY(pl, sub.Pc);
  line(xc, yc, xc, pl.y0);
  line(xc, yc, pl.x1, yc);
  drawingContext.setLineDash([]);
}

function normalPoints(sub) {
  if (sub.key === 'water') {
    return [{ T: sub.mpT, tag: 'mp' }, { T: sub.bpT, tag: 'bp' }];
  }
  return [{ T: sub.spT, tag: 'sublimes' }];
}

function drawCurves(pl, sub, col) {
  noFill();
  stroke(col);
  strokeWeight(2.5);
  const n = 80;
  // solid-gas
  beginShape();
  const tStart = Math.max(100, pl.tMin + 273.15);
  for (let i = 0; i <= n; i++) {
    const T = tStart + (sub.Tt - tStart) * i / n;
    vertex(plotX(pl, T - 273.15), plotY(pl, sub.psub(T)));
  }
  endShape();
  // liquid-gas
  beginShape();
  for (let i = 0; i <= n; i++) {
    const T = sub.Tt + (sub.Tc - sub.Tt) * i / n;
    vertex(plotX(pl, T - 273.15), plotY(pl, sub.pvap(T)));
  }
  endShape();
  // solid-liquid, from the triple point to the top of the axis
  const pTop = Math.pow(10, pl.logPMax) * ATM * 1.02;
  const tEnd = meltTemperature(sub, pTop);
  beginShape();
  for (let i = 0; i <= n; i++) {
    const T = sub.Tt + (tEnd - sub.Tt) * i / n;
    vertex(plotX(pl, T - 273.15), plotY(pl, sub.pmelt(T)));
  }
  endShape();
}

function drawMarkers(pl, sub, col) {
  const small = canvasWidth < 560;
  const y1atm = plotY(pl, ATM);
  // points on the 1 atm line
  const pts = normalPoints(sub);
  for (let i = 0; i < pts.length; i++) {
    const x = plotX(pl, pts[i].T - 273.15);
    stroke('white');
    strokeWeight(1.5);
    fill('black');
    circle(x, y1atm, 9);
    if (!pl.overlay && !small) {
      noStroke();
      fill('black');
      textStyle(ITALIC);
      if (pts[i].tag === 'mp') {
        drawRich('mp', x - 6, y1atm - 10, 12, RIGHT);
      } else {
        drawRich(pts[i].tag, x + 7, y1atm + 10, 12, LEFT);
      }
      textStyle(NORMAL);
    }
  }
  // "1 atm" tag at the right end of the dashed line
  if (!small) {
    noStroke();
    fill('dimgray');
    drawRich('1 atm', pl.x1 - 5, y1atm - 8, 12, RIGHT);
  }

  // triple point: gold star
  const xt = plotX(pl, sub.Tt - 273.15);
  const yt = plotY(pl, sub.Pt);
  stroke(col);
  strokeWeight(1.5);
  fill('gold');
  drawStar(xt, yt, 9, 4);
  // critical point: crimson diamond
  const xc = plotX(pl, sub.Tc - 273.15);
  const yc = plotY(pl, sub.Pc);
  stroke('white');
  strokeWeight(1.5);
  fill('crimson');
  quad(xc, yc - 8, xc + 7, yc, xc, yc + 8, xc - 7, yc);

  if (!pl.overlay) {
    const fs = small ? 10 : 12;
    textStyle(BOLD);
    labelBox(small ? 'Triple pt' : 'Triple point', xt + 9, yt + 13, fs, LEFT);
    const critText = small ? 'Critical pt' : 'Critical point';
    const fitsRight = xc + 8 + richWidth(critText, fs) + 4 <= pl.x1;
    if (sub.labels.critical === 'left' || !fitsRight) {
      labelBox(critText, xc - 10, yc - 13, fs, RIGHT);
    } else {
      labelBox(critText, xc + 8, yc + 14, fs, LEFT);
    }
    textStyle(NORMAL);
  }
}

// Text on a translucent white pad so it reads on any region color
function labelBox(str, x, y, size, align) {
  const w = richWidth(str, size);
  let left = x;
  if (align === CENTER) left = x - w / 2;
  if (align === RIGHT) left = x - w;
  noStroke();
  fill(255, 255, 255, 215);
  rect(left - 3, y - size * 0.7, w + 6, size * 1.4, 4);
  fill('black');
  drawRich(str, x, y, size, align);
}

function drawStar(x, y, rOuter, rInner) {
  beginShape();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    const a = -HALF_PI + i * PI / 5;
    vertex(x + r * cos(a), y + r * sin(a));
  }
  endShape(CLOSE);
}

function drawRegionLabels(pl, sub) {
  const small = canvasWidth < 560;
  const fs = small ? 11 : 13;
  const L = sub.labels;
  textStyle(BOLD);
  noStroke();

  // SOLID: turn the word sideways when the region is too narrow for it
  const sx = plotX(pl, L.solid[0]);
  const sy = plotY(pl, L.solid[1] * ATM);
  const solidWidth = (sub.leans === 'left' ? plotX(pl, 0) : plotX(pl, sub.Tt - 273.15)) - pl.x0;
  fill('midnightblue');
  if (richWidth('SOLID', fs) + 8 > solidWidth) {
    push();
    translate(pl.x0 + solidWidth / 2, sy);
    rotate(-HALF_PI);
    drawRich('SOLID', 0, 0, fs, CENTER);
    pop();
  } else {
    drawRich('SOLID', sx, sy, fs, CENTER);
  }

  fill('white');
  drawRich('LIQUID', plotX(pl, L.liquid[0]), plotY(pl, L.liquid[1] * ATM), fs, CENTER);
  fill('black');
  drawRich('GAS', plotX(pl, L.gas[0]), plotY(pl, L.gas[1] * ATM), fs, CENTER);

  // supercritical fluid label
  const fx = plotX(pl, L.scf[0]);
  const fy = plotY(pl, L.scf[1] * ATM);
  const scfWidth = pl.x1 - plotX(pl, sub.Tc - 273.15);
  const fs2 = small ? 9 : 10.5;
  fill('indigo');
  if (richWidth('Supercritical', fs2) + 4 <= scfWidth) {
    drawRich('Supercritical', fx, fy - fs2 * 0.6, fs2, CENTER);
    drawRich('fluid', fx, fy + fs2 * 0.6, fs2, CENTER);
  } else if (richWidth('SCF', fs2) + 4 <= scfWidth) {
    drawRich('SCF', fx, fy, fs2, CENTER);
  }
  textStyle(NORMAL);
}

// Zoomed inset: the solid-liquid curve on a linear pressure axis up to 1000 atm
function drawInset(pl, sub) {
  const w = Math.min(158, (pl.x1 - pl.x0) * 0.5);
  const h = 92;
  const x = pl.x1 - w - 6;
  const y = pl.y1 - h - 6;
  stroke('gray');
  strokeWeight(1);
  fill('white');
  rect(x, y, w, h, 6);

  noStroke();
  fill('black');
  textStyle(BOLD);
  drawRich('Zoom: solid-liquid curve', x + w / 2, y + 10, 11, CENTER);
  textStyle(NORMAL);

  // mini plot area
  const ax0 = x + 6;
  const ax1 = x + w - 6;
  const ay0 = y + 20;
  const ay1 = y + h - 18;
  const tTriple = sub.Tt - 273.15;
  const tFar = sub.melt1000 - 273.15;
  const tLo = Math.min(tTriple, tFar);
  const tHi = Math.max(tTriple, tFar);
  const span = tHi - tLo;
  const tA = tLo - span * 0.75;
  const tB = tHi + span * 0.75;
  const pA = sub.Pt;
  const pB = 1000 * ATM;
  function ix(tC) { return ax0 + (tC - tA) / (tB - tA) * (ax1 - ax0); }
  function iy(P) { return ay1 - (P - pA) / (pB - pA) * (ay1 - ay0); }

  // fill solid (left of the curve) and liquid (right of it)
  const n = 24;
  noStroke();
  fill(REGION_COLORS.solid);
  beginShape();
  vertex(ax0, ay1);
  for (let i = 0; i <= n; i++) {
    const T = sub.Tt + (sub.melt1000 - sub.Tt) * i / n;
    vertex(ix(T - 273.15), iy(sub.pmelt(T)));
  }
  vertex(ax0, ay0);
  endShape(CLOSE);
  fill(REGION_COLORS.liquid);
  beginShape();
  vertex(ax1, ay1);
  for (let i = 0; i <= n; i++) {
    const T = sub.Tt + (sub.melt1000 - sub.Tt) * i / n;
    vertex(ix(T - 273.15), iy(sub.pmelt(T)));
  }
  vertex(ax1, ay0);
  endShape(CLOSE);

  // the curve itself
  noFill();
  stroke('navy');
  strokeWeight(2.5);
  beginShape();
  for (let i = 0; i <= n; i++) {
    const T = sub.Tt + (sub.melt1000 - sub.Tt) * i / n;
    vertex(ix(T - 273.15), iy(sub.pmelt(T)));
  }
  endShape();
  // a faint vertical reference line through the triple point
  stroke('dimgray');
  strokeWeight(1);
  drawingContext.setLineDash([3, 3]);
  line(ix(tTriple), ay0, ix(tTriple), ay1);
  drawingContext.setLineDash([]);

  // dots at the two ends of the curve
  const xBottom = ix(tTriple);
  const xTop = ix(tFar);
  stroke('white');
  strokeWeight(1);
  fill('navy');
  circle(xBottom, ay1 - 2, 7);
  circle(xTop, ay0 + 2, 7);

  // pressure at each end, written beside the dot on the roomy side
  const fs = 11;
  const pTopText = '1000 atm';
  const pBottomText = fmtP(sub.Pt / ATM).replace('0.00604', '0.006') + ' atm';
  noStroke();
  if (sub.leans === 'left') {
    fill('white');
    drawRich(pTopText, xTop + 15, ay0 + 6, fs, LEFT);
    drawRich('liquid', ax1 - 3, (ay0 + ay1) / 2 + 3, fs, RIGHT);
    fill('midnightblue');
    drawRich(pBottomText, xBottom - 17, ay1 - 6, fs, RIGHT);
    drawRich('solid', ax0 + 3, (ay0 + ay1) / 2 - 3, fs, LEFT);
  } else {
    fill('midnightblue');
    drawRich(pTopText, xTop - 17, ay0 + 6, fs, RIGHT);
    drawRich('solid', ax0 + 3, (ay0 + ay1) / 2 + 3, fs, LEFT);
    fill('white');
    drawRich(pBottomText, xBottom + 15, ay1 - 6, fs, LEFT);
    drawRich('liquid', ax1 - 3, (ay0 + ay1) / 2 - 3, fs, RIGHT);
  }
  // temperature at each end, written under the mini plot
  fill('black');
  drawRich(fmtT(tTriple) + ' \u00B0C', xBottom, ay1 + 9, fs, CENTER);
  drawRich(fmtT(tFar) + ' \u00B0C', xTop, ay1 + 9, fs, CENTER);
}

function drawOverlayKey(pl) {
  const fs = canvasWidth < 560 ? 11 : 13;
  const w = richWidth('Carbon dioxide', fs) + 46;
  const x = pl.x1 - w - 10;
  const y = pl.y1 - 54;
  stroke('silver');
  strokeWeight(1);
  fill(255, 255, 255, 235);
  rect(x, y, w, 44, 6);
  strokeWeight(3);
  stroke('navy');
  line(x + 8, y + 13, x + 30, y + 13);
  stroke('green');
  line(x + 8, y + 31, x + 30, y + 31);
  noStroke();
  fill('black');
  drawRich('Water', x + 38, y + 13, fs, LEFT);
  drawRich('Carbon dioxide', x + 38, y + 31, fs, LEFT);
}

// The crosshair lines are drawn under the zoom inset, the ring on top of it
function drawProbe(pl, linesOnly) {
  if (probe.T < pl.tMin || probe.T > pl.tMax) return;
  const lp = Math.log10(probe.P);
  if (lp < pl.logPMin || lp > pl.logPMax) return;
  const x = plotX(pl, probe.T);
  const y = plotY(pl, probe.P * ATM);
  if (linesOnly) {
    stroke('black');
    strokeWeight(1);
    drawingContext.setLineDash([2, 3]);
    line(x, pl.y0, x, pl.y1);
    line(pl.x0, y, pl.x1, y);
    drawingContext.setLineDash([]);
    return;
  }
  stroke('white');
  strokeWeight(4);
  noFill();
  circle(x, y, 15);
  stroke('darkorange');
  strokeWeight(3);
  circle(x, y, 15);
}

function drawAxes(pl, small) {
  // frame
  noFill();
  stroke('dimgray');
  strokeWeight(1);
  rect(pl.x0, pl.y0, pl.x1 - pl.x0, pl.y1 - pl.y0);

  const tickSize = small ? 9 : 11;
  // temperature ticks
  for (let i = 0; i < pl.tTicks.length; i++) {
    const x = plotX(pl, pl.tTicks[i]);
    stroke('dimgray');
    line(x, pl.y1, x, pl.y1 + 4);
    noStroke();
    fill('black');
    drawRich(fmtInt(pl.tTicks[i]), x, pl.y1 + 12, tickSize, CENTER);
  }
  // pressure ticks at each power of ten
  for (let lp = Math.ceil(pl.logPMin); lp <= pl.logPMax; lp++) {
    const y = plotY(pl, Math.pow(10, lp) * ATM);
    stroke('dimgray');
    line(pl.x0 - 4, y, pl.x0, y);
    noStroke();
    fill('black');
    const label = lp >= 0 ? String(Math.pow(10, lp)) : (small ? '10^{' + fmtInt(lp) + '}' : Math.pow(10, lp).toFixed(-lp));
    drawRich(label, pl.x0 - 6, y, tickSize, RIGHT);
  }
  // axis titles
  noStroke();
  fill('black');
  const titleSize = small ? 11 : 13;
  drawRich('Temperature (°C)', (pl.x0 + pl.x1) / 2, pl.y1 + 28, titleSize, CENTER);
  push();
  translate(pl.panelLeft + (small ? 6 : 9), (pl.y0 + pl.y1) / 2);
  rotate(-HALF_PI);
  drawRich(small ? 'Pressure (atm)' : 'Pressure (atm, log scale)', 0, 0, titleSize, CENTER);
  pop();

  // diagram title
  textStyle(BOLD);
  const head = pl.overlay ? 'Both substances on one set of axes'
    : pl.subs[0].name + ' (' + pl.subs[0].formula + ')';
  drawRich(head, (pl.x0 + pl.x1) / 2, pl.y0 - 12, small ? 13 : 16, CENTER);
  textStyle(NORMAL);
}

// ---- Legends under the diagrams ------------------------------------------------
function drawLegends() {
  const small = canvasWidth < 560;
  const fs = small ? 10 : 13;
  const lineH = small ? 14 : 17;
  const top = 377;
  const colW = (canvasWidth - 3 * margin) / 2;
  for (let i = 0; i < 2; i++) {
    const sub = SUBSTANCES[i];
    const left = margin + i * (colW + margin) + (small ? 2 : 14);
    const tx = left + 18;
    let y = top;
    const col = overlayMode ? (sub.key === 'water' ? 'navy' : 'green') : 'navy';

    // triple point
    stroke(col);
    strokeWeight(1.2);
    fill('gold');
    drawStar(left + 6, y, 7, 3);
    noStroke();
    fill('black');
    drawRich((small ? 'Triple: ' : (overlayMode ? sub.name + ' triple point: ' : 'Triple point: ')) + sub.tripleText, tx, y, fs, LEFT);
    y += lineH;

    // critical point
    stroke('white');
    strokeWeight(1);
    fill('crimson');
    quad(left + 6, y - 6, left + 11, y, left + 6, y + 6, left + 1, y);
    noStroke();
    fill('black');
    drawRich((small ? 'Critical: ' : 'Critical point: ') + sub.criticalText, tx, y, fs, LEFT);
    y += lineH;

    // behavior at 1 atm
    fill('black');
    circle(left + 6, y, 8);
    let str;
    if (sub.key === 'water') {
      str = small ? '1 atm: melts 0 °C, boils 100 °C' : 'At 1 atm: melts at 0 °C (mp), boils at 100 °C (bp)';
    } else {
      str = small ? '1 atm: sublimes −78.5 °C' : 'At 1 atm: sublimes at −78.5 °C, never a liquid';
    }
    drawRich(str, tx, y, fs, LEFT);
    y += lineH;

    // which way the solid-liquid curve leans
    const lean = sub.leans === 'left' ? -3 : 3;
    stroke(col);
    strokeWeight(2.5);
    line(left + 6 - lean, y + 6, left + 6 + lean, y - 6);
    noStroke();
    fill('black');
    if (sub.leans === 'left') {
      str = small ? 'Fusion curve leans left (unusual)' : 'Solid-liquid curve leans left: pressure lowers the melting point';
    } else {
      str = small ? 'Fusion curve leans right (typical)' : 'Solid-liquid curve leans right: pressure raises the melting point';
    }
    let fsLean = fs;
    while (richWidth(str, fsLean) > colW - 30 && fsLean > 9) fsLean -= 0.5;
    drawRich(str, tx, y, fsLean, LEFT);
  }
}

// ---- Probe readout ---------------------------------------------------------------
function drawReadout() {
  const small = canvasWidth < 560;
  const top = 443;
  const h = 62;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(margin, top, canvasWidth - 2 * margin, h, 8);

  const fs = small ? 11 : 15;
  noStroke();
  fill('black');
  textStyle(BOLD);
  const where = 'Probe at ' + fmtT(probe.T) + ' °C and ' + fmtP(probe.P) + ' atm';
  drawRich(where, margin + 10, top + 15, fs, LEFT);
  textStyle(NORMAL);
  fill('dimgray');
  const hint = 'click or drag on a diagram to move it';
  if (margin + 10 + richWidth(where, fs) + 20 + richWidth(hint, fs - 2) < canvasWidth - margin - 8) {
    drawRich(hint, canvasWidth - margin - 10, top + 15, fs - 2, RIGHT);
  }

  const colW = (canvasWidth - 2 * margin) / 2;
  for (let i = 0; i < 2; i++) {
    const sub = SUBSTANCES[i];
    const code = phaseOf(sub, probe.T, probe.P);
    const x = margin + 10 + i * colW;
    const y = top + 37;
    // color chip for single-phase results
    let tx = x;
    if (REGION_COLORS[code]) {
      stroke('gray');
      strokeWeight(1);
      fill(REGION_COLORS[code]);
      rect(x, y - 7, 14, 14, 3);
      tx = x + 20;
    }
    noStroke();
    fill('black');
    textStyle(BOLD);
    const nameText = (small ? (sub.key === 'water' ? 'Water' : 'CO_{2}') : sub.name) + ': ';
    drawRich(nameText, tx, y, fs, LEFT);
    const nameW = richWidth(nameText, fs);
    textStyle(NORMAL);
    // wrap the phase text onto a second line if needed
    const avail = colW - (tx - x) - nameW - 14;
    const phaseText = PHASE_TEXT[code];
    if (richWidth(phaseText, fs) <= avail) {
      textStyle(BOLD);
      drawRich(phaseText, tx + nameW, y, fs, LEFT);
      textStyle(NORMAL);
    } else {
      const words = phaseText.split(' ');
      let line1 = '';
      let k = 0;
      while (k < words.length && richWidth(line1 + words[k] + ' ', fs) <= avail) {
        line1 += words[k] + ' ';
        k++;
      }
      textStyle(BOLD);
      drawRich(line1.trim(), tx + nameW, y - 1, fs, LEFT);
      drawRich(words.slice(k).join(' '), tx, y + fs + 3, fs, LEFT);
      textStyle(NORMAL);
    }
  }
}

// ---- Number formatting ---------------------------------------------------------
function fmtInt(v) {
  return String(v).replace('-', '−');
}

function fmtT(tC) {
  const a = Math.abs(tC);
  let s;
  if (a < 0.005) s = '0.00';
  else if (a < 1) s = tC.toFixed(2);
  else s = tC.toFixed(1);
  return s.replace('-', '−');
}

function fmtP(pAtm) {
  if (pAtm >= 100) return pAtm.toFixed(0);
  if (pAtm >= 10) return pAtm.toFixed(1);
  if (pAtm >= 1) return pAtm.toFixed(2);
  if (pAtm >= 0.995) return '1.00';
  return Number(pAtm.toPrecision(3)).toString();
}

// ---- Interaction ---------------------------------------------------------------
function plotAt(mx, my) {
  for (let i = 0; i < plots.length; i++) {
    const pl = plots[i];
    if (mx >= pl.x0 && mx <= pl.x1 && my >= pl.y0 && my <= pl.y1) return pl;
  }
  return null;
}

function moveProbe(mx, my) {
  const pl = plotAt(mx, my);
  if (!pl) return;
  let tC = pl.tMin + (mx - pl.x0) / (pl.x1 - pl.x0) * (pl.tMax - pl.tMin);
  let lp = pl.logPMin + (pl.y1 - my) / (pl.y1 - pl.y0) * (pl.logPMax - pl.logPMin);
  let pAtm = Math.pow(10, lp);

  // snap to a special point or onto a nearby curve of the clicked diagram
  let snapped = false;
  for (let s = 0; s < pl.subs.length && !snapped; s++) {
    const sub = pl.subs[s];
    const specials = [
      { T: sub.Tt, P: sub.Pt },
      { T: sub.Tc, P: sub.Pc }
    ];
    const pts = normalPoints(sub);
    for (let i = 0; i < pts.length; i++) specials.push({ T: pts[i].T, P: ATM });
    for (let i = 0; i < specials.length; i++) {
      const dx = plotX(pl, specials[i].T - 273.15) - mx;
      const dy = plotY(pl, specials[i].P) - my;
      if (dx * dx + dy * dy <= 64) {
        tC = specials[i].T - 273.15;
        pAtm = specials[i].P / ATM;
        snapped = true;
        break;
      }
    }
  }
  for (let s = 0; s < pl.subs.length && !snapped; s++) {
    const sub = pl.subs[s];
    const T = tC + 273.15;
    if (T >= sub.Tt && T <= sub.Tc && Math.abs(plotY(pl, sub.pvap(T)) - my) <= 4) {
      pAtm = sub.pvap(T) / ATM;
      snapped = true;
    } else if (T < sub.Tt && Math.abs(plotY(pl, sub.psub(T)) - my) <= 4) {
      pAtm = sub.psub(T) / ATM;
      snapped = true;
    } else if (pAtm * ATM > sub.Pt) {
      const tm = meltTemperature(sub, pAtm * ATM) - 273.15;
      if (Math.abs(plotX(pl, tm) - mx) <= 4) {
        tC = tm;
        snapped = true;
      }
    }
  }
  probe.T = tC;
  probe.P = pAtm;
  if (jumpSelect) jumpSelect.selected(-1);
}

function mousePressed() {
  if (mouseY <= drawHeight) moveProbe(mouseX, mouseY);
}

function mouseDragged() {
  if (mouseY <= drawHeight) moveProbe(mouseX, mouseY);
}

function jumpToPreset() {
  const i = int(jumpSelect.value());
  if (i < 0) return;
  const p = PRESETS[i];
  if (p.point) {
    const sub = p.sub === 'water' ? WATER : CO2;
    if (p.point === 'triple') { probe.T = sub.Tt - 273.15; probe.P = sub.Pt / ATM; }
    if (p.point === 'critical') { probe.T = sub.Tc - 273.15; probe.P = sub.Pc / ATM; }
    if (p.point === 'mp') { probe.T = sub.mpT - 273.15; probe.P = 1; }
    if (p.point === 'bp') { probe.T = sub.bpT - 273.15; probe.P = 1; }
    if (p.point === 'sp') { probe.T = sub.spT - 273.15; probe.P = 1; }
  } else {
    probe.T = p.T;
    probe.P = p.P;
  }
}

function toggleView() {
  overlayMode = !overlayMode;
  viewButton.html(overlayMode ? 'Show Side by Side' : 'Overlay Both Diagrams');
  positionControls();
}

// ---- Controls ------------------------------------------------------------------
function drawControlLabels() {
  noStroke();
  fill('black');
  textStyle(NORMAL);
  const small = canvasWidth < 560;
  const bw = viewButton ? (viewButton.elt.offsetWidth || 170) : 170;
  drawRich(small ? 'Go:' : 'Jump to:', 10 + bw + 14, drawHeight + 25, small ? 13 : 16, LEFT);
}

function positionControls() {
  if (!viewButton || !jumpSelect) return;
  const small = canvasWidth < 560;
  viewButton.position(10, drawHeight + 13);
  const bw = viewButton.elt.offsetWidth || 170;
  const labelW = small ? 30 : 68;
  const sx = 10 + bw + 14 + labelW;
  jumpSelect.position(sx, drawHeight + 14);
  jumpSelect.style('max-width', Math.max(90, canvasWidth - sx - 12) + 'px');
}

// ---- Rich text: "_{...}" is a subscript, "^{...}" is a superscript ------------
function parseRich(str) {
  const segs = [];
  let buf = '';
  let i = 0;
  while (i < str.length) {
    const ch = str[i];
    if ((ch === '_' || ch === '^') && str[i + 1] === '{') {
      if (buf) { segs.push({ t: buf, m: 0 }); buf = ''; }
      const j = str.indexOf('}', i);
      segs.push({ t: str.substring(i + 2, j), m: ch === '_' ? -1 : 1 });
      i = j + 1;
    } else {
      buf += ch;
      i++;
    }
  }
  if (buf) segs.push({ t: buf, m: 0 });
  return segs;
}

function richWidth(str, size) {
  let w = 0;
  const segs = parseRich(str);
  for (let s of segs) {
    textSize(s.m === 0 ? size : size * 0.7);
    w += textWidth(s.t);
  }
  textSize(size);
  return w;
}

// Draw rich text with its vertical center at y. Uses the current fill and textStyle.
function drawRich(str, x, y, size, align) {
  const segs = parseRich(str);
  const total = richWidth(str, size);
  let cx = x;
  if (align === CENTER) cx = x - total / 2;
  if (align === RIGHT) cx = x - total;
  const baseline = y + size * 0.36;
  noStroke();
  textAlign(LEFT, BASELINE);
  for (let s of segs) {
    if (s.m === 0) {
      textSize(size);
      text(s.t, cx, baseline);
    } else {
      textSize(size * 0.7);
      text(s.t, cx, baseline + (s.m === -1 ? size * 0.22 : -size * 0.42));
    }
    cx += textWidth(s.t);
  }
  textSize(size);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = max(320, container.offsetWidth);
  }
}
