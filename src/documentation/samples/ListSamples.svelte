<script lang="ts">
	import { List, Container, Text } from '$lib/base/index.js';
	import { CodeBlock } from '$lib/components/index.js';
	import { codeBlockContents } from './codeBlockContents.js';

	const fruitItems = ['Apple', 'Banana', 'Orange'];
	const numberItems = [1, 2, 3];
	const tasks = [
		{ id: 1, text: 'Create documentation for List component', completed: true },
		{ id: 2, text: 'Style the list items', completed: false },
		{ id: 3, text: 'Push changes to repository', completed: false }
	];
</script>

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
			code={codeBlockContents.listUnordered}
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
			code={codeBlockContents.listOrdered}
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
			code={codeBlockContents.listItemStyling}
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
			code={codeBlockContents.listComplex}
			language="svelte"
		/>
	</Container>
</Container>