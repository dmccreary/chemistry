---
title: "Chapter 18: Electrochemistry"
description: Covers galvanic and electrolytic cells, standard reduction potentials, cell potential calculations, the Nernst equation, Faraday's laws of electrolysis, and applications including batteries and corrosion.
generated_by: claude skill chapter-content-generator
date: 2026-02-20 12:25:38
version: 0.04
---

# Chapter 18: Electrochemistry

!!! mascot-welcome "Welcome, Scientists!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Catalyst welcomes you">
    Every time you charge your phone, start a car, or use a flashlight, you're harnessing electrochemistry. This chapter bridges two of chemistry's grandest themes — thermodynamics and redox reactions — and shows how electron flow can do useful work. Get ready to explore one of the most powerful and practical areas of AP Chemistry. Let's react!

## Introduction

Electrochemistry is the study of the relationship between chemical reactions and electrical energy. When electrons flow spontaneously from one substance to another — like when zinc dissolves in copper sulfate solution — that electron flow can be harnessed to do electrical work. Conversely, electrical energy can be used to force non-spontaneous chemical reactions to occur, such as splitting water into hydrogen and oxygen.

These two directions define the two major types of electrochemical cells:

- **Galvanic cells** (also called voltaic cells): spontaneous redox reactions generate electrical energy
- **Electrolytic cells**: electrical energy is used to drive non-spontaneous redox reactions

Electrochemistry also ties back directly to Chapter 13. Recall that $\Delta G < 0$ for a spontaneous process. In this chapter, you'll see exactly how the Gibbs free energy change of a redox reaction connects to the voltage (electromotive force, EMF) that a cell produces.

## Galvanic (Voltaic) Cells

### The Zinc-Copper Cell

The classic demonstration of a galvanic cell uses zinc metal and copper sulfate solution. When a zinc strip is dipped into $\ce{CuSO4}$ solution, copper metal deposits on the zinc and the blue color of the solution fades:

$$\ce{Zn (s) + Cu^{2+} (aq) -> Zn^{2+} (aq) + Cu (s)}$$

Zinc is oxidized (loses electrons) and copper ion is reduced (gains electrons). In a simple beaker this electron transfer happens by direct contact — useful for demonstrating chemistry but useless for doing electrical work.

In a galvanic cell, the two half-reactions are **separated into two compartments** (half-cells). Electrons travel through an external wire, doing work as they go.

### Voltaic Cell Components

The essential components of a galvanic cell are:

- **Anode:** The electrode where **oxidation** occurs. Metal dissolves, releasing electrons. The anode is the negative terminal (electrons flow *out* of it).
- **Cathode:** The electrode where **reduction** occurs. Metal deposits (or ions are reduced). The cathode is the positive terminal (electrons flow *into* it).
- **External circuit:** The wire connecting anode to cathode through which electrons flow.
- **Salt bridge:** A tube containing an inert electrolyte (often $\ce{KNO3}$ or $\ce{KCl}$ in agar gel) that completes the circuit by allowing ion migration between half-cells, maintaining electrical neutrality.
- **Electrolyte solutions:** Aqueous solutions containing the ionic species involved in the half-reactions.

!!! mascot-tip "Catalyst's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Catalyst shares a tip">
    Remember: **AN OX, RED CAT** — ANode = OXidation, REDuction = CAThode. This mnemonic never fails. Electrons always flow from anode to cathode through the external wire, and in the opposite direction through the salt bridge (as anions migrate toward the anode).

### Why a Salt Bridge Is Needed

Without a salt bridge, the half-cells would quickly become charged — the anode half-cell would build up positive charge (excess $\ce{Zn^{2+}}$), and the cathode half-cell would become negatively charged (loss of $\ce{Cu^{2+}}$). This charge buildup would stop current flow within seconds. The salt bridge allows anions ($\ce{NO3-}$ or $\ce{Cl-}$) to migrate toward the anode and cations to migrate toward the cathode, maintaining charge balance and allowing continuous current.

In the zinc-copper cell:

- Anode: $\ce{Zn (s) -> Zn^{2+} (aq) + 2 e-}$ (oxidation)
- Cathode: $\ce{Cu^{2+} (aq) + 2 e- -> Cu (s)}$ (reduction)
- Overall: $\ce{Zn (s) + Cu^{2+} (aq) -> Zn^{2+} (aq) + Cu (s)}$

