<script lang="ts">
  import { fade, scale, type TransitionConfig } from "svelte/transition";

  import { Container } from "#src/lib/base/index.ts";

  import type { Snippet } from "svelte";

  import { setupModalLifecycle } from "./modal.ts";

  let {
    componentId,
    variant = "",
    isOpen = $bindable(false),
    closeOnBackdropClick = true,
    scrollLock = true,
    transitionFn = scale,
    transitionParams = { duration: 200, start: 0.95 },
    backdropTransitionFn = fade,
    backdropTransitionParams = { duration: 200 },
    children,
  }: {
    componentId: string;
    variant?: string;
    isOpen?: boolean;
    closeOnBackdropClick?: boolean;
    scrollLock?: boolean;
    transitionFn?: (node: Element, parameters?: any) => TransitionConfig;
    transitionParams?: Record<string, unknown>;
    backdropTransitionFn?: (node: Element, parameters?: any) => TransitionConfig;
    backdropTransitionParams?: Record<string, unknown>;
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
    id={componentId}
    class={[variant, "fluid-modal-container"].join(" ")}
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
    <div
      id="{componentId}-panel"
      onclick={(event: MouseEvent) => event.stopPropagation()}
      onkeydown={(event: KeyboardEvent) => event.stopPropagation()}
      role="presentation"
      class={[variant, "fluid-modal-panel"].join(" ")}
      transition:transitionFn={transitionParams}
    >
      {@render children()}
    </div>
  </Container>
{/if}
