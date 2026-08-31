<script lang="ts">
  import { mergeClasses } from "#src/lib/utilities/common.ts";

  import type { Snippet } from "svelte";
  import type { HTMLFormAttributes } from "svelte/elements";

  let {
    id,
    underlyingElement = $bindable(null),
    class: className = "",
    overrideDefaultStyling = false,
    onsubmit,
    children,
    ...rest
  }: {
    id: string;
    underlyingElement?: HTMLFormElement | null;
    class?: string;
    overrideDefaultStyling?: boolean;
    onsubmit?: (event: SubmitEvent) => void;
    children: Snippet;
  } & Omit<HTMLFormAttributes, "onsubmit" | "id"> = $props();
</script>

<form
  {id}
  bind:this={underlyingElement}
  onsubmit={(event: SubmitEvent) => {
    event.preventDefault();
    onsubmit?.(event);
  }}
  novalidate
  {...rest}
  class={mergeClasses(className, overrideDefaultStyling ? "" : "fluid-form flex")}
>
  {@render children()}
</form>
