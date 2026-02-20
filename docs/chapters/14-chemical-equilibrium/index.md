---
title: Chemical Equilibrium
description: Master dynamic equilibrium, equilibrium constants Kc and Kp, ICE tables, the reaction quotient Q, Le Chatelier's principle, and the connection between Gibbs free energy and K.
generated_by: claude skill chapter-content-generator
date: 2026-02-20 11:59:32
version: 0.04
---

# Chapter 14: Chemical Equilibrium

!!! mascot-welcome "Welcome, Scientists!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Catalyst welcomes you">
    Welcome to one of the most powerful ideas in all of chemistry — equilibrium! Most reactions you've encountered so far seemed to go in one direction and stop. But many real chemical processes are reversible — they run forward and backward simultaneously, reaching a state of beautiful dynamic balance. Today we learn to describe, calculate, and control that balance. Let's react!

## Summary

This chapter introduces dynamic equilibrium, equilibrium constants (Kc and Kp), ICE tables, the reaction quotient, Le Chatelier's principle, and the quantitative relationship between Gibbs free energy and equilibrium constants.

## Concepts Covered

This chapter covers the following 29 concepts from the learning graph:

315. Catalyst and Equilibrium
364. Gibbs and Equilibrium
376. Chemical Equilibrium
377. Dynamic Equilibrium
378. Equilibrium State
379. Forward Reaction
380. Reverse Reaction
381. Equilibrium Constant Kc
382. Equilibrium Constant Kp
383. Kc and Kp Relationship
384. Writing K Expressions
385. Homogeneous Equilibrium
386. Heterogeneous Equilibrium
387. Equilibrium Position
388. Reaction Quotient Q
389. Q vs K Comparison
390. Predicting Direction
391. ICE Tables
392. ICE Table Calculations
393. Small K Approximation
394. Quadratic in Equilibrium
395. Le Chatelier's Principle
396. Concentration Changes
397. Pressure Changes
398. Volume Changes
399. Temperature Changes on K
400. Effect of Catalyst on Eq
401. Adding Inert Gas
402. Equilibrium Shifts

## Prerequisites

This chapter builds on concepts from:

- [Chapter 6: Intermolecular Forces and States of Matter](../06-intermolecular-forces-and-states-of-matter/index.md)
- [Chapter 7: Phase Changes, Solutions, and Gas Laws](../07-phase-changes-solutions-and-gas-laws/index.md)
- [Chapter 10: Reaction Rates and Rate Laws](../10-reaction-rates-and-rate-laws/index.md)
- [Chapter 11: Reaction Mechanisms and Catalysis](../11-reaction-mechanisms-and-catalysis/index.md)
- [Chapter 12: Energy, Enthalpy, and Calorimetry](../12-energy-enthalpy-and-calorimetry/index.md)
- [Chapter 13: Entropy and Gibbs Free Energy](../13-entropy-and-gibbs-free-energy/index.md)

---

## Introduction

You have probably seen a bottle of sparkling water go flat when left open. Inside a sealed bottle, carbon dioxide is constantly dissolving into the water AND escaping back into the gas phase at the same rate — a perfect balance called **chemical equilibrium**. When you open the bottle, you disturb that balance, and $\ce{CO2}$ escapes until a new equilibrium is reached with the open atmosphere.

Chemical equilibrium governs an enormous range of phenomena: the oxygen your red blood cells carry, the carbonate rock formations in caves, nitrogen fixation by bacteria in the soil, and the protein folding in your cells. All involve reversible reactions reaching a state of dynamic balance. In this chapter you will learn to describe equilibrium mathematically, predict which direction a reaction will shift when disturbed, and calculate equilibrium concentrations using ICE tables.

This chapter connects directly to Chapter 13: we established that $\Delta G° = -RT \ln K$. Now you will see that equation in action as thermodynamics and equilibrium chemistry come together.

## Reversible Reactions and Dynamic Equilibrium

Most reactions written with a single forward arrow are actually **reversible** — they can proceed in both directions. We write reversible reactions with a double equilibrium arrow ($\rightleftharpoons$):

$$\ce{N2 (g) + 3H2 (g) <=> 2NH3 (g)}$$

