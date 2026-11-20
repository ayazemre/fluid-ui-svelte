<script lang="ts">
  import type { Snippet } from "svelte";

  import { Container, Link, List, Text } from "../base/index.ts";

  let {
    id,
    variant = "",
    items = [],
    separator = "/",
  }: {
    id: string;
    variant?: string;
    items: Array<{ label: string; href: string }>;
    separator?: string | Snippet;
  } = $props();
</script>

<Container id={`fluid-breadcrumb-${id}`} type="nav" aria-label="Breadcrumb" class={["fluid-breadcrumb", variant].join(" ")}>
  <List
    id={`fluid-breadcrumb-list-${id}`}
    type="ol"
    {items}
    class="fluid-breadcrumb-list"
    itemClass="fluid-breadcrumb-item"
    itemTemplate={itemTemplateFunction}
  />
</Container>

{#snippet itemTemplateFunction(item: { label: string; href: string }, index: number)}
  {#if index < items.length - 1}
    <Link id={`fluid-breadcrumb-link-${index}-${id}`} href={item.href}>{item.label}</Link>
    <Text id={`fluid-breadcrumb-separator-${index}-${id}`} type="span" class="fluid-breadcrumb-separator" aria-hidden="true">
      {#if typeof separator === "string"}
        {separator}
      {:else}
        {@render separator()}
      {/if}
    </Text>
  {:else}
    <Text id={`fluid-breadcrumb-current-${index}-${id}`} type="span" class="fluid-breadcrumb-current" aria-current="page">
      {item.label}
    </Text>
  {/if}
{/snippet}
