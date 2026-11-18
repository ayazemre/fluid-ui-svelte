export type AnchoredOverlayPosition =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export type TriggerMode = "click" | "hover" | "focus" | "manual";

export type AnchoredOverlayLifecycleOptions = {
  autoFlip?: boolean;
  closeOnClickOutside: boolean;
  closeOnEscape: boolean;
  getContainerElement: () => HTMLElement | null | undefined;
  getFloatElement?: () => HTMLElement | null | undefined;
  getIsOpen: () => boolean;
  onClose: () => void;
  onPositionChange?: (newPosition: AnchoredOverlayPosition) => void;
  preferredPosition?: AnchoredOverlayPosition;
};

export function getAnchoredOverlayPositionClass(position: AnchoredOverlayPosition): string {
  return `fluid-anchored-overlay-${position}`;
}

export function computeAutoFlippedPosition(
  preferredPosition: AnchoredOverlayPosition,
  containerElement: HTMLElement,
  floatElement: HTMLElement,
): AnchoredOverlayPosition {
  if (typeof window === "undefined") {
    return preferredPosition;
  }

  const containerRect = containerElement.getBoundingClientRect();
  const floatRect = floatElement.getBoundingClientRect();
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  let computedPosition = preferredPosition;

  // Vertical Flipping
  if (computedPosition.startsWith("bottom")) {
    const isOverflowingBottom = containerRect.bottom + floatRect.height + 8 > viewportHeight;
    const hasRoomOnTop = containerRect.top - floatRect.height - 8 >= 0;
    if (isOverflowingBottom && hasRoomOnTop) {
      computedPosition = computedPosition.replace("bottom", "top") as AnchoredOverlayPosition;
    }
  } else if (computedPosition.startsWith("top")) {
    const isOverflowingTop = containerRect.top - floatRect.height - 8 < 0;
    const hasRoomOnBottom = containerRect.bottom + floatRect.height + 8 <= viewportHeight;
    if (isOverflowingTop && hasRoomOnBottom) {
      computedPosition = computedPosition.replace("top", "bottom") as AnchoredOverlayPosition;
    }
  }

  // Horizontal Flipping
  if (computedPosition.startsWith("right")) {
    const isOverflowingRight = containerRect.right + floatRect.width + 8 > viewportWidth;
    const hasRoomOnLeft = containerRect.left - floatRect.width - 8 >= 0;
    if (isOverflowingRight && hasRoomOnLeft) {
      computedPosition = computedPosition.replace("right", "left") as AnchoredOverlayPosition;
    }
  } else if (computedPosition.startsWith("left")) {
    const isOverflowingLeft = containerRect.left - floatRect.width - 8 < 0;
    const hasRoomOnRight = containerRect.right + floatRect.width + 8 <= viewportWidth;
    if (isOverflowingLeft && hasRoomOnRight) {
      computedPosition = computedPosition.replace("left", "right") as AnchoredOverlayPosition;
    }
  }

  // Cross-axis Start/End Alignment Flipping
  if (computedPosition.endsWith("-start")) {
    if (computedPosition.startsWith("top") || computedPosition.startsWith("bottom")) {
      const isOverflowingRight = containerRect.left + floatRect.width > viewportWidth;
      if (isOverflowingRight) {
        computedPosition = computedPosition.replace("-start", "-end") as AnchoredOverlayPosition;
      }
    }
  } else if (computedPosition.endsWith("-end")) {
    if (computedPosition.startsWith("top") || computedPosition.startsWith("bottom")) {
      const isOverflowingLeft = containerRect.right - floatRect.width < 0;
      if (isOverflowingLeft) {
        computedPosition = computedPosition.replace("-end", "-start") as AnchoredOverlayPosition;
      }
    }
  }

  return computedPosition;
}

export function setupClickOutsideListener(containerElement: HTMLElement | null | undefined, onOutsideClick: () => void): () => void {
  if (typeof document === "undefined" || !containerElement) {
    return () => {};
  }

  function handlePointerDown(event: PointerEvent): void {
    const targetNode = event.target as Node | null;
    if (containerElement && targetNode && !containerElement.contains(targetNode)) {
      onOutsideClick();
    }
  }

  document.addEventListener("pointerdown", handlePointerDown, { capture: true });

  return () => {
    document.removeEventListener("pointerdown", handlePointerDown, { capture: true });
  };
}

export function setupEscapeListener(onEscape: () => void): () => void {
  if (typeof document === "undefined") {
    return () => {};
  }

  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      onEscape();
    }
  }

  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
}

export function setupCollisionDetection(
  containerElement: HTMLElement | null | undefined,
  floatElement: HTMLElement | null | undefined,
  preferredPosition: AnchoredOverlayPosition,
  onPositionChange: (newPosition: AnchoredOverlayPosition) => void,
): () => void {
  if (typeof window === "undefined" || !containerElement || !floatElement) {
    return () => {};
  }

  function evaluateCollision(): void {
    if (!containerElement || !floatElement) {
      return;
    }
    const calculatedPosition = computeAutoFlippedPosition(preferredPosition, containerElement, floatElement);
    onPositionChange(calculatedPosition);
  }

  const animationFrameId = requestAnimationFrame(evaluateCollision);

  window.addEventListener("resize", evaluateCollision, { passive: true });
  window.addEventListener("scroll", evaluateCollision, { capture: true, passive: true });

  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener("resize", evaluateCollision);
    window.removeEventListener("scroll", evaluateCollision, { capture: true });
  };
}

export function setupAnchoredOverlayLifecycle(options: AnchoredOverlayLifecycleOptions): () => void {
  const {
    autoFlip = true,
    closeOnClickOutside,
    closeOnEscape,
    getContainerElement,
    getFloatElement,
    getIsOpen,
    onClose,
    onPositionChange,
    preferredPosition = "bottom-start",
  } = options;

  if (!getIsOpen()) {
    return () => {};
  }

  const cleanups: Array<() => void> = [];
  const containerElement = getContainerElement();

  if (closeOnClickOutside) {
    cleanups.push(setupClickOutsideListener(containerElement, onClose));
  }

  if (closeOnEscape) {
    cleanups.push(setupEscapeListener(onClose));
  }

  if (autoFlip && onPositionChange && getFloatElement) {
    const floatElement = getFloatElement();
    cleanups.push(setupCollisionDetection(containerElement, floatElement, preferredPosition, onPositionChange));
  }

  return () => {
    for (const cleanup of cleanups) {
      cleanup();
    }
  };
}
