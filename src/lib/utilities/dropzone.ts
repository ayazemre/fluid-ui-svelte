export function isDragValid(event: DragEvent, mode: "file" | "text"): boolean {
  if (!event.dataTransfer) return false;

  const hasFiles = event.dataTransfer.types.includes("Files");
  const hasText = event.dataTransfer.types.includes("text/plain");

  if (mode === "file") {
    return hasFiles;
  }

  if (mode === "text" && !hasFiles) {
    return hasText;
  }

  return false;
}

export function handleDragOver(event: DragEvent, dropEffect: "copy" | "move" | "link" | "none" = "copy", mode: "file" | "text" = "file") {
  event.preventDefault();
  if (!event.dataTransfer) return;

  if (isDragValid(event, mode)) {
    event.dataTransfer.dropEffect = dropEffect;
  } else {
    event.dataTransfer.dropEffect = "none";
  }
}

export function handleDrop(event: DragEvent, mode: "file" | "text"): File[] | string | null {
  event.preventDefault();
  if (!isDragValid(event, mode)) return null;

  if (mode === "file") {
    return event.dataTransfer?.files ? Array.from(event.dataTransfer.files) : [];
  } else {
    return event.dataTransfer?.getData("text/plain") || "";
  }
}
