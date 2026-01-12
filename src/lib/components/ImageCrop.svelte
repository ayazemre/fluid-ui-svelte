<script lang="ts">
	import { Container } from '$lib/base';
	import { mergeClasses } from '$lib/utilities/common';
	import { drawImage, drawOverlay, generateCroppedImage } from '$lib/utilities/imageCrop';

	let {
		variant = '',
		componentId,
		sourceImage = $bindable(),
		aspectRatio,
		resultImage = $bindable(),
		zoom = 1,
		pan = { x: 0, y: 0 },
		padding = 50,
		shape = 'rectangle',
		overlayColor = 'rgba(0, 0, 0, 0.5)'
	}: {
		sourceImage: ImageBitmap;
		aspectRatio: { x: number; y: number };
		variant?: string;
		componentId?: string;
		resultImage?: string;
		zoom?: number;
		pan?: { x: number; y: number };
		padding?: number;
		shape?: 'rectangle' | 'circle';
		overlayColor?: string;
	} = $props();

	let canvasReference: HTMLCanvasElement | undefined = $state(undefined);

	$effect(() => {
		if (canvasReference && sourceImage && aspectRatio) {
			const context = canvasReference.getContext('2d');
			if (context) {
				canvasReference.width = sourceImage.width;
				canvasReference.height = sourceImage.height;

				// Draw transformed image
				drawImage(context, sourceImage, { zoom, pan });

				// Draw overlay (which calculates the crop box)
				const crop = drawOverlay(context, aspectRatio, padding, shape, overlayColor);

				// Generate final image
				resultImage = generateCroppedImage(
					sourceImage,
					crop,
					{ zoom, pan },
					{ width: sourceImage.width, height: sourceImage.height },
					shape
				);
			}
		}
	});
</script>

<Container id={componentId} class={mergeClasses(variant, 'fluid-image-crop-wrapper')}>
	<canvas bind:this={canvasReference} class={mergeClasses(variant, 'fluid-image-cropper-canvas')}
	></canvas>
</Container>
