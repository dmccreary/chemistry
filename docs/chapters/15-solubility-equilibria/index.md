---
title: Solubility Equilibria
description: Apply equilibrium principles to dissolution — Ksp, molar solubility, common ion effect, precipitation prediction, complex ion formation, Henry's law, and the K–ΔG° connection.
generated_by: claude skill chapter-content-generator
date: 2026-02-20 12:02:51
version: 0.04
---

# Chapter 15: Solubility Equilibria

!!! mascot-welcome "Welcome, Scientists!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Catalyst welcomes you">
    Welcome to solubility equilibria — where we find out why some ionic compounds dissolve completely in water while others barely dissolve at all! From kidney stones to limestone caves to carbonated drinks, the principles you master here explain some of the most fascinating chemistry in the natural world. Let's react!

## Summary

This chapter applies equilibrium principles to dissolution processes, covering the solubility product (Ksp), molar solubility, the common ion effect, predicting and controlling precipitation, complex ion formation, and Henry's law.

## Concepts Covered

This chapter covers the following 18 concepts from the learning graph:

403. Solubility Equilibria
404. Solubility Product Ksp
405. Molar Solubility
406. Common Ion Effect
407. Predicting Precipitation
408. Selective Precipitation
409. Complex Ion Formation
410. Formation Constants
411. Ksp Calculations
412. Ion Product
413. Temperature and Solubility
414. Henry's Law
415. Equilibrium and Free Energy
416. Relationship K and Delta G
417. Manipulating K Expressions
418. Reversing Reactions K
419. Adding Reactions K
420. Industrial Equilibrium

## Prerequisites

This chapter builds on concepts from:

- [Chapter 4: Chemical Bonding and Lewis Structures](../04-chemical-bonding-and-lewis-structures/index.md)
- [Chapter 6: Intermolecular Forces and States of Matter](../06-intermolecular-forces-and-states-of-matter/index.md)
- [Chapter 7: Phase Changes, Solutions, and Gas Laws](../07-phase-changes-solutions-and-gas-laws/index.md)
- [Chapter 13: Entropy and Gibbs Free Energy](../13-entropy-and-gibbs-free-energy/index.md)
- [Chapter 14: Chemical Equilibrium](../14-chemical-equilibrium/index.md)

---

## Introduction

In Chapter 14 you built a powerful equilibrium toolkit — equilibrium constants, ICE tables, Q vs K, and Le Chatelier's principle. Now we apply those exact tools to a specific and enormously important class of equilibrium: the dissolution of sparingly soluble ionic compounds.

Why does silver chloride barely dissolve in water while sodium chloride dissolves completely? Why do calcium carbonate caves form over thousands of years, and why can acid rain dissolve limestone much faster? Why do carbonated beverages go flat when you open them? All of these phenomena are governed by **solubility equilibria**, and all can be quantified with the same equilibrium mathematics you already know.

In this chapter we will also examine how to combine and manipulate equilibrium expressions — reversing reactions, adding reactions — and how the free energy relationship $\Delta G° = -RT \ln K$ applies directly to solubility.

## Dissolution as a Reversible Equilibrium

When an ionic compound dissolves in water, its ions separate and become surrounded by water molecules (hydrated). This process is reversible: dissolved ions can recombine and precipitate back as solid. The system reaches equilibrium when the rate of dissolution equals the rate of precipitation.

For silver chloride dissolving in water:

$$\ce{AgCl (s) <=> Ag+ (aq) + Cl- (aq)}$$

At equilibrium, the solid $\ce{AgCl}$ is in dynamic contact with its ions in solution. The solid is a pure substance, so it is omitted from the equilibrium expression (just as solids were omitted from K expressions in Chapter 14). The equilibrium constant for this dissolution is the **solubility product, $K_{sp}$**.

## The Solubility Product Ksp

The **solubility product constant, $K_{sp}$**, is the equilibrium constant for the dissolution of a sparingly soluble ionic compound. For a salt $\ce{M_a X_b}$ dissolving into $\ce{M^{b+}}$ and $\ce{X^{a-}}$ ions:

