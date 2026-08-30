<script lang="ts">
  import { Button, Container, Text } from "#src/lib/base/index.ts";
  import { AnchoredOverlay, CodeBlock } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";
</script>

<Container class="flex flex-col gap-10">
  <Container class="flex flex-col gap-2">
    <Text type="h1">Anchored Overlay Samples</Text>
    <Text class="text-neutral-500">A foundational positioning primitive that anchors a floating overlay to a trigger element.</Text>
  </Container>

  <!-- 1. Click Trigger -->
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-xl font-bold">1. Click Trigger</Text>
    <Text class="text-neutral-500">Toggles the floating overlay on click and closes on outside clicks or Escape.</Text>
    <Container class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <AnchoredOverlay componentId="anchored-overlay-click-demo" triggerMode="click" position="bottom-start">
        {#snippet anchor()}
          <Button class="fluid-button-primary">Click to Toggle</Button>
        {/snippet}
        {#snippet overlay({ close })}
          <div class="flex flex-col gap-2 p-2">
            <Text type="strong">Floating Overlay</Text>
            <Text class="text-sm">Opened via click trigger.</Text>
            <Button onclick={async () => close()} class="fluid-button-secondary text-xs">Close</Button>
          </div>
        {/snippet}
      </AnchoredOverlay>
    </Container>
    <CodeBlock code={codeBlockContents.anchoredOverlayClick} language="svelte" />
  </Container>

  <!-- 2. Hover Trigger -->
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-xl font-bold">2. Hover Trigger</Text>
    <Text class="text-neutral-500">Opens the floating overlay when hovering or focusing the anchor element.</Text>
    <Container class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <AnchoredOverlay componentId="anchored-overlay-hover-demo" triggerMode="hover" position="top">
        {#snippet anchor()}
          <span class="inline-flex cursor-pointer rounded-lg bg-neutral-100 px-3 py-1.5 text-sm font-medium dark:bg-neutral-800">
            Hover Over Me
          </span>
        {/snippet}
        {#snippet overlay()}
          <div class="px-2 py-1 text-xs">
            <Text>Opened via hover trigger.</Text>
          </div>
        {/snippet}
      </AnchoredOverlay>
    </Container>
    <CodeBlock code={codeBlockContents.anchoredOverlayHover} language="svelte" />
  </Container>
</Container>
