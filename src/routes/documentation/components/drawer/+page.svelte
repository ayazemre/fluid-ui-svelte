<script lang="ts">
	import { Drawer, Page, CodeBlock } from '$lib/components/index.js';
	import { Container, Text, Table, Button } from '$lib/base/index.js';
	import { codeBlockContents } from '$lib/utilities/codeBlockContents.js';
	import { fade, fly } from 'svelte/transition';

	const headers = ['Prop', 'Type', 'Default', 'Description'];
	const propsData = [
		{
			prop: 'isOpen',
			type: 'boolean',
			default: 'false',
			description: 'Controls the visibility of the drawer. Supports $bindable.'
		},
		{
			prop: 'componentId',
			type: 'string',
			default: 'undefined',
			description: 'The unique identifier for the component wrapper.'
		},
		{
			prop: 'position',
			type: "'left' | 'right' | 'top' | 'bottom'",
			default: "'left'",
			description: 'The side of the screen from which the drawer appears.'
		},
		{
			prop: 'backdrop',
			type: 'boolean',
			default: 'true',
			description: 'Whether to show a semi-transparent overlay behind the drawer.'
		},
		{
			prop: 'closeOnBackdropClick',
			type: 'boolean',
			default: 'true',
			description: 'Whether clicking the backdrop should close the drawer.'
		},
		{
			prop: 'scrollLock',
			type: 'boolean',
			default: 'true',
			description: 'Whether to prevent body scrolling when the drawer is open.'
		},
		{
			prop: 'variation',
			type: 'string',
			default: "''",
			description: 'Custom variation class for theming.'
		},
		{
			prop: 'transitionFn',
			type: '(node: Element, params?: any) => TransitionConfig',
			default: '() => {}',
			description: 'The transition function for the drawer panel.'
		},
		{
			prop: 'backdropTransitionFn',
			type: '(node: Element, params?: any) => TransitionConfig',
			default: '() => {}',
			description: 'The transition function for the backdrop.'
		}
	];

	const tableRows = propsData.map((p) => [
		{ value: p.prop, col: 'prop' },
		{ value: p.type, col: 'type' },
		{ value: p.default, col: 'default' },
		{ value: p.description, col: 'desc' }
	]);

	let isBasicDrawerOpen = $state(false);
	let isPositionedDrawerOpen = $state(false);
	let isAnimatedDrawerOpen = $state(false);
	let isFlyDrawerOpen = $state(false);
	let currentPosition = $state<'left' | 'right' | 'top' | 'bottom'>('left');

	const openAtPosition = (pos: 'left' | 'right' | 'top' | 'bottom') => {
		currentPosition = pos;
		isPositionedDrawerOpen = true;
	};
</script>

<Page
	title="Fluid UI - Drawer"
	description="A programmatic sliding panel component that appears from the edge of the screen."
