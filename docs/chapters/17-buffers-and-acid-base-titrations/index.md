---
title: "Chapter 17: Buffers and Acid-Base Titrations"
description: Covers buffer composition, Henderson-Hasselbalch equation, buffer capacity and preparation, titration curves for strong and weak acid-base combinations, half-equivalence points, and indicator selection.
generated_by: claude skill chapter-content-generator
date: 2026-02-20 12:23:17
version: 0.04
---

# Chapter 17: Buffers and Acid-Base Titrations

## Summary

This chapter focuses on buffer solutions, the Henderson-Hasselbalch equation, buffer capacity and preparation, acid-base titration curves, half-equivalence points, and indicator selection for different titration types.

## Concepts Covered

This chapter covers the following 18 concepts from the learning graph:

458. Buffer Composition
459. Henderson-Hasselbalch
460. Buffer Capacity
461. Buffer pH Calculations
462. Buffer Preparation
463. Acid-Base Titration
464. Strong Acid-Strong Base
465. Weak Acid-Strong Base
466. Strong Acid-Weak Base
467. Titration Curve Analysis
468. Half-Equivalence Point
469. Buffer Region
470. Indicators and pH Range
471. Selecting Indicators
472. Neutralization Reactions
473. Net Ionic Acid-Base
474. Dilute Acid Calculations
475. pH of Mixed Solutions

## Prerequisites

This chapter builds on concepts from:

- [Chapter 7: Phase Changes, Solutions, and Gas Laws](../07-phase-changes-solutions-and-gas-laws/index.md)
- [Chapter 8: Chemical Reactions and Equations](../08-chemical-reactions-and-equations/index.md)
- [Chapter 14: Chemical Equilibrium](../14-chemical-equilibrium/index.md)
- [Chapter 16: Acid-Base Theory and pH](../16-acid-base-theory-and-ph/index.md)

---

!!! mascot-welcome "Welcome, Scientists!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Catalyst welcomes you">
    Have you ever wondered how your blood keeps its pH almost perfectly constant, even as your body produces acids through metabolism? The answer is buffers — and in this chapter, you'll master both the theory and the math behind them. Then we'll add titrations, one of chemistry's most elegant analytical techniques. Let's react!

## Introduction

In Chapter 16 you learned how acids and bases work and how to calculate pH. But real chemical systems — especially biological ones — rarely consist of a single pure acid or base in water. They contain mixtures: a weak acid alongside its conjugate base, ions from multiple sources, or solutions being slowly neutralized by the addition of a strong acid or base.

This chapter tackles two essential topics. First, **buffers** — solutions that resist pH change and are critical to life itself. Second, **acid-base titrations** — a precision technique for determining the concentration of an unknown acid or base by carefully adding a standard solution until the reaction is complete.

These topics weave together everything from Chapter 16: equilibrium constants, conjugate pairs, ICE tables, and the relationship between $K_a$, $K_b$, and $K_w$. By the end of this chapter, you'll be able to design a buffer for any target pH, interpret a titration curve in full detail, and select the right indicator for any acid-base titration.

## Buffer Solutions

### Buffer Composition

A **buffer** is a solution that resists significant changes in pH when small amounts of strong acid or strong base are added. All buffers share the same basic composition:

- A **weak acid** (HA) and its **conjugate base** (A⁻), or
- A **weak base** (B) and its **conjugate acid** (BH⁺)

The two components work together as a matched pair. When acid is added, the conjugate base neutralizes it. When base is added, the weak acid neutralizes it. The key insight is that both partners must be present in significant concentrations — a solution of just acetic acid is NOT a buffer, but a mixture of acetic acid and sodium acetate IS a buffer.

Common buffer systems:

