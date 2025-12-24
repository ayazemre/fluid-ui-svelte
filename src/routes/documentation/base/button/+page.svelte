<script lang="ts">
	import { Button, Container, Text, List, Link, Table } from '$lib/base/index.js';
	import { Page, CodeBlock } from '$lib/components/index.js';
	import Icon from '@iconify/svelte';

	const headers = ['Prop', 'Type', 'Default', 'Description'];

	const propsDataRaw = [
		{
			prop: 'onclick',
			type: '(event, state) => Promise<void>',
			default: 'required',
			description: 'Async event handler. Set state.inProgress to manage loading state.'
		},
		{
			prop: 'class',
			type: 'string',
			default: "''",
			description: 'CSS classes to apply to the button.'
		},
		{
			prop: 'overrideDefaultStyling',
			type: 'boolean',
			default: 'false',
			description: 'If true, removes the base fluid-button class.'
		},
		{
			prop: 'loadingPlaceholder',
			type: 'Snippet',
			default: 'undefined',
			description: 'Snippet to render when onclick is in progress.'
		},
		{
			prop: '...rest',
			type: 'HTMLButtonAttributes',
			default: '—',
			description: 'Standard HTML button attributes.'
		}
	];

	const tableRows = propsDataRaw.map((p) => [
		{ value: p.prop, col: 'prop' },
		{ value: p.type, col: 'type' },
		{ value: p.default, col: 'default' },
		{ value: p.description, col: 'desc' }
	]);
</script>

<Page
	title="Button - Fluid UI"
	description="The Button component is used to trigger an action or event, such as submitting a form, opening a dialog, or performing a data-related action."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Button</Text>
			<Text>
				The Button component is used to trigger an action or event, such as submitting a form,
				opening a dialog, or performing a data-related action. It's a fundamental interactive
				element.
			</Text>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Props</Text>
			<Table
				tableHeadItems={headers}
				tableRowItems={tableRows}
				tableFooterItems={[]}
				class="w-full text-left"
			>
				{#snippet headTemplate(item)}
					<Text class="p-2 font-bold">{item}</Text>
				{/snippet}

				{#snippet bodyTemplate(item)}
					<Container class="p-2">
						{#if item.col === 'prop'}
							<Text type="code" class="font-bold text-primary-600">{item.value}</Text>
						{:else if item.col === 'type'}
							<Text type="code" class="text-sm text-neutral-600 dark:text-neutral-400"
								>{item.value}</Text
							>
						{:else if item.col === 'default'}
							<Text type="code" class="text-sm text-neutral-500">{item.value}</Text>
						{:else}
							<Text class="text-sm">{item.value}</Text>
						{/if}
					</Container>
				{/snippet}

				{#snippet footerTemplate(item)}
					<Container></Container>
				{/snippet}
			</Table>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Samples</Text>
			<Text>
				Buttons come with predefined variants that you can apply using CSS classes. You can also
				create your own variants in your <Text type="code">app.css</Text> file.
			</Text>

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
						code={`<Button class="fluid-button-primary">Primary Button</Button>`}
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
						code={`<Button class="fluid-button-secondary">Secondary Button</Button>`}
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
						code={`<Button class="fluid-button-outline">Outline Button</Button>`}
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
						code={`<Button class="fluid-button-transparent">Transparent Button</Button>`}
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
						code={`<Button class="fluid-button-primary">
  <Icon icon="mdi:github" />
  <Text type="span">GitHub</Text>
</Button>`}
						language="svelte"
					/>
				</Container>
			</Container>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Usage</Text>
			<CodeBlock
				code={`<script lang="ts">
  import { Button, Text } from 'fluid-ui-svelte/base';
  import Icon from '@iconify/svelte';
<\/script>

<Button
  class="fluid-button-primary"
  onclick={async (event, buttonState) => {
    buttonState.inProgress = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert('Clicked!');
    } finally {
      buttonState.inProgress = false;
    }
  }}
>
  {#snippet loadingPlaceholder()}
    <Icon icon="line-md:loading-twotone-loop" />
    <Text type="span">Loading...</Text>
  {/snippet}
  Click Me
</Button>`}
				language="svelte"
			/>
		</Container>
	</Container>
</Page>
