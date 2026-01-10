<script lang="ts">
	import { Drawer, CodeBlock } from '$lib/components/index.js';
	import { Container, Text, Button } from '$lib/base/index.js';
	import { codeBlockContents } from './codeBlockContents.js';
	import { fade, fly } from 'svelte/transition';

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

<Container class="flex flex-col gap-10">
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
