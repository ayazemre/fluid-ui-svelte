<script lang="ts">
	import { Button, Container, Text } from '$lib/base';
	import { Spinner, CodeBlock } from '$lib/components';
	import { codeBlockContents } from './codeBlockContents';
</script>

<Container class="flex flex-col gap-8">
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Spinner Sizes</Text>
		<Container class="flex items-center gap-6">
			<Spinner size="sm" />
			<Spinner size="md" />
			<Spinner size="lg" />
			<Spinner size="xl" />
		</Container>
		<Container class="mt-4">
			<CodeBlock code={codeBlockContents.spinnerSizes} language="svelte" />
		</Container>
	</Container>

	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Inside Buttons</Text>
		<Container class="flex items-center gap-3">
			<Button onclick={async () => {}} class="flex items-center gap-2">
				<Spinner size="sm" class="text-white" />
				<Text type="span">Submitting...</Text>
			</Button>
		</Container>
		<Container class="mt-4">
			<CodeBlock code={codeBlockContents.spinnerBasic} language="svelte" />
		</Container>
	</Container>
</Container>
