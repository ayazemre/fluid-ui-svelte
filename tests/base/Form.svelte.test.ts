import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Form } from '$lib/base';
import { createRawSnippet } from 'svelte';

describe('Form', () => {
	test('Default', async () => {
		render(Form, {
			id: 'form-default',
			'aria-label': 'form-element',
			children: createRawSnippet(() => {
				return { render: () => '<p>Form Content</p>' };
			})
		});

		// Structure Check
		const form = page.getByTestId('form-default');
		await expect.element(form).toBeInTheDocument();
		expect(form.element().tagName).toBe('FORM');

		// Attributes & Content
		await expect.element(form).toContainHTML('<p>Form Content</p>');
		expect(form.element().ariaLabel).toBe('form-element');

		// Class Validation
		await expect.element(form).toHaveClass('fluid-form');
		await expect.element(form).toHaveClass('flex');
	});

	test('Styling', async () => {
		for (const overrideDefaultStyling of [true, false]) {
			render(Form, {
				id: 'form-override-' + overrideDefaultStyling,
				class: 'custom-class',
				overrideDefaultStyling,
				children: createRawSnippet(() => {
					return { render: () => '<p>Form Content</p>' };
				})
			});

			const form = page.getByTestId('form-override-' + overrideDefaultStyling);
			await expect.element(form).toBeInTheDocument();

			if (overrideDefaultStyling) {
				await expect.element(form).not.toHaveClass('fluid-form');
				await expect.element(form).not.toHaveClass('flex');
				await expect.element(form).toHaveClass('custom-class');
			} else {
				await expect.element(form).toHaveClass('fluid-form');
				await expect.element(form).toHaveClass('flex');
				await expect.element(form).toHaveClass('custom-class');
			}
		}
	});
});