### Cell Notation

Electrochemists use a compact shorthand called **cell notation** to describe a galvanic cell without drawing a diagram:

$$\ce{Zn (s) | Zn^{2+} (aq) || Cu^{2+} (aq) | Cu (s)}$$

Rules for cell notation:

- Write the **anode** on the **left**, **cathode** on the **right**
- A single vertical line **|** separates phases (solid from solution)
- A double vertical line **||** represents the salt bridge
- Concentrations are listed in parentheses when known: $\ce{Zn^{2+}} \text{(1.0 M)}$
- If an inert electrode is needed (e.g., platinum), it is included: $\ce{Pt | H2 (g) | H+ (aq) || ...}$

#### Diagram: Galvanic Cell Visualizer MicroSim

<details markdown="1">
<summary>Interactive Galvanic Cell Diagram</summary>
Type: microsim
**sim-id:** galvanic-cell-visualizer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will be able to (Understanding) identify the components of a galvanic cell, describe the direction of electron and ion flow, and interpret cell notation.

**Canvas:** 860 × 560 px, responsive to window resize.

**Visual layout:**
- Left half-cell: beaker containing a zinc electrode strip (gray rectangle) labeled "Anode (−)". Blue-gray solution labeled "$\ce{Zn^{2+} (aq)}$". Small zinc atom particles floating away from the electrode to show oxidation.
- Right half-cell: beaker containing a copper electrode strip (orange-brown rectangle) labeled "Cathode (+)". Blue solution labeled "$\ce{Cu^{2+} (aq)}$". Copper atom particles depositing onto electrode.
- Salt bridge: inverted U-shaped tube connecting the two beakers, labeled "Salt Bridge ($\ce{KNO3}$)". Animated small dots (anions moving left, cations moving right).
- External wire: curved line connecting tops of both electrodes. Animated electron dots (small yellow circles) moving from anode to cathode along the wire. A lightbulb icon in the middle of the wire that glows yellow.
- Labels: anode half-reaction below left beaker, cathode half-reaction below right beaker, overall cell reaction centered at bottom.

**Controls:**
- Dropdown: "Select cell": Zn-Cu | Fe-Cu | Zn-Ag | Custom
- Slider: Initial $[\ce{Cu^{2+}}]$ 0.001–2.0 M
- Slider: Initial $[\ce{Zn^{2+}}]$ 0.001–2.0 M
- Display: Cell notation text, cell potential E (standard and actual), spontaneous yes/no

**Animation:** Particles animate continuously when cell is spontaneous. At non-spontaneous conditions, animation reverses direction and a red "X" appears over the wire.

Implementation: p5.js. Particle positions updated each frame along predefined paths. Cell potential computed using Nernst equation.
</details>

## Standard Reduction Potentials

### What Is Standard Reduction Potential?

Each half-reaction has an intrinsic tendency to occur as a reduction. This tendency is measured as the **standard reduction potential**, $E°$ (in volts), measured under standard conditions:

- All ionic concentrations = 1.0 M
- Gas pressures = 1 atm
- Temperature = 25°C

Reduction potentials are always written as reduction half-reactions:

$$\ce{Cu^{2+} (aq) + 2 e- -> Cu (s)} \quad E° = +0.34 \text{ V}$$

$$\ce{Zn^{2+} (aq) + 2 e- -> Zn (s)} \quad E° = -0.76 \text{ V}$$

The more positive the $E°$, the greater the tendency to be **reduced**. The more negative the $E°$, the greater the tendency to be **oxidized**.

### The Standard Hydrogen Electrode (SHE)

All reduction potentials are measured relative to the **standard hydrogen electrode (SHE)**:

$$\ce{2 H+ (aq) + 2 e- -> H2 (g)} \quad E° = 0.00 \text{ V (by definition)}$$

The SHE consists of a platinum electrode immersed in 1.0 M $\ce{HCl}$ with $\ce{H2}$ gas bubbling at 1 atm over it. This arbitrary zero point defines the entire reduction potential scale.

**Selected standard reduction potentials** (from most positive to most negative):

