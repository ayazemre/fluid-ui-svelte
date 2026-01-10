<script lang="ts">
	import { componentRegistry } from '../../../../documentation/registry.js';
	import { Container, Text, Table } from '$lib/base/index.js';
	import { Page } from '$lib/components/index.js';

	let { data } = $props();

	// Retrieve the non-serializable sample component from the registry

	let SampleComponent = $derived(
		// @ts-ignore
		componentRegistry[data.category][data.slug].sampleComponent
	);

	const headers = ['Prop', 'Type', 'Default', 'Description'];

	// Prepare the rows for the props table
	const tableRows = $derived(
		data.props.map((p: any) => [
			{ value: p.prop, col: 'prop' },
			{ value: p.type, col: 'type' },
			{ value: p.default, col: 'default' },
			{ value: p.description, col: 'desc' }
		])
	);
</script>

<Page title={data.title} description={data.description}>
	<Container class="flex flex-col gap-8">
		<!-- Header -->
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">{data.title.replace('Fluid UI - ', '')}</Text>
			<Text>
				{data.description}
			</Text>
		</Container>

		<!-- Props Table -->
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

				{#snippet bodyTemplate(item: { value: string; col: string })}
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

		<!-- Samples -->
		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Samples</Text>
			<SampleComponent />
		</Container>
	</Container>
</Page>
