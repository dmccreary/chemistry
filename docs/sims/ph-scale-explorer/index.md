---
title: Interactive pH Scale Explorer
description: Drag along a full-color pH scale to compare household substances and convert between pH, pOH, [H⁺], and [OH⁻].
quality_score: 0
---

# Interactive pH scale explorer

<iframe src="main.html" height="580px" width="100%" scrolling="no"></iframe>

[Run the pH Explorer fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the MicroSim in the p5.js editor](https://editor.p5js.org/){ .md-button }

## About this MicroSim

Move a vertical cursor across a 0–14 pH scale to see color-coded pins for real substances (gastric acid, lemon juice, blood, seawater, bleach, etc.). As you slide, a live panel displays pH, pOH, $[\ce{H^+}]$, $[\ce{OH^-}]$, and an acidity/basicity description, reinforcing how logarithmic concentration changes map onto everyday chemicals.

## How to use

1. Drag the **pH slider** (0–14, step 0.1) or click the scale to move the cursor.
2. Watch the **[H⁺]**, **[OH⁻]**, and **pOH** readings update automatically ($[\ce{H^+}] = 10^{-\text{pH}}$).
3. Compare the cursor color and text classification (strongly acidic, neutral, strongly basic).
4. Hover over or simply read the pinned labels to contextualize where common substances fall.

## Classroom ideas

- Give students a list of pH values and have them match each to a real substance on the scale.
- Ask learners to predict [H⁺] for a given pH, then verify it in the panel and note how doubling the pH reduces [H⁺] by 100×.
- Use the classification text to spark discussion about the differences between weakly and strongly acidic/basic solutions.
- Build lab prework: students locate buffer pH targets and explain why the color region matters.

## Learning goals

| Item | Details |
|------|---------|
| Subject area | Chemistry — acid-base theory |
| Grade band | Grades 10–12 and introductory college |
| Learning objective | Students will interpret the pH scale to identify relative acidity/basicity and convert between pH, pOH, $[\ce{H^+}]$, and $[\ce{OH^-}]$. |
| Bloom's level | Apply |
| Duration | 8–10 minutes |
| Prerequisites | Logarithmic pH definition, conjugate acid/base knowledge |
| Assessment ideas | Quick journal entry: “At pH 5, what are [H⁺], [OH⁻], pOH, and a real-world example?” |

## Instructional design review

- **Single objective:** “Students use the pH scale to relate colors, examples, and quantitative conversions.” ✔️
- **Control inventory:** one slider plus the responsive info panel (no extra buttons).
- **Progressive disclosure:** only the selected cursor data updates; pins remain as context.
- **Accessibility:** large fonts, color + labels, slider accessible via keyboard.

## Lesson plan

### Grade level
High school chemistry (Unit on acids/bases) or introductory college

### Duration
10-minute exploration or bell-ringer

### Prerequisites
- Definition of pH/pOH
- Relationship between [H⁺], [OH⁻], Kw

### Activities

1. **Warm-up (3 min):** Instructor demonstrates the gradient and pins.
2. **Student exploration (5 min):** Learners slide to three specific pH values and record all computed quantities.
3. **Wrap-up (2 min):** Share how a unit change on the pH scale affects concentration (×10).

### Assessment
- Exit ticket: “If blood is pH 7.4, what is [H⁺]? Where does household ammonia fall relative to blood?”
- Extension: Students screenshot a region (e.g., weakly basic) and annotate it with two examples.

## References

1. Tro, N. J. *Chemistry: A Molecular Approach*, 5th ed., Pearson, 2020 — pH scale fundamentals.
2. Zumdahl & Zumdahl. *Chemistry*, 11th ed., Cengage, 2020 — pH/pOH conversions and typical household examples.
