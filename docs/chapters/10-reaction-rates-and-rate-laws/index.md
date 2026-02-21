---
title: Reaction Rates and Rate Laws
description: Explore reaction rates, rate laws, integrated rate laws, half-life, collision theory, activation energy, and the Arrhenius equation in AP Chemistry.
generated_by: claude skill chapter-content-generator
date: 2026-02-20
version: 0.04
---

# Chapter 10: Reaction Rates and Rate Laws

## Summary

This chapter introduces reaction rates, rate laws, reaction orders, integrated rate laws, half-life, collision theory, activation energy, and the Arrhenius equation. Students learn to analyze kinetics data graphically and mathematically.

## Concepts Covered

This chapter covers the following 33 concepts from the learning graph:

266. Reaction Rate
267. Rate of Disappearance
268. Rate of Appearance
269. Average Rate
270. Instantaneous Rate
271. Initial Rate
272. Rate Law
273. Rate Constant
274. Reaction Order
275. Zero Order Reactions
276. First Order Reactions
277. Second Order Reactions
279. Method of Initial Rates
280. Integrated Rate Laws
281. Zero Order Integrated Law
282. First Order Integrated Law
283. Second Order Integrated Law
284. Half-Life
285. First Order Half-Life
286. Graphical Rate Analysis
287. Concentration vs Time
288. Linearization Rate Data
289. Collision Theory
290. Activation Energy
291. Activated Complex
292. Transition State
293. Effective Collisions
294. Orientation Factor
295. Arrhenius Equation
296. Arrhenius Plot
297. Frequency Factor
298. Temperature and Rate
299. Energy Diagrams

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Chemistry](../01-foundations-of-chemistry/index.md)
- [Chapter 6: Intermolecular Forces and States of Matter](../06-intermolecular-forces-and-states-of-matter/index.md)

---

## Introduction: Why Do Some Reactions Happen Faster Than Others?

Gasoline combusts explosively in a fraction of a second. Iron rusts over months. Diamonds, theoretically, convert to graphite over millions of years. Yet all three processes are thermodynamically spontaneous — so what determines how fast they proceed? The answer lies in **chemical kinetics**, the study of **reaction rates** and the factors that control them.

Understanding kinetics is not just an academic exercise. Drug metabolism in the body, industrial catalyst design, atmospheric chemistry, and even food preservation all depend on controlling how quickly chemical reactions occur. In the AP Chemistry exam, kinetics questions appear consistently and require both conceptual reasoning and mathematical fluency.

This chapter builds your kinetics toolkit from the ground up. You will learn how to define and measure reaction rates, extract rate laws from experimental data, predict concentration changes over time using integrated rate laws, and explain the molecular basis of reaction rates through collision theory and the Arrhenius equation.

---

## 10.1 Defining Reaction Rate

### What Is a Reaction Rate?

A **reaction rate** is the change in concentration of a reactant or product per unit time. Chemists express concentration in molarity (M = mol/L), and time in seconds, minutes, or hours depending on the timescale of the reaction.

Consider the general decomposition reaction:

$$ \text{A} \rightarrow \text{B} $$

As the reaction proceeds, the concentration of reactant A decreases while the concentration of product B increases. We define the **rate of disappearance** of A and the **rate of appearance** of B as:

$$ \text{rate of disappearance of A} = -\frac{\Delta[\text{A}]}{\Delta t} $$

$$ \text{rate of appearance of B} = +\frac{\Delta[\text{B}]}{\Delta t} $$

The negative sign in the disappearance expression ensures the rate is always a positive number (since $\Delta[\text{A}]$ is negative when A is consumed). The positive sign for appearance reflects that product concentration increases over time.

### Stoichiometric Ratios and Rate Expressions

For reactions with coefficients other than 1, stoichiometry links the rates of disappearance and appearance. Consider:

$$ 2\,\text{NO}_2(g) \rightarrow 2\,\text{NO}(g) + \text{O}_2(g) $$

Here, every time two moles of $\text{NO}_2$ are consumed, two moles of $\text{NO}$ and one mole of $\text{O}_2$ are produced. The unique reaction rate — a single number that describes the overall rate regardless of which species you monitor — is:

$$ \text{rate} = -\frac{1}{2}\frac{\Delta[\text{NO}_2]}{\Delta t} = +\frac{1}{2}\frac{\Delta[\text{NO}]}{\Delta t} = +\frac{\Delta[\text{O}_2]}{\Delta t} $$

The general rule: divide the rate of change of each species by its stoichiometric coefficient, and include a negative sign for reactants.

Key features of rate expressions:

- Each term is divided by the stoichiometric coefficient of that species.
- Reactants carry a negative sign (they are consumed).
- Products carry a positive sign (they are formed).
- The resulting rate is always a positive quantity.

### Average Rate vs. Instantaneous Rate vs. Initial Rate

Three distinct rate concepts appear regularly in kinetics problems:

