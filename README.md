# Librería de Componentes UI

Componentes web nativos con estilo glassmorphism, construidos con Vanilla JS y Shadow DOM. Incluye una aplicación de gestión de tareas (`tareas.html`) que integra todos los componentes.

---

## Índice

1. [Estructura del proyecto](#-estructura-del-proyecto)
2. [Cómo empezar](#-cómo-empezar)
3. [Aplicación: Gestión de Tareas](#-aplicación-gestión-de-tareas)
4. [Componentes](#-componentes)
   - [InputText](#inputtext)
   - [CustomSelect](#customselect)
   - [DateRange](#daterange)
   - [CustomModal](#custommodal)
   - [CustomTable](#customtable)
5. [Página demo (index.html)](#-página-demo-indexhtml)
6. [Crear un componente nuevo paso a paso](#-crear-un-componente-nuevo-paso-a-paso)

---

## 📂 Estructura del proyecto

```
src/
├── components/
│   ├── date-range/        # Calendario de rango de fechas
│   │   ├── index.js
│   │   └── style.css
│   ├── input-text/        # Campo de texto con validación
│   │   ├── index.js
│   │   └── style.css
│   ├── modal/             # Modal con tipos (info, error, confirm, custom)
│   │   ├── index.js
│   │   └── style.css
│   ├── select-dinamico/   # Select con búsqueda y selección múltiple
│   │   ├── index.js
│   │   └── style.css
│   └── table/             # Tabla con búsqueda, ordenación y paginación
│       ├── index.js
│       └── style.css
├── index.js               # Barrel — importa y re-exporta todos los componentes

assets/
├── style.css              # Estilos globales (glassmorphism, layout)
└── app.js                 # Inicialización de la página demo

index.html                 # Página demo principal
tareas.html                # Aplicación de gestión de tareas
```

Cada componente vive en su propia carpeta como **módulo independiente**. Puedes abrir su `index.js` directamente en el navegador para probarlo de forma aislada (si el `body` está vacío, el componente se renderiza con datos de ejemplo).

---

## 🚀 Cómo empezar

1. Abre el proyecto con **Live Server** (VS Code) o cualquier servidor HTTP estático.
2. `index.html` — página demo con todos los componentes.
3. `tareas.html` — aplicación funcional de gestión de tareas.

No requiere npm install ni build. Son Web Components nativos.

---

## 📋 Aplicación: Gestión de Tareas

`tareas.html` es una aplicación completa que usa todos los componentes.

### ¿Qué hace?

- **Crear tareas**: llenas nombre de persona → tipo de tarea (con chips rápidos) → rango de fechas → botón "Crear Tarea" → modal de confirmación con nombre, descripción y estado → se agrega a la tabla.
- **Filtrar tareas**: chips de columna (Persona, Nombre, Tipo, Descripción, Estado, Inicio, Límite) + select desplegable. Al seleccionar un chip, el select muestra solo los valores únicos de esa columna. Al elegir un valor, la tabla se filtra.
- **Ver detalle**: haz clic en una fila de la tabla → se abre un modal info con todos los datos.
- **Completar tareas**: en el modal de detalle, botón "Terminar" → cambia el estado a "Terminada" y la fila se muestra atenuada con tachado.

### Flujo paso a paso

1. Escribe tu nombre en el campo "Nombre de la persona".
2. Selecciona un tipo de tarea (escribe o haz clic en un chip: "Frontend", "Backend", etc.).
3. Elige un rango de fechas en el calendario.
4. Presiona **"+ Crear Tarea"**.
5. En el modal de confirmación, escribe nombre, descripción y selecciona estado ("En Proceso" / "Terminada").
6. Presiona **"Sí, crear tarea"** → la tarea aparece en la tabla.
7. Para filtrar, haz clic en un chip de columna (ej: "Tipo") → el select muestra solo los tipos disponibles → selecciona uno.
8. Haz clic en cualquier fila de la tabla → se abre el detalle.
9. Presiona **"Terminar"** para marcar como completada.

---

## 🧩 Componentes

### InputText

Campo de texto con validación en tiempo real.

```html
<input-text tipo="letras" min="3" max="20" placeholder="Tu nombre"></input-text>
```

| Atributo       | Descripción                                      |
|----------------|--------------------------------------------------|
| `tipo`         | `"numeros"` / `"letras"` / `"sin-especiales"` / `"todo"` |
| `min`          | Longitud mínima de caracteres                    |
| `max`          | Longitud máxima de caracteres                    |
| `placeholder`  | Texto de ayuda                                   |
| `ancho`        | Ancho del componente (ej: `"100%"`, `"300px"`)   |
| `largo`        | Altura del input (ej: `"45px"`)                  |

**Propiedades:**
- `.value` — getter/setter para leer o escribir el valor.

**Eventos:**
- `valor-cambiado` → `e.detail.valor`, `e.detail.valido` — se dispara en cada tecla.

---

### CustomSelect

Select dinámico con búsqueda y soporte múltiple.

```html
<custom-select placeholder="Seleccione..." enable-search="true" multiple="true"></custom-select>
```

```js
const select = document.getElementById('mi-select');
select.opciones = ['Admin', 'Editor', 'Viewer'];
```

| Atributo         | Descripción                                    |
|------------------|------------------------------------------------|
| `placeholder`    | Texto cuando no hay selección                  |
| `enable-search`  | `"true"` / `"false"` — muestra caja de búsqueda dentro del dropdown |
| `multiple`       | `"true"` / `"false"` — selección múltiple con tags |
| `ancho`          | Ancho del componente                           |

**Propiedades:**
- `.opciones` (setter) — array de strings para poblar el dropdown.
- `.seleccionados` (getter) — array con los valores seleccionados.

**Eventos:**
- `change` — se dispara cuando cambia la selección (burbujea, compuesto).

---

### DateRange

Calendario para seleccionar un rango de fechas.

```html
<date-range color-tema="#3ee7b8" allow-past="false" allow-future="true"></date-range>
```

| Atributo       | Descripción                                    |
|----------------|------------------------------------------------|
| `color-tema`   | Color de acento del calendario                 |
| `allow-past`   | `"true"` / `"false"` — permite fechas pasadas  |
| `allow-future` | `"true"` / `"false"` — permite fechas futuras  |

**Eventos:**
- `range-changed` → `e.detail.start` (Date), `e.detail.end` (Date).

**Métodos:**
- `.clearRange()` — limpia la selección.

---

### CustomModal

Modal con 4 tipos predefinidos y soporte para contenido personalizado.

```html
<custom-modal type="confirm" btn-1="Sí, crear tarea" btn-2="Cancelar">
    <h2>Título</h2>
    <p>Mensaje</p>
</custom-modal>
```

| Atributo        | Descripción                                      |
|-----------------|--------------------------------------------------|
| `type`          | `"info"` / `"error"` / `"confirm"` / `"custom"` |
| `btn-1`         | Texto del botón primario                         |
| `btn-2`         | Texto del botón secundario (opcional)            |
| `header-image`  | URL de imagen de cabecera (solo type="custom")   |
| `bg-color`      | Color del overlay (por defecto: `rgba(15,23,42,0.85)`) |
| `color`         | Color del botón primario y del ícono             |

**Eventos:**
- `action-1` — clic en botón primario.
- `action-2` — clic en botón secundario.

**Métodos:**
- `.open()` — abre el modal.
- `.close()` — cierra el modal.

**Personalización global (CSS:root):**
```css
:root {
    --modal-accent: #3ee7b8;
    --modal-btn-color: #3b82f6;
    --modal-font-size: 16px;
    --modal-font-family: 'Segoe UI', sans-serif;
}
```

---

### CustomTable

Tabla con búsqueda, ordenación por columnas y paginación.

```html
<custom-table id="tabla" page-size="8" ancho="100%" hide-search></custom-table>
```

```js
const tabla = document.getElementById('tabla');
tabla.columns = [
    { key: 'nombre', label: 'Nombre', type: 'string' },
    { key: 'edad', label: 'Edad', type: 'number' },
];
tabla.data = [
    { nombre: 'Ana', edad: 30 },
    { nombre: 'Luis', edad: 25 },
];
```

| Atributo      | Descripción                                      |
|---------------|--------------------------------------------------|
| `page-size`   | Filas por página (por defecto: 6)                |
| `ancho`       | Ancho del componente                             |
| `largo`       | Alto del componente                              |
| `hide-search` | Si está presente, oculta el buscador interno      |

**Propiedades:**
- `.columns` — array de objetos `{ key, label, type }`.
- `.data` — array de objetos con los valores a mostrar.

**Eventos:**
- `row-click` → `e.detail.data` (objeto completo de la fila clickeada).

**Funcionalidades internas:**
- Buscador (filtra en todas las columnas).
- Ordenación: clic en encabezado para ordenar A-Z / Z-A / ninguno.
- Paginación con botones anterior/siguiente.
- Vista responsive: en pantallas pequeñas muestra tarjetas en lugar de tabla.

---

## 🏠 Página demo (index.html)

La página `index.html` muestra todos los componentes en un solo lugar con datos de ejemplo.

- Los estilos globales se cargan desde `assets/style.css`.
- La inicialización de los componentes demo (poblar selects, tabla, configurar modales) se hace en `assets/app.js` dentro de `DOMContentLoaded`.
- Para agregar más datos de ejemplo, edita `assets/app.js`.

---

## ✨ Crear un componente nuevo paso a paso

1. Crea una carpeta en `src/components/` con el nombre de tu componente (ej: `src/components/mi-componente/`).

2. Dentro, crea `index.js`:

```js
class MiComponente extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() { this.render(); }
    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${new URL('./style.css', import.meta.url).href}">
            <div>Hola desde MiComponente</div>
        `;
    }
}
customElements.define('mi-componente', MiComponente);

// Prueba aislada: si el body está vacío, se muestra solo
if (document.body.children.length === 0) {
    document.body.appendChild(document.createElement('mi-componente'));
}

export default MiComponente;
```

3. (Opcional) Crea `style.css` en la misma carpeta.

4. Impórtalo en `src/index.js`:

```js
export { default as MiComponente } from './components/mi-componente/index.js';
```

5. Úsalo en `index.html` o `tareas.html`:

```html
<mi-componente></mi-componente>
```

6. Para probarlo solo, abre `src/components/mi-componente/index.js` directo en el navegador.
