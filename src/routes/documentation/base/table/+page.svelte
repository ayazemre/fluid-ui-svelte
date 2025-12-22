<script lang="ts">
	import { Table, Container, Text, Link } from '$lib/base/index.js';
	import { Page, CodeBlock } from '$lib/components/index.js';

	interface HeadItem {
		label: string;
	}

	interface RowItem {
		id: number;
		name: string;
		age: number;
	}

	interface FooterItem {
		label: string;
	}

	const tableHeadItems: Array<HeadItem> = [{ label: 'ID' }, { label: 'Name' }, { label: 'Age' }];
	const tableRowItems: Array<Array<RowItem[keyof RowItem]>> = [
		[1, 'Alice', 30],
		[2, 'Bob', 24],
		[3, 'Charlie', 35]
	];
	const tableFooterItems: Array<FooterItem> = [{ label: 'Total' }];

	const tableHeadItems2 = ['ID', 'Name', 'Age'];
	const tableRowItems2 = [
		[1, 'Alice', 30],
		[2, 'Bob', 24],
		[3, 'Charlie', 35]
	];
	const tableFooterItems2 = ['Total'];

	const tableCode = `<script lang="ts">
	interface HeadItem {
		label: string;
	}

	interface RowItem {
		id: number;
		name: string;
		age: number;
	}

	interface FooterItem {
		label: string;
	}

	const tableHeadItems: Array<HeadItem> = [{ label: 'ID' }, { label: 'Name' }, { label: 'Age' }];
	const tableRowItems: Array<Array<RowItem[keyof RowItem]>> = [
		[1, 'Alice', 30],
		[2, 'Bob', 24],
		[3, 'Charlie', 35]
	];
	const tableFooterItems: Array<FooterItem> = [{ label: 'Total' }];
<\/script>

<Table
	caption="User Data"
	tableHeadItems={tableHeadItems}
	tableRowItems={tableRowItems}
	tableFooterItems={tableFooterItems}
>
	{#snippet headTemplate(headItem: HeadItem)}
		{headItem.label}
	{/snippet}
	{#snippet bodyTemplate(bodyItem: RowItem[keyof RowItem])}
		{bodyItem}
	{/snippet}
	{#snippet footerTemplate(footerItem: FooterItem)}
		{footerItem.label}
	{/snippet}
</Table>`;

	const styledTableCode = `<Table
  caption="Styled User Data"
  {tableHeadItems}
  {tableRowItems}
  {tableFooterItems}
  class="w-full border-2 border-primary-500"
  headClass="bg-primary-100 dark:bg-primary-900"
  rowClass="hover:bg-neutral-100 dark:hover:bg-neutral-800"
  cellClass="p-4 border-b border-neutral-200 dark:border-neutral-700"
  captionClass="text-lg font-bold text-primary-600 mb-2"
>
  {#snippet headTemplate(headItem)}
    {headItem.label}
  {/snippet}
  {#snippet bodyTemplate(bodyItem)}
    {bodyItem}
  {/snippet}
  {#snippet footerTemplate(footerItem)}
    {footerItem.label}
  {/snippet}
</Table>`;

	const usageCode = `<script lang="ts">
  import { Table } from 'fluid-ui-svelte/base';

  // Define your data structures
  interface HeadItem {
    label: string;
  }

  interface RowItem {
    id: number;
    name: string;
    age: number;
  }

  interface FooterItem {
    label: string;
  }

  // Your table data
  const myTableHeadItems: Array<HeadItem> = [{ label: 'Product ID' }, { label: 'Product Name' }];
  const myTableRowItems: Array<Array<RowItem[keyof RowItem]>> = [
    [101, 'Laptop'],
    [102, 'Mouse']
  ];
  const myTableFooterItems: Array<FooterItem> = [{ label: 'Inventory Total' }];
<\/script>

<Table
  caption="Product Inventory"
  tableHeadItems={myTableHeadItems}
  tableRowItems={myTableRowItems}
  tableFooterItems={myTableFooterItems}
  class="w-full"
  cellClass="p-2 border"
>
  {#snippet headTemplate(headItem: HeadItem)}
    <strong>{headItem.label}</strong>
  {/snippet}
  {#snippet bodyTemplate(bodyItem: RowItem[keyof RowItem])}
    <em>{bodyItem}</em>
  {/snippet}
  {#snippet footerTemplate(footerItem: FooterItem)}
    <span class="text-primary-500 font-bold">{footerItem.label}</span>
  {/snippet}
</Table>
`;
</script>

<Page
	title="Table - Fluid UI"
	description="The Table component is used to display tabular data with customizable headers, body rows, and footers using Svelte snippets."
