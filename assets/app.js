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
        preview: `
            <div style="display:flex;flex-direction:column;align-items:center;gap:16px;width:100%">
                <div style="background:rgba(255,255,255,0.05);border-radius:20px;padding:20px;width:100%;max-width:340px;box-sizing:border-box">
                    <div style="display:flex;gap:10px;margin-bottom:12px">
                        <div style="flex:1;display:flex;flex-direction:column;gap:4px">
                            <label style="color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase">Desde</label>
                            <input type="date" value="2026-05-01" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:10px 12px;color:#fff;font-size:13px;outline:none;font-family:inherit;width:100%;box-sizing:border-box">
                        </div>
                        <div style="flex:1;display:flex;flex-direction:column;gap:4px">
                            <label style="color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase">Hasta</label>
                            <input type="date" value="2026-05-14" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:10px 12px;color:#fff;font-size:13px;outline:none;font-family:inherit;width:100%;box-sizing:border-box">
                        </div>
                    </div>
                    <div style="background:rgba(10,12,18,0.95);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:16px">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
                            <span style="color:rgba(255,255,255,0.4);font-size:12px;cursor:pointer">◀</span>
                            <span style="color:#fff;font-size:14px;font-weight:500">mayo 2026</span>
                            <span style="color:rgba(255,255,255,0.4);font-size:12px;cursor:pointer">▶</span>
                        </div>
                        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;text-align:center;margin-bottom:4px">
                            <span style="color:rgba(255,255,255,0.25);font-size:10px;padding:4px 0">Do</span>
                            <span style="color:rgba(255,255,255,0.25);font-size:10px;padding:4px 0">Lu</span>
                            <span style="color:rgba(255,255,255,0.25);font-size:10px;padding:4px 0">Ma</span>
                            <span style="color:rgba(255,255,255,0.25);font-size:10px;padding:4px 0">Mi</span>
                            <span style="color:rgba(255,255,255,0.25);font-size:10px;padding:4px 0">Ju</span>
                            <span style="color:rgba(255,255,255,0.25);font-size:10px;padding:4px 0">Vi</span>
                            <span style="color:rgba(255,255,255,0.25);font-size:10px;padding:4px 0">Sá</span>
                        </div>
                        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">
                            <span style="color:rgba(255,255,255,0.15);font-size:12px;text-align:center;padding:6px 0">27</span>
                            <span style="color:rgba(255,255,255,0.15);font-size:12px;text-align:center;padding:6px 0">28</span>
                            <span style="color:rgba(255,255,255,0.15);font-size:12px;text-align:center;padding:6px 0">29</span>
                            <span style="color:rgba(255,255,255,0.15);font-size:12px;text-align:center;padding:6px 0">30</span>
                            <span style="background:rgba(41,163,255,0.2);color:#fff;font-size:12px;text-align:center;padding:6px 0;border-radius:10px 0 0 10px">1</span>
                            <span style="background:rgba(41,163,255,0.2);color:#fff;font-size:12px;text-align:center;padding:6px 0">2</span>
                            <span style="background:rgba(41,163,255,0.2);color:#fff;font-size:12px;text-align:center;padding:6px 0">3</span>
                            <span style="background:rgba(41,163,255,0.2);color:#fff;font-size:12px;text-align:center;padding:6px 0">4</span>
                            <span style="background:rgba(41,163,255,0.2);color:#fff;font-size:12px;text-align:center;padding:6px 0">5</span>
                            <span style="background:rgba(41,163,255,0.2);color:#fff;font-size:12px;text-align:center;padding:6px 0">6</span>
                            <span style="background:rgba(41,163,255,0.2);color:#fff;font-size:12px;text-align:center;padding:6px 0">7</span>
                            <span style="background:rgba(41,163,255,0.2);color:#fff;font-size:12px;text-align:center;padding:6px 0">8</span>
                            <span style="background:rgba(41,163,255,0.2);color:#fff;font-size:12px;text-align:center;padding:6px 0">9</span>
                            <span style="background:rgba(41,163,255,0.2);color:#fff;font-size:12px;text-align:center;padding:6px 0">10</span>
                            <span style="background:rgba(41,163,255,0.2);color:#fff;font-size:12px;text-align:center;padding:6px 0">11</span>
                            <span style="background:rgba(41,163,255,0.2);color:#fff;font-size:12px;text-align:center;padding:6px 0">12</span>
                            <span style="background:rgba(41,163,255,0.2);color:#fff;font-size:12px;text-align:center;padding:6px 0">13</span>
                            <span style="background:#29a3ff;color:#fff;font-size:12px;text-align:center;padding:6px 0;border-radius:0 10px 10px 0">14</span>
                            <span style="color:rgba(255,255,255,0.5);font-size:12px;text-align:center;padding:6px 0">15</span>
                            <span style="color:rgba(255,255,255,0.5);font-size:12px;text-align:center;padding:6px 0">16</span>
                        </div>
                    </div>
                    <div style="display:flex;gap:8px;margin-top:10px">
                        <span style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:6px 14px;color:rgba(255,255,255,0.5);font-size:11px;cursor:pointer">7 días</span>
                        <span style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:6px 14px;color:rgba(255,255,255,0.5);font-size:11px;cursor:pointer">30 días</span>
                        <span style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:6px 14px;color:rgba(255,255,255,0.5);font-size:11px;cursor:pointer">Limpiar</span>
                    </div>
                </div>
            </div>
        `,
        source: "src/components/date-range/"
    },
    {
        name: "Table",
        icon: "⊞",
        color: "#ff6464",
        desc: "Paginación, ordenamiento, filtros, buscador, scroll horizontal, responsive.",
        badge: "Próximamente",
        preview: '<div style="color:rgba(255,255,255,0.4);font-size:14px">🚧 En desarrollo</div>',
        code: "// Próximamente"
    }
];

const componentNames = componentData.map(c => c.name);

const gallery = Gallery(document.getElementById('gallery-container'), {
    title: 'Componentes',
    components: componentData
});

const searchContainer = document.getElementById('search-container');
if (searchContainer) {
    SelectDinamico(searchContainer, {
        data: componentNames,
        placeholder: 'Buscar componente...',
        onSearch: (term) => gallery.filter(term),
        onSelect: (item) => gallery.open(item)
    });
}

const inputDemo = document.getElementById('input-text-demo');
if (inputDemo) {
    InputText(inputDemo, {
        label: 'Tecnología',
        placeholder: 'Agrega una tecnología...',
        tags: ['React.js', 'Node.js']
    });
}

const drDemo = document.getElementById('date-range-demo');
if (drDemo) {
    DateRange(drDemo, {
        allowFuture: true,
        allowPast: true,
        rangeColor: '#29a3ff',
        startDate: new Date(),
        endDate: (() => { const d = new Date(); d.setDate(d.getDate() + 7); return d; })(),
        onChange: (start, end) => console.log('Rango:', start, end)
    });
}
