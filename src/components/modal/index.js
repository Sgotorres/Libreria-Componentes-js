/**
 * @returns {{ element: HTMLElement, open: (data: { title?: string, preview?: string, code?: string, source?: string, renderPreview?: (container: HTMLElement) => void }) => Promise<void>, close: () => void, destroy: () => void }}
 */
function Modal() {
    const overlay = document.createElement('div');
    overlay.className = 'md hidden';
    overlay.innerHTML = `
        <div class="md__content">
            <div class="md__header">
                <span class="md__title"></span>
                <span class="md__close">&times;</span>
            </div>
            <div class="md__tabs">
                <button class="md__tab active" data-tab="preview">Vista Previa</button>
                <button class="md__tab" data-tab="code">Código</button>
            </div>
            <div class="md__body">
                <div class="md__preview active"></div>
                <pre class="md__code"><code></code></pre>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    const modalTitle = overlay.querySelector('.md__title');
    const modalClose = overlay.querySelector('.md__close');
    const modalPreview = overlay.querySelector('.md__preview');
    const modalCode = overlay.querySelector('.md__code');
    const codeEl = modalCode.querySelector('code');
    const tabs = overlay.querySelectorAll('.md__tab');

    function close() {
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
    });

    const escapeHandler = (e) => {
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

(function (global, factory) {
    try {
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = factory();
            return;
        }
    } catch {}
    global.Modal = factory();
}(typeof window !== 'undefined' ? window : this, function () {
    return Modal;
}));

export default Modal;
