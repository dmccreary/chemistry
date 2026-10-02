---
title: Redox Half-Reaction Balancing Walkthrough
description: Step through the half-reaction method for balancing redox equations in acidic and basic solution, with atom and charge counters that turn green as each requirement is met.
image: /sims/redox-half-reaction-walkthrough/redox-half-reaction-walkthrough.png
og:image: /sims/redox-half-reaction-walkthrough/redox-half-reaction-walkthrough.png
twitter:image: /sims/redox-half-reaction-walkthrough/redox-half-reaction-walkthrough.png
social:
   cards: false
quality_score: 100
---

# Redox Half-Reaction Balancing Walkthrough

<iframe src="main.html" height="502px" width="100%" scrolling="no"></iframe>

[Run the Redox Half-Reaction Balancing Walkthrough MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

The **half-reaction method** balances a redox equation by splitting it into a reduction half-reaction and an oxidation half-reaction, balancing each one, and adding them back together so that the electrons cancel. This MicroSim walks through the method one step at a time for four reactions.

On every step you see:

- **The equation or half-reactions** as they stand after that step. Anything that was just added or changed is highlighted in yellow.
- **Counters** under each equation showing *left count | right count* for every element and for charge. A counter is green when the two sides match and red when they do not.
- **A checklist** of the five balancing requirements: other atoms, oxygen, hydrogen, charge, and equal electrons.

The steps follow the procedure in the chapter:

1. Write the unbalanced net ionic equation.
2. Separate it into two half-reactions.
3. Balance all atoms except H and O.
4. Balance O by adding $\ce{H2O}$.
5. Balance H by adding $\ce{H+}$.
6. Balance charge by adding electrons to the more positive side.
7. Multiply the half-reactions so the electrons are equal.
8. Add the half-reactions and cancel electrons, plus any $\ce{H+}$ or $\ce{H2O}$ on both sides.
9. Verify atoms and charge.

For a reaction in **basic solution** three more steps follow: add one $\ce{OH-}$ to both sides for every $\ce{H+}$, combine $\ce{H+}$ and $\ce{OH-}$ on the same side into $\ce{H2O}$, and cancel $\ce{H2O}$ that appears on both sides.

The balanced equations reached at the end are:

| Reaction | Balanced net ionic equation |
|---|---|
| Permanganate and iron(II), acidic | $\ce{MnO4- + 8H+ + 5Fe^2+ -> Mn^2+ + 4H2O + 5Fe^3+}$ |
| Dichromate and oxalate, acidic | $\ce{Cr2O7^2- + 14H+ + 3C2O4^2- -> 2Cr^3+ + 7H2O + 6CO2}$ |
| Chlorine and bromide | $\ce{Cl2 + 2Br- -> 2Cl- + Br2}$ |
| Permanganate and iron(II) hydroxide, basic | $\ce{MnO4- + 2H2O + 3Fe(OH)2 -> MnO2 + 3Fe(OH)3 + OH-}$ |

In basic solution permanganate is reduced to solid $\ce{MnO2}$ rather than to $\ce{Mn^2+}$, and iron(II) is present as solid $\ce{Fe(OH)2}$, so the fourth reaction has different products from the first.

## How to Use

1. **Choose a reaction** from the Select Reaction menu.
2. **Press Next Step.** Before you do, predict what the step will add and to which side.
3. **Read the counters.** Find the red counter that the current step is meant to fix, then check that it has turned green.
4. **Watch the checklist** fill in from left to right. All five items are green only when the half-reactions are ready to add.
5. Use **Previous Step** to go back, or **Start Over** to return to step 1.

At step 7, blue circles show the electrons passing from the oxidation half-reaction to the reduction half-reaction. They move while the pointer is over the MicroSim.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/chemistry/sims/redox-half-reaction-walkthrough/main.html"
        height="502px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (AP Chemistry, Chapter 8: Chemical Reactions and Equations)

### Duration
15-20 minutes

### Learning Objectives

- **Apply:** Carry out each step of the half-reaction method for a redox equation in acidic or basic solution.
- **Evaluate:** Verify conservation of mass and conservation of charge at each stage and in the final equation.

### Prerequisites

- Oxidation states and how to assign them
- Identifying what is oxidized and what is reduced
- Net ionic equations

### Activities

1. **Guided walkthrough** (5 min): Step through the permanganate and iron(II) reaction together. At each step, students name the red counter being fixed before Next Step is pressed.
2. **Predict each step** (6 min): Students work the dichromate and oxalate reaction on paper one step at a time, pressing Next Step only to check each line.
3. **Simple case** (2 min): Run the chlorine and bromide reaction. Ask: *Why do steps 4 and 5 do nothing here?*
4. **Basic solution** (5 min): Run the fourth reaction through all 12 steps. Students explain why adding the same number of $\ce{OH-}$ to both sides keeps the equation balanced.
5. **Assessment** (2 min): Give students the final equation for one reaction and have them count atoms and total charge on each side without the MicroSim.

### Assessment

- Can the student state what each step balances and which species it uses to do so?
- Can the student show that electrons lost equal electrons gained before adding the half-reactions?
- Can the student verify both atom balance and charge balance in a final equation?

## References

1. [OpenStax Chemistry 2e, Section 17.1: Review of Redox Chemistry](https://openstax.org/books/chemistry-2e/pages/17-1-review-of-redox-chemistry) - OpenStax - Free textbook section presenting the half-reaction method in acidic and basic solution with worked examples.
2. [AP Chemistry Course and Exam Description](https://apcentral.collegeboard.org/courses/ap-chemistry) - College Board - Unit 4, Topic 4.9 (Oxidation-Reduction Reactions) covers balancing redox equations with half-reactions.
3. [Half-reaction](https://en.wikipedia.org/wiki/Half-reaction) - Wikipedia - Definition of half-reactions and the method for balancing them in acid and base.
