import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { ContextMenu } from '$lib/components';
import { createRawSnippet } from 'svelte';

describe('ContextMenu', () => {
	test('Trigger Rendering and Context Menu Opening', async () => {
		render(ContextMenu, {
			componentId: 'context-menu-test',
			trigger: createRawSnippet(() => {
				return { render: () => '<div id="context-trigger">Right click me</div>' };
			}),
			menu: createRawSnippet(() => {
				return { render: () => '<button id="menu-action">Action</button>' };
			})
		});

		const trigger = page.getByText('Right click me');
		await expect.element(trigger).toBeInTheDocument();

		// Menu should not be visible before right click
		await expect.element(page.getByRole('menu')).not.toBeInTheDocument();

		// Trigger right click context menu
		const targetElement = page.getByTestId('context-menu-test');
		await targetElement
			.element()
			.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 200, clientY: 200 }));

		// Menu should now be open
		const menu = page.getByRole('menu');
		await expect.element(menu).toBeInTheDocument();
		await expect.element(page.getByText('Action')).toBeInTheDocument();
	});
});
