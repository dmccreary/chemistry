---
title: Electromagnetic Spectrum Infographic
description: Interactive electromagnetic spectrum with matching wavelength, frequency, and photon energy scales. Move the marker from radio waves to gamma rays to see each region, how it interacts with matter, and the values calculated from c = λf and E = hf.
image: /sims/em-spectrum-infographic/em-spectrum-infographic.png
og:image: /sims/em-spectrum-infographic/em-spectrum-infographic.png
twitter:image: /sims/em-spectrum-infographic/em-spectrum-infographic.png
social:
   cards: false
quality_score: 100
---

# Electromagnetic Spectrum Infographic

<iframe src="main.html" height="642px" width="100%" scrolling="no"></iframe>

[Run the Electromagnetic Spectrum Infographic MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

All electromagnetic radiation travels at the speed of light, so wavelength and frequency are tied together: when one goes up, the other must go down. The energy of a single photon rises with frequency.

$$c = \lambda f \qquad\qquad E = hf = \frac{hc}{\lambda}$$

This MicroSim lays the whole spectrum out on a logarithmic scale, with long wavelengths on the left:

- The **colored bar** shows the seven regions in order: radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, and gamma rays. Visible light is only a thin sliver, so it is magnified underneath (700 nm red to 400 nm violet).
- The **three rulers** line up wavelength (m), frequency (Hz), and photon energy (eV). A vertical line through all three always marks values that belong to the same photon.
- The **panel** names the region under the red marker, gives its wavelength range, describes what that radiation does to matter, and calculates $f$ and $E$ for the chosen wavelength.

The calculations use the constants on the AP Chemistry equation sheet, $c = 2.998 \times 10^{8}$ m/s and $h = 6.626 \times 10^{-34}$ J·s, with $1\ \text{eV} = 1.602 \times 10^{-19}$ J. The boundaries between regions are conventions, and neighboring regions blend into each other. In particular, the eye responds faintly a little beyond the 400 nm and 700 nm limits used here.

## How to Use

1. **Drag the Wavelength slider** (or click anywhere on the colored bar or the rulers) to move the red marker. Sliding right shortens the wavelength.
2. **Pick an example** such as an FM radio station, a microwave oven, or a medical X-ray to jump to a real source.
3. **Click the magnified rainbow** to choose a specific color of visible light.
4. **Read across the three rulers** at the marker, then check the calculation in the panel.
5. **Compare two regions.** How many powers of ten separate the photon energy of a microwave from that of an X-ray?

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/chemistry/sims/em-spectrum-infographic/main.html"
        height="642px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (AP Chemistry, Chapter 3: Electron Configuration and Periodic Trends)

### Duration
10-15 minutes

### Learning Objectives

- **Remember:** Identify the regions of the electromagnetic spectrum in order of wavelength.
- **Understand:** Compare the relative wavelength, frequency, and photon energy of different types of radiation using $c = \lambda f$ and $E = hf$.

### Prerequisites

- Scientific notation and powers of ten
- The idea that light has both a wavelength and a frequency

### Activities

1. **Exploration** (3 min): Sweep the slider slowly from the far left to the far right. Students list the seven regions in order and note which way frequency and energy change.
2. **Guided Practice** (5 min): Choose *Green light (550 nm)*. Students calculate $f$ and $E$ on paper with the constants shown, then compare with the panel ($5.45 \times 10^{14}$ Hz and $3.61 \times 10^{-19}$ J). Repeat for *Germicidal UV lamp (254 nm)* and explain why ultraviolet light can damage molecules that visible light cannot.
3. **Connect to Chemistry** (4 min): For each region, read the "Effect on matter" line. Students match microwave, infrared, and ultraviolet-visible radiation with molecular rotation, bond vibration, and electron transitions.
4. **Assessment** (3 min): With the MicroSim hidden, give students three sources (FM radio, red light, X-ray) to rank by wavelength, frequency, and photon energy.

### Assessment

- Can the student list the regions in order from longest to shortest wavelength?
- Can the student explain why a shorter wavelength means a higher photon energy?
- Can the student calculate frequency and photon energy from a wavelength, with correct units?

## References

1. [OpenStax Chemistry 2e, Section 6.1: Electromagnetic Energy](https://openstax.org/books/chemistry-2e/pages/6-1-electromagnetic-energy) - OpenStax - Free textbook section on waves, the electromagnetic spectrum, and the photon energy equation.
2. [Tour of the Electromagnetic Spectrum](https://science.nasa.gov/ems/) - NASA Science - Region-by-region introduction to the spectrum with everyday and scientific uses.
3. [AP Chemistry Course and Exam Description](https://apcentral.collegeboard.org/courses/ap-chemistry) - College Board - Source of the equation sheet constants and the links between spectral regions and molecular rotation, vibration, and electronic transitions.
