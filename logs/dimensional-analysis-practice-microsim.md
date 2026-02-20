# MicroSim Development Log: Dimensional Analysis Practice

**Date:** 2026-02-20  
**Skill:** microsim-generator (p5.js route)  
**Project:** Chapter 1 — Foundations of Chemistry  
**Files:** `docs/sims/dimensional-analysis-practice/*`

---

## Specification Summary

- Source: `docs/chapters/01-foundations-of-chemistry/index.md#diagram-dimensional-analysis-practice-microsim`
- Requirements: responsive canvas (~500 px tall), “New Problem” + “Check” controls, drag/drop-like workspace with conversion factors, unit cancellation highlights (green with strike-through), three difficulty bands (metric, rates, chemistry-specific), score counter, random problem generation.

## Implementation Notes

### Interaction Pattern

- Replaced literal drag/drop with **tile selection** to keep the UI deterministic inside the iframe while preserving the “choose factor” pedagogy. Each tile clones a conversion fraction into the workspace chain and refreshes the cancellation tracker immediately.
- Added **Undo** to mimic removing misplaced tiles and keep cognitive load low for beginners.
- Scoreboard displays `correct/attempted`; success auto-loads a fresh problem to encourage fluent repetitions.

### Data Model

- Defined a reusable `FACTORS` dictionary (metric, rate, Avogadro, molar-mass, STP volume) tagged with numerator/denominator units and numeric ratios.
- `PROBLEMS` array covers Levels 1–3 with representative prompts (kg→g, km/hr→m/s, g H₂O→molecules, mol CO₂→L). Each problem lists the factor IDs required plus distractor IDs so the tray always mixes correct/incorrect options.
- Target values auto-computed from the factor list to avoid rounding drift when adjusting prompts later.

### Visual Layout

- Top header: prompt, level badge, and score readout for teacher visibility.
- Workspace row: start value card, factor fractions, and live result card (value + computed units). With ≤2 factors per spec, layout stays on a single row for easy projection.
- Unit tracker panel: shows numerator/denominator inventories. Canceled units render green with a strike-through line; uncanceled units remain bold red so students know what still needs to disappear.
- Factor tray: dark navy strip with hover-highlighted tiles; column count adapts to iframe width without constraining the canvas (per new rule).

### Checking Logic

- `checkAnswer()` enforces both **unit agreement** and **numeric tolerance (±1%)**. Feedback differentiates “units wrong” vs “numbers wrong”.
- `evaluateChain()` maintains raw + post-cancellation unit counts so the tracker can display both remaining and canceled states.

### QA Steps

1. Verified each level generates only the intended factor pool and includes at least two distractors.
2. Confirmed cancellation highlights update immediately when tiles removed via Undo.
3. Tested resizing inside `mkdocs serve` to ensure no clipping or canvas constraints.
4. Walked through sample problems to ensure target answers (`2.50 kg → 2500 g`, `65 km/hr → 18.1 m/s`, `18 g H₂O → 6.02×10^23 molecules`) fall within tolerance.

### Follow-Ups

- Future enhancement: allow teachers to pin a desired level or upload custom prompt sets.
- Accessibility: add keyboard focus/activation for factor tiles in a subsequent iteration.
