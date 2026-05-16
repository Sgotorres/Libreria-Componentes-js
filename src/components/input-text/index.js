class CustomInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._tags = []; // Almacenamiento interno de los tags
  }

  connectedCallback() {
    // Inicializar tags si vienen por atributo (ej: tags="uno,dos")
    const initialTags = this.getAttribute('tags');
    if (initialTags) {
      this._tags = initialTags.split(',').map(t => t.trim()).filter(t => t);
    }

    this.render();
    this.setupValidation();
    this.setupTagging();
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
          font-family: system-ui, sans-serif;
          width: ${width};
          margin-bottom: 15px;
        }
        .input-wrapper {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        label {
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }
        .size-badge {
          font-size: 11px;
          color: #666;
          background: #f0f0f0;
          padding: 2px 6px;
          border-radius: 4px;
          align-self: flex-start;
          border: 1px solid #ddd;
          margin-bottom: 2px;
        }
        input {
          width: 100%;
          height: ${height};
          padding: 8px 12px;
          box-sizing: border-box;
          border: 2px solid var(--input-border, #ccc);
          border-radius: var(--input-radius, 8px);
          background: var(--input-bg, #fff);
          color: var(--input-color, #333);
          font-size: 16px;
          outline: none;
          transition: border-color 0.3s;
        }
        input:focus {
          border-color: var(--input-focus, #007BFF);
        }
        input.invalid {
          border-color: #DC3545;
        }
        .error-msg {
          color: #DC3545;
          font-size: 13px;
          min-height: 18px;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .error-msg.visible {
          opacity: 1;
        }
        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 5px;
        }
        .tag {
          background: #007BFF;
          color: white;
          padding: 4px 10px;
          border-radius: 16px;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .tag-close {
          cursor: pointer;
          font-weight: bold;
          font-size: 16px;
          line-height: 1;
        }
        .tag-close:hover {
          color: #ffcccc;
        }
      </style>
      
      <div class="input-wrapper">
        ${label ? `<label>${label}</label>` : ''}
        ${mostrarTamano ? `<div class="size-badge">Tamaño: ${width} ancho x ${height} largo</div>` : ''}
        <input type="text" placeholder="${placeholder}">
        <span class="error-msg"></span>
        <div class="tags-container"></div>
      </div>
    `;

    this.renderTags();
  }

  setupValidation() {
    const input = this.shadowRoot.querySelector('input');
    const errorSpan = this.shadowRoot.querySelector('.error-msg');

    const min = parseInt(this.getAttribute('min')) || 0;
    const max = parseInt(this.getAttribute('max')) || Infinity;
    const tipo = this.getAttribute('tipo') || 'todo';

    if (max !== Infinity) {
      input.setAttribute('maxlength', max);
    }

    input.addEventListener('input', () => {
      let valor = input.value;
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
    });
  }

  setupTagging() {
    const input = this.shadowRoot.querySelector('input');
    
    input.addEventListener('keydown', (e) => {
      // Si presiona Enter, hay texto, y el input NO tiene errores de validación
      if (e.key === 'Enter' && input.value.trim() !== '') {
        e.preventDefault();
        
        if (!input.classList.contains('invalid')) {
          this.addTag(input.value.trim());
          input.value = ''; // Limpiar el input
          input.dispatchEvent(new Event('input')); // Disparar evento para resetear errores
        }
      }
    });
  }

  renderTags() {
    const container = this.shadowRoot.querySelector('.tags-container');
    if (!container) return;
    
    container.innerHTML = '';
    this._tags.forEach(tag => {
      const tagEl = document.createElement('span');
      tagEl.className = 'tag';
      tagEl.innerHTML = `${tag} <span class="tag-close">&times;</span>`;
      
      tagEl.querySelector('.tag-close').onclick = () => {
        this.removeTag(tag);
      };
      
      container.appendChild(tagEl);
    });
  }

  // --- API PÚBLICA (Mismos métodos que tenías en la función InputText) ---

  getTags() {
    return [...this._tags];
  }

  addTag(tag) {
    if (!this._tags.includes(tag)) { // Evita tags duplicados
      this._tags.push(tag);
      this.renderTags();
      // Disparamos un evento personalizado para que el código externo pueda reaccionar
      this.dispatchEvent(new CustomEvent('tag-added', { detail: { tag } }));
    }
  }

  removeTag(tag) {
    this._tags = this._tags.filter(t => t !== tag);
    this.renderTags();
    this.dispatchEvent(new CustomEvent('tag-removed', { detail: { tag } }));
  }

  clearTags() {
    this._tags = [];
    this.renderTags();
  }
}

// Definir el Web Component
customElements.define('custom-input', CustomInput);

export default CustomInput;

