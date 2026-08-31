<script lang="ts">
  import { Container } from "#src/lib/base/index.ts";

  import type { Snippet } from "svelte";
  import type { TransitionConfig } from "svelte/transition";

  import { emptyDrawerTransition, positionClasses, setupDrawerLifecycle, type DrawerPosition } from "./drawer.ts";

  let {
    id,
    variant = "",
    isOpen = $bindable(false),
    position = "left",
    closeOnBackdropClick = true,
    scrollLock = true,
    transitionFunction = emptyDrawerTransition,
    transitionParameters = {},
    backdropTransitionFunction = emptyDrawerTransition,
    backdropTransitionParameters,
    children,
  }: {
    id: string;
    variant?: string;
    isOpen?: boolean;
    position?: DrawerPosition;
    closeOnBackdropClick?: boolean;
    scrollLock?: boolean;
    transitionFunction?: (node: Element, parameters?: Record<string, unknown>) => TransitionConfig;
    transitionParameters?: TransitionConfig & Record<string, unknown>;
    backdropTransitionFunction?: (node: Element, parameters?: Record<string, unknown>) => TransitionConfig;
    backdropTransitionParameters?: TransitionConfig & Record<string, unknown>;
    children: Snippet;
  } = $props();

  $effect(() => {
    return setupDrawerLifecycle(isOpen, scrollLock, () => {
      isOpen = false;
    });
  });
</script>

{#if isOpen}
  <Container
    {id}
    class={[variant, "fluid-drawer-container", "fixed", "inset-0", "z-10"].join(" ")}
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
      id={`${id}-panel`}
      onclick={(event: MouseEvent) => event.stopPropagation()}
      class={[variant, "fluid-drawer-panel", "fixed", "z-20", positionClasses[position]].join(" ")}
      {transitionFunction}
      {transitionParameters}
    >
      {@render children()}
    </Container>
  </Container>
{/if}
