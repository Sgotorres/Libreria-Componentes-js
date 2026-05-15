/**
 * @param {HTMLElement} container
 * @param {Object} [options]
 * @param {string[]} [options.data]
 * @param {string} [options.placeholder='Buscar...']
 * @param {(item: string) => void} [options.onSelect]
 * @param {(term: string) => void} [options.onSearch]
 * @param {(item: string) => void} [options.onTagRemove]
 * @returns {{ element: HTMLElement, getSelected: () => string[], addItem: (item: string) => void, removeItem: (item: string) => void, clear: () => void, setData: (data: string[]) => void, destroy: () => void }}
 */
function SelectDinamico(container, options = {}) {
    const {
        data = [],
        placeholder = 'Buscar...',
        onSelect = null,
        onSearch = null,
        onTagRemove = null
    } = options;

    const selected = new Set();
    let typingTimer;

    const wrapper = document.createElement('div');
    wrapper.className = 'sd';

    const box = document.createElement('div');
    box.className = 'sd__box';

    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'sd__tags';
    box.appendChild(tagsContainer);

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'sd__input';
    input.placeholder = placeholder;
    input.autocomplete = 'off';
    box.appendChild(input);

    wrapper.appendChild(box);

    const list = document.createElement('ul');
    list.className = 'sd__suggestions hidden';
    wrapper.appendChild(list);

    container.appendChild(wrapper);

    box.addEventListener('click', () => input.focus());

    input.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();

        wrapper.classList.add('sd--typing');
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            wrapper.classList.remove('sd--typing');
        }, 150);

        if (onSearch) onSearch(term);

        if (term === "") {
            list.classList.add('hidden');
            return;
        }

        const filtered = data.filter(item =>
            item.toLowerCase().includes(term)
        );
        renderSuggestions(filtered);
    });

    function renderSuggestions(items) {
        list.innerHTML = '';

        if (items.length === 0) {
            const li = document.createElement('li');
            li.className = 'sd__suggestion';
            li.textContent = 'Sin resultados...';
            li.style.opacity = '0.5';
            list.appendChild(li);
        } else {
            items.forEach(item => {
                const li = document.createElement('li');
                li.className = 'sd__suggestion';
                if (selected.has(item)) li.classList.add('sd__suggestion--selected');

                li.textContent = item;
                li.addEventListener('click', () => {
                    toggleItem(item);
                    input.value = '';
                    list.classList.add('hidden');
                    if (onSearch) onSearch('');
                    input.focus();
                });
                list.appendChild(li);
            });
        }
        list.classList.remove('hidden');
    }

    function toggleItem(item) {
        if (selected.has(item)) {
            selected.delete(item);
            if (onTagRemove) onTagRemove(item);
        } else {
            selected.add(item);
            if (onSelect) onSelect(item);
        }
        renderTags();
    }

    function renderTags() {
        tagsContainer.innerHTML = '';
        selected.forEach(item => {
            const tag = document.createElement('div');
            tag.className = 'sd__tag';
            tag.innerHTML = `${item} <span class="sd__tag-close">&times;</span>`;

            tag.querySelector('.sd__tag-close').onclick = (e) => {
                e.stopPropagation();
                toggleItem(item);
            };
            tagsContainer.appendChild(tag);
        });
    }

    const closeOnOutsideClick = (e) => {
        if (!wrapper.contains(e.target)) {
            list.classList.add('hidden');
        }
    };
    document.addEventListener('click', closeOnOutsideClick);

    return {
        element: wrapper,
        getSelected: () => [...selected],
        addItem: (item) => { selected.add(item); renderTags(); },
        removeItem: (item) => { selected.delete(item); renderTags(); },
        clear: () => { selected.clear(); renderTags(); },
        setData: (newData) => { data.length = 0; data.push(...newData); },
        destroy() {
            document.removeEventListener('click', closeOnOutsideClick);
            clearTimeout(typingTimer);
            if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
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
    global.SelectDinamico = factory();
}(typeof window !== 'undefined' ? window : this, function () {
    return SelectDinamico;
}));

export default SelectDinamico;
