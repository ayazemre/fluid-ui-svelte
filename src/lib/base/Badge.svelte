<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { mergeClasses } from '$lib/utilities/common';
	import type { Snippet } from 'svelte';

	const {
		variant = '',
		class: className = '',
		overrideDefaultStyling = false,
		children,
		...rest
	}: {
		variant?: string;
		class?: string;
		overrideDefaultStyling?: boolean;
		children?: Snippet;
	} & HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span
	{...rest}
	class={mergeClasses(
		className,
		overrideDefaultStyling
			? ''
			: mergeClasses('fluid-badge', variant ? `fluid-badge-${variant}` : '')
	)}
>
	{@render children?.()}
</span>
