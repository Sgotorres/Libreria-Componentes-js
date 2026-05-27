import React, { useState, useMemo, useEffect } from 'react';
import './style.css'; // Mantenemos tus estilos originales

export default function Table({ 
    data = [], 
    columns = [], 
    pageSize = 10, 
    ancho = '100%', 
    largo = 'auto' 
}) {
    // ESTADOS
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    // Si los datos o el término de búsqueda cambian, volvemos a la página 1
    useEffect(() => {
        setCurrentPage(1);
    }, [data, searchTerm]);

    // MOTOR DE FILTROS Y ORGANIZADORES (Usamos useMemo para mayor rendimiento)
    const processedData = useMemo(() => {
        let processed = [...data];

        // 1. Buscador Integrado
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            processed = processed.filter(row => 
                columns.some(col => String(row[col.key]).toLowerCase().includes(term))
            );
        }

        // 2. Ordenamiento en el Header
        if (sortConfig.key && sortConfig.direction) {
            const colDef = columns.find(c => c.key === sortConfig.key);
            
            processed.sort((a, b) => {
                let vA = a[sortConfig.key];
                let vB = b[sortConfig.key];
                
                // Organizador personalizado
                if (colDef && typeof colDef.customSort === 'function') {
                    return colDef.customSort(vA, vB, sortConfig.direction);
                }
                
                // Manejo de valores vacíos
                if (vA == null) return 1; 
                if (vB == null) return -1;
                
                // Ordenar por Fechas
                if (colDef && colDef.type === 'date') {
                    return sortConfig.direction === 'asc' ? new Date(vA) - new Date(vB) : new Date(vB) - new Date(vA);
                }
                // Ordenar por Números
                if (colDef && colDef.type === 'number' || (typeof vA === 'number' && typeof vB === 'number')) {
                    return sortConfig.direction === 'asc' ? vA - vB : vB - vA;
                }
                // Ordenar Alfabéticamente (por defecto)
                return sortConfig.direction === 'asc' 
                    ? String(vA).localeCompare(String(vB)) 
                    : String(vB).localeCompare(String(vA));
            });
        }
        return processed;
    }, [data, columns, searchTerm, sortConfig]);

    // LÓGICA DE PAGINACIÓN
    const totalPages = Math.ceil(processedData.length / pageSize) || 1;
    // Evitamos estar en una página que no existe
    const validCurrentPage = currentPage > totalPages ? totalPages : currentPage;
    
    const start = (validCurrentPage - 1) * pageSize;
    const pageData = processedData.slice(start, start + pageSize);

    // MANEJADORES DE EVENTOS
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key) {
            if (sortConfig.direction === 'asc') direction = 'desc';
            else if (sortConfig.direction === 'desc') direction = null;
        }
        setSortConfig({ key: direction ? key : null, direction });
    };

    return (
        <div className="table-wrapper" style={{ width: ancho, height: largo }}>
            
            {/* Buscador */}
            <div className="toolbar">
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Buscar en la tabla..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Vista de Escritorio (Tabla) */}
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            {columns.map(col => {
                                const isSorted = sortConfig.key === col.key;
                                const icon = isSorted ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '';
                                return (
                                    <th key={col.key} onClick={() => handleSort(col.key)} style={{ cursor: 'pointer' }}>
                                        {col.label} <span className="sort-icon">{icon}</span>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {pageData.length > 0 ? pageData.map((row, index) => (
                            <tr key={row.id || index}>
                                {columns.map(col => (
                                    <td key={col.key}>{row[col.key] != null ? row[col.key] : ''}</td>
                                ))}
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={columns.length} className="empty-state">No se encontraron resultados.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Vista Móvil (Tarjetas) */}
            <div className="mobile-cards">
                {pageData.length > 0 ? pageData.map((row, index) => (
                    <div className="card" key={row.id || index}>
                        {columns.map(col => (
                            <div className="card-row" key={col.key}>
                                <span className="card-label">{col.label}</span>
                                <span className="card-value">{row[col.key] != null ? row[col.key] : ''}</span>
                            </div>
                        ))}
                    </div>
                )) : (
                    <div className="card empty-state">No se encontraron resultados.</div>
                )}
            </div>

            {/* Paginación */}
            <div className="pagination">
                <span>Página {validCurrentPage} de {totalPages}</span>
                <div className="btn-group">
                    <button 
                        className="btn-page" 
                        onClick={() => setCurrentPage(p => p - 1)} 
                        disabled={validCurrentPage === 1}
                    >
                        Anterior
                    </button>
                    <button 
                        className="btn-page" 
                        onClick={() => setCurrentPage(p => p + 1)} 
                        disabled={validCurrentPage === totalPages}
                    >
                        Siguiente
                    </button>
                </div>
            </div>

        </div>
    );
}