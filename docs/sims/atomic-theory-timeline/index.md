---
title: Atomic Theory Timeline
description: Interactive vis-timeline showing the evolution of atomic theory from Democritus (~400 BCE) to the quantum mechanical model (1926).
image: /chemistry/sims/atomic-theory-timeline/atomic-theory-timeline.png
og:image: /chemistry/sims/atomic-theory-timeline/atomic-theory-timeline.png
---
# Atomic Theory Timeline

[Open Full-Screen Viewer](./main.html){ .md-button .md-button--primary }

<iframe src="./main.html" width="100%" height="560px" scrolling="no"></iframe>

## Overview

This interactive timeline traces the evolution of atomic theory across more than 2,300 years — from Democritus's philosophical idea of "atomos" in ancient Greece to Schrödinger's quantum mechanical model in 1926. Click any event to read a detailed description and historical context note for that scientist's contribution.

## Features

- **Click to expand**: Select any event to see the full description and historical context in the panel below the timeline
- **Hover tooltips**: Mouse over an event for a quick historical note
- **Category filtering**: Use the filter buttons to focus on Ancient Philosophy, Classical Atomic Theory, or the Quantum Model
- **Pan and zoom**: Drag to pan across the timeline; use the navigation buttons to zoom in or fit all events

## Timeline Events

| Date | Scientist | Contribution |
|------|-----------|-------------|
| ~400 BCE | Democritus | Proposed "atomos" — indivisible particles of matter |
| 1803 | John Dalton | First modern atomic theory based on experimental evidence |
| 1897 | J.J. Thomson | Discovered the electron; proposed the plum pudding model |
| 1909 | Robert Millikan | Measured the elementary charge of the electron |
| 1911 | Ernest Rutherford | Discovered the nucleus via the gold foil experiment |
| 1913 | Niels Bohr | Proposed quantized electron orbits to explain spectral lines |
| 1926 | Erwin Schrödinger | Developed the quantum mechanical model with electron clouds |

## Lesson Plan

**Learning Objective:** Students will recall the key contributors to atomic theory and place their contributions in historical sequence (Bloom L1: Remember).

**Suggested Activity:**

1. Open the timeline and click **Fit All** to see the full span from 400 BCE to 1926.
2. Click each event in chronological order and read the description.
3. After reviewing all events, hide the panel and try to recall: What experiment did Rutherford perform? What did Thomson discover? What does the quantum model predict?
4. Use the category filters to compare the Classical and Quantum periods.

**Discussion Questions:**

- Why did it take over 2,000 years to go from Democritus's idea to Dalton's scientific theory?
- What experimental evidence forced each model revision?
- How is Schrödinger's model fundamentally different from Bohr's?

## Technical Details

- **Library:** [vis-timeline](https://visjs.github.io/vis-timeline/docs/timeline/) 7.x (loaded from CDN)
- **Data file:** `timeline.json` (edit to add or modify events)
- **Scroll-wheel zoom** is disabled to prevent page-scroll interference when embedded in an iframe
