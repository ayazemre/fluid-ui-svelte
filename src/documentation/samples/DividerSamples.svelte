<script lang="ts">
	import { Divider } from '$lib/base';
	import { Container, Text } from '$lib/base';
	import { CodeBlock } from '$lib/components';
	import { codeBlockContents } from './codeBlockContents';
</script>

<Container class="flex flex-col gap-10">
	<Container class="flex flex-col gap-2">
		<Text type="h1">Divider Samples</Text>
		<Text class="text-neutral-500">
			A visual separator used to segment and structure page content.
		</Text>
	</Container>

	<!-- 1. Horizontal Divider -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">1. Horizontal Divider</Text>
		<Text class="text-neutral-500">Standard full-width line separator.</Text>
		<Container class="documentation-preview flex w-full flex-col gap-2">
			<Text>Section 1: Overview and introductory notes.</Text>
			<Divider />
			<Text>Section 2: Detailed architecture details.</Text>
		</Container>
		<CodeBlock code={codeBlockContents.dividerBasic} language="svelte" />
	</Container>

	<!-- 2. Divider with Label & Vertical -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">2. Divider with Label & Vertical Orientation</Text>
		<Text class="text-neutral-500"
			>Include text labels or use vertical alignment inside flex containers.</Text
		>
		<Container class="documentation-preview flex w-full flex-col gap-4">
			<Divider label="OR CONTINUE WITH" />
			<Container class="flex h-8 items-center gap-2">
				<Text type="span">Dashboard</Text>
				<Divider orientation="vertical" />
				<Text type="span">Settings</Text>
				<Divider orientation="vertical" />
				<Text type="span">Billing</Text>
			</Container>
		</Container>
		<CodeBlock code={codeBlockContents.dividerWithLabel} language="svelte" />
	</Container>
</Container>
