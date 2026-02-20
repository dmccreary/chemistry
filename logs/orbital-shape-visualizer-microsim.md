# MicroSim Development Log: Interactive Orbital Shape Visualizer

**Date:** 2026-02-20  
**Skill:** microsim-generator (p5.js route)  
**Project:** Chapter 3 — Electron Configuration and Periodic Trends  
**Files:** `docs/sims/orbital-shape-visualizer/*`

---

## Specification Summary

- Source: `docs/chapters/03-electron-configuration-and-periodic-trends/index.md#diagram-interactive-orbital-shape-visualizer`
- Requirements: responsive ~800×450 canvas, split layout (controls left, visualization right), dropdowns for subshell/orientation, slider for principal quantum number, Viridis color scale, nucleus marker, axes labels, text overlay.

## Implementation Highlights

- **Layout:** 300px left control column + responsive right visualization area. Control strip at bottom hosts the p5 DOM elements (subshell select, orientation select, n slider).
- **Probability Model:** 2D cross-section approximations—s orbitals use radial decays with extra nodes at higher n, p orbitals use directional lobes (axis-aligned components with radial damping), d orbitals implement simple polynomial forms (xy, xz, etc.) multiplied by exponential falloffs. Outputs are normalized to 0–1 for color mapping.
- **Rendering:** Sampled a 140×140 grid, mapping each point to Viridis colors. Result forms smooth heat maps; a red dot marks the nucleus. Axes with labels (“x (Bohr radii)”, “y (Bohr radii)”) reinforce spatial interpretation.
- **Controls:** Sequential update: subshell select updates orientation select automatically (s locked, p has {px,py,pz}, d has five options). Slider sets n = 1–4. Text overlay summarizes n, subshell, and number of orbitals.
- **Legend:** Left panel includes a horizontal Viridis gradient with “Low probability”/“High probability” labels.

## QA / Testing

1. Verified responsive behavior from 760px to 1200px widths—controls remain accessible and canvas tallies recalc on resize.
2. Tested each subshell/orientation combination for obvious shape and node patterns (s spherical, p lobes, d four/five-lobed forms).
3. Confirmed slider updates change radial extent; text overlay remains readable.
4. Confirmed axes labels and nucleus marker align with spec.

## Follow-Ups

- Could add tooltips explaining what each orientation letters mean (e.g., dz²) in a future iteration.
- Consider keyboard accessibility for dropdowns/sliders in a later pass.
