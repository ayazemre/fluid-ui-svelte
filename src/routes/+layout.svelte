<script lang="ts">
  import "../styles.css";
  import { page } from "$app/state";
  import Icon from "@iconify/svelte";

  import { Button, Container, Link, Text } from "#src/lib/base/index.ts";

  import { globalState } from "./globalState.svelte.ts";

  let { children } = $props();

  const isDocumentationSection = $derived(page.url.pathname.startsWith("/documentation"));
</script>

<Container type="section" id="global-layout" class={["site-canvas", globalState.darkMode ? "dark" : ""].join(" ")}>
  <Container type="header" id="site-header" class="site-masthead">
    <Container id="site-header-bar" class="site-header-bar">
      <Link id="header-home-link" href="/" class="flex shrink-0 items-center gap-3">
        <svg class="site-logo-mark" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="2" y="2" width="12" height="12" rx="2" fill="#5067EB" />
          <rect x="18" y="2" width="12" height="12" rx="2" fill="#5067EB" opacity="0.7" />
          <rect x="2" y="18" width="12" height="12" rx="2" fill="#5067EB" opacity="0.7" />
          <rect x="18" y="18" width="12" height="12" rx="2" fill="#5067EB" />
        </svg>
        <Text id="branding-title-text" type="span" class="site-wordmark">Fluid <em>UI</em></Text>
      </Link>

      <Container id="site-header-actions" class="flex items-center gap-1">
        <Button
          id="theme-toggle-button"
          onclick={async () => {
            globalState.darkMode = !globalState.darkMode;
          }}
          class="site-icon-button cursor-pointer"
        >
          <Icon icon={globalState.darkMode ? "ri:sun-line" : "ri:moon-line"} class="size-4" />
        </Button>

        {#if isDocumentationSection}
          <Button
            id="mobile-drawer-toggle-button"
            onclick={async () => {
              globalState.isDocumentationDrawerOpen = true;
            }}
            class="site-icon-button site-mobile-only cursor-pointer"
          >
            <Icon icon="ri:menu-line" class="size-4" />
          </Button>
        {/if}
      </Container>
    </Container>
  </Container>

  <Container id="global-content" class="flex min-h-0 w-full flex-1 flex-col">
    {@render children()}
  </Container>
</Container>
