# QA — Guía de pruebas para desarrolladores

Antes de hacer commit, push o publish, verifica que cada componente cumpla los siguientes criterios.

---

## SelectDinámico

- [ ] El buscador filtra opciones mientras escribes
- [ ] Al hacer clic en una opción se crea un tag y se dispara `onSelect`
- [ ] Se pueden seleccionar múltiples opciones (múltiples tags)
- [ ] Al hacer clic en la ✕ de un tag, se elimina y la opción reaparece en la lista
- [ ] Si `data` está vacío, no muestra sugerencias
- [ ] Si se vincula con Gallery via `onSearch`, la galería se filtra en vivo

## InputText

- [ ] Escribir texto + Enter crea un tag
- [ ] Clic en ✕ del tag lo elimina
- [ ] `tipo="numeros"` — solo acepta dígitos
- [ ] `tipo="letras"` — solo acepta letras y espacios
- [ ] `tipo="sin-especiales"` — rechaza caracteres especiales
- [ ] `min` — muestra error si el texto es más corto que el mínimo
- [ ] `max` — no permite escribir más allá del máximo
- [ ] El mensaje de error aparece/desaparece correctamente
- [ ] No se agregan tags duplicados
- [ ] `destroy()` limpia event listeners

## Modal

- [ ] Al abrirse, muestra el título y contenido correcto
- [ ] Las pestañas "Preview" y "Código" funcionan
- [ ] La pestaña "Código" carga el source del componente
- [ ] Clic fuera del modal, Escape o X lo cierran
- [ ] `destroy()` remueve el elemento del DOM

## Gallery

- [ ] Todas las tarjetas se renderizan con icono, nombre, descripción y badge
- [ ] `filter(term)` oculta tarjetas que no coinciden
- [ ] `open(name)` abre el modal con el componente correcto
- [ ] En mobile las tarjetas se adaptan al ancho de pantalla
- [ ] `destroy()` limpia todo

## DateRange

- [ ] Clic en una fecha la marca como inicio
- [ ] Clic en otra fecha marca el rango completo
- [ ] Los botones "7 días" y "30 días" seleccionan el rango correcto
- [ ] "Limpiar" borra la selección
- [ ] `allowPast: false` deshabilita fechas pasadas
- [ ] `allowFuture: false` deshabilita fechas futuras
- [ ] El evento `range-changed` se dispara con `{ start, end }`
- [ ] Cambiar los inputs de fecha manualmente actualiza el calendario
- [ ] Las flechas ◀ ▶ cambian de mes
- [ ] En mobile se ve correctamente
- [ ] `destroy()` limpia el DOM

## Table

- [ ] Se renderizan todas las columnas y filas
- [ ] Clic en encabezado ordena asc/desc con icono ▲/▼
- [ ] Tercer clic quita el ordenamiento
- [ ] Ordena números correctamente (ID, edad)
- [ ] Ordena texto alfabéticamente (nombre, email)
- [ ] Ordena fechas cronológicamente si `type: 'date'`
- [ ] Ordena con función personalizada si `sortFn`
- [ ] El campo "Buscar..." filtra filas en todas las columnas
- [ ] El selector de páginas (5/10/20/50) funciona
- [ ] La navegación ◀ ▶ y números cambia de página
- [ ] Muestra "X-Y de Z" filas correctamente
- [ ] `addable: true` — el botón "+ Agregar" abre el formulario
- [ ] El formulario genera un campo por cada columna
- [ ] Al enviar el formulario, la fila se agrega a la tabla
- [ ] Cancelar/X cierra el formulario sin agregar
- [ ] En <640px la tabla se convierte en tarjetas
- [ ] Si hay muchas columnas, aparece scroll horizontal
- [ ] Sin datos muestra "No hay datos disponibles"
- [ ] `onRowClick` devuelve la fila correcta
- [ ] `addRow(row)` agrega una fila programáticamente
- [ ] `removeRow(predicate)` elimina filas que cumplan el predicado
- [ ] `getData()` devuelve todos los datos actuales
- [ ] `destroy()` remueve la tabla del DOM

## Build & publish

- [ ] `npm run lint` — 0 errores
- [ ] `npm test` — todos los tests pasan
- [ ] `npm run build` — genera `dist/` sin errores
- [ ] `npm publish` — publica solo `dist/` + `package.json` + `README.md`
- [ ] No hay tokens, `.env` o claves en el bundle

## General (página demo)

- [ ] La página carga sin errores en consola (F12)
- [ ] No hay errores 404 (CSS/JS no encontrados)
- [ ] El scroll e interacciones son fluidas
- [ ] Prueba en 375px, 768px y 1440px — todos los componentes se ven bien
- [ ] Prueba en Chrome, Firefox y Edge
- [ ] `Ctrl+Shift+R` (recarga forzada) no rompe nada
