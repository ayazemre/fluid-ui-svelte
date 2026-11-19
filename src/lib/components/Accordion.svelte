<script lang="ts">
  import { slide, type TransitionConfig } from "svelte/transition";

  import type { Snippet } from "svelte";

  import { Container, Button } from "../base/index.ts";

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

<Container id={`fluid-accordion-${id}`} class={["fluid-accordion", variant].join(" ")}>
  <Button
    id={`fluid-accordion-header-${id}`}
    onclick={async () => {
      componentState.isExpanded = !componentState.isExpanded;
    }}
    class="fluid-accordion-header"
  >
    {@render header(componentState)}
  </Button>
  {#if componentState.isExpanded}
    <Container
      id={`fluid-accordion-body-${id}`}
      {transitionFunction}
      transitionParameters={{ duration: transitionDuration }}
      class="fluid-accordion-body"
    >
      {@render body()}
    </Container>
  {/if}
</Container>
