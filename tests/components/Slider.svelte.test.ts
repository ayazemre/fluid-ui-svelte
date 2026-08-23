import { page } from '@vitest/browser/context';
import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Slider } from '$lib/components';

describe('Slider', () => {
	test('Default Rendering', async () => {
		render(Slider, {
			componentId: 'slider-default',
			value: 40,
			min: 0,
			max: 100
		});

		const slider = page.getByRole('slider');
		await expect.element(slider).toBeInTheDocument();
		expect(slider.element().getAttribute('aria-valuenow')).toBe('40');
		expect(slider.element().getAttribute('aria-valuemin')).toBe('0');
		expect(slider.element().getAttribute('aria-valuemax')).toBe('100');
	});

	test('Keyboard Stepping', async () => {
		let sliderValue = 50;
		const onchange = vi.fn(async (v: number) => {
			sliderValue = v;
		});

		render(Slider, {
			componentId: 'slider-keys',
			get value() {
				return sliderValue;
			},
			set value(v) {
				sliderValue = v;
			},
			min: 0,
			max: 100,
			step: 5,
			onchange
		});

		const slider = page.getByRole('slider');
		await slider
			.element()
			.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

		expect(onchange).toHaveBeenCalledWith(55);
	});

	test('Show Value Header', async () => {
		render(Slider, {
			componentId: 'slider-header',
			value: 75,
			showValue: true
		});

		await expect.element(page.getByText('75')).toBeInTheDocument();
	});
});
