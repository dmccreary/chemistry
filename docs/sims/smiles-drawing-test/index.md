# SMILES Drawing Test

This page tests browser-based rendering of chemical structures
from [SMILES](https://en.wikipedia.org/wiki/Simplified_molecular-input_line-entry_system)
notation using [SmilesDrawer](https://github.com/reymond-group/smilesDrawer).

## How It Works

1. The SmilesDrawer library is loaded site-wide via `extra_javascript` in `mkdocs.yml`.
2. Each molecule is declared as a `<canvas>` element with a `data-smiles` attribute.
3. The `js/smiles.js` script calls `SmilesDrawer.apply()` at page load, converting every
   tagged canvas into a 2D structural diagram.

## Simple Molecules

<div class="molecule-grid">
  <div class="molecule-card">
    <strong>Water</strong><br><code>O</code>
    <canvas data-smiles="O" width="250" height="250"></canvas>
  </div>
  <div class="molecule-card">
    <strong>Methane</strong><br><code>C</code>
    <canvas data-smiles="C" width="250" height="250"></canvas>
  </div>
  <div class="molecule-card">
    <strong>Ethanol</strong><br><code>CCO</code>
    <canvas data-smiles="CCO" width="250" height="250"></canvas>
  </div>
  <div class="molecule-card">
    <strong>Acetic Acid</strong><br><code>CC(=O)O</code>
    <canvas data-smiles="CC(=O)O" width="250" height="250"></canvas>
  </div>
</div>

## Aromatic Compounds

<div class="molecule-grid">
  <div class="molecule-card">
    <strong>Benzene</strong><br><code>c1ccccc1</code>
    <canvas data-smiles="c1ccccc1" width="250" height="250"></canvas>
  </div>
  <div class="molecule-card">
    <strong>Toluene</strong><br><code>Cc1ccccc1</code>
    <canvas data-smiles="Cc1ccccc1" width="250" height="250"></canvas>
  </div>
  <div class="molecule-card">
    <strong>Naphthalene</strong><br><code>c1ccc2ccccc2c1</code>
    <canvas data-smiles="c1ccc2ccccc2c1" width="250" height="250"></canvas>
  </div>
  <div class="molecule-card">
    <strong>Phenol</strong><br><code>Oc1ccccc1</code>
    <canvas data-smiles="Oc1ccccc1" width="250" height="250"></canvas>
  </div>
</div>

## Drug Molecules

<div class="molecule-grid">
  <div class="molecule-card">
    <strong>Aspirin</strong><br><code>CC(=O)Oc1ccccc1C(=O)O</code>
    <canvas data-smiles="CC(=O)Oc1ccccc1C(=O)O" width="250" height="250"></canvas>
  </div>
  <div class="molecule-card">
    <strong>Caffeine</strong><br><code>Cn1c(=O)c2c(ncn2C)n(C)c1=O</code>
    <canvas data-smiles="Cn1c(=O)c2c(ncn2C)n(C)c1=O" width="250" height="250"></canvas>
  </div>
  <div class="molecule-card">
    <strong>Ibuprofen</strong><br><code>CC(C)Cc1ccc(cc1)[C@@H](C)C(=O)O</code>
    <canvas data-smiles="CC(C)Cc1ccc(cc1)[C@@H](C)C(=O)O" width="250" height="250"></canvas>
  </div>
  <div class="molecule-card">
    <strong>Penicillin G</strong><br><code>CC1([C@@H](N2[C@H](S1)[C@@H](C2=O)NC(=O)Cc3ccccc3)C(=O)O)C</code>
    <canvas data-smiles="CC1([C@@H](N2[C@H](S1)[C@@H](C2=O)NC(=O)Cc3ccccc3)C(=O)O)C" width="250" height="250"></canvas>
  </div>
</div>

## Biomolecules

<div class="molecule-grid">
  <div class="molecule-card">
    <strong>Glucose</strong><br><code>OC[C@H]1OC(O)[C@H](O)[C@@H](O)[C@@H]1O</code>
    <canvas data-smiles="OC[C@H]1OC(O)[C@H](O)[C@@H](O)[C@@H]1O" width="250" height="250"></canvas>
  </div>
  <div class="molecule-card">
    <strong>Alanine</strong><br><code>C[C@@H](N)C(=O)O</code>
    <canvas data-smiles="C[C@@H](N)C(=O)O" width="250" height="250"></canvas>
  </div>
  <div class="molecule-card">
    <strong>ATP</strong><br><code>c1nc(c2c(n1)n(cn2)C3CC(C(O3)COP(=O)(O)OP(=O)(O)OP(=O)(O)O)O)N</code>
    <canvas data-smiles="c1nc(c2c(n1)n(cn2)C3CC(C(O3)COP(=O)(O)OP(=O)(O)OP(=O)(O)O)O)N" width="250" height="250"></canvas>
  </div>
  <div class="molecule-card">
    <strong>Cholesterol</strong><br><code>CC(CCCC(C)C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C</code>
    <canvas data-smiles="CC(CCCC(C)C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C" width="250" height="250"></canvas>
  </div>
</div>

## Functional Groups

<div class="molecule-grid">
  <div class="molecule-card">
    <strong>Formaldehyde</strong> (aldehyde)<br><code>C=O</code>
    <canvas data-smiles="C=O" width="250" height="250"></canvas>
  </div>
  <div class="molecule-card">
    <strong>Acetone</strong> (ketone)<br><code>CC(=O)C</code>
    <canvas data-smiles="CC(=O)C" width="250" height="250"></canvas>
  </div>
  <div class="molecule-card">
    <strong>Diethyl Ether</strong><br><code>CCOCC</code>
    <canvas data-smiles="CCOCC" width="250" height="250"></canvas>
  </div>
  <div class="molecule-card">
    <strong>Methylamine</strong> (amine)<br><code>CN</code>
    <canvas data-smiles="CN" width="250" height="250"></canvas>
  </div>
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
| Glucose | `OC[C@H]1OC(O)[C@H](O)[C@@H](O)[C@@H]1O` |
| Penicillin G | `CC1([C@@H](N2[C@H](S1)[C@@H](C2=O)NC(=O)Cc3ccccc3)C(=O)O)C` |
| Ibuprofen | `CC(C)Cc1ccc(cc1)[C@@H](C)C(=O)O` |
