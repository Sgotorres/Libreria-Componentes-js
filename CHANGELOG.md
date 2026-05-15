# Changelog

## [1.0.0] - 2026-05-14

### Added
- Componentes: SelectDinamico, InputText, Modal, Gallery, DateRange
- Sistema de build con Vite (ESM + UMD dual output)
- ESLint + Prettier + Husky + lint-staged
- Testing con Vitest + jsdom (13 tests)
- CI/CD con GitHub Actions (lint → format → test → build)
- CSS Custom Properties globales (`src/theme.css`)
- Nomenclatura BEM en todos los componentes
- README con instrucciones de instalación y uso

### Fixed
- DateRange: export ESM en script clásico (envuelto en UMD)
- SelectDinamico: IDs reemplazados por clases, `destroy()` con cleanup
- Modal: acumulación de listeners en tabs
- Gallery: clase BEM corregida (`gallery` → `gl`)
- app.js: duplicación de `const drDemo`, inicialización DateRange

### Changed
- Refactor completo a patrón UMD + ESM dual
- Clases CSS renombradas a BEM (`sd__*`, `md__*`, `it__*`, `gl__*`)
- Scripts cargados como `type="module"`
