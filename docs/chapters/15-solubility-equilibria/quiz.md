# Quiz: Solubility Equilibria

Test your understanding of the solubility product, molar solubility, the common ion effect, precipitation prediction, complex ion formation, and Henry's law with these questions.

---

#### 1. Write the correct $K_{sp}$ expression for the dissolution of $\ce{Ag2CrO4}$.

$$\ce{Ag2CrO4(s) <=> 2Ag+(aq) + CrO4^{2-}(aq)}$$

<div class="upper-alpha" markdown>
1. $K_{sp} = [\ce{Ag+}]^2[\ce{CrO4^{2-}}]$
2. $K_{sp} = [\ce{Ag+}][\ce{CrO4^{2-}}]$
3. $K_{sp} = \dfrac{[\ce{Ag+}]^2[\ce{CrO4^{2-}}]}{[\ce{Ag2CrO4}]}$
4. $K_{sp} = 2[\ce{Ag+}][\ce{CrO4^{2-}}]$
</div>

??? question "Show Answer"
    The correct answer is **A**. The $K_{sp}$ expression is the product of ion concentrations each raised to the power of their stoichiometric coefficient. For $\ce{Ag2CrO4}$: $K_{sp} = [\ce{Ag+}]^2[\ce{CrO4^{2-}}]^1$. The solid $\ce{Ag2CrO4}$ is omitted because it is a pure solid. Option B omits the exponent of 2 on $[\ce{Ag+}]$. Option C incorrectly includes the solid in the denominator. Option D multiplies by 2 rather than squaring.

    **Concept Tested:** Solubility Product $K_{sp}$ / Writing Ksp Expressions

---

#### 2. The $K_{sp}$ of $\ce{AgCl}$ is $1.8 \times 10^{-10}$ at 25 °C. What is the molar solubility of $\ce{AgCl}$ in pure water?

<div class="upper-alpha" markdown>
1. $1.8 \times 10^{-10}\,\text{M}$
2. $1.3 \times 10^{-5}\,\text{M}$
3. $3.6 \times 10^{-10}\,\text{M}$
4. $9.0 \times 10^{-6}\,\text{M}$
</div>

??? question "Show Answer"
    The correct answer is **B**. Setting up the ICE table: $[\ce{Ag+}] = [\ce{Cl-}] = s$, so $K_{sp} = s^2 = 1.8 \times 10^{-10}$. Therefore $s = \sqrt{1.8 \times 10^{-10}} = 1.34 \times 10^{-5}\,\text{M} \approx 1.3 \times 10^{-5}\,\text{M}$. Option A is the $K_{sp}$ itself, not the square root. Option C doubles $K_{sp}$ instead of taking the square root. Option D results from an arithmetic error in the square root calculation.

    **Concept Tested:** Molar Solubility from $K_{sp}$

---

#### 3. The $K_{sp}$ of $\ce{PbI2}$ is $7.1 \times 10^{-9}$. Which expression correctly gives the molar solubility $s$ of $\ce{PbI2}$ in pure water?

$$\ce{PbI2(s) <=> Pb^{2+}(aq) + 2I-(aq)}$$

<div class="upper-alpha" markdown>
1. $s = \sqrt{7.1 \times 10^{-9}}$
2. $s^2 = 7.1 \times 10^{-9}$, so $s = 8.4 \times 10^{-5}\,\text{M}$
3. $4s^3 = 7.1 \times 10^{-9}$, so $s = \left(\dfrac{7.1 \times 10^{-9}}{4}\right)^{1/3}$
4. $2s^2 = 7.1 \times 10^{-9}$, so $s = 5.96 \times 10^{-5}\,\text{M}$
</div>

??? question "Show Answer"
    The correct answer is **C**. For $\ce{PbI2}$, $[\ce{Pb^{2+}}] = s$ and $[\ce{I-}] = 2s$, so $K_{sp} = (s)(2s)^2 = 4s^3 = 7.1 \times 10^{-9}$, giving $s = (7.1 \times 10^{-9}/4)^{1/3} = (1.775 \times 10^{-9})^{1/3} \approx 1.2 \times 10^{-3}\,\text{M}$. Options A and B apply the 1:1 formula incorrectly (missing the factor of 4 from stoichiometry). Option D uses the coefficient 2 as a multiplier instead of squaring the iodide term.

    **Concept Tested:** Ksp Calculations / Stoichiometry in Molar Solubility

---

#### 4. What is the molar solubility of $\ce{AgCl}$ ($K_{sp} = 1.8 \times 10^{-10}$) in a solution that already contains 0.100 M $\ce{NaCl}$?

