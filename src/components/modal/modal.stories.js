import Modal from './index.js';
import './style.css';

export default {
    title: 'Components/Modal',
    render: () => {
        const modal = Modal();
        const btn = document.createElement('button');
        btn.textContent = 'Abrir Modal';
        btn.style.cssText = `
            padding: 12px 24px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.1);
            background: rgba(255,255,255,0.06); color: #fff; cursor: pointer; font-size: 14px;
        `;
        btn.onclick = () => modal.open({
            title: 'Componente Modal',
            preview: '<p style="color:rgba(255,255,255,0.7);font-size:14px">Contenido del preview</p>',
            code: '// Código de ejemplo\nconsole.log("Hello from Modal");',
        });
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.justifyContent = 'center';
        wrapper.style.padding = '40px';
        wrapper.appendChild(btn);
        return wrapper;
    },
};

export const Default = {};
