import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css'; 

function Sidebar() {
  // En tu Sidebar.jsx
const listaComponentes = [
  { path: '/', nombre: 'Inicio' },
  { path: '/boton', nombre: 'Botón' },
  { path: '/input', nombre: 'Input de Texto' },
  { path: '/acordeon', nombre: 'Acordeón' },
  { path: '/date-range', nombre: 'Rango de Fechas' },
  { path: '/modal', nombre: 'Modal' },
  { path: '/select', nombre: 'Select Dinámico' },
  { path: '/table', nombre: 'Tabla' },
  { path: '/tabs', nombre: 'Tabs Premium' },
  { path: '/tooltip', nombre: 'Tooltip' },
  { path: '/toast', nombre: 'Notificación (Toast)' },
  { path: '/carrusel', nombre: 'Carrusel de Imágenes' }
];

  return (
    <aside className="sidebar-wrapper">
      <div className="sidebar-header">
        <h2>Componentes</h2>
      </div>
      
      <nav className="sidebar-menu">
        <ul>
          {listaComponentes.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `menu-button ${isActive ? 'activo' : ''}`}
              >
                {item.nombre}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;