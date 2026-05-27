import React, { useEffect } from 'react';
import './style.css'; // Mantenemos tus estilos CSS intactos

export default function Modal({
    isOpen,          // Booleano que dice si se muestra o no
    onClose,         // Función para cerrarlo
    type = 'info', 
    bgColor = 'rgba(15, 23, 42, 0.85)', 
    color, 
    headerImage, 
    btn1 = 'Aceptar', 
    btn2,
    onAction1,
    onAction2,
    children,        // Esto reemplaza al <slot> principal
    actionSlot       // Esto reemplaza al <slot name="actions">
}) {
    // Controlar el scroll del body cuando el modal se abre/cierra
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        // Limpieza: asegura que el scroll vuelva a la normalidad si el componente se destruye
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    // Si no está abierto, no renderizamos nada
    if (!isOpen) return null;

    const baseColors = { error: '#ef4444', info: '#3b82f6', confirm: '#eab308', custom: '#8b5cf6' };
    const typeColor = color || baseColors[type] || '#3ee7b8';

    // Generador de Íconos SVG según el tipo
    const renderIcon = () => {
        if (type === 'error') {
            return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={typeColor} strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>;
        } else if (type === 'info') {
            return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={typeColor} strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
        } else if (type === 'confirm') {
            return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={typeColor} strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
        }
        return null;
    };

    const handleOverlayClick = (e) => {
        if (e.target.className === 'overlay') {
            onClose();
        }
    };

    return (
        <div className="overlay" style={{ background: bgColor }} onClick={handleOverlayClick}>
            <div className="modal-container">
                {headerImage && <img src={headerImage} className="header-img" alt="Header" />}
                
                <div className="modal-body">
                    {type !== 'custom' && (
                        <div className="icon-container">{renderIcon()}</div>
                    )}
                    {/* El contenido que le pasemos al modal aparecerá aquí */}
                    <div className="content-slot">
                        {children}
                    </div>
                </div>

                <div className="modal-actions">
                    {type === 'custom' && actionSlot ? (
                        actionSlot
                    ) : (
                        <>
                            {btn2 && (
                                <button className="btn-secondary" onClick={() => { onAction2 && onAction2(); onClose(); }}>
                                    {btn2}
                                </button>
                            )}
                            <button className="btn-primary" style={{ background: typeColor }} onClick={() => { onAction1 && onAction1(); onClose(); }}>
                                {btn1}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}