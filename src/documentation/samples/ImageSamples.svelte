<script lang="ts">
  import { Image, Container, Text } from "#src/lib/base/index.ts";
  import { CodeBlock } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  let delayedSrc = $state("");
  $effect(() => {
    const timer = setTimeout(() => {
      delayedSrc = `https://picsum.photos/500/300?random=${Math.random()}`;
    }, 3000);
    return () => clearTimeout(timer);
  });
</script>

<Container id="image-samples-grid" class="grid grid-cols-1 gap-8 md:grid-cols-2">
  <!-- Default Image -->
  <Container id="image-sample-standard-container" class="flex flex-col gap-2">
    <Text id="image-sample-standard-heading" type="h3" class="text-lg font-semibold">Standard Image</Text>
    <Text id="image-sample-standard-description" class="text-sm text-neutral-500">Renders a standard image immediately without any artificial delay applied.</Text>
    <Container id="image-sample-standard-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <Container id="image-sample-standard-wrapper" class="h-48 w-full overflow-hidden rounded-lg">
        <Image id="image-sample-standard-img" src="https://picsum.photos/id/1018/500/300" alt="Nature scene" class="h-full w-full object-cover!" />
      </Container>
    </Container>
    <CodeBlock id="image-sample-standard-code" code={codeBlockContents.imageStandard} language="svelte" />
  </Container>

  <!-- Placeholder / Loading Example -->
  <Container id="image-sample-loading-container" class="flex flex-col gap-2">
    <Text id="image-sample-loading-heading" type="h3" class="text-lg font-semibold">Loading State Demo</Text>
    <Text id="image-sample-loading-description" class="text-sm text-neutral-500">This example has a manual 3-second delay to showcase the skeleton effect.</Text>
    <Container id="image-sample-loading-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <Container id="image-sample-loading-wrapper" class="h-48 w-full overflow-hidden rounded-lg">
        <Image id="image-sample-loading-img" src={delayedSrc} alt="Delayed loading example" class="h-full w-full object-cover!" />
      </Container>
    </Container>
    <CodeBlock id="image-sample-loading-code" code={codeBlockContents.imageLoading} language="svelte" />
  </Container>
</Container>
