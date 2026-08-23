import { page } from '@vitest/browser/context';
import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ColorPicker from '../../src/documentation/theme/ColorPicker.svelte';

describe('Color Picker', () => {
	test('Default', async () => {
		render(ColorPicker, { value: '#3e6ff3', label: 'Choose primary colour' });

		const trigger = page.getByRole('button', { name: 'Choose primary colour' });
		await expect.element(trigger).toBeInTheDocument();
		await trigger.click();
		await expect.element(page.getByText('Lightness')).toBeInTheDocument();
	});

	test('Hex input updates the 500-stop anchor', async () => {
		const onchange = vi.fn();
		render(ColorPicker, { value: '#3e6ff3', onchange });

		await page.getByRole('button', { name: 'Choose colour' }).click();
		await page.getByLabelText('Colour as hex').fill('#10b981');

		expect(onchange).toHaveBeenCalledWith('#10b981');
	});
});
