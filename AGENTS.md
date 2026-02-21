# Repository Guidelines

## Project Structure & Module Organization
Content lives under `docs/`, mirroring the MkDocs navigation in `mkdocs.yml`. Chapters sit in `docs/chapters/<chapter-id>/`, simulations under `docs/sims/`, and shared assets in `docs/img`, `docs/css`, and `docs/js`. `site/` is regenerated output—do not modify it. Keep diagrams in `docs/img`, raw data or notebooks in `logs/`, and always link assets with relative paths so Material bundles them for GitHub Pages.

## Build, Test, and Development Commands
`mkdocs serve -a localhost:8000` provides hot-reload previews while editing Markdown or `mkdocs.yml`. Run `mkdocs build --strict` before every commit to surface broken links, missing images, or malformed front matter. Publishing is handled through `mkdocs gh-deploy --clean`, which builds and force-updates the `gh-pages` branch—verify you are on the canonical repo before invoking it.

## Coding Style & Naming Conventions
Author content in Markdown with Material extensions enabled. Use sentence-case headings, numeric prefixes for chapters (e.g., `01-foundations-of-chemistry`), and kebab-case directories. Math belongs in `$...$` or `$$...$$`, chemistry notation should use `mhchem`, and callouts should rely on `!!! note`, `!!! warning`, etc. Keep lines under ~100 characters and push layout tweaks into `docs/css/extra.css` or `docs/js/extra.js` rather than inline styles.

## Testing Guidelines
There is no automated unit test suite, so treat `mkdocs build --strict` as the regression gate. Validate hyperlinks, image paths, and embedded assets locally before pushing. For interactive simulations, test in the browser console, document expected behavior in the page itself, and capture any external data files under `docs/sims/<sim>/`.

## Commit & Pull Request Guidelines
History favors short, imperative subjects such as “Add Scientific Method microsim” or “Generate chapter 3 text.” Follow that pattern, keep commits focused on one feature or chapter, and bundle nav or asset updates alongside the content change. Pull requests should state the motivation, list touched paths (e.g., `docs/chapters/08-chemical-reactions/index.md`), attach screenshots or preview URLs for visual tweaks, and paste the `mkdocs build --strict` result when it surfaces warnings.

## Configuration & Assets
Update `mkdocs.yml` whenever you add or rename a page so the sidebar stays in sync, and extend the `watch:` list if you introduce tooling outside `docs/`. Place reusable SVGs or logos in `docs/img` and reference them via `/img/...` paths so Material can bundle them. Custom scripts belong in `docs/js` and must be registered in `extra_javascript`; pin third-party CDNs the way SMILES Drawer is pinned today.

## MicroSim Development Rule
Before touching any p5.js MicroSim, re-read the canonical guide at `../claude-skills/skills/microsim-generator/references/p5-guide.md` and follow its templates exactly (layout constants, control placement, no arrow-function handlers, standard `main.html`). Do not create or edit a MicroSim until you’ve confirmed the guide’s requirements. The user cares about consistency in the user interface of all the MicroSims—do not change UI standards without a compelling reason. Every MicroSim must render a centered title at the top of the drawing area (with sufficient vertical padding) so the canvas always includes a clear heading.

## p5.js MicroSim creation steps
1. **Step 1 – Educational requirements**: define subject, grade band, learning objectives (Bloom-aligned), duration, prerequisites, and assessment ideas; record them for `index.md` and `metadata.json`. `../claude-skills/skills/microsim-generator/references/p5-guide.md:52`
2. **Step 1.5 – Instructional design review**: confirm one clear objective, limit controls (1–5) via inventory table, plan progressive disclosure, run cognitive-load and accessibility checklists; resolve any gaps before coding. `../claude-skills/skills/microsim-generator/references/p5-guide.md:66`
3. **Step 2 – MicroSim implementation**: create folder under `docs/sims/<microsim_name>` containing `index.md`, `main.html`, `<microsim_name>.js`, and `metadata.json`, all following the provided templates and Dublin Core schema. `../claude-skills/skills/microsim-generator/references/p5-guide.md:103`
4. **Step 2.5 – Pre-generation layout planning**: enumerate every control in a table, compute `controlHeight`, `canvasHeight`, `iframeHeight`, `sliderLeftMargin`, and predefined positions for each control/label before writing any code. `../claude-skills/skills/microsim-generator/references/p5-guide.md:135`
5. **Step 3.5 – Post-generation validation**: run the structural, control-placement, and code-quality checklists (canvas math, responsive sizing, accessibility, slider resizing, drawing order, naming) and mentally test canvas widths at 400/800/1200 px; fix issues before sharing. `../claude-skills/skills/microsim-generator/references/p5-guide.md:684`
6. **Step 4 – Auto-standardization**: execute the automated standardization process defined in `SKILL.md` so that `metadata.json`, `index.md`, lesson plan, and references meet schema and quality requirements without manual follow-up. `../claude-skills/skills/microsim-generator/references/p5-guide.md:1200`

## Build & Testing Rule
When running tests or builds (e.g., `mkdocs build --strict`), always activate the `mkdocs` Conda environment first by running `conda activate mkdocs`. Document this step in your workflow and assume it is required before any command that relies on the site toolchain.
