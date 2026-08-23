import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Checkbox } from '$lib/base';

describe('Checkbox', () => {
	test('Default', async () => {
		render(Checkbox, {
			id: 'checkbox-default',
			label: 'Accept Terms'
		});

		const input = page.getByTestId('checkbox-default');
		await expect.element(input).toBeInTheDocument();
		expect(input.element().tagName).toBe('INPUT');
		expect((input.element() as HTMLInputElement).type).toBe('checkbox');
		expect((input.element() as HTMLInputElement).checked).toBe(false);
	});

	test('Checked and Toggle State', async () => {
		let isChecked = false;
		render(Checkbox, {
			id: 'checkbox-toggle',
			get checked() {
				return isChecked;
			},
			set checked(v) {
				isChecked = v;
			},
			label: 'Subscribe'
		});

		const input = page.getByTestId('checkbox-toggle');
		await input.click();
		expect(isChecked).toBe(true);
		expect((input.element() as HTMLInputElement).checked).toBe(true);
	});

	test('Disabled State', async () => {
		render(Checkbox, {
			id: 'checkbox-disabled',
			disabled: true,
			label: 'Disabled option'
		});

		const input = page.getByTestId('checkbox-disabled');
		await expect.element(input).toBeDisabled();
	});

	test('Styling and Override', async () => {
		for (const overrideDefaultStyling of [true, false]) {
			render(Checkbox, {
				id: 'checkbox-override-' + overrideDefaultStyling,
				label: 'Option',
				overrideDefaultStyling
			});

			const input = page.getByTestId('checkbox-override-' + overrideDefaultStyling);
			await expect.element(input).toBeInTheDocument();

			if (overrideDefaultStyling) {
				await expect.element(input).not.toHaveClass('fluid-checkbox-input');
			} else {
				await expect.element(input).toHaveClass('fluid-checkbox-input');
			}
		}
	});
});
