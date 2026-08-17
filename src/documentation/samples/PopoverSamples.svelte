<script lang="ts">
  import { Container, Text, Button } from "#src/lib/base/index.ts";
  import { Popover,CodeBlock } from "#src/lib/components/index.ts";
  
  import { codeBlockContents } from "./codeBlockContents.ts";
</script>

<Container class="flex flex-col gap-10">
  <Container class="flex flex-col gap-2">
    <Text type="h1">Popover Samples</Text>
    <Text class="text-neutral-500">A flexible popover component for tooltips, dropdowns, and more.</Text>
  </Container>

  <!-- 1. Basic Popover -->
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-xl font-bold">1. Basic Popover</Text>
    <Text class="text-neutral-500">Standard popover that toggles on click.</Text>
    <Container class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <Popover>
        {#snippet trigger()}
          <Text class="bg-primary-500 text-white p-2 rounded-md">Click Me</Text>
        {/snippet}
        {#snippet content()}
          <Container class="flex flex-col gap-2">
            <Text type="strong">Popover Title</Text>
            <Text>This is a basic popover content with custom elements inside.</Text>
          </Container>
        {/snippet}
      </Popover>
    </Container>
    <CodeBlock code={codeBlockContents.popoverBasic} language="svelte" />
  </Container>

  <!-- 2. Positions -->
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-xl font-bold">2. Positions</Text>
    <Text class="text-neutral-500">Popovers can be positioned in four different directions.</Text>
    <Container class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <Container class="flex flex-wrap gap-20 justify-center py-10">
        <Popover position="top">
          {#snippet trigger()}
            <Text class="border border-primary-500 text-primary-500 p-2 rounded-md">Top</Text>
          {/snippet}
          {#snippet content()}
            <Text>Content on top</Text>
          {/snippet}
        </Popover>

        <Popover position="bottom">
          {#snippet trigger()}
            <Text class="border border-primary-500 text-primary-500 p-2 rounded-md">Bottom</Text>
          {/snippet}
          {#snippet content()}
            <Text>Content on bottom</Text>
          {/snippet}
        </Popover>

        <Popover position="left">
          {#snippet trigger()}
            <Text class="border border-primary-500 text-primary-500 p-2 rounded-md">Left</Text>
          {/snippet}
          {#snippet content()}
            <Text>Content on left</Text>
          {/snippet}
        </Popover>

        <Popover position="right">
          {#snippet trigger()}
            <Text class="border border-primary-500 text-primary-500 p-2 rounded-md">Right</Text>
          {/snippet}
          {#snippet content()}
            <Text>Content on right</Text>
          {/snippet}
        </Popover>
      </Container>
    </Container>
    <CodeBlock code={codeBlockContents.popoverPositions} language="svelte" />
  </Container>
</Container>
