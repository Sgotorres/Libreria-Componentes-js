import React, { useState, useEffect, useRef } from 'react';
import './style.css'; // Ahora importamos nuestro archivo limpio

export default function SelectDinamico({
    opciones = [],
    ancho = '100%',
    enableSearch = true,
    multiple = false,
    placeholder = 'Seleccione...',
    onChange // Función opcional para reportar datos seleccionados al padre
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [seleccionados, setSeleccionados] = useState([]);
    
    // Este ref nos dirá si el usuario dio clic fuera de la caja
    const containerRef = useRef(null);

    // Lógica para cerrar el modal si se hace clic afuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Cada vez que seleccionados cambie, avisamos al componente padre
    useEffect(() => {
        if (onChange) onChange(seleccionados);
    }, [seleccionados, onChange]);

    // Lógica principal: Añadir o quitar una opción
    const handleSelect = (item) => {
        if (multiple) {
            if (seleccionados.includes(item)) {
                setSeleccionados(seleccionados.filter(i => i !== item));
            } else {
                setSeleccionados([...seleccionados, item]);
            }
        } else {
            setSeleccionados([item]);
            setIsOpen(false); // Si no es múltiple, cerramos al elegir
        }
    };

    // Quitar un tag haciendo clic en la "X"
    const removeTag = (e, item) => {
        e.stopPropagation();
        setSeleccionados(seleccionados.filter(i => i !== item));
    };

    // Filtramos las opciones según el texto de búsqueda
    const filteredOptions = opciones.filter(opt =>
        opt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Construimos la vista de lo que va adentro del "botón" principal
    let triggerContent = <span className="placeholder">{placeholder}</span>;
    if (seleccionados.length > 0) {
        if (multiple) {
            triggerContent = (
                <div className="tags-wrapper">
                    {seleccionados.map(s => (
                        <span key={s} className="tag">
                            {s}
                            <span className="tag-close" onClick={(e) => removeTag(e, s)}>×</span>
                        </span>
                    ))}
                </div>
            );
        } else {
            triggerContent = <span className="selected-text">{seleccionados[0]}</span>;
        }
    }

    return (
        <div className="custom-select-container" style={{ width: ancho }} ref={containerRef}>
            
            <div className={`select-trigger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                {triggerContent}
            </div>

            <div className={`dropdown-menu ${isOpen ? 'open' : 'closed'}`}>
                {enableSearch && (
                    <input
                        type="text"
                        className="search-box"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()} 
                    />
                )}
                
                <div className="options-list">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map(opt => (
                            <div
                                key={opt}
                                className={`option-item ${seleccionados.includes(opt) ? 'selected' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelect(opt);
                                }}
                            >
                                <span>{opt}</span>
                                <span className="check-icon">✓</span>
                            </div>
                        ))
                    ) : (
                        <div className="empty-msg">No se encontraron resultados</div>
                    )}
                </div>
            </div>

        </div>
    );
}