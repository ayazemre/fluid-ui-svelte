import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Modal } from '$lib/components';
import { createRawSnippet } from 'svelte';

describe('Modal', () => {
	test('Default', async () => {
		const { rerender } = render(Modal, {
			componentId: 'modal-default',
			isOpen: false,
			children: createRawSnippet(() => ({
				render: () => '<span>Modal Content</span>'
			}))
		});

		// Should not be in the document initially
		await expect.element(page.getByTestId('modal-default')).not.toBeInTheDocument();

		// Open modal
		await rerender({ isOpen: true });

		const modalContainer = page.getByTestId('modal-default');
		await expect.element(modalContainer).toBeInTheDocument();
		await expect.element(modalContainer).toHaveClass('fluid-modal-container');
		await expect.element(modalContainer).toHaveAttribute('role', 'dialog');
		await expect.element(modalContainer).toHaveAttribute('aria-modal', 'true');

		// Check panel
		const modalPanel = page.getByTestId('modal-default-panel');
		await expect.element(modalPanel).toBeInTheDocument();
		await expect.element(modalPanel).toHaveClass('fluid-modal-panel');
		expect(modalPanel.element().textContent).toContain('Modal Content');
	});

	test('Interaction', async () => {
		let isOpen = true;

		render(Modal, {
			componentId: 'modal-interaction',
			get isOpen() {
				return isOpen;
			},
			set isOpen(value) {
				isOpen = value;
			},
			closeOnBackdropClick: true,
			children: createRawSnippet(() => ({
				render: () => '<span>Content</span>'
			}))
		});

		const modalContainer = page.getByTestId('modal-interaction');
		const modalPanel = page.getByTestId('modal-interaction-panel');

		// Click panel (should NOT close due to stopPropagation)
		await modalPanel.click();
		expect(isOpen).toBe(true);

		// Click backdrop (the container itself)
		await modalContainer.click({ position: { x: 0, y: 0 } });

		// Small wait for state update
		await new Promise((resolve) => setTimeout(resolve, 100));

		expect(isOpen).toBe(false);
	});

	test('Variant', async () => {
		render(Modal, {
			componentId: 'modal-variant',
			isOpen: true,
			variant: 'custom-variant',
			children: createRawSnippet(() => ({
				render: () => '<span>Content</span>'
			}))
		});

		const modalContainer = page.getByTestId('modal-variant');
		await expect.element(modalContainer).toHaveClass('custom-variant');

		const modalPanel = page.getByTestId('modal-variant-panel');
		await expect.element(modalPanel).toHaveClass('custom-variant');
	});
});