| Half-reaction | $E°$ (V) |
|---------------|----------|
| $\ce{F2 (g) + 2 e- -> 2 F- (aq)}$ | +2.87 |
| $\ce{MnO4- + 8 H+ + 5 e- -> Mn^{2+} + 4 H2O}$ | +1.51 |
| $\ce{Cl2 (g) + 2 e- -> 2 Cl- (aq)}$ | +1.36 |
| $\ce{O2 (g) + 4 H+ + 4 e- -> 2 H2O}$ | +1.23 |
| $\ce{Cu^{2+} (aq) + 2 e- -> Cu (s)}$ | +0.34 |
| $\ce{2 H+ (aq) + 2 e- -> H2 (g)}$ | 0.00 |
| $\ce{Fe^{2+} (aq) + 2 e- -> Fe (s)}$ | −0.44 |
| $\ce{Zn^{2+} (aq) + 2 e- -> Zn (s)}$ | −0.76 |
| $\ce{Al^{3+} (aq) + 3 e- -> Al (s)}$ | −1.66 |
| $\ce{Li+ (aq) + e- -> Li (s)}$ | −3.04 |

### Calculating Standard Cell Potential

The **standard cell potential** $E°_{\text{cell}}$ is:

$$E°_{\text{cell}} = E°_{\text{cathode}} - E°_{\text{anode}}$$

or equivalently:

$$E°_{\text{cell}} = E°_{\text{reduction (cathode)}} + E°_{\text{oxidation (anode)}}$$

(where $E°_{\text{oxidation}} = -E°_{\text{reduction}}$ for the same half-reaction)

**Example:** Calculate $E°_{\text{cell}}$ for the Zn-Cu cell.

- Cathode (reduction): $\ce{Cu^{2+} + 2 e- -> Cu}$, $E° = +0.34$ V
- Anode (oxidation): $\ce{Zn -> Zn^{2+} + 2 e-}$, $E°_{\text{ox}} = +0.76$ V

$$E°_{\text{cell}} = 0.34 - (-0.76) = 0.34 + 0.76 = +1.10 \text{ V}$$

A **positive** $E°_{\text{cell}}$ indicates a spontaneous cell reaction.

### Predicting Spontaneity

From the table of reduction potentials, you can immediately predict which half-reaction will be the cathode and which will be the anode:

- The **more positive** $E°$ half-reaction will be reduced (cathode)
- The **more negative** $E°$ half-reaction will be oxidized (anode)
- If $E°_{\text{cell}} > 0$, the forward reaction is spontaneous
- If $E°_{\text{cell}} < 0$, the reverse reaction is spontaneous

!!! mascot-thinking "Catalyst's Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Catalyst is thinking">
    Here's the deep connection: $E°_{\text{cell}} > 0$ means $\Delta G° < 0$ (spontaneous). $E°_{\text{cell}} < 0$ means $\Delta G° > 0$ (non-spontaneous). The reduction potential table is really a spontaneity table in disguise — the strongest oxidizing agents (most positive $E°$) will spontaneously oxidize anything below them in the table.

## Connecting Cell EMF to Thermodynamics

### The ΔG and E Relationship

Gibbs free energy and cell potential are directly related:

$$\Delta G° = -nFE°_{\text{cell}}$$

where:

- $n$ = number of moles of electrons transferred in the balanced equation
- $F$ = Faraday's constant = 96,485 C/mol e⁻ ≈ 96,500 C/mol e⁻
- $E°_{\text{cell}}$ = standard cell potential (volts)

Since 1 V = 1 J/C, the units work out to joules per mole of reaction.

**Example:** For the Zn-Cu cell, $n = 2$ electrons, $E°_{\text{cell}} = +1.10$ V:

$$\Delta G° = -(2)(96,485)(1.10) = -2.12 \times 10^5 \text{ J/mol} = -212 \text{ kJ/mol}$$

The large negative $\Delta G°$ confirms this is a highly spontaneous reaction.

### Connecting E° to the Equilibrium Constant

Combining $\Delta G° = -nFE°$ with $\Delta G° = -RT \ln K$:

$$-nFE° = -RT \ln K$$

$$E° = \frac{RT}{nF} \ln K = \frac{0.02569 \text{ V}}{n} \ln K$$

At 25°C, this simplifies to:

$$E° = \frac{0.0592}{n} \log K$$

