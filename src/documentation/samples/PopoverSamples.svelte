<script lang="ts">
	import { Popover } from '$lib/components';
	import { Container, Text, Button } from '$lib/base';
	import { CodeBlock } from '$lib/components';
	import { codeBlockContents } from './codeBlockContents';
</script>

<Container class="flex flex-col gap-10">
	<Container class="flex flex-col gap-2">
		<Text type="h1">Popover Samples</Text>
		<Text class="text-neutral-500"
			>A flexible popover component for tooltips, dropdowns, and more.</Text
		>
	</Container>

	<!-- 1. Basic Popover -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">1. Basic Popover</Text>
		<Text class="text-neutral-500">Standard popover that toggles on click.</Text>
		<Container class="documentation-preview w-full">
			<Popover>
				{#snippet trigger()}
					<Text class="rounded-md bg-primary-500 p-2 text-white">Click Me</Text>
				{/snippet}
				{#snippet content()}
					<Container class="flex flex-col gap-2">
						<Text type="strong">Popover Title</Text>
						<Text>This is a basic popover content with custom elements inside.</Text>
					</Container>
				{/snippet}
			</Popover>
		</Container>
		<CodeBlock code={codeBlockContents.popoverBasic} language="svelte" />
	</Container>

	<!-- 2. Positions -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">2. Positions</Text>
		<Text class="text-neutral-500">Popovers can be positioned in four different directions.</Text>
		<Container class="documentation-preview w-full">
			<Container class="flex flex-wrap justify-center gap-20 py-10">
				<Popover position="top">
					{#snippet trigger()}
						<Text class="rounded-md border border-primary-500 p-2 text-primary-500">Top</Text>
					{/snippet}
					{#snippet content()}
						<Text>Content on top</Text>
					{/snippet}
				</Popover>

				<Popover position="bottom">
					{#snippet trigger()}
						<Text class="rounded-md border border-primary-500 p-2 text-primary-500">Bottom</Text>
					{/snippet}
					{#snippet content()}
						<Text>Content on bottom</Text>
					{/snippet}
				</Popover>

				<Popover position="left">
					{#snippet trigger()}
						<Text class="rounded-md border border-primary-500 p-2 text-primary-500">Left</Text>
					{/snippet}
					{#snippet content()}
						<Text>Content on left</Text>
					{/snippet}
				</Popover>

				<Popover position="right">
					{#snippet trigger()}
						<Text class="rounded-md border border-primary-500 p-2 text-primary-500">Right</Text>
					{/snippet}
					{#snippet content()}
						<Text>Content on right</Text>
					{/snippet}
				</Popover>
			</Container>
		</Container>
		<CodeBlock code={codeBlockContents.popoverPositions} language="svelte" />
	</Container>
</Container>
