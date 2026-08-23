import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Kbd } from '$lib/base';
import { createRawSnippet } from 'svelte';

describe('Kbd', () => {
	test('Default Rendering', async () => {
		render(Kbd, {
			id: 'kbd-default',
			children: createRawSnippet(() => {
				return { render: () => '<span>Ctrl</span>' };
			})
		});

		const kbd = page.getByTestId('kbd-default');
		await expect.element(kbd).toBeInTheDocument();
		expect(kbd.element().tagName).toBe('KBD');
		await expect.element(kbd).toHaveTextContent('Ctrl');
		await expect.element(kbd).toHaveClass('fluid-kbd');
	});

	test('Override Default Styling', async () => {
		render(Kbd, {
			id: 'kbd-override',
			overrideDefaultStyling: true,
			children: createRawSnippet(() => {
				return { render: () => '<span>⌘</span>' };
			})
		});

		const kbd = page.getByTestId('kbd-override');
		await expect.element(kbd).toBeInTheDocument();
		await expect.element(kbd).not.toHaveClass('fluid-kbd');
	});
});
