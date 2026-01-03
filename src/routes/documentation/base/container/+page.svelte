<script lang="ts">
	import { Container, Text, Table, List, Link } from '$lib/base/index.js';
	import { Page, CodeBlock } from '$lib/components/index.js';

	const headers = ['Prop', 'Type', 'Default', 'Description'];

	const propsDataRaw = [
		{
			prop: 'type',
			type: "'div' | 'nav' | 'section' | 'main' | 'header' | 'footer' | 'aside' | 'article'",
			default: "'div'",
			description: 'The HTML element tag to render.'
		},
		{
			prop: 'class',
			type: 'string',
			default: "''",
			description: 'CSS classes to apply to the container.'
		},
		{
			prop: 'overrideDefaultStyling',
			type: 'boolean',
			default: 'false',
			description: 'If true, removes the base fluid-container class.'
		},
		{
			prop: 'transitionFn',
			type: 'Function',
			default: 'undefined',
			description: 'Svelte transition function.'
		},
		{
			prop: 'transitionParams',
			type: 'object',
			default: 'undefined',
			description: 'Parameters for the transition function.'
		},
		{
			prop: '...rest',
			type: 'HTMLAttributes',
			default: '—',
			description: 'Standard HTML attributes.'
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
	title="Fluid UI - Container"
	description="The Container component is a versatile wrapper for layout and styling, rendering as different HTML5 semantic elements."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Container</Text>
			<Text>
				The Container component is a fundamental building block for creating layouts. It acts as a
				versatile wrapper that can render as various HTML5 semantic elements like <Text type="code"
					>div</Text
				>, <Text type="code">section</Text>, <Text type="code">nav</Text>, and more, helping you
				structure your application with semantic meaning.
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
				{#snippet headTemplate(item)}
					<Text class="p-2 font-bold">{item}</Text>
				{/snippet}

				{#snippet bodyTemplate(item)}
					<div class="p-2">
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
					</div>
				{/snippet}

				{#snippet footerTemplate(item)}
					<div></div>
				{/snippet}
			</Table>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Samples</Text>
			<Text>
				Here are some examples of how you can use the Container component with different semantic
				elements.
			</Text>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
				<!-- Header Container -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Header</Text>
					<Container class="flex flex-col gap-4 rounded-lg border p-6 dark:border-neutral-700">
						<Container
							type="header"
							overrideDefaultStyling
							class="rounded bg-primary-100 p-4 text-center dark:bg-primary-900"
						>
							<Text type="h3" class="text-primary-900 dark:text-primary-100">Header Content</Text>
						</Container>
					</Container>
					<CodeBlock
						code={`<Container type="header" class="bg-primary-100 p-4">
  <Text>Header Content</Text>
</Container>`}
						language="svelte"
					/>
				</Container>

				<!-- Nav Container -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Navigation</Text>
					<Container class="flex flex-col gap-4 rounded-lg border p-6 dark:border-neutral-700">
						<Container
							type="nav"
							overrideDefaultStyling
							class="rounded bg-secondary-100 p-4 text-center dark:bg-secondary-900"
						>
							<Text class="text-secondary-900 dark:text-secondary-100">Navigation Content</Text>
						</Container>
					</Container>
					<CodeBlock
						code={`<Container type="nav" class="bg-secondary-100 p-4">
  <Text>Navigation Content</Text>
</Container>`}
						language="svelte"
					/>
				</Container>

				<!-- Section Container -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Section</Text>
					<Container class="flex flex-col gap-4 rounded-lg border p-6 dark:border-neutral-700">
						<Container
							type="section"
							overrideDefaultStyling
							class="rounded bg-info-100 p-4 text-center dark:bg-info-900"
						>
							<Text class="text-info-900 dark:text-info-100">Section Content</Text>
						</Container>
					</Container>
					<CodeBlock
						code={`<Container type="section" class="bg-info-100 p-4">
  <Text>Section Content</Text>
</Container>`}
						language="svelte"
					/>
				</Container>

				<!-- Footer Container -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Footer</Text>
					<Container class="flex flex-col gap-4 rounded-lg border p-6 dark:border-neutral-700">
						<Container
							type="footer"
							overrideDefaultStyling
							class="rounded bg-warning-100 p-4 text-center dark:bg-warning-900"
						>
							<Text class="text-warning-900 dark:text-warning-100">Footer Content</Text>
						</Container>
					</Container>
					<CodeBlock
						code={`<Container type="footer" class="bg-warning-100 p-4">
  <Text>Footer Content</Text>
</Container>`}
						language="svelte"
					/>
				</Container>
			</div>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Usage</Text>
			<CodeBlock
				language="svelte"
				code={`<script lang="ts">
  import { Container, Text } from 'fluid-ui-svelte/base';
<\/script>

<Container type="section" class="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
  <Text type="h3">This is a section</Text>
  <Text>You can place any content inside a container.</Text>
</Container>`}
			/>
		</Container>
	</Container>
</Page>
