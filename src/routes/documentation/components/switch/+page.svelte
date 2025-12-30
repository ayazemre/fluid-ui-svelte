<script lang="ts">
	import { Switch, Page } from '$lib/index.js';
	import { Container, Text, Table } from '$lib/base/index.js';
	import { CodeBlock } from '$lib/components/index.js';

	const headers = ['Prop', 'Type', 'Default', 'Description'];
	const propsData = [
		{
			prop: 'onswitch',
			type: '(event: Event, checked: boolean) => Promise<void>',
			default: 'required',
			description: 'Callback function triggered when the switch is toggled.'
		},
		{
			prop: 'checked',
			type: 'boolean',
			default: 'false',
			description: 'The current state of the switch. Supports $bindable.'
		},
		{
			prop: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'If true, prevents user interaction.'
		},
		{
			prop: 'class',
			type: 'string',
			default: "''",
			description: 'Custom CSS classes for the switch button.'
		},
		{
			prop: '...rest',
			type: 'HTMLAttributes',
			default: '—',
			description: 'Standard button attributes (excluding onclick).'
		}
	];

	const tableRows = propsData.map((p) => [
		{ value: p.prop, col: 'prop' },
		{ value: p.type, col: 'type' },
		{ value: p.default, col: 'default' },
		{ value: p.description, col: 'desc' }
	]);

	let basicChecked = $state(false);
	let customChecked = $state(true);

	const handleSwitch = async (event: Event, checked: boolean) => {
		// Simulate an API call or async operation
		await new Promise((resolve) => setTimeout(resolve, 100));
		console.log('Switch toggled to:', !checked);
	};
</script>

<Page
	title="Fluid UI - Switch"
	description="A toggleable switch component built on top of the Button base element."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Switch</Text>
			<Text>
				The Switch component is a custom toggle button used to switch between two states. It is
				fully accessible, supporting ARIA roles and keyboard interactions.
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
			<Text type="h2" class="text-2xl font-semibold">Samples</Text>

			<Container class="grid grid-cols-1 gap-8 md:grid-cols-2">
				<!-- Basic Switch -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Basic Switch</Text>
					<Text class="text-sm text-neutral-500"
						>Standard toggle functionality with state binding.</Text
					>
					<Container class="rounded-lg border p-6 dark:border-neutral-700">
						<Container class="flex items-center gap-4">
							<Switch onswitch={handleSwitch} bind:checked={basicChecked} />
							<Text class="text-sm">Status: {basicChecked ? 'Enabled' : 'Disabled'}</Text>
						</Container>
					</Container>
					<CodeBlock
						code={`<script lang="ts">
  let checked = $state(false);
  const handleSwitch = async (e, state) => { /* ... */ };
<\/script>

<Switch onswitch={handleSwitch} bind:checked />`}
						language="svelte"
					/>
				</Container>

				<!-- Disabled State -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Disabled</Text>
					<Text class="text-sm text-neutral-500">A switch that cannot be interacted with.</Text>
					<Container class="rounded-lg border p-6 dark:border-neutral-700">
						<Container class="flex items-center gap-4">
							<Switch onswitch={handleSwitch} checked={true} disabled />
							<Text class="text-sm text-neutral-400">Locked (On)</Text>
						</Container>
					</Container>
					<CodeBlock
						code={`<Switch onswitch={handleSwitch} checked={true} disabled />`}
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
  import { Switch } from 'fluid-ui-svelte';

  let isToggled = $state(false);

  async function onToggle(event: Event, checked: boolean) {
    // Perform async task
  }
<\/script>

<Switch 
  bind:checked={isToggled} 
  onswitch={onToggle} 
/>`}
			/>
		</Container>
	</Container>
</Page>