<div class="upper-alpha" markdown>
1. $1.8 \times 10^{-9}\,\text{M}$ — greatly reduced by the common ion effect
2. $1.3 \times 10^{-5}\,\text{M}$ — the same as in pure water
3. $1.8 \times 10^{-11}\,\text{M}$ — reduced because $K_{sp}$ itself decreases
4. $1.8 \times 10^{-8}\,\text{M}$ — slightly reduced due to ionic strength effects
</div>

??? question "Show Answer"
    The correct answer is **A**. In the presence of 0.100 M $\ce{Cl-}$ (from $\ce{NaCl}$), the ICE table gives $K_{sp} = s(0.100 + s) \approx s(0.100) = 1.8 \times 10^{-10}$, so $s = 1.8 \times 10^{-9}\,\text{M}$. This is over 7,000 times less soluble than in pure water — the common ion effect. Option B ignores the common ion entirely. Option C incorrectly states $K_{sp}$ changes ($K_{sp}$ is constant at fixed temperature). Option D uses incorrect arithmetic.

    **Concept Tested:** Common Ion Effect / Molar Solubility

---

#### 5. When 100 mL of 0.200 M $\ce{Pb(NO3)2}$ is mixed with 100 mL of 0.200 M $\ce{NaI}$, will $\ce{PbI2}$ ($K_{sp} = 7.1 \times 10^{-9}$) precipitate?

<div class="upper-alpha" markdown>
1. No, because after mixing $[\ce{Pb^{2+}}] = [\ce{I-}] = 0.100\,\text{M}$ and $Q_{sp} < K_{sp}$.
2. Yes, because after mixing $Q_{sp} = 1.0 \times 10^{-3} \gg K_{sp} = 7.1 \times 10^{-9}$.
3. No, because $\ce{PbI2}$ is soluble in water at room temperature.
4. Yes, but only if the temperature is raised above 25 °C to exceed the solubility limit.
</div>

??? question "Show Answer"
    The correct answer is **B**. After mixing equal volumes, concentrations are halved: $[\ce{Pb^{2+}}] = [\ce{I-}] = 0.100\,\text{M}$. Then $Q_{sp} = (0.100)(0.100)^2 = 1.0 \times 10^{-3}$. Since $Q_{sp} = 1.0 \times 10^{-3} \gg K_{sp} = 7.1 \times 10^{-9}$, the solution is supersaturated and $\ce{PbI2}$ precipitates. Option A incorrectly evaluates the comparison. Options C and D mischaracterize the chemistry.

    **Concept Tested:** Ion Product / Predicting Precipitation

---

#### 6. A solution contains both $\ce{Ag+}$ and $\ce{Pb^{2+}}$ each at 0.100 M. Chloride ion is slowly added. Which ion precipitates first, and why?

$K_{sp}(\ce{AgCl}) = 1.8 \times 10^{-10}$; $K_{sp}(\ce{PbCl2}) = 1.7 \times 10^{-5}$

<div class="upper-alpha" markdown>
1. $\ce{Pb^{2+}}$ precipitates first because $K_{sp}(\ce{PbCl2})$ is larger.
2. $\ce{Ag+}$ precipitates first because $\ce{AgCl}$ requires a much lower $[\ce{Cl-}]$ to begin precipitation.
3. Both ions precipitate simultaneously because they are at the same initial concentration.
4. $\ce{Ag+}$ precipitates first because silver has a higher molar mass than lead.
</div>

??? question "Show Answer"
    The correct answer is **B**. $\ce{AgCl}$ begins to precipitate when $[\ce{Cl-}] > K_{sp}/[\ce{Ag+}] = 1.8 \times 10^{-10}/0.100 = 1.8 \times 10^{-9}\,\text{M}$. $\ce{PbCl2}$ begins to precipitate when $[\ce{Cl-}] > \sqrt{K_{sp}/[\ce{Pb^{2+}}]} = \sqrt{1.7 \times 10^{-4}} = 0.013\,\text{M}$. Because $\ce{AgCl}$ requires a far smaller $[\ce{Cl-}]$ to start precipitating, $\ce{Ag+}$ is removed first. Option A confuses larger $K_{sp}$ with precipitating first. Molar mass is irrelevant (option D).

    **Concept Tested:** Selective Precipitation

---

#### 7. $\ce{AgCl}$ barely dissolves in pure water, but dissolves readily in concentrated ammonia solution. The best explanation is:

