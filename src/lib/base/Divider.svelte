<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { mergeClasses } from '$lib/utilities/common';
	import type { Snippet } from 'svelte';

	const {
		orientation = 'horizontal',
		label,
		class: className = '',
		overrideDefaultStyling = false,
		...rest
	}: {
		orientation?: 'horizontal' | 'vertical';
		label?: string | Snippet;
		class?: string;
		overrideDefaultStyling?: boolean;
	} & HTMLAttributes<HTMLElement> = $props();
</script>

{#if label && orientation === 'horizontal'}
	<div
		role="separator"
		aria-orientation="horizontal"
		{...rest}
		class={mergeClasses(
			className,
			overrideDefaultStyling ? '' : 'fluid-divider-container my-4 flex w-full items-center'
		)}
	>
		<div class={overrideDefaultStyling ? '' : 'fluid-divider flex-1 border-t'}></div>
		<span class={overrideDefaultStyling ? '' : 'fluid-divider-label px-3 text-xs uppercase'}>
			{#if typeof label === 'string'}
				{label}
			{:else}
				{@render label()}
			{/if}
		</span>
		<div class={overrideDefaultStyling ? '' : 'fluid-divider flex-1 border-t'}></div>
	</div>
{:else}
	<hr
		aria-orientation={orientation}
		{...rest}
		class={mergeClasses(
			className,
			overrideDefaultStyling
				? ''
				: orientation === 'vertical'
					? 'fluid-divider-vertical mx-2 inline-block h-full min-h-[1em] self-stretch border-l'
					: 'fluid-divider-horizontal my-4 w-full border-t'
		)}
	/>
{/if}
