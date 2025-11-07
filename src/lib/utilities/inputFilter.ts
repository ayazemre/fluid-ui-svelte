export function inputFilter(event: InputEvent, keys: Array<string>) {
	const element = event.target as HTMLInputElement;
	if (event.data) {
		if (event.inputType == 'insertText' || event.inputType == 'insertFromPaste') {
			element.value = element.value
				.split('')
				.filter((char) => keys.includes(char))
				.join('');
		}
	}
}
