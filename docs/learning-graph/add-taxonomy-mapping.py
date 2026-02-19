#!/usr/bin/env python3
"""Add taxonomy IDs to the learning graph CSV based on concept ID ranges and specific assignments."""

import csv

# Define taxonomy mapping by concept ID ranges and specific IDs
taxonomy_map = {}

# Foundation Concepts (1-25)
for i in range(1, 26):
    taxonomy_map[i] = "FOUND"

# Atomic Structure (26-45 subatomic + isotopes + moles basics)
for i in range(26, 38):
    taxonomy_map[i] = "ATOM"

# Moles and Quantitative Analysis
for i in [38, 39, 40, 41, 42, 43, 44, 45]:
    taxonomy_map[i] = "MOLE"

# Atomic Structure continued (46-70: quantum model, electron config, spectra)
for i in range(46, 71):
    taxonomy_map[i] = "ATOM"

# Periodic Table and Trends (71-80)
for i in range(71, 81):
    taxonomy_map[i] = "PTAB"

# Bonding and Structure (81-140)
for i in range(81, 141):
    taxonomy_map[i] = "BOND"

# Intermolecular Forces (141-160)
for i in range(141, 161):
    taxonomy_map[i] = "IMF"

# Gas Laws (160-175)
for i in range(160, 176):
    taxonomy_map[i] = "GAS"

# IMF continued - Phase changes and solutions (176-200)
for i in range(176, 188):
    taxonomy_map[i] = "IMF"

# Solutions
for i in range(188, 201):
    taxonomy_map[i] = "IMF"

# Chemical Reactions (201-265)
# Reaction types and equations
for i in range(201, 217):
    taxonomy_map[i] = "RXNS"

# Stoichiometry (217-265)
for i in range(217, 266):
    taxonomy_map[i] = "STOI"

# Override specific reaction concepts back to RXNS
for i in [231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242,
          243, 244, 245, 246, 247, 248, 249, 259, 260, 261, 262, 263, 264]:
    taxonomy_map[i] = "RXNS"

# Kinetics (266-320)
for i in range(266, 321):
    taxonomy_map[i] = "KIN"

# Thermodynamics (321-375)
for i in range(321, 376):
    taxonomy_map[i] = "THRM"

# Equilibrium (376-420)
for i in range(376, 421):
    taxonomy_map[i] = "EQBM"

# Acids and Bases (421-475)
for i in range(421, 476):
    taxonomy_map[i] = "ACID"

# Electrochemistry (476-500)
for i in range(476, 501):
    taxonomy_map[i] = "ECHEM"

# Read the CSV and add taxonomy
rows = []
with open('learning-graph.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        cid = int(row['ConceptID'])
        row['TaxonomyID'] = taxonomy_map.get(cid, 'MISC')
        rows.append(row)

# Write updated CSV
with open('learning-graph.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['ConceptID', 'ConceptLabel', 'Dependencies', 'TaxonomyID'])
    writer.writeheader()
    writer.writerows(rows)

# Print summary
from collections import Counter
counts = Counter(row['TaxonomyID'] for row in rows)
print("Taxonomy distribution:")
for tax, count in sorted(counts.items()):
    print(f"  {tax}: {count}")
print(f"Total: {sum(counts.values())}")
