# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an MkDocs Material intelligent textbook for an AP Chemistry course designed for high school students seeking college credit. It features:
- 9 chapters aligned to the AP Chemistry Course and Exam Description (CED) units
- Interactive MicroSims using p5.js and other JavaScript libraries
- MathJax for LaTeX equation rendering (including mhchem for chemical equations)
- SmilesDrawer for declarative 2D molecular structure diagrams from SMILES notation
- Learning graphs with concepts and dependency relationships
- A fun, encouraging tone appropriate for high school students

## Open Source Tools Only

This course uses only free, open-source tools.

**Rationale:** Our audience is high school students worldwide who may not have access to expensive commercial software. By using open-source tools and browser-based simulations, we ensure every student can fully participate regardless of their economic situation or institutional affiliation.

**In practice:**
- MicroSims use JavaScript (p5.js, vis-network, Chart.js) which runs in any browser
- Molecular structures use SmilesDrawer (MIT-licensed, client-side)
- Examples use Python when computation is needed
- Never assume students have access to paid software

## Common Commands

```bash
# Serve locally for development
mkdocs serve

# Build static site
mkdocs build
```

## Local Testing URLs

When testing with `mkdocs serve`, use the repository name in the path:
- MicroSims: `http://127.0.0.1:8000/chemistry/sims/<sim-name>/`
- SMILES test page: `http://127.0.0.1:8000/chemistry/sims/smiles-drawing-test/`

---

## Chemistry Notation in Markdown

This project has THREE systems for rendering chemistry content. Each has specific syntax rules. **Content generators MUST follow these rules exactly.**

> **Testing status:** All three systems have been verified working. SMILES + SmilesDrawer (System 2) was tested via the SMILES Drawing Test page. MathJax + mhchem (Systems 1 and 3) was tested via the mhchem Rendering Test page. Note: MathJax requires `js/mathjax-config.js` to load **before** the MathJax CDN script — this config enables the mhchem extension and is order-dependent in `mkdocs.yml`.

### System 1: Chemical Equations with MathJax + mhchem

**Use for:** Chemical formulas, reaction equations, equilibria, ions, states of matter, stoichiometry.

**How it works:** MathJax is loaded site-wide via `extra_javascript` in `mkdocs.yml`. The `mhchem` extension is included with MathJax 3 by default.

**Syntax — inline formulas:**
```markdown
The formula for water is $\ce{H2O}$ and table salt is $\ce{NaCl}$.
```

**Syntax — display (block) equations:**
```markdown
$$\ce{2H2 + O2 -> 2H2O}$$

$$\ce{CH3COOH <=> CH3COO- + H+}$$

$$\ce{CaCO3 (s) -> CaO (s) + CO2 (g)}$$
```

**Common mhchem patterns:**

| What you want | mhchem syntax |
|---|---|
| Simple formula | `$\ce{H2SO4}$` |
| Reaction arrow | `$\ce{A -> B}$` |
| Equilibrium | `$\ce{A <=> B}$` |
| State symbols | `$\ce{NaCl (aq) + AgNO3 (aq) -> AgCl (s) v + NaNO3 (aq)}$` |
| Charges | `$\ce{SO4^{2-}}$` or `$\ce{Na+}$` |
| Subscripts | `$\ce{H2O}$` (automatic from digits) |
| Superscripts | `$\ce{^{235}U}$` (isotopes) |
| Precipitate arrow | `$\ce{v}$` (down arrow) |
| Gas evolution | `$\ce{^}$` (up arrow) |
| Catalysts/conditions | `$\ce{->[catalyst]}$` or `$\ce{->[\Delta]}$` |
| Enthalpy | `$\Delta H = -285.8 \text{ kJ/mol}$` |

**Rules:**
- Always wrap chemical formulas in `$\ce{...}$` for inline or `$$\ce{...}$$` for display
- Never write raw chemical formulas like "H2O" in running text — always use `$\ce{H2O}$`
- For thermodynamic expressions mixed with chemical equations, use separate `$...$` blocks for the math

### System 2: Molecular Structure Diagrams with SMILES + SmilesDrawer

**Use for:** 2D structural diagrams of molecules (bond-line drawings, ring structures, functional groups).

**How it works:** SmilesDrawer v1.2.0 is loaded site-wide via CDN in `mkdocs.yml`. The `js/smiles.js` script auto-renders any `<canvas data-smiles="...">` element on page load.

**Basic syntax:**
```html
<canvas data-smiles="c1ccccc1" width="250" height="250"></canvas>
```

**CRITICAL: Escaping brackets in Markdown**

SMILES notation uses square brackets for atom specifications like `[C@@H]`, `[C@H]`, `[NH3+]`, `[O-]`. When placed inside a `<div ... markdown>` block (such as MkDocs Material grid cards), the pattern `[text](stuff)` is interpreted as a Markdown link and **silently corrupts the SMILES string**.

**Rules for `data-smiles` attributes inside `markdown`-attributed divs:**

