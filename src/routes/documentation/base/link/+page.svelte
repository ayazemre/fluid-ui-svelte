<script lang="ts">
	import { Link, Container, Text, Table } from '$lib/base/index.js';
	import { Page, CodeBlock } from '$lib/components/index.js';

	const headers = ['Prop', 'Type', 'Default', 'Description'];

	const propsData = [
		{
			prop: 'href',
			type: 'string',
			default: 'required',
			description: 'The destination URL or path.'
		},
		{
			prop: 'children',
			type: 'Snippet',
			default: 'required',
			description: 'The content to be rendered inside the link.'
		},
		{
			prop: 'class',
			type: 'string',
			default: "''",
			description: 'CSS classes to apply to the link.'
		},
		{
			prop: 'overrideDefaultStyling',
			type: 'boolean',
			default: 'false',
			description: 'If true, removes the base fluid-link class.'
		},
		{
			prop: '...rest',
			type: 'HTMLAnchorAttributes',
			default: '—',
			description: 'Standard HTML <a> attributes.'
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
	title="Link - Fluid UI"
	description="A standard anchor wrapper styled for Fluid UI, supporting client-side navigation in SvelteKit."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Link</Text>
			<Text>
				The Link component is a simple wrapper around the standard HTML <Text type="code"
					>{'<a>'}</Text
				>
				tag. It applies consistent styling while maintaining all native anchor functionality, ensuring
				compatibility with SvelteKit's built-in client-side routing.
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

				{#snippet footerTemplate(item)}
					<Container overrideDefaultStyling={true} />
				{/snippet}
			</Table>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Samples</Text>

			<Container class="grid grid-cols-1 gap-8 md:grid-cols-2">
				<!-- Default Link -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Standard Link</Text>
					<Text class="text-sm text-neutral-500">A basic link with default fluid styling.</Text>
					<Container class="rounded-lg border p-6 dark:border-neutral-700">
						<Link href="/documentation/base/button">Navigate to Button</Link>
					</Container>
					<CodeBlock
						code={`<Link href="/documentation/base/button">
  Navigate to Button
</Link>`}
						language="svelte"
					/>
				</Container>

				<!-- Custom Styled -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Custom Styled</Text>
					<Text class="text-sm text-neutral-500">A link with additional Tailwind utility classes.</Text>
					<Container class="rounded-lg border p-6 dark:border-neutral-700">
						<Link href="/documentation/base/image" class="font-bold text-primary-600 uppercase">
							Bold Primary Link
						</Link>
					</Container>
					<CodeBlock
						code={`<Link 
  href="/documentation/base/image" 
  class="font-bold text-primary-600 uppercase"
>
  Bold Primary Link
</Link>`}
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
  import { Link } from 'fluid-ui-svelte';
<\/script>

<Link href="/home">Go Home</Link>
<Link href="https://google.com" target="_blank">External Link</Link>`}
			/>
		</Container>
	</Container>
</Page>