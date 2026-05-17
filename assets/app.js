function fmtDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

function buildDateRangePreview() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const monthName = today.toLocaleDateString('es', { month: 'long', year: 'numeric' });
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();

    let daysHTML = '';
    const rangeStart = 1;
    const rangeEnd = 14;

    for (let i = firstDay - 1; i >= 0; i--) {
        daysHTML += `<span style="color:rgba(255,255,255,0.12);font-size:12px;text-align:center;padding:6px 0">${daysInPrev - i}</span>`;
    }
    for (let i = 1; i <= daysInMonth; i++) {
        let style = 'color:rgba(255,255,255,0.6);font-size:12px;text-align:center;padding:6px 0';
        if (i === rangeStart) style += ';background:rgba(41,163,255,0.2);color:#fff;border-radius:10px 0 0 10px';
        else if (i === rangeEnd) style += ';background:#29a3ff;color:#fff;border-radius:0 10px 10px 0';
        else if (i > rangeStart && i < rangeEnd) style += ';background:rgba(41,163,255,0.2);color:#fff';
        daysHTML += `<span style="${style}">${i}</span>`;
    }

    return `<div style="display:flex;flex-direction:column;align-items:center;gap:16px;width:100%">
        <div style="background:rgba(255,255,255,0.05);border-radius:20px;padding:20px;width:100%;max-width:340px;box-sizing:border-box">
            <div style="display:flex;gap:10px;margin-bottom:12px">
                <div style="flex:1;display:flex;flex-direction:column;gap:4px">
                    <label style="color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase">Desde</label>
                    <input type="date" value="${fmtDate(today)}" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:10px 12px;color:#fff;font-size:13px;outline:none;font-family:inherit;width:100%;box-sizing:border-box">
                </div>
                <div style="flex:1;display:flex;flex-direction:column;gap:4px">
                    <label style="color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase">Hasta</label>
                    <input type="date" value="${fmtDate(new Date(today.getTime() + 6 * 86400000))}" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:10px 12px;color:#fff;font-size:13px;outline:none;font-family:inherit;width:100%;box-sizing:border-box">
                </div>
            </div>
            <div style="background:rgba(10,12,18,0.95);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:16px">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
                    <span style="color:rgba(255,255,255,0.4);font-size:12px">◀</span>
                    <span style="color:#fff;font-size:14px;font-weight:500">${monthName}</span>
                    <span style="color:rgba(255,255,255,0.4);font-size:12px">▶</span>
                </div>
                <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;text-align:center;margin-bottom:4px">
                    ${['Do','Lu','Ma','Mi','Ju','Vi','Sá'].map(d => `<span style="color:rgba(255,255,255,0.25);font-size:10px;padding:4px 0">${d}</span>`).join('')}
                </div>
                <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">
                    ${daysHTML}
                </div>
            </div>
            <div style="display:flex;gap:8px;margin-top:10px;justify-content:center">
                <span style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:6px 14px;color:rgba(255,255,255,0.5);font-size:11px">7 días</span>
                <span style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:6px 14px;color:rgba(255,255,255,0.5);font-size:11px">30 días</span>
                <span style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:6px 14px;color:rgba(255,255,255,0.5);font-size:11px">Limpiar</span>
            </div>
        </div>
    </div>`;
}

