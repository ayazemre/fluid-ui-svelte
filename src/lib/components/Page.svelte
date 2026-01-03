<script lang="ts">
	import { Container } from '$lib/base/index.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { mergeClasses } from '$lib/utilities/common.js';

	const {
		title = '',
		description = '',
		class: className = '',
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

<Container class={mergeClasses(className, 'fluid-page')} type="main" {...rest}>
	{@render children?.()}
</Container>
