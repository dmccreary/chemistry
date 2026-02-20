// Scientific Method Diagram Interactivity

// Node information with descriptions and physics examples
const nodeInfo = {
    'Start': {
        title: 'Observe Phenomenon or Ask Question',
        description: 'Science begins with curiosity. Scientists observe the natural world and ask questions about what they see. Good questions are specific and testable.',
        example: 'A student notices that a ball rolls farther on a smooth floor than on carpet and asks: "How does surface texture affect the distance a ball rolls?"'
    },
    'Research': {
        title: 'Background Research',
        description: 'Before designing an experiment, scientists review existing knowledge. This includes reading scientific papers, textbooks, and consulting experts to understand what is already known.',
        example: 'The student researches friction, kinetic energy, and discovers that rougher surfaces create more friction, which converts kinetic energy to heat.'
    },
    'Hypothesis': {
        title: 'Formulate Hypothesis',
        description: 'A hypothesis is a testable prediction based on observations and research. It should be specific and include both the independent and dependent variables.',
        example: '"If the surface is smoother, then the ball will roll farther because there is less friction to slow it down."'
    },
    'Design': {
        title: 'Design Experiment',
        description: 'Plan a controlled experiment that tests only one variable at a time. Identify controls, variables, materials needed, and the procedure to follow.',
        example: 'Design: Roll a steel ball from a 30cm ramp onto 5 different surfaces. Measure distance traveled. Use same ball, same ramp height, 3 trials each surface.'
    },
    'Conduct': {
        title: 'Conduct Experiment & Collect Data',
        description: 'Carefully follow the experimental procedure and record all observations and measurements. Use appropriate tools and units. Repeat trials for reliability.',
        example: 'Results recorded: Glass (2.4m), Tile (1.8m), Wood (1.2m), Carpet (0.5m), Sandpaper (0.3m). Each measurement averaged from 3 trials.'
    },
    'Analyze': {
        title: 'Analyze Data',
        description: 'Organize data into tables and graphs. Look for patterns and relationships. Calculate averages, percentages, or other statistics. Identify any anomalies.',
        example: 'Create a bar graph of distance vs. surface type. Calculate that glass allows 8x more distance than sandpaper. Note the inverse relationship between surface roughness and distance.'
    },
    'Decision1': {
        title: 'Does Data Support Hypothesis?',
        description: 'Compare your results to your prediction. Did the data show what you expected? Consider whether your evidence is strong enough to draw conclusions.',
        example: 'The data shows smoother surfaces (glass, tile) allowed greater distances than rough surfaces (carpet, sandpaper). This supports the hypothesis about friction.'
    },
    'Accept': {
        title: 'Accept Hypothesis',
        description: 'If the data consistently supports the hypothesis across multiple trials, the hypothesis is accepted. This doesn\'t mean it\'s proven—just supported by evidence.',
        example: 'Conclusion: The hypothesis is supported. Smoother surfaces reduce friction, allowing the ball to travel farther while retaining more kinetic energy.'
    },
    'Revise': {
        title: 'Revise or Reject Hypothesis',
        description: 'If the data doesn\'t support the hypothesis, this is not failure—it\'s valuable information! Analyze why and form a new, refined hypothesis.',
        example: 'If results were unexpected (e.g., tile performed worse than wood), revise: "Perhaps surface hardness, not just smoothness, affects rolling distance."'
    },
    'Communicate': {
        title: 'Communicate Results',
        description: 'Share findings through lab reports, presentations, or publications. Include methods, data, analysis, and conclusions so others can evaluate and replicate the work.',
        example: 'Write a lab report with: Introduction, Hypothesis, Materials, Procedure, Data Tables, Graphs, Analysis, Conclusion. Present findings to the class.'
    },
    'Decision2': {
        title: 'New Questions Raised?',
        description: 'Good science leads to more questions. Each experiment reveals new aspects to explore. The scientific method is cyclical and ongoing.',
        example: 'New questions emerge: "Does ball mass affect the results?" "What about inclined surfaces?" "How does humidity affect friction?" The cycle continues!'
    },
    'End': {
        title: 'End (Temporary)',
        description: 'A particular investigation may end, but scientific inquiry never truly stops. Today\'s conclusions become tomorrow\'s starting points for new discoveries.',
        example: 'The friction experiment is complete, but the student is now curious about air resistance and plans a new experiment with different shaped objects.'
    }
};

// Default info to show
const defaultInfo = {
    title: 'Scientific Method',
    description: 'Hover over any step in the diagram to learn more about it and see a physics example.',
    example: '<strong>Tip:</strong> Click on any node to keep its information displayed.'
};

let lockedNode = null;

// Initialize Mermaid
mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    flowchart: {
        useMaxWidth: false,
        htmlLabels: true,
        curve: 'basis'
    }
});

