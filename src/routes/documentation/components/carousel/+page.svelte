<script lang="ts">
	import { Carousel, Page, CodeBlock } from '$lib/components/index.js';
	import { Container, Text, Table, Button } from '$lib/base/index.js';
	import { codeBlockContents } from '$lib/utilities/codeBlockContents.js';

	const headers = ['Prop', 'Type', 'Default', 'Description'];
	const propsData = [
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
			description: 'Custom variation class for theming.'
		},
		{
			prop: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: 'The scroll direction of the carousel.'
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
			prop: 'items',
			type: 'T[]',
			default: 'required',
			description: 'Array of data items to render.'
		},
		{
			prop: 'itemTemplate',
			type: 'Snippet<[{ item: T; index: number }]>',
			default: 'required',
			description: 'Snippet to render each item.'
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

	const nextVertical = () => (verticalIndex = (verticalIndex + 1) % items.length);
	const prevVertical = () => (verticalIndex = (verticalIndex - 1 + items.length) % items.length);
</script>

<Page
	title="Fluid UI - Carousel"
	description="A building-block carousel component using CSS Scroll Snapping for high-performance sliding."
>
	<Container class="flex flex-col gap-12">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Carousel</Text>
			<Text>
				The Carousel is a headless-inspired container that manages index-based scrolling. It
				utilizes native CSS Scroll Snapping for GPU-accelerated movement and exposes an <Text
					type="code">activeIndex</Text
				>
				that you can bind to for creating your own navigation UI.
			</Text>
		</Container>

		<!-- Props -->
		<Container class="flex flex-col gap-4 overflow-x-auto">
			<Text type="h2" class="text-2xl font-semibold">Props</Text>
			<Table
				tableHeadItems={headers}
				tableRowItems={tableRows}
				tableFooterItems={[]}
				class="w-full text-left"
			>
				{#snippet headTemplate(item: string)}
					<Text class="p-2 font-bold">{item}</Text>
				{/snippet}

				{#snippet bodyTemplate(item: any)}
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
			<Text type="h2" class="text-2xl font-semibold">Samples</Text>

			<!-- 1. Manual Control -->
			<Container class="flex flex-col gap-4">
				<Text type="h3" class="text-xl font-bold">Manual Control</Text>
				<Text class="text-neutral-500">
					Bind to <Text type="code">activeIndex</Text> to create external navigation buttons.
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
				<CodeBlock code={codeBlockContents.carouselSlide} language="svelte" />
			</Container>

			<!-- 2. Autoplay -->
			<Container class="flex flex-col gap-4">
				<Text type="h3" class="text-xl font-bold">Autoplay</Text>
				<Text class="text-neutral-500">
					Enable the <Text type="code">autoplay</Text> prop to cycle slides automatically.
				</Text>
				<Container class="rounded-xl border p-6 dark:border-neutral-800">
					<Container class="max-w-md overflow-hidden rounded-lg">
						<Carousel
							{items}
							autoplay={true}
							autoplayDuration={2000}
							componentId="carousel-autoplay-demo"
						>
							{#snippet itemTemplate({ item })}
								<Container
									class="flex h-64 w-full items-center justify-center {item.color} text-white"
								>
									<Text type="h2" class="text-4xl font-bold">Autoplay</Text>
								</Container>
							{/snippet}
						</Carousel>
					</Container>
				</Container>
				<CodeBlock code={codeBlockContents.carouselFade} language="svelte" />
			</Container>

			<!-- 3. Swipe Interaction -->
			<Container class="flex flex-col gap-4">
				<Text type="h3" class="text-xl font-bold">Swipe Interaction</Text>
				<Text class="text-neutral-500">
					The carousel supports touch swipe gestures for navigation on mobile devices. Swipe left to
					go to the next slide, and swipe right to go to the previous slide.
				</Text>
				<Container class="rounded-xl border p-6 dark:border-neutral-800">
					<Container class="max-w-md overflow-hidden rounded-lg">
						<Carousel {items} componentId="carousel-swipe-demo">
							{#snippet itemTemplate({ item, index })}
								<Container
									class="flex h-64 w-full items-center justify-center {item.color} text-white"
								>
									<Text type="h2" class="text-4xl font-bold">Swipe Me</Text>
								</Container>
							{/snippet}
						</Carousel>
					</Container>
				</Container>
			</Container>

			<!-- 4. Vertical Orientation -->
			<Container class="flex flex-col gap-4">
				<Text type="h3" class="text-xl font-bold">Vertical Orientation</Text>
				<Text class="text-neutral-500">
					Set the <Text type="code">orientation</Text> prop to <Text type="code">vertical</Text> for vertical
					scrolling.
				</Text>
				<Container class="rounded-xl border p-6 dark:border-neutral-800">
					<Container class="mb-4 flex gap-2">
						<Button class="fluid-button-secondary" onclick={async () => prevVertical()}>Up</Button>
						<Button class="fluid-button-secondary" onclick={async () => nextVertical()}>Down</Button
						>
						<Text class="flex items-center font-mono">Index: {verticalIndex}</Text>
					</Container>
					<Container class="h-64 max-w-md overflow-hidden rounded-lg">
						<Carousel
							{items}
							bind:activeIndex={verticalIndex}
							orientation="vertical"
							componentId="carousel-vertical-demo"
						>
							{#snippet itemTemplate({ item, index })}
								<Container
									class="flex h-64 w-full items-center justify-center {item.color} text-white"
								>
									<Text type="h2" class="text-4xl font-bold">Vertical {index + 1}</Text>
								</Container>
							{/snippet}
						</Carousel>
					</Container>
				</Container>
				<CodeBlock
					code={`<Carousel {items} orientation="vertical" bind:activeIndex>
  ...
</Carousel>`}
					language="svelte"
				/>
			</Container>

			<!-- 4. Vertical Autoplay -->
			<Container class="flex flex-col gap-4">
				<Text type="h3" class="text-xl font-bold">Vertical Autoplay</Text>
				<Text class="text-neutral-500">Vertical scrolling with automatic cycling.</Text>
				<Container class="rounded-xl border p-6 dark:border-neutral-800">
					<Container class="h-64 max-w-md overflow-hidden rounded-lg">
						<Carousel
							{items}
							autoplay={true}
							autoplayDuration={2500}
							orientation="vertical"
							componentId="carousel-vertical-autoplay-demo"
						>
							{#snippet itemTemplate({ item, index })}
								<Container
									class="flex h-64 w-full items-center justify-center {item.color} text-white"
								>
									<Text type="h2" class="text-4xl font-bold">V-Auto {index + 1}</Text>
								</Container>
							{/snippet}
						</Carousel>
					</Container>
				</Container>
			</Container>
		</Container>
	</Container>
</Page>
