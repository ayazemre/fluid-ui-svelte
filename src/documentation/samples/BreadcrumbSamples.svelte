<script lang="ts">
	import { Breadcrumb } from '$lib/components';
	import { Container, Text } from '$lib/base';
	import { CodeBlock } from '$lib/components';
	import { codeBlockContents } from './codeBlockContents';

	const items = [
		{ label: 'Home', href: '/' },
		{ label: 'Components', href: '/documentation/getting-started' },
		{ label: 'Breadcrumb', href: '/documentation/components/breadcrumb' }
	];
</script>

<Container class="flex flex-col gap-10">
	<Container class="flex flex-col gap-2">
		<Text type="h1">Breadcrumb Samples</Text>
		<Text class="text-neutral-500"
			>A navigation aid that allows users to keep track of their location within programs,
			documents, or websites.</Text
		>
	</Container>

	<!-- 1. Basic Breadcrumb -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">1. Basic Breadcrumb</Text>
		<Text class="text-neutral-500">Standard breadcrumb with default separator.</Text>
		<Container class="documentation-preview w-full">
			<Breadcrumb {items} />
		</Container>
		<CodeBlock code={codeBlockContents.breadcrumbBasic} language="svelte" />
	</Container>

	<!-- 2. Custom Separator -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">2. Custom Separator</Text>
		<Text class="text-neutral-500">You can provide a custom string or snippet as a separator.</Text>
		<Container class="documentation-preview w-full">
			<Breadcrumb {items} separator=">" />
		</Container>
		<CodeBlock code={codeBlockContents.breadcrumbSeparator} language="svelte" />
	</Container>
</Container>
