# Quiz: Reaction Mechanisms and Catalysis

Test your understanding of reaction mechanisms, elementary steps, rate-determining steps, intermediates, and catalysis with these questions.

---

#### 1. Which of the following is the correct definition of the molecularity of an elementary step?

<div class="upper-alpha" markdown>
1. The total number of products formed in the elementary step
2. The overall reaction order for the complete multi-step reaction
3. The number of reactant molecules (or atoms or ions) that collide in a single elementary step
4. The ratio of the rate constant for the forward step to the rate constant for the reverse step
</div>

??? question "Show Answer"
    The correct answer is **C**. Molecularity refers specifically to the number of species that collide or interact in a single elementary step. It is always a small positive integer (1, 2, or rarely 3) and applies only to elementary steps — never to overall multi-step reactions. Option A confuses molecularity with the number of products. Option B confuses molecularity with overall reaction order. Option D describes an equilibrium constant ratio, not molecularity.

    **Concept Tested:** Molecularity

---

#### 2. Consider the following proposed two-step mechanism:

**Step 1 (slow):** $\ce{NO2 + NO2 -> NO3 + NO}$

**Step 2 (fast):** $\ce{NO3 + CO -> NO2 + CO2}$

Which of the following is the overall balanced equation for this reaction?

<div class="upper-alpha" markdown>
1. $\ce{2NO2 + CO -> NO3 + NO + CO2}$
2. $\ce{NO2 + CO -> NO + CO2}$
3. $\ce{NO3 + CO -> NO2 + CO2}$
4. $\ce{2NO2 + 2CO -> 2NO + 2CO2}$
</div>

??? question "Show Answer"
    The correct answer is **B**. Adding the two elementary steps and canceling intermediates: $\ce{NO2 + \cancel{NO2} + \cancel{NO3} + CO -> \cancel{NO3} + NO + \cancel{NO2} + CO2}$. The species $\ce{NO3}$ appears as a product of step 1 and a reactant of step 2 — it is an intermediate and cancels. One $\ce{NO2}$ is regenerated in step 2 and also cancels. The net result is $\ce{NO2 + CO -> NO + CO2}$. Option A retains the intermediate $\ce{NO3}$ rather than canceling it. Option C is just step 2 alone. Option D incorrectly doubles all coefficients.

    **Concept Tested:** Reaction Mechanisms — Elementary Steps Sum to Overall Equation

---

#### 3. For the mechanism in question 2, what rate law does the mechanism predict?

<div class="upper-alpha" markdown>
1. $\text{rate} = k[\ce{NO2}][\ce{CO}]$
2. $\text{rate} = k[\ce{NO3}][\ce{CO}]$
3. $\text{rate} = k[\ce{NO2}]^2$
4. $\text{rate} = k[\ce{NO2}][\ce{CO}]^2$
</div>

??? question "Show Answer"
    The correct answer is **C**. The rate-determining step (RDS) is step 1 (the slow step): $\ce{NO2 + NO2 -> NO3 + NO}$. Because this is a bimolecular elementary step, its rate law is written directly from its stoichiometry: $\text{rate} = k[\ce{NO2}]^2$. The rate is second order in $\ce{NO2}$ and zero order in $\ce{CO}$, because $\ce{CO}$ does not appear until the fast step 2, which does not control the overall rate. Option A includes $\ce{CO}$, which is not in the RDS. Option B uses the intermediate $\ce{NO3}$, which cannot appear in the final rate law. Option D is neither derived from the RDS nor from the overall stoichiometry.

    **Concept Tested:** Rate-Determining Step

---

#### 4. In the mechanism from question 2, what is the role of $\ce{NO3}$?

<div class="upper-alpha" markdown>
1. It is a catalyst because it is regenerated at the end of the mechanism.
2. It is a reaction intermediate because it is produced in one step and consumed in a subsequent step.
3. It is a transition state because it exists at the energy maximum between steps 1 and 2.
4. It is a spectator ion because it does not participate in any chemical bonding changes.
</div>

