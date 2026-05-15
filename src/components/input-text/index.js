/**
 * @param {HTMLElement} container
 * @param {Object} [options]
 * @param {string} [options.label='Etiqueta']
 * @param {string} [options.placeholder='Escribe algo...']
 * @param {string[]} [options.tags]
 * @param {(tag: string) => void} [options.onTagAdd]
 * @param {(tag: string) => void} [options.onTagRemove]
 * @returns {{ element: HTMLElement, getTags: () => string[], addTag: (tag: string) => void, removeTag: (tag: string) => void, clearTags: () => void }}
 */
function InputText(container, options = {}) {
    const {
        label = 'Etiqueta',
        placeholder = 'Escribe algo...',
        tags = []
    } = options;

    const wrapper = document.createElement('div');
    wrapper.className = 'it';

    const labelEl = document.createElement('label');
    labelEl.textContent = label;
    wrapper.appendChild(labelEl);

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholder;
    wrapper.appendChild(input);

    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'it__tags';
    wrapper.appendChild(tagsContainer);

    let currentTags = [...tags];

    function renderTags() {
        tagsContainer.innerHTML = '';
        currentTags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.className = 'it__tag';
            tagEl.innerHTML = `${tag} <span class="it__tag-close">&times;</span>`;
            tagEl.querySelector('.it__tag-close').onclick = () => {
                currentTags = currentTags.filter(t => t !== tag);
                renderTags();
                if (options.onTagRemove) options.onTagRemove(tag);
            };
            tagsContainer.appendChild(tagEl);
        });
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
            e.preventDefault();
            currentTags.push(input.value.trim());
            input.value = '';
            renderTags();
            if (options.onTagAdd) options.onTagAdd(currentTags[currentTags.length - 1]);
        }
    });

    renderTags();
    container.appendChild(wrapper);

    return {
        element: wrapper,
        getTags: () => [...currentTags],
        addTag: (tag) => { currentTags.push(tag); renderTags(); },
        removeTag: (tag) => { currentTags = currentTags.filter(t => t !== tag); renderTags(); },
        clearTags: () => { currentTags = []; renderTags(); }
    };
}

(function (global, factory) {
    try {
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = factory();
            return;
        }
    } catch {}
    global.InputText = factory();
}(typeof window !== 'undefined' ? window : this, function () {
    return InputText;
}));

export default InputText;


