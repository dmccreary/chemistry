---
title: Le Chatelier's Principle Explorer
description: Apply concentration, pressure, temperature, and catalyst stresses to the Haber equilibrium while monitoring particles, bar charts, K, Q, and shift direction.
quality_score: 0
---

# Le Chatelier's principle explorer

<iframe src="main.html" height="840px" width="100%" scrolling="no"></iframe>

[Run the Le Chatelier Explorer fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the MicroSim in the p5.js editor](https://editor.p5js.org/){ .md-button }

## About this MicroSim

This explorer animates the $\ce{N2 + 3H2 <=> 2NH3}$ equilibrium. The left panel displays particle counts responding to stresses, the right panel tracks concentration bars with dashed equilibrium references, and a status strip reports the instantaneous reaction quotient $Q$, equilibrium constant $K$, and the predicted shift (“Shifting forward ▶”, “Shifting reverse ◀”, or “At equilibrium ✓”). Buttons apply each stress category: concentration changes, pressure/volume, temperature, inert gas addition, catalyst, and reset.

## How to use

1. Watch the **particle box** (left) and **bar chart** (right) at equilibrium (green verdict).
2. Use **Row 1** concentration buttons to add/remove $\ce{N2}$ or $\ce{NH3}$ and observe instant Q jumps.
3. Try **pressure/volume changes** (Row 2) and note how compressing favors the side with fewer moles of gas.
4. Click **temperature buttons** (Row 3) to modify K (exothermic reaction), then compare Q vs K.
5. Test the **catalyst** and **inert gas** buttons: the callouts explain why equilibrium position does or does not change.
6. Use **Reset** anytime to return to 450 °C, baseline K, and initial concentrations.

## Classroom ideas

- **Stress sorting:** Call out a stress (e.g., “Add products”), have students predict the shift, then press the matching button to verify the verdict.
- **Q vs K journaling:** Students pause after each stress to jot down the new Q and how it compares to K.
- **Industrial engineering link:** Discuss why real Haber reactors recycle $\ce{N2}$/$\ce{H2}$ and operate under high pressure; replicate by using the concentration and compression buttons.
- **Misconception repair:** Use the inert gas and catalyst buttons to demonstrate stresses that *do not* change equilibrium position even though the animation responds.

## Learning goals

| Item | Details |
|------|---------|
| Subject area | Chemistry — equilibrium (Le Chatelier) |
| Grade band | High school (Grades 11–12) and introductory college |
| Learning objective | Students will evaluate how concentration, pressure, temperature, and catalyst/inert-gas stresses affect both Q and the equilibrium position for the Haber process. |
| Bloom's level | Analyze / Evaluate |
| Duration | 10–12 minutes |
| Prerequisites | Understanding of Q vs K, exothermic vs endothermic reactions, and stoichiometric coefficients as “moles of gas” |
| Assessment ideas | Short responses interpreting specific button presses (“What happens to Q and the shift when you compress the system?”) or screenshots annotated with verdict explanations |

## Instructional design review

- **Single objective:** “Students will be able to predict the direction of an equilibrium shift for any applied stress.” ✔️
- **Control inventory:**

| Control | Type | Purpose |
|---------|------|---------|
| Concentration buttons (Add/Remove) | Buttons | Apply reactant/product concentration stresses |
| Pressure/volume buttons | Buttons | Explore Δn gas effects |
| Temperature buttons | Buttons | Change K for exothermic reaction |
| Inert gas + catalyst buttons | Buttons | Illustrate “no shift” stresses |
| Reset button | Button | Return to baseline |

- **Progressive disclosure:** Callouts explain special cases (inert gas, catalyst); K only changes during temperature stresses.
- **Cognitive load:** Each row isolates one stress type, and the verdict text summarizes the outcome.
- **Accessibility:** Buttons have descriptive text, color coding obeys contrast guidelines, and the verdict icons include arrows/text for non-color feedback.

## Lesson plan

### Grade level
Grades 11–12 (AP Chemistry Unit 7) and introductory undergraduate equilibrium

### Duration
12-minute guided exploration or demonstration

### Prerequisites
- Definition of reaction quotient Q
- Qualitative interpretation of exothermic/endothermic shifts
- Familiarity with pressure/volume relationships for gases

### Activities

1. **Predict-verify (5 min):** Students individually predict the effect of each concentration button, then verify by pressing the controls.
2. **Pressure + temperature lab (5 min):** In pairs, learners test compress/expand and temp changes, logging Q, K, and the verdict arrow.
3. **Debrief (2 min):** Whole-class discussion about inert gas and catalyst callouts to highlight exceptions.

### Assessment
- Exit ticket: “Explain why adding an inert gas at constant volume does not change Q or shift equilibrium.”
- Extension: Students capture a screenshot after a temperature increase and describe how the change in K drives the observed shift.

## References

1. Zumdahl & Zumdahl. *Chemistry*, 11th ed., Cengage, 2020 — Le Chatelier examples for the Haber process.
2. Atkins & de Paula. *Physical Chemistry*, 11th ed., Oxford University Press, 2017 — Quantitative treatment of Q vs K with temperature dependence.