$$\ce{M_a X_b (s) <=> a M^{b+} (aq) + b X^{a-} (aq)}$$

$$K_{sp} = [\ce{M^{b+}}]^a[\ce{X^{a-}}]^b$$

The solid is omitted from the expression (pure solid, activity = 1).

**Examples of $K_{sp}$ expressions:**

| Salt | Dissolution equilibrium | $K_{sp}$ expression | $K_{sp}$ at 25°C |
|---|---|---|---|
| $\ce{AgCl}$ | $\ce{AgCl <=> Ag+ + Cl-}$ | $[\ce{Ag+}][\ce{Cl-}]$ | $1.8 \times 10^{-10}$ |
| $\ce{PbI2}$ | $\ce{PbI2 <=> Pb^{2+} + 2I-}$ | $[\ce{Pb^{2+}}][\ce{I-}]^2$ | $7.1 \times 10^{-9}$ |
| $\ce{Ag2CrO4}$ | $\ce{Ag2CrO4 <=> 2Ag+ + CrO4^{2-}}$ | $[\ce{Ag+}]^2[\ce{CrO4^{2-}}]$ | $1.2 \times 10^{-12}$ |
| $\ce{BaSO4}$ | $\ce{BaSO4 <=> Ba^{2+} + SO4^{2-}}$ | $[\ce{Ba^{2+}}][\ce{SO4^{2-}}]$ | $1.1 \times 10^{-10}$ |
| $\ce{CaCO3}$ | $\ce{CaCO3 <=> Ca^{2+} + CO3^{2-}}$ | $[\ce{Ca^{2+}}][\ce{CO3^{2-}}]$ | $3.3 \times 10^{-9}$ |
| $\ce{Ca3(PO4)2}$ | $\ce{Ca3(PO4)2 <=> 3Ca^{2+} + 2PO4^{3-}}$ | $[\ce{Ca^{2+}}]^3[\ce{PO4^{3-}}]^2$ | $2.1 \times 10^{-33}$ |

The smaller the $K_{sp}$, the less soluble the compound — but you cannot directly compare $K_{sp}$ values for compounds with different stoichiometries without converting to molar solubility first.

## Molar Solubility

**Molar solubility** ($s$) is the number of moles of a compound that dissolve per liter of solution to produce a saturated solution. Calculating $s$ from $K_{sp}$ uses the same ICE table approach from Chapter 14.

**Example 1 — 1:1 salt:** $\ce{AgCl}$, $K_{sp} = 1.8 \times 10^{-10}$

$$\ce{AgCl (s) <=> Ag+ (aq) + Cl- (aq)}$$

|  | $\ce{Ag+}$ | $\ce{Cl-}$ |
|---|---|---|
| I | 0 | 0 |
| C | $+s$ | $+s$ |
| E | $s$ | $s$ |

$$K_{sp} = s \cdot s = s^2 = 1.8 \times 10^{-10}$$

$$s = \sqrt{1.8 \times 10^{-10}} = 1.3 \times 10^{-5} \text{ M}$$

Only $1.3 \times 10^{-5}$ mol of $\ce{AgCl}$ dissolves per liter — confirming it is sparingly soluble.

**Example 2 — 2:1 salt:** $\ce{Ag2CrO4}$, $K_{sp} = 1.2 \times 10^{-12}$

$$\ce{Ag2CrO4 (s) <=> 2Ag+ (aq) + CrO4^{2-} (aq)}$$

|  | $\ce{Ag+}$ | $\ce{CrO4^{2-}}$ |
|---|---|---|
| I | 0 | 0 |
| C | $+2s$ | $+s$ |
| E | $2s$ | $s$ |

$$K_{sp} = (2s)^2(s) = 4s^3 = 1.2 \times 10^{-12}$$

$$s^3 = 3.0 \times 10^{-13} \quad \Rightarrow \quad s = 6.7 \times 10^{-5} \text{ M}$$

