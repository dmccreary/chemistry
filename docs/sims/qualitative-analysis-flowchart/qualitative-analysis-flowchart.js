// Qualitative Analysis Flowchart - Mermaid MicroSim interaction script
// CANVAS_HEIGHT: 760
// AP Chemistry - Chapter 9: Stoichiometry, Titrations, and Analysis (Section 9.2)
// Learning objective (Bloom: Understand): explain how a mixture of cations is
// separated into five groups by adding reagents in a fixed order, and trace the
// path of any one cation through the scheme.
//
// The flowchart itself is declared in main.html. This script adds the
// explanation panel, the step-through buttons, and the "trace a cation" menu.
// The five groups and their ions are the ones taught in the chapter text:
//   Group I   Ag+, Pb2+, Hg2^2+            insoluble chlorides (dilute HCl)
//   Group II  Cu2+, Bi3+, Cd2+, Sn2+       sulfides insoluble in acid (H2S, acidic)
//   Group III Fe3+, Al3+, Cr3+, Ni2+, Zn2+ hydroxides or sulfides (basic solution)
//   Group IV  Ba2+, Ca2+, Sr2+             carbonates ((NH4)2CO3)
//   Group V   Na+, K+, NH4+                stay dissolved

// ---- Small HTML helpers -------------------------------------------------------
// Reaction arrow drawn as a shape, so no arrow character is needed in the text
const ARROW = '<svg class="rxn-arrow" width="26" height="10" viewBox="0 0 26 10" role="img" aria-label="yields">' +
    '<line x1="1" y1="5" x2="19" y2="5" stroke="#222" stroke-width="1.6"/>' +
    '<polygon points="26,5 18,1 18,9" fill="#222"/></svg>';
const MINUS = '&minus;';

function sup(text) { return '<sup>' + text + '</sup>'; }
function sub(text) { return '<sub>' + text + '</sub>'; }
function eqn(html, extraClass) {
    return '<div class="eqn' + (extraClass ? ' ' + extraClass : '') + '">' + html + '</div>';
}

const H2S = 'H' + sub(2) + 'S';
const NH3 = 'NH' + sub(3);
const NH4 = 'NH' + sub(4) + sup('+');
const H2O = 'H' + sub(2) + 'O';
const CO3 = 'CO' + sub(3) + sup('2' + MINUS);

// ---- The separation scheme ------------------------------------------------------
// Order of the flowchart nodes for the Previous / Next buttons
const ALL_STEPS = ['Start', 'T1', 'G1', 'T2', 'G2', 'T3', 'G3', 'T4', 'G4', 'G5'];
const TESTS = ['T1', 'T2', 'T3', 'T4'];

// Why an ion that belongs to a later group does NOT precipitate at each test
const STAYS = {
    T1: 'its chloride is soluble',
    T2: 'it does not form an insoluble sulfide in acidic solution',
    T3: 'it forms no insoluble hydroxide or sulfide in this buffer',
    T4: 'its carbonate is soluble'
};

