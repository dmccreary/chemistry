---
title: Energy, Enthalpy, and Calorimetry
description: Explore thermodynamic systems, heat transfer, specific heat capacity, calorimetry, enthalpy, Hess's law, bond enthalpies, the Born-Haber cycle, and an introduction to entropy.
generated_by: claude skill chapter-content-generator
date: 2026-02-20 09:07:17
version: 0.04
---

# Chapter 12: Energy, Enthalpy, and Calorimetry

!!! mascot-welcome "Welcome, Scientists!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Catalyst welcomes you">
    Welcome to the world of thermochemistry — where we finally answer the question every chemistry student has asked: *why does this reaction get hot (or cold)?* Energy is at the heart of every chemical change, and this chapter gives you the tools to measure it, calculate it, and predict it. Let's react!

## Summary

This chapter introduces thermodynamic systems, heat transfer, specific heat capacity, calorimetry, enthalpy, Hess's law, bond enthalpies, and the Born-Haber cycle. Students learn to calculate energy changes in chemical reactions using multiple methods.

## Concepts Covered

This chapter covers the following 32 concepts from the learning graph:

300. Exothermic Diagrams
301. Endothermic Diagrams
321. Thermodynamics
322. System and Surroundings
323. Open Systems
324. Closed Systems
325. Isolated Systems
326. Exothermic Reactions
327. Endothermic Reactions
328. Heat and Temperature
329. Heat Transfer
330. Specific Heat Capacity
331. Heat Capacity
332. Calorimetry
333. Coffee Cup Calorimeter
334. Bomb Calorimeter
335. Enthalpy
336. Enthalpy Change
337. Standard Enthalpy
338. Enthalpy of Formation
339. Standard Formation Values
340. Enthalpy of Combustion
341. Enthalpy of Reaction
342. Hess's Law
343. Hess's Law Calculations
344. Born-Haber Cycle
345. Bond Enthalpy
346. Bond Enthalpy Calculations
347. Entropy
348. Entropy Change
349. Standard Entropy
350. Entropy and Disorder

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Chemistry](../01-foundations-of-chemistry/index.md)
- [Chapter 4: Chemical Bonding and Lewis Structures](../04-chemical-bonding-and-lewis-structures/index.md)
- [Chapter 6: Intermolecular Forces and States of Matter](../06-intermolecular-forces-and-states-of-matter/index.md)
- [Chapter 8: Chemical Reactions and Equations](../08-chemical-reactions-and-equations/index.md)
- [Chapter 10: Reaction Rates and Rate Laws](../10-reaction-rates-and-rate-laws/index.md)

---

## Introduction: Energy Is the Currency of Chemistry

Every chemical reaction involves energy. Combustion engines convert chemical energy into mechanical work. Your body extracts energy from glucose to power every heartbeat and thought. Cold packs in first-aid kits draw heat out of injured tissue by exploiting endothermic dissolving reactions. Understanding how energy flows into and out of chemical systems is one of the most powerful skills in AP Chemistry — and in understanding the physical world.

**Thermodynamics** is the branch of science that studies energy transformations. It tells us not only *how much* energy a reaction releases or absorbs, but also whether a reaction can happen at all under a given set of conditions. In this chapter, we focus on the first part of that story: measuring and calculating energy changes in chemical reactions.

We will start by defining the vocabulary of thermodynamics — systems, surroundings, heat, and temperature. Then we will build up your calculation toolkit: specific heat capacity, calorimetry, enthalpy, Hess's law, bond enthalpies, and the Born-Haber cycle. By the end, you will have four independent methods for determining the enthalpy change of a reaction, and you will understand why they all give the same answer.

---

## 12.1 Thermodynamic Systems and Surroundings

### Defining the System

Before you can analyze any energy change, you need to define *what* you are analyzing. In thermodynamics, we draw an imaginary boundary around the part of the universe we are interested in and call it the **system**. Everything outside that boundary is called the **surroundings**. The combination of system and surroundings constitutes the universe:

$$ \text{universe} = \text{system} + \text{surroundings} $$

For a chemical reaction, the system is typically the reacting chemicals themselves. The surroundings include the container, the solvent (if any), the air around the container, and ultimately everything else.

### The Three Types of Systems

The nature of the boundary between system and surroundings determines what can be exchanged across it. Chemists classify systems into three types:

| System Type | Can Exchange Matter? | Can Exchange Energy? | Example |
|---|---|---|---|
| **Open** | Yes | Yes | Beaker open to air |
| **Closed** | No | Yes | Sealed flask with heat exchange |
| **Isolated** | No | No | Ideal thermos (calorimeter) |

In most laboratory reactions, we work with **closed systems** — the reaction vessel prevents matter from escaping, but heat can flow through the walls. A sealed balloon is a closed system. An **isolated system** is an idealization used in calorimetry: we design our equipment to minimize heat loss to the surroundings so we can accurately measure the heat released or absorbed by the reaction.

