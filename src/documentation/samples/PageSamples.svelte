<script lang="ts">
  import { Container, Text, Image, InputField } from "#src/lib/base/index.ts";
  import { CodeBlock } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  let previewTitle = $state("Fluid UI Svelte");
  let previewDescription = $state("A highly flexible and customizable UI library built with Svelte 5 and Tailwind CSS 4.");
  let previewImage = $state("https://picsum.photos/id/10/1200/630");
  let previewSite = $state("fluidui.io");
</script>

<Container class="flex flex-col gap-12">
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-lg font-semibold">Social Preview Simulator</Text>
    <Text class="text-sm text-neutral-500">See how your page metadata would appear when shared on platforms like Discord, Slack, or LinkedIn.</Text>

    <Container class="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <!-- Controls -->
      <Container class="flex flex-col gap-4 rounded-lg border p-6 dark:border-neutral-700">
        <Container class="flex flex-col gap-2">
          <Text class="text-xs font-medium text-neutral-500 uppercase">Preview Title</Text>
          <InputField bind:value={previewTitle} class="w-full" />
        </Container>
        <Container class="flex flex-col gap-2">
          <Text class="text-xs font-medium text-neutral-500 uppercase">Preview Description</Text>
          <InputField bind:value={previewDescription} class="w-full" />
        </Container>
        <Container class="flex flex-col gap-2">
          <Text class="text-xs font-medium text-neutral-500 uppercase">Image URL</Text>
          <InputField bind:value={previewImage} class="w-full" />
        </Container>
        <Container class="flex flex-col gap-2">
          <Text class="text-xs font-medium text-neutral-500 uppercase">Site Name</Text>
          <InputField bind:value={previewSite} class="w-full" />
        </Container>
      </Container>

      <!-- Visual Preview -->
      <Container class="flex flex-col justify-center gap-4">
        <Text class="text-xs font-medium text-neutral-400 uppercase">Mock Link Preview</Text>
        <Container class="overflow-hidden rounded-lg border bg-neutral-50 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
          {#if previewImage}
            <Container class="aspect-[1.91/1] w-full overflow-hidden border-b dark:border-neutral-700">
              <Image src={previewImage} alt="Social preview" class="h-full w-full object-cover" />
            </Container>
          {/if}
          <Container class="flex flex-col gap-1 p-4">
            <Text class="text-xs text-neutral-500 uppercase">{previewSite}</Text>
            <Text class="line-clamp-1 text-sm font-bold text-primary-600">{previewTitle}</Text>
            <Text class="line-clamp-2 text-xs text-neutral-600 dark:text-neutral-400">{previewDescription}</Text>
          </Container>
        </Container>
      </Container>
    </Container>
  </Container>

  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-lg font-semibold">Basic Usage</Text>
    <Text class="text-sm text-neutral-500">The Page component wraps your entire route content and automatically manages the document head.</Text>

    <Container class="rounded-lg border bg-neutral-50 p-6 dark:border-neutral-700 dark:bg-neutral-900">
      <Text class="text-center text-neutral-500 italic">
        (This documentation page itself is wrapped in a Page component. Check the browser tab title or inspect the HTML source to see the metadata in
        action.)
      </Text>
    </Container>

    <CodeBlock code={codeBlockContents.pageBasic} language="svelte" />
  </Container>

  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-lg font-semibold">With Detailed Metadata</Text>
    <Text class="text-sm text-neutral-500">You can provide comprehensive metadata for SEO and social sharing previews (Open Graph & Twitter).</Text>

    <CodeBlock code={codeBlockContents.pageMetadata} language="svelte" />
  </Container>
</Container>
