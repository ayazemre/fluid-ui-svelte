<script lang="ts">
	import { Table, Container, Text } from '$lib/base/index.js';
	import { Page, CodeBlock } from '$lib/components/index.js';

	interface User {
		id: number;
		name: string;
		age: number;
	}

	const headers = ['ID', 'Name', 'Age'];
	const users: Array<Array<any>> = [
		[1, 'Alice', 30],
		[2, 'Bob', 24],
		[3, 'Charlie', 35]
	];
	const footers = ['Total', '', '3 Users'];

	const propsHeaders = ['Prop', 'Type', 'Default', 'Description'];
	const propsData = [
		{
			prop: 'caption',
			type: 'string',
			default: "''",
			description: 'An optional caption for the table.'
		},
		{
			prop: 'tableHeadItems',
			type: 'Array<T>',
			default: 'required',
			description: 'Data for the header row.'
		},
		{
			prop: 'tableRowItems',
			type: 'Array<Array<U>>',
			default: 'required',
			description: 'Data for the body rows.'
		},
		{
			prop: 'tableFooterItems',
			type: 'Array<V>',
			default: 'required',
			description: 'Data for the footer row.'
		},
		{
			prop: 'headTemplate',
			type: 'Snippet<[T]>',
			default: 'required',
			description: 'Snippet for rendering header cells.'
		},
		{
			prop: 'bodyTemplate',
			type: 'Snippet<[U]>',
			default: 'required',
			description: 'Snippet for rendering body cells.'
		},
		{
			prop: 'footerTemplate',
			type: 'Snippet<[V]>',
			default: 'required',
			description: 'Snippet for rendering footer cells.'
		},
		{
			prop: 'overrideDefaultStyling',
			type: 'boolean',
			default: 'false',
			description: 'If true, removes default fluid-table classes.'
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
	title="Fluid UI - Table"
	description="A flexible component for displaying tabular data with customizable cell rendering using Svelte snippets."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Table</Text>
			<Text>
				The Table component provides a structured and flexible way to render tabular data. It
				leverages Svelte 5 snippets to allow full control over the rendering of header, body, and
				footer cells.
			</Text>
		</Container>

		<Container class="hidden flex-col gap-4 overflow-x-auto md:flex">
			<Text type="h2" class="text-2xl font-semibold">Props</Text>
			<Table
				tableHeadItems={propsHeaders}
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
				<!-- Basic Table -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Standard Table</Text>
					<Text class="text-sm text-neutral-500">A basic table with header, body, and footer.</Text>
					<Container class="rounded-lg border p-6 dark:border-neutral-700">
						<Table
							caption="User Directory"
							tableHeadItems={headers}
							tableRowItems={users}
							tableFooterItems={footers}
						>
							{#snippet headTemplate(item: string)}
								{item}
							{/snippet}
							{#snippet bodyTemplate(item: any)}
								{item}
							{/snippet}
							{#snippet footerTemplate(item: string)}
								<span class="font-bold">{item}</span>
							{/snippet}
						</Table>
					</Container>
					<CodeBlock
						code={`<Table 
  caption="User Directory"
  tableHeadItems={['ID', 'Name']}
  tableRowItems={[[1, 'Alice'], [2, 'Bob']]}
  tableFooterItems={['Total', '2']}
>
  {#snippet headTemplate(item)} {item} {/snippet}
  {#snippet bodyTemplate(item)} {item} {/snippet}
  {#snippet footerTemplate(item)} <strong>{item}</strong> {/snippet}
</Table>`}
						language="svelte"
					/>
				</Container>

				<!-- Custom Styled -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Styled Table</Text>
					<Text class="text-sm text-neutral-500"
						>Applying custom classes to specific table sections.</Text
					>
					<Container class="rounded-lg border p-6 dark:border-neutral-700">
						<Table
							tableHeadItems={headers}
							tableRowItems={users}
							tableFooterItems={[]}
							headClass="bg-primary-500 text-white"
							rowClass="hover:bg-neutral-100 dark:hover:bg-neutral-800"
							cellClass="p-2 border-b dark:border-neutral-700"
						>
							{#snippet headTemplate(item: string)}
								{item}
							{/snippet}
							{#snippet bodyTemplate(item: any)}
								{item}
							{/snippet}
							{#snippet footerTemplate()}
								<div></div>
							{/snippet}
						</Table>
					</Container>
					<CodeBlock
						code={`<Table 
  tableHeadItems={headers} 
  tableRowItems={users}
  headClass="bg-primary-500 text-white"
  rowClass="hover:bg-neutral-100"
>
  ...
</Table>`}
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
  import { Table } from 'fluid-ui-svelte';
<\/script>

<Table 
  tableHeadItems={['Header']} 
  tableRowItems={[['Data']]}
  tableFooterItems={['Footer']}
>
  {#snippet headTemplate(item)} {item} {/snippet}
  {#snippet bodyTemplate(item)} {item} {/snippet}
  {#snippet footerTemplate(item)} {item} {/snippet}
</Table>`}
			/>
		</Container>
	</Container>
</Page>
