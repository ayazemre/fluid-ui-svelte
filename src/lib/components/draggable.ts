export type DraggableDragState = {
  isDragging: boolean;
};

export function handleDraggableDragStart(event: DragEvent, disabled: boolean, onDragStartCallback?: (event: DragEvent) => void): boolean {
  if (disabled) {
    event.preventDefault();
    return false;
  }

  if (onDragStartCallback) {
    onDragStartCallback(event);
  }

  return true;
}

export function handleDraggableDrag(event: DragEvent, onDragCallback?: (event: DragEvent) => void): void {
  if (onDragCallback) {
    onDragCallback(event);
  }
}

export function handleDraggableDragEnd(event: DragEvent, onDragEndCallback?: (event: DragEvent) => void): boolean {
  if (onDragEndCallback) {
    onDragEndCallback(event);
  }

  return false;
}
