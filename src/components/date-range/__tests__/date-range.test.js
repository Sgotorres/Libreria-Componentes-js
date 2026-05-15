import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '../index.js';

function createDateRange() {
    const el = document.createElement('custom-date-range');
    document.body.appendChild(el);
    return el;
}

describe('DateRange', () => {
    let el;

    beforeEach(() => {
        el = createDateRange();
    });

    afterEach(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
    });

    it('should be a registered custom element', () => {
        expect(el).toBeInstanceOf(HTMLElement);
        expect(el.tagName.toLowerCase()).toBe('custom-date-range');
    });

    it('should attach shadow root', () => {
        expect(el.shadowRoot).toBeTruthy();
    });

    it('should render the wrapper structure', () => {
        const wrapper = el.shadowRoot.querySelector('.dr-wrapper');
        expect(wrapper).toBeTruthy();
        expect(el.shadowRoot.querySelector('.dr-input-start')).toBeTruthy();
        expect(el.shadowRoot.querySelector('.dr-input-end')).toBeTruthy();
        expect(el.shadowRoot.querySelector('.dr-calendar')).toBeTruthy();
    });

    it('should render calendar month label', () => {
        const monthLabel = el.shadowRoot.querySelector('.dr-calendar-month');
        expect(monthLabel).toBeTruthy();
        expect(monthLabel.textContent.length).toBeGreaterThan(0);
    });

    it('should render day cells in calendar grid', () => {
        const days = el.shadowRoot.querySelectorAll('.dr-calendar-day');
        expect(days.length).toBeGreaterThan(0);
    });

    it('should configure with custom options', () => {
        el.configure({
            rangeColor: '#ff0000',
            allowFuture: false,
            allowPast: true,
        });
        const inRange = el.shadowRoot.querySelectorAll('.in-range');
        inRange.forEach(day => {
            expect(day.style.background).toMatch(/rgba?\(255,\s*0,\s*0/);
        });
    });

    it('should set start and end dates via configure', () => {
        const start = new Date(2026, 4, 1);
        const end = new Date(2026, 4, 15);
        el.configure({ startDate: start, endDate: end });
        expect(el.shadowRoot.querySelector('.dr-input-start').value).toBe('2026-05-01');
        expect(el.shadowRoot.querySelector('.dr-input-end').value).toBe('2026-05-15');
    });

    it('should disable future dates when allowFuture is false', () => {
        el.configure({ allowFuture: false });
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 30);
        expect(el.isDisabled(futureDate)).toBe(true);
    });

    it('should enable past dates when allowPast is true', () => {
        el.configure({ allowPast: true });
        const pastDate = new Date(2020, 0, 1);
        expect(el.isDisabled(pastDate)).toBe(false);
    });

    it('should disable past dates when allowPast is false', () => {
        el.configure({ allowPast: false });
        const pastDate = new Date(2020, 0, 1);
        expect(el.isDisabled(pastDate)).toBe(true);
    });

    it('should handle date click and toggle selection', () => {
        el.configure({ allowFuture: true, allowPast: true });
        const startDay = el.shadowRoot.querySelector('.dr-calendar-day:not(.other-month)');
        if (!startDay) return;
        startDay.click();
        expect(el.rangeStart).toBeTruthy();
        expect(el.selecting).toBe('end');
    });

    it('should dispatch range-changed event on click', () => {
        const handler = vi.fn();
        el.addEventListener('range-changed', handler);
        el.configure({ allowFuture: true, allowPast: true });
        const days = el.shadowRoot.querySelectorAll('.dr-calendar-day:not(.other-month)');
        if (days.length < 2) return;

        days[0].click();
        days[1].click();
        expect(handler).toHaveBeenCalledTimes(1);
        const detail = handler.mock.calls[0][0].detail;
        expect(detail.start).toBeTruthy();
        expect(detail.end).toBeTruthy();
    });

    it('should clear range via clearRange method', () => {
        const start = new Date(2026, 4, 1);
        const end = new Date(2026, 4, 15);
        el.configure({ startDate: start, endDate: end });
        expect(el.rangeStart).toBeTruthy();
        expect(el.rangeEnd).toBeTruthy();
        el.clearRange();
        expect(el.rangeStart).toBeNull();
        expect(el.rangeEnd).toBeNull();
    });

    it('should set 7-day range via quickRange', () => {
        el.quickRange(7);
        expect(el.rangeStart).toBeTruthy();
        expect(el.rangeEnd).toBeTruthy();
        const diff = Math.round((el.rangeEnd - el.rangeStart) / (1000 * 60 * 60 * 24));
        expect(diff).toBe(7);
    });

    it('should navigate calendar months', () => {
        const initialMonth = el.currentMonth.getMonth();
        el.shadowRoot.querySelector('[data-nav="next"]').click();
        expect(el.currentMonth.getMonth()).toBe((initialMonth + 1) % 12);
        el.shadowRoot.querySelector('[data-nav="prev"]').click();
        expect(el.currentMonth.getMonth()).toBe(initialMonth);
    });

    it('should toggle calendar body visibility', () => {
        const toggle = el.shadowRoot.querySelector('.dr-toggle');
        const body = el.shadowRoot.querySelector('.dr-body');
        expect(body.classList.contains('collapsed')).toBe(false);
        toggle.click();
        expect(body.classList.contains('collapsed')).toBe(true);
        toggle.click();
        expect(body.classList.contains('collapsed')).toBe(false);
    });
});
