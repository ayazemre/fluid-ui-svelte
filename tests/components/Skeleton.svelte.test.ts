import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Skeleton } from '$lib/components';

describe('Skeleton', () => {
	test('Default Rectangle Shape', async () => {
		render(Skeleton, {
			componentId: 'skeleton-default'
		});

		const skeleton = page.getByTestId('skeleton-default');
		await expect.element(skeleton).toBeInTheDocument();
		await expect.element(skeleton).toHaveClass('fluid-skeleton');
		await expect.element(skeleton).toHaveClass('rounded-md');
	});

	test('Circle Shape and Dimensions', async () => {
		render(Skeleton, {
			componentId: 'skeleton-circle',
			shape: 'circle',
			width: '3rem',
			height: '3rem'
		});

		const skeleton = page.getByTestId('skeleton-circle');
		await expect.element(skeleton).toBeInTheDocument();
		await expect.element(skeleton).toHaveClass('rounded-full');
	});
});
