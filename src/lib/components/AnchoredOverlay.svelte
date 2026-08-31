<script lang="ts">
  import { fade, type TransitionConfig } from "svelte/transition";

  import { Container } from "#src/lib/base/index.ts";

  import type { Snippet } from "svelte";

  import { getAnchoredOverlayPositionClass, setupAnchoredOverlayLifecycle, type AnchoredOverlayPosition } from "./anchoredOverlay.ts";

  let {
    id,
    isOpen = $bindable(false),
    position = "bottom-start",
    autoFlip = true,
    closeOnClickOutside = true,
    closeOnEscape = true,
    variant = "",
    overlayClass = "",
    transitionFunction = fade,
    transitionParameters = { duration: 150 },
    anchor,
    overlay,
  }: {
    id: string;
    isOpen?: boolean;
    position?: AnchoredOverlayPosition;
    autoFlip?: boolean;
    closeOnClickOutside?: boolean;
    closeOnEscape?: boolean;
    variant?: string;
    overlayClass?: string;
    transitionFunction?: (node: Element, parameters?: Record<string, unknown>) => TransitionConfig;
    transitionParameters?: TransitionConfig & Record<string, unknown>;
    anchor: Snippet<[{ close: () => void; isOpen: boolean; open: () => void; toggle: () => void }]>;
    overlay: Snippet<[{ close: () => void }]>;
  } = $props();

  let containerElement = $state<HTMLElement | null>(null);
  let floatElement = $state<HTMLElement | null>(null);
  // svelte-ignore state_referenced_locally
  let activePosition = $state<AnchoredOverlayPosition>(position);

  $effect(() => {
    activePosition = position;
  });

  $effect(() => {
    return setupAnchoredOverlayLifecycle({
      autoFlip,
      closeOnClickOutside,
      closeOnEscape,
      getContainerElement: () => containerElement ?? (typeof document !== "undefined" ? document.getElementById(id) : undefined),
      getFloatElement: () => floatElement ?? (typeof document !== "undefined" ? document.getElementById(`${id}-float`) : undefined),
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
  {id}
  bind:underlyingElement={containerElement}
  overrideDefaultStyling={true}
  class={["fluid-anchored-overlay-container", variant].join(" ")}
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

  {#if isOpen}
    <Container
      id={`${id}-float`}
      bind:underlyingElement={floatElement}
      overrideDefaultStyling={true}
      role="region"
      class={["fluid-anchored-overlay-float", getAnchoredOverlayPositionClass(activePosition), overlayClass].join(" ")}
      {transitionFunction}
      transitionParameters={transitionParameters}
    >
      {@render overlay({
        close: () => {
          isOpen = false;
        },
      })}
    </Container>
  {/if}
</Container>
