---
title: Electron Configuration and Periodic Trends
description: Explore quantum mechanical atomic models, electron configurations, electromagnetic radiation, photoelectron spectroscopy, and periodic trends in AP Chemistry.
generated_by: claude skill chapter-content-generator
date: 2026-02-20
version: 0.04
---
# Chapter 3: Electron Configuration and Periodic Trends

## Summary

This chapter covers the quantum mechanical model of the atom, electron configurations, electromagnetic radiation, and photoelectron spectroscopy. Students then apply these ideas to understand periodic table organization and periodic trends in atomic properties.

## Concepts Covered

This chapter covers the following 36 concepts from the learning graph:

46. Bohr Model
47. Quantum Mechanical Model
48. Energy Levels
49. Principal Quantum Number
50. Subshells
51. Orbitals
52. Orbital Shapes
53. Electron Configuration
54. Aufbau Principle
55. Pauli Exclusion Principle
56. Hund's Rule
57. Valence Electrons
58. Core Electrons
59. Noble Gas Notation
60. Electron Config of Ions
61. Electromagnetic Spectrum
62. Wavelength
63. Frequency
64. Photon Energy
65. Planck's Equation
66. Photoelectric Effect
67. Emission Spectra
68. Absorption Spectra
69. Photoelectron Spectroscopy
70. PES Data Interpretation
71. Periodic Table Organization
72. Periods and Groups
73. Periodic Trends
74. Atomic Radius
75. Ionic Radius
76. Ionization Energy
77. Successive Ionization Energy
78. Electron Affinity
79. Electronegativity
80. Effective Nuclear Charge
501. Coulombic Attraction

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Chemistry](../01-foundations-of-chemistry/index.md)
- [Chapter 2: Atomic Structure and Mass Spectrometry](../02-atomic-structure-and-mass-spectrometry/index.md)

---

## 3.1 From Bohr to Quantum Mechanics: A Story of Two Models

The story of how chemists came to understand electron arrangement begins with a simple but profound observation: heated hydrogen gas does not glow with a continuous rainbow of colors. Instead, it emits light at only a few specific wavelengths — a handful of discrete lines against a dark background. Explaining this pattern demanded a new kind of physics.

In 1913, Danish physicist Niels Bohr proposed a model of the hydrogen atom in which electrons orbit the nucleus only at specific, fixed distances. These orbits correspond to specific **energy levels**, and an electron can only jump between them by absorbing or releasing a precise packet of energy called a photon. The **Bohr Model** was revolutionary because it predicted the hydrogen emission spectrum with remarkable accuracy: each spectral line corresponded exactly to an electron dropping from a higher orbit to a lower one, releasing a photon of precisely that energy difference.

The Bohr model has a compelling visual simplicity — electrons orbiting like planets around a sun — but it fails badly for any atom with more than one electron. It cannot predict the spectra of helium, lithium, or any other multi-electron atom, and it offers no explanation for why electrons stay in their orbits at all. These failures signaled that something deeper was at work.

The answer came in the 1920s with quantum mechanics. Louis de Broglie proposed that electrons have wave-like properties, and Erwin Schrödinger formalized this insight into a mathematical equation whose solutions describe the probability of finding an electron at any location around the nucleus. The result is the **Quantum Mechanical Model** of the atom, which replaces the idea of fixed orbits with three-dimensional regions of space — orbitals — where an electron is likely to be found. Werner Heisenberg's uncertainty principle underscores why exact orbits are impossible: we cannot simultaneously know both the exact position and the exact momentum of an electron.

Key differences between the two models:

- The Bohr model uses fixed circular orbits; the quantum mechanical model uses probability distributions called orbitals
- The Bohr model works only for hydrogen; the quantum mechanical model applies to all elements
- The Bohr model treats electrons as particles; the quantum mechanical model treats them as having both wave and particle character
- The Bohr model specifies exact electron positions; the quantum mechanical model specifies only probability densities
- Both models correctly predict that electron energy is quantized — electrons can only occupy specific energy states

## 3.2 Quantum Numbers and Orbital Structure

The quantum mechanical model describes each electron using a set of four quantum numbers. The first and most important is the **principal quantum number**, symbolized \(n\), which takes positive integer values (1, 2, 3, …). The value of \(n\) determines the overall energy and average distance from the nucleus for electrons in that shell. Higher \(n\) values correspond to higher energy and greater distance from the nucleus.

Within each principal energy level, electrons occupy **subshells** designated by the letters s, p, d, and f. Each subshell consists of one or more **orbitals**, and each orbital can hold at most two electrons. The number and types of subshells present in a given energy level depend on \(n\):

