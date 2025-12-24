import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Button from '$lib/base/Button.svelte';
import { createRawSnippet } from 'svelte';

describe('Button', () => {
	test('Default', async () => {
		render(Button, {
			id: 'button-default',
			'aria-label': 'button',
			onclick: async (event, state) => {
				const button = event.target as HTMLButtonElement;
				button.textContent = 'Clicked';
			},
			children: createRawSnippet(() => {
				return { render: () => '<p>Button</p>' };
			})
		});

		// Structure Check
		const button = page.getByTestId('button-default');
		await expect.element(button).toBeInTheDocument();
		expect(button.element().tagName).toBe('BUTTON');

		// Attributes & Content
		await expect.element(button).toContainHTML('<p>Button</p>');
		expect(button.element().ariaLabel).toBe('button');

		// Interaction & State Change
		await button.click();
		await expect.element(button).toContainHTML('<p>Clicked</p>');
	});

	test('Loading Placeholder', async () => {
		render(Button, {
			id: 'button-loading',
			onclick: async (event, state) => {
				state.inProgress = !state.inProgress;
			},
			children: createRawSnippet(() => {
				return { render: () => '<p>Button</p>' };
			}),
			loadingPlaceholder: createRawSnippet(() => {
				return { render: () => '<p>Loading</p>' };
			})
		});

		// Initial State
		const button = page.getByTestId('button-loading');
		await expect.element(button).toBeInTheDocument();
		expect(button.element().tagName).toBe('BUTTON');

		// Content & Styling
		await expect.element(button).toContainHTML('<p>Button</p>');
		await expect.element(button).toHaveClass('fluid-button');

		// Loading State (Toggle On)
		await button.click();
		await expect.element(button).toContainHTML('<p>Loading</p>');

		// Reset State (Toggle Off)
		await button.click();
		await expect.element(button).toContainHTML('<p>Button</p>');
	});

	test('No Loading Placeholder', async () => {
		render(Button, {
			id: 'button-loading',
			onclick: async (event, state) => {
				state.inProgress = !state.inProgress;
			},
			children: createRawSnippet(() => {
				return { render: () => '<p>Button</p>' };
			})
		});

		// Initial State
		const button = page.getByTestId('button-loading');
		await expect.element(button).toBeInTheDocument();
		expect(button.element().tagName).toBe('BUTTON');

		// Content & Styling
		await expect.element(button).toContainHTML('<p>Button</p>');
		await expect.element(button).toHaveClass('fluid-button');

		// Interaction (Should not change visually without placeholder)
		await button.click();
		await expect.element(button).toContainHTML('<p>Button</p>');

		await button.click();
		await expect.element(button).toContainHTML('<p>Button</p>');
	});

	test('Styling', async () => {
		for (const overrideDefaultStyling of [true, false]) {
			render(Button, {
				id: 'button-override' + overrideDefaultStyling,
				class: 'override',
				overrideDefaultStyling,
				onclick: async (event, state) => {
					state.inProgress = !state.inProgress;
				},
				children: createRawSnippet(() => {
					return { render: () => '<p>Button</p>' };
				})
			});

			// Structure Check
			const button = page.getByTestId('button-override' + overrideDefaultStyling);
			await expect.element(button).toBeInTheDocument();

			// Class Validation
			if (overrideDefaultStyling) {
				await expect.element(button).not.toHaveClass('fluid-button');
				await expect.element(button).toHaveClass('override');
			} else {
				await expect.element(button).toHaveClass('fluid-button');
				await expect.element(button).toHaveClass('override');
			}
		}
	});
});
