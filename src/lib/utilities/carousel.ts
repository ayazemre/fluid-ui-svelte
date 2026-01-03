export type CarouselInternalState = {
	touchStart: number;
	initialScroll: number;
	movementDelta: number;
};

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

export function handleTouchStart(
	e: TouchEvent,
	orientation: 'horizontal' | 'vertical',
	internalState: CarouselInternalState
) {
	e.stopPropagation();
	const element = e.currentTarget as HTMLElement;
	internalState.touchStart =
		orientation === 'vertical' ? e.touches[0].clientY : e.touches[0].clientX;
	internalState.initialScroll = orientation === 'vertical' ? element.scrollTop : element.scrollLeft;
	internalState.movementDelta = 0;
}

export function handleTouchMove(
	e: TouchEvent,
	orientation: 'horizontal' | 'vertical',
	internalState: CarouselInternalState
) {
	const element = e.currentTarget as HTMLElement;
	const currentTouch = orientation === 'vertical' ? e.touches[0].clientY : e.touches[0].clientX;
	internalState.movementDelta = internalState.touchStart - currentTouch;

	element.scrollTo({
		left:
			orientation === 'vertical' ? 0 : internalState.initialScroll + internalState.movementDelta,
		top: orientation === 'vertical' ? internalState.initialScroll + internalState.movementDelta : 0,
		behavior: 'instant'
	});
}

export function handleTouchEnd(
	snapItems: boolean,
	activeIndex: number,
	totalItems: number,
	internalState: CarouselInternalState
): number {
	if (!snapItems) return activeIndex;

	const threshold = 50;
	let newIndex = activeIndex;

	if (internalState.movementDelta > threshold && activeIndex < totalItems - 1) {
		newIndex = activeIndex + 1;
	} else if (internalState.movementDelta < -threshold && activeIndex > 0) {
		newIndex = activeIndex - 1;
	}

	internalState.movementDelta = 0;
	return newIndex;
}
