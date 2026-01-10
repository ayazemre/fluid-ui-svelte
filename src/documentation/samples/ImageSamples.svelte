<script lang="ts">
	import { Image, Container, Text } from '$lib/base/index.js';
	import { CodeBlock } from '$lib/components/index.js';
	import { codeBlockContents } from './codeBlockContents.js';

	let delayedSrc = $state('');
	$effect(() => {
		const timer = setTimeout(() => {
			delayedSrc = `https://picsum.photos/500/300?random=${Math.random()}`;
		}, 3000);
		return () => clearTimeout(timer);
	});
</script>

<Container class="grid grid-cols-1 gap-8 md:grid-cols-2">
	<!-- Default Image -->
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Standard Image</Text>
		<Text class="text-sm text-neutral-500"
			>Renders a standard image immediately without any artificial delay applied.</Text
		>
		<Container class="rounded-lg border p-6 dark:border-neutral-700">
			<Container class="h-48 w-full overflow-hidden rounded-lg">
				<Image
					src="https://picsum.photos/id/1018/500/300"
					alt="Nature scene"
					class="h-full w-full object-cover!"
				/>
			</Container>
		</Container>
		<CodeBlock
			code={codeBlockContents.imageStandard}
			language="svelte"
		/>
	</Container>

	<!-- Placeholder / Loading Example -->
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Loading State Demo</Text>
		<Text class="text-sm text-neutral-500"
			>This example has a manual 3-second delay to showcase the skeleton effect.</Text
		>
		<Container class="rounded-lg border p-6 dark:border-neutral-700">
			<Container class="h-48 w-full overflow-hidden rounded-lg">
				<Image
					src={delayedSrc}
					alt="Delayed loading example"
					class="h-full w-full object-cover!"
				/>
			</Container>
		</Container>
		<CodeBlock
			code={codeBlockContents.imageLoading}
			language="svelte"
		/>
	</Container>
</Container>