# Quiz: Buffers and Acid-Base Titrations

Test your understanding of buffer solutions, Henderson-Hasselbalch calculations, titration curves, and indicator selection with these questions.

---

#### 1. Which of the following solutions functions as a buffer?

<div class="upper-alpha" markdown>
1. 0.10 M $\ce{CH3COOH}$ and 0.10 M $\ce{CH3COONa}$
2. 0.10 M $\ce{HCl}$ and 0.10 M $\ce{NaCl}$
3. 0.10 M $\ce{NaOH}$ and 0.10 M $\ce{NaCl}$
4. 0.10 M $\ce{HCl}$ and 0.10 M $\ce{NaOH}$
</div>

??? question "Show Answer"
    The correct answer is **A**. A buffer requires a weak acid paired with its conjugate base (or a weak base with its conjugate acid). Acetic acid ($\ce{CH3COOH}$) and sodium acetate ($\ce{CH3COONa}$) provide the conjugate pair needed to neutralize added acid or base. Option B pairs a strong acid with its spectator anion — no buffering occurs. Option C pairs a strong base with a spectator salt — not a buffer pair. Option D neutralizes completely to produce salt and water, not a buffer.

    **Concept Tested:** Buffer Composition

---

#### 2. A buffer is prepared by mixing 0.200 mol $\ce{CH3COOH}$ and 0.300 mol $\ce{CH3COONa}$ in 1.00 L of solution. Given $pK_a = 4.74$ for acetic acid, what is the pH of this buffer?

<div class="upper-alpha" markdown>
1. 4.74, because the $pK_a$ value equals the pH whenever a buffer is present
2. 4.56, because the acid concentration is lower than the conjugate base concentration
3. 5.22, because the pH must be above the $pK_a$ when the conjugate base is in excess
4. 4.92, calculated using the Henderson-Hasselbalch equation with the correct ratio
</div>

??? question "Show Answer"
    The correct answer is **D**. Using Henderson-Hasselbalch: $\text{pH} = pK_a + \log\frac{[\ce{A-}]}{[\ce{HA}]} = 4.74 + \log\frac{0.300}{0.200} = 4.74 + \log(1.50) = 4.74 + 0.176 = 4.92$. Option A is only correct when $[\ce{A-}] = [\ce{HA}]$ (ratio = 1) — here the ratio is 1.5, not 1. Option B results from inverting the ratio in the equation: $\log(0.200/0.300) = -0.176$, giving $4.74 - 0.18 = 4.56$. Option C significantly overestimates the correction.

    **Concept Tested:** Henderson-Hasselbalch Equation / Buffer pH Calculation

---

#### 3. What happens to the pH of an acetate buffer ($\ce{CH3COOH}$ / $\ce{CH3COO-}$) when it is diluted with an equal volume of pure water?

<div class="upper-alpha" markdown>
1. The pH decreases significantly because the acid concentration doubles relative to the base
2. The pH increases significantly because the buffer capacity is lost upon dilution
3. The pH remains essentially unchanged because dilution does not change the ratio $[\ce{A-}]/[\ce{HA}]$
4. The pH shifts toward 7.00 because the solution becomes more neutral upon dilution
</div>

??? question "Show Answer"
    The correct answer is **C**. Henderson-Hasselbalch shows that pH depends on the ratio $[\ce{A-}]/[\ce{HA}]$, not the absolute concentrations. Diluting with water reduces both concentrations by the same factor, leaving the ratio unchanged and the pH essentially the same. Option A incorrectly suggests the ratio changes. Option B conflates buffer capacity (which does decrease) with pH (which does not change significantly). Option D misapplies the concept of dilution to buffers.

    **Concept Tested:** Henderson-Hasselbalch Equation — Dilution Invariance

---

#### 4. A chemist wants to prepare a buffer with a target pH of 7.40 (matching blood pH). Which weak acid is the best choice for this buffer?

<div class="upper-alpha" markdown>
1. Ammonium ion ($pK_a = 9.25$)
2. Acetic acid ($pK_a = 4.74$)
3. Carbonic acid ($pK_{a1} = 6.35$, $pK_{a2} = 10.33$)
4. Hypochlorous acid ($pK_a = 7.52$)
</div>

