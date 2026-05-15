import InputText from './index.js';
import './style.css';

export default {
    title: 'Components/InputText',
    render: ({ label, placeholder, tags }) => {
        const container = document.createElement('div');
        container.style.width = '100%';
        container.style.maxWidth = '320px';
        container.style.margin = '0 auto';
        InputText(container, { label, placeholder, tags });
        return container;
    },
    argTypes: {
        label: { control: 'text' },
        placeholder: { control: 'text' },
        tags: { control: 'object' },
    },
};

export const Default = {
    args: {
        label: 'Tecnología',
        placeholder: 'Agrega una tecnología...',
        tags: ['React.js', 'Node.js'],
    },
};

export const Empty = {
    args: {
        label: 'Tags',
        placeholder: 'Escribe y presiona Enter...',
        tags: [],
    },
};
