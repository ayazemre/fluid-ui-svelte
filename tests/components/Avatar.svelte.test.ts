import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Avatar } from '$lib/components';

describe('Avatar', () => {
	test('Initials Fallback', async () => {
		render(Avatar, {
			componentId: 'avatar-initials',
			name: 'Emre Ayaz',
			size: 'md'
		});

		const container = page.getByTestId('avatar-initials');
		await expect.element(container).toBeInTheDocument();
		await expect.element(page.getByText('EA')).toBeInTheDocument();
	});

	test('Single Name Initials', async () => {
		render(Avatar, {
			componentId: 'avatar-single',
			name: 'Sarah'
		});

		const container = page.getByTestId('avatar-single');
		await expect.element(container).toBeInTheDocument();
		await expect.element(page.getByText('SA')).toBeInTheDocument();
	});

	test('Status Indicator', async () => {
		render(Avatar, {
			componentId: 'avatar-status',
			name: 'John Doe',
			status: 'online'
		});

		const container = page.getByTestId('avatar-status');
		await expect.element(container).toBeInTheDocument();

		const statusDot = page.getByRole('status');
		await expect.element(statusDot).toBeInTheDocument();
		await expect.element(statusDot).toHaveClass('fluid-avatar-status-online');
	});

	test('Variant Propagation', async () => {
		render(Avatar, {
			componentId: 'avatar-variant',
			name: 'Test',
			variant: 'bordered'
		});

		const container = page.getByTestId('avatar-variant');
		await expect.element(container).toHaveClass('fluid-avatar-bordered');
	});
});
