import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Badge } from '$lib/base';
import { createRawSnippet } from 'svelte';

describe('Badge', () => {
	test('Default', async () => {
		render(Badge, {
			id: 'badge-default',
			'aria-label': 'badge-test',
			children: createRawSnippet(() => {
				return { render: () => '<span>Status</span>' };
			})
		});

		const badge = page.getByTestId('badge-default');
		await expect.element(badge).toBeInTheDocument();
		expect(badge.element().tagName).toBe('SPAN');
		await expect.element(badge).toHaveTextContent('Status');
		expect(badge.element().ariaLabel).toBe('badge-test');
	});

	test('Variants', async () => {
		render(Badge, {
			id: 'badge-primary',
			variant: 'primary',
			children: createRawSnippet(() => {
				return { render: () => '<span>Primary</span>' };
			})
		});

		const badge = page.getByTestId('badge-primary');
		await expect.element(badge).toBeInTheDocument();
		await expect.element(badge).toHaveClass('fluid-badge');
		await expect.element(badge).toHaveClass('fluid-badge-primary');
	});

	test('Styling and Override', async () => {
		for (const overrideDefaultStyling of [true, false]) {
			render(Badge, {
				id: 'badge-override-' + overrideDefaultStyling,
				class: 'custom-badge',
				overrideDefaultStyling,
				children: createRawSnippet(() => {
					return { render: () => '<span>Badge</span>' };
				})
			});

			const badge = page.getByTestId('badge-override-' + overrideDefaultStyling);
			await expect.element(badge).toBeInTheDocument();
			await expect.element(badge).toHaveClass('custom-badge');

			if (overrideDefaultStyling) {
				await expect.element(badge).not.toHaveClass('fluid-badge');
			} else {
				await expect.element(badge).toHaveClass('fluid-badge');
			}
		}
	});
});
