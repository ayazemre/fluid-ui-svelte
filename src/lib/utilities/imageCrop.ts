export function generateCropAreaState(
	shape: 'circle' | 'rectangle' = 'rectangle',
	aspectRatio: { w: number; h: number } = { w: 1, h: 1 }
) {
	return {
		cropArea: { x: 0, y: 0, width: 0, height: 0 },
		shape,
		aspectRatio,
		activeAction: 'idle',
		lastMousePosition: { x: 0, y: 0 }
	};
}

export function draw(
	canvasElement: HTMLCanvasElement,
	image: HTMLImageElement,
	cropAreaState: ReturnType<typeof generateCropAreaState>
) {
	if (!image || !canvasElement) return;
	const context = canvasElement.getContext('2d')!;

	// 1. Draw the base image
	context.drawImage(image, 0, 0);

	// 2. Draw the semi-transparent mask
	context.fillStyle = 'rgba(0, 0, 0, 0.2)';
	context.fillRect(0, 0, canvasElement.width, canvasElement.height);

	// 3. Cut a "hole" for the crop area
	drawCropArea(context, cropAreaState);

	// 4. Draw the resize handles
	drawHandles(context, cropAreaState);
}

function drawCropArea(
	context: CanvasRenderingContext2D,
	cropAreaState: ReturnType<typeof generateCropAreaState>
) {
	context.save(); // Save the current state
	context.globalCompositeOperation = 'destination-out';

	if (cropAreaState.shape === 'circle') {
		const { x, y, width, height } = cropAreaState.cropArea;
		// Use the smaller dimension so the circle always fits inside the bounding box
		const radius = Math.min(width, height) / 2;
		const centerX = x + width / 2;
		const centerY = y + height / 2;

		context.beginPath();
		context.arc(centerX, centerY, radius, 0, Math.PI * 2);
		context.fill();
	} else {
		// Default to square/rectangle
		context.fillRect(
			cropAreaState.cropArea.x,
			cropAreaState.cropArea.y,
			cropAreaState.cropArea.width,
			cropAreaState.cropArea.height
		);
	}

	context.restore(); // Restore to the previous state (resets globalCompositeOperation)
}

const HANDLE_SIZE = 24;

function getHandles(cropAreaState: ReturnType<typeof generateCropAreaState>) {
	const { x, y, width, height } = cropAreaState.cropArea;

	// If the crop shape is a circle, place handles around the actual circle (inscribed),
	// with a small padding so they sit slightly outside the circle's edge.
	if (cropAreaState.shape === 'circle') {
		const centerX = x + width / 2;
		const centerY = y + height / 2;
		const radius = Math.min(width, height) / 2;
		const padding = radius * 0.05; // 5% padding
		const r = radius + padding;
		const diagOffset = r / Math.sqrt(2); // 45° corner offset

		return [
			// corners (45° around circle)
			{ x: centerX - diagOffset, y: centerY - diagOffset, name: 'tl' },
			{ x: centerX + diagOffset, y: centerY - diagOffset, name: 'tr' },
			{ x: centerX + diagOffset, y: centerY + diagOffset, name: 'br' },
			{ x: centerX - diagOffset, y: centerY + diagOffset, name: 'bl' },
			// sides (cardinal points on circle)
			{ x: centerX, y: centerY - r, name: 't' },
			{ x: centerX + r, y: centerY, name: 'r' },
			{ x: centerX, y: centerY + r, name: 'b' },
			{ x: centerX - r, y: centerY, name: 'l' }
		];
	}

	// Default rectangle handles (unchanged)
	return [
		// corners
		{ x: x, y: y, name: 'tl' }, // top-left
		{ x: x + width, y: y, name: 'tr' }, // top-right
		{ x: x + width, y: y + height, name: 'br' }, // bottom-right
		{ x: x, y: y + height, name: 'bl' }, // bottom-left
		// sides
		{ x: x + width / 2, y: y, name: 't' }, // top
		{ x: x + width, y: y + height / 2, name: 'r' }, // right
		{ x: x + width / 2, y: y + height, name: 'b' }, // bottom
		{ x: x, y: y + height / 2, name: 'l' } // left
	];
}

function drawHandles(
	context: CanvasRenderingContext2D,
	cropAreaState: ReturnType<typeof generateCropAreaState>
) {
	context.fillStyle = 'white';
	const handles = getHandles(cropAreaState);

	for (const handle of handles) {
		context.fillRect(
			handle.x - HANDLE_SIZE / 2,
			handle.y - HANDLE_SIZE / 2,
			HANDLE_SIZE,
			HANDLE_SIZE
		);
	}
}

/**
 * Map a PointerEvent/MouseEvent to canvas coordinate space (accounts for CSS scaling).
 */
function getCanvasCoords(event: PointerEvent | MouseEvent, canvas: HTMLCanvasElement) {
	// Use client coordinates and canvas bounding box to map to drawing buffer pixels
	const rect = canvas.getBoundingClientRect();
	const clientX = (event as PointerEvent).clientX ?? (event as any).clientX;
	const clientY = (event as PointerEvent).clientY ?? (event as any).clientY;
	const scaleX = canvas.width / rect.width;
	const scaleY = canvas.height / rect.height;
	return {
		x: (clientX - rect.left) * scaleX,
		y: (clientY - rect.top) * scaleY
	};
}

