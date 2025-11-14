import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Container from '$lib/base/Container.svelte';
import { createRawSnippet } from 'svelte';

describe('Container', () => {
	test('Default', async () => {
		render(Container, {
			id: 'container-default',
			'aria-label': 'div',
			children: createRawSnippet(() => {
				return { render: () => '<p>Default</p>' };
			})
		});

		const container = page.getByTestId('container-default');
		await expect.element(container).toBeInTheDocument();
		expect(container.element().tagName).toBe('DIV');
		await expect.element(container).toContainHTML('<p>Default</p>');
		expect(container.element().ariaLabel).toBe('div');
	});

	test('Types', async () => {
		const containerTypes = [
			'article',
			'aside',
			'div',
			'footer',
			'header',
			'main',
			'nav',
			'section'
		];

		for (const containerType of containerTypes) {
			render(Container, {
				id: `container-${containerType}`,
				type: containerType as any,
				children: createRawSnippet(() => {
					return { render: () => `<p>${containerType}</p>` };
				})
			});

			const container = page.getByTestId(`container-${containerType}`);
			await expect.element(container).toBeInTheDocument();
			expect(container.element().tagName).toBe(containerType.toUpperCase());
			await expect.element(container).toContainHTML(`<p>${containerType}</p>`);
		}
	});

	test('Styling', async () => {
		for (const overrideDefaultStyling of [false, true]) {
			render(Container, {
				id: 'container-override-' + overrideDefaultStyling,
				class: 'override',
				overrideDefaultStyling,
				children: createRawSnippet(() => {
					return { render: () => '<p>div</p>' };
				})
			});

			const container = page.getByTestId('container-override-' + overrideDefaultStyling);
			await expect.element(container).toBeInTheDocument();
			await expect.element(container).toContainHTML('<p>div</p>');
			if (overrideDefaultStyling) {
				await expect.element(container).toHaveClass('override');
				await expect.element(container).not.toHaveClass('fluid-container');
			} else {
				await expect.element(container).toHaveClass('fluid-container');
				await expect.element(container).toHaveClass('override');
			}
		}
	});
});
