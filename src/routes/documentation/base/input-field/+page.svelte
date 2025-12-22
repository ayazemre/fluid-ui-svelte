<script lang="ts">
	import { InputField, Container, Text, Table } from '$lib/base/index.js';
	import { Page, CodeBlock } from '$lib/components/index.js';

	const headers = ['Prop', 'Type', 'Default', 'Description'];

	const propsData = [
		{
			prop: 'value',
			type: 'string',
			default: "''",
			description: "The input's bound value."
		},
		{
			prop: 'type',
			type: "'text' | 'password'",
			default: "'text'",
			description: 'The type of the input field.'
		},
		{
			prop: 'characterFilter',
			type: 'string[]',
			default: 'undefined',
			description: 'Array of allowed characters. If set, other characters are rejected.'
		},
		{
			prop: 'class',
			type: 'string',
			default: "''",
			description: 'CSS classes to apply to the input.'
		},
		{
			prop: 'overrideDefaultStyling',
			type: 'boolean',
			default: 'false',
			description: 'If true, removes the base fluid-input-field class.'
		},
		{
			prop: '...rest',
			type: 'HTMLInputAttributes',
			default: '—',
			description: 'Standard HTML <input> attributes.'
		}
	];

	const tableRows = propsData.map((p) => [
		{ value: p.prop, col: 'prop' },
		{ value: p.type, col: 'type' },
		{ value: p.default, col: 'default' },
		{ value: p.description, col: 'desc' }
	]);

	let textValue = $state('');
	let passwordValue = $state('');
	let numericValue = $state('');
	let errorValue = $state('invalid-email@');
</script>

<Page
	title="Input Field - Fluid UI"
	description="A form input field component with support for character filtering and custom styling."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Input Field</Text>
			<Text>
				The Input Field component is an enhanced wrapper for the native HTML <Text type="code"
					>{'<input>'}</Text
				>
				element. It provides built-in functionality for real-time character filtering, making it easy
				to create inputs that only accept specific characters.
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
				<!-- Basic Text -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Basic Text</Text>
					<Text class="text-sm text-neutral-500">Standard text input with reactive binding.</Text>
					<Container class="rounded-lg border p-6 dark:border-neutral-700">
						<InputField placeholder="Enter your name" bind:value={textValue} class="w-full" />
						<Text class="mt-2 text-sm text-neutral-500">Value: {textValue}</Text>
					</Container>
					<CodeBlock
						code={`<InputField 
  placeholder="Enter your name" 
  bind:value={textValue} 
  class="w-full"
/>`}
						language="svelte"
					/>
				</Container>

				<!-- Password -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Password</Text>
					<Text class="text-sm text-neutral-500">Secure entry for passwords and sensitive data.</Text>
					<Container class="rounded-lg border p-6 dark:border-neutral-700">
						<InputField
							type="password"
							placeholder="Enter password"
							bind:value={passwordValue}
							class="w-full"
						/>
						<Text class="mt-2 text-sm text-neutral-500">Value: {passwordValue}</Text>
					</Container>
					<CodeBlock
						code={`<InputField
  type="password"
  placeholder="Enter password"
  bind:value={passwordValue}
  class="w-full"
/>`}
						language="svelte"
					/>
				</Container>

				<!-- Numeric Filter -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Numeric Only</Text>
					<Text class="text-sm text-neutral-500">Using characterFilter to restrict input to digits.</Text>
					<Container class="rounded-lg border p-6 dark:border-neutral-700">
						<InputField
							placeholder="Numbers only..."
							bind:value={numericValue}
							characterFilter={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
							class="w-full"
						/>
						<Text class="mt-2 text-sm text-neutral-500">Value: {numericValue}</Text>
					</Container>
					<CodeBlock
						code={`<InputField
  placeholder="Numbers only..."
  bind:value={numericValue}
  characterFilter={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
  class="w-full"
/>`}
						language="svelte"
					/>
				</Container>

				<!-- Error State -->
				<Container class="flex flex-col gap-2">
					<Text type="h3" class="text-lg font-semibold">Error State</Text>
					<Text class="text-sm text-neutral-500">Applying custom error styling for validation feedback.</Text>
					<Container class="rounded-lg border p-6 dark:border-neutral-700">
						<InputField
							class="w-full fluid-input-field-error"
							placeholder="Error styling"
							bind:value={errorValue}
						/>
						<Text class="mt-2 text-sm text-neutral-500">Value: {errorValue}</Text>
					</Container>
					<CodeBlock
						code={`<InputField
  class="w-full fluid-input-field-error"
  placeholder="Error styling"
  bind:value={errorValue}
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
  import { InputField } from 'fluid-ui-svelte';

  let value = '';
<\/script>

<InputField bind:value />`}
			/>
		</Container>
	</Container>
</Page>