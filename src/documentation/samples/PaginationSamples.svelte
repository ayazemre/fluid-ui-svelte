<script lang="ts">
	import { Pagination } from '$lib/components';
	import { Container, Text } from '$lib/base';
	import { CodeBlock } from '$lib/components';
	import { codeBlockContents } from './codeBlockContents';

	let currentPage = $state(1);
</script>

<Container class="flex flex-col gap-10">
	<Container class="flex flex-col gap-2">
		<Text type="h1">Pagination Samples</Text>
		<Text class="text-neutral-500">A component for navigating through a series of related content across multiple pages.</Text>
	</Container>

	<!-- 1. Basic Pagination -->
	<Container class="flex flex-col gap-4">
		<Text type="h3" class="text-xl font-bold">1. Basic Pagination</Text>
		<Text class="text-neutral-500">Standard pagination with page numbers and navigation buttons.</Text>
		<Container class="w-full rounded-xl border p-6 dark:border-neutral-800">
			<Pagination bind:currentPage totalPages={5} />
			<Text class="mt-4">Current Page: {currentPage}</Text>
		</Container>
		<CodeBlock code={codeBlockContents.paginationBasic} language="svelte" />
	</Container>
</Container>
