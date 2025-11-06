import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Container from '$lib/base/Container.svelte';
import { createRawSnippet } from 'svelte';

describe('Container', () => {
	it('Default', async () => {
		render(Container, {
			id: 'container-default',
			children: createRawSnippet(() => {
				return { render: () => '<p>Default</p>' };
			})
		});

		const container = page.getByTestId('container-default');
		await expect.element(container).toBeInTheDocument();
		expect(container.element().tagName).toBe('DIV');
		await expect.element(container).toContainHTML('<p>Default</p>');
		await expect.element(container).toHaveClass('fluid-container');
	});

	it('Article', async () => {
		render(Container, {
			id: 'container-article',
			type: 'article',
			children: createRawSnippet(() => {
				return { render: () => '<p>Article</p>' };
			})
		});

		const container = page.getByTestId('container-article');
		await expect.element(container).toBeInTheDocument();
		expect(container.element().tagName).toBe('ARTICLE');
		await expect.element(container).toContainHTML('<p>Article</p>');
		await expect.element(container).toHaveClass('fluid-container');
	});

	it('Aside', async () => {
		render(Container, {
			id: 'container-aside',
			type: 'aside',
			children: createRawSnippet(() => {
				return { render: () => '<p>Aside</p>' };
			})
		});

		const container = page.getByTestId('container-aside');
		await expect.element(container).toBeInTheDocument();
		expect(container.element().tagName).toBe('ASIDE');
		await expect.element(container).toContainHTML('<p>Aside</p>');
		await expect.element(container).toHaveClass('fluid-container');
	});

	it('Div', async () => {
		render(Container, {
			id: 'container-div',
			type: 'div',
			children: createRawSnippet(() => {
				return { render: () => '<p>Div</p>' };
			})
		});

		const container = page.getByTestId('container-div');
		await expect.element(container).toBeInTheDocument();
		expect(container.element().tagName).toBe('DIV');
		await expect.element(container).toContainHTML('<p>Div</p>');
		await expect.element(container).toHaveClass('fluid-container');
	});

	it('Footer', async () => {
		render(Container, {
			id: 'container-footer',
			type: 'footer',
			children: createRawSnippet(() => {
				return { render: () => '<p>Footer</p>' };
			})
		});

		const container = page.getByTestId('container-footer');
		await expect.element(container).toBeInTheDocument();
		expect(container.element().tagName).toBe('FOOTER');
		await expect.element(container).toContainHTML('<p>Footer</p>');
		await expect.element(container).toHaveClass('fluid-container');
	});

	it('Header', async () => {
		render(Container, {
			id: 'container-header',
			type: 'header',
			children: createRawSnippet(() => {
				return { render: () => '<p>Header</p>' };
			})
		});

		const container = page.getByTestId('container-header');
		await expect.element(container).toBeInTheDocument();
		expect(container.element().tagName).toBe('HEADER');
		await expect.element(container).toContainHTML('<p>Header</p>');
		await expect.element(container).toHaveClass('fluid-container');
	});

	it('Main', async () => {
		render(Container, {
			id: 'container-main',
			type: 'main',
			children: createRawSnippet(() => {
				return { render: () => '<p>Main</p>' };
			})
		});

		const container = page.getByTestId('container-main');
		await expect.element(container).toBeInTheDocument();
		expect(container.element().tagName).toBe('MAIN');
		await expect.element(container).toContainHTML('<p>Main</p>');
		await expect.element(container).toHaveClass('fluid-container');
	});

	it('Nav', async () => {
		render(Container, {
			id: 'container-nav',
			type: 'nav',
			children: createRawSnippet(() => {
				return { render: () => '<p>Nav</p>' };
			})
		});

		const container = page.getByTestId('container-nav');
		await expect.element(container).toBeInTheDocument();
		expect(container.element().tagName).toBe('NAV');
		await expect.element(container).toContainHTML('<p>Nav</p>');
		await expect.element(container).toHaveClass('fluid-container');
	});

	it('Section', async () => {
		render(Container, {
			id: 'container-section',
			type: 'section',
			children: createRawSnippet(() => {
				return { render: () => '<p>Section</p>' };
			})
		});

		const container = page.getByTestId('container-section');
		await expect.element(container).toBeInTheDocument();
		expect(container.element().tagName).toBe('SECTION');
		await expect.element(container).toContainHTML('<p>Section</p>');
		await expect.element(container).toHaveClass('fluid-container');
	});

	it('Override Default Styling', async () => {
		render(Container, {
			id: 'container-section',
			class: 'override',
			overrideDefaultStyling: true,
			children: createRawSnippet(() => {
				return { render: () => '<p>Section</p>' };
			})
		});

		const container = page.getByTestId('container-section');
		await expect.element(container).toBeInTheDocument();
		await expect.element(container).toContainHTML('<p>Section</p>');
		await expect.element(container).toHaveClass('override');
	});
});
