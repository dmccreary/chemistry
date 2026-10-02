---
title: Dalton's Law Partial Pressure Infographic
description: Interactive infographic for Dalton's law of partial pressures. Adjust the moles of three gases and the total pressure to see mole fractions, partial pressures, a pie chart, and particle pictures update together.
image: /sims/dalton-law-partial-pressure/dalton-law-partial-pressure.png
og:image: /sims/dalton-law-partial-pressure/dalton-law-partial-pressure.png
twitter:image: /sims/dalton-law-partial-pressure/dalton-law-partial-pressure.png
social:
   cards: false
quality_score: 100
---

# Dalton's Law Partial Pressure Infographic

<iframe src="main.html" height="562px" width="100%" scrolling="no"></iframe>

[Run the Dalton's Law Partial Pressure Infographic MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

In a mixture of ideal gases that do not react, each gas behaves as if it were alone in the container. The pressure it would exert alone is its **partial pressure**, and **Dalton's law** says the partial pressures add up to the total pressure:

$$P_{total} = P_A + P_B + P_C$$

Each partial pressure is set by the gas's share of the particles, its **mole fraction**:

$$\chi_i = \frac{n_i}{n_{total}} \qquad\qquad P_i = \chi_i \cdot P_{total}$$

The MicroSim shows this three ways:

- **Flasks.** The first three flasks hold gas A, gas B, and gas C alone; the fourth holds the mixture. All four flasks have the same volume and temperature, so the number of dots is proportional to pressure (40 dots per atmosphere). The mixture flask is the three single-gas flasks laid on top of one another, with every dot in the same place.
- **Pie chart.** Each sector is one gas's mole fraction.
- **Table.** Moles, mole fraction, and partial pressure for each gas, with a totals row. The mole fractions always total 1 and the partial pressures always total $P_{total}$.

Notice that the identity of a gas never enters the calculation. Only its share of the moles matters.

## How to Use

1. **Start with the default mixture**: 1.6 mol of A, 1.4 mol of B, and 1.0 mol of C at a total pressure of 1.00 atm. Check the table by hand: $\chi_A = 1.6 / 4.0 = 0.400$, so $P_A = 0.400 \times 1.00 = 0.400$ atm.
2. **Drag a moles slider.** Adding more of one gas raises its mole fraction and lowers the mole fractions of the other two, even though their amounts did not change.
3. **Drag the Total P slider.** Mole fractions (and the pie chart) stay the same, while every partial pressure scales in proportion.
4. **Verify Dalton's law** in the white equation bar: the three partial pressures always sum to the total pressure.

Displayed values are rounded to three decimal places, so a displayed sum can occasionally differ from the total by 0.001.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/chemistry/sims/dalton-law-partial-pressure/main.html"
        height="562px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (AP Chemistry, Chapter 6: Intermolecular Forces and States of Matter)

### Duration
10-15 minutes

### Learning Objectives

- **Apply:** Calculate the mole fraction and partial pressure of each gas in a mixture from the moles of each gas and the total pressure.
- **Apply:** Verify that the partial pressures of the gases in a mixture add up to the total pressure.
- **Understand:** Explain why partial pressure depends on a gas's share of the particles and not on its identity.

### Prerequisites

- The mole and the ideal gas law, $PV = nRT$
- Pressure units (atm)

### Activities

1. **Exploration** (3 min): With the default mixture, count the dots in each single-gas flask and in the mixture flask. Ask: *How is the mixture flask related to the other three?*
2. **Predict, Then Check** (5 min): Set A = 3.0 mol, B = 0.5 mol, C = 0.5 mol, and Total P = 2.00 atm. Before reading the table, students calculate each mole fraction and partial pressure on paper (0.750, 0.125, 0.125 and 1.500 atm, 0.250 atm, 0.250 atm), then compare.
3. **Air as a Mixture** (4 min): Dry air is about 78% $\ce{N2}$, 21% $\ce{O2}$, and 1% Ar by moles. Students use $P_i = \chi_i \cdot P_{total}$ to find each partial pressure at 1.00 atm, then model a similar three-gas mixture with the sliders.
4. **Assessment** (3 min): A flask holds 2.0 mol of A and 1.0 mol each of B and C at 1.60 atm. Students find $P_A$ (0.800 atm) and explain what happens to $P_A$ if 1.0 mol more of B is added while the total pressure is held constant.

### Assessment

- Can the student calculate a mole fraction and state that mole fractions sum to 1?
- Can the student calculate each partial pressure and show that they sum to the total pressure?
- Can the student explain why changing the amount of one gas changes the mole fractions of the others?

## References

1. [OpenStax Chemistry 2e, Section 9.3: Stoichiometry of Gaseous Substances, Mixtures, and Reactions](https://openstax.org/books/chemistry-2e/pages/9-3-stoichiometry-of-gaseous-substances-mixtures-and-reactions) - OpenStax - Free textbook section covering Dalton's law, mole fraction, and gases collected over water.
2. [AP Chemistry Course and Exam Description](https://apcentral.collegeboard.org/courses/ap-chemistry) - College Board - Unit 3, Topic 3.4 (Ideal Gas Law) includes partial pressures and mole fractions of gas mixtures.
3. [Dalton's law](https://en.wikipedia.org/wiki/Dalton%27s_law) - Wikipedia - Statement of the law, its relation to mole fraction, and its limits for real gases.