| Buffer System | Weak Acid | Conjugate Base | Useful pH Range |
|--------------|-----------|----------------|-----------------|
| Acetate buffer | $\ce{CH3COOH}$ ($pK_a = 4.74$) | $\ce{CH3COO-}$ | 3.7–5.8 |
| Phosphate buffer | $\ce{H2PO4-}$ ($pK_a = 7.21$) | $\ce{HPO4^{2-}}$ | 6.2–8.2 |
| Carbonate buffer | $\ce{H2CO3}$ ($pK_a = 6.35$) | $\ce{HCO3-}$ | 5.4–7.4 |
| Ammonia buffer | $\ce{NH4+}$ ($pK_a = 9.25$) | $\ce{NH3}$ | 8.3–10.3 |
| TRIS buffer | $\ce{TRISH+}$ ($pK_a = 8.06$) | $\ce{TRIS}$ | 7.1–9.1 |

### The Henderson-Hasselbalch Equation

The **Henderson-Hasselbalch equation** gives the pH of a buffer directly from the $pK_a$ and the ratio of conjugate base to acid concentrations:

$$\text{pH} = pK_a + \log\frac{[\ce{A-}]}{[\ce{HA}]}$$

where $pK_a = -\log K_a$.

This equation is derived from the $K_a$ expression. Starting from:

$$K_a = \frac{[\ce{H+}][\ce{A-}]}{[\ce{HA}]}$$

Rearranging for $[\ce{H+}]$: $[\ce{H+}] = K_a \cdot \frac{[\ce{HA}]}{[\ce{A-}]}$

Taking $-\log$ of both sides:

$$\text{pH} = pK_a + \log\frac{[\ce{A-}]}{[\ce{HA}]}$$

**Three important consequences of this equation:**

- When $[\ce{A-}] = [\ce{HA}]$, the log term = 0 and $\text{pH} = pK_a$. This is the center of the buffer range.
- When $[\ce{A-}] > [\ce{HA}]$, the log term is positive and $\text{pH} > pK_a$.
- When $[\ce{A-}] < [\ce{HA}]$, the log term is negative and $\text{pH} < pK_a$.

**Example:** What is the pH of a buffer containing 0.30 M $\ce{CH3COOH}$ and 0.20 M $\ce{CH3COONa}$? ($pK_a = 4.74$)

$$\text{pH} = 4.74 + \log\frac{0.20}{0.30} = 4.74 + \log(0.667) = 4.74 + (-0.176) = 4.56$$

!!! mascot-thinking "Catalyst's Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Catalyst is thinking">
    Henderson-Hasselbalch reveals that buffer pH depends on the *ratio* of $[\ce{A-}]/[\ce{HA}]$, not on the absolute concentrations. Diluting a buffer 10-fold keeps the ratio (and thus the pH) the same! This is why buffered biological fluids maintain their pH even as the cell volume changes.

### How Buffers Resist pH Change

To understand *why* buffers work, let's trace what happens when we add a strong acid to an acetate buffer ($\ce{CH3COOH}$ / $\ce{CH3COO-}$):

Adding $\ce{HCl}$:

$$\ce{CH3COO- (aq) + H+ (aq) -> CH3COOH (aq)}$$

The added $\ce{H+}$ is consumed by the conjugate base ($\ce{CH3COO-}$), which converts to more weak acid. $[\ce{A-}]$ decreases and $[\ce{HA}]$ increases — but since both change by the same amount, the *ratio* barely shifts, and pH barely changes.

Adding $\ce{NaOH}$:

$$\ce{CH3COOH (aq) + OH- (aq) -> CH3COO- (aq) + H2O (l)}$$

The added $\ce{OH-}$ is consumed by the weak acid, which converts to more conjugate base. Again the ratio shifts only slightly.

**Worked example — adding strong base to a buffer:**

A buffer contains 0.500 mol $\ce{CH3COOH}$ and 0.500 mol $\ce{CH3COO-}$ in 1.00 L. What is the pH after adding 0.100 mol $\ce{NaOH}$? ($pK_a = 4.74$)

Before addition: $[\ce{HA}] = 0.500$ M, $[\ce{A-}] = 0.500$ M, pH = 4.74

After addition:

- $\ce{HA}$ consumed: $0.500 - 0.100 = 0.400$ mol
- $\ce{A-}$ produced: $0.500 + 0.100 = 0.600$ mol

