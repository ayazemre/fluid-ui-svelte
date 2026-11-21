<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  import { mergeClasses } from "../utilities/common.ts";

  let {
    id,
    domReference = $bindable(null),
    onclick,
    class: className = "",
    loadingPlaceholder,
    children,
    ...rest
  }: {
    id: string;
    domReference?: HTMLButtonElement | null;
    onclick: (event: MouseEvent | Event, buttonState: { inProgress: boolean }) => Promise<unknown> | void;
    class?: string;
    loadingPlaceholder?: Snippet;
    children: Snippet;
  } & Omit<HTMLButtonAttributes, "onclick" | "id"> = $props();

  let buttonState = $state({ inProgress: false });
</script>

<button
  {id}
  bind:this={domReference}
  type="button"
  onclick={async (event: MouseEvent | Event) => await onclick(event, buttonState)}
  {...rest}
  class={mergeClasses(className, "fluid-button")}
>
  {#if buttonState.inProgress && loadingPlaceholder}
    {@render loadingPlaceholder()}
  {:else}
    {@render children()}
  {/if}
</button>
