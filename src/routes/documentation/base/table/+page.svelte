<script lang="ts">
	import Table from '$lib/base/Table.svelte';
	import Text from '$lib/base/Text.svelte';
	import { Page } from '$lib/components/index.js';

	const tableData = {
		head: [
			{ type: 0, data: 'A' },
			{ type: 1, data: 'B' },
			{ type: 2, data: 'C' }
		],
		rows: [
			[
				{ type: 2, data: 'Mr' },
				{ type: 2, data: 'Mr' },
				{ type: 2, data: 'Mr' }
			],
			[
				{ type: 2, data: 'Mr' },
				{ type: 2, data: 'Mr' },
				{ type: 2, data: 'Mr' }
			],
			[
				{ type: 2, data: 'Mr' },
				{ type: 2, data: 'Mr' },
				{ type: 2, data: 'Mr' }
			],
			[
				{ type: 2, data: 'Mr' },
				{ type: 2, data: 'Mr' },
				{ type: 2, data: 'Mr' }
			],
			[
				{ type: 2, data: 'Mr' },
				{ type: 2, data: 'Mr' },
				{ type: 2, data: 'Mr' }
			]
		],
		footer: [
			{ type: 0, data: 'Emre' },
			{ type: 1, data: 'Ayaz' },
			{ type: 2, data: 'Mr' }
		]
	};
</script>

<Page title=" asdf" description="asdf">
	<Table
		tableHeadItems={tableData.head}
		tableRowItems={tableData.rows}
		tableFooterItems={tableData.footer}
	>
		{#snippet headTemplate(item)}
			{#if item.type == 1}
				<Text>
					{item.data}
				</Text>
			{:else}
				<Text class="text-primary-300">{item.data}</Text>
			{/if}
		{/snippet}
		{#snippet bodyTemplate(item)}
			<Text class="text-primary-300">{item.data}</Text>
		{/snippet}
		{#snippet footerTemplate(item)}
			<Text class="text-primary-300">{item.data}</Text>
		{/snippet}
	</Table>
</Page>
