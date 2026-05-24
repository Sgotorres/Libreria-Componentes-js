document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Inicialización de Componentes Base ---
    const selCategoria = document.getElementById('sel-categoria');
    if (selCategoria) {
        selCategoria.opciones = ['Hogar', 'Viajes', 'Escuela', 'Desarrollo de Software'];
    }

    const selEstado = document.getElementById('sel-estado');
    if (selEstado) {
        selEstado.opciones = ['Activa', 'En Progreso', 'Completada'];
    }

    // Configuración de la Tabla Maestra
    const tabla = document.getElementById('tabla-tareas');
    let listaTareas = []; // Estado global de nuestras tareas
    
    if (tabla) {
        tabla.columns = [
            { key: 'id', label: 'ID', type: 'number' },
            { key: 'usuario', label: 'Responsable', type: 'string' },
            { key: 'categoria', label: 'Contexto', type: 'string' },
            { key: 'nombre', label: 'Tarea', type: 'string' },
            { key: 'fecha', label: 'Fecha Límite', type: 'date' },
            { key: 'estado', label: 'Estado', type: 'string' }
        ];
        tabla.data = listaTareas;
    }

    // --- 2. Gestión de Estados Temporales ---
    let fechaSeleccionada = 'No definida';
    const calFecha = document.getElementById('cal-fecha');
    
    // Escuchamos el evento personalizado que emite tu componente DateRange
    if (calFecha) {
        calFecha.addEventListener('range-changed', (e) => {
            if (e.detail.start) {
                fechaSeleccionada = e.detail.start.toLocaleDateString('es-ES');
            }
        });
    }

    // --- 3. Flujo del Modal ---
    const modalTarea = document.getElementById('modal-tarea');
    const btnAbrirModal = document.getElementById('btn-abrir-modal');

    // Botón para abrir el paso final de la creación
    if (btnAbrirModal && modalTarea) {
        btnAbrirModal.addEventListener('click', () => {
            modalTarea.open();
        });
    }

    // Función auxiliar para leer inputs encapsulados en tu Shadow DOM
    const obtenerValorInput = (id) => {
        const componente = document.getElementById(id);
        if (componente && componente.shadowRoot) {
            const inputInterno = componente.shadowRoot.querySelector('input');
            return inputInterno ? inputInterno.value : '';
        }
        return '';
    };

    // --- 4. Acción Final: Guardar y Enviar a la Tabla ---
    let contadorIds = 1;
    
    if (modalTarea) {
        // Tu modal emite 'action-1' cuando se presiona el botón primario
        modalTarea.addEventListener('action-1', () => {
            
            // Recolectar datos de la barra lateral (Pasos 1, 2 y 3)
            const usuario = obtenerValorInput('in-usuario') || 'Sin asignar';
            const categoria = selCategoria.seleccionados.length > 0 ? selCategoria.seleccionados[0] : 'General';
            
            // Recolectar datos del Modal (Paso 4)
            const nombreTarea = obtenerValorInput('in-nombre-tarea') || 'Tarea sin título';
            const estado = selEstado.seleccionados.length > 0 ? selEstado.seleccionados[0] : 'Activa';

            // Armar el nuevo registro
            const nuevaAsignacion = {
                id: contadorIds++,
                usuario: usuario,
                categoria: categoria,
                nombre: nombreTarea,
                fecha: fechaSeleccionada,
                estado: estado
            };

            // Inyectar en el estado global y actualizar la tabla
            listaTareas.push(nuevaAsignacion);
            
            // Al hacer spread [...], forzamos que el setter 'set data(val)' de la tabla se dispare y renderice
            tabla.data = [...listaTareas]; 

            // (Opcional) Limpiar los inputs accediendo al shadow root si deseas que queden en blanco para la siguiente tarea
            // document.getElementById('in-nombre-tarea').shadowRoot.querySelector('input').value = '';
        });
    }
});