import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. Importamos todos los componentes desde tu archivo barril central
import { 
  Boton, 
  InputText, 
  Acordeon, 
  DateRange, 
  Modal, 
  SelectDinamico, 
  Table, 
  PremiumTabs, 
  Tooltip, 
  Toast, 
  Carrusel 
} from './index';

// 2. Importamos el layout
import Sidebar from './components/Side-bar/sidebar';
import './theme.css';

// --- FUNCIONES DEMO (SANDBOX) PARA CADA COMPONENTE ---

function InicioDemo() {
  return (
    <div className="preview-container">
      <h2>Bienvenido a la Librería de Componentes 🚀</h2>
      <p>Selecciona un componente en el menú lateral para ver su documentación y probarlo.</p>
    </div>
  );
}

function BotonDemo() {
  return (
    <div className="preview-container">
      <h2>Botones</h2>
      <div className="component-showcase" style={{ gap: '15px' }}>
        <Boton text="Botón Primario" variant="primary" />
        <Boton text="Botón Secundario" variant="secondary" />
      </div>
    </div>
  );
}

function InputTextDemo() {
  return (
    <div className="preview-container">
      <h2>Input Text</h2>
      <div className="component-showcase" style={{ flexDirection: 'column', gap: '15px', alignItems: 'flex-start' }}>
        <InputText tipo="numeros" min="3" max="8" ancho="100%" placeholder="Solo números (Mín 3, Máx 8)" />
        <InputText tipo="letras" ancho="100%" placeholder="Solo letras" />
      </div>
    </div>
  );
}

function AcordeonDemo() {
  return (
    <div className="preview-container">
      <h2>Acordeón</h2>
      <div className="component-showcase">
        <Acordeon titulo="¿Qué es esta librería?">
          <p>Es una colección de componentes UI construida con React y Vite.</p>
        </Acordeon>
      </div>
    </div>
  );
}

function DateRangeDemo() {
  return (
    <div className="preview-container">
      <h2>Date Range Picker</h2>
      <div className="component-showcase">
        <DateRange colorTema="#3ee7b8" allowPast={false} allowFuture={true} />
      </div>
    </div>
  );
}

function ModalDemo() {
  const [modalInfo, setModalInfo] = useState(false);
  const btnStyle = { padding: '12px 24px', border: 'none', borderRadius: '8px', cursor: 'pointer', color: 'white', background: '#3b82f6' };

  return (
    <div className="preview-container">
      <h2>Ventanas Modales</h2>
      <div className="component-showcase">
        <button style={btnStyle} onClick={() => setModalInfo(true)}>Abrir Modal Info</button>
        <Modal isOpen={modalInfo} onClose={() => setModalInfo(false)} type="info" btn1="Entendido">
          <h2 style={{ marginTop: 0, color: '#3b82f6' }}>Información</h2>
          <p style={{ color: '#cbd5e1' }}>Actualización completada correctamente.</p>
        </Modal>
      </div>
    </div>
  );
}

function SelectDemo() {
  const [enableSearch, setEnableSearch] = useState(true);
  const [isMultiple, setIsMultiple] = useState(true);
  const opciones = ['HP Pavilion', 'Asus VivoBook', 'MacBook Air M2', 'Monitor 24 pulgadas'];

  return (
    <div className="preview-container">
      <h2>Select Dinámico</h2>
      <div className="component-showcase" style={{ flexDirection: 'column', width: '100%', maxWidth: '500px' }}>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', color: 'white' }}>
          <label><input type="checkbox" checked={enableSearch} onChange={(e) => setEnableSearch(e.target.checked)} /> Búsqueda</label>
          <label><input type="checkbox" checked={isMultiple} onChange={(e) => setIsMultiple(e.target.checked)} /> Múltiple</label>
        </div>
        <SelectDinamico ancho="100%" opciones={opciones} enableSearch={enableSearch} multiple={isMultiple} placeholder="Seleccione productos..." />
      </div>
    </div>
  );
}

