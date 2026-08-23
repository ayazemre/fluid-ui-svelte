<script lang="ts">
	import { Container, Text } from '$lib/base';
	import { PinInput, CodeBlock } from '$lib/components';
	import { codeBlockContents } from './codeBlockContents';

	let pinCode = $state('');
	let completedCode = $state('');
</script>

<Container class="flex flex-col gap-6">
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">6-Digit Verification Code</Text>
		<Container class="flex flex-col gap-3">
			<PinInput
				bind:value={pinCode}
				length={6}
				onComplete={(code) => {
					completedCode = code;
				}}
			/>
			<Text type="p" class="text-xs text-content-muted">
				Current Value: <Text type="span" class="font-mono font-medium text-content"
					>{pinCode || 'Empty'}</Text
				>
				{#if completedCode}
					&bull; <Text type="span" class="font-semibold text-success-600"
						>Completed: {completedCode}</Text
					>
				{/if}
			</Text>
		</Container>
		<Container class="mt-4">
			<CodeBlock code={codeBlockContents.pinInputBasic} language="svelte" />
		</Container>
	</Container>
</Container>
