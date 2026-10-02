---
title: Combustion Analysis Flow Chart
description: Interactive flowchart that steps through combustion analysis, from weighing the sample to the empirical formula, with every calculation worked out for three sets of lab data and a molar mass check for the molecular formula.
image: /sims/combustion-analysis-flowchart/combustion-analysis-flowchart.png
og:image: /sims/combustion-analysis-flowchart/combustion-analysis-flowchart.png
twitter:image: /sims/combustion-analysis-flowchart/combustion-analysis-flowchart.png
social:
   cards: false
quality_score: 100
---

# Combustion Analysis Flow Chart

<iframe src="main.html" height="702px" width="100%" scrolling="no"></iframe>

[Run the Combustion Analysis Flow Chart MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

Combustion analysis finds the empirical formula of a compound that contains carbon, hydrogen, and oxygen. The sample is burned in excess oxygen, the $\ce{CO2}$ and $\ce{H2O}$ produced are trapped and weighed, and the elemental masses are back-calculated:

- **Carbon** comes from the $\ce{CO2}$: each mole of $\ce{CO2}$ (44.009 g) contains one mole of C (12.011 g).
- **Hydrogen** comes from the $\ce{H2O}$: each mole of $\ce{H2O}$ (18.015 g) contains **two** moles of H (2.016 g).
- **Oxygen** is found by difference: $m_O = m_{\text{sample}} - m_C - m_H$. It cannot be measured from the products because they also contain oxygen from the $\ce{O2}$ that was supplied.

The flowchart on the left shows the procedure. Blue boxes are measurements, orange boxes are calculations, and the green box is the result. The panel on the right works every step with real numbers for the selected sample, then checks the empirical formula against a molar mass to find the molecular formula.

Sample A is the worked example from the chapter. Each value in the panel is rounded to four significant figures and carried forward, just as you would do by hand.

## How to Use

1. **Pick a sample** from the Sample menu. The lab data (sample mass, mass of $\ce{CO2}$, mass of $\ce{H2O}$) appear in the gray box.
2. Press **Next** to move through the ten boxes of the flowchart. The current box gets a heavy black outline and its calculation appears on the right.
3. **Before pressing Next, predict the result of the next step on paper.** Then check your work.
4. **Hover** over any box to preview that step, or **click** a box to jump straight to it.
5. At the final step, compare the empirical formula mass with the molar mass. A whole-number ratio means the data are consistent, and that whole number converts the empirical formula into the molecular formula.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/chemistry/sims/combustion-analysis-flowchart/main.html"
        height="702px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (AP Chemistry, Chapter 2: Atomic Structure and Mass Spectrometry)

### Duration
15-20 minutes

### Learning Objectives

- **Create:** Construct the step-by-step procedure for a combustion analysis problem, in the correct order.
- **Evaluate:** Judge whether a calculated empirical formula is consistent with a given molar mass, and determine the molecular formula.

### Prerequisites

- Mole calculations ($n = m / M$)
- Percent composition and empirical formulas
- Molar masses of $\ce{CO2}$ and $\ce{H2O}$

### Activities

1. **Exploration** (4 min): With Sample A selected, step through all ten boxes and compare each number with the worked example in the chapter. Ask: *Why is oxygen found by subtraction instead of from the mass of the products?*
2. **Guided Practice** (6 min): Switch to Sample B. Students calculate the masses and moles of C, H, and O on paper before pressing Next. At the "divide by smallest" step they will find a ratio near 1.33. Ask: *What do you do when a ratio is not close to a whole number?*
3. **Independent Practice** (5 min): Students work Sample C entirely on paper, then use the MicroSim only to check the empirical formula and the molar mass comparison.
4. **Assessment** (5 min): Without the MicroSim, students write the flowchart from memory and explain in one sentence why each mole of water accounts for two moles of hydrogen atoms.

### Assessment

- Can the student list the steps of combustion analysis in order?
- Does the student use 2.016 g of H per 18.015 g of $\ce{H2O}$, not 1.008 g?
- Can the student decide whether an empirical formula and a molar mass are consistent, and state the molecular formula?

## References

1. [OpenStax Chemistry 2e, Section 4.5: Quantitative Chemical Analysis](https://openstax.org/books/chemistry-2e/pages/4-5-quantitative-chemical-analysis) - OpenStax - Free textbook section that describes combustion analysis and works an example.
2. [OpenStax Chemistry 2e, Section 3.2: Determining Empirical and Molecular Formulas](https://openstax.org/books/chemistry-2e/pages/3-2-determining-empirical-and-molecular-formulas) - OpenStax - Covers the mole-ratio method and the molar mass comparison used in the last step.
3. [AP Chemistry Course and Exam Description](https://apcentral.collegeboard.org/courses/ap-chemistry) - College Board - Unit 1 topics on moles, molar mass, and elemental composition of pure substances.
4. [Mermaid Documentation: Flowcharts](https://mermaid.js.org/syntax/flowchart.html) - Mermaid - Syntax reference for the diagram library used to draw this flowchart.
