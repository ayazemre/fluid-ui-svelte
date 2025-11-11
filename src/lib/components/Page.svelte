<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { mergeClasses } from '../utilities/mergeClasses.js';
	import type { Snippet } from 'svelte';
	import type { TransitionConfig } from 'svelte/transition';
	import Container from '../base/Container.svelte';

	const {
		class: className = '',
		title = '',
		description = '',
		children,
		...rest
	}: {
		class?: string;
		title: string;
		description: string;
		children?: Snippet;
	} & HTMLAttributes<HTMLElement> = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<Container class="fluid-page">
	{@render children?.()}
</Container>
