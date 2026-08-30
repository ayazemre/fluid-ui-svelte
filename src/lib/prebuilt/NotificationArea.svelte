<script lang="ts" generics="T extends { id: string | number; duration?: number }">
  import { flip } from "svelte/animate";
  import { fade, fly } from "svelte/transition";

  import { Container } from "#src/lib/base/index.ts";
  import {
    getNotificationAreaPositionClass,
    getNotificationFlyParameters,
    removeItemFromList,
    setupNotificationAutoDismiss,
    type NotificationPosition,
  } from "#src/lib/prebuilt/notificationArea.ts";

  import type { Snippet } from "svelte";

  let {
    componentId,
    items = $bindable([]),
    position = "top-right",
    variant = "",
    itemSnippet,
  }: {
    componentId: string;
    items?: T[];
    position?: NotificationPosition;
    variant?: string;
    itemSnippet: Snippet<[item: T, dismiss: () => void]>;
  } = $props();

  $effect(() => {
    return setupNotificationAutoDismiss(
      () => items,
      (id) => {
        items = removeItemFromList(items, id);
      },
    );
  });
</script>

<Container
  id={componentId}
  role="region"
  aria-live="polite"
  class={[variant, "fluid-notification-area", getNotificationAreaPositionClass(position)].join(" ")}
>
  {#each items as item (item.id)}
    <div animate:flip={{ duration: 300 }} in:fly={getNotificationFlyParameters(position)} out:fade={{ duration: 200 }}>
      {@render itemSnippet(item, () => {
        items = removeItemFromList(items, item.id);
      })}
    </div>
  {/each}
</Container>
