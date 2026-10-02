---
title: Formal Charge Calculator Infographic
description: Interactive formal charge calculator. Select any atom in a Lewis structure to see its valence, nonbonding, and bonding electrons highlighted and substituted into FC = V − N − B/2, then check that the formal charges add up to the charge on the species.
image: /sims/formal-charge-diagram/formal-charge-diagram.png
og:image: /sims/formal-charge-diagram/formal-charge-diagram.png
twitter:image: /sims/formal-charge-diagram/formal-charge-diagram.png
social:
   cards: false
quality_score: 100
---

# Formal Charge Calculator Infographic

<iframe src="main.html" height="542px" width="100%" scrolling="no"></iframe>

[Run the Formal Charge Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Formal charge is the charge an atom would have if every bonding pair were shared equally:

$$FC = V - N - \frac{B}{2}$$

- $V$ is the number of valence electrons in the free atom (blue box)
- $N$ is the number of nonbonding electrons on the atom, two for each lone pair (yellow box; the lone pairs are circled on the structure)
- $B$ is the number of bonding electrons around the atom: 2 for a single bond, 4 for a double bond, 6 for a triple bond (green box; the bonds are highlighted on the structure)

The MicroSim walks through this calculation one atom at a time. The numbers in the equation are color-coded to match the three boxes, and the result badge is green for 0, gold for +1 or −1, and red for larger charges. The strip at the bottom keeps a running list of every atom's formal charge and checks the rule that never fails: **the formal charges add up to the charge on the molecule or ion.**

Eight structures are included: $\ce{NH3}$, $\ce{NH4+}$, two candidate structures for $\ce{CO2}$, $\ce{CO}$, $\ce{O3}$, and two candidate structures for $\ce{SO4^{2-}}$. Comparing the paired structures shows how formal charge is used to choose between Lewis structures.

## How to Use

1. **Choose a structure** from the Structure menu. The central atom is selected first.
2. **Read the three boxes** and find the matching electrons on the drawing: circled lone pairs for $N$, highlighted bonds for $B$.
3. **Predict the formal charge of the next atom** before you look. Then click that atom, or press **Next Atom**, to check. A gray question mark beside an atom means you have not worked it yet.
4. When every atom is done, **check the sum** in the bottom strip and read the note about that structure.
5. **Compare the paired structures** for $\ce{CO2}$ and for $\ce{SO4^{2-}}$. Which one has formal charges closer to zero?
6. Check **Show all charges** to reveal every formal charge at once.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/chemistry/sims/formal-charge-diagram/main.html"
        height="542px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (AP Chemistry, Chapter 4: Chemical Bonding and Lewis Structures)

### Duration
15 minutes

### Learning Objectives

- **Apply:** Calculate the formal charge on each atom in a Lewis structure using $FC = V - N - \frac{B}{2}$.
- **Evaluate:** Use formal charges to decide which of two Lewis structures better represents a molecule or ion.

### Prerequisites

- Drawing Lewis structures, including lone pairs and multiple bonds
- Finding the number of valence electrons from the periodic table

### Activities

1. **Exploration** (3 min): With $\ce{NH3}$ selected, match each box to the drawing: where are the 2 nonbonding electrons, and where are the 6 bonding electrons? Then select a hydrogen atom and repeat.
2. **Predict, Then Check** (5 min): Switch to $\ce{NH4+}$ and then $\ce{O3}$. For each atom, students write the calculation on paper before clicking the atom. They confirm that the charges add up to +1 for ammonium and 0 for ozone.
3. **Evaluate Two Structures** (5 min): Work both $\ce{CO2}$ structures. Students state which is better and cite the rule they used (formal charges closest to zero; no positive charge on the more electronegative atom). Repeat for the two sulfate structures and discuss the trade-off between complete octets and smaller formal charges.
4. **Assessment** (2 min): Students explain in one sentence why carbon monoxide has a −1 formal charge on carbon even though oxygen is more electronegative.

### Assessment

- Does the student count both electrons of each lone pair for $N$ and all electrons in each bond for $B$?
- Does the student verify that the formal charges add up to the overall charge?
- Can the student justify a choice between two structures using formal charge rules?

## References

1. [OpenStax Chemistry 2e, Section 7.4: Formal Charges and Resonance](https://openstax.org/books/chemistry-2e/pages/7-4-formal-charges-and-resonance) - OpenStax - Free textbook section on calculating formal charges and using them to choose among Lewis structures.
2. [OpenStax Chemistry 2e, Section 7.3: Lewis Symbols and Structures](https://openstax.org/books/chemistry-2e/pages/7-3-lewis-symbols-and-structures) - OpenStax - Background on Lewis structures, octets, and expanded octets.
3. [AP Chemistry Course and Exam Description](https://apcentral.collegeboard.org/courses/ap-chemistry) - College Board - Unit 2, Topic 2.6 (Resonance and Formal Charge).
