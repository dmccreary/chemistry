# MicroSim Development Log: Interactive Lewis Structure Builder

**Date:** 2026-02-20  
**Skill:** microsim-generator (p5.js route)  
**Project:** Chapter 4 — Chemical Bonding and Lewis Structures  
**Files:** `docs/sims/lewis-structure-builder/*`

---

## Specification Summary

- Walk students through six-step Lewis structure procedure with molecule selector, left-side step panel, central structure canvas, electron-tracker panel, step buttons, and octet feedback.
- Molecule list: H₂O, NH₃, CO₂, SO₂, PCl₃, CH₄, HCN.
- Controls: dropdown, Next Step, Reset, Show Electron Counts toggle (all placed in control strip per p5 guide).

## Implementation Notes

- Template compliance: top-centered title, drawing/control separation, responsive resizing, no arrow handlers.
- Molecule data defines atom positions, bonds, valence totals, and whether multiple bonds appear in Step 6.
- Left panel highlights the active step; central canvas animates bonds/lone pairs based on current step index.
- Right panel tracks valence electrons (total, bonding used, lone pairs, remaining) to reinforce bookkeeping.
- Octet badges (green/red) toggle via checkbox; lone-pair dots change color for central vs terminal placement to represent Steps 4–5.

## Testing

1. Clicked through each molecule ensuring Step 6 shows multiple bonds for CO₂, SO₂, HCN.
2. Toggled electron counts to confirm badges hide/show.
3. Reset button returns to Step 1 with default molecule state.
4. Resized browser to verify controls and panels reposition per template.

## Follow-Ups

- Future enhancement: add formal charge calculations and resonance messaging for species like SO₂.
