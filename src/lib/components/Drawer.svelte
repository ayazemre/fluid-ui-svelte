<script lang="ts">
  import { Container } from "#src/lib/base/index.ts";
  import { positionClasses } from "#src/lib/utilities/drawer.ts";

  import type { Snippet } from "svelte";
  import type { TransitionConfig } from "svelte/transition";

  let {
    variant = "",
    componentId,
    isOpen = $bindable(false),
    position = "left",
    closeOnBackdropClick = true,
    scrollLock = true,
    transitionFn = (node: Element, params?: any) => {
      return {};
    },
    transitionParams = {},
    backdropTransitionFn = (node: Element, params?: any) => {
      return {};
    },
    backdropTransitionParams,
    children,
  }: {
    isOpen?: boolean;
    position?: "left" | "right" | "top" | "bottom";
    closeOnBackdropClick?: boolean;
    scrollLock?: boolean;
    variant?: string;
    componentId?: string;
    transitionFn?: (node: Element, params?: any) => TransitionConfig;
    transitionParams?: TransitionConfig & { x?: number; y?: number };
    backdropTransitionFn?: (node: Element, params?: any) => TransitionConfig;
    backdropTransitionParams?: TransitionConfig & { x?: number; y?: number };
    children: Snippet;
  } = $props();

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape" && isOpen) {
      isOpen = false;
    }
  }

  $effect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      if (scrollLock) document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        if (scrollLock) document.body.style.overflow = originalStyle;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  });
</script>

{#if isOpen}
  <Container
    id={componentId}
    class={[variant, "fluid-drawer-container", "fixed", "inset-0", "z-10"].join(" ")}
    transitionFn={backdropTransitionFn}
    transitionParams={backdropTransitionParams}
    onclick={async () => {
      if (closeOnBackdropClick) isOpen = false;
    }}
    role="dialog"
    aria-modal="true"
  >
    <Container
      onclick={(event) => event.stopPropagation()}
      class={[variant, "fluid-drawer-panel", "fixed", "z-20", positionClasses[position]].join(" ")}
      {transitionFn}
      {transitionParams}
    >
      {@render children()}
    </Container>
  </Container>
{/if}
