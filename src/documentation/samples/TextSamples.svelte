<script lang="ts">
	import { Text, Container } from '$lib/base/index.js';
	import { CodeBlock } from '$lib/components/index.js';
	import { codeBlockContents } from './codeBlockContents.js';
</script>

<Container class="grid grid-cols-1 gap-8 md:grid-cols-2">
	<!-- Headings -->
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Semantic Headings</Text>
		<Text class="text-sm text-neutral-500">Render various heading levels using the type prop.</Text>
		<Container class="rounded-lg border p-6 dark:border-neutral-700">
			<Text type="h1" class="text-2xl font-bold">Heading 1</Text>
			<Text type="h2" class="text-xl font-semibold">Heading 2</Text>
			<Text type="h3" class="text-lg font-medium">Heading 3</Text>
		</Container>
		<CodeBlock
			code={codeBlockContents.textHeadings}
			language="svelte"
		/>
	</Container>

	<!-- Inline Styles -->
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Inline Emphasis</Text>
		<Text class="text-sm text-neutral-500"
			>Use semantic tags for bold, italic, or highlighted text.</Text
		>
		<Container class="rounded-lg border p-6 dark:border-neutral-700">
			<Text>
				This is <Text type="strong">bold</Text>, <Text type="em">italic</Text>, and
				<Text type="mark">highlighted</Text>.
			</Text>
		</Container>
		<CodeBlock
			code={codeBlockContents.textInline}
			language="svelte"
		/>
	</Container>

	<!-- Code and Pre -->
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Code & Preformatted</Text>
		<Text class="text-sm text-neutral-500"
			>Perfect for technical documentation or data display.</Text
		>
		<Container class="rounded-lg border p-6 dark:border-neutral-700">
			<Text type="code">const fluid = 'awesome';</Text>
			<Text type="pre" class="mt-2 text-xs">
				{`{
"library": "fluid-ui",
"framework": "svelte"
}`}
			</Text>
		</Container>
		<CodeBlock
			code={codeBlockContents.textCode}
			language="svelte"
		/>
	</Container>

	<!-- Semantic Extras -->
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Semantic Markers</Text>
		<Text class="text-sm text-neutral-500"
			>Support for deleted, inserted, sub and superscript.</Text
		>
		<Container class="rounded-lg border p-6 dark:border-neutral-700">
			<Text>
				<Text type="del">Old price</Text>
				<Text type="ins">New price</Text>
			</Text>
			<Text class="mt-2">
				H<Text type="sub">2</Text>O and E = mc<Text type="sup">2</Text>
			</Text>
		</Container>
		<CodeBlock
			code={codeBlockContents.textSemantic}
			language="svelte"
		/>
	</Container>
</Container>