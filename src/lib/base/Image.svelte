<script lang="ts">
  import { mergeClasses } from "#src/lib/utilities/common.ts";

  import type { HTMLImgAttributes } from "svelte/elements";

  let {
    id,
    underlyingElement = $bindable(null),
    class: className = "",
    overrideDefaultStyling = false,
    onload,
    ...rest
  }: {
    id: string;
    underlyingElement?: HTMLImageElement | null;
    class?: string;
    overrideDefaultStyling?: boolean;
    onload?: (event: Event) => void;
  } & Omit<HTMLImgAttributes, "id"> = $props();

  let isLoaded = $state(false);
</script>

<img
  {id}
  bind:this={underlyingElement}
  onload={(event: Event) => {
    isLoaded = true;
    onload?.(event);
  }}
  {...rest}
  class={mergeClasses(className, overrideDefaultStyling ? "" : "fluid-image") + (isLoaded ? "" : " fluid-image-loading")}
/>
