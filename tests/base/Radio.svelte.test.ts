import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Radio } from '$lib/base';

describe('Radio', () => {
	test('Default', async () => {
		render(Radio, {
			id: 'radio-default',
			name: 'contact',
			value: 'email',
			label: 'Email'
		});

		const input = page.getByTestId('radio-default');
		await expect.element(input).toBeInTheDocument();
		expect(input.element().tagName).toBe('INPUT');
		expect((input.element() as HTMLInputElement).type).toBe('radio');
		expect((input.element() as HTMLInputElement).value).toBe('email');
	});

	test('Group Selection', async () => {
		let groupValue = 'phone';
		render(Radio, {
			id: 'radio-group-test',
			name: 'contact',
			value: 'email',
			get group() {
				return groupValue;
			},
			set group(v) {
				groupValue = v;
			},
			label: 'Email'
		});

		const input = page.getByTestId('radio-group-test');
		expect((input.element() as HTMLInputElement).checked).toBe(false);

		await input.click();
		expect(groupValue).toBe('email');
		expect((input.element() as HTMLInputElement).checked).toBe(true);
	});

	test('Disabled State', async () => {
		render(Radio, {
			id: 'radio-disabled',
			name: 'contact',
			value: 'sms',
			disabled: true,
			label: 'SMS'
		});

		const input = page.getByTestId('radio-disabled');
		await expect.element(input).toBeDisabled();
	});

	test('Styling and Override', async () => {
		for (const overrideDefaultStyling of [true, false]) {
			render(Radio, {
				id: 'radio-override-' + overrideDefaultStyling,
				name: 'test',
				value: 'val',
				label: 'Option',
				overrideDefaultStyling
			});

			const input = page.getByTestId('radio-override-' + overrideDefaultStyling);
			await expect.element(input).toBeInTheDocument();

			if (overrideDefaultStyling) {
				await expect.element(input).not.toHaveClass('fluid-radio-input');
			} else {
				await expect.element(input).toHaveClass('fluid-radio-input');
			}
		}
	});
});
