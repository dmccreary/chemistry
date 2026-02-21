# Quiz: Chemical Equilibrium

Test your understanding of dynamic equilibrium, equilibrium constants, ICE tables, the reaction quotient, and Le Chatelier's principle with these questions.

---

#### 1. At chemical equilibrium, which of the following statements is TRUE?

<div class="upper-alpha" markdown>
1. The concentrations of reactants and products are equal.
2. No further molecular-level reactions are occurring.
3. The value of the equilibrium constant $K$ is always equal to 1.
4. The forward and reverse reaction rates are equal.
</div>

??? question "Show Answer"
    The correct answer is **D**. Dynamic equilibrium occurs when the rate of the forward reaction equals the rate of the reverse reaction, resulting in constant (but not necessarily equal) concentrations. Molecular-level conversion continues in both directions at the same rate. $K = 1$ only when products and reactants happen to be equally favored; it can take any positive value.

    **Concept Tested:** Dynamic Equilibrium

---

#### 2. For the heterogeneous equilibrium $\ce{CaCO3(s) <=> CaO(s) + CO2(g)}$, which expression correctly represents $K_c$?

<div class="upper-alpha" markdown>
1. $K_c = \dfrac{[\ce{CaO}][\ce{CO2}]}{[\ce{CaCO3}]}$
2. $K_c = [\ce{CO2}][\ce{CaO}]$
3. $K_c = [\ce{CO2}]$
4. $K_c = \dfrac{[\ce{CO2}]}{[\ce{CaCO3}]}$
</div>

??? question "Show Answer"
    The correct answer is **C**. Pure solids ($\ce{CaCO3}$ and $\ce{CaO}$) are omitted from the $K$ expression because their concentrations are constant and effectively incorporated into $K$. Only the gaseous species $\ce{CO2}$ remains, giving $K_c = [\ce{CO2}]$. Options A and D incorrectly include solid species. Option B includes solid $\ce{CaO}$.

    **Concept Tested:** Heterogeneous Equilibrium / Writing K Expressions

---

#### 3. For the reaction $\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$, $K_c = 6.0 \times 10^{-2}$ at 500 °C. At the same temperature, $\Delta n_\text{gas} = 2 - 4 = -2$. What is $K_p$ if $R = 0.08206\,\text{L·atm/mol·K}$ and $T = 773\,\text{K}$?

<div class="upper-alpha" markdown>
1. $K_p = K_c$, so $K_p = 6.0 \times 10^{-2}$
2. $K_p = 6.0 \times 10^{-2} \times (0.08206 \times 773)^{-2} = 1.4 \times 10^{-5}$
3. $K_p = 6.0 \times 10^{-2} \times (0.08206 \times 773)^{2} = 2.5 \times 10^{1}$
4. $K_p = 6.0 \times 10^{-2} \times (0.08206)^{-2} = 8.9 \times 10^{-3}$
</div>

??? question "Show Answer"
    The correct answer is **B**. The relationship is $K_p = K_c(RT)^{\Delta n}$. Here $\Delta n = -2$, so $K_p = (6.0 \times 10^{-2})(0.08206 \times 773)^{-2} = (6.0 \times 10^{-2})/(63.44)^2 = (6.0 \times 10^{-2})/4024 \approx 1.49 \times 10^{-5}$. Option A incorrectly assumes $K_p = K_c$ (only true when $\Delta n = 0$). Option C uses $+2$ for $\Delta n$ instead of $-2$. Option D omits the temperature from the $RT$ term.

    **Concept Tested:** $K_c$ and $K_p$ Relationship

---

#### 4. For the equilibrium $\ce{H2(g) + I2(g) <=> 2HI(g)}$ with $K_c = 55.3$ at 700 K, the following concentrations are measured: $[\ce{H2}] = 0.150\,\text{M}$, $[\ce{I2}] = 0.150\,\text{M}$, $[\ce{HI}] = 0.900\,\text{M}$. What will happen next?

<div class="upper-alpha" markdown>
1. The reaction will shift in the reverse direction because $Q > K$.
2. The system is at equilibrium because the concentrations are constant.
3. The reaction will shift in the forward direction because $Q < K$.
4. The reaction will shift in the forward direction because $Q > K$.
</div>

??? question "Show Answer"
    The correct answer is **C**. $Q_c = (0.900)^2/[(0.150)(0.150)] = 0.810/0.0225 = 36.0$. Since $Q = 36.0 < K = 55.3$, there is too little product relative to equilibrium. The reaction shifts forward (right) to produce more $\ce{HI}$ until $Q = K$. Option A misidentifies the direction for $Q < K$. Option B is incorrect because concentrations that happen to be listed are not necessarily equilibrium values. Option D contradicts the Q vs K rule.

    **Concept Tested:** Reaction Quotient Q / Predicting Direction

---

#### 5. A reaction vessel is charged with $[\ce{PCl5}]_0 = 0.500\,\text{M}$ and no products. For $\ce{PCl5(g) <=> PCl3(g) + Cl2(g)}$ with $K_c = 0.030$, set up the ICE table and solve for $x$ (the change in concentration). Which answer is correct?

<div class="upper-alpha" markdown>
1. $x = 0.108\,\text{M}$; $[\ce{PCl5}]_{eq} = 0.392\,\text{M}$
2. $x = 0.500\,\text{M}$; $[\ce{PCl5}]_{eq} = 0$
3. $x = 0.122\,\text{M}$; $[\ce{PCl5}]_{eq} = 0.378\,\text{M}$
4. $x = 0.030\,\text{M}$; $[\ce{PCl5}]_{eq} = 0.470\,\text{M}$
</div>

