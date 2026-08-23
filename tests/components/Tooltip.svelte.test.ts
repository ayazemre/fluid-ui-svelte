import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Tooltip } from '$lib/components';
import { createRawSnippet } from 'svelte';

describe('Tooltip', () => {
	test('Default Rendering', async () => {
		render(Tooltip, {
			componentId: 'tooltip-default',
			text: 'Helpful hint',
			delay: 0,
			trigger: createRawSnippet(() => {
				return { render: () => '<button id="tooltip-trigger-btn">Hover Target</button>' };
			})
		});

		const container = page.getByTestId('tooltip-default');
		await expect.element(container).toBeInTheDocument();

		const triggerBtn = page.getByTestId('tooltip-trigger-btn');
		await expect.element(triggerBtn).toBeInTheDocument();
	});

	test('Variant Propagation', async () => {
		render(Tooltip, {
			componentId: 'tooltip-variant',
			variant: 'dark',
			text: 'Hint',
			trigger: createRawSnippet(() => {
				return { render: () => '<button>Target</button>' };
			})
		});

		const container = page.getByTestId('tooltip-variant');
		await expect.element(container).toHaveClass('fluid-tooltip-dark');
	});
});
