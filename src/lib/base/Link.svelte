<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";

  import { mergeClasses } from "../utilities/common.ts";

  let {
    id,
    underlyingElement = $bindable(null),
    class: className = "",
    overrideDefaultStyling = false,
    children,
    ...rest
  }: {
    id: string;
    underlyingElement?: HTMLAnchorElement | null;
    class?: string;
    overrideDefaultStyling?: boolean;
    children: Snippet;
  } & Omit<HTMLAnchorAttributes, "id"> = $props();
</script>

<a {id} bind:this={underlyingElement} {...rest} class={mergeClasses(className, overrideDefaultStyling ? "" : "fluid-link")}>
  {@render children()}
</a>
