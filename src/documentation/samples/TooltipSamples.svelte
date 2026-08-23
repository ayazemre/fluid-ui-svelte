<script lang="ts">
	import { Tooltip } from '$lib/components';
	import { Container, Button, Text } from '$lib/base';
	import { CodeBlock } from '$lib/components';
	import { codeBlockContents } from './codeBlockContents';
</script>

<Container class="flex flex-col gap-10">
	<Container class="flex flex-col gap-2">
		<Text type="h1">Tooltip Samples</Text>
		<Text class="text-neutral-500">
			A brief floating hint that appears upon hover or focus of an anchor element.
		</Text>
	</Container>

	<!-- 1. Basic Tooltip -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">1. Basic Tooltip</Text>
		<Text class="text-neutral-500">Hover or focus over the button to view the tooltip label.</Text>
		<Container class="documentation-preview flex w-full items-center justify-center p-12">
			<Tooltip text="Save changes to database">
				{#snippet trigger()}
					<Button onclick={async () => {}} class="fluid-button-primary">Hover or Focus Me</Button>
				{/snippet}
			</Tooltip>
		</Container>
		<CodeBlock code={codeBlockContents.tooltipBasic} language="svelte" />
	</Container>

	<!-- 2. Tooltip Positions -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">2. Tooltip Positions</Text>
		<Text class="text-neutral-500"
			>Position tooltips above, below, or to the sides of elements.</Text
		>
		<Container class="documentation-preview flex w-full flex-wrap justify-center gap-6 p-12">
			<Tooltip text="Top position hint" position="top">
				{#snippet trigger()}
					<Button onclick={async () => {}} class="fluid-button-outline">Top</Button>
				{/snippet}
			</Tooltip>
			<Tooltip text="Bottom position hint" position="bottom">
				{#snippet trigger()}
					<Button onclick={async () => {}} class="fluid-button-outline">Bottom</Button>
				{/snippet}
			</Tooltip>
			<Tooltip text="Left position hint" position="left">
				{#snippet trigger()}
					<Button onclick={async () => {}} class="fluid-button-outline">Left</Button>
				{/snippet}
			</Tooltip>
			<Tooltip text="Right position hint" position="right">
				{#snippet trigger()}
					<Button onclick={async () => {}} class="fluid-button-outline">Right</Button>
				{/snippet}
			</Tooltip>
		</Container>
		<CodeBlock code={codeBlockContents.tooltipPositions} language="svelte" />
	</Container>
</Container>
