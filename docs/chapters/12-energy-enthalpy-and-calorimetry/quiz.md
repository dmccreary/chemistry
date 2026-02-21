# Quiz: Energy, Enthalpy, and Calorimetry

Test your understanding of thermochemistry — heat transfer, calorimetry, enthalpy, Hess's law, bond enthalpies, and entropy — with these questions.

---

#### 1. Which of the following correctly describes a closed thermodynamic system?

<div class="upper-alpha" markdown>
1. It exchanges both matter and energy with its surroundings.
2. It exchanges energy but not matter with its surroundings.
3. It exchanges neither matter nor energy with its surroundings.
4. It exchanges matter but not energy with its surroundings.
</div>

??? question "Show Answer"
    The correct answer is **B**. A closed system allows energy (heat and work) to cross its boundary but does not permit matter to enter or leave. An open system exchanges both matter and energy (e.g., an uncovered beaker). An isolated system exchanges neither (the ideal calorimeter model). Option D describes no standard thermodynamic system type.

    **Concept Tested:** System and Surroundings / Types of Systems

---

#### 2. A 150.0 g sample of iron ($c = 0.449$ J/g·°C) is heated from 25.0 °C to 85.0 °C. How much heat is absorbed?

<div class="upper-alpha" markdown>
1. 2,025 J
2. 3,600 J
3. 4,041 J
4. 5,738 J
</div>

??? question "Show Answer"
    The correct answer is **C**. Using $q = mc\Delta T$: $q = (150.0\,\text{g})(0.449\,\text{J/g·°C})(60.0\,\text{°C}) = 4{,}041\,\text{J}$. Option A omits the mass from the calculation. Option B uses $c = 1.0$ J/g·°C (the value for water) instead of iron. Option D applies the specific heat capacity for water (4.184 J/g·°C) rather than iron.

    **Concept Tested:** Specific Heat Capacity / $q = mc\Delta T$

---

#### 3. In a coffee cup calorimetry experiment, 50.0 mL of 1.00 M $\ce{HCl}$ at 22.0 °C is mixed with 50.0 mL of 1.00 M $\ce{NaOH}$ at 22.0 °C. The final temperature reaches 28.9 °C. Assuming solution density = 1.00 g/mL and $c = 4.184$ J/g·°C, what is $\Delta H_\text{rxn}$ per mole of water formed?

<div class="upper-alpha" markdown>
1. $+57.7$ kJ/mol
2. $-57.7$ kJ/mol
3. $-28.8$ kJ/mol
4. $-115$ kJ/mol
</div>

??? question "Show Answer"
    The correct answer is **B**. Total mass = 100.0 g; $\Delta T = 6.9$ °C; $q_\text{soln} = (100.0)(4.184)(6.9) = 2{,}887\,\text{J}$; $q_\text{rxn} = -2{,}887\,\text{J}$. Moles of reaction = 0.0500 mol; $\Delta H = -2.887\,\text{kJ}/0.0500\,\text{mol} = -57.7\,\text{kJ/mol}$. Neutralization is exothermic, so the sign must be negative — option A is wrong. Option C fails to divide by moles correctly. Option D double-counts the number of moles.

    **Concept Tested:** Coffee Cup Calorimetry / Enthalpy of Neutralization

---

#### 4. The standard enthalpy of formation ($\Delta H^\circ_f$) for an element in its standard state is:

<div class="upper-alpha" markdown>
1. Equal to the element's first ionization energy.
2. Always a positive value because forming the element from atoms releases energy.
3. Exactly zero by definition.
4. Determined experimentally by measuring the element's specific heat capacity.
</div>

??? question "Show Answer"
    The correct answer is **C**. By definition, $\Delta H^\circ_f = 0$ for any pure element in its standard state (e.g., $\ce{O2(g)}$, $\ce{C(s, graphite)}$, $\ce{Fe(s)}$). This is the thermodynamic reference baseline from which all formation enthalpies are measured. It is not related to ionization energy, bond formation enthalpy, or heat capacity.

    **Concept Tested:** Standard Enthalpy of Formation

---

#### 5. Given the following two reactions, calculate $\Delta H$ for $\ce{2C(s) + O2(g) -> 2CO(g)}$ using Hess's Law:

$$\ce{C(s) + O2(g) -> CO2(g)} \quad \Delta H_1 = -393.5\,\text{kJ}$$

$$\ce{2CO(g) + O2(g) -> 2CO2(g)} \quad \Delta H_2 = -566.0\,\text{kJ}$$

<div class="upper-alpha" markdown>
1. $-172.5$ kJ
2. $+172.5$ kJ
3. $-959.5$ kJ
4. $-221.0$ kJ
</div>

??? question "Show Answer"
    The correct answer is **D**. Multiply Reaction 1 by 2: $2\ce{C + O2 -> 2CO2}$, $\Delta H = -787.0\,\text{kJ}$. Reverse Reaction 2: $2\ce{CO2 -> 2CO + O2}$, $\Delta H = +566.0\,\text{kJ}$. Adding gives $2\ce{C + O2 -> 2CO}$ and $\Delta H = -787.0 + 566.0 = -221.0\,\text{kJ}$. Option A uses only a single step without scaling. Option B has the correct magnitude but wrong sign. Option C adds both reactions without reversing Reaction 2.

    **Concept Tested:** Hess's Law Calculations

---

#### 6. Using bond enthalpies, estimate $\Delta H$ for the reaction $\ce{H2(g) + Cl2(g) -> 2HCl(g)}$.