- **Average rate** — the change in concentration divided by the elapsed time over a finite interval: $\text{rate}_{avg} = -\dfrac{\Delta[\text{A}]}{\Delta t}$. This is easy to calculate from data tables but smooths out changes in rate over the interval.
- **Instantaneous rate** — the rate at a single moment in time, equal to the slope of the tangent line drawn to the concentration-versus-time curve at that point. As $\Delta t \rightarrow 0$, the average rate approaches the instantaneous rate.
- **Initial rate** — the instantaneous rate measured at the very beginning of the reaction ($t = 0$), before significant product accumulates or reactant concentrations change substantially. Initial rates are particularly valuable experimentally because the conditions are precisely known.

---

## 10.2 The Rate Law

### Experimental Determination of the Rate Law

The **rate law** (also called the rate equation) expresses the reaction rate as a mathematical function of reactant concentrations. For a reaction involving reactants A and B, the general form is:

$$ \text{rate} = k[\text{A}]^m[\text{B}]^n $$

where:

- $k$ is the **rate constant** — a proportionality constant characteristic of a particular reaction at a given temperature.
- $m$ and $n$ are the **reaction orders** with respect to A and B, respectively.
- The **overall reaction order** is $m + n$.

A critical rule: **the rate law cannot be determined from the balanced equation alone**. The exponents $m$ and $n$ must be determined experimentally. They reflect the reaction mechanism, not the stoichiometry of the overall equation.

### The Rate Constant

The **rate constant** $k$ has units that depend on the overall reaction order:

| Overall Order | Units of $k$ |
|:---:|:---:|
| 0 | M s$^{-1}$ |
| 1 | s$^{-1}$ |
| 2 | M$^{-1}$ s$^{-1}$ |
| 3 | M$^{-2}$ s$^{-1}$ |

The value of $k$ increases with temperature (a point we will return to in Section 10.7 with the Arrhenius equation). At a constant temperature, $k$ is constant regardless of concentration.

### Reaction Order

The **reaction order** with respect to a reactant tells you how the rate responds when that reactant's concentration changes:

- **Zero order** ($m = 0$): the rate is independent of $[\text{A}]$. Doubling $[\text{A}]$ has no effect on the rate.
- **First order** ($m = 1$): the rate is directly proportional to $[\text{A}]$. Doubling $[\text{A}]$ doubles the rate.
- **Second order** ($m = 2$): the rate is proportional to $[\text{A}]^2$. Doubling $[\text{A}]$ quadruples the rate.
- **Non-integer orders** (e.g., 1/2 or 3/2) can appear in complex mechanisms, though they are less common in AP Chemistry.

---

## 10.3 Method of Initial Rates

The **method of initial rates** uses data from multiple experiments — each with different starting concentrations — to determine the rate law experimentally. The strategy: compare experiments where only one concentration changes at a time.

### Worked Example

Consider the reaction: $\text{A} + \text{B} \rightarrow \text{Products}$

The following experimental data were collected:

| Experiment | $[\text{A}]_0$ (M) | $[\text{B}]_0$ (M) | Initial Rate (M/s) |
|:---:|:---:|:---:|:---:|
| 1 | 0.100 | 0.100 | $2.0 \times 10^{-3}$ |
| 2 | 0.200 | 0.100 | $4.0 \times 10^{-3}$ |
| 3 | 0.100 | 0.200 | $8.0 \times 10^{-3}$ |

**Step 1: Find the order with respect to A.**
Compare Experiments 1 and 2 (only $[\text{A}]$ changes):

$$ \frac{\text{rate}_2}{\text{rate}_1} = \frac{k[\text{A}]_2^m[\text{B}]_1^n}{k[\text{A}]_1^m[\text{B}]_1^n} = \left(\frac{[\text{A}]_2}{[\text{A}]_1}\right)^m $$

$$ \frac{4.0 \times 10^{-3}}{2.0 \times 10^{-3}} = \left(\frac{0.200}{0.100}\right)^m = 2^m $$

$$ 2 = 2^m \implies m = 1 \quad \text{(first order in A)} $$

**Step 2: Find the order with respect to B.**
Compare Experiments 1 and 3 (only $[\text{B}]$ changes):

$$ \frac{\text{rate}_3}{\text{rate}_1} = \left(\frac{[\text{B}]_3}{[\text{B}]_1}\right)^n = \left(\frac{0.200}{0.100}\right)^n = 2^n $$

$$ \frac{8.0 \times 10^{-3}}{2.0 \times 10^{-3}} = 4 = 2^n \implies n = 2 \quad \text{(second order in B)} $$

**Step 3: Write the rate law.**

$$ \text{rate} = k[\text{A}][\text{B}]^2 $$

**Step 4: Calculate $k$.**
Using Experiment 1:

