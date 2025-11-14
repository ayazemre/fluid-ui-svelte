export function inputFilter(event: InputEvent, keys: Array<string>) {
	// Get current element.
	const element = event.target as HTMLInputElement;

	// User types or pastes, filter out based on given keys and replace the input.
	// TODO: Check if done without DOM.
	if (event.data) {
		if (event.inputType == 'insertText' || event.inputType == 'insertFromPaste') {
			element.value = element.value
				.split('')
				.filter((char) => keys.includes(char))
				.join('');
		}
	}
}
