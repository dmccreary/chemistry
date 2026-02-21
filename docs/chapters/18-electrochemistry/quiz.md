# Quiz: Electrochemistry

Test your understanding of galvanic cells, standard reduction potentials, the Nernst equation, electrolysis, and related applications with these questions.

---

#### 1. In a galvanic cell, which statement correctly describes the anode?

<div class="upper-alpha" markdown>
1. The anode is where reduction occurs and is connected to the positive terminal
2. The anode is where oxidation occurs and electrons flow out of it through the external circuit
3. The anode is where reduction occurs and ions migrate toward it through the salt bridge
4. The anode is where oxidation occurs and is connected to the positive terminal
</div>

??? question "Show Answer"
    The correct answer is **B**. At the anode, oxidation occurs (AN OX — ANode = OXidation). The anode is the negative terminal of a galvanic cell; electrons are produced at the anode and flow outward through the external wire toward the cathode. Option A reverses both the electrode process (reduction should be at the cathode) and the charge designation (the anode is negative). Option C correctly identifies oxidation at the anode but claims it is where reduction occurs — a contradiction. Option D correctly identifies oxidation but incorrectly assigns the positive terminal to the anode (the cathode is positive).

    **Concept Tested:** Galvanic Cell Components — Anode and Cathode

---

#### 2. Using the standard reduction potentials $E°(\ce{Cu^{2+}/Cu}) = +0.34$ V and $E°(\ce{Fe^{2+}/Fe}) = -0.44$ V, what is $E°_{\text{cell}}$ for a galvanic cell using these two half-reactions, and which metal is oxidized?

<div class="upper-alpha" markdown>
1. $E°_{\text{cell}} = -0.78$ V; iron is oxidized
2. $E°_{\text{cell}} = +0.78$ V; copper is oxidized
3. $E°_{\text{cell}} = +0.78$ V; iron is oxidized
4. $E°_{\text{cell}} = -0.10$ V; iron is oxidized
</div>

??? question "Show Answer"
    The correct answer is **C**. Iron has the more negative reduction potential ($-0.44$ V), so it is more easily oxidized and serves as the anode. Copper ($+0.34$ V) is more easily reduced and serves as the cathode. $E°_{\text{cell}} = E°_{\text{cathode}} - E°_{\text{anode}} = 0.34 - (-0.44) = +0.78$ V. A positive $E°_{\text{cell}}$ confirms this cell is spontaneous. Option A has the correct magnitude but a negative sign, implying the reaction is non-spontaneous. Option B correctly computes the potential but incorrectly identifies copper as being oxidized. Option D applies an incorrect formula.

    **Concept Tested:** Standard Cell Potential Calculation

---

#### 3. Which statement about the standard hydrogen electrode (SHE) is correct?

<div class="upper-alpha" markdown>
1. The SHE has a standard reduction potential of $0.00$ V by definition, and all other potentials are measured relative to it
2. The SHE has a standard reduction potential of $+1.00$ V by convention
3. The SHE uses a gold electrode immersed in 1.0 M $\ce{HCl}$ with $\ce{H2}$ gas at 1 atm
4. The SHE is only valid at temperatures above 100°C
</div>

??? question "Show Answer"
    The correct answer is **A**. The standard hydrogen electrode ($\ce{2H+ (aq) + 2e- -> H2 (g)}$) is assigned $E° = 0.00$ V by international convention. It serves as the universal reference point against which all other standard reduction potentials are measured. Option B gives the wrong value — it is 0.00 V, not +1.00 V. Option C describes the setup incorrectly — the SHE uses a platinum (not gold) electrode. Option D is false; the SHE is defined at 25°C (298 K), not above 100°C.

    **Concept Tested:** Standard Hydrogen Electrode

---

#### 4. For a reaction with $n = 2$ electrons transferred and $E°_{\text{cell}} = +0.46$ V, what is $\Delta G°$ at 25°C? (Use $F = 96,500$ C/mol)

<div class="upper-alpha" markdown>
1. $+88.8$ kJ/mol, indicating the reaction is non-spontaneous
2. $-88.8$ kJ/mol, indicating the reaction is spontaneous
3. $-44.4$ kJ/mol, indicating the reaction is spontaneous
4. $+44.4$ kJ/mol, indicating the reaction is non-spontaneous
</div>

