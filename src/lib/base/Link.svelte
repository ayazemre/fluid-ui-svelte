<script lang="ts">
  import { mergeClasses } from "#src/lib/utilities/common.ts";

  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";

  let {
    class: className = "",
    overrideDefaultStyling = false,
    children,
    ...rest
  }: {
    class?: string;
    overrideDefaultStyling?: boolean;
    children: Snippet;
  } & HTMLAnchorAttributes = $props();
</script>

<a {...rest} class={mergeClasses(className, overrideDefaultStyling ? "" : "fluid-link")}> {@render children()}</a>
