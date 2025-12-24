import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Accordion from '$lib/components/Accordion.svelte';
import { createRawSnippet } from 'svelte';

describe('Accordion', () => {
	test('Default', async () => {
		render(Accordion, {
			componentId: 'accordion-default',
			header: createRawSnippet((options: any) => {
				return { render: () => `<span>Header (Expanded: ${options().isExpanded})</span>` };
			}),
			body: createRawSnippet(() => {
				return { render: () => '<p>Body Content</p>' };
			})
		});

		// Structure Check
		const accordionWrapper = page.getByTestId('accordion-default');
		await expect.element(accordionWrapper).toBeInTheDocument();
		await expect.element(accordionWrapper).toHaveClass('fluid-accordion-wrapper');

		// Hierarchy & Children Check
		// Note: wrapper is a Container (div). First child should be Button.
		// We use .element().children[0] to access the first child element from the wrapper's handle.
		const headerButton = accordionWrapper.element().children[0];
		expect(headerButton).not.toBeUndefined();
		expect(headerButton.tagName).toBe('BUTTON');
		expect(headerButton.classList.contains('fluid-accordion-header')).toBe(true);
		expect(headerButton.textContent).toContain('Header (Expanded: false)');

		// Body should not be present initially
		await expect.element(page.getByText('Body Content')).not.toBeInTheDocument();
	});

	test('Interaction', async () => {
		render(Accordion, {
			componentId: 'accordion-interaction',
			header: createRawSnippet((options: any) => {
				return { render: () => `<span>Header</span>` };
			}),
			body: createRawSnippet(() => {
				return { render: () => '<p>Body Content</p>' };
			})
		});

		const accordionWrapper = page.getByTestId('accordion-interaction');
		// Precise selection: Get button that contains the specific header text
		const headerButtonLocator = accordionWrapper.getByRole('button', { name: 'Header' });

		// Expand
		await headerButtonLocator.click();

		await expect.element(page.getByText('Body Content')).toBeInTheDocument();

		// Verify body container hierarchy (should be 2nd child now)
		const bodyContainer = accordionWrapper.element().children[1];
		expect(bodyContainer).not.toBeUndefined();
		expect(bodyContainer.tagName).toBe('DIV'); // Container renders div by default
		expect(bodyContainer.classList.contains('fluid-accordion-body')).toBe(true);

		// Collapse
		await headerButtonLocator.click();
		await expect.element(page.getByText('Body Content')).not.toBeInTheDocument();
	});

	test('Variation', async () => {
		render(Accordion, {
			componentId: 'accordion-variation',
			variation: 'variant-primary',
			header: createRawSnippet(() => ({ render: () => '<p>Title</p>' })),
			body: createRawSnippet(() => ({ render: () => '<p>Content</p>' }))
		});

		// Check Wrapper Variation
		const accordionWrapper = page.getByTestId('accordion-variation');
		await expect.element(accordionWrapper).toHaveClass('variant-primary');
		await expect.element(accordionWrapper).toHaveClass('fluid-accordion-wrapper');

		// Check Header Variation
		const headerButton = accordionWrapper.element().children[0];
		expect(headerButton.classList.contains('variant-primary')).toBe(true);
		expect(headerButton.classList.contains('fluid-accordion-header')).toBe(true);

		// Check Body Variation (must expand first)
		const headerButtonLocator = accordionWrapper.getByRole('button');
		await headerButtonLocator.click();

		const bodyContainer = accordionWrapper.element().children[1];
		expect(bodyContainer).not.toBeUndefined();
		expect(bodyContainer.classList.contains('variant-primary')).toBe(true);
		expect(bodyContainer.classList.contains('fluid-accordion-body')).toBe(true);
	});
});
