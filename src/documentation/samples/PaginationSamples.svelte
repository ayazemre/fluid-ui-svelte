<script lang="ts">
  import { Container, Text } from "#src/lib/base/index.ts";
  import { CodeBlock, Pagination } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  let basicPage = $state(1);
  let largePage = $state(10);
</script>

<Container id="pagination-samples-container" class="flex flex-col gap-10">
  <Container id="pagination-samples-header" class="flex flex-col gap-2">
    <Text id="pagination-samples-title" type="h1">Pagination Samples</Text>
    <Text id="pagination-samples-description" class="text-neutral-500">A component for navigating through a series of related content across multiple pages.</Text>
  </Container>

  <!-- 1. Basic Pagination -->
  <Container id="pagination-sample-basic-section" class="flex flex-col gap-4">
    <Text id="pagination-sample-basic-heading" type="h3" class="text-xl font-bold">1. Basic Pagination</Text>
    <Text id="pagination-sample-basic-description" class="text-neutral-500">Standard pagination with sequential page numbers.</Text>
    <Container id="pagination-sample-basic-preview" class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <Pagination id="pagination-basic" bind:currentPage={basicPage} totalPages={5} />
      <Text id="pagination-sample-basic-status" class="mt-4 text-sm text-neutral-600 dark:text-neutral-400">Current Page: {basicPage}</Text>
    </Container>
    <CodeBlock id="pagination-sample-basic-code" code={codeBlockContents.paginationBasic} language="svelte" />
  </Container>

  <!-- 2. Large Page Count with Ellipsis -->
  <Container id="pagination-sample-ellipsis-section" class="flex flex-col gap-4">
    <Text id="pagination-sample-ellipsis-heading" type="h3" class="text-xl font-bold">2. Truncation & Ellipsis for Large Datasets</Text>
    <Text id="pagination-sample-ellipsis-description" class="text-neutral-500">Automatically truncates intermediate pages using siblingCount and boundaryCount.</Text>
    <Container id="pagination-sample-ellipsis-preview" class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <Pagination id="pagination-ellipsis" bind:currentPage={largePage} totalPages={25} siblingCount={1} boundaryCount={1} />
      <Text id="pagination-sample-ellipsis-status" class="mt-4 text-sm text-neutral-600 dark:text-neutral-400">Current Page: {largePage} of 25</Text>
    </Container>
  </Container>
</Container>