$$\text{pH} = 4.74 + \log\frac{0.600}{0.400} = 4.74 + \log(1.50) = 4.74 + 0.176 = 4.92$$

The pH rose only 0.18 units despite adding a significant amount of strong base.

### Buffer Capacity

**Buffer capacity** is the amount of strong acid or strong base a buffer can absorb before its pH changes significantly (typically defined as more than 1 pH unit). Buffer capacity depends on:

1. **Total concentration of buffer components:** Higher concentrations = greater capacity. A 1.0 M acetate buffer can absorb far more acid/base than a 0.010 M one.

2. **Ratio of $[\ce{A-}]/[\ce{HA}]$:** The buffer is most capable when the ratio is near 1:1 (pH ≈ $pK_a$). An extreme ratio (like 10:1 or 1:10) has limited capacity in one direction — you quickly run out of the minority component.

A buffer is generally considered effective when $0.1 \leq [\ce{A-}]/[\ce{HA}] \leq 10$, which corresponds to pH within ±1 unit of the $pK_a$. This is the **useful pH range** of a buffer.

!!! mascot-tip "Catalyst's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Catalyst shares a tip">
    When choosing a buffer for a target pH, first find a weak acid whose $pK_a$ is within 1 unit of your target pH. Then use Henderson-Hasselbalch to calculate the exact ratio of conjugate base to acid needed. This two-step approach works every time on AP exam problems.

### Buffer Preparation

To prepare a buffer at a specific target pH, you have two approaches:

**Method 1 — Direct mixing:** Calculate the required mole ratio of weak acid to conjugate base using Henderson-Hasselbalch, then weigh out the two components.

**Method 2 — Partial neutralization:** Start with the weak acid alone, then add a calculated amount of strong base to convert some of the acid to its conjugate base.

**Example:** Prepare 500 mL of a pH 5.00 acetate buffer ($pK_a = 4.74$) using acetic acid and $\ce{NaOH}$.

Step 1 — find the required ratio:

$$5.00 = 4.74 + \log\frac{[\ce{A-}]}{[\ce{HA}]}$$

$$\log\frac{[\ce{A-}]}{[\ce{HA}]} = 0.26 \implies \frac{[\ce{A-}]}{[\ce{HA}]} = 10^{0.26} = 1.82$$

So the ratio of acetate to acetic acid must be 1.82:1. If you start with 1.00 mol $\ce{CH3COOH}$ and add $x$ mol $\ce{NaOH}$:

$$\frac{x}{1.00 - x} = 1.82 \implies x = 0.645 \text{ mol NaOH needed}$$

#### Diagram: Buffer pH Interactive Calculator

<details markdown="1">
<summary>Henderson-Hasselbalch Buffer Calculator MicroSim</summary>
Type: microsim
**sim-id:** buffer-ph-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will be able to (Applying) use the Henderson-Hasselbalch equation to calculate buffer pH and determine required component ratios for target pH values.

**Canvas:** 820 × 560 px, responsive to window resize.

**Layout — two panels side by side:**

Left panel "Calculate pH from composition":
- Dropdown: Select buffer system (Acetate pKa 4.74 | Phosphate pKa 7.21 | Ammonia pKa 9.25 | Custom)
- If Custom: input field for pKa
- Slider: [HA] from 0.01 to 1.00 M (step 0.01)
- Slider: [A⁻] from 0.01 to 1.00 M (step 0.01)
- Display: Ratio [A⁻]/[HA] = X.XX, pH = X.XX (large, color-coded)
- A mini bar diagram showing the relative amounts of HA (orange) and A⁻ (blue)

Right panel "Calculate ratio for target pH":
- Dropdown: same buffer selector
- Slider: Target pH (range pKa ± 2, step 0.05)
- Display: Required [A⁻]/[HA] = X.XX
- Display: "If starting with 1.00 mol HA, add X.XX mol NaOH"
- Display: "Effective buffer range: pKa ± 1 = X.XX to X.XX"
- Warning text in red if target pH is outside pKa ± 1 range

