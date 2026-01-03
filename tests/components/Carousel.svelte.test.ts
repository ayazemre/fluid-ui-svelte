import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Carousel from '$lib/components/Carousel.svelte';
import { createRawSnippet } from 'svelte';

describe('Carousel', () => {
	const items = ['Item 1', 'Item 2', 'Item 3'];
	const itemTemplate = createRawSnippet((props: any) => ({
		render: () => `<div class="test-item">${props().item}</div>`
	}));

	test('Default', async () => {
		render(Carousel, {
			componentId: 'carousel-default',
			items,
			itemTemplate
		});

		const carousel = page.getByTestId('carousel-default');
		await expect.element(carousel).toBeInTheDocument();
		await expect.element(carousel).toHaveClass('fluid-carousel-container');

		// Check Items
		const renderedItems = carousel.element().querySelectorAll('.fluid-carousel-item');
		expect(renderedItems.length).toBe(3);
		expect(renderedItems[0].textContent).toBe('Item 1');
	});

	test('Variant', async () => {
		render(Carousel, {
			componentId: 'carousel-variant',
			items,
			itemTemplate,
			variant: 'variant-primary'
		});

		const carousel = page.getByTestId('carousel-variant');
		await expect.element(carousel).toHaveClass('variant-primary');

		const renderedItems = carousel.element().querySelectorAll('.fluid-carousel-item');
		expect(renderedItems[0].classList.contains('variant-primary')).toBe(true);
	});

	test('Orientation', async () => {
		render(Carousel, {
			componentId: 'carousel-vertical',
			items,
			itemTemplate,
			orientation: 'vertical'
		});

		const carousel = page.getByTestId('carousel-vertical');
		await expect.element(carousel).toHaveClass('flex-col');
		await expect.element(carousel).toHaveClass('overflow-y-auto');
	});
});
