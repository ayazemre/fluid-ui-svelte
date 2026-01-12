import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Breadcrumb } from '$lib/components';

describe('Breadcrumb', () => {
	test('Default', async () => {
		const items = [
			{ label: 'Home', href: '/' },
			{ label: 'Components', href: '/components' },
			{ label: 'Breadcrumb', href: '/components/breadcrumb' }
		];

		render(Breadcrumb, {
			componentId: 'breadcrumb-default',
			items
		});

		const container = page.getByTestId('breadcrumb-default');
		await expect.element(container).toBeInTheDocument();

		// Check if labels are present
		await expect.element(page.getByText('Home')).toBeInTheDocument();
		await expect.element(page.getByText('Components')).toBeInTheDocument();
		await expect.element(page.getByText('Breadcrumb')).toBeInTheDocument();

		// Check if Home and Components are links
		const homeLink = page.getByRole('link', { name: 'Home' });
		await expect.element(homeLink).toBeInTheDocument();
		await expect.element(homeLink).toHaveAttribute('href', '/');

		// Check if last item is current page
		const current = page.getByText('Breadcrumb');
		await expect.element(current).toHaveAttribute('aria-current', 'page');
	});

	test('Custom Separator', async () => {
		const items = [
			{ label: 'Home', href: '/' },
			{ label: 'Breadcrumb', href: '/breadcrumb' }
		];

		render(Breadcrumb, {
			items,
			separator: '>'
		});

		await expect.element(page.getByText('>')).toBeInTheDocument();
	});
});
