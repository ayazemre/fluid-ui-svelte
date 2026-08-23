import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Select } from '$lib/base';

describe('Select', () => {
	const sampleOptions = [
		{ value: 'opt1', label: 'Option 1' },
		{ value: 'opt2', label: 'Option 2' },
		{ value: 'opt3', label: 'Option 3', disabled: true }
	];

	test('Default Rendering and Options', async () => {
		render(Select, {
			id: 'select-default',
			options: sampleOptions,
			value: 'opt1'
		});

		const select = page.getByTestId('select-default');
		await expect.element(select).toBeInTheDocument();
		expect(select.element().tagName).toBe('SELECT');
		await expect.element(select).toHaveValue('opt1');
		await expect.element(select).toHaveClass('fluid-select');
	});

	test('Placeholder Support', async () => {
		render(Select, {
			id: 'select-placeholder',
			placeholder: 'Choose an option',
			options: sampleOptions
		});

		const select = page.getByTestId('select-placeholder');
		await expect.element(select).toBeInTheDocument();
		await expect.element(page.getByText('Choose an option')).toBeInTheDocument();
	});

	test('Override Default Styling', async () => {
		render(Select, {
			id: 'select-override',
			overrideDefaultStyling: true,
			options: sampleOptions
		});

		const select = page.getByTestId('select-override');
		await expect.element(select).toBeInTheDocument();
		await expect.element(select).not.toHaveClass('fluid-select');
	});
});