// Each cation: group number, the solid it forms, and the net ionic equation.
// flame = flame test color from the chapter's flame test table.
const IONS = [
    { key: 'Ag', label: 'Ag⁺ (silver)', html: 'Ag' + sup('+'), group: 1,
      solid: 'AgCl', color: 'white',
      equation: 'Ag' + sup('+') + ' + Cl' + sup(MINUS) + ARROW + 'AgCl(s)' },
    { key: 'Pb', label: 'Pb²⁺ (lead)', html: 'Pb' + sup('2+'), group: 1,
      solid: 'PbCl' + sub(2), color: 'white',
      equation: 'Pb' + sup('2+') + ' + 2Cl' + sup(MINUS) + ARROW + 'PbCl' + sub(2) + '(s)',
      extra: 'PbCl' + sub(2) + ' is slightly soluble, so a little Pb' + sup('2+') + ' can slip through to Group II.',
      flame: 'pale blue (faint)' },
    { key: 'Hg2', label: 'Hg₂²⁺ (mercury(I))', html: 'Hg' + sub(2) + sup('2+'), group: 1,
      solid: 'Hg' + sub(2) + 'Cl' + sub(2), color: 'white',
      equation: 'Hg' + sub(2) + sup('2+') + ' + 2Cl' + sup(MINUS) + ARROW + 'Hg' + sub(2) + 'Cl' + sub(2) + '(s)' },
    { key: 'Cu', label: 'Cu²⁺ (copper(II))', html: 'Cu' + sup('2+'), group: 2,
      solid: 'CuS', color: 'black',
      equation: 'Cu' + sup('2+') + ' + ' + H2S + ARROW + 'CuS(s) + 2H' + sup('+'),
      extra: 'A blue solution is an early clue that Cu' + sup('2+') + ' is present.',
      flame: 'blue-green' },
    { key: 'Bi', label: 'Bi³⁺ (bismuth)', html: 'Bi' + sup('3+'), group: 2,
      solid: 'Bi' + sub(2) + 'S' + sub(3), color: 'dark brown',
      equation: '2Bi' + sup('3+') + ' + 3' + H2S + ARROW + 'Bi' + sub(2) + 'S' + sub(3) + '(s) + 6H' + sup('+') },
    { key: 'Cd', label: 'Cd²⁺ (cadmium)', html: 'Cd' + sup('2+'), group: 2,
      solid: 'CdS', color: 'yellow',
      equation: 'Cd' + sup('2+') + ' + ' + H2S + ARROW + 'CdS(s) + 2H' + sup('+') },
    { key: 'Sn', label: 'Sn²⁺ (tin(II))', html: 'Sn' + sup('2+'), group: 2,
      solid: 'SnS', color: 'brown',
      equation: 'Sn' + sup('2+') + ' + ' + H2S + ARROW + 'SnS(s) + 2H' + sup('+') },
    { key: 'Fe', label: 'Fe³⁺ (iron(III))', html: 'Fe' + sup('3+'), group: 3,
      solid: 'Fe(OH)' + sub(3), color: 'red-brown',
      equation: 'Fe' + sup('3+') + ' + 3' + NH3 + ' + 3' + H2O + ARROW + 'Fe(OH)' + sub(3) + '(s) + 3' + NH4,
      extra: 'Sulfide in the mixture can turn this solid into black iron sulfide.' },
    { key: 'Al', label: 'Al³⁺ (aluminum)', html: 'Al' + sup('3+'), group: 3,
      solid: 'Al(OH)' + sub(3), color: 'white and gelatinous',
      equation: 'Al' + sup('3+') + ' + 3' + NH3 + ' + 3' + H2O + ARROW + 'Al(OH)' + sub(3) + '(s) + 3' + NH4 },
    { key: 'Cr', label: 'Cr³⁺ (chromium(III))', html: 'Cr' + sup('3+'), group: 3,
      solid: 'Cr(OH)' + sub(3), color: 'gray-green',
      equation: 'Cr' + sup('3+') + ' + 3' + NH3 + ' + 3' + H2O + ARROW + 'Cr(OH)' + sub(3) + '(s) + 3' + NH4 },
    { key: 'Ni', label: 'Ni²⁺ (nickel(II))', html: 'Ni' + sup('2+'), group: 3,
      solid: 'NiS', color: 'black',
      equation: 'Ni' + sup('2+') + ' + S' + sup('2' + MINUS) + ARROW + 'NiS(s)' },
    { key: 'Zn', label: 'Zn²⁺ (zinc)', html: 'Zn' + sup('2+'), group: 3,
      solid: 'ZnS', color: 'white',
      equation: 'Zn' + sup('2+') + ' + S' + sup('2' + MINUS) + ARROW + 'ZnS(s)' },
    { key: 'Ba', label: 'Ba²⁺ (barium)', html: 'Ba' + sup('2+'), group: 4,
      solid: 'BaCO' + sub(3), color: 'white',
      equation: 'Ba' + sup('2+') + ' + ' + CO3 + ARROW + 'BaCO' + sub(3) + '(s)',
      flame: 'pale green' },
    { key: 'Ca', label: 'Ca²⁺ (calcium)', html: 'Ca' + sup('2+'), group: 4,
      solid: 'CaCO' + sub(3), color: 'white',
      equation: 'Ca' + sup('2+') + ' + ' + CO3 + ARROW + 'CaCO' + sub(3) + '(s)',
      flame: 'brick red' },
    { key: 'Sr', label: 'Sr²⁺ (strontium)', html: 'Sr' + sup('2+'), group: 4,
      solid: 'SrCO' + sub(3), color: 'white',
      equation: 'Sr' + sup('2+') + ' + ' + CO3 + ARROW + 'SrCO' + sub(3) + '(s)',
      flame: 'crimson' },
    { key: 'Na', label: 'Na⁺ (sodium)', html: 'Na' + sup('+'), group: 5, flame: 'bright yellow' },
    { key: 'K', label: 'K⁺ (potassium)', html: 'K' + sup('+'), group: 5,
      flame: 'lilac (viewed through cobalt blue glass)' },
    { key: 'NH4', label: 'NH₄⁺ (ammonium)', html: NH4, group: 5,
      equation: NH4 + ' + OH' + sup(MINUS) + ARROW + NH3 + '(g) + ' + H2O,
      extra: 'Warm a fresh sample with NaOH. Ammonia gas turns moist red litmus paper blue.' }
];

