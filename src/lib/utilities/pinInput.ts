export function handlePinPaste(pastedText: string, length: number): string[] {
	const sanitized = pastedText.trim().replace(/\s+/g, '').slice(0, length);
	const values: string[] = [];

	for (let index = 0; index < length; index++) {
		values.push(sanitized[index] ?? '');
	}

	return values;
}

export function handlePinInput(
	currentIndex: number,
	inputValue: string,
	length: number,
	currentValues: string[]
): { newValues: string[]; nextIndex: number } {
	const newValues = [...currentValues];
	const character = inputValue.slice(-1);

	newValues[currentIndex] = character;
	const nextIndex = character ? Math.min(length - 1, currentIndex + 1) : currentIndex;

	return { newValues, nextIndex };
}