Bottom: A horizontal number line showing pH 0–14 with the selected pKa marked and the effective buffer range highlighted in green.

Implementation: p5.js with createDropdown(), createSlider() DOM elements. All calculations update in real time.
</details>

<iframe src="../../sims/buffer-ph-calculator/main.html" height="782px" width="100%" scrolling="no"></iframe>

## Acid-Base Titrations

### What Is a Titration?

An **acid-base titration** is a laboratory technique for determining the unknown concentration of an acid or base by slowly adding a solution of known concentration (the **titrant**) from a burette into the unknown solution (the **analyte**), until the reaction is exactly complete (the **equivalence point**).

Key terms:

- **Titrant:** Solution of known concentration added from the burette
- **Analyte:** The solution whose concentration is being determined
- **Equivalence point:** The point at which stoichiometric amounts of acid and base have been mixed (moles acid = moles base for monoprotic systems)
- **Indicator:** A weak acid that changes color near the equivalence point, used to detect when it is reached
- **End point:** The visible color change of the indicator (ideally coincides with the equivalence point)

The central calculation at the equivalence point:

$$n_{\text{acid}} = n_{\text{base}}$$

$$C_a V_a = C_b V_b$$

(for monoprotic acids and bases)

### Neutralization Reactions and Net Ionic Equations

Every acid-base titration involves a neutralization reaction. The complete ionic and net ionic equations depend on the strength of the acid and base.

**Strong acid + strong base:**

$$\ce{HCl (aq) + NaOH (aq) -> NaCl (aq) + H2O (l)}$$

Net ionic: $\ce{H+ (aq) + OH- (aq) -> H2O (l)}$

**Weak acid + strong base:**

$$\ce{CH3COOH (aq) + NaOH (aq) -> CH3COONa (aq) + H2O (l)}$$

Net ionic: $\ce{CH3COOH (aq) + OH- (aq) -> CH3COO- (aq) + H2O (l)}$

**Strong acid + weak base:**

$$\ce{HCl (aq) + NH3 (aq) -> NH4Cl (aq)}$$

Net ionic: $\ce{H+ (aq) + NH3 (aq) -> NH4+ (aq)}$

### Strong Acid–Strong Base Titration

When a strong acid is titrated with a strong base (or vice versa), the titration curve has these characteristic features:

- **Before equivalence point:** pH determined by excess strong acid
- **At equivalence point:** pH = 7.00 exactly (at 25°C) — the solution is just water plus a neutral salt
- **After equivalence point:** pH determined by excess strong base

The curve shows a very steep, nearly vertical region around the equivalence point spanning roughly pH 3 to pH 11 with a tiny addition of base. This steep region means many indicators work for strong acid-strong base titrations.

**Calculation example — titrating 25.0 mL of 0.100 M $\ce{HCl}$ with 0.100 M $\ce{NaOH}$:**

Equivalence point volume of $\ce{NaOH}$:

$$V_b = \frac{C_a V_a}{C_b} = \frac{(0.100)(25.0)}{0.100} = 25.0 \text{ mL}$$

At 10.0 mL added $\ce{NaOH}$:

- Moles $\ce{HCl}$ original: $(0.100)(0.0250) = 2.50 \times 10^{-3}$ mol
- Moles $\ce{NaOH}$ added: $(0.100)(0.0100) = 1.00 \times 10^{-3}$ mol
- Excess $\ce{HCl}$: $1.50 \times 10^{-3}$ mol in $(25.0 + 10.0) = 35.0$ mL total
- $[\ce{H+}] = \frac{1.50 \times 10^{-3}}{0.0350} = 0.0429$ M; pH = 1.37

!!! mascot-encourage "You've Got This!"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Catalyst encourages you">
    Titration curve calculations can feel overwhelming because the approach changes at every region of the curve. The key is to identify *which region* you're in first — before equivalence point, at the equivalence point, or after — then apply the right method. Take it one region at a time!

