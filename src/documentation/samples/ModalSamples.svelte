<script lang="ts">
  import { Container, Text, Button } from "#src/lib/base/index.ts";
  import { Modal, CodeBlock } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  let isBasicOpen = $state(false);
</script>

<Container class="flex flex-col gap-10">
  <Container class="flex flex-col gap-2">
    <Text type="h1">Modal Samples</Text>
    <Text class="text-neutral-500">A classic centered modal component for critical actions or information.</Text>
  </Container>

  <!-- 1. Basic Modal -->
  <Container class="flex flex-col gap-4">
    <Text type="h3" class="text-xl font-bold">1. Basic Modal</Text>
    <Text class="text-neutral-500">Standard centered modal with a backdrop.</Text>
    <Container class="w-full rounded-xl border p-6 dark:border-neutral-800">
      <Button onclick={async () => (isBasicOpen = true)} class="fluid-button-primary">Open Modal</Button>

      <Modal componentId="modal-basic-sample" bind:isOpen={isBasicOpen}>
        <Container class="flex flex-col gap-4 p-6">
          <Text type="h2" class="text-2xl font-bold">Modal Title</Text>
          <Text>This is a centered modal. It locks body scroll and closes on Escape key or backdrop click.</Text>
          <Container class="flex justify-end gap-2 mt-4">
            <Button onclick={async () => (isBasicOpen = false)} class="fluid-button-transparent">Cancel</Button>
            <Button onclick={async () => (isBasicOpen = false)} class="fluid-button-primary">Confirm</Button>
          </Container>
        </Container>
      </Modal>
    </Container>
    <CodeBlock code={codeBlockContents.modalBasic} language="svelte" />
  </Container>
</Container>
