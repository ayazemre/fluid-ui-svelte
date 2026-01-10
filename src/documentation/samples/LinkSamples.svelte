<script lang="ts">
	import { Link, Container, Text } from '$lib/base/index.js';
	import { CodeBlock } from '$lib/components/index.js';
	import { codeBlockContents } from './codeBlockContents.js';
</script>

<Container class="grid grid-cols-1 gap-8 md:grid-cols-2">
	<!-- Default Link -->
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Standard Link</Text>
		<Text class="text-sm text-neutral-500">A basic link with default fluid styling.</Text>
		<Container class="rounded-lg border p-6 dark:border-neutral-700">
			<Link href="/documentation/base/button">Navigate to Button</Link>
		</Container>
		<CodeBlock
			code={codeBlockContents.linkStandard}
			language="svelte"
		/>
	</Container>

	<!-- Custom Styled -->
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Custom Styled</Text>
		<Text class="text-sm text-neutral-500"
			>A link with additional Tailwind utility classes.</Text
		>
		<Container class="rounded-lg border p-6 dark:border-neutral-700">
			<Link href="/documentation/base/image" class="font-bold text-primary-600 uppercase">
				Bold Primary Link
			</Link>
		</Container>
		<CodeBlock
			code={codeBlockContents.linkCustom}
			language="svelte"
		/>
	</Container>
</Container>