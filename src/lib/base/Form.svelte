<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLFormAttributes } from "svelte/elements";

  import { mergeClasses } from "../utilities/common.ts";

  let {
    id,
    domReference = $bindable(null),
    class: className = "",
    onsubmit,
    children,
    ...rest
  }: {
    id: string;
    domReference?: HTMLFormElement | null;
    class?: string;
    onsubmit?: (event: SubmitEvent) => void;
    children: Snippet;
  } & Omit<HTMLFormAttributes, "onsubmit" | "id"> = $props();
</script>

<form
  {id}
  bind:this={domReference}
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
