export function applyCharacterFilter(keys: Array<string>, value: string) {
	return value
		.split('')
		.filter((char) => keys.includes(char))
		.join('');
}
