<script lang="ts" generics="T">
	import { Container } from '$lib/base/index.js';
	import { mergeClasses } from '$lib/utilities/mergeClasses.js';
	import { scrollToIndex, getSwipeDirection } from '$lib/utilities/carousel.js';
	import type { Snippet } from 'svelte';

	let {
		componentId = crypto.randomUUID(),
		variant = '',
		orientation = 'horizontal',
		activeIndex = $bindable(0),
		autoplay = false,
		autoplayDuration = 1000,
		items,
		itemTemplate
	}: {
		componentId?: string;
		variant?: string;
		orientation?: 'horizontal' | 'vertical';
		activeIndex?: number;
		autoplay?: boolean;
		autoplayDuration?: number;
		items: Array<T>;
		itemTemplate: Snippet<[{ item: T; index: number }]>;
	} = $props();

	let touchStartX = 0;
	let touchStartY = 0;

	function handleTouchStart(e: TouchEvent) {
		e.stopPropagation();
		e.preventDefault();
		touchStartX = e.changedTouches[0].screenX;
		touchStartY = e.changedTouches[0].screenY;
	}

	function handleTouchMove(e: TouchEvent) {
		if (!touchStartX || !touchStartY) return;

		const touchCurrentX = e.changedTouches[0].screenX;
		const touchCurrentY = e.changedTouches[0].screenY;

		const diffX = Math.abs(touchCurrentX - touchStartX);
		const diffY = Math.abs(touchCurrentY - touchStartY);

		// If horizontal carousel and horizontal swipe is dominant
		if (orientation === 'horizontal') {
			if (diffX > diffY && diffX > 5) {
				e.preventDefault();
				e.stopPropagation();
			}
		} else {
			// Vertical carousel
			if (diffY > diffX && diffY > 5) {
				e.preventDefault();
				e.stopPropagation();
			}
		}
	}

	function handleTouchEnd(e: TouchEvent) {
		e.stopPropagation();
		e.preventDefault();
		const touchEndX = e.changedTouches[0].screenX;
		const touchEndY = e.changedTouches[0].screenY;

		const direction = getSwipeDirection(
			touchStartX,
			touchStartY,
			touchEndX,
			touchEndY,
			50,
			orientation
		);

		if (direction === 'next') {
			activeIndex = Math.min(activeIndex + 1, items.length - 1);
		} else if (direction === 'prev') {
			activeIndex = Math.max(activeIndex - 1, 0);
		}
	}

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
	ontouchstart={handleTouchStart}
	ontouchmove={handleTouchMove}
	ontouchend={handleTouchEnd}
	class={mergeClasses(
		`fluid-carousel-container ${orientation === 'vertical' ? 'h-full snap-y flex-col overflow-y-auto' : 'flex snap-x overflow-x-auto'}`,
		variant
	)}
>
	{#each items as item, index}
		<Container class={mergeClasses('fluid-carousel-item', variant)} overrideDefaultStyling>
			{@render itemTemplate({ item, index })}
		</Container>
	{/each}
</Container>
