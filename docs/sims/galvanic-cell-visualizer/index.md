---
title: Galvanic Cell Visualizer
description: Animate zinc-copper style galvanic cells with salt bridge flow, electron movement, and live cell notation plus Nernst-based potentials.
quality_score: 0
---

# Galvanic cell visualizer

<iframe src="main.html" height="902px" width="100%" scrolling="no"></iframe>

[Run the Galvanic Cell Visualizer fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the MicroSim in the p5.js editor](https://editor.p5js.org/){ .md-button }

## About this MicroSim

The scene renders two half-cells, a salt bridge, and an external circuit. When you choose a metal pair (Zn-Cu, Fe-Cu, Zn-Ag, or custom), the left beaker becomes the anode and the right beaker the cathode. Animated ions migrate through the salt bridge while electron dots run through the wire to a glowing bulb whenever the cell is spontaneous. Concentration sliders feed the Nernst equation so you can see the actual cell potential, whether the reaction remains spontaneous, and how cell notation updates. Half-reactions and the overall reaction appear below the beakers for quick reference.

## How to use

1. Select a **Galvanic cell** from the dropdown; pick **Custom** to enter your own electrode labels and standard reduction potentials.
2. Adjust the **Anode ion concentration** and **Cathode ion concentration** sliders (0.001-2.000 M). The solution colors deepen as concentration increases, and the computed Nernst potential updates instantly.
3. For the custom option, type electrode names/ions and reduction potentials (in volts). The calculator recomputes the standard potential from your entries.
4. Watch the wiring animation: yellow electron dots move from anode to cathode when $E > 0$. If conditions make the cell non-spontaneous, the animation reverses and a red warning overlay appears.
5. Read the live **cell notation**, **half-reactions**, **overall reaction**, and the table showing $E^\circ$ plus the actual $E$ value so you can explain what drives the cell.

## Learning goals (Step 1)

| Item | Details |
|------|---------|
| Subject area | Chemistry - electrochemistry |
| Grade band | AP Chemistry / introductory college |
| Learning objective | Students will explain galvanic cell components, direction of electron/ion flow, and connect cell notation plus Nernst-calculated potentials to the observed animation. |
| Bloom's level | Understand / Apply |
| Duration | 12-15 minutes (demo plus guided exploration) |
| Prerequisites | Oxidation vs reduction, standard reduction potentials, Nernst equation, cell notation |
| Assessment ideas | Ask students to screenshot a non-spontaneous configuration and describe what changed, or have them match three cell notations to the correct animation/indicator of electron flow. |

## Instructional design review (Step 1.5)

| Question | Target | Decision |
|----------|--------|----------|
| Single learning objective? | Yes | Focused on mapping physical/notation features of galvanic cells. |
| Number of controls | 1-5 | Four rows (dropdown + optional custom inputs, two concentration sliders, one custom potential row) stay within limits. |
| Progressive disclosure | Needed | Custom text inputs only appear when "Custom" is selected; warning overlay shows only when $E < 0$. |
| Cognitive load | Managed | Drawing clearly separates anode/cathode, color cues show charge flow, and tables summarize the math. |
| Accessibility | Required | Controls sit below the canvas with 16 px text, high-contrast colors, and descriptive labels. |

**Control inventory**

| # | Control type | Label text | Value format | Row |
|---|--------------|------------|--------------|-----|
| 1 | Dropdown + conditional text inputs | Galvanic cell selector / custom electrode fields | Dropdown plus optional text/number inputs | 1 |
| 2 | Slider | Anode ion concentration (M) | 0.001-2.000 M, logarithmic step 0.001 | 2 |
| 3 | Slider | Cathode ion concentration (M) | 0.001-2.000 M, logarithmic step 0.001 | 3 |
| 4 | Slider | Temperature (optional scenario) | 273-323 K, step 1 (affects Nernst slope) | 4 |

## Layout planning (Step 2.5)

- Number of control rows: 4
- controlHeight = (4 x 60) + 40 = 280 px
- drawHeight = 600 px (title + beakers + salt bridge + info bars)
- canvasHeight = 600 + 280 = 880 px
- iframeHeight = 880 + 2 = 882 px
- sliderLeftMargin = 240 px (150 px label + 90 px readout buffer)
- margin = 26 px

**Position assignments**

```javascript
// Row 1 (cell selector + custom inputs)
controlRows[0].position(margin, drawHeight + 25);
// Row 2 (Anode concentration)
controlRows[1].position(margin, drawHeight + 95);
// Row 3 (Cathode concentration)
controlRows[2].position(margin, drawHeight + 165);
// Row 4 (Temperature slider)
controlRows[3].position(margin, drawHeight + 235);
```

**Label/value alignment**

```javascript
labelSpan.style('width', '150px');
valueSpan.style('width', '90px');
slot.style('width', '320px'); // slider widths expand dynamically in code
```

## Lesson plan

1. **Demo (5 min):** Instructor toggles between Zn-Cu (spontaneous) and a custom reversed cell to show why the external circuit stops when $E < 0$.
2. **Parameter lab (7 min):** Students adjust concentrations and temperature to see the Nernst response and record when the cell flips direction.
3. **Notation match (3 min):** Learners copy the displayed cell notation, write the accompanying half-reactions, and annotate the flow directions.

## References

1. Atkins & de Paula. *Physical Chemistry*, 11th ed., Oxford University Press, 2017 - Standard reduction potentials and galvanic cell analysis.
2. Petrucci, Herring, Madura. *General Chemistry*, 11th ed., Pearson, 2017 - Nernst equation applications and galvanic cell diagrams.
