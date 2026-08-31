<script lang="ts">
  import { Container, Text } from "#src/lib/base/index.ts";
  import { CodeBlock } from "#src/lib/components/index.ts";
  import { Breadcrumb } from "#src/lib/prebuilt/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  const items = [
    { href: "/", label: "Home" },
    { href: "/documentation/prebuilt", label: "Prebuilt" },
    { href: "/documentation/prebuilt/breadcrumb", label: "Breadcrumb" },
  ];
</script>

<Container id="breadcrumb-samples-container" class="flex flex-col gap-10">
  <Container id="breadcrumb-samples-header" class="flex flex-col gap-2">
    <Text id="breadcrumb-samples-title" type="h1">Breadcrumb Samples</Text>
    <Text id="breadcrumb-samples-description" class="text-neutral-500">A navigation aid that allows users to keep track of their location within programs, documents, or websites.</Text>
  </Container>

  <!-- 1. Basic Breadcrumb -->
  <Container id="breadcrumb-sample-basic-section" class="flex flex-col gap-4">
    <Text id="breadcrumb-sample-basic-heading" type="h3" class="text-xl font-bold">1. Basic Breadcrumb</Text>
    <Text id="breadcrumb-sample-basic-description" class="text-neutral-500">Standard breadcrumb with default separator.</Text>
    <Container id="breadcrumb-sample-basic-preview" class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <Breadcrumb id="breadcrumb-basic-sample" {items} />
    </Container>
    <CodeBlock id="breadcrumb-sample-basic-code" code={codeBlockContents.breadcrumbBasic} language="svelte" />
  </Container>

  <!-- 2. Custom Separator -->
  <Container id="breadcrumb-sample-separator-section" class="flex flex-col gap-4">
    <Text id="breadcrumb-sample-separator-heading" type="h3" class="text-xl font-bold">2. Custom Separator</Text>
    <Text id="breadcrumb-sample-separator-description" class="text-neutral-500">You can provide a custom string or snippet as a separator.</Text>
    <Container id="breadcrumb-sample-separator-preview" class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <Breadcrumb id="breadcrumb-separator-sample" {items} separator=">" />
    </Container>
    <CodeBlock id="breadcrumb-sample-separator-code" code={codeBlockContents.breadcrumbSeparator} language="svelte" />
  </Container>
</Container>
