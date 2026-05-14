(function (global, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        global.Modal = factory();
    }
}(typeof window !== 'undefined' ? window : this, function () {
    "use strict";

    function Modal() {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay hidden';
        overlay.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <span class="modal-title"></span>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-tabs">
                    <button class="modal-tab active" data-tab="preview">Vista Previa</button>
                    <button class="modal-tab" data-tab="code">Código</button>
                </div>
                <div class="modal-body">
                    <div class="modal-preview active"></div>
                    <pre class="modal-code"><code></code></pre>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        const modalTitle = overlay.querySelector('.modal-title');
        const modalClose = overlay.querySelector('.modal-close');
        const modalPreview = overlay.querySelector('.modal-preview');
        const modalCode = overlay.querySelector('.modal-code');
        const codeEl = modalCode.querySelector('code');
        const tabs = overlay.querySelectorAll('.modal-tab');

        function close() {
            overlay.classList.add('hidden');
            document.body.style.overflow = '';
        }

        modalClose.addEventListener('click', close);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) close();
        });

        let escapeHandler = (e) => {
            if (e.key === 'Escape') close();
        };

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const target = tab.dataset.tab;
                modalPreview.classList.toggle('active', target === 'preview');
                modalCode.classList.toggle('active', target === 'code');
            });
        });

        async function open(data = {}) {
            modalTitle.textContent = data.title || '';
            modalPreview.innerHTML = data.preview || '<div style="color:rgba(255,255,255,0.4)">Sin preview</div>';

            if (data.source) {
                codeEl.textContent = 'Cargando...';
                try {
                    const [jsRes, cssRes] = await Promise.all([
                        fetch(data.source + 'index.js'),
                        fetch(data.source + 'style.css')
                    ]);
                    const js = await jsRes.text();
                    const css = await cssRes.text();
                    codeEl.textContent = `// ${data.source}index.js\n\n${js}\n\n/* ${data.source}style.css */\n\n${css}`;
                } catch {
                    codeEl.textContent = data.code || '// Error al cargar fuente';
                }
            } else {
                codeEl.textContent = data.code || '';
            }

            tabs[0].click();
            overlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';

            if (data.renderPreview) data.renderPreview(modalPreview);
        }

        document.addEventListener('keydown', escapeHandler);

        return {
            element: overlay,
            open,
            close,
            destroy() {
                document.removeEventListener('keydown', escapeHandler);
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            }
        };
    }

    return Modal;
}));
