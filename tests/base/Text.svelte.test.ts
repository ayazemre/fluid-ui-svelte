import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Text from '$lib/base/Text.svelte';
import { createRawSnippet } from 'svelte';

describe('Text', () => {
	it('Default', async () => {
		render(Text, {
			id: 'text-default',
			value: 'Default'
		});

		const text = page.getByTestId('text-default');
		await expect.element(text).toBeInTheDocument();
		await expect(text.element().tagName).toBe('P');
		await expect.element(text).toHaveTextContent('Default');
		await expect.element(text).toHaveClass('fluid-text');
	});

	it('P', async () => {
		render(Text, {
			id: 'text-p',
			value: 'paragraph',
			type: 'p'
		});

		const text = page.getByTestId('text-p');
		await expect.element(text).toBeInTheDocument();
		await expect(text.element().tagName).toBe('P');
		await expect.element(text).toHaveTextContent('paragraph');
		await expect.element(text).toHaveClass('fluid-text');
	});
});
