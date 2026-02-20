---
title: "Chapter 16: Acid-Base Theory and pH"
description: Covers acid-base theories (Arrhenius, Bronsted-Lowry, Lewis), conjugate pairs, pH and pOH calculations, Ka and Kb, polyprotic acids, salt hydrolysis, and buffer solutions.
generated_by: claude skill chapter-content-generator
date: 2026-02-20 12:07:12
version: 0.04
---

# Chapter 16: Acid-Base Theory and pH

!!! mascot-welcome "Welcome, Scientists!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Catalyst welcomes you">
    Acids and bases are everywhere — in your stomach, your cleaning products, your blood, and even your DNA! This chapter unlocks one of chemistry's most powerful frameworks for understanding how these substances behave and react. Let's react!

## Introduction

Acid-base chemistry is one of the most practically important areas of chemistry. Your stomach uses hydrochloric acid ($\ce{HCl}$) to digest food. Baking soda ($\ce{NaHCO3}$) neutralizes excess stomach acid. Soap works because of basic chemistry. Rain becomes acidic from dissolved $\ce{CO2}$. Even your blood relies on a delicate acid-base balance — a shift of just 0.3 pH units can be life-threatening.

But what exactly *is* an acid? What is a base? And how do chemists measure and calculate the acidic or basic character of a solution? In this chapter, you'll learn three major theories that describe acids and bases, discover how to quantify acidity using the pH scale, and develop powerful mathematical tools for calculating pH from first principles.

The journey takes us from simple definitions to calculating the pH of complex mixtures. Along the way you will encounter some of the most elegant mathematics in all of chemistry — and develop an intuition for how acidity affects chemical behavior in living systems, industry, and the environment.

## Three Theories of Acids and Bases

Chemists have developed three increasingly general theories to explain acid-base behavior. Each theory works for a different range of reactions — and each one builds on the one before it.

### The Arrhenius Theory

The first modern acid-base theory was proposed by Swedish chemist Svante Arrhenius in 1884. The Arrhenius definitions are simple and work well for aqueous (water-based) solutions:

- An **Arrhenius acid** is a substance that produces hydrogen ions ($\ce{H+}$) when dissolved in water.
- An **Arrhenius base** is a substance that produces hydroxide ions ($\ce{OH-}$) when dissolved in water.

Classic examples:

$$\ce{HCl (aq) -> H+ (aq) + Cl- (aq)}$$

$$\ce{NaOH (aq) -> Na+ (aq) + OH- (aq)}$$

Arrhenius's theory explained neutralization neatly: when an acid and a base react, the $\ce{H+}$ and $\ce{OH-}$ combine to form water.

$$\ce{H+ (aq) + OH- (aq) -> H2O (l)}$$

The limitation of the Arrhenius theory is that it only applies to reactions *in water* and requires $\ce{OH-}$ as the base. This is too restrictive — many substances behave as bases without containing hydroxide at all.

### The Brønsted-Lowry Theory

In 1923, Johannes Brønsted (Denmark) and Thomas Lowry (England) independently proposed a broader definition:

- A **Brønsted-Lowry acid** is a **proton donor** — any species that can give away an $\ce{H+}$.
- A **Brønsted-Lowry base** is a **proton acceptor** — any species that can receive an $\ce{H+}$.

This definition works in *any* solvent, not just water. Consider the reaction of ammonia with water:

$$\ce{NH3 (aq) + H2O (l) <=> NH4+ (aq) + OH- (aq)}$$

Here water donates a proton to ammonia — water is acting as the Brønsted-Lowry acid, and ammonia is the Brønsted-Lowry base. Notice that this reaction is an equilibrium; it proceeds in both directions simultaneously.

!!! mascot-thinking "Catalyst's Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Catalyst is thinking">
    Every Brønsted-Lowry acid-base reaction is really a *competition for protons*. The stronger partner wins the proton — and this competition determines whether a reaction favors the forward or reverse direction.

### Conjugate Acid-Base Pairs

A key feature of Brønsted-Lowry theory is the concept of **conjugate acid-base pairs**. When an acid donates a proton, what remains is a **conjugate base**. When a base accepts a proton, what forms is a **conjugate acid**.

In the ammonia example above:

- $\ce{NH3}$ (base) accepts $\ce{H+}$ → forms $\ce{NH4+}$ (conjugate acid of $\ce{NH3}$)
- $\ce{H2O}$ (acid) donates $\ce{H+}$ → forms $\ce{OH-}$ (conjugate base of $\ce{H2O}$)

The pairs are: ($\ce{H2O}$ / $\ce{OH-}$) and ($\ce{NH4+}$ / $\ce{NH3}$). Conjugate pairs differ by exactly one proton ($\ce{H+}$).