Given: $D(\ce{H-H}) = 436\,\text{kJ/mol}$; $D(\ce{Cl-Cl}) = 243\,\text{kJ/mol}$; $D(\ce{H-Cl}) = 431\,\text{kJ/mol}$.

<div class="upper-alpha" markdown>
1. $-183$ kJ/mol
2. $+183$ kJ/mol
3. $-862$ kJ/mol
4. $+862$ kJ/mol
</div>

??? question "Show Answer"
    The correct answer is **A**. Bonds broken (endothermic): 1 H–H (436) + 1 Cl–Cl (243) = 679 kJ. Bonds formed (exothermic): 2 H–Cl (2 × 431) = 862 kJ. $\Delta H = 679 - 862 = -183\,\text{kJ/mol}$. Option B reverses the sign, forgetting that bond formation releases energy. Options C and D report only the bonds-formed term without considering the bonds-broken term.

    **Concept Tested:** Bond Enthalpy Calculations

---

#### 7. A bomb calorimeter with $C_\text{cal} = 10.00\,\text{kJ/°C}$ records a temperature increase of 2.54 °C when a sample is combusted. What is $q_\text{rxn}$?

<div class="upper-alpha" markdown>
1. $-3.94$ kJ
2. $+25.4$ kJ
3. $+3.94$ kJ
4. $-25.4$ kJ
</div>

??? question "Show Answer"
    The correct answer is **D**. For a bomb calorimeter: $q_\text{rxn} = -C_\text{cal} \times \Delta T = -(10.00\,\text{kJ/°C})(2.54\,\text{°C}) = -25.4\,\text{kJ}$. The negative sign indicates the reaction releases heat (exothermic) — the calorimeter absorbs heat and warms up. Option B omits the negative sign. Options A and C result from dividing instead of multiplying.

    **Concept Tested:** Bomb Calorimeter / Calorimetry Calculations

---

#### 8. The Born-Haber cycle for $\ce{NaCl}$ applies Hess's Law to calculate which quantity that cannot be measured directly?

<div class="upper-alpha" markdown>
1. Lattice energy of sodium chloride
2. Electron affinity of chlorine
3. First ionization energy of sodium
4. Standard enthalpy of formation of sodium chloride
</div>

??? question "Show Answer"
    The correct answer is **A**. Lattice energy — the energy released when gaseous $\ce{Na+}$ and $\ce{Cl-}$ ions combine to form the ionic solid — cannot be measured in a straightforward experiment. The Born-Haber cycle combines all other measurable quantities (sublimation enthalpy, ionization energy, bond dissociation energy, electron affinity, and formation enthalpy) to calculate it indirectly. The other quantities listed are individually measurable.

    **Concept Tested:** Born-Haber Cycle / Lattice Energy

---

#### 9. Which of the following processes is predicted to have a positive entropy change ($\Delta S > 0$)?

<div class="upper-alpha" markdown>
1. $\ce{NH3(g) + HCl(g) -> NH4Cl(s)}$
2. $\ce{2SO2(g) + O2(g) -> 2SO3(g)}$
3. $\ce{CaCO3(s) -> CaO(s) + CO2(g)}$
4. $\ce{N2(g) + 3H2(g) -> 2NH3(g)}$
</div>

??? question "Show Answer"
    The correct answer is **C**. Decomposition of $\ce{CaCO3}$ produces 1 mole of gas ($\ce{CO2}$) from all-solid reactants, dramatically increasing entropy ($\Delta n_\text{gas} = +1$). Option A converts 2 moles of gas into 1 mole of solid — entropy decreases. Option B converts 3 moles of gas into 2 moles — entropy decreases. Option D converts 4 moles of gas into 2 moles — entropy decreases.

    **Concept Tested:** Entropy Change / Predicting Sign of $\Delta S$

---

#### 10. The standard enthalpy change for a reaction is calculated using formation enthalpies as:

$$\Delta H^\circ_\text{rxn} = \sum n\,\Delta H^\circ_f(\text{products}) - \sum m\,\Delta H^\circ_f(\text{reactants})$$

For the combustion of methane, $\ce{CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l)}$, given $\Delta H^\circ_f[\ce{CH4(g)}] = -74.8\,\text{kJ/mol}$, $\Delta H^\circ_f[\ce{CO2(g)}] = -393.5\,\text{kJ/mol}$, and $\Delta H^\circ_f[\ce{H2O(l)}] = -285.8\,\text{kJ/mol}$, what is $\Delta H^\circ_\text{rxn}$?

<div class="upper-alpha" markdown>
1. $-604.5$ kJ/mol
2. $-890.3$ kJ/mol
3. $+890.3$ kJ/mol
4. $-965.1$ kJ/mol
</div>

??? question "Show Answer"
    The correct answer is **B**. Products: $1(-393.5) + 2(-285.8) = -393.5 - 571.6 = -965.1\,\text{kJ}$. Reactants: $1(-74.8) + 2(0) = -74.8\,\text{kJ}$. $\Delta H^\circ_\text{rxn} = -965.1 - (-74.8) = -890.3\,\text{kJ/mol}$. Option A ignores the stoichiometric coefficient 2 on $\ce{H2O}$. Option C has the wrong sign. Option D is the products sum alone, forgetting to subtract the reactants.

    **Concept Tested:** Standard Enthalpy of Reaction / Enthalpy of Formation Calculations

---