1. Replace every `[` with `&#91;` and every `]` with `&#93;` in the `data-smiles` attribute value
2. The browser decodes HTML entities before JavaScript reads the attribute, so SmilesDrawer receives the correct SMILES string
3. For display text showing the SMILES code, use `<code>` HTML tags instead of backtick fences

**Example — molecule with stereochemistry in a grid card:**
```markdown
<div class="grid cards" markdown>

-   **Ibuprofen** <code>CC(C)Cc1ccc(cc1)[C@@H](C)C(=O)O</code>

    <canvas data-smiles="CC(C)Cc1ccc(cc1)&#91;C@@H&#93;(C)C(=O)O" width="250" height="250"></canvas>

</div>
```

**Example — molecule WITHOUT brackets (no escaping needed):**
```markdown
<div class="grid cards" markdown>

-   **Benzene** `c1ccccc1`

    <canvas data-smiles="c1ccccc1" width="250" height="250"></canvas>

</div>
```

**When escaping is NOT needed:**
- In standalone HTML files (`.html`) — use raw SMILES directly
- In `data-smiles` attributes outside of `markdown`-attributed divs
- SMILES strings that contain no `[` or `]` characters (simple molecules)

**Common SMILES patterns:**

| Molecule | SMILES |
|---|---|
| Water | `O` |
| Methane | `C` |
| Ethanol | `CCO` |
| Benzene | `c1ccccc1` |
| Acetic acid | `CC(=O)O` |
| Aspirin | `CC(=O)Oc1ccccc1C(=O)O` |
| Caffeine | `Cn1c(=O)c2c(ncn2C)n(C)c1=O` |
| Glucose | `OC[C@H]1OC(O)[C@H](O)[C@@H](O)[C@@H]1O` |

**SMILES bracket escaping quick reference:**

| Raw SMILES | Escaped for `data-smiles` in markdown div |
|---|---|
| `[C@@H]` | `&#91;C@@H&#93;` |
| `[C@H]` | `&#91;C@H&#93;` |
| `[NH3+]` | `&#91;NH3+&#93;` |
| `[O-]` | `&#91;O-&#93;` |

### System 3: Standard LaTeX Math

**Use for:** Mathematical expressions (thermodynamic equations, rate laws, equilibrium constants, etc.).

**Syntax:**
```markdown
Inline: The rate law is $r = k[A]^m[B]^n$.

Display:
$$K_{\text{eq}} = \frac{[\text{products}]}{[\text{reactants}]}$$

$$\Delta G = \Delta H - T\Delta S$$

$$PV = nRT$$
```

**Rules:**
- Use `$...$` for inline math and `$$...$$` for display math
- Use `\text{...}` for text labels within math (e.g., `K_{\text{eq}}`)
- Use `\Delta` for the delta symbol, not the unicode character

### Decision Guide: Which System to Use

| Content type | System | Example |
|---|---|---|
| Chemical formula in text | mhchem | `$\ce{H2SO4}$` |
| Balanced reaction equation | mhchem | `$$\ce{2Na + Cl2 -> 2NaCl}$$` |
| Equilibrium expression | mhchem | `$$\ce{NH3 + H2O <=> NH4+ + OH-}$$` |
| 2D molecular structure drawing | SMILES canvas | `<canvas data-smiles="CCO">` |
| Rate law / math equation | LaTeX math | `$r = k[A]^2$` |
| Thermodynamic calculation | LaTeX math | `$$\Delta G^\circ = -RT \ln K$$` |
| Electron configuration | mhchem or text | `$\ce{1s^2 2s^2 2p^6}$` |

### Combining Systems in One Section

A typical chapter section might use all three:

```markdown
## Ethanol Combustion

The combustion of ethanol ($\ce{C2H5OH}$) is an exothermic reaction:

$$\ce{C2H5OH (l) + 3O2 (g) -> 2CO2 (g) + 3H2O (g)}$$

The enthalpy change for this reaction is:

$$\Delta H = -1371 \text{ kJ/mol}$$

The molecular structure of ethanol:

<canvas data-smiles="CCO" width="250" height="250"></canvas>
```

---

## MkDocs Configuration Notes

- Never use `navigation.tabs` feature (no top navigation tabs)
- Theme uses teal primary color with white accent
- MathJax enabled via `pymdownx.arithmatex` extension
- SmilesDrawer v1.2.0 loaded from jsDelivr CDN
- Extra CSS in `docs/css/extra.css`
- Extra JS in `docs/js/extra.js` (prompt copy button) and `docs/js/smiles.js` (SMILES rendering)

## MicroSim Structure

MicroSims live in `docs/sims/<sim-name>/` with:
- `index.md` - MkDocs page with iframe embedding and lesson plan
- `main.html` - standalone HTML file (or specific test files like `smiles-test.html`)
- `script.js` - JavaScript (p5.js, vis-network, etc.) when applicable
- `metadata.json` - JSON Dublin core fields for faceted search
- `screenimage.png` - screenshot for social media previews

### MicroSim References in Chapter Content

**CRITICAL:** When adding MicroSim diagrams to chapter content, the structure must follow this exact order:

