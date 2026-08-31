<script lang="ts">
  import { fade, scale, type TransitionConfig } from "svelte/transition";

  import { Container } from "#src/lib/base/index.ts";

  import type { Snippet } from "svelte";

  import { setupModalLifecycle } from "./modal.ts";

  let {
    id,
    variant = "",
    isOpen = $bindable(false),
    closeOnBackdropClick = true,
    scrollLock = true,
    transitionFunction = scale,
    transitionParams = { duration: 200, start: 0.95 },
    backdropTransitionFunction = fade,
    backdropTransitionParams = { duration: 200 },
    children,
  }: {
    id: string;
    variant?: string;
    isOpen?: boolean;
    closeOnBackdropClick?: boolean;
    scrollLock?: boolean;
    transitionFunction?: (node: Element, parameters?: Record<string, unknown>) => TransitionConfig;
    transitionParams?: TransitionConfig & Record<string, unknown>;
    backdropTransitionFunction?: (node: Element, parameters?: Record<string, unknown>) => TransitionConfig;
    backdropTransitionParams?: TransitionConfig & Record<string, unknown>;
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
    {id}
    class={[variant, "fluid-modal-container"].join(" ")}
    transitionFunction={backdropTransitionFunction}
    transitionParams={backdropTransitionParams}
    onclick={() => {
      if (closeOnBackdropClick) {
        isOpen = false;
      }
    }}
    role="dialog"
    aria-modal="true"
  >
    <Container
      id={`${id}-panel`}
      onclick={(event: MouseEvent) => event.stopPropagation()}
      onkeydown={(event: KeyboardEvent) => event.stopPropagation()}
      role="presentation"
      class={[variant, "fluid-modal-panel"].join(" ")}
      {transitionFunction}
      {transitionParams}
    >
      {@render children()}
    </Container>
  </Container>
{/if}
