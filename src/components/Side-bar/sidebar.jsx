import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

const inicioItems = [
  { path: '/', nombre: 'Introducción' },
];

const componentes = [
  { path: '/boton', nombre: 'Botón' },
  { path: '/input', nombre: 'Input de Texto' },
  { path: '/select', nombre: 'Select Dinámico' },
  { path: '/tabs', nombre: 'Tabs Premium' },
  { path: '/acordeon', nombre: 'Acordeón' },
  { path: '/table', nombre: 'Tabla' },
  { path: '/carrusel', nombre: 'Carrusel' },
  { path: '/modal', nombre: 'Modal' },
  { path: '/toast', nombre: 'Toast' },
  { path: '/tooltip', nombre: 'Tooltip' },
  { path: '/date-range', nombre: 'Rango de Fechas' },
  { path: '/file-upload', nombre: 'File Upload' },
  { path: '/stepper', nombre: 'Stepper' },
  { path: '/switch-toggle', nombre: 'Switch Toggle' },
];

function Section({ titulo, icono, children, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`sidebar-section ${open ? 'open' : ''}`}>
      <div className="section-header" onClick={() => setOpen(!open)}>
        <span className="section-icon">{icono}</span>
        <span className="section-titulo">{titulo}</span>
        <span className="section-arrow">{open ? '▾' : '▸'}</span>
      </div>
      <div className="section-body">{children}</div>
    </div>
  );
}

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="sidebar-wrapper">
      <div className="sidebar-header">
        <h2>Navegación</h2>
      </div>

      <nav className="sidebar-menu">
        <Section titulo="Inicio" icono="🏠" defaultOpen={true}>
          {inicioItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.hash ? { pathname: item.path, hash: item.hash } : item.path}
              className={({ isActive }) => `menu-button ${isActive ? 'activo' : ''}`}
              onClick={onNavigate}
              end
            >
              {item.nombre}
            </NavLink>
          ))}
        </Section>

        <Section titulo="Componentes" icono="📦" defaultOpen={true}>
          <NavLink
            to="/componentes"
            className={({ isActive }) => `menu-button ${isActive ? 'activo' : ''}`}
            onClick={onNavigate}
          >
            Ver galería
          </NavLink>
          <div className="section-divider" />
          {componentes.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) => `menu-button ${isActive ? 'activo' : ''}`}
              onClick={onNavigate}
            >
              {item.nombre}
            </NavLink>
          ))}
        </Section>
      </nav>
    </aside>
  );
}
