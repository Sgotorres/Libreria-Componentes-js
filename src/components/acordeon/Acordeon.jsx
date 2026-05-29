import React, { useState } from 'react';
import './style.css';

export default function Acordeon({
    items = [],
    permiteMultiples = false, // false = solo un panel abierto a la vez
    ancho = '100%',
    className = ''
}) {
    // Guardamos los índices de los paneles que están abiertos
    const [abiertos, setAbiertos] = useState([]);

    const manejarClick = (index) => {
        if (permiteMultiples) {
            // Si ya está abierto, lo quitamos de la lista; si no, lo agregamos
            if (abiertos.includes(index)) {
                setAbiertos(abiertos.filter(i => i !== index));
            } else {
                setAbiertos([...abiertos, index]);
            }
        } else {
            // Si no permite múltiples, abrimos solo este (o lo cerramos si ya estaba abierto)
            setAbiertos(abiertos.includes(index) ? [] : [index]);
        }
    };

    return (
        <div className={`custom-acordeon ${className}`} style={{ width: ancho }}>
            {items.map((item, index) => {
                const isOpen = abiertos.includes(index);
                
                return (
                    <div key={item.id || index} className={`acordeon-item ${isOpen ? 'open' : ''}`}>
                        <button 
                            className="acordeon-header" 
                            onClick={() => manejarClick(index)}
                        >
                            <span className="acordeon-titulo">{item.titulo}</span>
                            <span className="acordeon-icono">{isOpen ? '−' : '+'}</span>
                        </button>
                        
                        <div className="acordeon-body" style={{ maxHeight: isOpen ? '1000px' : '0px' }}>
                            <div className="acordeon-contenido">
                                {/* Contenido de texto o elementos React */}
                                {item.contenido && <div className="acordeon-texto">{item.contenido}</div>}
                                
                                {/* Renderizado de enlaces personalizados si existen */}
                                {item.enlaces && item.enlaces.length > 0 && (
                                    <div className="acordeon-enlaces">
                                        {item.enlaces.map((enlace, i) => (
                                            <a 
                                                key={i} 
                                                href={enlace.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="enlace-card"
                                            >
                                                <span className="enlace-texto">{enlace.texto}</span>
                                                <span className="enlace-flecha">↗</span>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}