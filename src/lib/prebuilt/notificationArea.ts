export type NotificationPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type NotificationFlyParameters = {
  duration: number;
  x?: number;
  y?: number;
};

export function getNotificationAreaPositionClass(position: NotificationPosition): string {
  return `fluid-notification-area-${position}`;
}

export function getNotificationFlyParameters(position: NotificationPosition, distance: number = 100): NotificationFlyParameters {
  switch (position) {
    case "top-left":
    case "center-left":
      return { duration: 300, x: -distance };
    case "top-right":
    case "center-right":
      return { duration: 300, x: distance };
    case "top-center":
      return { duration: 300, y: -distance };
    case "bottom-center":
      return { duration: 300, y: distance };
    case "bottom-left":
      return { duration: 300, x: -distance, y: distance / 2 };
    case "bottom-right":
    default:
      return { duration: 300, x: distance, y: distance / 2 };
  }
}

export function removeItemFromList<T extends { id: string | number }>(items: T[], itemId: string | number): T[] {
  return items.filter((item) => item.id !== itemId);
}

export function setupNotificationAutoDismiss<T extends { duration?: number; id: string | number }>(
  getItems: () => T[],
  onDismiss: (itemId: string | number) => void,
): () => void {
  const activeTimers = new Map<string | number, ReturnType<typeof setTimeout>>();

  const currentItems = getItems();
  const currentItemIds = new Set(currentItems.map((item) => item.id));

  // Schedule timers for newly added items
  for (const item of currentItems) {
    if (item.duration !== undefined && item.duration > 0 && !activeTimers.has(item.id)) {
      const timer = setTimeout(() => {
        activeTimers.delete(item.id);
        onDismiss(item.id);
      }, item.duration);
      activeTimers.set(item.id, timer);
    }
  }

  // Remove timers for items no longer present
  for (const [id, timer] of activeTimers.entries()) {
    if (!currentItemIds.has(id)) {
      clearTimeout(timer);
      activeTimers.delete(id);
    }
  }

  return () => {
    for (const timer of activeTimers.values()) {
      clearTimeout(timer);
    }
    activeTimers.clear();
  };
}
