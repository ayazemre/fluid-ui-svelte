<script lang="ts">
	import { List, Container, Text, Table } from '$lib/base/index.js';
	import { Page, CodeBlock } from '$lib/components/index.js';

	const fruitItems = ['Apple', 'Banana', 'Orange'];
	const numberItems = [1, 2, 3];
	const tasks = [
		{ id: 1, text: 'Create documentation for List component', completed: true },
		{ id: 2, text: 'Style the list items', completed: false },
		{ id: 3, text: 'Push changes to repository', completed: false }
	];

	const headers = ['Prop', 'Type', 'Default', 'Description'];

	const propsData = [
		{
			prop: 'type',
			type: "'ol' | 'ul'",
			default: "'ul'",
			description: 'Specifies the type of list to render.'
		},
		{
			prop: 'items',
			type: 'Array<T>',
			default: '[]',
			description: 'An array of items to be rendered.'
		},
		{
			prop: 'itemTemplate',
			type: 'Snippet<[T]>',
			default: 'required',
			description: 'A Svelte snippet used to render each item.'
		},
		{
			prop: 'class',
			type: 'string',
			default: "''",
			description: 'Custom CSS classes for the list element.'
		},
		{
			prop: 'itemClass',
			type: 'string',
			default: "''",
			description: 'Custom CSS classes for each list item (li).'
		},
		{
			prop: 'overrideDefaultStyling',
			type: 'boolean',
			default: 'false',
			description: 'If true, removes default fluid styling.'
		},
		{
			prop: '...rest',
			type: 'HTMLAttributes',
			default: '—',
			description: 'Standard HTML list attributes.'
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
	title="Fluid UI - List"
	description="The List component is a flexible component for rendering ordered or unordered lists from an array of items."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">List</Text>
			<Text>
				The List component is a generic and flexible way to render ordered (<Text type="code"
					>&lt;ol&gt;</Text
				>) or unordered (<Text type="code">&lt;ul&gt;</Text>) lists. It iterates over an array of
				items and renders them using a Svelte 5 snippet.
			</Text>
		</Container>

		<Container class="hidden flex-col gap-4 overflow-x-auto md:flex">
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
				<!-- Unordered -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Unordered List</Text>
					<Text class="text-sm text-neutral-500">A basic unordered list with default markers.</Text>
					<Container class="rounded-lg border p-6 dark:border-neutral-700">
						<List items={fruitItems}>
							{#snippet itemTemplate(item: string)}
								{item}
							{/snippet}
						</List>
					</Container>
					<CodeBlock
						code={`<List items={fruitItems}>
  {#snippet itemTemplate(item)}
    {item}
  {/snippet}
</List>`}
						language="svelte"
					/>
				</Container>

				<!-- Ordered -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Ordered List</Text>
					<Text class="text-sm text-neutral-500">A numbered list using the "ol" type prop.</Text>
					<Container class="rounded-lg border p-6 dark:border-neutral-700">
						<List items={numberItems} type="ol">
							{#snippet itemTemplate(item: number)}
								Step {item}
							{/snippet}
						</List>
					</Container>
					<CodeBlock
						code={`<List type="ol" items={numberItems}>
  {#snippet itemTemplate(item)}
    Step {item}
  {/snippet}
</List>`}
						language="svelte"
					/>
				</Container>

				<!-- Item Styling -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Item Styling</Text>
					<Text class="text-sm text-neutral-500"
						>Styling individual items using the itemClass prop.</Text
					>
					<Container class="rounded-lg border p-6 dark:border-neutral-700">
						<List
							items={fruitItems}
							itemClass="mb-2 last:mb-0 p-2 bg-neutral-100 dark:bg-neutral-800 rounded list-none"
						>
							{#snippet itemTemplate(item)}
								{item}
							{/snippet}
						</List>
					</Container>
					<CodeBlock
						code={`<List 
  items={fruitItems} 
  itemClass="p-2 bg-neutral-100 rounded list-none"
>
  {#snippet itemTemplate(item)}
    {item}
  {/snippet}
</List>`}
						language="svelte"
					/>
				</Container>

				<!-- Complex Objects -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Complex Objects</Text>
					<Text class="text-sm text-neutral-500"
						>Rendering objects with custom logic in the snippet.</Text
					>
					<Container class="rounded-lg border p-6 dark:border-neutral-700">
						<List items={tasks}>
							{#snippet itemTemplate(item)}
								<Text class={item.completed ? 'text-neutral-500 line-through' : ''}>
									{item.text}
								</Text>
							{/snippet}
						</List>
					</Container>
					<CodeBlock
						code={`<List items={tasks}>
  {#snippet itemTemplate(item)}
    <Text class={item.completed ? 'line-through' : ''}>{item.text}</Text>
  {/snippet}
</List>`}
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
  import { List } from 'fluid-ui-svelte';
<\/script>

<List items={['Item 1', 'Item 2']}>
  {#snippet itemTemplate(item)}
    {item}
  {/snippet}
</List>`}
			/>
		</Container>
	</Container>
</Page>
