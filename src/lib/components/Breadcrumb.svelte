<script lang="ts">
  import { Container, Link } from "#src/lib/base/index.ts";
  import { mergeClasses } from "#src/lib/utilities/common.ts";

  import type { Snippet } from "svelte";

  let {
    variant = "",
    componentId = crypto.randomUUID(),
    items = [],
    separator = "/",
  }: {
    variant?: string;
    componentId?: string;
    items: Array<{ label: string; href: string }>;
    separator?: string | Snippet;
  } = $props();
</script>

<Container id={componentId} class={mergeClasses(variant, "fluid-breadcrumb-container")}>
  <nav aria-label="Breadcrumb">
    <ol class="fluid-breadcrumb-list">
      {#each items as item, index}
        <li class="fluid-breadcrumb-item">
          {#if index < items.length - 1}
            <Link href={item.href}>{item.label}</Link>
            <span class="fluid-breadcrumb-separator" aria-hidden="true">
              {#if typeof separator === "string"}
                {separator}
              {:else}
                {@render separator()}
              {/if}
            </span>
          {:else}
            <span class="fluid-breadcrumb-current font-bold" aria-current="page">{item.label}</span>
          {/if}
        </li>
      {/each}
    </ol>
  </nav>
</Container>
