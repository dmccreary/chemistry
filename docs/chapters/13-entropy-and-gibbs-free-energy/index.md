---
title: Entropy and Gibbs Free Energy
description: Discover the thermodynamic laws that govern what happens spontaneously in the universe — from microstates and the Boltzmann equation to Gibbs free energy and coupled reactions.
generated_by: claude skill chapter-content-generator
date: 2026-02-20 10:37:59
version: 0.04
---

# Chapter 13: Entropy and Gibbs Free Energy

!!! mascot-welcome "Welcome, Scientists!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Catalyst welcomes you">
    Welcome to one of the most profound chapters in all of chemistry! Today we tackle the question that has puzzled scientists for centuries: *why do some reactions happen on their own while others need a push?* The answer lives in entropy and Gibbs free energy — two of the most powerful ideas in thermodynamics. Let's react!

## Summary

This chapter covers entropy, microstates, the Boltzmann equation, the second and third laws of thermodynamics, Gibbs free energy, spontaneity, and the relationships between thermodynamic state functions and path functions.

## Concepts Covered

This chapter covers the following 24 concepts from the learning graph:

351. Microstates
352. Boltzmann Equation
353. Second Law Thermodynamics
354. Third Law Thermodynamics
355. Entropy of Phase Changes
356. Entropy Predictions
357. Gibbs Free Energy
358. Gibbs Free Energy Equation
359. Standard Free Energy
360. Free Energy of Formation
361. Spontaneity
362. Nonspontaneous Processes
363. Temperature Dependence
365. Free Energy and Work
366. Coupled Reactions
367. Thermodynamic Stability
368. Kinetic Stability
369. State Functions
370. Path Functions
371. Internal Energy
372. First Law Thermodynamics
373. PV Work
374. Enthalpy vs Internal Energy
375. Calorimetry Calculations

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Chemistry](../01-foundations-of-chemistry/index.md)
- [Chapter 6: Intermolecular Forces and States of Matter](../06-intermolecular-forces-and-states-of-matter/index.md)
- [Chapter 7: Phase Changes, Solutions, and Gas Laws](../07-phase-changes-solutions-and-gas-laws/index.md)
- [Chapter 10: Reaction Rates and Rate Laws](../10-reaction-rates-and-rate-laws/index.md)
- [Chapter 12: Energy, Enthalpy, and Calorimetry](../12-energy-enthalpy-and-calorimetry/index.md)

---

## Introduction

In Chapter 12, you mastered the tools of calorimetry — measuring heat flow, calculating enthalpy changes, and applying Hess's Law. You learned that exothermic reactions release energy to the surroundings and endothermic ones absorb it. But here is a question Chapter 12 could not fully answer: *does a reaction being exothermic guarantee that it will happen spontaneously?*

The answer, perhaps surprisingly, is **no**. Some endothermic processes — like dissolving ammonium nitrate in water, melting ice on a warm day, or unfolding a protein — occur completely on their own. Something beyond enthalpy must be driving them. That "something" is **entropy**, and it is the central theme of this chapter.

We will build from the microscopic world of **microstates** to the macroscopic power of **Gibbs free energy**, which lets us predict whether any process — chemical or physical — will occur spontaneously under a given set of conditions. Along the way, we will also fill in the conceptual foundation of thermodynamics by revisiting state functions, path functions, internal energy, and the famous laws of thermodynamics.

## State Functions and Path Functions

Before diving into entropy, we need to clarify an important distinction that underlies all of thermodynamics: the difference between **state functions** and **path functions**.

A **state function** is a property that depends only on the *current state* of a system — not on how the system got there. If you hike from sea level to the top of a mountain, your change in altitude is a state function — it does not matter whether you took the steep direct trail or the long winding path. The key state functions in chemistry are temperature ($T$), pressure ($P$), volume ($V$), internal energy ($U$), enthalpy ($H$), entropy ($S$), and Gibbs free energy ($G$).

A **path function**, by contrast, *does* depend on how you get from one state to another. **Heat** ($q$) and **work** ($w$) are path functions. The amount of heat exchanged between a system and its surroundings depends on the specific process used — a reaction run in a calorimeter exchanges heat differently than the same reaction run in an engine cylinder.

| Property | State or Path Function? | Symbol |
|---|---|---|
| Temperature | State | $T$ |
| Pressure | State | $P$ |
| Volume | State | $V$ |
| Internal energy | State | $U$ |
| Enthalpy | State | $H$ |
| Entropy | State | $S$ |
| Gibbs free energy | State | $G$ |
| Heat | Path | $q$ |
| Work | Path | $w$ |

Because enthalpy, entropy, and Gibbs free energy are all state functions, we can calculate their changes using convenient reference paths — like formation reactions — even when the actual mechanism is complicated. This is exactly why Hess's Law works and why we can tabulate standard enthalpies, entropies, and free energies of formation.

## The First Law of Thermodynamics and Internal Energy

The **First Law of Thermodynamics** is essentially the law of conservation of energy applied to chemical systems. It states that energy cannot be created or destroyed — only transferred between a system and its surroundings:

$$\Delta U = q + w$$

where $\Delta U$ is the change in **internal energy** of the system, $q$ is the heat absorbed *by* the system, and $w$ is the work done *on* the system.

**Internal energy** ($U$) represents the total energy stored within a system — the kinetic energies of all particles (translational, rotational, vibrational motion) plus the potential energies of all interactions between particles. It is a state function: its value depends only on the system's current temperature, pressure, and composition, not on the path taken to get there.

