<script lang="ts">
  import type { HTMLCanvasAttributes } from "svelte/elements";

  import { mergeClasses } from "../utilities/common.ts";

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

<canvas {id} bind:this={underlyingElement} {...rest} class={mergeClasses(className, overrideDefaultStyling ? "" : "fluid-canvas")}></canvas>
