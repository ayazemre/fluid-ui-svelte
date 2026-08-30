<script lang="ts">
  import { mergeClasses } from "#src/lib/utilities/common.ts";

  import type { Snippet } from "svelte";
  import type { HTMLLabelAttributes } from "svelte/elements";

  const {
    class: className = "",
    overrideDefaultStyling = false,
    children,
    ...rest
  }: {
    class?: string;
    overrideDefaultStyling?: boolean;
    children?: Snippet;
  } & HTMLLabelAttributes = $props();
</script>

<label {...rest} class={mergeClasses(className, overrideDefaultStyling ? "" : "fluid-label")}>
  {@render children?.()}
</label>
