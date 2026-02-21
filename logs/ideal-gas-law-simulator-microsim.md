# MicroSim Development Log: Ideal Gas Law Interactive Simulator

**Date:** 2026-02-20  
**Skill:** microsim-generator (p5.js route)  
**Project:** Chapter 6 — Intermolecular Forces and States of Matter  
**Files:** `docs/sims/ideal-gas-law-simulator/*`

---

## Specification Summary

- Left panel: piston/cylinder animation with particle speeds reflecting temperature, piston height reflecting volume, particle count reflecting moles.
- Right panel: numeric readouts plus solved variable display; bottom region shows substituted PV = nRT equation.
- Controls: four sliders (P, V, T, n), radio buttons to choose which variable to solve for, Reset, and Hint buttons.

## Implementation Notes

- Sliders live in the control strip per repo rule; right panel mirrors their values and displays the computed variable.
- `solveFor` logic disables the corresponding slider and recomputes the variable using PV = nRT; other sliders update variables directly and trigger recalculation.
- Particle animation uses simple elastic collisions; temperature scales velocity magnitude and color gradient, volume adjusts piston height and chamber size, and mole count adjusts particle count.
- Hint button inspects the last changed slider versus the solved variable to show Boyle’s, Charles’, Avogadro’s, or a combined-gas-law reminder.
- Equation readout shows numerical substitution to reinforce algebraic manipulation.

## Testing

1. Verified solving for each variable matches manual calculations and updates sliders accordingly.
2. Observed animation changes: increasing temperature speeds particles, lowering volume compresses piston, changing moles alters particle count.
3. Checked Hint messages reflect expected gas law pairings; Reset returns STP values.
4. Confirmed resizing keeps controls aligned and animation centered.

## Follow-Ups

- Could add data logging/graphing of variable pairs for deeper analysis.
- Future enhancement: allow toggling units (e.g., kPa, m³) or demonstrate non-ideal deviations.
