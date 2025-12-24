import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import List from '$lib/base/List.svelte';
import { createRawSnippet } from 'svelte';

describe('List', () => {
	test('Default', async () => {
		render(List, {
			id: 'list-default',
			'aria-label': 'list',
			items: ['Item 1', 'Item 2'],
			itemTemplate: createRawSnippet((prop: any) => {
				return {
					render: () => `<span>${prop()}</span>`
				};
			})
		});

		// Structure Check
		const list = page.getByTestId('list-default');
		await expect.element(list).toBeInTheDocument();
		expect(list.element().tagName).toBe('UL');

		// Attributes & Content
		expect(list.element().ariaLabel).toBe('list');
		const items = list.element().querySelectorAll('li');
		expect(items.length).toBe(2);
		expect(items[0].textContent).toBe('Item 1');
		expect(items[1].textContent).toBe('Item 2');
	});

	test('Types', async () => {
		const listTypes = ['ul', 'ol'];

		for (const listType of listTypes) {
			render(List, {
				id: `list-${listType}`,
				type: listType as any,
				items: ['Item'],
				itemTemplate: createRawSnippet((prop: any) => {
					return { render: () => `<p>${prop()}</p>` };
				})
			});

			// Polymorphism Check
			const list = page.getByTestId(`list-${listType}`);
			await expect.element(list).toBeInTheDocument();
			expect(list.element().tagName).toBe(listType.toUpperCase());
		}
	});

	test('Styling and itemClass', async () => {
		for (const overrideDefaultStyling of [false, true]) {
			render(List, {
				id: 'list-styling-' + overrideDefaultStyling,
				class: 'list-override',
				itemClass: 'item-override',
				overrideDefaultStyling,
				items: ['Item'],
				itemTemplate: createRawSnippet((prop: any) => {
					return { render: () => `<p>${prop()}</p>` };
				})
			});

			// Existence Check
			const list = page.getByTestId('list-styling-' + overrideDefaultStyling);
			await expect.element(list).toBeInTheDocument();

			// List Class Validation
			if (overrideDefaultStyling) {
				await expect.element(list).toHaveClass('list-override');
				await expect.element(list).not.toHaveClass('fluid-unordered-list');
			} else {
				await expect.element(list).toHaveClass('fluid-unordered-list');
				await expect.element(list).toHaveClass('list-override');
			}

			// Item Class Validation
			const item = list.element().querySelector('li');
			expect(item).not.toBeNull();
			if (item) {
				if (overrideDefaultStyling) {
					expect(item.classList.contains('item-override')).toBe(true);
					expect(item.classList.contains('fluid-unordered-list-item')).toBe(false);
				} else {
					expect(item.classList.contains('item-override')).toBe(true);
					expect(item.classList.contains('fluid-unordered-list-item')).toBe(true);
				}
			}
		}
	});
});