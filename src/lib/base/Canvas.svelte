<script lang="ts">
  import type { HTMLCanvasAttributes } from "svelte/elements";

  import { mergeClasses } from "../utilities/common.ts";

  let {
    id,
    underlyingElement = $bindable(null),
    class: className = "",
    ...rest
  }: {
    id: string;
    underlyingElement?: HTMLCanvasElement | null;
    class?: string;
  } & Omit<HTMLCanvasAttributes, "id"> = $props();
</script>

<canvas {id} bind:this={underlyingElement} {...rest} class={mergeClasses(className, "fluid-canvas")}></canvas>
