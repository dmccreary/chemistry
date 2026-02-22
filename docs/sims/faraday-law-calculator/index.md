---
title: Electrolysis Stoichiometry Calculator
description: Use Faraday's law to solve for deposited mass, time, or current in electrolytic systems with step-by-step visuals.
quality_score: 0
---

# Electrolysis stoichiometry calculator

<iframe src="main.html" height="822px" width="100%" scrolling="no"></iframe>

[Run the Electrolysis Stoichiometry Calculator fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the MicroSim in the p5.js editor](https://editor.p5js.org/){ .md-button }

## About this MicroSim

Radio buttons let students choose which quantity to solve for (mass deposited, required time, or required current). The input panel covers metal selection, molar mass, electrons per ion, current, time, and target mass as needed. Pressing **Calculate** walks through the Faraday chain with four animated boxes: total charge, moles of electrons, moles of metal, and mass. A mini electrolytic cell diagram on the right adds or removes particles in sync with the computed mass, and a reset button clears the form.

## How to use

1. Pick the **solve-for mode** (mass, time, or current) at the top.
2. Select a metal from the dropdown or choose **Custom** to enter molar mass and electrons per ion.
3. Enter the known values for current (A), time (min), and target mass (g). Only relevant fields are enabled for the chosen mode.
4. Click **Calculate** to highlight each Faraday step and display the result; the answer card shows both the numerical value and unit.
5. Press **Reset** to clear all fields and hide the step boxes.

## Learning goals (Step 1)

| Item | Details |
|------|---------|
| Subject area | Chemistry - electrochemistry |
| Grade band | AP Chemistry / introductory college |
| Learning objective | Students will apply Faraday's laws to convert between charge, moles of electrons, moles of substance, and deposited mass or required current/time. |
| Bloom's level | Apply |
| Duration | 10-12 minutes |
| Prerequisites | Redox half-reactions, stoichiometry, unit conversions (A = C/s) |
| Assessment ideas | Provide two electrolytic scenarios (e.g., Cu plating mass and Ag plating time) and have students document the calculator steps and reasoning. |

## Instructional design review (Step 1.5)

| Question | Target | Decision |
|----------|--------|----------|
| Single learning objective? | Yes | Focused on Faraday-law stoichiometry. |
| Number of controls | 1-5 | Four rows (radio buttons + dropdown, two numeric input rows, reset/calc buttons). |
| Progressive disclosure | Needed | Only relevant input fields and calculation steps are enabled per mode. |
| Cognitive load | Managed | Step-by-step boxes and visual cell keep the workflow linear. |
| Accessibility | Required | Controls live beneath the canvas with >16 px text and clear labels. |

**Control inventory**

| # | Control type | Label text | Value format | Row |
|---|--------------|------------|--------------|-----|
| 1 | Radio buttons | Solve for | Mass, time, or current | 1 |
| 2 | Dropdown + optional inputs | Metal selection / custom parameters | Predefined metals (Cu, Ag, Au, Al, Fe) or custom molar mass & electrons | 2 |
| 3 | Numeric inputs | Current (A), Time (min), Target mass (g) | Decimal values | 3 |
| 4 | Buttons | Calculate / Reset | Buttons | 4 |

## Layout planning (Step 2.5)

- Number of control rows: 4
- controlHeight = (4 x 60) + 40 = 280 px
- drawHeight = 540 px (title + diagram + step boxes)
- canvasHeight = 540 + 280 = 820 px
- iframeHeight = 820 + 2 = 822 px
- sliderLeftMargin = 240 px (150 px label + 90 px value field)
- margin = 26 px

**Position assignments**

```javascript
// Row 1 (solve-for radio group)
controlRows[0].position(margin, drawHeight + 25);
// Row 2 (metal dropdown + custom inputs)
controlRows[1].position(margin, drawHeight + 95);
// Row 3 (current/time/mass inputs)
controlRows[2].position(margin, drawHeight + 165);
// Row 4 (Calculate / Reset buttons)
controlRows[3].position(margin, drawHeight + 235);
```

**Label/value alignment**

```javascript
labelSpan.style('width', '150px');
valueSpan.style('width', '90px');
slot.style('width', '280px');
```

## Lesson plan

1. **Demo (3 min):** Instructor deposits copper by entering current and time; emphasize each Faraday step.
2. **Swap modes (5 min):** Students solve for time needed to plate a specific mass of silver, documenting the inputs and workflow.
3. **Challenge (3 min):** Groups create a custom ion (e.g., Al3+) and predict the plating mass for a given charge, checking with the sim.

## References

1. Petrucci, Harwood, Herring. *General Chemistry*, 9th ed., Pearson, 2007 — Electrolysis and Faraday's laws.
2. Tro, N. J. *Chemistry: A Molecular Approach*, 5th ed., Pearson, 2020 — Worked examples on electroplating stoichiometry.