$$ k = \frac{\text{rate}}{[\text{A}][\text{B}]^2} = \frac{2.0 \times 10^{-3}\,\text{M/s}}{(0.100\,\text{M})(0.100\,\text{M})^2} = 2.0\,\text{M}^{-2}\text{s}^{-1} $$

The overall reaction order is $1 + 2 = 3$ (third order overall).

---

## 10.4 Integrated Rate Laws

Rate laws tell us the instantaneous rate, but we often need to know the concentration of a reactant at a specific time $t$. **Integrated rate laws** provide exactly that — they are mathematical equations that express concentration as a function of time.

### Zero Order Integrated Law

For a **zero order reaction**, the rate is constant and independent of concentration:

$$ \text{rate} = k $$

Integrating gives the **zero order integrated law**:

$$ [\text{A}]_t = [\text{A}]_0 - kt $$

This is the equation of a straight line: $[\text{A}]_t$ versus $t$ is linear with slope $-k$ and y-intercept $[\text{A}]_0$. The concentration decreases linearly with time until the reactant is exhausted.

### First Order Integrated Law

For a **first order reaction**, the rate is proportional to concentration:

$$ \text{rate} = k[\text{A}] $$

Integrating gives the **first order integrated law**:

$$ \ln[\text{A}]_t = \ln[\text{A}]_0 - kt $$

This can also be written as $[\text{A}]_t = [\text{A}]_0\,e^{-kt}$, which shows that concentration decays exponentially with time. The logarithmic form reveals that a plot of $\ln[\text{A}]$ versus $t$ is linear with slope $-k$.

### Second Order Integrated Law

For a **second order reaction** (second order in A only):

$$ \text{rate} = k[\text{A}]^2 $$

Integrating gives the **second order integrated law**:

$$ \frac{1}{[\text{A}]_t} = \frac{1}{[\text{A}]_0} + kt $$

Here, a plot of $\frac{1}{[\text{A}]}$ versus $t$ is linear with slope $+k$ and y-intercept $\frac{1}{[\text{A}]_0}$.

### Summary Table: Integrated Rate Laws

| Order | Rate Law | Integrated Law | Linear Plot | Slope | Half-Life |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 0 | $\text{rate} = k$ | $[\text{A}]_t = [\text{A}]_0 - kt$ | $[\text{A}]$ vs $t$ | $-k$ | $\frac{[\text{A}]_0}{2k}$ |
| 1 | $\text{rate} = k[\text{A}]$ | $\ln[\text{A}]_t = \ln[\text{A}]_0 - kt$ | $\ln[\text{A}]$ vs $t$ | $-k$ | $\frac{0.693}{k}$ |
| 2 | $\text{rate} = k[\text{A}]^2$ | $\frac{1}{[\text{A}]_t} = \frac{1}{[\text{A}]_0} + kt$ | $\frac{1}{[\text{A}]}$ vs $t$ | $+k$ | $\frac{1}{k[\text{A}]_0}$ |

---

## 10.5 Half-Life

The **half-life** ($t_{1/2}$) of a reaction is the time required for the concentration of a reactant to decrease to exactly half of its initial value. Half-life is a convenient way to describe how quickly a reaction proceeds.

### First Order Half-Life

For **first order reactions**, the half-life is particularly simple and important:

$$ t_{1/2} = \frac{0.693}{k} $$

where 0.693 is $\ln 2$. This result has two remarkable implications:

- The half-life of a first order reaction is **constant** — it does not depend on the initial concentration. After one half-life, half the reactant remains. After a second half-life, half of that half (25%) remains. After a third, 12.5% remains, and so on.
- Knowing either $k$ or $t_{1/2}$ lets you calculate the other immediately.

First order kinetics governs many important processes:

- Radioactive decay (every radioactive isotope has a characteristic half-life)
- Drug metabolism and elimination in the bloodstream
- Decomposition of many atmospheric pollutants

### Half-Life for Other Orders

For **zero order reactions**, the half-life depends on initial concentration:

$$ t_{1/2} = \frac{[\text{A}]_0}{2k} $$

As the reactant is consumed, each successive half-life gets shorter.

For **second order reactions**, the half-life also depends on initial concentration:

$$ t_{1/2} = \frac{1}{k[\text{A}]_0} $$

Each successive half-life gets longer as concentration decreases.

### Worked Example: Radioactive Decay

The radioactive isotope $^{32}\text{P}$ undergoes first order decay with a half-life of 14.3 days. If you start with 1.00 g of $^{32}\text{P}$, how much remains after 42.9 days?

First, note that 42.9 days = 3 half-lives. After each half-life, the amount is multiplied by 1/2:

$$ \text{Amount remaining} = 1.00\,\text{g} \times \left(\frac{1}{2}\right)^3 = 1.00 \times 0.125 = 0.125\,\text{g} $$

Alternatively, first calculate $k$:

$$ k = \frac{0.693}{t_{1/2}} = \frac{0.693}{14.3\,\text{days}} = 0.04846\,\text{days}^{-1} $$

