import { page } from '@vitest/browser/context';
import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { PinInput } from '$lib/components';

describe('PinInput', () => {
	test('Renders Correct Number of Digit Inputs', async () => {
		render(PinInput, {
			componentId: 'pin-input-default',
			length: 4
		});

		const container = page.getByTestId('pin-input-default');
		await expect.element(container).toBeInTheDocument();

		const inputs = container.element().querySelectorAll('input');
		expect(inputs.length).toBe(4);
	});

	test('Typing and Completion Callback', async () => {
		const onComplete = vi.fn();
		let pinValue = '';

		render(PinInput, {
			componentId: 'pin-input-complete',
			length: 4,
			get value() {
				return pinValue;
			},
			set value(v) {
				pinValue = v;
			},
			onComplete
		});

		const container = page.getByTestId('pin-input-complete');
		const inputs = container.element().querySelectorAll('input');

		// Fill all 4 inputs
		inputs[0].value = '1';
		inputs[0].dispatchEvent(new Event('input', { bubbles: true }));

		inputs[1].value = '2';
		inputs[1].dispatchEvent(new Event('input', { bubbles: true }));

		inputs[2].value = '3';
		inputs[2].dispatchEvent(new Event('input', { bubbles: true }));

		inputs[3].value = '4';
		inputs[3].dispatchEvent(new Event('input', { bubbles: true }));

		expect(onComplete).toHaveBeenCalledWith('1234');
	});

	test('External Value Updates Existing Digits', async () => {
		const { rerender } = render(PinInput, {
			componentId: 'pin-input-controlled',
			length: 4,
			value: '1234'
		});

		await expect.element(page.getByLabelText('Digit 1 of 4')).toHaveValue('1');
		await rerender({ value: '5678' });
		await expect.element(page.getByLabelText('Digit 1 of 4')).toHaveValue('5');
		await expect.element(page.getByLabelText('Digit 4 of 4')).toHaveValue('8');
	});
});
