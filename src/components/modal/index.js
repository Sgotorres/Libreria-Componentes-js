class CustomModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._isOpen = false;
    }

    static get observedAttributes() {
        return ['type', 'bg-color', 'color', 'header-image', 'btn-1', 'btn-2'];
    }

    connectedCallback() { this.render(); }

    attributeChangedCallback() { if (this._isOpen) this.render(); }

    open() {
        this._isOpen = true;
        this.render();
        document.body.style.overflow = 'hidden';
    }

    close() {
        this._isOpen = false;
        this.render();
        document.body.style.overflow = 'auto';
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
        if (!this._isOpen) {
            this.shadowRoot.innerHTML = '';
            return;
        }

        const type = this.getAttribute('type') || 'info';
        const bgColor = this.getAttribute('bg-color') || 'rgba(15, 23, 42, 0.85)';
        const headerImage = this.getAttribute('header-image');
        const btn1 = this.getAttribute('btn-1') || 'Aceptar';
        const btn2 = this.getAttribute('btn-2');

        const root = getComputedStyle(document.documentElement);
        const globalAccent = root.getPropertyValue('--modal-accent').trim();
        const globalBtnColor = root.getPropertyValue('--modal-btn-color').trim();
        const globalFontSize = root.getPropertyValue('--modal-font-size').trim();
        const globalFontFamily = root.getPropertyValue('--modal-font-family').trim();

        const baseColors = { error: '#ef4444', info: '#3b82f6', confirm: '#eab308', custom: '#8b5cf6' };
        const typeColor = this.getAttribute('color') || globalBtnColor || globalAccent || baseColors[type] || '#3ee7b8';
        const fontSize = globalFontSize || '15px';
        const fontFamily = globalFontFamily || 'system-ui, sans-serif';

        let iconSvg = '';
        if (type === 'error') {
            iconSvg = `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${typeColor}" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
        } else if (type === 'info') {
            iconSvg = `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${typeColor}" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
        } else if (type === 'confirm') {
            iconSvg = `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${typeColor}" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
        }

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./style.css">
            <div class="overlay" style="background: ${bgColor};">
                <div class="modal-container" style="font-family: ${fontFamily};">
                    ${headerImage ? `<img src="${headerImage}" class="header-img" alt="">` : ''}
                    <div class="modal-body">
                        ${type !== 'custom' ? `<div class="icon-container">${iconSvg}</div>` : ''}
                        <div class="content-slot" style="font-size: ${fontSize};"><slot></slot></div>
                    </div>

                    <div class="modal-actions">
                        ${type === 'custom'
                            ? '<slot name="actions"></slot>'
                            : `${btn2 ? `<button class="btn-secondary" id="btn-2">${btn2}</button>` : ''}
                               <button class="btn-primary" id="btn-1" style="background: ${typeColor};">${btn1}</button>`
                        }
                    </div>
                </div>
            </div>
        `;

        const overlay = this.shadowRoot.querySelector('.overlay');
        overlay.addEventListener('click', (e) => { if (e.target === overlay) this.close(); });

        const btn1El = this.shadowRoot.querySelector('#btn-1');
        const btn2El = this.shadowRoot.querySelector('#btn-2');
        if (btn1El) btn1El.addEventListener('click', () => this._handleBtn1());
        if (btn2El) btn2El.addEventListener('click', () => this._handleBtn2());
    }
}
customElements.define('custom-modal', CustomModal);
export default CustomModal;