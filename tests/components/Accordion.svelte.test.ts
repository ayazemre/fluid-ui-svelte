import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Accordion from '$lib/components/Accordion.svelte';
import { createRawSnippet } from 'svelte';

describe('Accordion', () => {
	test('Default', async () => {
		render(Accordion, {
			header: createRawSnippet(() => {
				return { render: () => '<p>Accordion Header</p>' };
			}),
			body: createRawSnippet(() => {
				return { render: () => '<p>Accordion Body</p>' };
			})
		});

		const accordionHeaderContent = page.getByText('Accordion Header');
		const accordionHeader = accordionHeaderContent.element().parentElement;
		await expect.element(accordionHeader).toBeInTheDocument();
		expect(accordionHeader?.tagName).toBe('BUTTON');
		await expect.element(accordionHeader).not.toHaveClass('accordion-default');
		await expect.element(accordionHeader).toHaveClass('fluid-accordion-header');
		await accordionHeaderContent.click();
		const accordionBodyContent = page.getByText('Accordion Body');
		const accordionBody = accordionBodyContent.element().parentElement;
		await expect.element(accordionBody).toContainHTML('<p>Accordion Body</p>');
		await expect.element(accordionBody).not.toHaveClass('accordion-default');
		await expect.element(accordionBody).toHaveClass('fluid-accordion-body');
	});

	test('Variant', async () => {
		render(Accordion, {
			variation: 'accordion-default',
			header: createRawSnippet(() => {
				return { render: () => '<p>Accordion Header</p>' };
			}),
			body: createRawSnippet(() => {
				return { render: () => '<p>Accordion Body</p>' };
			})
		});

		const accordionHeaderContent = page.getByText('Accordion Header');
		const accordionHeader = accordionHeaderContent.element().parentElement;
		await expect.element(accordionHeader).toBeInTheDocument();
		expect(accordionHeader?.tagName).toBe('BUTTON');
		await expect.element(accordionHeader).toHaveClass('accordion-default');
		await expect.element(accordionHeader).toHaveClass('fluid-accordion-header');
		await accordionHeaderContent.click();
		const accordionBodyContent = page.getByText('Accordion Body');
		const accordionBody = accordionBodyContent.element().parentElement;
		await expect.element(accordionBody).toContainHTML('<p>Accordion Body</p>');
		await expect.element(accordionBody).toHaveClass('accordion-default');
		await expect.element(accordionBody).toHaveClass('fluid-accordion-body');
	});
});
