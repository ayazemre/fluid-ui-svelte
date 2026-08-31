<script lang="ts">
  import { documentationRegistry } from "#src/documentation/documentation.ts";
  import { Container, Text, Table } from "#src/lib/base/index.ts";
  import { Page } from "#src/lib/components/index.ts";

  let { data } = $props();
  // @ts-ignore
  let SampleComponent = $derived(documentationRegistry[data.category][data.slug].sampleComponent);

  const headers = ["Prop", "Type", "Default", "Description"];

  // Prepare the rows for the props table
  const tableRows = $derived(
    data.props.map((p: any) => [
      { col: "prop", value: p.prop },
      { col: "type", value: p.type },
      { col: "default", value: p.default },
      { col: "desc", value: p.description },
    ]),
  );
</script>

<Page id={`doc-page-${data.category}-${data.slug}`} title={data.title} description={data.description}>
  <Container id={`doc-page-main-container-${data.category}-${data.slug}`} class="flex flex-col gap-8">
    <!-- Header -->
    <Container id={`doc-page-header-container-${data.category}-${data.slug}`} class="flex flex-col gap-4">
      <Text id={`doc-page-main-title-${data.category}-${data.slug}`} type="h1" class="text-4xl font-bold">{data.title.replace("Fluid UI - ", "")}</Text>
      <Text id={`doc-page-main-description-${data.category}-${data.slug}`}>
        {data.description}
      </Text>
    </Container>

    <!-- Props Table -->
    <Container id={`doc-page-props-container-${data.category}-${data.slug}`} class="hidden flex-col gap-4 overflow-x-auto md:flex">
      <Text id={`doc-page-props-title-${data.category}-${data.slug}`} type="h2" class="text-2xl font-semibold">Props</Text>
      <Table id={`doc-page-props-table-${data.category}-${data.slug}`} tableHeadItems={headers} tableRowItems={tableRows} tableFooterItems={[]} class="w-full text-left">
        {#snippet headTemplate(item)}
          <Text id={`doc-props-head-${item.toLowerCase().replace(/ /g, "-")}`} class="p-2 font-bold">{item}</Text>
        {/snippet}

        {#snippet bodyTemplate(item: { value: string; col: string })}
          <Container id={`doc-props-body-cell-${item.col}-${item.value.replace(/[^a-zA-Z0-9]/g, "-")}`} overrideDefaultStyling={true} class="p-2">
            {#if item.col === "prop"}
              <Text id={`doc-props-val-prop-${item.value.replace(/[^a-zA-Z0-9]/g, "-")}`} type="code" class="font-bold text-primary-600">{item.value}</Text>
            {:else if item.col === "type"}
              <Text id={`doc-props-val-type-${item.value.replace(/[^a-zA-Z0-9]/g, "-")}`} type="code" class="text-sm text-neutral-600 dark:text-neutral-400">{item.value}</Text>
            {:else if item.col === "default"}
              <Text id={`doc-props-val-default-${item.value.replace(/[^a-zA-Z0-9]/g, "-")}`} type="code" class="text-sm text-neutral-500">{item.value}</Text>
            {:else}
              <Text id={`doc-props-val-desc-${item.value.replace(/[^a-zA-Z0-9]/g, "-").slice(0, 20)}`} class="text-sm">{item.value}</Text>
            {/if}
          </Container>
        {/snippet}

        {#snippet footerTemplate()}
          <Container id={`doc-props-footer-empty-${data.category}-${data.slug}`} overrideDefaultStyling={true} />
        {/snippet}
      </Table>
    </Container>

    <!-- Samples -->
    <Container id={`doc-page-samples-container-${data.category}-${data.slug}`} class="flex flex-col gap-4">
      <Text id={`doc-page-samples-title-${data.category}-${data.slug}`} type="h2" class="text-2xl font-semibold">Samples</Text>
      <SampleComponent />
    </Container>
  </Container>
</Page>
