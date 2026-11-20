<script lang="ts">
  import Icon from "@iconify/svelte";

  import { documentationSampleRegistry } from "#src/documentation/samples/sampleRegistry.ts";
  import { Container, Link, Table, Text } from "#src/lib/base/index.ts";
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
  <Container id={`doc-page-content-${data.category}-${data.slug}`} class="article">
    <Container id={`doc-page-header-container-${data.category}-${data.slug}`} class={`article-header layer-tone-${data.category}`}>
      <Container id={`doc-page-kicker-${data.category}-${data.slug}`} class="article-kicker">
        <Text id={`doc-page-category-${data.category}-${data.slug}`} type="span" class="article-chip">{data.categoryLabel}</Text>
        <Text id={`doc-page-layer-order-${data.category}-${data.slug}`} type="span">Layer {data.layerNumeral}</Text>
      </Container>
      <Text id={`doc-page-main-title-${data.category}-${data.slug}`} type="h1" class="article-title">
        {data.name}
      </Text>
      <Text id={`doc-page-main-description-${data.category}-${data.slug}`} class="article-deck">
        {data.description}
      </Text>
    </Container>

    {#if data.props.length > 0}
      <Container id={`doc-page-props-container-${data.category}-${data.slug}`} class="article-section">
        <Container id={`doc-page-props-head-${data.category}-${data.slug}`} class="article-section-head">
          <Text id={`doc-page-props-number-${data.category}-${data.slug}`} type="span" class="mag-section-number">01</Text>
          <Text id={`doc-page-props-title-${data.category}-${data.slug}`} type="h2" class="article-section-heading">Props</Text>
        </Container>
        <Container id={`doc-page-props-frame-${data.category}-${data.slug}`} class="mag-table-frame">
          <Table
            id={`doc-page-props-table-${data.category}-${data.slug}`}
            tableHeadItems={propertyTableHeaders}
            tableRowItems={propertyTableRows}
            tableFooterItems={[]}
            class="mag-table"
            footerClass="hidden"
          >
            {#snippet headTemplate(headerLabel: string)}
              <Text id={`doc-props-head-${headerLabel.toLowerCase()}`} type="span">{headerLabel}</Text>
            {/snippet}

            {#snippet bodyTemplate(propertyCell: PropertyCell)}
              {#if propertyCell.column === "prop"}
                <Text id={propertyCell.cellId} type="code" class="mag-table-prop">{propertyCell.value}</Text>
              {:else if propertyCell.column === "type"}
                <Text id={propertyCell.cellId} type="code" class="mag-table-code">{propertyCell.value}</Text>
              {:else if propertyCell.column === "default"}
                <Text id={propertyCell.cellId} type="code" class="mag-table-code">{propertyCell.value}</Text>
              {:else}
                <Text id={propertyCell.cellId} class="article-prose">{propertyCell.value}</Text>
              {/if}
            {/snippet}

            {#snippet footerTemplate()}{/snippet}
          </Table>
        </Container>
      </Container>
    {/if}

    {#if SampleComponent}
      <Container id={`doc-page-samples-container-${data.category}-${data.slug}`} class="article-section">
        <Container id={`doc-page-samples-head-${data.category}-${data.slug}`} class="article-section-head">
          <Text id={`doc-page-samples-number-${data.category}-${data.slug}`} type="span" class="mag-section-number">
            {data.props.length > 0 ? "02" : "01"}
          </Text>
          <Text id={`doc-page-samples-title-${data.category}-${data.slug}`} type="h2" class="article-section-heading">Samples</Text>
        </Container>
        <Container id={`doc-page-samples-frame-${data.category}-${data.slug}`} class="docs-sample-frame">
          <SampleComponent />
        </Container>
      </Container>
    {/if}

    <Container id={`doc-page-pager-${data.category}-${data.slug}`} class="mag-pager">
      {#if data.previousLink}
        <Link id={`doc-page-pager-previous-${data.category}-${data.slug}`} href={data.previousLink.url} class="mag-pager-card">
          <Text id={`doc-page-pager-previous-direction-${data.category}-${data.slug}`} type="span" class="mag-pager-direction">
            <Icon icon="ri:arrow-left-s-line" class="inline size-4" />
            Previous
          </Text>
          <Text id={`doc-page-pager-previous-label-${data.category}-${data.slug}`} type="span" class="mag-pager-label">{data.previousLink.label}</Text
          >
        </Link>
      {:else}
        <Container id={`doc-page-pager-previous-empty-${data.category}-${data.slug}`} />
      {/if}

      {#if data.nextLink}
        <Link id={`doc-page-pager-next-${data.category}-${data.slug}`} href={data.nextLink.url} class="mag-pager-card mag-pager-card-next">
          <Text id={`doc-page-pager-next-direction-${data.category}-${data.slug}`} type="span" class="mag-pager-direction">
            Next
            <Icon icon="ri:arrow-right-s-line" class="inline size-4" />
          </Text>
          <Text id={`doc-page-pager-next-label-${data.category}-${data.slug}`} type="span" class="mag-pager-label">{data.nextLink.label}</Text>
        </Link>
      {:else}
        <Container id={`doc-page-pager-next-empty-${data.category}-${data.slug}`} />
      {/if}
    </Container>
  </Container>
</Page>
