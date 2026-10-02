---
title: Heterogeneous Catalysis Surface Adsorption
description: Step through adsorption, surface reaction, and desorption for ammonia synthesis on an iron surface, and see how cutting a catalyst into smaller pieces multiplies its active sites.
image: /sims/heterogeneous-catalysis-surface/heterogeneous-catalysis-surface.png
og:image: /sims/heterogeneous-catalysis-surface/heterogeneous-catalysis-surface.png
twitter:image: /sims/heterogeneous-catalysis-surface/heterogeneous-catalysis-surface.png
social:
   cards: false
quality_score: 100
---

# Heterogeneous Catalysis Surface Adsorption

<iframe src="main.html" height="632px" width="100%" scrolling="no"></iframe>

[Run the Heterogeneous Catalysis Surface Adsorption MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

In **heterogeneous catalysis** the catalyst is in a different phase from the reactants. Most often the catalyst is a solid and the reactants are gases, so the reaction can only happen where the gas meets the solid: at the surface. This MicroSim uses the Haber process on an iron catalyst as the example:

$$\ce{N2 (g) + 3H2 (g) ->[Fe] 2NH3 (g)}$$

The reaction on the surface happens in three stages.

| Stage | What happens | Steps in the MicroSim |
|---|---|---|
| **1. Adsorption** | $\ce{N2}$ and $\ce{H2}$ molecules bind to iron atoms at active sites. Bonding to the surface stretches and weakens the bonds inside the molecules. | Steps 1 and 2 |
| **2. Surface reaction** | The weakened bonds break. Separate N and H atoms move across the surface, and N-H bonds form one at a time: NH, then $\ce{NH2}$, then $\ce{NH3}$. | Steps 3 to 6 |
| **3. Desorption** | $\ce{NH3}$ leaves the surface. The iron atoms are unchanged, so the active sites are free for more reactant. | Step 7 |

The scene holds exactly one $\ce{N2}$ molecule and three $\ce{H2}$ molecules, and the same two N atoms and six H atoms finish as two $\ce{NH3}$ molecules. Atoms are conserved in every step, and no iron atom is used up.

The catalyst speeds up the reaction because this surface pathway has a **lower activation energy** than breaking the very strong $\ce{N#N}$ triple bond in the gas phase. It does not change $\Delta H$ or the equilibrium constant.

### Why surface area matters

Only the iron atoms **at a surface** can adsorb reactants. The lower panel shows a cross-section of a block of 144 iron atoms. The slider cuts the same 144 atoms into more and smaller pieces and counts the atoms that lie on a surface (red).

| Pieces | Surface atoms (active sites) | Compared with the solid block |
|---|---|---|
| 1 (solid block) | 44 of 144 | 1.0 |
| 4 | 80 of 144 | 1.8 times |
| 9 | 108 of 144 | 2.5 times |
| 16 | 128 of 144 | 2.9 times |
| 36 (nanoparticle powder) | 144 of 144 | 3.3 times |

More active sites means more reactant molecules can be adsorbed at the same moment, so the reaction is faster. This is why industrial catalysts are made as fine powders, porous pellets, or thin films on a support.

## How to Use

1. Press **Next Step** to move through the seven steps. The highlighted tab at the top names the current stage, and the white box under the picture explains the step.
2. Press **Back** to go back one step, or click a **stage tab** to jump to the start of that stage.
3. Turn **Show Labels** off to hide the labels and the explanation. Describe the step in your own words, then turn the labels back on to check.
4. Drag the **Iron cut into pieces** slider and watch the count of surface atoms change.

In the picture, a solid black line is a normal bond and a dashed red line is a bond that has been stretched and weakened by the surface.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/chemistry/sims/heterogeneous-catalysis-surface/main.html"
        height="632px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (AP Chemistry, Chapter 11: Reaction Mechanisms and Catalysis)

### Duration
10-15 minutes

### Learning Objectives

- **Understand:** Identify the adsorption, surface reaction, and desorption stages of heterogeneous catalysis and describe what happens to the bonds in each stage.
- **Understand:** Explain why a catalyst is not consumed and why it lowers the activation energy without changing $\Delta H$.
- **Understand:** Explain why increasing the surface area of a solid catalyst increases the reaction rate.

### Prerequisites

- Activation energy and the effect of a catalyst on a reaction energy diagram
- Covalent bonds and bond strength
- Balanced chemical equations

### Activities

1. **Exploration** (4 min): Step through all seven steps with labels on. Students write one sentence for each of the three stages.
2. **Count the Atoms** (3 min): At step 1 and again at step 7, students count the N atoms, H atoms, and iron atoms. Ask: *What does this tell you about the catalyst?*
3. **Explain Without Labels** (4 min): With **Show Labels** off, a partner picks a step and the student explains what is happening and names the stage.
4. **Surface Area** (4 min): Students record the number of surface atoms for each slider position and explain why a catalytic converter uses a thin film of platinum on a porous support instead of a solid lump of platinum.

### Assessment

- Can the student name the three stages in order and describe each one?
- Can the student explain that the catalyst is unchanged at the end and can be used again?
- Can the student explain why a fine powder is a better catalyst than one solid block of the same mass?

## References

1. [OpenStax Chemistry 2e, Section 12.7: Catalysis](https://openstax.org/books/chemistry-2e/pages/12-7-catalysis) - OpenStax - Free textbook section on homogeneous and heterogeneous catalysts, including the steps of adsorption, reaction, and desorption.
2. [Heterogeneous catalysis](https://en.wikipedia.org/wiki/Heterogeneous_catalysis) - Wikipedia - Overview of adsorption, surface reaction mechanisms, and the role of surface area.
3. [Haber process](https://en.wikipedia.org/wiki/Haber_process) - Wikipedia - The iron-catalyzed synthesis of ammonia, including the surface mechanism.
4. [AP Chemistry Course and Exam Description](https://apcentral.collegeboard.org/courses/ap-chemistry) - College Board - Unit 5, Topic 5.11 (Catalysis) covers surface catalysis and the effect of a catalyst on activation energy.
