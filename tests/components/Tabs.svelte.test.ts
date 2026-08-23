import { page } from '@vitest/browser/context';
import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Tabs } from '$lib/components';
import { createRawSnippet } from 'svelte';

describe('Tabs', () => {
	const tabItems = [
		{
			id: 'first',
			label: 'First Tab',
			content: createRawSnippet(() => {
				return { render: () => '<p id="first-content">First Content</p>' };
			})
		},
		{
			id: 'second',
			label: 'Second Tab',
			content: createRawSnippet(() => {
				return { render: () => '<p id="second-content">Second Content</p>' };
			})
		},
		{
			id: 'disabled',
			label: 'Disabled Tab',
			disabled: true,
			content: createRawSnippet(() => {
				return { render: () => '<p>Disabled Content</p>' };
			})
		}
	];

	test('Default Rendering', async () => {
		render(Tabs, {
			componentId: 'tabs-default',
			items: tabItems
		});

		const container = page.getByTestId('tabs-default');
		await expect.element(container).toBeInTheDocument();

		const firstTab = page.getByRole('tab', { name: 'First Tab' });
		const secondTab = page.getByRole('tab', { name: 'Second Tab' });

		await expect.element(firstTab).toBeInTheDocument();
		await expect.element(secondTab).toBeInTheDocument();
		expect(firstTab.element().getAttribute('aria-selected')).toBe('true');
		expect(secondTab.element().getAttribute('aria-selected')).toBe('false');

		// Check panel content
		await expect.element(page.getByText('First Content')).toBeInTheDocument();
	});

	test('Tab Switching Interaction', async () => {
		let activeTabId = 'first';
		const onTabChange = vi.fn(async (tabId: string) => {
			activeTabId = tabId;
		});

		render(Tabs, {
			componentId: 'tabs-interaction',
			items: tabItems,
			get activeTabId() {
				return activeTabId;
			},
			set activeTabId(v) {
				activeTabId = v;
			},
			onTabChange
		});

		const secondTab = page.getByRole('tab', { name: 'Second Tab' });
		await secondTab.click();

		expect(onTabChange).toHaveBeenCalledWith('second');
		expect(activeTabId).toBe('second');
		await expect.element(page.getByText('Second Content')).toBeInTheDocument();
	});

	test('Variant Propagation', async () => {
		render(Tabs, {
			componentId: 'tabs-variant',
			variant: 'bordered',
			items: tabItems
		});

		const container = page.getByTestId('tabs-variant');
		await expect.element(container).toHaveClass('fluid-tabs-bordered');
	});

	test('Falls Back When Active Tab Becomes Disabled', async () => {
		const { rerender } = render(Tabs, {
			componentId: 'tabs-fallback',
			items: tabItems,
			activeTabId: 'second'
		});

		const firstTab = page.getByRole('tab', { name: 'First Tab' });
		const secondTab = page.getByRole('tab', { name: 'Second Tab' });
		await expect.element(secondTab).toHaveAttribute('aria-selected', 'true');

		await rerender({
			items: tabItems.map((item) => (item.id === 'second' ? { ...item, disabled: true } : item))
		});

		await expect.element(firstTab).toHaveAttribute('aria-selected', 'true');
		await expect.element(secondTab).toHaveAttribute('aria-selected', 'false');
		await expect.element(page.getByText('First Content')).toBeInTheDocument();
	});
});
