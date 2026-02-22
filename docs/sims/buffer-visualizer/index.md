---
title: Buffer System Visualizer
description: Explore how HA/A⁻ ratios and strong acid/base additions influence buffer and plain water pH using Henderson-Hasselbalch.
quality_score: 0
---

# Buffer system visualizer

<iframe src="main.html" height="820px" width="100%" scrolling="no"></iframe>

[Run the Buffer Visualizer fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the MicroSim in the p5.js editor](https://editor.p5js.org/){ .md-button }

## About this MicroSim

Two beakers—one buffer, one pure water—sit beneath a shared pH scale. Adjust the initial HA and A⁻ concentrations, set $pK_a$, and then add strong acid or base. The buffer’s pH shifts according to Henderson-Hasselbalch and particle ratios animate accordingly, while the water column swings dramatically, highlighting buffer resistance.

## How to use

1. Move the **[HA]** and **[A⁻]** sliders (0.01–1.0 M). The particle mix updates immediately.
2. Set the **$pK_a$ slider** (2–12) to choose the acid/base pair.
3. Use the **Add to buffer** dropdown to select a strong acid/base slug, then press **Add**. Concentrations update according to stoichiometry and pH is recalculated.
4. Compare buffer vs. water pH change and $\Delta pH$ readouts; watch the pointers on the shared pH scale.

## Learning goals

| Item | Details |
|------|---------|
| Subject area | Chemistry — buffers |
| Grade band | AP Chemistry / introductory college |
| Learning objective | Students will analyze how HA/A⁻ ratios and additions of strong acids/bases affect buffer pH compared to pure water. |
| Bloom's level | Analyze |
| Duration | 10 minutes |
| Prerequisites | Henderson-Hasselbalch equation, acid/base stoichiometry |
| Assessment ideas | Students record initial/final pH and $\Delta pH$ for two additions; exit ticket explains why buffers resist change. |

## Instructional design review

- **Single objective:** “Explain why buffers resist pH changes relative to water.” ✔️
- **Controls:** three sliders, one dropdown, and an Add button—within the guide’s limits.
- **Progressive disclosure:** Calculated values update continuously; additions occur only after pressing the button.
- **Accessibility:** Large fonts, consistent color coding (orange HA, blue A⁻), cursor-friendly controls beneath the canvas.

## Lesson plan

1. **Demo (3 min):** Show equal HA/A⁻ buffer vs. pure water; note initial pH.
2. **Student exploration (5 min):** Learners test two additions (acid and base) while logging buffer vs. water $\Delta pH$.
3. **Discussion (2 min):** Share how HA/A⁻ ratios or $pK_a$ closer to target pH improve buffering.

## References

1. Zumdahl & Zumdahl. *Chemistry*, 11th ed., Cengage, 2020 — Buffer calculations.
2. Tro, N. J. *Chemistry: A Molecular Approach*, 5th ed., Pearson, 2020 — Henderson-Hasselbalch applications.