// Update infobox content
function updateInfobox(info) {
    document.getElementById('infoTitle').textContent = info.title;
    document.getElementById('infoDescription').textContent = info.description;

    const exampleBox = document.getElementById('infoExample');
    if (info.example.startsWith('<')) {
        exampleBox.innerHTML = info.example;
    } else {
        exampleBox.innerHTML = `<strong>Physics Example:</strong><p>${info.example}</p>`;
    }
}

// Track current mouse Y position relative to container
let lastMouseY = 0;

// Move infobox to align with node or mouse position
function moveInfoboxToNode(node) {
    const infobox = document.getElementById('infobox');
    const container = document.querySelector('.main-content');
    const containerRect = container.getBoundingClientRect();
    const infoboxHeight = infobox.offsetHeight;

    // Maximum allowed top position to keep infobox visible
    const maxAllowedTop = Math.max(0, containerRect.height - infoboxHeight - 20);

    let offset;

    if (!node) {
        // Use last mouse position when no node is selected
        offset = lastMouseY - 20;
    } else {
        const nodeRect = node.getBoundingClientRect();
        // Calculate offset from top of container
        offset = nodeRect.top - containerRect.top;

        // Check if this is the End node - limit its position
        const nodeText = node.textContent.trim();
        if (nodeText.includes('End')) {
            offset = offset - 100;
        }
    }

    // Keep infobox within reasonable bounds (not below 0, not beyond container)
    let finalOffset = Math.max(0, offset - 20);
    finalOffset = Math.min(finalOffset, maxAllowedTop);

    infobox.style.top = finalOffset + 'px';
}

// Track mouse movement over the diagram and update infobox when no node selected
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.main-content');
    container.addEventListener('mousemove', (e) => {
        const containerRect = container.getBoundingClientRect();
        lastMouseY = e.clientY - containerRect.top;

        // If no node is locked and mouse is not over a node, update infobox position
        if (!lockedNode) {
            // Check if mouse is over a mermaid node
            const hoveredNode = e.target.closest('.mermaid .node');
            if (!hoveredNode) {
                moveInfoboxToNode(null);
            }
        }
    });
});

// Get node key from node element
function getNodeKey(node) {
    const text = node.textContent.trim();

    // Match node text to keys
    if (text.includes('Observe') || text.includes('Ask Question')) return 'Start';
    if (text.includes('Background Research')) return 'Research';
    if (text.includes('Formulate Hypothesis')) return 'Hypothesis';
    if (text.includes('Design Experiment')) return 'Design';
    if (text.includes('Conduct Experiment') || text.includes('Collect Data')) return 'Conduct';
    if (text.includes('Analyze Data')) return 'Analyze';
    if (text.includes('Support') && text.includes('Hypothesis')) return 'Decision1';
    if (text.includes('Accept Hypothesis')) return 'Accept';
    if (text.includes('Revise') || text.includes('Reject')) return 'Revise';
    if (text.includes('Communicate')) return 'Communicate';
    if (text.includes('New Questions')) return 'Decision2';
    if (text.includes('End')) return 'End';

    return null;
}

// Remove highlight from all nodes
function clearHighlights() {
    document.querySelectorAll('.mermaid .node').forEach(n => {
        n.classList.remove('highlighted');
    });
}

// Node interaction
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const nodes = document.querySelectorAll('.mermaid .node');

        nodes.forEach((node) => {
            node.style.cursor = 'pointer';

            // Hover events
            node.addEventListener('mouseenter', () => {
                if (lockedNode) return; // Don't update if a node is locked

                const key = getNodeKey(node);
                if (key && nodeInfo[key]) {
                    updateInfobox(nodeInfo[key]);
                    moveInfoboxToNode(node);
                }
            });

            node.addEventListener('mouseleave', () => {
                if (lockedNode) return; // Don't reset if a node is locked
                updateInfobox(defaultInfo);
                moveInfoboxToNode(null);
            });

            // Click to lock/unlock
            node.addEventListener('click', () => {
                const key = getNodeKey(node);

                if (lockedNode === node) {
                    // Unlock if clicking the same node
                    lockedNode = null;
                    clearHighlights();
                    updateInfobox(defaultInfo);
                    moveInfoboxToNode(null);
                } else {
                    // Lock to this node
                    lockedNode = node;
                    clearHighlights();
                    node.classList.add('highlighted');

                    if (key && nodeInfo[key]) {
                        updateInfobox(nodeInfo[key]);
                        moveInfoboxToNode(node);
                    }
                }
            });
        });
    }, 1000); // Wait for Mermaid to render
});

// Click outside to unlock
document.addEventListener('click', (e) => {
    if (lockedNode && !e.target.closest('.mermaid .node')) {
        lockedNode = null;
        clearHighlights();
        updateInfobox(defaultInfo);
        moveInfoboxToNode(null);
    }
});