In this reaction (the industrial Haber process), nitrogen and hydrogen react to form ammonia (the **forward reaction**), while ammonia simultaneously decomposes back into nitrogen and hydrogen (the **reverse reaction**). Both occur at the same time.

**Dynamic equilibrium** is the state reached when the rate of the forward reaction equals the rate of the reverse reaction. At equilibrium:

- Concentrations of all species remain constant — but not necessarily equal to each other
- Both forward and reverse reactions are still occurring at the molecular level
- There is no net change in composition

This is fundamentally different from a reaction that simply "stops." Thousands of molecules are reacting in both directions every second, but the macroscopic concentrations hold steady. That is what makes equilibrium *dynamic*.

!!! mascot-thinking "Catalyst's Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Catalyst is thinking">
    Equilibrium is NOT the same as "nothing is happening." Reactant and product molecules are constantly converting back and forth — the forward and reverse rates just happen to be equal. Think of a revolving door: people are always moving through it, but the number of people inside the building stays constant.

## The Equilibrium State

The **equilibrium state** has several key features tested on the AP exam:

- Reached only in a **closed system** where matter cannot enter or leave
- Can be approached from **either direction** — starting with all reactants, all products, or any mixture
- Characterized by **constant concentrations**, not equal concentrations of reactants and products
- The ratio of product to reactant concentrations is always the same value at a given temperature — this ratio is the equilibrium constant

## Equilibrium Constant Kc

For any reversible reaction at equilibrium, the ratio of product concentrations to reactant concentrations — each raised to the power of its stoichiometric coefficient — equals a constant called the **equilibrium constant, $K_c$** (the subscript c denotes molar concentrations):

For the general reaction $\ce{aA + bB <=> cC + dD}$:

$$K_c = \frac{[\ce{C}]^c[\ce{D}]^d}{[\ce{A}]^a[\ce{B}]^b}$$

For the Haber process:

$$K_c = \frac{[\ce{NH3}]^2}{[\ce{N2}][\ce{H2}]^3}$$

At 500°C, $K_c = 6.0 \times 10^{-2}$. A value much less than 1 tells us equilibrium lies on the reactant side — under these conditions ammonia is not the favored species. Industrial synthesis compensates by using high pressure and continuously removing ammonia as it forms.

**Interpreting K values:**

| K value | Meaning | Equilibrium position |
|---|---|---|
| $K \gg 1$ (e.g., $10^{10}$) | Products strongly favored | Far to the right |
| $K \approx 1$ | Neither strongly favored | Near the middle |
| $K \ll 1$ (e.g., $10^{-10}$) | Reactants strongly favored | Far to the left |

## Writing K Expressions

!!! mascot-warning "Watch Out!"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Catalyst warns you">
    Pure solids and pure liquids are NEVER included in equilibrium constant expressions. Their concentrations do not change because they exist as a separate phase with fixed density. Only dissolved species (aq) and gases (g) appear in K. Forgetting this rule is the most common error on AP equilibrium problems.

**Rules for writing K expressions:**

1. Write products in the numerator, reactants in the denominator
2. Raise each concentration to the power of its stoichiometric coefficient
3. Omit pure solids **(s)** and pure liquids **(l)** — include only gases **(g)** and aqueous species **(aq)**
4. The expression depends on how the equation is written: doubling all coefficients squares K; reversing the equation replaces K with 1/K

**Homogeneous equilibrium** — all species in the same phase:

$$\ce{H2 (g) + I2 (g) <=> 2HI (g)} \qquad K_c = \frac{[\ce{HI}]^2}{[\ce{H2}][\ce{I2}]}$$

**Heterogeneous equilibrium** — species in multiple phases (solids and pure liquids omitted):

$$\ce{CaCO3 (s) <=> CaO (s) + CO2 (g)} \qquad K_c = [\ce{CO2}]$$

$$\ce{C (s) + H2O (g) <=> CO (g) + H2 (g)} \qquad K_c = \frac{[\ce{CO}][\ce{H2}]}{[\ce{H2O}]}$$

For the carbonate decomposition, the solid $\ce{CaCO3}$ and solid $\ce{CaO}$ are omitted, leaving only the gaseous $\ce{CO2}$ in the expression. Only the concentration (or pressure) of $\ce{CO2}$ determines the equilibrium position.

