---
title: Weak Acid ICE Solver
description: Enter a weak acid concentration and Ka value to see the full ICE table, Ka algebra, and percent ionization checks side by side.
quality_score: 0
---

# Weak acid ICE solver

<iframe src="main.html" height="782px" width="100%" scrolling="no"></iframe>

[Run the Weak Acid ICE Solver fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the MicroSim in the p5.js editor](https://editor.p5js.org/){ .md-button }

## About this MicroSim

Students type an acid name, an initial concentration, and a Ka value, then tap **Calculate** to populate a color-coded ICE table, automatically solve the quadratic $x^2 + K_a x - K_a C_a = 0$, and view the pH, pOH, $[\ce{OH-}]$, and percent ionization. The Ka expression with substituted numbers appears beside the verdict on the 5% (small-x) approximation, and a horizontal gauge shows how strongly the acid ionizes at the chosen concentration.

## How to use

1. Enter an optional **Acid name** label (defaults to acetic acid for easy testing).
2. Type the **Initial [HA] (M)** in decimal or scientific notation (e.g., `0.100` or `2.5e-3`).
3. Type the **Ka value** in scientific notation; both upper- and lower-case `e` are accepted.
4. Click **Calculate** to refresh the ICE table, Ka algebra panel, approximation verdict, and ionization gauge.
5. If $K_a / C_a$ is large, the interface warns that the quadratic solution dominates and percent ionization approaches 100%.

## Learning goals (Step 1)

| Item | Details |
|------|---------|
| Subject area | Chemistry - acid-base equilibrium |
| Grade band | Grades 11-12 (AP Chemistry) |
| Learning objective | Students will be able to set up a weak-acid ICE table, solve the resulting quadratic for $[\ce{H3O+}]$, and evaluate whether the small-x approximation is valid. |
| Bloom's level | Apply |
| Duration | 1012 minutes of guided practice |
| Prerequisites | Acid dissociation expressions, scientific notation, pH/pOH relationships, quadratic formula |
| Assessment ideas | Exit ticket justifying the approximation decision for a chosen acid; screenshot of the ICE table with annotations about $x/C_a$ |

## Instructional design review (Step 1.5)

- **Single objective check:** "Students will be able to calculate $[\ce{H3O+}]$ for a weak acid via an ICE table and explain whether the 5% approximation holds." Yes.
- **Complexity & control limits:**

| Question | Target | Decision |
|----------|--------|----------|
| Number of controls | 15 | 4 total (3 inputs + 1 button) |
| Input burden | Simple numeric entry | All inputs accept plain numbers or scientific notation |
| Progressive disclosure | Results follow after Calculate | Ka verdicts and warnings appear only after a calculation |

- **Control inventory (Step 1.5):**

| # | Control type | Label text | Value format | Row |
|---|--------------|------------|--------------|-----|
| 1 | Text input | Acid name (optional) | Plain text, 24 character display | 1 |
| 2 | Text input | Initial [HA] (M) | Numeric / scientific notation | 2 |
| 3 | Text input | Ka value | Numeric / scientific notation | 3 |
| 4 | Button | Calculate | Runs solver, updates Ka check text | 4 |

- **Progressive disclosure:** ICE values, Ka algebra, approximation verdict, and gauge update only after valid inputs are processed.
- **Cognitive load:** Drawing region separates the ICE table, algebra panel, and gauge with consistent typography; eq row is highlighted.
- **Accessibility:** Label spans use >=16 px font, control rows are keyboard navigable, and the approximation verdict duplicates color cues with plain text.

### Layout planning (Step 2.5)

- Number of control rows: 4
- controlHeight = (4 x 45) + 20 = 200 px
- drawHeight = 580 px (title + panels + gauge)
- canvasHeight = 580 + 200 = 780 px
- iframeHeight = 780 + 2 = 782 px
- Buttons in row 1: none (Calculate button occupies row 4)
- sliderLeftMargin = 180 px (140 px label + 40 px value buffer)
- margin = 24 px

**Position assignments**

```javascript
// Row 1 (Acid name)
controlRows[0].position(margin, drawHeight + 20);
// Row 2 (Initial [HA])
controlRows[1].position(margin, drawHeight + 75);
// Row 3 (Ka value)
controlRows[2].position(margin, drawHeight + 130);
// Row 4 (Calculate button)
controlRows[3].position(margin, drawHeight + 185);
```

**Label/value alignment**

```javascript
// All rows follow the template widths
labelSpan.style('width', '150px');
valueSpan.style('width', '80px');
slot.style('width', '260px');
```

## Lesson plan

### Grade level
AP Chemistry or dual-enrollment chemistry (grades 11-12)

### Duration
10-minute teacher demo plus 5 minutes of student experimentation

### Prerequisites
- Translating weak-acid dissociation into a Ka expression
- Using scientific notation and log calculations
- Understanding the 5% (small-x) approximation rule

### Activities

1. **Guided walkthrough (5 min):** Teacher demonstrates how altering $K_a$ or $C_a$ shifts the ICE entries and approximation verdict.
2. **Partner exploration (7 min):** Students test two acids (e.g., HF vs. acetic), capture the ICE tables, and note when percent ionization exceeds 5%.
3. **Reflection (3 min):** Learners explain when the quadratic solution becomes mandatory and relate the gauge reading to dilute vs. concentrated acids.

## Assessment ideas

- Quick prompt: "For 0.050 M HF ($K_a = 7.2e-4$), does the small-x approximation hold? Include $x/C_a$ evidence."
- Screenshot submission with annotations describing how diluting an acid changed the percent ionization and gauge length.

## References

1. Brown, LeMay, Bursten. *Chemistry: The Central Science*, 15th ed., Pearson, 2022 - Weak acid equilibria and ICE tables.
2. Zumdahl & Zumdahl. *Chemistry*, 11th ed., Cengage, 2020 - Approximation checks and Ka problem-solving strategies.
