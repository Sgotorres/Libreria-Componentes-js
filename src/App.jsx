import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// 1. Importamos tu componente migrado
import InputText from './components/input-text/InputText.jsx';
import DateRange from './components/date-range/DateRange.jsx';
import Modal from './components/modal/Modal.jsx';
import SelectDinamico from './components/select-dinamico/SelectDinamico.jsx';
import Table from './components/table/Table.jsx';
import Toast from './components/toast/Toast.jsx';
import Carrusel from './components/carrusel/Carrusel.jsx';

// 2. Creamos una "Página" para mostrar el Input Text
// Encuentra la función InputTextDemo en tu App.jsx y cámbiala por esto:
function InputTextDemo() {
  return (
    <div>
      <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Custom Input</h2>
      <p>Componente avanzado con reglas de validación y estilos dinámicos.</p>
      
      {/* Esta es tu "Sandbox" traducida a React */}
      <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', padding: '40px', borderRadius: '20px', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '25px', color: 'white' }}>
        
        <div>
          <span style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '8px', display: 'block' }}>
            1. Solo Números (Mín 3, Máx 8)
          </span>
          <InputText tipo="numeros" min="3" max="8" ancho="100%" largo="45px" placeholder="Ej: 123456" />
        </div>

        <div>
          <span style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '8px', display: 'block' }}>
            2. Solo Letras
          </span>
          <InputText tipo="letras" ancho="100%" largo="45px" placeholder="Ej: Angel Torres" />
        </div>

        <div>
          <span style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '8px', display: 'block' }}>
            3. Letras y Números (Sin especiales)
          </span>
          <InputText tipo="sin-especiales" ancho="100%" largo="45px" placeholder="Ej: User2026" />
        </div>

        <div>
          <span style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '8px', display: 'block' }}>
            4. Todo (Admite especiales)
          </span>
          <InputText tipo="todo" ancho="100%" largo="45px" placeholder="Ej: hola@mundo.com!" />
        </div>

      </div>
    </div>
  );
}

