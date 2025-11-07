import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import InputField from '$lib/base/InputField.svelte';
import { createRawSnippet } from 'svelte';

describe('Input Field', () => {
	it('Default', async () => {
		render(InputField, {
			id: 'input-field-default',
			'aria-label': 'input'
		});

		const input = page.getByTestId('input-field-default');
		await expect.element(input).toBeInTheDocument();
		expect(input.element().tagName).toBe('INPUT');
		expect(input.element().ariaLabel).toBe('input');
		await input.click();
		await input.fill('Test Input');
		await expect.element(input).toHaveValue('Test Input');
	});

	it('Types', async () => {
		for (const inputFieldType of ['text', 'password']) {
			render(InputField, {
				id: 'input-field-' + inputFieldType,
				'aria-label': 'input',
				type: inputFieldType as any
			});

			const input = page.getByTestId('input-field-' + inputFieldType);
			await expect.element(input).toBeInTheDocument();
			expect(input.element().attributes.getNamedItem('type')!.value).toBe(inputFieldType);
		}
	});

	it('Styling', async () => {
		for (const overrideDefaultStyling of [true, false]) {
			render(InputField, {
				id: 'input-field-override-' + overrideDefaultStyling,
				class: 'override',
				overrideDefaultStyling
			});

			const button = page.getByTestId('input-field-override-' + overrideDefaultStyling);
			await expect.element(button).toBeInTheDocument();
			if (overrideDefaultStyling) {
				await expect.element(button).not.toHaveClass('fluid-input-field');
				await expect.element(button).toHaveClass('override');
			} else {
				await expect.element(button).toHaveClass('fluid-input-field');
				await expect.element(button).toHaveClass('override');
			}
		}
	});

	it('Character Filter', async () => {
		render(InputField, {
			id: 'input-field-default',
			'aria-label': 'input',
			characterFilter: ['1']
		});

		const input = page.getByTestId('input-field-default');
		await expect.element(input).toBeInTheDocument();
		expect(input.element().tagName).toBe('INPUT');
		expect(input.element().ariaLabel).toBe('input');
		await input.click();
		await input.fill('Test Input 1');
		await expect.element(input).toHaveValue('1');
	});
});
