<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import { createDefaultStyling } from '../utilities/createDefaultStyling.js';
	import type { Snippet } from 'svelte';

	const {
		class: className = '',
		overrideDefaultStyling = false,
		...rest
	}: {
		class?: string;
		overrideDefaultStyling?: boolean;
	} & HTMLImgAttributes = $props();
	let isLoaded = $state(false);
</script>

<img
	onload={() => (isLoaded = true)}
	{...rest}
	class={createDefaultStyling(className, 'fluid-image', overrideDefaultStyling) +
		(isLoaded ? '' : ' fluid-image-loading')}
/>
