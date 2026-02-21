# SMILES Drawing Test

This page tests browser-based rendering of chemical structures
from [SMILES](https://en.wikipedia.org/wiki/Simplified_molecular-input_line-entry_system)
notation using [SmilesDrawer](https://github.com/reymond-group/smilesDrawer).

## How It Works

1. The SmilesDrawer library is loaded site-wide via `extra_javascript` in `mkdocs.yml`.
2. Each molecule is declared as a `<canvas>` element with a `data-smiles` attribute.
3. The `js/smiles.js` script calls `SmilesDrawer.apply()` at page load, converting every
   tagged canvas into a 2D structural diagram.

[Smiles Test HTML](./smiles-test.html)

## Simple Molecules

<div class="grid cards" markdown>

-   **Water** `O`

    <canvas data-smiles="O" width="250" height="250"></canvas>

-   **Methane** `C`

    <canvas data-smiles="C" width="250" height="250"></canvas>

-   **Ethanol** `CCO`

    <canvas data-smiles="CCO" width="250" height="250"></canvas>

-   **Acetic Acid** `CC(=O)O`

    <canvas data-smiles="CC(=O)O" width="250" height="250"></canvas>

</div>

## Aromatic Compounds

<div class="grid cards" markdown>

-   **Benzene** `c1ccccc1`

    <canvas data-smiles="c1ccccc1" width="250" height="250"></canvas>

-   **Toluene** `Cc1ccccc1`

    <canvas data-smiles="Cc1ccccc1" width="250" height="250"></canvas>

-   **Naphthalene** `c1ccc2ccccc2c1`

    <canvas data-smiles="c1ccc2ccccc2c1" width="250" height="250"></canvas>

-   **Phenol** `Oc1ccccc1`

    <canvas data-smiles="Oc1ccccc1" width="250" height="250"></canvas>

</div>

## Drug Molecules

<div class="grid cards" markdown>

-   **Aspirin** <code>CC(=O)Oc1ccccc1C(=O)O</code>

    <canvas data-smiles="CC(=O)Oc1ccccc1C(=O)O" width="250" height="250"></canvas>

-   **Caffeine** <code>Cn1c(=O)c2c(ncn2C)n(C)c1=O</code>

    <canvas data-smiles="Cn1c(=O)c2c(ncn2C)n(C)c1=O" width="250" height="250"></canvas>

-   **Ibuprofen** <code>CC(C)Cc1ccc(cc1)&#91;C@@H&#93;(C)C(=O)O</code>

    <canvas data-smiles="CC(C)Cc1ccc(cc1)&#91;C@@H&#93;(C)C(=O)O" width="250" height="250"></canvas>

-   **Penicillin G** <code>CC1(&#91;C@@H&#93;(N2&#91;C@H&#93;(S1)&#91;C@@H&#93;(C2=O)NC(=O)Cc3ccccc3)C(=O)O)C</code>

    <canvas data-smiles="CC1(&#91;C@@H&#93;(N2&#91;C@H&#93;(S1)&#91;C@@H&#93;(C2=O)NC(=O)Cc3ccccc3)C(=O)O)C" width="250" height="250"></canvas>

</div>

## Biomolecules

<div class="grid cards" markdown>

-   **Glucose** <code>OC&#91;C@H&#93;1OC(O)&#91;C@H&#93;(O)&#91;C@@H&#93;(O)&#91;C@@H&#93;1O</code>

    <canvas data-smiles="OC&#91;C@H&#93;1OC(O)&#91;C@H&#93;(O)&#91;C@@H&#93;(O)&#91;C@@H&#93;1O" width="250" height="250"></canvas>

-   **Alanine** <code>C&#91;C@@H&#93;(N)C(=O)O</code>

    <canvas data-smiles="C&#91;C@@H&#93;(N)C(=O)O" width="250" height="250"></canvas>

-   **ATP** `c1nc(c2c(n1)n(cn2)C3CC(C(O3)COP(=O)(O)OP(=O)(O)OP(=O)(O)O)O)N`

    <canvas data-smiles="c1nc(c2c(n1)n(cn2)C3CC(C(O3)COP(=O)(O)OP(=O)(O)OP(=O)(O)O)O)N" width="250" height="250"></canvas>

-   **Cholesterol** `CC(CCCC(C)C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C`

    <canvas data-smiles="CC(CCCC(C)C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C" width="250" height="250"></canvas>

</div>

## Functional Groups

<div class="grid cards" markdown>

-   **Formaldehyde** (aldehyde) `C=O`

    <canvas data-smiles="C=O" width="250" height="250"></canvas>

-   **Acetone** (ketone) `CC(=O)C`

    <canvas data-smiles="CC(=O)C" width="250" height="250"></canvas>

-   **Diethyl Ether** `CCOCC`

    <canvas data-smiles="CCOCC" width="250" height="250"></canvas>

-   **Methylamine** (amine) `CN`

    <canvas data-smiles="CN" width="250" height="250"></canvas>

</div>

## SMILES Reference

| Name | SMILES |
|---|---|
| Water | `O` |
| Methane | `C` |
| Ethanol | `CCO` |
| Acetic acid | `CC(=O)O` |
| Benzene | `c1ccccc1` |
| Aspirin | `CC(=O)Oc1ccccc1C(=O)O` |
| Caffeine | `Cn1c(=O)c2c(ncn2C)n(C)c1=O` |
| Glucose | <code>OC&#91;C@H&#93;1OC(O)&#91;C@H&#93;(O)&#91;C@@H&#93;(O)&#91;C@@H&#93;1O</code> |
| Penicillin G | <code>CC1(&#91;C@@H&#93;(N2&#91;C@H&#93;(S1)&#91;C@@H&#93;(C2=O)NC(=O)Cc3ccccc3)C(=O)O)C</code> |
| Ibuprofen | <code>CC(C)Cc1ccc(cc1)&#91;C@@H&#93;(C)C(=O)O</code> |
