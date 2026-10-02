---
title: Back Titration Step-by-Step Diagram
description: Step through a back titration of an antacid tablet, from adding a known excess of acid to titrating what is left over, with the subtraction calculation worked out and a slider to change the endpoint volume.
image: /sims/back-titration-diagram/back-titration-diagram.png
og:image: /sims/back-titration-diagram/back-titration-diagram.png
twitter:image: /sims/back-titration-diagram/back-titration-diagram.png
social:
   cards: false
quality_score: 100
---

# Back Titration Step-by-Step Diagram

<iframe src="main.html" height="582px" width="100%" scrolling="no"></iframe>

[Run the Back Titration Step-by-Step Diagram MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A **back titration** measures an analyte indirectly. Instead of titrating the analyte itself, you add a known **excess** of a standard reagent, let the reaction finish, and then titrate the reagent that is **left over**. The amount that reacted with the analyte is found by subtraction.

A back titration is the better choice when a direct titration would not give a sharp endpoint:

- the analyte is a solid that does not dissolve in water (such as $\ce{CaCO3}$),
- the analyte reacts too slowly with the titrant, or
- the endpoint of the direct reaction is hard to see.

The MicroSim uses the worked example from the chapter, the calcium carbonate in an antacid tablet:

1. **Weigh the sample.** A 1.250 g tablet contains $\ce{CaCO3}$ plus inactive fillers.
2. **Add excess HCl.** 50.00 mL of 0.5000 M $\ce{HCl}$ is more than the $\ce{CaCO3}$ can use up: $\ce{CaCO3 + 2HCl -> CaCl2 + H2O + CO2}$
3. **Titrate the excess.** The leftover $\ce{HCl}$ is titrated with 0.2500 M $\ce{NaOH}$: $\ce{HCl + NaOH -> NaCl + H2O}$
4. **Calculate.**

$$n_{\text{HCl reacted}} = n_{\text{HCl added}} - n_{\text{HCl excess}} \qquad\qquad n_{\ce{CaCO3}} = \frac{n_{\text{HCl reacted}}}{2}$$

With 20.00 mL of $\ce{NaOH}$ at the endpoint:

| Quantity | Calculation | Result |
|---|---|---|
| HCl added | 0.5000 mol/L × 0.05000 L | 0.02500 mol |
| HCl in excess | 0.2500 mol/L × 0.02000 L (1 to 1 with NaOH) | 0.005000 mol |
| HCl that reacted | 0.02500 mol − 0.005000 mol | 0.02000 mol |
| $\ce{CaCO3}$ | 0.02000 mol ÷ 2 | 0.01000 mol |
| Mass of $\ce{CaCO3}$ | 0.01000 mol × 100.09 g/mol | 1.0009 g |
| Percent of tablet | 1.0009 g ÷ 1.250 g × 100 | 80.07% |

## How to Use

1. **Press Next Step** to move through the four steps. The active step has a heavy outline, the white strip explains it, and its line of the calculation is filled in.
2. **Predict before you reveal.** Lines of the calculation that have not been reached show a question mark. Work them out on paper, then press Next Step to check.
3. **Drag the NaOH at endpoint slider** to change the titration result. The burette level and every later line of the calculation update.
4. **Click a picture** or the calculation panel to jump straight to that step.

Notice the direction of the effect: the *more* $\ce{NaOH}$ the titration needs, the more $\ce{HCl}$ was left over, so the *less* $\ce{CaCO3}$ the tablet contained.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/chemistry/sims/back-titration-diagram/main.html"
        height="582px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (AP Chemistry, Chapter 9: Stoichiometry, Titrations, and Analysis)

### Duration
10-15 minutes

### Learning Objectives

- **Evaluate:** Judge when a back titration is preferable to a direct titration and justify the choice.
- **Apply:** Calculate the amount of analyte from the reagent added, the reagent left over, and the mole ratios of both reactions.

### Prerequisites

- Molarity and $n = MV$
- Direct acid-base titration
- Mole ratios from balanced equations

### Activities

1. **Why not titrate directly?** (3 min): At step 1, students read the explanation and suggest two other analytes for which a direct titration would be difficult (for example, the acid-neutralizing power of an insoluble hydroxide antacid, or a slow-dissolving mineral sample).
2. **Predict, Then Check** (5 min): Students calculate each line on paper before pressing Next Step, and compare with the panel.
3. **Reverse reasoning** (4 min): Move the slider to 30.00 mL. Before reading the result, students predict whether the percent of $\ce{CaCO3}$ will be higher or lower than 80.07% and explain why (lower: 70.06%).
4. **Assessment** (3 min): A 0.900 g sample of impure $\ce{CaCO3}$ is treated with 40.00 mL of 0.5000 M $\ce{HCl}$; the excess needs 16.00 mL of 0.2500 M $\ce{NaOH}$. Students find the percent purity (0.01600 mol HCl reacted, 0.008000 mol $\ce{CaCO3}$, 0.8007 g, 88.97%).

### Assessment

- Can the student explain why the excess reagent, not the analyte, is titrated?
- Does the student subtract the excess from the amount added before applying the mole ratio?
- Does the student use the 2 to 1 ratio of $\ce{HCl}$ to $\ce{CaCO3}$ and the 1 to 1 ratio of $\ce{HCl}$ to $\ce{NaOH}$ in the right places?

## References

1. [OpenStax Chemistry 2e, Section 4.5: Quantitative Chemical Analysis](https://openstax.org/books/chemistry-2e/pages/4-5-quantitative-chemical-analysis) - OpenStax - Free textbook section on titration and gravimetric analysis calculations.
2. [Titration: Back titration](https://en.wikipedia.org/wiki/Titration#Back_titration) - Wikipedia - Explains when and why a back titration is used.
3. [AP Chemistry Course and Exam Description](https://apcentral.collegeboard.org/courses/ap-chemistry) - College Board - Unit 4, Topic 4.6 (Introduction to Titration) covers titration stoichiometry.
