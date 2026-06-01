import React, { useState, useRef } from 'react';
import './style.css';

export default function Tooltip({
    children, // El elemento que activará el tooltip (ej. un botón o icono)
    contenido = <div className="image-wrapper"><img src="https://i.pinimg.com/736x/1b/54/a5/1b54a5fb9e5717ef1081009f92c978a1.jpg"alt="Imagen del tooltip" /></div>, // Lo que va dentro de la burbuja (texto, imagen, etc.)
    posicion = 'abajo',// 'arriba', 'abajo', 'izquierda', 'derecha'
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