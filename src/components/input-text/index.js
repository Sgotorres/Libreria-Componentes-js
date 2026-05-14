(function (global, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        global.InputText = factory();
    }
}(typeof window !== 'undefined' ? window : this, function () {
    "use strict";

function InputText(container, options = {}) {
    const {
        label = 'Etiqueta',
        placeholder = 'Escribe algo...',
        tags = []
    } = options;

    const wrapper = document.createElement('div');
    wrapper.className = 'input-text-wrapper';

    const labelEl = document.createElement('label');
    labelEl.textContent = label;
    wrapper.appendChild(labelEl);

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholder;
    wrapper.appendChild(input);

    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'input-text-tags';
    wrapper.appendChild(tagsContainer);

    let currentTags = [...tags];

    function renderTags() {
        tagsContainer.innerHTML = '';
        currentTags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.className = 'input-text-tag';
            tagEl.innerHTML = `${tag} <span class="input-text-tag-close">&times;</span>`;
            tagEl.querySelector('.input-text-tag-close').onclick = () => {
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

    return InputText;
}));
