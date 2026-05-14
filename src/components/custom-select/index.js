(function (global, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        global.SelectDinamico = factory();
    }
}(typeof window !== 'undefined' ? window : this, function () {
    "use strict";

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
        wrapper.className = 'multiselect-container';

        const box = document.createElement('div');
        box.className = 'multiselect-box';

        const tagsContainer = document.createElement('div');
        tagsContainer.id = 'selectedTags';
        tagsContainer.className = 'tags-container';
        box.appendChild(tagsContainer);

        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'searchInput';
        input.placeholder = placeholder;
        input.autocomplete = 'off';
        box.appendChild(input);

        wrapper.appendChild(box);

        const list = document.createElement('ul');
        list.id = 'suggestionsList';
        list.className = 'suggestions-list hidden';
        wrapper.appendChild(list);

        container.appendChild(wrapper);

        box.addEventListener('click', () => input.focus());

        input.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();

            wrapper.classList.add('is-typing');
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
                wrapper.classList.remove('is-typing');
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
                li.className = 'suggestion-item';
                li.textContent = 'Sin resultados...';
                li.style.opacity = '0.5';
                list.appendChild(li);
            } else {
                items.forEach(item => {
                    const li = document.createElement('li');
                    li.className = 'suggestion-item';
                    if (selected.has(item)) li.classList.add('selected-in-list');

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
                tag.className = 'tag';
                tag.innerHTML = `${item} <span class="tag-close">&times;</span>`;

                tag.querySelector('.tag-close').onclick = (e) => {
                    e.stopPropagation();
                    toggleItem(item);
                };
                tagsContainer.appendChild(tag);
            });
        }

        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) {
                list.classList.add('hidden');
            }
        });

        return {
            element: wrapper,
            getSelected: () => [...selected],
            addItem: (item) => { selected.add(item); renderTags(); },
            removeItem: (item) => { selected.delete(item); renderTags(); },
            clear: () => { selected.clear(); renderTags(); },
            setData: (newData) => { data.length = 0; data.push(...newData); }
        };
    }

    return SelectDinamico;
}));
