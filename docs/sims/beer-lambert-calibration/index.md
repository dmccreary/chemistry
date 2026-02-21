---
title: Beer-Lambert Law Calibration Curve Builder
description: Build a spectrophotometry calibration curve, compute slope and R^2, and solve for an unknown concentration using Beer-Lambert relationships.
quality_score: 0
---

# Beer-Lambert Law Calibration Curve Builder

<iframe src="main.html" height="792px" width="100%" scrolling="no"></iframe>

[Run the Beer-Lambert MicroSim fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit this MicroSim in the p5.js editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

Students can edit a six-point absorbance vs. concentration table, fit a best-fit line, and immediately see how slope, intercept, and R² respond to measurement error. The animated crosshair highlights what Beer-Lambert predicts for any concentration, while an "Unknown Absorbance" calculator marks a green point on the graph. The right-hand panel reports the computed molar absorptivity (slope = εl) so learners connect the regression to the analytical equation \(A = \varepsilon l c\).

## How to Use

1. Review the default data for a purple dye (ε = 15000 L/mol·cm, l = 1.00 cm). Edit any concentration or absorbance entries in the control table to mimic new calibration data.
2. Click **Plot Curve** to run a least-squares regression, plot the data (royal blue dots), and draw the red best-fit line.
3. Drag the **Crosshair concentration** slider to see what absorbance the model predicts for a given concentration. The red crosshair shows the point on the graph.
4. Type an **Unknown absorbance A** reading from a sample and press **Find Concentration**. The MicroSim computes \(c = (A - b)/m\) using the current regression and marks the unknown in green.
5. Use **Reset Data** to restore the original table and clear the unknown point.

## Insights to Explore

- Observe how a single outlier in the table skews both slope (εl) and R², demonstrating why calibration data must be carefully screened.
- Discuss why the intercept should be near zero for Beer-Lambert data; if it deviates, ask students which trial might be at fault.
- Compare the slider-based crosshair prediction to the calculator result to reinforce that the regression line is the analytical equation.
- Challenge students to design a new dataset with the same slope but lower R² (by adding noise) and explain the implications for concentration determinations.

## Lesson Plan

### Grade Level
Grades 11-12 (AP Chemistry Unit 7) and introductory analytical chemistry courses

### Duration
15 minutes for guided exploration plus 10 minutes for follow-up calculations

### Prerequisites
- Understanding of Beer-Lambert Law variables and units
- Prior experience plotting linear data and interpreting slopes
- Basic algebraic rearrangement skills

### Activities

1. **Warm-Up (5 min):** As a class, inspect the default data and predict the molar absorptivity from the slope before plotting.
2. **Data Challenge (7 min):** Students intentionally alter one absorbance entry, plot the curve, and explain how the slope and R² change.
3. **Unknown Sample (5 min):** Provide an absorbance value, have students compute the concentration via the MicroSim, and compare it to manual calculations.
4. **Reflection (optional):** Learners export their edited table and justify whether their calibration is reliable enough for lab use.

### Assessment
- Exit ticket: "Identify one sign that your calibration curve is no longer valid for Beer-Lambert analysis and explain why."
- Quick check: Provide an absorbance and ask for the calculated concentration using both the MicroSim and the formula to confirm agreement.

## References

1. Harris, D. C. *Quantitative Chemical Analysis*, 10th ed., W. H. Freeman, 2020 - Spectrophotometric calibration methods.
2. Skoog, Holler, Crouch. *Principles of Instrumental Analysis*, 7th ed., Cengage, 2018 - Beer-Lambert theory and best practices.
