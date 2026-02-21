---
title: Interactive Heating Curve Simulator
description: Animate a phase-change heating curve, compare four substances, and visualize how energy is partitioned between temperature changes and latent heat.
quality_score: 0
---

# Interactive Heating Curve Simulator

<iframe src="main.html" height="542px" width="100%" scrolling="no"></iframe>

[Run the Interactive Heating Curve Simulator fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the simulation in the p5.js editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

The simulator animates a classic heating curve with five labeled segments: solid heating, melting, liquid heating, boiling, and gas heating. Students can switch among water, ethanol, benzene, and naphthalene to see how melting points, boiling points, specific heats, and latent heats change the lengths of slopes and plateaus. A right-hand panel lists the thermodynamic data for the current substance, while optional pie charts reveal what fraction of the total energy budget is spent on temperature changes versus phase changes.

## How to Use

1. Choose a substance from the **Select substance** dropdown. The graph rescales to include that substance's melting and boiling points. The simulator loads in a paused state so nothing animates until you start it.
2. Use the **Start/Pause** button in the lower-left corner to begin, freeze, or resume the animation.
3. Adjust the **Heating rate** slider (1x-5x) to accelerate or slow the animation that draws the heating curve from left to right.
4. Hover over any point on the drawn curve to see a tooltip with the current phase, temperature, and total heat added (in kJ).
5. Toggle **Show energy breakdown pie chart** to display the proportional energy use in each segment.
6. Click anywhere inside the graph to restart the animation from zero heat if you want to replay a scenario after changing a control.

## Insights to Explore

- Compare how water's large \(\Delta H_{\text{vap}}\) makes the boiling plateau dominate the total energy compared to benzene or ethanol.
- Note that higher specific heats lead to gentler slopes (less temperature rise per unit of heat) even when the animation speed is unchanged.
- Ask students why the gas-heating segment for naphthalene spans a much larger temperature window than the corresponding segment for ethanol.
- Encourage learners to reason about hydrogen bonding strength versus molecular mass using the static property readout.

## Iframe Embed Code

```html
<iframe src="main.html" height="542px" width="100%" scrolling="no"></iframe>
```

Remember to capture a preview image (PNG) of the MicroSim and place it at `docs/sims/heating-curve-simulator/heating-curve-simulator.png` for use in social previews.

## Lesson Plan

### Grade Level
Grades 10-12 (pre-AP Chemistry, AP Chemistry Unit 3)

### Duration
10-15 minutes for guided exploration or lecture support

### Prerequisites
- Interpreting temperature vs. heat graphs
- Familiarity with specific heat, enthalpy of fusion, and enthalpy of vaporization
- Qualitative understanding of how intermolecular forces affect phase-change temperatures

### Activities

1. **Launch & Predict (3 min):** Show the water curve at 1x and ask students to label each segment in their notes before the animation finishes.
2. **Compare Substances (5 min):** Assign teams different substances and have them note how the plateau lengths relate to \(\Delta H_{\text{fus}}\) and \(\Delta H_{\text{vap}}\).
3. **Energy Accounting (4 min):** Enable the energy pie chart and discuss why latent heat dominates water's curve. Prompt students to estimate the percentage spent on phase changes for another substance.
4. **Extension (optional):** Have students sketch how the curve would change if the heating rate doubled but the thermodynamic data remained constant (answer: slopes would be traversed faster in time, but energy vs. temperature shape stays the same).

### Assessment
- Exit ticket: "Explain why the boiling plateau lasts longer for water than for ethanol even though ethanol boils at a lower temperature."
- Quick calculation: Given the sample mass (100 g), estimate how many kJ are required to melt then heat water from 0 to 100 deg C and compare to ethanol using the property readout.

## References

1. Petrucci, Herring, Madura, Bissonnette. *General Chemistry: Principles and Modern Applications*, 12th ed., Pearson, 2022 - Phase changes and heating curves.
2. Atkins & de Paula. *Physical Chemistry*, 11th ed., Oxford University Press, 2017 - Thermodynamic data tables for common substances.
