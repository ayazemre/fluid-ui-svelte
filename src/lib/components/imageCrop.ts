export type ImageCropPanCoordinates = {
  x: number;
  y: number;
};

export type ImageCropAspectRatio = {
  x: number;
  y: number;
};

export type ImageCropShape = "circle" | "rectangle";

export type ImageCropTransformOptions = {
  pan: ImageCropPanCoordinates;
  zoom: number;
};

export type ImageCropRectangularArea = {
  height: number;
  width: number;
  x: number;
  y: number;
};

export type ImageCropCanvasDimensions = {
  height: number;
  width: number;
};

/**
 * Draws the transformed image onto the canvas context.
 */
export function drawImage(context: CanvasRenderingContext2D, image: ImageBitmap, transformOptions: ImageCropTransformOptions): void {
  context.save();

  const canvasWidth = context.canvas.width;
  const canvasHeight = context.canvas.height;

  // Move to center of canvas
  context.translate(canvasWidth / 2, canvasHeight / 2);

  // Apply transforms
  context.translate(transformOptions.pan.x, transformOptions.pan.y);
  context.scale(transformOptions.zoom, transformOptions.zoom);

  // Draw image centered at origin
  context.drawImage(image, -image.width / 2, -image.height / 2);

  context.restore();
}

/**
 * Draws the overlay with a transparent cutout for the crop area.
 */
export function drawOverlay(
  context: CanvasRenderingContext2D,
  aspectRatio: ImageCropAspectRatio,
  padding: number = 0,
  shape: ImageCropShape = "rectangle",
  overlayColor: string = "rgba(0, 0, 0, 0.5)",
): ImageCropRectangularArea {
  const canvasWidth = context.canvas.width;
  const canvasHeight = context.canvas.height;

  // Calculate available area after padding
  const availableWidth = Math.max(0, canvasWidth - padding * 2);
  const availableHeight = Math.max(0, canvasHeight - padding * 2);

  const targetRatio = aspectRatio.x / aspectRatio.y;
  const availableRatio = availableWidth / availableHeight;

  let width: number;
  let height: number;

  if (availableRatio > targetRatio) {
    height = availableHeight;
    width = height * targetRatio;
  } else {
    width = availableWidth;
    height = width / targetRatio;
  }

  // Center the crop box within the canvas
  const x = (canvasWidth - width) / 2;
  const y = (canvasHeight - height) / 2;

  const cropArea: ImageCropRectangularArea = { height, width, x, y };

  // Draw dimmed background with a hole using 'evenodd' rule
  context.fillStyle = overlayColor;
  context.beginPath();
  context.rect(0, 0, canvasWidth, canvasHeight);

  if (shape === "circle") {
    const centerX = cropArea.x + cropArea.width / 2;
    const centerY = cropArea.y + cropArea.height / 2;
    const radius = Math.min(cropArea.width, cropArea.height) / 2;
    context.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  } else {
    context.rect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);
  }

  context.fill("evenodd");

  return cropArea;
}

export function generateCroppedImage(
  image: ImageBitmap,
  cropArea: ImageCropRectangularArea,
  transformOptions: ImageCropTransformOptions,
  canvasDimensions: ImageCropCanvasDimensions,
  shape: ImageCropShape = "rectangle",
): string | undefined {
  if (!image || cropArea.width === 0 || cropArea.height === 0) {
    return undefined;
  }

  const offscreenCanvas = document.createElement("canvas");
  offscreenCanvas.width = cropArea.width;
  offscreenCanvas.height = cropArea.height;
  const context = offscreenCanvas.getContext("2d");

  if (!context) {
    return undefined;
  }

  if (shape === "circle") {
    context.beginPath();
    const centerX = cropArea.width / 2;
    const centerY = cropArea.height / 2;
    const radius = Math.min(cropArea.width, cropArea.height) / 2;
    context.arc(centerX, centerY, radius, 0, Math.PI * 2);
    context.clip();
  }

  // Step 1: Shift origin to match the crop box's top-left relative to the main canvas
  context.translate(-cropArea.x, -cropArea.y);

  // Step 2: Now we are in "Main Canvas Coordinates". Apply the same transforms as drawImage.
  const canvasCenterX = canvasDimensions.width / 2;
  const canvasCenterY = canvasDimensions.height / 2;

  context.translate(canvasCenterX, canvasCenterY);
  context.translate(transformOptions.pan.x, transformOptions.pan.y);
  context.scale(transformOptions.zoom, transformOptions.zoom);

  context.drawImage(image, -image.width / 2, -image.height / 2);

  return offscreenCanvas.toDataURL("image/png");
}

export function renderImageCropPipeline(
  canvasElement: HTMLCanvasElement | undefined,
  sourceImage: ImageBitmap | undefined,
  aspectRatio: ImageCropAspectRatio | undefined,
  transformOptions: ImageCropTransformOptions,
  padding: number,
  shape: ImageCropShape,
  overlayColor: string,
): string | undefined {
  if (!canvasElement || !sourceImage || !aspectRatio) {
    return undefined;
  }

  const context = canvasElement.getContext("2d");
  if (!context) {
    return undefined;
  }

  canvasElement.width = sourceImage.width;
  canvasElement.height = sourceImage.height;

  // Draw transformed image
  drawImage(context, sourceImage, transformOptions);

  // Draw overlay (which calculates the crop box)
  const cropArea = drawOverlay(context, aspectRatio, padding, shape, overlayColor);

  // Generate final image
  return generateCroppedImage(sourceImage, cropArea, transformOptions, { height: sourceImage.height, width: sourceImage.width }, shape);
}
