<script lang="ts">
  import type { Snippet } from "svelte";

  import { Container } from "../base/index.ts";
  import { handleDraggableDrag, handleDraggableDragEnd, handleDraggableDragStart } from "./draggable.ts";

  let {
    id,
    variant = "",
    disabled = false,
    children,
    ondrag,
    ondragend,
    ondragstart,
  }: {
    id: string;
    variant?: string;
    disabled?: boolean;
    children: Snippet<[{ isDragging: boolean }] | []>;
    ondrag?: (event: DragEvent) => void;
    ondragend?: (event: DragEvent) => void;
    ondragstart?: (event: DragEvent) => void;
  } = $props();

  let isDragging = $state(false);
</script>

<Container
  id={`fluid-draggable-${id}`}
  draggable={!disabled}
  ondragstart={(event: DragEvent) => {
    isDragging = handleDraggableDragStart(event, disabled, ondragstart);
  }}
  ondrag={(event: DragEvent) => handleDraggableDrag(event, ondrag)}
  ondragend={(event: DragEvent) => {
    isDragging = handleDraggableDragEnd(event, ondragend);
  }}
  class={["fluid-draggable", variant, disabled ? "fluid-draggable-disabled" : "", isDragging ? "fluid-draggable-dragging" : ""].join(" ")}
>
  {@render children({ isDragging })}
</Container>
