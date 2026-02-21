---
title: Gibbs Free Energy Spontaneity Explorer
description: Manipulate enthalpy, entropy, and temperature to visualize ΔG vs. temperature, sign quadrants, and crossover points for spontaneity.
quality_score: 0
---

# Gibbs free energy spontaneity explorer

<iframe src="main.html" height="882px" width="100%" scrolling="no"></iframe>

[Run the Gibbs Free Energy Explorer fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the MicroSim in the p5.js editor](https://editor.p5js.org/){ .md-button }

## About this MicroSim

The simulation graphs ΔG = ΔH − TΔS from 0–1500 K while a marker tracks the user-selected temperature. Three sliders control ΔH (kJ/mol), ΔS (J/mol·K), and temperature. Preset buttons jump to authentic processes (Haber process, melting ice, methane combustion, ATP hydrolysis), while an option toggle displays the calculated crossover temperature where ΔG would be zero. Colored regions reinforce the four spontaneity quadrants, and a legend summarizes the verbal rules for each sign combination.

## How to use

1. Move **ΔH (kJ/mol)** to simulate exothermic (negative) or endothermic (positive) enthalpy changes.
2. Adjust **ΔS (J/mol·K)** to represent entropy increases/decreases. Both sliders update the plot and text readouts instantly.
3. Drag **Temperature (K)** to slide the vertical marker and evaluate ΔG at the selected temperature.
4. Click any **Preset scenario** to load representative thermodynamic data for that process.
5. Activate **Show crossover info** to highlight the temperature where ΔG = 0 (if ΔS ≠ 0) and display whether temperatures above/below it are favorable.

## Classroom ideas

- **Quadrant sorting:** Assign groups different sign combinations and have them justify spontaneity at low/high temperatures using screenshots.
- **Industrial vs. biological:** Compare the preset Haber process to ATP hydrolysis to discuss why coupling exergonic reactions drives endergonic steps.
- **Solve-for-temperature practice:** Hide the crossover display, give students ΔH/ΔS values, and ask them to predict when ΔG will change sign before revealing the answer.
- **Assessment exit ticket:** Students capture ΔG, TΔS, and spontaneity values for three slider settings and explain each result in one sentence.

## Learning goals

| Item | Details |
|------|---------|
| Subject area | Chemistry — thermodynamics |
| Grade band | High school (Grades 11–12) and introductory college |
| Learning objective | Students will be able to analyze ΔH, ΔS, and temperature to determine whether a reaction is spontaneous by interpreting ΔG = ΔH − TΔS. |
| Bloom's level | Analyze / Apply |
| Duration | 10–12 minutes of guided exploration |
| Prerequisites | Understanding of enthalpy vs. entropy, Kelvin scale, and the ΔG equation |
| Assessment ideas | Quick-write predicting sign changes, screenshot annotations, or worked examples solving for crossover temperature |

## Instructional design review

- **Single objective confirmed:** Learners focus on using ΔH, ΔS, and T to predict spontaneity.
- **Control inventory (1.5 checklist):**

| Control | Type | Purpose |
|---------|------|---------|
| ΔH slider | Slider | Explore exothermic vs. endothermic scenarios |
| ΔS slider | Slider | Model entropy decrease/increase |
| Temperature slider | Slider | Evaluate ΔG at a chosen temperature |
| Preset scenarios | Buttons (4) | Provide authentic data points for comparison |
| Show crossover info | Checkbox | Optional guidance on ΔG = 0 temperature |

- **Progressive disclosure:** Advanced crossover guidance only appears if the checkbox is checked; otherwise students focus on sign reasoning.
- **Cognitive-load check:** Only three numeric controls with consistent slider rows; legend restates quadrant rules and colors match the shaded graph regions.
- **Accessibility considerations:** Large fonts (>13 px), minimum 14:1 contrast on text boxes, and no reliance on hover interactions.

## Lesson plan

### Grade level
Grades 11–12 (AP Chemistry Unit 6/9) and introductory thermodynamics courses

### Duration
10-minute demonstration plus 5 minutes of student manipulation or exit-ticket work

### Prerequisites
- Ability to convert between kJ/mol and J/mol
- Familiarity with entropy trends and spontaneity language
- Experience interpreting two-variable plots

### Activities

1. **Launch demo (3 min):** Teacher shows each sign quadrant and explains how ΔH and ΔS signs set the default rule.
2. **Guided exploration (7 min):** Students adjust sliders, record ΔG at 298 K, and calculate crossover temperatures for assigned presets.
3. **Synthesis (5 min):** Learners explain how coupling (e.g., ATP hydrolysis) can drive an endergonic reaction by shifting overall ΔG.

### Assessment
- Exit ticket: “Given ΔH = 35 kJ/mol and ΔS = 85 J/mol·K, find if the reaction is spontaneous at 400 K and 900 K.”
- Extension: Students capture a screenshot labeling ΔH, TΔS, ΔG, and the crossover marker, plus a one-sentence interpretation.

## References

1. Atkins, P. & de Paula, J. *Physical Chemistry*, 11th ed., Oxford University Press, 2017 – Thermodynamics and free energy.
2. Silberberg, M. *Chemistry: The Molecular Nature of Matter and Change*, 9th ed., McGraw-Hill, 2021 – Entropy, enthalpy, and spontaneity clauses.
