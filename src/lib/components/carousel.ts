export type CarouselScrollMetrics = {
  activeIndex: number;
  scrollPercentage: number;
};

/**
 * Calculates the percentage of total scroll distance completed (0 to 100).
 */
export function calculateScrollPercentage(containerElement: HTMLElement, orientation: "horizontal" | "vertical" = "horizontal"): number {
  const currentScrollPosition = orientation === "horizontal" ? containerElement.scrollLeft : containerElement.scrollTop;
  const maximumScrollDistance =
    orientation === "horizontal"
      ? containerElement.scrollWidth - containerElement.clientWidth
      : containerElement.scrollHeight - containerElement.clientHeight;

  if (maximumScrollDistance <= 0) {
    return 0;
  }

  const rawScrollPercentage = (currentScrollPosition / maximumScrollDistance) * 100;
  return Math.min(100, Math.max(0, Number(rawScrollPercentage.toFixed(2))));
}

/**
 * Calculates the current active index based on scroll position.
 * Returns the index of the child closest to the start of the container.
 */
export function calculateIndexFromScroll(containerElement: HTMLElement, orientation: "horizontal" | "vertical" = "horizontal"): number {
  const currentScrollPosition = orientation === "horizontal" ? containerElement.scrollLeft : containerElement.scrollTop;
  const childElements = Array.from(containerElement.children) as HTMLElement[];

  if (childElements.length === 0) {
    return 0;
  }

  let closestChildIndex = 0;
  let minimumDistance = Infinity;

  childElements.forEach((childElement, index) => {
    const childOffsetPosition = orientation === "horizontal" ? childElement.offsetLeft : childElement.offsetTop;
    const distanceToScrollPosition = Math.abs(childOffsetPosition - currentScrollPosition);

    if (distanceToScrollPosition < minimumDistance) {
      minimumDistance = distanceToScrollPosition;
      closestChildIndex = index;
    }
  });

  return closestChildIndex;
}

/**
 * Retrieves unified active index and scroll percentage metrics.
 */
export function getCarouselScrollMetrics(
  containerElement: HTMLElement,
  orientation: "horizontal" | "vertical" = "horizontal",
): CarouselScrollMetrics {
  return {
    activeIndex: calculateIndexFromScroll(containerElement, orientation),
    scrollPercentage: calculateScrollPercentage(containerElement, orientation),
  };
}

/**
 * Programmatically scrolls the carousel directly to a specific item index.
 */
export function scrollToIndex(containerElement: HTMLElement, targetIndex: number, orientation: "horizontal" | "vertical" = "horizontal"): void {
  const childElements = Array.from(containerElement.children) as HTMLElement[];
  const targetChildElement = childElements[targetIndex];

  if (!targetChildElement) {
    return;
  }

  const targetOffsetPosition = orientation === "horizontal" ? targetChildElement.offsetLeft : targetChildElement.offsetTop;
  const currentScrollPosition = orientation === "horizontal" ? containerElement.scrollLeft : containerElement.scrollTop;

  if (Math.abs(currentScrollPosition - targetOffsetPosition) < 2) {
    return;
  }

  containerElement.scrollTo({
    behavior: "smooth",
    left: orientation === "horizontal" ? targetOffsetPosition : 0,
    top: orientation === "vertical" ? targetOffsetPosition : 0,
  });
}
