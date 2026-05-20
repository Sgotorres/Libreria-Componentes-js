class DateRange extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._currentDate = new Date();
        this._startDate = null;
        this._endDate = null;
    }

    static get observedAttributes() { return ['color-tema', 'allow-past', 'allow-future']; }
    
    connectedCallback() { this.render(); }
    attributeChangedCallback() { this.render(); }

    _changeMonth(offset) {
        this._currentDate.setMonth(this._currentDate.getMonth() + offset);
        this.render();
    }

    _selectDate(day) {
        const clickedDate = new Date(this._currentDate.getFullYear(), this._currentDate.getMonth(), day);
        clickedDate.setHours(0,0,0,0);

        if (!this._startDate || (this._startDate && this._endDate)) {
            this._startDate = clickedDate;
            this._endDate = null;
        } else if (clickedDate < this._startDate) {
            this._startDate = clickedDate;
        } else {
            this._endDate = clickedDate;
        }
        
        this.render();
    }

    _formatDate(date) {
        if (!date) return 'DD/MM/YYYY';
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    render() {
        const colorTema = this.getAttribute('color-tema') || '#3ee7b8';
        const allowPast = this.getAttribute('allow-past') !== 'false';
        const allowFuture = this.getAttribute('allow-future') !== 'false';
        
        const year = this._currentDate.getFullYear();
        const month = this._currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        const today = new Date();
        today.setHours(0,0,0,0);
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        let daysHtml = '';
        for (let i = 0; i < firstDay; i++) { daysHtml += `<div></div>`; }

        for (let i = 1; i <= daysInMonth; i++) {
            const thisDay = new Date(year, month, i);
            thisDay.setHours(0,0,0,0);
            const thisTime = thisDay.getTime();
            
            let isDisabled = false;
            if (!allowPast && thisDay < today) isDisabled = true;
            if (!allowFuture && thisDay > today) isDisabled = true;

            let classNames = 'day-btn';
            
            if (isDisabled) {
                classNames += ' disabled';
            } else {
                const isStart = this._startDate && thisTime === this._startDate.getTime();
                const isEnd = this._endDate && thisTime === this._endDate.getTime();
                const isInRange = this._startDate && this._endDate && thisTime > this._startDate.getTime() && thisTime < this._endDate.getTime();

                // Lógica para que la cinta encaje perfecto con los extremos
                if (isStart && this._endDate) classNames += ' selected start-range';
                else if (isStart && !this._endDate) classNames += ' selected';
                else if (isEnd) classNames += ' selected end-range';
                
                if (isInRange) classNames += ' in-range';
            }

            daysHtml += `<div class="${classNames}" data-day="${i}">${i}</div>`;
        }

        const textoRango = `${this._formatDate(this._startDate)}  a  ${this._formatDate(this._endDate)}`;

        this.shadowRoot.innerHTML = `
            <style>:host { --tema: ${colorTema}; }</style>
            <link rel="stylesheet" href="./style.css">
            
            <div class="calendar-wrapper">
                <div class="rango-input">${textoRango}</div>
                <div class="calendar-box">
                    <div class="header">
                        <button class="btn-nav" id="prev-month">◀</button>
                        <span>${monthNames[month]} ${year}</span>
                        <button class="btn-nav" id="next-month">▶</button>
                    </div>
                    <div class="weekdays"><div>Do</div><div>Lu</div><div>Ma</div><div>Mi</div><div>Ju</div><div>Vi</div><div>Sa</div></div>
                    <div class="days-grid">${daysHtml}</div>
                </div>
            </div>
        `;

        this.shadowRoot.querySelector('#prev-month').addEventListener('click', () => this._changeMonth(-1));
        this.shadowRoot.querySelector('#next-month').addEventListener('click', () => this._changeMonth(1));
        this.shadowRoot.querySelectorAll('.day-btn:not(.disabled)').forEach(btn => {
            btn.addEventListener('click', (e) => this._selectDate(parseInt(e.target.dataset.day)));
        });
    }
}
customElements.define('date-range', DateRange);
export default DateRange;