Sign conventions are critical and are a frequent source of errors:

- $q > 0$: heat flows *into* the system (endothermic process)
- $q < 0$: heat flows *out of* the system (exothermic process)
- $w > 0$: work is done *on* the system (compression)
- $w < 0$: work is done *by* the system (expansion against surroundings)

These sign conventions are written from the system's perspective — a positive quantity always means the system gains energy.

## PV Work and the Relationship Between ΔH and ΔU

When a gas-producing reaction occurs in an open container, the system must push back against the atmosphere as it expands. This is **PV work** (pressure-volume work), the most important type of work in chemistry:

$$w = -P_{\text{ext}} \Delta V$$

The negative sign ensures that when the system expands ($\Delta V > 0$), the system does work *on* the surroundings, so $w < 0$ (energy leaves the system as work).

Under constant external pressure (the situation in most laboratory reactions):

$$\Delta H = \Delta U + P\Delta V$$

This is why **enthalpy** is more useful than internal energy for chemistry: it automatically accounts for PV work. When you measure heat in a coffee cup calorimeter (constant pressure), you measure $q_p = \Delta H$, not $\Delta U$.

The relationship between $\Delta H$ and $\Delta U$ simplifies nicely when only ideal gases are involved:

$$\Delta H = \Delta U + \Delta n_{\text{gas}} RT$$

where $\Delta n_{\text{gas}}$ is the change in moles of gas (moles of gaseous products minus moles of gaseous reactants), $R = 8.314$ J mol$^{-1}$ K$^{-1}$, and $T$ is temperature in Kelvin.

**Example:** For the combustion of hydrogen gas:

$$\ce{2H2 (g) + O2 (g) -> 2H2O (g)}$$

Here $\Delta n_{\text{gas}} = 2 - (2 + 1) = -1$. Therefore:

$$\Delta H = \Delta U + (-1)(8.314)(298) = \Delta U - 2478 \text{ J} = \Delta U - 2.48 \text{ kJ/mol}$$

For this reaction, $\Delta H$ is about 2.5 kJ/mol more negative than $\Delta U$ — a small but real difference. For most reactions, the two values are within a few kJ/mol of each other.

## Calorimetry Calculations Revisited

Chapter 12 introduced the two main calorimeters. Here is a quick reference for the equations you will continue using throughout this chapter and beyond.

**Coffee Cup Calorimeter** (constant pressure, measures $q_p = \Delta H$):

$$q = mc\Delta T$$

where $m$ = mass in grams, $c$ = specific heat capacity in J g$^{-1}$ °C$^{-1}$, and $\Delta T$ = temperature change.

**Bomb Calorimeter** (constant volume, measures $q_v = \Delta U$):

$$q_v = -C_{\text{cal}} \Delta T$$

where $C_{\text{cal}}$ is the heat capacity of the entire calorimeter assembly in J/°C or kJ/°C. The heat gained by the calorimeter equals the heat lost by the reaction:

$$q_{\text{rxn}} = -q_{\text{cal}}$$

Remember that a temperature *increase* in the calorimeter means heat was *released* by the reaction, so $q_{\text{rxn}}$ is negative (exothermic). A temperature *decrease* means heat was absorbed, so $q_{\text{rxn}}$ is positive (endothermic).

!!! mascot-encourage "You've Got This!"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Catalyst encourages you">
    The next few sections introduce some of the most abstract ideas in all of AP Chemistry — microstates, statistical entropy, and the laws of thermodynamics. This is challenging material, but take it one step at a time and you will find that the ideas connect beautifully into a unified picture of why the universe works the way it does. You've totally got this!

## Microstates and the Statistical Nature of Entropy

To truly understand entropy, we need to think at the molecular scale. Imagine four gas molecules in a container divided into two halves (left and right). How many different ways can you distribute those four molecules between the two sides?

In statistical mechanics, each possible microscopic arrangement of particles is called a **microstate**. The number of microstates available to a system for a given macroscopic condition (e.g., "3 molecules on the left") is written as $W$ (sometimes $\Omega$).

For our four-molecule container, we can list every possibility:

| Distribution (Left : Right) | Example Arrangements | Number of Microstates ($W$) |
|---|---|---|
| 4 : 0 | LLLL | 1 |
| 3 : 1 | LLLR, LLRL, LRLL, RLLL | 4 |
| 2 : 2 | LLRR, LRLR, LRRL, RLLR, RLRL, RRLL | 6 |
| 1 : 3 | LRRR, RLRR, RRLR, RRRL | 4 |
| 0 : 4 | RRRR | 1 |
| **Total** | | **16** |

The most probable macrostate (2:2 even split) has by far the most microstates. With $10^{23}$ molecules, the 50:50 split has so many more microstates than any uneven distribution that seeing all molecules spontaneously collect on one side is essentially impossible — not because of any force preventing it, but because the expanded, mixed state is overwhelmingly more probable.

This statistical argument is the deep reason why gases expand to fill their containers, why perfume diffuses throughout a room, and why you never see smoke spontaneously reconcentrate into a cigarette. **Entropy** ($S$) is the thermodynamic quantity that measures the number of available microstates.

#### Diagram: Microstate Visualizer MicroSim

