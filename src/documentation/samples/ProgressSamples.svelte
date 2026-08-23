<script lang="ts">
	import { Progress } from '$lib/components';
	import { Container, Button, Text } from '$lib/base';
	import { CodeBlock } from '$lib/components';
	import { codeBlockContents } from './codeBlockContents';

	let progressValue = $state(45);
</script>

<Container class="flex flex-col gap-10">
	<Container class="flex flex-col gap-2">
		<Text type="h1">Progress Samples</Text>
		<Text class="text-neutral-500">
			An accessible indicator showing the completion status of a task or operation.
		</Text>
	</Container>

	<!-- 1. Determinate Progress -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">1. Determinate Progress</Text>
		<Text class="text-neutral-500">Displays exact percentage and supports dynamic updates.</Text>
		<Container class="documentation-preview flex w-full flex-col gap-4">
			<Progress value={progressValue} max={100} showValue />
			<Container class="flex gap-2">
				<Button
					class="fluid-button-outline text-xs"
					onclick={async () => {
						progressValue = Math.max(0, progressValue - 15);
					}}
				>
					-15%
				</Button>
				<Button
					class="fluid-button-outline text-xs"
					onclick={async () => {
						progressValue = Math.min(100, progressValue + 15);
					}}
				>
					+15%
				</Button>
			</Container>
		</Container>
		<CodeBlock code={codeBlockContents.progressBasic} language="svelte" />
	</Container>

	<!-- 2. Indeterminate Progress -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">2. Indeterminate Progress</Text>
		<Text class="text-neutral-500">Use when the duration of an operation cannot be calculated.</Text
		>
		<Container class="documentation-preview w-full">
			<Progress />
		</Container>
		<CodeBlock code={codeBlockContents.progressIndeterminate} language="svelte" />
	</Container>
</Container>
