export function calculateContextMenuPosition(
	clientX: number,
	clientY: number,
	menuWidth: number,
	menuHeight: number,
	windowWidth: number,
	windowHeight: number
): { x: number; y: number } {
	let x = clientX;
	let y = clientY;

	if (x + menuWidth > windowWidth) {
		x = Math.max(0, windowWidth - menuWidth - 8);
	}

	if (y + menuHeight > windowHeight) {
		y = Math.max(0, windowHeight - menuHeight - 8);
	}

	return { x, y };
}
