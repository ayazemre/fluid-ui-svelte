<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLFormAttributes } from "svelte/elements";

  import { mergeClasses } from "../utilities/common.ts";

  let {
    id,
    underlyingElement = $bindable(null),
    class: className = "",
    onsubmit,
    children,
    ...rest
  }: {
    id: string;
    underlyingElement?: HTMLFormElement | null;
    class?: string;
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
  class={mergeClasses(className, "fluid-form")}
>
  {@render children()}
</form>