This equation connects all three major thermodynamic quantities:

| $E°_{\text{cell}}$ | $\Delta G°$ | $K$ | Reaction |
|---------------------|-------------|-----|----------|
| $> 0$ | $< 0$ | $> 1$ | Spontaneous forward |
| $= 0$ | $= 0$ | $= 1$ | At equilibrium |
| $< 0$ | $> 0$ | $< 1$ | Non-spontaneous forward |

## The Nernst Equation

### Non-Standard Conditions

The standard cell potential $E°$ applies only when all concentrations are 1 M and pressures are 1 atm. For any other conditions, use the **Nernst equation**:

$$E = E° - \frac{RT}{nF} \ln Q$$

At 25°C (substituting $RT/F = 0.02569$ V):

$$E = E° - \frac{0.0592}{n} \log Q$$

where $Q$ is the reaction quotient (same form as $K$, but with actual concentrations).

**Example:** Calculate $E$ for the Zn-Cu cell when $[\ce{Zn^{2+}}] = 0.100$ M and $[\ce{Cu^{2+}}] = 2.00$ M.

The reaction is: $\ce{Zn + Cu^{2+} -> Zn^{2+} + Cu}$, $n = 2$, $E° = 1.10$ V

$$Q = \frac{[\ce{Zn^{2+}}]}{[\ce{Cu^{2+}}]} = \frac{0.100}{2.00} = 0.0500$$

$$E = 1.10 - \frac{0.0592}{2} \log(0.0500) = 1.10 - (0.0296)(-1.301) = 1.10 + 0.0385 = 1.14 \text{ V}$$

The cell potential is higher than standard because the low $[\ce{Zn^{2+}}]$ and high $[\ce{Cu^{2+}}]$ favor the forward reaction.

### Concentration Cells

A **concentration cell** is a galvanic cell in which both electrodes are made of the same metal, but the two half-cells have different ion concentrations. The cell potential arises entirely from the concentration difference.

Example: two copper half-cells with $[\ce{Cu^{2+}}] = 0.010$ M (anode) and $[\ce{Cu^{2+}}] = 1.00$ M (cathode).

$$E° = 0 \text{ V (same electrode material)}$$

$$Q = \frac{[\ce{Cu^{2+}}]_{\text{anode}}}{[\ce{Cu^{2+}}]_{\text{cathode}}} = \frac{0.010}{1.00} = 0.010$$

$$E = 0 - \frac{0.0592}{2} \log(0.010) = -\frac{0.0592}{2}(-2) = +0.0592 \text{ V}$$

Electrons flow from the dilute side (anode — oxidation reduces $[\ce{Cu^{2+}}]$) to the concentrated side (cathode — reduction increases $[\ce{Cu^{2+}}]$). The cell runs until both concentrations are equal and $E = 0$.

!!! mascot-warning "Watch Out!"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Catalyst warns you">
    In the Nernst equation, $Q$ uses the same expression as the equilibrium constant $K$ for the balanced overall cell reaction — **not** the individual half-reactions. Students often write $Q$ incorrectly by using only one half-cell's concentrations. Always write the full balanced equation first, then construct $Q$.

#### Diagram: Nernst Equation MicroSim

<details markdown="1">
<summary>Interactive Nernst Equation Cell Potential Calculator</summary>
Type: microsim
**sim-id:** nernst-equation-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will be able to (Applying) use the Nernst equation to calculate cell potential at non-standard conditions and predict how concentration changes affect cell voltage.

**Canvas:** 840 × 580 px, responsive to window resize.

**Top half — cell diagram (300 px tall):**
- Stylized diagram showing anode and cathode compartments with ion concentrations labeled
- Voltmeter display showing computed E in large digits (green if positive, red if negative)
- Electron flow direction arrows on wire

**Bottom half — controls and computation display:**
- Dropdown: Select reaction (Zn-Cu | Fe-Cu | Concentration cell | Custom)
- Input/Slider: $E°_{\text{cell}}$ (auto-filled for selected reactions, editable for custom)
- Input/Slider: $n$ — moles of electrons transferred
- Slider: log scale for $[\text{oxidized species}]$ at anode (0.001–2.0 M)
- Slider: log scale for $[\text{reduced species}]$ at cathode (0.001–2.0 M)
- Computed: $Q$ value (scientific notation), $\log Q$, $E$ value
- Show Nernst equation with values substituted in: $E = X.XX - (0.0592/n) \times \log(Q)$
- Below: $\Delta G = -nFE$ computed in kJ/mol
- A simple graph: x-axis = $\log Q$ from −4 to 4, y-axis = $E$ (V), showing the linear Nernst relationship with a moveable point at current conditions

