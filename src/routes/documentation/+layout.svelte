<script lang="ts">
  import { page } from "$app/state";
  import Icon from "@iconify/svelte";
  import { fade, fly } from "svelte/transition";

  import {
    documentationLlmGuideLink,
    documentationSidebarGroups,
    type DocumentationNavigationLink,
  } from "#src/documentation/documentationNavigation.ts";
  import { Container, Link, Text } from "#src/lib/base/index.ts";
  import { Accordion, Drawer } from "#src/lib/components/index.ts";

  import { globalState } from "../globalState.svelte.ts";

  let { children } = $props();

  $effect(() => {
    if (page.url.pathname) {
      globalState.isDocumentationDrawerOpen = false;
    }
  });
</script>

{#snippet navigationLink(linkId: string, link: DocumentationNavigationLink)}
  <Link id={linkId} href={link.url} class={["docs-sidebar-link", page.url.pathname === link.url ? "active" : ""].join(" ")}>
    <Text id={`${linkId}-text`} type="span" class="docs-sidebar-link-text">{link.label}</Text>
  </Link>
{/snippet}

{#snippet navigationContent(idPrefix: string)}
  {#each documentationSidebarGroups as group (group.id)}
    <Container id={`${idPrefix}-nav-group-${group.id}`} class={`docs-nav-group layer-tone-${group.id}`}>
      <Accordion id={`${idPrefix}-nav-accordion-${group.id}`}>
        {#snippet header(options)}
          <Text id={`${idPrefix}-nav-${group.id}-header-text`} type="span" class="docs-nav-group-label">
            {group.label}
          </Text>
          <Text id={`${idPrefix}-nav-${group.id}-header-count`} type="span" class="docs-nav-group-count">
            {String(group.links.length).padStart(2, "0")}
          </Text>
          <Icon icon={options.isExpanded ? "ri:arrow-up-s-line" : "ri:arrow-down-s-line"} class="size-4 shrink-0" />
        {/snippet}

        {#snippet body()}
          <Container id={`${idPrefix}-nav-${group.id}-list`} class="flex flex-col">
            {#each group.links as link (link.slug)}
              {@render navigationLink(`${idPrefix}-nav-link-${group.id}-${link.slug}`, link)}
            {/each}
          </Container>
        {/snippet}
      </Accordion>
    </Container>
  {/each}

  {@render navigationLink(`${idPrefix}-nav-link-${documentationLlmGuideLink.slug}`, documentationLlmGuideLink)}
{/snippet}

<Container id="documentation-page-layout" class="flex flex-1 flex-col">
  <Drawer
    id="documentation-mobile-drawer"
    variant="site-drawer"
    bind:isOpen={globalState.isDocumentationDrawerOpen}
    position="left"
    transitionFunction={fly}
    transitionParameters={{ x: -300, duration: 300 }}
    backdropTransitionFunction={fade}
    backdropTransitionParameters={{ duration: 300 }}
  >
    <Container id="documentation-mobile-drawer-content" class="site-drawer-panel">
      <Text id="documentation-mobile-drawer-title" type="h2" class="docs-sidebar-heading">Index</Text>
      {@render navigationContent("mobile")}
    </Container>
  </Drawer>

  <Container id="documentation-page-two-row" class="flex min-w-0 flex-1">
    <Container
      type="aside"
      id="documentation-page-sidebar"
      class="docs-sidebar sticky top-[5.75rem] hidden h-[calc(100dvh-5.75rem)] w-72 shrink-0 flex-col gap-1 overflow-y-auto px-4 py-6 md:flex"
    >
      <Text id="documentation-sidebar-heading" class="docs-sidebar-heading">Index of contents</Text>
      {@render navigationContent("desktop")}
    </Container>

    <Container id="documentation-content-area" class="min-w-0 flex-1 overflow-x-hidden">
      {@render children()}
    </Container>
  </Container>
</Container>