??? question "Show Answer"
    The correct answer is **B**. A reaction intermediate is a species that appears as a product in one elementary step and is consumed as a reactant in a later step, but does not appear in the overall balanced equation. $\ce{NO3}$ is produced in step 1 and consumed in step 2 — it is a classic intermediate. Option A is incorrect: $\ce{NO3}$ is not regenerated at the end of the mechanism, so it is not a catalyst. Option C confuses intermediates (which occupy local energy minima and have finite lifetimes) with transition states (which sit at energy maxima and exist only instantaneously). Option D misapplies the spectator ion concept, which applies to ions that remain unchanged in solution, not to intermediates in mechanisms.

    **Concept Tested:** Reaction Intermediates

---

#### 5. A proposed mechanism must satisfy two requirements to be considered valid. Which pair correctly identifies both requirements?

<div class="upper-alpha" markdown>
1. The mechanism must minimize the total number of elementary steps and include no bimolecular steps.
2. The elementary steps must sum to the correct overall equation AND the predicted rate law must match the experimentally determined rate law.
3. The mechanism must have a termolecular rate-determining step and produce no reaction intermediates.
4. The rate law derived from the mechanism must match the balanced equation's stoichiometry AND the mechanism must not include unimolecular steps.
</div>

??? question "Show Answer"
    The correct answer is **B**. A proposed mechanism is valid only if it passes two independent tests: (1) stoichiometric consistency — the steps sum algebraically to the correct overall balanced equation, with all intermediates canceling — and (2) rate law consistency — the rate law derived from the rate-determining step matches the experimentally measured rate law. Neither of these tests alone is sufficient. Options A and C describe criteria that are not part of mechanism validation. Option D incorrectly ties the rate law to balanced equation stoichiometry (which is not how rate laws are determined) and incorrectly excludes unimolecular steps.

    **Concept Tested:** Mechanism Validation

---

#### 6. A student proposes a mechanism in which a fast pre-equilibrium step precedes the slow rate-determining step. The intermediate $[\ce{X}]$ formed in the fast step appears in the rate-determining step's rate expression. Which approach correctly eliminates the intermediate from the final rate law?

<div class="upper-alpha" markdown>
1. Set $[\ce{X}]$ equal to zero because intermediates are always present in negligible concentrations.
2. Use the pre-equilibrium approximation: set the forward and reverse rates of the fast step equal to express $[\ce{X}]$ in terms of reactant concentrations.
3. Replace $[\ce{X}]$ with the concentration of the product formed in the fast step.
4. Ignore any elementary step that contains the intermediate when writing the overall rate law.
</div>

??? question "Show Answer"
    The correct answer is **B**. When a fast reversible step precedes the rate-determining step, the pre-equilibrium approximation applies: the fast step reaches equilibrium quickly, so its forward and reverse rates are equal. Setting $k_f[\text{reactants}] = k_r[\ce{X}]$ and solving gives $[\ce{X}] = (k_f/k_r)[\text{reactants}] = K_{eq}[\text{reactants}]$. This substitution eliminates the intermediate from the rate-determining step's rate law, yielding a rate law expressed entirely in terms of measurable reactant concentrations. Option A incorrectly treats all intermediates as negligible. Option C has no theoretical basis. Option D would produce an incorrect result by ignoring mechanistic steps.

    **Concept Tested:** Mechanism Validation — Pre-Equilibrium Approximation

---

#### 7. Which of the following correctly describes the effect of a catalyst on the thermodynamics and kinetics of a chemical reaction?

<div class="upper-alpha" markdown>
1. A catalyst lowers $E_a$, increases $k$, and shifts the equilibrium position toward products.
2. A catalyst lowers $E_a$, increases $k$, but does not change $\Delta H$, $\Delta G$, or the equilibrium constant $K$.
3. A catalyst increases $\Delta H$ for the forward reaction while lowering $E_a$ for the reverse reaction only.
4. A catalyst increases $k$ for the forward reaction but has no effect on the rate of the reverse reaction.
</div>

