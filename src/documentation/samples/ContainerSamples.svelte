<script lang="ts">
  import { Container, Text } from "#src/lib/base/index.ts";
  import { CodeBlock } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";
</script>

<Container id="container-samples-grid" class="grid grid-cols-1 gap-8 md:grid-cols-2">
  <!-- Header Container -->
  <Container id="container-sample-header-container" class="flex flex-col gap-2">
    <Text id="container-sample-header-heading" type="h3" class="text-lg font-semibold">Header</Text>
    <Container id="container-sample-header-preview" class="flex flex-col gap-4 rounded-lg border p-6 dark:border-neutral-700">
      <Container
        id="container-sample-header-element"
        type="header"
        overrideDefaultStyling
        class="rounded bg-primary-100 p-4 text-center dark:bg-primary-900"
      >
        <Text id="container-sample-header-text" type="h3" class="text-primary-900 dark:text-primary-100">Header Content</Text>
      </Container>
    </Container>
    <CodeBlock id="container-sample-header-code" code={codeBlockContents.containerHeader} language="svelte" />
  </Container>

  <!-- Nav Container -->
  <Container id="container-sample-nav-container" class="flex flex-col gap-2">
    <Text id="container-sample-nav-heading" type="h3" class="text-lg font-semibold">Navigation</Text>
    <Container id="container-sample-nav-preview" class="flex flex-col gap-4 rounded-lg border p-6 dark:border-neutral-700">
      <Container
        id="container-sample-nav-element"
        type="nav"
        overrideDefaultStyling
        class="rounded bg-secondary-100 p-4 text-center dark:bg-secondary-900"
      >
        <Text id="container-sample-nav-text" class="text-secondary-900 dark:text-secondary-100">Navigation Content</Text>
      </Container>
    </Container>
    <CodeBlock id="container-sample-nav-code" code={codeBlockContents.containerNav} language="svelte" />
  </Container>

  <!-- Section Container -->
  <Container id="container-sample-section-container" class="flex flex-col gap-2">
    <Text id="container-sample-section-heading" type="h3" class="text-lg font-semibold">Section</Text>
    <Container id="container-sample-section-preview" class="flex flex-col gap-4 rounded-lg border p-6 dark:border-neutral-700">
      <Container
        id="container-sample-section-element"
        type="section"
        overrideDefaultStyling
        class="rounded bg-info-100 p-4 text-center dark:bg-info-900"
      >
        <Text id="container-sample-section-text" class="text-info-900 dark:text-info-100">Section Content</Text>
      </Container>
    </Container>
    <CodeBlock id="container-sample-section-code" code={codeBlockContents.containerSection} language="svelte" />
  </Container>

  <!-- Footer Container -->
  <Container id="container-sample-footer-container" class="flex flex-col gap-2">
    <Text id="container-sample-footer-heading" type="h3" class="text-lg font-semibold">Footer</Text>
    <Container id="container-sample-footer-preview" class="flex flex-col gap-4 rounded-lg border p-6 dark:border-neutral-700">
      <Container
        id="container-sample-footer-element"
        type="footer"
        overrideDefaultStyling
        class="rounded bg-warning-100 p-4 text-center dark:bg-warning-900"
      >
        <Text id="container-sample-footer-text" class="text-warning-900 dark:text-warning-100">Footer Content</Text>
      </Container>
    </Container>
    <CodeBlock id="container-sample-footer-code" code={codeBlockContents.containerFooter} language="svelte" />
  </Container>
</Container>
