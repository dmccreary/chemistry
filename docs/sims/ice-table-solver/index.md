---
title: ICE Table Interactive Solver
description: Step through equilibrium problems with dynamic ICE tables, approximation checks, and quadratic solving guidance.
quality_score: 0
---

# Ice table interactive solver

<iframe src="main.html" height="902px" width="100%" scrolling="no"></iframe>

[Run the ICE Table Solver fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the MicroSim in the p5.js editor](https://editor.p5js.org/){ .md-button }

## About this MicroSim

The solver scaffolds every stage of an ICE (Initial–Change–Equilibrium) analysis for common equilibrium systems (HI formation, PCl<sub>5</sub> dissociation, N<sub>2</sub>O<sub>4</sub> dimerization, and COCl<sub>2</sub> decomposition). Students can edit initial concentrations and K values, then watch the guided mode animate rows being filled, show the K expression with substituted numbers, and display both the small-x approximation check and the quadratic formula coefficients. Practice mode hides the Change/Equilibrium rows until students click individual cells, submit values, and receive immediate correctness feedback.

## How to use

1. Pick a **reaction preset** to load stoichiometry, default initial concentrations, and a representative K value.
2. Adjust **initial concentrations** (mol L⁻¹) or **Kc** as desired; all fields accept scientific notation.
3. Choose **Guided Solve** to watch each ICE row animate, or **Practice Mode** to fill the cells yourself.
4. Press **Solve** to generate the ICE table, algebra panel, approximation decision, and quadratic breakdown.
5. Use **Next step** (guided mode) to advance manually, or click Change/Equilibrium cells (practice mode) to enter your answers and compare them to the correct values.

## Classroom ideas

- **Approximation audit:** Have students try each reaction with both large and small K values, then discuss when the 5% rule allows the small-x approximation.
- **Quadratic derivation:** Pause on the algebra panel, copy the coefficients, and re-derive the quadratic on paper before revealing the MicroSim solution.
- **Practice race:** Put the solver into Practice Mode and project it; groups race to green out the entire Change row before time expires.
- **Parameter experiments:** Assign different initial concentration sets to student pairs so the class can observe how ICE solutions respond to dilution or product seeding.

## Learning goals

| Item | Details |
|------|---------|
| Subject area | Chemistry — chemical equilibrium |
| Grade band | High school (Grades 11–12) AP and introductory college |
| Learning objective | Students will be able to set up an ICE table, decide whether the small-x approximation is valid, and solve for equilibrium concentrations (including quadratic solutions when necessary). |
| Bloom's level | Apply / Analyze |
| Duration | 12–15 minutes (demo plus guided practice) |
| Prerequisites | Law of mass action, equilibrium constant expressions, algebraic manipulation of quadratics, significant figures |
| Assessment ideas | Quick-write explaining the approximation decision, worksheet screenshots of ICE rows, or mini-problems solved in Practice Mode |

## Instructional design review

- **Single objective check:** “Students will be able to calculate equilibrium concentrations with ICE tables by toggling between approximation and quadratic methods.” ✔️
- **Control inventory (Step 1.5):**

| Control | Type | Purpose |
|---------|------|---------|
| Reaction preset | Dropdown | Loads stoichiometry and typical K |
| Initial concentration inputs | Number inputs (per species) | Set I row values |
| K value input | Number input | Adjust equilibrium constant |
| Mode buttons | Toggle buttons | Switch between Guided / Practice |
| Solve / Reset / Next step | Buttons | Run the solver and advance steps |

- **Progressive disclosure:** Approximation verdict, quadratic coefficients, and algebra appear only after Solve; practice fields stay hidden until a cell is selected.
- **Cognitive load:** Table rows are color-coded (blue, orange, green) and only one guided step pulses at a time.
- **Accessibility checks:** Font sizes ≥14 px, high-contrast borders, keyboard-focusable HTML inputs, and descriptive instructions in the control pane.

## Lesson plan

### Grade level
Grades 11–12 (AP Chemistry Unit 7) and introductory college equilibrium units

### Duration
15-minute workstation or projection activity

### Prerequisites
- Law of mass action expressions
- Comfort rearranging algebraic equations
- Ability to evaluate scientific notation on a calculator

### Activities

1. **Instructor walk-through (5 min):** Demonstrate Guided mode for H<sub>2</sub> + I<sub>2</sub> ⇌ 2 HI emphasizing row order and the approximation test.
2. **Student practice (7 min):** Learners switch to Practice Mode, attempt Change/Equilibrium rows, and capture screenshots of any incorrect entries with reflections.
3. **Wrap-up (3 min):** Whole-class debrief on when the 5% rule fails and why quadratics are unavoidable in certain systems.

### Assessment
- Exit ticket: “Given PCl<sub>5</sub> ⇌ PCl<sub>3</sub> + Cl<sub>2</sub> (Kc = 1.8×10⁻²) with 0.250 M PCl<sub>5</sub>, predict whether small-x works and justify.”
- Practice Mode log: Students submit the table after all cells are green plus a one-sentence explanation of the approximation verdict.

## References

1. Silberberg, M. *Chemistry: The Molecular Nature of Matter and Change*, 9th ed., McGraw-Hill, 2021 — ICE tables and equilibrium approximations.
2. Brown, LeMay, Bursten. *Chemistry: The Central Science*, 15th ed., Pearson, 2022 — Quadratic treatments of equilibrium problems.