**Open systems** are common in everyday life (a pot of boiling water loses both steam and heat), but they are harder to analyze thermodynamically because matter and energy flow simultaneously.

!!! mascot-thinking "Catalyst's Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Catalyst is thinking">
    Notice that "system" and "surroundings" are definitions you choose — there is no universal rule. When you calculate the energy of a reaction, *you* decide what counts as the system. Chemists usually choose the reacting molecules as the system, making the rest of the universe the surroundings.

### Energy Flow Conventions

When energy flows between the system and surroundings, we track the direction from the system's perspective:

- **\( q > 0 \)**: Heat flows *into* the system (system gains energy). This is an **endothermic** process.
- **\( q < 0 \)**: Heat flows *out of* the system (system loses energy). This is an **exothermic** process.

This sign convention is used universally in AP Chemistry. Think of the system as your bank account: positive means money (energy) coming in, negative means money going out.

---

## 12.2 Heat, Temperature, and Heat Transfer

### Heat vs. Temperature: A Critical Distinction

These two terms are often confused in everyday language, but they have very different scientific meanings:

- **Temperature** (\( T \)) is a measure of the *average kinetic energy* of the particles in a substance. It is an intensive property — it does not depend on how much matter is present.
- **Heat** (\( q \)) is energy *in transit* — energy that flows from a hotter object to a cooler one because of a temperature difference. Heat is an extensive property — it depends on both the temperature difference and the amount of material.

A useful analogy: temperature is like water pressure in a pipe, while heat is like the volume of water that flows through the pipe. A small pipe at high pressure can deliver less water than a large pipe at lower pressure.

!!! mascot-warning "Watch Out!"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Catalyst warns you">
    Never say a substance "contains heat." Heat is energy *in transit*, not energy *stored* in an object. Substances store **thermal energy** (or **internal energy**). Heat only exists during the transfer process. This distinction matters on AP free-response questions.

### Mechanisms of Heat Transfer

Heat can flow between objects by three mechanisms:

- **Conduction**: Energy transfers through direct particle-to-particle contact (e.g., a metal spoon heating up in hot soup).
- **Convection**: Energy transfers through the movement of fluid (e.g., hot air rising in a room).
- **Radiation**: Energy transfers through electromagnetic waves without requiring matter (e.g., the warmth felt from sunlight).

In most AP Chemistry problems, we focus on heat flow at constant pressure, where conduction between the solution and calorimeter walls is the dominant mechanism.

### The Zeroth Law of Thermodynamics

Heat flows spontaneously from objects at higher temperature to objects at lower temperature until **thermal equilibrium** is reached — the point at which both objects are at the same temperature and no net heat flow occurs. This observation is so fundamental it is called the Zeroth Law of Thermodynamics:

*If system A is in thermal equilibrium with system B, and system B is in thermal equilibrium with system C, then A and C are also in thermal equilibrium with each other.*

This is the logical foundation for thermometers — a thermometer reaches equilibrium with whatever it touches, and we read its temperature to determine the object's temperature.

---

## 12.3 Specific Heat Capacity and Calorimetry

### Specific Heat Capacity

Different substances require different amounts of energy to raise their temperature by the same amount. This property is captured by **specific heat capacity** (\( c \)), defined as the amount of heat required to raise the temperature of **1 gram** of a substance by **1 degree Celsius** (or 1 kelvin). Its units are \( \text{J/(g·°C)} \) or equivalently \( \text{J/(g·K)} \).

The heat equation relates these quantities:

$$ q = mc\Delta T $$

where:

- \( q \) = heat transferred (J)
- \( m \) = mass of the substance (g)
- \( c \) = specific heat capacity (J/g·°C)
- \( \Delta T \) = change in temperature = \( T_\text{final} - T_\text{initial} \) (°C or K)

The closely related **heat capacity** (\( C \)) applies to an *entire object* rather than per gram:

$$ q = C\Delta T $$

Heat capacity has units of J/°C and depends on both the identity of the substance *and* the mass of the sample.

Common specific heat capacities that appear frequently on the AP exam:

| Substance | Specific Heat Capacity \( c \) (J/g·°C) |
|---|---|
| Water \( \ce{H2O} \) (liquid) | 4.184 |
| Water \( \ce{H2O} \) (ice) | 2.09 |
| Water \( \ce{H2O} \) (steam) | 2.01 |
| Aluminum | 0.897 |
| Iron | 0.449 |
| Copper | 0.385 |
| Gold | 0.129 |
| Ethanol | 2.44 |

Water's unusually **high specific heat capacity** (4.184 J/g·°C) is worth remembering. It means water resists temperature changes — a key reason Earth's oceans moderate global climate. Its high specific heat arises from the extensive hydrogen bonding network discussed in Chapter 6.

