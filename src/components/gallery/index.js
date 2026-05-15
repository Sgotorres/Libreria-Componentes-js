/**
 * @param {HTMLElement} container
 * @param {Object} [options]
 * @param {string} [options.title='Componentes']
 * @param {Array<{ name: string, icon: string, color: string, desc: string, badge: string, preview?: string, source?: string, renderPreview?: (container: HTMLElement) => void }>} [options.components]
 * @returns {{ element: HTMLElement, filter: (term: string) => void, open: (name: string) => void, destroy: () => void }}
 */
function Gallery(container, options = {}) {
    const {
        title = 'Componentes',
        components = []
    } = options;

    const cards = [];

    const titleEl = document.createElement('div');
    titleEl.className = 'gl__title';
    titleEl.textContent = title;
    container.appendChild(titleEl);

    const grid = document.createElement('div');
    grid.className = 'gl';
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
            card.className = 'gl__card';
            card.dataset.name = data.name;
            card.innerHTML = `
                <div class="gl__card-header">
                    <div class="gl__card-icon" style="background:${data.color}33;color:${data.color}">${data.icon}</div>
                    <span class="gl__card-name">${data.name}</span>
                </div>
                <p class="gl__card-desc">${data.desc}</p>
                <span class="gl__card-badge">${data.badge}</span>
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

(function (global, factory) {
    try {
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = factory();
            return;
        }
    } catch {}
    global.Gallery = factory();
}(typeof window !== 'undefined' ? window : this, function () {
    return Gallery;
}));

export default Gallery;
