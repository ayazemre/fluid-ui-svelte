<script lang="ts">
	import { Container, Text } from '$lib/base/index.js';
	import { CodeBlock } from '$lib/components/index.js';
	import { codeBlockContents } from './codeBlockContents.js';
</script>

<Container class="grid grid-cols-1 gap-8 md:grid-cols-2">
	<!-- Header Container -->
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Header</Text>
		<Container class="flex flex-col gap-4 rounded-lg border p-6 dark:border-neutral-700">
			<Container
				type="header"
				overrideDefaultStyling
				class="rounded bg-primary-100 p-4 text-center dark:bg-primary-900"
			>
				<Text type="h3" class="text-primary-900 dark:text-primary-100">Header Content</Text>
			</Container>
		</Container>
		<CodeBlock
			code={codeBlockContents.containerHeader}
			language="svelte"
		/>
	</Container>

	<!-- Nav Container -->
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Navigation</Text>
		<Container class="flex flex-col gap-4 rounded-lg border p-6 dark:border-neutral-700">
			<Container
				type="nav"
				overrideDefaultStyling
				class="rounded bg-secondary-100 p-4 text-center dark:bg-secondary-900"
			>
				<Text class="text-secondary-900 dark:text-secondary-100">Navigation Content</Text>
			</Container>
		</Container>
		<CodeBlock
			code={codeBlockContents.containerNav}
			language="svelte"
		/>
	</Container>

	<!-- Section Container -->
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Section</Text>
		<Container class="flex flex-col gap-4 rounded-lg border p-6 dark:border-neutral-700">
			<Container
				type="section"
				overrideDefaultStyling
				class="rounded bg-info-100 p-4 text-center dark:bg-info-900"
			>
				<Text class="text-info-900 dark:text-info-100">Section Content</Text>
			</Container>
		</Container>
		<CodeBlock
			code={codeBlockContents.containerSection}
			language="svelte"
		/>
	</Container>

	<!-- Footer Container -->
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Footer</Text>
		<Container class="flex flex-col gap-4 rounded-lg border p-6 dark:border-neutral-700">
			<Container
				type="footer"
				overrideDefaultStyling
				class="rounded bg-warning-100 p-4 text-center dark:bg-warning-900"
			>
				<Text class="text-warning-900 dark:text-warning-100">Footer Content</Text>
			</Container>
		</Container>
		<CodeBlock
			code={codeBlockContents.containerFooter}
			language="svelte"
		/>
	</Container>
</Container>