---
title: Dissolution Equilibrium Visualizer
description: Watch a sparingly soluble salt reach dynamic equilibrium, track Q vs Ksp, and test the common-ion effect with animated ions.
quality_score: 0
---

# Dissolution equilibrium visualizer

<iframe src="main.html" height="780px" width="100%" scrolling="no"></iframe>

[Run the Dissolution Visualizer fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the MicroSim in the p5.js editor](https://editor.p5js.org/){ .md-button }

## About this MicroSim

This animation shows a sparingly soluble salt (AgCl, BaSO₄, PbI₂, or CaCO₃) dissolving inside a container. The bottom crystal shrinks as ions enter solution, particles move randomly in the solvent, and a live chart reports [cation], [anion], and the ion product Q relative to Ksp. Buttons inject a common ion or more solid to reveal how equilibrium responds, while a temperature slider demonstrates faster or slower dissolution kinetics.

## How to use

1. Pick a **salt preset** to load its Ksp and initial crystal size.
2. Watch ions dissolve until the Q marker meets Ksp and the status reads “Equilibrium!”.
3. Click **Add common ion** to flood the solution with the shared anion and observe Q > Ksp, precipitation, and a regrowing crystal.
4. Use **Add more solid** to drop additional crystal mass; if Q < Ksp, dissolution resumes.
5. Adjust the **Temperature slider** to speed up or slow down the forward/reverse rates.
6. Read the **bottom info bar** for the formula, Ksp value, molar solubility, and live Q.

## Classroom ideas

- Compare two salts’ equilibrium particle counts and relate them to Ksp magnitudes.
- Use screenshots of the Q vs Ksp chart before and after adding a common ion to explain Le Chatelier’s principle.
- Run the simulation twice, once at low temperature and once high, to discuss kinetic vs thermodynamic effects.
- Ask students to predict how much the crystal regrows after a common-ion addition, then verify in the sim.

## Learning goals

| Item | Details |
|------|---------|
| Subject area | Chemistry — solubility equilibria |
| Grade band | Grades 11–12 and introductory college |
| Learning objective | Students will describe how dissolution reaches dynamic equilibrium and explain how the common-ion effect shifts Q relative to Ksp. |
| Bloom's level | Understand / Analyze |
| Duration | 10 minutes |
| Prerequisites | Ksp expressions, ion product comparisons, qualitative idea of the common-ion effect |
| Assessment ideas | Prompt students to capture Q and status before/after a common-ion addition, or to explain why adding more solid does not change Q once equilibrium is reached |

## Instructional design review

- **Single objective:** “Students will explain how Q approaches Ksp and how a common ion suppresses solubility.” ✔️
- **Control inventory:**

| Control | Type | Purpose |
|---------|------|---------|
| Salt selector | Dropdown | Choose Ksp/stoichiometry preset |
| Add common ion | Button | Injects shared ion to force precipitation |
| Add more solid | Button | Adds solid mass for dissolution |
| Temperature | Slider | Adjusts dissolution/precipitation rates |
| Reset | Button | Returns to initial state |

- **Progressive disclosure:** The status card and Q vs Ksp bar update automatically; no extra modals required.
- **Cognitive load:** Particle animation, chart, and text box remain in fixed panels; controls stay beneath the canvas per the p5 guide.

## Lesson plan

### Grade level
AP Chemistry Unit 9 (solubility equilibria) or introductory college chemistry

### Duration
10-minute teacher demo plus 5-minute student exploration

### Prerequisites
- Writing Ksp expressions from dissolution equations
- Comparing Q to Ksp to predict precipitation
- Conceptual understanding of Le Chatelier’s principle

### Activities

1. **Launch (3 min):** Demonstrate dissolution reaching equilibrium for AgCl and highlight the live Q trace.
2. **Common-ion test (5 min):** Students predict what happens before pressing “Add common ion,” then record observations.
3. **Extension (2 min):** Use the temperature slider to discuss kinetic vs thermodynamic factors in solubility.

### Assessment
- Exit ticket: “Explain why adding more solid at equilibrium does not change Q unless the solution is undersaturated.”
- Screenshot reflection: Students capture the chart before and after common-ion addition and describe the shift.

## References

1. Tro, N. J. *Chemistry: A Molecular Approach*, 5th ed., Pearson, 2020 — Common-ion effect and Ksp calculations.
2. Zumdahl & Zumdahl. *Chemistry*, 11th ed., Cengage, 2020 — Dynamic dissolution equilibrium diagrams.
