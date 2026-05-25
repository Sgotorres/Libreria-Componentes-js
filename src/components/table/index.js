class CustomTable extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Estado interno
        this._data = [];
        this._columns = [];
        this._currentPage = 1;
        this._pageSize = 10;
        this._searchTerm = '';
        this._sortKey = null;
        this._sortDir = null; // 'asc', 'desc', o null
    }

    // Atributos de dimensiones y paginación por defecto
    static get observedAttributes() { 
        return ['ancho', 'largo', 'page-size']; 
    }

    connectedCallback() {
        this._pageSize = parseInt(this.getAttribute('page-size')) || 10;
        this.render();
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal && name === 'page-size') {
            this._pageSize = parseInt(newVal) || 10;
        }
        this.render();
    }

    // Propiedades para inyectar información y cabeceras
    set data(val) { 
        this._data = Array.isArray(val) ? val : []; 
        this._currentPage = 1; // Reinicia la paginación al recibir nueva data
        this.render(); 
    }
    
    set columns(val) { 
        this._columns = Array.isArray(val) ? val : []; 
        this.render(); 
    }

    // --- MOTOR DE FILTROS Y ORGANIZADORES ---
    _getProcessedData() {
        let processed = [...this._data];

        // 1. Buscador Aparte Integrado
        if (this._searchTerm) {
            const term = this._searchTerm.toLowerCase();
            processed = processed.filter(row => 
                this._columns.some(col => String(row[col.key]).toLowerCase().includes(term))
            );
        }

        // 2. Ordenamiento en el Header (Mayor a menor, Menor a mayor, Fechas, Alfabético)
        if (this._sortKey && this._sortDir) {
            const colDef = this._columns.find(c => c.key === this._sortKey);
            
            processed.sort((a, b) => {
                let vA = a[this._sortKey];
                let vB = b[this._sortKey];
                
                // PRIORIDAD AL DESARROLLADOR: Organizador personalizado
                if (colDef && typeof colDef.customSort === 'function') {
                    return colDef.customSort(vA, vB, this._sortDir);
                }
                
                // Manejo estándar de valores vacíos
                if (vA == null) return 1; 
                if (vB == null) return -1;
                
                // Ordenar por Fechas
                if (colDef && colDef.type === 'date') {
                    return this._sortDir === 'asc' ? new Date(vA) - new Date(vB) : new Date(vB) - new Date(vA);
                }
                // Ordenar por Números
                if (colDef && colDef.type === 'number' || (typeof vA === 'number' && typeof vB === 'number')) {
                    return this._sortDir === 'asc' ? vA - vB : vB - vA;
                }
                // Ordenar Alfabéticamente (por defecto)
                return this._sortDir === 'asc' 
                    ? String(vA).localeCompare(String(vB)) 
                    : String(vB).localeCompare(String(vA));
            });
        }
        return processed;
    }

    _attachEvents() {
        const root = this.shadowRoot;
        
        // Evento del Buscador
        const searchInput = root.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this._searchTerm = e.target.value;
                this._currentPage = 1;
                
                // Mantiene el foco y cursor para que el usuario pueda escribir de corrido
                const cursor = e.target.selectionStart;
                this.render();
                const newSearch = this.shadowRoot.querySelector('.search-input');
                if (newSearch) {
                    newSearch.focus();
                    newSearch.setSelectionRange(cursor, cursor);
                }
            });
        }

        // Eventos de los Headers para Organizar
        root.querySelectorAll('th').forEach(th => {
            th.addEventListener('click', () => {
                const key = th.dataset.key;
                if (this._sortKey === key) {
                    this._sortDir = this._sortDir === 'asc' ? 'desc' : null;
                    if (!this._sortDir) this._sortKey = null;
                } else {
                    this._sortKey = key; 
                    this._sortDir = 'asc';
                }
                this.render();
            });
        });

        // Evento de clic en filas
        const tbody = root.querySelector('tbody');
        if (tbody) {
            tbody.addEventListener('click', (e) => {
                const tr = e.target.closest('tr');
                if (tr && tr.parentElement === tbody) {
                    const index = Array.from(tbody.children).indexOf(tr);
                    const processedData = this._getProcessedData();
                    const start = (this._currentPage - 1) * this._pageSize;
                    const rowData = processedData[start + index];
                    if (rowData) {
                        this.dispatchEvent(new CustomEvent('row-click', {
                            detail: { data: rowData },
                            bubbles: true,
                            composed: true
                        }));
                    }
                }
            });
        }

        // Eventos de Paginación
        const processedData = this._getProcessedData();
        const totalPages = Math.ceil(processedData.length / this._pageSize) || 1;
        
        const prev = root.querySelector('#prev');
        const next = root.querySelector('#next');

        if (prev) prev.addEventListener('click', () => { 
            if(this._currentPage > 1) { this._currentPage--; this.render(); } 
        });
        
        if (next) next.addEventListener('click', () => { 
            if(this._currentPage < totalPages) { this._currentPage++; this.render(); } 
        });
    }

    render() {
        const ancho = this.getAttribute('ancho') || '100%';
        const largo = this.getAttribute('largo') || 'auto';
        
        const processedData = this._getProcessedData();
        const totalPages = Math.ceil(processedData.length / this._pageSize) || 1;
        
        if (this._currentPage > totalPages) this._currentPage = totalPages;
        
        // Render de la página actual
        const start = (this._currentPage - 1) * this._pageSize;
        const pageData = processedData.slice(start, start + this._pageSize);

        const hideSearch = this.hasAttribute('hide-search');
        this.shadowRoot.innerHTML = `
            <style>:host { width: ${ancho}; height: ${largo}; display: block; }</style>
            <link rel="stylesheet" href="${new URL('./style.css', import.meta.url).href}">
            
            <div class="table-wrapper">
                ${hideSearch ? '' : `
                <div class="toolbar">
                    <input type="text" class="search-input" placeholder="Buscar en la tabla..." value="${this._searchTerm}">
                </div>`}

                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                ${this._columns.map(col => {
                                    const isSorted = this._sortKey === col.key;
                                    const icon = isSorted ? (this._sortDir === 'asc' ? '▲' : '▼') : '';
                                    return `<th data-key="${col.key}">${col.label} <span class="sort-icon">${icon}</span></th>`;
                                }).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${pageData.length > 0 ? pageData.map(row => {
                                const isCompleted = row.estado === 'Terminada';
                                return `<tr class="${isCompleted ? 'completed' : ''}">
                                    ${this._columns.map(col => `<td>${row[col.key] != null ? row[col.key] : ''}</td>`).join('')}
                                </tr>`;
                            }).join('') : `<tr><td colspan="${this._columns.length}" class="empty-state">No se encontraron resultados.</td></tr>`}
                        </tbody>
                    </table>
                </div>

                <div class="mobile-cards">
                    ${pageData.length > 0 ? pageData.map(row => `
                        <div class="card">
                            ${this._columns.map(col => `
                                <div class="card-row">
                                    <span class="card-label">${col.label}</span>
                                    <span class="card-value">${row[col.key] != null ? row[col.key] : ''}</span>
                                </div>
                            `).join('')}
                        </div>
                    `).join('') : `<div class="card empty-state">No se encontraron resultados.</div>`}
                </div>

                <div class="pagination">
                    <span>Página ${this._currentPage} de ${totalPages}</span>
                    <div class="btn-group">
                        <button id="prev" class="btn-page" ${this._currentPage === 1 ? 'disabled' : ''}>Anterior</button>
                        <button id="next" class="btn-page" ${this._currentPage === totalPages ? 'disabled' : ''}>Siguiente</button>
                    </div>
                </div>
                
            </div>
        `;

        this._attachEvents();
    }
}
customElements.define('custom-table', CustomTable);

