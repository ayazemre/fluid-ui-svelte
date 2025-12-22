import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Table from '$lib/base/Table.svelte';
import { createRawSnippet } from 'svelte';

describe('Table', () => {
	test('Default Rendering', async () => {
		render(Table, {
			id: 'table-default',
			caption: 'Test Caption',
			tableHeadItems: ['Header 1'],
			tableRowItems: [['Cell 1']],
			tableFooterItems: ['Footer 1'],
			headTemplate: createRawSnippet((item: any) => ({
				render: () => `<span>${item()}</span>`
			})),
			bodyTemplate: createRawSnippet((item: any) => ({
				render: () => `<span>${item()}</span>`
			})),
			footerTemplate: createRawSnippet((item: any) => ({
				render: () => `<span>${item()}</span>`
			}))
		});

		const table = page.getByTestId('table-default');
		await expect.element(table).toBeInTheDocument();
		
		// Check caption
		await expect.element(page.getByText('Test Caption')).toBeInTheDocument();
		
		// Check counts
		const headers = table.element().querySelectorAll('th');
		const bodyCells = table.element().querySelectorAll('tbody td');
		const footerCells = table.element().querySelectorAll('tfoot td');
		
		expect(headers.length).toBe(1);
		expect(bodyCells.length).toBe(1);
		expect(footerCells.length).toBe(1);
		
		expect(headers[0].textContent).toBe('Header 1');
		expect(bodyCells[0].textContent).toBe('Cell 1');
		expect(footerCells[0].textContent).toBe('Footer 1');
	});

	test('Styling Overrides', async () => {
		for (const overrideDefaultStyling of [false, true]) {
			render(Table, {
				id: 'table-styling-' + overrideDefaultStyling,
				overrideDefaultStyling,
				tableHeadItems: ['H'],
				tableRowItems: [['B']],
				tableFooterItems: ['F'],
				headTemplate: createRawSnippet((item: any) => ({ render: () => item() })),
				bodyTemplate: createRawSnippet((item: any) => ({ render: () => item() })),
				footerTemplate: createRawSnippet((item: any) => ({ render: () => item() })),
				headClass: 'head-override',
				bodyClass: 'body-override',
				footerClass: 'footer-override'
			});

			const table = page.getByTestId('table-styling-' + overrideDefaultStyling);
			await expect.element(table).toBeInTheDocument();

			const head = table.element().querySelector('thead');
			const body = table.element().querySelector('tbody');
			const foot = table.element().querySelector('tfoot');

			if (overrideDefaultStyling) {
				await expect.element(table).not.toHaveClass('fluid-table');
				expect(head?.classList.contains('head-override')).toBe(true);
				expect(head?.classList.contains('fluid-table-head')).toBe(false);
			} else {
				await expect.element(table).toHaveClass('fluid-table');
				expect(head?.classList.contains('head-override')).toBe(true);
				expect(head?.classList.contains('fluid-table-head')).toBe(true);
			}
		}
	});
});