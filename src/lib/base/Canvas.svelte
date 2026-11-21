<script lang="ts">
  import type { HTMLCanvasAttributes } from "svelte/elements";

  import { mergeClasses } from "../utilities/common.ts";

  let {
    id,
    domReference = $bindable(null),
    class: className = "",
    ...rest
  }: {
    id: string;
    domReference?: HTMLCanvasElement | null;
    class?: string;
  } & Omit<HTMLCanvasAttributes, "id"> = $props();
</script>

<canvas {id} bind:this={domReference} {...rest} class={mergeClasses(className, "fluid-canvas")}></canvas>