??? question "Show Answer"
    The correct answer is **B**. A catalyst provides an alternative reaction pathway with lower activation energy, increasing the rate constant $k$ (as quantified by the Arrhenius equation $k = Ae^{-E_a/RT}$). However, a catalyst does not change the thermodynamics: $\Delta H$, $\Delta G$, and $K$ remain identical because the reactant and product energy levels are unchanged. Option A is incorrect: catalysts do not shift the equilibrium position. Option C is incorrect: $\Delta H$ is determined by reactant and product energies, which the catalyst does not alter. Option D is incorrect: catalysts speed up both the forward and reverse reactions equally, reaching equilibrium faster without changing its position.

    **Concept Tested:** Catalyst Effect on Activation Energy and Equilibrium

---

#### 8. In heterogeneous catalysis, in which order do the following stages typically occur at a solid catalyst surface?

<div class="upper-alpha" markdown>
1. Surface reaction → adsorption → desorption
2. Desorption → surface reaction → adsorption
3. Adsorption → surface reaction → desorption
4. Adsorption → desorption → surface reaction
</div>

??? question "Show Answer"
    The correct answer is **C**. Heterogeneous catalysis at a solid surface proceeds in three stages: (1) **Adsorption** — reactant molecules bind to active sites on the catalyst surface, often weakening existing bonds; (2) **Surface reaction** — adsorbed species react with each other or rearrange on the surface; (3) **Desorption** — product molecules detach from the surface and diffuse away, freeing active sites for additional reactant molecules. This sequence is the mechanistic foundation for industrial processes such as the Haber-Bosch synthesis of ammonia on iron. Options A, B, and D all present incorrect orderings of these stages.

    **Concept Tested:** Heterogeneous Catalysis

---

#### 9. Chlorine radicals from chlorofluorocarbons (CFCs) catalyze the destruction of stratospheric ozone through the following two elementary steps:

**Step 1:** $\ce{Cl + O3 -> ClO + O2}$

**Step 2:** $\ce{ClO + O -> Cl + O2}$

This is an example of which type of catalysis, and what evidence from the mechanism supports this classification?

<div class="upper-alpha" markdown>
1. Heterogeneous catalysis, because Cl is a solid at stratospheric temperatures.
2. Enzyme catalysis, because the Cl radical binds to a specific active site on $\ce{O3}$.
3. Homogeneous catalysis, because the Cl radical catalyst and the $\ce{O3}$ reactant are both in the gas phase.
4. Heterogeneous catalysis, because the Cl radical is in a different phase from the stratospheric aerosol particles.
</div>

??? question "Show Answer"
    The correct answer is **C**. In homogeneous catalysis, the catalyst and the reactants are in the same phase. Both the Cl radical and $\ce{O3}$ are gases in the stratosphere. The Cl is consumed in step 1 but regenerated in step 2, confirming its role as a catalyst. One Cl atom can destroy thousands of ozone molecules before being deactivated. Option A is factually incorrect: Cl radicals are gas-phase species, not solids. Option B misapplies the enzyme concept, which requires protein active sites. Option D misidentifies the phase relationship — both species are in the gas phase.

    **Concept Tested:** Homogeneous Catalysis

---

#### 10. A student analyzes concentration-versus-time data for two reactions and finds: Reaction 1 has a constant half-life regardless of initial concentration; Reaction 2 has a half-life that decreases as concentration decreases. What are the respective reaction orders?

<div class="upper-alpha" markdown>
1. Reaction 1 is zero order; Reaction 2 is first order.
2. Reaction 1 is second order; Reaction 2 is first order.
3. Reaction 1 is first order; Reaction 2 is zero order.
4. Reaction 1 is first order; Reaction 2 is second order.
</div>

??? question "Show Answer"
    The correct answer is **C**. A constant half-life (independent of initial concentration) is the defining characteristic of **first-order** reactions: $t_{1/2} = 0.693/k$. For **zero-order** reactions, $t_{1/2} = [\text{A}]_0 / (2k)$, meaning half-life decreases as $[\text{A}]_0$ decreases — each successive half-life is shorter as the reactant is consumed. Option D is a common distractor: second-order half-life $t_{1/2} = 1/(k[\text{A}]_0)$ actually increases as concentration decreases — the opposite of what is described for Reaction 2. Options A and B have the half-life behavior descriptions inverted.

    **Concept Tested:** Half-Life and Reaction Order — Determining Reaction Order

---
