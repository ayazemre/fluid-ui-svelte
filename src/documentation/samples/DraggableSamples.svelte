<script lang="ts">
	import { Draggable, CodeBlock } from '$lib/components';
	import { Container, Text } from '$lib/base';
	import { codeBlockContents } from './codeBlockContents';

	let dragStatus = $state('Drag something!');
</script>

<Container class="flex flex-col gap-12">
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-lg font-semibold">Barebone Draggable</Text>
		<Text class="text-sm text-neutral-500">
			A simple wrapper that makes elements draggable. You handle the data transfer in the
			ondragstart event.
		</Text>

		<Container class="documentation-preview flex items-center gap-4">
			<Draggable
				ondragstart={(e) => {
					e.dataTransfer?.setData('text/plain', 'Custom Data');
					dragStatus = 'Dragging...';
				}}
			>
				<Container class="w-32 rounded bg-primary-500 p-4 text-center text-white shadow-md">
					Drag Me
				</Container>
			</Draggable>
			<Text class="font-mono text-sm text-neutral-400 italic">{dragStatus}</Text>
		</Container>

		<CodeBlock code={codeBlockContents.draggableBasic} language="svelte" />
	</Container>
</Container>
