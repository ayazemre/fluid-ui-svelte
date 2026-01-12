import { page } from '@vitest/browser/context';
import { describe, expect, test, beforeAll } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { ImageCrop } from '$lib/components';

describe('ImageCrop', () => {
	let mockImageBitmap: ImageBitmap;

	beforeAll(async () => {
		// Create a mock ImageBitmap for testing
		const canvas = document.createElement('canvas');
		canvas.width = 200;
		canvas.height = 200;
		const context = canvas.getContext('2d');
		if (context) {
			context.fillStyle = 'red';
			context.fillRect(0, 0, 200, 200);
		}
		mockImageBitmap = await createImageBitmap(canvas);
	});

	test('Default', async () => {
		render(ImageCrop, {
			componentId: 'crop-default',
			sourceImage: mockImageBitmap,
			aspectRatio: { x: 1, y: 1 }
		});

		const wrapper = page.getByTestId('crop-default');
		await expect.element(wrapper).toBeInTheDocument();
		await expect.element(wrapper).toHaveClass('fluid-image-crop-wrapper');

		// Canvas should be present as a child of the wrapper
		const canvas = wrapper.element().querySelector('canvas');
		expect(canvas).not.toBeNull();
		expect(canvas?.classList.contains('fluid-image-cropper-canvas')).toBe(true);
	});

	test('Variant', async () => {
		render(ImageCrop, {
			componentId: 'crop-variant',
			variant: 'primary',
			sourceImage: mockImageBitmap,
			aspectRatio: { x: 16, y: 9 }
		});

		const wrapper = page.getByTestId('crop-variant');
		await expect.element(wrapper).toHaveClass('primary');
		await expect.element(wrapper).toHaveClass('fluid-image-crop-wrapper');

		const canvas = wrapper.element().querySelector('canvas');
		expect(canvas?.classList.contains('primary')).toBe(true);
		expect(canvas?.classList.contains('fluid-image-cropper-canvas')).toBe(true);
	});

	test('Canvas Dimensions', async () => {
		render(ImageCrop, {
			componentId: 'crop-dimensions',
			sourceImage: mockImageBitmap,
			aspectRatio: { x: 4, y: 3 }
		});

		const wrapper = page.getByTestId('crop-dimensions');
		const canvas = wrapper.element().querySelector('canvas') as HTMLCanvasElement;
		
		// Wait for the effect to run
		await new Promise(resolve => setTimeout(resolve, 50));

		expect(canvas.width).toBe(mockImageBitmap.width);
		expect(canvas.height).toBe(mockImageBitmap.height);
	});

	test('Result Image Binding', async () => {
		let result: string | undefined = undefined;

		render(ImageCrop, {
			componentId: 'crop-result',
			sourceImage: mockImageBitmap,
			aspectRatio: { x: 1, y: 1 },
			padding: 10,
			// Bindable prop test using getter/setter pattern for Svelte 5 props
			get resultImage() { return result; },
			set resultImage(value) { result = value; }
		});

		// Wait for the effect to run and generate the image
		await new Promise(resolve => setTimeout(resolve, 100));

		expect(result).toBeDefined();
		expect(result).toContain('data:image/png;base64');
	});

	test('Reactive Props', async () => {
		const { rerender } = render(ImageCrop, {
			componentId: 'crop-reactive',
			sourceImage: mockImageBitmap,
			aspectRatio: { x: 1, y: 1 },
			zoom: 1,
			pan: { x: 0, y: 0 },
			shape: 'rectangle'
		});

		const wrapper = page.getByTestId('crop-reactive');
		await expect.element(wrapper).toBeInTheDocument();

		// Update props to ensure no crashes and reactive updates
		await rerender({
			zoom: 2,
			pan: { x: 10, y: 10 },
			shape: 'circle'
		});

		const canvas = wrapper.element().querySelector('canvas') as HTMLCanvasElement;
		expect(canvas).toBeInTheDocument();
	});
});