<script lang="ts">
  import { mergeClasses } from "#src/lib/utilities/common.ts";

  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    id,
    underlyingElement = $bindable(null),
    type = "p",
    class: className = "",
    overrideDefaultStyling = false,
    children,
    ...rest
  }: {
    id: string;
    underlyingElement?: HTMLElement | null;
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
    overrideDefaultStyling?: boolean;
  } & Omit<HTMLAttributes<HTMLParagraphElement & HTMLHeadingElement & HTMLSpanElement>, "id"> = $props();
</script>

<svelte:element this={type} {id} bind:this={underlyingElement} {...rest} class={mergeClasses(className, overrideDefaultStyling ? "" : "fluid-text")}>
  {@render children?.()}
</svelte:element>
