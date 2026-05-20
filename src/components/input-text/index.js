class InputText extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._errorMsg = '';
    }

    // Leemos las reglas de la rúbrica del profesor
    static get observedAttributes() { 
        return ['ancho', 'largo', 'min', 'max', 'tipo', 'placeholder']; 
    }
    
    connectedCallback() { 
        this.render(); 
        this._attachEvents(); 
    }
    
    attributeChangedCallback() { 
        this.render(); 
        this._attachEvents(); 
    }

    _validate(value) {
        const min = parseInt(this.getAttribute('min')) || 0;
        const max = parseInt(this.getAttribute('max')) || Infinity;
        const tipo = this.getAttribute('tipo') || 'todo';
        
        let isValid = true;
        this._errorMsg = '';

        if (value.length > 0) {
            // 1. Validación de Longitud (Mínimo y Máximo)
            if (value.length < min) { 
                this._errorMsg = `Se requieren al menos ${min} caracteres.`; 
                isValid = false; 
            } 
            else if (value.length > max) { 
                this._errorMsg = `Límite excedido (Máximo ${max}).`; 
                isValid = false; 
            } 
            else {
                // 2. Validación por Tipo (Regex)
                if (tipo === 'numeros' && !/^[0-9]+$/.test(value)) { 
                    this._errorMsg = 'Error: Solo se admiten números.'; 
                    isValid = false; 
                } 
                else if (tipo === 'letras' && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) { 
                    this._errorMsg = 'Error: Solo se admiten letras.'; 
                    isValid = false; 
                } 
                else if (tipo === 'sin-especiales' && !/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) { 
                    this._errorMsg = 'Error: No se admiten caracteres especiales.'; 
                    isValid = false; 
                }
            }
        }

        this._updateUI(isValid);
    }

    _updateUI(isValid) {
        const input = this.shadowRoot.querySelector('input');
        const errorSpan = this.shadowRoot.querySelector('.error-msg');
        
        if (!isValid) {
            input.classList.add('invalid');
            errorSpan.textContent = this._errorMsg;
            errorSpan.classList.add('visible');
        } else {
            input.classList.remove('invalid');
            errorSpan.classList.remove('visible');
        }
    }

    _attachEvents() {
        const input = this.shadowRoot.querySelector('input');
        if (!input) return;
        
        // El atributo 'max' corta el texto nativamente, pero igual lo validamos
        const max = this.getAttribute('max');
        if (max) input.setAttribute('maxlength', max);

        // Escuchamos cada vez que el usuario teclea
        input.addEventListener('input', (e) => {
            this._validate(e.target.value);
            
            // Emitimos evento personalizado por si otro componente necesita la data
            this.dispatchEvent(new CustomEvent('valor-cambiado', { 
                detail: { valor: e.target.value, valido: this._errorMsg === '' },
                bubbles: true, composed: true 
            }));
        });
    }

    render() {
        // Configuraciones de dimensiones pedidas por el profesor
        const ancho = this.getAttribute('ancho') || '100%';
        const largo = this.getAttribute('largo') || '45px';
        const placeholder = this.getAttribute('placeholder') || 'Escriba aquí...';

        this.shadowRoot.innerHTML = `
            <style>
                /* Inyectamos dinámicamente las dimensiones en el host */
                :host { width: ${ancho}; }
                input { height: ${largo}; }
            </style>
            <link rel="stylesheet" href="./style.css">
            
            <div class="input-wrapper">
                <input type="text" placeholder="${placeholder}">
                <div class="error-msg">Mensaje de error</div>
            </div>
        `;
    }
}
customElements.define('input-text', InputText);
export default InputText;