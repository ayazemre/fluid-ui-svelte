import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Calendar from '$lib/components/Calendar.svelte';

describe('Calendar', () => {
	test('Default', async () => {
		render(Calendar, {});

		const now = new Date();
		const monthName = now.toLocaleString('default', { month: 'long' });
		const monthDisplay = page.getByText(monthName);
		const day13 = page.getByRole('button', { name: '13' });
		const day14 = page.getByRole('button', { name: '14' });
		const day15 = page.getByRole('button', { name: '15' });

		await expect.element(monthDisplay).toBeInTheDocument();
		await expect.element(day13).toBeInTheDocument();
		await expect.element(day14).toBeInTheDocument();
		await expect.element(day15).toBeInTheDocument();

		await expect.element(day13).toHaveClass('fluid-calendar-cell');
		await expect.element(day14).toHaveClass('fluid-calendar-cell');
		await expect.element(day15).toHaveClass('fluid-calendar-cell');

		// Select the 15th as the start date.
		await day15.click();
		await expect.element(day15).toHaveClass('fluid-calendar-cell-selected');

		// Select the 13th, which should become the new start date.
		await day13.click();
		await expect.element(day13).toHaveClass('fluid-calendar-cell-selected');

		// Now, the 14th should be in the range.
		await new Promise((resolve) => setTimeout(resolve, 1000));
		await expect.element(day14).toHaveClass('fluid-calendar-cell-in-range');
	});

	test('Variant', async () => {
		render(Calendar, { variant: 'variant-1' });

		const calendar = page.getByText(new Date().toLocaleString('default', { month: 'long' }));
		await expect.element(calendar.element().parentElement).toHaveClass('variant-1');
		await expect.element(calendar.element().parentElement!.parentElement).toHaveClass('variant-1');
	});
});
