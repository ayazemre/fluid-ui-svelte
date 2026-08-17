<script lang="ts">
  import { mergeClasses } from "#src/lib/utilities/common.ts";

  import type { Snippet } from "svelte";
  import type { HTMLFormAttributes } from "svelte/elements";

  const {
    class: className = "",
    overrideDefaultStyling = false,
    children,
    ...rest
  }: {
    class?: string;
    overrideDefaultStyling?: boolean;
    children: Snippet;
  } & Omit<HTMLFormAttributes, "onsubmit"> = $props();
</script>

<form
  onsubmit={(event: SubmitEvent) => event.preventDefault()}
  novalidate
  {...rest}
  class={mergeClasses(className, overrideDefaultStyling ? "" : "fluid-form flex")}
>
  {@render children()}
</form>
