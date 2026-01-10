<script lang="ts">
	import { Table, Container, Text } from '$lib/base/index.js';
	import { CodeBlock } from '$lib/components/index.js';
	import { codeBlockContents } from './codeBlockContents.js';

	interface User {
		id: number;
		name: string;
		age: number;
	}

	const headers = ['ID', 'Name', 'Age'];
	const users: Array<Array<any>> = [
		[1, 'Alice', 30],
		[2, 'Bob', 24],
		[3, 'Charlie', 35]
	];
	const footers = ['Total', '', '3 Users'];
</script>

<Container class="grid grid-cols-1 gap-8 md:grid-cols-2">
	<!-- Basic Table -->
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Standard Table</Text>
		<Text class="text-sm text-neutral-500">A basic table with header, body, and footer.</Text>
		<Container class="rounded-lg border p-6 dark:border-neutral-700">
			<Table
				caption="User Directory"
				tableHeadItems={headers}
				tableRowItems={users}
				tableFooterItems={footers}
			>
				{#snippet headTemplate(item: string)}
					{item}
				{/snippet}
				{#snippet bodyTemplate(item: any)}
					{item}
				{/snippet}
				{#snippet footerTemplate(item: string)}
					<span class="font-bold">{item}</span>
				{/snippet}
			</Table>
		</Container>
		<CodeBlock
			code={codeBlockContents.tableStandard}
			language="svelte"
		/>
	</Container>

	<!-- Custom Styled -->
	<Container class="flex flex-col gap-2">
		<Text type="h3" class="text-lg font-semibold">Styled Table</Text>
		<Text class="text-sm text-neutral-500"
			>Applying custom classes to specific table sections.</Text
		>
		<Container class="rounded-lg border p-6 dark:border-neutral-700">
			<Table
				tableHeadItems={headers}
				tableRowItems={users}
				tableFooterItems={[]}
				headClass="bg-primary-500 text-white"
				rowClass="hover:bg-neutral-100 dark:hover:bg-neutral-800"
				cellClass="p-2 border-b dark:border-neutral-700"
			>
				{#snippet headTemplate(item: string)}
					{item}
				{/snippet}
				{#snippet bodyTemplate(item: any)}
					{item}
				{/snippet}
				{#snippet footerTemplate()}
					<div></div>
				{/snippet}
			</Table>
		</Container>
		<CodeBlock
			code={codeBlockContents.tableStyled}
			language="svelte"
		/>
	</Container>
</Container>