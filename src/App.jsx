import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowcaseBox from './components/ShowcaseBox/ShowcaseBox'; // Ajusta la ruta

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
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem'}}>Bienvenido a la Librería de Componentes 🚀</h2>
      <p style={{ color: '#9ca3af' }}>Selecciona un componente en el menú lateral para ver su documentación y probarlo.</p>
    </div>
  );
}

function BotonDemo() {
  const buttonSizesCode = `
<Boton text="Small" tamano="sm" />
<Boton text="Medium" tamano="md" />
<Boton text="Large" tamano="lg" />
  `.trim();

  const buttonColorsCode = `
<Boton text="Primary" variante="primario" />
<Boton text="Secondary" variante="secundario" />
<Boton text="Danger" variante="peligro" />
<Boton text="Ghost" variante="fantasma" />
  `.trim();

  return (
    <div className="preview-container">
      <h1>Botones</h1>
      <p>Los botones permiten al usuario realizar acciones o tomar decisiones.</p>

      {/* Bloque 1: Tamaños */}
      <ShowcaseBox 
        title="Button sizes" 
        codeString={buttonSizesCode}
      >
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Boton text="Small" tamano="sm" />
          <Boton text="Medium" tamano="md" />
          <Boton text="Large" tamano="lg" />
        </div>
      </ShowcaseBox>

      {/* Bloque 2: Variantes de Color */}
      <ShowcaseBox 
        title="Buttons colors" 
        codeString={buttonColorsCode}
      >
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Boton text="Primary" variante="primario" />
          <Boton text="Secondary" variante="secundario" />
          <Boton text="Danger" variante="peligro" />
          <Boton text="Ghost" variante="fantasma" />
        </div>
      </ShowcaseBox>
    </div>
  );
}

function InputTextDemo() {
  const codigoString = `
<InputText tipo="numeros" min="3" max="8" ancho="100%" placeholder="Solo números (Mín 3, Máx 8)" />
<InputText tipo="letras" ancho="100%" placeholder="Solo letras" />
  `.trim();

  return (
    <div className="preview-container">
      <ShowcaseBox 
        title="Input de Texto" 
        description="Campos de entrada de texto personalizables con validación integrada."
        codeString={codigoString}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', maxWidth: '400px' }}>
          <InputText tipo="numeros" min="3" max="8" ancho="100%" placeholder="Solo números (Mín 3, Máx 8)" />
          <InputText tipo="letras" ancho="100%" placeholder="Solo letras" />
        </div>
      </ShowcaseBox>
    </div>
  );
}

function AcordeonDemo() {
  const codigoString = `
<Acordeon 
  items={[
    { id: 1, titulo: "¿Qué es esta librería?", contenido: "Es una colección de componentes UI construida con React y Vite." }
  ]} 
/>
  `.trim();

  return (
    <div className="preview-container">
      <ShowcaseBox 
        title="Acordeón" 
        description="El acordeón se utiliza para mostrar y ocultar contenido. Solo un elemento puede permanecer abierto a la vez."
        codeString={codigoString}
      >
         {/* Aquí va el componente real que se renderiza en la pestaña Preview */}
         <Acordeon 
            items={[
              { id: 1, titulo: "¿Qué es esta librería?", contenido: "Es una colección de componentes UI construida con React y Vite." }
            ]} 
         />
      </ShowcaseBox>
    </div>
  );
}

function DateRangeDemo() {
  const codigoString = `
<DateRange 
  colorTema="#3ee7b8" 
  allowPast={false} 
  allowFuture={true} 
/>
  `.trim();

  return (
    <div className="preview-container">
      <ShowcaseBox 
        title="Date Range Picker" 
        description="Selector de rango de fechas con configuración de colores."
        codeString={codigoString}
      >
        {/* Envoltura protectora para evitar saltos */}
        <div style={{ minHeight: '380px', display: 'flex', alignItems: 'flex-start' }}>
          <DateRange colorTema="#3ee7b8" allowPast={false} allowFuture={true} />
        </div>
      </ShowcaseBox>
    </div>
  );
}
function ModalDemo() {
  const [modalInfo, setModalInfo] = useState(false);
  const btnStyle = { padding: '12px 24px', border: 'none', borderRadius: '8px', cursor: 'pointer', color: 'white', background: '#3b82f6' };

  const codigoString = `
const [modalInfo, setModalInfo] = useState(false);

<button onClick={() => setModalInfo(true)}>Abrir Modal</button>

<Modal isOpen={modalInfo} onClose={() => setModalInfo(false)} type="info" btn1="Entendido">
  <h2>Información</h2>
  <p>Actualización completada correctamente.</p>
</Modal>
  `.trim();

  return (
    <div className="preview-container">
      <ShowcaseBox 
        title="Ventanas Modales" 
        description="Diálogos superpuestos para mostrar información importante o pedir confirmación al usuario."
        codeString={codigoString}
      >
        <div>
          <button style={btnStyle} onClick={() => setModalInfo(true)}>Abrir Modal Info</button>
          <Modal isOpen={modalInfo} onClose={() => setModalInfo(false)} type="info" btn1="Entendido">
            <h2 style={{ marginTop: 0, color: '#3b82f6' }}>Información</h2>
            <p style={{ color: '#cbd5e1' }}>Actualización completada correctamente.</p>
          </Modal>
        </div>
      </ShowcaseBox>
    </div>
  );
}

