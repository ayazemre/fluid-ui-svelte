<script lang="ts">
  import { mergeClasses } from "#src/lib/utilities/common.ts";

  import type { HTMLCanvasAttributes } from "svelte/elements";

  let {
    id,
    underlyingElement = $bindable(null),
    class: className = "",
    overrideDefaultStyling = false,
    ...rest
  }: {
    id: string;
    underlyingElement?: HTMLCanvasElement | null;
    class?: string;
    overrideDefaultStyling?: boolean;
  } & Omit<HTMLCanvasAttributes, "id"> = $props();
</script>

<canvas
  {id}
  bind:this={underlyingElement}
  {...rest}
  class={mergeClasses(className, overrideDefaultStyling ? "" : "fluid-canvas")}
></canvas>
