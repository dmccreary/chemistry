---
title: Interactive Titration Calculator
description: Visualize strong or weak acid titrations by adjusting concentrations and volumes while watching the equivalence point update live.
quality_score: 0
---

# Interactive Titration Calculator

<iframe src="main.html" height="622px" width="100%" scrolling="no"></iframe>

[Run the Titration Calculator fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the simulation in the p5.js editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

The calculator overlays a slider-driven input panel with a responsive titration curve. Students choose between a strong acid–strong base titration and a weak acid–strong base titration, set concentrations/volumes, and immediately see the updated equivalence point volume, estimated equivalence pH, and full pH vs. volume curve. A dashed red line marks the equivalence point while a green reference line highlights pH 7.

## How to Use

1. Use the **Titration Type** dropdown to pick “Strong Acid / Strong Base” or “Weak Acid / Strong Base”.
2. Adjust the sliders for **Ca** (acid concentration), **Va** (acid volume), and **Cb** (base concentration). Values update the equation display and curve in real time.
3. Read the calculated **Volume at equivalence** and **Equivalence point pH** near the bottom of the input panel.
4. Observe how the blue titration curve and the red vertical marker shift as you change concentrations. Weak acids show a buffer region and a basic equivalence point; strong acids remain symmetric about pH 7.
5. Reference the footer reminder of the stoichiometric relationship \(M_a V_a = M_b V_b\) when explaining your results.

## Classroom Ideas

- **Curve Comparisons:** Have students capture screenshots for strong/strong vs. weak/strong cases using the same Ca, Va, and Cb values, then annotate the differences.
- **Design an Experiment:** Ask learners to select concentrations that put the equivalence volume around 25 mL so it fits comfortably within a 50 mL buret.
- **Mismatch Challenge:** Swap acid/base concentrations so Cb < Ca and discuss why the equivalence volume exceeds 50 mL.
- **Concept Check:** Use the MicroSim as a quick warm-up before lab to remind students of the Henderson–Hasselbalch buffer behavior for weak acids before equivalence.

## Lesson Plan

### Grade Level
Grades 11–12 (AP Chemistry Unit 4/5) and college general chemistry

### Duration
15-minute guided exploration or station activity during a titration unit

### Prerequisites
- Stoichiometric use of \(M V\)
- Acid–base neutralization equations
- Basic understanding of Henderson–Hasselbalch for weak acids

### Activities

1. **Demonstration (3 min):** Instructor models how slider adjustments shift the red equivalence marker and highlight percent differences between acid/base strengths.
2. **Hands-On (8 min):** Students complete a worksheet asking for equivalence volume, equivalence pH, and qualitative curve descriptions for three scenarios.
3. **Reflection (4 min):** Learners write a short explanation of why weak acids have an equivalence pH above 7 even when titrated with the same base concentration.

### Assessment
- Exit ticket: Provide Ca, Va, and Cb values and ask for the predicted equivalence volume and whether the curve will cross pH 7 at that point.
- Lab companion: Students must attach a screenshot of their chosen titration parameters before beginning a real buret titration.

## References

1. Brown, LeMay, Bursten, Murphy. *Chemistry: The Central Science*, 15th ed., Pearson, 2022 — Acid–base titration theory.
2. College Board. *AP Chemistry Course and Exam Description*, 2023 — Topic 4.7 (Titrations) and Topic 5.4 (Weak Acids and Bases).
