<script lang="ts">
  import Icon from "@iconify/svelte";

  import { Container, Link, Text } from "#src/lib/base/index.ts";

  import type { DocumentationNavigationLink } from "./documentationNavigation.ts";

  let {
    idPrefix,
    previousLink,
    nextLink,
  }: {
    idPrefix: string;
    previousLink: DocumentationNavigationLink | null;
    nextLink: DocumentationNavigationLink | null;
  } = $props();
</script>

<Container id={idPrefix} class="doc-pager">
  {#if previousLink}
    <Link id={`${idPrefix}-previous`} href={previousLink.url} class="doc-pager-card">
      <Text id={`${idPrefix}-previous-direction`} type="span" class="doc-pager-direction">
        <Icon icon="ri:arrow-left-s-line" class="inline size-4" />
        Previous
      </Text>
      <Text id={`${idPrefix}-previous-label`} type="span" class="doc-pager-label">{previousLink.label}</Text>
    </Link>
  {:else}
    <Container id={`${idPrefix}-previous-empty`} />
  {/if}

  {#if nextLink}
    <Link id={`${idPrefix}-next`} href={nextLink.url} class="doc-pager-card doc-pager-card-next">
      <Text id={`${idPrefix}-next-direction`} type="span" class="doc-pager-direction">
        Next
        <Icon icon="ri:arrow-right-line" class="inline size-4" />
      </Text>
      <Text id={`${idPrefix}-next-label`} type="span" class="doc-pager-label">{nextLink.label}</Text>
    </Link>
  {:else}
    <Container id={`${idPrefix}-next-empty`} />
  {/if}
</Container>
