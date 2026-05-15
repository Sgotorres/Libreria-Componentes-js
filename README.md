# Librería de Componentes UI

Librería de componentes web nativos con estilo glassmorphism, construida con Vanilla JS.

## Instalación

```bash
npm install libreria-componentes-js
```

## Uso

### ESM (moderno)

```js
import { SelectDinamico, DateRange, InputText, Modal, Gallery } from 'libreria-componentes-js';

const search = SelectDinamico(document.getElementById('container'), {
    data: ['React', 'Vue', 'Angular'],
    placeholder: 'Buscar...',
    onSelect: (item) => console.log(item),
    onSearch: (term) => console.log(term),
});
```

### UMD (script tag)

```html
<script src="https://cdn.example.com/libreria-componentes.umd.js"></script>
<script>
    SelectDinamico(document.getElementById('container'), {
        data: ['React', 'Vue'],
        placeholder: 'Buscar...',
    });
</script>
```

### Custom Element (DateRange)

```html
<custom-date-range id="calendario"></custom-date-range>

<script>
    const el = document.getElementById('calendario');
    el.configure({
        allowFuture: true,
        allowPast: true,
        rangeColor: '#29a3ff',
        startDate: new Date(),
    });
    el.addEventListener('range-changed', (e) => {
        console.log(e.detail.start, e.detail.end);
    });
</script>
```

## Componentes

| Componente     | Tipo            | API principal                         |
|----------------|-----------------|---------------------------------------|
| SelectDinamico | Factory function| `getSelected()`, `addItem()`, `destroy()` |
| InputText      | Factory function| `getTags()`, `addTag()`, `clearTags()`   |
| DateRange      | Web Component   | `configure()`, evento `range-changed`    |
| Modal          | Factory function| `open()`, `close()`, `destroy()`         |
| Gallery        | Factory function| `filter()`, `open()`, `destroy()`        |

## Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Lint
npm run lint

# Pruebas
npm run test

# Build
npm run build
```

## Build

Genera `dist/libreria-componentes.umd.js` y `dist/libreria-componentes.es.js`.

```bash
npm run build
```

## Licencia

MIT
