class CustomSelect extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._opciones = [];
        this._seleccionados = [];
        this._isOpen = false;
        this._searchTerm = '';
    }

    static get observedAttributes() { return ['ancho', 'enable-search', 'multiple', 'placeholder']; }
    connectedCallback() {
        this.render();
        this._outsideClickHandler = (e) => {
            if (!e.composedPath().includes(this) && this._isOpen) {
                this._isOpen = false;
                this.render();
            }
        };
        document.addEventListener('click', this._outsideClickHandler);
    }
    disconnectedCallback() {
        if (this._outsideClickHandler) document.removeEventListener('click', this._outsideClickHandler);
    }
    attributeChangedCallback() { this.render(); }

    set opciones(val) { this._opciones = Array.isArray(val) ? val : []; this.render(); }
    get seleccionados() { return this._seleccionados; }

    _toggleMenu() {
        this._isOpen = !this._isOpen;
        this.render();
        if (this._isOpen && this.getAttribute('enable-search') === 'true') {
            setTimeout(() => { const sb = this.shadowRoot.querySelector('.search-box'); if (sb) sb.focus(); }, 50);
        }
    }

    _handleSelect(item) {
        const isMultiple = this.getAttribute('multiple') === 'true';
        if (isMultiple) {
            if (this._seleccionados.includes(item)) this._seleccionados = this._seleccionados.filter(i => i !== item);
            else this._seleccionados.push(item);
        } else {
            this._seleccionados = [item];
            this._isOpen = false;
        }
        this.render();
        this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }));
    }

    _removeTag(e, item) {
        e.stopPropagation();
        this._seleccionados = this._seleccionados.filter(i => i !== item);
        this.render();
    }

    _updateOptionsList() {
        const list = this.shadowRoot.querySelector('.options-list');
        if (!list) return;
        const filtered = this._opciones.filter(opt => opt.toLowerCase().includes(this._searchTerm));
        if (filtered.length > 0) {
            list.innerHTML = filtered.map(opt =>
                `<div class="option-item ${this._seleccionados.includes(opt) ? 'selected' : ''}" data-value="${opt}"><span>${opt}</span><span class="check-icon">✓</span></div>`
            ).join('');
        } else {
            list.innerHTML = '<div class="empty-msg">No se encontraron resultados</div>';
        }
        list.querySelectorAll('.option-item').forEach(item => {
            item.addEventListener('click', (e) => { e.stopPropagation(); this._handleSelect(item.dataset.value); });
        });
    }

    render() {
        const ancho = this.getAttribute('ancho') || '100%';
        const enableSearch = this.getAttribute('enable-search') === 'true';
        const isMultiple = this.getAttribute('multiple') === 'true';
        const placeholder = this.getAttribute('placeholder') || 'Seleccione...';

        let triggerContent = `<span class="placeholder">${placeholder}</span>`;
        if (this._seleccionados.length > 0) {
            if (isMultiple) {
                triggerContent = '<div class="tags-wrapper">' + this._seleccionados.map(s =>
                    `<span class="tag">${s} <span class="tag-close" data-value="${s}">×</span></span>`
                ).join('') + '</div>';
            } else {
                triggerContent = `<span class="selected-text">${this._seleccionados[0]}</span>`;
            }
        }

        const filtered = this._opciones.filter(opt => opt.toLowerCase().includes(this._searchTerm));

        this.shadowRoot.innerHTML = `
            <style>:host{display:block;width:${ancho};font-family:system-ui,sans-serif;position:relative}
.select-trigger{min-height:44px;padding:8px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:8px;cursor:pointer;display:flex;align-items:center;transition:0.3s;backdrop-filter:blur(10px)}
.select-trigger.active{border-color:#3ee7b8}
.placeholder{color:#94a3b8;font-size:14px}
.selected-text{color:#f8fafc;font-size:14px}
.tags-wrapper{display:flex;flex-wrap:wrap;gap:6px}
.tag{background:rgba(62,231,184,0.15);border:1px solid rgba(62,231,184,0.3);color:#3ee7b8;padding:4px 8px;border-radius:6px;font-size:12px;display:flex;align-items:center;gap:6px}
.tag-close{cursor:pointer;color:#3ee7b8;transition:0.2s}.tag-close:hover{color:#fff}
.dropdown-menu{position:absolute;top:calc(100% + 8px);left:0;width:100%;background:rgba(15,23,42,0.95);border:1px solid rgba(255,255,255,0.1);border-radius:12px;backdrop-filter:blur(20px);z-index:1000;display:${this._isOpen?'flex':'none'};flex-direction:column;max-height:250px;overflow:hidden}
.search-box{margin:12px;padding:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;outline:none;font-size:14px}
.search-box:focus{border-color:#3ee7b8}
.options-list{overflow-y:auto;padding:0 8px 12px 8px}
.option-item{padding:10px;border-radius:8px;color:#e2e8f0;font-size:14px;cursor:pointer;display:flex;justify-content:space-between}
.option-item:hover{background:rgba(255,255,255,0.05);color:#3ee7b8}
.option-item.selected{background:rgba(62,231,184,0.1);color:#3ee7b8}
.check-icon{display:none}.option-item.selected .check-icon{display:block}
.empty-msg{padding:10px;color:#94a3b8;font-size:13px;text-align:center}
</style>
            <div class="select-trigger ${this._isOpen ? 'active' : ''}">${triggerContent}</div>
            <div class="dropdown-menu">
                ${enableSearch ? `<input type="text" class="search-box" placeholder="Buscar..." value="${this._searchTerm}">` : ''}
                <div class="options-list">
                    ${filtered.map(opt =>
                        `<div class="option-item ${this._seleccionados.includes(opt) ? 'selected' : ''}" data-value="${opt}"><span>${opt}</span><span class="check-icon">✓</span></div>`
                    ).join('')}
                </div>
            </div>
        `;

        const trigger = this.shadowRoot.querySelector('.select-trigger');
        if (trigger) trigger.addEventListener('click', () => this._toggleMenu());

        const search = this.shadowRoot.querySelector('.search-box');
        if (search) {
            search.addEventListener('input', (e) => {
                this._searchTerm = e.target.value.toLowerCase();
                this._updateOptionsList();
            });
            search.addEventListener('click', (e) => e.stopPropagation());
        }

        this.shadowRoot.querySelectorAll('.tag-close').forEach(btn => {
            btn.addEventListener('click', (e) => this._removeTag(e, btn.dataset.value));
        });

        this.shadowRoot.querySelectorAll('.option-item').forEach(item => {
            item.addEventListener('click', (e) => { e.stopPropagation(); this._handleSelect(item.dataset.value); });
        });
    }
}
customElements.define('custom-select', CustomSelect);

