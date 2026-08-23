export type ComboboxOption = {
	value: string;
	label: string;
	disabled?: boolean;
};

export function filterOptions<T extends ComboboxOption>(
	options: Array<T>,
	searchQuery: string
): Array<T> {
	if (!searchQuery || searchQuery.trim().length === 0) {
		return options;
	}
	const normalizedQuery = searchQuery.trim().toLowerCase();
	return options.filter((option) => option.label.toLowerCase().includes(normalizedQuery));
}

export function getNextSelectableIndex(
	currentIndex: number,
	totalCount: number,
	direction: 'next' | 'previous'
): number {
	if (totalCount <= 0) return -1;
	if (direction === 'next') {
		return currentIndex < totalCount - 1 ? currentIndex + 1 : 0;
	}
	return currentIndex > 0 ? currentIndex - 1 : totalCount - 1;
}