## Equilibrium Constant Kp

For gas-phase reactions, equilibrium is often expressed in terms of **partial pressures**. The constant $K_p$ uses partial pressures in atmospheres (or bar):

$$\ce{N2 (g) + 3H2 (g) <=> 2NH3 (g)} \qquad K_p = \frac{P_{\ce{NH3}}^2}{P_{\ce{N2}} \cdot P_{\ce{H2}}^3}$$

$K_c$ and $K_p$ are related by:

$$K_p = K_c (RT)^{\Delta n}$$

where $\Delta n$ is the change in moles of gas (moles gaseous products minus moles gaseous reactants) and $R = 0.08206$ L·atm·mol$^{-1}$·K$^{-1}$.

For the Haber process: $\Delta n = 2 - (1 + 3) = -2$, so $K_p = K_c(RT)^{-2}$.

When $\Delta n = 0$ (equal moles of gas on both sides), $K_p = K_c$ — no conversion is needed.

## The Reaction Quotient Q

The **reaction quotient, $Q$**, has exactly the same mathematical form as $K_c$, but it is calculated using the **actual concentrations at any moment** — not necessarily at equilibrium:

$$Q_c = \frac{[\ce{C}]^c[\ce{D}]^d}{[\ce{A}]^a[\ce{B}]^b} \quad \text{(at any point in time)}$$

Comparing Q to K tells you which direction the reaction must shift to reach equilibrium:

| Comparison | Interpretation | Reaction shifts... |
|---|---|---|
| $Q < K$ | Too little product relative to equilibrium | **Forward** (→ toward products) |
| $Q = K$ | System is at equilibrium | No net change |
| $Q > K$ | Too much product relative to equilibrium | **Reverse** (← toward reactants) |

**Example:** For $\ce{H2 (g) + I2 (g) <=> 2HI (g)}$ with $K_c = 55.3$ at 700 K, if $[\ce{H2}] = [\ce{I2}] = 0.100$ M and $[\ce{HI}] = 0.500$ M:

$$Q_c = \frac{(0.500)^2}{(0.100)(0.100)} = \frac{0.250}{0.0100} = 25.0$$

Since $Q = 25.0 < K = 55.3$, the system shifts **forward** — more $\ce{HI}$ will form until equilibrium is reached.

#### Diagram: Q vs K Direction Predictor

