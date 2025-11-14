<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import Container from '../base/Container.svelte';

	const {
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

<Container class="fluid-page" type="section">
	{@render children?.()}
</Container>
