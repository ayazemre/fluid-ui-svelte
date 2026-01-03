<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import { mergeClasses } from '../utilities/common.js';

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
	class={mergeClasses(className, overrideDefaultStyling ? '' : 'fluid-image') +
		(isLoaded ? '' : ' fluid-image-loading')}
/>
