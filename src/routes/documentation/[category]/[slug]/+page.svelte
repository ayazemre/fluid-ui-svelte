<script lang="ts">
  import DocumentationPager from "#src/documentation/DocumentationPager.svelte";
  import { documentationSampleRegistry } from "#src/documentation/samples/sampleRegistry.ts";
  import { buildSectionNumber } from "#src/documentation/siteContent.ts";
  import { Container, Table, Text } from "#src/lib/base/index.ts";
  import { Page } from "#src/lib/components/index.ts";

  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  type PropertyCell = {
    cellId: string;
    column: "prop" | "type" | "default" | "description";
    value: string;
  };

  const propertyTableHeaders = ["Prop", "Type", "Default", "Description"];

  const SampleComponent = $derived(documentationSampleRegistry[data.category]?.[data.slug]);

  const hasPropsSection = $derived(data.props.length > 0);
  const propsSectionNumber = buildSectionNumber(1);
  const samplesSectionNumber = $derived(buildSectionNumber(hasPropsSection ? 2 : 1));

  const propertyTableRows = $derived(
    data.props.map((propertyRow, rowIndex): Array<PropertyCell> => [
      { cellId: `doc-props-${rowIndex}-prop`, column: "prop", value: propertyRow.prop },
      { cellId: `doc-props-${rowIndex}-type`, column: "type", value: propertyRow.type },
      { cellId: `doc-props-${rowIndex}-default`, column: "default", value: propertyRow.default },
      { cellId: `doc-props-${rowIndex}-description`, column: "description", value: propertyRow.description },
    ]),
  );
</script>

<Page id={`doc-page-${data.category}-${data.slug}`} variant="site-page" title={data.title} description={data.description}>
  <Container id={`doc-page-content-${data.category}-${data.slug}`} class="doc-page">
    <Container id={`doc-page-header-container-${data.category}-${data.slug}`} class={`doc-header layer-tone-${data.category}`}>
      <Container id={`doc-page-kicker-${data.category}-${data.slug}`} class="doc-kicker">
        <Text id={`doc-page-category-${data.category}-${data.slug}`} type="span" class="doc-badge">{data.categoryLabel}</Text>
      </Container>
      <Text id={`doc-page-main-title-${data.category}-${data.slug}`} type="h1" class="doc-title">
        {data.name}
      </Text>
      <Text id={`doc-page-main-description-${data.category}-${data.slug}`} class="doc-deck">
        {data.description}
      </Text>
    </Container>

    {#if hasPropsSection}
      <Container id={`doc-page-props-container-${data.category}-${data.slug}`} class="doc-section">
        <Container id={`doc-page-props-head-${data.category}-${data.slug}`} class="doc-section-head">
          <Text id={`doc-page-props-number-${data.category}-${data.slug}`} type="span" class="doc-section-index">{propsSectionNumber}</Text>
          <Text id={`doc-page-props-title-${data.category}-${data.slug}`} type="h2" class="doc-section-title">Props</Text>
        </Container>
        <Container id={`doc-page-props-frame-${data.category}-${data.slug}`} class="doc-table-frame">
          <Table
            id={`doc-page-props-table-${data.category}-${data.slug}`}
            tableHeadItems={propertyTableHeaders}
            tableRowItems={propertyTableRows}
            tableFooterItems={[]}
            class="doc-table"
            footerClass="hidden"
          >
            {#snippet headTemplate(headerLabel: string)}
              <Text id={`doc-props-head-${headerLabel.toLowerCase()}`} type="span">{headerLabel}</Text>
            {/snippet}

            {#snippet bodyTemplate(propertyCell: PropertyCell)}
              {#if propertyCell.column === "prop"}
                <Text id={propertyCell.cellId} type="code" class="doc-table-prop">{propertyCell.value}</Text>
              {:else if propertyCell.column === "type"}
                <Text id={propertyCell.cellId} type="code" class="doc-table-code">{propertyCell.value}</Text>
              {:else if propertyCell.column === "default"}
                <Text id={propertyCell.cellId} type="code" class="doc-table-code">{propertyCell.value}</Text>
              {:else}
                <Text id={propertyCell.cellId} class="doc-prose">{propertyCell.value}</Text>
              {/if}
            {/snippet}

            {#snippet footerTemplate()}{/snippet}
          </Table>
        </Container>
      </Container>
    {/if}

    {#if SampleComponent}
      <Container id={`doc-page-samples-container-${data.category}-${data.slug}`} class="doc-section">
        <Container id={`doc-page-samples-head-${data.category}-${data.slug}`} class="doc-section-head">
          <Text id={`doc-page-samples-number-${data.category}-${data.slug}`} type="span" class="doc-section-index">{samplesSectionNumber}</Text>
          <Text id={`doc-page-samples-title-${data.category}-${data.slug}`} type="h2" class="doc-section-title">Samples</Text>
        </Container>
        <Container id={`doc-page-samples-frame-${data.category}-${data.slug}`} class="doc-sample-frame">
          <SampleComponent />
        </Container>
      </Container>
    {/if}

    <DocumentationPager idPrefix={`doc-page-pager-${data.category}-${data.slug}`} previousLink={data.previousLink} nextLink={data.nextLink} />
  </Container>
</Page>
