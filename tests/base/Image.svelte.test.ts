import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Image from '$lib/base/Image.svelte';
import { createRawSnippet } from 'svelte';

describe('Image', () => {
	test('Default', async () => {
		render(Image, {
			id: 'image-default',
			src: 'https://picsum.photos/200/300',
			alt: 'An image.',
			class: 'object-cover',
			'aria-label': 'image'
		});
		const image = page.getByTestId('image-default');
		await expect.element(image).toBeInTheDocument();
		expect(image.element().tagName).toBe('IMG');
		expect(image.element().ariaLabel).toBe('image');
	});

	test('Styling', async () => {
		for (const overrideDefaultStyling of [true, false]) {
			render(Image, {
				id: 'image-override-' + overrideDefaultStyling,
				src: 'https://picsum.photos/200/300',
				alt: 'An image.',
				class: 'object-cover',
				'aria-label': 'image',
				overrideDefaultStyling
			});
			const image = page.getByTestId('image-override-' + overrideDefaultStyling);
			await expect.element(image).toBeInTheDocument();
			if (overrideDefaultStyling) {
				await expect.element(image).not.toHaveClass('fluid-image');
				await expect.element(image).toHaveClass('object-cover');
			} else {
				await expect.element(image).toHaveClass('fluid-image');
				await expect.element(image).toHaveClass('object-cover');
			}
		}
	});
});