let currentIon = null;      // null = show the whole scheme
let path = ALL_STEPS;       // nodes the Previous / Next buttons walk through
let currentStep = 0;

function pathFor(ion) {
    if (!ion) return ALL_STEPS;
    const nodes = ['Start'];
    const lastTest = Math.min(ion.group, 4);
    for (let i = 1; i <= lastTest; i++) nodes.push('T' + i);
    nodes.push('G' + ion.group);
    return nodes;
}

// ---- Panel content: the whole scheme ----------------------------------------------
function generalInfo(nodeId) {
    switch (nodeId) {
    case 'Start':
        return {
            title: 'Unknown solution',
            body: '<p>The solution may contain any mixture of the cations in the five groups.</p>' +
                '<p>Reagents are added in a fixed order. Each one precipitates a single group; the solid is filtered off and the liquid that passes through (the <b>filtrate</b>) goes on to the next reagent.</p>' +
                '<p>The order matters. Sulfide would also precipitate Ag' + sup('+') + ' and Pb' + sup('2+') + ', so the chlorides must be removed first.</p>'
        };
    case 'T1':
        return {
            title: 'Step 1: add dilute HCl',
            body: '<p>Solubility rule: chlorides are soluble <b>except</b> those of Ag' + sup('+') + ', Pb' + sup('2+') + ', and Hg' + sub(2) + sup('2+') + '.</p>' +
                eqn('Ag' + sup('+') + ' + Cl' + sup(MINUS) + ARROW + 'AgCl(s)') +
                '<p>A white precipitate means at least one Group I ion is present. Every other cation stays in the filtrate.</p>'
        };
    case 'G1':
        return {
            title: 'Group I: insoluble chlorides',
            body: '<ul><li>AgCl, white</li><li>PbCl' + sub(2) + ', white</li><li>Hg' + sub(2) + 'Cl' + sub(2) + ', white</li></ul>' +
                '<p>All three solids are white, so further tests are needed to tell them apart. PbCl' + sub(2) + ', for example, dissolves in hot water and the other two do not.</p>'
        };
    case 'T2':
        return {
            title: 'Step 2: add ' + H2S + ' in acidic solution',
            body: '<p>In acid the sulfide ion concentration is very low, so only the <b>least soluble</b> sulfides precipitate.</p>' +
                eqn('Cu' + sup('2+') + ' + ' + H2S + ARROW + 'CuS(s) + 2H' + sup('+')) +
                '<p>Ions whose sulfides are more soluble stay in the filtrate.</p>'
        };
    case 'G2':
        return {
            title: 'Group II: sulfides insoluble in acid',
            body: '<ul><li>CuS, black</li><li>Bi' + sub(2) + 'S' + sub(3) + ', dark brown</li><li>CdS, yellow</li><li>SnS, brown</li></ul>' +
                '<p>The color of the precipitate is a useful clue to which ion is present.</p>'
        };
    case 'T3':
        return {
            title: 'Step 3: add ' + NH3 + '/' + NH4 + ' buffer and ' + H2S,
            body: '<p>The buffer makes the solution basic. That raises the concentrations of OH' + sup(MINUS) + ' and S' + sup('2' + MINUS) + ', so insoluble hydroxides and the more soluble sulfides now precipitate.</p>' +
                eqn('Al' + sup('3+') + ' + 3' + NH3 + ' + 3' + H2O + ARROW + 'Al(OH)' + sub(3) + '(s) + 3' + NH4) +
                eqn('Zn' + sup('2+') + ' + S' + sup('2' + MINUS) + ARROW + 'ZnS(s)')
        };
    case 'G3':
        return {
            title: 'Group III: hydroxides or sulfides',
            body: '<ul><li>Fe(OH)' + sub(3) + ', red-brown</li><li>Al(OH)' + sub(3) + ', white and gelatinous</li>' +
                '<li>Cr(OH)' + sub(3) + ', gray-green</li><li>NiS, black</li><li>ZnS, white</li></ul>' +
                '<p>Fe' + sup('3+') + ', Al' + sup('3+') + ', and Cr' + sup('3+') + ' come down as hydroxides; Ni' + sup('2+') + ' and Zn' + sup('2+') + ' as sulfides.</p>'
        };
    case 'T4':
        return {
            title: 'Step 4: add (NH' + sub(4) + ')' + sub(2) + 'CO' + sub(3),
            body: '<p>Carbonate ion precipitates the remaining 2+ ions, the alkaline earth metals.</p>' +
                eqn('Ba' + sup('2+') + ' + ' + CO3 + ARROW + 'BaCO' + sub(3) + '(s)') +
                '<p>Whatever is still dissolved after this step belongs to Group V.</p>'
        };
    case 'G4':
        return {
            title: 'Group IV: insoluble carbonates',
            body: '<ul><li>BaCO' + sub(3) + ', white</li><li>CaCO' + sub(3) + ', white</li><li>SrCO' + sub(3) + ', white</li></ul>' +
                '<p>All three are white. Flame tests tell them apart: Ba' + sup('2+') + ' pale green, Ca' + sup('2+') + ' brick red, Sr' + sup('2+') + ' crimson.</p>'
        };
    case 'G5':
        return {
            title: 'Group V: ions that stay dissolved',
            body: '<p>Common salts of Na' + sup('+') + ', K' + sup('+') + ', and ' + NH4 + ' are all soluble, so no reagent in the scheme precipitates them.</p>' +
                '<ul><li>Na' + sup('+') + ': bright yellow flame</li><li>K' + sup('+') + ': lilac flame, viewed through cobalt blue glass</li>' +
                '<li>' + NH4 + ': warm with NaOH; ammonia gas is released</li></ul>' +
                '<p>Test for ' + NH4 + ' on a fresh sample, because ammonium reagents were added in steps 3 and 4.</p>'
        };
    default:
        return { title: '', body: '' };
    }
}

