<script lang="ts">
  import { Button, Container, Text } from "#src/lib/base/index.ts";
  import { Carousel, CodeBlock } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  const items = [
    { color: "bg-primary-500", text: "1" },
    { color: "bg-secondary-500", text: "2" },
    { color: "bg-success-500", text: "3" },
    { color: "bg-warning-500", text: "4" },
    { color: "bg-error-500", text: "5" },
    { color: "bg-info-500", text: "6" },
    { color: "bg-neutral-500", text: "7" },
    { color: "bg-primary-700", text: "8" },
  ];

  // Horizontal Control State
  let h_multi_index = $state(0);
  let h_multi_count = $state(2);

  // Autoplay State
  let isAutoplayActive = $state(true);
  let autoplayDuration = $state(2000);
  let autoplayActiveIndex = $state(0);

  // Vertical Control State
  let v_multi_index = $state(0);
  let v_multi_count = $state(2);

  const scroll = (dir: "next" | "prev", idx: number, setIdx: (n: number) => void, len: number) => {
    const newIdx = dir === "next" ? (idx + 1) % len : (idx - 1 + len) % len;
    setIdx(newIdx);
  };
</script>

<Container id="carousel-samples-container" class="flex flex-col gap-10">
  <Container id="carousel-horizontal-header-container" class="flex flex-col gap-2">
    <Text id="carousel-horizontal-title" type="h1">Horizontal Examples</Text>
    <Text id="carousel-horizontal-description" class="text-neutral-500">Standard horizontal scrolling behavior.</Text>
  </Container>

  <!-- 1. Horizontal - Default (1 Item) -->
  <Container id="carousel-sample-h-1-section" class="flex flex-col gap-4">
    <Text id="carousel-sample-h-1-heading" type="h3" class="text-xl font-bold">1. Default (1 Item)</Text>
    <Text id="carousel-sample-h-1-description" class="text-neutral-500">Standard full-width carousel with snapping.</Text>
    <Container id="carousel-sample-h-1-preview" class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <Container id="carousel-sample-h-1-wrapper" class="w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
        <Carousel id="h-1-default" {items} visibleItemCount={1}>
          {#snippet itemTemplate({ item, index })}
            <Container id={`carousel-h-1-item-${index}`} class="flex h-40 w-full items-center justify-center {item.color} text-white">
              <Text id={`carousel-h-1-text-${index}`} type="h2" class="text-4xl font-bold">{item.text}</Text>
            </Container>
          {/snippet}
        </Carousel>
      </Container>
    </Container>
    <CodeBlock id="carousel-sample-h-1-code" code={codeBlockContents.carouselInteractive} language="svelte" />
  </Container>

  <!-- 2. Horizontal - Autoplay -->
  <Container id="carousel-sample-h-autoplay-section" class="flex flex-col gap-4">
    <Text id="carousel-sample-h-autoplay-heading" type="h3" class="text-xl font-bold">2. Autoplay</Text>
    <Text id="carousel-sample-h-autoplay-description" class="text-neutral-500">Automatically advances slides at a specified interval with manual override support.</Text>

    <Container id="carousel-sample-h-autoplay-controls" class="flex flex-wrap items-center gap-4">
      <Button id="carousel-autoplay-toggle-btn" class={isAutoplayActive ? "fluid-button-error" : "fluid-button-primary"} onclick={async () => (isAutoplayActive = !isAutoplayActive)}>
        {isAutoplayActive ? "Pause Autoplay" : "Start Autoplay"}
      </Button>
      <Button id="carousel-autoplay-duration-btn" class="fluid-button-secondary" onclick={async () => (autoplayDuration = autoplayDuration === 1000 ? 2500 : 1000)}>
        Duration: {autoplayDuration}ms
      </Button>
      <Text id="carousel-autoplay-slide-indicator" class="text-sm font-medium text-neutral-600 dark:text-neutral-400">
        Active Slide: {autoplayActiveIndex + 1} / {items.length}
      </Text>
    </Container>

    <Container id="carousel-sample-h-autoplay-preview" class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <Container id="carousel-sample-h-autoplay-wrapper" class="w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
        <Carousel
          id="h-autoplay"
          {items}
          autoplay={isAutoplayActive}
          {autoplayDuration}
          bind:activeIndex={autoplayActiveIndex}
          visibleItemCount={1}
        >
          {#snippet itemTemplate({ item, index })}
            <Container id={`carousel-h-autoplay-item-${index}`} class="flex h-40 w-full items-center justify-center {item.color} text-white">
              <Text id={`carousel-h-autoplay-text-${index}`} type="h2" class="text-4xl font-bold">{item.text}</Text>
            </Container>
          {/snippet}
        </Carousel>
      </Container>
    </Container>
    <CodeBlock id="carousel-sample-h-autoplay-code" code={codeBlockContents.carouselAutoplay} language="svelte" />
  </Container>

  <!-- 3. Horizontal - Multiple Items (Controlled) -->
  <Container id="carousel-sample-h-multi-section" class="flex flex-col gap-4">
    <Text id="carousel-sample-h-multi-heading" type="h3" class="text-xl font-bold">3. Multiple Items (Controlled)</Text>
    <Text id="carousel-sample-h-multi-description" class="text-neutral-500">Carousel with multiple visible items and external controls.</Text>

    <Container id="carousel-sample-h-multi-controls" class="flex flex-wrap items-center gap-4">
      <Button id="carousel-h-multi-prev-btn" class="fluid-button-primary" onclick={async () => scroll("prev", h_multi_index, (n) => (h_multi_index = n), items.length)}>Prev</Button>
      <Button id="carousel-h-multi-next-btn" class="fluid-button-primary" onclick={async () => scroll("next", h_multi_index, (n) => (h_multi_index = n), items.length)}>Next</Button>
      <Button id="carousel-h-multi-less-btn" class="fluid-button-primary" onclick={async () => (h_multi_count = Math.max(1, h_multi_count - 1))}>Less Items</Button>
      <Button id="carousel-h-multi-more-btn" class="fluid-button-primary" onclick={async () => (h_multi_count = Math.min(6, h_multi_count + 1))}>More Items</Button>
      <Text id="carousel-h-multi-count-text">Visible: {h_multi_count}</Text>
    </Container>

    <Container id="carousel-sample-h-multi-preview" class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <Container id="carousel-sample-h-multi-wrapper" class="w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
        <Carousel id="h-multi-controlled" {items} bind:activeIndex={h_multi_index} visibleItemCount={h_multi_count} snapItems={true}>
          {#snippet itemTemplate({ item, index })}
            <Container id={`carousel-h-multi-item-${index}`} class="flex h-40 w-full items-center justify-center {item.color} text-white">
              <Text id={`carousel-h-multi-text-${index}`} type="h2" class="text-4xl font-bold">{item.text}</Text>
            </Container>
          {/snippet}
        </Carousel>
      </Container>
    </Container>
    <CodeBlock id="carousel-sample-h-multi-code" code={codeBlockContents.carouselUsage} language="svelte" />
  </Container>

  <!-- 4. Horizontal - Free Scroll (No Snap) -->
  <Container id="carousel-sample-h-free-section" class="flex flex-col gap-4">
    <Text id="carousel-sample-h-free-heading" type="h3" class="text-xl font-bold">4. Free Scroll (No Snap)</Text>
    <Text id="carousel-sample-h-free-description" class="text-neutral-500">Snapping disabled for smooth free scrolling.</Text>
    <Container id="carousel-sample-h-free-preview" class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <Container id="carousel-sample-h-free-wrapper" class="w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
        <Carousel id="h-free-scroll" {items} visibleItemCount={2.5} snapItems={false}>
          {#snippet itemTemplate({ item, index })}
            <Container id={`carousel-h-free-item-${index}`} class="flex h-40 w-full items-center justify-center {item.color} text-white">
              <Text id={`carousel-h-free-text-${index}`} type="h2" class="text-4xl font-bold">{item.text}</Text>
            </Container>
          {/snippet}
        </Carousel>
      </Container>
    </Container>
  </Container>

  <Container id="carousel-samples-divider" class="h-px w-full bg-neutral-200 dark:bg-neutral-800"></Container>

  <Container id="carousel-vertical-header-container" class="flex flex-col gap-2">
    <Text id="carousel-vertical-title" type="h1">Vertical Examples</Text>
    <Text id="carousel-vertical-description" class="text-neutral-500">Vertical scrolling behavior (requires fixed height on container).</Text>
  </Container>

  <!-- 5. Vertical - Default (1 Item) -->
  <Container id="carousel-sample-v-1-section" class="flex flex-col gap-4">
    <Text id="carousel-sample-v-1-heading" type="h3" class="text-xl font-bold">5. Vertical Default (1 Item)</Text>
    <Container id="carousel-sample-v-1-preview" class="rounded-xl border p-6 dark:border-neutral-800">
      <Container id="carousel-sample-v-1-wrapper" class="h-64 w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
        <Carousel id="v-1-default" {items} orientation="vertical" visibleItemCount={1}>
          {#snippet itemTemplate({ item, index })}
            <Container id={`carousel-v-1-item-${index}`} class="flex h-full w-full items-center justify-center {item.color} text-white">
              <Text id={`carousel-v-1-text-${index}`} type="h2" class="text-4xl font-bold">{item.text}</Text>
            </Container>
          {/snippet}
        </Carousel>
      </Container>
    </Container>
  </Container>

  <!-- 6. Vertical - Multiple Items (Controlled) -->
  <Container id="carousel-sample-v-multi-section" class="flex flex-col gap-4">
    <Text id="carousel-sample-v-multi-heading" type="h3" class="text-xl font-bold">6. Vertical Multiple (Controlled)</Text>

    <Container id="carousel-sample-v-multi-controls" class="flex flex-wrap items-center gap-4">
      <Button id="carousel-v-multi-prev-btn" class="fluid-button-primary" onclick={async () => scroll("prev", v_multi_index, (n) => (v_multi_index = n), items.length)}>Up</Button>
      <Button id="carousel-v-multi-next-btn" class="fluid-button-primary" onclick={async () => scroll("next", v_multi_index, (n) => (v_multi_index = n), items.length)}>Down</Button>
      <Button id="carousel-v-multi-less-btn" class="fluid-button-primary" onclick={async () => (v_multi_count = Math.max(1, v_multi_count - 1))}>Less Items</Button>
      <Button id="carousel-v-multi-more-btn" class="fluid-button-primary" onclick={async () => (v_multi_count = Math.min(6, v_multi_count + 1))}>More Items</Button>
      <Text id="carousel-v-multi-count-text">Visible: {v_multi_count}</Text>
      <Text id="carousel-v-multi-index-text">Active: {v_multi_index}</Text>
    </Container>

    <Container id="carousel-sample-v-multi-preview" class="rounded-xl border p-6 dark:border-neutral-800">
      <Container id="carousel-sample-v-multi-wrapper" class="h-96 w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
        <Carousel
          id="v-multi-controlled"
          {items}
          orientation="vertical"
          bind:activeIndex={v_multi_index}
          visibleItemCount={v_multi_count}
          snapItems={true}
        >
          {#snippet itemTemplate({ item, index })}
            <Container id={`carousel-v-multi-item-${index}`} class="flex h-full w-full items-center justify-center {item.color} text-white">
              <Text id={`carousel-v-multi-text-${index}`} type="h2" class="text-4xl font-bold">{item.text}</Text>
            </Container>
          {/snippet}
        </Carousel>
      </Container>
    </Container>
  </Container>

  <!-- 7. Vertical - Free Scroll (No Snap) -->
  <Container id="carousel-sample-v-free-section" class="flex flex-col gap-4">
    <Text id="carousel-sample-v-free-heading" type="h3" class="text-xl font-bold">7. Vertical Free Scroll (No Snap)</Text>
    <Container id="carousel-sample-v-free-preview" class="rounded-xl border p-6 dark:border-neutral-800">
      <Container id="carousel-sample-v-free-wrapper" class="h-80 w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
        <Carousel id="v-free-scroll" {items} orientation="vertical" visibleItemCount={2.5} snapItems={false}>
          {#snippet itemTemplate({ item, index })}
            <Container id={`carousel-v-free-item-${index}`} class="flex h-full w-full items-center justify-center {item.color} text-white">
              <Text id={`carousel-v-free-text-${index}`} type="h2" class="text-4xl font-bold">{item.text}</Text>
            </Container>
          {/snippet}
        </Carousel>
      </Container>
    </Container>
  </Container>
</Container>
