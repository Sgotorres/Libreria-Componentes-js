import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import SelectDinamico from '../index.js';

describe('SelectDinamico', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        if (container.parentNode) container.parentNode.removeChild(container);
    });

    it('should render search input and suggestions list', () => {
        SelectDinamico(container, { data: ['React', 'Vue'] });
        expect(container.querySelector('.sd__input')).toBeTruthy();
        expect(container.querySelector('.sd__suggestions')).toBeTruthy();
        expect(container.querySelector('.sd__tags')).toBeTruthy();
    });

    it('should filter suggestions based on search term', () => {
        SelectDinamico(container, { data: ['React', 'Vue', 'Angular'] });
        const input = container.querySelector('.sd__input');
        input.value = 'Re';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        const items = container.querySelectorAll('.sd__suggestion');
        expect(items.length).toBe(1);
        expect(items[0].textContent).toContain('React');
    });

    it('should call onSearch callback on input', () => {
        const onSearch = vi.fn();
        SelectDinamico(container, { data: ['React'], onSearch });
        const input = container.querySelector('.sd__input');
        input.value = 'React';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        expect(onSearch).toHaveBeenCalledWith('react');
    });

    it('should add tag on suggestion click', () => {
        const onSelect = vi.fn();
        SelectDinamico(container, { data: ['React'], onSelect });
        const input = container.querySelector('.sd__input');
        input.value = 'Re';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        const item = container.querySelector('.sd__suggestion');
        item.click();
        const tags = container.querySelectorAll('.sd__tag');
        expect(tags.length).toBe(1);
        expect(tags[0].textContent).toContain('React');
        expect(onSelect).toHaveBeenCalledWith('React');
    });

    it('should return selected items via getSelected', () => {
        const comp = SelectDinamico(container, { data: ['React', 'Vue'] });
        const input = container.querySelector('.sd__input');
        input.value = 'Re';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        container.querySelector('.sd__suggestion').click();
        expect(comp.getSelected()).toEqual(['React']);
    });

    it('should remove tag on close click', () => {
        const comp = SelectDinamico(container, { data: ['React'] });
        const input = container.querySelector('.sd__input');
        input.value = 'Re';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        container.querySelector('.sd__suggestion').click();
        expect(comp.getSelected().length).toBe(1);
        container.querySelector('.sd__tag-close').click();
        expect(comp.getSelected().length).toBe(0);
    });

    it('should call onTagRemove when tag is removed', () => {
        const onTagRemove = vi.fn();
        SelectDinamico(container, { data: ['React'], onTagRemove });
        const input = container.querySelector('.sd__input');
        input.value = 'Re';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        container.querySelector('.sd__suggestion').click();
        container.querySelector('.sd__tag-close').click();
        expect(onTagRemove).toHaveBeenCalledWith('React');
    });

    it('should hide suggestions list on outside click', () => {
        SelectDinamico(container, { data: ['React'] });
        const list = container.querySelector('.sd__suggestions');
        const input = container.querySelector('.sd__input');
        input.value = 'Re';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        expect(list.classList.contains('hidden')).toBe(false);
        document.body.click();
        expect(list.classList.contains('hidden')).toBe(true);
    });

    it('should destroy and clean up event listeners', () => {
        const comp = SelectDinamico(container, { data: ['React'] });
        comp.destroy();
        expect(container.innerHTML).toBe('');
    });

    it('should add item via addItem method', () => {
        const comp = SelectDinamico(container, { data: ['React'] });
        comp.addItem('React');
        expect(comp.getSelected()).toEqual(['React']);
        expect(container.querySelectorAll('.sd__tag').length).toBe(1);
    });

    it('should remove item via removeItem method', () => {
        const comp = SelectDinamico(container, { data: ['React'] });
        comp.addItem('React');
        comp.removeItem('React');
        expect(comp.getSelected()).toEqual([]);
    });

    it('should clear all items via clear method', () => {
        const comp = SelectDinamico(container, { data: ['React', 'Vue'] });
        comp.addItem('React');
        comp.addItem('Vue');
        comp.clear();
        expect(comp.getSelected()).toEqual([]);
    });

    it('should update data via setData method', () => {
        const comp = SelectDinamico(container, { data: [] });
        comp.setData(['React', 'Vue', 'Angular']);
        const input = container.querySelector('.sd__input');
        input.value = 'React';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        expect(container.querySelectorAll('.sd__suggestion').length).toBe(1);
    });
});
