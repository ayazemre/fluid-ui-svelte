import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Progress } from '$lib/components';

describe('Progress', () => {
	test('Default Determinate', async () => {
		render(Progress, {
			componentId: 'progress-default',
			value: 60,
			max: 100,
			showValue: true
		});

		const wrapper = page.getByTestId('progress-default');
		await expect.element(wrapper).toBeInTheDocument();

		const progressBar = page.getByRole('progressbar');
		await expect.element(progressBar).toBeInTheDocument();
		expect(progressBar.element().getAttribute('aria-valuenow')).toBe('60');
		expect(progressBar.element().getAttribute('aria-valuemax')).toBe('100');
		await expect.element(page.getByText('60%')).toBeInTheDocument();
	});

	test('Indeterminate State', async () => {
		render(Progress, {
			componentId: 'progress-indeterminate'
		});

		const progressBar = page.getByRole('progressbar');
		await expect.element(progressBar).toBeInTheDocument();
		expect(progressBar.element().getAttribute('aria-valuenow')).toBeNull();
		expect(progressBar.element().getAttribute('aria-valuetext')).toBe('Loading');
	});

	test('Variant Propagation', async () => {
		render(Progress, {
			componentId: 'progress-variant',
			variant: 'thick',
			value: 40
		});

		const wrapper = page.getByTestId('progress-variant');
		await expect.element(wrapper).toHaveClass('thick');
	});
});
