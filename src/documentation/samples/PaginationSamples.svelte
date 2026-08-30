<script lang="ts">
  import { Container, Text } from "#src/lib/base/index.ts";
  import { CodeBlock, Pagination } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  let basicPage = $state(1);
  let largePage = $state(10);
</script>

<Container class="flex flex-col gap-10">
  <Container class="flex flex-col gap-2">
    <Text type="h1">Pagination Samples</Text>
    <Text class="text-neutral-500">A component for navigating through a series of related content across multiple pages.</Text>
  </Container>

  <!-- 1. Basic Pagination -->
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-xl font-bold">1. Basic Pagination</Text>
    <Text class="text-neutral-500">Standard pagination with sequential page numbers.</Text>
    <Container class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <Pagination componentId="pagination-basic" bind:currentPage={basicPage} totalPages={5} />
      <Text class="mt-4 text-sm text-neutral-600 dark:text-neutral-400">Current Page: {basicPage}</Text>
    </Container>
    <CodeBlock code={codeBlockContents.paginationBasic} language="svelte" />
  </Container>

  <!-- 2. Large Page Count with Ellipsis -->
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-xl font-bold">2. Truncation & Ellipsis for Large Datasets</Text>
    <Text class="text-neutral-500">Automatically truncates intermediate pages using siblingCount and boundaryCount.</Text>
    <Container class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <Pagination componentId="pagination-ellipsis" bind:currentPage={largePage} totalPages={25} siblingCount={1} boundaryCount={1} />
      <Text class="mt-4 text-sm text-neutral-600 dark:text-neutral-400">Current Page: {largePage} of 25</Text>
    </Container>
  </Container>
</Container>
