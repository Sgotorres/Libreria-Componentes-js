class CustomSelect extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Estado interno
        this._opciones = [];
        this._seleccionados = [];
        this._isOpen = false;
        this._searchTerm = '';
    }

    // Leemos las reglas de la rúbrica del profesor
    static get observedAttributes() { 
        return ['ancho', 'enable-search', 'multiple', 'placeholder']; 
    }

    connectedCallback() {
        this.render();
        // Cierra el menú al hacer clic fuera del componente
        this._outsideClickHandler = this._handleOutsideClick.bind(this);
        document.addEventListener('click', this._outsideClickHandler);
    }

    disconnectedCallback() { 
        document.removeEventListener('click', this._outsideClickHandler); 
    }
    
    attributeChangedCallback() { 
        this.render(); 
    }

    // API Pública para inyectar datos
    set opciones(val) { 
        this._opciones = Array.isArray(val) ? val : []; 
        this.render(); 
    }
    get seleccionados() { return this._seleccionados; }

    _handleOutsideClick(e) {
        if (!e.composedPath().includes(this) && this._isOpen) {
            this._isOpen = false;
            this.render();
        }
    }

    _toggleMenu() {
        this._isOpen = !this._isOpen;
        this.render();
        
        // Foco automático en el buscador si está activado
        if (this._isOpen && this.getAttribute('enable-search') === 'true') {
            setTimeout(() => { 
                const searchBox = this.shadowRoot.querySelector('.search-box'); 
                if (searchBox) searchBox.focus(); 
            }, 50);
        }
    }

    _handleSelect(item) {
        const isMultiple = this.getAttribute('multiple') === 'true';
        
        if (isMultiple) {
            if (this._seleccionados.includes(item)) {
                this._seleccionados = this._seleccionados.filter(i => i !== item);
            } else {
                this._seleccionados.push(item);
            }
        } else {
            this._seleccionados = [item];
            this._isOpen = false;
        }
        this.render();
        
        this.dispatchEvent(new CustomEvent('cambio-seleccion', { 
            detail: this._seleccionados, 
            bubbles: true, composed: true 
        }));
    }

    _removeTag(e, item) {
        e.stopPropagation(); // Evita que se abra el menú al cerrar una etiqueta
        this._seleccionados = this._seleccionados.filter(i => i !== item);
        this.render();
    }

    // Función que filtra SIN re-renderizar todo el componente (evita el bug de escritura)
    _updateOptionsList() {
        const list = this.shadowRoot.querySelector('.options-list');
        if (!list) return;
        
        const filtered = this._opciones.filter(opt => opt.toLowerCase().includes(this._searchTerm));
        
        if (filtered.length > 0) {
            list.innerHTML = filtered.map(opt => `
                <div class="option-item ${this._seleccionados.includes(opt) ? 'selected' : ''}" data-value="${opt}">
                    <span>${opt}</span><span class="check-icon">✓</span>
                </div>
            `).join('');
        } else {
            list.innerHTML = `<div class="empty-msg">No se encontraron productos</div>`;
        }

        // Reasignamos eventos a la nueva lista filtrada
        list.querySelectorAll('.option-item').forEach(item => {
            item.addEventListener('click', (e) => { 
                e.stopPropagation(); 
                this._handleSelect(item.dataset.value); 
            });
        });
    }

    _attachEvents() {
        const trigger = this.shadowRoot.querySelector('.select-trigger');
        if (trigger) trigger.addEventListener('click', () => this._toggleMenu());

        const search = this.shadowRoot.querySelector('.search-box');
        if (search) {
            search.addEventListener('input', (e) => {
                this._searchTerm = e.target.value.toLowerCase();
                this._updateOptionsList();
            });
            // Evita cerrar el menú al hacer clic dentro de la barra de búsqueda
            search.addEventListener('click', (e) => e.stopPropagation());
        }

        this.shadowRoot.querySelectorAll('.tag-close').forEach(btn => {
            btn.addEventListener('click', (e) => this._removeTag(e, btn.dataset.value));
        });

        this.shadowRoot.querySelectorAll('.option-item').forEach(item => {
            item.addEventListener('click', (e) => { 
                e.stopPropagation(); 
                this._handleSelect(item.dataset.value); 
            });
        });
    }

    render() {
        const ancho = this.getAttribute('ancho') || '100%';
        const enableSearch = this.getAttribute('enable-search') === 'true';
        const isMultiple = this.getAttribute('multiple') === 'true';
        const placeholder = this.getAttribute('placeholder') || 'Seleccione...';

        // Lógica visual para la barra de trigger (Botón principal)
        let triggerContent = `<span class="placeholder">${placeholder}</span>`;
        if (this._seleccionados.length > 0) {
            if (isMultiple) {
                triggerContent = `<div class="tags-wrapper">` + 
                    this._seleccionados.map(s => `
                        <span class="tag">
                            ${s} <span class="tag-close" data-value="${s}">×</span>
                        </span>
                    `).join('') + `</div>`;
            } else {
                triggerContent = `<span class="selected-text">${this._seleccionados[0]}</span>`;
            }
        }

        const initialFiltered = this._opciones.filter(opt => opt.toLowerCase().includes(this._searchTerm));

        this.shadowRoot.innerHTML = `
            <style>:host { width: ${ancho}; }</style>
            <link rel="stylesheet" href="./style.css">
            
            <div class="select-trigger ${this._isOpen ? 'active' : ''}">
                ${triggerContent}
            </div>
            
            <div class="dropdown-menu ${this._isOpen ? 'open' : ''}">
                ${enableSearch ? `<input type="text" class="search-box" placeholder="Buscar productos..." value="${this._searchTerm}">` : ''}
                
                <div class="options-list">
                    ${initialFiltered.map(opt => `
                        <div class="option-item ${this._seleccionados.includes(opt) ? 'selected' : ''}" data-value="${opt}">
                            <span>${opt}</span><span class="check-icon">✓</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this._attachEvents();
    }
}
customElements.define('custom-select', CustomSelect);
export default CustomSelect;