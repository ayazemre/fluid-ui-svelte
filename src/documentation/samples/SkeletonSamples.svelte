<script lang="ts">
	import { Skeleton, CodeBlock } from '$lib/components';
	import { Container, Text, Button, Image } from '$lib/base';
	import { codeBlockContents } from './codeBlockContents';

	let isLoading = $state(true);
	let shapesLoading = $state(true);
	let cardLoading = $state(true);
</script>

<Container class="flex flex-col gap-12">
	<!-- Example 1: Suspense-like Usage -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-lg font-semibold">Suspense-like Usage</Text>
		<Text class="text-sm text-neutral-500">
			Use the loading prop to toggle between skeleton and content. Click the button to simulate data
			loading.
		</Text>

		<Container class="flex flex-col gap-4 rounded-lg border p-6 dark:border-neutral-700">
			<Button
				class="fluid-button-primary w-fit"
				onclick={async () => {
					isLoading = true;
					await new Promise((r) => setTimeout(r, 2000));
					isLoading = false;
				}}
			>
				Reload Data
			</Button>

			<Skeleton loading={isLoading} shape="text" lines={3} height="16px">
				<Text>
					This is the actual content that appears after loading is complete. The skeleton
					placeholder is shown while waiting for data.
				</Text>
			</Skeleton>
		</Container>

		<CodeBlock code={codeBlockContents.skeletonSuspense} language="svelte" />
	</Container>

	<!-- Example 2: Basic Shapes -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-lg font-semibold">Basic Shapes</Text>
		<Text class="text-sm text-neutral-500">
			Skeleton supports rectangle, circle, and text shapes for different loading scenarios.
		</Text>

		<Container class="flex flex-col gap-4 rounded-lg border p-6 dark:border-neutral-700">
			<Button
				class="fluid-button-primary w-fit"
				onclick={async () => {
					shapesLoading = true;
					await new Promise((r) => setTimeout(r, 2000));
					shapesLoading = false;
				}}
			>
				Reload Profile
			</Button>

			<Skeleton loading={shapesLoading}>
				{#snippet placeholder()}
					<Container class="flex items-center gap-4">
						<Skeleton shape="circle" height="48px" />
						<Container class="flex flex-1 flex-col gap-2">
							<Skeleton shape="rectangle" width="60%" height="16px" />
							<Skeleton shape="rectangle" width="40%" height="12px" />
						</Container>
					</Container>
				{/snippet}

				<Container class="flex items-center gap-4">
					<Image src="https://i.pravatar.cc/48" alt="User avatar" class="h-12 w-12 rounded-full" />
					<Container class="flex flex-col">
						<Text class="font-semibold">John Doe</Text>
						<Text class="text-sm text-neutral-500">Software Engineer</Text>
					</Container>
				</Container>
			</Skeleton>
		</Container>

		<CodeBlock code={codeBlockContents.skeletonBasic} language="svelte" />
	</Container>

	<!-- Example 3: Custom Placeholder -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-lg font-semibold">Custom Placeholder</Text>
		<Text class="text-sm text-neutral-500">
			Use the placeholder snippet for complex custom skeleton layouts.
		</Text>

		<Container class="flex flex-col gap-4 rounded-lg border p-6 dark:border-neutral-700">
			<Button
				class="fluid-button-primary w-fit"
				onclick={async () => {
					cardLoading = true;
					await new Promise((r) => setTimeout(r, 2000));
					cardLoading = false;
				}}
			>
				Reload Card
			</Button>

			<Skeleton loading={cardLoading}>
				{#snippet placeholder()}
					<Container class="flex flex-col gap-4">
						<Skeleton shape="rectangle" width="100%" height="200px" />
						<Skeleton shape="rectangle" width="70%" height="24px" />
						<Skeleton shape="text" lines={3} height="14px" />
					</Container>
				{/snippet}

				<Container class="flex flex-col gap-4">
					<Container
						class="flex h-[200px] items-center justify-center rounded-md bg-primary-500 text-white"
					>
						Card Image
					</Container>
					<Text type="h4" class="text-xl font-bold">Card Title</Text>
					<Text>
						This is the card content that appears after loading. Using custom placeholder allows
						full control over the skeleton layout.
					</Text>
				</Container>
			</Skeleton>
		</Container>

		<CodeBlock code={codeBlockContents.skeletonPlaceholder} language="svelte" />
	</Container>
</Container>
