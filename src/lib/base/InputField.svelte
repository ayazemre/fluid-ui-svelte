<script lang="ts">
  import { mergeClasses } from "#src/lib/utilities/common.ts";

  import type { HTMLInputAttributes, HTMLTextareaAttributes } from "svelte/elements";

  import { applyCharacterFilter } from "./inputField.ts";

  let {
    id,
    underlyingElement = $bindable(null),
    type = "text",
    value = $bindable(""),
    class: className = "",
    characterFilter,
    overrideDefaultStyling = false,
    oninput,
    ...rest
  }: {
    id: string;
    underlyingElement?: HTMLInputElement | HTMLTextAreaElement | null;
    class?: string;
    type?: "text" | "password" | "textarea";
    value?: string;
    characterFilter?: Array<string>;
    overrideDefaultStyling?: boolean;
    oninput?: (event: Event) => void;
  } & Omit<HTMLInputAttributes, "value" | "type" | "id"> &
    Omit<HTMLTextareaAttributes, "value" | "id"> = $props();
</script>

{#if type === "textarea"}
  <textarea
    {id}
    bind:this={underlyingElement}
    bind:value
    oninput={(event: Event) => {
      if (characterFilter) {
        value = applyCharacterFilter(characterFilter, value);
      }
      oninput?.(event);
    }}
    {...rest}
    class={mergeClasses(className, overrideDefaultStyling ? "" : "fluid-input-field")}></textarea>
{:else}
  <input
    {id}
    bind:this={underlyingElement}
    bind:value
    {type}
    oninput={(event: Event) => {
      if (characterFilter) {
        value = applyCharacterFilter(characterFilter, value);
      }
      oninput?.(event);
    }}
    {...rest}
    class={mergeClasses(className, overrideDefaultStyling ? "" : "fluid-input-field")}
  />
{/if}
