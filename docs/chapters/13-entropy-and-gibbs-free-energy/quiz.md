# Quiz: Entropy and Gibbs Free Energy

Test your understanding of microstates, the laws of thermodynamics, Gibbs free energy, and spontaneity with these questions.

---

#### 1. According to the Boltzmann equation $S = k_B \ln W$, what does $W$ represent?

<div class="upper-alpha" markdown>
1. The number of accessible microstates for a given macroscopic condition.
2. The work done by the system during an expansion process.
3. The weight of the system in grams divided by its molar mass.
4. The wavelength of electromagnetic radiation emitted by the system.
</div>

??? question "Show Answer"
    The correct answer is **A**. In Boltzmann's equation, $W$ (sometimes written $\Omega$) counts the total number of microscopic arrangements — microstates — that are consistent with the observed macroscopic state of the system. More microstates means higher entropy. The other options are plausible-sounding but entirely incorrect interpretations of the symbol.

    **Concept Tested:** Boltzmann Equation / Microstates

---

#### 2. The Third Law of Thermodynamics establishes that:

<div class="upper-alpha" markdown>
1. The entropy of any real substance is always greater than zero at any finite temperature.
2. The entropy of the universe increases in every spontaneous process.
3. The entropy of a perfect crystal is exactly zero at absolute zero (0 K).
4. The total energy of the universe is constant.
</div>

??? question "Show Answer"
    The correct answer is **C**. The Third Law states that a perfect crystalline solid at 0 K has exactly one accessible microstate ($W = 1$), so $S = k_B \ln(1) = 0$. This provides the absolute reference point for entropy values. Option A is also true but is a consequence, not the Third Law itself. Option B is the Second Law. Option D is the First Law.

    **Concept Tested:** Third Law of Thermodynamics / Absolute Entropy

---

#### 3. Which of the following sign combinations for $\Delta H$ and $\Delta S$ guarantees a spontaneous process at ALL temperatures?

<div class="upper-alpha" markdown>
1. $\Delta H > 0$ and $\Delta S > 0$
2. $\Delta H < 0$ and $\Delta S < 0$
3. $\Delta H > 0$ and $\Delta S < 0$
4. $\Delta H < 0$ and $\Delta S > 0$
</div>

??? question "Show Answer"
    The correct answer is **D**. When $\Delta H < 0$ (exothermic) and $\Delta S > 0$ (entropy increases), both terms in $\Delta G = \Delta H - T\Delta S$ are negative regardless of temperature — making $\Delta G$ always negative and the process always spontaneous. Option A is spontaneous only at high $T$. Option B is spontaneous only at low $T$. Option C is never spontaneous (both factors oppose spontaneity).

    **Concept Tested:** Gibbs Free Energy / Four Cases of Spontaneity

---

#### 4. The Haber process: $\ce{N2(g) + 3H2(g) -> 2NH3(g)}$ has $\Delta H° = -92.4\,\text{kJ/mol}$ and $\Delta S° = -198.4\,\text{J/mol·K}$. At what temperature does this reaction change from spontaneous to nonspontaneous?

<div class="upper-alpha" markdown>
1. 198 K
2. 466 K
3. 924 K
4. 2,144 K
</div>

??? question "Show Answer"
    The correct answer is **B**. The crossover temperature is found by setting $\Delta G = 0$: $T = \Delta H°/\Delta S° = (-92{,}400\,\text{J/mol})/(-198.4\,\text{J/mol·K}) = 465.7\,\text{K} \approx 466\,\text{K}$. Below this temperature the reaction is spontaneous; above it, the entropy penalty dominates. Note: $\Delta S°$ must be converted to J/mol·K (not kJ) before dividing. Options A and C result from unit errors or arithmetic mistakes.

    **Concept Tested:** Crossover Temperature / Gibbs Free Energy Equation

---

#### 5. A reaction has $\Delta G° = -45.0\,\text{kJ/mol}$ at 298 K. Which of the following statements is correct?

<div class="upper-alpha" markdown>
1. The reaction has $K < 1$ because $\Delta G°$ is negative.
2. The reaction has $K > 1$ and products are favored at equilibrium.
3. The reaction proceeds in the reverse direction under all conditions.
4. The rate of the forward reaction is faster than the reverse at all concentrations.
</div>

??? question "Show Answer"
    The correct answer is **B**. Using $\Delta G° = -RT \ln K$: a negative $\Delta G°$ means $\ln K > 0$, so $K > 1$ — products are favored at equilibrium. Option A inverts the relationship. Option C is wrong because $\Delta G° < 0$ means the forward reaction is spontaneous under standard conditions. Option D confuses thermodynamics with kinetics — $\Delta G°$ says nothing about reaction rate.

    **Concept Tested:** Standard Free Energy and Equilibrium Constant $K$

---

#### 6. Which of the following is classified as a PATH function rather than a STATE function?

<div class="upper-alpha" markdown>
1. Gibbs free energy ($G$)
2. Enthalpy ($H$)
3. Heat ($q$)
4. Internal energy ($U$)
</div>

