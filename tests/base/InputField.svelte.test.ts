import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import InputField from '$lib/base/InputField.svelte';

describe('Input Field', () => {
	test('Default', async () => {
		render(InputField, {
			id: 'input-field-default',
			'aria-label': 'input'
		});

		// Structure Check
		const input = page.getByTestId('input-field-default');
		await expect.element(input).toBeInTheDocument();
		expect(input.element().tagName).toBe('INPUT');

		// Attributes
		expect(input.element().ariaLabel).toBe('input');

		// Interaction (Fill)
		await input.click();
		await input.fill('Test Input');
		await expect.element(input).toHaveValue('Test Input');
	});

	test('Types', async () => {
		for (const inputFieldType of ['text', 'password']) {
			render(InputField, {
				id: 'input-field-' + inputFieldType,
				'aria-label': 'input',
				type: inputFieldType as any
			});

			// Polymorphism Check
			const input = page.getByTestId('input-field-' + inputFieldType);
			await expect.element(input).toBeInTheDocument();
			expect(input.element().attributes.getNamedItem('type')!.value).toBe(inputFieldType);
		}
	});

	test('Styling', async () => {
		for (const overrideDefaultStyling of [true, false]) {
			render(InputField, {
				id: 'input-field-override-' + overrideDefaultStyling,
				class: 'override',
				overrideDefaultStyling
			});

			// Existence Check
			const input = page.getByTestId('input-field-override-' + overrideDefaultStyling);
			await expect.element(input).toBeInTheDocument();

			// Class Validation
			if (overrideDefaultStyling) {
				await expect.element(input).not.toHaveClass('fluid-input-field');
				await expect.element(input).toHaveClass('override');
			} else {
				await expect.element(input).toHaveClass('fluid-input-field');
				await expect.element(input).toHaveClass('override');
			}
		}
	});

	test('Character Filter', async () => {
		render(InputField, {
			id: 'input-field-default',
			'aria-label': 'input',
			characterFilter: ['1']
		});

		// Structure Check
		const input = page.getByTestId('input-field-default');
		await expect.element(input).toBeInTheDocument();
		expect(input.element().tagName).toBe('INPUT');
		expect(input.element().ariaLabel).toBe('input');

		// Interaction (Filtering Logic)
		await input.click();
		await input.fill('Test Input 1');
		await expect.element(input).toHaveValue('1');
	});
});
