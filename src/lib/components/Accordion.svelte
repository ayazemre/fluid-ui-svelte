<script lang="ts">
  import { slide, type TransitionConfig } from "svelte/transition";

  import { Container, Button } from "#src/lib/base/index.ts";

  import type { Snippet } from "svelte";

  const {
    variant = "",
    componentId,
    header,
    body,
    transitionFunction = slide,
    transitionDuration = 250,
  }: {
    variant?: string;
    componentId?: string;
    header: Snippet<[{ isExpanded: boolean }]>;
    body: Snippet;
    transitionFunction?: (node: Element, params?: any) => TransitionConfig;
    transitionDuration?: number;
  } = $props();
  const componentState = $state({ isExpanded: false });
</script>

<Container id={componentId} class={[variant, "fluid-accordion-wrapper", "flex"].join(" ")}>
  <Button
    onclick={async () => {
      componentState.isExpanded = !componentState.isExpanded;
    }}
    class={[variant, "fluid-accordion-header", "flex", "w-full", "cursor-pointer", "flex-nowrap", "justify-between"].join(" ")}
  >
    {@render header(componentState)}
  </Button>
  {#if componentState.isExpanded}
    <Container
      transitionFn={transitionFunction}
      transitionParams={{ duration: transitionDuration }}
      class={[variant, "fluid-accordion-body"].join(" ")}
    >
      {@render body()}
    </Container>
  {/if}
</Container>
