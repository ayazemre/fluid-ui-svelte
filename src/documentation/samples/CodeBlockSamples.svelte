<script lang="ts">
	import { CodeBlock } from '$lib/components';
	import { Container, Text } from '$lib/base';
	import { codeBlockContents } from './codeBlockContents.js';
</script>

<Container class="flex flex-col gap-4">
	<Text>Here is an example of the CodeBlock component.</Text>
	<Container class="documentation-preview flex flex-col gap-4">
		<CodeBlock language="svelte" code={codeBlockContents.codeBlockExample} />
	</Container>
</Container>
