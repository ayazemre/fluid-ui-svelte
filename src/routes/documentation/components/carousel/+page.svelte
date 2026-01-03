<script lang="ts">
	import { Carousel, Page, CodeBlock } from '$lib/components/index.js';
	import { Container, Text, Table, Button } from '$lib/base/index.js';
	import { codeBlockContents } from '$lib/utilities/codeBlockContents.js';

	const headers = ['Prop', 'Type', 'Default', 'Description'];
	const propsData = [
		{
			prop: 'items',
			type: 'T[]',
			default: 'required',
			description: 'Array of data items to render.'
		},
		{
			prop: 'itemTemplate',
			type: 'Snippet<[{ item: T; index: number; internalState: CarouselInternalState }]>',
			default: 'required',
			description: 'Snippet to render each item. Provides access to data and touch state.'
		},
		{
			prop: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: 'The scroll direction of the carousel.'
		},
		{
			prop: 'snapItems',
			type: 'boolean',
			default: 'true',
			description: 'Whether to automatically snap to the nearest item after a swipe.'
		},
		{
			prop: 'swipeable',
			type: 'boolean',
			default: 'true',
			description: 'Enable or disable touch-based swiping interaction.'
		},
		{
			prop: 'activeIndex',
			type: 'number',
			default: '0',
			description: 'The currently active slide index. Supports $bindable.'
		},
		{
			prop: 'autoplay',
			type: 'boolean',
			default: 'false',
			description: 'Whether to automatically cycle through items.'
		},
		{
			prop: 'autoplayDuration',
			type: 'number',
			default: '1000',
			description: 'Interval in milliseconds for autoplay.'
		},
		{
			prop: 'componentId',
			type: 'string',
			default: 'crypto.randomUUID()',
			description: 'The unique identifier for the component wrapper.'
		},
		{
			prop: 'variant',
			type: 'string',
			default: "''",
			description: 'Custom variant class for theming.'
		}
	];

	const tableRows = propsData.map((p) => [
		{ value: p.prop, col: 'prop' },
		{ value: p.type, col: 'type' },
		{ value: p.default, col: 'default' },
		{ value: p.description, col: 'desc' }
	]);

	const items = [
		{ color: 'bg-primary-500', text: 'Slide 1' },
		{ color: 'bg-secondary-500', text: 'Slide 2' },
		{ color: 'bg-success-500', text: 'Slide 3' },
		{ color: 'bg-warning-500', text: 'Slide 4' }
	];

	let activeIndex = $state(0);
	let verticalIndex = $state(0);

	const next = () => (activeIndex = (activeIndex + 1) % items.length);
	const prev = () => (activeIndex = (activeIndex - 1 + items.length) % items.length);
</script>

<Page
	title="Fluid UI - Carousel"
	description="A high-performance carousel with custom JS-based snapping and smooth touch interactions."
>
	<Container class="flex flex-col gap-12">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Carousel</Text>
			<Text>
				The Carousel is a flexible container that manages index-based scrolling. It features
				advanced touch tracking and JS-based snapping for a consistent experience across devices.
			</Text>
		</Container>

		<!-- Props -->
		<Container class="hidden flex-col gap-4 overflow-x-auto md:flex">
			<Text type="h2" class="text-2xl font-semibold">Props</Text>
			<Table
				tableHeadItems={headers}
				tableRowItems={tableRows}
				tableFooterItems={[]}
				class="w-full text-left"
			>
				{#snippet headTemplate(item)}
					<Text class="p-2 font-bold">{item}</Text>
				{/snippet}

				{#snippet bodyTemplate(item)}
					<Container overrideDefaultStyling={true} class="p-2">
						{#if item.col === 'prop'}
							<Text type="code" class="font-bold text-primary-600">{item.value}</Text>
						{:else if item.col === 'type'}
							<Text type="code" class="text-sm text-neutral-600 dark:text-neutral-400"
								>{item.value}</Text
							>
						{:else if item.col === 'default'}
							<Text type="code" class="text-sm text-neutral-500">{item.value}</Text>
						{:else}
							<Text class="text-sm">{item.value}</Text>
						{/if}
					</Container>
				{/snippet}

				{#snippet footerTemplate()}
					<Container overrideDefaultStyling={true} />
				{/snippet}
			</Table>
		</Container>

		<Container class="flex flex-col gap-10">
			<Text type="h2" class="text-2xl font-semibold">Samples and variants</Text>

			<!-- 1. Interactive Swiping -->
			<Container class="flex flex-col gap-4">
				<Text type="h3" class="text-xl font-bold">Interactive Swiping</Text>
				<Text class="text-neutral-500">
					The carousel follows your finger exactly during touch moves and snaps to the nearest item
					on release.
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
								<Container
									class="flex h-64 w-full items-center justify-center {item.color} text-white"
								>
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
								<Container
									class="flex h-64 w-full items-center justify-center {item.color} text-white"
								>
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
						<Carousel
							{items}
							orientation="vertical"
							snapItems={false}
							componentId="carousel-free-demo"
						>
							{#snippet itemTemplate({ item, index })}
								<Container
									class="flex h-64 w-full items-center justify-center {item.color} text-white"
								>
									<Text type="h2" class="text-4xl font-bold">Slide {index + 1}</Text>
								</Container>
							{/snippet}
						</Carousel>
					</Container>
				</Container>
			</Container>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Usage</Text>
			<CodeBlock language="svelte" code={codeBlockContents.carouselUsage} />
		</Container>
	</Container>
</Page>
