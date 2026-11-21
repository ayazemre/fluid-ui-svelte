<script lang="ts">
  import type { HTMLImgAttributes } from "svelte/elements";

  import { mergeClasses } from "../utilities/common.ts";

  let {
    id,
    domReference = $bindable(null),
    class: className = "",
    onload,
    ...rest
  }: {
    id: string;
    domReference?: HTMLImageElement | null;
    class?: string;
    onload?: (event: Event) => void;
  } & Omit<HTMLImgAttributes, "id"> = $props();

  let isLoaded = $state(false);
</script>

<img
  {id}
  bind:this={domReference}
  onload={(event: Event) => {
    isLoaded = true;
    onload?.(event);
  }}
  {...rest}
  class={mergeClasses(className, "fluid-image") + (isLoaded ? "" : " fluid-image-loading")}
/>
