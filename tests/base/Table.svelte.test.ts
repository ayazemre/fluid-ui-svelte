import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Table from '$lib/base/Table.svelte';
import { createRawSnippet } from 'svelte';

describe('Table', () => {
	test('Default', async () => {
		render(Table, {
			id: 'table-default',
			caption: 'Test Caption',
			'aria-label': 'table',
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

		// Structure Check
		const table = page.getByTestId('table-default');
		await expect.element(table).toBeInTheDocument();
		expect(table.element().tagName).toBe('TABLE');

		// Attributes
		expect(table.element().ariaLabel).toBe('table');

		// Caption Check
		await expect.element(page.getByText('Test Caption')).toBeInTheDocument();

		// Content Counts Check
		const headers = table.element().querySelectorAll('th');
		const bodyCells = table.element().querySelectorAll('tbody td');
		const footerCells = table.element().querySelectorAll('tfoot td');

		expect(headers.length).toBe(1);
		expect(bodyCells.length).toBe(1);
		expect(footerCells.length).toBe(1);

		// Content Value Check
		expect(headers[0].textContent).toBe('Header 1');
		expect(bodyCells[0].textContent).toBe('Cell 1');
		expect(footerCells[0].textContent).toBe('Footer 1');
	});

	test('Styling', async () => {
		for (const overrideDefaultStyling of [false, true]) {
			render(Table, {
				id: 'table-styling-' + overrideDefaultStyling,
				overrideDefaultStyling,
				tableHeadItems: ['H'],
				tableRowItems: [['B']],
				tableFooterItems: ['F'],
				headTemplate: createRawSnippet((item: any) => ({ render: () => `<p>${item()}</p>` })),
				bodyTemplate: createRawSnippet((item: any) => ({ render: () => `<p>${item()}</p>` })),
				footerTemplate: createRawSnippet((item: any) => ({ render: () => `<p>${item()}</p>` })),
				headClass: 'head-override',
				bodyClass: 'body-override',
				footerClass: 'footer-override'
			});

			// Existence Check
			const table = page.getByTestId('table-styling-' + overrideDefaultStyling);
			await expect.element(table).toBeInTheDocument();

			// Section Extraction
			const head = table.element().querySelector('thead');
			const body = table.element().querySelector('tbody');
			const foot = table.element().querySelector('tfoot');

			// Styling Validation
			if (overrideDefaultStyling) {
				await expect.element(table).not.toHaveClass('fluid-table');

				// Head
				expect(head?.classList.contains('head-override')).toBe(true);
				expect(head?.classList.contains('fluid-table-head')).toBe(false);

				// Body
				expect(body?.classList.contains('body-override')).toBe(true);
				expect(body?.classList.contains('fluid-table-body')).toBe(false);

				// Foot
				expect(foot?.classList.contains('footer-override')).toBe(true);
				expect(foot?.classList.contains('fluid-table-footer')).toBe(false);
			} else {
				await expect.element(table).toHaveClass('fluid-table');

				// Head
				expect(head?.classList.contains('head-override')).toBe(true);
				expect(head?.classList.contains('fluid-table-head')).toBe(true);

				// Body
				expect(body?.classList.contains('body-override')).toBe(true);
				expect(body?.classList.contains('fluid-table-body')).toBe(true);

				// Foot
				expect(foot?.classList.contains('footer-override')).toBe(true);
				expect(foot?.classList.contains('fluid-table-footer')).toBe(true);
			}
		}
	});
});