const TEST_NAMES = {
    T1: 'dilute HCl',
    T2: H2S + ' in acidic solution',
    T3: NH3 + '/' + NH4 + ' buffer and ' + H2S,
    T4: '(NH' + sub(4) + ')' + sub(2) + 'CO' + sub(3)
};

// ---- Panel content: following one cation ----------------------------------------
function ionInfo(nodeId, ion) {
    const groupRoman = ['', 'I', 'II', 'III', 'IV', 'V'][ion.group];
    if (nodeId === 'Start') {
        return {
            title: 'Tracing ' + ion.html,
            body: '<p>Suppose the unknown contains ' + ion.html + '. Press <b>Next</b> to follow it through the scheme and see where it leaves the solution.</p>' +
                '<p>The highlighted boxes show its path. It ends in <b>Group ' + groupRoman + '</b>.</p>'
        };
    }
    if (TESTS.indexOf(nodeId) !== -1) {
        const testNumber = Number(nodeId.charAt(1));
        const title = 'Step ' + testNumber + ': add ' + TEST_NAMES[nodeId];
        if (testNumber === ion.group) {
            return {
                title: title,
                body: '<p>' + ion.html + ' <b>precipitates here</b> as ' + ion.solid + ', a ' + ion.color + ' solid.</p>' +
                    eqn(ion.equation, 'result') +
                    '<p>The solid is filtered off, which removes ' + ion.html + ' from the mixture.</p>'
            };
        }
        return {
            title: title,
            body: '<p>' + ion.html + ' <b>does not precipitate</b>: ' + STAYS[nodeId] + '.</p>' +
                eqn(ion.html + ' stays in the filtrate and moves on.', 'stay')
        };
    }
    // the group box at the end of the path
    let body;
    if (ion.group === 5) {
        body = '<p>' + ion.html + ' passed through all four reagents without forming a solid, so it is still in the final solution.</p>';
        if (ion.flame) body += eqn('Flame test: ' + ion.flame, 'result');
        if (ion.equation) body += eqn(ion.equation, 'result');
        if (ion.extra) body += '<p>' + ion.extra + '</p>';
    } else {
        body = '<p>' + ion.html + ' is identified as a Group ' + groupRoman + ' cation. It was removed as ' + ion.solid + ' (' + ion.color + ').</p>';
        if (ion.flame) body += eqn('Flame test for confirmation: ' + ion.flame, 'result');
        if (ion.extra) body += '<p>' + ion.extra + '</p>';
    }
    return { title: 'Group ' + groupRoman + ': ' + ion.html + ' found', body: body };
}

