import type { TransitionConfig } from "svelte/transition";

export type DrawerPosition = "bottom" | "left" | "right" | "top";

export const positionClasses: Record<DrawerPosition, string> = {
  bottom: "bottom-0 right-0 left-0 w-full border-t",
  left: "left-0 top-0 bottom-0 h-full border-r",
  right: "right-0 top-0 bottom-0 h-full border-l",
  top: "top-0 right-0 left-0 w-full border-b",
};

export function emptyDrawerTransition(_node: Element, _parameters?: Record<string, unknown>): TransitionConfig {
  return {};
}

export function handleDrawerKeyDown(event: KeyboardEvent, isDrawerOpen: boolean, closeCallback: () => void): void {
  if (event.key === "Escape" && isDrawerOpen) {
    closeCallback();
  }
}

export function setupDrawerLifecycle(isDrawerOpen: boolean, scrollLock: boolean, closeCallback: () => void): (() => void) | undefined {
  if (!isDrawerOpen) {
    return undefined;
  }

  const originalBodyOverflowStyle = window.getComputedStyle(document.body).overflow;
  if (scrollLock) {
    document.body.style.overflow = "hidden";
  }

  const onKeyDown = (event: KeyboardEvent) => {
    handleDrawerKeyDown(event, isDrawerOpen, closeCallback);
  };

  window.addEventListener("keydown", onKeyDown);

  return () => {
    if (scrollLock) {
      document.body.style.overflow = originalBodyOverflowStyle;
    }
    window.removeEventListener("keydown", onKeyDown);
  };
}
