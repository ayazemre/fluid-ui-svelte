<script lang="ts">
  import { Container, Text } from "#src/lib/base/index.ts";
  import { CodeBlock, Breadcrumb } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  const items = [
    { href: "/", label: "Home" },
    { href: "/documentation/components", label: "Components" },
    { href: "/documentation/components/breadcrumb", label: "Breadcrumb" },
  ];
</script>

<Container class="flex flex-col gap-10">
  <Container class="flex flex-col gap-2">
    <Text type="h1">Breadcrumb Samples</Text>
    <Text class="text-neutral-500">A navigation aid that allows users to keep track of their location within programs, documents, or websites.</Text>
  </Container>

  <!-- 1. Basic Breadcrumb -->
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-xl font-bold">1. Basic Breadcrumb</Text>
    <Text class="text-neutral-500">Standard breadcrumb with default separator.</Text>
    <Container class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <Breadcrumb {items} />
    </Container>
    <CodeBlock code={codeBlockContents.breadcrumbBasic} language="svelte" />
  </Container>

  <!-- 2. Custom Separator -->
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-xl font-bold">2. Custom Separator</Text>
    <Text class="text-neutral-500">You can provide a custom string or snippet as a separator.</Text>
    <Container class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <Breadcrumb {items} separator=">" />
    </Container>
    <CodeBlock code={codeBlockContents.breadcrumbSeparator} language="svelte" />
  </Container>
</Container>
