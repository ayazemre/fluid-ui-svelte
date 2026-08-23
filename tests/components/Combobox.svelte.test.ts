import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Combobox } from '$lib/components';

describe('Combobox', () => {
	const sampleOptions = [
		{ value: 'svelte', label: 'Svelte' },
		{ value: 'react', label: 'React' },
		{ value: 'vue', label: 'Vue' }
	];

	test('Default Rendering', async () => {
		render(Combobox, {
			componentId: 'combobox-default',
			options: sampleOptions,
			placeholder: 'Choose framework'
		});

		const trigger = page.getByRole('button', { name: /Choose framework/i });
		await expect.element(trigger).toBeInTheDocument();
	});

	test('Open Dropdown on Click', async () => {
		render(Combobox, {
			componentId: 'combobox-open',
			options: sampleOptions,
			placeholder: 'Choose framework'
		});

		const trigger = page.getByRole('button', { name: /Choose framework/i });
		await trigger.click();

		const listbox = page.getByRole('listbox');
		await expect.element(listbox).toBeInTheDocument();
		await expect.element(page.getByRole('option', { name: 'Svelte' })).toBeInTheDocument();
		await expect.element(page.getByRole('option', { name: 'React' })).toBeInTheDocument();
	});

	test('Select Option', async () => {
		render(Combobox, {
			componentId: 'combobox-select',
			options: sampleOptions,
			placeholder: 'Choose framework'
		});

		const trigger = page.getByRole('button', { name: /Choose framework/i });
		await trigger.click();

		const svelteOption = page.getByRole('option', { name: 'Svelte' });
		await svelteOption.click();

		// Trigger should now display selected label
		await expect.element(page.getByText('Svelte')).toBeInTheDocument();
	});
});
