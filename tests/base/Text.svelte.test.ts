import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Text from '$lib/base/Text.svelte';
import { createRawSnippet } from 'svelte';

describe('Text', () => {
	test('Default', async () => {
		render(Text, {
			id: 'text-default',
			children: createRawSnippet(() => {
				return { render: () => '<span>Default<span>' };
			})
		});

		const text = page.getByTestId('text-default');
		await expect.element(text).toBeInTheDocument();
		expect(text.element().tagName).toBe('P');
		await expect.element(text).toHaveTextContent('Default');
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
					return { render: () => `<span>${textType}<span>` };
				}),
				type: textType as any
			});

			const text = page.getByTestId('text-' + textType);
			await expect.element(text).toBeInTheDocument();
			expect(text.element().tagName).toBe(textType.toUpperCase());
			await expect.element(text).toHaveTextContent(textType);
		}
	});

	test('Styling', async () => {
		for (const overrideDefaultStyling of [true, false]) {
			render(Text, {
				id: 'text-override-' + overrideDefaultStyling,
				children: createRawSnippet(() => {
					return { render: () => '<span>Default<span>' };
				}),
				class: 'text-2xl',
				overrideDefaultStyling
			});

			const text = page.getByTestId('text-override-' + overrideDefaultStyling);
			await expect.element(text).toBeInTheDocument();
			expect(text.element().tagName).toBe('P');
			await expect.element(text).toHaveTextContent('Default');

			if (overrideDefaultStyling) {
				await expect.element(text).toHaveClass('text-2xl');
				await expect.element(text).not.toHaveClass('fluid-text');
			} else {
				await expect.element(text).toHaveClass('text-2xl');
				await expect.element(text).toHaveClass('fluid-text');
			}
		}
	});

	test('Override Default Styling', async () => {
		render(Text, {
			id: 'text-default',
			children: createRawSnippet(() => {
				return { render: () => '<span>Default<span>' };
			}),
			class: 'text-2xl',
			overrideDefaultStyling: true
		});

		const text = page.getByTestId('text-default');
		await expect.element(text).toBeInTheDocument();
		expect(text.element().tagName).toBe('P');
		await expect.element(text).toHaveTextContent('Default');
		await expect.element(text).not.toHaveClass('fluid-text');
	});

	test('Override Default Styling', async () => {
		render(Text, {
			id: 'text-default',
			children: createRawSnippet(() => {
				return { render: () => '<span>Default<span>' };
			}),
			'aria-label': 'text'
		});

		const text = page.getByTestId('text-default');
		await expect.element(text).toBeInTheDocument();
		expect(text.element().tagName).toBe('P');
		await expect.element(text).toHaveTextContent('Default');
		expect(text.element().ariaLabel).toBe('text');
	});
});
