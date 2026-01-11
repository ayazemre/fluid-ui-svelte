<script lang="ts" generics="T">
	import { Container } from '$lib/base';
	import { mergeClasses } from '$lib/utilities/common';
	import { handleScrollEnd, scrollToIndex } from '$lib/utilities/carousel';
	import type { Snippet } from 'svelte';

	let {
		componentId = crypto.randomUUID(),
		variant = '',
		orientation = 'horizontal',
		snapItems = true,
		activeIndex = $bindable(0),
		autoplay = false,
		autoplayDuration = 1000,
		visibleItemCount = 1,
		items,
		itemTemplate
	}: {
		componentId?: string;
		variant?: string;
		orientation?: 'horizontal' | 'vertical';
		snapItems?: boolean;
		activeIndex?: number;
		autoplay?: boolean;
		autoplayDuration?: number;
		visibleItemCount?: number;
		items: Array<T>;
		itemTemplate: Snippet<[T, number]>;
	} = $props();

	$effect(() => {
		if (autoplay && items.length > 0) {
			const interval = setInterval(() => {
				activeIndex = (activeIndex + 1) % items.length;
			}, autoplayDuration);
			return () => clearInterval(interval);
		}
	});

	$effect(() => {
		if (componentId && items.length > 1) {
			scrollToIndex(componentId, activeIndex, orientation);
		}
	});
</script>

<Container
	id={componentId}
	onscrollend={(e) => handleScrollEnd(e, orientation, activeIndex)}
	class={mergeClasses(
		variant,
		`fluid-carousel-container relative flex scroll-smooth ${
			orientation === 'vertical'
				? `h-full flex-col overflow-y-auto ${snapItems ? 'snap-y snap-mandatory' : ''}`
				: `overflow-x-auto ${snapItems ? 'snap-x snap-mandatory' : ''}`
		}`
	)}
>
	{#each items as item, index}
		<Container
			class={mergeClasses(variant, `fluid-carousel-item shrink-0 ${snapItems ? 'snap-start' : ''}`)}
			style="flex-basis: calc(100% / {visibleItemCount})"
		>
			{@render itemTemplate(item, index)}
		</Container>
	{/each}
</Container>
