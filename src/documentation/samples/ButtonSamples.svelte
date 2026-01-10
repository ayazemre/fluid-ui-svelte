<script lang="ts">
	import { Button, Container, Text } from '$lib/base/index.js';
	import { CodeBlock } from '$lib/components/index.js';
	import Icon from '@iconify/svelte';
	import { codeBlockContents } from './codeBlockContents.js';
</script>

<Container class="grid grid-cols-1 gap-8 md:grid-cols-2">
	<!-- Primary Button -->
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Primary</Text>
		<Container class="flex items-center gap-4 rounded-lg border p-6 dark:border-neutral-700">
			<Button
				class="fluid-button-primary"
				onclick={async (event, buttonState) => {
					buttonState.inProgress = true;
					await new Promise((resolve) => setTimeout(resolve, 1000));
					buttonState.inProgress = false;
				}}
			>
				{#snippet loadingPlaceholder()}
					<Icon icon="line-md:loading-twotone-loop" />
					<Text type="span">Loading...</Text>
				{/snippet}
				Primary Button
			</Button>
		</Container>
		<CodeBlock
			code={codeBlockContents.buttonPrimary}
			language="svelte"
		/>
	</Container>

	<!-- Secondary Button -->
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Secondary</Text>
		<Container class="flex items-center gap-4 rounded-lg border p-6 dark:border-neutral-700">
			<Button
				class="fluid-button-secondary"
				onclick={async (event, buttonState) => {
					buttonState.inProgress = true;
					await new Promise((resolve) => setTimeout(resolve, 1000));
					buttonState.inProgress = false;
				}}
			>
				{#snippet loadingPlaceholder()}
					<Icon icon="line-md:loading-twotone-loop" />
					<Text type="span">Loading...</Text>
				{/snippet}
				Secondary Button
			</Button>
		</Container>
		<CodeBlock
			code={codeBlockContents.buttonSecondary}
			language="svelte"
		/>
	</Container>

	<!-- Outline Button -->
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Outline</Text>
		<Container class="flex items-center gap-4 rounded-lg border p-6 dark:border-neutral-700">
			<Button
				class="fluid-button-outline"
				onclick={async (event, buttonState) => {
					buttonState.inProgress = true;
					await new Promise((resolve) => setTimeout(resolve, 1000));
					buttonState.inProgress = false;
				}}
			>
				{#snippet loadingPlaceholder()}
					<Icon icon="line-md:loading-twotone-loop" />
					<Text type="span">Loading...</Text>
				{/snippet}
				Outline Button
			</Button>
		</Container>
		<CodeBlock
			code={codeBlockContents.buttonOutline}
			language="svelte"
		/>
	</Container>

	<!-- Transparent Button -->
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Transparent</Text>
		<Container class="flex items-center gap-4 rounded-lg border p-6 dark:border-neutral-700">
			<Button
				class="fluid-button-transparent"
				onclick={async (event, buttonState) => {
					buttonState.inProgress = true;
					await new Promise((resolve) => setTimeout(resolve, 1000));
					buttonState.inProgress = false;
				}}
			>
				{#snippet loadingPlaceholder()}
					<Icon icon="line-md:loading-twotone-loop" />
					<Text type="span">Loading...</Text>
				{/snippet}
				Transparent Button
			</Button>
		</Container>
		<CodeBlock
			code={codeBlockContents.buttonTransparent}
			language="svelte"
		/>
	</Container>

	<!-- With Icon -->
	<Container class="flex flex-col gap-2 md:col-span-2">
		<Text type="h3" class="text-lg font-semibold">With Icon</Text>
		<Container class="flex items-center gap-4 rounded-lg border p-6 dark:border-neutral-700">
			<Button
				class="fluid-button-primary"
				onclick={async (event, buttonState) => {
					buttonState.inProgress = true;
					await new Promise((resolve) => setTimeout(resolve, 1000));
					buttonState.inProgress = false;
				}}
			>
				{#snippet loadingPlaceholder()}
					<Icon icon="line-md:loading-twotone-loop" />
					<Text type="span">Loading...</Text>
				{/snippet}
				<Icon icon="mdi:github" class="text-xl" />
				<Text type="span">GitHub</Text>
			</Button>
		</Container>
		<CodeBlock
			code={codeBlockContents.buttonIcon}
			language="svelte"
		/>
	</Container>
</Container>