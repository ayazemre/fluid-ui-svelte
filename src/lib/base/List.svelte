<script lang="ts" generics="T">
  import { mergeClasses } from "#src/lib/utilities/common.ts";

  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    id,
    underlyingElement = $bindable(null),
    type = "ul",
    items = [],
    itemTemplate,
    class: className = "",
    itemClass = "",
    overrideDefaultStyling = false,
    ...rest
  }: {
    id: string;
    underlyingElement?: HTMLUListElement | HTMLOListElement | null;
    type?: "ol" | "ul";
    items: Array<T>;
    itemTemplate: Snippet<[T, number]>;
    class?: string;
    itemClass?: string;
    overrideDefaultStyling?: boolean;
  } & Omit<HTMLAttributes<HTMLUListElement | HTMLOListElement>, "id"> = $props();

  const classes = {
    ol: "fluid-ordered-list",
    ul: "fluid-unordered-list",
  };
</script>

<svelte:element this={type} {id} bind:this={underlyingElement} {...rest} class={mergeClasses(className, overrideDefaultStyling ? "" : classes[type])}>
  {#each items as item, index}
    <li class={mergeClasses(itemClass, overrideDefaultStyling ? "" : classes[type] + "-item")}>
      {@render itemTemplate(item, index)}
    </li>
  {/each}
</svelte:element>
