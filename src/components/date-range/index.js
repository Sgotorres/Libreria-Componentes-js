class DateRange extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.rangeStart = null;
        this.rangeEnd = null;
        this.selecting = 'start';
        this.currentMonth = new Date();
        this.hoverDate = null;

        this.options = {
            allowFuture: true,
            allowPast: true,
            minDate: null,
            maxDate: null,
            rangeColor: '#29a3ff'
        };
    }

    connectedCallback() {
        this.renderDOM();
        this.cacheElements();
        this.attachEvents();
        this.renderCalendar();
    }

    /**
     * @param {Object} options
     * @param {boolean} [options.allowFuture]
     * @param {boolean} [options.allowPast]
     * @param {Date} [options.minDate]
     * @param {Date} [options.maxDate]
     * @param {string} [options.rangeColor='#29a3ff']
     * @param {Date} [options.startDate]
     * @param {Date} [options.endDate]
     */
    configure(options = {}) {
        this.options = { ...this.options, ...options };

        if (options.startDate) this.rangeStart = new Date(options.startDate);
        if (options.endDate) this.rangeEnd = new Date(options.endDate);

        if (this.rangeStart) {
            this.currentMonth = new Date(this.rangeStart.getFullYear(), this.rangeStart.getMonth());
        }

        this.renderCalendar();
    }

    normalize(d) {
        return d ? new Date(d.getFullYear(), d.getMonth(), d.getDate()) : null;
    }

    fmt(d) {
        if (!d) return '';
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    isDisabled(date) {
        const today = this.normalize(new Date());
        if (!this.options.allowFuture && date > today) return true;
        if (!this.options.allowPast && date < today) return true;
        if (this.options.minDate && date < this.normalize(new Date(this.options.minDate))) return true;
        if (this.options.maxDate && date > this.normalize(new Date(this.options.maxDate))) return true;
        return false;
    }

    renderDOM() {
        this.shadowRoot.innerHTML = `
            <style>
                .dr-wrapper {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02));
                    backdrop-filter: blur(25px) saturate(180%);
                    -webkit-backdrop-filter: blur(25px) saturate(180%);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-top: 1px solid rgba(255, 255, 255, 0.35);
                    border-left: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 28px;
                    padding: 20px 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                    width: 100%;
                    max-width: 380px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.05);
                    box-sizing: border-box;
                }
                .dr-inputs { display: flex; gap: 12px; }
                .dr-field { flex: 1; display: flex; flex-direction: column; gap: 6px; }
                .dr-field label { color: rgba(255, 255, 255, 0.4); font-size: 11px; letter-spacing: 1px; text-transform: uppercase; }
                .dr-field input { background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 14px; padding: 10px 14px; color: #fff; font-size: 13px; outline: none; cursor: pointer; font-family: inherit; width: 100%; box-sizing: border-box; transition: border-color 0.2s; color-scheme: dark; }
                .dr-field input:focus { border-color: rgba(41, 163, 255, 0.5); }
                .dr-calendar { background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02)); backdrop-filter: blur(25px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 16px; display: none; flex-direction: column; gap: 12px; }
                .dr-calendar.open { display: flex; }
                .dr-calendar-header { display: flex; align-items: center; justify-content: space-between; }
                .dr-calendar-nav { background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.08); color: rgba(255, 255, 255, 0.6); width: 32px; height: 32px; border-radius: 10px; cursor: pointer; font-size: 12px; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
                .dr-calendar-nav:hover { background: rgba(255, 255, 255, 0.12); color: #fff; }
                .dr-calendar-month { color: #fff; font-size: 14px; font-weight: 500; }
                .dr-calendar-weekdays { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; text-align: center; }
                .dr-calendar-weekday { color: rgba(255, 255, 255, 0.25); font-size: 11px; padding: 6px 0; text-transform: uppercase; font-weight: 500; }
                .dr-calendar-days { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
                .dr-calendar-day { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; border-radius: 10px; cursor: pointer; font-size: 12px; color: rgba(255, 255, 255, 0.6); background: transparent; border: none; transition: all 0.15s; padding: 0; font-family: inherit; }
                .dr-calendar-day:hover { background: rgba(41, 163, 255, 0.15); color: #fff; }
                .dr-calendar-day.other-month { color: rgba(255, 255, 255, 0.12); }
                .dr-calendar-day.today { border: 1px solid rgba(41, 163, 255, 0.3); }
                .dr-calendar-day.in-range { background: rgba(41, 163, 255, 0.2); color: #fff; border-radius: 0; }
                .dr-calendar-day.range-start { background: ${this.options.rangeColor}; color: #fff; border-radius: 10px 0 0 10px; }
                .dr-calendar-day.range-end { background: ${this.options.rangeColor}; color: #fff; border-radius: 0 10px 10px 0; }
                .dr-calendar-day.range-single { background: ${this.options.rangeColor}; color: #fff; border-radius: 10px; }
                .dr-calendar-day:disabled { opacity: 0.15; cursor: not-allowed; }
                .dr-options { display: flex; gap: 8px; flex-wrap: wrap; }
                .dr-option-btn { background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 6px 16px; color: rgba(255, 255, 255, 0.5); font-size: 11px; cursor: pointer; transition: all 0.15s; font-family: inherit; }
                .dr-body { overflow: hidden; transition: max-height 0.3s ease, opacity 0.3s ease; max-height: 500px; opacity: 1; display: flex; flex-direction: column; gap: 14px; }
                .dr-body.collapsed { max-height: 0; opacity: 0; margin: 0; padding: 0; gap: 0; }
                .dr-option-btn:hover { background: rgba(41, 163, 255, 0.1); border-color: rgba(41, 163, 255, 0.3); color: #fff; }
            </style>

            <div class="dr-wrapper">
                <div style="display:flex;align-items:center;justify-content:space-between">
                    <span style="color:rgba(255,255,255,0.4);font-size:11px;letter-spacing:1px;text-transform:uppercase">Rango de Fechas</span>
                    <button class="dr-toggle" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:10px;color:rgba(255,255,255,0.5);width:30px;height:30px;cursor:pointer;font-size:12px;display:flex;align-items:center;justify-content:center;font-family:inherit;transition:all 0.15s">−</button>
                </div>
                <div class="dr-body">
                    <div class="dr-inputs">
                        <div class="dr-field">
                            <label>Desde</label>
                            <input type="date" class="dr-input-start" />
                        </div>
                        <div class="dr-field">
                            <label>Hasta</label>
                            <input type="date" class="dr-input-end" />
                        </div>
                    </div>
                    <div class="dr-calendar open">
                        <div class="dr-calendar-header">
                            <button class="dr-calendar-nav" data-nav="prev">◀</button>
                            <span class="dr-calendar-month"></span>
                            <button class="dr-calendar-nav" data-nav="next">▶</button>
                        </div>
                        <div class="dr-calendar-weekdays">
                            <span class="dr-calendar-weekday">Do</span><span class="dr-calendar-weekday">Lu</span>
                            <span class="dr-calendar-weekday">Ma</span><span class="dr-calendar-weekday">Mi</span>
                            <span class="dr-calendar-weekday">Ju</span><span class="dr-calendar-weekday">Vi</span>
                            <span class="dr-calendar-weekday">Sá</span>
                        </div>
                        <div class="dr-calendar-days"></div>
                    </div>
                    <div class="dr-options">
                        <button class="dr-option-btn" data-range="7">7 días</button>
                        <button class="dr-option-btn" data-range="30">30 días</button>
                        <button class="dr-option-btn" data-range="90">90 días</button>
                        <button class="dr-option-btn" data-range="clear">Limpiar</button>
                    </div>
                </div>
            </div>
        `;
    }

    cacheElements() {
        this.inputStart = this.shadowRoot.querySelector('.dr-input-start');
        this.inputEnd = this.shadowRoot.querySelector('.dr-input-end');
        this.calendar = this.shadowRoot.querySelector('.dr-calendar');
        this.monthLabel = this.shadowRoot.querySelector('.dr-calendar-month');
        this.daysGrid = this.shadowRoot.querySelector('.dr-calendar-days');
        this.body = this.shadowRoot.querySelector('.dr-body');
        this.toggleBtn = this.shadowRoot.querySelector('.dr-toggle');
    }

    attachEvents() {
        this.shadowRoot.querySelector('[data-nav="prev"]').addEventListener('click', () => {
            this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
            this.renderCalendar();
        });

        this.shadowRoot.querySelector('[data-nav="next"]').addEventListener('click', () => {
            this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
            this.renderCalendar();
        });

        this.toggleBtn.addEventListener('click', () => {
            const collapsed = this.body.classList.toggle('collapsed');
            this.toggleBtn.textContent = collapsed ? '+' : '−';
        });

        this.inputStart.addEventListener('change', (e) => this.handleInputChange('start', e.target.value));
        this.inputEnd.addEventListener('change', (e) => this.handleInputChange('end', e.target.value));

        this.shadowRoot.querySelectorAll('.dr-option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const val = btn.dataset.range;
                val === 'clear' ? this.clearRange() : this.quickRange(parseInt(val));
            });
        });
    }

    handleInputChange(type, value) {
        if (!value) return;
        const date = this.normalize(new Date(value));

        if (type === 'start') {
            this.rangeStart = date;
            if (this.rangeEnd && this.rangeStart > this.rangeEnd) {
                [this.rangeStart, this.rangeEnd] = [this.rangeEnd, this.rangeStart];
            }
        } else {
            this.rangeEnd = date;
            if (this.rangeStart && this.rangeEnd < this.rangeStart) {
                [this.rangeStart, this.rangeEnd] = [this.rangeEnd, this.rangeStart];
            }
        }
        this.dispatchChangeEvent();
        this.renderCalendar();
    }

    handleDateClick(date) {
        if (this.isDisabled(date)) return;
        const d = this.normalize(date);

        if (this.selecting === 'start') {
            this.rangeStart = d;
            this.rangeEnd = null;
            this.selecting = 'end';
        } else {
            if (d >= this.rangeStart) {
                this.rangeEnd = d;
            } else {
                this.rangeEnd = this.rangeStart;
                this.rangeStart = d;
            }
            this.selecting = 'start';
            this.dispatchChangeEvent();
        }
        this.renderCalendar();
    }

    dispatchChangeEvent() {
        this.dispatchEvent(new CustomEvent('range-changed', {
            detail: {
                start: this.fmt(this.rangeStart),
                end: this.fmt(this.rangeEnd)
            },
            bubbles: true,
            composed: true
        }));
    }

    clearRange() {
        this.rangeStart = null;
        this.rangeEnd = null;
        this.selecting = 'start';
        this.dispatchChangeEvent();
        this.renderCalendar();
    }

    quickRange(days) {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - days);
        this.rangeStart = start;
        this.rangeEnd = end;
        this.selecting = 'start';
        this.dispatchChangeEvent();
        this.renderCalendar();
    }

    renderCalendar() {
        const year = this.currentMonth.getFullYear();
        const month = this.currentMonth.getMonth();
        this.monthLabel.textContent = new Date(year, month).toLocaleDateString('es', { month: 'long', year: 'numeric' });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrev = new Date(year, month, 0).getDate();

        this.daysGrid.innerHTML = '';
        const today = this.normalize(new Date());
        const normStart = this.normalize(this.rangeStart);
        const normEnd = this.normalize(this.rangeEnd);
        const normHover = this.normalize(this.hoverDate);

        const addDay = (day, date, isOther) => {
            const btn = document.createElement('button');
            btn.className = 'dr-calendar-day';
            btn.textContent = day;
            if (isOther) btn.classList.add('other-month');
            if (date && this.normalize(date).getTime() === today.getTime()) btn.classList.add('today');
            if (date && this.isDisabled(date)) btn.disabled = true;

            if (date && normStart) {
                const d = this.normalize(date).getTime();
                const s = normStart.getTime();
                const e = normEnd ? normEnd.getTime() : null;
                const h = normHover ? normHover.getTime() : null;

                if (e) {
                    if (d === s && d === e) btn.classList.add('range-single');
                    else if (d === s) btn.classList.add('range-start');
                    else if (d === e) btn.classList.add('range-end');
                    else if (d > s && d < e) btn.classList.add('in-range');
                } else if (h) {
                    if (d === s) btn.classList.add('range-start');
                    else if ((h > s && d > s && d <= h) || (h < s && d >= h && d < s)) btn.classList.add('in-range');
                    else if (d === h && d !== s) btn.classList.add(h > s ? 'range-end' : 'range-start');
                } else if (d === s) {
                    btn.classList.add('range-single');
                }
            }

            if (date) {
                btn.addEventListener('click', () => this.handleDateClick(date));
                btn.addEventListener('mouseenter', () => {
                    this.hoverDate = date;
                    this.renderCalendar();
                });
            }
            this.daysGrid.appendChild(btn);
        };

        for (let i = firstDay - 1; i >= 0; i--) addDay(daysInPrev - i, new Date(year, month - 1, daysInPrev - i), true);
        for (let i = 1; i <= daysInMonth; i++) addDay(i, new Date(year, month, i), false);

        const remaining = 42 - this.daysGrid.children.length;
        for (let i = 1; i <= remaining; i++) addDay(i, new Date(year, month + 1, i), true);

        this.shadowRoot.querySelectorAll('.range-start, .range-end, .range-single').forEach(el => el.style.background = this.options.rangeColor);
        this.shadowRoot.querySelectorAll('.in-range').forEach(el => el.style.background = this.options.rangeColor + '33');

        this.inputStart.value = this.fmt(this.rangeStart);
        this.inputEnd.value = this.fmt(this.rangeEnd);
    }
}

customElements.define('custom-date-range', DateRange);

(function (global, factory) {
    try {
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = factory();
            return;
        }
    } catch {}
    global.DateRange = factory();
}(typeof window !== 'undefined' ? window : this, function () {
    return DateRange;
}));

export default DateRange;
