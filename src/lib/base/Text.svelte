<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  import { mergeClasses } from "../utilities/common.ts";

  let {
    id,
    domReference = $bindable(null),
    type = "p",
    class: className = "",
    children,
    ...rest
  }: {
    id: string;
    domReference?: HTMLElement | null;
    type?:
      | "p"
      | "h1"
      | "h2"
      | "h3"
      | "h4"
      | "h5"
      | "h6"
      | "span"
      | "pre"
      | "code"
      | "b"
      | "strong"
      | "i"
      | "em"
      | "mark"
      | "small"
      | "del"
      | "ins"
      | "sub"
      | "sup";
    children?: Snippet;
    class?: string;
  } & Omit<HTMLAttributes<HTMLParagraphElement & HTMLHeadingElement & HTMLSpanElement>, "id"> = $props();
</script>

<svelte:element this={type} {id} bind:this={domReference} {...rest} class={mergeClasses(className, "fluid-text")}>
  {@render children?.()}
</svelte:element>
