<script lang="ts">
  import { page } from "$app/state";
  import Icon from "@iconify/svelte";
  import { fade, fly } from "svelte/transition";

  import { documentationRegistry } from "#src/documentation/documentation.ts";
  import { Container, Link, Text } from "#src/lib/base/index.ts";
  import { Accordion, Drawer } from "#src/lib/components/index.ts";

  import { globalState } from "../globalState.svelte.ts";

  let { children } = $props();

  const base = Object.entries(documentationRegistry.base)
    .map(([slug, data]) => ({
      name: data.title.replace("Fluid UI - ", ""),
      slug,
      url: `/documentation/base/${slug}`,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const components = Object.entries(documentationRegistry.components)
    .map(([slug, data]) => ({
      name: data.title.replace("Fluid UI - ", ""),
      slug,
      url: `/documentation/components/${slug}`,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const prebuilt = Object.entries(documentationRegistry.prebuilt)
    .map(([slug, data]) => ({
      name: data.title.replace("Fluid UI - ", ""),
      slug,
      url: `/documentation/prebuilt/${slug}`,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Close drawer on navigation
  $effect(() => {
    if (page.url.pathname) {
      globalState.isDocumentationDrawerOpen = false;
    }
  });
</script>

{#snippet navigationContent(idPrefix: string)}
  <Link
    id={`${idPrefix}-nav-getting-started`}
    href="/documentation/getting-started"
    class={[page.url.pathname === "/documentation/getting-started" ? "active" : "", "fluid-sidebar-link", "p-2"].join(" ")}
  >
    <Text id={`${idPrefix}-nav-getting-started-text`} overrideDefaultStyling>Getting Started</Text>
  </Link>

  <Accordion id={`${idPrefix}-nav-accordion-base`}>
    {#snippet header(options)}
      <Text id={`${idPrefix}-nav-base-header-text`}>Base</Text>
      <Icon icon={options.isExpanded ? "raphael:arrowdown" : "raphael:arrowright"}></Icon>
    {/snippet}

    {#snippet body()}
      {#each base as element}
        <Link
          id={`${idPrefix}-nav-link-base-${element.slug}`}
          href={element.url}
          overrideDefaultStyling
          class={[page.url.pathname === element.url ? "active" : "", "fluid-sidebar-link", "p-2", "text-left"].join(" ")}
        >
          {element.name}
        </Link>
      {/each}
    {/snippet}
  </Accordion>
  <Accordion id={`${idPrefix}-nav-accordion-components`}>
    {#snippet header(options)}
      <Text id={`${idPrefix}-nav-components-header-text`}>Components</Text>
      <Icon icon={options.isExpanded ? "raphael:arrowdown" : "raphael:arrowright"}></Icon>
    {/snippet}

    {#snippet body()}
      {#each components as element}
        <Link
          id={`${idPrefix}-nav-link-components-${element.slug}`}
          href={element.url}
          overrideDefaultStyling
          class={[page.url.pathname === element.url ? "active" : "", "fluid-sidebar-link", "p-2", "text-left"].join(" ")}
        >
          {element.name}
        </Link>
      {/each}
    {/snippet}
  </Accordion>
  <Accordion id={`${idPrefix}-nav-accordion-prebuilt`}>
    {#snippet header(options)}
      <Text id={`${idPrefix}-nav-prebuilt-header-text`}>Prebuilt</Text>
      <Icon icon={options.isExpanded ? "raphael:arrowdown" : "raphael:arrowright"}></Icon>
    {/snippet}

    {#snippet body()}
      {#each prebuilt as element}
        <Link
          id={`${idPrefix}-nav-link-prebuilt-${element.slug}`}
          href={element.url}
          overrideDefaultStyling
          class={[page.url.pathname === element.url ? "active" : "", "fluid-sidebar-link", "p-2", "text-left"].join(" ")}
        >
          {element.name}
        </Link>
      {/each}
    {/snippet}
  </Accordion>
  <Link
    id={`${idPrefix}-nav-how-to`}
    href="/documentation/how-to"
    class={[page.url.pathname === "/documentation/how-to" ? "active" : "", "fluid-sidebar-link", "p-2"].join(" ")}
  >
    <Text id={`${idPrefix}-nav-how-to-text`} overrideDefaultStyling>How To</Text>
  </Link>
  <Link id={`${idPrefix}-nav-llm-guide`} href="/llm-protocol" class="fluid-sidebar-link p-2">
    <Text id={`${idPrefix}-nav-llm-guide-text`} overrideDefaultStyling>LLM Guide</Text>
  </Link>
{/snippet}

<Container class="flex flex-1 flex-col bg-neutral-50 dark:bg-neutral-900" id="documentation-page-layout">
  <!-- Mobile Drawer -->
  <Drawer
    id="documentation-mobile-drawer"
    bind:isOpen={globalState.isDocumentationDrawerOpen}
    position="left"
    transitionFunction={fly}
    transitionParameters={{ x: -300, duration: 300 }}
    backdropTransitionFunction={fade}
    backdropTransitionParameters={{ duration: 300 }}
  >
    <Container id="documentation-mobile-drawer-content" class="flex h-full w-64 flex-col gap-2 overflow-y-auto bg-neutral-50 p-4 dark:bg-neutral-900">
      <Text id="documentation-mobile-drawer-title" type="h2" class="mb-4 text-xl font-bold">Menu</Text>
      {@render navigationContent("mobile")}
    </Container>
  </Drawer>

  <Container class="flex min-w-0 flex-1 opacity-100" id="documentation-page-two-row">
    <!-- Desktop Sidebar -->
    <Container
      type="aside"
      class="hidden min-w-64 flex-col gap-2 border-r border-neutral-300 px-4 py-8 md:flex dark:border-neutral-700"
      id="documentation-page-sidebar"
    >
      {@render navigationContent("desktop")}
    </Container>

    <!-- Content Area -->
    <Container id="documentation-content-area" class="w-full min-w-0 overflow-x-hidden">
      {@render children()}
    </Container>
  </Container>
</Container>
