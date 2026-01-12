import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Page } from '$lib/components';
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
		const main = page.getByRole('main');
		await expect.element(main).toBeInTheDocument();
		await expect.element(main).toHaveClass('fluid-page');
		await expect.element(main).toHaveTextContent('Page Content');

		// Metadata Check
		await expect.poll(() => document.title).toBe('Test Page Title');

		const metaDescription = document.querySelector('meta[name="description"]');
		expect(metaDescription?.getAttribute('content')).toBe('Test Description');
	});

	test('Metadata', async () => {
		render(Page, {
			title: 'Metadata Title',
			description: 'Metadata Description',
			image: 'https://example.com/image.jpg',
			url: 'https://example.com/page',
			siteName: 'My Site',
			type: 'article',
			keywords: 'svelte, test',
			robots: 'noindex, nofollow'
		});

		// SEO
		const metaKeywords = document.querySelector('meta[name="keywords"]');
		expect(metaKeywords?.getAttribute('content')).toBe('svelte, test');

		const metaRobots = document.querySelector('meta[name="robots"]');
		expect(metaRobots?.getAttribute('content')).toBe('noindex, nofollow');

		const linkCanonical = document.querySelector('link[rel="canonical"]');
		expect(linkCanonical?.getAttribute('href')).toBe('https://example.com/page');

		// Open Graph
		const ogType = document.querySelector('meta[property="og:type"]');
		expect(ogType?.getAttribute('content')).toBe('article');

		const ogSiteName = document.querySelector('meta[property="og:site_name"]');
		expect(ogSiteName?.getAttribute('content')).toBe('My Site');

		const ogImage = document.querySelector('meta[property="og:image"]');
		expect(ogImage?.getAttribute('content')).toBe('https://example.com/image.jpg');

		// Twitter
		const twitterCard = document.querySelector('meta[name="twitter:card"]');
		expect(twitterCard?.getAttribute('content')).toBe('summary_large_image');
	});
});