import type { TransitionConfig } from "svelte/transition";

export type DrawerPosition = "bottom" | "left" | "right" | "top";

export const positionClasses: Record<DrawerPosition, string> = {
  bottom: "fluid-drawer-bottom",
  left: "fluid-drawer-left",
  right: "fluid-drawer-right",
  top: "fluid-drawer-top",
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

  const handleKeyDown = (event: KeyboardEvent): void => {
    handleDrawerKeyDown(event, isDrawerOpen, closeCallback);
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    if (scrollLock) {
      document.body.style.overflow = originalBodyOverflowStyle;
    }
    window.removeEventListener("keydown", handleKeyDown);
  };
}
