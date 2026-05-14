(function (global, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        global.DateRange = factory();
    }
}(typeof window !== 'undefined' ? window : this, function () {
    "use strict";

    function DateRange(container, options = {}) {
        const {
            allowFuture = true,
            allowPast = true,
            minDate = null,
            maxDate = null,
            rangeColor = '#29a3ff',
            startDate = null,
            endDate = null,
            onChange = null
        } = options;

        let rangeStart = startDate ? new Date(startDate) : null;
        let rangeEnd = endDate ? new Date(endDate) : null;
        let selecting = 'start';
        let currentMonth = new Date();
        let hoverDate = null;

        function normalize(d) {
            return d ? new Date(d.getFullYear(), d.getMonth(), d.getDate()) : null;
        }

        function fmt(d) {
            if (!d) return '';
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        }

        function isDisabled(date) {
            const today = normalize(new Date());
            if (!allowFuture && date > today) return true;
            if (!allowPast && date < today) return true;
            if (minDate && date < normalize(new Date(minDate))) return true;
            if (maxDate && date > normalize(new Date(maxDate))) return true;
            return false;
        }

        // --- BUILD DOM ---
        const wrapper = document.createElement('div');
        wrapper.className = 'dr-wrapper';

        wrapper.innerHTML = `
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
                        <span class="dr-calendar-weekday">Do</span>
                        <span class="dr-calendar-weekday">Lu</span>
                        <span class="dr-calendar-weekday">Ma</span>
                        <span class="dr-calendar-weekday">Mi</span>
                        <span class="dr-calendar-weekday">Ju</span>
                        <span class="dr-calendar-weekday">Vi</span>
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
        `;

        const inputStart = wrapper.querySelector('.dr-input-start');
        const inputEnd = wrapper.querySelector('.dr-input-end');
        const calendar = wrapper.querySelector('.dr-calendar');
        const monthLabel = wrapper.querySelector('.dr-calendar-month');
        const daysGrid = wrapper.querySelector('.dr-calendar-days');
        const body = wrapper.querySelector('.dr-body');
        const toggleBtn = wrapper.querySelector('.dr-toggle');

        container.appendChild(wrapper);

        function setRangeStyle() {
            document.querySelectorAll('.dr-calendar-day').forEach(el => el.removeAttribute('style'));
            document.querySelectorAll('.dr-calendar-day.in-range, .dr-calendar-day.range-start, .dr-calendar-day.range-end, .dr-calendar-day.range-single').forEach(el => {
                if (el.classList.contains('range-start') || el.classList.contains('range-end') || el.classList.contains('range-single')) {
                    el.style.background = rangeColor;
                } else if (el.classList.contains('in-range')) {
                    el.style.background = rangeColor + '33';
                }
            });
        }

        function renderCalendar() {
            const year = currentMonth.getFullYear();
            const month = currentMonth.getMonth();
            monthLabel.textContent = new Date(year, month).toLocaleDateString('es', { month: 'long', year: 'numeric' });

            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const daysInPrev = new Date(year, month, 0).getDate();

            daysGrid.innerHTML = '';

            const today = normalize(new Date());
            const normStart = normalize(rangeStart);
            const normEnd = normalize(rangeEnd);
            const normHover = normalize(hoverDate);

            function addDay(day, date, isOther) {
                const btn = document.createElement('button');
                btn.className = 'dr-calendar-day';
                btn.textContent = day;
                if (isOther) btn.classList.add('other-month');

                if (date && normalize(date).getTime() === today.getTime()) {
                    btn.classList.add('today');
                }

                if (date && isDisabled(date)) {
                    btn.disabled = true;
                }

                if (date && normStart && normEnd) {
                    const d = normalize(date).getTime();
                    const s = normStart.getTime();
                    const e = normEnd.getTime();
                    if (d === s && d === e) {
                        btn.classList.add('range-single');
                    } else if (d === s) {
                        btn.classList.add('range-start');
                    } else if (d === e) {
                        btn.classList.add('range-end');
                    } else if (d > s && d < e) {
                        btn.classList.add('in-range');
                    }
                } else if (date && normStart && !normEnd && normHover) {
                    const d = normalize(date).getTime();
                    const s = normStart.getTime();
                    const h = normHover.getTime();
                    if (d === s) {
                        btn.classList.add('range-start');
                    } else if ((h > s && d > s && d <= h) || (h < s && d >= h && d < s)) {
                        btn.classList.add('in-range');
                    } else if (d === h && d !== s) {
                        if (h > s) btn.classList.add('range-end');
                        else btn.classList.add('range-start');
                    }
                } else if (date && normStart && !normEnd && !normHover) {
                    if (normalize(date).getTime() === normStart.getTime()) {
                        btn.classList.add('range-single');
                    }
                }

                if (date) {
                    btn.dataset.date = fmt(date);
                    btn.addEventListener('click', () => handleDateClick(date));
                    btn.addEventListener('mouseenter', () => {
                        hoverDate = date;
                        renderCalendar();
                    });
                }

                daysGrid.appendChild(btn);
            }

            // Previous month days
            for (let i = firstDay - 1; i >= 0; i--) {
                const d = daysInPrev - i;
                const date = new Date(year, month - 1, d);
                addDay(d, date, true);
            }

            // Current month
            for (let i = 1; i <= daysInMonth; i++) {
                const date = new Date(year, month, i);
                addDay(i, date, false);
            }

            // Next month days
            const totalCells = daysGrid.children.length;
            const remaining = 42 - totalCells;
            for (let i = 1; i <= remaining; i++) {
                const date = new Date(year, month + 1, i);
                addDay(i, date, true);
            }

            setRangeStyle();
            inputStart.value = fmt(rangeStart);
            inputEnd.value = fmt(rangeEnd);
        }

        function handleDateClick(date) {
            if (isDisabled(date)) return;
            const d = normalize(date);

            if (selecting === 'start') {
                rangeStart = d;
                rangeEnd = null;
                selecting = 'end';
            } else {
                if (d >= rangeStart) {
                    rangeEnd = d;
                } else {
                    rangeEnd = rangeStart;
                    rangeStart = d;
                }
                selecting = 'start';
                if (onChange) onChange(fmt(rangeStart), fmt(rangeEnd));
            }
            renderCalendar();
        }

        function setRange(start, end) {
            rangeStart = start ? new Date(start) : null;
            rangeEnd = end ? new Date(end) : null;
            selecting = 'start';
            if (onChange && rangeStart && rangeEnd) onChange(fmt(rangeStart), fmt(rangeEnd));
            renderCalendar();
        }

        function clearRange() {
            rangeStart = null;
            rangeEnd = null;
            selecting = 'start';
            if (onChange) onChange(null, null);
            renderCalendar();
        }

        function quickRange(days) {
            const end = new Date();
            const start = new Date();
            start.setDate(start.getDate() - days);
            setRange(start, end);
        }

        // --- EVENTS ---
        wrapper.querySelector('[data-nav="prev"]').addEventListener('click', () => {
            currentMonth.setMonth(currentMonth.getMonth() - 1);
            renderCalendar();
        });
        wrapper.querySelector('[data-nav="next"]').addEventListener('click', () => {
            currentMonth.setMonth(currentMonth.getMonth() + 1);
            renderCalendar();
        });

        toggleBtn.addEventListener('click', () => {
            const collapsed = body.classList.toggle('collapsed');
            toggleBtn.textContent = collapsed ? '+' : '−';
        });

        inputStart.addEventListener('focus', () => {
            selecting = 'start';
            if (inputStart.value) {
                rangeStart = normalize(new Date(inputStart.value));
                renderCalendar();
            }
        });

        inputEnd.addEventListener('focus', () => {
            selecting = 'end';
            if (inputEnd.value) {
                rangeEnd = normalize(new Date(inputEnd.value));
                renderCalendar();
            }
        });

        inputStart.addEventListener('change', () => {
            if (inputStart.value) {
                rangeStart = normalize(new Date(inputStart.value));
                if (rangeEnd && rangeStart > rangeEnd) {
                    const tmp = rangeStart;
                    rangeStart = rangeEnd;
                    rangeEnd = tmp;
                }
                if (onChange) onChange(fmt(rangeStart), fmt(rangeEnd));
                renderCalendar();
            }
        });

        inputEnd.addEventListener('change', () => {
            if (inputEnd.value) {
                rangeEnd = normalize(new Date(inputEnd.value));
                if (rangeStart && rangeEnd < rangeStart) {
                    const tmp = rangeStart;
                    rangeStart = rangeEnd;
                    rangeEnd = tmp;
                }
                if (onChange) onChange(fmt(rangeStart), fmt(rangeEnd));
                renderCalendar();
            }
        });

        wrapper.querySelectorAll('.dr-option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const val = btn.dataset.range;
                if (val === 'clear') clearRange();
                else quickRange(parseInt(val));
            });
        });

        // Init
        if (rangeStart) {
            currentMonth = new Date(rangeStart.getFullYear(), rangeStart.getMonth());
        }
        renderCalendar();

        return {
            element: wrapper,
            getRange: () => ({ start: rangeStart ? fmt(rangeStart) : null, end: rangeEnd ? fmt(rangeEnd) : null }),
            setRange,
            clearRange,
            open: () => { calendar.classList.add('open'); },
            close: () => { calendar.classList.remove('open'); }
        };
    }

    return DateRange;
}));
