<script lang="ts" generics="T extends { id: string | number; duration?: number }">
  import { flip } from "svelte/animate";
  import { fade, fly } from "svelte/transition";

  import type { Snippet } from "svelte";

  import { Container } from "../base/index.ts";
  import {
    getNotificationAreaPositionClass,
    getNotificationFlyParameters,
    removeItemFromList,
    setupNotificationAutoDismiss,
    type NotificationPosition,
  } from "../prebuilt/notificationArea.ts";

  let {
    id,
    items = $bindable([]),
    position = "top-right",
    variant = "",
    itemSnippet,
  }: {
    id: string;
    items?: T[];
    position?: NotificationPosition;
    variant?: string;
    itemSnippet: Snippet<[item: T, dismiss: () => void]>;
  } = $props();

  $effect(() => {
    return setupNotificationAutoDismiss(
      () => items,
      (dismissedItemId) => {
        items = removeItemFromList(items, dismissedItemId);
      },
    );
  });
</script>

<Container
  id={`fluid-notification-area-${id}`}
  role="region"
  aria-live="polite"
  class={["fluid-notification-area", getNotificationAreaPositionClass(position), variant].join(" ")}
>
  {#each items as item (item.id)}
    <!-- Note: raw <div> is intentional — animate:flip cannot be applied through Container's svelte:element -->
    <div
      id={`fluid-notification-item-${item.id}-${id}`}
      class="fluid-notification-item"
      animate:flip={{ duration: 300 }}
      in:fly={getNotificationFlyParameters(position)}
      out:fade={{ duration: 200 }}
    >
      {@render itemSnippet(item, () => {
        items = removeItemFromList(items, item.id);
      })}
    </div>
  {/each}
</Container>
