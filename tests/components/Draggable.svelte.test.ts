import { page } from '@vitest/browser/context';
import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Draggable } from '$lib/components';
import { createRawSnippet } from 'svelte';

describe('Draggable', () => {
	test('Default', async () => {
		render(Draggable, {
			componentId: 'draggable-test',
			children: createRawSnippet(() => ({
				render: () => '<span>Drag Me</span>'
			}))
		});

		const element = page.getByTestId('draggable-test');
		await expect.element(element).toBeInTheDocument();
		await expect.element(element).toHaveAttribute('draggable', 'true');
		await expect.element(element).toHaveClass('fluid-draggable');
		await expect.element(element).toHaveTextContent('Drag Me');
	});

	test('Variant', async () => {
		render(Draggable, {
			componentId: 'draggable-variant',
			variant: 'primary',
			children: createRawSnippet(() => ({
				render: () => '<span>Content</span>'
			}))
		});

		const element = page.getByTestId('draggable-variant');
		await expect.element(element).toHaveClass('primary');
	});

	test('ondragstart event', async () => {
		const ondragstart = vi.fn();
		render(Draggable, {
			componentId: 'draggable-event',
			ondragstart,
			children: createRawSnippet(() => ({
				render: () => '<span>Drag Me</span>'
			}))
		});

		const element = page.getByTestId('draggable-event');

		// In browser mode, we can dispatch events
		element.element().dispatchEvent(new DragEvent('dragstart'));
		expect(ondragstart).toHaveBeenCalled();
	});
});