>
	<Container class="flex flex-col gap-12">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Drawer</Text>
			<Text>
				The Drawer is a programmatic container that slides in from any edge of the screen. It
				handles scroll locking, Escape key closing, and accessibility out of the box.
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

		<!-- Samples Section -->
		<Container class="flex flex-col gap-10">
			<Text type="h2" class="text-2xl font-semibold">Samples</Text>

			<!-- 1. Basic -->
			<Container class="flex flex-col gap-4">
				<Text type="h3" class="text-xl font-bold">Basic Usage</Text>
				<Text class="text-neutral-500">A standard drawer anchored to the left.</Text>
				<Container class="rounded-xl border p-6 dark:border-neutral-800">
					<Button
						class="fluid-button-primary"
						onclick={async () => {
							isBasicDrawerOpen = true;
						}}
					>
						Open Drawer
					</Button>
					<Drawer bind:isOpen={isBasicDrawerOpen} position="left">
						<Container class="flex min-w-64 flex-col gap-6 p-6">
							<Text type="h2" class="text-2xl font-bold">Navigation</Text>
							<Container class="flex flex-col gap-2">
								<Text class="cursor-pointer hover:text-primary-500">Dashboard</Text>
								<Text class="cursor-pointer hover:text-primary-500">Settings</Text>
								<Text class="cursor-pointer hover:text-primary-500">Profile</Text>
							</Container>
							<Button
								class="fluid-button-outline"
								onclick={async () => {
									isBasicDrawerOpen = false;
								}}
							>
								Close
							</Button>
						</Container>
					</Drawer>
				</Container>
				<CodeBlock code={codeBlockContents.drawerBasicUsage} language="svelte" />
			</Container>

			<!-- 2. Positions -->
			<Container class="flex flex-col gap-4">
				<Text type="h3" class="text-xl font-bold">Anchoring Positions</Text>
				<Text class="text-neutral-500">Toggle drawers from all four directions.</Text>
				<Container class="rounded-xl border p-6 dark:border-neutral-800">
					<Container class="flex flex-wrap gap-4">
						<Button
							class="fluid-button-secondary"
							onclick={async () => {
								openAtPosition('left');
							}}>Left</Button
						>
						<Button
							class="fluid-button-secondary"
							onclick={async () => {
								openAtPosition('right');
							}}>Right</Button
						>
						<Button
							class="fluid-button-secondary"
							onclick={async () => {
								openAtPosition('top');
							}}>Top</Button
						>
						<Button
							class="fluid-button-secondary"
							onclick={async () => {
								openAtPosition('bottom');
							}}>Bottom</Button
						>
					</Container>
					<Drawer bind:isOpen={isPositionedDrawerOpen} position={currentPosition}>
						<Container class="flex min-w-64 flex-col gap-4 p-8">
							<Text type="h2" class="text-xl font-bold">Position: {currentPosition}</Text>
							<Text>The drawer adapts its anchoring based on the prop.</Text>
							<Button
								class="fluid-button-outline"
								onclick={async () => {
									isPositionedDrawerOpen = false;
								}}
							>
								Close
							</Button>
						</Container>
					</Drawer>
				</Container>
				<CodeBlock code={codeBlockContents.drawerPositions} language="svelte" />
			</Container>

			<!-- 3. Animated -->
			<Container class="flex flex-col gap-4">
				<Text type="h3" class="text-xl font-bold">Custom Animations</Text>
				<Text class="text-neutral-500">Pass standard Svelte transitions or custom ones.</Text>
				<Container class="rounded-xl border p-6 dark:border-neutral-800">
					<Button
						class="fluid-button-primary"
						onclick={async () => {
							isAnimatedDrawerOpen = true;
						}}
					>
						Open Animated
					</Button>
					<Drawer
						bind:isOpen={isAnimatedDrawerOpen}
						position="right"
						transitionFn={fade}
						transitionParams={{ duration: 600 }}
						backdropTransitionFn={fade}
						backdropTransitionParams={{ duration: 600 }}
					>
						<Container class="flex min-w-80 flex-col gap-4 p-8">
							<Text type="h2" class="text-xl font-bold">Smooth Transitions</Text>
							<Text>You have full control over the entrance and exit animations.</Text>
							<Button
								class="fluid-button-outline"
								onclick={async () => {
									isAnimatedDrawerOpen = false;
								}}
							>
								Close
							</Button>
						</Container>
					</Drawer>
				</Container>
				<CodeBlock code={codeBlockContents.drawerAnimated} language="svelte" />
			</Container>

			<!-- 4. Fly Animation -->
			<Container class="flex flex-col gap-4">
				<Text type="h3" class="text-xl font-bold">Fly Transition</Text>
				<Text class="text-neutral-500">Using the fly transition for a sliding effect.</Text>
				<Container class="rounded-xl border p-6 dark:border-neutral-800">
					<Button
						class="fluid-button-primary"
						onclick={async () => {
							isFlyDrawerOpen = true;
						}}
					>
						Open Fly Drawer
					</Button>
					<Drawer
						bind:isOpen={isFlyDrawerOpen}
						position="bottom"
						transitionFn={fly}
						transitionParams={{ y: 200, duration: 800 }}
						backdropTransitionFn={fade}
						backdropTransitionParams={{ duration: 600 }}
					>
						<Container class="flex min-w-80 flex-col gap-4 p-8">
							<Text type="h2" class="text-xl font-bold">Fly In</Text>
							<Text>This drawer flies in from the bottom.</Text>
							<Button
								class="fluid-button-outline"
								onclick={async () => {
									isFlyDrawerOpen = false;
								}}
							>
								Close
							</Button>
						</Container>
					</Drawer>
				</Container>
				<CodeBlock code={codeBlockContents.drawerFlyAnimation} language="svelte" />
			</Container>
		</Container>

		<!-- Usage -->
		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Usage</Text>
			<CodeBlock language="svelte" code={codeBlockContents.drawerBasicUsage} />
		</Container>
	</Container>
</Page>
