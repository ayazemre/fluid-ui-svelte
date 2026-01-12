/**
 * Programmatically scrolls the carousel to a specific item index.
 */
export function scrollToIndex(
	componentId: string,
	activeIndex: number,
	orientation: 'horizontal' | 'vertical' = 'horizontal'
): void {
	const element = document.getElementById(componentId);
	if (!element || !element.children[activeIndex]) return;

	const targetChild = element.children[activeIndex] as HTMLElement;
	const targetPosition =
		orientation === 'horizontal' ? targetChild.offsetLeft : targetChild.offsetTop;

	// Check current position to avoid redundant scrolling
	const currentPosition = orientation === 'horizontal' ? element.scrollLeft : element.scrollTop;
	if (Math.abs(currentPosition - targetPosition) < 2) return;

	element.scrollTo({
		left: orientation === 'horizontal' ? targetPosition : 0,
		top: orientation === 'vertical' ? targetPosition : 0,
		behavior: 'smooth'
	});
}

/**
 * Calculates the current active index based on scroll position.
 * Returns the index of the child closest to the start of the container.
 */
export function calculateIndexFromScroll(
	element: HTMLElement,
	orientation: 'horizontal' | 'vertical' = 'horizontal'
): number {
	const scrollPos = orientation === 'horizontal' ? element.scrollLeft : element.scrollTop;
	const children = Array.from(element.children) as HTMLElement[];

	let closestIndex = 0;
	let minDistance = Infinity;

	children.forEach((child, index) => {
		const childPos = orientation === 'horizontal' ? child.offsetLeft : child.offsetTop;
		const distance = Math.abs(childPos - scrollPos);
		if (distance < minDistance) {
			minDistance = distance;
			closestIndex = index;
		}
	});

	return closestIndex;
}

export function handleScrollEnd(
	event: Event,
	orientation: 'horizontal' | 'vertical',
	activeIndex: number
) {
	const target = event.target as HTMLElement;
	const newIndex = calculateIndexFromScroll(target, orientation);
	if (newIndex !== activeIndex) {
		activeIndex = newIndex;
	}
}
