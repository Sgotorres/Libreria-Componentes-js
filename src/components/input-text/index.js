class InputText extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._tags = [];
    }

    connectedCallback() {
        const initialTags = this.getAttribute('tags');
        if (initialTags) {
            this._tags = initialTags.split(',').map(t => t.trim()).filter(t => t);
        }
        this.render();
        this._setupValidation();
        this._setupTagging();
    }

    disconnectedCallback() {
        const input = this.shadowRoot?.querySelector('input');
        if (input) {
            input.removeEventListener('input', this._onInput);
            input.removeEventListener('keydown', this._onKeydown);
        }
    }

    render() {
        const width = this.getAttribute('ancho') || '100%';
        const height = this.getAttribute('largo') || '40px';
        const placeholder = this.getAttribute('placeholder') || 'Escribe aquí...';
        const label = this.getAttribute('label') || '';
        const mostrarTamano = this.getAttribute('mostrar-tamano') === 'true';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: var(--ff-base, system-ui, sans-serif);
                    width: ${width};
                    margin-bottom: 15px;
                }
                .wrapper {
                    background: var(--glass-bg, linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02)));
                    border: var(--glass-border, 1px solid rgba(255,255,255,0.1));
                    border-top: var(--glass-border-top, 1px solid rgba(255,255,255,0.35));
                    border-left: var(--glass-border-left, 1px solid rgba(255,255,255,0.2));
                    border-radius: var(--r-lg, 25px);
                    padding: 20px;
                    backdrop-filter: var(--glass-blur, blur(25px) saturate(180%));
                    box-shadow: var(--glass-shadow-dense, 0 10px 20px rgba(0,0,0,0.6));
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                label {
                    font-size: var(--fs-sm, 12px);
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.5);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .size-badge {
                    font-size: 11px;
                    color: rgba(255, 255, 255, 0.35);
                    background: rgba(255, 255, 255, 0.06);
                    padding: 3px 10px;
                    border-radius: var(--r-full, 50px);
                    align-self: flex-start;
                    border: var(--glass-border, 1px solid rgba(255,255,255,0.1));
                }
                input {
                    width: 100%;
                    height: ${height};
                    padding: 10px 14px;
                    box-sizing: border-box;
                    background: rgba(255, 255, 255, 0.06);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: var(--r-md, 18px);
                    color: #fff;
                    font-size: var(--fs-base, 14px);
                    outline: none;
                    transition: border-color var(--t-fast, 0.15s);
                }
                input:focus {
                    border-color: var(--clr-primary, #3ee7b8);
                }
                input.invalid {
                    border-color: var(--clr-red, #ff6464);
                }
                .error-msg {
                    color: var(--clr-red, #ff6464);
                    font-size: var(--fs-sm, 12px);
                    min-height: 18px;
                    opacity: 0;
                    transition: opacity var(--t-fast, 0.15s);
                }
                .error-msg.visible {
                    opacity: 1;
                }
                .tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-top: 4px;
                }
                .tag {
                    background: var(--clr-primary-dim, rgba(62, 231, 184, 0.2));
                    color: #fff;
                    padding: 6px 14px;
                    border-radius: var(--r-full, 50px);
                    font-size: var(--fs-sm, 12px);
                    border: 1px solid rgba(62, 231, 184, 0.4);
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .tag-close {
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 16px;
                    opacity: 0.6;
                    line-height: 1;
                }
                .tag-close:hover {
                    opacity: 1;
                    color: var(--clr-red, #ff6464);
                }
            </style>
            <div class="wrapper">
                ${label ? `<label>${label}</label>` : ''}
                ${mostrarTamano ? `<div class="size-badge">${width} × ${height}</div>` : ''}
                <input type="text" placeholder="${placeholder}">
                <span class="error-msg"></span>
                <div class="tags"></div>
            </div>
        `;
        this._renderTags();
    }

    _setupValidation() {
        const input = this.shadowRoot.querySelector('input');
        const errorSpan = this.shadowRoot.querySelector('.error-msg');
        const min = parseInt(this.getAttribute('min')) || 0;
        const max = parseInt(this.getAttribute('max')) || Infinity;
        const tipo = this.getAttribute('tipo') || 'todo';

        if (max !== Infinity) {
            input.setAttribute('maxlength', max);
        }

        this._onInput = () => {
            const valor = input.value;
            let mensajeError = '';
            let esValido = true;

            if (valor.length > 0) {
                if (valor.length < min) {
                    mensajeError = `Debe tener al menos ${min} caracteres.`;
                    esValido = false;
                } else {
                    if (tipo === 'numeros' && !/^[0-9]+$/.test(valor)) {
                        mensajeError = 'Solo se admiten números.';
                        esValido = false;
                    } else if (tipo === 'letras' && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
                        mensajeError = 'Solo se admiten letras.';
                        esValido = false;
                    } else if (tipo === 'sin-especiales' && !/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
                        mensajeError = 'No se admiten caracteres especiales.';
                        esValido = false;
                    }
                }
            }

            if (!esValido && valor.length > 0) {
                input.classList.add('invalid');
                errorSpan.textContent = mensajeError;
                errorSpan.classList.add('visible');
            } else {
                input.classList.remove('invalid');
                errorSpan.classList.remove('visible');
            }
        };
        input.addEventListener('input', this._onInput);
    }

    _setupTagging() {
        const input = this.shadowRoot.querySelector('input');

        this._onKeydown = (e) => {
            if (e.key === 'Enter' && input.value.trim() !== '') {
                e.preventDefault();
                if (!input.classList.contains('invalid')) {
                    this.addTag(input.value.trim());
                    input.value = '';
                    input.dispatchEvent(new Event('input'));
                }
            }
        };
        input.addEventListener('keydown', this._onKeydown);
    }

    _renderTags() {
        const container = this.shadowRoot.querySelector('.tags');
        if (!container) return;
        container.innerHTML = '';
        this._tags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.className = 'tag';
            tagEl.innerHTML = `${tag} <span class="tag-close">&times;</span>`;
            tagEl.querySelector('.tag-close').onclick = () => this.removeTag(tag);
            container.appendChild(tagEl);
        });
    }

    getTags() {
        return [...this._tags];
    }

    addTag(tag) {
        if (!this._tags.includes(tag)) {
            this._tags.push(tag);
            this._renderTags();
            this.dispatchEvent(new CustomEvent('tag-added', { detail: { tag } }));
        }
    }

    removeTag(tag) {
        this._tags = this._tags.filter(t => t !== tag);
        this._renderTags();
        this.dispatchEvent(new CustomEvent('tag-removed', { detail: { tag } }));
    }

    clearTags() {
        this._tags = [];
        this._renderTags();
    }

    destroy() {
        this.disconnectedCallback();
        this.remove();
    }
}

customElements.define('input-text', InputText);

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
