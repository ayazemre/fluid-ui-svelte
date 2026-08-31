<script lang="ts">
  import { Button, Text } from "#src/lib/base/index.ts";

  let {
    id,
    variant = "",
    onclick,
    checked = $bindable(false),
    disabled = false,
  }: {
    id: string;
    onclick?: (event: MouseEvent | Event, checked: boolean) => Promise<unknown> | void;
    checked?: boolean;
    disabled?: boolean;
    variant?: string;
  } = $props();
</script>

<Button
  role="switch"
  aria-checked={checked}
  {id}
  class={[
    variant,
    "relative",
    "inline-flex",
    "h-5",
    "w-9",
    "shrink-0",
    "cursor-pointer",
    "rounded-full",
    "border-2",
    "border-transparent",
    "transition-colors",
    "duration-200",
    "ease-in-out",
    "focus:outline-none",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "fluid-switch-button",
    checked ? "checked" : "",
  ].join(" ")}
  onclick={async (event: MouseEvent | Event) => {
    if (!disabled) {
      checked = !checked;
      if (onclick) {
        await onclick(event, checked);
      }
    }
  }}
  {disabled}
  overrideDefaultStyling
>
  <Text
    id={`${id}-indicator`}
    type="span"
    class={[
      variant,
      "fluid-switch-circle",
      "pointer-events-none",
      "inline-block",
      "h-4",
      "w-4",
      "transform",
      "rounded-full",
      "ring-0",
      "transition",
      "duration-200",
      "ease-in-out",
      checked ? "translate-x-4" : "translate-x-0",
    ].join(" ")}
    overrideDefaultStyling
  />
</Button>
