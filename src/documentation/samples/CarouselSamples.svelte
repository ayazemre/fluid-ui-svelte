<script lang="ts">
	import { Carousel, CodeBlock } from '$lib/components/index.js';
	import { Container, Text, Button } from '$lib/base/index.js';
	import { codeBlockContents } from './codeBlockContents.js';

	const items = [
		{ color: 'bg-primary-500', text: 'Slide 1' },
		{ color: 'bg-secondary-500', text: 'Slide 2' },
		{ color: 'bg-success-500', text: 'Slide 3' },
		{ color: 'bg-warning-500', text: 'Slide 4' }
	];

	let activeIndex = $state(0);
	const next = () => (activeIndex = (activeIndex + 1) % items.length);
	const prev = () => (activeIndex = (activeIndex - 1 + items.length) % items.length);
</script>

<Container class="flex flex-col gap-10">
	<!-- 1. Interactive Swiping -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">Interactive Swiping</Text>
		<Text class="text-neutral-500">
			The carousel follows your finger exactly during touch moves and snaps to the nearest item on
			release.
		</Text>
		<Container
			class="rounded-md border-l-4 border-primary-500 bg-neutral-100 p-4 dark:bg-neutral-800"
		>
			<Text class="text-sm">
				<Text type="strong" class="text-primary-600 dark:text-primary-400">Note:</Text> To test touch
				interactions on a desktop, please use your browser's responsive design mode or test on a physical
				mobile device.
			</Text>
		</Container>
		<Container class="rounded-xl border p-6 dark:border-neutral-800">
			<Container class="max-w-md overflow-hidden rounded-lg">
				<Carousel {items} componentId="carousel-swipe-demo">
					{#snippet itemTemplate({ item })}
						<Container class="flex h-64 w-full items-center justify-center {item.color} text-white">
							<Text type="h2" class="text-4xl font-bold">Swipe Me</Text>
						</Container>
					{/snippet}
				</Carousel>
			</Container>
		</Container>
		<CodeBlock language="svelte" code={codeBlockContents.carouselInteractive} />
	</Container>

	<!-- 2. Manual Navigation -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">Manual Navigation</Text>
		<Text class="text-neutral-500">
			Bind to <Text type="code">activeIndex</Text> to programmatically control the carousel.
		</Text>
		<Container class="rounded-xl border p-6 dark:border-neutral-800">
			<Container class="mb-4 flex gap-2">
				<Button class="fluid-button-secondary" onclick={async () => prev()}>Prev</Button>
				<Button class="fluid-button-secondary" onclick={async () => next()}>Next</Button>
				<Text class="flex items-center font-mono">Index: {activeIndex}</Text>
			</Container>
			<Container class="max-w-md overflow-hidden rounded-lg">
				<Carousel {items} bind:activeIndex componentId="carousel-manual-demo">
					{#snippet itemTemplate({ item, index })}
						<Container class="flex h-64 w-full items-center justify-center {item.color} text-white">
							<Text type="h2" class="text-4xl font-bold">{item.text}</Text>
						</Container>
					{/snippet}
				</Carousel>
			</Container>
		</Container>
	</Container>

	<!-- 3. Vertical & Free Scroll -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">Vertical & Free Scroll</Text>
		<Text class="text-neutral-500">
			Disable <Text type="code">snapItems</Text> to allow the carousel to stay at any scroll position.
		</Text>
		<Container class="rounded-xl border p-6 dark:border-neutral-800">
			<Container class="h-64 max-w-md overflow-hidden rounded-lg">
				<Carousel {items} orientation="vertical" snapItems={false} componentId="carousel-free-demo">
					{#snippet itemTemplate({ item, index })}
						<Container class="flex h-64 w-full items-center justify-center {item.color} text-white">
							<Text type="h2" class="text-4xl font-bold">Slide {index + 1}</Text>
						</Container>
					{/snippet}
				</Carousel>
			</Container>
		</Container>
	</Container>
</Container>
