# Librería de Componentes UI

Componentes web nativos con estilo glassmorphism, construidos con Vanilla JS y Shadow DOM.

## 📂 Estructura

```
src/components/
├── date-range/        # Yoxz
│   ├── index.js       # Componente + página de prueba
│   └── style.css
├── input-text/        # David
│   ├── index.js
│   └── style.css
├── modal/             # Yoxz
│   ├── index.js
│   └── style.css
├── select-dinamico/   # Dudu
│   ├── index.js
│   └── style.css
└── table/             # Ángel
    ├── index.js
    └── style.css

src/index.js           # Importa todos los componentes
index.html             # Página demo que los usa
```

## 🧠 ¿Qué cambió?

Antes cada componente estaba definido **inline** en `index.html` con un `class` + `customElements.define`. Ahora cada componente vive en su propia carpeta como **módulo independiente**.

### Ventajas
- Cada uno trabaja en su carpeta sin tocar el `index.html` principal
- Puedes abrir el componente solo para probarlo sin la página grande
- No hay conflictos de código entre miembros del equipo

## 🚀 Cómo trabajar

### 1. Desarrollo normal (página demo)
Solo abre `index.html` con Live Server. Todos los componentes se cargan desde `src/index.js`.

### 2. Probar un componente solo
Abre directamente su `index.js` en el navegador. Si el `body` está vacío, el componente se muestra solo con datos de ejemplo. Si ya hay contenido (como en la página demo), se comporta normal.

```
http://localhost:5500/src/components/table/index.js
```

### 3. Agregar datos de ejemplo a la página demo
Dentro de `index.html` hay un script `DOMContentLoaded` donde se configuran selects, tablas y modales. Ahí agregas lo que necesites:

```js
// Ej: más filas a la tabla
tabla.data = [
    { ticket: 1045, asunto: 'Ejemplo', fecha: '2026-06-15', prioridad: 'Alta' },
    // ...
];
```

## 📦 Componentes

### DateRange (`<date-range>`) — Yox
```html
<date-range color-tema="#3ee7b8" allow-past="false"></date-range>
```
| Atributo | Descripción |
|---|---|
| `color-tema` | Color de acento |
| `allow-past` | `"true"`/`"false"` — permite fechas pasadas |
| `allow-future` | `"true"`/`"false"` — permite fechas futuras |

**Evento:** `range-changed` → `e.detail.start`, `e.detail.end`
**Método:** `.clearRange()`

---

### CustomModal (`<custom-modal>`) — Eduardo
```html
<custom-modal type="error" btn-1="Reintentar" btn-2="Cancelar">
    <p>Mensaje</p>
</custom-modal>
```
| Atributo | Descripción |
|---|---|
| `type` | `"info"` / `"error"` / `"confirm"` / `"custom"` |
| `btn-1` | Texto botón primario |
| `btn-2` | Texto botón secundario |
| `header-image` | URL de imagen de cabecera |
| `bg-color` | Color del overlay |

**Eventos:** `action-1`, `action-2`
**Métodos:** `.open()`, `.close()`

Los modales de la página demo se crean desde el `DOMContentLoaded` en `index.html`, no están escritos en HTML directo.

---

### InputText (`<input-text>`) — David
```html
<input-text tipo="numeros" min="3" max="8" placeholder="Ej: 123456"></input-text>
```
| Atributo | Descripción |
|---|---|
| `tipo` | `"numeros"` / `"letras"` / `"sin-especiales"` / `"email"` |
| `min` / `max` | Largo mínimo/máximo |
| `placeholder` | Texto de ayuda |
| `ancho` | Ancho del componente |

---

### CustomSelect (`<custom-select>`) — Dudu
```html
<custom-select id="roles" enable-search="true" multiple="true" placeholder="Seleccionar..."></custom-select>
```
```js
// Poblar opciones desde JS
document.getElementById('roles').opciones = ['Admin', 'Editor', 'Viewer'];
```

---

### CustomTable (`<custom-table>`) — Ángel
```html
<custom-table id="tabla" page-size="6" ancho="100%"></custom-table>
```
```js
const t = document.getElementById('tabla');
t.columns = [
    { key: 'nombre', label: 'Nombre', type: 'string' },
    { key: 'edad', label: 'Edad', type: 'number' },
];
t.data = [
    { nombre: 'Ana', edad: 30 },
    { nombre: 'Luis', edad: 25 },
];
```

## ⚙️ Modal — Personalización global
Define en tu CSS:
```css
:root {
    --modal-accent: #3ee7b8;
    --modal-btn-color: #3b82f6;
    --modal-font-size: 16px;
    --modal-font-family: 'Segoe UI', sans-serif;
}
```
O en tiempo real desde el botón "Personalizar" de la página demo.

## 🔧 Reglas importantes
1. **No edites `index.html`** si solo quieres cambiar tu componente — trabaja en tu carpeta
2. **No borres archivos de otros** — cada quien su carpeta
3. **Si necesitas más datos demo**, agrega en el `DOMContentLoaded` de `index.html`
4. **Para probar tu componente aislado**, abre su `index.js` directo en el navegador
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npm run dev