!!! mascot-encourage "You've Got This!"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Catalyst encourages you">
    Calorimetry problems can seem intimidating because they involve multi-step calculations and careful sign conventions. Take them one variable at a time: identify what you know, what you want, and write out the equation before plugging in numbers. You have all the algebra skills you need — this is just organized problem-solving!

### Calorimetry: Measuring Heat in the Lab

**Calorimetry** is the experimental technique of measuring the heat released or absorbed in a chemical or physical process. The core principle: in an ideal calorimeter (isolated system), heat lost by one part of the system equals heat gained by another part:

$$ q_\text{lost} = -q_\text{gained} $$

or equivalently:

$$ q_\text{reaction} = -q_\text{solution} $$

#### Diagram: Coffee Cup vs. Bomb Calorimeter Explorer

<iframe src="../../sims/calorimeter-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Calorimeter Explorer MicroSim Specification</summary>
Type: microsim
**sim-id:** calorimeter-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Applying (Bloom's 2001) — Students use the \( q = mc\Delta T \) equation interactively to calculate heat transfer in both coffee cup and bomb calorimeters.

**Canvas size:** 800 × 500 px, responsive to window resize events.

**Layout:** Split panel — left side shows an animated diagram of the selected calorimeter type (toggle button at top); right side shows sliders and numeric inputs for variables.

**Coffee Cup Calorimeter panel:**
- Animated cross-section of a styrofoam cup nested in a second cup (insulation), with a thermometer, stirring rod, and labeled reaction mixture inside.
- Sliders: mass of solution (g), specific heat of solution (J/g·°C, default 4.184), initial temperature (°C), final temperature (°C).
- Display: calculated \( q_\text{solution} \) and \( q_\text{reaction} \) (opposite sign) in joules and kJ/mol if moles input provided.
- Color-coded animation: solution color shifts from blue→orange for exothermic, orange→blue for endothermic.

**Bomb Calorimeter panel:**
- Cross-section showing inner steel vessel (bomb), water bath surrounding it, thermometer, and outer insulating jacket.
- Sliders: heat capacity of calorimeter \( C_\text{cal} \) (J/°C), mass of water (g), initial temperature, final temperature.
- Display: \( q_\text{cal} \) and \( q_\text{rxn} \).

**Behavior:** All outputs update in real time as sliders move. Warn user (red text) when \( \Delta T < 0 \) for exothermic but sign is entered incorrectly.
</details>

### The Coffee Cup Calorimeter

The simplest calorimeter used in AP labs is the **coffee cup calorimeter** — two nested styrofoam cups with a lid, thermometer, and stirring rod. It operates at constant pressure (open to atmosphere through a small hole for the thermometer), which makes it ideal for measuring enthalpies of reactions in solution.

Because styrofoam is a poor conductor of heat, we assume negligible heat exchange with the surroundings. The heat released or absorbed by the reaction (\( q_\text{rxn} \)) equals the negative of the heat absorbed or released by the solution (\( q_\text{soln} \)):

$$ q_\text{rxn} = -q_\text{soln} = -(m_\text{soln})(c_\text{soln})(\Delta T) $$

**Worked Example:** 50.0 mL of 1.00 M \( \ce{HCl} \) at 22.5 °C is mixed with 50.0 mL of 1.00 M \( \ce{NaOH} \) at 22.5 °C in a coffee cup calorimeter. The final temperature reaches 29.2 °C. Calculate \( q_\text{rxn} \) and \( \Delta H_\text{rxn} \) in kJ/mol.

The reaction is: \( \ce{HCl(aq) + NaOH(aq) -> NaCl(aq) + H2O(l)} \)

1. Total mass of solution = 50.0 g + 50.0 g = 100.0 g (assuming density ≈ 1.00 g/mL)
2. \( \Delta T = 29.2 - 22.5 = 6.7 \) °C
3. \( q_\text{soln} = (100.0\,\text{g})(4.184\,\text{J/g·°C})(6.7\,\text{°C}) = 2803\,\text{J} = 2.80\,\text{kJ} \)
4. \( q_\text{rxn} = -2.80\,\text{kJ} \)
5. Moles of reaction = 0.0500 L × 1.00 mol/L = 0.0500 mol
6. \( \Delta H_\text{rxn} = \frac{-2.80\,\text{kJ}}{0.0500\,\text{mol}} = -56.1\,\text{kJ/mol} \)

The negative sign confirms this is exothermic — neutralization always releases heat.

### The Bomb Calorimeter

For reactions involving gases or combustion, we use a **bomb calorimeter** — a sealed steel vessel (the "bomb") that holds the sample at constant volume, submerged in a water bath inside an insulated jacket. Because the volume is constant (not pressure), bomb calorimeters measure the **internal energy change** \( \Delta U \), not enthalpy directly. However, for most purposes in AP Chemistry, the difference is small enough that we treat bomb calorimeter results as approximate enthalpies of combustion.

The heat calculation for a bomb calorimeter uses the *heat capacity of the entire calorimeter assembly* \( C_\text{cal} \) (units: J/°C):

$$ q_\text{rxn} = -C_\text{cal} \times \Delta T $$

The value of \( C_\text{cal} \) is determined by calibration — burning a substance of known enthalpy of combustion (often benzoic acid) and measuring the temperature change.

---

## 12.4 Exothermic and Endothermic Reactions

### Identifying Reaction Direction from Energy

A reaction is **exothermic** when the system releases heat to the surroundings (\( q < 0 \), \( \Delta H < 0 \)). The products have less energy stored in chemical bonds than the reactants — the "extra" energy is released as heat.

A reaction is **endothermic** when the system absorbs heat from the surroundings (\( q > 0 \), \( \Delta H > 0 \)). The products have more stored energy than the reactants — the difference is supplied by the surroundings.

Common examples:

| Exothermic | Endothermic |
|---|---|
| Combustion of fuels | Photosynthesis |
| Neutralization (acid + base) | Dissolving ammonium nitrate in water |
| Rusting of iron | Melting ice |
| Condensation of steam | Decomposition of \( \ce{CaCO3} \) |
| Hand warmers | Cold packs |

### Energy Diagrams

**Energy diagrams** (also called potential energy diagrams or reaction coordinate diagrams) plot the potential energy of the system as a function of reaction progress. They provide an intuitive visualization of exothermic and endothermic reactions and their activation energies (which you first met in Chapter 11).

#### Diagram: Interactive Exothermic and Endothermic Energy Diagrams

<details markdown="1">
<summary>Exothermic and Endothermic Energy Diagram MicroSim Specification</summary>
Type: microsim
**sim-id:** energy-diagram-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Understanding (Bloom's 2001) — Students interpret energy diagrams to identify reactant/product energy levels, activation energy, and enthalpy change for both exothermic and endothermic reactions.

**Canvas size:** 750 × 450 px, responsive to window resize.

**Controls:**
- Toggle button: "Exothermic" / "Endothermic" (switches the diagram type)
- Sliders: Activation energy \( E_a \) (forward), Enthalpy change \( \Delta H \) (negative for exo, positive for endo)
- Checkbox: "Show catalyst" — lowers the activation energy hill when checked

**Visual elements:**
- Smooth curved energy profile from left (reactants) to right (products) with a peak at the transition state.
- Horizontal dashed lines at reactant and product energy levels, labeled "Reactants" and "Products."
- Double-headed arrow labeled \( E_a \) from reactant level to peak.
- Double-headed arrow labeled \( \Delta H \) between reactant and product levels. Arrow is red/downward for exothermic, blue/upward for endothermic.
- Peak labeled "Transition State (Activated Complex)."
- When catalyst is shown, draw a second (lower) curve in green with reduced \( E_a \) but the same \( \Delta H \).

**Behavior:** All elements update smoothly as sliders change. Display numeric values of \( E_a \) and \( \Delta H \) in kJ/mol in a small text box.
</details>

In an exothermic diagram, the products sit at a **lower energy** than the reactants. The energy difference (\( \Delta H \)) is released as heat. In an endothermic diagram, the products sit at a **higher energy** than the reactants — the reaction absorbs that energy from the surroundings.

Note that *both* exothermic and endothermic reactions have activation energy barriers. A negative \( \Delta H \) does not mean the reaction happens instantly — it just means the products are more stable than the reactants once the barrier is overcome.

---

## 12.5 Enthalpy

### What Is Enthalpy?

When reactions occur at constant pressure (like in an open beaker in a lab), the heat released or absorbed equals the change in a thermodynamic quantity called **enthalpy** (\( H \)):

$$ q_p = \Delta H $$

Enthalpy is defined as the sum of a system's internal energy (\( U \)) and the pressure–volume product:

$$ H = U + PV $$

You do not need to calculate \( H \) directly — what matters is the **enthalpy change**:

$$ \Delta H = H_\text{products} - H_\text{reactants} $$

At constant pressure, \( \Delta H \) equals the heat transferred between system and surroundings. This is why calorimetry at constant pressure directly measures \( \Delta H \).

### Standard Enthalpy

To compare enthalpies of different reactions fairly, chemists define a **standard state**: pure substances at 1 bar pressure (≈ 1 atm) and a specified temperature (usually 25 °C = 298 K). The **standard enthalpy** of a reaction, \( \Delta H^\circ \), is the enthalpy change when all reactants and products are in their standard states.

The superscript ° (pronounced "naught" or "standard") always signals standard conditions.

### Enthalpy of Formation

The **standard enthalpy of formation** (\( \Delta H^\circ_f \)) of a compound is the enthalpy change when **1 mole** of that compound is formed from its **elements in their standard states**.

For example:

$$\ce{C(s, graphite) + O2(g) -> CO2(g)} \quad \Delta H^\circ_f = -393.5\,\text{kJ/mol}$$

$$\ce{H2(g) + \frac{1}{2}O2(g) -> H2O(l)} \quad \Delta H^\circ_f = -285.8\,\text{kJ/mol}$$

Two important rules for enthalpies of formation:

- The \( \Delta H^\circ_f \) of any **element in its standard state** is exactly **zero** by definition. (e.g., \( \Delta H^\circ_f [\ce{O2(g)}] = 0 \), \( \Delta H^\circ_f [\ce{C(s, graphite)}] = 0 \))
- Formation enthalpies are always reported per **mole of product formed**.

### Standard Enthalpy of Reaction from Formation Values

One of the most powerful applications of enthalpy of formation data is calculating the standard enthalpy of *any* reaction using tabulated values. The formula is:

$$ \Delta H^\circ_\text{rxn} = \sum n\,\Delta H^\circ_f(\text{products}) - \sum m\,\Delta H^\circ_f(\text{reactants}) $$

where \( n \) and \( m \) are the stoichiometric coefficients from the balanced equation.

**Worked Example:** Calculate \( \Delta H^\circ_\text{rxn} \) for the combustion of methane:

$$\ce{CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l)}$$

Using standard formation values:

| Substance | \( \Delta H^\circ_f \) (kJ/mol) |
|---|---|
| \( \ce{CH4(g)} \) | −74.8 |
| \( \ce{O2(g)} \) | 0 (element in standard state) |
| \( \ce{CO2(g)} \) | −393.5 |
| \( \ce{H2O(l)} \) | −285.8 |

$$ \Delta H^\circ_\text{rxn} = [1(-393.5) + 2(-285.8)] - [1(-74.8) + 2(0)] $$

$$ \Delta H^\circ_\text{rxn} = [-393.5 + (-571.6)] - [-74.8] $$

$$ \Delta H^\circ_\text{rxn} = -965.1 - (-74.8) = -890.3\,\text{kJ/mol} $$

The combustion of methane releases 890.3 kJ per mole — a highly exothermic reaction that powers natural gas stoves and furnaces.

### Enthalpy of Combustion

The **enthalpy of combustion** (\( \Delta H^\circ_\text{comb} \)) is the enthalpy change when 1 mole of a substance undergoes complete combustion with excess oxygen at standard conditions. Enthalpies of combustion are always negative (exothermic) and are frequently measured using bomb calorimeters. They appear often in AP problems involving fuel energy content.

---

## 12.6 Hess's Law

### The Principle

**Hess's Law** is one of the most elegant and useful principles in thermochemistry. It states:

> The total enthalpy change for a chemical reaction is independent of the pathway taken — it depends only on the initial (reactants) and final (products) states.

This is a direct consequence of enthalpy being a **state function** — a property that depends only on the current state of the system, not on how it got there. Other state functions you will encounter include internal energy (\( U \)), entropy (\( S \)), and Gibbs free energy (\( G \)).

!!! mascot-tip "Catalyst's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Catalyst shares a tip">
    When using Hess's Law, treat chemical equations like algebraic equations. You can reverse them (flip the sign of \( \Delta H \)) and multiply them by any factor (multiply \( \Delta H \) by the same factor). Add the equations together so that intermediates cancel — what remains should match your target equation exactly.

### Hess's Law Calculations

To apply Hess's Law, manipulate a set of given reactions so they add up to the target reaction:

**Rules for manipulation:**

- **Reverse a reaction:** Multiply \( \Delta H \) by −1.
- **Scale a reaction by a factor \( n \):** Multiply \( \Delta H \) by \( n \).
- **Add reactions:** Add their \( \Delta H \) values.

**Worked Example:** Find \( \Delta H \) for the reaction:

$$\ce{C(s) + \frac{1}{2}O2(g) -> CO(g)}$$

Given:

- Reaction 1: \( \ce{C(s) + O2(g) -> CO2(g)} \quad \Delta H_1 = -393.5\,\text{kJ} \)
- Reaction 2: \( \ce{CO(g) + \frac{1}{2}O2(g) -> CO2(g)} \quad \Delta H_2 = -283.0\,\text{kJ} \)

Strategy: We need \( \ce{CO(g)} \) as a *product*, but it appears as a *reactant* in Reaction 2. Reverse Reaction 2:

- Reaction 2 (reversed): \( \ce{CO2(g) -> CO(g) + \frac{1}{2}O2(g)} \quad \Delta H = +283.0\,\text{kJ} \)

Now add Reaction 1 and reversed Reaction 2:

$$ \ce{C(s) + O2(g) -> CO2(g)} $$
$$ \ce{CO2(g) -> CO(g) + \frac{1}{2}O2(g)} $$

Cancel \( \ce{CO2} \) from both sides, and \( \frac{1}{2}\ce{O2} \) subtracts from \( \ce{O2} \):

$$ \ce{C(s) + \frac{1}{2}O2(g) -> CO(g)} $$

$$ \Delta H = -393.5 + 283.0 = -110.5\,\text{kJ} $$

#### Diagram: Hess's Law Pathway Visualizer

<details markdown="1">
<summary>Hess's Law Pathway Diagram MicroSim Specification</summary>
Type: microsim
**sim-id:** hess-law-visualizer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Analyzing (Bloom's 2001) — Students trace alternative reaction pathways and verify that total enthalpy change is the same regardless of route.

**Canvas size:** 800 × 480 px, responsive to window resize.

**Concept:** Display an "enthalpy staircase" showing reactants, intermediates, and products at different energy levels on a vertical axis.

**Default example:** Combustion of carbon to \( \ce{CO} \) (direct path) vs. combustion to \( \ce{CO2} \) then reverse to \( \ce{CO} \) (indirect path).

**Visual elements:**
- Vertical axis labeled "Enthalpy (kJ)" with a scale.
- Horizontal platforms at three levels: Reactants (\( \ce{C + O2} \)), Intermediate (\( \ce{CO2} \)), Products (\( \ce{CO + \frac{1}{2}O2} \)).
- **Direct path arrow:** Dashed blue arrow from reactants directly to products, labeled with \( \Delta H_\text{direct} \).
- **Indirect path arrows:** Solid red arrow from reactants down to intermediate (labeled \( \Delta H_1 \)), then solid red arrow from intermediate up to products (labeled \( -\Delta H_2 \)).
- Text box showing that both paths sum to the same total \( \Delta H \).

**Interactivity:**
- Dropdown to select a different example (neutralization, formation of water, etc.).
- Hover over any arrow to see the numerical \( \Delta H \) value and the chemical equation for that step.
- "Animate" button traces a glowing particle along each path sequentially.
</details>

---

## 12.7 Bond Enthalpy

### Breaking and Forming Bonds

Every chemical bond stores energy. **Bond enthalpy** (also called bond dissociation energy) is the energy required to break **one mole** of a particular bond in the gas phase, with all species in their gaseous state:

$$ \ce{A-B(g) -> A(g) + B(g)} \quad \Delta H = \text{Bond Enthalpy (positive, always)} $$

Breaking bonds always **requires** energy (endothermic). Forming bonds always **releases** energy (exothermic). The overall \( \Delta H \) of a reaction reflects the competition between bond breaking and bond forming:

$$ \Delta H_\text{rxn} \approx \sum (\text{bond enthalpies of bonds broken}) - \sum (\text{bond enthalpies of bonds formed}) $$

Note that bond enthalpies are **average values** — they vary slightly depending on the molecular environment. This means bond enthalpy calculations give approximate (not exact) \( \Delta H \) values. They are most reliable for gas-phase reactions.

Common bond enthalpies (approximate, in kJ/mol):

| Bond | \( \Delta H \) (kJ/mol) | Bond | \( \Delta H \) (kJ/mol) |
|---|---|---|---|
| \( \ce{H-H} \) | 436 | \( \ce{C=O} \) | 799 |
| \( \ce{H-O} \) | 463 | \( \ce{C#N} \) | 891 |
| \( \ce{H-C} \) | 413 | \( \ce{N#N} \) | 945 |
| \( \ce{C-C} \) | 347 | \( \ce{O=O} \) | 498 |
| \( \ce{C=C} \) | 614 | \( \ce{C-O} \) | 358 |
| \( \ce{C#C} \) | 839 | \( \ce{N-H} \) | 391 |

### Bond Enthalpy Calculations

**Worked Example:** Estimate \( \Delta H \) for the combustion of methane in the gas phase:

$$\ce{CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g)}$$

Draw Lewis structures to count bonds:

- **Bonds broken (reactants):** 4 \( \ce{C-H} \) in \( \ce{CH4} \); 2 \( \times \) 1 \( \ce{O=O} \) in \( \ce{2O2} \)
- **Bonds formed (products):** 2 \( \times \) 2 \( \ce{C=O} \) in \( \ce{CO2} \); 2 \( \times \) 2 \( \ce{O-H} \) in \( \ce{2H2O} \)

$$ \Delta H \approx [4(413) + 2(498)] - [4(799) + 4(463)] $$

$$ \Delta H \approx [1652 + 996] - [3196 + 1852] $$

$$ \Delta H \approx 2648 - 5048 = -2400\,\text{kJ/mol} $$

This is an estimate. The accepted value (−890.3 kJ/mol from formation enthalpies) applies when \( \ce{H2O} \) is liquid; the gas-phase estimate differs due to enthalpy of vaporization of water and the use of average bond enthalpies.

---

## 12.8 The Born-Haber Cycle

### Ionic Lattice Formation

For ionic compounds, we can use a specialized application of Hess's Law called the **Born-Haber cycle** to determine the **lattice energy** — the energy released when gaseous ions combine to form an ionic solid. Lattice energy cannot be measured directly, but it can be calculated indirectly using known thermodynamic quantities.

The Born-Haber cycle for the formation of sodium chloride (\( \ce{NaCl} \)) applies Hess's Law across five sequential steps, each of which has a measurable or known \( \Delta H \):

1. **Sublimation of Na(s) to Na(g)** — Enthalpy of sublimation (\( \Delta H_\text{sub} \))
2. **Dissociation of \( \ce{Cl2(g)} \) to \( \ce{Cl(g)} \)** — Bond enthalpy (½ × Cl–Cl bond energy)
3. **Ionization of Na(g) to \( \ce{Na+(g)} \)** — First ionization energy (\( IE_1 \))
4. **Electron affinity of Cl(g) to \( \ce{Cl-(g)} \)** — Electron affinity (\( EA \))
5. **Lattice energy** — Energy released when \( \ce{Na+(g) + Cl-(g) -> NaCl(s)} \) (\( \Delta H_L \))

By Hess's Law, the sum of all five steps must equal the overall **enthalpy of formation** of \( \ce{NaCl(s)} \):

$$ \Delta H^\circ_f[\ce{NaCl(s)}] = \Delta H_\text{sub} + \frac{1}{2}D(\ce{Cl-Cl}) + IE_1(\ce{Na}) + EA(\ce{Cl}) + \Delta H_L $$

Rearranging:

$$ \Delta H_L = \Delta H^\circ_f - \Delta H_\text{sub} - \frac{1}{2}D(\ce{Cl-Cl}) - IE_1 - EA $$

Substituting known values for \( \ce{NaCl} \):

$$ \Delta H_L = -411 - 107 - 121 - 496 - (-349) = -786\,\text{kJ/mol} $$

The large negative lattice energy (−786 kJ/mol) reflects the strong electrostatic attraction between \( \ce{Na+} \) and \( \ce{Cl-} \) ions in the crystal lattice.

#### Diagram: Born-Haber Cycle for NaCl

<details markdown="1">
<summary>Born-Haber Cycle Interactive Diagram Specification</summary>
Type: diagram
**sim-id:** born-haber-cycle<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Analyzing (Bloom's 2001) — Students trace the Born-Haber cycle pathway for NaCl, identifying each thermodynamic step and confirming the cycle closes to match the known lattice energy.

**Canvas size:** 800 × 550 px, responsive to window resize.

**Visual design:** A vertical enthalpy "ladder" diagram showing energy levels from bottom (lowest, \( \ce{NaCl(s)} \)) to top-ish (high intermediate energy).

**Levels and labels (bottom to top):**
1. \( \ce{NaCl(s)} \) — bottom baseline, labeled "Standard State: NaCl(s)"
2. \( \ce{Na(s) + \frac{1}{2}Cl_2(g)} \) — one step above, labeled with \( \Delta H^\circ_f = -411\,\text{kJ} \) (arrow downward from this to bottom)
3. \( \ce{Na(g) + \frac{1}{2}Cl_2(g)} \) — sublimation step, \( +107\,\text{kJ} \) arrow upward
4. \( \ce{Na(g) + Cl(g)} \) — bond dissociation step, \( +121\,\text{kJ} \) arrow upward
5. \( \ce{Na^+(g) + Cl(g) + e^-} \) — ionization energy step, \( +496\,\text{kJ} \) arrow upward
6. \( \ce{Na^+(g) + Cl^-(g)} \) — electron affinity step, \( -349\,\text{kJ} \) arrow downward

Then a large arrow from \( \ce{Na^+(g) + Cl^-(g)} \) all the way down to \( \ce{NaCl(s)} \): Lattice energy \( \Delta H_L = -786\,\text{kJ} \).

**Interactivity:**
- Clicking any step highlights the arrow in gold and shows a tooltip with the equation for that step and its \( \Delta H \) value.
- A "Check Cycle" button sums all steps and displays "Cycle closes! Sum = −411 kJ/mol (matches \( \Delta H^\circ_f \))" in green.
- Dropdown to switch between NaCl, MgO, and KBr with appropriate energy values.
</details>

!!! mascot-note "Did You Know?"
    <img src="../../img/mascot/note.png" class="mascot-admonition-img" alt="Catalyst shares a note">
    The Born-Haber cycle was developed in the 1910s by Max Born and Fritz Haber. Fritz Haber is also famous — and controversial — for inventing the Haber-Bosch process for synthesizing ammonia (Chapter 14's equilibrium example), which transformed agriculture by making synthetic fertilizers possible.

---

## 12.9 Entropy: A First Look

### The Drive Toward Disorder

So far, we have discussed energy as the driving force for chemical reactions. But energy alone cannot explain why some endothermic reactions occur spontaneously. Ice melts at room temperature (endothermic), and salt dissolves in water (often slightly endothermic) — yet both happen naturally. There must be another driving force.

That second driving force is **entropy** (\( S \)) — a thermodynamic measure of the **dispersal of energy** and **disorder** in a system. The more ways the particles of a system can be arranged or the more spread out the energy is, the higher the entropy.

Entropy is a **state function** with units of joules per kelvin per mole (J/K·mol). Like enthalpy, we track changes in entropy:

$$ \Delta S = S_\text{products} - S_\text{reactants} $$

- \( \Delta S > 0 \): Entropy increases (more disorder) — favors spontaneity
- \( \Delta S < 0 \): Entropy decreases (more order) — opposes spontaneity

### Predicting the Sign of \( \Delta S \)

You can often predict the sign of \( \Delta S \) qualitatively using these guidelines:

- **Gases have more entropy than liquids, which have more entropy than solids.** Phase changes from solid → liquid → gas increase entropy.
- **Dissolving a solid into solution generally increases entropy** (ions/molecules disperse throughout the solvent).
- **Reactions that increase the number of gas moles increase entropy.** For example, $\ce{CaCO3(s) -> CaO(s) + CO2(g)}$ has $\Delta S > 0$ because 1 mol of gas is produced.
- **Reactions that decrease the number of gas moles decrease entropy.**

### Standard Molar Entropy

The **standard molar entropy** (\( S^\circ \)) of a substance is the absolute entropy of 1 mole of that substance at standard conditions (298 K, 1 bar). Unlike enthalpy of formation, \( S^\circ \) is *never zero* for a real substance at any temperature above 0 K — even elements in their standard states have positive entropy values.

The **entropy change** for a reaction is calculated analogously to enthalpy:

$$ \Delta S^\circ_\text{rxn} = \sum n\,S^\circ(\text{products}) - \sum m\,S^\circ(\text{reactants}) $$

### Entropy and Disorder

At the molecular level, entropy is related to the **number of microstates** (\( W \)) available to a system — the different ways the particles can be arranged while still having the same total energy:

$$ S = k_B \ln W $$

where \( k_B = 1.38 \times 10^{-23}\,\text{J/K} \) is Boltzmann's constant. This equation, due to Ludwig Boltzmann, connects the macroscopic property \( S \) to the microscopic count of arrangements. Greater disorder (more possible arrangements) means more microstates means higher entropy.

We will explore entropy more deeply in Chapter 13, where we connect it to Gibbs free energy and use it to predict whether reactions are spontaneous.

---

## Summary

This chapter introduced the thermodynamic framework for understanding energy changes in chemical reactions. Here are the key ideas:

**Thermodynamic systems:**

- A **system** is the part of the universe we study; the **surroundings** are everything else.
- Systems can be open (exchange matter and energy), closed (exchange energy only), or isolated (exchange neither).

**Heat and temperature:**

- **Temperature** measures average kinetic energy; **heat** is energy in transit due to a temperature difference.
- The fundamental heat equation is \( q = mc\Delta T \).

**Calorimetry:**

- Coffee cup calorimeters measure \( q \) at constant pressure (\( = \Delta H \)).
- Bomb calorimeters measure \( q \) at constant volume (≈ \( \Delta H \) for AP purposes).
- In any calorimeter: \( q_\text{rxn} = -q_\text{calorimeter} \).

**Enthalpy:**

- \( \Delta H < 0 \): exothermic; \( \Delta H > 0 \): endothermic.
- Standard enthalpy of reaction: \( \Delta H^\circ_\text{rxn} = \sum n\,\Delta H^\circ_f(\text{products}) - \sum m\,\Delta H^\circ_f(\text{reactants}) \)
- \( \Delta H^\circ_f = 0 \) for elements in their standard states.

**Three methods for calculating \( \Delta H \):**

1. **Hess's Law** — algebraically combine known reactions.
2. **Enthalpies of formation** — use tabulated \( \Delta H^\circ_f \) values.
3. **Bond enthalpies** — sum of bonds broken minus sum of bonds formed (approximate).

**Born-Haber cycle:**

- Applies Hess's Law to calculate lattice energies of ionic compounds from measurable quantities (sublimation, ionization energy, electron affinity, bond enthalpy, formation enthalpy).

**Entropy:**

- **Entropy** (\( S \)) measures energy dispersal and molecular disorder.
- \( \Delta S > 0 \) when disorder increases (more gas moles, dissolving solids, phase changes to gas).
- Chapter 13 connects entropy to Gibbs free energy and spontaneity.

!!! mascot-celebration "Great Work, Chemists!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Catalyst celebrates">
    You have just mastered the thermochemistry toolkit — four methods for calculating enthalpy changes, calorimetry, Hess's Law, the Born-Haber cycle, and an introduction to entropy. That's a massive set of tools for understanding the energy landscape of chemistry. In Chapter 13, you will use entropy and enthalpy together to predict spontaneity with Gibbs free energy. Now we're bonding!