function nodeInfo(nodeId) {
    return currentIon ? ionInfo(nodeId, currentIon) : generalInfo(nodeId);
}

// ---- Rendering ----------------------------------------------------------------
function showNode(nodeId) {
    const info = nodeInfo(nodeId);
    document.getElementById('info-display').innerHTML =
        '<div class="info-title">' + info.title + '</div>' +
        '<div class="info-content">' + info.body + '</div>';
}

// Mermaid v11 emits ids such as "mermaid-123-flowchart-T1-0"
function getNodeId(el) {
    return (el.id.match(/flowchart-(.+)-\d+$/) || [])[1];
}

function nodeElement(nodeId) {
    const nodes = document.querySelectorAll('.node');
    for (let i = 0; i < nodes.length; i++) {
        if (getNodeId(nodes[i]) === nodeId) return nodes[i];
    }
    return null;
}

// Is the edge from a to b part of the current path? In the flowchart each
// reagent and its group sit in a dashed "step" box (S1 to S4). The precipitate
// edge runs from the reagent to its group, and the filtrate edge runs from one
// step box to the next.
function edgeOnPath(a, b) {
    if (a === 'Start') return true;
    if (a.charAt(0) === 'T') return path.indexOf(b) !== -1;            // T1 to G1
    if (b.charAt(0) === 'S') return path.indexOf('T' + b.charAt(1)) !== -1;  // S1 to S2
    return path.indexOf(b) !== -1;                                      // S4 to G5
}

