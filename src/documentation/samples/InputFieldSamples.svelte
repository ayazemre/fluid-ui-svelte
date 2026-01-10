<script lang="ts">
	import { InputField, Container, Text } from '$lib/base/index.js';
	import { CodeBlock } from '$lib/components/index.js';
	import { codeBlockContents } from './codeBlockContents.js';

	let textValue = $state('');
	let passwordValue = $state('');
	let numericValue = $state('');
	let errorValue = $state('invalid-email@');
</script>

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
			code={codeBlockContents.inputBasic}
			language="svelte"
		/>
	</Container>

	<!-- Password -->
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Password</Text>
		<Text class="text-sm text-neutral-500"
			>Secure entry for passwords and sensitive data.</Text
		>
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
			code={codeBlockContents.inputPassword}
			language="svelte"
		/>
	</Container>

	<!-- Numeric Filter -->
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Numeric Only</Text>
		<Text class="text-sm text-neutral-500"
			>Using characterFilter to restrict input to digits.</Text
		>
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
			code={codeBlockContents.inputNumeric}
			language="svelte"
		/>
	</Container>

	<!-- Error State -->
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Error State</Text>
		<Text class="text-sm text-neutral-500"
			>Applying custom error styling for validation feedback.</Text
		>
		<Container class="rounded-lg border p-6 dark:border-neutral-700">
			<InputField
				class="fluid-input-field-error w-full"
				placeholder="Error styling"
				bind:value={errorValue}
			/>
			<Text class="mt-2 text-sm text-neutral-500">Value: {errorValue}</Text>
		</Container>
		<CodeBlock
			code={codeBlockContents.inputError}
			language="svelte"
		/>
	</Container>
</Container>