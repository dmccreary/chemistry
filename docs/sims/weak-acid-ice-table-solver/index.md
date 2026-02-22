---
title: Weak Acid ICE Table Solver
description: Enter a weak acid concentration and Ka to generate a complete ICE table, solve for pH, and visualize percent ionization.
quality_score: 0
---

# Weak acid ICE table solver

<iframe src="main.html" height="820px" width="100%" scrolling="no"></iframe>

[Run the Weak Acid Solver fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the MicroSim in the p5.js editor](https://editor.p5js.org/){ .md-button }

## About this MicroSim

Type in any monoprotic weak acid concentration and $K_a$, give it an optional label, then click **Calculate** to render the full ICE table, $K_a$ expression, and solution steps (including approximation checks and quadratic fallback). A percent-ionization gauge helps students interpret how dilution and $K_a$ affect ionization.

## How to use

1. Set the **acid name (optional)**, **initial concentration** (mol/L), and **$K_a$**.
2. Click **Calculate**. The ICE table populates with Initial, Change, and Equilibrium values.
3. Review the $K_a$ expression, approximation verdict, and quadratic solution if needed.
4. Read pH, pOH, $[\ce{H^+}]$, $[\ce{OH^-}]$, and percent ionization in the results panel.
5. Adjust the inputs to compare different weak acids or concentrations.

## Learning goals

| Item | Details |
|------|---------|
| Subject area | Chemistry — acid/base equilibrium |
| Grade band | Grades 11–12 and introductory college |
| Learning objective | Students will set up and solve ICE tables for weak acids, deciding whether the small-x approximation is valid. |
| Bloom's level | Apply / Analyze |
| Duration | 12 minutes |
| Prerequisites | Acid dissociation constant ($K_a$), ICE tables, logarithms |
| Assessment ideas | Learners screenshot the table and explanation for two acids; exit ticket explains when quadratic solutions are necessary |

## Instructional design review

- **Single objective:** “Use ICE tables to solve weak-acid equilibria.” ✔️
- **Controls:** three text inputs + a Calculate button; results update only after pressing the button to keep cognitive load low.
- **Accessibility:** High-contrast table, large fonts, keyboard-friendly inputs.

## Lesson plan

1. **Demo (4 min):** Show acetic acid default (0.100 M, $K_a = 1.8×10^{-5}$). Point out each ICE row.
2. **Student practice (6 min):** Learners run two acids (e.g., HF and formic acid) to compare pH and % ionization.
3. **Debrief (2 min):** Discuss why dilution increases percent ionization even though total [H⁺] decreases.

## References

1. Brown, LeMay, Bursten. *Chemistry: The Central Science*, 15th ed., Pearson, 2022 — Weak acid equilibria.
2. Tro, N. J. *Chemistry: A Molecular Approach*, 5th ed., Pearson, 2020 — ICE table methodology.
