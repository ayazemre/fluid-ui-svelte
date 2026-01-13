<script lang="ts">
	import { Container } from '$lib/base';
	import { mergeClasses } from '$lib/utilities/common';
	import type { Snippet } from 'svelte';

	let {
		variant = '',
		componentId = '',
		loading = true,
		placeholder,
		children,
		shape = 'rectangle',
		width = '100%',
		height = '1rem',
		lines = 1,
		animated = true
	}: {
		variant?: string;
		componentId?: string;
		loading?: boolean;
		placeholder?: Snippet;
		children?: Snippet;
		shape?: 'rectangle' | 'circle' | 'text';
		width?: string;
		height?: string;
		lines?: number;
		animated?: boolean;
	} = $props();
</script>

{#if loading}
	{#if placeholder}
		{@render placeholder()}
	{:else if shape === 'text' && lines > 1}
		<Container id={componentId} class={mergeClasses(variant, 'fluid-skeleton-text-container')}>
			{#each Array(lines) as _, i}
				<Container
					class={mergeClasses(
						variant,
						`fluid-skeleton fluid-skeleton-${shape} ${animated ? 'fluid-skeleton-animated' : ''} ${i === lines - 1 ? 'fluid-skeleton-text-last' : ''}`
					)}
					style="width: {i === lines - 1 ? '70%' : width}; height: {height};"
				/>
			{/each}
		</Container>
	{:else}
		<Container
			id={componentId}
			class={mergeClasses(
				variant,
				`fluid-skeleton fluid-skeleton-${shape} ${animated ? 'fluid-skeleton-animated' : ''}`
			)}
			style="width: {shape === 'circle' ? height : width}; height: {height};"
		/>
	{/if}
{:else if children}
	{@render children()}
{/if}
