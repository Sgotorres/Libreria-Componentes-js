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
        <h2 style={{ color: 'white', padding: '20px' }}>Componentes</h2>
      </div>
      
      <nav className="sidebar-menu">
        <ul style={{ listStyle: 'none', padding: '0 15px' }}>
          {listaComponentes.map((item, index) => (
            <li key={index} style={{ marginBottom: '0.5rem' }}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `menu-button ${isActive ? 'activo' : ''}`}
                style={({ isActive }) => ({
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 15px',
                  background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  transition: 'background 0.3s ease',
                  textDecoration: 'none'
                })}
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