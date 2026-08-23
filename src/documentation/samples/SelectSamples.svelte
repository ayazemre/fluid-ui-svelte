<script lang="ts">
	import { Container, Select, Text } from '$lib/base';
	import { CodeBlock } from '$lib/components';
	import { codeBlockContents } from './codeBlockContents';

	let selected = $state('svelte');

	const frameworkOptions = [
		{ value: 'svelte', label: 'Svelte 5' },
		{ value: 'react', label: 'React' },
		{ value: 'vue', label: 'Vue' },
		{ value: 'angular', label: 'Angular', disabled: true }
	];
</script>

<Container class="flex flex-col gap-6">
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Standard Select</Text>
		<Container class="flex max-w-xs flex-col gap-3">
			<Select bind:value={selected} options={frameworkOptions} placeholder="Choose framework..." />
			<Text type="p" class="text-xs text-content-muted">
				Selected: <Text type="span" class="font-semibold text-content">{selected}</Text>
			</Text>
		</Container>
		<Container class="mt-4">
			<CodeBlock code={codeBlockContents.selectBasic} language="svelte" />
		</Container>
	</Container>
</Container>
