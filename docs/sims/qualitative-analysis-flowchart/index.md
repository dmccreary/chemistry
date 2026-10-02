---
title: Qualitative Analysis Flowchart
description: Interactive flowchart of the classical cation separation scheme. Step through the four reagents that sort cations into five groups, or pick a cation and trace where it precipitates and why.
image: /sims/qualitative-analysis-flowchart/qualitative-analysis-flowchart.png
og:image: /sims/qualitative-analysis-flowchart/qualitative-analysis-flowchart.png
twitter:image: /sims/qualitative-analysis-flowchart/qualitative-analysis-flowchart.png
social:
   cards: false
quality_score: 100
---

# Qualitative Analysis Flowchart

<iframe src="main.html" height="762px" width="100%" scrolling="no"></iframe>

[Run the Qualitative Analysis Flowchart MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

**Qualitative analysis** finds out *which* ions are in a sample. The classical scheme for cations adds four reagents in a fixed order. Each reagent precipitates one group of ions, the solid is filtered off, and the liquid that passes through the filter (the **filtrate**) moves on to the next reagent.

| Step | Reagent added | Group that precipitates | Why |
|---|---|---|---|
| 1 | Dilute $\ce{HCl}$ | **Group I**: $\ce{Ag+}$, $\ce{Pb^2+}$, $\ce{Hg2^2+}$ | Their chlorides are insoluble |
| 2 | $\ce{H2S}$ in acidic solution | **Group II**: $\ce{Cu^2+}$, $\ce{Bi^3+}$, $\ce{Cd^2+}$, $\ce{Sn^2+}$ | Their sulfides are insoluble even in acid |
| 3 | $\ce{NH3}$/$\ce{NH4+}$ buffer and $\ce{H2S}$ | **Group III**: $\ce{Fe^3+}$, $\ce{Al^3+}$, $\ce{Cr^3+}$, $\ce{Ni^2+}$, $\ce{Zn^2+}$ | Hydroxides or sulfides that are insoluble in basic solution |
| 4 | $\ce{(NH4)2CO3}$ | **Group IV**: $\ce{Ba^2+}$, $\ce{Ca^2+}$, $\ce{Sr^2+}$ | Their carbonates are insoluble |
| | (nothing precipitates) | **Group V**: $\ce{Na+}$, $\ce{K+}$, $\ce{NH4+}$ | Their common salts are all soluble |

In the flowchart, each dashed box is one step. A red box is a reagent being added, a red arrow leads to the group that precipitates, and a green arrow carries the filtrate down to the next step. Blue boxes are the five groups.

The order of the reagents matters. Sulfide would also precipitate $\ce{Ag+}$ and $\ce{Pb^2+}$, so the insoluble chlorides have to be removed first.

## How to Use

1. **Step through the scheme.** With *Trace a cation* set to None, press **Next** to visit each box in order. The panel on the right explains the reagent, gives a net ionic equation, and lists the precipitates with their colors.
2. **Trace one cation.** Choose an ion from the *Trace a cation* menu. Its path is highlighted and everything else fades. Press **Next** to follow it: at each reagent the panel says whether the ion stays dissolved (and why) or precipitates (with the equation).
3. **Hover** over a box to preview it, or **click** a box to jump to it.
4. **Predict first.** Before tracing an ion, use the solubility rules to predict which group it belongs to.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/chemistry/sims/qualitative-analysis-flowchart/main.html"
        height="762px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (AP Chemistry, Chapter 9: Stoichiometry, Titrations, and Analysis)

### Duration
10-15 minutes

### Learning Objectives

- **Understand:** Explain how a mixture of cations is separated into groups by adding precipitating reagents in a fixed order.
- **Understand:** Classify a cation into its analytical group from solubility rules and predict the precipitate it forms.
- **Understand:** Explain why the order of the reagents matters.

### Prerequisites

- Solubility rules and precipitation reactions
- Net ionic equations
- Flame test colors

### Activities

1. **Exploration** (4 min): Step through all ten boxes. Students list, for each reagent, the anion that does the precipitating ($\ce{Cl-}$, $\ce{S^2-}$, $\ce{OH-}$ or $\ce{S^2-}$, $\ce{CO3^2-}$).
2. **Predict, Then Trace** (5 min): Give each pair of students three cations (for example $\ce{Pb^2+}$, $\ce{Zn^2+}$, $\ce{K+}$). They predict the group and the precipitate, then trace each ion to check.
3. **Why this order?** (3 min): Ask what would go wrong if $\ce{H2S}$ were added before $\ce{HCl}$. Students use the Start box and the Group I and II boxes to support their answer.
4. **Assessment** (3 min): An unknown gives no precipitate with $\ce{HCl}$, a black precipitate with acidic $\ce{H2S}$, and the original solution was blue. Students identify the ion ($\ce{Cu^2+}$) and write the net ionic equation for the precipitation.

### Assessment

- Can the student name the reagent and the type of precipitate for each group?
- Can the student trace a given cation to the correct group and explain why it passed through the earlier steps?
- Can the student write a net ionic equation for one precipitation in each group?

## Notes on the Chemistry

- The five groups and the ions in them are the ones listed in the chapter. A full laboratory scheme includes more ions and further tests to separate the ions within each group.
- $\ce{PbCl2}$ is slightly soluble, so a little $\ce{Pb^2+}$ can pass into Group II, where it precipitates as a sulfide.
- In Group III, $\ce{Fe^3+}$, $\ce{Al^3+}$, and $\ce{Cr^3+}$ precipitate as hydroxides, and $\ce{Ni^2+}$ and $\ce{Zn^2+}$ as sulfides. Sulfide in the mixture can convert the iron precipitate to black iron sulfide.
- $\ce{NH4+}$ must be tested on a fresh portion of the unknown, because ammonium compounds are added as reagents in steps 3 and 4.

## References

1. [OpenStax Chemistry 2e, Section 15.1: Precipitation and Dissolution](https://openstax.org/books/chemistry-2e/pages/15-1-precipitation-and-dissolution) - OpenStax - Free textbook section on solubility equilibria and selective precipitation, the principle behind group separations.
2. [Qualitative inorganic analysis](https://en.wikipedia.org/wiki/Qualitative_inorganic_analysis) - Wikipedia - Overview of the classical cation group separation scheme and confirmatory tests.
3. [AP Chemistry Course and Exam Description](https://apcentral.collegeboard.org/courses/ap-chemistry) - College Board - Unit 4 (Chemical Reactions) and Unit 7 (Equilibrium) cover precipitation reactions, net ionic equations, and solubility.
