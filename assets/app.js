document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Inicializar Selects de la Barra Lateral ---
    const selectRoles = document.getElementById('select-roles');
    if (selectRoles) {
        selectRoles.opciones = ['Administrador', 'Auditor QA', 'Desarrollador Frontend', 'Arquitecto Cloud', 'Diseñador UI', 'DevOps'];
    }

    const selectEstado = document.getElementById('select-estado');
    if (selectEstado) {
        selectEstado.opciones = ['Activo', 'En Mantenimiento', 'Caído (Offline)'];
    }

    // --- 2. Inicializar Select dentro del Modal ---
    const selectPrioridad = document.getElementById('select-prioridad');
    if (selectPrioridad) {
        selectPrioridad.opciones = ['Alta (Crítica)', 'Media', 'Baja'];
    }

    // --- 3. Inicializar Tabla Maestra ---
    const tabla = document.getElementById('tabla-maestra');
    if (tabla) {
        tabla.columns = [
            { key: 'ticket', label: 'Ticket', type: 'number' },
            { key: 'asunto', label: 'Asunto / Tarea', type: 'string' },
            { key: 'fecha', label: 'Fecha Límite', type: 'date' },
            { key: 'prioridad', label: 'Prioridad', type: 'string' }
        ];
        tabla.data = [
            { ticket: 1045, asunto: 'Migración a Web Components', fecha: '2026-06-15', prioridad: 'Alta' },
            { ticket: 1046, asunto: 'Optimización de assets CSS', fecha: '2026-05-22', prioridad: 'Media' },
            { ticket: 1047, asunto: 'Pruebas unitarias de Input', fecha: '2026-05-25', prioridad: 'Baja' },
            { ticket: 1048, asunto: 'Reunión de Arquitectura', fecha: '2026-05-21', prioridad: 'Alta' },
            { ticket: 1049, asunto: 'Despliegue a Producción', fecha: '2026-07-01', prioridad: 'Crítica' },
            { ticket: 1050, asunto: 'Actualización de Readme', fecha: '2026-05-30', prioridad: 'Baja' },
            { ticket: 1051, asunto: 'Revisión de QA (Rubrica)', fecha: '2026-06-05', prioridad: 'Media' }
        ];
    }

    // --- 4. Conexión de Botones con Modales ---
    const modalsData = [
        { id: 'modal-info', type: 'info', btn1: 'Entendido', html: '<h2 style="margin-top:0;color:#3b82f6;">Informaci&oacute;n del Sistema</h2><p style="color:#cbd5e1;">Actualizaci&oacute;n completada correctamente.</p>' },
        { id: 'modal-error', type: 'error', btn1: 'Reintentar', btn2: 'Cancelar', html: '<h2 style="margin-top:0;color:#ef4444;">Error de Conexi&oacute;n</h2><p style="color:#cbd5e1;">No se pudo conectar con el servidor.</p>' },
        { id: 'modal-confirm', type: 'confirm', btn1: 'Eliminar', btn2: 'Cancelar', html: '<h2 style="margin-top:0;color:#eab308;">Confirmar Eliminaci&oacute;n</h2><p style="color:#cbd5e1;">¿Est&aacute;s seguro de eliminar este elemento?</p>' },
        { id: 'modal-custom', type: 'custom', btn1: 'Guardar', btn2: 'Cancelar', headerImg: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80', html: '<h3 style="color:#8b5cf6;margin-top:0;">Nuevo Producto</h3><div style="display:flex;flex-direction:column;gap:10px;text-align:left;"><input type="text" placeholder="Nombre..." style="padding:10px;border-radius:5px;border:none;"><input type="number" placeholder="Precio..." style="padding:10px;border-radius:5px;border:none;"></div>' },
        { id: 'modal-settings', type: 'custom', btn1: 'Cerrar', html: '<h3 style="margin:0 0 20px 0;color:#3ee7b8;">Personalizar Estilo</h3><div style="display:flex;flex-direction:column;gap:16px;text-align:left;"><label style="display:flex;justify-content:space-between;align-items:center;color:#cbd5e1;"><span>Color Acento</span><input type="color" id="set-accent" value="#3ee7b8" style="width:50px;height:36px;border:none;border-radius:6px;cursor:pointer;padding:0;"></label><label style="display:flex;justify-content:space-between;align-items:center;color:#cbd5e1;"><span>Color Botones</span><input type="color" id="set-btn-color" value="#3b82f6" style="width:50px;height:36px;border:none;border-radius:6px;cursor:pointer;padding:0;"></label><label style="display:flex;justify-content:space-between;align-items:center;color:#cbd5e1;"><span>Tama&ntilde;o Letra</span><input type="range" id="set-font-size" min="12" max="22" value="15" style="width:120px;"><span id="font-size-label">15px</span></label><label style="display:flex;justify-content:space-between;align-items:center;color:#cbd5e1;"><span>Fuente</span><select id="set-font-family" style="padding:6px 10px;border-radius:6px;background:#1e293b;color:#f8fafc;border:1px solid rgba(255,255,255,0.1);width:160px;"><option value="system-ui, sans-serif">system-ui</option><option value="Arial, sans-serif">Arial</option><option value="\'Segoe UI\', sans-serif">Segoe UI</option><option value="\'Times New Roman\', serif">Times New Roman</option><option value="Georgia, serif">Georgia</option><option value="\'Courier New\', monospace">Courier New</option></select></label></div>' },
    ];

    modalsData.forEach(m => {
        const el = document.createElement('custom-modal');
        el.id = m.id;
        el.setAttribute('type', m.type);
        el.setAttribute('btn-1', m.btn1);
        if (m.btn2) el.setAttribute('btn-2', m.btn2);
        if (m.headerImg) el.setAttribute('header-image', m.headerImg);
        el.innerHTML = m.html;
        document.body.appendChild(el);
    });

    function openModal(id) {
        const el = document.getElementById(id);
        if (el && typeof el.open === 'function') el.open();
    }
    document.getElementById('btn-info').addEventListener('click', () => openModal('modal-info'));
    document.getElementById('btn-error').addEventListener('click', () => openModal('modal-error'));
    document.getElementById('btn-confirm').addEventListener('click', () => openModal('modal-confirm'));
    document.getElementById('btn-custom').addEventListener('click', () => openModal('modal-custom'));
    document.getElementById('btn-settings').addEventListener('click', () => openModal('modal-settings'));

    // Settings controls
    setTimeout(() => {
        function apply(key, value) { document.documentElement.style.setProperty(key, value); }
        const sa = document.getElementById('set-accent');
        const sbc = document.getElementById('set-btn-color');
        const sfs = document.getElementById('set-font-size');
        const sfl = document.getElementById('font-size-label');
        const sff = document.getElementById('set-font-family');
        if (sa) sa.addEventListener('input', (e) => apply('--modal-accent', e.target.value));
        if (sbc) sbc.addEventListener('input', (e) => apply('--modal-btn-color', e.target.value));
        if (sfs) sfs.addEventListener('input', (e) => {
            const v = e.target.value + 'px';
            if (sfl) sfl.textContent = v;
            apply('--modal-font-size', v);
        });
        if (sff) sff.addEventListener('change', (e) => apply('--modal-font-family', e.target.value));
    }, 0);
});
