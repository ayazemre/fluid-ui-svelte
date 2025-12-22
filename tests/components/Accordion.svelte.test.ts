import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Accordion from '$lib/components/Accordion.svelte';
import { createRawSnippet } from 'svelte';

describe('Accordion', () => {
	test('Default Interaction', async () => {
		render(Accordion, {
			header: createRawSnippet((options: any) => {
				return { render: () => `Header Expanded: ${options().isExpanded}` };
			}),
			body: createRawSnippet(() => {
				return { render: () => '<p>Accordion Body Content</p>' };
			})
		});

		const header = page.getByRole('button');
		await expect.element(header).toBeInTheDocument();
		await expect.element(header).toHaveTextContent('Header Expanded: false');
		
		// Body should not be present initially
		const body = page.getByText('Accordion Body Content');
		await expect.element(body).not.toBeInTheDocument();

		// Expand
		await header.click();
		await expect.element(header).toHaveTextContent('Header Expanded: true');
		await expect.element(page.getByText('Accordion Body Content')).toBeInTheDocument();

		// Collapse
		await header.click();
		await expect.element(header).toHaveTextContent('Header Expanded: false');
		await expect.element(page.getByText('Accordion Body Content')).not.toBeInTheDocument();
	});

	test('Custom Variation Classes', async () => {
		render(Accordion, {
			variation: 'custom-acc',
			header: createRawSnippet(() => ({ render: () => 'Title' })),
			body: createRawSnippet(() => ({ render: () => 'Content' }))
		});

		const wrapper = page.getByText('Title').element().parentElement?.parentElement;
		expect(wrapper?.classList.contains('custom-acc')).toBe(true);
		expect(wrapper?.classList.contains('fluid-accordion-wrapper')).toBe(true);

		const header = page.getByRole('button');
		expect(header.element().classList.contains('custom-acc')).toBe(true);
		expect(header.element().classList.contains('fluid-accordion-header')).toBe(true);
	});
});