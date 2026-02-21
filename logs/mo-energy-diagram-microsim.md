# MicroSim Development Log: MO Energy Diagram Explorer

**Date:** 2026-02-20  
**Skill:** microsim-generator (p5.js route)  
**Project:** Chapter 5 — Molecular Geometry and Polarity  
**Files:** `docs/sims/mo-energy-diagram/*`

---

## Specification Summary

- Dropdown for diatomic species (neutral/ions) with valence electron counts.
- Center column: MO energy levels with bonding (blue) vs antibonding (red), dashed connectors to AO columns, electron arrows following Hund’s rule.
- Right panel reports bonding/antibonding electrons, bond order (color-coded), magnetic character, and Lewis bond symbol.

## Implementation Notes

- Two MO schemes (early: π2p below σ2p for B–N; late: σ2p below π2p for O–Ne/heteronuclear). Lookup table stores electron counts, scheme, and Lewis bond label.
- Electron filling uses two-pass algorithm to honor Hund’s rule (single occupancy then pairing). Occupancy records per orbital, enabling unpaired-electron count for magnetism.
- AO columns left/right drawn for 1s/2s/2p plus dashed connectors to MO levels to visually tie the diagram together.
- Bond order classification determines label/color in results panel; magnetism message displays paramagnetic w/ unpaired count or diamagnetic.
- All controls stay in control strip; diagram area handles rendering only.

## Testing

1. Verified bond orders: O₂ (2.0, paramagnetic), O₂⁻ (1.5), O₂⁺ (2.5), B₂ (1.0, paramagnetic), Ne₂ (0, no bond).
2. Confirmed MO ordering switches when selecting early (B₂) vs late (O₂) species.
3. Checked resizing keeps columns and panel alignment.

## Follow-Ups

- Future feature: display electron configuration string (σ1s²σ*1s² … ).
- Could add heteronuclear energy offsets to show AO energy differences.