!!! mascot-thinking "Catalyst's Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Catalyst is thinking">
    Notice that $\ce{Ag2CrO4}$ has a smaller $K_{sp}$ than $\ce{AgCl}$ ($10^{-12}$ vs $10^{-10}$), yet it has a *larger* molar solubility ($6.7 \times 10^{-5}$ vs $1.3 \times 10^{-5}$ M). This seems backward — but it happens because the stoichiometry matters. The coefficient of 2 for $\ce{Ag+}$ creates a $4s^3$ expression, boosting molar solubility relative to the $K_{sp}$ value. Never compare $K_{sp}$ values directly to rank solubility unless the compounds have the same formula type (1:1, 1:2, etc.).

## Ksp Calculations

Beyond finding molar solubility from scratch, you will also calculate $K_{sp}$ from experimental solubility data and find ion concentrations in saturated solutions.

**Finding $K_{sp}$ from molar solubility:** $\ce{PbI2}$ has a molar solubility of $1.5 \times 10^{-3}$ mol/L. Find $K_{sp}$.

$$\ce{PbI2 (s) <=> Pb^{2+} (aq) + 2I- (aq)}$$

If $s = 1.5 \times 10^{-3}$ M, then $[\ce{Pb^{2+}}] = s = 1.5 \times 10^{-3}$ M and $[\ce{I-}] = 2s = 3.0 \times 10^{-3}$ M.

$$K_{sp} = [\ce{Pb^{2+}}][\ce{I-}]^2 = (1.5 \times 10^{-3})(3.0 \times 10^{-3})^2 = (1.5 \times 10^{-3})(9.0 \times 10^{-6}) = 1.4 \times 10^{-8}$$

!!! mascot-tip "Catalyst's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Catalyst shares a tip">
    Always write the dissolution equation first, then set up the ICE table, then write the $K_{sp}$ expression using ICE row values. The stoichiometric coefficients become both the multipliers in the E row (e.g., $2s$ for $2\ce{I-}$) AND the exponents in the $K_{sp}$ expression (e.g., $[\ce{I-}]^2$). Confusing these is the most common error in Ksp calculations.

## The Ion Product: Predicting Precipitation

Just as we used Q to predict equilibrium shifts in Chapter 14, we use the **ion product** ($Q_{sp}$) to predict whether a precipitate will form when two solutions are mixed.

$$Q_{sp} = [\text{cation}]^a[\text{anion}]^b \quad \text{(using actual concentrations, not equilibrium values)}$$

| Comparison | Interpretation |
|---|---|
| $Q_{sp} < K_{sp}$ | Solution is unsaturated — no precipitate, solid would dissolve if present |
| $Q_{sp} = K_{sp}$ | Solution is exactly saturated — at equilibrium |
| $Q_{sp} > K_{sp}$ | Solution is supersaturated — precipitate **will form** |

**Example:** 100 mL of 0.200 M $\ce{Pb(NO3)2}$ is mixed with 100 mL of 0.200 M $\ce{NaI}$. Does $\ce{PbI2}$ precipitate? ($K_{sp} = 7.1 \times 10^{-9}$)

After mixing (total volume = 200 mL), concentrations are halved:

$$[\ce{Pb^{2+}}] = \frac{0.200}{2} = 0.100 \text{ M}, \quad [\ce{I-}] = \frac{0.200}{2} = 0.100 \text{ M}$$

$$Q_{sp} = [\ce{Pb^{2+}}][\ce{I-}]^2 = (0.100)(0.100)^2 = 1.0 \times 10^{-3}$$

Since $Q_{sp} = 1.0 \times 10^{-3} \gg K_{sp} = 7.1 \times 10^{-9}$, a precipitate of $\ce{PbI2}$ **will form**.

## The Common Ion Effect

The **common ion effect** is a direct consequence of Le Chatelier's principle applied to solubility: the presence of an ion already dissolved in solution suppresses the solubility of a sparingly soluble salt containing that same ion.

