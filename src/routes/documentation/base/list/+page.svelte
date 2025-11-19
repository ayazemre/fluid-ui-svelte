<script lang="ts">
	import Container from '$lib/base/Container.svelte';
	import Page from '$lib/components/Page.svelte';
	import Text from '$lib/base/Text.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import List from '$lib/base/List.svelte';

	const fruitItems = ['Apple', 'Banana', 'Orange'];
	const numberItems = [1, 2, 3];
	const tasks = [
		{ id: 1, text: 'Create documentation for List component', completed: true },
		{ id: 2, text: 'Style the list items', completed: false },
		{ id: 3, text: 'Push changes to repository', completed: false }
	];

	// Snippet for rendering a simple item
	const renderItem = (item: string) => item;
</script>

<Page
	title="List - Fluid UI"
	description="The List component is a flexible component for rendering ordered or unordered lists from an array of items."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">List</Text>
			<Text>
				The List component is a generic and flexible way to render ordered (<Text type="code"
					>&lt;ol&gt;</Text
				>) or unordered (<Text type="code">&lt;ul&gt;</Text>) lists. It iterates over an array of
				items and renders them using a Svelte 5 snippet passed to the <Text type="code"
					>itemTemplate</Text
				> prop.
			</Text>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Props</Text>
			<Container overrideDefaultStyling class="w-full overflow-x-auto">
				<table class="table w-full">
					<thead>
						<tr>
							<th><Text>Prop</Text></th>
							<th><Text>Type</Text></th>
							<th><Text>Default</Text></th>
							<th><Text>Description</Text></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><Text type="code">type</Text></td>
							<td><Text type="code">'ol' | 'ul'</Text></td>
							<td><Text type="code">'ul'</Text></td>
							<td><Text>Specifies the type of list to render.</Text></td>
						</tr>
						<tr>
							<td><Text type="code">items</Text></td>
							<td><Text type="code">Array&lt;T&gt;</Text></td>
							<td><Text type="code">[]</Text></td>
							<td><Text>An array of items to be rendered in the list.</Text></td>
						</tr>
						<tr>
							<td><Text type="code">itemTemplate</Text></td>
							<td><Text type="code">Snippet&lt;T[]&gt;</Text></td>
							<td><Text type="strong">Required</Text></td>
							<td><Text>A Svelte snippet used to render each item in the list.</Text></td>
						</tr>
						<tr>
							<td><Text type="code">class</Text></td>
							<td><Text type="code">string</Text></td>
							<td><Text type="code">''</Text></td>
							<td><Text>Custom CSS classes to apply to the list element.</Text></td>
						</tr>
						<tr>
							<td><Text type="code">overrideDefaultStyling</Text></td>
							<td><Text type="code">boolean</Text></td>
							<td><Text type="code">false</Text></td>
							<td>
								<Text
									>If true, removes the default <Text type="code">fluid-*-list</Text> styling.</Text
								>
							</td>
						</tr>
					</tbody>
				</table>
			</Container>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Component Samples</Text>

			<Text type="h3" class="text-xl font-semibold">Unordered List</Text>
			<Text>A basic unordered list using the default <Text type="code">ul</Text> type.</Text>
			<Container class="rounded-lg border p-4">
				<List items={fruitItems} itemTemplate={renderItem} />
			</Container>
			<CodeBlock
				language="svelte"
				code={`<script lang="ts">
  import List from 'fluid-ui-svelte/base/List.svelte';

  const fruitItems = ['Apple', 'Banana', 'Orange'];

  // Define a snippet to render each item
  const renderItem = (item: string) => item;
<\\/script>

<List items={fruitItems} itemTemplate={renderItem} />`}
			/>

			<Text type="h3" class="text-xl font-semibold">Ordered List</Text>
			<Text>
				An ordered list created by setting <Text type="code">type="ol"</Text>.
			</Text>
			<Container class="rounded-lg border p-4">
				{#snippet renderStep(item)}
					Step {item}
				{/snippet}
				<List items={numberItems} type="ol" itemTemplate={renderStep} />
			</Container>
			<CodeBlock
				language="svelte"
				code={`<script lang="ts">
  import List from 'fluid-ui-svelte/base/List.svelte';

  const numberItems = [1, 2, 3];
<\\/script>

{#snippet renderStep(item)}
  Step {item}
{/snippet}

<List items={numberItems} type="ol" itemTemplate={renderStep} />`}
			/>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Usage with Complex Objects</Text>
			<Text>
				The <Text type="code">itemTemplate</Text> snippet receives the entire item object, allowing for
				complex rendering logic and styling.
			</Text>
			<Container class="rounded-lg border p-4">
				{#snippet renderTask(item)}
					<Text class={item.completed ? 'text-neutral-500 line-through' : ''}>
						{item.text}
					</Text>
				{/snippet}
				<List items={tasks} itemTemplate={renderTask} />
			</Container>
			<CodeBlock
				language="svelte"
				code={`<script lang="ts">
  import List from 'fluid-ui-svelte/base/List.svelte';
  import Text from 'fluid-ui-svelte/base/Text.svelte';

  const tasks = [
    { id: 1, text: 'Create documentation', completed: true },
    { id: 2, text: 'Style list items', completed: false },
    { id: 3, text: 'Push changes', completed: false }
  ];
<\\/script>

<Text type="h3">Todo List</Text>

{#snippet renderTask(item)}
  <Text class={item.completed ? 'line-through text-neutral-500' : ''}>
    {item.text}
  </Text>
{/snippet}

<List
  items={tasks}
  itemTemplate={renderTask}
  class="space-y-2 rounded-lg border p-4"
</List>`}
			/>
		</Container>
	</Container>
</Page>
