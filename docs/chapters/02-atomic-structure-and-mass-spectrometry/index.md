---
title: Atomic Structure and Mass Spectrometry
description: Explore subatomic particles, isotopes, atomic mass, mass spectrometry, the mole concept, and chemical formulas in AP Chemistry.
generated_by: claude skill chapter-content-generator
date: 2026-02-20
version: 0.04
---
# Chapter 2: Atomic Structure and Mass Spectrometry

## Summary

This chapter explores the structure of atoms, including subatomic particles, isotopes, and atomic mass. Students learn the mole concept, molar mass calculations, percent composition, and how mass spectrometry reveals atomic composition.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

26. Subatomic Particles
27. Protons
28. Neutrons
29. Electrons
30. Atomic Number
31. Mass Number
32. Isotopes
33. Atomic Mass
34. Average Atomic Mass
35. Mass Spectrometry
36. Mass Spectrum Analysis
37. Relative Abundance
38. Mole Concept
39. Avogadro's Number
40. Molar Mass
41. Mole Calculations
42. Percent Composition
43. Empirical Formula
44. Molecular Formula
45. Combustion Analysis

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Chemistry](../01-foundations-of-chemistry/index.md)

---

## 2.1 Subatomic Particles: The Building Blocks of Matter

Every material object you can see, touch, or smell is made of atoms — but atoms themselves are composed of even smaller components called **subatomic particles**. Modern atomic theory identifies three fundamental subatomic particles: **protons**, **neutrons**, and **electrons**. Understanding where these particles are located within an atom, how much they weigh, and what charges they carry is the foundation upon which all of chemistry is built.

The atom has two main regions. The **nucleus** is an incredibly small, dense core at the center of the atom that contains protons and neutrons tightly packed together. Surrounding the nucleus is a vast region of mostly empty space where electrons move. Although this outer region occupies essentially all of the atom's volume, it contains almost none of its mass — nearly all of an atom's mass resides in the nucleus.

### Properties of Subatomic Particles

The table below summarizes the key properties of each subatomic particle.

| Particle | Symbol | Location | Relative Charge | Relative Mass (amu) | Actual Mass (kg) |
|----------|--------|----------|-----------------|---------------------|------------------|
| Proton | p⁺ | Nucleus | +1 | 1.007 | \(1.673 \times 10^{-27}\) |
| Neutron | n⁰ | Nucleus | 0 | 1.008 | \(1.675 \times 10^{-27}\) |
| Electron | e⁻ | Electron cloud | −1 | 0.000549 | \(9.109 \times 10^{-31}\) |

The electron's mass is roughly 1/1836 that of a proton, which is why chemists treat electrons as essentially massless when calculating an atom's mass. The proton and neutron are so similar in mass (each approximately 1 atomic mass unit, or amu) that they dominate all mass calculations.

### Key Properties at a Glance

- Protons carry a positive charge of +1 and define an element's identity.
- Neutrons carry no charge (they are neutral) and contribute to nuclear stability.
- Electrons carry a negative charge of −1 and participate in chemical bonding.
- In a neutral atom, the number of protons always equals the number of electrons.
- The atomic mass unit (amu) is defined as exactly 1/12 the mass of a carbon-12 atom.

#### Diagram: Atomic Structure — Nucleus and Electron Cloud

<iframe src="../../sims/atomic-structure-diagram/main.html" height="442px" width="100%" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive Atomic Structure Diagram</summary>
Type: diagram-specification
**sim-id:** atomic-structure-diagram<br/>
**Library:** p5.js<br/>
**Status:** Specified

