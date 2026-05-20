class CustomTable extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Estado Interno (Estado de la aplicación)
        this._data = [];
        this._columns = [];
        this._currentPage = 1;
        this._pageSize = 10;
        this._searchTerm = '';
        this._sortKey = null;
        this._sortDir = null; // 'asc' o 'desc'
    }

    // Leemos las reglas de la rúbrica del profesor
    static get observedAttributes() { 
        return ['ancho', 'largo', 'page-size']; 
    }

    connectedCallback() {
        // Validación de paginación por defecto si el usuario no pone el atributo
        this._pageSize = parseInt(this.getAttribute('page-size')) || 10;
        this.render();
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal && name === 'page-size') {
            this._pageSize = parseInt(newVal) || 10;
        }
        this.render();
    }

    // Recepción de la información (Requisito)
    set data(val) { 
        this._data = Array.isArray(val) ? val : []; 
        this._currentPage = 1; // Reiniciamos a la pág 1 al recibir nueva data
        this.render(); 
    }
    
    // Indicador de headers
    set columns(val) { 
        this._columns = Array.isArray(val) ? val : []; 
        this.render(); 
    }

    // --- MOTOR DE FILTROS Y ORDENAMIENTO (Requisitos del Profesor) ---
    _getProcessedData() {
        let processed = [...this._data];

        // 1. Buscador Aparte Integrado
        if (this._searchTerm) {
            const term = this._searchTerm.toLowerCase();
            processed = processed.filter(row => 
                this._columns.some(col => String(row[col.key]).toLowerCase().includes(term))
            );
        }

        // 2. Ordenamiento Personalizado (Números, Fechas, Alfabético)
        if (this._sortKey && this._sortDir) {
            const colDef = this._columns.find(c => c.key === this._sortKey);
            
            processed.sort((a, b) => {
                let vA = a[this._sortKey];
                let vB = b[this._sortKey];
                
                // Manejo de valores vacíos
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
                this.render();
                // Devolvemos el foco al input para que no se pierda al escribir
                root.querySelector('.search-input').focus();
            });
        }

        // Eventos de los Headers para Ordenar
        root.querySelectorAll('th').forEach(th => {
            th.addEventListener('click', () => {
                const key = th.dataset.key;
                if (this._sortKey === key) {
                    this._sortDir = this._sortDir === 'asc' ? 'desc' : null; // asc -> desc -> sin filtro
                    if (!this._sortDir) this._sortKey = null;
                } else {
                    this._sortKey = key; 
                    this._sortDir = 'asc';
                }
                this.render();
            });
        });

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
        // Dimensiones dinámicas
        const ancho = this.getAttribute('ancho') || '100%';
        const largo = this.getAttribute('largo') || 'auto';
        
        const processedData = this._getProcessedData();
        const totalPages = Math.ceil(processedData.length / this._pageSize) || 1;
        
        // Prevención de página vacía al buscar
        if (this._currentPage > totalPages) this._currentPage = totalPages;
        
        // Paginación Matemática
        const start = (this._currentPage - 1) * this._pageSize;
        const pageData = processedData.slice(start, start + this._pageSize);

        this.shadowRoot.innerHTML = `
            <style>:host { width: ${ancho}; height: ${largo}; }</style>
            <link rel="stylesheet" href="./style.css">
            
            <div class="table-wrapper">
                
                <div class="toolbar">
                    <input type="text" class="search-input" placeholder="Buscar en la tabla..." value="${this._searchTerm}">
                </div>

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
                            ${pageData.length > 0 ? pageData.map(row => `
                                <tr>
                                    ${this._columns.map(col => `<td>${row[col.key] != null ? row[col.key] : ''}</td>`).join('')}
                                </tr>
                            `).join('') : `<tr><td colspan="${this._columns.length}" style="text-align:center; color:#94a3b8; padding: 20px;">No se encontraron registros.</td></tr>`}
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
                    `).join('') : `<div class="card" style="text-align:center; color:#94a3b8;">No se encontraron registros.</div>`}
                </div>

                <div class="pagination">
                    <span>Página ${this._currentPage} de ${totalPages}</span>
                    <div>
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
export default CustomTable;