function SelectDemo() {
  const [enableSearch, setEnableSearch] = useState(true);
  const [isMultiple, setIsMultiple] = useState(true);
  const opciones = ['HP Pavilion', 'Asus VivoBook', 'MacBook Air M2', 'Monitor 24 pulgadas'];

  const codigoString = `
const opciones = ['HP Pavilion', 'Asus VivoBook', 'MacBook Air M2'];

<SelectDinamico 
  ancho="100%" 
  opciones={opciones} 
  enableSearch={true} 
  multiple={true} 
  placeholder="Seleccione productos..." 
/>
  `.trim();

  return (
    <div className="preview-container">
      <ShowcaseBox 
        title="Select Dinámico" 
        description="Menú desplegable avanzado con opciones de búsqueda integrada y selección múltiple."
        codeString={codigoString}
      >
        <div style={{ flexDirection: 'column', width: '100%', maxWidth: '500px' }}>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', color: 'white' }}>
            <label><input type="checkbox" checked={enableSearch} onChange={(e) => setEnableSearch(e.target.checked)} /> Búsqueda</label>
            <label><input type="checkbox" checked={isMultiple} onChange={(e) => setIsMultiple(e.target.checked)} /> Múltiple</label>
          </div>
          <SelectDinamico ancho="100%" opciones={opciones} enableSearch={enableSearch} multiple={isMultiple} placeholder="Seleccione productos..." />
        </div>
      </ShowcaseBox>
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

  const codigoString = `
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

<Table columns={columnas} data={datos} pageSize={4} />
  `.trim();

  return (
    <div className="preview-container">
      <ShowcaseBox 
        title="Tabla Dinámica" 
        description="Tabla de datos con soporte para paginación y ordenamiento por columnas."
        codeString={codigoString}
      >
        <div style={{ width: '100%' }}>
          <Table columns={columnas} data={datos} pageSize={4} />
        </div>
      </ShowcaseBox>
    </div>
  );
}

function TabsDemo() {
  const codigoString = `
<PremiumTabs />
  `.trim();

  return (
    <div className="preview-container">
      <ShowcaseBox 
        title="Tabs Premium" 
        description="Sistema de navegación por pestañas con animaciones suaves y soporte para contenido multimedia."
        codeString={codigoString}
      >
        <div style={{ width: '100%' }}>
          <PremiumTabs />
        </div>
      </ShowcaseBox>
    </div>
  );
}

function TooltipDemo() {
  const codigoString = `
<Tooltip texto="¡Hola! Soy un tooltip">
  <button>Pasa el mouse aquí</button>
</Tooltip>
  `.trim();

  return (
    <div className="preview-container">
      <ShowcaseBox 
        title="Tooltip" 
        description="Mensaje emergente que aparece al pasar el cursor sobre un elemento para proporcionar información adicional."
        codeString={codigoString}
      >
        <Tooltip texto="¡Hola! Soy un tooltip">
          <button style={{ padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', border: '1px solid #4b5563', background: 'transparent', color: '#fff' }}>
            Pasa el mouse aquí
          </button>
        </Tooltip>
      </ShowcaseBox>
    </div>
  );
}

function ToastDemo() {
  const [toast, setToast] = useState(null);
  const btnStyle = { padding: '12px 24px', border: 'none', borderRadius: '8px', cursor: 'pointer', color: 'white', background: '#22c55e' };

  const codigoString = `
const [toast, setToast] = useState(null);

<button onClick={() => setToast({ tipo: 'success', mensaje: 'Operación exitosa' })}>
  Mostrar Notificación
</button>

{toast && (
  <Toast 
    tipo={toast.tipo} 
    mensaje={toast.mensaje} 
    duracion={3000} 
    onClose={() => setToast(null)} 
  />
)}
  `.trim();

  return (
    <div className="preview-container">
      <ShowcaseBox 
        title="Toast (Notificaciones)" 
        description="Notificaciones temporales no intrusivas que informan al usuario sobre el resultado de una acción."
        codeString={codigoString}
      >
        <div>
          <button style={btnStyle} onClick={() => setToast({ tipo: 'success', mensaje: 'Operación exitosa' })}>Mostrar Success</button>
          {toast && <Toast tipo={toast.tipo} mensaje={toast.mensaje} duracion={3000} onClose={() => setToast(null)} />}
        </div>
      </ShowcaseBox>
    </div>
  );
}

function CarruselDemo() {
  const imagenes = [
    { src: 'https://picsum.photos/800/400?1', alt: 'Montañas', titulo: 'Montañas' },
    { src: 'https://picsum.photos/800/400?2', alt: 'Playa', titulo: 'Playa' }
  ];

  const codigoString = `
const imagenes = [
  { src: 'img1.jpg', alt: 'Montañas', titulo: 'Montañas' },
  { src: 'img2.jpg', alt: 'Playa', titulo: 'Playa' }
];

<Carrusel 
  imagenes={imagenes} 
  intervalo={4000} 
  mostrarBotones={true} 
  altura="450px" 
/>
  `.trim();

  return (
    <div className="preview-container">
      <ShowcaseBox 
        title="Carrusel de Imágenes" 
        description="Visor de imágenes deslizante con controles."
        codeString={codigoString}
      >
        {/* Envoltura protectora para forzar las dimensiones del carrusel */}
        <div style={{ width: '100%', height: '400px', display: 'block', position: 'relative' }}>
          <Carrusel imagenes={imagenes} intervalo={4000} mostrarBotones={true} altura="100%" />
        </div>
      </ShowcaseBox>
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