import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Text from '$lib/base/Text.svelte';

describe('Text', () => {
	it('Default', async () => {
		render(Text, {
			id: 'text-default',
			value: 'Default'
		});

		const text = page.getByTestId('text-default');
		await expect.element(text).toBeInTheDocument();
		expect(text.element().tagName).toBe('P');
		await expect.element(text).toHaveTextContent('Default');
	});

	it('Types', async () => {
		const textTypes = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

		for (const textType of textTypes) {
			render(Text, {
				id: 'text-' + textType,
				value: textType,
				type: textType as any
			});

			const text = page.getByTestId('text-' + textType);
			await expect.element(text).toBeInTheDocument();
			expect(text.element().tagName).toBe(textType.toUpperCase());
			await expect.element(text).toHaveTextContent(textType);
		}
	});

	it('Styling', async () => {
		for (const overrideDefaultStyling of [true, false]) {
			render(Text, {
				id: 'text-override-' + overrideDefaultStyling,
				value: 'Default',
				class: 'text-2xl',
				overrideDefaultStyling
			});

			const text = page.getByTestId('text-override-' + overrideDefaultStyling);
			await expect.element(text).toBeInTheDocument();
			expect(text.element().tagName).toBe('P');
			await expect.element(text).toHaveTextContent('Default');

			if (overrideDefaultStyling) {
				await expect.element(text).toHaveClass('text-2xl');
				await expect.element(text).not.toHaveClass('fluid-text');
			} else {
				await expect.element(text).toHaveClass('text-2xl');
				await expect.element(text).toHaveClass('fluid-text');
			}
		}
	});

	it('Override Default Styling', async () => {
		render(Text, {
			id: 'text-default',
			value: 'Default',
			class: 'text-2xl',
			overrideDefaultStyling: true
		});

		const text = page.getByTestId('text-default');
		await expect.element(text).toBeInTheDocument();
		expect(text.element().tagName).toBe('P');
		await expect.element(text).toHaveTextContent('Default');
		await expect.element(text).not.toHaveClass('fluid-text');
	});

	it('Override Default Styling', async () => {
		render(Text, {
			id: 'text-default',
			value: 'Default',
			'aria-label': 'text'
		});

		const text = page.getByTestId('text-default');
		await expect.element(text).toBeInTheDocument();
		expect(text.element().tagName).toBe('P');
		await expect.element(text).toHaveTextContent('Default');
		expect(text.element().ariaLabel).toBe('text');
	});
});
