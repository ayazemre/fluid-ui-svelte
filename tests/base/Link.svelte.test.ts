import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Link from '$lib/base/Link.svelte';
import { createRawSnippet } from 'svelte';

describe('Link', () => {
	test('Default', async () => {
		render(Link, {
			id: 'link-default',
			href: '/test',
			children: createRawSnippet(() => {
				return { render: () => 'Click Me' };
			})
		});

		const link = page.getByTestId('link-default');
		await expect.element(link).toBeInTheDocument();
		expect(link.element().tagName).toBe('A');
		await expect.element(link).toHaveAttribute('href', '/test');
		await expect.element(link).toHaveTextContent('Click Me');
		await expect.element(link).toHaveClass('fluid-link');
	});

	test('Styling', async () => {
		for (const overrideDefaultStyling of [true, false]) {
			render(Link, {
				id: 'link-override-' + overrideDefaultStyling,
				href: '#',
				class: 'override',
				overrideDefaultStyling,
				children: createRawSnippet(() => {
					return { render: () => 'Link' };
				})
			});

			const link = page.getByTestId('link-override-' + overrideDefaultStyling);
			await expect.element(link).toBeInTheDocument();
			if (overrideDefaultStyling) {
				await expect.element(link).not.toHaveClass('fluid-link');
				await expect.element(link).toHaveClass('override');
			} else {
				await expect.element(link).toHaveClass('fluid-link');
				await expect.element(link).toHaveClass('override');
			}
		}
	});

	test('Standard attributes', async () => {
		render(Link, {
			id: 'link-attr',
			href: 'https://example.com',
			target: '_blank',
			rel: 'noopener noreferrer',
			children: createRawSnippet(() => {
				return { render: () => 'External' };
			})
		});

		const link = page.getByTestId('link-attr');
		await expect.element(link).toHaveAttribute('target', '_blank');
		await expect.element(link).toHaveAttribute('rel', 'noopener noreferrer');
	});
});
