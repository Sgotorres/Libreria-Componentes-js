import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Modal from '../index.js';

describe('Modal', () => {
    let modal;

    beforeEach(() => {
        modal = Modal();
    });

    afterEach(() => {
        modal.destroy();
    });

    function getOverlay() {
        return document.querySelector('.md');
    }

    it('should create overlay and append to body', () => {
        const overlay = getOverlay();
        expect(overlay).toBeTruthy();
        expect(overlay.classList.contains('md')).toBe(true);
    });

    it('should be hidden by default', () => {
        const overlay = getOverlay();
        expect(overlay.classList.contains('hidden')).toBe(true);
    });

    it('should open modal with title and preview', () => {
        modal.open({ title: 'Test Title', preview: '<p>Preview content</p>' });
        const overlay = getOverlay();
        expect(overlay.classList.contains('hidden')).toBe(false);
        expect(overlay.querySelector('.md__title').textContent).toBe('Test Title');
        expect(overlay.querySelector('.md__preview').innerHTML).toContain('Preview content');
    });

    it('should close modal when close button is clicked', () => {
        modal.open({ title: 'Test' });
        expect(getOverlay().classList.contains('hidden')).toBe(false);
        getOverlay().querySelector('.md__close').click();
        expect(getOverlay().classList.contains('hidden')).toBe(true);
    });

    it('should close modal when overlay backdrop is clicked', () => {
        modal.open({ title: 'Test' });
        getOverlay().click();
        expect(getOverlay().classList.contains('hidden')).toBe(true);
    });

    it('should close modal on Escape key', () => {
        modal.open({ title: 'Test' });
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(getOverlay().classList.contains('hidden')).toBe(true);
    });

    it('should switch between preview and code tabs', () => {
        modal.open({ title: 'Test', preview: '<p>Preview</p>', code: 'console.log("hi")' });
        const tabs = getOverlay().querySelectorAll('.md__tab');
        const preview = getOverlay().querySelector('.md__preview');
        const code = getOverlay().querySelector('.md__code');

        expect(tabs[0].classList.contains('active')).toBe(true);
        expect(preview.classList.contains('active')).toBe(true);
        expect(code.classList.contains('active')).toBe(false);

        tabs[1].click();
        expect(tabs[0].classList.contains('active')).toBe(false);
        expect(tabs[1].classList.contains('active')).toBe(true);
        expect(preview.classList.contains('active')).toBe(false);
        expect(code.classList.contains('active')).toBe(true);
    });

    it('should call renderPreview when provided', () => {
        const renderPreview = vi.fn();
        modal.open({ title: 'Test', renderPreview });
        expect(renderPreview).toHaveBeenCalledTimes(1);
        expect(renderPreview).toHaveBeenCalledWith(
            getOverlay().querySelector('.md__preview')
        );
    });

    it('should close modal via returned close method', () => {
        modal.open({ title: 'Test' });
        modal.close();
        expect(getOverlay().classList.contains('hidden')).toBe(true);
    });

    it('should clean up on destroy', () => {
        const overlay = getOverlay();
        modal.destroy();
        expect(document.body.contains(overlay)).toBe(false);
    });

    it('should not throw when opening with empty data', async () => {
        await expect(modal.open({})).resolves.toBeUndefined();
    });

    it('should show fallback text when no preview provided', () => {
        modal.open({ title: 'No Preview' });
        expect(getOverlay().querySelector('.md__preview').innerHTML).toContain('Sin preview');
    });
});
