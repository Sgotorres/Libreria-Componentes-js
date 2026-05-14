(function (global, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        global.Gallery = factory();
    }
}(typeof window !== 'undefined' ? window : this, function () {
    "use strict";

    function Gallery(container, options = {}) {
        const {
            title = 'Componentes',
            components = []
        } = options;

        const cards = [];

        const titleEl = document.createElement('div');
        titleEl.className = 'gallery-title';
        titleEl.textContent = title;
        container.appendChild(titleEl);

        const grid = document.createElement('div');
        grid.className = 'gallery';
        container.appendChild(grid);

        const modal = Modal();

        async function openModal(name) {
            const data = components.find(c => c.name === name);
            if (!data) return;
            modal.open({
                title: name,
                preview: data.preview,
                code: data.code,
                source: data.source,
                renderPreview: data.renderPreview
            });
        }

        function renderCards(items) {
            grid.innerHTML = '';
            cards.length = 0;
            items.forEach(data => {
                const card = document.createElement('div');
                card.className = 'component-card';
                card.dataset.name = data.name;
                card.innerHTML = `
                    <div class="component-card-header">
                        <div class="component-card-icon" style="background:${data.color}33;color:${data.color}">${data.icon}</div>
                        <span class="component-card-name">${data.name}</span>
                    </div>
                    <p class="component-card-desc">${data.desc}</p>
                    <span class="component-card-badge">${data.badge}</span>
                `;
                card.addEventListener('click', () => openModal(data.name));
                grid.appendChild(card);
                cards.push(card);
            });
        }

        renderCards(components);

        return {
            element: container,
            filter(term) {
                const t = term.toLowerCase().trim();
                cards.forEach(card => {
                    const name = card.dataset.name.toLowerCase();
                    card.style.display = (!t || name.includes(t)) ? '' : 'none';
                });
            },
            open(name) {
                openModal(name);
            },
            destroy() {
                modal.destroy();
                container.innerHTML = '';
            }
        };
    }

    return Gallery;
}));
