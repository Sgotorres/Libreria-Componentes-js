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
  const buttonSizesCode = `import { Boton } from './ruta-a-index';

function Ejemplo() {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <Boton text="Small" tamano="sm" />
      <Boton text="Medium" tamano="md" />
      <Boton text="Large" tamano="lg" />
    </div>
  );
}`;

  const buttonColorsCode = `import { Boton } from './ruta-a-index';

function Ejemplo() {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <Boton text="Primary" variante="primario" />
      <Boton text="Secondary" variante="secundario" />
      <Boton text="Danger" variante="peligro" />
      <Boton text="Ghost" variante="fantasma" />
    </div>
  );
}`;

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
  const codigoString = `import { InputText } from './ruta-a-index';

function Ejemplo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
      <InputText tipo="numeros" min="3" max="8" ancho="100%" placeholder="Solo números (Mín 3, Máx 8)" />
      <InputText tipo="letras" ancho="100%" placeholder="Solo letras" />
    </div>
  );
}`;

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
  const codigoString = `import { Acordeon } from './ruta-a-index';

const items = [
  { titulo: 'Pregunta 1', contenido: 'Respuesta 1' },
  {
    titulo: 'Categoría con hijos',
    subcategorias: [
      { titulo: 'Sub 1', contenido: 'Anidado nivel 2' },
      { titulo: 'Sub 2', contenido: 'Otro elemento hijo' },
    ],
  },
];

function Ejemplo() {
  return <Acordeon items={items} />;
}`;

  const items = [
    { titulo: '¿Qué es esta librería?', contenido: 'Colección de componentes UI modernos con React y Vite. Diseño glassmorphism oscuro, cada componente es independiente y personalizable.' },
    { titulo: 'Instalación', contenido: 'Solo clona el repo, ejecuta npm run dev e importa los componentes desde src/index.js.' },
    {
      titulo: 'Componentes',
      subcategorias: [
        {
          titulo: 'Botón',
          subcategorias: [
            { titulo: 'Primary', contenido: 'Fondo sólido con hover. Usa la prop variant="primary".' },
            { titulo: 'Outline', contenido: 'Borde sin relleno. Usa la prop variant="outline".' },
            { titulo: 'Ghost', contenido: 'Sin borde ni relleno. Usa la prop variant="ghost".' },
          ],
        },
        {
          titulo: 'Modal',
          subcategorias: [
            { titulo: 'Info', contenido: 'Ventana informativa azul. type="info".' },
            { titulo: 'Confirm', contenido: 'Ventana con confirmación. type="confirm".' },
          ],
        },
        { titulo: 'Carrusel', contenido: 'Autoplay configurable, overlay de texto, botones de navegación y altura ajustable.' },
        { titulo: 'Toast', contenido: 'Notificaciones tipo success, error, info, custom. Auto-close y animación slide-in.' },
      ],
    },
    { titulo: 'Personalización', contenido: 'Todos aceptan props para colores, tamaños y comportamientos. Las clases CSS planas permiten sobrescribir estilos fácilmente.' },
  ];

  return (
    <div className="preview-container">
      <ShowcaseBox 
        title="Acordeón" 
        description="El acordeón se utiliza para mostrar y ocultar contenido. Solo un elemento puede permanecer abierto a la vez."
        codeString={codigoString}
      >
        <div style={{ width: '100%', maxWidth: 600 }}>
          <Acordeon items={items} />
        </div>
      </ShowcaseBox>
    </div>
  );
}