**Color coding:** $E > 0$ shown in green, $E < 0$ in red, $E = 0$ highlighted with a yellow band.

Implementation: p5.js with createSlider() and createSelect() DOM elements. All computations update live.
</details>

## Electrolytic Cells

### Non-Spontaneous Reactions Driven by Electricity

While galvanic cells convert chemical energy to electrical energy, **electrolytic cells** do the opposite — they use electrical energy to drive non-spontaneous redox reactions. Examples include electroplating, rechargeable batteries (charging cycle), industrial chlorine production, and the Hall-Héroult process for aluminum production.

In an electrolytic cell:

- An external power source (battery) drives the current
- The electrode connected to the **positive terminal** is the **anode** (still oxidation)
- The electrode connected to the **negative terminal** is the **cathode** (still reduction)
- The minimum voltage required equals the magnitude of the negative $E°_{\text{cell}}$ for the reaction

### Electrolysis of Water

A classic electrolytic reaction is the decomposition of water:

$$\ce{2 H2O (l) -> 2 H2 (g) + O2 (g)}$$

The two half-reactions are:

- Cathode (reduction): $\ce{2 H2O (l) + 2 e- -> H2 (g) + 2 OH- (aq)}$ ($E° = -0.83$ V)
- Anode (oxidation): $\ce{2 H2O (l) -> O2 (g) + 4 H+ (aq) + 4 e-}$ ($E° = -1.23$ V for reduction, so $+1.23$ V drives the reverse)

The minimum voltage required: $E°_{\text{cell, required}} = 0.83 + 1.23 = 1.23$ V (ignoring overpotential losses).

In practice, a voltage of about 1.8–2.0 V is needed due to overpotential — extra voltage required to overcome activation energy barriers at the electrodes.

### Electroplating

**Electroplating** deposits a thin layer of one metal onto another object using electrolysis. The object to be plated is the cathode; the plating metal (often $\ce{Ag}$, $\ce{Au}$, $\ce{Cr}$, or $\ce{Ni}$) is the anode dissolving into solution to replenish ions.

Example — silver plating:

- Cathode: $\ce{Ag+ (aq) + e- -> Ag (s)}$ (silver deposits on object)
- Anode: $\ce{Ag (s) -> Ag+ (aq) + e-}$ (silver anode dissolves)

The thickness of the plating is controlled by the total charge passed (time × current), calculated using Faraday's laws.

## Faraday's Laws of Electrolysis

### Faraday's Constant

**Faraday's constant** ($F$) is the charge carried by one mole of electrons:

$$F = 96,485 \text{ C/mol e}^- \approx 96,500 \text{ C/mol e}^-$$

The total charge passed through an electrolytic cell is:

$$q = I \times t$$

where $I$ = current in amperes (A) and $t$ = time in seconds (s). Since 1 A = 1 C/s, $q$ is in coulombs.

### Faraday's Laws and Electrolysis Stoichiometry

Faraday's first law: the mass of substance deposited or dissolved is proportional to the charge passed.

Faraday's second law: for the same charge, the mass deposited is inversely proportional to the number of electrons required per ion.

The stoichiometry calculation chain:

$$q \text{ (coulombs)} \xrightarrow{\div F} \text{mol } e^- \xrightarrow{\text{mole ratio}} \text{mol metal} \xrightarrow{\times M} \text{mass (g)}$$

**Example:** How many grams of copper are deposited when a current of 2.50 A flows for 30.0 min through a $\ce{CuSO4}$ solution? ($M_{\ce{Cu}} = 63.55$ g/mol; $\ce{Cu^{2+}} + 2e^- \to \ce{Cu}$)

Step 1 — Total charge:

$$q = I \times t = 2.50 \text{ A} \times (30.0 \times 60 \text{ s}) = 2.50 \times 1800 = 4500 \text{ C}$$

Step 2 — Moles of electrons:

