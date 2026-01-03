import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from '$lib/components/Page.svelte';
import { createRawSnippet } from 'svelte';

describe('Page', () => {
	test('Default', async () => {
		render(Page, {
			title: 'Test Page Title',
			description: 'Test Description',
			children: createRawSnippet(() => ({
				render: () => '<h1>Page Content</h1>'
			}))
		});

		// Check Body/Content Structure
		// Page renders a Container with class 'fluid-page' and type 'section'
		// It doesn't take an ID by default in props unless ...rest is used?
		// Looking at Page.svelte: `...rest` is collected but spread onto Container? No, `...rest` is defined but only `children` is rendered?
		// Wait, Page.svelte:
		// <Container class="fluid-page" type="section">
		//   {@render children?.()}
		// </Container>
		// It does NOT spread `...rest` onto Container. It seems to ignore rest props or types might be misleading.
		// Let's check Page.svelte content again from memory or read if unsure.
		// It was: const { title, description, children, ...rest } ... <Container class="fluid-page" ...>
		// It does NOT use `...rest` on Container.
		// So we can't pass ID to easy select it. We must select by class.

		const pageContainer = page.locator('.fluid-page');
		await expect.element(pageContainer).toBeInTheDocument();
		expect(pageContainer.element().tagName).toBe('SECTION');
		await expect.element(pageContainer).toHaveTextContent('Page Content');

		// Metadata Check
		// In browser mode, document.title should update
		await expect.poll(() => document.title).toBe('Test Page Title');

		const metaDesc = document.querySelector('meta[name="description"]');
		expect(metaDesc).not.toBeNull();
		expect(metaDesc?.getAttribute('content')).toBe('Test Description');
	});
});
