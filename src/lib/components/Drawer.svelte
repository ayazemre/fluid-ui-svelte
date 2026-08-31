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
    transitionParams = {},
    backdropTransitionFunction = emptyDrawerTransition,
    backdropTransitionParams,
    children,
  }: {
    id: string;
    variant?: string;
    isOpen?: boolean;
    position?: DrawerPosition;
    closeOnBackdropClick?: boolean;
    scrollLock?: boolean;
    transitionFunction?: (node: Element, parameters?: Record<string, unknown>) => TransitionConfig;
    transitionParams?: TransitionConfig & { x?: number; y?: number };
    backdropTransitionFunction?: (node: Element, parameters?: Record<string, unknown>) => TransitionConfig;
    backdropTransitionParams?: TransitionConfig & { x?: number; y?: number };
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
      class={[variant, "fluid-drawer-panel", "fixed", "z-20", positionClasses[position]].join(" ")}
      {transitionFunction}
      {transitionParams}
    >
      {@render children()}
    </Container>
  </Container>
{/if}
