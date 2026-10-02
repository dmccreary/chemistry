---
title: Reaction Energy Diagram
description: Interactive reaction coordinate diagram showing reactants, products, the transition state, forward and reverse activation energy, and the enthalpy change for exothermic and endothermic reactions, with a click-to-identify quiz.
image: /sims/reaction-energy-diagram/reaction-energy-diagram.png
og:image: /sims/reaction-energy-diagram/reaction-energy-diagram.png
twitter:image: /sims/reaction-energy-diagram/reaction-energy-diagram.png
social:
   cards: false
quality_score: 100
---

# Reaction Energy Diagram

<iframe src="main.html" height="577px" width="100%" scrolling="no"></iframe>

[Run the Reaction Energy Diagram MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A **reaction energy diagram** (also called a reaction coordinate diagram) plots the potential energy of a reacting system as reactants turn into products. This MicroSim labels the six features you need to be able to find on one:

- **Reactants** and **products**: the flat energy levels at the left and right.
- **Transition state** (activated complex): the peak of the curve, the highest-energy arrangement of atoms along the path.
- **$E_a$ (forward)**: the climb from the reactants to the transition state.
- **$E_a$ (reverse)**: the climb from the products to the transition state.
- **$\Delta H$**: the energy of the products minus the energy of the reactants.

The three energies are tied together. Because both activation energies end at the same peak:

$$E_{a(\text{reverse})} = E_{a(\text{forward})} - \Delta H$$

For the starting diagram, $E_{a(\text{forward})} = 120$ kJ/mol and $\Delta H = -80$ kJ/mol, so $E_{a(\text{reverse})} = 120 - (-80) = 200$ kJ/mol.

The sign of $\Delta H$ tells you which kind of reaction it is:

| | Exothermic | Endothermic |
|---|---|---|
| Products compared with reactants | lower in energy | higher in energy |
| Sign of $\Delta H$ | negative | positive |
| Larger barrier | reverse | forward |

In an endothermic reaction $\Delta H$ can never be larger than $E_{a(\text{forward})}$, because the products cannot sit above the transition state. The MicroSim enforces this limit.

## How to Use

1. **Point at any part of the diagram** (a level, the red dot, or an arrow) to see what it represents.
2. **Press Switch to Endothermic** to raise the products above the reactants, and **Switch to Exothermic** to return.
3. **Drag the sliders** to change $E_a$ (forward) and the size of $\Delta H$. The energy scale is fixed, so the heights on the diagram change directly, and the white panel recalculates $E_a$ (reverse).
4. **Press Quiz Me** to hide the labels. The panel names a feature and you click on it. You are told at once whether you are right, and your first-try score is reported at the end.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/chemistry/sims/reaction-energy-diagram/main.html"
        height="577px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (AP Chemistry, Chapter 10: Reaction Rates and Rate Laws)

### Duration
10-15 minutes

### Learning Objectives

- **Remember:** Identify the reactants, products, transition state, $E_a$ (forward), $E_a$ (reverse), and $\Delta H$ on a reaction coordinate diagram.
- **Understand:** Relate the sign of $\Delta H$ to whether a reaction is exothermic or endothermic.
- **Understand:** Explain why $E_{a(\text{reverse})} = E_{a(\text{forward})} - \Delta H$.

### Prerequisites

- Collision theory and the idea of an energy barrier
- Potential energy and the meaning of $\Delta H$

### Activities

1. **Exploration** (3 min): Point at each of the six features and read its description. Students sketch the diagram in their notes and label it from memory.
2. **Compare the two cases** (4 min): Switch between exothermic and endothermic several times. Students record, for each case, which level is higher, the sign of $\Delta H$, and which activation energy is larger.
3. **Check the relationship** (4 min): Students set $E_a$ (forward) to 150 kJ/mol and the size of $\Delta H$ to 60 kJ/mol, predict $E_a$ (reverse) for the exothermic case (210 kJ/mol) and the endothermic case (90 kJ/mol), then check both.
4. **Assessment** (3 min): Students take the quiz in each mode and report their first-try scores.

### Assessment

- Can the student point to each of the six features without labels?
- Can the student state the sign of $\Delta H$ from the relative heights of reactants and products?
- Can the student calculate $E_a$ (reverse) from $E_a$ (forward) and $\Delta H$?

## References

1. [OpenStax Chemistry 2e, Section 12.5: Collision Theory](https://openstax.org/books/chemistry-2e/pages/12-5-collision-theory) - OpenStax - Free textbook section covering activation energy, the transition state, and reaction diagrams.
2. [AP Chemistry Course and Exam Description](https://apcentral.collegeboard.org/courses/ap-chemistry) - College Board - Unit 5, Topic 5.6 (Reaction Energy Profile) describes the features of energy profiles that students must interpret.
3. [Activation energy](https://en.wikipedia.org/wiki/Activation_energy) - Wikipedia - Definition of activation energy and its relation to the transition state.