<details markdown="1">
<summary>Microstate Visualizer MicroSim Specification</summary>
Type: microsim
**sim-id:** microstate-visualizer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will be able to explain (Understanding — Bloom's 2001) how the number of microstates relates to the probability of a macrostate and the magnitude of entropy.

**Description:** An interactive simulation showing a divided container with N particles that can be distributed between two halves. Students explore how the number of microstates ($W$) grows with N and peaks at the 50:50 distribution.

**Controls:**
- Slider: Number of particles N (range: 2 to 20, default: 4)
- Button: "Randomize Distribution" — randomly reassigns each particle to left or right half
- Button: "Remove Wall" — animates particles freely mixing across the entire container
- Dropdown: "Show macrostate" — highlights a selected (left:right) distribution in the bar chart

**Visual elements:**
- Left panel (400×300 px animated canvas): Container divided by a dashed vertical line, with colored circles representing particles bouncing with simple random motion. Blue particles are on the left, orange on the right.
- Right panel (300×300 px): Vertical bar chart showing the number of microstates W for each possible macrostate (0:N, 1:N-1, ..., N:0), with the current macrostate highlighted in bright yellow.
- Below chart: Live display of current W value, ln(W), and S = k_B × ln(W) in units of J/K.
- Below canvas: Formula display: S = k_B ln(W) with current numerical values substituted.

**Behavior:**
- As N increases via slider, the bar chart updates to show a sharper and taller peak at the N/2 : N/2 distribution.
- "Remove Wall" triggers an animation where the wall fades out, particles spread uniformly, and the bar chart updates in real time to show all states becoming accessible.
- Hovering over a bar in the chart displays a tooltip with the exact W value and the fraction of total arrangements (W / 2^N).
- Layout responds to window resize events: panels reflow to single-column on narrow screens.

**Implementation:** p5.js canvas. Compute W using the binomial coefficient C(N,k) = N!/(k!(N-k)!). Use iterative factorial to avoid overflow for large N. Bar chart rendered as a p5.js sketch in a second canvas element on the page.
</details>

<iframe src="/chemistry/sims/microstate-visualizer/main.html" height="762px" width="100%" scrolling="no"></iframe>

## The Boltzmann Equation

Ludwig Boltzmann formalized the connection between microstates and entropy in 1877 with one of the most elegant equations in all of science:

$$\boxed{S = k_B \ln W}$$

where:

- $S$ = entropy (J/K)
- $k_B$ = Boltzmann constant = $1.38 \times 10^{-23}$ J/K
- $W$ = number of accessible microstates

This equation tells us something profound: entropy is a measure of *probability*. A system with more accessible microstates has higher entropy — and systems naturally evolve toward states with more microstates because those states are statistically overwhelmingly more likely.

For a change in state, we calculate the entropy change as:

$$\Delta S = S_{\text{final}} - S_{\text{initial}} = k_B \ln W_{\text{final}} - k_B \ln W_{\text{initial}} = k_B \ln\!\left(\frac{W_{\text{final}}}{W_{\text{initial}}}\right)$$

If the final state has more microstates ($W_{\text{final}} > W_{\text{initial}}$), then $\Delta S > 0$ — entropy increases. This is true for any spontaneous mixing, expansion, or phase transition to a less ordered state.

At the macroscopic level, Boltzmann's equation connects to the laboratory definition of entropy change for a reversible process:

$$\Delta S = \frac{q_{\text{rev}}}{T}$$

where $q_{\text{rev}}$ is the heat exchanged in a reversible (equilibrium) process and $T$ is the absolute temperature. Higher temperature means less "information" is gained per unit of heat, so entropy changes are smaller at high temperatures.

!!! mascot-thinking "Catalyst's Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Catalyst is thinking">
    Entropy is not "messiness" — it is *probability made mathematical*. A system evolves toward higher entropy not because nature prefers chaos, but because disordered states have so many more microscopic arrangements that ordered states are simply never visited by chance. With $10^{23}$ molecules, the probability of spontaneous order is so small it would take longer than the age of the universe to observe it once.

## The Second Law of Thermodynamics

The **Second Law of Thermodynamics** makes the boldest claim in science:

> *For any spontaneous process, the total entropy of the universe increases.*

Mathematically:

$$\Delta S_{\text{universe}} = \Delta S_{\text{system}} + \Delta S_{\text{surroundings}} > 0 \quad \text{(spontaneous process)}$$

$$\Delta S_{\text{universe}} = 0 \quad \text{(reversible process at equilibrium)}$$

The second law explains why time has a direction: heat always flows from hot to cold (not the reverse), gases always expand into a vacuum (not contract), and complex organized structures always tend to break down unless energy is continuously supplied.

Critically, the second law applies to the **universe** — not just the system. A system's entropy can *decrease* as long as the surroundings' entropy increases by an equal or greater amount. When water freezes below 0°C, the water molecules become more ordered (the system's entropy decreases), but the heat released to the cold surroundings increases the surroundings' entropy by more — so the universe's total entropy still increases and freezing is spontaneous.

The entropy change of the surroundings at constant pressure is directly related to the heat exchanged with the system:

$$\Delta S_{\text{surr}} = \frac{-q_{\text{sys}}}{T} = \frac{-\Delta H_{\text{sys}}}{T}$$

An exothermic reaction ($\Delta H < 0$) releases heat to the surroundings, increasing $\Delta S_{\text{surr}}$. This is one reason why exothermic reactions tend to be spontaneous — but as we will see, it is not the only factor.

## The Third Law of Thermodynamics

The **Third Law of Thermodynamics** establishes an absolute reference point for entropy:

> *The entropy of a perfect crystalline substance at absolute zero (0 K) is exactly zero.*

At 0 K, all thermal motion ceases. A perfect crystal has exactly one way to arrange its atoms — every atom sits in its perfectly ordered lowest-energy position. By Boltzmann's equation:

$$S = k_B \ln(1) = k_B \times 0 = 0$$

This is enormously useful because unlike enthalpy — where only *changes* are measurable — we can assign **absolute entropy values** to substances. The **standard molar entropy** $S°$ represents the total entropy of one mole of a substance at 298 K and 1 atm, measured relative to absolute zero.

| Substance | State | $S°$ (J mol$^{-1}$ K$^{-1}$) |
|---|---|---|
| $\ce{C}$ (graphite) | solid | 5.7 |
| $\ce{Fe}$ | solid | 27.3 |
| $\ce{NaCl}$ | solid | 72.1 |
| $\ce{H2O}$ | liquid | 69.9 |
| $\ce{H2O}$ | gas | 188.7 |
| $\ce{O2}$ | gas | 205.2 |
| $\ce{N2}$ | gas | 191.6 |
| $\ce{CO2}$ | gas | 213.8 |

Notice the clear pattern: gases have far higher standard entropies than liquids, which exceed those of solids. Larger and more complex molecules also have higher entropies than smaller simpler ones (more types of motion available = more microstates).

## Entropy of Phase Changes

Phase changes provide clean, calculable examples of entropy changes because they occur at constant temperature — a reversible equilibrium process. At the melting point or boiling point, the system absorbs heat without changing temperature, so we can apply $\Delta S = q_{\text{rev}}/T$ directly:

$$\Delta S_{\text{fus}} = \frac{\Delta H_{\text{fus}}}{T_{\text{m}}} \quad \text{(at the melting point)}$$

$$\Delta S_{\text{vap}} = \frac{\Delta H_{\text{vap}}}{T_{\text{b}}} \quad \text{(at the boiling point)}$$

For water as an example:

$$\Delta S_{\text{fus}} = \frac{6010 \text{ J/mol}}{273 \text{ K}} = 22.0 \text{ J mol}^{-1}\text{K}^{-1}$$

$$\Delta S_{\text{vap}} = \frac{40700 \text{ J/mol}}{373 \text{ K}} = 109.1 \text{ J mol}^{-1}\text{K}^{-1}$$

Vaporization produces a much larger entropy increase than fusion — which makes sense, since the gas phase has enormously more translational freedom and accessible microstates compared to the liquid phase, while the liquid has only modestly more freedom than the solid.

## Predicting Entropy Changes

You can often predict the sign of $\Delta S$ for a reaction without any calculation by applying a few rules based on what happens to the number of particles and their freedom of motion.

**Entropy increases ($\Delta S > 0$) when:**

- The number of moles of gas *increases* in the reaction
- A solid or liquid dissolves to form an aqueous solution
- A substance changes phase: solid → liquid → gas
- The total number of molecules or independent particles *increases*
- Temperature increases (more thermal energy → more accessible microstates)
- Different substances mix together

**Entropy decreases ($\Delta S < 0$) when:**

- The number of moles of gas *decreases*
- A dissolved substance precipitates out of solution as a solid
- A substance changes phase: gas → liquid → solid
- The total number of molecules or particles *decreases*

**Worked examples:**

$$\ce{2SO2 (g) + O2 (g) -> 2SO3 (g)} \quad \Delta n_{\text{gas}} = 2 - 3 = -1 \quad \Rightarrow \quad \Delta S < 0$$

$$\ce{CaCO3 (s) -> CaO (s) + CO2 (g)} \quad \Delta n_{\text{gas}} = 1 - 0 = +1 \quad \Rightarrow \quad \Delta S > 0$$

$$\ce{NH3 (g) + HCl (g) -> NH4Cl (s)} \quad \Delta n_{\text{gas}} = 0 - 2 = -2 \quad \Rightarrow \quad \Delta S < 0$$

For **quantitative** calculations, use standard entropy values just like Hess's Law for enthalpy:

$$\Delta S°_{\text{rxn}} = \sum n \cdot S°(\text{products}) - \sum n \cdot S°(\text{reactants})$$

!!! mascot-warning "Watch Out!"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Catalyst warns you">
    A negative $\Delta S$ for a reaction does NOT mean the reaction is nonspontaneous! You must always evaluate the full Gibbs free energy equation $\Delta G = \Delta H - T\Delta S$ before making a spontaneity judgment. A strongly negative $\Delta H$ can overcome an unfavorable $\Delta S$, especially at low temperatures. Never decide spontaneity from entropy alone.

## Gibbs Free Energy

In 1878, Josiah Willard Gibbs derived a single thermodynamic function that predicts whether a process is spontaneous at constant temperature and pressure — the conditions of most chemistry labs and essentially all living cells. He defined **Gibbs free energy** ($G$) as:

$$G = H - TS$$

For a process at constant temperature, the change in Gibbs free energy is:

$$\boxed{\Delta G = \Delta H - T\Delta S}$$

This is the **Gibbs free energy equation** — arguably the most important equation in AP Chemistry and one of the most powerful in all of physical science.

The criterion for spontaneity at constant $T$ and $P$ is simple and absolute:

- $\Delta G < 0$: process is **spontaneous** (proceeds in the forward direction without outside energy input)
- $\Delta G > 0$: process is **nonspontaneous** (forward reaction requires work; reverse reaction is spontaneous)
- $\Delta G = 0$: system is at **equilibrium** (no net change in either direction)

The genius of Gibbs free energy is that it combines *both* thermodynamic driving forces — the tendency to release energy (enthalpy) and the tendency to increase disorder (entropy) — into a single number. Temperature controls the relative weight of these two forces.

#### Diagram: Gibbs Free Energy Spontaneity Explorer

<details markdown="1">
<summary>Gibbs Free Energy Spontaneity Explorer MicroSim Specification</summary>
Type: microsim
**sim-id:** gibbs-free-energy-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will be able to apply (Applying — Bloom's 2001) the Gibbs free energy equation to predict whether a reaction is spontaneous and identify the crossover temperature for reactions where ΔH and ΔS have the same sign.

**Description:** An interactive simulation showing how ΔG changes with temperature for user-specified values of ΔH and ΔS, with real-time graph updates and a spontaneity verdict.

**Controls:**
- Slider: ΔH (range: −300 to +300 kJ/mol, step: 10 kJ/mol, default: −92)
- Slider: ΔS (range: −300 to +300 J/mol·K, step: 10 J/mol·K, default: −198)
- Slider: Temperature T (range: 0 to 1500 K, step: 10 K, default: 298)
- Preset buttons: "Haber Process", "Ice Melting", "Combustion of Methane", "ATP Hydrolysis" — each auto-sets sliders to real reaction values with literature ΔH and ΔS

**Visual elements:**
- Main graph panel (560×360 px): ΔG (kJ/mol) vs Temperature (K) line graph over the range 0–1500 K
- The line follows ΔG = ΔH − TΔS (note: ΔS must be converted from J to kJ)
- Green shaded region below ΔG = 0 line: labeled "Spontaneous (ΔG < 0)"
- Red shaded region above ΔG = 0 line: labeled "Nonspontaneous (ΔG > 0)"
- Horizontal dashed line at ΔG = 0
- Vertical orange dashed line at current temperature T with a labeled dot marker
- Dot color: green if current ΔG < 0, red if current ΔG > 0
- Info box (top right): Shows current values of ΔH, TΔS (in kJ/mol), and ΔG (in kJ/mol)
- Crossover temperature label: If the line crosses ΔG = 0 within 0–1500 K, display "Crossover T = X K"
- Four-quadrant legend panel (below graph): 2×2 grid summarizing all four ΔH/ΔS sign combinations with spontaneity verdicts, with the currently active quadrant highlighted

**Behavior:**
- Graph and all displayed values update in real time as sliders change
- If ΔS = 0 exactly, show a horizontal line (no crossover) with a special message
- Preset buttons animate slider transitions over 1 second for visual clarity
- Responsive design: adjusts canvas dimensions to fit window width, minimum 400 px wide

**Implementation:** p5.js canvas. Render graph axes with labeled tick marks. Plot the line ΔG(T) = ΔH − T·(ΔS/1000) where ΔH is in kJ/mol. Shade regions using p5.js rect() with transparency. Use lerp() for smooth preset animations.
</details>

## Spontaneity and the Four Cases

The four possible combinations of $\Delta H$ and $\Delta S$ determine when a reaction is spontaneous. Memorizing this table will serve you well on the AP exam:

| $\Delta H$ | $\Delta S$ | $\Delta G = \Delta H - T\Delta S$ | Spontaneous? |
|---|---|---|---|
| Negative (−) | Positive (+) | Always negative | Always (at any temperature) |
| Positive (+) | Negative (−) | Always positive | Never (at any temperature) |
| Negative (−) | Negative (−) | Negative only when $\|\Delta H\| > T\|\Delta S\|$ | Only at **low** temperatures |
| Positive (+) | Positive (+) | Negative only when $T\|\Delta S\| > \|\Delta H\|$ | Only at **high** temperatures |

The **crossover temperature** — where $\Delta G$ changes sign — is found by setting $\Delta G = 0$:

$$0 = \Delta H - T\Delta S \implies T_{\text{crossover}} = \frac{\Delta H}{\Delta S}$$

**Example — Haber process:**

$$\ce{N2 (g) + 3H2 (g) -> 2NH3 (g)} \quad \Delta H° = -92.4 \text{ kJ/mol}, \quad \Delta S° = -198.4 \text{ J mol}^{-1}\text{K}^{-1}$$

Here both $\Delta H$ and $\Delta S$ are negative, so this is a "low temperature favorable" reaction:

$$T_{\text{crossover}} = \frac{-92400 \text{ J/mol}}{-198.4 \text{ J mol}^{-1}\text{K}^{-1}} = 465.7 \text{ K}$$

Below 466 K, $\Delta G < 0$ and the forward reaction is spontaneous. Above 466 K, the entropy penalty dominates and the reaction becomes nonspontaneous thermodynamically. This is why industrial ammonia synthesis operates near 400–500°C as a compromise between thermodynamics and kinetics.

## Nonspontaneous Processes

A **nonspontaneous process** ($\Delta G > 0$) is one that will not proceed in the forward direction without a continuous input of energy from outside the system. Nonspontaneous does not mean impossible — it means the process requires work.

Examples of important nonspontaneous processes:

- Electrolysis of water: $\ce{2H2O (l) -> 2H2 (g) + O2 (g)}$ ($\Delta G° = +474$ kJ/mol) — requires electrical energy
- Charging a battery — electrical work must be done on the cell
- Protein synthesis — cells spend ATP to build proteins
- Refrigeration — a refrigerator moves heat from cold to hot, which is nonspontaneous and requires electrical work

In each case, an external energy source forces the nonspontaneous process to occur. The surroundings absorb the cost in terms of increased entropy, keeping the second law intact for the universe.

## Temperature Dependence of Spontaneity

The temperature dependence of $\Delta G$ explains many real phenomena. The key insight: **entropy becomes more important at higher temperatures** because $T\Delta S$ grows with $T$.

- At **low $T$**: $T\Delta S \approx 0$, so $\Delta G \approx \Delta H$ — enthalpy dominates the decision
- At **high $T$**: $T\Delta S$ is large, so entropy dominates the decision

This explains why:

- **Ice melts above 0°C**: $\Delta H > 0$ (disfavorable) but $\Delta S > 0$ (favorable). Above 273 K, $T\Delta S > \Delta H$ and $\Delta G < 0$.
- **Limestone decomposes at high temperature**: $\ce{CaCO3 (s) -> CaO (s) + CO2 (g)}$ has $\Delta H > 0$ and $\Delta S > 0$. Spontaneous only above about 1100 K.
- **The Haber process favors low temperature** thermodynamically (but requires high temperature for acceptable kinetics).

## Standard Free Energy and Free Energy of Formation

Just as we defined standard enthalpies of formation, we define **standard free energy of formation** ($\Delta G°_f$) as the free energy change for forming one mole of a compound from its elements in their standard states at 298 K.

By definition, $\Delta G°_f = 0$ for elements in their standard states.

| Substance | State | $\Delta G°_f$ (kJ/mol) |
|---|---|---|
| $\ce{H2O}$ | liquid | −237.1 |
| $\ce{H2O}$ | gas | −228.6 |
| $\ce{CO2}$ | gas | −394.4 |
| $\ce{NH3}$ | gas | −16.5 |
| $\ce{NO2}$ | gas | +51.3 |
| $\ce{SO2}$ | gas | −300.4 |
| $\ce{HF}$ | gas | −273.2 |
| $\ce{Fe2O3}$ | solid | −742.2 |

To calculate $\Delta G°$ for any reaction, use the same Hess's Law approach as for enthalpy:

$$\Delta G°_{\text{rxn}} = \sum n \cdot \Delta G°_f(\text{products}) - \sum n \cdot \Delta G°_f(\text{reactants})$$

This is equivalent to using $\Delta G° = \Delta H° - T\Delta S°$ with standard values at 298 K — both methods give the same answer.

**Critically**, $\Delta G°$ at standard conditions is connected to the equilibrium constant:

$$\Delta G° = -RT \ln K$$

$$K = e^{-\Delta G°/RT}$$

This equation reveals why equilibrium constants depend on temperature: as $T$ changes, $\Delta G°$ (through the $-T\Delta S°$ term) changes, and so does $K$. A large negative $\Delta G°$ gives a large $K$ (products strongly favored at equilibrium); a large positive $\Delta G°$ gives a small $K$ (reactants strongly favored).

!!! mascot-tip "Catalyst's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Catalyst shares a tip">
    On the AP exam, memorize the four ΔH/ΔS sign combinations table. When both signs favor spontaneity (negative ΔH and positive ΔS), you know ΔG is always negative without calculating. When they oppose, look for the temperature clue in the problem: "low temperature" means enthalpy wins; "high temperature" means entropy wins.

## Free Energy and Useful Work

The word "free" in Gibbs free energy carries a specific meaning: it refers to energy that is **free to do useful work**. For any spontaneous process at constant temperature and pressure:

$$w_{\text{max}} = \Delta G$$

For a spontaneous process ($\Delta G < 0$), the magnitude $|\Delta G|$ represents the maximum non-PV work that can be extracted — in a battery, fuel cell, or biological motor protein. For a nonspontaneous process ($\Delta G > 0$), $\Delta G$ represents the minimum work that must be *supplied* to drive the process.

In practice, real processes never achieve the theoretical maximum because of irreversibilities (friction, heat losses, resistance). But Gibbs free energy sets the fundamental thermodynamic limit.

**Connection to electrochemistry** (previewing Chapter 16): For electrochemical cells, the maximum electrical work is:

$$\Delta G = -nFE_{\text{cell}}$$

where $n$ is moles of electrons transferred, $F = 96485$ C/mol (the Faraday constant), and $E_{\text{cell}}$ is the cell potential in volts. This is one of the most important equations in electrochemistry, directly connecting thermodynamics to electrical energy.

For non-standard conditions, where the concentrations differ from 1 mol/L and pressures differ from 1 atm:

$$\Delta G = \Delta G° + RT \ln Q$$

where $Q$ is the reaction quotient. When $Q < K$, the reaction proceeds forward; when $Q > K$, it proceeds in reverse. At equilibrium, $Q = K$ and $\Delta G = 0$.

## Coupled Reactions

Living cells constantly perform nonspontaneous reactions ($\Delta G > 0$) — building proteins, copying DNA, pumping ions against concentration gradients, contracting muscle fibers. How? Through **coupled reactions**: a highly spontaneous reaction with a large negative $\Delta G$ is linked mechanistically to a nonspontaneous reaction, and only the **net** free energy change matters.

The master coupling agent in biology is ATP hydrolysis:

$$\ce{ATP + H2O -> ADP + P_i} \quad \Delta G° = -30.5 \text{ kJ/mol}$$

By coupling ATP hydrolysis to a biosynthetic reaction that costs, say, +20 kJ/mol, the net $\Delta G°$ becomes:

$$\Delta G°_{\text{net}} = -30.5 + 20.0 = -10.5 \text{ kJ/mol} \quad (\text{spontaneous!})$$

The same principle operates in industrial chemistry. In the production of iron, the highly favorable combustion of carbon monoxide drives the thermodynamically uphill reduction of iron oxide:

$$\ce{Fe2O3 (s) + 3CO (g) -> 2Fe (s) + 3CO2 (g)} \quad \Delta G° = -28.6 \text{ kJ/mol}$$

Even if this reaction had a positive $\Delta G°$, we could couple it to a more favorable reaction to make the overall process spontaneous.

!!! mascot-note "Did You Know?"
    <img src="../../img/mascot/note.png" class="mascot-admonition-img" alt="Catalyst shares a note">
    Every cellular process that requires energy — muscle contraction, nerve impulse transmission, protein synthesis — relies on coupled reactions driven by ATP hydrolysis. Your body breaks down about 40 kg of ATP per day (recycling each ATP molecule thousands of times). Thermodynamics is not just a chemistry topic; it is the language your cells use to manage energy every second of your life!

#### Diagram: ΔH and ΔS Sign Combinations Infographic

<details markdown="1">
<summary>ΔH and ΔS Sign Combinations Infographic Specification</summary>
Type: infographic
**sim-id:** delta-g-sign-combinations<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will be able to analyze (Analyzing — Bloom's 2001) the four possible sign combinations of ΔH and ΔS and correctly predict spontaneity based on temperature, without performing a numerical calculation.

**Description:** A large 2×2 quadrant diagram showing all four ΔH/ΔS combinations with color-coded spontaneity verdicts, real-world examples, and hover-activated detail panels.

**Visual elements:**
- Canvas: 600×500 px
- Title at top: "Predicting Spontaneity: The Four Cases"
- Axes: Labeled "ΔH" (vertical, negative at bottom = favorable) and "ΔS" (horizontal, positive at right = favorable)
- Four quadrants, each occupying 250×200 px:
  - Bottom-right (ΔH < 0, ΔS > 0): Bright green background — "Always Spontaneous ✓" — Example: "Combustion of methane"
  - Top-left (ΔH > 0, ΔS < 0): Red background — "Never Spontaneous ✗" — Example: "Reverse combustion"
  - Bottom-left (ΔH < 0, ΔS < 0): Blue background — "Spontaneous at Low T" — Example: "Haber process (below 466 K)"
  - Top-right (ΔH > 0, ΔS > 0): Orange background — "Spontaneous at High T" — Example: "CaCO₃ decomposition"
- Each quadrant contains: sign indicators, verdict text, thermometer icon (showing low/high T where relevant), and a chemical reaction name
- Crossover temperature formula shown in blue and orange quadrants: T = ΔH / ΔS

**Behavior:**
- Hovering over any quadrant expands it slightly and shows a tooltip with two additional real-world examples for that case
- Clicking a quadrant locks the expanded detail view; clicking again collapses it
- A "Show Formula" toggle button overlays $\Delta G = \Delta H - T\Delta S$ on the canvas with color-coded terms
- Responsive design: canvas rescales to fill available width with minimum 400 px

**Implementation:** p5.js canvas. Use mouseX/mouseY to detect hover over each quadrant region. Render quadrant content with p5.js text() and rect() functions. Animate quadrant expansion using easing functions. Use p5.js createButton() for the toggle button.
</details>

## Thermodynamic Stability vs Kinetic Stability

Here is one of the most important distinctions in all of chemistry — and one that trips up students on the AP exam: **thermodynamic stability** and **kinetic stability** are completely independent.

**Thermodynamic stability** refers to whether a substance has a low Gibbs free energy relative to its potential decomposition products. A thermodynamically stable substance has $\Delta G > 0$ for decomposition — it will not spontaneously break apart. If $\Delta G < 0$ for decomposition, the substance is thermodynamically *unstable* — it would spontaneously convert to products *if the reaction could proceed*.

**Kinetic stability** refers to how rapidly a thermodynamically driven change actually occurs. A substance can be thermodynamically unstable yet persist indefinitely if the **activation energy** for its decomposition is very high — it is kinetically stable even though thermodynamically unfavorable.

**Classic example: Diamond and graphite**

At room temperature and pressure, graphite is the thermodynamically stable form of carbon, and diamond is metastable:

$$\ce{C (diamond) -> C (graphite)} \quad \Delta G = -2.9 \text{ kJ/mol}$$

Diamond is thermodynamically unstable relative to graphite — the conversion is spontaneous! But the activation energy for breaking and re-forming carbon bonds in the diamond lattice is enormous. At room temperature, the conversion proceeds at an immeasurably slow rate. Diamond is **kinetically stable** even though thermodynamically unstable. Your diamond engagement ring is safe.

**Another example: Hydrogen gas and oxygen gas**

$$\ce{2H2 (g) + O2 (g) -> 2H2O (l)} \quad \Delta G° = -474 \text{ kJ/mol}$$

This reaction is thermodynamically extremely favorable. Yet a sealed flask of $\ce{H2}$ and $\ce{O2}$ can sit at room temperature for years without exploding. The activation energy for breaking the $\ce{H-H}$ and $\ce{O=O}$ bonds is very high. A spark provides the activation energy needed, and the reaction proceeds explosively. The mixture was kinetically stable, not thermodynamically stable.

| Feature | Thermodynamic Stability | Kinetic Stability |
|---|---|---|
| Determined by | $\Delta G$ of the conversion | Activation energy $E_a$ |
| Time scale | Irrelevant to thermodynamics | Determines how fast |
| How to change | Alter $T$, $P$, or composition | Add catalyst; change $T$ |
| Sign of stability | $\Delta G > 0$ for decomposition | High $E_a$ for decomposition |
| Example (stable) | Graphite (low $G$) | Diamond (high $E_a$) |

This distinction matters enormously in real chemistry. Many pharmaceuticals are kinetically stable under storage conditions but thermodynamically unstable — they would react if the activation energy barrier could be lowered. Catalyst design, reaction engineering, and drug formulation all hinge on balancing thermodynamic and kinetic considerations.

## Putting It All Together: A Worked Example

Let us do a complete thermodynamic analysis of the reaction between nitrogen dioxide and water — a key step in forming nitric acid:

$$\ce{3NO2 (g) + H2O (l) -> 2HNO3 (aq) + NO (g)}$$

**Given data:**

- $\Delta H° = -138$ kJ/mol
- $\Delta S° = -147$ J mol$^{-1}$ K$^{-1}$

**Step 1: Calculate $\Delta G°$ at 298 K:**

$$\Delta G° = \Delta H° - T\Delta S° = -138000 - (298)(-147) = -138000 + 43806 = -94194 \text{ J/mol} = -94.2 \text{ kJ/mol}$$

Spontaneous at 298 K. ✓

**Step 2: Identify the ΔH/ΔS combination:**

Both $\Delta H < 0$ and $\Delta S < 0$ → spontaneous only at low temperature.

**Step 3: Find the crossover temperature:**

$$T_{\text{crossover}} = \frac{\Delta H°}{\Delta S°} = \frac{-138000 \text{ J/mol}}{-147 \text{ J mol}^{-1}\text{K}^{-1}} = 939 \text{ K}$$

Above 939 K, the reaction becomes nonspontaneous thermodynamically.

**Step 4: Find K at 298 K:**

$$K = e^{-\Delta G°/RT} = e^{-(-94200)/(8.314 \times 298)} = e^{38.0} \approx 3.2 \times 10^{16}$$

The enormous K value confirms the reaction strongly favors products at room temperature — consistent with nitric acid production from nitrogen dioxide.

**Step 5: Assess stability:**

The product $\ce{HNO3}$ is thermodynamically stable in aqueous solution ($\Delta G°_f = -111.3$ kJ/mol) and kinetically stable as well, making it a persistent industrial and environmental chemical.

## Summary

This chapter built the complete thermodynamic framework for predicting spontaneity in chemical and physical processes:

- **State functions** ($U$, $H$, $S$, $G$) depend only on the current state of the system; **path functions** ($q$, $w$) depend on the specific process used.
- The **First Law** ($\Delta U = q + w$) states that energy is conserved; **PV work** ($w = -P\Delta V$) relates $\Delta H$ to $\Delta U$ via $\Delta H = \Delta U + \Delta n_{\text{gas}}RT$.
- **Calorimetry** measures heat at constant pressure ($q_p = \Delta H$, coffee cup) or constant volume ($q_v = \Delta U$, bomb calorimeter).
- **Microstates** ($W$) count the microscopic arrangements of a system; the **Boltzmann equation** ($S = k_B \ln W$) quantifies entropy as a measure of the number of accessible microstates.
- The **Second Law** states that $\Delta S_{\text{universe}} > 0$ for any spontaneous process; the system's entropy can decrease as long as the surroundings' entropy increases more.
- The **Third Law** establishes $S = 0$ for a perfect crystal at 0 K, enabling absolute entropy values ($S°$).
- Entropy increases when gases form, particles disperse, substances mix, or temperature increases.
- **Gibbs free energy** ($\Delta G = \Delta H - T\Delta S$) predicts spontaneity: $\Delta G < 0$ means spontaneous; $\Delta G > 0$ means nonspontaneous; $\Delta G = 0$ means equilibrium.
- **Standard free energy of formation** values enable calculation of $\Delta G°_{\text{rxn}}$, and $\Delta G° = -RT\ln K$ links thermodynamics directly to equilibrium constants.
- $|\Delta G|$ equals the maximum useful (non-PV) work a spontaneous process can deliver.
- **Coupled reactions** use the free energy of spontaneous processes to drive nonspontaneous ones — the fundamental energy management strategy of living cells.
- **Thermodynamic stability** ($\Delta G < 0$ for conversion to products) is independent of **kinetic stability** (governed by activation energy). A substance can be thermodynamically unstable yet kinetically persistent (like diamond or a $\ce{H2}$/$\ce{O2}$ mixture at room temperature).

!!! mascot-celebration "Great Work, Chemists!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Catalyst celebrates">
    You have just mastered one of the deepest ideas in all of science — the thermodynamic basis of why things happen. From Boltzmann's microstates to Gibbs free energy, you now have the tools to predict spontaneity for any chemical or physical process. Chapter 14 will show you how these same free energy principles govern chemical equilibrium. You have real potential energy — let's keep reacting!