function TableDemo() {
  const columnas = [
    { key: 'id', label: 'ID', type: 'number' },
    { key: 'nombre', label: 'Nombre', type: 'string' },
    { key: 'rol', label: 'Rol', type: 'string' }
  ];
  const datos = [
    { id: 1, nombre: 'Yox', rol: 'Frontend' },
    { id: 2, nombre: 'David', rol: 'Backend' },
    { id: 3, nombre: 'Eduardo', rol: 'QA' }
  ];

  return (
    <div className="preview-container">
      <h2>Tabla Dinámica</h2>
      <div className="component-showcase">
        <Table columns={columnas} data={datos} pageSize={4} />
      </div>
    </div>
  );
}

function TabsDemo() {
  return (
    <div className="preview-container">
      <h2>Tabs Premium</h2>
      <div className="component-showcase">
        <PremiumTabs />
      </div>
    </div>
  );
}

function TooltipDemo() {
  return (
    <div className="preview-container">
      <h2>Tooltip</h2>
      <div className="component-showcase">
        <Tooltip texto="¡Hola! Soy un tooltip">
          <button style={{ padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>Pasa el mouse aquí</button>
        </Tooltip>
      </div>
    </div>
  );
}

function ToastDemo() {
  const [toast, setToast] = useState(null);
  const btnStyle = { padding: '12px 24px', border: 'none', borderRadius: '8px', cursor: 'pointer', color: 'white', background: '#22c55e' };

  return (
    <div className="preview-container">
      <h2>Toast (Notificaciones)</h2>
      <div className="component-showcase">
        <button style={btnStyle} onClick={() => setToast({ tipo: 'success', mensaje: 'Operación exitosa' })}>Mostrar Success</button>
        {toast && <Toast tipo={toast.tipo} mensaje={toast.mensaje} duracion={3000} onClose={() => setToast(null)} />}
      </div>
    </div>
  );
}

function CarruselDemo() {
  const imagenes = [
    { src: 'https://picsum.photos/800/400?1', alt: 'Montañas', titulo: 'Montañas' },
    { src: 'https://picsum.photos/800/400?2', alt: 'Playa', titulo: 'Playa' }
  ];
  return (
    <div className="preview-container">
      <h2>Carrusel de Imágenes</h2>
      <div className="component-showcase" style={{ display: 'block', padding: 0, overflow: 'hidden' }}>
        <Carrusel imagenes={imagenes} intervalo={4000} mostrarBotones={true} altura="450px" />
      </div>
    </div>
  );
}

// --- ESTRUCTURA PRINCIPAL DEL LAYOUT ---

export default function App() {
  return (
    <Router>
      <div className="daisy-layout">
        
        {/* Barra Lateral de Navegación */}
        <div className="daisy-sidebar">
          <Sidebar />
        </div>

        {/* Panel Principal Derecho */}
        <main className="daisy-main-content">
          <header className="daisy-header">
            <h1>Documentación - Librería JS</h1>
          </header>
          
          <div className="daisy-canvas">
            <Routes>
              <Route path="/" element={<InicioDemo />} />
              <Route path="/boton" element={<BotonDemo />} />
              <Route path="/input" element={<InputTextDemo />} />
              <Route path="/acordeon" element={<AcordeonDemo />} />
              <Route path="/date-range" element={<DateRangeDemo />} />
              <Route path="/modal" element={<ModalDemo />} />
              <Route path="/select" element={<SelectDemo />} />
              <Route path="/table" element={<TableDemo />} />
              <Route path="/tabs" element={<TabsDemo />} />
              <Route path="/tooltip" element={<TooltipDemo />} />
              <Route path="/toast" element={<ToastDemo />} />
              <Route path="/carrusel" element={<CarruselDemo />} />
            </Routes>
          </div>
        </main>
        
      </div>
    </Router>
  );
}