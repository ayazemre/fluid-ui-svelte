<script lang="ts">
	import Container from '$lib/base/Container.svelte';
	import { onMount } from 'svelte';
	import { Text } from '../base/index.js';
	import {
		draw,
		generateCropAreaState,
		handleMouseDown,
		handleMouseMove,
		handleMouseUp
	} from '../utilities/imageCrop.js';
	const {
		imageFile,
		cropAreaShape = 'rectangle'
	}: { imageFile: File; cropAreaShape?: 'rectangle' | 'circle' } = $props();

	let canvasElement: HTMLCanvasElement;
	let image: HTMLImageElement | undefined = $state();

	const cropAreaState = $state(generateCropAreaState(cropAreaShape));

	onMount(() => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(imageFile);
		fileReader.onload = () => {
			const loadedImage = new Image();
			loadedImage.src = fileReader.result as string;
			loadedImage.onload = () => {
				// Set the reactive image state once it's fully loaded
				image = loadedImage;
			};
		};
	});

	$effect(() => {
		// Only run if the canvas and image are ready
		if (canvasElement && image) {
			// This block performs the ONE-TIME setup when the image first loads.
			if (canvasElement.width !== image.naturalWidth) {
				canvasElement.width = image.naturalWidth;
				canvasElement.height = image.naturalHeight;
				cropAreaState.cropArea.width = canvasElement.width / 2;
				cropAreaState.cropArea.height = canvasElement.height / 2;
				cropAreaState.cropArea.x = (canvasElement.width - cropAreaState.cropArea.width) / 2;
				cropAreaState.cropArea.y = (canvasElement.height - cropAreaState.cropArea.height) / 2;
			}

			// This will now run on the initial setup AND any time cropAreaState changes.
			draw(canvasElement, image, cropAreaState);
		}
	});
</script>

<Container>
	<Text>Canvas to Draw On</Text>
	<canvas
		class="size-full"
		bind:this={canvasElement}
		onpointerdown={(event) => handleMouseDown(event, cropAreaState, canvasElement)}
		onpointermove={(event) => handleMouseMove(event, cropAreaState, canvasElement)}
		onpointerup={() => handleMouseUp(cropAreaState)}
		onpointercancel={() => handleMouseUp(cropAreaState)}
		onpointerleave={() => handleMouseUp(cropAreaState)}
	></canvas>
</Container>
