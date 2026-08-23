import { describe, expect, test } from 'vitest';
import { filterOptions, getNextSelectableIndex } from '$lib/utilities/combobox';

describe('Combobox Utility', () => {
	const sampleOptions = [
		{ value: 'svelte', label: 'Svelte' },
		{ value: 'react', label: 'React' },
		{ value: 'vue', label: 'Vue' }
	];

	test('filterOptions returns all options when search query is empty', () => {
		expect(filterOptions(sampleOptions, '')).toEqual(sampleOptions);
		expect(filterOptions(sampleOptions, '   ')).toEqual(sampleOptions);
	});

	test('filterOptions performs case-insensitive substring matching', () => {
		expect(filterOptions(sampleOptions, 'svel')).toEqual([{ value: 'svelte', label: 'Svelte' }]);
		expect(filterOptions(sampleOptions, 'ACT')).toEqual([{ value: 'react', label: 'React' }]);
		expect(filterOptions(sampleOptions, 'angular')).toEqual([]);
	});

	test('getNextSelectableIndex advances correctly', () => {
		expect(getNextSelectableIndex(0, 3, 'next')).toBe(1);
		expect(getNextSelectableIndex(2, 3, 'next')).toBe(0);
		expect(getNextSelectableIndex(0, 3, 'previous')).toBe(2);
		expect(getNextSelectableIndex(1, 3, 'previous')).toBe(0);
		expect(getNextSelectableIndex(-1, 0, 'next')).toBe(-1);
	});
});
