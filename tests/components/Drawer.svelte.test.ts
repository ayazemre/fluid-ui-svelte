import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Drawer from '$lib/components/Drawer.svelte';
import { createRawSnippet } from 'svelte';

describe('Drawer', () => {
	test('Default', async () => {
		const { rerender } = render(Drawer, {
			componentId: 'drawer-default',
			isOpen: false,
			children: createRawSnippet(() => ({
				render: () => '<span>Drawer Content</span>'
			}))
		});

		// Should not be in the document initially
		await expect.element(page.getByTestId('drawer-default')).not.toBeInTheDocument();

		// Open drawer
		await rerender({ isOpen: true });

		const drawerContainer = page.getByTestId('drawer-default');
		await expect.element(drawerContainer).toBeInTheDocument();
		await expect.element(drawerContainer).toHaveClass('fluid-drawer-container');
		await expect.element(drawerContainer).toHaveAttribute('role', 'dialog');
		await expect.element(drawerContainer).toHaveAttribute('aria-modal', 'true');

		// Check panel
		const drawerPanel = drawerContainer.element().children[0];
		expect(drawerPanel).not.toBeUndefined();
		expect(drawerPanel.classList.contains('fluid-drawer-panel')).toBe(true);
		expect(drawerPanel.classList.contains('left-0')).toBe(true); // Default position
		expect(drawerPanel.textContent).toContain('Drawer Content');
	});

	test('Variant', async () => {
		render(Drawer, {
			componentId: 'drawer-variant',
			isOpen: true,
			variant: 'primary',
			children: createRawSnippet(() => ({
				render: () => '<span>Content</span>'
			}))
		});

		const drawerContainer = page.getByTestId('drawer-variant');
		await expect.element(drawerContainer).toHaveClass('primary');

		const drawerPanel = drawerContainer.element().children[0];
		expect(drawerPanel.classList.contains('primary')).toBe(true);
	});

	test('Positions', async () => {
		const { rerender } = render(Drawer, {
			componentId: 'drawer-position',
			isOpen: true,
			position: 'right',
			children: createRawSnippet(() => ({
				render: () => '<span>Content</span>'
			}))
		});

		const drawerContainer = page.getByTestId('drawer-position');
		let drawerPanel = drawerContainer.element().children[0];
		expect(drawerPanel.classList.contains('right-0')).toBe(true);

		await rerender({ position: 'top' });
		drawerPanel = drawerContainer.element().children[0];
		expect(drawerPanel.classList.contains('top-0')).toBe(true);

		await rerender({ position: 'bottom' });
		drawerPanel = drawerContainer.element().children[0];
		expect(drawerPanel.classList.contains('bottom-0')).toBe(true);
	});

	test('Interaction', async () => {
		let isOpen = true;

		render(Drawer, {
			componentId: 'drawer-interaction',
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

		const drawerContainer = page.getByTestId('drawer-interaction');
		const drawerPanel = drawerContainer
			.element()
			.querySelector('.fluid-drawer-panel') as HTMLElement;

		// Click panel (should NOT close due to stopPropagation)
		drawerPanel.click();
		expect(isOpen).toBe(true);

		// Click backdrop (the container itself)
		await drawerContainer.click();

		// Small wait for the async handler and state update
		await new Promise((resolve) => setTimeout(resolve, 50));

		expect(isOpen).toBe(false);
	});
});
