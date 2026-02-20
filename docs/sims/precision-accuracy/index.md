---
title: Precision vs Accuracy Target Diagram
description: An interactive visualization demonstrating the difference between precision (repeatability) and accuracy (correctness) in measurements using a target/dart analogy.
image: /sims/precision-accuracy/precision-accuracy.png
og:image: /sims/precision-accuracy/precision-accuracy.png
quality_score: 95
social:
   cards: false
---

# Precision vs Accuracy Target Diagram

<iframe src="main.html" height="672px" width="100%" scrolling="no"></iframe>

[Run the Precision vs Accuracy MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
[Edit the Precision vs Accuracy MicroSim Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/bZJr3DGHW)

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/intro-to-physics-course/sims/precision-accuracy/main.html" height="672px" scrolling="no"></iframe>
```

## Description

This MicroSim uses a target and dart analogy to help students visually distinguish between two important but often confused measurement concepts:

- **Accuracy**: How close measurements are to the true (accepted) value
- **Precision**: How close measurements are to each other (repeatability)

The visualization displays four targets in a 2×2 grid, each demonstrating a different combination of accuracy and precision:

| Target | Accuracy | Precision | What It Means |
|--------|----------|-----------|---------------|
| Top-Left (Blue) | High | Low | Measurements average to correct value but vary widely |
| Top-Right (Green) | High | High | Measurements are correct and consistent |
| Bottom-Left (Red) | Low | Low | Measurements are neither correct nor consistent |
| Bottom-Right (Orange) | Low | High | Measurements are consistent but systematically wrong |

## How to Use

1. **Observe** the dart patterns on each target
2. **Compare** how clustered (precise) vs. scattered the darts are
3. **Note** how close to center (accurate) vs. offset the darts are
4. **Click "Regenerate Darts"** to see new random patterns that maintain the same characteristics

## Key Concepts

### Accuracy
- Related to **systematic error** (bias)
- Can be improved by calibrating instruments and improving technique
- The orange target shows high precision with low accuracy—a classic systematic error

### Precision
- Related to **random error**
- Can be improved by using better instruments or taking more measurements
- The blue target shows high accuracy with low precision—measurements scatter but center on the true value

### The Goal in Science
Scientists strive for measurements that are BOTH accurate AND precise (green target), where results are close to the true value and highly repeatable.

## Lesson Plan

### Learning Objectives
By the end of this activity, students will be able to:
1. Define accuracy and precision in measurement contexts
2. Distinguish between systematic and random errors
3. Identify measurement quality from visual data patterns
4. Explain why both accuracy and precision are important in scientific measurement

### Grade Level
High School Physics (Grades 9-12)

### Duration
15-20 minutes

### Activities

1. **Prediction** (3 min): Before viewing, ask students what they think "accurate" and "precise" mean in science.

2. **Exploration** (5 min): Let students interact with the simulation, regenerating darts multiple times to see the characteristic patterns.

3. **Discussion** (5 min): Ask students to describe each target pattern and identify which represents the best measurements.

4. **Real-World Examples** (5 min): Have students brainstorm examples of each type:
   - Accurate & Precise: A well-calibrated digital scale
   - Accurate but Imprecise: Averaging many crowd-sourced measurements
   - Precise but Inaccurate: A miscalibrated instrument
   - Neither: A broken or unreliable instrument

### Assessment Questions
1. If all your measurements are clustered together but far from the accepted value, what type of error do you have?
2. How would you improve the precision of measurements?
3. Why might a precise but inaccurate measurement be more dangerous than an imprecise measurement?

## References

1. [Accuracy and Precision](https://www.physicsclassroom.com/class/1DKin/Lesson-1/Accuracy-and-Precision) - Physics Classroom - Clear explanation of accuracy vs precision with examples
2. [JCGM 200:2012 - International Vocabulary of Metrology](https://www.bipm.org/documents/20126/2071204/JCGM_200_2012.pdf) - BIPM - Official definitions of measurement terminology
3. [Precision vs Accuracy](https://www.khanacademy.org/math/ap-statistics/gathering-data-ap/measuring-and-sampling/v/accuracy-vs-precision) - Khan Academy - Video tutorial on measurement concepts
