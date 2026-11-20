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

export type ImageCropPanBounds = {
  maximumX: number;
  maximumY: number;
  minimumX: number;
  minimumY: number;
};

export type ImageCropState = {
  coverZoom: number;
  cropArea: ImageCropRectangularArea;
  panBounds: ImageCropPanBounds;
  transform: ImageCropTransformOptions;
};

export function resolveImageCropState(
  imageDimensions: ImageCropCanvasDimensions,
  aspectRatio: ImageCropAspectRatio,
  padding: number,
  requestedTransform: ImageCropTransformOptions,
): ImageCropState | undefined {
  const cropArea = calculateCropArea(imageDimensions, aspectRatio, padding);
  if (cropArea === undefined) return undefined;

  const transform = clampImageTransform(requestedTransform, imageDimensions, cropArea);
  if (transform === undefined) return undefined;

  return {
    coverZoom: calculateCoverZoom(imageDimensions, cropArea),
    cropArea,
    panBounds: calculatePanBounds(imageDimensions, cropArea, transform.zoom),
    transform,
  };
}

export function drawImage(context: CanvasRenderingContext2D, image: ImageBitmap, transformOptions: ImageCropTransformOptions): void {
  context.save();

  const canvasWidth = context.canvas.width;
  const canvasHeight = context.canvas.height;

  context.translate(canvasWidth / 2, canvasHeight / 2);
  context.translate(transformOptions.pan.x, transformOptions.pan.y);
  context.scale(transformOptions.zoom, transformOptions.zoom);
  context.drawImage(image, -image.width / 2, -image.height / 2);

  context.restore();
}

export function drawOverlay(
  context: CanvasRenderingContext2D,
  cropArea: ImageCropRectangularArea,
  shape: ImageCropShape,
  overlayColor: string,
): void {
  const canvasWidth = context.canvas.width;
  const canvasHeight = context.canvas.height;

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
}

export function generateCroppedImage(
  image: ImageBitmap,
  cropArea: ImageCropRectangularArea,
  transformOptions: ImageCropTransformOptions,
  canvasDimensions: ImageCropCanvasDimensions,
  shape: ImageCropShape,
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

  context.translate(-cropArea.x, -cropArea.y);

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

  const imageDimensions: ImageCropCanvasDimensions = { height: sourceImage.height, width: sourceImage.width };
  const cropState = resolveImageCropState(imageDimensions, aspectRatio, padding, transformOptions);
  if (cropState === undefined) {
    return undefined;
  }

  canvasElement.width = sourceImage.width;
  canvasElement.height = sourceImage.height;

  drawImage(context, sourceImage, cropState.transform);
  drawOverlay(context, cropState.cropArea, shape, overlayColor);

  return generateCroppedImage(sourceImage, cropState.cropArea, cropState.transform, imageDimensions, shape);
}

function calculateCropArea(
  canvasDimensions: ImageCropCanvasDimensions,
  aspectRatio: ImageCropAspectRatio,
  padding: number,
): ImageCropRectangularArea | undefined {
  if (!isPositiveFiniteNumber(canvasDimensions.width) || !isPositiveFiniteNumber(canvasDimensions.height)) return undefined;
  if (!isPositiveFiniteNumber(aspectRatio.x) || !isPositiveFiniteNumber(aspectRatio.y)) return undefined;
  if (!Number.isFinite(padding) || padding < 0) return undefined;

  const availableWidth = canvasDimensions.width - padding * 2;
  const availableHeight = canvasDimensions.height - padding * 2;
  if (availableWidth <= 0 || availableHeight <= 0) return undefined;

  const targetRatio = aspectRatio.x / aspectRatio.y;
  let fittedWidth: number;
  let fittedHeight: number;

  if (availableWidth / availableHeight > targetRatio) {
    fittedHeight = availableHeight;
    fittedWidth = fittedHeight * targetRatio;
  } else {
    fittedWidth = availableWidth;
    fittedHeight = fittedWidth / targetRatio;
  }

  const width = Math.max(1, Math.floor(fittedWidth));
  const height = Math.max(1, Math.floor(fittedHeight));

  return {
    height,
    width,
    x: Math.floor((canvasDimensions.width - width) / 2),
    y: Math.floor((canvasDimensions.height - height) / 2),
  };
}

function calculateCoverZoom(imageDimensions: ImageCropCanvasDimensions, cropArea: ImageCropRectangularArea): number {
  return Math.max(cropArea.width / imageDimensions.width, cropArea.height / imageDimensions.height);
}

function calculatePanBounds(imageDimensions: ImageCropCanvasDimensions, cropArea: ImageCropRectangularArea, zoom: number): ImageCropPanBounds {
  const centerX = imageDimensions.width / 2;
  const centerY = imageDimensions.height / 2;
  const scaledHalfWidth = (imageDimensions.width * zoom) / 2;
  const scaledHalfHeight = (imageDimensions.height * zoom) / 2;

  return {
    maximumX: cropArea.x - centerX + scaledHalfWidth,
    maximumY: cropArea.y - centerY + scaledHalfHeight,
    minimumX: cropArea.x + cropArea.width - centerX - scaledHalfWidth,
    minimumY: cropArea.y + cropArea.height - centerY - scaledHalfHeight,
  };
}

function clampImageTransform(
  requestedTransform: ImageCropTransformOptions,
  imageDimensions: ImageCropCanvasDimensions,
  cropArea: ImageCropRectangularArea,
): ImageCropTransformOptions | undefined {
  if (!Number.isFinite(requestedTransform.zoom) || !Number.isFinite(requestedTransform.pan.x) || !Number.isFinite(requestedTransform.pan.y)) {
    return undefined;
  }

  const zoom = Math.max(requestedTransform.zoom, calculateCoverZoom(imageDimensions, cropArea));
  const panBounds = calculatePanBounds(imageDimensions, cropArea, zoom);

  return {
    pan: {
      x: clampNumber(requestedTransform.pan.x, panBounds.minimumX, panBounds.maximumX),
      y: clampNumber(requestedTransform.pan.y, panBounds.minimumY, panBounds.maximumY),
    },
    zoom,
  };
}

function clampNumber(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}

function isPositiveFiniteNumber(value: number): boolean {
  return Number.isFinite(value) && value > 0;
}
