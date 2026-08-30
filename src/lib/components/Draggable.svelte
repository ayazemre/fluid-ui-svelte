<script lang="ts">
  import { Container } from "#src/lib/base/index.ts";

  import type { Snippet } from "svelte";

  let {
    variant = "",
    componentId = "",
    children,
    ondragstart,
  }: {
    variant?: string;
    componentId?: string;
    children: Snippet;
    ondragstart?: (event: DragEvent) => void;
  } = $props();
</script>

<Container id={componentId} draggable="true" {ondragstart} class={[variant, "cursor-grab", "active:cursor-grabbing", "fluid-draggable"].join(" ")}>
  {@render children()}
</Container>
