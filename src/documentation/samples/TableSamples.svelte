<script lang="ts">
  import { Table, Container, Text } from "#src/lib/base/index.ts";
  import { CodeBlock } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  type User = {
    id: number;
    name: string;
    age: number;
  };

  const headers = ["ID", "Name", "Age"];
  const users: Array<Array<any>> = [
    [1, "Alice", 30],
    [2, "Bob", 24],
    [3, "Charlie", 35],
  ];
  const footers = ["Total", "", "3 Users"];
</script>

<Container id="table-samples-grid" class="grid grid-cols-1 gap-8 md:grid-cols-2">
  <!-- Basic Table -->
  <Container id="table-sample-basic-container" class="flex flex-col gap-2">
    <Text id="table-sample-basic-heading" type="h3" class="text-lg font-semibold">Standard Table</Text>
    <Text id="table-sample-basic-description" class="text-sm text-neutral-500">A basic table with header, body, and footer.</Text>
    <Container id="table-sample-basic-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <Table id="table-sample-basic-table" caption="User Directory" tableHeadItems={headers} tableRowItems={users} tableFooterItems={footers}>
        {#snippet headTemplate(item: string)}
          {item}
        {/snippet}
        {#snippet bodyTemplate(item: any)}
          {item}
        {/snippet}
        {#snippet footerTemplate(item: string)}
          <Text id={`table-sample-footer-text-${item.replace(/[^a-zA-Z0-9]/g, "-")}`} type="span" class="font-bold">{item}</Text>
        {/snippet}
      </Table>
    </Container>
    <CodeBlock id="table-sample-basic-code" code={codeBlockContents.tableStandard} language="svelte" />
  </Container>

  <!-- Custom Styled -->
  <Container id="table-sample-styled-container" class="flex flex-col gap-2">
    <Text id="table-sample-styled-heading" type="h3" class="text-lg font-semibold">Styled Table</Text>
    <Text id="table-sample-styled-description" class="text-sm text-neutral-500">Applying custom classes to specific table sections.</Text>
    <Container id="table-sample-styled-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <Table
        id="table-sample-styled-table"
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
          <Container id="table-sample-styled-footer-empty" overrideDefaultStyling />
        {/snippet}
      </Table>
    </Container>
    <CodeBlock id="table-sample-styled-code" code={codeBlockContents.tableStyled} language="svelte" />
  </Container>
</Container>
