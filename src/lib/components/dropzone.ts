export type DropzoneMode = "file" | "text";

export type DropzoneDropEffect = "copy" | "link" | "move" | "none";

export type DropzoneState = {
  isDragOver: boolean;
  isInvalid: boolean;
};

export function isDragValid(event: DragEvent, mode: DropzoneMode): boolean {
  if (!event.dataTransfer) {
    return false;
  }

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

export function processDropzoneDragOver(event: DragEvent, dropEffect: DropzoneDropEffect = "copy", mode: DropzoneMode = "file"): DropzoneState {
  event.preventDefault();

  const isValid = isDragValid(event, mode);
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = isValid ? dropEffect : "none";
  }

  return {
    isDragOver: true,
    isInvalid: !isValid,
  };
}

export function processDropzoneDragEnter(event: DragEvent, mode: DropzoneMode = "file"): DropzoneState {
  return {
    isDragOver: true,
    isInvalid: !isDragValid(event, mode),
  };
}

export function processDropzoneDragLeave(): DropzoneState {
  return {
    isDragOver: false,
    isInvalid: false,
  };
}

export function processDropzoneDrop(event: DragEvent, mode: DropzoneMode = "file"): Array<File> | string | null {
  event.preventDefault();

  if (!isDragValid(event, mode)) {
    return null;
  }

  if (mode === "file") {
    return event.dataTransfer?.files ? Array.from(event.dataTransfer.files) : [];
  }

  return event.dataTransfer?.getData("text/plain") || "";
}
