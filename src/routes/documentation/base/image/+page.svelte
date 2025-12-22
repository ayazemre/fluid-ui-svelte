<script lang="ts">
	import { Image, Container, Text, Table, List, Link } from '$lib/base/index.js';
	import { Page, CodeBlock } from '$lib/components/index.js';

	const headers = ['Prop', 'Type', 'Default', 'Description'];

	const propsDataRaw = [
		{
			prop: 'src',
			type: 'string',
			default: 'required',
			description: 'The image source URL.'
		},
		{
			prop: 'alt',
			type: 'string',
			default: 'required',
			description: 'Alternative text for the image.'
		},
		{
			prop: 'class',
			type: 'string',
			default: "''",
			description: 'CSS classes to apply to the image.'
		},
		{
			prop: 'overrideDefaultStyling',
			type: 'boolean',
			default: 'false',
			description: 'If true, removes the base fluid-image class.'
		},
		{
			prop: '...rest',
			type: 'HTMLImgAttributes',
			default: '—',
			description: 'Standard HTML <img> attributes.'
		}
	];

	const tableRows = propsDataRaw.map((p) => [
		{ value: p.prop, col: 'prop' },
		{ value: p.type, col: 'type' },
		{ value: p.default, col: 'default' },
		{ value: p.description, col: 'desc' }
	]);

	let delayedSrc = $state('');
	$effect(() => {
		const timer = setTimeout(() => {
			delayedSrc = `https://picsum.photos/500/300?random=${Math.random()}`;
		}, 3000);
		return () => clearTimeout(timer);
	});
</script>

<Page
	title="Image - Fluid UI"
	description="The Image component is a wrapper for the native HTML <img> tag, with built-in styling for loading states."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Image</Text>
			<Text>
				The Image component is a simple wrapper around the standard HTML <Text type="code"
					>{'<img>'}</Text
				>
				tag. It automatically applies a <Text type="code">fluid-image-loading</Text> class while the image
				is loading, which allows for easy implementation of loading states like skeletons or shimmer effects.
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
			<Text>
				The Image component uses internal state to manage the loading class. Wrapping it in a
				container with deterministic dimensions ensures a smooth transition between the loading
				placeholder and the final image.
			</Text>

			<Container class="grid grid-cols-1 gap-8 md:grid-cols-2">
				<!-- Default Image -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Standard Image</Text>
					<Text class="text-sm text-neutral-500"
						>Renders a standard image immediately without any artificial delay applied.</Text
					>
					<Container class="rounded-lg border p-6 dark:border-neutral-700">
						<Container class="h-48 w-full overflow-hidden rounded-lg">
							<Image
								src="https://picsum.photos/id/1018/500/300"
								alt="Nature scene"
								class="h-full w-full object-cover!"
							/>
						</Container>
					</Container>
					<CodeBlock
						code={`<Container class="h-48 w-full overflow-hidden rounded-lg">
  <Image
    src="https://picsum.photos/id/1018/500/300"
    alt="Nature scene"
    class="h-full w-full object-cover"
  />
</Container>`}
						language="svelte"
					/>
				</Container>

				<!-- Placeholder / Loading Example -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Loading State Demo</Text>
					<Text class="text-sm text-neutral-500"
						>This example has a manual 3-second delay to showcase the skeleton effect.</Text
					>
					<Container class="rounded-lg border p-6 dark:border-neutral-700">
						<Container class="h-48 w-full overflow-hidden rounded-lg">
							<Image
								src={delayedSrc}
								alt="Delayed loading example"
								class="h-full w-full object-cover!"
							/>
						</Container>
					</Container>
					<CodeBlock
						code={`<!-- The src is populated after a delay to demonstrate 
     the built-in skeleton loading effect -->
<Image
  src={delayedSrc}
  alt="Delayed Image"
  class="h-full w-full object-cover!"
/>`}
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
  import { Image, Container } from 'fluid-ui-svelte';
<\/script>

<Container class="h-64 w-full overflow-hidden rounded-lg">
  <Image
    src="https://picsum.photos/600/900"
    alt="A beautiful landscape"
    class="h-full w-full object-cover"
  />
</Container>`}
			/>
		</Container>
	</Container>
</Page>
