---
title: Hybridization Orbital Mixing Diagram
description: Interactive diagram of sp, sp2, and sp3 hybridization showing which atomic orbitals mix, the hybrid orbitals that result, the leftover p orbitals, and the geometry and bond angle, with a practice mode for finding the hybridization of a central atom.
image: /sims/hybridization-diagram/hybridization-diagram.png
og:image: /sims/hybridization-diagram/hybridization-diagram.png
twitter:image: /sims/hybridization-diagram/hybridization-diagram.png
social:
   cards: false
quality_score: 100
---

# Hybridization Orbital Mixing Diagram

<iframe src="main.html" height="577px" width="100%" scrolling="no"></iframe>

[Run the Hybridization Orbital Mixing MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Hybridization mixes an atom's valence s and p orbitals into a new set of equivalent hybrid orbitals. The key rule: **the number of hybrid orbitals formed always equals the number of atomic orbitals mixed.**

Each of the three panels shows one kind of hybridization:

- **Before mixing:** the 2s orbital (blue) and the three 2p orbitals (orange). The orbitals that take part in mixing have a heavy outline; the p orbitals that sit out are drawn in a lighter shade.
- **After mixing:** the hybrid orbitals (green) plus any unhybridized p orbitals (orange). Count the boxes: there are always four before and four after.
- **Height shows energy.** The 2s box is lower than the 2p boxes, and the hybrids land in between.
- **Geometry picture:** the hybrid orbitals point as far apart as possible, giving the bond angle shown.

| Hybridization | Orbitals mixed | Hybrid orbitals | Electron geometry | Bond angle | Unhybridized p orbitals |
|---|---|---|---|---|---|
| sp | s + p | 2 | Linear | 180° | 2 |
| sp² | s + p + p | 3 | Trigonal planar | 120° | 1 |
| sp³ | s + p + p + p | 4 | Tetrahedral | 109.5° | 0 |

The unhybridized p orbitals matter: they are the orbitals that overlap side by side to form pi bonds in double and triple bonds.

## How to Use

1. **Explore:** click any panel to highlight it and read its details in the box underneath.
2. **Practice:** choose a molecule from the Mode menu. The box counts the electron groups around the central atom (bonded atoms plus lone pairs; a double or triple bond counts as one group).
3. **Click the panel** whose hybridization makes that many hybrid orbitals. A green outline means correct; a red outline explains what to reconsider.
4. Work through all eight practice molecules, then return to Explore.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/chemistry/sims/hybridization-diagram/main.html"
        height="577px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (AP Chemistry, Chapter 5: Molecular Geometry and Polarity)

### Duration
10-15 minutes

### Learning Objectives

- **Understand:** Explain how atomic orbitals combine to form hybrid orbitals, and why the number of orbitals is conserved.
- **Understand:** Connect each hybridization type to its electron geometry and bond angle.
- **Apply:** Determine the hybridization of a central atom from its number of electron groups.

### Prerequisites

- Shapes of s and p orbitals
- Lewis structures and counting electron groups (VSEPR)

### Activities

1. **Exploration** (3 min): Click each panel in turn. Students complete the sentence "Mixing one s and ___ p orbitals makes ___ hybrid orbitals and leaves ___ p orbitals."
2. **Guided Practice** (4 min): Choose *Practice: CH₄*, then *NH₃*, then *H₂O*. Ask: *Why do all three have the same hybridization but different molecular shapes?*
3. **Multiple Bonds** (4 min): Choose *C₂H₄* and *C₂H₂*. Students explain why a double or triple bond counts as only one electron group and what the leftover p orbitals are used for.
4. **Assessment** (3 min): Without the MicroSim, students state the hybridization and bond angle around the carbon atom in $\ce{CO2}$ and in formaldehyde, $\ce{CH2O}$, with a one-sentence justification.

### Assessment

- Can the student state the hybridization for 2, 3, and 4 electron groups?
- Does the student count a multiple bond as a single electron group?
- Can the student explain where the electrons of a pi bond are located in terms of unhybridized p orbitals?

## References

1. [OpenStax Chemistry 2e, Section 8.2: Hybrid Atomic Orbitals](https://openstax.org/books/chemistry-2e/pages/8-2-hybrid-atomic-orbitals) - OpenStax - Free textbook section describing sp, sp², and sp³ hybridization with orbital diagrams.
2. [OpenStax Chemistry 2e, Section 8.3: Multiple Bonds](https://openstax.org/books/chemistry-2e/pages/8-3-multiple-bonds) - OpenStax - Explains how unhybridized p orbitals form pi bonds.
3. [AP Chemistry Course and Exam Description](https://apcentral.collegeboard.org/courses/ap-chemistry) - College Board - Unit 2, Topic 2.7 (VSEPR and Hybridization).
