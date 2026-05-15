import SelectDinamico from './index.js';
import './style.css';

export default {
    title: 'Components/SelectDinamico',
    render: ({ data, placeholder }) => {
        const container = document.createElement('div');
        container.style.width = '100%';
        container.style.maxWidth = '550px';
        container.style.margin = '0 auto';
        SelectDinamico(container, { data, placeholder });
        return container;
    },
    argTypes: {
        data: { control: 'object' },
        placeholder: { control: 'text' },
    },
};

export const Default = {
    args: {
        data: ['React', 'Vue', 'Angular', 'Svelte', 'Solid'],
        placeholder: 'Buscar framework...',
    },
};

export const FewItems = {
    args: {
        data: ['Uno', 'Dos'],
        placeholder: 'Elige...',
    },
};

export const Empty = {
    args: {
        data: [],
        placeholder: 'Sin opciones...',
    },
};
