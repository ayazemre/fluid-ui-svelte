<script lang="ts">
  import { page } from "$app/state";
  import Icon from "@iconify/svelte";

  import { Container, Link, Text } from "#src/lib/base/index.ts";
  import { Page } from "#src/lib/components/index.ts";

  const isNotFound = $derived(page.status === 404);
  const headingText = $derived(isNotFound ? "Page not found" : "Something went wrong");
  const descriptionText = $derived(
    isNotFound
      ? "The page you are looking for does not exist or has moved."
      : "The page could not be loaded. Try again in a moment, or return to the documentation.",
  );
</script>

<Page id="error-page" variant="site-page" title={`Fluid UI - ${headingText}`} description={descriptionText}>
  <Container id="error-page-content" class="error-layout">
    <Container id="error-page-inner" class="error-inner">
      <Text id="error-page-status" type="span" class="error-status">{page.status}</Text>
      <Text id="error-page-heading" type="h1" class="doc-title">{headingText}</Text>
      <Text id="error-page-description" class="doc-deck">{descriptionText}</Text>
      {#if page.error?.message}
        <Text id="error-page-detail" class="doc-note">{page.error.message}</Text>
      {/if}
      <Container id="error-page-actions" class="error-actions">
        <Link id="error-page-home-link" href="/" class="home-button home-button-primary">
          <Icon icon="ri:arrow-left-line" class="size-4" />
          Home
        </Link>
        <Link id="error-page-documentation-link" href="/documentation/getting-started" class="home-button home-button-secondary">Documentation</Link>
      </Container>
    </Container>
  </Container>
</Page>
