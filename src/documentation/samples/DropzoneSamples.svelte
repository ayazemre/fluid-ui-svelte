<script lang="ts">
  import { Container, Text } from "#src/lib/base/index.ts";
  import { Dropzone, CodeBlock, Draggable } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  // File Only State
  let droppedFiles = $state<File[]>([]);

  // Data Only State
  let droppedData = $state("");
</script>

<Container id="dropzone-samples-container" class="flex flex-col gap-12">
  <!-- File Only Dropzone -->
  <Container id="dropzone-sample-file-section" class="flex flex-col gap-4">
    <Text id="dropzone-sample-file-heading" type="h3" class="text-lg font-semibold">File Dropzone (Copy)</Text>
    <Text id="dropzone-sample-file-description" class="text-sm text-neutral-500">Optimized for file uploads. The cursor indicates a "Copy" operation.</Text>

    <Container id="dropzone-sample-file-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <Dropzone id="dropzone-file-sample" bind:data={droppedFiles} mode="file" dropEffect="copy">
        {#snippet children({ isDragOver, isInvalid })}
          <Container id="dropzone-file-content" class="flex flex-col items-center gap-2">
            <Text id="dropzone-file-status-text" class={isInvalid ? "font-bold text-error-600" : isDragOver ? "font-bold text-primary-600" : "font-medium text-neutral-500"}>
              {#if isInvalid}
                You are trying to drop unsupported data
              {:else if isDragOver}
                Drop Files Now
              {:else}
                Drag & Drop Files Here
              {/if}
            </Text>

            {#if droppedFiles.length > 0 && !isDragOver}
              <Container id="dropzone-file-list-wrapper" class="mt-4 w-full rounded bg-neutral-100 p-2 text-left text-sm dark:bg-neutral-800">
                <Text id="dropzone-file-list-heading" class="mb-1 font-bold">Dropped Files:</Text>
                <Container id="dropzone-file-items" class="flex flex-col gap-1 pl-4 text-neutral-600 dark:text-neutral-400">
                  {#each droppedFiles as file, index}
                    <Text id={`dropzone-file-item-${index}`}>• {file.name} ({Math.round(file.size / 1024)} KB)</Text>
                  {/each}
                </Container>
              </Container>
            {/if}
          </Container>
        {/snippet}
      </Dropzone>
    </Container>

    <CodeBlock id="dropzone-sample-file-code" code={codeBlockContents.dropzoneFile} language="svelte" />
  </Container>

  <!-- Data Only Dropzone -->
  <Container id="dropzone-sample-data-section" class="flex flex-col gap-4">
    <Text id="dropzone-sample-data-heading" type="h3" class="text-lg font-semibold">Data Dropzone (Move)</Text>
    <Text id="dropzone-sample-data-description" class="text-sm text-neutral-500">
      Designed for moving text or data between applications. The cursor indicates a "Move" operation. This dropzone strictly rejects files.
    </Text>

    <Container id="dropzone-sample-data-preview" class="rounded-lg border bg-neutral-50 p-6 dark:border-neutral-700 dark:bg-neutral-900/50">
      <Container id="dropzone-sample-draggables" class="mb-6 flex gap-4">
        <Draggable
          id="draggable-user-alice"
          variant="primary"
          ondragstart={(dragEvent: DragEvent) => dragEvent.dataTransfer?.setData("text/plain", "ID: 12345 - User: Alice")}
        >
          <Text id="draggable-user-alice-text" class="text-xs">Drag User Alice</Text>
        </Draggable>
        <Draggable
          id="draggable-user-bob"
          variant="secondary"
          ondragstart={(dragEvent: DragEvent) => dragEvent.dataTransfer?.setData("text/plain", "ID: 67890 - User: Bob")}
        >
          <Text id="draggable-user-bob-text" class="text-xs">Drag User Bob</Text>
        </Draggable>
      </Container>

      <Dropzone id="dropzone-data-sample" bind:data={droppedData} mode="text" dropEffect="move">
        {#snippet children({ isDragOver, isInvalid })}
          <Container id="dropzone-data-content" class="flex flex-col items-center gap-2">
            <Text id="dropzone-data-status-text" class={isInvalid ? "font-bold text-error-600" : isDragOver ? "font-bold text-primary-600" : "font-medium text-neutral-500"}>
              {#if isInvalid}
                You are trying to drop unsupported data
              {:else if isDragOver}
                Drop Data Now
              {:else}
                Drag Draggable Elements or Text Here
              {/if}
            </Text>

            {#if droppedData && !isDragOver}
              <Container
                id="dropzone-data-result-wrapper"
                class="mt-4 w-full rounded border border-neutral-200 bg-neutral-100 p-2 text-left text-sm dark:border-neutral-700 dark:bg-neutral-800"
              >
                <Text id="dropzone-data-result-title" class="mb-1 font-bold text-primary-600">Captured Data:</Text>
                <Text id="dropzone-data-result-content" type="pre" class="font-mono whitespace-pre-wrap text-neutral-600 dark:text-neutral-400">{droppedData}</Text>
              </Container>
            {/if}
          </Container>
        {/snippet}
      </Dropzone>
    </Container>

    <CodeBlock id="dropzone-sample-data-code" code={codeBlockContents.dropzoneData} language="svelte" />
  </Container>
</Container>
