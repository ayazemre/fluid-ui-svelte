<script lang="ts">
  import { slide, type TransitionConfig } from "svelte/transition";

  import { Container, Button } from "#src/lib/base/index.ts";

  import type { Snippet } from "svelte";

  const {
    id,
    variant = "",
    header,
    body,
    transitionFunction = slide,
    transitionDuration = 250,
  }: {
    id: string;
    variant?: string;
    header: Snippet<[{ isExpanded: boolean }]>;
    body: Snippet;
    transitionFunction?: (node: Element, parameters?: Record<string, unknown>) => TransitionConfig;
    transitionDuration?: number;
  } = $props();
  const componentState = $state({ isExpanded: false });
</script>

<Container {id} class={[variant, "fluid-accordion-wrapper", "flex"].join(" ")}>
  <Button
    id={`${id}-header-button`}
    onclick={async () => {
      componentState.isExpanded = !componentState.isExpanded;
    }}
    class={[variant, "fluid-accordion-header", "flex", "w-full", "cursor-pointer", "flex-nowrap", "justify-between"].join(" ")}
  >
    {@render header(componentState)}
  </Button>
  {#if componentState.isExpanded}
    <Container
      id={`${id}-body-container`}
      {transitionFunction}
      transitionParameters={{ duration: transitionDuration }}
      class={[variant, "fluid-accordion-body"].join(" ")}
    >
      {@render body()}
    </Container>
  {/if}
</Container>