This MicroSim displays a stylized cross-section of an atom with an 800×450 px canvas that resizes responsively with the browser window. The nucleus is drawn as a dense cluster of colored circles near the canvas center: red circles represent protons and gray circles represent neutrons, randomly but compactly arranged. Electron "shells" are drawn as concentric dashed ellipses extending outward from the nucleus; small blue filled circles orbit along these ellipses. A slider labeled "Atomic Number (Z): 1–18" at the bottom of the canvas allows the user to select an element; as Z changes, the nucleus grows (more protons and neutrons appear), additional electron shells populate according to standard electron configurations (2, 8, 8), and all particle counts update in a live legend panel on the right. The legend lists: Protons (red), Neutrons (gray), Electrons (blue), and the element symbol with its name. Hovering over a nucleus particle triggers a tooltip showing "Proton (+1)" or "Neutron (0)". The canvas background is a very dark navy (#0d1117) with white labels for accessibility. Learning objective: Students will be able to identify the location and charge of each subatomic particle (Remembering) and explain how atomic number determines elemental identity (Understanding).
</details>

---

## 2.2 Atomic Number and Mass Number

Two integers fully characterize any atom: the **atomic number** and the **mass number**. These numbers are so fundamental that they appear in the standard notation used to represent any nuclide (a specific atom with a defined nucleus).

The **atomic number** (symbol: \(Z\)) is the number of protons in an atom's nucleus. Because no two elements share the same number of protons, the atomic number is the unique identifier for each element. Carbon always has 6 protons; oxygen always has 8 protons; gold always has 79 protons. If you change the number of protons, you change the element itself.

The **mass number** (symbol: \(A\)) is the total count of protons and neutrons in the nucleus. Because electrons have negligible mass, the mass number approximates the atom's total mass in atomic mass units. The number of neutrons in a nucleus is therefore:

$$
\text{Number of Neutrons} = A - Z
$$

Standard nuclide notation places the mass number as a superscript and the atomic number as a subscript to the left of the element symbol:

$$
{}^{A}_{Z}\text{X}
$$

For example, a carbon atom with 6 protons and 6 neutrons is written \({}^{12}_{6}\text{C}\), and one with 6 protons and 8 neutrons is written \({}^{14}_{6}\text{C}\).

---

## 2.3 Isotopes

Most elements exist in nature as a mixture of atoms that share the same atomic number but differ in their mass number. These variants are called **isotopes**. Isotopes of the same element have identical numbers of protons (and therefore identical chemical behavior) but different numbers of neutrons, giving them different masses.

Consider chlorine, which exists in two naturally occurring isotopes:

- **Chlorine-35** (\({}^{35}_{17}\text{Cl}\)): 17 protons, 18 neutrons — approximately 75.77% of all chlorine atoms
- **Chlorine-37** (\({}^{37}_{17}\text{Cl}\)): 17 protons, 20 neutrons — approximately 24.23% of all chlorine atoms

Because isotopes have the same number of protons and electrons, they form the same chemical compounds and react identically in most chemical reactions. Their physical properties (such as density and boiling point) differ very slightly because of the mass difference. This distinction is exploited in isotope tracing, nuclear medicine, and — critically for this chapter — mass spectrometry.

### Examples of Common Isotopes

| Element | Isotope Notation | Protons | Neutrons | Natural Abundance |
|---------|-----------------|---------|----------|-------------------|
| Hydrogen | \({}^{1}_{1}\text{H}\) (protium) | 1 | 0 | 99.985% |
| Hydrogen | \({}^{2}_{1}\text{H}\) (deuterium) | 1 | 1 | 0.015% |
| Carbon | \({}^{12}_{6}\text{C}\) | 6 | 6 | 98.89% |
| Carbon | \({}^{13}_{6}\text{C}\) | 6 | 7 | 1.11% |
| Carbon | \({}^{14}_{6}\text{C}\) | 6 | 8 | trace |
| Uranium | \({}^{235}_{92}\text{U}\) | 92 | 143 | 0.72% |
| Uranium | \({}^{238}_{92}\text{U}\) | 92 | 146 | 99.28% |

---

## 2.4 Atomic Mass and Average Atomic Mass

The **atomic mass** of a single atom is the mass of that specific nuclide measured in atomic mass units. The atomic mass of \({}^{12}_{6}\text{C}\) is defined as exactly 12.000 amu; all other atomic masses are measured relative to this standard. Because most elements exist as mixtures of isotopes, the value reported on the periodic table is not the mass of any single isotope — it is the **average atomic mass**, a weighted average that accounts for both the mass and the natural abundance of every isotope.

The formula for average atomic mass is:

$$
\bar{m} = \sum_{i} \left( \text{fractional abundance}_i \times \text{mass}_i \right)
$$

where the sum runs over all naturally occurring isotopes of the element. The fractional abundance is the percent abundance divided by 100.

### Worked Example: Average Atomic Mass of Chlorine

Given the two chlorine isotopes:

$$
\bar{m}_{\text{Cl}} = (0.7577 \times 34.969 \text{ amu}) + (0.2423 \times 36.966 \text{ amu})
$$

$$
\bar{m}_{\text{Cl}} = 26.496 \text{ amu} + 8.957 \text{ amu} = 35.453 \text{ amu}
$$

This calculated value matches the atomic mass listed on the periodic table for chlorine (35.45 amu), confirming the method. Notice that 35.45 amu is not the mass of either isotope — it lies between them, closer to chlorine-35 because that isotope is far more abundant. This weighted average concept is central to interpreting mass spectra.

---

## 2.5 Mass Spectrometry

**Mass spectrometry** is a powerful analytical technique that separates ions according to their mass-to-charge ratio (\(m/z\)) and measures the **relative abundance** of each ion. Originally developed in the early twentieth century by J.J. Thomson and refined by Francis Aston, modern mass spectrometers are indispensable tools in chemistry, biochemistry, environmental analysis, and forensic science.

### How a Mass Spectrometer Works

The operation of a mass spectrometer proceeds through four stages:

1. **Ionization**: A gaseous sample is bombarded with high-energy electrons (electron ionization) or exposed to other ionization techniques. Atoms or molecules lose one or more electrons, becoming positively charged ions.
2. **Acceleration**: The ions are accelerated through an electric field toward a detector. All ions acquire approximately the same kinetic energy.
3. **Deflection**: The ion beam passes through a magnetic field. Lighter ions (lower \(m/z\)) are deflected more; heavier ions (higher \(m/z\)) are deflected less. This separates ions by their mass-to-charge ratio.
4. **Detection**: A detector measures how many ions strike it at each deflection angle. The result is a **mass spectrum** — a bar graph of relative abundance versus \(m/z\).

### Reading a Mass Spectrum

**Mass spectrum analysis** involves interpreting the pattern of peaks in the spectrum. Each peak corresponds to a specific isotope or fragment. The height (or area) of each peak represents the **relative abundance** of that isotope — how common it is compared to the most abundant species, which is assigned 100% by convention.

For a monatomic element such as neon, the mass spectrum shows three peaks corresponding to its three naturally occurring isotopes: neon-20, neon-21, and neon-22. The tallest peak is at \(m/z = 20\), reflecting the fact that \({}^{20}\text{Ne}\) constitutes about 90.5% of natural neon.

#### Diagram: Interactive Mass Spectrometer Simulation

<iframe src="../../sims/mass-spectrometer-sim/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive Mass Spectrometer MicroSim</summary>
Type: MicroSim
**sim-id:** mass-spectrometer-sim<br/>
**Library:** p5.js<br/>
**Status:** Specified

This interactive MicroSim occupies an 800×450 px canvas (responsive to window width). The canvas is divided into two panels side by side. The LEFT panel (roughly 55% width) shows a schematic diagram of the mass spectrometer with labeled components drawn in a clean technical style on a dark background (#1a1a2e): (1) Sample inlet — a small square labeled "Sample"; (2) Ionization chamber — shown with lightning bolt symbols and a label "Ionization"; (3) Acceleration plates — two parallel lines with a voltage label; (4) Magnetic deflection region — a curved region where ion paths fan out as colored arcs, lighter ions curving more than heavier ones; (5) Detector — a vertical bar on the right where ion paths terminate. Animated colored dots (ions) travel from the sample through each stage in sequence when the simulation is running. The RIGHT panel (roughly 45% width) displays a real-time bar chart (mass spectrum) on axes labeled "m/z" (horizontal) and "Relative Abundance (%)" (vertical, 0–100). A dropdown menu above the panels lets the user select an element from: Chlorine, Neon, Carbon, Magnesium. When an element is selected, the animation and the bar chart both update to show that element's known isotope peaks, with bar heights proportional to natural abundance. Each bar is labeled with the isotope notation (e.g., ³⁵Cl). Clicking a bar highlights it and shows a tooltip: isotope symbol, exact mass, and percent abundance. A "Play / Pause" button controls the ion animation. Learning objective: Students will be able to interpret a mass spectrum to determine the isotopic composition of an element (Analyzing) and predict how changes in isotope abundance affect the average atomic mass (Evaluating).
</details>

---

## 2.6 The Mole Concept and Avogadro's Number

Atoms and molecules are inconceivably small. A single carbon atom has a mass of about \(1.99 \times 10^{-23}\) grams — far too tiny to weigh individually in any laboratory. Chemists solve this practical problem by working with enormously large collections of atoms rather than single ones, using a counting unit called the **mole**.

The **mole concept** is one of the most important ideas in chemistry. One mole (abbreviated mol) is defined as exactly \(6.02214076 \times 10^{23}\) elementary entities (atoms, molecules, ions, electrons, or any specified particle). This number is called **Avogadro's number** (\(N_A\)), named in honor of the Italian scientist Amedeo Avogadro:

$$
N_A = 6.022 \times 10^{23} \text{ mol}^{-1}
$$

The power of the mole is that it links the atomic mass scale (amu) to the macroscopic mass scale (grams). The **molar mass** of a substance is the mass in grams of exactly one mole of that substance, and it is numerically equal to the atomic mass (or molecular mass) in amu. For example:

- One atom of carbon-12 has a mass of 12.000 amu.
- One mole of carbon-12 atoms has a mass of 12.000 grams.

This elegant equivalence — amu per atom equals grams per mole — makes molar mass the crucial conversion factor between the atomic world and the laboratory world.

### Common Molar Masses

- Hydrogen (H): 1.008 g/mol
- Carbon (C): 12.011 g/mol
- Nitrogen (N): 14.007 g/mol
- Oxygen (O): 15.999 g/mol
- Sodium (Na): 22.990 g/mol
- Chlorine (Cl): 35.45 g/mol
- Iron (Fe): 55.845 g/mol

For compounds, the molar mass is calculated by summing the molar masses of all atoms in one formula unit. Water (\(\text{H}_2\text{O}\)) has a molar mass of:

$$
M_{\text{H}_2\text{O}} = 2(1.008) + 15.999 = 18.015 \text{ g/mol}
$$

---

## 2.7 Mole Calculations

**Mole calculations** are the arithmetic backbone of quantitative chemistry. Three quantities connect through molar mass and Avogadro's number: the mass of a sample (in grams), the number of moles, and the number of particles (atoms, molecules, or formula units).

The fundamental relationships are:

$$
n = \frac{m}{M}
$$

where \(n\) is the number of moles, \(m\) is the mass in grams, and \(M\) is the molar mass in g/mol. The number of particles \(N\) is:

$$
N = n \times N_A = \frac{m}{M} \times 6.022 \times 10^{23}
$$

### Mole Calculation Road Map

The diagram below summarizes the conversion relationships. Treat it as a triangle: given any one quantity, you can reach either of the other two using the appropriate conversion factor.

#### Diagram: Mole Concept Conversion Triangle

<details markdown="1">
<summary>Mole Concept Conversion Infographic</summary>
Type: diagram-specification
**sim-id:** mole-conversion-triangle<br/>
**Library:** p5.js<br/>
**Status:** Specified

This static (non-animated) infographic uses a 800×400 px canvas with a white or very light gray background. Three large rounded rectangles are arranged at the vertices of a triangle: top-center labeled "Moles (mol)" in deep blue, bottom-left labeled "Mass (grams)" in forest green, and bottom-right labeled "Particles (atoms / molecules)" in crimson. Thick bidirectional arrows connect each pair of vertices. Each arrow is labeled with the conversion factor: the arrow between Mass and Moles is labeled "÷ M (molar mass)" going right and "× M" going left; the arrow between Moles and Particles is labeled "× Nₐ (6.022 × 10²³)" going right and "÷ Nₐ" going left; the arrow between Mass and Particles (diagonal, if included) is labeled with the combined operation. Below the triangle, a worked example box shows: "How many atoms are in 24.0 g of carbon?" with step-by-step solution. The canvas is fully responsive. Learning objective: Students will apply mole conversion factors to convert between mass, moles, and number of particles (Applying).
</details>

### Worked Examples

**Example 1: Grams to Moles**

How many moles are in 45.0 g of water (\(M = 18.015\) g/mol)?

$$
n = \frac{45.0 \text{ g}}{18.015 \text{ g/mol}} = 2.498 \text{ mol}
$$

**Example 2: Moles to Number of Molecules**

How many molecules are in 2.498 mol of water?

$$
N = 2.498 \text{ mol} \times 6.022 \times 10^{23} \text{ mol}^{-1} = 1.504 \times 10^{24} \text{ molecules}
$$

**Example 3: Grams to Number of Atoms**

How many iron atoms are in 11.17 g of iron (\(M = 55.845\) g/mol)?

$$
n_{\text{Fe}} = \frac{11.17 \text{ g}}{55.845 \text{ g/mol}} = 0.2000 \text{ mol}
$$
$$
N_{\text{Fe}} = 0.2000 \text{ mol} \times 6.022 \times 10^{23} \text{ mol}^{-1} = 1.204 \times 10^{23} \text{ atoms}
$$

---

## 2.8 Percent Composition

**Percent composition** describes the mass percentage of each element in a compound. It is one of the first pieces of experimental data a chemist obtains from elemental analysis, and it is the starting point for determining a compound's empirical formula.

The formula for the percent composition of element X in a compound is:

$$
\% \text{X} = \frac{\text{mass of X in one mole of compound}}{\text{molar mass of compound}} \times 100\%
$$

### Worked Example: Percent Composition of Glucose

Glucose has the molecular formula \(\text{C}_6\text{H}_{12}\text{O}_6\). Its molar mass is:

$$
M = 6(12.011) + 12(1.008) + 6(15.999) = 72.066 + 12.096 + 95.994 = 180.156 \text{ g/mol}
$$

The percent compositions are:

$$
\% \text{C} = \frac{72.066}{180.156} \times 100\% = 40.00\%
$$

$$
\% \text{H} = \frac{12.096}{180.156} \times 100\% = 6.71\%
$$

$$
\% \text{O} = \frac{95.994}{180.156} \times 100\% = 53.29\%
$$

These three percentages sum to 100%, confirming the calculation. Percent composition data can be obtained experimentally through combustion analysis (discussed in Section 2.10) and is used to identify unknown compounds or verify synthesized ones.

---

## 2.9 Empirical and Molecular Formulas

### Empirical Formula

The **empirical formula** of a compound gives the simplest whole-number ratio of atoms of each element in the compound. It does not necessarily reflect the actual number of atoms in a molecule — only their ratio. For example, hydrogen peroxide (\(\text{H}_2\text{O}_2\)) has the empirical formula HO, and glucose (\(\text{C}_6\text{H}_{12}\text{O}_6\)) has the empirical formula \(\text{CH}_2\text{O}\).

To determine an empirical formula from percent composition data, follow these steps:

1. Assume a 100 g sample. Each percent directly becomes a mass in grams.
2. Convert each elemental mass to moles using molar masses.
3. Divide all mole values by the smallest mole value to find the simplest mole ratio.
4. If the ratios are not whole numbers, multiply all by the smallest integer that makes them whole (e.g., multiply by 2 if you see ratios near 0.5).

### Worked Example: Empirical Formula from Percent Composition

A compound is found to contain 40.00% C, 6.71% H, and 53.29% O by mass.

**Step 1 — Assume 100 g sample:**

- C: 40.00 g, H: 6.71 g, O: 53.29 g

**Step 2 — Convert to moles:**

$$
n_C = \frac{40.00}{12.011} = 3.330 \text{ mol}, \quad n_H = \frac{6.71}{1.008} = 6.657 \text{ mol}, \quad n_O = \frac{53.29}{15.999} = 3.331 \text{ mol}
$$

**Step 3 — Divide by the smallest (3.330):**

$$
C: \frac{3.330}{3.330} = 1.00, \quad H: \frac{6.657}{3.330} = 2.00, \quad O: \frac{3.331}{3.330} = 1.00
$$

**Result:** Empirical formula = \(\text{CH}_2\text{O}\)

### Molecular Formula

The **molecular formula** gives the actual number of each type of atom in one molecule. It is always a whole-number multiple of the empirical formula:

$$
\text{Molecular Formula} = n \times (\text{Empirical Formula})
$$

where \(n\) is a positive integer. To find \(n\), you need the molar mass of the compound (obtained from mass spectrometry, for example):

$$
n = \frac{M_{\text{compound}}}{M_{\text{empirical formula}}}
$$

**Continuing the example:** The empirical formula \(\text{CH}_2\text{O}\) has a molar mass of \(12.011 + 2(1.008) + 15.999 = 30.026\) g/mol. If the compound's actual molar mass is measured as 180 g/mol:

$$
n = \frac{180}{30.026} \approx 6
$$

**Molecular formula = \(\text{C}_6\text{H}_{12}\text{O}_6\)** — which is glucose, as expected.

### Comparing Empirical and Molecular Formulas

| Compound | Empirical Formula | Molecular Formula | n |
|----------|------------------|-------------------|---|
| Hydrogen peroxide | HO | \(\text{H}_2\text{O}_2\) | 2 |
| Glucose | \(\text{CH}_2\text{O}\) | \(\text{C}_6\text{H}_{12}\text{O}_6\) | 6 |
| Ethylene | CH₂ | \(\text{C}_2\text{H}_4\) | 2 |
| Benzene | CH | \(\text{C}_6\text{H}_6\) | 6 |
| Water | H₂O | H₂O | 1 |

Note that for some compounds (like water), the empirical and molecular formulas are identical because the ratio of atoms is already in lowest terms.

---

## 2.10 Combustion Analysis

**Combustion analysis** is the primary experimental method used to determine the empirical formulas of organic compounds — compounds containing carbon, hydrogen, and often oxygen. The technique is based on a straightforward principle: when a compound burns completely in excess oxygen, all carbon atoms are converted to \(\text{CO}_2\) and all hydrogen atoms are converted to \(\text{H}_2\text{O}\). By measuring the masses of these two combustion products, chemists can calculate the masses of carbon and hydrogen in the original sample, and then determine oxygen by subtraction.

### The Combustion Analysis Procedure

The following steps summarize the procedure for analyzing a compound containing C, H, and O:

1. Weigh the sample of unknown compound precisely.
2. Burn the sample completely in a stream of excess oxygen inside a combustion train.
3. Pass the combustion gases through an absorber containing a desiccant (such as \(\text{P}_4\text{O}_{10}\)) that captures all the water vapor — weigh the water absorber before and after to find the mass of \(\text{H}_2\text{O}\) produced.
4. Pass the remaining gases through an absorber containing a base (such as NaOH) that captures all \(\text{CO}_2\) — weigh this absorber before and after to find the mass of \(\text{CO}_2\) produced.
5. Calculate the mass of C from the mass of \(\text{CO}_2\), and the mass of H from the mass of \(\text{H}_2\text{O}\).
6. Determine the mass of O by subtracting the masses of C and H from the original sample mass.
7. Convert elemental masses to moles and determine the empirical formula.

### Key Stoichiometric Relationships in Combustion

Because one mole of \(\text{CO}_2\) contains exactly one mole of carbon, and one mole of \(\text{H}_2\text{O}\) contains exactly two moles of hydrogen:

$$
m_C = m_{\text{CO}_2} \times \frac{12.011 \text{ g C}}{44.009 \text{ g CO}_2}
$$

$$
m_H = m_{\text{H}_2\text{O}} \times \frac{2(1.008) \text{ g H}}{18.015 \text{ g H}_2\text{O}}
$$

$$
m_O = m_{\text{sample}} - m_C - m_H
$$

### Worked Example: Combustion Analysis

A 0.2000 g sample of a pure organic compound containing only C, H, and O is burned completely. The combustion produces 0.2988 g of \(\text{CO}_2\) and 0.1217 g of \(\text{H}_2\text{O}\). Determine the empirical formula.

**Step 1 — Calculate mass of C:**

$$
m_C = 0.2988 \text{ g CO}_2 \times \frac{12.011}{44.009} = 0.08154 \text{ g C}
$$

**Step 2 — Calculate mass of H:**

$$
m_H = 0.1217 \text{ g H}_2\text{O} \times \frac{2.016}{18.015} = 0.01362 \text{ g H}
$$

**Step 3 — Calculate mass of O by subtraction:**

$$
m_O = 0.2000 - 0.08154 - 0.01362 = 0.1048 \text{ g O}
$$

**Step 4 — Convert to moles:**

$$
n_C = \frac{0.08154}{12.011} = 0.006789 \text{ mol}, \quad n_H = \frac{0.01362}{1.008} = 0.01351 \text{ mol}, \quad n_O = \frac{0.1048}{15.999} = 0.006550 \text{ mol}
$$

**Step 5 — Divide by smallest (0.006550):**

$$
C: \frac{0.006789}{0.006550} = 1.036 \approx 1, \quad H: \frac{0.01351}{0.006550} = 2.063 \approx 2, \quad O: \frac{0.006550}{0.006550} = 1.000
$$

**Empirical formula: \(\text{CH}_2\text{O}\)**

This empirical formula is consistent with several compounds, including formaldehyde (\(M \approx 30\) g/mol), glycolaldehyde (\(M \approx 60\) g/mol), and glucose (\(M \approx 180\) g/mol). The molecular formula can be determined once the molar mass is known — which is where mass spectrometry plays a critical complementary role.

#### Diagram: Combustion Analysis Flow Chart

<details markdown="1">
<summary>Combustion Analysis Workflow Diagram</summary>
Type: diagram-specification
**sim-id:** combustion-analysis-flowchart<br/>
**Library:** Mermaid<br/>
**Status:** Specified

A Mermaid flowchart (top-to-bottom orientation) illustrating the sequential steps of combustion analysis. Node labels: (1) "Weigh organic sample (g)" → (2) "Burn in excess O₂" → (3) "Absorb H₂O — record mass gain" and "Absorb CO₂ — record mass gain" (these two steps occur in parallel, shown as two branches from node 2 that rejoin) → (4) "Calculate mass of C from CO₂" and "Calculate mass of H from H₂O" → (5) "Calculate mass of O by subtraction" → (6) "Convert masses to moles" → (7) "Divide by smallest mole value" → (8) "Empirical Formula". Each node is styled with a distinct fill color: blue for measurement steps, orange for calculation steps, and green for the final result. The chart is rendered in a clean sans-serif font appropriate for academic use. Learning objective: Students will construct a step-by-step combustion analysis procedure and evaluate whether calculated empirical formulas are consistent with a given molar mass (Creating, Evaluating).
</details>

---

## 2.11 Connecting the Concepts: From Atoms to Formulas

The concepts introduced in this chapter form an interconnected chain of reasoning that lies at the heart of quantitative chemistry. The journey begins at the atomic level: protons, neutrons, and electrons determine an element's identity and mass. Isotopes remind us that atoms of the same element are not all identical — they differ in neutron count and therefore in mass, and mass spectrometry makes these differences visible and measurable with extraordinary precision. The relative abundances measured by a mass spectrometer feed directly into the calculation of average atomic mass, which is the value printed on every periodic table.

Scaling up from individual atoms to laboratory quantities requires the mole — a counting unit that bridges the submicroscopic and macroscopic worlds through Avogadro's number. Molar mass provides the numerical link, allowing chemists to convert fluently between grams, moles, and numbers of particles. From molar masses and mass ratios comes percent composition, and from percent composition comes the empirical formula. Finally, combining an empirical formula with a molar mass (often obtained by mass spectrometry of the intact molecule) yields the molecular formula that fully characterizes a compound's atomic architecture.

Combustion analysis is the experimental technique that closes the loop: it provides the percent composition data needed to determine empirical formulas for organic compounds, and its results can be combined with mass spectrometric molar mass data to arrive at the complete molecular formula. Together, these techniques represent the foundational toolkit of chemical analysis — one that AP Chemistry students will use conceptually in nearly every chapter that follows.

---

## Chapter Summary

The following list highlights the essential ideas from this chapter:

- **Subatomic particles**: Protons (charge +1, in nucleus), neutrons (charge 0, in nucleus), and electrons (charge −1, in electron cloud) are the three fundamental components of atoms.
- **Atomic number** (\(Z\)) = number of protons; defines the element. **Mass number** (\(A\)) = protons + neutrons.
- **Isotopes** are atoms of the same element with different numbers of neutrons and different masses.
- **Average atomic mass** is the weighted average of isotope masses, weighted by natural abundance.
- **Mass spectrometry** separates ions by \(m/z\) ratio; the resulting **mass spectrum** displays the relative abundance of each isotope or fragment.
- The **mole** (1 mol = \(6.022 \times 10^{23}\) particles) is the chemist's counting unit linking atomic masses to measurable gram quantities.
- **Molar mass** (\(M\)) in g/mol is numerically equal to atomic or molecular mass in amu.
- **Mole calculations** use \(n = m/M\) and \(N = n \times N_A\) to interconvert mass, moles, and number of particles.
- **Percent composition** is the mass percent of each element in a compound.
- The **empirical formula** gives the simplest atom ratio; the **molecular formula** gives the actual atom count per molecule (\(= n \times \text{empirical formula}\)).
- **Combustion analysis** burns an organic compound to \(\text{CO}_2\) and \(\text{H}_2\text{O}\), then back-calculates elemental masses to determine the empirical formula.

---

## Key Equations

| Quantity | Formula |
|----------|---------|
| Number of neutrons | \(N = A - Z\) |
| Average atomic mass | \(\bar{m} = \sum_i (\text{abundance}_i \times \text{mass}_i)\) |
| Moles from mass | \(n = m / M\) |
| Number of particles | \(N = n \times N_A\) |
| Percent composition | \(\% X = (m_X / M_{\text{compound}}) \times 100\%\) |
| Molecular formula multiplier | \(n = M_{\text{compound}} / M_{\text{empirical}}\) |
| Mass of C from combustion | \(m_C = m_{\text{CO}_2} \times (12.011 / 44.009)\) |
| Mass of H from combustion | \(m_H = m_{\text{H}_2\text{O}} \times (2.016 / 18.015)\) |

---

## Practice Problems

1. An element has two naturally occurring isotopes: isotope A with mass 62.930 amu and abundance 69.15%, and isotope B with mass 64.928 amu and abundance 30.85%. Calculate the average atomic mass and identify the element.

2. A mass spectrum of bromine shows two peaks of nearly equal height at \(m/z = 79\) and \(m/z = 81\). What does this tell you about the isotopic composition of bromine? Explain why the periodic table lists bromine's atomic mass as approximately 79.90 amu.

3. How many atoms of oxygen are present in 4.50 g of \(\text{Al}_2\text{O}_3\) (\(M = 101.96\) g/mol)?

4. A compound contains 52.14% C, 13.13% H, and 34.73% O by mass. Its molar mass is 46.07 g/mol. Determine the empirical formula and the molecular formula.

5. Combustion of a 0.1500 g sample of an unknown compound (containing only C, H, and O) produces 0.3300 g \(\text{CO}_2\) and 0.1350 g \(\text{H}_2\text{O}\). Determine the empirical formula of the compound.

6. Explain why the mole is necessary as a unit in chemistry. Why can't chemists simply work in grams without converting to moles?

7. A student claims that two compounds with the same empirical formula must also have the same molecular formula. Is this claim correct? Justify your answer with an example.

8. Using a mass spectrometer, a chemist determines that a pure organic compound has a molar mass of 78 g/mol and an empirical formula of CH. What is its molecular formula? Name a well-known compound with this formula.
