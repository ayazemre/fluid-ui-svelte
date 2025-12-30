export function scrollToIndex(
	componentId: string,
	activeIndex: number,
	totalItems: number,
	orientation: 'horizontal' | 'vertical' = 'horizontal'
): void {
	const element = document.getElementById(componentId);
	if (!element || totalItems <= 0) return;

	const scrollWidth = orientation === 'horizontal' ? element.scrollWidth : element.scrollHeight;
	const itemWidth = scrollWidth / totalItems;
	const targetPosition = activeIndex * itemWidth;

	element.scrollTo({
		left: orientation === 'horizontal' ? targetPosition : 0,
		top: orientation === 'vertical' ? targetPosition : 0
	});
}

export function getSwipeDirection(
	touchStartX: number,
	touchStartY: number,
	touchEndX: number,
	touchEndY: number,
	threshold: number = 50,
	orientation: 'horizontal' | 'vertical' = 'horizontal'
): 'next' | 'prev' | null {
	const diffX = touchStartX - touchEndX;
	const diffY = touchStartY - touchEndY;

	if (orientation === 'horizontal') {
		if (Math.abs(diffX) > threshold) {
			return diffX > 0 ? 'next' : 'prev';
		}
	} else {
		if (Math.abs(diffY) > threshold) {
			return diffY > 0 ? 'next' : 'prev';
		}
	}
	return null;
}
