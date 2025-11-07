<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { createDefaultStyling } from '../utilities/createDefaultStyling.js';
	import type { Snippet } from 'svelte';

	const {
		class: className = '',
		overrideDefaultStyling = false,
		children,
		...rest
	}: {
		class?: string;
		overrideDefaultStyling?: boolean;
		children: Snippet;
	} & HTMLAnchorAttributes = $props();
	let isLoaded = $state(false);
</script>

<a {...rest} class={createDefaultStyling(className, 'fluid-link', overrideDefaultStyling)}>
	{@render children()}</a
>
