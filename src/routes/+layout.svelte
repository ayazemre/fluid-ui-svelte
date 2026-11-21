<script lang="ts">
  import "../styles.css";
  import { page } from "$app/state";
  import Icon from "@iconify/svelte";

  import { fluidUiGithubUrl } from "#src/documentation/siteContent.ts";
  import { Button, Container, Link, Text } from "#src/lib/base/index.ts";

  import { globalState } from "./globalState.svelte.ts";

  let { children } = $props();

  const isDocumentationSection = $derived(page.url.pathname.startsWith("/documentation"));
</script>

<Container type="section" id="global-layout" class={["site-canvas", globalState.darkMode ? "dark" : ""].join(" ")}>
  <Container type="header" id="site-header" class="site-header">
    <Container id="site-header-inner" class="site-header-inner">
      <Link id="header-home-link" href="/" class="site-brand">
        <svg class="site-logo-mark" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="2" y="2" width="12" height="12" rx="2" fill="#5067EB" />
          <rect x="18" y="2" width="12" height="12" rx="2" fill="#5067EB" opacity="0.7" />
          <rect x="2" y="18" width="12" height="12" rx="2" fill="#5067EB" opacity="0.7" />
          <rect x="18" y="18" width="12" height="12" rx="2" fill="#5067EB" />
        </svg>
        <Text id="site-brand-text" type="span" class="site-brand-text">Fluid <em>UI</em></Text>
      </Link>

      <Container id="site-header-actions" class="site-header-actions">
        <Link id="header-docs-link" href="/documentation/getting-started" class="site-nav-link">Documentation</Link>
        <Link id="header-github-link" href={fluidUiGithubUrl} target="_blank" rel="noreferrer" class="site-icon-link" aria-label="Fluid UI on GitHub">
          <Icon icon="ri:github-fill" class="size-4" />
        </Link>
        <Button
          id="theme-toggle-button"
          onclick={async () => {
            globalState.darkMode = !globalState.darkMode;
          }}
          class="site-icon-button"
          aria-label="Toggle color theme"
        >
          <Icon icon={globalState.darkMode ? "ri:sun-line" : "ri:moon-line"} class="size-4" />
        </Button>
        {#if isDocumentationSection}
          <Button
            id="mobile-drawer-toggle-button"
            onclick={async () => {
              globalState.isDocumentationDrawerOpen = true;
            }}
            class="site-icon-button site-mobile-only"
            aria-label="Open navigation"
          >
            <Icon icon="ri:menu-line" class="size-4" />
          </Button>
        {/if}
      </Container>
    </Container>
  </Container>

  <Container id="global-content" class="site-content">
    {@render children()}
  </Container>
</Container>