<div class="upper-alpha" markdown>
1. $\ce{NH3}$ reacts with $\ce{Cl-}$ to form a new precipitate, removing it from solution.
2. $\ce{NH3}$ increases the temperature of the solution, raising $K_{sp}$.
3. $\ce{NH3}$ forms the complex ion $\ce{Ag(NH3)2+}$, removing $\ce{Ag+}$ from solution and shifting dissolution equilibrium to the right.
4. $\ce{NH3}$ neutralizes the $\ce{Cl-}$ ions, reducing $Q_{sp}$ below $K_{sp}$.
</div>

??? question "Show Answer"
    The correct answer is **C**. Ammonia acts as a ligand and reacts with $\ce{Ag+}$ to form the stable complex ion $\ce{Ag(NH3)2+}$ ($K_f = 1.7 \times 10^7$). This removes free $\ce{Ag+}$ from solution, lowering $Q_{sp}$ below $K_{sp}$ and shifting the dissolution equilibrium to the right (Le Chatelier's principle). The net $K = K_{sp} \times K_f = 3.1 \times 10^{-3}$ is much larger than $K_{sp}$ alone. The other options misidentify the chemical mechanism.

    **Concept Tested:** Complex Ion Formation / Effect on Solubility

---

#### 8. The dissolution of most ionic solids in water is endothermic. Applying Le Chatelier's principle, what happens to solubility as temperature increases?

<div class="upper-alpha" markdown>
1. Solubility decreases because higher temperature reduces the value of $K_{sp}$.
2. Solubility is unaffected because $K_{sp}$ is a constant.
3. Solubility decreases because ions move faster and recombine more readily at higher temperature.
4. Solubility increases because heat shifts the dissolution equilibrium to the right.
</div>

??? question "Show Answer"
    The correct answer is **D**. For an endothermic dissolution, heat can be thought of as a reactant. Raising the temperature shifts the equilibrium to the right (more dissolution), increasing $K_{sp}$ and therefore increasing molar solubility. Option A states the opposite trend. Option B is wrong because $K_{sp}$ varies with temperature. Option C incorrectly describes the kinetics and thermodynamics of the process.

    **Concept Tested:** Temperature and Solubility

---

#### 9. A soda bottle is pressurized with $\ce{CO2}$ at 3.0 atm. The Henry's law constant for $\ce{CO2}$ is $k_H = 3.4 \times 10^{-2}\,\text{mol/L·atm}$. What is the concentration of dissolved $\ce{CO2}$ in the sealed bottle?

<div class="upper-alpha" markdown>
1. $1.1 \times 10^{-2}\,\text{mol/L}$
2. $8.8\,\text{mol/L}$
3. $3.4 \times 10^{-2}\,\text{mol/L}$
4. $1.0 \times 10^{-1}\,\text{mol/L}$
</div>

??? question "Show Answer"
    The correct answer is **D**. By Henry's law: $C = k_H \times P = (3.4 \times 10^{-2}\,\text{mol/L·atm})(3.0\,\text{atm}) = 0.102\,\text{mol/L} \approx 1.0 \times 10^{-1}\,\text{mol/L}$. Option A divides instead of multiplies. Option C uses only the Henry's constant without multiplying by pressure. Option B incorrectly uses pressure in a reciprocal calculation. Henry's law is a direct proportion: higher pressure means more gas dissolves.

    **Concept Tested:** Henry's Law / Gas Solubility

---

#### 10. Two equilibria are combined to find the net $K$ for $\ce{AgCl(s) + 2NH3(aq) <=> Ag(NH3)2+(aq) + Cl-(aq)}$:

$$K_{sp}(\ce{AgCl}) = 1.8 \times 10^{-10}; \quad K_f(\ce{Ag(NH3)2+}) = 1.7 \times 10^{7}$$

Which mathematical operation and result are correct?

<div class="upper-alpha" markdown>
1. $K_\text{net} = K_{sp} + K_f = 1.7 \times 10^{7}$
2. $K_\text{net} = K_{sp} / K_f = 1.1 \times 10^{-17}$
3. $K_\text{net} = K_{sp} \times K_f = 3.1 \times 10^{-3}$
4. $K_\text{net} = \sqrt{K_{sp} \times K_f} = 5.5 \times 10^{-2}$
</div>

??? question "Show Answer"
    The correct answer is **C**. When two reactions are added together, their equilibrium constants are multiplied: $K_\text{net} = K_1 \times K_2 = (1.8 \times 10^{-10})(1.7 \times 10^7) = 3.1 \times 10^{-3}$. This value, much larger than $K_{sp}$ alone, explains why $\ce{AgCl}$ dissolves readily in ammonia. Option A adds the constants (incorrect for combining equilibria). Option B divides (this would apply if one reaction were the reverse of the other). Option D takes the square root for no valid reason.

    **Concept Tested:** Manipulating K Expressions / Adding Reactions

---
