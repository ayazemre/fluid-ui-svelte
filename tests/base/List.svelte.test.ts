import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import List from '$lib/base/List.svelte';
import { createRawSnippet, mount, unmount } from 'svelte';

describe('List', () => {
	test('Default', async () => {
		const snip = createRawSnippet((name) => {
			return {
				render: () => `<p>Hello ${name()}!</p>`,
				setup: (node) => {}
			};
		});
		render(List, {
			id: 'list-default',
			'aria-label': 'list',
			items: ['List item 1'],
			itemTemplate: createRawSnippet((prop: () => unknown) => {
				return {
					render: () => `<p>${prop()}!</p>`,
					setup: (node) => {}
				};
			})
		});

		const list = page.getByTestId('list-default');
		await expect.element(list).toBeInTheDocument();
		expect(list.element().tagName).toBe('UL');
		await expect.element(list).toHaveTextContent('List item 1');
		expect(list.element().ariaLabel).toBe('list');
	});

	test('Types', async () => {
		const listTypes = ['ul', 'ol'];

		for (const listType of listTypes) {
			render(List, {
				id: `list-${listType}`,
				type: listType as any,
				items: ['List item 1'],
				itemTemplate: createRawSnippet((prop: () => unknown) => {
					return {
						render: () => `<p>${prop()}!</p>`,
						setup: (node) => {}
					};
				})
			});

			const list = page.getByTestId(`list-${listType}`);
			await expect.element(list).toBeInTheDocument();
			expect(list.element().tagName).toBe(listType.toUpperCase());
			await expect.element(list).toHaveTextContent('List item 1');
		}
	});

	test('Styling', async () => {
		for (const overrideDefaultStyling of [false, true]) {
			render(List, {
				id: 'list-override-' + overrideDefaultStyling,
				class: 'override',
				overrideDefaultStyling,
				items: ['List item 1'],
				itemTemplate: createRawSnippet((prop: () => unknown) => {
					return {
						render: () => `<p>${prop()}!</p>`,
						setup: (node) => {}
					};
				})
			});

			const list = page.getByTestId('list-override-' + overrideDefaultStyling);
			await expect.element(list).toBeInTheDocument();
			if (overrideDefaultStyling) {
				await expect.element(list).toHaveClass('override');
				await expect.element(list).not.toHaveClass('fluid-unordered-list');
			} else {
				await expect.element(list).toHaveClass('fluid-unordered-list');
				await expect.element(list).toHaveClass('override');
			}
		}
	});
});
