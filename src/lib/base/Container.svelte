<script lang="ts">
  import { mergeClasses } from "#src/lib/utilities/common.ts";

  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { TransitionConfig } from "svelte/transition";

  let {
    id,
    underlyingElement = $bindable(null),
    type = "div",
    class: className = "",
    transitionFunction = () => {
      return {};
    },
    transitionParams,
    overrideDefaultStyling = false,
    children,
    ...rest
  }: {
    id: string;
    underlyingElement?: HTMLElement | null;
    type?: "div" | "nav" | "section" | "main" | "header" | "footer" | "aside" | "article";
    class?: string;
    transitionFunction?: (node: Element, parameters?: Record<string, unknown>) => TransitionConfig;
    transitionParams?: Record<string, unknown>;
    overrideDefaultStyling?: boolean;
    children?: Snippet;
  } & Omit<HTMLAttributes<HTMLElement>, "id"> = $props();
</script>

<svelte:element
  this={type}
  {id}
  bind:this={underlyingElement}
  {...rest}
  transition:transitionFunction={transitionParams}
  class={mergeClasses(className, overrideDefaultStyling ? "" : "fluid-container")}
>
  {@render children?.()}
</svelte:element>