function DateRangeDemo() {
  return (
    <div>
      <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Date Range Picker</h2>
      <p>Un selector de fechas interactivo para establecer un inicio y un fin.</p>

      {/* La "Sandbox" de Date Range */}
      <div style={{ background: '#0f172a', padding: '30px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3 style={{ color: '#3ee7b8', margin: '0 0 15px', textAlign: 'center', fontWeight: '600' }}>
          Selector de Rango
        </h3>
        
        {/* Aquí llamamos al componente de React */}
        <DateRange 
            colorTema="#3ee7b8" 
            allowPast={false} 
            allowFuture={true} 
            onRangeChanged={(rango) => console.log('Fechas seleccionadas:', rango)} 
        />
      </div>
    </div>
  );
}

function ModalDemo() {
  // Estados para controlar qué modal está abierto
  const [modalInfo, setModalInfo] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalCustom, setModalCustom] = useState(false);

  // Botones de personalización de la "sandbox"
  const buttonStyle = { padding: '12px 24px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', color: 'white' };

  return (
    <div>
      <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Ventanas Modales</h2>
      <p>Diferentes tipos de ventanas emergentes para mostrar información o confirmar acciones.</p>

      {/* Sandbox de Modales */}
      <div style={{ background: 'rgba(15, 23, 42, 1)', padding: '40px', borderRadius: '15px', display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button style={{ ...buttonStyle, background: '#3b82f6' }} onClick={() => setModalInfo(true)}>Info</button>
        <button style={{ ...buttonStyle, background: '#ef4444' }} onClick={() => setModalError(true)}>Error</button>
        <button style={{ ...buttonStyle, background: '#eab308' }} onClick={() => setModalConfirm(true)}>Confirmación</button>
        <button style={{ ...buttonStyle, background: '#8b5cf6' }} onClick={() => setModalCustom(true)}>Personalizado</button>
      </div>

      {/* --- DECLARACIÓN DE LOS MODALES --- */}
      
      <Modal isOpen={modalInfo} onClose={() => setModalInfo(false)} type="info" btn1="Entendido">
        <h2 style={{ marginTop: 0, color: '#3b82f6' }}>Información del Sistema</h2>
        <p style={{ color: '#cbd5e1' }}>Actualización completada correctamente.</p>
      </Modal>

      <Modal isOpen={modalError} onClose={() => setModalError(false)} type="error" btn1="Reintentar" btn2="Cancelar">
        <h2 style={{ marginTop: 0, color: '#ef4444' }}>Error de Conexión</h2>
        <p style={{ color: '#cbd5e1' }}>No se pudo conectar con el servidor.</p>
      </Modal>

      <Modal isOpen={modalConfirm} onClose={() => setModalConfirm(false)} type="confirm" btn1="Eliminar" btn2="Cancelar" onAction1={() => alert('¡Eliminado!')}>
        <h2 style={{ marginTop: 0, color: '#eab308' }}>Confirmar Eliminación</h2>
        <p style={{ color: '#cbd5e1' }}>¿Estás seguro?</p>
      </Modal>

      <Modal 
        isOpen={modalCustom} 
        onClose={() => setModalCustom(false)} 
        type="custom" 
        headerImage="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80"
        actionSlot={
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                <button style={{ padding: '10px 20px', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setModalCustom(false)}>Guardar</button>
                <button style={{ padding: '10px 20px', background: 'transparent', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer' }} onClick={() => setModalCustom(false)}>Descartar</button>
            </div>
        }
      >
        <h3 style={{ color: '#8b5cf6', marginTop: 0 }}>Nuevo Producto</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
            <input type="text" placeholder="Nombre..." style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input type="number" placeholder="Precio..." style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
      </Modal>

    </div>
  );
}

function SelectDemo() {
  // Estados para nuestros switches (checkboxes) de configuración
  const [enableSearch, setEnableSearch] = useState(true);
  const [isMultiple, setIsMultiple] = useState(true);

  // Nuestra lista de opciones para la tienda de ejemplo
  const opcionesDeTienda = [
    'HP Pavilion', 'Asus VivoBook', 'MacBook Air M2', 'Lenovo IdeaPad 3', 'Dell Inspiron 15',
    'Teclado Redragon', 'Mouse Logitech G305', 'Monitor 24 pulgadas',
    'SSD NVMe 1TB', 'Pendrive Kingston 64GB'
  ];

  return (
    <div>
      <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Select Dinámico</h2>
      <p>Un menú desplegable interactivo con soporte de búsqueda y etiquetas (tags).</p>

      {/* Sandbox */}
      <div style={{ background: '#0f172a', padding: '30px', borderRadius: '15px', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Panel de Configuración interactivo */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '15px', display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={enableSearch} onChange={(e) => setEnableSearch(e.target.checked)} />
                Búsqueda Activa
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={isMultiple} onChange={(e) => setIsMultiple(e.target.checked)} />
                Selección Múltiple
            </label>
        </div>

        {/* El Componente en sí */}
        <SelectDinamico 
            ancho="100%" 
            opciones={opcionesDeTienda} 
            enableSearch={enableSearch} 
            multiple={isMultiple} 
            placeholder="Seleccione productos..."
            onChange={(datos) => console.log("Datos seleccionados: ", datos)}
        />

      </div>
    </div>
  );
}

function TableDemo() {
  const columnasTabla = [
      { key: 'id', label: 'ID', type: 'number' },
      { key: 'nombre', label: 'Nombre', type: 'string' },
      { key: 'rol', label: 'Rol', type: 'string' },
      { key: 'estado', label: 'Estado', type: 'string' },
  ];

  const datosTabla = [
      { id: 1, nombre: 'Yox', rol: 'Frontend', estado: 'Activo' },
      { id: 2, nombre: 'David', rol: 'Backend', estado: 'Activo' },
      { id: 3, nombre: 'Eduardo', rol: 'QA', estado: 'Revisión' },
      { id: 4, nombre: 'Ángel', rol: 'Full Stack', estado: 'Activo' },
      { id: 5, nombre: 'María', rol: 'Diseñadora', estado: 'Inactivo' },
      { id: 6, nombre: 'Carlos', rol: 'DevOps', estado: 'Activo' },
      { id: 7, nombre: 'Ana', rol: 'Product Owner', estado: 'Activo' },
  ];

  return (
    <div>
      <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Custom Table</h2>
      <p>Una tabla de datos completa con soporte para búsqueda en tiempo real, ordenamiento por columnas y paginación. ¡Y es responsive para móviles!</p>

      {/* Sandbox de la Tabla */}
      <div style={{ background: '#0f172a', padding: '30px', borderRadius: '15px', color: '#fff' }}>
        <Table 
            columns={columnasTabla} 
            data={datosTabla} 
            pageSize={4} // Puesto en 4 para que se note la paginación con sus 7 elementos
        />
      </div>
    </div>
  );
}

function ToastDemo() {
  const [toast, setToast] = useState(null);

  function mostrar(tipo, mensaje) {
    setToast({ tipo, mensaje });
  }

  const btnStyle = { padding: '12px 24px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', color: 'white' };

  return (
    <div>
      <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Toast</h2>
      <p>Notificaciones emergentes que se cierran solas.</p>
      <div style={{ background: '#0f172a', padding: '30px', borderRadius: '15px', display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button style={{ ...btnStyle, background: '#22c55e' }} onClick={() => mostrar('success', 'Operación exitosa')}>Success</button>
        <button style={{ ...btnStyle, background: '#ef4444' }} onClick={() => mostrar('error', 'Algo salió mal')}>Error</button>
        <button style={{ ...btnStyle, background: '#3b82f6' }} onClick={() => mostrar('info', 'Esto es informativo')}>Info</button>
      </div>

      {toast && (
        <Toast tipo={toast.tipo} mensaje={toast.mensaje} duracion={3000} onClose={() => setToast(null)} />
      )}
    </div>
  );
}

function CarruselDemo() {
  const imagenes = [
    { src: 'https://picsum.photos/800/400?1', alt: 'Montañas', titulo: 'Montañas', descripcion: 'Paisaje de montaña nevada', link: '/montañas' },
    { src: 'https://picsum.photos/800/400?2', alt: 'Playa', titulo: 'Playa', descripcion: 'Atardecer en la playa' },
    { src: 'https://picsum.photos/800/400?3', alt: 'Bosque', titulo: 'Bosque', descripcion: 'Sendero entre árboles' },
  ];

  return (
    <div>
      <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Carrusel de Imágenes</h2>
      <p>Slideshow con texto superpuesto, botones de navegación y autoplay.</p>
      <Carrusel imagenes={imagenes} intervalo={4000} mostrarBotones={true} altura="450px" />
    </div>
  );
}

// 3. Creamos una "Página" de Inicio
function InicioDemo() {
  return <h2>Bienvenido a nuestra Librería de Componentes 🚀</h2>;
}

// 4. Armamos el diseño principal (Menú a la izquierda, Contenido a la derecha)
export default function App() {
  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        
        {/* BARRA LATERAL (Sidebar) */}
        <aside style={{ width: '250px', backgroundColor: '#f4f4f4', padding: '20px', borderRight: '1px solid #ddd' }}>
          <h3 style={{ margin: '0 0 20px 0' }}>Componentes</h3>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Inicio</Link>
            <Link to="/input" style={{ textDecoration: 'none', color: '#007bff' }}>Input Text</Link>
            <Link to="/date-range" style={{ textDecoration: 'none', color: '#007bff' }}>Date Range</Link>
            <Link to="/modal" style={{ textDecoration: 'none', color: '#007bff' }}>Ventana Modal</Link>
            <Link to="/select" style={{ textDecoration: 'none', color: '#007bff' }}>Select Dinámico</Link>
            <Link to="/table" style={{ textDecoration: 'none', color: '#007bff' }}>Tabla Dinámica</Link>
            <Link to="/toast" style={{ textDecoration: 'none', color: '#007bff' }}>Toast</Link>
            <Link to="/carrusel" style={{ textDecoration: 'none', color: '#007bff' }}>Carrusel</Link>
          </nav>
        </aside>

        {/* ÁREA DE CONTENIDO (Aquí cambia lo que vemos al hacer clic en el menú) */}
        <main style={{ flex: 1, padding: '40px', backgroundColor: '#fff' }}>
          <Routes>
            <Route path="/" element={<InicioDemo />} />
            <Route path="/input" element={<InputTextDemo />} />
            <Route path="/date-range" element={<DateRangeDemo />} />
            <Route path="/modal" element={<ModalDemo />} />
            <Route path="/select" element={<SelectDemo />} />
            <Route path="/table" element={<TableDemo />} />
            <Route path="/toast" element={<ToastDemo />} />
            <Route path="/carrusel" element={<CarruselDemo />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}