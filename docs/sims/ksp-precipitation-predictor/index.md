---
title: Ksp Precipitation Predictor
description: Mix ionic solutions, compare Q vs Ksp for common salts, and visualize precipitation in animated beakers.
quality_score: 0
---

# Ksp precipitation predictor

<iframe src="main.html" height="842px" width="100%" scrolling="no"></iframe>

[Run the Ksp Predictor fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the MicroSim in the p5.js editor](https://editor.p5js.org/){ .md-button }

## About this MicroSim

Students choose a sparingly soluble salt (AgCl, PbI₂, BaSO₄, Ag₂CrO₄, CaCO₃), enter ion concentrations directly or toggle mixing mode to provide volumes and concentrations of separate solutions. The tool computes the ion product Q, displays the full expression with substituted numbers, shows Q vs Ksp on a logarithmic bar, and animates precipitation in twin beakers when Q exceeds Ksp.

## How to use

1. Select a **salt** to load its Ksp value and stoichiometry.
2. Enter **cation and anion concentrations** (mol L⁻¹) or activate **Mixing mode** to supply volumes and concentrations of two solutions; the MicroSim auto-dilutes them after mixing.
3. Click **Calculate Q** to compare the ion product to Ksp and read the verdict card.
4. Use the **Mix solutions** button under the beakers to visualize the two solutions combining; if Q > Ksp, particles settle into a solid precipitate at the bottom.
5. Change salts or concentrations to practice borderline cases with Q slightly below or above Ksp.

## Classroom ideas

- **Threshold hunting:** Challenge students to adjust concentrations until Q is just larger than Ksp, then discuss why a precipitate forms.
- **Mixing practice:** Have learners calculate the diluted concentrations on paper, then verify with the Mixing mode outputs.
- **Salt comparisons:** Assign groups different salts to highlight how Ksp magnitude affects precipitation sensitivity.
- **Lab prep:** Before a qualitative analysis lab, model the combinations of ions that will precipitate and those that remain soluble.

## Learning goals

| Item | Details |
|------|---------|
| Subject area | Chemistry — solubility equilibria |
| Grade band | Grades 11–12 and introductory college |
| Learning objective | Students will evaluate the ion product Q for a chosen salt and determine whether a precipitate forms by comparing Q to Ksp, accounting for dilution when solutions are mixed. |
| Bloom's level | Apply / Analyze |
| Duration | 10 minutes |
| Prerequisites | Understanding of Ksp expressions, ability to compute Q, and familiarity with dilution (C₁V₁ = C₂V₂) |
| Assessment ideas | Quick calculations comparing Q and Ksp, screenshot reflections explaining the verdict, or practice worksheets using the Mixing mode outputs |

## Instructional design review

- **Single objective:** “Students will be able to use Q vs Ksp to predict precipitation outcomes for ionic salts.” ✔️
- **Control inventory:**

| Control | Type | Purpose |
|---------|------|---------|
| Salt selector | Dropdown | Loads Ksp and stoichiometry |
| Concentration inputs | Number inputs | Set [cation] and [anion] directly |
| Mixing mode toggle | Checkbox | Reveals volume/concentration inputs for each solution |
| Volume/concentration fields | Number inputs | Compute diluted concentrations after mixing |
| Calculate button | Button | Computes Q and updates the visualization |

- **Progressive disclosure:** Mixing inputs appear only when needed; verdict and precipitation animation update after Calculate.
- **Cognitive load:** Icons, colors, and explanatory text make it clear whether Q < or > Ksp.
- **Accessibility:** Font sizes ≥14 px in the control region, color plus icon cues in the verdict, and logarithmic bar for large magnitude differences.

## Lesson plan

### Grade level
AP Chemistry Unit 8 (Solubility Equilibria) or introductory college chemistry

### Duration
10-minute warm-up or guided lab companion

### Prerequisites
- Writing Ksp expressions from dissolution equations
- Dilution calculations (C₁V₁ = C₂V₂)
- Familiarity with molarity units

### Activities

1. **Demo (3 min):** Instructor shows AgCl at low concentrations (no precipitate) and then increases [Cl⁻] to trigger precipitation.
2. **Student exploration (5 min):** Learners pick salts, explore mixing scenarios, and note when precipitation begins.
3. **Share out (2 min):** Groups explain their findings and how Q vs Ksp guided predictions.

### Assessment
- Exit ticket: Provide concentrations/volumes for a salt and ask whether a precipitate forms, supported by Q and Ksp values.
- Screenshot reflection: Students capture the Q vs Ksp bar and explain the verdict text in their own words.

## References

1. Brown, LeMay, Bursten. *Chemistry: The Central Science*, 15th ed., Pearson, 2022 — Solubility product calculations.
2. Tro, N. J. *Chemistry: A Molecular Approach*, 5th ed., Pearson, 2020 — Ion product vs Ksp decision framework.
