<script lang="ts">
  import { documentationRegistry } from "#src/documentation/documentation.ts";
  import { toDocumentationPageName } from "#src/documentation/documentationNavigation.ts";
  import { Container, Link, Table, Text } from "#src/lib/base/index.ts";
  import { CodeBlock, Page } from "#src/lib/components/index.ts";

  const pageData = (
    documentationRegistry as unknown as Record<
      string,
      Record<string, { title: string; description: string; sections: Array<Record<string, unknown>> }>
    >
  ).pages["conventions"];
  const pageName = toDocumentationPageName(pageData.title);

  type TableData = { headers: Array<string>; rows: Array<Array<string>> };
  type ConventionSection = {
    id: string;
    title: string;
    description?: string;
    content?: string;
    table?: TableData;
    code?: string;
    language?: string;
    warning?: string;
  };
  type TableCell = { cellId: string; value: string };

  const sections = pageData.sections as unknown as Array<ConventionSection>;

  function buildTableRows(sectionId: string, table: TableData): Array<Array<TableCell>> {
    return table.rows.map((row, rowIndex) =>
      row.map((value, columnIndex) => ({ cellId: `conventions-${sectionId}-cell-${rowIndex}-${columnIndex}`, value })),
    );
  }

  function buildSectionAnchorId(sectionId: string): string {
    return `conventions-${sectionId}-container`;
  }

  function buildSectionNumber(sectionIndex: number): string {
    return String(sectionIndex + 1).padStart(2, "0");
  }
</script>

<Page id="conventions-page" variant="site-page" title={pageData.title} description={pageData.description}>
  <Container id="conventions-main-container" class="article">
    <Container id="conventions-header-container" class="article-header layer-tone-introduction">
      <Container id="conventions-kicker" class="article-kicker">
        <Text id="conventions-eyebrow" type="span" class="article-chip">Conventions</Text>
        <Text id="conventions-kicker-text" type="span">Guide · Part 02</Text>
      </Container>
      <Text id="conventions-title-text" type="h1" class="article-title">{pageName}</Text>
      <Text id="conventions-description-text" class="article-deck">{pageData.description}</Text>

      <Container id="conventions-contents-container" type="nav" class="article-contents-wrapper">
        <Container id="conventions-contents-list" class="article-contents">
          <Text id="conventions-contents-heading" type="span" class="article-contents-heading">On this page</Text>
          {#each sections as section, sectionIndex (section.id)}
            <Link id={`conventions-contents-link-${section.id}`} href={`#${buildSectionAnchorId(section.id)}`} class="article-contents-link">
              <Text id={`conventions-contents-index-${section.id}`} type="span" class="article-contents-index">
                {buildSectionNumber(sectionIndex)}
              </Text>
              <Text id={`conventions-contents-title-${section.id}`} type="span">{section.title}</Text>
            </Link>
          {/each}
        </Container>
      </Container>
    </Container>

    {#each sections as section, sectionIndex (section.id)}
      <Container id={buildSectionAnchorId(section.id)} class="article-section">
        <Container id={`conventions-${section.id}-head`} class="article-section-head">
          <Text id={`conventions-${section.id}-number`} type="span" class="mag-section-number">{buildSectionNumber(sectionIndex)}</Text>
          <Text id={`conventions-${section.id}-heading`} type="h2" class="article-section-heading">{section.title}</Text>
        </Container>

        {#if section.description}
          <Text id={`conventions-${section.id}-description`} class="article-prose article-prose-muted">{section.description}</Text>
        {/if}

        {#if section.content}
          <Text id={`conventions-${section.id}-body`} class="article-prose">{section.content}</Text>
        {/if}

        {#if section.warning}
          <Container id={`conventions-${section.id}-warning`} class="mag-callout">
            <Text id={`conventions-${section.id}-warning-text`} type="span">
              <Text id={`conventions-${section.id}-warning-label`} type="span" class="mag-callout-label">Note</Text>
              {section.warning}
            </Text>
          </Container>
        {/if}

        {#if section.table}
          <Container id={`conventions-${section.id}-table-wrapper`} class="mag-table-frame">
            <Table
              id={`conventions-${section.id}-table`}
              tableHeadItems={section.table.headers}
              tableRowItems={buildTableRows(section.id, section.table)}
              tableFooterItems={[]}
              class="mag-table"
            >
              {#snippet headTemplate(headerLabel: string)}
                <Text id={`conventions-${section.id}-head-${headerLabel.toLowerCase().replace(/[^a-z0-9]/g, "-")}`} type="span">
                  {headerLabel}
                </Text>
              {/snippet}

              {#snippet bodyTemplate(tableCell: TableCell)}
                <Text id={tableCell.cellId} type="code" class="mag-table-code">
                  {tableCell.value}
                </Text>
              {/snippet}

              {#snippet footerTemplate()}{/snippet}
            </Table>
          </Container>
        {/if}

        {#if section.code}
          <Container id={`conventions-${section.id}-frame`} class="specimen dark">
            <Container id={`conventions-${section.id}-caption`} class="specimen-caption">
              <Text id={`conventions-${section.id}-caption-title`} type="span">{section.title}</Text>
              <Text id={`conventions-${section.id}-caption-language`} type="span">{section.language ?? "svelte"}</Text>
            </Container>
            <Container id={`conventions-${section.id}-code-frame`} class="specimen-code">
              <CodeBlock id={`conventions-${section.id}-code`} sourceCode={section.code} language={section.language ?? "svelte"} />
            </Container>
          </Container>
        {/if}
      </Container>
    {/each}
  </Container>
</Page>
