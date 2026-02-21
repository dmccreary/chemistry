# MicroSim Development Log: VSEPR Molecular Geometry Builder

**Date:** 2026-02-20  
**Skill:** microsim-generator (p5.js route)  
**Project:** Chapter 5 — Molecular Geometry and Polarity  
**Files:** `docs/sims/vsepr-geometry-builder/*`

---

## Specification Summary

- Controls: electron groups (2–6) and lone pairs (0 to groups−1) with increment/decrement buttons plus display of geometry names, bond angles, and examples.
- Visualization: pseudo-3D arrangement with bonding pairs (orange spheres) and lone pairs (blue clouds) smoothly transitioning; bond angle arc; legend.
- Must honor VSEPR placement rules (lone pairs occupy equatorial positions for trigonal bipyramidal, opposite positions for octahedral cases).

## Implementation Notes

- Template compliance: title centered at top, all DOM controls in control strip, responsive resizing.
- Defined base 3D coordinates for electron groups (2–6). `geometryMap` contains metadata (electron/molecular geometry, bond angles, example, lone pair preferences per AXmEn).
- Smooth transitions achieved by lerping current positions toward target positions when controls change.
- Bond angle arc drawn between first two bonding vectors with label from geometry data.
- Left panel (rendered in drawing region) shows digital readouts and legend per spec; actual interactive buttons remain in control area.

## Testing

1. Verified each combination from AX₂E₀ to AX₆E₂ matches expected names/angles and that lone pairs occupy correct positions (e.g., equatorial for AX₅E₂).
2. Checked that lone pair range clamps to 0–(groups−1) and that geometry text updates correctly.
3. Resized browser to confirm controls reposition and visualization remains centered.

## Follow-Ups

- Future addition: textual explanation on why lone pairs choose specific sites.
- Could add preset molecules (e.g., XeF₂ button) that set groups/lone pairs automatically.
