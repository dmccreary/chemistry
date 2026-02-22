---
title: Titration Curve Comparison Explorer
description: Compare strong-strong, weak-strong, and strong-weak acid-base titration curves with annotated features and indicator guidance.
quality_score: 0
---

# Titration curve comparison explorer

<iframe src="main.html" height="942px" width="100%" scrolling="no"></iframe>

[Run the Titration Curve Explorer fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the MicroSim in the p5.js editor](https://editor.p5js.org/){ .md-button }

## About this MicroSim

The explorer plots pH vs. titrant volume for three common titration types (strong-strong, weak acid-strong base, strong acid-weak base). Sliders adjust analyte concentration, titrant concentration, analyte volume, and the $pK_a$ (or conjugate acid strength) for weak cases. Every curve displays the initial pH, half-equivalence marker, buffer region, steep jump band, and the equivalence point annotation. Below the plot, indicator ranges show which dye overlaps the steep jump so students can immediately pick a suitable indicator.

## How to use

1. Choose a **titration type** (strong-strong, weak acid-strong base, or strong acid-weak base). The custom $pK_a$ slider appears whenever a weak component is involved.
2. Set the **Analyte concentration**, **Titrant concentration**, and **Analyte volume** sliders to configure the stoichiometry (the explorer recalculates the equivalence volume automatically).
3. For weak systems, move the **$pK_a$ slider** to represent a different acid strength (for weak bases, this is the $pK_a$ of the conjugate acid).
4. Observe how the titration curve responds: annotations show the initial pH, buffer window, half-equivalence point, and equivalence pH and volume. The vertical dashed line marks the equivalence volume.
5. Review the indicator panel - bars that overlap the shaded steep jump are highlighted as viable indicators, while mismatched ranges are dimmed.

## Learning goals (Step 1)

| Item | Details |
|------|---------|
| Subject area | Chemistry - acid-base titrations |
| Grade band | AP Chemistry / introductory college |
| Learning objective | Students will analyze how titration curves encode equivalence point pH, buffer regions, and indicator selection across strong vs. weak acid-base combinations. |
| Bloom's level | Analyze |
| Duration | 15 minutes (demo plus hands-on exploration) |
| Prerequisites | Acid/base strength, Henderson-Hasselbalch, titration stoichiometry, indicator ranges |
| Assessment ideas | Ask learners to capture the curve for two titration types and justify the indicator choice; provide a target pH jump and have them explain which titration type matches it |

## Instructional design review (Step 1.5)

| Question | Target | Decision |
|----------|--------|----------|
| Single learning objective? | Yes | Focused on interpreting titration curves and selecting indicators |
| Number of controls | 1-5 | Five rows (radio group plus four sliders) within guidance |
| Progressive disclosure | Needed | Indicator highlights and annotations update only after controls adjust |
| Cognitive load | Moderate | Visual layout separates control summary (left column), plot, and indicator panel |
| Accessibility | Required | Controls live below the canvas with 16 px text and high-contrast cues |

**Control inventory**

| # | Control type | Label text | Value format | Row |
|---|--------------|------------|--------------|-----|
| 1 | Radio group | Titration type | Three labeled options | 1 |
| 2 | Slider | Analyte concentration (M) | 0.010-0.200 M, step 0.005 | 2 |
| 3 | Slider | Titrant concentration (M) | 0.010-0.200 M, step 0.005 | 3 |
| 4 | Slider | Analyte volume (mL) | 10-50 mL, step 1 | 4 |
| 5 | Slider | $pK_a$ (weak only) | 3.0-11.0, step 0.1 | 5 |

## Layout planning (Step 2.5)

- Number of control rows: 5
- controlHeight = (5 x 60) + 40 = 340 px
- drawHeight = 600 px (title, summary stack, plot, indicator bars)
- canvasHeight = 600 + 340 = 940 px
- iframeHeight = 940 + 2 = 942 px
- sliderLeftMargin = 240 px (150 px label + 90 px value buffer)
- margin = 28 px

**Position assignments**

```javascript
// Row 1 (Titration type radio buttons)
controlRows[0].position(margin, drawHeight + 30);
// Row 2 (Analyte concentration)
controlRows[1].position(margin, drawHeight + 100);
// Row 3 (Titrant concentration)
controlRows[2].position(margin, drawHeight + 170);
// Row 4 (Analyte volume)
controlRows[3].position(margin, drawHeight + 240);
// Row 5 ($pK_a$ slider)
controlRows[4].position(margin, drawHeight + 310);
```

**Label/value alignment**

```javascript
labelSpan.style('width', '150px');
valueSpan.style('width', '90px');
slot.style('width', '260px'); // slider widths expand dynamically via code
```

## Lesson plan

1. **Compare curve shapes (5 min):** Instructor switches between the three titration types while keeping concentrations identical, pointing out the differing equivalence pH values and steepness.
2. **Buffer analysis (6 min):** Students set the weak acid-strong base option, adjust $pK_a$, and capture screenshots of the buffer bracket and half-equivalence label, noting how the window shifts.
3. **Indicator choice debate (4 min):** Teams choose an indicator for a given titration type and use the indicator panel plus steep jump shading to defend their pick.

## References

1. Zumdahl, S. & Zumdahl, S. *Chemistry*, 11th ed., Cengage, 2020 - Acid-base titration curves and indicator selection.
2. Brown, T. et al. *Chemistry: The Central Science*, 15th ed., Pearson, 2022 - Henderson-Hasselbalch applications in titrations.
