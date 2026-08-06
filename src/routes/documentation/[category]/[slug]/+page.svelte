<script lang="ts">
	import { componentRegistry } from '../../../../documentation/registry.js';
	import { Container, Text, Table, Link } from '$lib/base';
	import { Page } from '$lib/components';
	import Icon from '@iconify/svelte';

	let { data } = $props();

	const toRegistryEntries = (registryGroup: Record<string, { title: string }>, category: string) =>
		Object.entries(registryGroup)
			.map(([slug, registryEntry]) => ({
				name: registryEntry.title.replace('Fluid UI - ', ''),
				category,
				url: `/documentation/${category}/${slug}`
			}))
			.sort((first, second) => first.name.localeCompare(second.name));

	const registryOrder = [
		...toRegistryEntries(componentRegistry.base, 'base'),
		...toRegistryEntries(componentRegistry.components, 'components')
	];

	const currentPosition = $derived(
		registryOrder.findIndex(
			(registryEntry) => registryEntry.url === `/documentation/${data.category}/${data.slug}`
		)
	);
	const previousEntry = $derived(
		currentPosition > 0 ? registryOrder[currentPosition - 1] : undefined
	);
	const nextEntry = $derived(
		currentPosition >= 0 && currentPosition < registryOrder.length - 1
			? registryOrder[currentPosition + 1]
			: undefined
	);

	let SampleComponent = $derived(
		// @ts-ignore
		componentRegistry[data.category][data.slug].sampleComponent
	);

	const headers = ['Prop', 'Type', 'Default', 'Description'];

	const tableRows = $derived(
		data.props.map((property: any) => [
			{ value: property.prop, column: 'prop' },
			{ value: property.type, column: 'type' },
			{ value: property.default, column: 'default' },
			{ value: property.description, column: 'description' }
		])
	);
</script>

<Page class="documentation-page" title={data.title} description={data.description}>
	<Container class="documentation-stack">
		<!-- Header -->
		<Container class="documentation-block">
			<Text class="documentation-label">{data.category}</Text>
			<Text type="h1" class="documentation-page-title">{data.title.replace('Fluid UI - ', '')}</Text
			>
			<Text class="documentation-lede">
				{data.description}
			</Text>
		</Container>

		<!-- Props Table -->
		<Container class="documentation-properties">
			<Text type="h2" class="documentation-subtitle">Props</Text>
			<Table tableHeadItems={headers} tableRowItems={tableRows} tableFooterItems={[]}>
				{#snippet headTemplate(item)}
					<Text class="documentation-table-heading">{item}</Text>
				{/snippet}

				{#snippet bodyTemplate(item: { value: string; column: string })}
					<Container overrideDefaultStyling={true} class="documentation-table-cell">
						{#if item.column === 'prop'}
							<Text type="code" class="documentation-property-name">{item.value}</Text>
						{:else if item.column === 'type'}
							<Text type="code" class="documentation-property-type">{item.value}</Text>
						{:else if item.column === 'default'}
							<Text type="code" class="documentation-property-default">{item.value}</Text>
						{:else}
							<Text class="documentation-property-description">{item.value}</Text>
						{/if}
					</Container>
				{/snippet}

				{#snippet footerTemplate()}
					<Container overrideDefaultStyling={true} />
				{/snippet}
			</Table>
		</Container>

		<!-- Samples -->
		<Container class="documentation-samples">
			<Text type="h2" class="documentation-subtitle">Samples</Text>
			<SampleComponent />
		</Container>

		<!-- Pager -->
		<Container type="nav" aria-label="Component" class="documentation-pager-grid">
			{#if previousEntry}
				<Link href={previousEntry.url} overrideDefaultStyling class="documentation-pager">
					<Text class="documentation-label documentation-pager-label">
						<Icon icon="ph:arrow-left" class="documentation-icon-tiny" aria-hidden="true" />
						Previous
					</Text>
					<Text class="documentation-pager-name">{previousEntry.name}</Text>
				</Link>
			{:else}
				<Container class="documentation-pager-spacer"></Container>
			{/if}

			{#if nextEntry}
				<Link
					href={nextEntry.url}
					overrideDefaultStyling
					class="documentation-pager documentation-pager-next"
				>
					<Text class="documentation-label documentation-pager-label">
						Next
						<Icon icon="ph:arrow-right" class="documentation-icon-tiny" aria-hidden="true" />
					</Text>
					<Text class="documentation-pager-name">{nextEntry.name}</Text>
				</Link>
			{/if}
		</Container>
	</Container>
</Page>
