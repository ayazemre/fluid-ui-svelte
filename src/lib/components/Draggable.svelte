<script lang="ts">
	import { Container } from '$lib/base';
	import { mergeClasses } from '$lib/utilities/common';
	import type { Snippet } from 'svelte';

	let {
		variant = '',
		componentId = '',
		children,
		ondragstart
	}: {
		variant?: string;
		componentId?: string;
		children: Snippet;
		ondragstart?: (event: DragEvent) => void;
	} = $props();
</script>

<Container
	id={componentId}
	draggable="true"
	{ondragstart}
	class={mergeClasses(variant, 'cursor-grab active:cursor-grabbing fluid-draggable')}
>
	{@render children()}
</Container>
