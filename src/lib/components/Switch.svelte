<script lang="ts">
  import { Button, Text } from "../base/index.ts";

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
  id={`fluid-switch-${id}`}
  class={["fluid-switch", checked ? "fluid-switch-checked" : "", variant].join(" ")}
  onclick={async (event: MouseEvent | Event) => {
    if (!disabled) {
      checked = !checked;
      if (onclick) {
        await onclick(event, checked);
      }
    }
  }}
  {disabled}
>
  <Text id={`fluid-switch-circle-${id}`} type="span" class="fluid-switch-circle" />
</Button>
