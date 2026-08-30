<script lang="ts">
  import { mergeClasses } from "#src/lib/utilities/common.ts";

  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  const {
    onclick,
    class: className = "",
    overrideDefaultStyling = false,
    loadingPlaceholder,
    children,
    ...rest
  }: {
    onclick: (event: Event, buttonState: { inProgress: boolean }) => Promise<unknown>;
    class?: string;
    overrideDefaultStyling?: boolean;
    loadingPlaceholder?: Snippet;
    children: Snippet;
  } & Omit<HTMLButtonAttributes, "onclick"> = $props();

  let buttonState = $state({ inProgress: false });
</script>

<button
  type="button"
  onclick={async (event: Event) => onclick(event, buttonState)}
  {...rest}
  class={mergeClasses(className, overrideDefaultStyling ? "" : "fluid-button flex cursor-pointer")}
>
  {#if buttonState.inProgress && loadingPlaceholder}
    {@render loadingPlaceholder()}
  {:else}
    {@render children()}
  {/if}
</button>
