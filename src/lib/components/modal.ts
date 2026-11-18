export function handleModalKeyDown(event: KeyboardEvent, isModalOpen: boolean, closeCallback: () => void): void {
  if (event.key === "Escape" && isModalOpen) {
    closeCallback();
  }
}

export function setupModalLifecycle(isModalOpen: boolean, scrollLock: boolean, closeCallback: () => void): (() => void) | undefined {
  if (!isModalOpen) {
    return undefined;
  }

  const originalBodyOverflowStyle = window.getComputedStyle(document.body).overflow;
  if (scrollLock) {
    document.body.style.overflow = "hidden";
  }

  const handleKeyDown = (event: KeyboardEvent): void => {
    handleModalKeyDown(event, isModalOpen, closeCallback);
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    if (scrollLock) {
      document.body.style.overflow = originalBodyOverflowStyle;
    }
    window.removeEventListener("keydown", handleKeyDown);
  };
}