**Example:** Molar solubility of $\ce{AgCl}$ in 0.100 M $\ce{NaCl}$ solution.

$\ce{NaCl}$ fully dissociates, providing $[\ce{Cl-}] = 0.100$ M before any $\ce{AgCl}$ dissolves.

|  | $\ce{Ag+}$ | $\ce{Cl-}$ |
|---|---|---|
| I | 0 | 0.100 |
| C | $+s$ | $+s$ |
| E | $s$ | $0.100 + s$ |

Since $s \ll 0.100$, we apply the approximation $0.100 + s \approx 0.100$:

$$K_{sp} = s(0.100) = 1.8 \times 10^{-10}$$

$$s = \frac{1.8 \times 10^{-10}}{0.100} = 1.8 \times 10^{-9} \text{ M}$$

Compared to $s = 1.3 \times 10^{-5}$ M in pure water, the common ion reduces solubility by a factor of over 7,000! This is why silver ions are removed from photographic waste by adding chloride — precipitation is driven to near completion.

!!! mascot-warning "Watch Out!"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Catalyst warns you">
    In common ion problems, the initial concentration of the common ion is NOT zero. Set up the ICE table with the common ion's initial concentration in the I row. Students who start all ion concentrations at zero will get the wrong answer — that's the pure water scenario, not the common ion scenario.

## Selective Precipitation

**Selective precipitation** exploits differences in $K_{sp}$ to separate a mixture of ions. By carefully controlling the concentration of a precipitating agent, you can selectively precipitate one ion while leaving another in solution.

**Example:** A solution contains $[\ce{Ag+}] = [\ce{Pb^{2+}}] = 0.100$ M. $\ce{Cl-}$ is added slowly.

- $\ce{AgCl}$ begins to precipitate when $[\ce{Cl-}] > K_{sp}(\ce{AgCl})/[\ce{Ag+}] = 1.8 \times 10^{-10}/0.100 = 1.8 \times 10^{-9}$ M
- $\ce{PbCl2}$ begins to precipitate when $[\ce{Cl-}] > \sqrt{K_{sp}(\ce{PbCl2})/[\ce{Pb^{2+}}]} = \sqrt{1.7 \times 10^{-5}/0.100} = 0.013$ M

By adding $\ce{Cl-}$ slowly and stopping before $[\ce{Cl-}]$ reaches 0.013 M, we can precipitate virtually all the $\ce{Ag+}$ while $\ce{Pb^{2+}}$ remains in solution — a classic qualitative analysis separation.

This principle underlies qualitative analysis schemes and industrial metal recovery processes.

#### Diagram: Ksp Precipitation Predictor MicroSim

