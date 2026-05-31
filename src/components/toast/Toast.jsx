import { useState, useEffect } from 'react';
import './Toast.css';

export default function Toast({ tipo = 'info', mensaje = '', duracion = 3000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duracion <= 0) return;
    const id = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duracion);
    return () => clearTimeout(id);
  }, [duracion, onClose]);

  function cerrar() {
    setVisible(false);
    if (onClose) onClose();
  }

  if (!visible) return null;

  const iconos = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    custom: '⚡',
  };

  return (
    <div className={`toast toast-${tipo} ${visible ? 'entrada' : ''}`}>
      <span className="toast-icono">{iconos[tipo] || 'ℹ'}</span>
      <span className="toast-mensaje">{mensaje}</span>
      <button className="toast-cerrar" onClick={cerrar}>✕</button>
    </div>
  );
}