const componentData = [
    {
        name: "Input Text",
        icon: "⌨",
        color: "#3ee7b8",
        desc: "Campo de texto con estilos glassmorphism y etiquetas seleccionables.",
        badge: "v1.0",
        preview: `
            <div style="background:rgba(255,255,255,0.05);border-radius:20px;padding:24px;width:100%;max-width:320px;display:flex;flex-direction:column;gap:12px">
                <label style="color:rgba(255,255,255,0.5);font-size:12px;letter-spacing:1px;text-transform:uppercase">Etiqueta</label>
                <input type="text" placeholder="Escribe algo..." style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:12px 16px;color:#fff;font-size:14px;outline:none">
                <div style="display:flex;gap:8px;flex-wrap:wrap">
                    <span style="background:rgba(62,231,184,0.2);color:#fff;padding:6px 14px;border-radius:20px;font-size:12px;border:1px solid rgba(62,231,184,0.4)">tag ✕</span>
                    <span style="background:rgba(62,231,184,0.2);color:#fff;padding:6px 14px;border-radius:20px;font-size:12px;border:1px solid rgba(62,231,184,0.4)">otro ✕</span>
                </div>
            </div>
        `,
        source: "src/components/input-text/"
    },
    {
        name: "Select Dinámico",
        icon: "▼",
        color: "#c893f9",
        desc: "Buscador con sugerencias, tags y selección multiple — el mismo que ves arriba.",
        badge: "v1.0",
        preview: `
            <div style="background:rgba(255,255,255,0.05);border-radius:20px;padding:16px 20px;width:100%;max-width:340px;box-sizing:border-box;display:flex;flex-direction:column;gap:10px">
                <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center">
                    <span style="background:rgba(62,231,184,0.2);color:#fff;padding:4px 12px;border-radius:16px;font-size:12px;border:1px solid rgba(62,231,184,0.4)">React ✕</span>
                    <span style="background:rgba(62,231,184,0.2);color:#fff;padding:4px 12px;border-radius:16px;font-size:12px;border:1px solid rgba(62,231,184,0.4)">Vue ✕</span>
                    <input type="text" placeholder="Buscar..." style="border:none;outline:none;background:transparent;color:#fff;flex:1;min-width:100px;padding:6px 0;font-size:14px;font-family:inherit">
                </div>
                <div style="background:rgba(10,12,15,0.5);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:8px;display:flex;flex-direction:column;gap:2px">
                    <div style="color:rgba(255,255,255,0.7);padding:8px 14px;border-radius:12px;font-size:13px;background:rgba(200,147,249,0.1)">Select Dinámico</div>
                    <div style="color:rgba(255,255,255,0.4);padding:8px 14px;border-radius:12px;font-size:13px">Date Range</div>
                    <div style="color:rgba(255,255,255,0.4);padding:8px 14px;border-radius:12px;font-size:13px">Modal</div>
                </div>
            </div>
        `,
        source: "src/components/select-dinamico/"
    },
    {
        name: "Modal",
        icon: "🪟",
        color: "#ffc832",
        desc: "Modal reutilizable con preview, código y carga dinámica de source.",
        badge: "v1.0",
        preview: `
            <div style="display:flex;flex-direction:column;align-items:center;gap:16px;width:100%">
                <div style="position:relative;width:100%;max-width:340px;border-radius:20px;overflow:hidden;background:rgba(0,0,0,0.3);padding:20px">
                    <div style="position:absolute;inset:0;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px)"></div>
                    <div style="position:relative;background:linear-gradient(135deg,rgba(20,22,28,0.98),rgba(10,12,18,0.98));border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:20px;box-shadow:0 10px 30px rgba(0,0,0,0.5)">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                            <span style="color:#fff;font-size:15px;font-weight:600">Título Modal</span>
                            <span style="color:rgba(255,255,255,0.3);font-size:20px;cursor:pointer">&times;</span>
                        </div>
                        <div style="display:flex;gap:4px;margin-bottom:12px">
                            <span style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.4);padding:6px 16px;border-radius:10px;font-size:12px">Preview</span>
                            <span style="color:rgba(255,255,255,0.2);padding:6px 16px;border-radius:10px;font-size:12px">Código</span>
                        </div>
                        <div style="color:rgba(255,255,255,0.5);font-size:13px;line-height:1.5;text-align:center;padding:12px 0">
                            Contenido del modal con preview y código
                        </div>
                    </div>
                </div>
            </div>
        `,
        source: "src/components/modal/"
    },
    {
        name: "Date Range",
        icon: "📅",
        color: "#29a3ff",
        desc: "Calendario con rango de fechas, colores personalizados y validaciones.",
        badge: "v1.0",
        preview: buildDateRangePreview(),
        source: "src/components/date-range/"
    },
    {
        name: "Table",
        icon: "⊞",
        color: "#ff6464",
        desc: "Paginación, ordenamiento, filtros, buscador, scroll horizontal, responsive.",
        badge: "v1.0",
        preview: `
            <div style="background:rgba(255,255,255,0.05);border-radius:20px;padding:16px;width:100%;max-width:500px;box-sizing:border-box">
                <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:10px 14px;margin-bottom:12px;color:rgba(255,255,255,0.3);font-size:13px">Buscar...</div>
                <table style="width:100%;border-collapse:collapse;min-width:400px">
                    <thead><tr>${['Nombre','Email','Rol'].map(h => `<th style="text-align:left;padding:10px 14px;font-size:11px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid rgba(255,255,255,0.08)">${h}</th>`).join('')}</tr></thead>
                    <tbody>
                        ${[['Ana García','ana@mail.com','Admin'],['Carlos Ruiz','carlos@mail.com','Editor'],['Lucía Pérez','lucia@mail.com','Usuario']].map((r, i) => `<tr style="background:${i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'}">
                            ${r.map(c => `<td style="padding:10px 14px;font-size:13px;color:rgba(255,255,255,0.7);border-bottom:1px solid rgba(255,255,255,0.04)">${c}</td>`).join('')}
                        </tr>`).join('')}
                    </tbody>
                </table>
                <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-top:12px">
                    <span style="color:rgba(255,255,255,0.3);font-size:11px">Filas: 5</span>
                    <span style="color:rgba(255,255,255,0.3);font-size:11px">1-3 de 3</span>
                    <div style="display:flex;gap:4px">${['◀','1','▶'].map(b => `<span style="background:${b === '1' ? '#ff6464' : 'rgba(255,255,255,0.06)'};border:1px solid ${b === '1' ? '#ff6464' : 'rgba(255,255,255,0.08)'};border-radius:8px;padding:4px 10px;color:${b === '1' ? '#0a0c12' : 'rgba(255,255,255,0.5)'};font-size:11px;cursor:${b === '1' ? 'default' : 'pointer'}">${b}</span>`).join('')}</div>
                </div>
            </div>
        `
    }
];

