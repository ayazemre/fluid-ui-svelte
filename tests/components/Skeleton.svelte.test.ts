import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Skeleton } from '$lib/components';
import { createRawSnippet } from 'svelte';

describe('Skeleton', () => {
	test('Default - shows skeleton when loading is true', async () => {
		render(Skeleton, {
			componentId: 'skeleton-default',
			loading: true
		});

		const skeleton = page.getByTestId('skeleton-default');
		await expect.element(skeleton).toBeInTheDocument();
		await expect.element(skeleton).toHaveClass('fluid-skeleton');
		await expect.element(skeleton).toHaveClass('fluid-skeleton-animated');
		await expect.element(skeleton).toHaveClass('fluid-skeleton-rectangle');
	});

	test('Shows children when loading is false', async () => {
		render(Skeleton, {
			componentId: 'skeleton-loaded',
			loading: false,
			children: createRawSnippet(() => ({
				render: () => '<span data-testid="actual-content">Content loaded!</span>'
			}))
		});

		const content = page.getByTestId('actual-content');
		await expect.element(content).toBeInTheDocument();
	});

	test('Circle Shape', async () => {
		render(Skeleton, {
			componentId: 'skeleton-circle',
			loading: true,
			shape: 'circle',
			height: '48px'
		});

		const skeleton = page.getByTestId('skeleton-circle');
		await expect.element(skeleton).toBeInTheDocument();
		await expect.element(skeleton).toHaveClass('fluid-skeleton-circle');
		// Circle should have equal width and height
		const el = skeleton.element() as HTMLElement;
		expect(el.style.width).toBe('48px');
		expect(el.style.height).toBe('48px');
	});

	test('Text Shape with Multiple Lines', async () => {
		render(Skeleton, {
			componentId: 'skeleton-text',
			loading: true,
			shape: 'text',
			lines: 3
		});

		const container = page.getByTestId('skeleton-text');
		await expect.element(container).toBeInTheDocument();
		await expect.element(container).toHaveClass('fluid-skeleton-text-container');

		// Should have 3 skeleton lines
		const containerEl = container.element() as HTMLElement;
		const lines = containerEl.querySelectorAll('.fluid-skeleton-text');
		expect(lines.length).toBe(3);

		// Last line should have the 'last' class and 70% width
		const lastLine = lines[2] as HTMLElement;
		expect(lastLine.classList.contains('fluid-skeleton-text-last')).toBe(true);
		expect(lastLine.style.width).toBe('70%');
	});

	test('Custom Dimensions', async () => {
		render(Skeleton, {
			componentId: 'skeleton-dimensions',
			loading: true,
			width: '200px',
			height: '50px'
		});

		const skeleton = page.getByTestId('skeleton-dimensions');
		const el = skeleton.element() as HTMLElement;
		expect(el.style.width).toBe('200px');
		expect(el.style.height).toBe('50px');
	});

	test('No Animation', async () => {
		render(Skeleton, {
			componentId: 'skeleton-static',
			loading: true,
			animated: false
		});

		const skeleton = page.getByTestId('skeleton-static');
		await expect.element(skeleton).toBeInTheDocument();
		await expect.element(skeleton).toHaveClass('fluid-skeleton');
		await expect.element(skeleton).not.toHaveClass('fluid-skeleton-animated');
	});

	test('Variant', async () => {
		render(Skeleton, {
			componentId: 'skeleton-variant',
			loading: true,
			variant: 'custom-variant'
		});

		const skeleton = page.getByTestId('skeleton-variant');
		await expect.element(skeleton).toHaveClass('custom-variant');
	});

	test('Custom Placeholder snippet', async () => {
		render(Skeleton, {
			componentId: 'skeleton-placeholder',
			loading: true,
			placeholder: createRawSnippet(() => ({
				render: () => '<div data-testid="custom-placeholder">Custom Loading...</div>'
			}))
		});

		const placeholder = page.getByTestId('custom-placeholder');
		await expect.element(placeholder).toBeInTheDocument();
	});

	test('Suspense-like toggle behavior', async () => {
		const { rerender } = render(Skeleton, {
			componentId: 'skeleton-toggle',
			loading: true,
			shape: 'rectangle',
			children: createRawSnippet(() => ({
				render: () => '<span data-testid="toggle-content">Loaded!</span>'
			}))
		});

		// Initially loading - skeleton should be visible
		const skeleton = page.getByTestId('skeleton-toggle');
		await expect.element(skeleton).toBeInTheDocument();

		// Switch to loaded state
		await rerender({
			componentId: 'skeleton-toggle',
			loading: false,
			shape: 'rectangle',
			children: createRawSnippet(() => ({
				render: () => '<span data-testid="toggle-content">Loaded!</span>'
			}))
		});

		// Content should now be visible
		const content = page.getByTestId('toggle-content');
		await expect.element(content).toBeInTheDocument();
	});
});
