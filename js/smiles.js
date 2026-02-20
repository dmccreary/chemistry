// smiles.js — renders all <canvas data-smiles="..."> elements on the page
// Requires SmilesDrawer to be loaded first via CDN in mkdocs.yml extra_javascript

(function () {
    function renderSmiles() {
        if (typeof SmilesDrawer === 'undefined') {
            console.warn('SmilesDrawer library not loaded — skipping SMILES rendering.');
            return;
        }

        var canvasList = document.querySelectorAll('canvas[data-smiles]');
        if (canvasList.length === 0) return;

        SmilesDrawer.apply(
            { width: 250, height: 250 },
            'canvas[data-smiles]',
            'light',
            function (err) { console.error('SMILES error:', err); }
        );

        console.log('SmilesDrawer: processed ' + canvasList.length + ' molecule(s).');
    }

    // MkDocs Material loads extra_javascript with defer, so DOMContentLoaded
    // may have already fired. Handle both cases.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderSmiles);
    } else {
        renderSmiles();
    }
})();