function DateRangeDemo() {
  const codigoString = `import { DateRange } from './ruta-a-index';

function Ejemplo() {
  return (
    <DateRange 
      colorTema="#3ee7b8" 
      allowPast={false} 
      allowFuture={true} 
    />
  );
}`;

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
  const [modalError, setModalError] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalCustom, setModalCustom] = useState(false);
  const btnBase = { padding: '12px 24px', border: 'none', borderRadius: '8px', cursor: 'pointer', color: 'white', fontWeight: 600 };

  const codigoString = `import { useState } from 'react';
import { Modal } from './ruta-a-index';

function Ejemplo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Abrir Modal</button>

      <Modal isOpen={open} onClose={() => setOpen(false)} type="info" btn1="Entendido">
        <h2>Información</h2>
        <p>Actualización completada correctamente.</p>
      </Modal>
    </>
  );
}`;

  return (
    <div className="preview-container">
      <ShowcaseBox 
        title="Ventanas Modales" 
        description="Diálogos superpuestos para mostrar información importante o pedir confirmación al usuario."
        codeString={codigoString}
      >
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button style={{ ...btnBase, background: '#3b82f6' }} onClick={() => setModalInfo(true)}>Info</button>
          <button style={{ ...btnBase, background: '#ef4444' }} onClick={() => setModalError(true)}>Error</button>
          <button style={{ ...btnBase, background: '#eab308' }} onClick={() => setModalConfirm(true)}>Confirmación</button>
          <button style={{ ...btnBase, background: '#8b5cf6' }} onClick={() => setModalCustom(true)}>Personalizado</button>
        </div>

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
          <p style={{ color: '#cbd5e1' }}>¿Estás seguro de eliminar este elemento?</p>
        </Modal>

        <Modal
          isOpen={modalCustom}
          onClose={() => setModalCustom(false)}
          type="custom"
          headerImage="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80"
          actionSlot={
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', width: '100%' }}>
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
      </ShowcaseBox>
    </div>
  );
}

function SelectDemo() {
  const [enableSearch, setEnableSearch] = useState(true);
  const [isMultiple, setIsMultiple] = useState(true);
  const opciones = ['HP Pavilion', 'Asus VivoBook', 'MacBook Air M2', 'Monitor 24 pulgadas'];

  const codigoString = `import { SelectDinamico } from './ruta-a-index';

const opciones = ['HP Pavilion', 'Asus VivoBook', 'MacBook Air M2'];

function Ejemplo() {
  return (
    <SelectDinamico 
      ancho="100%" 
      opciones={opciones} 
      enableSearch={true} 
      multiple={true} 
      placeholder="Seleccione productos..." 
    />
  );
}`;

  return (
    <div className="preview-container">
      <ShowcaseBox 
        title="Select Dinámico" 
        description="Menú desplegable avanzado con opciones de búsqueda integrada y selección múltiple."
        codeString={codigoString}
      >
        <div style={{ flexDirection: 'column', width: '100%', maxWidth: '500px' }}>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '15px', alignItems: 'center' }}>
            <label className="toggle-label">
              <input type="checkbox" checked={enableSearch} onChange={(e) => setEnableSearch(e.target.checked)} />
              <span className="toggle-switch"></span>
              Búsqueda
            </label>
            <label className="toggle-label">
              <input type="checkbox" checked={isMultiple} onChange={(e) => setIsMultiple(e.target.checked)} />
              <span className="toggle-switch"></span>
              Múltiple
            </label>
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
  const codigoString = `import { PremiumTabs } from './ruta-a-index';

function Ejemplo() {
  return <PremiumTabs />;
}`;

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
  const codigoString = `import { Tooltip } from './ruta-a-index';

function Ejemplo() {
  return (
    <Tooltip texto="¡Hola! Soy un tooltip">
      <button>Pasa el mouse aquí</button>
    </Tooltip>
  );
}`;

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

  const codigoString = `import { useState } from 'react';
import { Toast } from './ruta-a-index';

function Ejemplo() {
  const [toast, setToast] = useState(null);

  return (
    <>
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
    </>
  );
}`;

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

  const codigoString = `import { Carrusel } from './ruta-a-index';

const imagenes = [
  { src: 'img1.jpg', alt: 'Montañas', titulo: 'Montañas' },
  { src: 'img2.jpg', alt: 'Playa', titulo: 'Playa' }
];

function Ejemplo() {
  return (
    <Carrusel 
      imagenes={imagenes} 
      intervalo={4000} 
      mostrarBotones={true} 
      altura="450px" 
    />
  );
}`;

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="daisy-layout">
        
        <div className={`daisy-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </div>

        {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}

        <main className="daisy-main-content">
          <header className="daisy-header">
            <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
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