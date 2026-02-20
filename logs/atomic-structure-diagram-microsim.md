# MicroSim Development Log: Atomic Structure Diagram

**Date:** 2026-02-20
**Skill:** microsim-generator (p5.js route)
**Project:** AP Chemistry — Chapter 2: Atomic Structure and Mass Spectrometry
**File:** `docs/sims/atomic-structure-diagram/atomic-structure-diagram.js`
**Quality Score:** 93/100 (A)

---

## Specification Summary

The MicroSim was generated from a `<details markdown="1">` diagram specification block
embedded in Chapter 2's content. The specification called for:

- 800×450px canvas, responsive to window resize
- Nucleus as a dense cluster of red (protons) and gray (neutrons) circles
- Concentric dashed ellipses for electron shells
- Blue electron dots orbiting on the shells
- Slider for Atomic Number Z = 1–18
- Live legend panel (right side) with element symbol, name, particle counts
- Hover tooltips on nucleus particles: "Proton (+1)" or "Neutron (0)"
- Dark navy background (#0d1117) with white labels

---

## Instructional Design Decisions

### Bloom's Taxonomy Alignment

The specification stated two learning objectives at two levels:

- **L1 Remembering:** Identify the location and charge of each subatomic particle
- **L2 Understanding:** Explain how atomic number determines elemental identity

For L1/L2 objectives, the appropriate interaction pattern is a **slider-driven static
visualization with concrete data visibility** — not a complex multi-step simulation.
The Z slider directly reveals the structural consequence of changing the atomic number,
which is ideal for both levels.

### Animation Decision: Mouse-Hover Gated

The specification requested orbiting electron animation. For L1/L2 objectives, continuous
animation risks distracting from the primary content (the nucleus and legend data).
Decision: **gate the animation to mouse-over-canvas only**, per the p5-guide standard.
When the mouse leaves, electrons freeze at their current positions. This keeps the visual
clean while reading surrounding content in the textbook iframe.

### Control Count

The spec called for one control (the Z slider). This was kept as-is — a single control
is ideal for L1/L2 and minimizes cognitive load. No additional controls were added.

---

## Layout Design Decisions

### Canvas Dimensions

```
drawHeight    = 390px   (atom visualization, dark navy)
controlHeight =  50px   (1 control row × 35 + 10 = 45, rounded to 50)
canvasHeight  = 440px
iframeHeight  = 442px   (canvasHeight + 2px border)
```

The original specification suggested 800×450px. The height was adjusted to 440px
(390 + 50) to precisely fit the one-row control strip using the standard formula.

### Atom Zone vs Legend Panel Split

The canvas is divided horizontally:
- **Left 66%:** atom zone (nucleus + electron shells), centered at 37% of canvas width
- **Right 30%:** legend panel (element symbol, name, counts, shell breakdown)
- **4% gap:** visual breathing room between zones

The atom center at 37% (not 50%) ensures the electron shells — which extend outward
symmetrically — remain fully visible and do not overlap the legend panel even at
the widest shell (Shell 3 for Z=11–18).

### Slider Left Margin

`sliderLeftMargin = 220px` — calculated to accommodate the longest label text:
`"Atomic Number (Z): 18"` at 15px bold font ≈ 200px, plus padding.

---

## Nucleus Packing Algorithm

### Design Goal

Protons and neutrons should always appear as a tight, dense cluster — like a real
atomic nucleus — with circles touching or slightly overlapping, regardless of Z.

### Ring Structure

Particles are placed in concentric rings using a standard hexagonal close-packing
approximation:

| Ring | Max particles | Radius from center |
|------|--------------|-------------------|
| 0    | 1            | 0px (center)      |
| 1    | 6            | 11px              |
| 2    | 12           | 22px              |
| 3    | 18           | 33px              |
| 4    | 24           | 44px              |

**Ring step = `2 * r - 1 = 11px`** where `r = 6px` (particle radius, diameter 12px).
At step 11px, adjacent ring circles overlap by 1px — giving the "touching with slight
overlap" appearance requested.

The maximum number of particles per ring follows from the circumference divided by
particle diameter: `floor(2π × ringRadius / diameter)`, which gives 6, 12, 18, 24
for rings 1–4. This comfortably covers Z=1–18 (maximum 40 total particles for Argon).

### Type Assignment

Types (proton/neutron) are assigned with a deterministic shuffle using a seeded
Linear Congruential Generator (LCG) keyed to Z. This produces a stable, reproducible
mixed arrangement each time the same Z is selected, without requiring a fixed
hard-coded layout per element. The shuffle seed `Z * 1997 + 31` was chosen to
avoid obviously unbalanced outputs for small Z values.

### Bug Fixed: Runaway Nucleus Scaling

The initial implementation contained two compounding bugs that caused the nucleus
to spread far apart at high Z values:

**Bug 1 — Draw-time scaling multiplier:**
```javascript
// WRONG: For Argon (Z=18, n=22, total=40):
// sqrt(40) * 0.75 ≈ 4.74 → nucleus positions multiplied by 4.74×!
const nucleusScale = max(1, sqrt(Z + neutrons) * 0.75);
```
This was added with the intent of making the nucleus "grow" visually with Z, but the
`sqrt` growth was far too aggressive. For Argon it stretched the nucleus to fill the
entire drawing area.

**Bug 2 — Ring step too large:**
```javascript
// WRONG: (r*2 + 2) = 14px step — gap of 2px between touching circles
const ringR = ringIdx === 0 ? 0 : (r * 2 + 2) * ringIdx;
```
The `+2` added unnecessary space between rings. Combined with the scaling multiplier,
ring 3 particles ended up ~42px × 4.74 ≈ 200px from center for Argon.

**Fix applied:**
```javascript
// CORRECT: Remove draw-time scaling entirely
const px = cx + p.x;   // scale = 1 always
const py = cy + p.y;

// CORRECT: Slight overlap between rings
const ringStep = r * 2 - 1;  // = 11px for r=6
const ringR = ringIdx === 0 ? 0 : ringStep * ringIdx;
```

After the fix, the Argon nucleus (40 particles, 4 rings) spans a radius of only 44px
from center — a tight, compact cluster that is clearly distinct from the electron shells.

---

## Visual Design Decisions

### Background Color Override

The standard p5-guide calls for `fill('aliceblue')` in the drawing region.
This MicroSim overrides that to `fill('#0d1117')` (dark navy) because:
- The specification explicitly required dark navy for accessibility and visual contrast
- Red protons, gray neutrons, and blue electrons are all much more legible on dark
  backgrounds than on light ones
- The dark background creates a "space" aesthetic appropriate for atomic-scale content

The control region retains the standard white background for legibility of slider
labels at the bottom.

### Electron Shell Geometry

Shells are drawn as **dashed ellipses** (not circles) to give a 3D orbital suggestion:

```
Shell 1: rx = atomAreaW * 0.22,  ry = rx * 0.55
Shell 2: rx = atomAreaW * 0.36,  ry = rx * 0.55
Shell 3: rx = atomAreaW * 0.48,  ry = rx * 0.55
```

The Y-flattening factor of 0.55 (ellipse aspect ratio) was chosen to suggest a
3D cross-section perspective while keeping all three shells visible within the
drawing area at the 390px height.

### Legend Panel Contents

The right-side legend panel was designed to reinforce both learning objectives
simultaneously:

1. **Element symbol (large, gold)** — immediately identifies the element (L2)
2. **Element name** — connects symbol to full name (L1)
3. **Particle counts** with color-coded swatches (L1 — identify and count)
4. **Per-shell electron configuration** (L2 — explain configuration patterns)

The gold color (`255, 230, 80`) was chosen for high contrast against the dark panel
background for values that students need to read accurately.

### Hover Tooltip

Tooltip text uses "Proton (+1)" and "Neutron (0)" rather than "Proton" and "Neutron"
alone, to reinforce charge information (a key L1 objective). The tooltip appears
offset `+14px` right and `-14px` up from the particle to avoid obscuring it.

---

## File Inventory

| File | Lines | Purpose |
|------|-------|---------|
| `atomic-structure-diagram.js` | 401 | p5.js simulation logic |
| `main.html` | 19 | HTML shell with p5.js CDN |
| `index.md` | 74 | Documentation, iframe, lesson plan |
| `metadata.json` | — | Dublin Core metadata (scaffold-generated) |

---

## Validation Results

```
MicroSim                          Score  Grade
atomic-structure-diagram           93    A

Notes:
  - screenshot PNG missing (to be added manually after visual review)
  - createSlider() flagged as DOM function (intentional — required by p5-guide)
```

The two flagged items are expected and acceptable:
- Screenshot must be captured manually from a running browser
- `createSlider()` is a p5.js native control, required by the style guide

---

## Navigation

mkdocs.yml updated automatically via `update-mkdocs-nav.py`.
The sim is now listed in the MicroSims section (7 total MicroSims in the project).

**Local test URL:** `http://127.0.0.1:8000/chemistry/sims/atomic-structure-diagram/`
