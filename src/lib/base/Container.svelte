<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { createDefaultStyling } from '../utilities/createDefaultStyling.js';
	import type { Snippet } from 'svelte';

	const {
		type = 'div',
		class: className = '',
		overrideDefaultStyling = false,
		children,
		...rest
	}: {
		type?: 'div' | 'nav' | 'section' | 'main' | 'header' | 'footer' | 'aside' | 'article';
		class?: string;
		overrideDefaultStyling?: boolean;
		children: Snippet;
	} & HTMLAttributes<HTMLElement> = $props();
</script>

<svelte:element
	this={type}
	{...rest}
	class={createDefaultStyling(className, 'fluid-container', overrideDefaultStyling)}
>
	{@render children()}
</svelte:element>
