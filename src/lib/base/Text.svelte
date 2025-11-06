<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { createDefaultStyling } from '../utilities/createDefaultStyling.js';

	const {
		type = 'p',
		value = '',
		class: className = '',
		overrideDefaultStyling = false,
		...rest
	}: {
		type?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		value?: string;
		class?: string;
		overrideDefaultStyling?: boolean;
	} & HTMLAttributes<HTMLParagraphElement & HTMLHeadingElement> = $props();
</script>

<svelte:element
	this={type}
	{...rest}
	class={createDefaultStyling(className, 'fluid-text', overrideDefaultStyling)}
	>{value}
</svelte:element>
