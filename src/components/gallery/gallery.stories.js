import Modal from '../modal/index.js';
import Gallery from './index.js';
import './style.css';
import '../modal/style.css';

window.Modal = Modal;

export default {
    title: 'Components/Gallery',
    render: () => {
        const container = document.createElement('div');
        container.id = 'story-gallery';
        container.style.width = '100%';
        Gallery(container, {
            title: 'Componentes',
            components: [
                { name: 'Input Text', icon: '⌨', color: '#3ee7b8', desc: 'Campo de texto con tags.', badge: 'v1.0' },
                { name: 'Select Dinámico', icon: '▼', color: '#c893f9', desc: 'Buscador con sugerencias.', badge: 'v1.0' },
                { name: 'Modal', icon: '🪟', color: '#ffc832', desc: 'Modal reutilizable.', badge: 'v1.0' },
                { name: 'Date Range', icon: '📅', color: '#29a3ff', desc: 'Calendario con rango.', badge: 'v1.0' },
                { name: 'Table', icon: '⊞', color: '#ff6464', desc: 'Paginación y filtros.', badge: 'Próximamente' },
            ],
        });
        return container;
    },
};

export const Default = {};