### Weak Acid–Strong Base Titration

Titrating a weak acid with a strong base produces a more complex and informative curve. The key regions are:

**1. Before any base is added:** Pure weak acid — use ICE table with $K_a$

**2. Buffer region (before equivalence point):** Mixture of weak acid and its conjugate base — use Henderson-Hasselbalch. This is the longest portion of the curve, and the pH climbs gradually.

**3. Half-equivalence point:** When exactly half the acid has been neutralized, $[\ce{HA}] = [\ce{A-}]$, so the log term = 0 and:

$$\text{pH} = pK_a \quad \text{(at the half-equivalence point)}$$

This is extremely useful for determining $K_a$ of an unknown weak acid experimentally — just read the pH at the half-equivalence point.

**4. At the equivalence point:** All weak acid has been converted to conjugate base $\ce{A-}$. The solution is now a weak base, so pH > 7. Calculate using $K_b = K_w / K_a$.

**5. After equivalence point:** Excess strong base dominates; same calculation as the strong acid-strong base case.

| Region | What's present | Method |
|--------|---------------|--------|
| Initial | Weak acid only | ICE table with $K_a$ |
| Before equivalence | HA + A⁻ mixture | Henderson-Hasselbalch |
| Half-equivalence | [HA] = [A⁻] | pH = $pK_a$ |
| Equivalence | A⁻ only (weak base) | ICE with $K_b = K_w/K_a$ |
| Past equivalence | Excess strong base | $[\ce{OH-}]$ from excess base |

!!! mascot-warning "Watch Out!"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Catalyst warns you">
    For a weak acid-strong base titration, the equivalence point pH is **greater than 7**, not equal to 7. Students often assume all equivalence points are at pH 7 — that's only true for strong acid-strong base! The conjugate base at the equivalence point is a weak base and produces $\ce{OH-}$, pushing pH above 7.

**Worked example — weak acid-strong base titration:**

Titrate 25.0 mL of 0.100 M acetic acid ($K_a = 1.8 \times 10^{-5}$) with 0.100 M $\ce{NaOH}$.

*At the equivalence point* (25.0 mL $\ce{NaOH}$ added):

- All acetic acid → acetate: $[\ce{CH3COO-}] = \frac{(0.100)(0.0250)}{0.0500} = 0.0500$ M
- $K_b(\ce{CH3COO-}) = \frac{1.0 \times 10^{-14}}{1.8 \times 10^{-5}} = 5.6 \times 10^{-10}$
- $x^2 = (5.6 \times 10^{-10})(0.0500) = 2.8 \times 10^{-11}$
- $[\ce{OH-}] = x = 5.3 \times 10^{-6}$ M
- $\text{pOH} = 5.28$; $\text{pH} = 14.00 - 5.28 = \boxed{8.72}$

### Strong Acid–Weak Base Titration

When a strong acid titrates a weak base (e.g., titrating $\ce{NH3}$ with $\ce{HCl}$), the curve is the mirror image of the weak acid-strong base case:

- The equivalence point pH is **below 7** (the conjugate acid $\ce{BH+}$ is acidic)
- The half-equivalence point gives $\text{pH} = pK_a(\ce{BH+})$, which equals $14 - pK_b(\ce{B})$
- The buffer region lies below pH 7

#### Diagram: Titration Curve Comparison MicroSim

<details markdown="1">
<summary>Interactive Titration Curve Explorer</summary>
Type: microsim
**sim-id:** titration-curve-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will be able to (Analyzing) interpret features of an acid-base titration curve including equivalence point, half-equivalence point, buffer region, and steep jump, and predict how the curve shape changes with acid/base strength.

**Canvas:** 860 × 600 px, responsive to window resize.

**Controls (left sidebar, 200 px wide):**
- Radio buttons: "Titration type":
  - Strong acid + Strong base (selected by default)
  - Weak acid + Strong base
  - Strong acid + Weak base
