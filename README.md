# AP Chemistry — Interactive Intelligent Textbook

[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![GitHub Pages](https://img.shields.io/badge/View%20on-GitHub%20Pages-blue?logo=github)](https://dmccreary.github.io/chemistry/)
[![GitHub](https://img.shields.io/badge/GitHub-dmccreary%2Fchemistry-blue?logo=github)](https://github.com/dmccreary/chemistry)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-DA7857?logo=anthropic)](https://claude.ai/code)
[![Claude Skills](https://img.shields.io/badge/Uses-Claude%20Skills-DA7857?logo=anthropic)](https://github.com/dmccreary/claude-skills)
[![p5.js](https://img.shields.io/badge/p5.js-ED225D?logo=p5.js&logoColor=white)](https://p5js.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## View the Live Site

Visit the interactive textbook at: [https://dmccreary.github.io/chemistry/](https://dmccreary.github.io/chemistry/)

## Overview

This is an interactive, AI-assisted intelligent textbook for AP Chemistry, designed for high school juniors and seniors seeking college credit. Built with MkDocs Material, it covers 500 concepts across 18 chapters aligned to the AP Chemistry Course and Exam Description (CED). The textbook features a fun cat mascot named Catalyst who guides students with encouragement, tips, and key insights throughout every chapter.

What sets this textbook apart is its deep integration of interactive MicroSims — browser-based simulations powered by p5.js and other JavaScript libraries — that let students manipulate real chemistry variables and immediately see results. Complex topics like equilibrium, thermodynamics, and electrochemistry become tangible through hands-on exploration rather than passive reading. All simulations run entirely in the browser with no software installation required, ensuring every student worldwide can participate regardless of economic circumstance.

The project is built on free, open-source tools exclusively — MkDocs Material for navigation, MathJax + mhchem for chemical equation rendering, SmilesDrawer for 2D molecular structure diagrams, and p5.js for interactive simulations. Content was generated and curated using Claude AI skills, making it a Level 2+ intelligent textbook with concept dependency graphs, Bloom's Taxonomy-aligned learning objectives, and adaptive quiz questions.

## Site Status and Metrics

*Metrics generated February 22, 2026.*

| Metric | Count |
|--------|-------|
| Chapters | 18 |
| Concepts in Learning Graph | 500 |
| Glossary Terms | 472 |
| FAQ Questions | 70 |
| Quiz Questions | 180 |
| MicroSims | 44 |
| Diagrams | 63 |
| LaTeX Equations (all content) | 4,855 |
| Total Words (all content) | 200,437 |
| Total Words (chapters only) | 134,144 |
| Equivalent Pages (all content) | 839 |
| Equivalent Pages (chapters only) | 574 |

**Completion Status:** All 18 chapters complete with full content, quizzes, and MicroSims.

## Getting Started

### Prerequisites

- Python 3.8+
- pip

### Clone the Repository

```bash
git clone https://github.com/dmccreary/chemistry.git
cd chemistry
```

### Install Dependencies

```bash
pip install mkdocs mkdocs-material
```

### Build and Serve Locally

Serve locally with live reload:

```bash
mkdocs serve
```

Open your browser to `http://127.0.0.1:8000/chemistry/`

Build the static site:

```bash
mkdocs build
```

### Deploy to GitHub Pages

```bash
mkdocs gh-deploy
```

### Using the Textbook

**Navigation:**

- Use the left sidebar to browse all 18 chapters, MicroSims, glossary, and FAQ
- Use the search icon (top right) to search all content
- Each chapter includes quizzes and curated references

**Interactive MicroSims:**

- Found in the MicroSims section of the sidebar
- Each simulation runs standalone in your browser — no installation needed
- Adjust parameters with sliders and controls to explore chemistry concepts

**Chemistry Notation:**

- Chemical formulas and equations are rendered with MathJax + mhchem
- 2D molecular structures are drawn from SMILES notation using SmilesDrawer
- Mathematical equations use LaTeX rendering via MathJax

## Repository Structure

```
chemistry/
├── docs/                              # MkDocs documentation source
│   ├── chapters/                      # 18 chapter content directories
│   │   ├── 01-foundations-of-chemistry/
│   │   │   ├── index.md              # Chapter content
│   │   │   ├── quiz.md               # Chapter quiz questions
│   │   │   └── references.md         # Curated references
│   │   └── 02-atomic-structure-and-mass-spectrometry/
│   │       └── ...
│   ├── sims/                          # 44 interactive p5.js MicroSims
│   │   ├── ideal-gas-law-simulator/
│   │   │   ├── index.md              # MicroSim documentation page
│   │   │   ├── main.html             # Standalone simulation
│   │   │   └── metadata.json         # Dublin Core metadata
│   │   └── ...
│   ├── learning-graph/                # Concept dependency graph and metrics
│   │   ├── concept-list.md           # All 500 concepts
│   │   ├── learning-graph.csv        # Concept dependencies
│   │   ├── quality-metrics.md        # Learning graph quality report
│   │   ├── book-metrics.md           # Overall textbook metrics
│   │   └── chapter-metrics.md        # Per-chapter metrics
│   ├── img/                           # Images and mascot assets
│   │   └── mascot/                   # Catalyst the cat mascot images
│   ├── css/                           # Custom stylesheets
│   │   ├── extra.css
│   │   └── mascot.css
│   ├── js/                            # Custom JavaScript
│   │   ├── mathjax-config.js         # MathJax + mhchem configuration
│   │   ├── smiles.js                 # SmilesDrawer auto-render
│   │   └── extra.js                  # Prompt copy button
│   ├── glossary.md                    # 472 ISO 11179-compliant definitions
│   ├── faq.md                         # 70 frequently asked questions
│   └── license.md                     # CC BY-NC-SA 4.0 license
├── mkdocs.yml                         # MkDocs configuration
└── README.md                          # This file
```

## Reporting Issues

Found a bug, typo, or have a suggestion for improvement? Please report it:

[GitHub Issues](https://github.com/dmccreary/chemistry/issues)

When reporting issues, please include:

- Description of the problem or suggestion
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots if applicable
- Browser and OS details (for MicroSim issues)

## License

This work is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

**You are free to:**

- Share — copy and redistribute the material
- Adapt — remix, transform, and build upon the material

**Under the following terms:**

- **Attribution** — Give appropriate credit with a link to the original
- **NonCommercial** — No commercial use without permission
- **ShareAlike** — Distribute contributions under the same license

See [docs/license.md](docs/license.md) for full details.

## Acknowledgements

This project is built on excellent open source tools:

- **[MkDocs](https://www.mkdocs.org/)** — Static site generator optimized for project documentation
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** — Beautiful, responsive documentation theme
- **[p5.js](https://p5js.org/)** — Creative coding library from NYU ITP, powering all MicroSims
- **[MathJax](https://www.mathjax.org/)** — Beautiful math rendering in any browser
- **[mhchem](https://mhchem.github.io/MathJax-mhchem/)** — Chemical equation typesetting for MathJax
- **[SmilesDrawer](https://github.com/reymond-group/smilesDrawer)** — Client-side 2D molecular structure diagrams from SMILES
- **[Claude AI](https://claude.ai)** by Anthropic — AI-assisted content generation and skill automation
- **[GitHub Pages](https://pages.github.com/)** — Free hosting for open source projects

Special thanks to the AP Chemistry community of educators whose course descriptions and learning objectives shaped this curriculum.

## Contact

**Dan McCreary**

- LinkedIn: [linkedin.com/in/danmccreary](https://www.linkedin.com/in/danmccreary/)
- GitHub: [@dmccreary](https://github.com/dmccreary)

Questions, suggestions, or collaboration opportunities? Feel free to connect on LinkedIn or open an issue on GitHub.