??? question "Show Answer"
    The correct answer is **B**. Using $\Delta G° = -nFE°_{\text{cell}} = -(2)(96{,}500)(0.46) = -88{,}780$ J/mol $\approx -88.8$ kJ/mol. The negative sign confirms the reaction is spontaneous ($\Delta G° < 0$), consistent with $E°_{\text{cell}} > 0$. Option A has the correct magnitude but the wrong sign — a positive $E°_{\text{cell}}$ always gives a negative $\Delta G°$. Option C divides by 2 instead of multiplying by $n = 2$. Option D has both the wrong sign and the wrong calculation.

    **Concept Tested:** Delta G and Cell EMF Relationship

---

#### 5. The Nernst equation at 25°C is $E = E° - \dfrac{0.0592}{n} \log Q$. For the cell reaction $\ce{Zn (s) + Cu^{2+} (aq) -> Zn^{2+} (aq) + Cu (s)}$ with $E° = 1.10$ V, what is $E$ when $[\ce{Zn^{2+}}] = 1.00$ M and $[\ce{Cu^{2+}}] = 0.010$ M?

<div class="upper-alpha" markdown>
1. $E = 1.16$ V, because lower $[\ce{Cu^{2+}}]$ shifts the reaction left, increasing the potential
2. $E = 1.10$ V, because the standard potential does not change with concentration
3. $E = 1.04$ V, because lower $[\ce{Cu^{2+}}]$ shifts the reaction left, decreasing the potential
4. $E = 0.98$ V, because $Q > 1$ always decreases the cell potential
</div>

??? question "Show Answer"
    The correct answer is **C**. $Q = [\ce{Zn^{2+}}]/[\ce{Cu^{2+}}] = 1.00/0.010 = 100$. $E = 1.10 - (0.0592/2)\log(100) = 1.10 - (0.0296)(2) = 1.10 - 0.059 = 1.04$ V. With $[\ce{Cu^{2+}}]$ below standard (less driving force for reduction), the cell potential decreases below $E°$. Option A has the sign of the Nernst correction reversed — lower $[\ce{Cu^{2+}}]$ decreases, not increases, the potential. Option B ignores the Nernst equation entirely. Option D states an incorrect numerical result.

    **Concept Tested:** Nernst Equation / Non-Standard Conditions

---

#### 6. A concentration cell is constructed using two copper half-cells: one with $[\ce{Cu^{2+}}] = 0.010$ M (anode) and one with $[\ce{Cu^{2+}}] = 1.00$ M (cathode). Which of the following best explains why this cell produces a voltage?

<div class="upper-alpha" markdown>
1. The two electrodes are different metals, so they have different standard reduction potentials
2. The concentrated half-cell has a higher $K_a$, which drives electron flow toward it
3. The dilute half-cell oxidizes more easily because it has fewer ions to stabilize the electrode surface
4. The reaction $Q \neq 1$, so the Nernst equation gives $E \neq 0$ even though $E° = 0$ V
</div>

??? question "Show Answer"
    The correct answer is **D**. In a concentration cell, both electrodes are the same metal (copper), so $E° = 0$ V. However, $Q = [\ce{Cu^{2+}}]_{\text{anode}}/[\ce{Cu^{2+}}]_{\text{cathode}} = 0.010/1.00 = 0.010 \neq 1$. By the Nernst equation: $E = 0 - (0.0592/2)\log(0.010) = +0.059$ V. The cell runs spontaneously until both concentrations equalize. Option A is false — both electrodes are copper, so standard reduction potentials are identical. Option B introduces $K_a$ (an acid dissociation constant), which is irrelevant to this electrochemical system. Option C is conceptually vague and does not correctly invoke the Nernst equation.

    **Concept Tested:** Concentration Cells / Nernst Equation

---

#### 7. In an electrolytic cell used to electroplate silver onto a metal object, which of the following correctly identifies the object being plated and what happens at it?

<div class="upper-alpha" markdown>
1. The object is the anode; silver oxidizes and dissolves from the object into solution
2. The object is the cathode; $\ce{Ag+}$ ions are reduced and silver deposits onto the object
3. The object is the cathode; $\ce{Ag+}$ ions are oxidized and silver deposits onto the object
4. The object is the anode; $\ce{Ag+}$ ions are reduced from solution onto the object
</div>

??? question "Show Answer"
    The correct answer is **B**. In electroplating, the object to be plated is made the cathode (connected to the negative terminal of the power supply). $\ce{Ag+}$ ions in solution migrate to the cathode and are reduced: $\ce{Ag+ (aq) + e- -> Ag (s)}$, depositing a layer of silver metal on the object. Option A describes what happens to the silver anode (the silver source), not the object being plated. Option C has the correct electrode (cathode) but incorrect process — reduction, not oxidation, deposits the silver. Option D places reduction at the anode, which is incorrect.

    **Concept Tested:** Electroplating / Electrolytic Cells

---

