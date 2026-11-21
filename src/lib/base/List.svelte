<script lang="ts" generics="T">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  import { mergeClasses } from "../utilities/common.ts";

  let {
    id,
    domReference = $bindable(null),
    type = "ul",
    items = [],
    itemTemplate,
    class: className = "",
    itemClass = "",
    ...rest
  }: {
    id: string;
    domReference?: HTMLUListElement | HTMLOListElement | null;
    type?: "ol" | "ul";
    items: Array<T>;
    itemTemplate: Snippet<[T, number]>;
    class?: string;
    itemClass?: string;
  } & Omit<HTMLAttributes<HTMLUListElement | HTMLOListElement>, "id"> = $props();

  const classes = {
    ol: "fluid-ordered-list",
    ul: "fluid-unordered-list",
  };
</script>

<svelte:element this={type} {id} bind:this={domReference} {...rest} class={mergeClasses(className, classes[type])}>
  {#each items as item, index}
    <li class={mergeClasses(itemClass, classes[type] + "-item")}>
      {@render itemTemplate(item, index)}
    </li>
  {/each}
</svelte:element>
