<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLLabelAttributes } from "svelte/elements";

  import { mergeClasses } from "../utilities/common.ts";

  let {
    id,
    underlyingElement = $bindable(null),
    class: className = "",
    children,
    ...rest
  }: {
    id: string;
    underlyingElement?: HTMLLabelElement | null;
    class?: string;
    children?: Snippet;
  } & Omit<HTMLLabelAttributes, "id"> = $props();
</script>

<label {id} bind:this={underlyingElement} {...rest} class={mergeClasses(className, "fluid-label")}>
  {@render children?.()}
</label>
