# MicroSim Development Log: Mass Spectrometer Simulation

**Date:** 2026-02-20  
**Skill:** microsim-generator (p5.js route)  
**Project:** AP Chemistry — Chapter 2: Atomic Structure and Mass Spectrometry  
**Files:** `docs/sims/mass-spectrometer-sim/*`  
**Quality Target:** Analyzer / Evaluator level learning objective support

---

## Specification Summary

Source reference: `docs/chapters/02-atomic-structure-and-mass-spectrometry/index.md#diagram-interactive-mass-spectrometer-simulation`

- Canvas: 800×450 px responsive split into two panels.
- Left panel: schematic of mass spectrometer (sample, ionization, acceleration plates, magnetic deflection, detector) on a dark navy palette (#1a1a2e).
- Right panel: live bar chart of isotope abundances with selectable bars and tooltips.
- Controls: element dropdown (Chlorine, Neon, Carbon, Magnesium), Play/Pause toggle for ion animation.
- Learning focus: interpreting mass spectra and connecting detector hits to isotope abundance.

## Implementation Notes

### Layout & Canvas Math

- Canvas defaults to 820×470 (410 draw area + 60 control strip) and constrains between 720–980 px for responsiveness.
- Left panel occupies 55% of the width, right panel the remainder with a 10 px gutter to avoid overlap on smaller screens.
- Control strip remains white to maintain contrast for DOM controls (select + button) following the existing MicroSim style.

### Ion Animation Decisions

- Created an `Ion` class that tracks normalized progress (0–1) through four path segments: sample → ionization → acceleration → magnetic entry → detector.
- Deflection path uses a quadratic Bézier curve. Mass-dependent detector Y-positions map lighter isotopes to higher curvature (upper detector hits) and heavier isotopes closer to the initial trajectory.
- Up to 28 ions are rendered simultaneously. Each ion draws from the current element’s isotope distribution using weighted random sampling to reinforce relative abundance visually.
- Play/Pause button toggles the time delta multiplier; when paused, ions freeze mid-path to aid teacher explanations.

### Spectrum Visualization

- Chart axes render on the right panel with 20% grid lines to mimic textbook spectra.
- Each isotope’s bar uses a unique color defined in the data table. Bars are rounded rectangles to differentiate them from the static detector column.
- Clicking a bar stores its index; the selected bar gets a white outline and its metadata (label, exact mass, abundance) is displayed inside a dark tooltip band above the chart.

### Chemistry Data

- Incorporated the natural isotopic abundances and masses requested in the spec:
  - Chlorine: 35Cl (75.77%), 37Cl (24.23%)
  - Neon: 20Ne (90.48%), 21Ne (0.27%), 22Ne (9.25%)
  - Carbon: 12C (98.93%), 13C (1.07%)
  - Magnesium: 24Mg (78.99%), 25Mg (10.00%), 26Mg (11.01%)
- Data lives inside `ELEMENTS` in the JS file for easy reuse by both the animation logic and the chart.

### Accessibility & Testing

- Added `describe()` call describing the interactive elements for screen reader hints.
- Verified resizing down to 760 px maintains legibility; axes labels shrink gracefully.
- Manual QA steps executed:
  1. Dropdown updates both the animation palette and bar chart.
  2. Play/Pause toggles animation state.
  3. Clicking bars cycles tooltip info and outlines the correct bar.
  4. `mkdocs serve` preview loads the iframe and DOM controls correctly.

## Follow-Ups

- Capture a screenshot PNG for docs/ or release blog after instructor review.
- Consider adding keyboard focus styles to the dropdown/button in a future accessibility pass.
