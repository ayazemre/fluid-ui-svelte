import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Button from '$lib/base/Button.svelte';
import { createRawSnippet } from 'svelte';

describe('Button', () => {
	it('Default', async () => {
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

		const button = page.getByTestId('button-default');
		await expect.element(button).toBeInTheDocument();
		expect(button.element().tagName).toBe('BUTTON');
		await expect.element(button).toContainHTML('<p>Button</p>');
		await button.click();
		await expect.element(button).toContainHTML('<p>Clicked</p>');
		expect(button.element().ariaLabel).toBe('button');
	});

	it('Loading Placeholder', async () => {
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

		const button = page.getByTestId('button-loading');
		await expect.element(button).toBeInTheDocument();
		expect(button.element().tagName).toBe('BUTTON');
		await expect.element(button).toContainHTML('<p>Button</p>');
		await expect.element(button).toHaveClass('fluid-button');
		await button.click();
		await expect.element(button).toContainHTML('<p>Loading</p>');
		await button.click();
		await expect.element(button).toContainHTML('<p>Button</p>');
	});

	it('No Loading Placeholder', async () => {
		render(Button, {
			id: 'button-loading',
			onclick: async (event, state) => {
				state.inProgress = !state.inProgress;
			},
			children: createRawSnippet(() => {
				return { render: () => '<p>Button</p>' };
			})
		});

		const button = page.getByTestId('button-loading');
		await expect.element(button).toBeInTheDocument();
		expect(button.element().tagName).toBe('BUTTON');
		await expect.element(button).toContainHTML('<p>Button</p>');
		await expect.element(button).toHaveClass('fluid-button');
		await button.click();
		await expect.element(button).toContainHTML('<p>Button</p>');
		await button.click();
		await expect.element(button).toContainHTML('<p>Button</p>');
	});

	it('Styling', async () => {
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

			const button = page.getByTestId('button-override' + overrideDefaultStyling);
			await expect.element(button).toBeInTheDocument();
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
