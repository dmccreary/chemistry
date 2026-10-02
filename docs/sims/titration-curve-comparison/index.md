---
title: Titration Curve Comparison
description: Side by side titration curves for a strong acid and a weak acid titrated with sodium hydroxide, calculated from equilibrium expressions, with the equivalence point, buffer region, half-equivalence point, and indicator ranges marked.
image: /sims/titration-curve-comparison/titration-curve-comparison.png
og:image: /sims/titration-curve-comparison/titration-curve-comparison.png
twitter:image: /sims/titration-curve-comparison/titration-curve-comparison.png
social:
   cards: false
quality_score: 100
---

# Titration Curve Comparison

<iframe src="main.html" height="542px" width="100%" scrolling="no"></iframe>

[Run the Titration Curve Comparison MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

A **titration curve** plots the pH of the solution in the flask against the volume of titrant added. This MicroSim compares two titrations that differ in only one way, the strength of the acid:

| | Left chart | Right chart |
|---|---|---|
| Acid in the flask | 25.0 mL of 0.100 M $\ce{HCl}$ (strong) | 25.0 mL of 0.100 M $\ce{CH3COOH}$ (weak, $pK_a = 4.74$) |
| Titrant | 0.100 M $\ce{NaOH}$ | 0.100 M $\ce{NaOH}$ |
| Starting pH | 1.00 | 2.87 |
| Equivalence point | 25.0 mL, pH 7.00 | 25.0 mL, pH 8.72 |
| Suitable indicator | Bromothymol blue (pH 6.0 to 7.6) | Phenolphthalein (pH 8.2 to 10.0) |

Both acids need the same 25.0 mL of base to reach the **equivalence point** (red dashed line), because both flasks start with the same number of moles of acid. What differs is the shape of the curve:

- The **strong acid** curve starts at a lower pH and stays nearly flat, then jumps through pH 7.00 at the equivalence point.
- The **weak acid** curve starts higher, then climbs slowly through a **buffer region** (blue shading) where $\ce{CH3COOH}$ and $\ce{CH3COO-}$ are both present. Halfway to the equivalence point the two are equal in concentration, so **pH = pKa** (blue dashed lines).
- At the weak acid's equivalence point the flask holds only the weak base $\ce{CH3COO-}$, so the pH is **above 7** and the vertical jump is shorter.
- **After the equivalence point the two curves are the same**, because excess $\ce{NaOH}$ sets the pH in both flasks.

The yellow band on each chart is the color-change range of an indicator that suits that titration: its range falls inside the steep part of the curve.

## How to Use

1. **Drag the NaOH added slider** (or click on a chart) to move the orange marker along both curves at once. The panels under the charts give the pH in each flask and say what is in the flask at that point.
2. **Hover over a curve** to read the volume and pH at any point.
3. **Press Show Both on One Chart** to overlay the two curves on a single pair of axes. Press it again to return to the side by side view.
4. Try these volumes: 0 mL, 12.5 mL (half-equivalence), 24.9 mL, 25.0 mL (equivalence), and 25.1 mL.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/chemistry/sims/titration-curve-comparison/main.html"
        height="542px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (AP Chemistry, Chapter 8: Chemical Reactions and Equations)

### Duration
10-15 minutes

### Learning Objectives

- **Analyze:** Compare the titration curves of a strong acid and a weak acid titrated with a strong base.
- **Analyze:** Identify the equivalence point, half-equivalence point, and buffer region on a titration curve.
- **Analyze:** Explain why the two curves differ before the equivalence point and coincide after it, and choose a suitable indicator for each titration.

### Prerequisites

- Molarity and solution stoichiometry ($n = MV$)
- The pH scale
- Strong and weak acids

### Activities

1. **Exploration** (3 min): Drag the slider from 0 to 50 mL and watch both markers. Students write down two things the curves have in common and two ways they differ.
2. **Guided comparison** (5 min): Students record the pH of both flasks at 0, 12.5, 24.9, 25.0, 25.1, and 50.0 mL in a table. Ask: *Between which two rows does each pH change the most? Why is the equivalence volume the same for both acids?*
3. **Indicator choice** (4 min): Overlay the curves. Students explain why phenolphthalein works for both titrations but an indicator that changes color near pH 4 (such as methyl orange) would give a wrong endpoint for the weak acid.
4. **Assessment** (3 min): Students sketch, without the MicroSim, the curve for 25.0 mL of a 0.100 M weak acid with $pK_a = 6.0$ titrated with 0.100 M $\ce{NaOH}$, labeling the half-equivalence pH and the equivalence volume.

### Assessment

- Can the student locate the equivalence point and state its pH for each titration?
- Can the student identify the buffer region and explain why pH = pKa at half-equivalence?
- Can the student justify an indicator choice from the shape of the curve?

## How the Curves Were Calculated

Both curves come from solving the charge balance at each volume, using $K_w = 1.0 \times 10^{-14}$ (25 °C). No part of either curve is drawn freehand.

- **Strong acid:** $[\ce{H+}] + [\ce{Na+}] = [\ce{OH-}] + [\ce{Cl-}]$
- **Weak acid:** $[\ce{H+}] + [\ce{Na+}] = [\ce{OH-}] + [\ce{CH3COO-}]$, with $[\ce{CH3COO-}] = C_{acid} \cdot \dfrac{K_a}{K_a + [\ce{H+}]}$ and $pK_a = 4.74$ ($K_a = 1.8 \times 10^{-5}$)

Hand checks of the displayed values:

- Weak acid at 0 mL: $[\ce{H+}] \approx \sqrt{K_a C} = \sqrt{(1.8 \times 10^{-5})(0.100)} = 1.34 \times 10^{-3}$ M, so pH = 2.87
- Weak acid at 12.5 mL: $[\ce{CH3COOH}] = [\ce{CH3COO-}]$, so pH = $pK_a$ = 4.74
- Weak acid at 25.0 mL: $[\ce{CH3COO-}] = 0.0500$ M and $K_b = K_w / K_a = 5.5 \times 10^{-10}$, so $[\ce{OH-}] = 5.2 \times 10^{-6}$ M and pH = 8.72
- Strong acid at 24.9 mL: 0.0100 mmol of $\ce{H+}$ left in 49.9 mL gives $[\ce{H+}] = 2.00 \times 10^{-4}$ M and pH = 3.70
- Both at 25.1 mL: 0.0100 mmol of excess $\ce{OH-}$ in 50.1 mL gives pOH = 3.70 and pH = 10.30

## References

1. [OpenStax Chemistry 2e, Section 14.7: Acid-Base Titrations](https://openstax.org/books/chemistry-2e/pages/14-7-acid-base-titrations) - OpenStax - Free textbook section with worked titration curve calculations for strong and weak acids and a discussion of indicators.
2. [AP Chemistry Course and Exam Description](https://apcentral.collegeboard.org/courses/ap-chemistry) - College Board - Unit 8, Topic 8.5 (Acid-Base Titrations) describes the features of titration curves students must interpret.
3. [Titration curve](https://en.wikipedia.org/wiki/Titration_curve) - Wikipedia - Overview of titration curves, equivalence points, and buffer regions.
