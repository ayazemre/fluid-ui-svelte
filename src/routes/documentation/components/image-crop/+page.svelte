<script lang="ts">
	import ImageCrop from '$lib/components/ImageCrop.svelte';
	import { Page } from '../../../../lib/index.js';
	let file: File;
</script>

<Page title="asdf" description="asdf">
	{#if file}
		<ImageCrop cropAreaShape="circle" imageFile={file}></ImageCrop>
		<ImageCrop imageFile={file}></ImageCrop>
	{/if}
	<input
		type="file"
		accept="image/*"
		oninput={(event) => {
			const target = event.target as HTMLInputElement;
			if (file) {
				file = null;
			}
			file = target.files[0];

			console.log(file);
		}}
	/>
</Page>