const componentNames = componentData.map(c => c.name);
const galleryContainer = document.getElementById('gallery-container');
const gallery = galleryContainer ? Gallery(galleryContainer, {
    title: 'Componentes',
    components: componentData
}) : null;

const searchContainer = document.getElementById('search-container');
let searchInstance = null;
if (searchContainer && gallery) {
    searchInstance = SelectDinamico(searchContainer, {
        data: componentNames,
        placeholder: 'Buscar componente...',
        onSearch: (term) => gallery.filter(term),
        onSelect: (item) => gallery.open(item)
    });
}

const tableContainer = document.getElementById('table-container');
let tableInstance = null;
if (tableContainer) {
    const now = new Date();
    function daysAgo(n) { const d = new Date(now); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10); }
    tableInstance = Table(tableContainer, {
        ancho: '100%',
        largo: 'auto',
        columns: [
            { key: 'id', label: 'ID', sortable: true, width: '70px' },
            { key: 'name', label: 'Nombre', sortable: true },
            { key: 'email', label: 'Email', sortable: true },
            { key: 'role', label: 'Rol', sortable: true },
            { key: 'signup', label: 'Registro', sortable: true, type: 'date' },
            { key: 'score', label: 'Puntaje', sortable: true, sortFn: (a, b) => b - a },
        ],
        data: [
            { id: 104, name: 'Ana García', email: 'ana@mail.com', role: 'Admin', signup: daysAgo(120), score: 95 },
            { id: 101, name: 'Carlos Ruiz', email: 'carlos@mail.com', role: 'Editor', signup: daysAgo(45), score: 78 },
            { id: 108, name: 'Lucía Pérez', email: 'lucia@mail.com', role: 'Usuario', signup: daysAgo(200), score: 82 },
            { id: 103, name: 'Miguel Torres', email: 'miguel@mail.com', role: 'Admin', signup: daysAgo(15), score: 91 },
            { id: 106, name: 'Sofía López', email: 'sofia@mail.com', role: 'Editor', signup: daysAgo(90), score: 88 },
            { id: 110, name: 'Diego Gómez', email: 'diego@mail.com', role: 'Usuario', signup: daysAgo(5), score: 64 },
            { id: 102, name: 'Valentina Díaz', email: 'valentina@mail.com', role: 'Usuario', signup: daysAgo(365), score: 73 },
            { id: 105, name: 'Fernando Castro', email: 'fernando@mail.com', role: 'Editor', signup: daysAgo(30), score: 97 },
            { id: 109, name: 'Isabella Ríos', email: 'isabella@mail.com', role: 'Admin', signup: daysAgo(60), score: 100 },
            { id: 112, name: 'Javier Mendoza', email: 'javier@mail.com', role: 'Usuario', signup: daysAgo(180), score: 55 },
            { id: 107, name: 'Camila Ortiz', email: 'camila@mail.com', role: 'Editor', signup: daysAgo(10), score: 89 },
            { id: 111, name: 'Andrés Vega', email: 'andres@mail.com', role: 'Admin', signup: daysAgo(730), score: 92 },
        ],
        pageSize: 5,
        addable: true,
        onRowClick: (row) => console.log('Fila:', row),
    });
}

const drDemo = document.getElementById('mi-calendario');
if (drDemo) {
    drDemo.configure({
        allowFuture: true,
        allowPast: true,
        rangeColor: '#29a3ff',
        startDate: new Date(),
        endDate: (() => {
            const d = new Date();
            d.setDate(d.getDate() + 7);
            return d;
        })()
    });
    drDemo.addEventListener('range-changed', (e) => console.log('Rango:', e.detail.start, e.detail.end));
}

window.addEventListener('beforeunload', () => {
    if (searchInstance) searchInstance.destroy();
    if (gallery) gallery.destroy();
    if (tableInstance) tableInstance.destroy();
});