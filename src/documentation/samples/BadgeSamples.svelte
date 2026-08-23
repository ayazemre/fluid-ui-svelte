<script lang="ts">
	import { Badge } from '$lib/base';
	import { Container, Text } from '$lib/base';
	import { CodeBlock } from '$lib/components';
	import { codeBlockContents } from './codeBlockContents';
</script>

<Container class="flex flex-col gap-10">
	<Container class="flex flex-col gap-2">
		<Text type="h1">Badge Samples</Text>
		<Text class="text-neutral-500">
			A small visual label used to convey status, metadata, or counters.
		</Text>
	</Container>

	<!-- 1. Color Variants -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">1. Color Variants</Text>
		<Text class="text-neutral-500">Badges support all standard semantic theme colors.</Text>
		<Container class="documentation-preview flex w-full flex-wrap items-center gap-3">
			<Badge>Default</Badge>
			<Badge variant="primary">Primary</Badge>
			<Badge variant="success">Success</Badge>
			<Badge variant="warning">Warning</Badge>
			<Badge variant="error">Error</Badge>
			<Badge variant="info">Info</Badge>
		</Container>
		<CodeBlock code={codeBlockContents.badgeBasic} language="svelte" />
	</Container>

	<!-- 2. Outline Variant -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">2. Outline Variant</Text>
		<Text class="text-neutral-500">Use the outline variant for subtle metadata tags.</Text>
		<Container class="documentation-preview flex w-full flex-wrap items-center gap-3">
			<Badge variant="outline">v1.0.0</Badge>
			<Badge variant="outline">TypeScript</Badge>
			<Badge variant="outline">Svelte 5</Badge>
		</Container>
		<CodeBlock code={codeBlockContents.badgeVariants} language="svelte" />
	</Container>
</Container>
