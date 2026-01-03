<script lang="ts">
	import { Page, CodeBlock } from '$lib/components/index.js';
	import { Container, Text } from '$lib/base/index.js';
</script>

<Page
	title="Fluid UI - Image Crop"
	description="A tool for cropping images directly within the browser."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Image Crop</Text>
			<Text>
				The Image Crop component allows users to select a specific area of an image. This is particularly
				useful for profile picture uploads, content management systems, or any application requiring
				user-defined image adjustments.
			</Text>
		</Container>

		<Container class="flex flex-col gap-4 rounded-lg bg-warning-50 p-6 dark:bg-warning-950/20">
			<Container class="flex items-center gap-2">
				<Text type="h3" class="text-lg font-semibold text-warning-800 dark:text-warning-400"
					>Component is being developed</Text
				>
			</Container>
			<Text class="text-sm text-warning-700 dark:text-warning-300">
				The Image Crop component is actively being built. We are refining the drag interactions,
				aspect ratio constraints, and output generation to ensure a seamless experience.
			</Text>
			<Container class="mt-4 flex h-64 flex-col items-center justify-center gap-4">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="64"
					height="64"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="text-warning-300 dark:text-warning-700"
				>
					<path d="M2 12h20" />
					<path d="M7 2v20" />
					<path d="M12 2v20" />
					<path d="M17 2v20" />
					<path d="M2 7h20" />
					<path d="M2 17h20" />
				</svg>
			</Container>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Usage</Text>
			<CodeBlock
				language="svelte"
				code={`<script lang="ts">
  import { ImageCrop } from 'fluid-ui-svelte';
<\/script>

<ImageCrop src={imageUrl} on:crop={handleCrop} />`}
			/>
		</Container>
	</Container>
</Page>