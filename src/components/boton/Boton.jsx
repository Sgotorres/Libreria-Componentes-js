import React from 'react';
import './style.css';

export default function Button({
    children,
    onClick,
    variante = 'primario', // Opciones: 'primario', 'secundario', 'peligro', 'fantasma'
    tamano = 'md',         // Opciones: 'sm', 'md', 'lg'
    iconoIzquierda,
    iconoDerecha,
    disabled = false,
    tipo = 'button',
    ancho = 'auto',
    className = ''
}) {
    // Construcción dinámica de clases según las props recibidas
    const classNames = `custom-btn btn-${variante} btn-${tamano} ${disabled ? 'disabled' : ''} ${className}`;

    return (
        <button
            type={tipo}
            className={classNames}
            onClick={onClick}
            disabled={disabled}
            style={{ width: ancho }}
        >
            {iconoIzquierda && <span className="btn-icon left">{iconoIzquierda}</span>}
            {children && <span className="btn-text">{children}</span>}
            {iconoDerecha && <span className="btn-icon right">{iconoDerecha}</span>}
        </button>
    );
}