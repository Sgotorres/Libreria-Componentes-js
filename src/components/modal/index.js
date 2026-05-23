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
            <link rel="stylesheet" href="${new URL('./style.css', import.meta.url).href}">
            <div class="overlay" style="background: ${bgColor};">
                <div class="modal-container" style="font-family: ${fontFamily};">
                    ${headerImage ? `<img src="${headerImage}" class="header-img" alt="">` : ''}
                    <div class="modal-body">
                        ${type !== 'custom' ? `<div class="icon-container">${iconSvg}</div>` : ''}
                        <div class="content-slot" style="font-size: ${fontSize};"><slot></slot></div>
                    </div>

                    <div class="modal-actions">
                        ${type === 'custom'
                            ? `<slot name="actions">
                                 ${btn2 ? `<button class="btn-secondary" id="btn-2">${btn2}</button>` : ''}
                                 <button class="btn-primary" id="btn-1" style="background: ${typeColor};">${btn1}</button>
                               </slot>`
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

if (document.body.children.length === 0) {
    const sandboxStyle = document.createElement('style');
    sandboxStyle.textContent = 'body{background:#0f172a;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0;color:white;font-family:system-ui,sans-serif}.sandbox{background:rgba(255,255,255,0.05);padding:40px;border-radius:15px;border:1px solid rgba(255,255,255,0.1);display:flex;flex-wrap:wrap;gap:12px;justify-content:center}h2{color:#94a3b8;margin-bottom:20px}.trigger{padding:12px 24px;border:none;border-radius:8px;font-weight:bold;cursor:pointer}.trigger.info{background:#3b82f6;color:white}.trigger.error{background:#ef4444;color:white}.trigger.confirm{background:#eab308}.trigger.custom{background:#8b5cf6;color:white}.trigger.settings{background:#1e293b;color:#94a3b8;border:1px solid rgba(255,255,255,0.1)}';
    document.head.appendChild(sandboxStyle);

    const sandbox = document.createElement('div');
    sandbox.className = 'sandbox';
    sandbox.innerHTML = '<button class="trigger info" id="btn-info">Info</button><button class="trigger error" id="btn-error">Error</button><button class="trigger confirm" id="btn-confirm">Confirmaci&oacute;n</button><button class="trigger custom" id="btn-custom">Personalizado</button><button class="trigger settings" id="btn-settings">⚙ Personalizar Estilo</button>';
    document.body.appendChild(sandbox);

    const modals = [
        { id: 'modal-info', type: 'info', btn1: 'Entendido', html: '<h2 style="margin-top:0;color:#3b82f6;">Informaci&oacute;n del Sistema</h2><p style="color:#cbd5e1;">Actualizaci&oacute;n completada correctamente.</p>' },
        { id: 'modal-error', type: 'error', btn1: 'Reintentar', btn2: 'Cancelar', html: '<h2 style="margin-top:0;color:#ef4444;">Error de Conexi&oacute;n</h2><p style="color:#cbd5e1;">No se pudo conectar con el servidor.</p>' },
        { id: 'modal-confirm', type: 'confirm', btn1: 'Eliminar', btn2: 'Cancelar', html: '<h2 style="margin-top:0;color:#eab308;">Confirmar Eliminaci&oacute;n</h2><p style="color:#cbd5e1;">¿Est&aacute;s seguro?</p>' },
        { id: 'modal-custom', type: 'custom', headerImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
          html: '<h3 style="color:#8b5cf6;margin-top:0;">Nuevo Producto</h3><div style="display:flex;flex-direction:column;gap:10px;text-align:left;"><input type="text" placeholder="Nombre..." style="padding:10px;border-radius:5px;border:none;"><input type="number" placeholder="Precio..." style="padding:10px;border-radius:5px;border:none;"></div><div slot="actions" style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;"><button style="padding:10px 20px;background:#8b5cf6;color:white;border:none;border-radius:8px;font-weight:bold;cursor:pointer;">Guardar</button><button style="padding:10px 20px;background:transparent;color:#94a3b8;border:1px solid rgba(255,255,255,0.2);border-radius:8px;cursor:pointer;">Descartar</button></div>' },
    ];

    modals.forEach(m => {
        const el = document.createElement('custom-modal');
        el.id = m.id;
        el.setAttribute('type', m.type);
        el.setAttribute('btn-1', m.btn1);
        if (m.btn2) el.setAttribute('btn-2', m.btn2);
        if (m.headerImage) el.setAttribute('header-image', m.headerImage);
        el.innerHTML = m.html;
        document.body.appendChild(el);
    });

    // Settings modal
    const settingsEl = document.createElement('custom-modal');
    settingsEl.id = 'modal-settings';
    settingsEl.setAttribute('type', 'custom');
    settingsEl.setAttribute('btn-1', 'Cerrar');
    settingsEl.innerHTML = '<h3 style="margin:0 0 20px 0;color:#3ee7b8;">Personalizar Estilo</h3><div style="display:flex;flex-direction:column;gap:16px;text-align:left;">'
        + '<label style="display:flex;justify-content:space-between;align-items:center;color:#cbd5e1;"><span>Color Acento</span><input type="color" id="set-accent" value="#3ee7b8" style="width:50px;height:36px;border:none;border-radius:6px;cursor:pointer;padding:0;"></label>'
        + '<label style="display:flex;justify-content:space-between;align-items:center;color:#cbd5e1;"><span>Color Botones</span><input type="color" id="set-btn-color" value="#3b82f6" style="width:50px;height:36px;border:none;border-radius:6px;cursor:pointer;padding:0;"></label>'
        + '<label style="display:flex;justify-content:space-between;align-items:center;color:#cbd5e1;"><span>Tama&ntilde;o Letra</span><input type="range" id="set-font-size" min="12" max="22" value="15" style="width:120px;"><span id="font-size-label">15px</span></label>'
        + '<label style="display:flex;justify-content:space-between;align-items:center;color:#cbd5e1;"><span>Fuente</span><select id="set-font-family" style="padding:6px 10px;border-radius:6px;background:#1e293b;color:#f8fafc;border:1px solid rgba(255,255,255,0.1);width:160px;"><option value="system-ui, sans-serif">system-ui</option><option value="Arial, sans-serif">Arial</option><option value="\'Segoe UI\', sans-serif">Segoe UI</option><option value="\'Times New Roman\', serif">Times New Roman</option><option value="Georgia, serif">Georgia</option><option value="\'Courier New\', monospace">Courier New</option></select></label>'
        + '</div>';
    document.body.appendChild(settingsEl);

    function apply(key, value) { document.documentElement.style.setProperty(key, value); }

    document.getElementById('btn-info').addEventListener('click', () => document.getElementById('modal-info').open());
    document.getElementById('btn-error').addEventListener('click', () => document.getElementById('modal-error').open());
    document.getElementById('btn-confirm').addEventListener('click', () => document.getElementById('modal-confirm').open());
    document.getElementById('btn-custom').addEventListener('click', () => document.getElementById('modal-custom').open());
    document.getElementById('btn-settings').addEventListener('click', () => settingsEl.open());

    document.getElementById('set-accent').addEventListener('input', (e) => apply('--modal-accent', e.target.value));
    document.getElementById('set-btn-color').addEventListener('input', (e) => apply('--modal-btn-color', e.target.value));
    document.getElementById('set-font-size').addEventListener('input', (e) => {
        const v = e.target.value + 'px';
        document.getElementById('font-size-label').textContent = v;
        apply('--modal-font-size', v);
    });
    document.getElementById('set-font-family').addEventListener('change', (e) => apply('--modal-font-family', e.target.value));
}

export default CustomModal;