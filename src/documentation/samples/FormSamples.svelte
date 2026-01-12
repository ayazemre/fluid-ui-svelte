<script lang="ts">
	import { Form, InputField, Button, Container, Text } from '$lib/base';
	import { CodeBlock } from '$lib/components';
	import { codeBlockContents } from './codeBlockContents.js';

	let username = $state('');
</script>

<Container class="flex flex-col gap-12">
	<!-- Basic Form -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-lg font-semibold">Basic Form</Text>
		<Text class="text-sm text-neutral-500">
			A standard form wrapper that automatically handles <Text type="code">preventDefault</Text> on
			submission.
		</Text>

		<Container class="rounded-lg border p-6 dark:border-neutral-700">
			<Form class="gap-4">
				<Container class="flex flex-col gap-2">
					<Text type="span" class="text-sm font-medium">Username</Text>
					<InputField bind:value={username} placeholder="Enter username" />
				</Container>

				<Button
					type="submit"
					class="fluid-button-primary"
					onclick={async (event, buttonState) => {
						buttonState.inProgress = !buttonState.inProgress;
						await new Promise((resolve) => setTimeout(resolve, 1000));
						buttonState.inProgress = !buttonState.inProgress;
					}}
				>
					{#snippet loadingPlaceholder()}
						<span>Submitting...</span>
					{/snippet}
					Submit
				</Button>
			</Form>
		</Container>

		<CodeBlock code={codeBlockContents.formBasic} language="svelte" />
	</Container>
</Container>