Then apply the first order integrated law:

$$ \ln[\text{A}]_t = \ln(1.00) - (0.04846)(42.9) = 0 - 2.079 = -2.079 $$

$$ [\text{A}]_t = e^{-2.079} = 0.125\,\text{g} $$

Both methods give the same answer: 0.125 g remains.

---

## 10.6 Graphical Rate Analysis

### Linearization of Rate Data

One of the most powerful tools in kinetics is **graphical rate analysis** — using plots of **concentration vs. time** data to determine reaction order. The key insight is that each integrated rate law predicts a different type of linear relationship when the data are plotted appropriately. This technique is called **linearization of rate data**.

Given experimental concentration vs. time data, plot three graphs:

- $[\text{A}]$ vs. $t$ — linear for zero order
- $\ln[\text{A}]$ vs. $t$ — linear for first order
- $\frac{1}{[\text{A}]}$ vs. $t$ — linear for second order

Whichever plot gives a straight line reveals the reaction order. The slope of that line gives $k$ (with appropriate sign), and the y-intercept gives either $[\text{A}]_0$, $\ln[\text{A}]_0$, or $\frac{1}{[\text{A}]_0}$.

### How to Determine Order Graphically

Follow this systematic approach:

1. Collect concentration vs. time data at regular time intervals.
2. Create three columns: $[\text{A}]$, $\ln[\text{A}]$, and $\frac{1}{[\text{A}]}$.
3. Plot each column against time.
4. Identify which plot is linear (straight line with consistent slope throughout).
5. Read the slope from the linear plot to find $k$.

This graphical method is more reliable than the method of initial rates when you have a single reactant and want to determine order from a single experiment's concentration-time data.

#### Diagram: Interactive Integrated Rate Law Grapher

<details markdown="1">
<summary>Interactive Integrated Rate Law Grapher</summary>
Type: microsim
**sim-id:** integrated-rate-law-grapher<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will be able to (1) recognize which concentration-time plot is linear for a given reaction order (Bloom L2: Understand — identify, classify), and (2) extract the rate constant k from the slope of the linear plot (Bloom L3: Apply — calculate, use).

Canvas: 800 px wide × 450 px tall, responsive to window.innerWidth. Background: #f8f9fa.

**Layout:** Left panel (200 px) for controls; right panel (remaining width) for three stacked mini-plots.

**Controls (left panel):**
- Dropdown labeled "Reaction Order": options Zero, First, Second (default: First)
- Slider labeled "Rate constant k": range 0.05 to 1.0, step 0.01, default 0.20 (units change with order: s⁻¹ for first, M·s⁻¹ for zero, M⁻¹·s⁻¹ for second)
- Slider labeled "Initial [A]₀ (M)": range 0.1 to 2.0, step 0.05, default 1.0
- Slider labeled "Time range (s)": range 5 to 60, step 5, default 20
- Button "Reset" to restore defaults

**Right panel — three stacked plots (each ~130 px tall), separated by 5 px gaps:**

Plot 1 — [A] vs t:
- x-axis: time 0 to tmax; y-axis: [A] 0 to [A]₀ × 1.1
- For zero order: straight line from (0, [A]₀) to (tmax, max([A]₀ - k·tmax, 0)) — LINE IS LINEAR (highlight in green with thicker stroke)
- For first/second order: curve (not linear) — draw in gray, thin stroke
- Label axes "[A] (M)" and "t (s)"

Plot 2 — ln[A] vs t:
- y-axis: ln([A]₀) + 0.5 to min value of ln[A]
- For first order: straight line — highlight green + thick stroke
- For zero/second order: curve — gray, thin
- Label axes "ln[A]" and "t (s)"

Plot 3 — 1/[A] vs t:
- y-axis: 1/[A]₀ to 1/min([A])
- For second order: straight line — highlight green + thick stroke
- For zero/first order: curve — gray, thin
- Label axes "1/[A] (M⁻¹)" and "t (s)"

