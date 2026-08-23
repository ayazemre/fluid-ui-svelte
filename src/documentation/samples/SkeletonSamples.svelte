<script lang="ts">
	import { Container, Text } from '$lib/base';
	import { Skeleton, CodeBlock } from '$lib/components';
	import { codeBlockContents } from './codeBlockContents';
</script>

<Container class="flex flex-col gap-8">
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Skeleton Shapes</Text>
		<Container class="flex max-w-sm flex-col gap-4">
			<Skeleton shape="text" />
			<Skeleton shape="text" width="60%" />
			<Skeleton shape="rectangle" height="5rem" />
			<Container class="flex items-center gap-3">
				<Skeleton shape="circle" width="3rem" height="3rem" />
				<Skeleton shape="circle" width="2rem" height="2rem" />
			</Container>
		</Container>
		<Container class="mt-4">
			<CodeBlock code={codeBlockContents.skeletonBasic} language="svelte" />
		</Container>
	</Container>

	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Card Placeholder Example</Text>
		<Container
			class="flex max-w-sm items-center gap-4 rounded-lg border border-border bg-surface-raised p-4"
		>
			<Skeleton shape="circle" width="3rem" height="3rem" />
			<Container class="flex flex-1 flex-col gap-2">
				<Skeleton shape="text" width="70%" />
				<Skeleton shape="text" width="40%" />
			</Container>
		</Container>
		<Container class="mt-4">
			<CodeBlock code={codeBlockContents.skeletonCard} language="svelte" />
		</Container>
	</Container>
</Container>