| Species | Role | Conjugate Partner |
|---------|------|------------------|
| $\ce{HCl}$ | Acid | $\ce{Cl-}$ (conjugate base) |
| $\ce{Cl-}$ | Conjugate base | $\ce{HCl}$ (acid) |
| $\ce{NH3}$ | Base | $\ce{NH4+}$ (conjugate acid) |
| $\ce{NH4+}$ | Conjugate acid | $\ce{NH3}$ (base) |
| $\ce{H2O}$ | Acid or base | $\ce{OH-}$ or $\ce{H3O+}$ |

### Amphiprotic Substances

Some species can act as *either* an acid or a base, depending on the reaction partner. These are called **amphiprotic** (or amphoteric) substances. Water is the most famous example:

- Water as an acid: $\ce{H2O + NH3 -> OH- + NH4+}$ (donates $\ce{H+}$)
- Water as a base: $\ce{H2O + HCl -> H3O+ + Cl-}$ (accepts $\ce{H+}$)

Other amphiprotic species include bicarbonate ion ($\ce{HCO3-}$), the amino acid glycine, and the hydrogen phosphate ion ($\ce{HPO4^{2-}}$).

### The Lewis Theory

Gilbert Lewis proposed the most general acid-base theory in 1923 (the same year as Brønsted-Lowry):

- A **Lewis acid** is an **electron-pair acceptor**.
- A **Lewis base** is an **electron-pair donor**.

Lewis theory captures reactions where no proton transfer occurs at all. For example:

$$\ce{BF3 + :NH3 -> F3B-NH3}$$

$\ce{BF3}$ has an empty p-orbital and accepts the lone pair from $\ce{NH3}$. No $\ce{H+}$ is transferred — yet this is still an acid-base reaction by Lewis's definition.

Every Brønsted-Lowry acid-base reaction is also a Lewis acid-base reaction (the proton $\ce{H+}$ is an excellent Lewis acid). But Lewis theory also includes metal-ligand bonding, coordination chemistry, and many organic reactions that have no $\ce{H+}$ at all.

| Theory | Acid | Base | Scope |
|--------|------|------|-------|
| Arrhenius | Produces $\ce{H+}$ in water | Produces $\ce{OH-}$ in water | Aqueous only |
| Brønsted-Lowry | Proton donor | Proton acceptor | Any solvent |
| Lewis | Electron-pair acceptor | Electron-pair donor | Broadest |

#### Diagram: Acid-Base Theory Venn Diagram

<details markdown="1">
<summary>Three Acid-Base Theories — Scope Comparison</summary>
Type: diagram
**sim-id:** acid-base-theory-venn<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Create a conceptual diagram showing three nested rectangles representing the three acid-base theories by scope:

Outermost rectangle (light gray background): "Lewis Theory — Electron-pair transfer (broadest scope)" — contains ALL acid-base reactions including metal-ligand complexes, $\ce{BF3}$/$\ce{NH3}$, and all reactions below.

Middle rectangle (light blue background): "Brønsted-Lowry Theory — Proton transfer (any solvent)" — contains reactions with proton donors and acceptors, including the Arrhenius subset. Examples: $\ce{NH3 + H2O}$, $\ce{HF + H2O}$.

Innermost rectangle (light green background): "Arrhenius Theory — $\ce{H+}$ / $\ce{OH-}$ in water (narrowest scope)" — only aqueous reactions. Examples: $\ce{HCl}$ → $\ce{H+}$, $\ce{NaOH}$ → $\ce{OH-}$.

