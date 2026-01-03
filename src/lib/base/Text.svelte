<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { mergeClasses } from '../utilities/common.js';
	import type { Snippet } from 'svelte';

	const {
		type = 'p',
		class: className = '',
		overrideDefaultStyling = false,
		children,
		...rest
	}: {
		type?:
			| 'p'
			| 'h1'
			| 'h2'
			| 'h3'
			| 'h4'
			| 'h5'
			| 'h6'
			| 'span'
			| 'pre'
			| 'code'
			| 'b'
			| 'strong'
			| 'i'
			| 'em'
			| 'mark'
			| 'small'
			| 'del'
			| 'ins'
			| 'sub'
			| 'sup';
		children?: Snippet;
		class?: string;
		overrideDefaultStyling?: boolean;
	} & HTMLAttributes<HTMLParagraphElement & HTMLHeadingElement & HTMLSpanElement> = $props();
</script>

<svelte:element
	this={type}
	{...rest}
	class={mergeClasses(className, overrideDefaultStyling ? '' : 'fluid-text')}
	>{@render children?.()}
</svelte:element>
