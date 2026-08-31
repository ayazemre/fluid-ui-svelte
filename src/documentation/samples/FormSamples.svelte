<script lang="ts">
  import { Form, InputField, Button, Container, Text } from "#src/lib/base/index.ts";
  import { CodeBlock } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  let username = $state("");
</script>

<Container id="form-samples-container" class="flex flex-col gap-12">
  <!-- Basic Form -->
  <Container id="form-sample-basic-section" class="flex flex-col gap-4">
    <Text id="form-sample-basic-heading" type="h3" class="text-lg font-semibold">Basic Form</Text>
    <Text id="form-sample-basic-description" class="text-sm text-neutral-500">
      A standard form wrapper that automatically handles <Text id="form-sample-basic-desc-code" type="code">preventDefault</Text> on submission.
    </Text>

    <Container id="form-sample-basic-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <Form id="form-sample-basic-form" class="gap-4">
        <Container id="form-sample-basic-input-group" class="flex flex-col gap-2">
          <Text id="form-sample-basic-username-label" type="span" class="text-sm font-medium">Username</Text>
          <InputField id="form-sample-username-input" bind:value={username} placeholder="Enter username" />
        </Container>

        <Button
          id="form-sample-submit-button"
          type="submit"
          class="fluid-button-primary"
          onclick={async (event, buttonState) => {
            buttonState.inProgress = !buttonState.inProgress;
            await new Promise((resolve) => setTimeout(resolve, 1000));
            buttonState.inProgress = !buttonState.inProgress;
          }}
        >
          {#snippet loadingPlaceholder()}
            <Text id="form-sample-loading-text" type="span">Submitting...</Text>
          {/snippet}
          Submit
        </Button>
      </Form>
    </Container>

    <CodeBlock id="form-sample-basic-code" code={codeBlockContents.formBasic} language="svelte" />
  </Container>
</Container>
