---
title: Mole Concept Conversion Triangle
description: Interactive mole conversion triangle that converts between mass, moles, and number of particles for a chosen substance and shows the step-by-step worked solution using molar mass and Avogadro's number.
image: /sims/mole-conversion-triangle/mole-conversion-triangle.png
og:image: /sims/mole-conversion-triangle/mole-conversion-triangle.png
twitter:image: /sims/mole-conversion-triangle/mole-conversion-triangle.png
social:
   cards: false
quality_score: 100
---

# Mole Concept Conversion Triangle

<iframe src="main.html" height="582px" width="100%" scrolling="no"></iframe>

[Run the Mole Concept Conversion Triangle MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Three quantities describe any sample of a pure substance: its **mass** in grams, its amount in **moles**, and its **number of particles** (atoms, molecules, or formula units). This MicroSim arranges them as a triangle with **moles at the top**, because every conversion passes through moles:

- Mass and moles are linked by the **molar mass** $M$: $n = m / M$ and $m = n \times M$
- Moles and particles are linked by **Avogadro's number**: $N = n \times N_A$ and $n = N / N_A$, with $N_A = 6.022 \times 10^{23}\ \text{mol}^{-1}$
- There is no one-step road between mass and particles. The dashed line along the bottom reminds you that this trip always takes two steps, through moles.

The orange arrows show the path used for the current problem, and the white panel writes out the worked solution with your numbers substituted. The default problem is the classic *"How many atoms are in 24.0 g of carbon?"*

## How to Use

1. **Choose a substance** from the Substance menu. Its molar mass appears in the worked solution.
2. **Choose the given quantity** (mass, moles, or particles) from the Given menu, or simply **click one of the three boxes** in the triangle.
3. **Type the amount.** Particles are entered in units of $10^{23}$, so typing `6.022` means $6.022 \times 10^{23}$ particles.
4. **Read the triangle and the two worked steps.** The orange arrows show which conversion factors were used and whether you multiplied or divided.
5. Press **Reset Example** to return to 24.0 g of carbon.

Calculated values are shown to four significant figures. On a quiz, round your own answer to the number of significant figures in the given data.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/chemistry/sims/mole-conversion-triangle/main.html"
        height="582px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (AP Chemistry, Chapter 2: Atomic Structure and Mass Spectrometry)

### Duration
10-15 minutes

### Learning Objectives

- **Apply:** Convert between mass, moles, and number of particles using molar mass and Avogadro's number.
- **Apply:** Decide whether each step of a conversion requires multiplying or dividing by the conversion factor.

### Prerequisites

- Atomic mass and how to calculate the molar mass of a compound from its formula
- Scientific notation and significant figures

### Activities

1. **Exploration** (3 min): With the default problem (24.0 g of carbon), trace the two orange arrows. Ask: *Why does the path from mass to atoms go up to moles first instead of straight across the bottom?*
2. **Predict, Then Check** (5 min): Switch the substance to water and the given quantity to 45.0 g. Before reading the panel, students calculate the moles and molecules on paper, then compare with the MicroSim (2.498 mol and $1.504 \times 10^{24}$ molecules, matching Examples 1 and 2 in the chapter).
3. **Reverse the Road** (4 min): Click the Particles box and enter `3.011`. Students explain why the arrows now point the other way and why the operations switched from multiply to divide.
4. **Assessment** (3 min): Give each student a different substance and mass. They write both conversion steps with units, showing how the units cancel, and use the MicroSim only to verify the final answers.

### Assessment

- Can the student state which conversion factor connects each pair of quantities?
- Can the student explain why a mass-to-particles problem needs two steps?
- Does the student's written work show units canceling at each step?

## References

1. [OpenStax Chemistry 2e, Section 3.1: Formula Mass and the Mole Concept](https://openstax.org/books/chemistry-2e/pages/3-1-formula-mass-and-the-mole-concept) - OpenStax - Free textbook section covering molar mass, Avogadro's number, and mass-mole-particle conversions.
2. [AP Chemistry Course and Exam Description](https://apcentral.collegeboard.org/courses/ap-chemistry) - College Board - Unit 1, Topic 1.1 (Moles and Molar Mass) defines the skills practiced here.
3. [Avogadro constant](https://physics.nist.gov/cgi-bin/cuu/Value?na) - NIST Reference on Constants, Units, and Uncertainty - The exact defined value $6.022\,140\,76 \times 10^{23}\ \text{mol}^{-1}$, rounded to $6.022 \times 10^{23}$ in this MicroSim.
