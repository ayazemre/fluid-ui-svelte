<script lang="ts">
  import { Container, Text, Button } from "#src/lib/base/index.ts";
  import { Modal, CodeBlock } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  let isBasicOpen = $state(false);
</script>

<Container id="modal-samples-root" class="flex flex-col gap-10">
  <Container id="modal-samples-header" class="flex flex-col gap-2">
    <Text id="modal-samples-title" type="h1">Modal Samples</Text>
    <Text id="modal-samples-description" class="text-neutral-500">A classic centered modal component for critical actions or information.</Text>
  </Container>

  <!-- 1. Basic Modal -->
  <Container id="modal-basic-section" class="flex flex-col gap-4">
    <Text id="modal-basic-heading" type="h3" class="text-xl font-bold">1. Basic Modal</Text>
    <Text id="modal-basic-desc" class="text-neutral-500">Standard centered modal with a backdrop.</Text>
    <Container id="modal-basic-preview" class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <Button id="open-modal-button" onclick={async () => (isBasicOpen = true)} class="fluid-button-primary">Open Modal</Button>

      <Modal id="modal-basic-sample" bind:isOpen={isBasicOpen}>
        <Container id="modal-basic-content" class="flex flex-col gap-4 p-6">
          <Text id="modal-basic-content-title" type="h2" class="text-2xl font-bold">Modal Title</Text>
          <Text id="modal-basic-content-body">This is a centered modal. It locks body scroll and closes on Escape key or backdrop click.</Text>
          <Container id="modal-basic-actions" class="flex justify-end gap-2 mt-4">
            <Button id="modal-cancel-button" onclick={async () => (isBasicOpen = false)} class="fluid-button-transparent">Cancel</Button>
            <Button id="modal-confirm-button" onclick={async () => (isBasicOpen = false)} class="fluid-button-primary">Confirm</Button>
          </Container>
        </Container>
      </Modal>
    </Container>
    <CodeBlock id="modal-basic-codeblock" code={codeBlockContents.modalBasic} language="svelte" />
  </Container>
</Container>
