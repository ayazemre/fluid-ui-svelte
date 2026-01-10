<script lang="ts">
	import { CodeBlock } from '$lib/components/index.js';
	import { Container, Text } from '$lib/base/index.js';
	import { codeBlockContents } from './codeBlockContents.js';
</script>

<Container class="flex flex-col gap-4">
	<Text>Here is an example of the CodeBlock component.</Text>
	<Container class="flex flex-col gap-4 rounded-lg border p-4">
		<CodeBlock
			language="svelte"
			code={codeBlockContents.codeBlockExample}
		/>
	</Container>
</Container>