<script lang="ts" generics="T">
  import { Container } from "#src/lib/base/index.ts";

  import type { Snippet } from "svelte";

  import { getCarouselScrollMetrics, scrollToIndex, type CarouselScrollMetrics } from "./carousel.ts";

  let {
    id,
    variant = "",
    orientation = "horizontal",
    snapItems = true,
    activeIndex = $bindable(0),
    scrollPercentage = $bindable(0),
    autoplay = false,
    autoplayDuration = 1000,
    visibleItemCount = 1,
    items,
    itemTemplate,
    onscroll,
    onscrollend,
  }: {
    id: string;
    variant?: string;
    orientation?: "horizontal" | "vertical";
    snapItems?: boolean;
    activeIndex?: number;
    scrollPercentage?: number;
    autoplay?: boolean;
    autoplayDuration?: number;
    visibleItemCount?: number;
    items: Array<T>;
    itemTemplate: Snippet<[{ item: T; index: number }]>;
    onscroll?: (event: Event, metrics: CarouselScrollMetrics) => void;
    onscrollend?: (event: Event, metrics: CarouselScrollMetrics) => void;
  } = $props();

  let containerElement: HTMLElement | undefined = $state(undefined);
  let isUserScrolling: boolean = false;
  let lastProgrammaticIndex: number = activeIndex;

  $effect(() => {
    if (autoplay && items.length > 0) {
      const autoplayInterval = setInterval(() => {
        activeIndex = (activeIndex + 1) % items.length;
      }, autoplayDuration);
      return () => clearInterval(autoplayInterval);
    }
  });

  $effect(() => {
    if (containerElement && items.length > 1 && !isUserScrolling && activeIndex !== lastProgrammaticIndex) {
      lastProgrammaticIndex = activeIndex;
      scrollToIndex(containerElement, activeIndex, orientation);
    }
  });

  function handleScroll(event: Event): void {
    if (!containerElement) {
      return;
    }
    isUserScrolling = true;
    const metrics = getCarouselScrollMetrics(containerElement, orientation);
    scrollPercentage = metrics.scrollPercentage;
    onscroll?.(event, metrics);
  }

  function handleScrollEnd(event: Event): void {
    if (!containerElement) {
      return;
    }
    const metrics = getCarouselScrollMetrics(containerElement, orientation);
    scrollPercentage = metrics.scrollPercentage;
    activeIndex = metrics.activeIndex;
    lastProgrammaticIndex = metrics.activeIndex;
    isUserScrolling = false;
    onscrollend?.(event, metrics);
  }
</script>

<Container
  {id}
  bind:underlyingElement={containerElement}
  onscroll={handleScroll}
  onscrollend={handleScrollEnd}
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
      id={`${id}-item-${index}`}
      class={[variant, "fluid-carousel-item", "shrink-0", snapItems ? "snap-start" : ""].join(" ")}
      style="flex-basis: calc(100% / {visibleItemCount})"
    >
      {@render itemTemplate({ item, index })}
    </Container>
  {/each}
</Container>