| Principal Quantum Number (\(n\)) | Subshells Present | Number of Orbitals | Max Electrons |
|---|---|---|---|
| 1 | s | 1 | 2 |
| 2 | s, p | 1 + 3 = 4 | 8 |
| 3 | s, p, d | 1 + 3 + 5 = 9 | 18 |
| 4 | s, p, d, f | 1 + 3 + 5 + 7 = 16 | 32 |

**Orbital shapes** vary by subshell type and are crucial for understanding molecular geometry and chemical bonding (explored more deeply in later chapters). The s orbital is spherically symmetric — a sphere of electron density centered on the nucleus. The p orbitals come in sets of three, each shaped like a dumbbell oriented along one of the three coordinate axes (x, y, z). The d orbitals consist of five orbitals with more complex shapes, including four four-lobed cloverleaf shapes and one with a torus. The f orbitals are even more complex and rarely need to be visualized in detail at the AP level.

#### Diagram: Interactive Orbital Shape Visualizer

<iframe src="../../sims/orbital-shape-visualizer/main.html" width="100%" height="640px" scrolling="no"></iframe>

<details markdown="1">
<summary>Orbital Shape Visualizer (p5.js MicroSim)</summary>
Type: MicroSim
**sim-id:** orbital-shape-visualizer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Canvas size: 800x450px, responsive to window resize. The simulation displays a 2D cross-section representation of atomic orbitals against a dark navy (#1a1a2e) background.

Layout: Left panel (280px wide) contains controls; right panel fills remaining width and shows the orbital visualization.

Controls panel (top to bottom):
- Dropdown labeled "Subshell Type": options s, p, d (default: s)
- For p and d: a second dropdown "Orbital Orientation" (px, py, pz for p; dxy, dxz, dyz, dx²-y², dz² for d)
- Slider labeled "Principal Quantum Number (n)": range 1-4, step 1, default 1
- Color legend showing probability density scale from blue (low) to yellow (high)

Visualization panel: Draws the selected orbital as a 2D probability density heat map. The nucleus is shown as a small red dot at center. For s orbitals, concentric rings of decreasing intensity spread outward, with more rings for higher n. For p orbitals, two lobes appear on opposite sides of the nucleus with a node at center. Color gradient uses viridis-style palette (dark blue = low probability, bright yellow = high probability). Axes labels "x (Bohr radii)" and "y (Bohr radii)" appear along the edges.

Text overlay shows: current quantum number n, subshell label, and number of orbitals in that subshell.

Learning objective: Students will be able to (Remembering/Understanding — Bloom's levels 1-2) identify and describe the shapes of s, p, and d orbitals and explain how the principal quantum number affects orbital size and energy. Students will also apply (Bloom's level 3) their understanding by predicting which orbitals are present in a given energy level.
</details>

## 3.3 Writing Electron Configurations

Knowing the structure of orbitals is only the beginning. The real power comes from using that structure to predict how electrons arrange themselves in a given atom — its **electron configuration**. Three foundational rules govern this arrangement.

The **Aufbau Principle** (from German, meaning "building up") states that electrons fill orbitals starting from the lowest available energy, working upward. The order of orbital filling follows a specific sequence that can be remembered using the diagonal rule or the mnemonic 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p… Note the important crossover: the 4s subshell fills before the 3d subshell because 4s is slightly lower in energy for neutral atoms.

The **Pauli Exclusion Principle** states that no two electrons in the same atom can have the same set of all four quantum numbers. In practical terms, this means each orbital can hold at most two electrons, and those two electrons must have opposite spins (spin-up and spin-down, often shown as ↑ and ↓).

**Hund's Rule** addresses how electrons fill orbitals within the same subshell. Electrons will occupy each orbital singly before any orbital is doubly occupied, and all singly occupied orbitals will have the same spin direction. This minimizes electron-electron repulsion, making the atom more stable. For example, carbon's two 2p electrons each go into separate 2p orbitals, both with spin-up, rather than pairing in one orbital.

The aufbau filling order:

1. 1s (holds 2 electrons)
2. 2s (holds 2 electrons)
3. 2p (holds 6 electrons)
4. 3s (holds 2 electrons)
5. 3p (holds 6 electrons)
6. 4s (holds 2 electrons)
7. 3d (holds 10 electrons)
8. 4p (holds 6 electrons)
9. 5s (holds 2 electrons)
10. 4d (holds 10 electrons)

Consider the electron configuration of phosphorus (Z = 15). Filling in order: 1s², 2s², 2p⁶, 3s², 3p³. The superscripts indicate the number of electrons in each subshell. The three 3p electrons each occupy separate 3p orbitals (Hund's Rule). The full configuration can also be written using **Noble Gas Notation**, which shortens the expression by replacing the configuration of the nearest preceding noble gas with its symbol in brackets: [Ne] 3s² 3p³. This notation emphasizes the valence shell and is standard in AP Chemistry.

A comparison of full and noble gas notation for selected elements:

| Element | Atomic Number | Full Configuration | Noble Gas Notation |
|---|---|---|---|
| Sodium (Na) | 11 | 1s² 2s² 2p⁶ 3s¹ | [Ne] 3s¹ |
| Chlorine (Cl) | 17 | 1s² 2s² 2p⁶ 3s² 3p⁵ | [Ne] 3s² 3p⁵ |
| Iron (Fe) | 26 | 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶ | [Ar] 4s² 3d⁶ |
| Bromine (Br) | 35 | 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁵ | [Ar] 4s² 3d¹⁰ 4p⁵ |

## 3.4 Valence Electrons, Core Electrons, and Ions

Chemists distinguish between two fundamentally different types of electrons in an atom. **Valence electrons** are those in the outermost principal energy level (highest n value) and, for transition metals, also in partially filled d subshells. **Core electrons** occupy all the inner, fully filled shells. This distinction matters enormously because it is the valence electrons that participate in chemical bonding and reactions; the core electrons are tightly held by the nucleus and generally do not participate.

For main-group elements, the number of valence electrons equals the group number (using the 1-18 numbering system, groups 1, 2, and 13-18). For example, oxygen (Group 16) has 6 valence electrons; sodium (Group 1) has 1. The noble gas notation makes counting valence electrons straightforward — they are exactly the electrons outside the bracketed noble gas core.

When atoms form ions, they gain or lose electrons to achieve more stable electron configurations. Metals typically lose electrons to form cations (positive ions), while nonmetals typically gain electrons to form anions (negative ions). The **electron configuration of ions** is determined by the same aufbau rules, but with the appropriate total electron count.

Consider iron (Fe, Z = 26) with neutral configuration [Ar] 4s² 3d⁶:

- Fe²⁺ loses 2 electrons: [Ar] 3d⁶ (the 4s electrons are lost first from transition metals)
- Fe³⁺ loses 3 electrons: [Ar] 3d⁵ (the 3d⁵ half-filled configuration is particularly stable)

For main-group ions, the pattern is simpler. Sodium loses its one 3s electron to give Na⁺ with the configuration [Ne] — identical to neon. Chlorine gains one electron to give Cl⁻ with the configuration [Ar] — identical to argon. This tendency to achieve noble gas electron configurations (filled valence shells) is a driving force behind ionic bond formation.

Key rules for ion electron configurations:

- Cations: remove electrons from the highest n subshell first (for transition metals, remove s electrons before d electrons)
- Anions: add electrons to the next available orbital following aufbau order
- The resulting electron count must equal the atomic number minus the charge (for cations) or plus the absolute charge (for anions)

## 3.5 Electromagnetic Radiation and Light-Matter Interaction

To understand how we actually know the electron configurations described above — and why they have the specific energies they do — we need to understand how light and matter interact. Light is a form of **electromagnetic radiation**, a self-propagating wave of oscillating electric and magnetic fields. Different types of electromagnetic radiation differ only in their **wavelength** (\(\lambda\)) and **frequency** (\(f\)), which are inversely related through the speed of light:

$$ c = \lambda f $$

where \(c = 3.00 \times 10^8\) m/s, \(\lambda\) is in meters, and \(f\) is in hertz (Hz = s⁻¹).

The **electromagnetic spectrum** spans an enormous range of wavelengths and frequencies, from radio waves (wavelengths of kilometers) to gamma rays (wavelengths smaller than atomic nuclei). Visible light occupies only a narrow slice of this spectrum, from roughly 400 nm (violet) to 700 nm (red). The energy of electromagnetic radiation increases as wavelength decreases and frequency increases, a relationship quantified by **Planck's equation**:

$$ E = hf $$

where \(E\) is the photon energy in joules, \(h = 6.626 \times 10^{-34}\) J·s is Planck's constant, and \(f\) is the frequency. Combining with the speed of light equation:

$$ E = \frac{hc}{\lambda} $$

This equation tells us that high-frequency (short-wavelength) radiation carries more energy per photon. Ultraviolet photons carry more energy than visible photons; X-ray photons more still. In electron volts (a convenient unit for atomic-scale energies), visible photon energies range from about 1.8 to 3.1 eV, while X-ray photons carry thousands of eV.

#### Diagram: Electromagnetic Spectrum Infographic

<details markdown="1">
<summary>Electromagnetic Spectrum with Energy, Wavelength, and Frequency Scale</summary>
Type: Infographic
**sim-id:** em-spectrum-infographic<br/>
**Library:** p5.js<br/>
**Status:** Specified

Canvas size: 800x420px, responsive to window resize. Background: white (#ffffff).

The infographic is organized as three horizontal bands stacked vertically:

Top band (100px tall): Continuous color spectrum gradient spanning full canvas width, transitioning from deep red (left, long wavelength) through orange, yellow, green, cyan, blue, violet, to ultraviolet-purple (right, short wavelength). Above the gradient, labeled regions are marked with vertical tick lines and text labels: Radio, Microwave, Infrared, Visible, Ultraviolet, X-ray, Gamma Ray. The visible light segment is enlarged/highlighted with a magnified inset showing the ROYGBIV color sequence from 700nm to 400nm.

Middle band (80px tall): Three horizontal ruler scales aligned below the spectrum:
- Top ruler: Wavelength (λ) in meters, logarithmic scale from 10³ m (left) to 10⁻¹² m (right), major gridlines at each power of 10
- Middle ruler: Frequency (f) in Hz, logarithmic scale from 10⁵ Hz (left) to 10²⁰ Hz (right)
- Bottom ruler: Photon energy in eV, logarithmic scale from 10⁻⁹ eV to 10⁶ eV

Bottom band (100px tall): Three annotation rows showing:
- Common uses for each region (AM radio, cell phones, heat lamps, photography, sterilization, medical imaging, nuclear medicine)
- Relationship arrows showing: "Increasing Wavelength →" on left side pointing left and "Increasing Frequency & Energy →" pointing right
- Equation display: c = λf and E = hf in clean sans-serif type

Color scheme: Use soft pastels for each spectral region, bold black borders, AP Chemistry blue (#003087) for text headers.

Learning objective: Students identify (Bloom's level 1 — Remembering) the regions of the electromagnetic spectrum and compare (Bloom's level 2 — Understanding) the relative wavelength, frequency, and energy of different types of radiation using the equations c = λf and E = hf.
</details>

## 3.6 The Photoelectric Effect and Quantized Energy

In 1905, Albert Einstein explained a puzzling experimental result known as the **photoelectric effect**: when light shines on a metal surface, electrons are ejected — but only if the light's frequency exceeds a certain threshold value, regardless of the light's intensity. Increasing the brightness of below-threshold light never ejects electrons; a single photon of above-threshold frequency can. This behavior makes no sense if light is a continuous wave, but it makes perfect sense if light consists of discrete packets of energy — photons — each carrying energy \(E = hf\).

Einstein's explanation showed that a photon must have at least enough energy to overcome the work function of the metal (the minimum energy required to remove an electron from the surface). Any excess energy above this threshold goes into the kinetic energy of the ejected electron. This was one of the first experimental confirmations that energy is quantized at the atomic level, and it earned Einstein the 1905 Nobel Prize in Physics.

The photoelectric effect has direct applications in modern technology: solar cells, photodetectors, and digital camera sensors all rely on the same fundamental principle. More importantly for chemistry, it established the wave-particle duality of light and laid conceptual groundwork for understanding how photons interact with electrons bound inside atoms.

## 3.7 Emission Spectra, Absorption Spectra, and Atomic Fingerprints

When electrons in an atom absorb a photon with exactly the right energy, they jump to a higher energy level. When they fall back down, they release a photon of exactly that energy — producing the characteristic **emission spectra** (or line spectra) that Bohr's model was designed to explain. The energy of each emitted photon corresponds precisely to the energy difference between two atomic energy levels:

$$ \Delta E = E_{final} - E_{initial} = hf $$

Because energy levels in an atom are discrete and unique to each element, emission spectra serve as atomic fingerprints. Astronomers use this technique to identify the elemental composition of distant stars. Forensic scientists use it to identify unknown materials. The neon glow of signs, the yellow of sodium street lamps, and the distinctive colors of fireworks all arise from atomic emission.

**Absorption spectra** are the complementary phenomenon. When white light (containing all wavelengths) passes through a cool gas, atoms absorb photons at exactly the same frequencies they would emit. The resulting spectrum shows dark lines at those frequencies against a bright continuous background. In the solar spectrum, these dark absorption lines (Fraunhofer lines) reveal which elements are present in the sun's cooler outer atmosphere.

The relationship between emission and absorption:

- Both occur at the same characteristic frequencies for a given element
- Emission: electron falls from higher to lower energy level, releasing a photon
- Absorption: electron jumps from lower to higher energy level, absorbing a photon
- The energy difference between levels determines the photon frequency: \(f = \Delta E / h\)
- Only photons with exactly the right energy are absorbed or emitted — all other frequencies pass through unchanged

## 3.8 Photoelectron Spectroscopy (PES)

**Photoelectron Spectroscopy (PES)** is a powerful experimental technique that directly reveals the energies of electrons in different subshells of an atom, providing direct experimental evidence for the quantum mechanical model. In PES, a beam of high-energy photons (typically X-rays or ultraviolet light) bombards a sample. If a photon has more energy than the binding energy of an electron, that electron is ejected. By measuring the kinetic energies of the ejected electrons, chemists can calculate the binding energies of electrons in each subshell:

$$ E_{binding} = E_{photon} - E_{kinetic} $$

The result is a **PES spectrum**: a graph of electron count (or relative intensity) on the y-axis versus binding energy on the x-axis. Each peak in the spectrum corresponds to a different subshell. The position of each peak (on the x-axis) gives the binding energy of electrons in that subshell. The height of each peak is proportional to the number of electrons in that subshell.

**PES data interpretation** requires understanding several key features:

- Peaks at higher binding energy (further right, or sometimes plotted further left depending on convention) correspond to core electrons closer to the nucleus
- Peaks at lower binding energy correspond to valence electrons in higher energy subshells
- The relative area under each peak reflects the number of electrons in that subshell (2 for s, 6 for p, 10 for d)
- Comparing PES spectra across elements reveals how increasing nuclear charge pulls all electrons to higher binding energies
- Sudden jumps in binding energy between peaks confirm the shell structure predicted by quantum mechanics

Consider a simplified PES spectrum for sodium (Na, [Ne] 3s¹). Moving from high to low binding energy, the peaks appear in this order: 1s (binding energy ~1041 eV, 2 electrons), 2s (~63 eV, 2 electrons), 2p (~31 eV, 6 electrons), 3s (~5 eV, 1 electron). The large jump from 2p to 3s confirms that sodium has one easily removed valence electron, consistent with its Group 1 chemistry.

#### Diagram: PES Spectrum Interactive Visualizer

<iframe src="../../sims/pes-spectrum-visualizer/main.html" width="100%" height="640px" scrolling="no"></iframe>

<details markdown="1">
<summary>Photoelectron Spectroscopy Spectrum Visualizer (p5.js MicroSim)</summary>
Type: MicroSim
**sim-id:** pes-spectrum-visualizer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Canvas size: 800x450px, responsive to window resize. Background: white (#ffffff).

Layout: Left control panel (220px wide); right visualization panel fills remaining width.

Controls:
- Dropdown labeled "Element": includes H, He, Li, Be, B, C, N, O, F, Ne, Na, Mg, Al, Si, P, S, Cl, Ar (defaults to Na)
- Checkbox "Show electron configuration" (default: checked)
- Checkbox "Annotate peaks" (default: checked)

Visualization:
- X-axis labeled "Binding Energy (MJ/mol)" with values increasing left to right (or labeled "Ionization Energy")
- Y-axis labeled "Relative Number of Electrons"
- Gaussian-shaped peaks rendered at correct relative positions for each subshell of the selected element
- Peak width is uniform for visual clarity; peak height proportional to electron count in that subshell
- Peaks colored by subshell type: s = blue (#2196F3), p = green (#4CAF50), d = orange (#FF9800), f = purple (#9C27B0)
- When "Annotate peaks" is checked, each peak is labeled with its subshell designation (1s, 2s, 2p, etc.) and electron count
- When "Show electron configuration" is checked, the full electron configuration appears as a text block below the graph

Interaction: Hovering over any peak displays a tooltip showing subshell label, binding energy value, and number of electrons.

Learning objective: Students will analyze (Bloom's level 4 — Analyzing) PES spectra to identify subshell peaks, interpret relative electron counts, and connect PES data to written electron configurations. Students will evaluate (Bloom's level 5 — Evaluating) how nuclear charge affects binding energy by comparing spectra of different elements.
</details>

## 3.9 Periodic Table Organization: Connecting Configuration to Position

All the quantum mechanical theory developed so far finds its most elegant expression in the organization of the **periodic table**. The periodic table is not merely a list of elements arranged by atomic number — it is a map of electron configurations, and every structural feature of the table reflects a feature of quantum mechanics.

**Periods and groups** are the two fundamental organizational dimensions. A **period** (horizontal row) corresponds to a principal quantum number — all elements in Period 2 have their valence electrons in the \(n = 2\) shell. A **group** (vertical column) groups elements with the same valence electron configuration, which is why elements in the same group share similar chemical properties. Group 1 elements all have a single s¹ valence configuration; Group 17 halogens all have an s²p⁵ valence configuration.

The blocks of the periodic table correspond directly to the subshell being filled:

- **s-block** (Groups 1 and 2, plus H and He): filling s subshells
- **p-block** (Groups 13-18): filling p subshells
- **d-block** (Groups 3-12, transition metals): filling d subshells
- **f-block** (lanthanides and actinides): filling f subshells

**Periodic Table Organization** also reveals important chemical patterns:

- Metals occupy the left and center of the table; nonmetals occupy the upper right; metalloids fall along a diagonal staircase between them
- Noble gases (Group 18) have completely filled valence shells and are largely chemically inert
- The number of valence electrons increases from left to right across each period, directly reflecting the p subshell filling
- Period lengths (2, 8, 8, 18, 18, 32…) match the maximum electron capacity of each principal shell

## 3.10 Periodic Trends: How Properties Change Across the Table

One of the most powerful insights of modern chemistry is that atomic properties vary systematically across the periodic table. These **periodic trends** arise directly from the interplay between nuclear charge, electron shielding, and the distance of valence electrons from the nucleus.

### Coulombic Attraction: The Engine Behind All Periodic Trends

Every periodic trend ultimately traces back to **Coulombic attraction** — the electrostatic force between opposite charges. Coulomb's law states:

$$F = k \frac{|q_1||q_2|}{r^2}$$

where $q_1$ and $q_2$ are the magnitudes of the charges and $r$ is the distance between them. In an atom:

- The **nucleus** carries a positive charge of $+Ze$ (where $Z$ = number of protons)
- Each **electron** carries a charge of $-e$
- The Coulombic attraction between a nucleus and a valence electron therefore increases with **larger nuclear charge** and decreases with **greater distance**

This simple relationship explains the entire periodic table's behavior. Moving left to right across a period: more protons increase $q_1$, pulling electrons inward — atoms shrink, electrons are harder to remove, and electronegativity rises. Moving down a group: each new shell places valence electrons farther away (larger $r$), so the force weakens — atoms grow, electrons are easier to remove.

The key concept unifying all periodic trends is **effective nuclear charge** ($Z_{eff}\)$). Although the nucleus contains \(Z\) protons, an outer electron does not feel the full attractive force of all those protons. Inner electrons partially shield the outer electrons from the nucleus. The effective nuclear charge experienced by a valence electron is approximately:

$$ Z_{eff} = Z - S $$

where \(Z\) is the atomic number and \(S\) is the shielding constant (approximately equal to the number of core electrons for a rough estimate). As you move across a period from left to right, \(Z\) increases while the number of core electrons (and thus \(S\)) stays roughly constant, so \(Z_{eff}\) increases steadily. This single fact explains most periodic trends.

### Atomic Radius

**Atomic radius** measures the size of an atom, typically defined as half the distance between bonded nuclei of two identical atoms. Moving across a period from left to right, atomic radius decreases because increasing \(Z_{eff}\) pulls the valence electrons closer to the nucleus. Moving down a group, atomic radius increases because each new period adds another principal energy level (shell) at a greater average distance from the nucleus, outweighing the effect of increased nuclear charge.

Trend summary:

- Increases going down a group (more electron shells)
- Decreases going left to right across a period (increasing \(Z_{eff}\))
- Largest atoms: lower-left corner of the table (e.g., francium, cesium)
- Smallest atoms: upper-right corner of the table (e.g., helium, fluorine)

### Ionic Radius

**Ionic radius** follows from atomic radius with predictable modifications based on electron gain or loss. When a neutral atom forms a cation (loses electrons), the remaining electrons experience greater effective nuclear charge — the ionic radius is smaller than the atomic radius. When a neutral atom forms an anion (gains electrons), the added electrons increase electron-electron repulsion and expand the electron cloud — the ionic radius is larger than the atomic radius.

Additionally, isoelectronic species (ions and atoms with the same number of electrons, such as O²⁻, F⁻, Ne, Na⁺, Mg²⁺, Al³⁺) show a clear trend: the more protons, the smaller the radius, because greater nuclear charge pulls the same number of electrons closer.

### Ionization Energy

**Ionization energy** (IE) is the energy required to remove one electron from a gaseous atom or ion. The first ionization energy (IE₁) removes the outermost electron from a neutral atom. Trends follow directly from \(Z_{eff}\):

- Increases left to right across a period (stronger \(Z_{eff}\) holds electrons more tightly)
- Decreases going down a group (valence electrons are farther from the nucleus and more shielded)

Notable exceptions to the left-to-right increase exist: IE₁ drops slightly from Group 2 to Group 13 because the p electron being removed is in a higher subshell than the s electrons; IE₁ also drops from Group 15 to Group 16 because the paired p electron in Group 16 experiences extra electron-electron repulsion, making it easier to remove.

**Successive ionization energies** reveal shell structure directly. After each electron is removed, the remaining electrons experience a higher \(Z_{eff}\) and require more energy to remove. The successive ionization energies for an element increase steadily — but with an abrupt, dramatic jump when the first core electron is removed. For sodium:

$$ IE_1 = 496 \text{ kJ/mol}, \quad IE_2 = 4562 \text{ kJ/mol} $$

The approximately ninefold jump from \(IE_1\) to \(IE_2\) confirms that sodium has exactly one valence electron and that the second electron comes from the next inner shell. This pattern provides experimental evidence for shell structure that directly correlates with electron configuration assignments.

### Electron Affinity

**Electron affinity** (EA) is the energy change when a neutral gaseous atom gains one electron to form an anion. A negative EA (energy is released) indicates that the anion is more stable than the neutral atom. Most nonmetals have negative (favorable) electron affinities; metals and noble gases have near-zero or positive values.

General trends are parallel to ionization energy but less uniform:

- Electron affinity becomes more negative (more energy released) across a period from left to right, as increasing \(Z_{eff}\) makes the added electron feel stronger attraction
- Electron affinity generally becomes less negative down a group, as the added electron goes into a larger, more diffuse orbital farther from the nucleus
- Exceptions occur at Group 2 (filled s subshell resists electron addition), Group 15 (half-filled p subshell has extra stability), and Group 18 (completely filled valence shell — noble gases have positive EA)

### Electronegativity

**Electronegativity** is the ability of an atom in a bond to attract shared electrons toward itself. While ionization energy and electron affinity are measured for isolated atoms, electronegativity applies specifically to bonded atoms. The Pauling scale (named for Linus Pauling) is most commonly used, ranging from 0.7 (francium) to 4.0 (fluorine).

Electronegativity trends mirror those of ionization energy:

- Increases left to right across a period (higher \(Z_{eff}\) pulls bonding electrons closer)
- Decreases down a group (bonding electrons are farther from the nucleus)
- Fluorine has the highest electronegativity (4.0); cesium and francium have the lowest (~0.7-0.8)

Electronegativity differences between bonded atoms determine bond polarity and are central to understanding molecular properties, solubility, and reactivity — topics developed further in chapters on bonding and intermolecular forces.

#### Diagram: Periodic Trends Explorer

<details markdown="1">
<summary>Interactive Periodic Trends Explorer (p5.js MicroSim)</summary>
Type: MicroSim
**sim-id:** periodic-trends-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Canvas size: 800x500px, responsive to window resize. Background: light gray (#f5f5f5).

Layout: Top control bar (60px); main periodic table visualization fills remaining height.

Controls (top bar):
- Button group labeled "Show Trend:" with five toggle buttons: Atomic Radius | Ionization Energy | Electron Affinity | Electronegativity | Effective Nuclear Charge
- Only one trend active at a time; default: Atomic Radius

Periodic Table Visualization:
- Renders a simplified periodic table (periods 1-5, main-group elements only: groups 1-2 and 13-18, plus a representative selection of period 4 transition metals)
- Each element cell is a 40x40px rectangle with the element symbol centered in it
- Cell background color encodes the selected property value using a continuous color scale: deep blue = low value, white = medium, deep red = high value (or adjust to viridis palette)
- A color legend bar at the bottom right maps colors to quantitative values with units
- When user hovers over an element cell, a tooltip displays: Element name, symbol, atomic number, and the current property value with units

Animation: When user clicks a different trend button, cells smoothly transition their colors over 500ms to the new property values.

Annotations: A small text box in the upper-right corner of the visualization panel shows the trend direction arrows (e.g., "→ Increases" and "↓ Increases" with directional arrows indicating the dominant trend pattern for the selected property).

Data: Uses AP Chemistry reference data for atomic radius (pm), first ionization energy (kJ/mol), electron affinity (kJ/mol), Pauling electronegativity, and calculated Zeff = Z − S for valence electrons.

Learning objective: Students will apply (Bloom's level 3 — Applying) knowledge of effective nuclear charge to predict trends, analyze (Bloom's level 4 — Analyzing) exceptions to general trends by examining specific elements, and evaluate (Bloom's level 5 — Evaluating) how multiple factors interact to determine an element's periodic properties.
</details>

## 3.11 Connecting All the Threads: Configuration, Spectra, and Trends

The conceptual architecture of this chapter forms a coherent whole. The quantum mechanical model tells us that electrons occupy discrete energy levels described by quantum numbers. Electron configurations — built from the Aufbau principle, the Pauli exclusion principle, and Hund's rule — describe precisely which orbitals are occupied and with how many electrons. The distinction between valence and core electrons connects atomic structure to chemical reactivity.

Electromagnetic radiation carries energy in discrete photon packets described by Planck's equation \(E = hf\). When photons interact with atoms, they cause transitions between energy levels — absorption when going up, emission when going down — producing the characteristic spectra that serve as atomic fingerprints. Photoelectron spectroscopy extends this idea to directly measure the binding energies of electrons in every subshell, providing the most direct experimental evidence for the quantum mechanical model.

Finally, all of this microscopic physics expresses itself in the macroscopic regularities of the periodic table. The systematic increase in effective nuclear charge across each period, combined with the increasing principal quantum number down each group, produces the predictable trends in atomic radius, ionic radius, ionization energy, electron affinity, and electronegativity that chemists use every day to predict and explain chemical behavior.

A summary of key equations from this chapter:

| Equation | Meaning | Variables |
|---|---|---|
| \(c = \lambda f\) | Speed of light relates wavelength and frequency | \(c = 3.00 \times 10^8\) m/s, \(\lambda\) in m, \(f\) in Hz |
| \(E = hf\) | Planck's equation: photon energy from frequency | \(h = 6.626 \times 10^{-34}\) J·s |
| \(E = hc / \lambda\) | Photon energy from wavelength | Derived from above two |
| \(\Delta E = hf\) | Energy of absorbed or emitted photon | \(\Delta E\) = energy gap between levels |
| \(Z_{eff} = Z - S\) | Effective nuclear charge | \(Z\) = atomic number, \(S\) = shielding constant |
| \(E_{binding} = E_{photon} - E_{kinetic}\) | PES binding energy calculation | All energies in joules or eV |

## Chapter Summary

This chapter built from the historical Bohr model through the full quantum mechanical description of atomic structure, establishing the tools needed to understand both atomic spectra and periodic trends. The most important ideas to carry forward:

- The quantum mechanical model describes electrons using probability distributions (orbitals) rather than fixed paths; the principal quantum number \(n\) determines energy and shell size
- The s, p, d, and f subshells have distinct shapes and energy ordering; the Aufbau principle, Pauli exclusion principle, and Hund's rule govern how electrons fill these orbitals
- Noble gas notation provides a compact way to write electron configurations, emphasizing the valence electrons that determine chemical behavior
- When atoms form ions, electrons are lost from or gained into the highest n subshell (with the special rule that transition metal cations lose 4s electrons before 3d)
- Electromagnetic radiation carries energy as photons with \(E = hf\); atomic emission and absorption spectra arise from electron transitions between energy levels and provide element-specific fingerprints
- PES directly measures subshell binding energies, confirming the shell structure and electron counts predicted by electron configuration notation
- The periodic table's structure maps directly onto quantum mechanical electron configurations, with blocks corresponding to subshell types and periods corresponding to principal quantum numbers
- All major periodic trends — atomic radius, ionic radius, ionization energy, electron affinity, and electronegativity — can be understood through the lens of effective nuclear charge \(Z_{eff} = Z - S\)

## Practice Problems

1. Write the full and noble gas electron configurations for phosphorus (Z = 15), nickel (Z = 28), and iodine (Z = 53). Identify the valence electrons and core electrons in each case.

2. A photon has a wavelength of 486 nm. Calculate its frequency, energy in joules, and energy in eV. (Given: \(h = 6.626 \times 10^{-34}\) J·s, \(c = 3.00 \times 10^8\) m/s, 1 eV = \(1.602 \times 10^{-19}\) J.)

3. The successive ionization energies (kJ/mol) for a certain element are: 578, 1817, 2745, 11,578, 14,831, 18,378. Identify which group this element belongs to and explain your reasoning using the concept of successive ionization energy.

4. Using a PES spectrum that shows three peaks — a small peak at very high binding energy, a medium peak at intermediate binding energy, and a large peak at low binding energy — identify the likely element if the electron count ratio of the three peaks (high:medium:low) is approximately 2:2:6. Explain how you determined the electron configuration from PES data.

5. Arrange the following in order of increasing atomic radius and explain your reasoning: Na, Mg, K, Ca, Cl. How does effective nuclear charge account for the trends you observe?

6. Fluorine (F) has a very high ionization energy and the highest electronegativity, but its electron affinity is slightly less negative than that of chlorine (Cl). Explain this apparent exception using orbital size and electron-electron repulsion.
