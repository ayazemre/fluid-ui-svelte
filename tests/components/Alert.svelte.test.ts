import { page } from '@vitest/browser/context';
import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Alert } from '$lib/components';

describe('Alert', () => {
	test('Default Rendering', async () => {
		render(Alert, {
			componentId: 'alert-default',
			type: 'info',
			title: 'Info Title',
			description: 'Info description content'
		});

		const container = page.getByTestId('alert-default');
		await expect.element(container).toBeInTheDocument();
		expect(container.element().getAttribute('role')).toBe('alert');
		await expect.element(container).toHaveClass('fluid-alert-info');
		await expect.element(page.getByText('Info Title')).toBeInTheDocument();
		await expect.element(page.getByText('Info description content')).toBeInTheDocument();
	});

	test('Dismiss Interaction', async () => {
		const ondismiss = vi.fn();
		render(Alert, {
			componentId: 'alert-dismiss',
			type: 'success',
			title: 'Success Title',
			dismissible: true,
			ondismiss
		});

		const container = page.getByTestId('alert-dismiss');
		await expect.element(container).toBeInTheDocument();

		const dismissButton = page.getByRole('button', { name: 'Dismiss alert' });
		await expect.element(dismissButton).toBeInTheDocument();
		await dismissButton.click();

		expect(ondismiss).toHaveBeenCalled();
	});

	test('Variants and Types', async () => {
		render(Alert, {
			componentId: 'alert-error',
			type: 'error',
			variant: 'bordered',
			title: 'Error'
		});

		const container = page.getByTestId('alert-error');
		await expect.element(container).toHaveClass('fluid-alert-error');
		await expect.element(container).toHaveClass('fluid-alert-bordered');
	});
});
