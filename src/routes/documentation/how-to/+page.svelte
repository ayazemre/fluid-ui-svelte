<script lang="ts">
  import { documentationRegistry } from "#src/documentation/documentation.ts";
  import { Container, Table, Text } from "#src/lib/base/index.ts";
  import { CodeBlock, Page } from "#src/lib/components/index.ts";

  const pageData = (documentationRegistry as unknown as Record<string, Record<string, { title: string; description: string; sections: Array<Record<string, unknown>> }>>).pages["how-to"];

  type TableData = { headers: Array<string>; rows: Array<Array<string>> };
  type HowToSection = {
    id: string;
    title: string;
    description?: string;
    content?: string;
    table?: TableData;
    code?: string;
    warning?: string;
  };

  const sections = pageData.sections as unknown as Array<HowToSection>;

  function getTableRows(table: TableData): Array<Array<{ value: string; col: string }>> {
    return table.rows.map((row) => row.map((value, index) => ({ col: table.headers[index]?.toLowerCase().replace(/[^a-z0-9]/g, "-") ?? "col", value })));
  }
</script>

<Page id="how-to-page" title={pageData.title} description={pageData.description}>
  <Container id="how-to-main-container" class="flex flex-col gap-10">
    <Container id="how-to-header-container" class="flex flex-col gap-4 border-b pb-8 dark:border-neutral-800">
      <Text id="how-to-title-text" type="h1" class="text-3xl font-bold">{pageData.title.replace("Fluid UI - ", "")}</Text>
      <Text id="how-to-description-text" class="text-neutral-600 dark:text-neutral-400">{pageData.description}</Text>
    </Container>

    {#each sections as section (section.id)}
      <Container id={`how-to-${section.id}-container`} class="flex flex-col gap-4">
        <Text id={`how-to-${section.id}-heading`} type="h2" class="text-xl font-semibold">{section.title}</Text>
        {#if section.description}
          <Text id={`how-to-${section.id}-description`} class="text-neutral-600 dark:text-neutral-400">{section.description}</Text>
        {/if}
        {#if section.content}
          <Text id={`how-to-${section.id}-body`}>{section.content}</Text>
        {/if}
        {#if section.warning}
          <Container id={`how-to-${section.id}-warning`} class="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
            <Text id={`how-to-${section.id}-warning-text`} class="text-sm text-amber-800 dark:text-amber-200">Warning: {section.warning}</Text>
          </Container>
        {/if}
        {#if section.table}
          <Container id={`how-to-${section.id}-table-wrapper`} class="overflow-x-auto">
            <Table
              id={`how-to-${section.id}-table`}
              tableHeadItems={section.table.headers}
              tableRowItems={getTableRows(section.table)}
              tableFooterItems={[]}
              class="w-full text-left"
            >
              {#snippet headTemplate(item)}
                <Text id={`how-to-${section.id}-head-${item.toLowerCase().replace(/[^a-z0-9]/g, "-")}`} class="p-2 font-bold">{item}</Text>
              {/snippet}
              {#snippet bodyTemplate(item)}
                <Container id={`how-to-${section.id}-cell-${item.col}-${item.value.replace(/[^a-zA-Z0-9]/g, "-").slice(0, 20)}`} overrideDefaultStyling class="p-2">
                  <Text id={`how-to-${section.id}-val-${item.value.replace(/[^a-zA-Z0-9]/g, "-").slice(0, 20)}`} type="code" class="text-sm">{item.value}</Text>
                </Container>
              {/snippet}
              {#snippet footerTemplate()}
                <Container id={`how-to-${section.id}-footer-empty`} overrideDefaultStyling />
              {/snippet}
            </Table>
          </Container>
        {/if}
        {#if section.code}
          <CodeBlock id={`how-to-${section.id}-code`} code={section.code} language="svelte" />
        {/if}
      </Container>
    {/each}
  </Container>
</Page>
