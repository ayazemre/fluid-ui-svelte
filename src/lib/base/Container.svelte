<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { TransitionConfig } from "svelte/transition";

  import { mergeClasses } from "../utilities/common.ts";

  let {
    id,
    domReference = $bindable(null),
    type = "div",
    class: className = "",
    transitionFunction = () => {
      return {};
    },
    transitionParameters,
    children,
    ...rest
  }: {
    id: string;
    domReference?: HTMLElement | null;
    type?: "div" | "nav" | "section" | "main" | "header" | "footer" | "aside" | "article";
    class?: string;
    transitionFunction?: (node: Element, parameters?: Record<string, unknown>) => TransitionConfig;
    transitionParameters?: Record<string, unknown>;
    children?: Snippet;
  } & Omit<HTMLAttributes<HTMLElement>, "id"> = $props();
</script>

<svelte:element
  this={type}
  {id}
  bind:this={domReference}
  {...rest}
  transition:transitionFunction={transitionParameters}
  class={mergeClasses(className, "fluid-container")}
>
  {@render children?.()}
</svelte:element>
