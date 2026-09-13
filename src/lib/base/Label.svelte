<script lang="ts">
  import { mergeClasses } from "#src/lib/utilities/common.ts";

  import type { Snippet } from "svelte";
  import type { HTMLLabelAttributes } from "svelte/elements";

  let {
    id,
    underlyingElement = $bindable(null),
    class: className = "",
    overrideDefaultStyling = false,
    children,
    ...rest
  }: {
    id: string;
    underlyingElement?: HTMLLabelElement | null;
    class?: string;
    overrideDefaultStyling?: boolean;
    children?: Snippet;
  } & Omit<HTMLLabelAttributes, "id"> = $props();
</script>

<label {id} bind:this={underlyingElement} {...rest} class={mergeClasses(className, overrideDefaultStyling ? "" : "fluid-label")}>
  {@render children?.()}
</label>
