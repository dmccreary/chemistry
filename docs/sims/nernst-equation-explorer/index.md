---
title: Nernst Equation Explorer
description: Calculate non-standard cell potentials with interactive concentrations, electron counts, and live E vs log Q plotting.
quality_score: 0
---

# Nernst equation explorer

<iframe src="main.html" height="882px" width="100%" scrolling="no"></iframe>

[Run the Nernst Equation Explorer fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the MicroSim in the p5.js editor](https://editor.p5js.org/){ .md-button }

## About this MicroSim

The explorer combines a stylized galvanic cell diagram with a live Nernst calculator. Choose a reaction preset (Zn-Cu, Fe-Cu, concentration cell) or define custom $E0$ and $n$ values, then drag the oxidized and reduced concentration sliders (0.001-2.000 M). The voltmeter, electron flow arrows, and color-coded readout respond immediately, while the computation panel shows $Q$, $\,\log Q$, the substituted Nernst equation, and $\Delta G = -nFE$ in kJ/mol. A mini graph traces the linear relationship between $E$ and $\log Q$, highlighting the current operating point.

## How to use

1. Pick a **reaction** from the dropdown. Presets auto-fill $E0$ and $n$, but you can adjust them; the **Custom** option reveals text inputs for electrode labels and potentials.
2. Drag the **Standard potential (E0)** slider to explore hypothetical cells (range -1.50 to +1.50 V).
3. Set the **Electrons transferred (n)** slider (1-4) to match the balanced reaction.
4. Adjust the **Oxidized concentration (anode)** and **Reduced concentration (cathode)** sliders (0.001-2.000 M). These values feed $Q = [\text{ox}]^a/[\text{red}]^b$.
5. Read the dynamic outputs: voltmeter color (green for $E>0$, red for $E<0$), full Nernst calculation, $Q$ and $\log Q$, and the plotted point on the $E$ vs $\log Q$ line.

## Learning goals (Step 1)

| Item | Details |
|------|---------|
| Subject area | Chemistry - electrochemistry |
| Grade band | AP Chemistry / introductory college |
| Learning objective | Students will apply the Nernst equation to predict cell potentials at non-standard concentrations and explain how $Q$ and $n$ influence $E$. |
| Bloom's level | Apply |
| Duration | 12-15 minutes |
| Prerequisites | Balanced redox reactions, cell notation, equilibrium expressions, $\log$ rules |
| Assessment ideas | Learners capture two scenarios (spontaneous vs non-spontaneous) and justify the sign of $E$ via $Q$; quick-write comparing how doubling $n$ changes the slope in $E$ vs $\log Q$. |

## Instructional design review (Step 1.5)

| Question | Target | Decision |
|----------|--------|----------|
| Single learning objective? | Yes | Focused on linking Nernst math to cell behavior. |
| Number of controls | 1-5 | Five rows (dropdown + two sliders + two more sliders) stay within limits. |
| Progressive disclosure | Needed | Custom text inputs appear only when Custom is selected; warning color only when $E \le 0$. |
| Cognitive load | Managed | Diagram occupies upper half; calculations and graph share the lower half with clear headings. |
| Accessibility | Required | Controls live below the canvas with >=16 px fonts, high-contrast readouts, and descriptive labels. |

**Control inventory**

| # | Control type | Label text | Value format | Row |
|---|--------------|------------|--------------|-----|
| 1 | Dropdown + conditional inputs | Reaction selector / custom electrode fields | Dropdown with optional text/number inputs | 1 |
| 2 | Slider | Standard potential (E0, V) | -1.50 to +1.50 V, step 0.01 | 2 |
| 3 | Slider | Electrons transferred (n) | 1-4 (integer) | 3 |
| 4 | Slider | Oxidized concentration (M) | 0.001-2.000 M, step 0.001 | 4 |
| 5 | Slider | Reduced concentration (M) | 0.001-2.000 M, step 0.001 | 5 |

## Layout planning (Step 2.5)

- Number of control rows: 5
- controlHeight = (5 x 60) + 40 = 340 px
- drawHeight = 600 px (diagram + voltmeter + equation/graph region)
- canvasHeight = 600 + 340 = 940 px
- iframeHeight = 940 + 2 = 942 px
- sliderLeftMargin = 240 px (150 px label + 90 px value buffer)
- margin = 28 px

**Position assignments**

```javascript
// Row 1 (reaction selector + custom inputs)
controlRows[0].position(margin, drawHeight + 25);
// Row 2 (standard potential slider)
controlRows[1].position(margin, drawHeight + 95);
// Row 3 (n slider)
controlRows[2].position(margin, drawHeight + 165);
// Row 4 (oxidized concentration slider)
controlRows[3].position(margin, drawHeight + 235);
// Row 5 (reduced concentration slider)
controlRows[4].position(margin, drawHeight + 305);
```

**Label/value alignment**

```javascript
labelSpan.style('width', '150px');
valueSpan.style('width', '90px');
slot.style('width', '320px'); // slider widths expand dynamically via code
```

## Lesson plan

1. **Demo (4 min):** Instructor toggles between Zn-Cu and the concentration cell to illustrate how $Q$ shifts $E$ even when $E0 = 0$.
2. **Slider lab (7 min):** Students aim for $E = 0$ by tuning concentrations, then record the $Q$ value and explain the physical meaning (equilibrium).
3. **Graph link (4 min):** Learners compare slopes when $n=1$ vs $n=3$ and note how the $E$ vs $\log Q$ line steepens or flattens.

## References

1. Atkins & de Paula. *Physical Chemistry*, 11th ed., Oxford University Press, 2017 - Derivation and interpretation of the Nernst equation.
2. Housecroft & Sharpe. *Inorganic Chemistry*, 4th ed., Pearson, 2012 - Concentration cells and $Q$ expressions in electrochemistry.