- Slider: Analyte concentration $C_a$ (0.010–0.200 M)
- Slider: Titrant concentration $C_b$ (0.010–0.200 M)
- Slider: Analyte volume $V_a$ (10–50 mL)
- For weak acid/base options: Slider for $pK_a$ (3.0–11.0, step 0.1)

**Plot area (right, ~650 px wide):**
- X-axis: Volume of titrant added (mL), from 0 to 1.5× equivalence volume
- Y-axis: pH 0–14
- Drawn curve: smooth sigmoidal curve calculated point-by-point using the appropriate formula for each region
- Labeled annotation points:
  - Open circle at initial pH with "Initial pH = X.XX"
  - Star at equivalence point with "Equiv. Pt: X.XX mL, pH X.XX"
  - Triangle at half-equivalence point (for weak systems) with "½-equiv: pH = pKa = X.XX"
  - Bracket spanning the buffer region (for weak systems) labeled "Buffer Region"
  - Shaded vertical band around the equivalence point showing the steep jump
- A vertical dashed line at the equivalence point volume

**Indicator display panel (below plot):**
- Show 3–4 colored bars representing common indicators (phenolphthalein, methyl orange, bromothymol blue, litmus) with their pH transition ranges
- Highlight which indicator(s) overlap the steep jump region — these are suitable for this titration
- Label unsuitable indicators with an "✗"

**Real-time update:** All elements recalculate and redraw as sliders move.

Implementation: p5.js with DOM controls. pH calculated using exact formulas for each region (buffer region uses HH, equivalence uses Kb ICE, post-equivalence uses excess base). Smooth curve drawn using 200 equally-spaced volume points.
</details>

<iframe src="../../sims/titration-curve-explorer/main.html" height="842px" width="100%" scrolling="no"></iframe>

### Titration Curve Analysis

A titration curve is a graph of pH (y-axis) vs. volume of titrant added (x-axis). From the curve you can read:

**For all titration types:**

- **Equivalence point:** Located at the steepest point of the curve (the inflection point). For a weak acid-strong base titration, this is above pH 7.
- **Volume at equivalence:** Used to calculate the unknown concentration.

**For weak acid-strong base only:**

- **Half-equivalence point:** Located at exactly half the equivalence volume. The pH at this point equals the $pK_a$ of the weak acid.
- **Buffer region:** The relatively flat portion of the curve before the equivalence point where the solution acts as a buffer.
- **Buffer slope:** The flatter the curve in this region, the better the buffer capacity.

The shape of the steep jump around the equivalence point determines which indicators will work:

- Large steep jump (≥ 6 pH units): many indicators work (strong-strong titration)
- Smaller steep jump (weak-strong titrations): must choose carefully

### Indicators and Their Selection

An **acid-base indicator** is itself a weak acid (HIn) that has a different color from its conjugate base (In⁻). The color change occurs over a range of approximately $pK_{\text{In}} \pm 1$.

$$\ce{HIn (aq) <=> H+ (aq) + In- (aq)}$$

When pH < $pK_{\text{In}} - 1$: the acid form (HIn) dominates → one color
When pH > $pK_{\text{In}} + 1$: the base form (In⁻) dominates → other color

**Common indicators:**

| Indicator | pH Range | Acid Color | Base Color |
|-----------|---------|------------|------------|
| Methyl orange | 3.1–4.4 | Red | Yellow |
| Methyl red | 4.4–6.2 | Red | Yellow |
| Bromothymol blue | 6.0–7.6 | Yellow | Blue |
| Phenolphthalein | 8.2–10.0 | Colorless | Pink |
| Alizarin yellow | 10.1–12.0 | Yellow | Red |

**Selecting the right indicator:**

The indicator's transition range must overlap with the steep portion of the titration curve:

- Strong acid-strong base: steep jump spans ~pH 3–11. Almost any indicator works. Phenolphthalein (8.2–10.0) and methyl orange (3.1–4.4) are both commonly used.
- Weak acid-strong base: equivalence point above pH 7 (typically pH 8–10). Use **phenolphthalein**.
- Strong acid-weak base: equivalence point below pH 7 (typically pH 4–6). Use **methyl orange** or **methyl red**.

