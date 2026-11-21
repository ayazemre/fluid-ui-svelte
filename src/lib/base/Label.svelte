<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLLabelAttributes } from "svelte/elements";

  import { mergeClasses } from "../utilities/common.ts";

  let {
    id,
    domReference = $bindable(null),
    class: className = "",
    children,
    ...rest
  }: {
    id: string;
    domReference?: HTMLLabelElement | null;
    class?: string;
    children?: Snippet;
  } & Omit<HTMLLabelAttributes, "id"> = $props();
</script>

<label {id} bind:this={domReference} {...rest} class={mergeClasses(className, "fluid-label")}>
  {@render children?.()}
</label>
