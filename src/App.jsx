import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
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
  Carrusel,
  FileUpload,
  Stepper,
  SwitchToggle
} from './index';

// 2. Importamos el layout
import Sidebar from './components/Side-bar/sidebar';
import './theme.css';
// --- FUNCIONES DEMO (SANDBOX) PARA CADA COMPONENTE ---

function InicioDemo() {
  return (
    <div className="preview-container">
      <section className="inicio-section" id="introduccion">
        <div className="inicio-hero">
          <div className="inicio-hero-badge">React 19 + Vite</div>
          <h2 className="inicio-hero-title">Librería de Componentes UI</h2>
          <p className="inicio-hero-sub">
            11 componentes modernos con diseño glassmorphism oscuro.
          </p>
          <div className="inicio-hero-actions">
            <NavLink to="/componentes" className="inicio-btn-primary">
              Explorar componentes
            </NavLink>
          </div>
        </div>
      </section>

      <div className="inicio-features">
        <div className="inicio-feature-box">
          <div className="feature-box-glow" />
          <div className="feature-box-icon">⚡</div>
          <h4>Rápido</h4>
          <p>Construido con Vite, hot reload instantáneo.</p>
        </div>
        <div className="inicio-feature-box">
          <div className="feature-box-glow" />
          <div className="feature-box-icon">🎨</div>
          <h4>Personalizable</h4>
          <p>Cada componente acepta props para colores, tamaños y comportamientos.</p>
        </div>
        <div className="inicio-feature-box">
          <div className="feature-box-glow" />
          <div className="feature-box-icon">📦</div>
          <h4>Modular</h4>
          <p>Importa solo lo que necesitas desde un barrel central.</p>
        </div>
      </div>

      <section className="inicio-block" id="instalacion">
        <div className="inicio-block-header">
          <span className="inicio-block-step">01</span>
          <div>
            <h3 className="inicio-block-title">Instalación</h3>
            <p className="inicio-block-desc">Poné el proyecto en marcha en menos de un minuto.</p>
          </div>
        </div>
        <div className="inicio-block-body">
          <div className="inicio-terminal">
            <div className="terminal-header">
              <span className="terminal-dot red" />
              <span className="terminal-dot yellow" />
              <span className="terminal-dot green" />
              <span className="terminal-title">bash</span>
            </div>
            <div className="terminal-body">
              <div className="code-line"><span className="code-comment"># Clonar el repositorio</span></div>
              <div className="code-line"><span className="code-prompt">$</span> git clone https://github.com/tu-usuario/libreria-componentes-js</div>
              <div className="code-line"><span className="code-prompt">$</span> cd libreria-componentes-js</div>
              <div className="code-line"><span className="code-prompt">$</span> npm install</div>
              <div className="code-separator" />
              <div className="code-line"><span className="code-comment"># Windows: dar permisos a PowerShell (solo primera vez)</span></div>
              <div className="code-line"><span className="code-prompt">$</span> Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass</div>
              <div className="code-line"><span className="code-prompt">$</span> npm run dev</div>
              <div className="code-separator" />
              <div className="code-line"><span className="code-comment"># Abrir en el navegador</span></div>
              <div className="code-line" style={{ color: '#a5f3e0' }}>→ http://localhost:5173</div>
            </div>
          </div>
        </div>
      </section>

      <section className="inicio-block" id="uso">
        <div className="inicio-block-header">
          <span className="inicio-block-step">02</span>
          <div>
            <h3 className="inicio-block-title">Cómo usar los componentes</h3>
            <p className="inicio-block-desc">Importalos y usalos en tu proyecto.</p>
          </div>
        </div>
        <div className="inicio-block-body">
          <div className="inicio-terminal">
            <div className="terminal-header">
              <span className="terminal-dot red" />
              <span className="terminal-dot yellow" />
              <span className="terminal-dot green" />
              <span className="terminal-title">bash</span>
            </div>
            <div className="terminal-body">
              <div className="code-line"><span className="code-comment"># Importar componentes</span></div>
              <div className="code-line"><span className="code-prompt">$</span> <span className="code-import">import</span> {`{ Boton, Modal, Toast }`} <span className="code-import">from</span> <span className="code-string">'./ruta-a-index'</span><span className="code-punctuation">;</span></div>
              <div className="code-separator" />
              <div className="code-line"><span className="code-comment"># Usar en tu componente</span></div>
              <div className="code-line" style={{ color: '#e2e8f0' }}>{`<Boton text="Hola" variante="primario" />`}</div>
            </div>
          </div>
          <p className="inicio-desc" style={{ marginTop: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>
            Cada demo incluye una pestaña <strong style={{ color: '#3ee7b8' }}>JSX</strong> con el código completo listo para copiar y pegar.
          </p>
          <div className="inicio-cta-wrap" style={{ marginTop: '1.5rem' }}>
            <NavLink to="/componentes" className="inicio-btn-primary">Ver galería de componentes →</NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}

function ComponentesGallery() {
  const items = [
    { path: '/boton', nombre: 'Botón', desc: 'Variantes primary, secondary, danger, ghost. Tamaños sm, md, lg.' },
    { path: '/input', nombre: 'Input de Texto', desc: 'Validación en tiempo real: números, letras, email.' },
    { path: '/select', nombre: 'Select Dinámico', desc: 'Búsqueda integrada, selección múltiple, tags.' },
    { path: '/tabs', nombre: 'Tabs Premium', desc: 'Pestañas animadas con contenido multimedia.' },
    { path: '/acordeon', nombre: 'Acordeón', desc: 'Secciones expandibles con soporte de subcategorías.' },
    { path: '/table', nombre: 'Tabla', desc: 'Datos ordenables con paginación integrada.' },
    { path: '/carrusel', nombre: 'Carrusel', desc: 'Slider de imágenes autoplay con overlay de texto.' },
    { path: '/modal', nombre: 'Modal', desc: '4 tipos: info, error, confirm, custom.' },
    { path: '/toast', nombre: 'Toast', desc: 'Notificaciones auto-close con animación slide-in.' },
    { path: '/tooltip', nombre: 'Tooltip', desc: 'Tooltip contextual al hacer hover.' },
    { path: '/date-range', nombre: 'DateRange', desc: 'Selector de rango de fechas configurable.' },
    { path: '/file-upload', nombre: 'File Upload', desc: 'Drag & drop, vista previa de imágenes, control de tamaño.' },
    { path: '/stepper', nombre: 'Stepper', desc: 'Formulario multi-paso con indicador de progreso.' },
    { path: '/switch-toggle', nombre: 'Switch Toggle', desc: 'Interruptor animado con transiciones suaves.' },
  ];

  return (
    <div className="preview-container">
      <h2 className="inicio-title">Componentes</h2>
      <p className="inicio-subtitle">Selecciona un componente para ver su documentación y ejemplos interactivos.</p>
      <div className="gallery-grid">
        {items.map((item, i) => (
          <NavLink key={i} to={item.path} className="gallery-card" onClick={() => window.scrollTo(0, 0)}>
            <div className="gallery-card-icon">
              {item.nombre.charAt(0).toUpperCase()}
            </div>
            <div className="gallery-card-body">
              <h4 className="gallery-card-title">{item.nombre}</h4>
              <p className="gallery-card-desc">{item.desc}</p>
            </div>
          </NavLink>
        ))}
      </div>
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

  const customBoton = `// Props del componente Boton
// 
// text     : string  — Texto del botón (obligatorio)
// variante : string  — Estilo visual
//   "primario"   (default) → fondo verde
//   "secundario"           → fondo azul
//   "peligro"              → fondo rojo
//   "fantasma"             → sin fondo, borde
// tamano   : string  — Tamaño del botón
//   "sm"   → pequeño
//   "md"   → mediano (default)
//   "lg"   → grande
//
// Ejemplo:
// <Boton text="Click" variante="primario" tamano="md" />`;
  
  return (
    <div className="preview-container">
      <h1>Botones</h1>
      <p>Los botones permiten al usuario realizar acciones o tomar decisiones.</p>

      {/* Bloque 1: Tamaños */}
      <ShowcaseBox 
        title="Button sizes" 
        codeString={buttonSizesCode}
        customString={customBoton}
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
        customString={customBoton}
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

  const customInput = `// Props del componente InputText
//
// tipo       : string  — Tipo de validación
//   "numeros"        → solo dígitos
//   "letras"         → solo letras
//   "sin-especiales" → sin caracteres especiales
//   "email"          → formato email
// min        : number — Longitud mínima
// max        : number — Longitud máxima
// ancho      : string — Ancho del input (ej: "100%", "300px")
// placeholder: string — Texto de ayuda
//
// Ejemplo:
// <InputText tipo="numeros" min="3" max="8" ancho="100%" placeholder="Ej: 123" />`;

  return (
    <div className="preview-container">
      <ShowcaseBox 
        title="Input de Texto" 
        description="Campos de entrada de texto personalizables con validación integrada."
        codeString={codigoString}
        customString={customInput}
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

  const customAcordeon = `// Props del componente Acordeon
//
// items : array — Lista de elementos del acordeón
//
// Cada item puede tener:
//   titulo       : string  — Título visible (obligatorio)
//   contenido    : string  — Texto al expandir
//   subcategorias: array   — Items anidados (misma estructura)
//   id           : string  — Identificador único (opcional)

// Ejemplo:
// <Acordeon items={[
//   { titulo: "FAQ", contenido: "Respuesta..." },
//   { titulo: "Categoría", subcategorias: [
//     { titulo: "Sub", contenido: "Anidado" }
//   ]}
// ]} />`;

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
        customString={customAcordeon}
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

  const customDateRange = `// Props del componente DateRange
//
// colorTema  : string — Color de acento (ej: "#3ee7b8")
// allowPast  : bool   — Permitir fechas pasadas (default: false)
// allowFuture: bool   — Permitir fechas futuras (default: true)
//
// Evento: onChange recibe { start, end }
// Método: clearRange()

// Ejemplo:
// <DateRange colorTema="#3ee7b8" allowPast={false} allowFuture={true} />`;

  return (
    <div className="preview-container">
      <ShowcaseBox 
        title="Date Range Picker" 
        description="Selector de rango de fechas con configuración de colores."
        codeString={codigoString}
        customString={customDateRange}
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

  const customModal = `// Props del componente Modal
//
// isOpen     : bool   — Controla visibilidad (obligatorio)
// onClose    : func   — Función al cerrar (obligatorio)
// type       : string — Estilo visual
//   "info"    → azul
//   "error"   → rojo
//   "confirm" → amarillo
//   "custom"  → personalizable
// btn1       : string — Texto botón primario
// btn2       : string — Texto botón secundario
// onAction1  : func   — Callback botón primario
// onAction2  : func   — Callback botón secundario
// headerImage: string — URL imagen de cabecera (solo custom)
// actionSlot : node   — Slot para acciones personalizadas (solo custom)
//
// Ejemplo:
// <Modal isOpen={open} onClose={() => setOpen(false)} type="info" btn1="Ok">
//   <p>Mensaje</p>
// </Modal>`;

  return (
    <div className="preview-container">
      <ShowcaseBox 
        title="Ventanas Modales" 
        description="Diálogos superpuestos para mostrar información importante o pedir confirmación al usuario."
        codeString={codigoString}
        customString={customModal}
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

  const customSelect = `// Props del componente SelectDinamico
//
// opciones    : array  — Lista de opciones (strings) (obligatorio)
// ancho       : string — Ancho del select (ej: "100%", "300px")
// enableSearch: bool   — Mostrar campo de búsqueda (default: true)
// multiple    : bool   — Permitir selección múltiple (default: false)
// placeholder : string — Texto cuando no hay selección
// onChange    : func   — Callback con array de seleccionados
//
// Ejemplo:
// <SelectDinamico ancho="100%" opciones={['A','B','C']} multiple={true} />`;

  return (
    <div className="preview-container">
      <ShowcaseBox 
        title="Select Dinámico" 
        description="Menú desplegable avanzado con opciones de búsqueda integrada y selección múltiple."
        codeString={codigoString}
        customString={customSelect}
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

  const customTable = `// Props del componente Table
//
// columns  : array  — Definición de columnas (obligatorio)
//   Cada columna: { key, label, type }
//   key  : string — Nombre del campo en datos
//   label: string — Texto del encabezado
//   type : string — "string" | "number" (para ordenamiento)
// data     : array  — Datos a mostrar (obligatorio)
// pageSize : number — Filas por página (default: 5)
//
// Ejemplo:
// <Table columns={columnas} data={datos} pageSize={4} />`;

  return (
    <div className="preview-container">
      <ShowcaseBox 
        title="Tabla Dinámica" 
        description="Tabla de datos con soporte para paginación y ordenamiento por columnas."
        codeString={codigoString}
        customString={customTable}
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

  const customTabs = `// Componente PremiumTabs
//
// No requiere props — las pestañas y su contenido
// vienen predefinidas con animaciones y multimedia.
//
// Uso básico:
// <PremiumTabs />`;

  return (
    <div className="preview-container">
      <ShowcaseBox 
        title="Tabs Premium" 
        description="Sistema de navegación por pestañas con animaciones suaves y soporte para contenido multimedia."
        codeString={codigoString}
        customString={customTabs}
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

  const customTooltip = `// Props del componente Tooltip
//
// texto: string — Contenido del tooltip (obligatorio)
//
// Envuelve cualquier elemento hijo:
// <Tooltip texto="Ayuda">
//   <button>Hover aquí</button>
// </Tooltip>`;

  return (
    <div className="preview-container">
      <ShowcaseBox 
        title="Tooltip" 
        description="Mensaje emergente que aparece al pasar el cursor sobre un elemento para proporcionar información adicional."
        codeString={codigoString}
        customString={customTooltip}
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

  const customToast = `// Props del componente Toast
//
// tipo    : string — Tipo de notificación
//   "success" → verde
//   "error"   → rojo
//   "info"    → azul
//   "custom"  → personalizable
// mensaje : string — Texto del toast (obligatorio)
// duracion : number — Tiempo en ms antes de cerrar (default: 3000)
// onClose  : func  — Callback al cerrar
//
// Ejemplo:
// <Toast tipo="success" mensaje="Listo" duracion={3000} onClose={() => setToast(null)} />`;

  return (
    <div className="preview-container">
      <ShowcaseBox 
        title="Toast (Notificaciones)" 
        description="Notificaciones temporales no intrusivas que informan al usuario sobre el resultado de una acción."
        codeString={codigoString}
        customString={customToast}
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
    { src: 'https://i.pinimg.com/1200x/c9/0e/7a/c90e7a26e1dbc89d9edf6a3adcd3499c.jpg', alt: 'Montañas', titulo: 'Montañas' },
    { src: 'https://i.pinimg.com/1200x/34/80/d0/3480d0ca3ee63fefd9eed67c999f631d.jpg', alt: 'Playa', titulo: 'Playa' }
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

  const customCarrusel = `// Props del componente Carrusel
//
// imagenes      : array  — Lista de imágenes (obligatorio)
//   Cada imagen: { src, alt, titulo }
//   src   : string — URL de la imagen
//   alt   : string — Texto alternativo
//   titulo: string — Texto superpuesto
// intervalo    : number — ms entre cambios (default: 4000)
// mostrarBotones: bool  — Mostrar botones de navegación (default: true)
// altura       : string — Alto del carrusel (ej: "450px", "100%")
//
// Ejemplo:
// <Carrusel imagenes={imagenes} intervalo={4000} mostrarBotones={true} altura="450px" />`;

  return (
    <div className="preview-container">
      <ShowcaseBox 
        title="Carrusel de Imágenes" 
        description="Visor de imágenes deslizante con controles."
        codeString={codigoString}
        customString={customCarrusel}
      >
        {/* Envoltura protectora para forzar las dimensiones del carrusel */}
        <div style={{ width: '100%', height: '400px', display: 'block', position: 'relative' }}>
          <Carrusel imagenes={imagenes} intervalo={4000} mostrarBotones={true} altura="100%" />
        </div>
      </ShowcaseBox>
    </div>
  );
}

function FileUploadDemo() {
  const [files, setFiles] = useState([]);

  const codigoString = `import { FileUpload } from './ruta-a-index';

function Ejemplo() {
  return (
    <FileUpload 
      accept="image/*"
      multiple={true}
      maxSize={5 * 1024 * 1024}
    />
  );
}`;

  const customFU = `// Props del componente FileUpload
//
// accept   : string — Tipos aceptados (ej: "image/*", ".pdf")
// multiple : bool   — Permitir múltiples archivos
// maxSize  : number — Tamaño máximo en bytes
// onChange : func   — Callback con lista de archivos
//
// Ejemplo:
// <FileUpload accept="image/*" multiple maxSize={5242880} />`;

  return (
    <div className="preview-container">
      <ShowcaseBox
        title="File Upload"
        description="Selector de archivos con arrastrar y soltar, vista previa de imágenes y control de tamaño."
        codeString={codigoString}
        customString={customFU}
      >
        <FileUpload accept="image/*,.pdf" multiple maxSize={5 * 1024 * 1024} onChange={setFiles} />
      </ShowcaseBox>
    </div>
  );
}

function StepperDemo() {
  const [step, setStep] = useState(0);
  const [toast, setToast] = useState(null);

  const inputStyle = { padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#fff', fontSize: 14, outline: 'none', width: '100%' };
  const btnStyle = { padding: '10px 20px', borderRadius: 8, border: 'none', background: '#3ee7b8', color: '#0b1120', fontWeight: 600, cursor: 'pointer', fontSize: 14 };

  const steps = [
    { label: 'Información', description: 'Datos básicos', content: <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <input placeholder="Nombre" style={inputStyle} />
      <input placeholder="Email" style={inputStyle} />
      <button style={btnStyle} onClick={() => setStep(1)}>Siguiente →</button>
    </div> },
    { label: 'Detalles', description: 'Configuración', content: <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <input placeholder="Teléfono" style={inputStyle} />
      <select style={inputStyle}><option>Opción 1</option><option>Opción 2</option></select>
      <div style={{ display: 'flex', gap: 8 }}>
        <button style={{ ...btnStyle, background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }} onClick={() => setStep(0)}>← Atrás</button>
        <button style={btnStyle} onClick={() => setStep(2)}>Siguiente →</button>
      </div>
    </div> },
    { label: 'Confirmar', description: 'Revisar datos', content: <div style={{ maxWidth: 320 }}>
      <p style={{ color: '#cbd5e1', marginBottom: 16 }}>Todo listo para enviar.</p>
      <button style={{ ...btnStyle, background: '#3ee7b8', color: '#0b1120' }} onClick={() => { setToast({ tipo: 'success', mensaje: '¡Formulario completado con éxito!' }); setStep(0); }}>Finalizar</button>
    </div> },
  ];

  const codigoString = `import { useState } from 'react';
import { Stepper } from './ruta-a-index';

const steps = [
  { label: 'Paso 1', description: 'Descripción', content: <div>Contenido...</div> },
  { label: 'Paso 2', description: 'Más info', content: <div>Más...</div> },
];

function Ejemplo() {
  const [step, setStep] = useState(0);
  return <Stepper steps={steps} activeStep={step} onStepChange={setStep} />;
}`;

  const customStepper = `// Props del componente Stepper
//
// steps      : array  — Lista de pasos (obligatorio)
//   Cada paso: { label, description?, content }
//   label      : string — Título del paso
//   description: string — Subtítulo opcional
//   content    : node   — Contenido del paso
// activeStep  : number — Paso activo (0-index)
// onStepChange: func   — Callback al hacer clic en un paso
//
// Ejemplo:
// <Stepper steps={steps} activeStep={0} onStepChange={setStep} />`;

  return (
    <div className="preview-container">
      <ShowcaseBox
        title="Stepper"
        description="Indicador de progreso paso a paso con contenido dinámico."
        codeString={codigoString}
        customString={customStepper}
      >
        <Stepper steps={steps} activeStep={step} onStepChange={setStep} />
        {toast && <Toast tipo={toast.tipo} mensaje={toast.mensaje} duracion={3000} onClose={() => setToast(null)} />}
      </ShowcaseBox>
    </div>
  );
}

function SwitchToggleDemo() {
  const [notif, setNotif] = useState(false);
  const [oscuro, setOscuro] = useState(true);

  const codigoString = `import { SwitchToggle } from './ruta-a-index';

function Ejemplo() {
  const [checked, setChecked] = useState(false);
  return (
    <SwitchToggle
      checked={checked}
      onChange={setChecked}
      label="Activar"
    />
  );
}`;

  const customSwitch = `// Props del componente SwitchToggle
//
// checked : bool   — Estado activo/inactivo
// onChange: func   — Callback con nuevo valor
// label   : string — Texto al lado del switch (opcional)
// disabled: bool   — Deshabilitar interacción
//
// Ejemplo:
// <SwitchToggle checked={checked} onChange={setChecked} label="WiFi" />`;

  return (
    <div className="preview-container">
      <ShowcaseBox
        title="Switch Toggle"
        description="Interruptor animado con transiciones suaves. Ideal para settings y preferencias."
        codeString={codigoString}
        customString={customSwitch}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
          <SwitchToggle checked={notif} onChange={setNotif} label="Notificaciones" />
          <SwitchToggle checked={oscuro} onChange={setOscuro} label="Modo oscuro" />
          <SwitchToggle checked={false} onChange={() => {}} label="WiFi" disabled />
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
              <Route path="/componentes" element={<ComponentesGallery />} />
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
              <Route path="/file-upload" element={<FileUploadDemo />} />
              <Route path="/stepper" element={<StepperDemo />} />
              <Route path="/switch-toggle" element={<SwitchToggleDemo />} />
            </Routes>
          </div>
        </main>
        
      </div>
    </Router>
  );
}