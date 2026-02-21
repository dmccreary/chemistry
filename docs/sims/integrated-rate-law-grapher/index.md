---
title: Integrated Rate Law Grapher
description: Explore zero, first, and second order concentration-time plots simultaneously to identify the linear integrated rate law and extract k.
quality_score: 0
---

# Integrated Rate Law Grapher

<iframe src="main.html" height="702px" width="100%" scrolling="no"></iframe>

[Run the grapher fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the MicroSim in the p5.js editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

Three stacked plots show $[A]$ vs. $t$, $\ln [A]$ vs. $t$, and $1/[A]$ vs. $t$ for the same initial conditions. Choosing the reaction order highlights the linear plot (green tint) and displays the slope, reinforcing which integrated rate law applies. Sliders let you change $k$, $[A]_0$, and the time window; the graph responds immediately.

## How to Use

1. Choose **Reaction Order** (zero, first, or second). The linear plot will turn green with a label noting the order.
2. Adjust **k**, **[A]₀**, and **Time Range** sliders to see how concentration profiles change. Units update automatically.
3. Read the slope text beneath the linear plot to obtain $k$ from its negative (zero/first order) or positive (second order) slope.
4. Press **Reset** to return to the default first-order scenario.

## Classroom Ideas

- **Order Detection:** Give students mystery data points, then have them match the linear plot in the MicroSim to determine reaction order.
- **Lab Companion:** Use the grapher alongside a kinetics experiment to predict which plot should be linear before fitting real data.
- **Slope Practice:** Ask learners to write down $k$ from the slope readout and check it against the slider value for each order.
- **Comparative Analysis:** Have groups compare how quickly concentrations drop for different orders but identical initial conditions.

## Lesson Plan

### Grade Level
Grades 11–12 (AP Chemistry Unit 5) and college kinetics

### Duration
15-minute guided exercise or homework helper

### Prerequisites
- Understanding of zero/first/second order integrated rate laws
- Comfort with natural logarithms and reciprocal plots
- Ability to interpret slope as the rate constant

### Activities

1. **Demo (3 min):** Teacher shows how the linear plot shifts when the order dropdown changes.
2. **Hands-on (8 min):** Students adjust sliders to match preset scenarios and fill in a worksheet (order, $k$, slope relation).
3. **Wrap-up (4 min):** Learners write one sentence explaining why only one plot is linear for each reaction order.

### Assessment
- Exit ticket: “In a first-order reaction with $k = 0.30\,\text{s}^{-1}$, which plot is linear and what is its slope?”
- Homework: Students copy the MicroSim’s slope text for all three orders and annotate the integrated rate laws they correspond to.

## References

1. Chang & Goldsby, *Chemistry*, 13th ed., McGraw Hill, 2019 — Integrated rate law derivations.
2. College Board, *AP Chemistry Course and Exam Description*, 2023 — Topic 5.1 (reaction order and rate laws).
