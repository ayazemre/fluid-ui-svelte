<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";

  import { mergeClasses } from "../utilities/common.ts";

  let {
    id,
    domReference = $bindable(null),
    class: className = "",
    children,
    ...rest
  }: {
    id: string;
    domReference?: HTMLAnchorElement | null;
    class?: string;
    children: Snippet;
  } & Omit<HTMLAnchorAttributes, "id"> = $props();
</script>

<a {id} bind:this={domReference} {...rest} class={mergeClasses(className, "fluid-link")}>
  {@render children()}
</a>
