<script lang="ts">
  import { mergeClasses } from "#src/lib/utilities/common.ts";

  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { TransitionConfig } from "svelte/transition";

  let {
    element = $bindable(undefined),
    type = "div",
    class: className = "",
    transitionFn = (node: Element, params?: any) => {
      return {};
    },
    transitionParams,
    overrideDefaultStyling = false,
    children,
    ...rest
  }: {
    element?: HTMLElement;
    type?: "div" | "nav" | "section" | "main" | "header" | "footer" | "aside" | "article";
    class?: string;
    transitionFn?: (node: Element, params?: any) => TransitionConfig;
    transitionParams?: TransitionConfig;
    overrideDefaultStyling?: boolean;
    children?: Snippet;
  } & HTMLAttributes<HTMLElement> = $props();
</script>

<svelte:element
  this={type}
  bind:this={element}
  {...rest}
  transition:transitionFn={transitionParams}
  class={mergeClasses(className, overrideDefaultStyling ? "" : "fluid-container")}
>
  {@render children?.()}
</svelte:element>
