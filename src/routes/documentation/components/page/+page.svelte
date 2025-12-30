<script lang="ts">
	import { Page, Container, Text, Table } from '$lib/index.js';
	import { CodeBlock } from '$lib/components/index.js';

	const headers = ['Prop', 'Type', 'Default', 'Description'];
	const propsData = [
		{
			prop: 'title',
			type: 'string',
			default: "''",
			description: 'The document title (set in <svelte:head>).'
		},
		{
			prop: 'description',
			type: 'string',
			default: "''",
			description: 'The meta description (set in <svelte:head>).'
		},
		{
			prop: 'children',
			type: 'Snippet',
			default: '—',
			description: 'The main content of the page.'
		},
		{
			prop: 'class',
			type: 'string',
			default: "''",
			description: 'Custom CSS classes for the main section container.'
		},
		{
			prop: '...rest',
			type: 'HTMLAttributes',
			default: '—',
			description: 'Standard HTML section attributes.'
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
	title="Fluid UI - Page"
	description="The Page component is a top-level wrapper that handles document metadata and consistent layout spacing."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Page</Text>
			<Text>
				The Page component is used as the root element for all documentation and application pages.
				It automatically manages the document's SEO metadata and applies standard padding and layout
				styles.
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
			<Text type="h2" class="text-2xl font-semibold">Usage</Text>
			<Text>Wrap your page content with the Page component to set metadata and apply styling.</Text>
			<CodeBlock
				language="svelte"
				code={`<script lang="ts">
  import { Page, Text } from 'fluid-ui-svelte';
<\/script>

<Page 
  title="Home - My App" 
  description="Welcome to my awesome Svelte application."
>
  <Text type="h1">Hello World</Text>
  <Text>This content is inside a consistent layout container.</Text>
</Page>`}
			/>
		</Container>
	</Container>
</Page>