>
	<Container class="flex flex-col gap-8">
		<Container class="flex flex-col gap-4">
			<Text type="h1" class="text-4xl font-bold">Table</Text>
			<Text>
				The Table component provides a flexible way to render tabular data. It supports custom
				rendering for head, body, and footer cells using Svelte snippets, allowing for rich and
				dynamic content within your tables.
			</Text>
		</Container>
		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Props</Text>
			<Text>The Table component accepts the following props:</Text>
			<ul class="flex list-disc flex-col gap-2 pl-6">
				<li>
					<Text>
						<Text type="strong">caption:</Text>
						<Text type="code">string</Text> (optional) - A caption for the table.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">tableHeadItems:</Text>
						<Text type="code">Array&lt;T&gt;</Text> - Data for the header.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">tableRowItems:</Text>
						<Text type="code">Array&lt;Array&lt;U&gt;&gt;</Text> - Data for the rows.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">tableFooterItems:</Text>
						<Text type="code">Array&lt;V&gt;</Text> - Data for the footer.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">headTemplate:</Text>
						<Text type="code">Snippet&lt;[T]&gt;</Text> - Snippet for header cells.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">bodyTemplate:</Text>
						<Text type="code">Snippet&lt;[U]&gt;</Text> - Snippet for body cells.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">footerTemplate:</Text>
						<Text type="code">Snippet&lt;[V]&gt;</Text> - Snippet for footer cells.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">class:</Text>
						<Text type="code">string</Text> (optional) - Classes for the root
						<Text type="code">&lt;table&gt;</Text> element.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">captionClass:</Text>
						<Text type="code">string</Text> (optional) - Classes for the
						<Text type="code">&lt;caption&gt;</Text> element.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">headClass:</Text>
						<Text type="code">string</Text> (optional) - Classes for the
						<Text type="code">&lt;thead&gt;</Text> element.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">bodyClass:</Text>
						<Text type="code">string</Text> (optional) - Classes for the
						<Text type="code">&lt;tbody&gt;</Text> element.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">rowClass:</Text>
						<Text type="code">string</Text> (optional) - Classes for the
						<Text type="code">&lt;tr&gt;</Text> elements.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">cellClass:</Text>
						<Text type="code">string</Text> (optional) - Classes for
						<Text type="code">&lt;th&gt;</Text> and <Text type="code">&lt;td&gt;</Text> elements.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">footerClass:</Text>
						<Text type="code">string</Text> (optional) - Classes for the
						<Text type="code">&lt;tfoot&gt;</Text> element.
					</Text>
				</li>
				<li>
					<Text>
						<Text type="strong">overrideDefaultStyling:</Text>
						<Text type="code">boolean</Text> - When
						<Text type="code">true</Text>, removes default <Text type="code">fluid-table</Text> classes.
					</Text>
				</li>
			</ul>
		</Container>
		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Samples</Text>

			<Container class="flex flex-col gap-4 rounded-md border p-4">
				<Text type="h3" class="text-xl font-semibold">Basic Table</Text>
				<Table caption="User Data" {tableHeadItems} {tableRowItems} {tableFooterItems}>
					{#snippet headTemplate(headItem: HeadItem)}
						{headItem.label}
					{/snippet}
					{#snippet bodyTemplate(bodyItem: RowItem[keyof RowItem])}
						{bodyItem}
					{/snippet}
					{#snippet footerTemplate(footerItem: FooterItem)}
						{footerItem.label}
					{/snippet}
				</Table>
				<CodeBlock code={tableCode} language="svelte" />
			</Container>

			<Container class="flex flex-col gap-4 rounded-md border p-4">
				<Text type="h3" class="text-xl font-semibold">Styled Table</Text>
				<Table
					caption="Styled User Data"
					{tableHeadItems}
					{tableRowItems}
					{tableFooterItems}
					class="w-full border-2 border-primary-500"
					headClass="bg-primary-100 dark:bg-primary-900"
					rowClass="hover:bg-neutral-100 dark:hover:bg-neutral-800"
					cellClass="p-4 border-b border-neutral-200 dark:border-neutral-700"
					captionClass="text-lg font-bold text-primary-600 mb-2"
				>
					{#snippet headTemplate(headItem)}
						{headItem.label}
					{/snippet}
					{#snippet bodyTemplate(bodyItem)}
						{bodyItem}
					{/snippet}
					{#snippet footerTemplate(footerItem)}
						{footerItem.label}
					{/snippet}
				</Table>
				<CodeBlock code={styledTableCode} language="svelte" />
			</Container>
		</Container>

		<Container class="flex flex-col gap-4">
			<Text type="h2" class="text-2xl font-semibold">Usage</Text>
			<Text>
				To use the Table component, import it and pass your data arrays along with the necessary
				snippets for rendering.
			</Text>
			<CodeBlock code={usageCode} language="svelte" />
		</Container>
	</Container>
</Page>
