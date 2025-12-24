import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Text from '$lib/base/Text.svelte';
import { createRawSnippet } from 'svelte';

describe('Text', () => {
	test('Default', async () => {
		render(Text, {
			id: 'text-default',
			'aria-label': 'semantic-text',
			children: createRawSnippet(() => {
				return { render: () => '<span>Default</span>' };
			})
		});

		// Structure Check
		const text = page.getByTestId('text-default');
		await expect.element(text).toBeInTheDocument();
		expect(text.element().tagName).toBe('P');

		// Attributes & Content
		await expect.element(text).toHaveTextContent('Default');
		expect(text.element().ariaLabel).toBe('semantic-text');
	});

	test('Types', async () => {
		const textTypes = [
			'p',
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6',
			'span',
			'pre',
			'code',
			'b',
			'strong',
			'i',
			'em',
			'mark',
			'small',
			'del',
			'ins',
			'sub',
			'sup'
		];

		for (const textType of textTypes) {
			render(Text, {
				id: 'text-' + textType,
				children: createRawSnippet(() => {
					return { render: () => `<span>${textType}</span>` };
				}),
				type: textType as any
			});

			// Polymorphism Check
			const text = page.getByTestId('text-' + textType);
			await expect.element(text).toBeInTheDocument();
			expect(text.element().tagName).toBe(textType.toUpperCase());
			await expect.element(text).toHaveTextContent(textType);
		}
	});

	test('Styling and Override', async () => {
		for (const overrideDefaultStyling of [true, false]) {
			render(Text, {
				id: 'text-override-' + overrideDefaultStyling,
				children: createRawSnippet(() => {
					return { render: () => '<span>Styled</span>' };
				}),
				class: 'text-custom',
				overrideDefaultStyling
			});

			// Structure Check
			const text = page.getByTestId('text-override-' + overrideDefaultStyling);
			await expect.element(text).toBeInTheDocument();
			await expect.element(text).toHaveClass('text-custom');

			// Class Validation
			if (overrideDefaultStyling) {
				await expect.element(text).not.toHaveClass('fluid-text');
			} else {
				await expect.element(text).toHaveClass('fluid-text');
			}
		}
	});
});