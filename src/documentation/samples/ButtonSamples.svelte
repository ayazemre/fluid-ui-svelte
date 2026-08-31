<script lang="ts">
  import Icon from "@iconify/svelte";

  import { Button, Container, Text } from "#src/lib/base/index.ts";
  import { CodeBlock } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";
</script>

<Container id="button-samples-grid" class="grid grid-cols-1 gap-8 md:grid-cols-2">
  <!-- Primary Button -->
  <Container id="button-sample-primary-container" class="flex flex-col gap-2">
    <Text id="button-sample-primary-heading" type="h3" class="text-lg font-semibold">Primary</Text>
    <Container id="button-sample-primary-preview" class="flex items-center gap-4 rounded-lg border p-6 dark:border-neutral-700">
      <Button
        id="button-sample-primary"
        class="fluid-button-primary"
        onclick={async (event, buttonState) => {
          buttonState.inProgress = true;
          await new Promise((resolve) => setTimeout(resolve, 1000));
          buttonState.inProgress = false;
        }}
      >
        {#snippet loadingPlaceholder()}
          <Icon icon="line-md:loading-twotone-loop" />
          <Text id="button-sample-primary-loading-text" type="span">Loading...</Text>
        {/snippet}
        Primary Button
      </Button>
    </Container>
    <CodeBlock id="button-sample-primary-code" code={codeBlockContents.buttonPrimary} language="svelte" />
  </Container>

  <!-- Secondary Button -->
  <Container id="button-sample-secondary-container" class="flex flex-col gap-2">
    <Text id="button-sample-secondary-heading" type="h3" class="text-lg font-semibold">Secondary</Text>
    <Container id="button-sample-secondary-preview" class="flex items-center gap-4 rounded-lg border p-6 dark:border-neutral-700">
      <Button
        id="button-sample-secondary"
        class="fluid-button-secondary"
        onclick={async (event, buttonState) => {
          buttonState.inProgress = true;
          await new Promise((resolve) => setTimeout(resolve, 1000));
          buttonState.inProgress = false;
        }}
      >
        {#snippet loadingPlaceholder()}
          <Icon icon="line-md:loading-twotone-loop" />
          <Text id="button-sample-secondary-loading-text" type="span">Loading...</Text>
        {/snippet}
        Secondary Button
      </Button>
    </Container>
    <CodeBlock id="button-sample-secondary-code" code={codeBlockContents.buttonSecondary} language="svelte" />
  </Container>

  <!-- Outline Button -->
  <Container id="button-sample-outline-container" class="flex flex-col gap-2">
    <Text id="button-sample-outline-heading" type="h3" class="text-lg font-semibold">Outline</Text>
    <Container id="button-sample-outline-preview" class="flex items-center gap-4 rounded-lg border p-6 dark:border-neutral-700">
      <Button
        id="button-sample-outline"
        class="fluid-button-outline"
        onclick={async (event, buttonState) => {
          buttonState.inProgress = true;
          await new Promise((resolve) => setTimeout(resolve, 1000));
          buttonState.inProgress = false;
        }}
      >
        {#snippet loadingPlaceholder()}
          <Icon icon="line-md:loading-twotone-loop" />
          <Text id="button-sample-outline-loading-text" type="span">Loading...</Text>
        {/snippet}
        Outline Button
      </Button>
    </Container>
    <CodeBlock id="button-sample-outline-code" code={codeBlockContents.buttonOutline} language="svelte" />
  </Container>

  <!-- Transparent Button -->
  <Container id="button-sample-transparent-container" class="flex flex-col gap-2">
    <Text id="button-sample-transparent-heading" type="h3" class="text-lg font-semibold">Transparent</Text>
    <Container id="button-sample-transparent-preview" class="flex items-center gap-4 rounded-lg border p-6 dark:border-neutral-700">
      <Button
        id="button-sample-transparent"
        class="fluid-button-transparent"
        onclick={async (event, buttonState) => {
          buttonState.inProgress = true;
          await new Promise((resolve) => setTimeout(resolve, 1000));
          buttonState.inProgress = false;
        }}
      >
        {#snippet loadingPlaceholder()}
          <Icon icon="line-md:loading-twotone-loop" />
          <Text id="button-sample-transparent-loading-text" type="span">Loading...</Text>
        {/snippet}
        Transparent Button
      </Button>
    </Container>
    <CodeBlock id="button-sample-transparent-code" code={codeBlockContents.buttonTransparent} language="svelte" />
  </Container>

  <!-- With Icon -->
  <Container id="button-sample-icon-container" class="flex flex-col gap-2 md:col-span-2">
    <Text id="button-sample-icon-heading" type="h3" class="text-lg font-semibold">With Icon</Text>
    <Container id="button-sample-icon-preview" class="flex items-center gap-4 rounded-lg border p-6 dark:border-neutral-700">
      <Button
        id="button-sample-icon"
        class="fluid-button-primary"
        onclick={async (event, buttonState) => {
          buttonState.inProgress = true;
          await new Promise((resolve) => setTimeout(resolve, 1000));
          buttonState.inProgress = false;
        }}
      >
        {#snippet loadingPlaceholder()}
          <Icon icon="line-md:loading-twotone-loop" />
          <Text id="button-sample-icon-loading-text" type="span">Loading...</Text>
        {/snippet}
        <Icon icon="mdi:github" class="text-xl" />
        <Text id="button-sample-icon-text" type="span">GitHub</Text>
      </Button>
    </Container>
    <CodeBlock id="button-sample-icon-code" code={codeBlockContents.buttonIcon} language="svelte" />
  </Container>
</Container>
