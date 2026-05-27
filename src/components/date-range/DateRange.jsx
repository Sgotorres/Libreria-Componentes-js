import React, { useState, useEffect } from 'react';
import './style.css'; // Usamos tu CSS original

export default function DateRange({ 
    colorTema = '#3ee7b8', 
    allowPast = false, 
    allowFuture = true, 
    onRangeChanged // Equivalente a tu evento dispatchEvent
}) {
    // ESTADOS: Equivalente a lo que tenías en el constructor()
    const [currentDate, setCurrentDate] = useState(new Date());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Disparamos el evento cada vez que cambia el rango
    useEffect(() => {
        if (onRangeChanged) {
            onRangeChanged({ start: startDate, end: endDate });
        }
    }, [startDate, endDate, onRangeChanged]);

    // LÓGICA DE NAVEGACIÓN: Cambiar de mes
    const changeMonth = (offset) => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + offset);
            return newDate;
        });
    };

    // LÓGICA DE SELECCIÓN: Elegir el rango de fechas
    const selectDate = (day) => {
        const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        clickedDate.setHours(0, 0, 0, 0);

        if (!startDate || (startDate && endDate)) {
            setStartDate(clickedDate);
            setEndDate(null);
        } else if (clickedDate < startDate) {
            setStartDate(clickedDate);
        } else {
            setEndDate(clickedDate);
        }
    };

    const formatDate = (date) => {
        if (!date) return 'DD/MM/YYYY';
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    // PREPARACIÓN DE VARIABLES PARA EL CALENDARIO (_update original)
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    // GENERAMOS LA CUADRÍCULA (GRID) DE DÍAS
    const totalCells = firstDay + daysInMonth;
    const cells = [];

    for (let i = 0; i < totalCells; i++) {
        const day = i - firstDay + 1;

        if (day < 1) {
            // Espacios vacíos antes del primer día del mes
            cells.push(<div key={`empty-${i}`}></div>);
            continue;
        }

        const thisDay = new Date(year, month, day);
        thisDay.setHours(0, 0, 0, 0);
        const thisTime = thisDay.getTime();

        // Validaciones de pasado/futuro
        let isDisabled = false;
        // Tratamos los atributos booleanos o string ('false')
        const isAllowPast = String(allowPast) !== 'false';
        const isAllowFuture = String(allowFuture) !== 'false';

        if (!isAllowPast && thisDay < today) isDisabled = true;
        if (!isAllowFuture && thisDay > today) isDisabled = true;

        // Asignación de clases CSS
        let classNames = 'day-btn';
        if (isDisabled) {
            classNames += ' disabled';
        } else {
            const isStart = startDate && thisTime === startDate.getTime();
            const isEnd = endDate && thisTime === endDate.getTime();
            const isInRange = startDate && endDate && thisTime > startDate.getTime() && thisTime < endDate.getTime();

            if (isStart && endDate) classNames += ' selected start-range';
            else if (isStart && !endDate) classNames += ' selected';
            else if (isEnd) classNames += ' selected end-range';

            if (isInRange) classNames += ' in-range';
        }

        cells.push(
            <div 
                key={`day-${day}`} 
                className={classNames} 
                onClick={() => !isDisabled && selectDate(day)}
            >
                {day}
            </div>
        );
    }

    // EL RENDERIZADO DEL COMPONENTE (JSX)
    return (
        // Pasamos la variable CSS global del tema usando style
        <div className="calendar-wrapper" style={{ '--tema': colorTema }}>
            <div className="rango-input">
                {formatDate(startDate)}  a  {formatDate(endDate)}
            </div>
            <div className="calendar-box">
                <div className="header">
                    <button className="btn-nav" onClick={() => changeMonth(-1)}>◀</button>
                    <span>{monthNames[month]} {year}</span>
                    <button className="btn-nav" onClick={() => changeMonth(1)}>▶</button>
                </div>
                <div className="weekdays">
                    <div>Do</div><div>Lu</div><div>Ma</div><div>Mi</div><div>Ju</div><div>Vi</div><div>Sa</div>
                </div>
                <div className="days-grid">
                    {cells}
                </div>
            </div>
        </div>
    );
}