if (document.body.children.length === 0) {
    const style = document.createElement('style');
    style.textContent = 'body{background:#0f172a;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;color:#fff;font-family:system-ui,sans-serif}';
    document.head.appendChild(style);
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'width:100%;max-width:900px;padding:20px';
    wrapper.innerHTML = '<h2 style="color:#3ee7b8;text-align:center;margin-bottom:20px">Custom Table</h2><custom-table id="t-demo" page-size="5"></custom-table>';
    document.body.appendChild(wrapper);

    const tc = [
        { key: 'id', label: 'ID', type: 'number' },
        { key: 'nombre', label: 'Nombre', type: 'string' },
        { key: 'rol', label: 'Rol', type: 'string' },
        { key: 'estado', label: 'Estado', type: 'string' },
    ];
    const td = [
        { id: 1, nombre: 'Yox', rol: 'Frontend', estado: 'Activo' },
        { id: 2, nombre: 'David', rol: 'Backend', estado: 'Activo' },
        { id: 3, nombre: 'Eduardo', rol: 'QA', estado: 'Revisión' },
        { id: 4, nombre: 'Ángel', rol: 'Full Stack', estado: 'Activo' },
        { id: 5, nombre: 'María', rol: 'Diseñadora', estado: 'Inactivo' },
        { id: 6, nombre: 'Carlos', rol: 'DevOps', estado: 'Activo' },
        { id: 7, nombre: 'Ana', rol: 'Product Owner', estado: 'Activo' },
    ];
    const table = document.getElementById('t-demo');
    table.columns = tc;
    table.data = td;
}

export default CustomTable;