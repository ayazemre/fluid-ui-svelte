<script lang="ts">
  import { Container } from "#src/lib/base/index.ts";

  import type { Snippet } from "svelte";

  import { handleDraggableDrag, handleDraggableDragEnd, handleDraggableDragStart } from "./draggable.ts";

  let {
    componentId,
    variant = "",
    disabled = false,
    children,
    ondrag,
    ondragend,
    ondragstart,
  }: {
    componentId: string;
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
  id={componentId}
  draggable={!disabled}
  ondragstart={(event: DragEvent) => {
    isDragging = handleDraggableDragStart(event, disabled, ondragstart);
  }}
  ondrag={(event: DragEvent) => handleDraggableDrag(event, ondrag)}
  ondragend={(event: DragEvent) => {
    isDragging = handleDraggableDragEnd(event, ondragend);
  }}
  class={[
    variant,
    disabled ? "cursor-not-allowed opacity-60" : "cursor-grab active:cursor-grabbing",
    isDragging ? "fluid-dragging opacity-50" : "",
    "fluid-draggable",
  ].join(" ")}
>
  {@render children({ isDragging })}
</Container>
