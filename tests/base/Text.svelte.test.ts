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
		expect(text.element().tagName).toBe('P');
		await expect.element(text).toHaveTextContent('paragraph');
		await expect.element(text).toHaveClass('fluid-text');
	});

	it('H1', async () => {
		render(Text, {
			id: 'text-h1',
			value: 'heading1',
			type: 'h1'
		});

		const text = page.getByTestId('text-h1');
		await expect.element(text).toBeInTheDocument();
		expect(text.element().tagName).toBe('H1');
		await expect.element(text).toHaveTextContent('heading1');
		await expect.element(text).toHaveClass('fluid-text');
	});

	it('H2', async () => {
		render(Text, {
			id: 'text-h2',
			value: 'heading2',
			type: 'h2'
		});

		const text = page.getByTestId('text-h2');
		await expect.element(text).toBeInTheDocument();
		expect(text.element().tagName).toBe('H2');
		await expect.element(text).toHaveTextContent('heading2');
		await expect.element(text).toHaveClass('fluid-text');
	});

	it('H3', async () => {
		render(Text, {
			id: 'text-h3',
			value: 'heading3',
			type: 'h3'
		});

		const text = page.getByTestId('text-h3');
		await expect.element(text).toBeInTheDocument();
		expect(text.element().tagName).toBe('H3');
		await expect.element(text).toHaveTextContent('heading3');
		await expect.element(text).toHaveClass('fluid-text');
	});

	it('H4', async () => {
		render(Text, {
			id: 'text-h4',
			value: 'heading4',
			type: 'h4'
		});

		const text = page.getByTestId('text-h4');
		await expect.element(text).toBeInTheDocument();
		expect(text.element().tagName).toBe('H4');
		await expect.element(text).toHaveTextContent('heading4');
		await expect.element(text).toHaveClass('fluid-text');
	});

	it('H5', async () => {
		render(Text, {
			id: 'text-h5',
			value: 'heading5',
			type: 'h5'
		});

		const text = page.getByTestId('text-h5');
		await expect.element(text).toBeInTheDocument();
		expect(text.element().tagName).toBe('H5');
		await expect.element(text).toHaveTextContent('heading5');
		await expect.element(text).toHaveClass('fluid-text');
	});

	it('H6', async () => {
		render(Text, {
			id: 'text-h6',
			value: 'heading6',
			type: 'h6'
		});

		const text = page.getByTestId('text-h6');
		await expect.element(text).toBeInTheDocument();
		expect(text.element().tagName).toBe('H6');
		await expect.element(text).toHaveTextContent('heading6');
		await expect.element(text).toHaveClass('fluid-text');
	});
});
