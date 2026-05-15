import './index.js';
import './style.css';

export default {
    title: 'Components/DateRange',
    render: () => {
        const el = document.createElement('custom-date-range');
        el.configure({
            allowFuture: true,
            allowPast: true,
            rangeColor: '#29a3ff',
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        });
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.justifyContent = 'center';
        wrapper.style.padding = '20px';
        wrapper.appendChild(el);
        return wrapper;
    },
};

export const Default = {};
