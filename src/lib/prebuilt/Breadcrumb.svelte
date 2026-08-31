<script lang="ts">
  import { Container, Link, List, Text } from "#src/lib/base/index.ts";

  import type { Snippet } from "svelte";

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

<Container {id} type="nav" aria-label="Breadcrumb" class={[variant, "fluid-breadcrumb-container"].join(" ")}>
  <List id={`${id}-list`} type="ol" {items} class="fluid-breadcrumb-list" itemClass="fluid-breadcrumb-item" itemTemplate={itemTemplateFunction} />
</Container>

{#snippet itemTemplateFunction(item: { label: string; href: string }, index: number)}
  {#if index < items.length - 1}
    <Link id={`${id}-item-${index}-link`} href={item.href}>{item.label}</Link>
    <Text id={`${id}-item-${index}-separator`} type="span" class="fluid-breadcrumb-separator" aria-hidden="true">
      {#if typeof separator === "string"}
        {separator}
      {:else}
        {@render separator()}
      {/if}
    </Text>
  {:else}
    <Text id={`${id}-item-${index}-current`} type="span" class="fluid-breadcrumb-current font-bold" aria-current="page">
      {item.label}
    </Text>
  {/if}
{/snippet}
