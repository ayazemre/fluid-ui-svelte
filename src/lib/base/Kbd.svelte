<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { mergeClasses } from '$lib/utilities/common';
	import type { Snippet } from 'svelte';

	const {
		class: className = '',
		overrideDefaultStyling = false,
		children,
		...rest
	}: {
		class?: string;
		overrideDefaultStyling?: boolean;
		children?: Snippet;
	} & HTMLAttributes<HTMLElement> = $props();
</script>

<kbd
	{...rest}
	class={mergeClasses(
		className,
		overrideDefaultStyling
			? ''
			: 'fluid-kbd inline-flex items-center justify-center rounded border border-border bg-surface-sunken px-1.5 py-0.5 font-mono text-xs font-semibold text-content shadow-xs'
	)}
>
	{#if children}
		{@render children()}
	{/if}
</kbd>
