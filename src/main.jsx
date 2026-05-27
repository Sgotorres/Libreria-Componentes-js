import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './theme.css'; // Aquí mantenemos los estilos generales que ya tenían

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);