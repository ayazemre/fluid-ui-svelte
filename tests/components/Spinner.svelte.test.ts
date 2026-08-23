import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Spinner } from '$lib/components';

describe('Spinner', () => {
	test('Default Rendering and Accessibility', async () => {
		render(Spinner, {
			componentId: 'spinner-default',
			label: 'Processing payment...'
		});

		const spinner = page.getByTestId('spinner-default');
		await expect.element(spinner).toBeInTheDocument();
		expect(spinner.element().getAttribute('role')).toBe('status');
		expect(spinner.element().getAttribute('aria-label')).toBe('Processing payment...');
		await expect.element(spinner).toHaveClass('fluid-spinner');
	});

	test('Size Variants', async () => {
		render(Spinner, {
			componentId: 'spinner-sizes',
			size: 'lg'
		});

		const spinner = page.getByTestId('spinner-sizes');
		await expect.element(spinner).toBeInTheDocument();
		await expect.element(spinner).toHaveClass('h-8');
		await expect.element(spinner).toHaveClass('w-8');
	});
});
