import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from '$lib/components/Page.svelte';

describe('Page', () => {
	test('should set the document title and meta description', async () => {
		render(Page, { title: 'Page title.', description: 'Page description.' });

		expect(document.title).toBe('Page title.');

		const metaDescription = document.head.querySelector('meta[name="description"]');
		expect(metaDescription).not.toBeNull();
		expect(metaDescription?.getAttribute('content')).toBe('Page description.');
	});
});
