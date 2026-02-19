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

> **Testing status:** Only **SMILES + SmilesDrawer** (System 2) has been verified working in this project. MathJax and mhchem (Systems 1 and 3) are configured in `mkdocs.yml` but have **not yet been tested**. If you encounter rendering issues with `$\ce{...}$` or `$$...$$`, check that MathJax is loading correctly and that the mhchem extension is available.

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
