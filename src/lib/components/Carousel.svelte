<script lang="ts" generics="T">
  import { Container } from "#src/lib/base/index.ts";
  import { handleScrollEnd, scrollToIndex } from "#src/lib/utilities/carousel.ts";

  import type { Snippet } from "svelte";

  let {
    componentId = crypto.randomUUID(),
    variant = "",
    orientation = "horizontal",
    snapItems = true,
    activeIndex = $bindable(0),
    autoplay = false,
    autoplayDuration = 1000,
    visibleItemCount = 1,
    items,
    itemTemplate,
  }: {
    componentId?: string;
    variant?: string;
    orientation?: "horizontal" | "vertical";
    snapItems?: boolean;
    activeIndex?: number;
    autoplay?: boolean;
    autoplayDuration?: number;
    visibleItemCount?: number;
    items: Array<T>;
    itemTemplate: Snippet<[{ item: T; index: number }]>;
  } = $props();

  $effect(() => {
    if (autoplay && items.length > 0) {
      const interval = setInterval(() => {
        activeIndex = (activeIndex + 1) % items.length;
      }, autoplayDuration);
      return () => clearInterval(interval);
    }
  });

  $effect(() => {
    if (componentId && items.length > 1) {
      scrollToIndex(componentId, activeIndex, orientation);
    }
  });
</script>

<Container
  id={componentId}
  onscrollend={(e) => handleScrollEnd(e, orientation, activeIndex)}
  class={[
    variant,
    "fluid-carousel-container",
    "relative",
    "flex",
    "scroll-smooth",
    ...(orientation === "vertical"
      ? ["h-full", "flex-col", "overflow-y-auto", snapItems ? "snap-y" : "", snapItems ? "snap-mandatory" : ""]
      : ["overflow-x-auto", snapItems ? "snap-x" : "", snapItems ? "snap-mandatory" : ""]),
  ].join(" ")}
>
  {#each items as item, index}
    <Container
      class={[variant, "fluid-carousel-item", "shrink-0", snapItems ? "snap-start" : ""].join(" ")}
      style="flex-basis: calc(100% / {visibleItemCount})"
    >
      {@render itemTemplate({ item, index })}
    </Container>
  {/each}
</Container>
