title: Interactive Density Graphing MicroSim
description: Plot mass vs. volume data, run a best-fit line, and compare the resulting density to known reference materials.
image: /sims/density-graphing/density-graphing.png
og:image: /sims/density-graphing/density-graphing.png
twitter:image: /sims/density-graphing/density-graphing.png
social:
   cards: false
quality_score: 0

# Interactive Density Graphing MicroSim

<iframe src="main.html" height="450px" width="100%" scrolling="no"></iframe>

[Run the Interactive Density Graphing MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the Interactive Density Graphing MicroSim in the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/FNkkoZoMR)

## About This MicroSim

Students practice plotting experimental data, fitting a line of best fit, and interpreting slope as density. Three mystery substances each include slightly scattered mass vs. volume measurements. Learners add the data points manually on the scatter plot, draw a best-fit line, calculate its slope, and then match that density to a known material.

## How to Use

1. Pick a mystery substance to see its data table of (volume, mass) trials.
2. Click on the grid to plot each point from the table. Use the grid lines to keep units consistent.
3. When at least two points are plotted, toggle the “Show Best Fit Line” button to display a regression line and click “Calculate Slope” to determine the density.
4. Compare the calculated slope to the reference table, choose a material in the Identify dropdown, and press “Check Answer” to confirm your choice.

## Iframe Embed Code

```html
<iframe src="main.html"
        height="450px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
Grades 9-12 (AP / honors chemistry)

### Duration
15-20 minutes (longer if students collect their own measurements first)

### Prerequisites
- Measuring mass and volume with correct units
- Understanding of density as $m/V$
- Experience reading scatter plots and axes in cm$^3$ and grams

### Activities

1. **Warm-Up (5 min):** Review how the slope of a mass vs. volume plot equals density. Identify independent and dependent variables.
2. **Hands-On Plotting (7 min):** Students choose one mystery substance and plot each data pair by clicking on the grid, practicing proportional reasoning and unit alignment.
3. **Analysis & Identification (5 min):** Learners display the best-fit line, calculate the slope, and match it to a known material from the reference table. Discuss sources of scatter and percent error.

### Assessment
- Correct placement of data points with appropriate axes and units
- Accurate interpretation of the best-fit slope as density (within ±0.3 g/cm$^3$ of the target)
- Justified explanation for the chosen material in the Identify dropdown, referencing measured density and the reference table

## References

1. National Institute of Standards and Technology (NIST), *Reference Data for Densities of Solids and Liquids*, 2024.
2. College Board, *AP Chemistry Course and Exam Description*, Unit 1: Atomic Structure and Properties (data analysis skills).
