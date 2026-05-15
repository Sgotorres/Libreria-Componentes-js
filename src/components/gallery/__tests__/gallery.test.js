import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import Modal from '../../modal/index.js';

globalThis.Modal = Modal;

const Gallery = (await import('../index.js')).default;

describe('Gallery', () => {
    let container;
    let gallery;
    const components = [
        { name: 'Alpha', icon: 'α', color: '#ff0000', desc: 'First component', badge: 'v1' },
        { name: 'Beta', icon: 'β', color: '#00ff00', desc: 'Second component', badge: 'v2' },
        { name: 'Gamma', icon: 'γ', color: '#0000ff', desc: 'Third component', badge: 'v3' },
    ];

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        gallery = Gallery(container, { title: 'Test Gallery', components });
    });

    afterEach(() => {
        if (gallery) gallery.destroy();
        if (container.parentNode) container.parentNode.removeChild(container);
    });

    it('should render title', () => {
        const title = container.querySelector('.gl__title');
        expect(title).toBeTruthy();
        expect(title.textContent).toBe('Test Gallery');
    });

    it('should render a card for each component', () => {
        const cards = container.querySelectorAll('.gl__card');
        expect(cards.length).toBe(3);
    });

    it('should render card with name, icon, description and badge', () => {
        const card = container.querySelector('.gl__card');
        expect(card.querySelector('.gl__card-name').textContent).toBe('Alpha');
        expect(card.querySelector('.gl__card-icon').textContent).toBe('α');
        expect(card.querySelector('.gl__card-desc').textContent).toBe('First component');
        expect(card.querySelector('.gl__card-badge').textContent).toBe('v1');
    });

    it('should set card icon background color', () => {
        const icon = container.querySelector('.gl__card-icon');
        expect(icon.style.color).toBe('rgb(255, 0, 0)');
    });

    it('should filter cards by name', () => {
        gallery.filter('Beta');
        const cards = container.querySelectorAll('.gl__card');
        expect(cards[0].style.display).toBe('none');
        expect(cards[1].style.display).toBe('');
        expect(cards[2].style.display).toBe('none');
    });

    it('should show all cards when filter is empty', () => {
        gallery.filter('');
        const cards = container.querySelectorAll('.gl__card');
        cards.forEach(c => expect(c.style.display).toBe(''));
    });

    it('should show all cards when filter matches nothing', () => {
        gallery.filter('XYZ');
        const cards = container.querySelectorAll('.gl__card');
        cards.forEach(c => expect(c.style.display).toBe('none'));
    });

    it('should open modal on card click', () => {
        const card = container.querySelector('.gl__card');
        card.click();
        const overlay = document.querySelector('.md');
        expect(overlay.classList.contains('md--hidden')).toBe(false);
        expect(overlay.querySelector('.md__title').textContent).toBe('Alpha');
    });

    it('should open modal via gallery.open method', () => {
        gallery.open('Beta');
        const overlay = document.querySelector('.md');
        expect(overlay.querySelector('.md__title').textContent).toBe('Beta');
    });

    it('should not crash opening unknown component', () => {
        expect(() => gallery.open('Unknown')).not.toThrow();
    });

    it('should clean up on destroy', () => {
        gallery.destroy();
        expect(container.innerHTML).toBe('');
        const overlay = document.querySelector('.md');
        expect(overlay).toBeNull();
    });
});
