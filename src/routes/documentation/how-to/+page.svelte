<script lang="ts">
  import { Text, Container } from "#src/lib/base/index.ts";
  import { Page } from "#src/lib/components/index.ts";
</script>

<Page id="how-to-page" title="Fluid UI - How To" description="Advanced guides and recipes for using Fluid UI Svelte.">
  <Container id="how-to-main-container" class="flex flex-col gap-10">
    <Container id="how-to-header-container" class="flex flex-col gap-4 border-b pb-8 dark:border-neutral-800">
      <Text id="how-to-title-text" type="h1" class="text-3xl font-bold">How To</Text>
      <Text id="how-to-description-text" class="text-neutral-600 dark:text-neutral-400"
        >Detailed guides and best practices for building applications with Fluid UI.</Text
      >
    </Container>

    <Container id="how-to-placeholder-container" class="flex flex-col gap-4">
      <Text id="how-to-placeholder-heading" type="h2" class="text-xl font-semibold">Placeholder</Text>
      <Text id="how-to-placeholder-body"
        >Content for this section is currently being prepared. Check back soon for guides on theming, custom implementations, and more.</Text
      >
    </Container>
  </Container>
</Page>