$$n_{e^-} = \frac{4500 \text{ C}}{96,485 \text{ C/mol}} = 0.04664 \text{ mol } e^-$$

Step 3 — Moles of copper (2 electrons per copper):

$$n_{\ce{Cu}} = \frac{0.04664}{2} = 0.02332 \text{ mol}$$

Step 4 — Mass of copper:

$$m = 0.02332 \times 63.55 = 1.48 \text{ g}$$

!!! mascot-encourage "You've Got This!"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Catalyst encourages you">
    Faraday's law calculations follow the same pattern every time: convert current × time to coulombs, divide by 96,485 to get moles of electrons, use stoichiometry from the half-reaction, then convert to grams with molar mass. Once you do two or three of these, the pattern becomes automatic!

**Example 2:** What current (in amperes) must flow for 45.0 min to deposit exactly 1.00 g of silver from $\ce{AgNO3}$ solution? ($M_{\ce{Ag}} = 107.87$ g/mol; $\ce{Ag+ + e- -> Ag}$)

Working backwards:

$$n_{\ce{Ag}} = \frac{1.00}{107.87} = 9.27 \times 10^{-3} \text{ mol}$$

Since 1 electron per Ag: $n_{e^-} = 9.27 \times 10^{-3}$ mol

$$q = (9.27 \times 10^{-3})(96,485) = 894 \text{ C}$$

$$I = \frac{q}{t} = \frac{894 \text{ C}}{45.0 \times 60 \text{ s}} = \frac{894}{2700} = 0.331 \text{ A}$$

#### Diagram: Electrolysis Stoichiometry Calculator MicroSim

<details markdown="1">
<summary>Interactive Faraday's Law Calculator</summary>
Type: microsim
**sim-id:** faraday-law-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will be able to (Applying) calculate the mass of substance deposited or dissolved in an electrolytic cell using Faraday's laws, given current, time, and the number of electrons transferred.

**Canvas:** 820 × 560 px, responsive to window resize.

**Solve-for mode (radio buttons at top):**
- "Find mass deposited" (default)
- "Find time needed"
- "Find current needed"

**Input panel:**
- Dropdown: Select metal (Cu 2e⁻ | Ag 1e⁻ | Au 3e⁻ | Al 3e⁻ | Fe 2e⁻ | Custom)
- If Custom: input molar mass and electrons per ion
- Input: Current I (A) — if solving for time or mass
- Input: Time t (minutes) — if solving for mass or current
- Input: Target mass m (g) — if solving for time or current

**Step-by-step solution display (right side):**
Show the full calculation chain with boxes for each step:

Box 1: $q = I \times t = \_ \text{ C}$
Box 2: $n_{e^-} = q / F = \_ \text{ mol } e^-$
Box 3: $n_{\text{metal}} = n_{e^-} / z = \_ \text{ mol}$ (where z = electrons per ion)
Box 4: $m = n_{\text{metal}} \times M = \_ \text{ g}$

Each box highlights with a green fill as "Calculate" is clicked, stepping through the solution.

**Visual:** A small animated electrolytic cell diagram showing current flowing, ions migrating, and metal depositing (particle count scales with calculated mass, capped at 50 particles for visual clarity).

**Reset button** to clear all fields.

Implementation: p5.js with createInput(), createSelect(), createRadio(), createButton() DOM elements.
</details>

## Batteries, Fuel Cells, and Corrosion

### Primary and Secondary Batteries

A **battery** is a collection of galvanic cells connected in series. Batteries are classified as:

**Primary batteries** (non-rechargeable): the reaction is irreversible — once the reactants are consumed, the battery is dead.

- **Alkaline cell:** $\ce{Zn}$ anode / $\ce{MnO2}$ cathode in $\ce{KOH}$ electrolyte. ~1.5 V. Used in flashlights, remotes.
- **Mercury cell:** $\ce{Zn}$ anode / $\ce{HgO}$ cathode. ~1.35 V stable voltage. Used in hearing aids (being phased out due to toxicity).

**Secondary batteries** (rechargeable): the reaction is reversible — passing current in the reverse direction restores the original reactants.

