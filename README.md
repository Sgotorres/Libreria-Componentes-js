# 📦 Librería de Componentes UI - V1

Librería de 5 componentes web nativos (Web Components) construida con Vanilla JavaScript, HTML y CSS. Este proyecto es escalable, libre de dependencias externas y utiliza el Shadow DOM para encapsular estilos.

## 👥 Equipo y División de Trabajo

Para optimizar el desarrollo, el equipo se ha dividido según sus fortalezas técnicas:

**🎨 Equipo de Diseño y UI (Eduardo y Yox)**
Encargados de la experiencia de usuario, interfaz y estilos.
* Maquetación HTML interna de cada componente.
* Estilización CSS (Variables nativas, animaciones, hover).
* Diseño responsivo (adaptación móvil para la Tabla).
* Estética visual de estados (errores, éxito, disabled).

**⚙️ Equipo de Lógica y Funcionalidad (David y Ángel)**
Encargados de la arquitectura JavaScript y manipulación del DOM.
* Creación de las clases y registro de los Web Components (`customElements.define`).
* Manejo de estado interno y propiedades (`props` / `attributes`).
* Lógica de validaciones (Regex, fechas, rangos).
* Eventos (Listeners, emisión de CustomEvents, filtros de búsqueda).

---

## 🚀 Fases del Proyecto

### Fase 1: Arquitectura y Setup (Programación de Software)
- [x] Inicialización del repositorio y protección (`.gitignore`).
- [x] Definición de la estructura de carpetas.
- [ ] Creación del archivo `index.html` base para pruebas.
- [ ] Definición del sistema de variables CSS globales (temas y colores).

### Fase 2: Desarrollo de Componentes
Cada componente se desarrollará en su propia rama (`feature/nombre-componente`) combinando el trabajo de UI y Lógica:
- [ ] **Input Text:** Validaciones Regex (letras, números, caracteres especiales), límites de longitud y manejo de errores.
- [ ] **Select:** Buscador interno dinámico y selección múltiple toggleable.
- [ ] **Date Range:** Calendario visual interactivo, validación de fechas (futuro/pasado) y resaltado por hover.
- [ ] **Modal:** Sistema de Slots para contenido inyectable, customización de colores y botones de acción configurables.
- [ ] **Data Table:** Sistema de paginación, ordenamiento (alfabético/numérico), barra de búsqueda, scroll horizontal y versión móvil (tarjetas).

### Fase 3: Cierre y QA
- [ ] Integración de todas las ramas en `development`.
- [ ] Pruebas de estrés de los componentes (QA).
- [ ] Documentación técnica de uso y ejemplos de implementación.
- [ ] Despliegue / Entrega final.

---
*Documentación generada para el equipo de QA.*