<script lang="ts">
	import { Switch, CodeBlock } from '$lib/components';
	import { Container, Text } from '$lib/base';
	import { codeBlockContents } from './codeBlockContents';

	let isChecked = $state(false);
</script>

<Container class="flex flex-col gap-12">
	<!-- Example 1: Basic Switch -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-lg font-semibold">Basic Usage</Text>
		<Text class="text-sm text-neutral-500">
			A standard toggle switch for boolean states.
		</Text>

		<Container class="flex items-center gap-4 rounded-lg border p-6 dark:border-neutral-700">
			<Switch
				bind:checked={isChecked}
				onclick={async () => {
					console.log('Switch toggled to:', isChecked);
				}}
			/>
			<Text class="text-sm font-medium uppercase text-neutral-500">
				Status: {isChecked ? 'Enabled' : 'Disabled'}
			</Text>
		</Container>

		<CodeBlock code={codeBlockContents.switchBasic} language="svelte" />
	</Container>

	<!-- Example 2: Disabled State -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-lg font-semibold">Disabled State</Text>
		<Text class="text-sm text-neutral-500">
			The switch can be disabled to prevent user interaction.
		</Text>

		<Container class="flex flex-col gap-4 rounded-lg border p-6 dark:border-neutral-700">
			<Container class="flex items-center gap-4">
				<Switch checked={false} disabled onclick={async () => {}} />
				<Text class="text-xs font-medium uppercase text-neutral-400">Off & Disabled</Text>
			</Container>
			<Container class="flex items-center gap-4">
				<Switch checked={true} disabled onclick={async () => {}} />
				<Text class="text-xs font-medium uppercase text-neutral-400">On & Disabled</Text>
			</Container>
		</Container>

		<CodeBlock code={codeBlockContents.switchDisabled} language="svelte" />
	</Container>
</Container>
