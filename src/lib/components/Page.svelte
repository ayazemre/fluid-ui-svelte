<script lang="ts">
	import { Container } from '$lib/base/index.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

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

<Container class="fluid-page" type="main" {...rest}>
	{@render children?.()}
</Container>