- **Lead-acid battery:** Used in cars. 6 cells, each producing ~2 V (total ~12 V).
  - Discharge: $\ce{Pb (s) + PbO2 (s) + 2 H2SO4 (aq) -> 2 PbSO4 (s) + 2 H2O (l)}$
  - Recharge: reverse the reaction using the alternator.
- **Lithium-ion battery:** Powers laptops and phones. $\ce{LiCoO2}$ cathode, graphite anode. ~3.6 V per cell.
- **Nickel-metal hydride (NiMH):** Used in hybrid vehicles.

### Fuel Cells

A **fuel cell** is a galvanic cell that converts the chemical energy of a fuel (continuously supplied) into electricity without combustion. The hydrogen-oxygen fuel cell:

- Anode: $\ce{H2 (g) -> 2 H+ (aq) + 2 e-}$
- Cathode: $\ce{O2 (g) + 4 H+ (aq) + 4 e- -> 2 H2O (l)}$
- Overall: $\ce{2 H2 (g) + O2 (g) -> 2 H2O (l)}$ $\quad \Delta G° = -474$ kJ

Fuel cells are more efficient than combustion engines (up to ~60% efficiency vs. ~25% for internal combustion) and produce only water as a byproduct.

### Corrosion

**Corrosion** is the spontaneous oxidation of a metal. Iron rusting is the most economically important example. Rust forms through an electrochemical process requiring both oxygen and water:

$$\ce{4 Fe (s) + 3 O2 (g) + 6 H2O (l) -> 2 Fe2O3 * 3H2O (s)}$$

The process is galvanic: one region of the iron surface acts as an anode (iron oxidizes), another region acts as a cathode (oxygen is reduced). Salt water accelerates corrosion by increasing the conductivity of the electrolyte.

**Corrosion prevention strategies:**

- **Galvanizing:** Coat iron with zinc ($\ce{Zn}$). Zinc is a more active metal — it oxidizes preferentially (sacrificial anode), protecting the iron even if the coating is scratched.
- **Cathodic protection:** Attach a block of magnesium or zinc (active metal) to iron structures (pipelines, ship hulls). The active metal oxidizes sacrificially.
- **Barrier coatings:** Paint, oil, or plastic prevent water and oxygen from reaching the metal surface.
- **Alloying:** Stainless steel (iron + chromium) resists corrosion because a thin, protective $\ce{Cr2O3}$ layer forms spontaneously.

!!! mascot-thinking "Catalyst's Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Catalyst is thinking">
    Galvanizing and cathodic protection both exploit the same principle from the reduction potential table: a more active metal (more negative $E°$) will oxidize preferentially, protecting the less active metal. Zinc ($E° = -0.76$ V) protects iron ($E° = -0.44$ V) because zinc is oxidized first. Once all the zinc is gone, the iron starts corroding.

## Summary

Electrochemistry connects the spontaneity of redox reactions to electrical energy through two central equations:

$$\Delta G° = -nFE°_{\text{cell}} \quad \text{and} \quad E° = \frac{0.0592}{n} \log K$$

**Galvanic (voltaic) cells:**

- Anode: oxidation (negative terminal, electrons flow out)
- Cathode: reduction (positive terminal, electrons flow in)
- $E°_{\text{cell}} = E°_{\text{cathode}} - E°_{\text{anode}}$
- Spontaneous when $E°_{\text{cell}} > 0$ (equivalent to $\Delta G° < 0$, $K > 1$)

**Nernst equation** (non-standard conditions):

$$E = E° - \frac{0.0592}{n} \log Q$$

**Electrolytic cells:**

- Require external power; drive non-spontaneous reactions
- Faraday's law: $q = It$; $n_{e^-} = q/F$; stoichiometry gives moles of product

**Faraday's constant:** $F = 96,485$ C/mol e⁻

**Applications:**

- Batteries (galvanic cells stored in a package)
- Fuel cells (continuous galvanic conversion)
- Corrosion (spontaneous galvanic oxidation)
- Electroplating and electrolysis (electrolytic applications)

!!! mascot-celebration "Great Work, Chemists!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Catalyst celebrates">
    Congratulations — you've completed all 18 chapters of AP Chemistry! From atoms and bonding all the way to electrochemical cells and batteries, you now have a complete toolkit for understanding the molecular world. Every charge on your phone, every reaction in your body, every material around you — all of it is chemistry. You've got this!
