class CustomModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._isOpen = false;
    }

    // Leemos los 5 parámetros estrictos de la rúbrica
    static get observedAttributes() { 
        return ['type', 'bg-color', 'header-image', 'btn-1', 'btn-2']; 
    }
    
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this._isOpen) this.render(); }

    // API PÚBLICA (Para que el HTML pueda abrir/cerrar el modal)
    open() {
        this._isOpen = true;
        this.render();
        document.body.style.overflow = 'hidden'; // Evita que la página de fondo haga scroll
    }

    close() {
        this._isOpen = false;
        this.render();
        document.body.style.overflow = 'auto'; // Restaura el scroll
    }

    _handleBtn1() { 
        this.dispatchEvent(new CustomEvent('action-1', { bubbles: true, composed: true })); 
        this.close(); 
    }
    
    _handleBtn2() { 
        this.dispatchEvent(new CustomEvent('action-2', { bubbles: true, composed: true })); 
        this.close(); 
    }

    render() {
        // Si no está abierto, no renderiza nada en el DOM
        if (!this._isOpen) {
            this.shadowRoot.innerHTML = '';
            return;
        }

        // LÓGICA DE RÚBRICA
        const type = this.getAttribute('type') || 'info'; 
        // Color predeterminado oscuro si el usuario no envía uno
        const bgColor = this.getAttribute('bg-color') || 'rgba(15, 23, 42, 0.85)';
        const headerImage = this.getAttribute('header-image');
        
        // Máximo 2 botones
        const btn1 = this.getAttribute('btn-1') || 'Aceptar';
        const btn2 = this.getAttribute('btn-2'); // Si no existe, no se renderiza

        // Iconos y colores basados en los 4 tipos permitidos
        let iconSvg = '';
        let typeColor = '#3ee7b8'; 

        if (type === 'error') {
            typeColor = '#ef4444'; // Rojo
            iconSvg = `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${typeColor}" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
        } else if (type === 'info') {
            typeColor = '#3b82f6'; // Azul
            iconSvg = `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${typeColor}" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
        } else if (type === 'confirm') {
            typeColor = '#eab308'; // Amarillo
            iconSvg = `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${typeColor}" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
        } else if (type === 'custom') {
            // El tipo custom asume el color del tema por defecto o permite inyecciones libres
            typeColor = '#8b5cf6'; // Morado para custom
        }

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./style.css">
            
            <div class="overlay" style="background: ${bgColor};">
                <div class="modal-container">
                    
                    ${headerImage ? `<img src="${headerImage}" class="header-img" alt="Modal Header">` : ''}
                    
                    <div class="modal-body">
                        ${type !== 'custom' ? `<div class="icon-container">${iconSvg}</div>` : ''}
                        
                        <div class="content-slot">
                            <slot></slot>
                        </div>
                    </div>

                    <div class="modal-actions">
                        ${btn2 ? `<button class="btn-secondary" id="btn-2">${btn2}</button>` : ''}
                        <button class="btn-primary" id="btn-1" style="background: ${typeColor};">${btn1}</button>
                    </div>
                </div>
            </div>
        `;

        // Asignación de Eventos
        const overlay = this.shadowRoot.querySelector('.overlay');
        const btn1El = this.shadowRoot.querySelector('#btn-1');
        const btn2El = this.shadowRoot.querySelector('#btn-2');

        // Cierra el modal si se hace clic afuera de la caja (en el fondo oscuro)
        overlay.addEventListener('click', (e) => { 
            if (e.target === overlay) this.close(); 
        });

        if (btn1El) btn1El.addEventListener('click', () => this._handleBtn1());
        if (btn2El) btn2El.addEventListener('click', () => this._handleBtn2());
    }
}
customElements.define('custom-modal', CustomModal);
export default CustomModal;