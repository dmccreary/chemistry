# MicroSim TODO

Pending "#### Diagram" specs in chapters that still require actual MicroSim builds. Always address the first item before moving down the list.

No pending MicroSim specs at this time.

## JavaScript Bugs — Blank Screenshots

The following 3 MicroSims render a blank white canvas in the browser (and in headless screenshot capture). The JavaScript has bugs that prevent p5.js from drawing. These need to be debugged and fixed before a useful screenshot can be captured.

After fixing, recapture with:

```bash
~/.local/bin/bk-capture-screenshot docs/sims/arrhenius-equation-explorer 3 622
~/.local/bin/bk-capture-screenshot docs/sims/faraday-law-calculator 3 822
~/.local/bin/bk-capture-screenshot docs/sims/vsepr-geometry-builder 3 640
```

### Arrhenius Equation Explorer (`arrhenius-equation-explorer`)

- **Status:** Blank white canvas
- **Symptom:** `arrhenius-equation-explorer.png` is 100% white pixels
- **Suspect:** `draw()` not executing or rendering to an off-screen element
- **File:** `docs/sims/arrhenius-equation-explorer/arrhenius-equation-explorer.js`

### Electrolysis Stoichiometry Calculator (`faraday-law-calculator`)

- **Status:** Blank white canvas
- **Symptom:** `faraday-law-calculator.png` is 100% white pixels
- **Suspect:** `draw()` not executing or rendering to an off-screen element
- **File:** `docs/sims/faraday-law-calculator/faraday-law-calculator.js`

### VSEPR Molecular Geometry Builder (`vsepr-geometry-builder`)

- **Status:** Nearly blank canvas (98.8% white)
- **Symptom:** `vsepr-geometry-builder.png` shows only faint grey UI chrome, no simulation content
- **Suspect:** 3D WEBGL rendering not initializing, or geometry not drawn in initial state
- **File:** `docs/sims/vsepr-geometry-builder/vsepr-geometry-builder.js`
