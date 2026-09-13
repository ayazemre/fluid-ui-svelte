<script lang="ts">
  import { Container } from "#src/lib/base/index.ts";

  import type { Snippet } from "svelte";

  import {
    processDropzoneDragEnter,
    processDropzoneDragLeave,
    processDropzoneDragOver,
    processDropzoneDrop,
    type DropzoneDropEffect,
    type DropzoneMode,
    type DropzoneState,
  } from "./dropzone.ts";

  let {
    id,
    variant = "",
    children,
    dropEffect = "copy",
    mode = "file",
    data = $bindable(),
  }: {
    id: string;
    variant?: string;
    children: Snippet<[{ isDragOver: boolean; isInvalid: boolean }]>;
    dropEffect?: DropzoneDropEffect;
    mode?: DropzoneMode;
    data?: Array<File> | string;
  } = $props();

  let componentState: DropzoneState = $state({ isDragOver: false, isInvalid: false });
</script>

<Container
  {id}
  class={[variant, "fluid-dropzone", "relative", componentState.isDragOver ? "drag-over" : "", componentState.isInvalid ? "drag-invalid" : ""].join(
    " ",
  )}
  ondragover={(event: DragEvent) => {
    componentState = processDropzoneDragOver(event, dropEffect, mode);
  }}
  ondragenter={(event: DragEvent) => {
    componentState = processDropzoneDragEnter(event, mode);
  }}
  ondragleave={() => {
    componentState = processDropzoneDragLeave();
  }}
  ondrop={(event: DragEvent) => {
    componentState = processDropzoneDragLeave();
    const result = processDropzoneDrop(event, mode);
    if (result !== null) {
      data = result;
    }
  }}
>
  {@render children({ isDragOver: componentState.isDragOver, isInvalid: componentState.isInvalid })}
</Container>