<details markdown="1">
<summary>Q vs K Direction Predictor Infographic Specification</summary>
Type: infographic
**sim-id:** q-vs-k-predictor<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will be able to apply (Applying — Bloom's 2001) the Q vs K comparison to predict the direction a reaction will shift to reach equilibrium.

**Description:** An interactive number-line visualization showing the relationship between Q and K, with color-coded zones and animated directional arrows.

**Visual elements:**
- Canvas: 620×360 px
- Central horizontal number line (logarithmic scale, range $10^{-6}$ to $10^{6}$)
- Fixed vertical red dashed line at K position, labeled "K (equilibrium)"
- Movable green dot representing Q position
- Three color-coded zones: orange left zone ("Q < K: Shifts Forward →"), green center zone ("Q = K: At Equilibrium"), blue right zone ("Q > K: Shifts Reverse ←")
- Info panel below number line: displays current Q value, K value, comparison result, and verdict text
- Animated reaction particle graphic showing reactant/product molecules flowing left or right based on Q vs K

**Controls:**
- Slider to move Q along the number line (logarithmic)
- Number inputs for individual species concentrations (auto-calculates Q)
- Preset buttons for 4 example reactions (Haber process, H2/I2/HI, N2O4 decomposition, esterification)
- K value display (read-only, set by preset or user)

**Behavior:**
- Q dot animates smoothly as sliders change; color updates to match zone
- When Q ≈ K (within 1%), show green glow and text "Equilibrium Reached!"
- Arrow animation on particle graphic updates direction and speed based on |Q - K|
- Responsive: minimum 400 px width

**Implementation:** p5.js. Logarithmic number line mapping. Zone shading with p5.js rect() and transparency. Particle animation using sin(frameCount) offsets. Smooth transitions using lerp().
</details>

## ICE Tables

ICE tables are the standard method for solving equilibrium problems. The name stands for **Initial**, **Change**, **Equilibrium** — the three rows of the table that track concentration changes from start to equilibrium.

!!! mascot-encourage "You've Got This!"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Catalyst encourages you">
    ICE tables look daunting at first, but they are really just organized bookkeeping. Once you set up the table correctly, the algebra flows naturally. You already know how to solve quadratic equations — that's all an ICE table ever needs!

**Setting up an ICE table — worked example:**

Consider $\ce{H2 (g) + I2 (g) <=> 2HI (g)}$, $K_c = 55.3$ at 700 K. Start with $[\ce{H2}]_0 = [\ce{I2}]_0 = 0.500$ M, no HI present.

|  | $\ce{H2}$ | $\ce{I2}$ | $\ce{2HI}$ |
|---|---|---|---|
| **I**nitial (M) | 0.500 | 0.500 | 0 |
| **C**hange (M) | $-x$ | $-x$ | $+2x$ |
| **E**quilibrium (M) | $0.500 - x$ | $0.500 - x$ | $2x$ |

Substituting into the $K_c$ expression:

$$K_c = \frac{(2x)^2}{(0.500-x)^2} = 55.3$$

Because both reactants have equal initial concentrations and equal stoichiometric coefficients, we can take the square root of both sides directly:

$$\frac{2x}{0.500-x} = \sqrt{55.3} = 7.437$$

$$2x = 7.437(0.500 - x) = 3.719 - 7.437x$$

$$9.437x = 3.719 \quad \Rightarrow \quad x = 0.394 \text{ M}$$

Equilibrium concentrations: $[\ce{H2}] = [\ce{I2}] = 0.500 - 0.394 = 0.106$ M and $[\ce{HI}] = 2(0.394) = 0.788$ M.

**Verify:** $K_c = (0.788)^2 / (0.106)^2 = 0.621/0.01124 = 55.3$ ✓

## The Small K Approximation

When $K_c$ is very small (typically $K < 10^{-3}$), the reaction barely proceeds and $x$ is negligible compared to the initial concentration. We simplify by assuming $[\text{reactant}]_0 - x \approx [\text{reactant}]_0$.

**Example:** $\ce{COCl2 (g) <=> CO (g) + Cl2 (g)}$, $K_c = 2.2 \times 10^{-10}$ at 100°C. Start with $[\ce{COCl2}] = 0.100$ M.

|  | $\ce{COCl2}$ | $\ce{CO}$ | $\ce{Cl2}$ |
|---|---|---|---|
| I | 0.100 | 0 | 0 |
| C | $-x$ | $+x$ | $+x$ |
| E | $0.100 - x$ | $x$ | $x$ |

$$K_c = \frac{x^2}{0.100 - x} \approx \frac{x^2}{0.100} = 2.2 \times 10^{-10}$$

$$x^2 = 2.2 \times 10^{-11} \quad \Rightarrow \quad x = 4.7 \times 10^{-6} \text{ M}$$

**Validity check:** $x/0.100 = 0.0047\%$, far below the 5% threshold — approximation valid. ✓

!!! mascot-tip "Catalyst's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Catalyst shares a tip">
    Always apply the **5% rule** after using the small-x approximation: check that $x$ is less than 5% of the initial concentration. If $x$ exceeds 5%, discard the approximation and solve the quadratic. Showing this check explicitly on the AP exam earns full credit for your work.

## When the Quadratic Is Required

When K is moderate (neither very small nor very large) and the stoichiometry doesn't allow a square-root shortcut, you need the quadratic formula. Rearrange the equilibrium expression into the form $ax^2 + bx + c = 0$, then:

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

Always choose the positive root (concentrations cannot be negative) and verify that your equilibrium concentrations are all positive. If the small-x approximation gives $x > 5\%$ of the initial value, the quadratic is required.

**Example:** $\ce{PCl5 (g) <=> PCl3 (g) + Cl2 (g)}$, $K_c = 0.030$. Start with $[\ce{PCl5}] = 0.500$ M.

ICE gives: $K_c = x^2/(0.500 - x) = 0.030$, which rearranges to:

$$x^2 + 0.030x - 0.015 = 0$$

$$x = \frac{-0.030 + \sqrt{(0.030)^2 + 4(0.015)}}{2} = \frac{-0.030 + \sqrt{0.0609}}{2} = \frac{-0.030 + 0.247}{2} = 0.108 \text{ M}$$

Equilibrium: $[\ce{PCl5}] = 0.392$ M, $[\ce{PCl3}] = [\ce{Cl2}] = 0.108$ M.

Check: $K_c = (0.108)^2/0.392 = 0.030$ ✓

#### Diagram: ICE Table Interactive Solver MicroSim

<details markdown="1">
<summary>ICE Table Interactive Solver MicroSim Specification</summary>
Type: microsim
**sim-id:** ice-table-solver<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will be able to apply (Applying — Bloom's 2001) the ICE table method to calculate equilibrium concentrations, and choose correctly between the small-x approximation and the quadratic formula.

**Description:** An interactive guided ICE table that walks students through equilibrium calculations step by step, supporting both the approximation method and the quadratic formula with animated, color-coded feedback.

**Controls:**
- Reaction selector dropdown: 4 preset reactions (H2+I2↔2HI, PCl5↔PCl3+Cl2, N2O4↔2NO2, COCl2↔CO+Cl2)
- Editable number inputs for initial concentrations of each species
- Editable K value field (accepts scientific notation, e.g., 2.2e-10)
- Mode buttons: "Guided Solve" (animated step-by-step) | "Practice Mode" (student fills in cells)
- "Solve" button and "Reset" button

**Visual elements:**
- Canvas: 660×480 px
- ICE table rendered as a clean grid with column headers (species names) and row labels (I, C, E)
- Row colors: Initial = light blue, Change = light orange, Equilibrium = light green
- Active cell highlighted with pulsing border
- Below table: algebra display panel showing the K expression substituted with ICE values
- Decision box: "Approximation valid?" — shows x% calculation, green checkmark or red X
- If quadratic needed: shows $ax^2 + bx + c = 0$ setup and quadratic formula with values substituted
- Answer box: equilibrium concentrations listed with verification calculation

**Behavior:**
- Guided Solve animates filling one row/step at a time (1.5 s per step, user can also click "Next" to advance)
- Practice Mode: clicking a cell opens a number input; on submit, cell turns green (correct) or red (incorrect) with correct value shown
- Approximation check automatically evaluated and displayed after C row is filled
- Progress indicator: "Step 2 of 5: Write Equilibrium row"
- Responsive design: columns resize for narrow screens; minimum 480 px width

**Implementation:** p5.js canvas with HTML input elements overlaid. Algebraic solving in JavaScript using quadratic formula when approximation fails. Display values to 3 significant figures. Support scientific notation in all inputs and outputs.
</details>

## Le Chatelier's Principle

**Le Chatelier's principle** states: *if a stress is applied to a system at equilibrium, the system shifts in the direction that partially relieves that stress.*

"Stress" means any change that disturbs the equilibrium — adding or removing a substance, changing pressure or volume, or changing temperature. The system responds by shifting its **equilibrium position**, though K itself changes only when temperature changes.

### Concentration Changes

Adding a species or removing a species shifts equilibrium to consume the added species or replace the removed one:

- **Add a reactant** or **remove a product** → equilibrium shifts **forward** (more products form)
- **Remove a reactant** or **add a product** → equilibrium shifts **reverse** (more reactants form)

For $\ce{N2 (g) + 3H2 (g) <=> 2NH3 (g)}$: adding $\ce{N2}$ shifts the reaction right; removing $\ce{NH3}$ as it forms (as done industrially) continuously drives the reaction right, maximizing yield.

### Pressure and Volume Changes

Pressure and volume changes affect only **gas-phase species**. Decreasing the volume (increasing pressure) shifts equilibrium toward the side with fewer moles of gas; increasing volume (decreasing pressure) favors the side with more moles of gas.

| Change applied | Effect on $\ce{N2 + 3H2 <=> 2NH3}$ ($\Delta n = -2$) |
|---|---|
| Decrease volume (increase P) | Shifts **right** (2 mol gas products vs 4 mol gas reactants) |
| Increase volume (decrease P) | Shifts **left** (more gas moles on reactant side) |
| Add inert gas at constant volume | **No effect** (partial pressures of reacting species unchanged) |

**Adding an inert gas** at constant volume has no effect on equilibrium because the partial pressures and concentrations of the reactive species are not changed. This is one of the most reliable AP exam traps. However, if an inert gas is added at constant *total pressure* (allowing volume to increase), the partial pressures of reactive gases drop and the system shifts toward more moles of gas.

### Temperature Changes and K

Temperature is the **only stress that changes the value of K itself**. All other stresses shift the equilibrium position without altering K.

- **Exothermic reaction** ($\Delta H < 0$): treat heat as a "product." Increasing temperature shifts equilibrium **left**, *decreasing* K.
- **Endothermic reaction** ($\Delta H > 0$): treat heat as a "reactant." Increasing temperature shifts equilibrium **right**, *increasing* K.

For the Haber process ($\Delta H° = -92.4$ kJ/mol, exothermic):

| Temperature | Approximate K |
|---|---|
| 25°C (298 K) | $\approx 6 \times 10^5$ |
| 300°C (573 K) | $\approx 10$ |
| 500°C (773 K) | $\approx 0.06$ |

K decreases dramatically with increasing temperature, confirming Le Chatelier's prediction for an exothermic reaction. Industrially, a compromise temperature (~400–500°C) is used: low enough for reasonable K, but high enough for acceptable reaction rate.

### Effect of a Catalyst and Adding Inert Gas

!!! mascot-note "Did You Know?"
    <img src="../../img/mascot/note.png" class="mascot-admonition-img" alt="Catalyst shares a note">
    A catalyst lowers the activation energy for both the forward and reverse reactions by the same factor. This means equilibrium is reached faster — but the catalyst does NOT change K, the equilibrium concentrations, or the equilibrium position. In the Haber process, an iron catalyst with potassium and aluminum promoters makes the reaction industrially feasible without changing where equilibrium lies.

Catalyst effects on equilibrium:

- Lowers activation energy for **both** forward and reverse reactions equally
- Does **not** change K or the equilibrium position
- Only increases the **rate** at which equilibrium is approached
- Allows use of lower temperatures (which improves K for exothermic reactions) without sacrificing speed

#### Diagram: Le Chatelier's Principle Explorer MicroSim

<details markdown="1">
<summary>Le Chatelier's Principle Explorer MicroSim Specification</summary>
Type: microsim
**sim-id:** le-chatelier-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will be able to evaluate (Evaluating — Bloom's 2001) how different stresses affect a chemical equilibrium system and predict the direction of the resulting shift.

**Description:** An interactive simulation using the N2 + 3H2 ⇌ 2NH3 reaction to demonstrate all five types of Le Chatelier stresses with animated concentration bar charts and particle graphics.

**Visual elements:**
- Canvas: 700×470 px
- Left panel (330×380 px): animated particle box showing N2 (large blue circles), H2 (small white circles), NH3 (green circles) in random motion. At equilibrium, particle counts are stable. During a shift, particles visibly convert between types.
- Right panel (330×380 px): live vertical bar chart with three bars for [N2], [H2]/3 (scaled), and [NH3], each with a dashed equilibrium reference line
- Status bar below panels: K display (updates only for temperature), Q display (updates on every stress), verdict text ("Shifting forward ▶" / "Shifting reverse ◀" / "At equilibrium ✓")

**Controls (button panel below canvas):**
- Row 1 — Concentration: "Add N2" | "Remove N2" | "Add NH3" | "Remove NH3"
- Row 2 — Pressure/Volume: "Compress (↑P)" | "Expand (↓P)" | "Add Ar(g) const V"
- Row 3 — Temperature: "Increase Temp" | "Decrease Temp" (exothermic: these change K)
- Row 4 — Catalyst: "Add Catalyst" (increases animation speed only, K unchanged, shows tooltip)
- "Reset to Equilibrium" button

**Behavior:**
- Each button triggers the appropriate stress; concentrations update and Q is displayed immediately
- Particle counts and bar heights smoothly animate toward new equilibrium over 3–5 seconds
- "Add Ar const V" shows informational callout: "Inert gas at constant volume: partial pressures of N2, H2, NH3 unchanged → no shift"
- "Add Catalyst" shows callout: "Catalyst speeds both reactions equally — equilibrium reached faster, same position"
- Temperature buttons update K in the status bar, then recalculate equilibrium position
- Responsive: side-by-side layout above 640 px, stacked below

**Implementation:** p5.js. Model concentrations numerically using simplified rate equations $d[\ce{NH3}]/dt = k_f[\ce{N2}][\ce{H2}]^3 - k_r[\ce{NH3}]^2$. Update at 60 fps with dt = 0.05. Adjust $k_f/k_r = K$ and scale for visual clarity. Particle counts proportional to concentrations.
</details>

## Gibbs Free Energy and Equilibrium

In Chapter 13 we derived the relationship:

$$\Delta G° = -RT \ln K$$

This equation connects thermodynamics directly to equilibrium position. Rearranging:

$$K = e^{-\Delta G°/RT}$$

The consequences are elegant:

- $\Delta G° < 0$ → $\ln K > 0$ → $K > 1$ → **products favored** at equilibrium
- $\Delta G° = 0$ → $K = 1$ → **neither side strongly favored**
- $\Delta G° > 0$ → $\ln K < 0$ → $K < 1$ → **reactants favored** at equilibrium

For the Haber process at 25°C ($\Delta G° = -32.9$ kJ/mol):

$$K = e^{-(-32900)/(8.314 \times 298)} = e^{13.28} = 5.9 \times 10^5$$

At 25°C, the equilibrium strongly favors ammonia ($K \gg 1$). But at 500°C ($\Delta G°$ becomes less negative due to the $-T\Delta S°$ term making $\Delta G°$ more positive as T increases):

$$K_{500°C} \approx 0.06$$

The dramatic decrease in K with temperature confirms what Le Chatelier predicts for an exothermic reaction. The equation also explains why industrial synthesis requires elevated pressure: since K is small at operating temperature, removing product and using high pressure shift the equilibrium position right to achieve practical yields.

For non-standard conditions, recall the full relationship:

$$\Delta G = \Delta G° + RT \ln Q$$

When $Q = K$, $\Delta G = 0$ — equilibrium. When $Q < K$, $\Delta G < 0$ — forward reaction is spontaneous. When $Q > K$, $\Delta G > 0$ — reverse reaction is spontaneous. This completes the connection between thermodynamics and equilibrium chemistry.

## Summary

Chemical equilibrium represents a dynamic balance where forward and reverse reaction rates are equal. The key concepts from this chapter are:

- **Dynamic equilibrium** occurs when forward and reverse reaction rates are equal; concentrations remain constant while molecular-level conversion continues.
- $K_c$ (concentration-based) and $K_p$ (pressure-based) are related by $K_p = K_c(RT)^{\Delta n}$.
- **K expressions** include only gases and aqueous species — pure solids and pure liquids are omitted.
- **Homogeneous equilibria** involve one phase; **heterogeneous equilibria** span multiple phases.
- Large K means products favored; small K means reactants favored.
- The **reaction quotient Q** has the same form as K but uses current concentrations; comparing Q to K predicts the direction of shift.
- **ICE tables** solve for equilibrium concentrations using the variable $x$. Use the small-x approximation when K < $10^{-3}$ and verify it's valid (x < 5% of initial); use the quadratic formula otherwise.
- **Le Chatelier's principle** predicts equilibrium shifts in response to concentration, pressure/volume, and temperature changes.
- Adding a **catalyst** increases the rate of reaching equilibrium but does NOT change K or the equilibrium position.
- **Adding inert gas at constant volume** has no effect on equilibrium.
- **Temperature** is the only stress that changes K itself; all other stresses change only the equilibrium position.
- $\Delta G° = -RT \ln K$ links thermodynamics to equilibrium: negative $\Delta G°$ gives K > 1; positive $\Delta G°$ gives K < 1.

!!! mascot-celebration "Great Work, Chemists!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Catalyst celebrates">
    You have just mastered one of the most important and widely tested topics in AP Chemistry. Equilibrium shows up everywhere — in acid-base chemistry, solubility, and electrochemistry. In Chapter 15, you will apply these same principles to dissolution reactions and the solubility product. You've earned a real equilibrium celebration — let's keep reacting!
