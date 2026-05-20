/**
 * @fileoverview Punto central de entrada de la librería (Barrel File)
 * @description Aquí se centralizan y registran todos los componentes del Ángel Team.
 */

// 1. Importamos cada componente para activar su registro global en el navegador
import './components/input-text/index.js';
import './components/select-dinamico/index.js';
import './components/date-range/index.js';
import './components/modal/index.js';
import './components/table/index.js';

// 2. Opcional: Si en el futuro quieren exportar clases o funciones específicas
export { default as InputText } from './components/input-text/index.js';
export { default as SelectDinamico } from './components/select-dinamico/index.js';
export { default as DateRange } from './components/date-range/index.js';
export { default as CustomModal } from './components/modal/index.js';
export { default as CustomTable } from './components/table/index.js';