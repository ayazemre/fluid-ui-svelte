<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";

  import { mergeClasses } from "../utilities/common.ts";

  let {
    id,
    underlyingElement = $bindable(null),
    class: className = "",
    children,
    ...rest
  }: {
    id: string;
    underlyingElement?: HTMLAnchorElement | null;
    class?: string;
    children: Snippet;
  } & Omit<HTMLAnchorAttributes, "id"> = $props();
</script>

<a {id} bind:this={underlyingElement} {...rest} class={mergeClasses(className, "fluid-link")}>
  {@render children()}
</a>