Each rectangle has a label in the top-left corner and 2-3 example reactions. Color scheme: outer = light gray (#f5f5f5), middle = light blue (#e8f4fd), inner = light green (#e8f8e8). Use clear, readable fonts. Width 800px, height 450px. Add a title at the top: "Scope of Acid-Base Theories".

Implementation: Mermaid diagram or static SVG-style HTML representation
</details>

## Autoionization of Water and the pH Scale

### Autoionization of Water

Pure water is not completely non-conducting. Water molecules spontaneously transfer protons to each other in a process called **autoionization** (or self-ionization):

$$\ce{H2O (l) + H2O (l) <=> H3O+ (aq) + OH- (aq)}$$

This equilibrium lies far to the left — only a tiny fraction of water molecules ionize at any given moment. The equilibrium expression for this reaction is the **ion product of water**, $K_w$:

$$K_w = [\ce{H3O+}][\ce{OH-}]$$

At 25°C, $K_w = 1.0 \times 10^{-14}$. This is one of the most important constants in all of acid-base chemistry.

In pure water at 25°C, $[\ce{H3O+}] = [\ce{OH-}] = 1.0 \times 10^{-7}$ M.

$K_w$ changes with temperature — it increases as temperature rises (the autoionization equilibrium is endothermic). At body temperature (37°C), $K_w \approx 2.4 \times 10^{-14}$.

Chemists often write $\ce{H+}$ and $\ce{H3O+}$ interchangeably. Strictly speaking, a bare proton doesn't exist in water — it's always attached to water as the hydronium ion $\ce{H3O+}$. Both notations appear in textbooks and are equivalent.

### The pH Scale

Because $[\ce{H3O+}]$ in most aqueous solutions spans many orders of magnitude (from roughly $10^{-1}$ to $10^{-14}$ M), chemists use a logarithmic scale called **pH**:

$$\text{pH} = -\log_{10}[\ce{H3O+}]$$

Similarly, **pOH** is defined as:

$$\text{pOH} = -\log_{10}[\ce{OH-}]$$

Taking the negative log of $K_w = [\ce{H3O+}][\ce{OH-}] = 1.0 \times 10^{-14}$ gives the fundamental relationship:

$$\text{pH} + \text{pOH} = 14.00 \quad \text{(at 25°C)}$$

This relationship is extremely useful — if you know pH, you instantly know pOH, and vice versa.

| pH | $[\ce{H3O+}]$ (M) | Classification |
|----|-------------------|----------------|
| 0 | $1.0 \times 10^{0}$ | Strongly acidic |
| 3 | $1.0 \times 10^{-3}$ | Moderately acidic |
| 7 | $1.0 \times 10^{-7}$ | Neutral (25°C) |
| 11 | $1.0 \times 10^{-11}$ | Moderately basic |
| 14 | $1.0 \times 10^{-14}$ | Strongly basic |

A solution is:

- **Acidic** when $[\ce{H3O+}] > [\ce{OH-}]$, i.e., pH < 7
- **Neutral** when $[\ce{H3O+}] = [\ce{OH-}]$, i.e., pH = 7
- **Basic** when $[\ce{H3O+}] < [\ce{OH-}]$, i.e., pH > 7

!!! mascot-tip "Catalyst's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Catalyst shares a tip">
    Memorize this: each whole-number change in pH represents a **10-fold change** in $[\ce{H+}]$. A solution at pH 3 has 100 times the $[\ce{H+}]$ of a solution at pH 5. This makes pH an incredibly efficient way to describe huge ranges of acidity.

#### Diagram: Interactive pH Scale Explorer

<details markdown="1">
<summary>pH Scale MicroSim Specification</summary>
Type: microsim
**sim-id:** ph-scale-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will be able to (Applying) use the pH scale to determine relative acidity of common substances and convert between pH, pOH, $[\ce{H+}]$, and $[\ce{OH-}]$.

**Canvas:** 800 × 500 px, responsive to window resize.

**Visual layout:**
- Top 40%: Horizontal pH scale bar, pH 0–14, colored as a gradient from red (0) through orange, yellow, green (7), cyan, blue, to purple (14). Label tick marks at every whole pH unit.
- 10–15 labeled "pins" on the scale showing real-world substances: gastric acid (pH 1.5), lemon juice (2.4), coffee (5.0), rainwater (5.6), milk (6.5), pure water (7.0), blood (7.4), seawater (8.1), baking soda (8.3), ammonia (11.6), bleach (12.5), drain cleaner (13.5).
- Each pin is a small circle with a downward pointer and a text label below the scale. Alternate labels above/below to avoid overlap.

**Interactive controls (bottom 40%):**
- Slider labeled "pH:" from 0 to 14 (step 0.1). Moving the slider moves a vertical cursor line on the scale.
- Display panel (right side) shows:
  - Current pH value (large, colored to match scale gradient)
  - $[\ce{H+}]$ = computed value in scientific notation
  - $[\ce{OH-}]$ = computed value in scientific notation
  - pOH = computed value
  - Classification: "Strongly Acidic" / "Weakly Acidic" / "Neutral" / "Weakly Basic" / "Strongly Basic"

**Computations:**
- $[\ce{H+}] = 10^{-\text{pH}}$
- $[\ce{OH-}] = 10^{-(14 - \text{pH})}$
- pOH = 14 - pH

**Color:** The cursor line and display text color matches the gradient hue at the current pH.

Implementation: p5.js with a createSlider() control. Gradient drawn with lerpColor() or a pre-computed color array.
</details>

## Strong Acids and Bases

### Strong Acids

A **strong acid** is one that ionizes completely (100%) in water. There are only six common strong acids to memorize:

- Hydrochloric acid: $\ce{HCl}$
- Hydrobromic acid: $\ce{HBr}$
- Hydroiodic acid: $\ce{HI}$
- Nitric acid: $\ce{HNO3}$
- Sulfuric acid (first ionization): $\ce{H2SO4}$
- Perchloric acid: $\ce{HClO4}$

Because strong acids ionize completely, calculating the pH is straightforward. If you dissolve a strong acid to concentration $C_a$:

$$[\ce{H3O+}] = C_a$$

$$\text{pH} = -\log C_a$$

**Example:** What is the pH of 0.050 M $\ce{HCl}$?

$$[\ce{H3O+}] = 0.050 \text{ M} = 5.0 \times 10^{-2} \text{ M}$$

$$\text{pH} = -\log(5.0 \times 10^{-2}) = -(\log 5.0 + \log 10^{-2}) = -(0.699 - 2) = 1.30$$

### Strong Bases

A **strong base** ionizes (or dissociates) completely in water. The common strong bases are the Group 1 and Group 2 metal hydroxides:

- Lithium hydroxide: $\ce{LiOH}$
- Sodium hydroxide: $\ce{NaOH}$
- Potassium hydroxide: $\ce{KOH}$
- Barium hydroxide: $\ce{Ba(OH)2}$
- Calcium hydroxide: $\ce{Ca(OH)2}$

For a strong base at concentration $C_b$ that releases one $\ce{OH-}$ per formula unit:

$$[\ce{OH-}] = C_b$$

$$\text{pOH} = -\log C_b$$

$$\text{pH} = 14.00 - \text{pOH}$$

**Example:** What is the pH of 0.020 M $\ce{NaOH}$?

$$[\ce{OH-}] = 0.020 \text{ M}$$

$$\text{pOH} = -\log(0.020) = 1.70$$

$$\text{pH} = 14.00 - 1.70 = 12.30$$

Note: $\ce{Ba(OH)2}$ releases *two* $\ce{OH-}$ per formula unit, so $[\ce{OH-}] = 2C_b$.

!!! mascot-warning "Watch Out!"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Catalyst warns you">
    A very common mistake is forgetting to multiply by 2 for diprotic strong bases like $\ce{Ba(OH)2}$. For 0.010 M $\ce{Ba(OH)2}$, $[\ce{OH-}] = 0.020$ M — not 0.010 M. Always check the number of $\ce{OH-}$ ions per formula unit before calculating!

## Weak Acids and the Acid Dissociation Constant

### Weak Acids

A **weak acid** is one that only *partially* ionizes in water. The vast majority of acids are weak. The ionization is an equilibrium:

$$\ce{HA (aq) + H2O (l) <=> H3O+ (aq) + A- (aq)}$$

The equilibrium constant for this reaction is called the **acid dissociation constant**, $K_a$:

$$K_a = \frac{[\ce{H3O+}][\ce{A-}]}{[\ce{HA}]}$$

A large $K_a$ means the acid ionizes more (stronger weak acid). A small $K_a$ means less ionization (weaker weak acid).

| Acid | Formula | $K_a$ at 25°C |
|------|---------|----------------|
| Acetic acid | $\ce{CH3COOH}$ | $1.8 \times 10^{-5}$ |
| Carbonic acid | $\ce{H2CO3}$ | $4.3 \times 10^{-7}$ |
| Hypochlorous acid | $\ce{HOCl}$ | $3.0 \times 10^{-8}$ |
| Hydrofluoric acid | $\ce{HF}$ | $7.2 \times 10^{-4}$ |
| Formic acid | $\ce{HCOOH}$ | $1.8 \times 10^{-4}$ |

### Calculating pH of a Weak Acid

To find the pH of a weak acid solution, we use an **ICE table** (Initial, Change, Equilibrium):

**Example:** Find the pH of 0.100 M acetic acid ($K_a = 1.8 \times 10^{-5}$).

Let $x = [\ce{H3O+}]$ at equilibrium.

|  | $\ce{CH3COOH}$ | $\ce{H3O+}$ | $\ce{CH3COO-}$ |
|--|----------------|-------------|----------------|
| I | 0.100 | 0 | 0 |
| C | $-x$ | $+x$ | $+x$ |
| E | $0.100 - x$ | $x$ | $x$ |

Substituting into the $K_a$ expression:

$$K_a = \frac{x \cdot x}{0.100 - x} = \frac{x^2}{0.100 - x} = 1.8 \times 10^{-5}$$

Because $K_a$ is small, we can use the **small-x approximation**: if $x \ll 0.100$, then $0.100 - x \approx 0.100$:

$$x^2 \approx (1.8 \times 10^{-5})(0.100) = 1.8 \times 10^{-6}$$

$$x = \sqrt{1.8 \times 10^{-6}} = 1.34 \times 10^{-3} \text{ M}$$

Checking: $\frac{1.34 \times 10^{-3}}{0.100} = 1.34\%$ — the approximation is valid (< 5%).

$$\text{pH} = -\log(1.34 \times 10^{-3}) = 2.87$$

### Percent Ionization

**Percent ionization** expresses what fraction of the original acid has ionized at equilibrium:

$$\% \text{ ionization} = \frac{[\ce{H3O+}]_{\text{eq}}}{[\text{HA}]_{\text{initial}}} \times 100\%$$

For the acetic acid example: $\% \text{ ionization} = \frac{1.34 \times 10^{-3}}{0.100} \times 100\% = 1.34\%$

An important trend: **diluting a weak acid increases its percent ionization** — a more dilute solution has a higher fraction of the acid ionized (Le Chatelier's principle, shifting equilibrium right).

!!! mascot-encourage "You've Got This!"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Catalyst encourages you">
    ICE tables look intimidating at first, but they are just organized bookkeeping. Once you've done a few, they become second nature. The key steps are always the same: set up Initial concentrations, write the Change in terms of $x$, find Equilibrium concentrations, and substitute into $K_a$.

#### Diagram: Weak Acid ICE Table Solver MicroSim

<details markdown="1">
<summary>Interactive Weak Acid pH Calculator</summary>
Type: microsim
**sim-id:** weak-acid-ice-solver<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will be able to (Applying) set up and solve ICE tables to calculate the pH and percent ionization of a weak acid solution.

**Canvas:** 820 × 580 px, responsive to window resize.

**Input panel (top 25%):**
- Text input for initial acid concentration $C_a$ (default: 0.100 M)
- Text input for $K_a$ (default: 1.8e-5)
- Label: "Acid name (optional)" text input
- "Calculate" button

**ICE Table display (middle 40%):**
- Rendered as a formatted table with three rows (I, C, E) and three columns (HA, H3O+, A-)
- Values fill in dynamically when "Calculate" is clicked
- Highlight the equilibrium row in light yellow

**Results panel (bottom 35%):**
- Show the $K_a$ expression being solved: $K_a = x^2 / (C_a - x)$
- Display whether the small-x approximation was used (valid if $x/C_a < 5\%$)
- Display $x = [\ce{H3O+}]$ in M (scientific notation)
- Display pH (2 decimal places)
- Display pOH and $[\ce{OH-}]$
- Display % ionization
- Show a horizontal "ionization gauge" bar from 0% to 100% filled proportionally

**Error handling:** If $K_a > C_a$, display a message that the quadratic formula must be used (show the quadratic solution as well).

Implementation: p5.js with createInput() and createButton() DOM elements. Solve $x^2 + K_a x - K_a C_a = 0$ using quadratic formula always; report whether approximation would have been valid.
</details>

## Weak Bases and the Base Dissociation Constant

### Weak Bases

A **weak base** only partially accepts protons from water. The most common example is ammonia:

$$\ce{NH3 (aq) + H2O (l) <=> NH4+ (aq) + OH- (aq)}$$

The equilibrium constant is the **base dissociation constant**, $K_b$:

$$K_b = \frac{[\ce{NH4+}][\ce{OH-}]}{[\ce{NH3}]} = 1.8 \times 10^{-5}$$

To find the pH of a weak base, use the same ICE table approach — but now $x$ represents $[\ce{OH-}]$, and you finish by converting pOH to pH.

**Example:** Find the pH of 0.200 M $\ce{NH3}$ ($K_b = 1.8 \times 10^{-5}$).

$$x^2 \approx (1.8 \times 10^{-5})(0.200) = 3.6 \times 10^{-6}$$

$$x = [\ce{OH-}] = 1.90 \times 10^{-3} \text{ M}$$

$$\text{pOH} = -\log(1.90 \times 10^{-3}) = 2.72$$

$$\text{pH} = 14.00 - 2.72 = 11.28$$

### The Ka and Kb Relationship

For a conjugate acid-base pair, $K_a$ and $K_b$ are related to $K_w$:

$$K_a \times K_b = K_w = 1.0 \times 10^{-14} \quad \text{(at 25°C)}$$

This means: if you know $K_a$ for an acid, you can calculate $K_b$ for its conjugate base.

**Example:** Acetic acid has $K_a = 1.8 \times 10^{-5}$. What is $K_b$ for acetate ion ($\ce{CH3COO-}$)?

$$K_b = \frac{K_w}{K_a} = \frac{1.0 \times 10^{-14}}{1.8 \times 10^{-5}} = 5.6 \times 10^{-10}$$

This also reveals a key principle: **the stronger the acid, the weaker its conjugate base** (and vice versa). $\ce{HCl}$ (strong acid) has $\ce{Cl-}$ as an essentially non-basic conjugate base. Acetic acid (weak acid, moderate $K_a$) has acetate as a weakly basic conjugate base.

## Polyprotic Acids

Some acids can donate more than one proton. These are called **polyprotic acids**. The most common examples in AP Chemistry are:

- **Diprotic acids** (two donatable protons): $\ce{H2SO4}$, $\ce{H2CO3}$, $\ce{H2S}$
- **Triprotic acids** (three protons): $\ce{H3PO4}$

Each proton is released in a separate, sequential equilibrium step, each with its own $K_a$ value.

For carbonic acid ($\ce{H2CO3}$), the two ionization steps are:

$$\ce{H2CO3 (aq) <=> H+ (aq) + HCO3- (aq)} \quad K_{a1} = 4.3 \times 10^{-7}$$

$$\ce{HCO3- (aq) <=> H+ (aq) + CO3^{2-} (aq)} \quad K_{a2} = 4.7 \times 10^{-11}$$

**Key trend for diprotic acids:**

- $K_{a1} \gg K_{a2}$ — the first proton is always much easier to remove than the second (removing a proton from a negative ion requires working against the ion's attraction).
- The pH calculation for a dilute polyprotic acid is dominated by the *first ionization step*. The second step contributes negligibly to $[\ce{H+}]$.

| Polyprotic Acid | $K_{a1}$ | $K_{a2}$ | $K_{a3}$ |
|-----------------|----------|----------|----------|
| $\ce{H2SO4}$ | Very large (strong) | $1.2 \times 10^{-2}$ | — |
| $\ce{H2CO3}$ | $4.3 \times 10^{-7}$ | $4.7 \times 10^{-11}$ | — |
| $\ce{H3PO4}$ | $7.5 \times 10^{-3}$ | $6.2 \times 10^{-8}$ | $4.8 \times 10^{-13}$ |

## Factors Affecting Acid Strength

Why is $\ce{HCl}$ a strong acid while $\ce{HF}$ is only a weak acid? Why is $\ce{HClO4}$ stronger than $\ce{HClO}$? Acid strength is determined by how easily the $\ce{H-X}$ bond breaks and the stability of the conjugate base $\ce{X-}$.

### Binary Acid Trends

Binary acids have the form $\ce{HX}$ where X is a nonmetal. Two factors control their strength:

**Bond strength:** A weaker H—X bond makes it easier to donate the proton → stronger acid. As you go *down a group* in the periodic table, the H—X bond gets longer and weaker (larger atomic radius of X):

$$\text{Acid strength: } \ce{HF} < \ce{HCl} < \ce{HBr} < \ce{HI}$$

**Electronegativity:** As you go *across a period*, the electronegativity of X increases, making X pull electron density away from H → H is more easily donated → stronger acid:

$$\text{Acid strength: } \ce{CH4} < \ce{NH3} < \ce{H2O} < \ce{HF}$$

The bond-strength effect (going down a group) dominates over the electronegativity effect (going across a period).

### Oxyacid Strength

Oxyacids have the form $\ce{HXO_n}$ (an H attached through O to a central atom X). Their strength depends on two factors:

**Number of oxygen atoms:** More oxygens = more electron density pulled away from the O—H bond → proton more easily released → stronger acid.

$$\ce{HClO} < \ce{HClO2} < \ce{HClO3} < \ce{HClO4}$$

**Electronegativity of the central atom:** A more electronegative X pulls electron density away from O—H → stronger acid.

$$\ce{HOI} < \ce{HOBr} < \ce{HOCl}$$

The pattern is the same in both cases: anything that pulls electron density away from the O—H bond makes the acid stronger.

## Salt Hydrolysis

When a salt dissolves in water, the resulting solution may be acidic, basic, or neutral — depending on which ions are present and whether they react with water. This process is called **salt hydrolysis**.

### Neutral Salts

A salt formed from a **strong acid** and a **strong base** produces a **neutral solution** (pH = 7). Neither ion hydrolyzes because both are spectator ions.

**Example:** $\ce{NaCl}$ — from $\ce{NaOH}$ (strong base) and $\ce{HCl}$ (strong acid). $\ce{Na+}$ and $\ce{Cl-}$ do not react with water. pH = 7.

$$\ce{NaCl (aq) -> Na+ (aq) + Cl- (aq)}$$ (no hydrolysis)

### Acidic Salts

A salt from a **strong acid** and a **weak base** produces an **acidic solution** (pH < 7). The conjugate acid of the weak base hydrolyzes.

**Example:** $\ce{NH4Cl}$ — from $\ce{HCl}$ (strong) and $\ce{NH3}$ (weak base). The $\ce{NH4+}$ ion is the conjugate acid of $\ce{NH3}$:

$$\ce{NH4+ (aq) + H2O (l) <=> NH3 (aq) + H3O+ (aq)}$$

$K_a(\ce{NH4+}) = K_w / K_b(\ce{NH3}) = 1.0 \times 10^{-14} / 1.8 \times 10^{-5} = 5.6 \times 10^{-10}$

The solution is acidic because $\ce{NH4+}$ produces $\ce{H3O+}$.

### Basic Salts

A salt from a **weak acid** and a **strong base** produces a **basic solution** (pH > 7). The conjugate base of the weak acid hydrolyzes.

**Example:** $\ce{CH3COONa}$ (sodium acetate) — from $\ce{CH3COOH}$ (weak acid) and $\ce{NaOH}$ (strong base). The $\ce{CH3COO-}$ ion hydrolyzes:

$$\ce{CH3COO- (aq) + H2O (l) <=> CH3COOH (aq) + OH- (aq)}$$

$K_b(\ce{CH3COO-}) = K_w / K_a(\ce{CH3COOH}) = 1.0 \times 10^{-14} / 1.8 \times 10^{-5} = 5.6 \times 10^{-10}$

The solution is basic because $\ce{OH-}$ is produced.

| Salt Type | Origin | Ion that Hydrolyzes | Solution pH |
|-----------|--------|---------------------|-------------|
| Neutral salt | Strong acid + Strong base | None | 7 |
| Acidic salt | Strong acid + Weak base | Cation ($\ce{BH+}$) | < 7 |
| Basic salt | Weak acid + Strong base | Anion ($\ce{A-}$) | > 7 |
| Ambiguous | Weak acid + Weak base | Both — compare $K_a$, $K_b$ | Depends |

#### Diagram: Salt Hydrolysis Decision Flowchart

<details markdown="1">
<summary>Salt Hydrolysis — What pH Will You Get?</summary>
Type: diagram
**sim-id:** salt-hydrolysis-flowchart<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Create a Mermaid flowchart (top-down direction) with the following decision logic:

Start → "Dissolve salt in water"
→ Diamond: "Is the cation from a strong base (Group 1 or Group 2 metal)?"
  → YES: Diamond: "Is the anion from a strong acid (Cl⁻, Br⁻, I⁻, NO₃⁻, ClO₄⁻)?"
    → YES → Rectangle: "NEUTRAL solution, pH = 7" (green fill)
    → NO → Rectangle: "BASIC solution, pH > 7\nAnion hydrolyzes:\nA⁻ + H₂O ⇌ HA + OH⁻" (blue fill)
  → NO (cation from weak base): Diamond: "Is the anion from a strong acid?"
    → YES → Rectangle: "ACIDIC solution, pH < 7\nCation hydrolyzes:\nBH⁺ + H₂O ⇌ B + H₃O⁺" (red fill)
    → NO → Rectangle: "Compare Ka (acid) vs Kb (base)\nIf Ka > Kb: Acidic\nIf Ka < Kb: Basic\nIf Ka = Kb: Neutral" (orange fill)

Style: use Mermaid flowchart syntax. Color the terminal rectangles with appropriate fill colors. Add a title "Salt Hydrolysis: Predicting pH" above the diagram.

Implementation: Mermaid flowchart syntax rendered by MkDocs Material built-in Mermaid support.
</details>

## Buffer Solutions

A **buffer solution** resists changes in pH when small amounts of strong acid or strong base are added. Buffers consist of:

- A **weak acid** and its **conjugate base** (e.g., $\ce{CH3COOH}$ / $\ce{CH3COO-}$), or
- A **weak base** and its **conjugate acid** (e.g., $\ce{NH3}$ / $\ce{NH4+}$)

**How buffers work:** If you add $\ce{H+}$ (strong acid) to an acetic acid/acetate buffer:

$$\ce{CH3COO- (aq) + H+ (aq) -> CH3COOH (aq)}$$

The conjugate base "mops up" the added $\ce{H+}$, preventing a large pH change.

If you add $\ce{OH-}$ (strong base):

$$\ce{CH3COOH (aq) + OH- (aq) -> CH3COO- (aq) + H2O (l)}$$

The weak acid neutralizes the added $\ce{OH-}$.

**The Henderson-Hasselbalch equation** is used to calculate the pH of a buffer:

$$\text{pH} = pK_a + \log\frac{[\text{A}^-]}{[\text{HA}]}$$

Where $pK_a = -\log K_a$.

**Example:** What is the pH of a buffer containing 0.100 M acetic acid and 0.150 M sodium acetate? ($K_a = 1.8 \times 10^{-5}$, $pK_a = 4.74$)

$$\text{pH} = 4.74 + \log\frac{0.150}{0.100} = 4.74 + \log(1.50) = 4.74 + 0.18 = 4.92$$

Buffers are most effective when pH ≈ $pK_a$ (the ratio [A⁻]/[HA] is close to 1). Blood is buffered near pH 7.4 primarily by the carbonate buffer system ($\ce{H2CO3}$/$\ce{HCO3-}$, $pK_a = 6.35$) and the phosphate buffer system ($\ce{H2PO4-}$/$\ce{HPO4^{2-}}$, $pK_a = 7.21$).

!!! mascot-thinking "Catalyst's Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Catalyst is thinking">
    The Henderson-Hasselbalch equation reveals something beautiful: pH depends on the *ratio* of conjugate base to acid, not on the absolute concentrations. Diluting a buffer doesn't change the pH as long as the ratio stays the same!

#### Diagram: Buffer System Visualizer MicroSim

<details markdown="1">
<summary>Interactive Buffer pH Visualizer</summary>
Type: microsim
**sim-id:** buffer-visualizer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will be able to (Analyzing) explain why buffers resist pH change and predict how buffer composition affects pH using the Henderson-Hasselbalch equation.

**Canvas:** 840 × 560 px, responsive to window resize.

**Visual layout (top 50%):**
- Two side-by-side "beaker" rectangles:
  - Left beaker: "Buffer Solution" — contains colored particles representing HA molecules (orange circles) and A⁻ ions (blue circles). Ratio adjustable via sliders.
  - Right beaker: "Water (no buffer)" — single color, plain.
- Horizontal pH scale bar below both beakers showing pH 0–14 with a pointer indicating current pH of each solution.

**Controls (bottom 50%):**
- Slider: "Initial [HA] (M)" 0.01–1.0 (log scale or linear)
- Slider: "Initial [A⁻] (M)" 0.01–1.0
- Slider: "$pK_a$" 2.0–12.0 (step 0.1)
- Dropdown: "Add to buffer:" [Nothing | 0.010 M HCl | 0.010 M NaOH | 0.050 M HCl | 0.050 M NaOH]
- "Add" button

**Behavior:**
- Henderson-Hasselbalch calculation updates pH display in real time as sliders move.
- Clicking "Add" modifies [HA] and [A⁻] concentrations according to the stoichiometry (HA and A⁻ consume added acid/base), then recalculates pH.
- The water column's pH changes dramatically (shown with large arrow and value), while the buffer column's pH barely changes.
- Display: pH before add, pH after add, ΔpH for both columns.

**Color scheme:** HA molecules = warm orange, A⁻ ions = cool blue. Buffer beaker background = light green when pH in 6–8 range, light red otherwise.

Implementation: p5.js with DOM slider/dropdown/button controls. Particle counts scale with concentration ratios (max 30 particles per species for visual clarity).
</details>

## Summary

This chapter introduced the three major theories of acid-base chemistry and developed a comprehensive mathematical toolkit for calculating pH in a wide range of situations.

**Three Theories:**

- **Arrhenius:** Acids produce $\ce{H+}$; bases produce $\ce{OH-}$ (aqueous only)
- **Brønsted-Lowry:** Acids donate protons; bases accept protons (any solvent)
- **Lewis:** Acids accept electron pairs; bases donate electron pairs (broadest)

**Key Relationships:**

- $K_w = [\ce{H3O+}][\ce{OH-}] = 1.0 \times 10^{-14}$ at 25°C
- $\text{pH} + \text{pOH} = 14.00$ at 25°C
- $K_a \times K_b = K_w$ for conjugate pairs

**pH Calculation Strategies:**

- Strong acid: $\text{pH} = -\log C_a$
- Strong base: $\text{pOH} = -\log C_b$; pH = 14 − pOH
- Weak acid/base: ICE table → solve for $x$ using $K_a$ or $K_b$ → compute pH
- Buffer: Henderson-Hasselbalch: $\text{pH} = pK_a + \log[\ce{A-}]/[\ce{HA}]$

**Salt Hydrolysis:** The ions from the weaker partner (weak acid or weak base) hydrolyze, making the solution acidic or basic:

- Strong acid + Strong base salt → neutral
- Strong acid + Weak base salt → acidic
- Weak acid + Strong base salt → basic

**Acid Strength Trends:**

- Binary acids: bond strength dominates (going down a group, strength increases)
- Oxyacids: more O atoms or more electronegative central atom → stronger acid

!!! mascot-celebration "Great Work, Chemists!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Catalyst celebrates">
    You've mastered one of the most versatile and practically important chapters in all of AP Chemistry! From the pH of your blood to the acidity of rain, the tools you learned here explain the world around you. Next up: acid-base titrations and equilibrium in even more complex systems!
