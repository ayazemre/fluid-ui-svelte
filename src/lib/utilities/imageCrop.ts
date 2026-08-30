export interface TransformOptions {
  zoom: number;
  pan: { x: number; y: number };
}

/**
 * Draws the transformed image onto the canvas context.
 */
export function drawImage(context: CanvasRenderingContext2D, image: ImageBitmap, { zoom = 1, pan = { x: 0, y: 0 } }: TransformOptions) {
  context.save();

  const canvasWidth = context.canvas.width;
  const canvasHeight = context.canvas.height;

  // Move to center of canvas
  context.translate(canvasWidth / 2, canvasHeight / 2);

  // Apply transforms
  context.translate(pan.x, pan.y);
  context.scale(zoom, zoom);

  // Draw image centered at origin
  context.drawImage(image, -image.width / 2, -image.height / 2);

  context.restore();
}

/**
 * Draws the overlay with a transparent cutout for the crop area.
 * @param padding Padding in pixels around the crop area.
 * @param shape The shape of the crop area cutout.
 * @param overlayColor The color of the dimmed overlay.
 */
export function drawOverlay(
  context: CanvasRenderingContext2D,
  aspectRatio: { x: number; y: number },
  padding: number = 0,
  shape: "rectangle" | "circle" = "rectangle",
  overlayColor: string = "rgba(0, 0, 0, 0.5)",
) {
  const canvasWidth = context.canvas.width;
  const canvasHeight = context.canvas.height;

  // Calculate available area after padding
  const availableWidth = Math.max(0, canvasWidth - padding * 2);
  const availableHeight = Math.max(0, canvasHeight - padding * 2);

  const targetRatio = aspectRatio.x / aspectRatio.y;
  const availableRatio = availableWidth / availableHeight;

  let width: number, height: number;

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

  const crop = { height, width, x, y };

  // Draw dimmed background with a hole using 'evenodd' rule
  context.fillStyle = overlayColor;
  context.beginPath();
  context.rect(0, 0, canvasWidth, canvasHeight);

  if (shape === "circle") {
    const centerX = crop.x + crop.width / 2;
    const centerY = crop.y + crop.height / 2;
    const radius = Math.min(crop.width, crop.height) / 2;
    context.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  } else {
    context.rect(crop.x, crop.y, crop.width, crop.height);
  }

  context.fill("evenodd");

  return crop;
}

export function generateCroppedImage(
  image: ImageBitmap,
  crop: { x: number; y: number; width: number; height: number },
  transforms: TransformOptions,
  canvasDimensions: { width: number; height: number },
  shape: "rectangle" | "circle" = "rectangle",
): string | undefined {
  if (!image || crop.width === 0 || crop.height === 0) return undefined;

  const offscreenCanvas = document.createElement("canvas");
  offscreenCanvas.width = crop.width;
  offscreenCanvas.height = crop.height;
  const context = offscreenCanvas.getContext("2d");

  if (!context) return undefined;

  if (shape === "circle") {
    context.beginPath();
    const centerX = crop.width / 2;
    const centerY = crop.height / 2;
    const radius = Math.min(crop.width, crop.height) / 2;
    context.arc(centerX, centerY, radius, 0, Math.PI * 2);
    context.clip();
  }

  // Step 1: Shift origin to match the crop box's top-left relative to the main canvas
  context.translate(-crop.x, -crop.y);

  // Step 2: Now we are in "Main Canvas Coordinates". Apply the same transforms as drawImage.
  const canvasCenterX = canvasDimensions.width / 2;
  const canvasCenterY = canvasDimensions.height / 2;

  context.translate(canvasCenterX, canvasCenterY);

  const { zoom = 1, pan = { x: 0, y: 0 } } = transforms;

  context.translate(pan.x, pan.y);
  context.scale(zoom, zoom);

  context.drawImage(image, -image.width / 2, -image.height / 2);

  return offscreenCanvas.toDataURL("image/png");
}
