# Missing Concepts Analysis

!!! prompt
    ❯ are there any other concepts from the @docs/course-description.md that are not covered?  
    Look at the Learning Objectives Aligned to Bloom’s Taxonomy

## Response

  ⎿  Read docs/course-description.md (260 lines)                                                                                                  
  ⎿  ⧉ Selected 1 lines from docs/course-description.md in Visual Studio Code                                                                     
                                                                                                                                                  
⏺ Let me search the chapter content for the specific Bloom's-level topics and identify what might be missing or thin.                             
                                                                                                                                                  
⏺ Bash(cd /Users/danmccreary/Documents/ws/chemistry/docs/chapters && echo "=== Coulombic attraction ===" && grep -rl "Coulombic\|coulombic" . &&  
      echo "=== Molecular Or…)                                                                                                                    
  ⎿  === Coulombic attraction ===                                                                                                                 
                                                                                                                                                
⏺ Bash(cd /Users/danmccreary/Documents/ws/chemistry/docs/chapters && grep -rl "Coulombic\|coulombic" . 2>/dev/null; echo "---MO---"; grep -rl -i  
      "molecular orbital\|MO…)                             
  ⎿  ---MO---                                                                                                                                     
     ---KT control---
     ./10-reaction-rates-and-rate-laws/index.md                                                                                                   
     … +28 lines (ctrl+o to expand)                        
                                                                                                                                                  
⏺ Clear picture now. Here's what the search found:                                                                                                
                                                                                                                                                  
  Completely absent from all 18 chapters:                                                                                                         
                                                                  
  Bloom's Objective: Understand — "Explain periodic trends using Coulombic attraction"                                                            
  Missing Topic: Coulombic attraction                                                                                                             
  Found in chapters?: ✗ zero matches                                                                                                              
  ────────────────────────────────────────
  Bloom's Objective: Evaluate — "Evaluate competing models of bonding"
  Missing Topic: Molecular Orbital (MO) theory, VB vs MO comparison
  Found in chapters?: ✗ zero matches
  ────────────────────────────────────────
  Bloom's Objective: Evaluate — "Critique experimental design for sources of error"
  Missing Topic: Error propagation
  Found in chapters?: ✗ zero matches

  Present and covered:

  ┌────────────────────────────────────────────┬──────────────────┐
  │                   Topic                    │     Chapters     │
  ├────────────────────────────────────────────┼──────────────────┤
  │ Kinetic vs thermodynamic stability/control │ Ch. 10, 13 ✓     │
  ├────────────────────────────────────────────┼──────────────────┤
  │ Reaction energy diagrams                   │ Ch. 10, 11, 12 ✓ │
  ├────────────────────────────────────────────┼──────────────────┤
  │ Lattice energy / Born-Haber                │ Ch. 4, 12 ✓      │
  ├────────────────────────────────────────────┼──────────────────┤
  │ Photoelectron spectroscopy                 │ Ch. 3 ✓          │
  └────────────────────────────────────────────┴──────────────────┘

  ---
  Three genuine gaps:

  1. Coulombic attraction — The course description explicitly uses this as the explanatory mechanism for periodic trends (Effective Nuclear Charge
   concept 80 is there, but Coulombic attraction by name is never explained). Should be added to Chapter 3.
  2. Molecular Orbital (MO) theory — AP Chemistry tests bond order, paramagnetic/diamagnetic character, and MO energy diagrams for diatomics (O₂,
  N₂, etc.). "Competing models of bonding" requires Lewis/VSEPR/VB vs MO theory. Completely absent from the concept list and all chapters.
  3. Error propagation — The lab section of the course description explicitly lists "Error propagation" as a skill, and the Evaluate objective
  says students should "Critique experimental design for sources of error." Neither the concept list nor any chapter covers how errors compound in
   multi-step calculations.

  Would you like me to:
  - Add brief sections on all three gaps to the relevant chapters (Ch. 3 for Coulombic attraction + PES review, Ch. 4 or 5 for MO theory, Ch. 1
  for error propagation)?
  - Add MO theory as new concepts to the learning graph concept list?

✻ Sautéed for 1m 26s

❯ Yes to both                                                                                                                                     
              
⏺ Let me read the relevant chapters first to find the best insertion points, then update the concept list and all three chapters.                 
                                                            
⏺ Searched for 3 patterns, read 1 file (ctrl+o to expand)                                                                                         
                                                            
⏺ Good structure. Now I'll read the relevant sections to find precise insertion points.                                                           
                                                                                                                                                  
⏺ Read 3 files (ctrl+o to expand)                                                                                                                 
                                                           
⏺ Now I have everything I need. I'll make all the edits in parallel — concept list update, then the three chapter insertions.

Changes Made                                                                                                                                                                                                                                             
  Concept List (docs/learning-graph/concept-list.md)
  Added 8 new concepts (501–508) in a new "Addendum" section:

  ┌─────┬────────────────────────────────┬─────────┐
  │  #  │            Concept             │ Chapter │
  ├─────┼────────────────────────────────┼─────────┤
  │ 501 │ Coulombic Attraction           │ Ch. 3   │
  ├─────┼────────────────────────────────┼─────────┤
  │ 502 │ Molecular Orbital Theory       │ Ch. 5   │
  ├─────┼────────────────────────────────┼─────────┤
  │ 503 │ Bonding Molecular Orbitals     │ Ch. 5   │
  ├─────┼────────────────────────────────┼─────────┤
  │ 504 │ Antibonding Molecular Orbitals │ Ch. 5   │
  ├─────┼────────────────────────────────┼─────────┤
  │ 505 │ MO Energy Diagrams             │ Ch. 5   │
  ├─────┼────────────────────────────────┼─────────┤
  │ 506 │ Bond Order from MO Theory      │ Ch. 5   │
  ├─────┼────────────────────────────────┼─────────┤
  │ 507 │ Paramagnetism and Diamagnetism │ Ch. 5   │
  ├─────┼────────────────────────────────┼─────────┤
  │ 508 │ Error Propagation              │ Ch. 1   │
  └─────┴────────────────────────────────┴─────────┘

  Chapter 1 — Error Propagation (new ## Error Propagation section)

  Added between Percent Error and Dimensional Analysis — covers absolute vs. relative uncertainty rules for addition/subtraction and
  multiplication/division, with a worked example and a summary table. Addresses the Evaluate-level objective: "Critique experimental design for
  sources of error."

  Chapter 3 — Coulombic Attraction (new ### Coulombic Attraction subsection)

  Added at the top of section 3.10 (Periodic Trends) — introduces Coulomb's law ($F = kq_1q_2/r^2$) and explains how it drives every periodic
  trend through nuclear charge and electron distance. Addresses the Understand-level objective: "Explain periodic trends using Coulombic
  attraction."

  Chapter 5 — Molecular Orbital Theory (new ## 5.13b section)

  Added before the chapter summary — covers bonding vs. antibonding MOs, MO filling rules, bond order formula, a table of diatomics (H₂ through
  Ne₂), paramagnetism/diamagnetism, the O₂ case study (where Lewis structures fail), and a VB vs. MO comparison table. Includes an MO Energy
  Diagram Explorer MicroSim spec. Addresses the Evaluate-level objective: "Evaluate competing models of bonding."
