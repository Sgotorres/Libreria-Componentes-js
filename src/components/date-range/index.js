class DateRange extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._currentDate = new Date();
        this._startDate = null;
        this._endDate = null;
    }

    static get observedAttributes() { return ['color-tema', 'allow-past', 'allow-future']; }

    connectedCallback() {
        this._buildTemplate();
        this._bindEvents();
        this._update();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'color-tema' && this._styleEl) {
            this._styleEl.textContent = `:host { --tema: ${newValue || '#3ee7b8'}; }`;
        } else if (this._daysGrid) {
            this._update();
        }
    }

    disconnectedCallback() {
        if (this._keydownHandler) {
            document.removeEventListener('keydown', this._keydownHandler);
        }
    }

    _dispatchChange() {
        this.dispatchEvent(new CustomEvent('range-changed', {
            detail: {
                start: this._startDate ? new Date(this._startDate) : null,
                end: this._endDate ? new Date(this._endDate) : null
            },
            bubbles: true,
            composed: true
        }));
    }

    _changeMonth(offset) {
        this._currentDate.setMonth(this._currentDate.getMonth() + offset);
        this._update();
    }

    _selectDate(day) {
        const clickedDate = new Date(this._currentDate.getFullYear(), this._currentDate.getMonth(), day);
        clickedDate.setHours(0, 0, 0, 0);

        if (!this._startDate || (this._startDate && this._endDate)) {
            this._startDate = clickedDate;
            this._endDate = null;
        } else if (clickedDate < this._startDate) {
            this._startDate = clickedDate;
        } else {
            this._endDate = clickedDate;
        }

        this._update();
        this._dispatchChange();
    }

    clearRange() {
        this._startDate = null;
        this._endDate = null;
        this._update();
        this._dispatchChange();
    }

    _formatDate(date) {
        if (!date) return 'DD/MM/YYYY';
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    _buildTemplate() {
        const colorTema = this.getAttribute('color-tema') || '#3ee7b8';
        this.shadowRoot.innerHTML = `
            <style id="theme-style">:host { --tema: ${colorTema}; }</style>
            <link rel="stylesheet" href="./style.css">
            <div class="calendar-wrapper">
                <div class="rango-input" id="rango-texto"></div>
                <div class="calendar-box">
                    <div class="header">
                        <button class="btn-nav" id="prev-month">◀</button>
                        <span id="month-label"></span>
                        <button class="btn-nav" id="next-month">▶</button>
                    </div>
                    <div class="weekdays"><div>Do</div><div>Lu</div><div>Ma</div><div>Mi</div><div>Ju</div><div>Vi</div><div>Sa</div></div>
                    <div class="days-grid" id="days-grid"></div>
                </div>
            </div>
        `;
        this._styleEl = this.shadowRoot.getElementById('theme-style');
        this._rangoTexto = this.shadowRoot.getElementById('rango-texto');
        this._monthLabel = this.shadowRoot.getElementById('month-label');
        this._daysGrid = this.shadowRoot.getElementById('days-grid');
        this._prevBtn = this.shadowRoot.getElementById('prev-month');
        this._nextBtn = this.shadowRoot.getElementById('next-month');
    }

    _bindEvents() {
        this._prevBtn.addEventListener('click', () => this._changeMonth(-1));
        this._nextBtn.addEventListener('click', () => this._changeMonth(1));
        this._daysGrid.addEventListener('click', (e) => {
            const btn = e.target.closest('.day-btn:not(.disabled)');
            if (btn) this._selectDate(parseInt(btn.dataset.day));
        });
    }

    _update() {
        const allowPast = this.getAttribute('allow-past') !== 'false';
        const allowFuture = this.getAttribute('allow-future') !== 'false';
        const year = this._currentDate.getFullYear();
        const month = this._currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        this._monthLabel.textContent = `${monthNames[month]} ${year}`;
        this._rangoTexto.textContent = `${this._formatDate(this._startDate)}  a  ${this._formatDate(this._endDate)}`;

        const totalCells = firstDay + daysInMonth;

        while (this._daysGrid.children.length < totalCells) {
            this._daysGrid.appendChild(document.createElement('div'));
        }
        while (this._daysGrid.children.length > totalCells) {
            this._daysGrid.removeChild(this._daysGrid.lastChild);
        }

        for (let i = 0; i < totalCells; i++) {
            const cell = this._daysGrid.children[i];
            const day = i - firstDay + 1;

            if (day < 1) {
                cell.className = '';
                cell.textContent = '';
                cell.removeAttribute('data-day');
                continue;
            }

            const thisDay = new Date(year, month, day);
            thisDay.setHours(0, 0, 0, 0);
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

                if (isStart && this._endDate) classNames += ' selected start-range';
                else if (isStart && !this._endDate) classNames += ' selected';
                else if (isEnd) classNames += ' selected end-range';

                if (isInRange) classNames += ' in-range';
            }

            cell.className = classNames;
            cell.textContent = day;
            cell.dataset.day = day;
        }
    }
}
customElements.define('date-range', DateRange);
export default DateRange;