import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from '$lib/components/Page.svelte';
import { createRawSnippet } from 'svelte';

describe('Page', () => {
	test('Default', async () => {
		render(Page, {
			id: 'page-default',
			title: 'Test Page Title',
			description: 'Test Description',
			children: createRawSnippet(() => ({
				render: () => '<h1>Page Content</h1>'
			}))
		});

		// Check Body/Content Structure
		const pageContainer = page.getByTestId('page-default');
		await expect.element(pageContainer).toBeInTheDocument();
		expect(pageContainer.element().tagName).toBe('MAIN');
		await expect.element(pageContainer).toHaveTextContent('Page Content');

		// Metadata Check
		// In browser mode, document.title should update
		await expect.poll(() => document.title).toBe('Test Page Title');

		const metaDescription = document.querySelector('meta[name="description"]');
		expect(metaDescription).not.toBeNull();
		expect(metaDescription?.getAttribute('content')).toBe('Test Description');
	});
});
