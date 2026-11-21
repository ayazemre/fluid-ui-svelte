<script lang="ts">
  import { fade, scale, type TransitionConfig } from "svelte/transition";

  import type { Snippet } from "svelte";

  import { Container } from "../base/index.ts";
  import { setupModalLifecycle } from "./modal.ts";

  let {
    id,
    variant = "",
    isOpen = $bindable(false),
    closeOnBackdropClick = true,
    scrollLock = true,
    transitionFunction = scale,
    transitionParameters = { duration: 200, start: 0.95 },
    backdropTransitionFunction = fade,
    backdropTransitionParameters = { duration: 200 },
    children,
  }: {
    id: string;
    variant?: string;
    isOpen?: boolean;
    closeOnBackdropClick?: boolean;
    scrollLock?: boolean;
    transitionFunction?: (node: Element, parameters?: Record<string, unknown>) => TransitionConfig;
    transitionParameters?: TransitionConfig & Record<string, unknown>;
    backdropTransitionFunction?: (node: Element, parameters?: Record<string, unknown>) => TransitionConfig;
    backdropTransitionParameters?: TransitionConfig & Record<string, unknown>;
    children: Snippet;
  } = $props();

  $effect(() => {
    return setupModalLifecycle(isOpen, scrollLock, () => {
      isOpen = false;
    });
  });
</script>

{#if isOpen}
  <Container
    id={`fluid-modal-${id}`}
    class={["fluid-modal", variant].join(" ")}
    transitionFunction={backdropTransitionFunction}
    transitionParameters={backdropTransitionParameters}
    onclick={() => {
      if (closeOnBackdropClick) {
        isOpen = false;
      }
    }}
    role="dialog"
    aria-modal="true"
  >
    <Container
      id={`fluid-modal-panel-${id}`}
      onclick={(event: MouseEvent) => event.stopPropagation()}
      role="presentation"
      class="fluid-modal-panel"
      {transitionFunction}
      {transitionParameters}
    >
      {@render children()}
    </Container>
  </Container>
{/if}
