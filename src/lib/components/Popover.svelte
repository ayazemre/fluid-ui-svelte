<script lang="ts">
  import { fade, type TransitionConfig } from "svelte/transition";

  import { Container, Button } from "#src/lib/base/index.ts";
  import { mergeClasses } from "#src/lib/utilities/common.ts";

  import type { Snippet } from "svelte";

  let {
    variant = "",
    componentId = crypto.randomUUID(),
    trigger,
    content,
    isOpen = $bindable(false),
    position = "bottom",
    transitionFn = fade,
    transitionParams = { duration: 150 },
  }: {
    variant?: string;
    componentId?: string;
    trigger: Snippet<[{ isOpen: boolean }]>;
    content: Snippet;
    isOpen?: boolean;
    position?: "top" | "bottom" | "left" | "right";
    transitionFn?: (node: Element, params?: any) => TransitionConfig;
    transitionParams?: any;
  } = $props();

  function toggle() {
    isOpen = !isOpen;
  }

  function close() {
    isOpen = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      close();
    }
  }
</script>

<Container id={componentId} class={mergeClasses(variant, "fluid-popover-container inline-block")} onkeydown={handleKeydown}>
  <Button
    onclick={async () => toggle()}
    class={mergeClasses(variant, "fluid-popover-trigger inline-block")}
    aria-expanded={isOpen}
    aria-haspopup="true"
  >
    {@render trigger({ isOpen })}
  </Button>

  {#if isOpen}
    <div
      id="{componentId}-content"
      onclick={(e) => e.stopPropagation()}
      onkeydown={(e) => e.stopPropagation()}
      role="presentation"
      class={mergeClasses(variant, `fluid-popover-content fluid-popover-${position}`)}
      transition:transitionFn={transitionParams}
    >
      {@render content()}
    </div>
    <div
      id="{componentId}-backdrop"
      class="fluid-popover-backdrop fixed inset-0 z-40"
      onclick={close}
      onkeydown={(e) => e.key === "Enter" && close()}
      role="presentation"
    ></div>
  {/if}
</Container>
