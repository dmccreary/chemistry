---
title: Sigma and Pi Bond Formation Visualization
description: Interactive comparison of sigma and pi bond orbital overlap. Twist one atom to see that sigma overlap is unchanged while pi overlap disappears, and count the sigma and pi bonds in single, double, and triple bonds.
image: /sims/sigma-pi-bond-diagram/sigma-pi-bond-diagram.png
og:image: /sims/sigma-pi-bond-diagram/sigma-pi-bond-diagram.png
twitter:image: /sims/sigma-pi-bond-diagram/sigma-pi-bond-diagram.png
social:
   cards: false
quality_score: 100
---

# Sigma and Pi Bond Formation Visualization

<iframe src="main.html" height="572px" width="100%" scrolling="no"></iframe>

[Run the Sigma and Pi Bond MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Covalent bonds come in two kinds, and the difference is the direction of the orbital overlap.

- A **sigma bond** ($\sigma$) forms when two orbitals overlap **end-on**, directly along the internuclear axis. Seen looking down the axis, the electron density is a circle.
- A **pi bond** ($\pi$) forms when two parallel p orbitals overlap **side by side**, above and below the axis, with a node on the axis itself.

Each panel shows a side view and a view looking along the internuclear axis. Atom 1's orbitals are blue, atom 2's are red, and the region where they overlap is purple.

The **Twist angle** slider rotates atom 2 about the internuclear axis:

- The sigma overlap stays at 100% no matter how far you twist, because a circle looks the same from every angle. **Sigma bonds allow free rotation.**
- The pi overlap falls as the p orbitals come out of line (it is proportional to the cosine of the twist angle) and reaches zero at 90°. Twisting a double bond means breaking its pi bond, which costs a lot of energy. **Pi bonds prevent rotation.**

The three cards at the bottom count the bonds:

| Bond | Sigma bonds | Pi bonds |
|---|---|---|
| Single | 1 | 0 |
| Double | 1 | 1 |
| Triple | 1 | 2 |

## How to Use

1. Start with the **double bond**. Compare the two side views: which overlap lies on the internuclear axis, and which lies above and below it?
2. **Drag the Twist angle slider** slowly from 0° to 90°. Watch the purple overlap region and the overlap percentage in each panel.
3. **Click the Single bond card** (or use the Bond type menu). The pi panel turns gray because a single bond has no pi bond, and the two ends can rotate freely.
4. **Click the Triple bond card** to see the second pi bond, formed by p orbitals pointing in front of and behind the page. The view along the axis shows the two pi bonds at right angles. (The twist slider is switched off here; use the double bond for the twist test.)
5. For each bond type, state the number of sigma and pi bonds before reading the card.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/chemistry/sims/sigma-pi-bond-diagram/main.html"
        height="572px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (AP Chemistry, Chapter 5: Molecular Geometry and Polarity)

### Duration
10-15 minutes

### Learning Objectives

- **Understand:** Distinguish sigma and pi bonds by their orbital overlap patterns.
- **Understand:** Explain why pi bonds restrict rotation about a bond while sigma bonds do not.
- **Analyze:** Count the sigma and pi bonds in single, double, and triple bonds and in whole molecules.

### Prerequisites

- Shapes of s, p, and hybrid orbitals
- Lewis structures with single, double, and triple bonds

### Activities

1. **Exploration** (3 min): With the double bond selected and no twist, students describe the two overlap patterns in their own words and sketch both views.
2. **Predict, Then Test** (4 min): Ask: *What will happen to each overlap if one end of the molecule is twisted by 90°?* Students write a prediction, then drag the slider and record the overlap at 0°, 45°, and 90°.
3. **Explain** (3 min): Students use their observations to explain why 2-butene has cis and trans isomers but butane does not.
4. **Assessment** (4 min): Students count the sigma and pi bonds in ethane ($\ce{C2H6}$: 7 sigma), ethene ($\ce{C2H4}$: 5 sigma, 1 pi), and ethyne ($\ce{C2H2}$: 3 sigma, 2 pi), including the C–H bonds.

### Assessment

- Can the student identify a sigma or pi bond from a picture of the overlap?
- Can the student explain restricted rotation in terms of broken pi overlap?
- Can the student count all sigma and pi bonds in a molecule from its Lewis structure?

## References

1. [OpenStax Chemistry 2e, Section 8.1: Valence Bond Theory](https://openstax.org/books/chemistry-2e/pages/8-1-valence-bond-theory) - OpenStax - Free textbook section that introduces sigma and pi bonds as end-to-end and side-by-side overlap.
2. [OpenStax Chemistry 2e, Section 8.3: Multiple Bonds](https://openstax.org/books/chemistry-2e/pages/8-3-multiple-bonds) - OpenStax - Describes the sigma and pi bonds in ethene and ethyne and why rotation about a double bond is restricted.
3. [AP Chemistry Course and Exam Description](https://apcentral.collegeboard.org/courses/ap-chemistry) - College Board - Unit 2, Topic 2.7 (VSEPR and Hybridization), which includes sigma and pi bonding.