if (document.body.children.length === 0) {
    const style = document.createElement('style');
    style.textContent = 'body{background:linear-gradient(135deg,#0f172a,#1e293b);display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;color:#fff;font-family:system-ui,sans-serif}.wrapper{width:400px;display:flex;flex-direction:column;gap:15px;padding:20px}h2{color:#3ee7b8;text-align:center;font-size:18px}.cfg{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:15px;display:flex;justify-content:space-between;font-size:14px;backdrop-filter:blur(10px)}.cfg label{display:flex;align-items:center;gap:8px;cursor:pointer;color:#cbd5e1}';
    document.head.appendChild(style);

    const data = [
        { category: 'Laptops', products: ['HP Pavilion', 'Asus VivoBook', 'MacBook Air M2', 'Lenovo IdeaPad 3', 'Dell Inspiron 15'] },
        { category: 'Periféricos', products: ['Teclado Redragon', 'Mouse Logitech G305', 'Monitor 24 pulgadas'] },
        { category: 'Almacenamiento', products: ['SSD NVMe 1TB', 'Pendrive Kingston 64GB'] },
    ];

    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    wrapper.innerHTML = '<h2>Select Din&aacute;mico</h2>'
        + '<div class="cfg"><label><input type="checkbox" id="t-search" checked> B&uacute;squeda</label><label><input type="checkbox" id="t-multi" checked> M&uacute;ltiple</label></div>'
        + '<custom-select id="cs-demo" enable-search="true" multiple="true" placeholder="Seleccione productos..."></custom-select>';
    document.body.appendChild(wrapper);

    const select = document.getElementById('cs-demo');
    const allProducts = data.flatMap(g => g.products);
    select.opciones = allProducts;

    document.getElementById('t-search').addEventListener('change', (e) => select.setAttribute('enable-search', e.target.checked));
    document.getElementById('t-multi').addEventListener('change', (e) => select.setAttribute('multiple', e.target.checked));
}

export default CustomSelect;