1. `#### Diagram:` header **OUTSIDE** the `<details>` element (for anchor links)
2. `<iframe>` embedding the MicroSim **BEFORE** the `<details>` element
3. `<details>` containing only the specification

```markdown
#### Diagram: MicroSim Name

<iframe src="../../sims/microsim-name/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>MicroSim Name Specification</summary>

Type: microsim
...specification content...
</details>
```

## Molecule Grid Cards

Use the MkDocs Material `grid cards` layout to display molecules in a responsive grid:

```markdown
<div class="grid cards" markdown>

-   **Molecule Name** <code>SMILES_STRING</code>

    <canvas data-smiles="ESCAPED_SMILES" width="250" height="250"></canvas>

-   **Another Molecule** `SIMPLE_SMILES`

    <canvas data-smiles="SIMPLE_SMILES" width="250" height="250"></canvas>

</div>
```

Remember: use `<code>` tags (not backticks) for SMILES containing brackets, and `&#91;`/`&#93;` entity escaping in `data-smiles` attributes within `markdown`-attributed divs.

## Timestamps: NEVER Use Synthetic Data

**CRITICAL:** When logging timestamps, ALWAYS use real system timestamps. NEVER generate synthetic or made-up timestamps.

```bash
date "+%Y-%m-%d %H:%M:%S"
```

## Learning Mascot: Catalyst the Cat

### Character Overview

- **Name**: Catalyst
- **Species**: Cat
- **Personality**: Curious, encouraging, slightly playful, scientifically precise
- **Catchphrase**: "Let's react!"
- **Visual**: Teal-and-white cat in a mini lab coat with safety goggles perched on head

### Voice Characteristics

- Uses simple, encouraging language appropriate for high school students
- Occasionally uses chemistry puns ("That's a solid explanation!", "This idea has real potential energy!")
- Refers to students as "chemists" or "scientists"
- Signature phrases: "Let's react!", "Great chemistry!", "Now we're bonding!"

### Admonition Types and When to Use Each

There are 7 mascot admonition types. Each has a specific purpose — do not interchange them.

| Type | Color | Image File | When to Use |
|------|-------|------------|-------------|
| `mascot-welcome` | Teal | `welcome.png` | **Chapter openings only.** The first admonition in every chapter. Introduces the topic with enthusiasm. Always include the catchphrase "Let's react!" |
| `mascot-thinking` | Orange | `thinking.png` | **Key conceptual insights.** Use when revealing a "big idea" or connecting concepts in a way that requires reflection. Not for routine definitions — only for moments of genuine insight. |
| `mascot-tip` | Green | `tip.png` | **Practical study or problem-solving advice.** Shortcuts, memory tricks, exam strategies, or techniques that save time. Must contain actionable advice the student can apply immediately. |
| `mascot-warning` | Red | `warning.png` | **Common mistakes and misconceptions.** Use when students frequently get something wrong (sign errors, forgetting state symbols, confusing similar concepts). Must describe the specific mistake and how to avoid it. |
| `mascot-encourage` | Blue | `encouraging.png` | **Before or during difficult content.** Use when introducing topics students commonly struggle with (thermodynamics, equilibrium math, electron configurations). Normalizes difficulty and motivates persistence. |
| `mascot-celebration` | Purple | `celebration.png` | **After mastering a major concept or completing a section.** Acknowledges achievement. Use sparingly — only at the end of significant sections, not after every paragraph. |
| `mascot-note` | Blue-grey | `note.png` | **Neutral context and cross-references.** Use for background information, connections to earlier chapters, historical context, or "good to know" facts that don't fit the other categories. No strong emotional tone. |

### Admonition Syntax

Every mascot admonition must include an `<img>` tag as the first line of the body. Adjust the `../../` relative path based on the file's location relative to `docs/img/mascot/`.

```markdown
!!! mascot-tip "Catalyst's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Catalyst shares a tip">
    Always balance your equations by starting with the most
    complex molecule first. It saves time and reduces errors!
```

### Placement Rules

- **Exactly 1** `mascot-welcome` per chapter (at the top)
- **2-3** `mascot-thinking` per chapter (for key insights)
- **No more than 7 total** mascot admonitions per chapter (all types combined)
- **Never** place two mascot admonitions back-to-back — always have regular content between them
- **Space them out** — aim for at least 2-3 paragraphs of regular content between mascot admonitions

### Do's and Don'ts

**Do:**

- Use Catalyst to introduce new topics warmly
- Include the catchphrase "Let's react!" in welcome admonitions
- Keep dialogue brief (1-3 sentences)
- Match the image file to the admonition type
- Use `mascot-note` for neutral observations that don't fit other types

**Don't:**

- Use Catalyst more than 7 times per chapter
- Put mascot admonitions back-to-back
- Use `mascot-celebration` for minor achievements — reserve for section milestones
- Use `mascot-warning` for general notes — use `mascot-note` instead
- Use the mascot for purely decorative purposes
- Change Catalyst's personality or speech patterns
