<script lang="ts">
	import { Container, Text } from '$lib/base';
	import { Combobox, CodeBlock } from '$lib/components';
	import { codeBlockContents } from './codeBlockContents';

	let singleValue = $state('svelte');
	let multiValue = $state(['svelte', 'tailwind']);

	const techOptions = [
		{ value: 'svelte', label: 'Svelte 5' },
		{ value: 'tailwind', label: 'Tailwind CSS 4' },
		{ value: 'typescript', label: 'TypeScript' },
		{ value: 'vite', label: 'Vite' },
		{ value: 'vitest', label: 'Vitest' },
		{ value: 'nodejs', label: 'Node.js' }
	];
</script>

<Container class="flex flex-col gap-8">
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Single Select Combobox</Text>
		<Container class="flex max-w-xs flex-col gap-2">
			<Combobox
				bind:value={singleValue}
				options={techOptions}
				placeholder="Search technology..."
				searchPlaceholder="Type to filter..."
			/>
			<Text type="p" class="text-xs text-content-muted">
				Selected: <Text type="span" class="font-semibold text-content">{singleValue}</Text>
			</Text>
		</Container>
		<Container class="mt-4">
			<CodeBlock code={codeBlockContents.comboboxBasic} language="svelte" />
		</Container>
	</Container>

	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Multi-Select Combobox</Text>
		<Container class="flex max-w-xs flex-col gap-2">
			<Combobox
				bind:value={multiValue}
				options={techOptions}
				multiple
				placeholder="Select multiple tags..."
				searchPlaceholder="Filter tags..."
			/>
			<Text type="p" class="text-xs text-content-muted">
				Selected ({multiValue.length}): <Text type="span" class="font-semibold text-content"
					>{multiValue.join(', ') || 'None'}</Text
				>
			</Text>
		</Container>
		<Container class="mt-4">
			<CodeBlock code={codeBlockContents.comboboxMultiple} language="svelte" />
		</Container>
	</Container>
</Container>
