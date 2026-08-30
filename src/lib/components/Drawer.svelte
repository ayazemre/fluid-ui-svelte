<script lang="ts">
  import { Container } from "#src/lib/base/index.ts";

  import type { Snippet } from "svelte";
  import type { TransitionConfig } from "svelte/transition";

  import { emptyDrawerTransition, positionClasses, setupDrawerLifecycle, type DrawerPosition } from "./drawer.ts";

  let {
    componentId,
    variant = "",
    isOpen = $bindable(false),
    position = "left",
    closeOnBackdropClick = true,
    scrollLock = true,
    transitionFn = emptyDrawerTransition,
    transitionParams = {},
    backdropTransitionFn = emptyDrawerTransition,
    backdropTransitionParams,
    children,
  }: {
    componentId: string;
    variant?: string;
    isOpen?: boolean;
    position?: DrawerPosition;
    closeOnBackdropClick?: boolean;
    scrollLock?: boolean;
    transitionFn?: (node: Element, parameters?: Record<string, unknown>) => TransitionConfig;
    transitionParams?: TransitionConfig & { x?: number; y?: number };
    backdropTransitionFn?: (node: Element, parameters?: Record<string, unknown>) => TransitionConfig;
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
    id={componentId}
    class={[variant, "fluid-drawer-container", "fixed", "inset-0", "z-10"].join(" ")}
    transitionFn={backdropTransitionFn}
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
      onclick={(event: MouseEvent) => event.stopPropagation()}
      class={[variant, "fluid-drawer-panel", "fixed", "z-20", positionClasses[position]].join(" ")}
      {transitionFn}
      {transitionParams}
    >
      {@render children()}
    </Container>
  </Container>
{/if}
