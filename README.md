# Librería de Componentes UI

Componentes web nativos con estilo glassmorphism, construidos con Vanilla JS y Shadow DOM.

## Componentes

### 📅 DateRange (`<date-range>`)

Selector de rango de fechas con calendario visual.

| Atributo | Tipo | Default | Descripción |
|---|---|---|---|
| `color-tema` | `string` | `#3ee7b8` | Color de acento del calendario |
| `allow-past` | `"true"` / `"false"` | `"true"` | Permite seleccionar días pasados |
| `allow-future` | `"true"` / `"false"` | `"true"` | Permite seleccionar días futuros |

**Eventos:** `range-changed` — se dispara al seleccionar un día, con `e.detail.start` y `e.detail.end`.

**Métodos:** `.clearRange()` — reinicia la selección.

```html
<date-range color-tema="#ef4444" allow-past="false"></date-range>
```

### 💬 CustomModal (`<custom-modal>`)

Modal configurable con 4 tipos predefinidos y selector de estilo global.

| Atributo | Tipo | Default | Descripción |
|---|---|---|---|
| `type` | `"info"` / `"error"` / `"confirm"` / `"custom"` | `"info"` | Tipo de modal (define icono y color base) |
| `bg-color` | `string` | `rgba(15,23,42,0.85)` | Color de fondo del overlay |
| `color` | `string` | — | Sobrescribe el color del tipo |
| `header-image` | `string` (URL) | — | Imagen en la cabecera del modal |
| `btn-1` | `string` | `"Aceptar"` | Texto del botón primario |
| `btn-2` | `string` | — | Texto del botón secundario |

**Eventos:** `action-1`, `action-2` — se disparan al hacer clic en btn-1 o btn-2.

**Métodos:** `.open()`, `.close()`.

```html
<custom-modal type="error" btn-1="Reintentar" btn-2="Cancelar">
    <p>Ha ocurrido un error.</p>
</custom-modal>
```

#### Personalización global

Define variables CSS en `:root` para aplicar estilo a todos los modales:

```css
:root {
    --modal-accent: #3ee7b8;
    --modal-btn-color: #3b82f6;
    --modal-font-size: 16px;
    --modal-font-family: 'Segoe UI', sans-serif;
}
```

## Desarrollo

```bash
# Servidor de desarrollo
npm run dev
```

Cada componente tiene su propia página de prueba aislada:

| Componente | Ruta |
|---|---|
| DateRange | `src/components/date-range/index.html` |
| Modal | `src/components/modal/index.html` |

Abrir con Live Server o Vite:
- `http://localhost:5173/src/components/date-range/index.html`
- `http://localhost:5173/src/components/modal/index.html`

## Licencia

MIT
