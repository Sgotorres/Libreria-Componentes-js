import React, { useState, useRef } from 'react';
import './style.css';

export default function Tooltip({
    children, // El elemento que activará el tooltip (ej. un botón o icono)
    contenido, // Lo que va dentro de la burbuja (texto, imagen, etc.)
    posicion = 'arriba', // 'arriba', 'abajo', 'izquierda', 'derecha'
    ancho = 'max-content',
    retraso = 200, // Retraso en milisegundos antes de aparecer
    className = ''
}) {
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef(null);

    const mostrarTooltip = () => {
        timeoutRef.current = setTimeout(() => {
            setVisible(true);
        }, retraso);
    };

    const ocultarTooltip = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setVisible(false);
    };

    return (
        <div 
            className={`custom-tooltip-wrapper ${className}`}
            onMouseEnter={mostrarTooltip}
            onMouseLeave={ocultarTooltip}
            onFocus={mostrarTooltip}
            onBlur={ocultarTooltip}
        >
            {/* El elemento disparador */}
            {children}

            {/* La burbuja del Tooltip */}
            {visible && (
                <div className={`tooltip-box tooltip-${posicion}`} style={{ width: ancho }}>
                    <div className="tooltip-content">
                        {contenido}
                    </div>
                    {/* La pequeña flecha del globo */}
                    <div className="tooltip-arrow"></div>
                </div>
            )}
        </div>
    );
}