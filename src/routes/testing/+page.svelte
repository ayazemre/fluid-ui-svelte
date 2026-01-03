<script lang="ts">
	let index = $state(0);
	let isVertical = $state(false);
	let snap = $state(true);
	const items = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4'];

	function scroll() {
		const element = document.getElementById('carousel-container');
		if (!element) return;
		const targetChild = element.children[index] as HTMLElement;
		if (!targetChild) return;

		const containerRect = element.getBoundingClientRect();
		const childRect = targetChild.getBoundingClientRect();

		const targetLeft = childRect.left - containerRect.left + element.scrollLeft;
		const targetTop = childRect.top - containerRect.top + element.scrollTop;

		element.scrollTo({
			left: isVertical ? 0 : targetLeft,
			top: isVertical ? targetTop : 0,
			behavior: 'smooth'
		});
	}

	$effect(() => {
		index;
		isVertical;
		scroll();
	});

	function next() {
		if (index < items.length - 1) index++;
	}

	function prev() {
		if (index > 0) index--;
	}

	function toggleOrientation() {
		isVertical = !isVertical;
	}

	function toggleSnap() {
		snap = !snap;
		if (snap) scroll();
	}

	let touchStart = 0;
	let initialScroll = 0;
	let movementDelta = $state(0);

	function handleTouchStart(e: TouchEvent) {
		const element = e.currentTarget as HTMLElement;
		touchStart = isVertical ? e.touches[0].clientY : e.touches[0].clientX;
		initialScroll = isVertical ? element.scrollTop : element.scrollLeft;
		movementDelta = 0;
	}

	function handleTouchMove(e: TouchEvent) {
		const element = e.currentTarget as HTMLElement;
		const currentTouch = isVertical ? e.touches[0].clientY : e.touches[0].clientX;
		movementDelta = touchStart - currentTouch;

		element.scrollTo({
			left: isVertical ? 0 : initialScroll + movementDelta,
			top: isVertical ? initialScroll + movementDelta : 0,
			behavior: 'instant'
		});
	}

	function handleTouchEnd() {
		if (!snap) return;

		const element = document.getElementById('carousel-container');
		if (!element || element.children.length === 0) return;

		const firstChild = element.children[0] as HTMLElement;
		const itemSize = isVertical ? firstChild.offsetHeight : firstChild.offsetWidth;

		const currentScroll = isVertical ? element.scrollTop : element.scrollLeft;
		const newIndex = Math.max(0, Math.min(Math.round(currentScroll / itemSize), items.length - 1));

		if (newIndex === index) {
			scroll();
		} else {
			index = newIndex;
		}

		movementDelta = 0;
	}
</script>

<div class="flex flex-col items-center gap-6 bg-error-100 p-8">
	<div class="flex flex-col items-center gap-2">
		<p class="font-mono text-sm">Delta: {movementDelta.toFixed(2)}</p>
		<div class="flex gap-4">
			<button
				onclick={toggleOrientation}
				class="rounded bg-secondary-700 px-4 py-2 text-white hover:bg-secondary-800"
			>
				Switch to {isVertical ? 'Horizontal' : 'Vertical'}
			</button>
			<button
				onclick={toggleSnap}
				class={`rounded px-4 py-2 text-white transition-colors ${snap ? 'bg-accent-600 hover:bg-accent-700' : 'bg-gray-600 hover:bg-gray-700'}`}
			>
				Snap: {snap ? 'ON' : 'OFF'}
			</button>
		</div>
	</div>

	<div
		id="carousel-container"
		ontouchstart={handleTouchStart}
		ontouchmove={handleTouchMove}
		ontouchend={handleTouchEnd}
		class={`relative flex size-64 touch-none overflow-hidden scroll-smooth ${isVertical ? 'flex-col' : 'flex-row'}`}
	>
		{#each items as item, i}
			<div
				class="flex size-64 shrink-0 items-center justify-center border border-white bg-primary-300 text-xl font-bold"
			>
				{item}
			</div>
		{/each}
	</div>

	<!-- Controls -->
	<div class="flex justify-center gap-4">
		<button
			onclick={prev}
			disabled={index === 0}
			class="rounded bg-primary-800 px-4 py-2 text-white disabled:opacity-50"
		>
			Prev
		</button>
		<button
			onclick={next}
			disabled={index === items.length - 1}
			class="rounded bg-primary-800 px-4 py-2 text-white disabled:opacity-50"
		>
			Next
		</button>
	</div>
</div>