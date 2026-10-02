---
title: Resonance Structures Comparison Infographic
description: Interactive comparison of the resonance structures of ozone, the nitrate ion, benzene, and the cyanate ion beside their resonance hybrid, with formal charge and bond order calculations revealed by pointing at atoms and bonds.
image: /sims/resonance-structures-infographic/resonance-structures-infographic.png
og:image: /sims/resonance-structures-infographic/resonance-structures-infographic.png
twitter:image: /sims/resonance-structures-infographic/resonance-structures-infographic.png
social:
   cards: false
quality_score: 100
---

# Resonance Structures Comparison Infographic

<iframe src="main.html" height="606px" width="100%" scrolling="no"></iframe>

[Run the Resonance Structures Comparison MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Some molecules and ions cannot be described by a single Lewis structure. This MicroSim puts every valid resonance structure side by side, joined by double-headed resonance arrows, and draws the **resonance hybrid** underneath.

- **Top row:** the contributing structures, with lone pairs as red dots and nonzero formal charges in green (negative) or red (positive). Only electrons differ between them. The atoms never move.
- **Bottom left:** the resonance hybrid, the one real structure. A dashed blue line marks a partial bond with a fractional bond order.
- **Bottom right:** an explanation panel. Point at any atom to see its formal charge worked out with $FC = V - N - \frac{B}{2}$, or point at a bond in the hybrid to see its bond order.

Four species are included:

| Species | Structures | What to notice |
|---|---|---|
| Ozone, $\ce{O3}$ | 2 equivalent | Both O–O bonds have bond order 1.5 |
| Nitrate ion, $\ce{NO3-}$ | 3 equivalent | Each N–O bond has bond order 4/3; each O carries −2/3 |
| Benzene, $\ce{C6H6}$ | 2 equivalent | All six C–C bonds have bond order 1.5 |
| Cyanate ion, $\ce{OCN-}$ | 3 **not** equivalent | Formal charges decide which structure contributes most |

The drawing is deliberately still. A molecule does not flip back and forth between its resonance structures, so nothing here moves.

## How to Use

1. **Choose a species** from the Species menu.
2. **Compare the structures in the top row.** What stays the same? What moves?
3. **Point at an atom** (or tap it) to see its formal charge calculation in the panel. Check that the formal charges in each structure add up to the charge on the species.
4. **Point at a bond in the hybrid** to see how its bond order is averaged from the contributing structures.
5. **Predict first:** uncheck *Hybrid and ranking*, decide what the hybrid should look like and which structures matter most, then check the box again.
6. Uncheck *Formal charges* to practice assigning them yourself.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/chemistry/sims/resonance-structures-infographic/main.html"
        height="606px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (AP Chemistry, Chapter 4: Chemical Bonding and Lewis Structures)

### Duration
15 minutes

### Learning Objectives

- **Understand:** Explain what resonance structures represent and distinguish them from the resonance hybrid.
- **Analyze:** Identify which resonance structures contribute more to the hybrid by comparing formal charges.

### Prerequisites

- Drawing Lewis structures for molecules and polyatomic ions
- Counting valence electrons, bonding electrons, and lone pairs

### Activities

1. **Exploration** (3 min): With ozone selected, students describe in one sentence how Structure 1 differs from Structure 2. Emphasize that the atoms have not moved.
2. **Predict the Hybrid** (4 min): Select the nitrate ion and uncheck *Hybrid and ranking*. Students sketch the hybrid and predict the N–O bond order, then check the box and point at a hybrid bond to confirm $(2 + 1 + 1) \div 3 = 1.33$.
3. **Formal Charge Practice** (4 min): Uncheck *Formal charges*. For the cyanate ion, students calculate the formal charge on every atom in all three structures on paper, then turn the labels back on to check.
4. **Rank the Contributors** (4 min): Still on cyanate, students rank the three structures and justify the ranking using two rules: smaller formal charges are better, and a negative formal charge belongs on the more electronegative atom.

### Assessment

- Can the student explain why the double-headed arrow does not mean the molecule switches between structures?
- Can the student calculate a bond order for a hybrid from its contributing structures?
- Can the student use formal charges to choose the major contributor among non-equivalent structures?

## References

1. [OpenStax Chemistry 2e, Section 7.4: Formal Charges and Resonance](https://openstax.org/books/chemistry-2e/pages/7-4-formal-charges-and-resonance) - OpenStax - Free textbook section covering formal charge, resonance forms, and resonance hybrids.
2. [OpenStax Chemistry 2e, Section 7.3: Lewis Symbols and Structures](https://openstax.org/books/chemistry-2e/pages/7-3-lewis-symbols-and-structures) - OpenStax - Background on drawing the Lewis structures used here.
3. [AP Chemistry Course and Exam Description](https://apcentral.collegeboard.org/courses/ap-chemistry) - College Board - Unit 2 topic on resonance and formal charge.
