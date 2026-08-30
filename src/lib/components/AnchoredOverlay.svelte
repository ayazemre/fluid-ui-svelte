<script lang="ts">
  import { fade, type TransitionConfig } from "svelte/transition";

  import { Container } from "#src/lib/base/index.ts";
  import {
    getAnchoredOverlayPositionClass,
    setupAnchoredOverlayLifecycle,
    type AnchoredOverlayPosition,
    type TriggerMode,
  } from "#src/lib/components/anchoredOverlay.ts";

  import type { Snippet } from "svelte";

  let {
    componentId,
    isOpen = $bindable(false),
    position = "bottom-start",
    autoFlip = true,
    triggerMode = "click",
    closeOnClickOutside = true,
    closeOnEscape = true,
    variant = "",
    overlayClass = "",
    transitionFn = fade,
    transitionParams = { duration: 150 },
    anchor,
    overlay,
  }: {
    componentId: string;
    isOpen?: boolean;
    position?: AnchoredOverlayPosition;
    autoFlip?: boolean;
    triggerMode?: TriggerMode;
    closeOnClickOutside?: boolean;
    closeOnEscape?: boolean;
    variant?: string;
    overlayClass?: string;
    transitionFn?: (node: Element, params?: any) => TransitionConfig;
    transitionParams?: any;
    anchor: Snippet<[{ close: () => void; isOpen: boolean; open: () => void; toggle: () => void }]>;
    overlay: Snippet<[{ close: () => void }]>;
  } = $props();

  let containerElement = $state<HTMLElement | undefined>(undefined);
  let floatElement = $state<HTMLElement | undefined>(undefined);
  let activePosition = $state<AnchoredOverlayPosition>(position);

  $effect(() => {
    activePosition = position;
  });

  $effect(() => {
    return setupAnchoredOverlayLifecycle({
      autoFlip,
      closeOnClickOutside,
      closeOnEscape,
      getContainerElement: () => containerElement ?? (typeof document !== "undefined" ? document.getElementById(componentId) : undefined),
      getFloatElement: () => floatElement ?? (typeof document !== "undefined" ? document.getElementById(`${componentId}-float`) : undefined),
      getIsOpen: () => isOpen,
      onClose: () => {
        isOpen = false;
      },
      onPositionChange: (newPosition) => {
        activePosition = newPosition;
      },
      preferredPosition: position,
    });
  });
</script>

<Container
  id={componentId}
  bind:element={containerElement}
  overrideDefaultStyling={true}
  class={["fluid-anchored-overlay-container", variant].join(" ")}
  onmouseenter={() => {
    if (triggerMode === "hover") {
      isOpen = true;
    }
  }}
  onmouseleave={() => {
    if (triggerMode === "hover") {
      isOpen = false;
    }
  }}
  onfocusin={() => {
    if (triggerMode === "focus") {
      isOpen = true;
    }
  }}
  onfocusout={(event) => {
    if (triggerMode === "focus") {
      const nextTarget = event.relatedTarget as Node | null;
      const targetContainer = containerElement ?? (typeof document !== "undefined" ? document.getElementById(componentId) : null);
      if (!targetContainer?.contains(nextTarget)) {
        isOpen = false;
      }
    }
  }}
>
  <Container
    overrideDefaultStyling={true}
    class="fluid-anchored-overlay-anchor inline-block"
    role="presentation"
    onclick={() => {
      if (triggerMode === "click") {
        isOpen = !isOpen;
      }
    }}
    onkeydown={(event) => {
      if (triggerMode === "click" && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        isOpen = !isOpen;
      }
    }}
  >
    {@render anchor({
      close: () => {
        isOpen = false;
      },
      isOpen,
      open: () => {
        isOpen = true;
      },
      toggle: () => {
        isOpen = !isOpen;
      },
    })}
  </Container>

  {#if isOpen}
    <Container
      id="{componentId}-float"
      bind:element={floatElement}
      overrideDefaultStyling={true}
      role="region"
      class={["fluid-anchored-overlay-float", getAnchoredOverlayPositionClass(activePosition), overlayClass].join(" ")}
      {transitionFn}
      {transitionParams}
    >
      {@render overlay({
        close: () => {
          isOpen = false;
        },
      })}
    </Container>
  {/if}
</Container>