function clampCropToCanvas(
	cropArea: { x: number; y: number; width: number; height: number },
	canvas: HTMLCanvasElement,
	shape: 'circle' | 'rectangle' = 'rectangle',
	minSize = 20
) {
	// Ensure positive sizes
	cropArea.width = Math.max(minSize, cropArea.width);
	cropArea.height = Math.max(minSize, cropArea.height);

	if (shape === 'circle') {
		// Force a square bounding box that stays centered on the current center.
		const centerX = cropArea.x + cropArea.width / 2;
		const centerY = cropArea.y + cropArea.height / 2;
		const size = Math.max(minSize, Math.min(cropArea.width, cropArea.height));
		cropArea.width = size;
		cropArea.height = size;
		cropArea.x = centerX - size / 2;
		cropArea.y = centerY - size / 2;
	}

	// Keep position inside canvas
	cropArea.x = Math.max(0, Math.min(cropArea.x, canvas.width - cropArea.width));
	cropArea.y = Math.max(0, Math.min(cropArea.y, canvas.height - cropArea.height));
}

export function handleMouseDown(
	event: PointerEvent | MouseEvent,
	cropAreaState: ReturnType<typeof generateCropAreaState>,
	canvasElement?: HTMLCanvasElement
) {
	if (!canvasElement) return;
	const { x: offsetX, y: offsetY } = getCanvasCoords(event, canvasElement);
	const handles = getHandles(cropAreaState);

	// Check if a handle was clicked (handles are in canvas coordinates)
	for (const handle of handles) {
		const handleX = handle.x - HANDLE_SIZE / 2;
		const handleY = handle.y - HANDLE_SIZE / 2;
		if (
			offsetX >= handleX &&
			offsetX <= handleX + HANDLE_SIZE &&
			offsetY >= handleY &&
			offsetY <= handleY + HANDLE_SIZE
		) {
			cropAreaState.activeAction = `resizing-${handle.name}`;
			cropAreaState.lastMousePosition = { x: offsetX, y: offsetY };
			return;
		}
	}

	// If no handle was clicked, check if the main rectangle was clicked
	const { x, y, width, height } = cropAreaState.cropArea;
	if (offsetX >= x && offsetX <= x + width && offsetY >= y && offsetY <= y + height) {
		cropAreaState.activeAction = 'moving';
		cropAreaState.lastMousePosition = { x: offsetX, y: offsetY };
		return;
	}
}

export function handleMouseMove(
	event: PointerEvent | MouseEvent,
	cropAreaState: ReturnType<typeof generateCropAreaState>,
	canvasElement?: HTMLCanvasElement
) {
	if (cropAreaState.activeAction === 'idle') return;
	if (!canvasElement) return;

	const { x: offsetX, y: offsetY } = getCanvasCoords(event, canvasElement);
	const deltaX = offsetX - cropAreaState.lastMousePosition.x;
	const deltaY = offsetY - cropAreaState.lastMousePosition.y;

	const { cropArea } = cropAreaState;

	if (cropAreaState.activeAction === 'moving') {
		cropArea.x += deltaX;
		cropArea.y += deltaY;
	} else if (cropAreaState.activeAction.startsWith('resizing-')) {
		const handleName = cropAreaState.activeAction.split('-')[1];

		if (handleName.includes('r')) cropArea.width += deltaX;
		if (handleName.includes('l')) {
			cropArea.x += deltaX;
			cropArea.width -= deltaX;
		}
		if (handleName.includes('b')) cropArea.height += deltaY;
		if (handleName.includes('t')) {
			cropArea.y += deltaY;
			cropArea.height -= deltaY;
		}
	}

	// Prevent negative/too-small sizes and keep crop within canvas
	// pass the current shape so a circle forces a square bounding box
	clampCropToCanvas(cropArea, canvasElement, cropAreaState.shape, 20);

	cropAreaState.lastMousePosition = { x: offsetX, y: offsetY };
}

export function handleMouseUp(cropAreaState: ReturnType<typeof generateCropAreaState>) {
	cropAreaState.activeAction = 'idle';
}

/**
 * Export the currently selected crop as a PNG Blob.
 * - If shape === 'rectangle' exports the rectangular region.
 * - If shape === 'circle' exports a square canvas with a circular alpha mask (transparent outside circle).
 *
 * Returns Promise<Blob | null>.
 */
export async function exportSelectionAsPNG(
	canvasElement: HTMLCanvasElement,
	image: HTMLImageElement,
	cropAreaState: ReturnType<typeof generateCropAreaState>
): Promise<Blob | null> {
	if (!canvasElement || !image) return null;
	const { x, y, width, height } = cropAreaState.cropArea;
	if (width <= 0 || height <= 0) return null;

	// Create an offscreen canvas sized to the crop bounding box (square for circle)
	const outCanvas = document.createElement('canvas');
	outCanvas.width = Math.round(width);
	outCanvas.height = Math.round(height);
	const ctx = outCanvas.getContext('2d');
	if (!ctx) return null;

	// Draw the corresponding portion of the source image
	// coords are in canvas/image pixel space because the component sets canvas size to image.naturalWidth/Height
	ctx.drawImage(image, x, y, width, height, 0, 0, outCanvas.width, outCanvas.height);

	if (cropAreaState.shape === 'circle') {
		// Mask to a circle (destination-in keeps the circular area)
		ctx.globalCompositeOperation = 'destination-in';
		ctx.beginPath();
		const r = Math.min(outCanvas.width, outCanvas.height) / 2;
		ctx.arc(outCanvas.width / 2, outCanvas.height / 2, r, 0, Math.PI * 2);
		ctx.fill();
	}

	// Return a PNG Blob
	return await new Promise((resolve) => outCanvas.toBlob((b) => resolve(b), 'image/png'));
}
