import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Switch } from '$lib/components';

describe('Switch', () => {
	test('Default', async () => {
		render(Switch, {
			componentId: 'switch-default',
			onclick: async () => {}
		});

		const switchButton = page.getByTestId('switch-default');
		await expect.element(switchButton).toBeInTheDocument();
		await expect.element(switchButton).toHaveAttribute('aria-checked', 'false');
		await expect.element(switchButton).toHaveClass('fluid-switch-button');

		const circle = switchButton.element().querySelector('.fluid-switch-circle');
		expect(circle).not.toBeNull();
		expect(circle?.classList.contains('translate-x-0')).toBe(true);
	});

	test('Variant', async () => {
		render(Switch, {
			componentId: 'switch-variant',
			variant: 'primary',
			onclick: async () => {}
		});

		const switchButton = page.getByTestId('switch-variant');
		// Button component should have the variant as a class
		await expect.element(switchButton).toHaveClass('primary');
		await expect.element(switchButton).toHaveClass('fluid-switch-button');
	});

	test('Interaction', async () => {
		let isChecked = false;
		const { rerender } = render(Switch, {
			componentId: 'switch-interaction',
			checked: isChecked,
			onclick: async () => {
				isChecked = !isChecked;
			}
		});

		const switchButton = page.getByTestId('switch-interaction');

		// Click to toggle
		await switchButton.click();
		expect(isChecked).toBe(true);

		// Re-render with new bound value to verify visual state
		await rerender({ checked: isChecked });
		await expect.element(switchButton).toHaveAttribute('aria-checked', 'true');

		const circle = switchButton.element().querySelector('.fluid-switch-circle');
		expect(circle?.classList.contains('translate-x-4')).toBe(true);
	});

	test('Disabled State', async () => {
		let clicked = false;
		render(Switch, {
			componentId: 'switch-disabled',
			disabled: true,
			onclick: async () => {
				clicked = true;
			}
		});

		const switchButton = page.getByTestId('switch-disabled');
		await expect.element(switchButton).toBeDisabled();

		// Use force: true because Playwright/Vitest normally prevents clicking disabled elements
		await switchButton.click({ force: true });
		expect(clicked).toBe(false);
	});
});