<details markdown="1">
<summary>Ksp Precipitation Predictor MicroSim Specification</summary>
Type: microsim
**sim-id:** ksp-precipitation-predictor<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will be able to apply (Applying — Bloom's 2001) the ion product Q vs Ksp comparison to predict whether a precipitate forms when two solutions are mixed.

**Description:** An interactive simulation where students input concentrations of two ions, the simulation calculates the ion product Q, compares it to Ksp, and displays an animated precipitation result.

**Controls:**
- Dropdown: Select salt (AgCl, PbI2, BaSO4, Ag2CrO4, CaCO3) — sets Ksp automatically
- Number input: concentration of cation (mol/L)
- Number input: concentration of anion (mol/L)
- Toggle: "Mixing mode" — enter volumes and concentrations of two separate solutions; auto-calculates diluted concentrations after mixing
- "Calculate" button

**Visual elements:**
- Canvas: 640×420 px
- Left panel (260×360 px): two animated beakers, each showing a solution with colored ion dots. "Mix" button triggers animation of solutions combining.
- Center panel (280×200 px): calculation display showing Q expression, substituted values, and Q result in scientific notation
- Q vs Ksp comparison bar: horizontal bar with Ksp marked; Q marker placed at calculated position; color-coded (green if Q < Ksp, red if Q > Ksp)
- Result panel: large text verdict — "✓ No precipitate (Q < Ksp)" in green, or "✗ Precipitate forms! (Q > Ksp)" in red
- If precipitate: animated particles in beaker cluster together into a solid mass at the bottom; particles labeled with the salt formula

**Behavior:**
- Smooth animation of mixing beakers when "Mix" is clicked
- Precipitate animation: particles that exceed saturation visibly join the solid at the bottom over 2 seconds
- For different salts, color of ion dots changes (Ag+ = grey, Cl- = yellow-green, Pb2+ = dark grey, I- = purple, etc.)
- Responsive: minimum 480 px width, stacks panels on narrow screens

**Implementation:** p5.js. Compute Q from ion concentrations and stoichiometry. Animate particles using simple physics (random walk) with precipitation triggered when Q > Ksp.
</details>

## Complex Ion Formation

The solubility of a sparingly soluble salt can be dramatically increased by forming a **complex ion** — a metal ion surrounded by ligands (molecules or ions that donate electron pairs to the metal).

When $\ce{AgCl}$ is placed in ammonia solution, a two-step process occurs:

$$\ce{AgCl (s) <=> Ag+ (aq) + Cl- (aq)} \qquad K_{sp} = 1.8 \times 10^{-10}$$

$$\ce{Ag+ (aq) + 2NH3 (aq) <=> Ag(NH3)2+ (aq)} \qquad K_f = 1.7 \times 10^7$$

!!! mascot-encourage "You've Got This!"
    <img src="../../img/mascot/encourage.png" class="mascot-admonition-img" alt="Catalyst encourages you">
    Complex ion formation looks complicated, but it is just two equilibria working together. The formation constant Kf is handled exactly like any other K — and the key insight is that removing Ag+ from solution (by forming the complex) shifts the dissolution equilibrium to the right, making more AgCl dissolve. Le Chatelier strikes again!

The **formation constant $K_f$** (also called the stability constant) is the equilibrium constant for forming the complex ion from the metal ion and ligands. Large $K_f$ values indicate very stable complexes.

The net reaction is obtained by adding the two equations:

$$\ce{AgCl (s) + 2NH3 (aq) <=> Ag(NH3)2+ (aq) + Cl- (aq)}$$

$$K_{net} = K_{sp} \times K_f = (1.8 \times 10^{-10})(1.7 \times 10^7) = 3.1 \times 10^{-3}$$

This combined K is much larger than $K_{sp}$ alone, explaining why $\ce{AgCl}$ dissolves readily in concentrated ammonia solution — a reaction used in photography to remove unexposed silver halide.

Common formation constants:

| Complex ion | Ligand | $K_f$ |
|---|---|---|
| $\ce{Ag(NH3)2+}$ | $\ce{NH3}$ | $1.7 \times 10^7$ |
| $\ce{Cu(NH3)4^{2+}}$ | $\ce{NH3}$ | $5.0 \times 10^{13}$ |
| $\ce{Fe(CN)6^{4-}}$ | $\ce{CN-}$ | $1.0 \times 10^{35}$ |
| $\ce{Ag(S2O3)2^{3-}}$ | $\ce{S2O3^{2-}}$ | $2.9 \times 10^{13}$ |

## Temperature and Solubility

The solubility of most ionic solids **increases with increasing temperature** because the dissolution process is typically endothermic — adding heat acts as a "reactant," shifting dissolution equilibrium to the right (Le Chatelier's principle applied to $K_{sp}$).

However, there are exceptions: $\ce{CaSO4}$, $\ce{Li2SO4}$, and $\ce{Ce2(SO4)3}$ become *less* soluble at higher temperatures because their dissolution is exothermic.

Gas solubility behaves oppositely: **gases become less soluble as temperature increases**. This is because dissolving a gas is exothermic (gas molecules lose kinetic energy and become organized in solution). Heating water releases dissolved oxygen — a concern for aquatic ecosystems near power plant thermal discharges.

## Henry's Law

**Henry's law** quantifies the solubility of gases in liquids: at constant temperature, the concentration of a dissolved gas is directly proportional to its partial pressure above the solution.

$$C = k_H \cdot P$$

where:

- $C$ = concentration of dissolved gas (mol/L)
- $k_H$ = Henry's law constant (mol L$^{-1}$ atm$^{-1}$, varies by gas and temperature)
- $P$ = partial pressure of the gas above the solution (atm)

**Henry's law constants at 25°C (selected):**

| Gas | $k_H$ (mol L$^{-1}$ atm$^{-1}$) |
|---|---|
| $\ce{CO2}$ | $3.4 \times 10^{-2}$ |
| $\ce{O2}$ | $1.3 \times 10^{-3}$ |
| $\ce{N2}$ | $6.1 \times 10^{-4}$ |
| $\ce{CO}$ | $9.5 \times 10^{-4}$ |

**Application:** Carbonated beverages are pressurized with $\ce{CO2}$ at ~2–4 atm. When you open the bottle, pressure drops to atmospheric (~0.0004 atm $\ce{CO2}$), and the dissolved $\ce{CO2}$ concentration far exceeds the new equilibrium solubility — the drink goes flat as $\ce{CO2}$ escapes.

**Deep-sea diving:** At depth, ambient pressure is high, so more nitrogen dissolves in blood ($C = k_H \cdot P$). If a diver ascends too rapidly, pressure drops suddenly and dissolved nitrogen forms bubbles in the bloodstream ("the bends"), a dangerous medical emergency.

!!! mascot-note "Did You Know?"
    <img src="../../img/mascot/note.png" class="mascot-admonition-img" alt="Catalyst shares a note">
    The formation of limestone caves is a beautiful example of combined equilibria. Rainwater absorbs $\ce{CO2}$ from air (Henry's law), forming carbonic acid. The acid dissolves limestone ($\ce{CaCO3}$) by shifting its dissolution equilibrium. Over millennia, flowing water carves enormous underground chambers — all driven by the same equilibrium principles you are learning right now.

## Manipulating K Expressions

Often the equilibrium constant you need is not directly tabulated, but can be calculated from known constants. Three algebraic rules let you combine and transform K values:

**Rule 1: Reversing a reaction**

If you reverse a reaction, the new K is the reciprocal:

$$K_{\text{reverse}} = \frac{1}{K_{\text{forward}}}$$

Example: The dissolution of $\ce{AgCl}$ has $K_{sp} = 1.8 \times 10^{-10}$. The precipitation (reverse) reaction has $K = 1/(1.8 \times 10^{-10}) = 5.6 \times 10^9$.

**Rule 2: Multiplying all coefficients by a factor $n$**

If you multiply all stoichiometric coefficients by $n$, the new K is raised to the $n$ power:

$$K_{\text{new}} = K^n$$

Example: Doubling the coefficients of $\ce{AgCl (s) <=> Ag+ + Cl-}$ gives $\ce{2AgCl (s) <=> 2Ag+ + 2Cl-}$ with $K = K_{sp}^2 = (1.8 \times 10^{-10})^2 = 3.2 \times 10^{-20}$.

**Rule 3: Adding reactions**

When two reactions are added together, their K values are multiplied:

$$K_{\text{net}} = K_1 \times K_2$$

This is how we calculated the net K for $\ce{AgCl}$ dissolving in ammonia above. Another important example:

$$\ce{CaCO3 (s) <=> Ca^{2+} (aq) + CO3^{2-} (aq)} \qquad K_1 = K_{sp} = 3.3 \times 10^{-9}$$

$$\ce{CO3^{2-} (aq) + 2H+ (aq) <=> H2CO3 (aq)} \qquad K_2 = 2.4 \times 10^{16}$$

$$\text{Net: } \ce{CaCO3 (s) + 2H+ (aq) <=> Ca^{2+} (aq) + H2CO3 (aq)}$$

$$K_{\text{net}} = K_1 \times K_2 = (3.3 \times 10^{-9})(2.4 \times 10^{16}) = 7.9 \times 10^7$$

The enormous $K_{\text{net}}$ tells us acid dissolves limestone very effectively — explaining acid rain damage to marble statues, limestone buildings, and cave formation.

## Equilibrium and Free Energy

The relationship $\Delta G° = -RT \ln K$ applies to $K_{sp}$ just as it does to any equilibrium constant:

$$\Delta G° = -RT \ln K_{sp}$$

For $\ce{AgCl}$:

$$\Delta G° = -(8.314 \text{ J mol}^{-1}\text{K}^{-1})(298 \text{ K}) \ln(1.8 \times 10^{-10}) = -(2478)(-22.44) = +55,600 \text{ J/mol} = +55.6 \text{ kJ/mol}$$

The positive $\Delta G°$ confirms that dissolving $\ce{AgCl}$ is thermodynamically unfavorable under standard conditions (1 M ion concentrations). Of course, in a dilute solution where $[\ce{Ag+}]$ and $[\ce{Cl-}]$ are far below 1 M, the actual $\Delta G$ (using $\Delta G = \Delta G° + RT \ln Q$) can be negative, and dissolution proceeds spontaneously until equilibrium is reached.

#### Diagram: Dissolution Equilibrium Visualizer MicroSim

<details markdown="1">
<summary>Dissolution Equilibrium Visualizer MicroSim Specification</summary>
Type: microsim
**sim-id:** dissolution-equilibrium-visualizer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will be able to understand (Understanding — Bloom's 2001) how ionic dissolution reaches a dynamic equilibrium, and observe how the common ion effect suppresses solubility.

**Description:** An animated simulation showing an ionic solid dissolving into solution, with ion count tracking, real-time Q vs Ksp display, and a common-ion mode.

**Visual elements:**
- Canvas: 660×450 px
- Main simulation panel (460×350 px): rectangular container showing:
  - Solid crystal region at bottom (gray block that shrinks as it dissolves)
  - Solution region above: colored circles for cations (blue) and anions (red) moving with random walk physics
  - Arrow animations showing dissolution (solid → ions) and precipitation (ions → solid) rates
- Right panel (170×350 px): live concentration chart
  - [Cation] bar and [Anion] bar (mol/L, scaled)
  - Ion product Q line and $K_{sp}$ reference line
  - Status text: "Dissolving...", "Precipitating...", "Equilibrium!"
- Bottom bar: shows formula of selected salt, $K_{sp}$ value, molar solubility, and current Q

**Controls:**
- Dropdown: Select salt (AgCl, BaSO4, PbI2, CaCO3)
- Button: "Add Common Ion" — injects common anion particles into solution, demonstrating suppression of solubility; solid crystal grows back
- Button: "Add More Solid" — adds solid crystal; if Q < Ksp, dissolution continues
- Slider: Temperature (effects for gases shown with Henry's law mode toggle)
- "Reset" button

**Behavior:**
- Simulation starts with solid and no dissolved ions; dissolution begins immediately
- Ion particle count increases until Q reaches Ksp; rate of dissolution slows visibly
- When "Add Common Ion" clicked, existing ion particles of that type flood in; Q spikes above Ksp; precipitation animation starts (particles cluster to form solid)
- New equilibrium established at lower [cation] — demonstrating common ion effect quantitatively
- Q vs Ksp chart updates in real time at 30 fps
- Responsive: minimum 500 px width

**Implementation:** p5.js. Track discrete ion particles (up to 200). At each frame, calculate Q from particle counts. If Q < Ksp, probabilistically dissolve one formula unit (particle pair/triple). If Q > Ksp, probabilistically precipitate. Display quantities scaled to realistic concentrations.
</details>

## Industrial Equilibrium Applications

The principles of solubility equilibrium drive major industrial and environmental processes:

**Contact process** ($\ce{H2SO4}$ production): The key equilibrium $\ce{2SO2 (g) + O2 (g) <=> 2SO3 (g)}$ is pushed right using a vanadium catalyst at ~450°C, then $\ce{SO3}$ is absorbed to make $\ce{H2SO4}$.

**Water treatment:** Hard water contains $\ce{Ca^{2+}}$ and $\ce{Mg^{2+}}$. Adding lime ($\ce{Ca(OH)2}$) precipitates $\ce{Mg(OH)2}$ and then adding soda ash ($\ce{Na2CO3}$) precipitates $\ce{CaCO3}$, softening the water. These are ion product calculations on an industrial scale.

**Kidney stone prevention:** Most kidney stones are calcium oxalate ($\ce{CaC2O4}$, $K_{sp} = 2.3 \times 10^{-9}$). Staying well-hydrated lowers $[\ce{Ca^{2+}}]$ and $[\ce{C2O4^{2-}}]$, keeping $Q_{sp} < K_{sp}$ and preventing crystallization.

**Qualitative analysis:** Historically, chemists identified unknown metal ions by systematically adding precipitating agents and observing which ions form. The order uses $K_{sp}$ differences: $\ce{H2S}$ at low pH precipitates sulfides of $\ce{Cu^{2+}}$, $\ce{Bi^{3+}}$, $\ce{Hg^{2+}}$ while leaving $\ce{Fe^{3+}}$, $\ce{Ni^{2+}}$ in solution.

**Bayer process** (aluminum production): $\ce{Al(OH)3}$ is selectively dissolved in hot concentrated $\ce{NaOH}$ as $\ce{Al(OH)4-}$ (complex ion), leaving $\ce{Fe2O3}$ impurities behind — selective dissolution using complexation.

## Summary

Solubility equilibria apply the equilibrium tools of Chapter 14 to dissolution processes. The key ideas are:

- **$K_{sp}$** is the solubility product for a sparingly soluble salt; it equals the product of ion concentrations raised to their stoichiometric powers. Pure solid is omitted.
- **Molar solubility** $s$ is calculated from $K_{sp}$ using ICE tables with stoichiometric multipliers (e.g., $2s$ for an ion with coefficient 2).
- The **stoichiometry matters**: $K_{sp}$ values for compounds with different formulas (1:1 vs 1:2 vs 2:1) cannot be directly compared to rank solubility — convert to molar solubility first.
- The **ion product** $Q_{sp}$ compared to $K_{sp}$ predicts whether a precipitate will form: $Q_{sp} > K_{sp}$ means precipitation occurs.
- The **common ion effect** suppresses solubility when a shared ion is already present in solution (Le Chatelier's principle).
- **Selective precipitation** separates ions by exploiting differences in $K_{sp}$ — the ion requiring the lower precipitant concentration precipitates first.
- **Complex ion formation** (characterized by $K_f$) dramatically increases the solubility of sparingly soluble salts by removing free metal ions from solution.
- **Temperature and solubility:** most ionic solids are more soluble at higher temperatures; gases are less soluble at higher temperatures.
- **Henry's law** ($C = k_H \cdot P$) quantifies gas solubility: solubility is proportional to partial pressure above the solution.
- **Manipulating K expressions:** reversing a reaction gives $K' = 1/K$; multiplying all coefficients by $n$ gives $K' = K^n$; adding reactions gives $K_{\text{net}} = K_1 \times K_2$.
- $\Delta G° = -RT \ln K_{sp}$ connects solubility to thermodynamics; positive $\Delta G°$ for dissolution confirms sparingly soluble salts are thermodynamically unfavorable under standard conditions.
- **Industrial applications** of solubility equilibria include water treatment, $\ce{H2SO4}$ production, aluminum extraction, and qualitative analysis.

!!! mascot-celebration "Great Work, Chemists!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Catalyst celebrates">
    You have just extended your equilibrium expertise to the fascinating world of dissolution, precipitation, and complex ion chemistry. From kidney stones to limestone caves to industrial chemistry, these principles are everywhere around you. Chapter 16 takes us into acid-base chemistry — another rich application of equilibrium that will tie together everything you've learned. Keep that momentum going — let's react!