??? question "Show Answer"
    The correct answer is **C**. Heat ($q$) is a path function — the amount of heat exchanged depends on exactly how the process is carried out, not just the initial and final states. Gibbs free energy, enthalpy, and internal energy are all state functions whose values depend only on the current state of the system, not on the path taken to reach that state.

    **Concept Tested:** State Functions vs. Path Functions

---

#### 7. The entropy change for vaporization of water at 100 °C is calculated from $\Delta S_\text{vap} = \Delta H_\text{vap}/T_b$. If $\Delta H_\text{vap} = 40{,}700\,\text{J/mol}$ and $T_b = 373\,\text{K}$, what is $\Delta S_\text{vap}$?

<div class="upper-alpha" markdown>
1. $-109\,\text{J/mol·K}$
2. $+22.0\,\text{J/mol·K}$
3. $+109\,\text{J/mol·K}$
4. $+40{,}700\,\text{J/mol·K}$
</div>

??? question "Show Answer"
    The correct answer is **C**. $\Delta S_\text{vap} = 40{,}700\,\text{J/mol} \div 373\,\text{K} = 109\,\text{J/mol·K}$. The positive value is expected because vaporization greatly increases molecular disorder (liquid to gas). Option A incorrectly assigns a negative sign to the entropy of vaporization. Option B is the entropy of fusion for water (melting), not vaporization. Option D forgets to divide by temperature.

    **Concept Tested:** Entropy of Phase Changes

---

#### 8. Diamond is thermodynamically unstable relative to graphite at room temperature and pressure, yet diamonds persist essentially forever. This is best explained by:

<div class="upper-alpha" markdown>
1. Diamond has a positive standard entropy, making $\Delta G > 0$ for conversion to graphite.
2. The conversion of diamond to graphite has a very high activation energy, giving kinetic stability.
3. Diamond is denser than graphite, so pressure effects favor the diamond structure.
4. The equilibrium constant for the conversion is exactly 1, so no net change occurs.
</div>

??? question "Show Answer"
    The correct answer is **B**. The conversion $\ce{C(diamond) -> C(graphite)}$ has $\Delta G = -2.9\,\text{kJ/mol}$ (thermodynamically spontaneous!) but the activation energy for breaking and reorganizing the rigid covalent carbon lattice is enormous. Diamond is kinetically stable even though thermodynamically unstable — a perfect illustration of the difference between thermodynamic and kinetic stability. The other options misapply the concepts.

    **Concept Tested:** Thermodynamic vs. Kinetic Stability

---

#### 9. For the reaction $\ce{3NO2(g) + H2O(l) -> 2HNO3(aq) + NO(g)}$ at 298 K, $\Delta H° = -138\,\text{kJ/mol}$ and $\Delta S° = -147\,\text{J/mol·K}$. Calculate $\Delta G°$ at 298 K and evaluate spontaneity.

<div class="upper-alpha" markdown>
1. $\Delta G° = -94.2\,\text{kJ/mol}$; spontaneous
2. $\Delta G° = +94.2\,\text{kJ/mol}$; nonspontaneous
3. $\Delta G° = -181.8\,\text{kJ/mol}$; spontaneous
4. $\Delta G° = -43.8\,\text{kJ/mol}$; spontaneous
</div>

??? question "Show Answer"
    The correct answer is **A**. $\Delta G° = \Delta H° - T\Delta S° = -138{,}000\,\text{J} - (298)(-147\,\text{J/K}) = -138{,}000 + 43{,}806 = -94{,}194\,\text{J/mol} \approx -94.2\,\text{kJ/mol}$. Since $\Delta G° < 0$, the reaction is spontaneous at 298 K. Option B has the wrong sign. Option C adds instead of subtracts. Option D uses incorrect arithmetic.

    **Concept Tested:** Gibbs Free Energy Calculation / Spontaneity

---

#### 10. ATP hydrolysis releases 30.5 kJ/mol of free energy. A biochemical reaction requires +20.0 kJ/mol to proceed. If these two reactions are coupled, what is the net $\Delta G°$, and does the coupled process proceed spontaneously?

<div class="upper-alpha" markdown>
1. $+50.5\,\text{kJ/mol}$; nonspontaneous
2. $-30.5\,\text{kJ/mol}$; spontaneous regardless of coupling
3. $+10.5\,\text{kJ/mol}$; nonspontaneous
4. $-10.5\,\text{kJ/mol}$; spontaneous
</div>

??? question "Show Answer"
    The correct answer is **D**. When two reactions are coupled, their $\Delta G°$ values add: $(-30.5) + (+20.0) = -10.5\,\text{kJ/mol}$. The net $\Delta G°$ is negative, so the overall coupled process is spontaneous. This is the fundamental energy management strategy of living cells — using a highly spontaneous reaction (ATP hydrolysis) to drive a nonspontaneous biosynthesis. Option A adds the magnitudes incorrectly. Option B ignores that the +20.0 kJ process must also be accounted for.

    **Concept Tested:** Coupled Reactions / Free Energy and Biological Systems

---
