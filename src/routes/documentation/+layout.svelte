<script lang="ts">
  import { page } from "$app/state";
  import Icon from "@iconify/svelte";
  import { fade, fly } from "svelte/transition";

  import { documentationSidebarGroups, type DocumentationNavigationLink } from "#src/documentation/documentationNavigation.ts";
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
  <Link id={linkId} href={link.url} class={["docs-link", page.url.pathname === link.url ? "active" : ""].join(" ")}>
    <Text id={`${linkId}-text`} type="span">{link.label}</Text>
  </Link>
{/snippet}

{#snippet navigationContent(idPrefix: string)}
  {#each documentationSidebarGroups as group (group.id)}
    <Container id={`${idPrefix}-nav-group-${group.id}`} class="docs-group">
      <Accordion id={`${idPrefix}-nav-accordion-${group.id}`}>
        {#snippet header(options)}
          <Container id={`${idPrefix}-nav-${group.id}-header`} class="docs-group-header">
            <Text id={`${idPrefix}-nav-${group.id}-header-text`} type="span" class="docs-group-label">{group.label}</Text>
            <Icon icon={options.isExpanded ? "ri:subtract-line" : "ri:add-line"} class="size-3.5" />
          </Container>
        {/snippet}
        {#snippet body()}
          <Container id={`${idPrefix}-nav-${group.id}-list`} class="docs-group-list">
            {#each group.links as link (link.slug)}
              {@render navigationLink(`${idPrefix}-nav-link-${group.id}-${link.slug}`, link)}
            {/each}
          </Container>
        {/snippet}
      </Accordion>
    </Container>
  {/each}
{/snippet}

<Container id="documentation-page-layout" class="docs-layout">
  <Drawer
    id="documentation-mobile-drawer"
    variant="site-drawer"
    bind:isOpen={globalState.isDocumentationDrawerOpen}
    position="left"
    transitionFunction={fly}
    transitionParameters={{ x: -280, duration: 200 }}
    backdropTransitionFunction={fade}
    backdropTransitionParameters={{ duration: 160 }}
  >
    <Container id="documentation-mobile-drawer-content" class="docs-drawer">
      <Text id="documentation-mobile-drawer-title" type="h2" class="docs-heading">Documentation</Text>
      {@render navigationContent("mobile")}
    </Container>
  </Drawer>

  <Container id="documentation-page-sidebar" type="aside" class="docs-sidebar">
    <Container id="docs-sidebar-inner" class="docs-sidebar-inner">
      <Text id="documentation-sidebar-heading" class="docs-heading">Documentation</Text>
      {@render navigationContent("desktop")}
    </Container>
  </Container>

  <Container id="documentation-content-area" class="docs-content">
    {@render children()}
  </Container>
</Container>
