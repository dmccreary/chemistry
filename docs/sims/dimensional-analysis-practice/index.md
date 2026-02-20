---
title: Dimensional Analysis Practice MicroSim
description: Interactive conversion builder for unit analysis with multi-level problems, scoring, and auto unit cancellation hints.
---

# Dimensional Analysis Practice MicroSim

<iframe src="main.html" width="100%" height="600px" scrolling="no"></iframe>

[Open in New Tab](main.html){ .md-button }

## How to Use

1. Read the **Level** badge and problem statement at the top of the canvas.
2. Click conversion factor tiles in the bottom tray to send them into the workspace chain.
3. Watch the **Unit Cancellation Tracker**: canceled units turn green with a strike-through, while remaining units stay bold.
4. Press **Check Answer** when you think the numeric value and units match the target. Feedback reports whether units or numbers need work.
5. Use **Undo Last Factor** to remove mistakes, or **New Problem** for fresh practice. The score counter tracks correct / attempted conversions.

## Included Conversion Pools

| Level | Sample Problems | Required Factors | Distractor Examples |
|-------|-----------------|------------------|---------------------|
| 1 — Metric Basics | kg → g, cm → m, L → mL | \(1000\ \text{g}/1\ \text{kg}\), \(1\ \text{m}/100\ \text{cm}\), \(1000\ \text{mL}/1\ \text{L}\) | inverse ratios, unrelated time factors |
| 2 — Multi-Step Rates | km/hr → m/s, m/s → km/hr | \(1000\ \text{m}/1\ \text{km}\), \(1\ \text{hr}/3600\ \text{s}\), \(3600\ \text{s}/1\ \text{hr}\) | wrong direction speed factors, volume tiles |
| 3 — Chemistry Context | mol → particles, g → mol, g → molecules, mol → L (STP) | Avogadro's number, molar-mass tiles for \(\ce{H2O}\) & \(\ce{NaCl}\), 22.4 L/mol | reverse Avogadro tiles, incorrect molar masses |

## Teaching Tips

- **Think-Aloud Strategy:** Ask students to verbalize why they selected each tile and predict which units will cancel before they click *Check Answer*.
- **Targeted Feedback:** If the tracker shows leftover denominator units, challenge learners to identify a tile that removes them before adding more conversions.
- **Extension:** Have students design their own Level 3 problems by writing start/target statements that could be solved with the provided factor pool.
- **Assessment Idea:** Run the MicroSim on a projector and poll the class on which tile should be used next; discuss distractor choices to reinforce conceptual understanding.
