---
title: Microstate Visualizer
description: Animate particles in a divided container while tracking microstate counts, probabilities, and entropy.
quality_score: 0
---

# Microstate Visualizer

<iframe src="main.html" height="762px" width="100%" scrolling="no"></iframe>

[Run the microstate explorer fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the MicroSim in the p5.js editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

Blue and orange particles bounce inside a container split into left/right halves. You can adjust the particle count, randomize distributions, remove the wall, and highlight any macrostate. A bar chart shows the binomial distribution of microstates (W) for each macrostate, along with ln(W) and S = k_B ln(W).

## How to Use

1. Move the **N slider** to set the number of particles.
2. Press **Randomize Distribution** to redistribute particles between halves at random.
3. Toggle **Remove Wall** to let particles mix freely (wall returns when pressed again).
4. Use the **Highlight macrostate** dropdown to emphasize a particular left:right ratio in the bar chart.
5. Read the live W, ln(W), and S values beneath the chart.

## Classroom Ideas

- **Probability storytelling:** Students narrate what happens to W as N increases and explain why the peak moves toward N/2.
- **Entropy discussion:** Use the bar chart to connect S = k_B ln(W) with macroscopic spontaneity.
- **Data recording:** Learners set N to different values and record W for the 50:50 distribution, then calculate S manually to verify the display.

## Lesson Plan

### Grade Level
Grades 11–12 (AP Chemistry Unit 7) and introductory statistical thermodynamics

### Duration
10–12 minutes as a guided exploration or homework companion

### Prerequisites
- Definition of microstates vs. macrostates
- Boltzmann equation S = k_B ln(W)

### Activities

1. **Demo (3 min):** Instructor shows how W skyrockets near N/2 as N increases.
2. **Guided slider practice (6 min):** Students try N = 6, 10, 14 and compare W(0:N), W(N/2:N/2).
3. **Reflection (3 min):** Learners explain why ΔS > 0 when the wall is removed.

### Assessment
- Exit ticket: “Why does the 50:50 macrostate dominate for large N?”
- Homework extension: Students capture a screenshot with N = 12 and calculate S from W and k_B.

## References

1. Atkins & de Paula, *Physical Chemistry*, 11th ed., Oxford University Press, 2017 — Microstates and entropy.
2. Baierlein, *Thermal Physics*, Cambridge University Press, 1999 — Boltzmann statistics and combinatorics.