??? question "Show Answer"
    The correct answer is **A**. Setting up the ICE table: $K_c = x^2/(0.500 - x) = 0.030$ rearranges to $x^2 + 0.030x - 0.015 = 0$. Using the quadratic formula: $x = (-0.030 + \sqrt{0.0009 + 0.060})/2 = (-0.030 + 0.247)/2 = 0.108\,\text{M}$. Equilibrium: $[\ce{PCl5}] = 0.500 - 0.108 = 0.392\,\text{M}$. Option B assumes complete reaction, ignoring the equilibrium. Option C uses an incorrect quadratic setup. Option D sets $x = K_c$, which has no mathematical basis.

    **Concept Tested:** ICE Table Calculations / Quadratic Equilibrium Problems

---

#### 6. For the Haber process $\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$ at equilibrium, what is the effect of adding more $\ce{N2}$ gas to the system at constant volume and temperature?

<div class="upper-alpha" markdown>
1. The equilibrium constant $K$ increases.
2. The reaction shifts in the reverse direction to consume the added $\ce{N2}$.
3. There is no effect because the system is already at equilibrium.
4. The reaction shifts in the forward direction, producing more $\ce{NH3}$.
</div>

??? question "Show Answer"
    The correct answer is **D**. By Le Chatelier's principle, adding $\ce{N2}$ increases its concentration, making $Q < K$. The system shifts forward (toward products) to partially consume the added $\ce{N2}$ and produce more $\ce{NH3}$ until a new equilibrium is established. Adding a reactant never changes the value of $K$ — only temperature does. Option B is backward. Option C ignores the principle of Le Chatelier.

    **Concept Tested:** Le Chatelier's Principle / Concentration Changes

---

#### 7. The decomposition $\ce{N2O4(g) <=> 2NO2(g)}$ is endothermic ($\Delta H° > 0$). What is the effect of raising the temperature on the equilibrium constant $K$?

<div class="upper-alpha" markdown>
1. $K$ decreases because higher temperature always disfavors reactions.
2. $K$ increases because heat acts as a reactant in an endothermic reaction.
3. $K$ remains unchanged because $K$ only depends on the reaction equation.
4. $K$ increases because the increased pressure at higher temperature favors the side with more gas moles.
</div>

??? question "Show Answer"
    The correct answer is **B**. For an endothermic reaction, heat can be thought of as a "reactant." Increasing temperature adds heat to the system, shifting equilibrium to the right (toward products), which increases $K$. Temperature is the only stress that changes the value of $K$; all other stresses only shift the equilibrium position. Option A is correct for exothermic reactions but not endothermic ones. Option C is incorrect — $K$ depends on temperature. Option D confuses pressure effects with temperature effects on $K$.

    **Concept Tested:** Temperature Changes on K / Le Chatelier's Principle

---

#### 8. An inert gas such as argon is added to a sealed container in which the equilibrium $\ce{2SO2(g) + O2(g) <=> 2SO3(g)}$ is established, at constant volume. What happens to the equilibrium?

<div class="upper-alpha" markdown>
1. The equilibrium shifts right because total pressure increased.
2. The equilibrium shifts left because the mole fraction of reactants decreased.
3. There is no change in equilibrium position because partial pressures of reacting species are unchanged.
4. $K$ increases because the total number of gas molecules increased.
</div>

??? question "Show Answer"
    The correct answer is **C**. Adding an inert gas at constant volume does not change the partial pressures (or molar concentrations) of any reacting species — these quantities determine $Q$ and hence the equilibrium position. Because $Q$ is unchanged and still equals $K$, there is no shift. Only an inert gas added at constant total pressure (causing volume to expand) would shift the equilibrium. $K$ is also unchanged — only temperature affects $K$.

    **Concept Tested:** Adding Inert Gas / Le Chatelier's Principle

---

#### 9. A catalyst is added to a system already at equilibrium. Which of the following correctly describes the result?

<div class="upper-alpha" markdown>
1. The catalyst shifts the equilibrium toward products by lowering the activation energy of the forward reaction only.
2. The catalyst increases the value of $K$ by making the forward reaction more favorable.
3. The catalyst does not change $K$ or the equilibrium position; it only increases the rate of reaching equilibrium.
4. The catalyst increases both $K$ and the equilibrium concentrations of products.
</div>

??? question "Show Answer"
    The correct answer is **C**. A catalyst lowers the activation energy for both the forward and reverse reactions by exactly the same amount, so the ratio $k_f/k_r$ (which equals $K$) is unchanged. The equilibrium position and concentrations at equilibrium are identical with or without a catalyst. The only effect is that equilibrium is reached faster. This is a classic AP exam trap.

    **Concept Tested:** Effect of Catalyst on Equilibrium

---

#### 10. Using $\Delta G° = -RT \ln K$, if $\Delta G° = -32.9\,\text{kJ/mol}$ at 298 K, calculate $K$ ($R = 8.314\,\text{J/mol·K}$).

<div class="upper-alpha" markdown>
1. $K \approx 5.9 \times 10^5$
2. $K = 1.0$
3. $K \approx 1.7 \times 10^{-6}$
4. $K \approx 32.9$
</div>

??? question "Show Answer"
    The correct answer is **A**. $K = e^{-\Delta G°/RT} = e^{-(-32{,}900)/(8.314 \times 298)} = e^{13.28} \approx 5.9 \times 10^5$. A large negative $\Delta G°$ produces a large $K$, confirming products are strongly favored. Option B would correspond to $\Delta G° = 0$. Option C is $e^{-13.28}$, which results from using the wrong sign. Option D is simply the magnitude of $\Delta G°$ with units changed, not an equilibrium constant.

    **Concept Tested:** Gibbs Free Energy and Equilibrium / $\Delta G° = -RT \ln K$

---
