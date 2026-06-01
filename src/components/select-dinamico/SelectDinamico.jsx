import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './style.css';

export default function SelectDinamico({
    opciones = [],
    ancho = '100%',
    enableSearch = true,
    multiple = false,
    placeholder = 'Seleccione...',
    onChange
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [seleccionados, setSeleccionados] = useState([]);
    const [dropdownStyle, setDropdownStyle] = useState({});
    
    const containerRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
        if (onChange) onChange(seleccionados);
    }, [seleccionados, onChange]);

    useEffect(() => {
      if (isOpen && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setDropdownStyle({
          left: rect.left + 'px',
          width: rect.width + 'px',
          top: rect.bottom + 8 + 'px',
        });
      }
    }, [isOpen]);

    const handleSelect = (item) => {
        if (multiple) {
            if (seleccionados.includes(item)) {
                setSeleccionados(seleccionados.filter(i => i !== item));
            } else {
                setSeleccionados([...seleccionados, item]);
            }
        } else {
            setSeleccionados([item]);
            setIsOpen(false);
        }
    };

    const removeTag = (e, item) => {
        e.stopPropagation();
        setSeleccionados(seleccionados.filter(i => i !== item));
    };

    const filteredOptions = opciones.filter(opt =>
        opt.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

    const dropdown = isOpen && (
        <div className="dropdown-menu open" style={dropdownStyle}>
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
    );

    return (
        <div className="custom-select-container" style={{ width: ancho }} ref={containerRef}>
            <div className={`select-trigger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                {triggerContent}
            </div>

            {createPortal(dropdown, document.body)}
        </div>
    );
}
