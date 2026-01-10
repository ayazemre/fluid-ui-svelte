<script lang="ts" generics="T">
	import { Container } from '$lib/base/index.js';
	import { mergeClasses } from '$lib/utilities/common.js';
	import {
		scrollToIndex,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		type CarouselInternalState
	} from '$lib/utilities/carousel.js';
	import type { Snippet } from 'svelte';

	let {
		componentId = crypto.randomUUID(),
		variant = '',
		orientation = 'horizontal',
		snapItems = true,
		swipeable = true,
		activeIndex = $bindable(0),
		autoplay = false,
		autoplayDuration = 1000,
		items,
		itemTemplate
	}: {
		componentId?: string;
		variant?: string;
		orientation?: 'horizontal' | 'vertical';
		snapItems?: boolean;
		swipeable?: boolean;
		activeIndex?: number;
		autoplay?: boolean;
		autoplayDuration?: number;
		items: Array<T>;
		itemTemplate: Snippet<[{ item: T; index: number; internalState: CarouselInternalState }]>;
	} = $props();

	const internalState = $state({
		touchStart: 0,
		initialScroll: 0,
		movementDelta: 0
	});

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
			scrollToIndex(componentId, activeIndex, items.length, orientation);
		}
	});
</script>

<Container
	id={componentId}
	ontouchstart={swipeable ? (e) => handleTouchStart(e, orientation, internalState) : undefined}
	ontouchmove={swipeable ? (e) => handleTouchMove(e, orientation, internalState) : undefined}
	ontouchend={swipeable
		? () => {
				activeIndex = handleTouchEnd(snapItems, activeIndex, items.length, internalState);
			}
		: undefined}
	class={mergeClasses(
		`fluid-carousel-container ${swipeable ? 'touch-none' : ''} ${orientation === 'vertical' ? 'h-full flex-col overflow-y-auto' : 'overflow-x-auto'}`,
		variant
	)}
>
	{#each items as item, index}
		<Container class={mergeClasses('fluid-carousel-item', variant)} overrideDefaultStyling>
			{@render itemTemplate({ item, index, internalState })}
		</Container>
	{/each}
</Container>
