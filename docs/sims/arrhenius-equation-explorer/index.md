---
title: Arrhenius Equation Explorer
description: Adjust activation energy, frequency factor, and temperature range to compare rate constants and Arrhenius plots in real time.
quality_score: 0
---

# Arrhenius Equation Explorer

<iframe src="main.html" height="622px" width="100%" scrolling="no"></iframe>

[Run the Arrhenius Explorer fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the MicroSim in the p5.js editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

The explorer pairs a control panel (activation energy, frequency factor, temperature-range slider, comparison checkbox) with two linked plots: **k vs. temperature** and an **Arrhenius plot** (ln k vs. 1/T). Students can immediately see how Ea and A shape both the curvature of k vs. T and the slope of the Arrhenius plot. A readout box reports rate constants at 298 K and 500 K for quick comparison.

## How to Use

1. Set the **Ea** slider to explore low- versus high-activation energy reactions (20–150 kJ/mol).
2. Adjust the **A (×10¹⁰ s⁻¹)** slider to scale the frequency factor (pre-exponential term) and see how it shifts k values without changing slope.
3. Modify the **Tₘₐₓ** slider to extend the temperature window of the plots (200 K to up to 1200 K).
4. Check **Show reference curve** to overlay a dashed comparison curve with Ea = 40 kJ/mol, keeping the same A value.
5. Watch the blue k vs. T curve and red Arrhenius line update in real time; the slope label shows −Ea/R.

## Classroom Ideas

- **Sensitivity Analysis:** Have students document how doubling Ea affects the calculated k at 298 K vs. 500 K.
- **Compare two reactions:** Use the reference curve to contrast enzymes (low Ea) with uncatalyzed reactions (high Ea) on the same axes.
- **Two-temperature derivation:** Ask learners to estimate Ea by reading ln k at two temperatures and comparing to the provided slope.
- **Lab prep:** Before kinetics labs, use the simulator to illustrate why reactions with large Ea respond dramatically to small temperature increases.

## Lesson Plan

### Grade Level
Grades 11–12 (AP Chemistry Unit 5) and college kinetics courses

### Duration
15 minutes as a mini-lab or warm-up before Arrhenius equation problem sets

### Prerequisites
- Natural log manipulation
- Arrhenius equation form (k = Ae^(−Ea/RT))
- Units and conversions for activation energy and the gas constant

### Activities

1. **Instructor Demo (3 min):** Show the two plots and point out how the slope on the Arrhenius plot equals −Ea/R.
2. **Guided Exploration (8 min):** Students capture screenshots for two different Ea values, recording k at 298/500 K and the Arrhenius slope.
3. **Wrap-Up (4 min):** Learners write a short explanation of why a high-Ea reaction is more temperature-sensitive than a low-Ea reaction.

### Assessment
- Exit ticket: “If Ea increases from 50 to 80 kJ/mol, describe what happens to the slope of ln k vs. 1/T and to k at 298 K.”
- Pairs submit a side-by-side screenshot comparing their chosen reaction with the reference curve, highlighting slope differences.

## References

1. House, J. E. *Principles of Chemical Kinetics*, 3rd ed., Academic Press, 2015 — Arrhenius equation fundamentals.
2. Atkins & de Paula. *Physical Chemistry*, 11th ed., Oxford University Press, 2017 — Activation energy and Arrhenius plots.
