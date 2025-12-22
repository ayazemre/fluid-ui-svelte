<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { mergeClasses } from '../utilities/mergeClasses.js';
	import type { Snippet } from 'svelte';

	let {
		class: className = '',
		overrideDefaultStyling = false,
		children,
		...rest
	}: {
		class?: string;
		overrideDefaultStyling?: boolean;
		children: Snippet;
	} & HTMLAnchorAttributes = $props();
</script>

<a
	{...rest}
	class={mergeClasses(className, overrideDefaultStyling ? '' : 'fluid-link')}
>
	{@render children()}</a
>