<script lang="ts">
	import { Text, Container, Table } from '$lib/base/index.js';
	import { Page, CodeBlock } from '$lib/components/index.js';

	const headers = ['Prop', 'Type', 'Default', 'Description'];

	const propsData = [
		{
			prop: 'type',
			type: 'string',
			default: "'p'",
			description: 'The HTML element to render (h1-h6, p, span, code, etc.).'
		},
		{
			prop: 'class',
			type: 'string',
			default: "''",
			description: 'CSS classes to apply to the element.'
		},
		{
			prop: 'overrideDefaultStyling',
			type: 'boolean',
			default: 'false',
			description: 'If true, removes the base fluid-text class.'
		},
		{
			prop: 'children',
			type: 'Snippet',
			default: '—',
			description: 'The text content to render.'
		},
		{
			prop: '...rest',
			type: 'HTMLAttributes',
			default: '—',
			description: 'Standard HTML attributes for the chosen element type.'
		}
	];

	const tableRows = propsData.map((p) => [
		{ value: p.prop, col: 'prop' },
		{ value: p.type, col: 'type' },
		{ value: p.default, col: 'default' },
		{ value: p.description, col: 'desc' }
	]);

	const tags = [
		'p',
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
		'span',
		'pre',
		'code',
		'b',
		'strong',
		'i',
		'em',
		'mark',
		'small',
		'del',
		'ins',
		'sub',
		'sup'
	];
</script>

<Page
	title="Fluid UI - Text"
	description="A versatile component for rendering semantic text elements with consistent typography."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Text</Text>
			<Text>
				The Text component is a fundamental building block for displaying content. It uses
				<Text type="code">{'<svelte:element>'}</Text> to dynamically render a wide range of semantic HTML
				text elements while applying standard library styling.
			</Text>
		</Container>

		<!-- Props -->
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
				<!-- Headings -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Semantic Headings</Text>
					<Text class="text-sm text-neutral-500"
						>Render various heading levels using the type prop.</Text
					>
					<Container class="rounded-lg border p-6 dark:border-neutral-700">
						<Text type="h1" class="text-2xl font-bold">Heading 1</Text>
						<Text type="h2" class="text-xl font-semibold">Heading 2</Text>
						<Text type="h3" class="text-lg font-medium">Heading 3</Text>
					</Container>
					<CodeBlock
						code={`<Text type="h1" class="text-2xl font-bold">Heading 1</Text>
<Text type="h2" class="text-xl font-semibold">Heading 2</Text>`}
						language="svelte"
					/>
				</Container>

				<!-- Inline Styles -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Inline Emphasis</Text>
					<Text class="text-sm text-neutral-500"
						>Use semantic tags for bold, italic, or highlighted text.</Text
					>
					<Container class="rounded-lg border p-6 dark:border-neutral-700">
						<Text>
							This is <Text type="strong">bold</Text>, <Text type="em">italic</Text>, and
							<Text type="mark">highlighted</Text>.
						</Text>
					</Container>
					<CodeBlock
						code={`<Text>
  This is <Text type="strong">bold</Text> and <Text type="em">italic</Text>.
</Text>`}
						language="svelte"
					/>
				</Container>

				<!-- Code and Pre -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Code & Preformatted</Text>
					<Text class="text-sm text-neutral-500"
						>Perfect for technical documentation or data display.</Text
					>
					<Container class="rounded-lg border p-6 dark:border-neutral-700">
						<Text type="code">const fluid = 'awesome';</Text>
						<Text type="pre" class="mt-2 text-xs">
							{`{
  "library": "fluid-ui",
  "framework": "svelte"
}`}
						</Text>
					</Container>
					<CodeBlock
						code={`<Text type="code">const fluid = 'awesome';</Text>
<Text type="pre">{"{...}"}</Text>`}
						language="svelte"
					/>
				</Container>

				<!-- Semantic Extras -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Semantic Markers</Text>
					<Text class="text-sm text-neutral-500"
						>Support for deleted, inserted, sub and superscript.</Text
					>
					<Container class="rounded-lg border p-6 dark:border-neutral-700">
						<Text>
							<Text type="del">Old price</Text>
							<Text type="ins">New price</Text>
						</Text>
						<Text class="mt-2">
							H<Text type="sub">2</Text>O and E = mc<Text type="sup">2</Text>
						</Text>
					</Container>
					<CodeBlock
						code={`<Text type="del">Old</Text> <Text type="ins">New</Text>
<Text>H<Text type="sub">2</Text>O</Text>`}
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
  import { Text } from 'fluid-ui-svelte';
<\/script>

<Text type="h1">Hello World</Text>
<Text>Standard paragraph text.</Text>`}
			/>
		</Container>
	</Container>
</Page>
