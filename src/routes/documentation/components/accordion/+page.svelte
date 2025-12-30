<script lang="ts">
	import { Accordion, Page } from '$lib/components/index.js';
	import { Container, Text, Table } from '$lib/base/index.js';
	import { CodeBlock } from '$lib/components/index.js';
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';

	const headers = ['Prop', 'Type', 'Default', 'Description'];
	const propsData = [
		{
			prop: 'variation',
			type: 'string',
			default: "''",
			description: 'Custom CSS class to apply to the accordion wrapper.'
		},
		{
			prop: 'header',
			type: 'Snippet<[{ isExpanded: boolean }]>',
			default: 'required',
			description: 'Snippet for the toggleable header content.'
		},
		{
			prop: 'body',
			type: 'Snippet',
			default: 'required',
			description: 'Snippet for the collapsible body content.'
		},
		{
			prop: 'transitionFunction',
			type: 'function',
			default: 'slide',
			description: 'Svelte transition function for the expansion animation.'
		},
		{
			prop: 'transitionDuration',
			type: 'number',
			default: '250',
			description: 'Duration of the expansion animation in ms.'
		}
	];

	const tableRows = propsData.map((p) => [
		{ value: p.prop, col: 'prop' },
		{ value: p.type, col: 'type' },
		{ value: p.default, col: 'default' },
		{ value: p.description, col: 'desc' }
	]);
</script>

<Page
	title="Fluid UI - Accordion"
	description="A collapsible component used to organize content into toggleable sections."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Accordion</Text>
			<Text>
				The Accordion component allows users to toggle the visibility of content sections. It's an
				ideal solution for FAQs, progressive disclosure, or compacting complex information.
			</Text>
		</Container>

		<Container class="flex flex-col gap-4 overflow-x-auto">
			<Text type="h2" class="text-2xl font-semibold">Props</Text>
			<Table
				tableHeadItems={headers}
				tableRowItems={tableRows}
				tableFooterItems={[]}
				class="w-full text-left"
			>
				{#snippet headTemplate(item: string)}
					<Text class="p-2 font-bold">{item}</Text>
				{/snippet}

				{#snippet bodyTemplate(item: any)}
					<Container overrideDefaultStyling={true} class="p-2">
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

				{#snippet footerTemplate()}
					<Container overrideDefaultStyling={true} />
				{/snippet}
			</Table>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Samples</Text>

			<Container class="grid grid-cols-1 gap-8 md:grid-cols-2">
				<!-- Standard Accordion -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Standard Accordion</Text>
					<Text class="text-sm text-neutral-500">The default look with chevron indicators.</Text>
					<Container class="rounded-lg border p-6 dark:border-neutral-700">
						<Accordion>
							{#snippet header({ isExpanded })}
								<Container class="flex w-full items-center justify-between p-2">
									<Text>General Information</Text>
									<Icon icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
								</Container>
							{/snippet}
							{#snippet body()}
								<Container class="p-4 text-sm text-neutral-600 dark:text-neutral-400">
									Accordions are perfect for grouping content while keeping the interface clean and
									scannable.
								</Container>
							{/snippet}
						</Accordion>
					</Container>
					<CodeBlock
						code={`<Accordion>
  {#snippet header({ isExpanded })}
    <Text>Title</Text>
    <Icon icon={isExpanded ? 'up' : 'down'} />
  {/snippet}
  {#snippet body()}
    <Text>Hidden content</Text>
  {/snippet}
</Accordion>`}
						language="svelte"
					/>
				</Container>

				<!-- Custom Transition -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Custom Transition</Text>
					<Text class="text-sm text-neutral-500"
						>Using different Svelte transitions and durations.</Text
					>
					<Container class="rounded-lg border p-6 dark:border-neutral-700">
						<Accordion transitionFunction={fade} transitionDuration={500}>
							{#snippet header({ isExpanded })}
								<Container class="flex w-full items-center gap-2 p-2">
									<Text class={isExpanded ? 'font-bold text-primary-500' : ''}>Fade Animation</Text>
								</Container>
							{/snippet}
							{#snippet body()}
								<Container class="p-4 italic">
									This accordion uses a cross-fade transition instead of the default slide.
								</Container>
							{/snippet}
						</Accordion>
					</Container>
					<CodeBlock
						code={`import { fade } from 'svelte/transition';

<Accordion transitionFunction={fade} transitionDuration={500}>
  ...
</Accordion>`}
						language="svelte"
					/>
				</Container>
			</Container>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Usage</Text>
			<CodeBlock
				language="svelte"
				code={`<script lang="ts">
  import { Accordion } from 'fluid-ui-svelte';
<\/script>

<Accordion>
  {#snippet header({ isExpanded })}
    <span>Click to {isExpanded ? 'close' : 'open'}</span>
  {/snippet}
  {#snippet body()}
    <p>Expanded content here.</p>
  {/snippet}
</Accordion>`}
			/>
		</Container>
	</Container>
</Page>