??? question "Show Answer"
    The correct answer is **D**. The best buffer uses a weak acid whose $pK_a$ is within 1 unit of the target pH (7.40). Hypochlorous acid has $pK_a = 7.52$, which is only 0.12 units from the target — well within the effective buffering range. Option A ($pK_a = 9.25$) is nearly 2 units away from the target. Option B ($pK_a = 4.74$) is nearly 3 units away, far outside its effective range. Option C's first ionization ($pK_{a1} = 6.35$) is 1.05 units away — borderline but less suitable than D.

    **Concept Tested:** Buffer Preparation / Selecting the Right Weak Acid

---

#### 5. When 0.100 mol of $\ce{NaOH}$ is added to a buffer containing 0.500 mol $\ce{CH3COOH}$ and 0.500 mol $\ce{CH3COO-}$ in 1.00 L, which of the following correctly describes the change to the buffer components?

<div class="upper-alpha" markdown>
1. $[\ce{CH3COOH}]$ increases and $[\ce{CH3COO-}]$ decreases as the base reacts with the conjugate base
2. $[\ce{CH3COOH}]$ decreases by 0.100 mol/L and $[\ce{CH3COO-}]$ increases by 0.100 mol/L
3. Both $[\ce{CH3COOH}]$ and $[\ce{CH3COO-}]$ decrease proportionally
4. $[\ce{CH3COO-}]$ decreases and $[\ce{CH3COOH}]$ increases as the base is neutralized
</div>

??? question "Show Answer"
    The correct answer is **B**. $\ce{OH-}$ reacts with the weak acid component: $\ce{CH3COOH + OH- -> CH3COO- + H2O}$. For every mole of $\ce{NaOH}$ added, 1 mol of $\ce{CH3COOH}$ is consumed and 1 mol of $\ce{CH3COO-}$ is produced. After adding 0.100 mol $\ce{NaOH}$: $[\ce{HA}] = 0.400$ M, $[\ce{A-}] = 0.600$ M. Option A reverses the direction of the reaction. Option C does not reflect the stoichiometry. Option D describes what happens when acid is added, not base.

    **Concept Tested:** How Buffers Resist pH Change

---

#### 6. In a titration of 25.0 mL of 0.100 M acetic acid ($K_a = 1.8 \times 10^{-5}$) with 0.100 M $\ce{NaOH}$, what is the pH at the half-equivalence point?

<div class="upper-alpha" markdown>
1. 7.00
2. 8.72
3. 4.74
4. 2.87
</div>

??? question "Show Answer"
    The correct answer is **C**. At the half-equivalence point, exactly half the acetic acid has been neutralized, so $[\ce{CH3COOH}] = [\ce{CH3COO-}]$. Substituting into Henderson-Hasselbalch: $\text{pH} = pK_a + \log(1) = pK_a + 0 = 4.74$. Option A applies only to the equivalence point of a strong acid–strong base titration. Option B is the pH at the equivalence point of this specific weak acid–strong base titration (where the conjugate base hydrolyzes). Option D is the initial pH of the pure acetic acid solution before any base is added.

    **Concept Tested:** Half-Equivalence Point / pH = pKa

---

#### 7. At the equivalence point of a weak acid–strong base titration, the pH is:

<div class="upper-alpha" markdown>
1. Equal to 7.00, because all acid has been neutralized
2. Less than 7.00, because excess base remains in solution
3. Greater than 7.00, because the conjugate base of the weak acid hydrolyzes to produce $\ce{OH-}$
4. Equal to the $pK_a$ of the weak acid, because the half-equivalence condition is met
</div>

??? question "Show Answer"
    The correct answer is **C**. At the equivalence point, all of the weak acid has been converted to its conjugate base ($\ce{A-}$). This conjugate base is itself a weak base that reacts with water: $\ce{A- + H2O <=> HA + OH-}$, producing $\ce{OH-}$ and raising the pH above 7. Option A is only true for a strong acid–strong base titration. Option B describes a condition past the equivalence point where excess strong base is present. Option D describes the half-equivalence point, not the equivalence point.

    **Concept Tested:** Weak Acid–Strong Base Titration — Equivalence Point pH

