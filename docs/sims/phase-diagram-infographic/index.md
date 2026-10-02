---
title: Phase Diagram Infographic
description: Interactive phase diagrams of water and carbon dioxide with labeled solid, liquid, gas, and supercritical regions, triple and critical points, and a movable probe that reports the phase at any temperature and pressure.
image: /sims/phase-diagram-infographic/phase-diagram-infographic.png
og:image: /sims/phase-diagram-infographic/phase-diagram-infographic.png
twitter:image: /sims/phase-diagram-infographic/phase-diagram-infographic.png
social:
   cards: false
quality_score: 100
---

# Phase Diagram Infographic

<iframe src="main.html" height="564px" width="100%" scrolling="no"></iframe>

[Run the Phase Diagram Infographic MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A **phase diagram** plots pressure against temperature and shows which phase of a pure substance is stable at each combination. This MicroSim puts the diagrams of water and carbon dioxide side by side so you can compare them.

Every diagram has the same parts:

- **Three regions**: solid, liquid, and gas. A fourth tinted corner marks the **supercritical fluid**, where liquid and gas can no longer be told apart.
- **Three boundary curves**: solid-gas (sublimation), liquid-gas (vaporization), and solid-liquid (fusion). On a curve, the two phases on either side coexist in equilibrium.
- **The triple point** (gold star), the one temperature and pressure where all three phases coexist.
- **The critical point** (red diamond), where the liquid-gas curve ends.

Two differences between the substances matter for AP Chemistry:

1. **Water's solid-liquid curve leans left.** Raising the pressure *lowers* the melting point, because ice is less dense than liquid water. Carbon dioxide's curve leans right, which is the normal behavior. On a logarithmic pressure axis both curves look nearly vertical, so each diagram has a **zoom inset** with a linear pressure axis from the triple point to 1000 atm. Across that range the melting point of ice falls from 0.01 °C to about −9.1 °C, while the melting point of solid $\ce{CO2}$ rises from −56.6 °C to about −36.9 °C.
2. **The 1 atm line misses carbon dioxide's liquid region.** The triple point of $\ce{CO2}$ is at 5.11 atm, so at 1 atm the dashed line crosses only the solid-gas curve: dry ice sublimes at −78.5 °C and never melts. For water the same line crosses two curves, giving the normal melting point (mp) and normal boiling point (bp).

| | Water | Carbon dioxide |
|---|---|---|
| Triple point | 0.01 °C, 0.006 atm (611.657 Pa) | −56.6 °C, 5.11 atm |
| Critical point | 374 °C, 218 atm | 31.0 °C, 72.8 atm |
| At 1 atm | melts at 0 °C, boils at 100 °C | sublimes at −78.5 °C |
| Solid-liquid curve | leans left (negative slope) | leans right (positive slope) |

## How to Use

1. **Click or drag on either diagram** to move the orange probe. The panel under the diagrams reports the phase of *both* substances at that temperature and pressure.
2. **Click near a curve or a marked point** and the probe snaps onto it. The readout then names the phases that coexist there.
3. **Use the Jump to menu** to send the probe to a notable point, such as room conditions, the triple point of water, or dry ice subliming at 1 atm.
4. **Press Overlay Both Diagrams** to draw both sets of curves on one pair of axes. Press it again to return to the side by side view.

The pressure axis is logarithmic: each tick is ten times the pressure of the tick below it.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/chemistry/sims/phase-diagram-infographic/main.html"
        height="564px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (AP Chemistry, Chapter 7: Phase Changes, Solutions, and Gas Laws)

### Duration
10-15 minutes

### Learning Objectives

- **Understand:** Locate and interpret the triple point, critical point, and phase regions on a pressure-temperature phase diagram.
- **Understand:** Classify the phase of a substance at a given temperature and pressure.
- **Understand:** Explain how the slope of water's solid-liquid boundary differs from that of most substances, and why carbon dioxide sublimes at atmospheric pressure.

### Prerequisites

- Phase changes and heating curves
- Vapor pressure and boiling
- Reading a logarithmic axis

### Activities

1. **Exploration** (3 min): Drag the probe across the water diagram along the 1 atm line from −100 °C to 300 °C. Students record each phase and the two temperatures where the phase changes.
2. **Compare** (4 min): Repeat along the 1 atm line on the carbon dioxide diagram. Ask: *Why is there no liquid? How high must the pressure be before liquid carbon dioxide can exist?* (Above 5.11 atm, the triple-point pressure.)
3. **The unusual slope** (4 min): Students read the two zoom insets and state in one sentence what high pressure does to the melting point of each solid. Then they place the probe at −5 °C and about 1000 atm on the water diagram and explain the result (liquid, because that pressure is above the melting pressure of ice at −5 °C).
4. **Assessment** (3 min): Without the MicroSim, students predict the phase of each substance at 40 °C and 100 atm, then check with the Jump to menu (water is a liquid; carbon dioxide is a supercritical fluid).

### Assessment

- Can the student name the phase or phases present at any marked point or region?
- Can the student explain what the triple point and critical point mean physically?
- Can the student explain why ice melts under pressure but dry ice does not?

## How the Curves Were Calculated

The boundary curves are calculated from published reference equations rather than sketched, so the probe readout is quantitatively meaningful.

| Curve | Source equation | Check value reproduced by the code |
|---|---|---|
| Water, liquid-gas | Wagner and Pruss saturation-pressure equation (IAPWS-95) | 611.657 Pa at 273.16 K; 101.32 kPa at 373.124 K |
| Water, solid-gas | IAPWS 2011 sublimation-pressure equation for ice Ih | 8.947 Pa at 230 K |
| Water, solid-liquid | IAPWS 2011 melting-pressure equation for ice Ih | 208.57 MPa at 251.165 K |
| Carbon dioxide, all three | Span and Wagner (1996) auxiliary equations | 0.51796 MPa at 216.592 K; 101.33 kPa at 194.686 K |

Simplifications: only ordinary ice (ice Ih) is shown, so the pressure axis stops near 2000 atm, below the pressures where other forms of ice appear. The normal melting point computed for pure, air-free water is 0.0025 °C, which is displayed as 0.00 °C.

## References

1. [OpenStax Chemistry 2e, Section 10.4: Phase Diagrams](https://openstax.org/books/chemistry-2e/pages/10-4-phase-diagrams) - OpenStax - Free textbook section on reading phase diagrams of water and carbon dioxide, including supercritical fluids.
2. [Revised Release on the Pressure along the Melting and Sublimation Curves of Ordinary Water Substance](http://www.iapws.org/relguide/MeltSub.html) - International Association for the Properties of Water and Steam, 2011 - Source of the ice melting and sublimation equations.
3. Wagner, W. and Pruss, A. (2002). The IAPWS Formulation 1995 for the Thermodynamic Properties of Ordinary Water Substance for General and Scientific Use. *Journal of Physical and Chemical Reference Data*, 31, 387-535 - Source of the water saturation-pressure equation and critical constants.
4. Span, R. and Wagner, W. (1996). A New Equation of State for Carbon Dioxide Covering the Fluid Region from the Triple-Point Temperature to 1100 K at Pressures up to 800 MPa. *Journal of Physical and Chemical Reference Data*, 25, 1509-1596 - Source of the carbon dioxide vapor-pressure, sublimation, and melting equations.
5. [NIST Chemistry WebBook: Carbon dioxide phase change data](https://webbook.nist.gov/cgi/cbook.cgi?ID=C124389&Mask=4) - National Institute of Standards and Technology - Triple point and critical point values.