**Highlighting behavior:** The linear plot has a green background tint (#e8f5e9), thicker green stroke (3 px), and a label overlay in the upper right corner: "LINEAR — Order [N]" in bold green text. Non-linear plots use gray stroke (1.5 px) and no tint.

**Slope display:** Below the linear plot, display "slope = –k = [computed slope]" for first/zero order or "slope = +k = [computed slope]" for second order, in a monospace font, 12 pt.

**Compute data:** Generate 200 evenly-spaced time points from 0 to tmax. For zero order: \[A\](t) = max(\[A\]₀ − k·t, 0). For first order: \[A\](t) = \[A\]₀·e^(−k·t). For second order: \[A\](t) = 1/(1/\[A\]₀ + k·t). Transform to ln and 1/\[A\] accordingly.
</details>

---

## 10.7 Collision Theory

### Molecular Basis of Reactions

Rate laws describe how fast reactions proceed, but they do not explain why. **Collision theory** provides the molecular-level explanation: a chemical reaction occurs when reactant molecules collide with (1) sufficient energy and (2) the correct spatial orientation.

Three requirements must be met for a productive reaction:

- **Collision must occur** — molecules must physically meet in space.
- **Sufficient energy** — the collision must supply at least the minimum energy required to break existing bonds and begin forming new ones.
- **Correct orientation** — molecules must be aligned properly so the reactive parts of each molecule can interact.

Only a small fraction of collisions meet all three criteria; these are called **effective collisions**. The vast majority of molecular collisions are elastic — the molecules simply bounce off one another without reacting.

### The Orientation Factor

The **orientation factor** (often called the steric factor, $p$) quantifies how sensitive the reaction is to the spatial alignment of colliding molecules. For some reactions, almost any collision geometry works ($p \approx 1$). For others, molecules must approach from a very specific direction ($p \ll 1$).

Consider the reaction of NO and O₃:

$$ \text{NO} + \text{O}_3 \rightarrow \text{NO}_2 + \text{O}_2 $$

The nitrogen atom of NO must collide with an oxygen atom of O₃. If the molecules approach in any other geometry, the collision is unproductive even if the energy is sufficient.

Examples of orientation dependence:

- Simple atom-atom combinations have $p \approx 1$ — nearly any orientation works.
- Reactions between complex polyatomic molecules often have $p \ll 1$ — only a tiny fraction of correctly oriented collisions are productive.
- Enzymatic reactions in biology achieve extreme orientation specificity through active site geometry.

### Collision Rate and Concentration

Collision theory explains why rate laws take the form $k[\text{A}]^m[\text{B}]^n$:

- Doubling $[\text{A}]$ doubles the frequency of A-B collisions, doubling the reaction rate (if first order in A).
- The rate constant $k$ encapsulates both the orientation factor and the fraction of collisions with sufficient energy.

---

## 10.8 Activation Energy and the Transition State

### The Energy Barrier

Not every collision produces a reaction, even among correctly oriented molecules. The colliding molecules must overcome an energy barrier called the **activation energy** ($E_a$). This is the minimum kinetic energy that colliding molecules must possess for a reaction to occur.

Imagine two reactant molecules approaching. As they get close, their electron clouds repel each other, requiring an input of energy to force the atoms into new bonding arrangements. This energy input is the activation energy. Once the barrier is surmounted, the reaction can proceed downhill to products.

The **activated complex** (also called the **transition state**) is the unstable, high-energy arrangement of atoms that exists at the top of the energy barrier — a fleeting configuration that is neither reactants nor products. The transition state has:

- Partial bonds — old bonds partially broken, new bonds partially formed
- Maximum potential energy along the reaction pathway
- An extremely short lifetime (on the order of femtoseconds, $10^{-15}$ s)

The transition state cannot be isolated or observed directly; it is inferred from theoretical models and ultra-fast spectroscopy.

### Energy Diagrams

An **energy diagram** (also called a reaction coordinate diagram or potential energy diagram) plots the potential energy of the system as reactants are converted to products. Key features:

- **Reactants** are on the left at their characteristic potential energy.
- **Products** are on the right at their characteristic potential energy.
- The **activation energy** $E_a$ (forward) is the energy difference from reactants to the transition state peak.
- The **reverse activation energy** $E_a$ (reverse) is the energy difference from products to the transition state peak.
- $\Delta H_\text{rxn}$ is the energy difference between reactants and products:
  - Exothermic: products are lower in energy than reactants ($\Delta H < 0$)
  - Endothermic: products are higher in energy than reactants ($\Delta H > 0$)

The relationship among these quantities:

$$ E_{a(\text{reverse})} = E_{a(\text{forward})} - \Delta H_\text{rxn} $$

#### Diagram: Reaction Energy Diagram

<details markdown="1">
<summary>Reaction Energy Diagram — Activation Energy and Transition State</summary>
Type: diagram
**sim-id:** reaction-energy-diagram<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will be able to (1) identify reactants, products, transition state, Ea (forward), Ea (reverse), and ΔH on a reaction coordinate diagram (Bloom L1: Remember — label, identify), and (2) relate the sign of ΔH to whether the reaction is exothermic or endothermic (Bloom L2: Understand — explain, classify).

Canvas: 800 px wide × 450 px tall. Background: white (#ffffff).

**Layout:** Full canvas used for the diagram. Left margin 80 px, right margin 40 px, top margin 30 px, bottom margin 60 px.

**Toggle control (top left):** A button labeled "Exothermic / Endothermic" that switches between two modes:
- Exothermic mode: products lower than reactants
- Endothermic mode: products higher than reactants

**Curve:** Smooth cubic Bézier reaction coordinate curve:
- Start point (reactants): x = left margin, y = reactant energy level
- Control points create a smooth hill with maximum at transition state
- End point (products): x = right margin, y = product energy level

**Exothermic defaults:**
- Reactant energy: 280 px from top
- Transition state (peak): 120 px from top
- Product energy: 350 px from top

**Endothermic defaults:**
- Reactant energy: 330 px from top
- Transition state (peak): 120 px from top
- Product energy: 220 px from top

**Annotations (drawn with dashed horizontal lines and arrows):**
- Horizontal dashed line at reactant level, labeled "Reactants" (left)
- Horizontal dashed line at product level, labeled "Products" (right)
- Dashed horizontal line at transition state peak, labeled "Transition State / Activated Complex" with a dot marker at the peak
- Double-headed vertical arrow from reactant level to peak: labeled "Ea (forward)" in red
- Double-headed vertical arrow from product level to peak: labeled "Ea (reverse)" in orange
- Double-headed vertical arrow from reactant level to product level: labeled "ΔH" in blue; color the label green for exothermic (ΔH < 0) and red for endothermic (ΔH > 0)

**x-axis:** Labeled "Reaction Coordinate" centered below curve; no tick marks needed.
**y-axis:** Labeled "Potential Energy (kJ/mol)" rotated 90°; no numeric tick marks needed (relative diagram only).

**Color scheme:** Curve in dark gray (#333). Reactant region shaded light blue. Product region shaded light pink. Transition state peak marked with a red dot (8 px radius).

**Text labels:** 14 pt sans-serif for axis labels; 12 pt for energy-level labels and arrows.
</details>

---

## 10.9 The Arrhenius Equation

### Temperature Dependence of the Rate Constant

One of the most important observations in chemical kinetics is that increasing temperature dramatically increases reaction rates. A common rule of thumb is that a 10 °C rise in temperature roughly doubles the rate for many reactions. But this is only an approximation — the precise quantitative relationship is given by the **Arrhenius equation**:

$$ k = Ae^{-E_a/RT} $$

where:

- $k$ = rate constant
- $A$ = the **frequency factor** (also called the pre-exponential factor), with the same units as $k$
- $E_a$ = activation energy (J/mol)
- $R$ = universal gas constant = 8.314 J/(mol·K)
- $T$ = absolute temperature in Kelvin

The **frequency factor** $A$ accounts for the collision frequency and the orientation factor. It represents the maximum possible rate — the rate if every collision were effective. The exponential term $e^{-E_a/RT}$ is the fraction of collisions that actually have sufficient energy to react.

### Why Temperature Increases Rate

**Temperature and rate** are related through two effects:

1. **Higher speed, more collisions** — at higher temperatures, molecules move faster (Maxwell-Boltzmann distribution), so collision frequency increases. However, this effect is relatively modest.
2. **More energetic collisions** — more importantly, a larger fraction of molecules have kinetic energy exceeding $E_a$ at higher temperatures. The exponential term $e^{-E_a/RT}$ increases rapidly with temperature.

If $E_a$ is large, the rate is very sensitive to temperature (the exponential factor changes dramatically). If $E_a$ is small, the rate is less temperature-sensitive.

The key temperature-rate relationships to remember:

- Increasing temperature always increases the rate constant $k$ for a given reaction.
- Reactions with large $E_a$ show greater sensitivity to temperature changes.
- The Arrhenius equation applies over a limited temperature range for most reactions.

### Linearized Arrhenius Equation and the Arrhenius Plot

Taking the natural logarithm of the Arrhenius equation gives the **linearized Arrhenius equation**:

$$ \ln k = \ln A - \frac{E_a}{R} \cdot \frac{1}{T} $$

This is in the form $y = b + mx$, where:

- $y = \ln k$
- $x = \frac{1}{T}$
- slope $= -\frac{E_a}{R}$
- y-intercept $= \ln A$

An **Arrhenius plot** graphs $\ln k$ versus $\frac{1}{T}$ (in K$^{-1}$). The result is a straight line with:

- Slope $= -\dfrac{E_a}{R}$, so $E_a = -\text{slope} \times R$
- y-intercept $= \ln A$, so $A = e^{\text{intercept}}$

This graphical method allows chemists to determine both $E_a$ and $A$ from experimental rate constant measurements at several temperatures.

### Two-Temperature Arrhenius Calculation

If you know the rate constant at two temperatures ($k_1$ at $T_1$ and $k_2$ at $T_2$), you can find $E_a$ without needing $A$:

$$ \ln\frac{k_2}{k_1} = \frac{-E_a}{R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right) $$

This is one of the most tested equations in AP Chemistry kinetics. Note that temperatures must be in Kelvin.

**Example:** The rate constant for a reaction is $k_1 = 0.0120\,\text{M}^{-1}\text{s}^{-1}$ at $T_1 = 300\,\text{K}$ and $k_2 = 0.0420\,\text{M}^{-1}\text{s}^{-1}$ at $T_2 = 320\,\text{K}$. Find $E_a$.

$$ \ln\frac{0.0420}{0.0120} = \frac{-E_a}{8.314}\left(\frac{1}{320} - \frac{1}{300}\right) $$

$$ \ln(3.50) = \frac{-E_a}{8.314}\left(3.125 \times 10^{-3} - 3.333 \times 10^{-3}\right) $$

$$ 1.253 = \frac{-E_a}{8.314}\left(-2.08 \times 10^{-4}\right) $$

$$ E_a = \frac{1.253 \times 8.314}{2.08 \times 10^{-4}} = 5.01 \times 10^4\,\text{J/mol} = 50.1\,\text{kJ/mol} $$

#### Diagram: Arrhenius Equation Explorer

<details markdown="1">
<summary>Arrhenius Equation Explorer — Interactive k vs T and Arrhenius Plot</summary>
Type: microsim
**sim-id:** arrhenius-equation-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will be able to (1) predict how changing Ea and A affects the rate constant at different temperatures (Bloom L3: Apply — predict, calculate), and (2) explain why reactions with large Ea are more temperature-sensitive (Bloom L4: Analyze — differentiate, explain).

Canvas: 800 px wide × 450 px tall, responsive to window.innerWidth. Background: #f5f5f5.

**Layout:**
- Left panel (220 px): sliders and read-out values
- Right panel (remaining width): two side-by-side plots, each taking half the right panel width

**Controls (left panel):**
- Slider "Ea (kJ/mol)": range 20 to 150, step 1, default 60
- Slider "A (×10¹⁰ s⁻¹)": range 1 to 100, step 1, default 10 (store internally as A_val × 10^10)
- Slider "T range max (K)": range 400 to 1200, step 50, default 800
- Static display of R = 8.314 J/(mol·K)
- Live read-out box showing current k at T = 298 K and T = 500 K (computed from Arrhenius equation), formatted as scientific notation.
- Checkbox "Show reference curve" — when checked, renders a second gray curve on both plots using Ea = 40 kJ/mol and same A, for comparison.

**Right panel — Plot 1: k vs T (left half of right panel):**
- x-axis: Temperature from 200 K to T_max (from slider), labeled "Temperature (K)"
- y-axis: k (auto-scaled based on max k in range), labeled "k (s⁻¹)"
- Curve: smooth line computing k = A × exp(−Ea×1000 / (8.314 × T)) for 300 evenly spaced T values
- Curve color: deep blue (#1565C0), stroke weight 2.5 px
- y-axis uses scientific notation if max k > 1000
- Grid lines: light gray, dashed
- Title: "k vs Temperature"

**Right panel — Plot 2: Arrhenius Plot — ln k vs 1/T (right half of right panel):**
- x-axis: 1/T from 1/T_max to 1/200 (units: 10⁻³ K⁻¹, multiply x-axis values by 1000 for display), labeled "1/T (×10⁻³ K⁻¹)"
- y-axis: ln k (auto-scaled), labeled "ln k"
- Curve: straight line (Arrhenius plot is linear by definition) — draw as line from computed endpoints, stroke weight 2.5 px, color deep red (#C62828)
- Overlay text on the line: "slope = −Ea/R = [computed value] K" (show computed −Ea×1000/8.314 formatted to 0 decimal places)
- Grid lines: light gray, dashed
- Title: "Arrhenius Plot (ln k vs 1/T)"

**Reference curve (when checkbox active):**
- Second curve/line in light gray (#9E9E9E), stroke weight 1.5 px, dashed
- Label "Ea = 40 kJ/mol" at the right end of the gray line on each plot

**Interactivity:** All plots update in real time as sliders change. Use smooth animation (lerp or direct recalculation each frame).
</details>

---

## 10.10 Connecting Kinetics Concepts

### Factors That Affect Reaction Rate

Drawing together everything from this chapter, the factors that affect how fast a chemical reaction proceeds are:

- **Concentration of reactants** — higher concentration increases collision frequency and therefore reaction rate (for non-zero order reactions). This is captured quantitatively in the rate law.
- **Temperature** — higher temperature increases both collision frequency and the fraction of sufficiently energetic collisions. Quantified by the Arrhenius equation.
- **Activation energy** — reactions with lower $E_a$ proceed faster at any given temperature. Catalysts (covered in Chapter 11) work by providing an alternative pathway with lower $E_a$.
- **Orientation factor** — reactions with strict geometric requirements have lower effective collision rates, reflected in a smaller frequency factor $A$.
- **Physical state and surface area** — heterogeneous reactions (e.g., solid reacting with liquid) are faster when the solid is more finely divided (more surface area available for collisions).

### Graphical Analysis Decision Tree

When presented with concentration-time data on the AP exam, use this decision process:

1. Try plotting $[\text{A}]$ vs. $t$. If linear, the reaction is **zero order**.
2. If not linear, try $\ln[\text{A}]$ vs. $t$. If linear, the reaction is **first order**.
3. If not linear, try $\frac{1}{[\text{A}]}$ vs. $t$. If linear, the reaction is **second order**.
4. Once the order is identified, the slope of the linear plot gives $k$.

### Common AP Exam Pitfalls

Watch out for these frequent mistakes:

- Confusing stoichiometric coefficients with reaction orders — they are unrelated unless the rate law is given or the mechanism is known to be elementary.
- Forgetting to convert temperature to Kelvin in Arrhenius calculations.
- Using the wrong sign for the slope in Arrhenius plots — the slope is $-E_a/R$, which is always negative, making $E_a$ positive.
- Confusing the half-life formula for different orders — only first order half-life is independent of initial concentration.
- Mixing up $E_a$ (forward) and $E_a$ (reverse) on energy diagrams.

---

## 10.11 Quantitative Practice: Putting It All Together

### Rate Law from Initial Rates — Additional Example

Consider the reaction: $\text{A} + 2\,\text{B} \rightarrow \text{C}$

| Experiment | $[\text{A}]_0$ (M) | $[\text{B}]_0$ (M) | Initial Rate (M/s) |
|:---:|:---:|:---:|:---:|
| 1 | 0.050 | 0.050 | $1.6 \times 10^{-4}$ |
| 2 | 0.100 | 0.050 | $3.2 \times 10^{-4}$ |
| 3 | 0.050 | 0.100 | $1.6 \times 10^{-4}$ |
| 4 | 0.100 | 0.100 | $3.2 \times 10^{-4}$ |

From Experiments 1 and 2: doubling $[\text{A}]$ doubles the rate → first order in A.

From Experiments 1 and 3: doubling $[\text{B}]$ has no effect on the rate → zero order in B.

Rate law: $\text{rate} = k[\text{A}]$

$$ k = \frac{1.6 \times 10^{-4}\,\text{M/s}}{0.050\,\text{M}} = 3.2 \times 10^{-3}\,\text{s}^{-1} $$

Note that even though B is a reactant (and required by stoichiometry), it does not appear in the rate law. Its concentration does not affect the rate within the range studied. This outcome is perfectly consistent with kinetics — the rate law reflects the mechanism, not the balanced equation.

### Integrated Rate Law — Second Order Example

A reaction $\text{A} \rightarrow \text{products}$ is second order with $k = 0.0750\,\text{M}^{-1}\text{s}^{-1}$ and $[\text{A}]_0 = 0.500\,\text{M}$. Find $[\text{A}]$ at $t = 30.0\,\text{s}$ and the half-life.

**Concentration at t = 30.0 s:**

$$ \frac{1}{[\text{A}]_t} = \frac{1}{[\text{A}]_0} + kt = \frac{1}{0.500} + (0.0750)(30.0) = 2.00 + 2.25 = 4.25\,\text{M}^{-1} $$

$$ [\text{A}]_t = \frac{1}{4.25} = 0.235\,\text{M} $$

**Half-life:**

$$ t_{1/2} = \frac{1}{k[\text{A}]_0} = \frac{1}{(0.0750)(0.500)} = \frac{1}{0.0375} = 26.7\,\text{s} $$

---

## Chapter Summary

Chemical kinetics answers the question: how fast does a reaction occur, and why? The tools developed in this chapter — rate laws, integrated rate laws, graphical analysis, and the Arrhenius equation — form a complete quantitative framework for understanding and predicting reaction rates.

Key takeaways from each major section:

- **Reaction rates** are expressed as the change in concentration per unit time, adjusted for stoichiometry. Average, instantaneous, and initial rates are all useful in different contexts.
- **Rate laws** ($\text{rate} = k[\text{A}]^m[\text{B}]^n$) must be determined experimentally using the method of initial rates or graphical analysis. The rate constant $k$ has units that depend on overall order.
- **Integrated rate laws** allow calculation of concentration at any time and are the basis for determining reaction order from graphical linearization.
- **Half-life** for first order reactions is constant ($t_{1/2} = 0.693/k$) and independent of initial concentration — a property with wide application in nuclear chemistry and pharmacology.
- **Collision theory** provides a molecular explanation: only effective collisions (sufficient energy and correct orientation) lead to reaction.
- **Activation energy** is the energy barrier that must be overcome. The **transition state** / **activated complex** at the top of the barrier is unstable and short-lived.
- **Energy diagrams** show the relationship among reactant energy, product energy, $E_a$ (forward and reverse), and $\Delta H$.
- The **Arrhenius equation** ($k = Ae^{-E_a/RT}$) quantitatively links the rate constant to temperature and activation energy. The **Arrhenius plot** ($\ln k$ vs. $1/T$) yields $E_a$ from the slope and the **frequency factor** $A$ from the intercept.

Understanding kinetics is foundational for the chapters ahead — reaction mechanisms (Chapter 11) explore the step-by-step molecular pathways that give rise to rate laws, and thermodynamics (Chapters 12–13) connects energy diagrams to equilibrium and spontaneity.