---

#### 8. A student is titrating a weak acid ($\ce{CH3COOH}$) with 0.100 M $\ce{NaOH}$ and calculates the equivalence point pH to be approximately 8.72. Which indicator is most appropriate for this titration?

<div class="upper-alpha" markdown>
1. Methyl orange (pH range 3.1–4.4), because it changes color in the acidic region where the buffer zone lies
2. Bromothymol blue (pH range 6.0–7.6), because it changes color near neutral pH
3. Methyl red (pH range 4.4–6.2), because the weak acid's $pK_a$ is in this range
4. Phenolphthalein (pH range 8.2–10.0), because its transition range overlaps the equivalence point pH
</div>

??? question "Show Answer"
    The correct answer is **D**. For a weak acid–strong base titration, the equivalence point is above pH 7 (approximately pH 8.72 in this case). The indicator's transition range must overlap with the steep region of the curve near the equivalence point. Phenolphthalein transitions from colorless to pink in the range pH 8.2–10.0, which covers pH 8.72 precisely. Option A (methyl orange, 3.1–4.4) is far from the equivalence point and would signal far too early. Option B (bromothymol blue, 6.0–7.6) transitions below the equivalence point pH. Option C (methyl red, 4.4–6.2) is also far below the equivalence point.

    **Concept Tested:** Indicator Selection for Weak Acid–Strong Base Titration

---

#### 9. A student mixes 30.0 mL of 0.100 M $\ce{HCl}$ with 20.0 mL of 0.100 M $\ce{NaOH}$. What is the pH of the resulting solution?

<div class="upper-alpha" markdown>
1. 1.70, because excess $\ce{HCl}$ remains after neutralization and the total volume is 50.0 mL
2. 7.00, because equal concentrations of acid and base were mixed
3. 12.30, because excess $\ce{NaOH}$ remains after neutralization
4. 1.00, because the initial concentration of $\ce{HCl}$ before mixing was 0.100 M
</div>

??? question "Show Answer"
    The correct answer is **A**. Moles of $\ce{HCl}$: $(0.100)(0.0300) = 3.00 \times 10^{-3}$ mol. Moles of $\ce{NaOH}$: $(0.100)(0.0200) = 2.00 \times 10^{-3}$ mol. Excess $\ce{HCl}$: $1.00 \times 10^{-3}$ mol in 50.0 mL total. $[\ce{H+}] = 1.00 \times 10^{-3}/0.0500 = 0.0200$ M; $\text{pH} = -\log(0.0200) = 1.70$. Option B is wrong — equal concentrations does not mean equal moles when volumes differ. Option C reverses which reagent is in excess. Option D ignores dilution into the total 50.0 mL volume.

    **Concept Tested:** pH of Mixed Solutions

---

#### 10. For a strong acid–weak base titration (e.g., $\ce{HCl}$ titrating $\ce{NH3}$), which titration curve feature correctly distinguishes it from a weak acid–strong base titration?

<div class="upper-alpha" markdown>
1. The equivalence point is above pH 7, and the half-equivalence point pH equals the $pK_b$ of the base
2. The equivalence point is below pH 7, and the half-equivalence point pH equals the $pK_a$ of the conjugate acid $\ce{NH4+}$
3. The equivalence point is at pH 7, and there is no identifiable buffer region in the curve
4. The equivalence point is below pH 7, and the steep jump around the equivalence point spans the same pH range as for a strong acid–strong base titration
</div>

??? question "Show Answer"
    The correct answer is **B**. For a strong acid–weak base titration, the equivalence point solution contains the conjugate acid $\ce{BH+}$ (e.g., $\ce{NH4+}$), which is acidic — so pH < 7. At the half-equivalence point, $[\ce{B}] = [\ce{BH+}]$ and $\text{pH} = pK_a(\ce{BH+})$. For $\ce{NH3}$, $pK_a(\ce{NH4+}) = 9.25$. Option A describes a weak acid–strong base titration. Option C describes a strong acid–strong base titration. Option D is partly correct about pH < 7 but wrong that the steep jump spans the same range — weak systems have a smaller jump.

    **Concept Tested:** Strong Acid–Weak Base Titration Curve Analysis

---
