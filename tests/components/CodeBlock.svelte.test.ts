import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import CodeBlock from '$lib/components/CodeBlock.svelte';

describe('CodeBlock', () => {
	test('Default', async () => {
		const sampleCode = 'const a = 1;\nconsole.log(a);';
		render(CodeBlock, { componentId: 'code-block-default', code: sampleCode });

		// Structure Check
		const container = page.getByTestId('code-block-default');
		await expect.element(container).toBeInTheDocument();
		await expect.element(container).toHaveClass('fluid-code-block-container');

		// Check for code content
		await expect.element(page.getByText('const a = 1;')).toBeInTheDocument();
		await expect.element(page.getByText('console.log(a);')).toBeInTheDocument();

		// Check for line numbers
		await expect.element(page.getByText('0', { exact: true })).toBeInTheDocument();
		await expect.element(page.getByText('1', { exact: true })).toBeInTheDocument();
	});

	test('Hide Line Numbers', async () => {
		const sampleCode = 'console.log("no numbers");';
		render(CodeBlock, {
			componentId: 'code-block-no-numbers',
			code: sampleCode,
			showLineNumbers: false
		});

		const container = page.getByTestId('code-block-no-numbers');
		await expect.element(container).toBeInTheDocument();

		// Ensure content is there
		await expect.element(page.getByText('console.log("no numbers");')).toBeInTheDocument();

		// Ensure line numbers column is missing
		const indexContainer = container.element().querySelector('.fluid-code-block-index');
		expect(indexContainer).toBeNull();
	});

	test('Language Class', async () => {
		const sampleCode = 'const x = 10;';
		render(CodeBlock, {
			componentId: 'code-block-lang',
			code: sampleCode,
			language: 'typescript'
		});

		// Verify the code element has the correct language class
		const container = page.getByTestId('code-block-lang');
		const codeElement = container.element().querySelector('code.language-typescript');

		expect(codeElement).not.toBeNull();
	});

	test('Variant', async () => {
		const sampleCode = 'const v = "variant";';
		render(CodeBlock, {
			componentId: 'code-block-variant',
			code: sampleCode,
			variant: 'variant-dark'
		});

		const container = page.getByTestId('code-block-variant');
		await expect.element(container).toBeInTheDocument();
		await expect.element(container).toHaveClass('variant-dark');
		await expect.element(container).toHaveClass('fluid-code-block-container');

		// Check Children Propagation
		// We use standard DOM API on the container element
		const containerElement = container.element();

		// Row
		const rowElement = containerElement.querySelector('.fluid-code-block-row');
		expect(rowElement).not.toBeNull();
		expect(rowElement?.classList.contains('variant-dark')).toBe(true);

		// Index (Line Numbers)
		const indexElement = containerElement.querySelector('.fluid-code-block-index');
		expect(indexElement).not.toBeNull();
		expect(indexElement?.classList.contains('variant-dark')).toBe(true);

		// Content
		const contentElement = containerElement.querySelector('.fluid-code-block-content');
		expect(contentElement).not.toBeNull();
		expect(contentElement?.classList.contains('variant-dark')).toBe(true);
	});
});