function render() {
    document.getElementById('stepCounter').textContent = 'Step ' + (currentStep + 1) + ' of ' + path.length;
    document.getElementById('prevBtn').disabled = currentStep === 0;
    document.getElementById('nextBtn').disabled = currentStep === path.length - 1;

    // Highlight the active node with a heavy black outline; when a cation is
    // being traced, fade everything that is not on its path. Mermaid writes the
    // classDef stroke as an inline "!important" style, so the highlight is set
    // inline as well; the original style is saved and restored.
    ALL_STEPS.forEach(function (id) {
        const el = nodeElement(id);
        if (!el) return;
        const shape = el.querySelector('rect, polygon, path');
        if (shape) {
            if (shape.dataset.baseStyle === undefined) {
                shape.dataset.baseStyle = shape.getAttribute('style') || '';
            }
            shape.setAttribute('style', shape.dataset.baseStyle);
            if (id === path[currentStep]) {
                shape.style.setProperty('stroke', 'black', 'important');
                shape.style.setProperty('stroke-width', '5px', 'important');
            }
        }
        el.classList.toggle('dimmed', currentIon !== null && path.indexOf(id) === -1);
    });

    // Fade edges (and their labels) that are off the path. Mermaid v11 gives
    // each edge path an id ending in "L_<source>_<target>_<n>" and emits one
    // g.edgeLabel per edge, in the same order as the edges.
    const edgeList = [];
    document.querySelectorAll('.flowchart-link').forEach(function (link) {
        const m = (link.id || '').match(/L_([A-Za-z0-9]+)_([A-Za-z0-9]+)_\d+$/);
        const pair = m ? [m[1], m[2]] : null;
        edgeList.push(pair);
        const dim = currentIon !== null && pair !== null && !edgeOnPath(pair[0], pair[1]);
        link.classList.toggle('dimmed', dim);
    });
    document.querySelectorAll('g.edgeLabel').forEach(function (label, i) {
        const pair = edgeList[i];
        if (!pair) return;
        label.classList.toggle('dimmed', currentIon !== null && !edgeOnPath(pair[0], pair[1]));
    });

    showNode(path[currentStep]);
}

function goToStep(i) {
    currentStep = Math.max(0, Math.min(path.length - 1, i));
    render();
}

function setupNodeInteractions() {
    document.querySelectorAll('.node').forEach(function (node) {
        const nodeId = getNodeId(node);
        if (ALL_STEPS.indexOf(nodeId) === -1) return;
        // Hover previews a box that is on the current path; leaving returns
        node.addEventListener('mouseenter', function () {
            if (path.indexOf(nodeId) !== -1) showNode(nodeId);
        });
        node.addEventListener('mouseleave', function () { showNode(path[currentStep]); });
        // Click (or tap) jumps to that box
        node.addEventListener('click', function () {
            const i = path.indexOf(nodeId);
            if (i !== -1) goToStep(i);
        });
    });
}

function setupControls() {
    const select = document.getElementById('ionSelect');
    const first = document.createElement('option');
    first.value = '';
    first.textContent = 'None (show every step)';
    select.appendChild(first);
    IONS.forEach(function (ion, i) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = ion.label;
        select.appendChild(opt);
    });
    select.addEventListener('change', function () {
        currentIon = select.value === '' ? null : IONS[Number(select.value)];
        path = pathFor(currentIon);
        currentStep = 0;
        render();
    });
    document.getElementById('prevBtn').addEventListener('click', function () { goToStep(currentStep - 1); });
    document.getElementById('nextBtn').addEventListener('click', function () { goToStep(currentStep + 1); });
}

// Robust polling: wait for Mermaid to finish rendering before wiring up the nodes
function waitForMermaid() {
    const mermaidDiv = document.querySelector('.mermaid');
    const svg = mermaidDiv ? mermaidDiv.querySelector('svg') : null;
    if (svg && document.querySelectorAll('.node').length > 0) {
        // keep the chart pinned to the top of its panel when it is scaled down
        svg.setAttribute('preserveAspectRatio', 'xMidYMin meet');
        setupNodeInteractions();
        render();
    } else {
        setTimeout(waitForMermaid, 100);
    }
}

function start() {
    setupControls();
    render();
    setTimeout(waitForMermaid, 100);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}
