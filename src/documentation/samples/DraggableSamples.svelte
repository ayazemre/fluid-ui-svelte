<script lang="ts">
  import { Container, Text } from "#src/lib/base/index.ts";
  import { Draggable, CodeBlock } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  let dragStatus = $state("Drag something!");
</script>

<Container class="flex flex-col gap-12">
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-lg font-semibold">Barebone Draggable</Text>
    <Text class="text-sm text-neutral-500">
      A simple wrapper that makes elements draggable. You handle the data transfer in the ondragstart event.
    </Text>

    <Container class="flex items-center gap-4 rounded-lg border bg-neutral-50 p-6 dark:border-neutral-700 dark:bg-neutral-900">
      <Draggable
        componentId="draggable-sample-basic"
        ondragstart={(dragEvent: DragEvent) => {
          dragEvent.dataTransfer?.setData("text/plain", "Custom Data");
          dragStatus = "Dragging...";
        }}
        ondragend={() => {
          dragStatus = "Drag finished!";
        }}
      >
        <Container class="w-32 rounded bg-primary-500 p-4 text-center text-white shadow-md">Drag Me</Container>
      </Draggable>
      <Text class="text-sm font-mono italic text-neutral-400">{dragStatus}</Text>
    </Container>

    <CodeBlock code={codeBlockContents.draggableBasic} language="svelte" />
  </Container>
</Container>
