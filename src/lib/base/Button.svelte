<script lang="ts">
  import { mergeClasses } from "#src/lib/utilities/common.ts";

  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  let {
    id,
    underlyingElement = $bindable(null),
    onclick,
    class: className = "",
    overrideDefaultStyling = false,
    loadingPlaceholder,
    children,
    ...rest
  }: {
    id: string;
    underlyingElement?: HTMLButtonElement | null;
    onclick: (event: MouseEvent | Event, buttonState: { inProgress: boolean }) => Promise<unknown> | void;
    class?: string;
    overrideDefaultStyling?: boolean;
    loadingPlaceholder?: Snippet;
    children: Snippet;
  } & Omit<HTMLButtonAttributes, "onclick" | "id"> = $props();

  let buttonState = $state({ inProgress: false });
</script>

<button
  {id}
  bind:this={underlyingElement}
  type="button"
  onclick={async (event: MouseEvent | Event) => await onclick(event, buttonState)}
  {...rest}
  class={mergeClasses(className, overrideDefaultStyling ? "" : "fluid-button flex cursor-pointer")}
>
  {#if buttonState.inProgress && loadingPlaceholder}
    {@render loadingPlaceholder()}
  {:else}
    {@render children()}
  {/if}
</button>
