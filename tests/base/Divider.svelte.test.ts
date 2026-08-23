import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Divider } from '$lib/base';

describe('Divider', () => {
	test('Default', async () => {
		render(Divider, {
			id: 'divider-default'
		});

		const divider = page.getByTestId('divider-default');
		await expect.element(divider).toBeInTheDocument();
		expect(divider.element().tagName).toBe('HR');
		expect(divider.element().getAttribute('aria-orientation')).toBe('horizontal');
		await expect.element(divider).toHaveClass('fluid-divider-horizontal');
	});

	test('Vertical Orientation', async () => {
		render(Divider, {
			id: 'divider-vertical',
			orientation: 'vertical'
		});

		const divider = page.getByTestId('divider-vertical');
		await expect.element(divider).toBeInTheDocument();
		expect(divider.element().getAttribute('aria-orientation')).toBe('vertical');
		await expect.element(divider).toHaveClass('fluid-divider-vertical');
	});

	test('With Label', async () => {
		render(Divider, {
			id: 'divider-label',
			label: 'OR'
		});

		const container = page.getByTestId('divider-label');
		await expect.element(container).toBeInTheDocument();
		expect(container.element().tagName).toBe('DIV');
		await expect.element(container).toHaveTextContent('OR');
	});

	test('Styling and Override', async () => {
		for (const overrideDefaultStyling of [true, false]) {
			render(Divider, {
				id: 'divider-override-' + overrideDefaultStyling,
				overrideDefaultStyling
			});

			const divider = page.getByTestId('divider-override-' + overrideDefaultStyling);
			await expect.element(divider).toBeInTheDocument();

			if (overrideDefaultStyling) {
				await expect.element(divider).not.toHaveClass('fluid-divider-horizontal');
			} else {
				await expect.element(divider).toHaveClass('fluid-divider-horizontal');
			}
		}
	});
});