!!! mascot-thinking "Catalyst's Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Catalyst is thinking">
    Indicator selection is really about matching the indicator's color-change range to where the equivalence point falls. If the equivalence point is at pH 8.72 (weak acid-strong base), you need an indicator that changes color near pH 9, not pH 4. Always locate the equivalence point pH first, then choose your indicator.

## Calculating pH in Dilute and Mixed Solutions

### Dilute Acid Calculations

For very dilute strong acid solutions (below about $10^{-6}$ M), the contribution of $\ce{H+}$ from the autoionization of water becomes significant and cannot be ignored. In these cases:

$$[\ce{H+}]_{\text{total}} = [\ce{H+}]_{\text{acid}} + [\ce{H+}]_{\text{water}}$$

At extreme dilution, the solution approaches pH 7 (not pH > 7), because the acid contribution becomes negligible compared to water autoionization. This explains why even a strong acid cannot produce a solution with pH > 7 simply by dilution.

### pH of Mixed Solutions

When two solutions are mixed (e.g., strong acid + strong base in unequal amounts), calculate the pH by:

1. Calculate moles of each species: $n = C \times V$
2. Determine which is in excess and by how much
3. Calculate the concentration of excess species in the total volume: $C = n / V_{\text{total}}$
4. Calculate pH from that concentration

**Example:** Mix 30.0 mL of 0.100 M $\ce{HCl}$ with 20.0 mL of 0.100 M $\ce{NaOH}$.

- Moles $\ce{HCl}$: $(0.100)(0.0300) = 3.00 \times 10^{-3}$ mol
- Moles $\ce{NaOH}$: $(0.100)(0.0200) = 2.00 \times 10^{-3}$ mol
- Excess $\ce{HCl}$: $1.00 \times 10^{-3}$ mol
- Total volume: $30.0 + 20.0 = 50.0$ mL = 0.0500 L
- $[\ce{H+}] = 1.00 \times 10^{-3} / 0.0500 = 0.0200$ M
- pH = $-\log(0.0200) = 1.70$

The same approach applies for mixing weak acid/base solutions — but the calculation becomes an ICE table problem after determining the buffer-region composition.

## Summary

This chapter built on the acid-base foundations from Chapter 16 to master two essential tools: buffers and titrations.

**Buffers:**

- Composition: weak acid + conjugate base (or weak base + conjugate acid)
- pH calculated by Henderson-Hasselbalch: $\text{pH} = pK_a + \log[\ce{A-}]/[\ce{HA}]$
- Buffer capacity increases with total concentration and is greatest when $[\ce{A-}] = [\ce{HA}]$ (pH = $pK_a$)
- Effective range: $pK_a \pm 1$ pH unit
- Design rule: choose an acid with $pK_a$ within 1 unit of target pH

**Titrations:**

- Equivalence point: stoichiometric amounts of acid and base have reacted
- Strong acid-strong base: equivalence point at pH 7, large steep jump
- Weak acid-strong base: equivalence point above pH 7; pH = $pK_a$ at half-equivalence
- Strong acid-weak base: equivalence point below pH 7
- Indicator selection: transition range must overlap the steep equivalence-point jump

**Key relationships:**

- At half-equivalence point of any weak acid titration: $\text{pH} = pK_a$
- Neutralization: $n_{\text{acid}} = n_{\text{base}}$ → $C_a V_a = C_b V_b$
- Net ionic equation for strong-strong: $\ce{H+ + OH- -> H2O}$

!!! mascot-celebration "Great Work, Chemists!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Catalyst celebrates">
    You've now mastered the complete acid-base toolkit — from definitions and pH, all the way through buffers and titration curves. These skills appear on virtually every AP Chemistry exam and are fundamental to biochemistry, environmental science, and analytical chemistry. Chapter 18 brings an entirely new kind of chemistry: electrochemistry, where chemical reactions generate electricity!
