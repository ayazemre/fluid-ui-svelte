<script lang="ts">
	import { ImageCrop, Page } from '$lib/index.js';
	let file: File | null = $state(null);
</script>

<Page title="Image Crop - Fluid UI" description="A component for cropping images.">
	{#if file}
		<ImageCrop cropAreaShape="circle" imageFile={file}></ImageCrop>
		<ImageCrop imageFile={file}></ImageCrop>
	{/if}
	<input
		type="file"
		accept="image/*"
		oninput={(event) => {
			const target = event.target as HTMLInputElement;
			if (target.files && target.files.length > 0) {
				file = target.files[0];
			} else {
				file = null;
			}
		}}
	/>
</Page>