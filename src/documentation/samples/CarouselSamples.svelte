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

<Container class="flex flex-col gap-10">
  <Container class="flex flex-col gap-2">
    <Text type="h1">Horizontal Examples</Text>
    <Text class="text-neutral-500">Standard horizontal scrolling behavior.</Text>
  </Container>

  <!-- 1. Horizontal - Default (1 Item) -->
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-xl font-bold">1. Default (1 Item)</Text>
    <Text class="text-neutral-500">Standard full-width carousel with snapping.</Text>
    <Container class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <Container class="w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
        <Carousel {items} componentId="h-1-default" visibleItemCount={1}>
          {#snippet itemTemplate({ item })}
            <Container class="flex h-40 w-full items-center justify-center {item.color} text-white">
              <Text type="h2" class="text-4xl font-bold">{item.text}</Text>
            </Container>
          {/snippet}
        </Carousel>
      </Container>
    </Container>
    <CodeBlock code={codeBlockContents.carouselInteractive} language="svelte" />
  </Container>

  <!-- 2. Horizontal - Autoplay -->
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-xl font-bold">2. Autoplay</Text>
    <Text class="text-neutral-500">Automatically advances slides at a specified interval with manual override support.</Text>

    <Container class="flex flex-wrap items-center gap-4">
      <Button class={isAutoplayActive ? "fluid-button-error" : "fluid-button-primary"} onclick={async () => (isAutoplayActive = !isAutoplayActive)}>
        {isAutoplayActive ? "Pause Autoplay" : "Start Autoplay"}
      </Button>
      <Button class="fluid-button-secondary" onclick={async () => (autoplayDuration = autoplayDuration === 1000 ? 2500 : 1000)}>
        Duration: {autoplayDuration}ms
      </Button>
      <Text class="text-sm font-medium text-neutral-600 dark:text-neutral-400">
        Active Slide: {autoplayActiveIndex + 1} / {items.length}
      </Text>
    </Container>

    <Container class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <Container class="w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
        <Carousel
          {items}
          componentId="h-autoplay"
          autoplay={isAutoplayActive}
          {autoplayDuration}
          bind:activeIndex={autoplayActiveIndex}
          visibleItemCount={1}
        >
          {#snippet itemTemplate({ item })}
            <Container class="flex h-40 w-full items-center justify-center {item.color} text-white">
              <Text type="h2" class="text-4xl font-bold">{item.text}</Text>
            </Container>
          {/snippet}
        </Carousel>
      </Container>
    </Container>
    <CodeBlock code={codeBlockContents.carouselAutoplay} language="svelte" />
  </Container>

  <!-- 3. Horizontal - Multiple Items (Controlled) -->
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-xl font-bold">3. Multiple Items (Controlled)</Text>
    <Text class="text-neutral-500">Carousel with multiple visible items and external controls.</Text>

    <Container class="flex flex-wrap items-center gap-4">
      <Button class="fluid-button-primary" onclick={async () => scroll("prev", h_multi_index, (n) => (h_multi_index = n), items.length)}>Prev</Button>
      <Button class="fluid-button-primary" onclick={async () => scroll("next", h_multi_index, (n) => (h_multi_index = n), items.length)}>Next</Button>
      <Button class="fluid-button-primary" onclick={async () => (h_multi_count = Math.max(1, h_multi_count - 1))}>Less Items</Button>
      <Button class="fluid-button-primary" onclick={async () => (h_multi_count = Math.min(6, h_multi_count + 1))}>More Items</Button>
      <Text>Visible: {h_multi_count}</Text>
    </Container>

    <Container class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <Container class="w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
        <Carousel {items} componentId="h-multi-controlled" bind:activeIndex={h_multi_index} visibleItemCount={h_multi_count} snapItems={true}>
          {#snippet itemTemplate({ item })}
            <Container class="flex h-40 w-full items-center justify-center {item.color} text-white">
              <Text type="h2" class="text-4xl font-bold">{item.text}</Text>
            </Container>
          {/snippet}
        </Carousel>
      </Container>
    </Container>
    <CodeBlock code={codeBlockContents.carouselUsage} language="svelte" />
  </Container>

  <!-- 4. Horizontal - Free Scroll (No Snap) -->
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-xl font-bold">4. Free Scroll (No Snap)</Text>
    <Text class="text-neutral-500">Snapping disabled for smooth free scrolling.</Text>
    <Container class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <Container class="w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
        <Carousel {items} componentId="h-free-scroll" visibleItemCount={2.5} snapItems={false}>
          {#snippet itemTemplate({ item })}
            <Container class="flex h-40 w-full items-center justify-center {item.color} text-white">
              <Text type="h2" class="text-4xl font-bold">{item.text}</Text>
            </Container>
          {/snippet}
        </Carousel>
      </Container>
    </Container>
  </Container>

  <Container class="h-px w-full bg-neutral-200 dark:bg-neutral-800"></Container>

  <Container class="flex flex-col gap-2">
    <Text type="h1">Vertical Examples</Text>
    <Text class="text-neutral-500">Vertical scrolling behavior (requires fixed height on container).</Text>
  </Container>

  <!-- 5. Vertical - Default (1 Item) -->
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-xl font-bold">5. Vertical Default (1 Item)</Text>
    <Container class="rounded-xl border p-6 dark:border-neutral-800">
      <Container class="h-64 w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
        <Carousel {items} orientation="vertical" componentId="v-1-default" visibleItemCount={1}>
          {#snippet itemTemplate({ item })}
            <Container class="flex h-full w-full items-center justify-center {item.color} text-white">
              <Text type="h2" class="text-4xl font-bold">{item.text}</Text>
            </Container>
          {/snippet}
        </Carousel>
      </Container>
    </Container>
  </Container>

  <!-- 6. Vertical - Multiple Items (Controlled) -->
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-xl font-bold">6. Vertical Multiple (Controlled)</Text>

    <Container class="flex flex-wrap items-center gap-4">
      <Button class="fluid-button-primary" onclick={async () => scroll("prev", v_multi_index, (n) => (v_multi_index = n), items.length)}>Up</Button>
      <Button class="fluid-button-primary" onclick={async () => scroll("next", v_multi_index, (n) => (v_multi_index = n), items.length)}>Down</Button>
      <Button class="fluid-button-primary" onclick={async () => (v_multi_count = Math.max(1, v_multi_count - 1))}>Less Items</Button>
      <Button class="fluid-button-primary" onclick={async () => (v_multi_count = Math.min(6, v_multi_count + 1))}>More Items</Button>
      <Text>Visible: {v_multi_count}</Text>
      <Text>Active: {v_multi_index}</Text>
    </Container>

    <Container class="rounded-xl border p-6 dark:border-neutral-800">
      <Container class="h-96 w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
        <Carousel
          {items}
          orientation="vertical"
          componentId="v-multi-controlled"
          bind:activeIndex={v_multi_index}
          visibleItemCount={v_multi_count}
          snapItems={true}
        >
          {#snippet itemTemplate({ item })}
            <Container class="flex h-full w-full items-center justify-center {item.color} text-white">
              <Text type="h2" class="text-4xl font-bold">{item.text}</Text>
            </Container>
          {/snippet}
        </Carousel>
      </Container>
    </Container>
  </Container>

  <!-- 7. Vertical - Free Scroll (No Snap) -->
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-xl font-bold">7. Vertical Free Scroll (No Snap)</Text>
    <Container class="rounded-xl border p-6 dark:border-neutral-800">
      <Container class="h-80 w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
        <Carousel {items} orientation="vertical" componentId="v-free-scroll" visibleItemCount={2.5} snapItems={false}>
          {#snippet itemTemplate({ item })}
            <Container class="flex h-full w-full items-center justify-center {item.color} text-white">
              <Text type="h2" class="text-4xl font-bold">{item.text}</Text>
            </Container>
          {/snippet}
        </Carousel>
      </Container>
    </Container>
  </Container>
</Container>
