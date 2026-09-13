<script lang="ts">
  import { Button, Container, Text } from "#src/lib/base/index.ts";
  import { AnchoredOverlay, CodeBlock } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";
</script>

<Container id="anchored-overlay-samples-container" class="flex flex-col gap-10">
  <Container id="anchored-overlay-samples-header" class="flex flex-col gap-2">
    <Text id="anchored-overlay-samples-title" type="h1">Anchored Overlay Samples</Text>
    <Text id="anchored-overlay-samples-description" class="text-neutral-500"
      >A foundational positioning primitive that anchors a floating overlay to a trigger element.</Text
    >
  </Container>

  <!-- 1. Click Trigger -->
  <Container id="anchored-overlay-sample-click-section" class="flex flex-col gap-4">
    <Text id="anchored-overlay-sample-click-heading" type="h3" class="text-xl font-bold">1. Click Trigger</Text>
    <Text id="anchored-overlay-sample-click-description" class="text-neutral-500"
      >Toggles the floating overlay on click and closes on outside clicks or Escape.</Text
    >
    <Container id="anchored-overlay-sample-click-preview" class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <AnchoredOverlay id="anchored-overlay-click-demo" position="bottom-start">
        {#snippet anchor({ toggle })}
          <Button onclick={async () => toggle()} id="anchored-overlay-click-trigger" class="fluid-button-primary">Click to Toggle</Button>
        {/snippet}
        {#snippet overlay({ close })}
          <Container id="anchored-overlay-click-content" class="flex flex-col gap-2 p-2">
            <Text id="anchored-overlay-click-title" type="strong">Floating Overlay</Text>
            <Text id="anchored-overlay-click-text" class="text-sm">Opened via click trigger.</Text>
            <Button id="anchored-overlay-click-close-btn" onclick={async () => close()} class="fluid-button-secondary text-xs">Close</Button>
          </Container>
        {/snippet}
      </AnchoredOverlay>
    </Container>
    <CodeBlock id="anchored-overlay-sample-click-code" code={codeBlockContents.anchoredOverlayClick} language="svelte" />
  </Container>

  <!-- 2. Hover Trigger -->
  <Container id="anchored-overlay-sample-hover-section" class="flex flex-col gap-4">
    <Text id="anchored-overlay-sample-hover-heading" type="h3" class="text-xl font-bold">2. Hover Trigger</Text>
    <Text id="anchored-overlay-sample-hover-description" class="text-neutral-500"
      >Opens the floating overlay when hovering the anchor element. Wire onmouseenter/onmouseleave to open/close directly on the anchor.</Text
    >
    <Container id="anchored-overlay-sample-hover-preview" class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <AnchoredOverlay id="anchored-overlay-hover-demo" position="top">
        {#snippet anchor({ open, close })}
          <Text
            id="anchored-overlay-hover-trigger"
            type="span"
            class="inline-flex cursor-pointer rounded-lg bg-neutral-100 px-3 py-1.5 text-sm font-medium dark:bg-neutral-800"
            onmouseenter={() => open()}
            onmouseleave={() => close()}
          >
            Hover Over Me
          </Text>
        {/snippet}
        {#snippet overlay()}
          <Container id="anchored-overlay-hover-content" class="px-2 py-1 text-xs">
            <Text id="anchored-overlay-hover-text">Opened via hover trigger.</Text>
          </Container>
        {/snippet}
      </AnchoredOverlay>
    </Container>
    <CodeBlock id="anchored-overlay-sample-hover-code" code={codeBlockContents.anchoredOverlayHover} language="svelte" />
  </Container>
</Container>
