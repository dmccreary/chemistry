# MicroSim Development Log: IMF Strength Explorer — Boiling Points vs. IMF Type

**Date:** 2026-02-20  
**Skill:** microsim-generator (p5.js route)  
**Project:** Chapter 6 — Intermolecular Forces and States of Matter  
**Files:** `docs/sims/imf-strength-explorer/*`

---

## Specification Summary

- Visualization: vertical bar chart (−200 to 200 °C) grouped by IMF type with color legend, 0 °C reference line, tooltip, and clickable bars.
- Controls: dropdown filter (All / dispersion / dipole / hydrogen bonding).
- Info panel: updates with molecule name, formula, IMF type, molar mass, boiling point, and short explanation.

## Implementation Notes

- Data object stores molecules, IMF category, molar mass, boiling point, color, and explanatory text.
- Chart occupies 60% of canvas width; info panel uses remaining space. Bars highlight gold when selected, tooltip follows mouse.
- Filtering simply hides bars outside selected IMF type. Hover detection updates tooltip and click selects a molecule.
- 0 °C dashed reference line plus y-axis gridlines support comparisons.
- Legend placed inside chart for quick category reference.

## Testing

1. Verified filter options show the correct subset of molecules and maintain ordering.
2. Clicked each bar to confirm info panel updates and selection persists when filter changes back to “Show All”.
3. Tooltips show accurate boiling point values; resizing keeps chart axes and panel alignment.

## Follow-Ups

- Could add additional IMF categories (ion-dipole) or allow user-supplied molecules.
- Consider adding a toggle to convert temperatures to Kelvin for thermodynamic discussions.
