---
title: Mechanism Step Explorer
description: Watch reactants collide, form an intermediate, and regenerate species while tracking concentrations for a two-step catalytic mechanism.
quality_score: 0
---

# Mechanism Step Explorer

<iframe src="main.html" height="842px" width="100%" scrolling="no"></iframe>

[Run the Mechanism Step Explorer fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the MicroSim in the p5.js editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

The simulation divides the canvas into a molecular animation panel and a concentration panel. Particles representing A, B, C (intermediate), D, and E move randomly and react when they collide: A + B → C (slow) and C + D → E + A (fast). Sliders control the rate-determining step speed and initial molecule counts. The right panel plots live bar charts for species concentrations, illustrating C build-up when step 1 is slow and its consumption/regeneration cycle in step 2.

## How to Use

1. Adjust **Rate-Determining Step Speed** to slow down or speed up step 1 relative to step 2. Higher values make step 1 slower, allowing C to accumulate.
2. Use the initial count sliders (A, B, D) to set starting amounts. Press **Reset** to apply new values.
3. Click **Pause/Play** to observe the system frame by frame. Watch the bar chart on the right to see how concentrations shift.
4. Observe the animation: yellow C intermediates appear when A and B collide, and they disappear when they meet purple D, regenerating blue A and producing red E.

## Classroom Ideas

- **Rate-limiting concept:** Have students compare concentration curves for different slider positions and explain why C accumulates when step 1 is slow.
- **Mechanism storytelling:** Ask learners to narrate the two-step mechanism using particle colors while the animation runs.
- **Quantitative tie-in:** Challenge students to estimate the relative rates by counting how many C particles exist at steady state for different slider values.
- **What-if scenarios:** Change initial reactant counts to illustrate how limiting reactants and intermediates respond.

## Lesson Plan

### Grade Level
Grades 11–12 (AP Chemistry Unit 5) and introductory college kinetics/mechanism lessons

### Duration
15 minutes as a guided exploration or lab warm-up

### Prerequisites
- Understanding of reaction mechanisms and rate-determining steps
- Familiarity with intermediates vs. catalysts
- Qualitative interpretation of concentration vs. time

### Activities

1. **Demo (3 min):** Instructor slows step 1 and points out C accumulation and bar chart changes.
2. **Guided practice (8 min):** Students try three slider settings, recording qualitative observations about C and E concentrations.
3. **Reflection (4 min):** Learners write one sentence linking the slider (step 1 speed) to the concept of the rate-determining step.

### Assessment
- Exit ticket: “Why does a slower step 1 cause the intermediate to build up? Explain using the animation.”
- Homework extension: students screenshot the bar chart and describe how catalyst regeneration is shown in the animation.

## References

1. Petrucci et al., *General Chemistry: Principles and Modern Applications*, 12th ed., Pearson, 2022 — Reaction mechanisms and intermediates.
2. House, J. E., *Principles of Chemical Kinetics*, 3rd ed., Academic Press, 2015 — Rate-determining steps and catalytic cycles.