#### 8. A current of 3.00 A flows for 40.0 minutes through a solution of $\ce{CuSO4}$. The half-reaction is $\ce{Cu^{2+} (aq) + 2 e- -> Cu (s)}$. How many grams of copper are deposited? ($M_{\ce{Cu}} = 63.55$ g/mol; $F = 96,485$ C/mol)

<div class="upper-alpha" markdown>
1. 4.73 g, deposited if the number of electrons transferred is not accounted for
2. 0.0373 g, calculated without converting minutes to seconds
3. 1.19 g, resulting from an error in the mole ratio step
4. 2.37 g, calculated using the correct stoichiometric chain $q \to n_{e^-} \to n_{\ce{Cu}} \to m$
</div>

??? question "Show Answer"
    The correct answer is **D**. Step 1 — charge: $q = 3.00 \text{ A} \times (40.0 \times 60 \text{ s}) = 7{,}200$ C. Step 2 — moles of electrons: $n_{e^-} = 7{,}200/96{,}485 = 0.07462$ mol. Step 3 — moles of Cu (2 electrons per $\ce{Cu^{2+}}$): $n_{\ce{Cu}} = 0.07462/2 = 0.03731$ mol. Step 4 — mass: $m = 0.03731 \times 63.55 = 2.37$ g. Option A omits dividing by $n = 2$ for the two-electron reduction. Option B results from not converting minutes to seconds before computing charge. Option C arises from an error in the mole-ratio step between electrons and copper atoms.

    **Concept Tested:** Faraday's Laws — Electrolysis Stoichiometry

---

#### 9. Iron corrodes more rapidly in salt water than in pure water. Which of the following best explains this observation in terms of electrochemical principles?

<div class="upper-alpha" markdown>
1. Salt water is a better electrolyte, increasing the conductivity of the solution and allowing faster ion migration to complete the corrosion circuit
2. Salt water has a lower pH, which increases $[\ce{H+}]$ and accelerates the oxidation of iron
3. Salt ions react chemically with iron to form $\ce{FeCl2}$, which is soluble and exposes fresh iron surface
4. The $\ce{Na+}$ ions act as a Lewis acid, accepting electrons from iron and promoting oxidation
</div>

??? question "Show Answer"
    The correct answer is **A**. Corrosion is an electrochemical process: iron acts as the anode (oxidized), and oxygen is reduced at the cathode, with the water acting as the electrolyte to complete the circuit. Salt ($\ce{NaCl}$) dissociates into $\ce{Na+}$ and $\ce{Cl-}$ ions, greatly increasing the ionic conductivity of the solution. Higher conductivity means lower resistance, faster ion migration, and a faster corrosion current. Option B is incorrect — salt water from dissolved $\ce{NaCl}$ is nearly neutral (pH ~7), not acidic. Option C overstates the role of direct chemical (non-electrochemical) reaction between salt and iron. Option D incorrectly attributes Lewis acid behavior to $\ce{Na+}$ as the primary driving force.

    **Concept Tested:** Corrosion — Electrochemical Mechanism

---

#### 10. For a galvanic cell reaction with $n = 3$ electrons transferred, $E°_{\text{cell}} = +0.80$ V, and a measured equilibrium constant $K$ much greater than 1, which of the following conclusions is consistent with all three pieces of information?

<div class="upper-alpha" markdown>
1. The reaction is non-spontaneous because $K > 1$ indicates a large activation energy barrier
2. The reaction is at equilibrium because $K > 1$ means the reverse reaction is favored at high concentrations
3. The reaction is spontaneous; $\Delta G° < 0$, $E°_{\text{cell}} > 0$, and $K > 1$ all indicate the same spontaneous forward direction
4. The standard free energy change is positive because a large $K$ corresponds to an endothermic reaction
</div>

??? question "Show Answer"
    The correct answer is **C**. The three thermodynamic indicators — $E°_{\text{cell}} > 0$, $\Delta G° < 0$, and $K > 1$ — are all equivalent statements of spontaneity for the forward reaction. They are mathematically linked: $\Delta G° = -nFE° = -RT\ln K$. When $E° > 0$, both $\Delta G° < 0$ and $K > 1$ follow necessarily. Option A confuses kinetics (activation energy) with thermodynamics (spontaneity); $K$ says nothing about activation energy. Option B misinterprets $K > 1$ — a large $K$ means the forward reaction is strongly favored at equilibrium, not the reverse. Option D incorrectly links $K > 1$ to endothermicity; $K > 1$ requires $\Delta G° < 0$, which is independent of whether $\Delta H$ is positive or negative.

    **Concept Tested:** Free Energy, Cell EMF, and Equilibrium Constant Relationships

---
