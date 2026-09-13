<script lang="ts">
  import { Container, Text } from "#src/lib/base/index.ts";
  import { Switch, CodeBlock } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  let isChecked = $state(false);
</script>

<Container id="switch-samples-container" class="flex flex-col gap-12">
  <!-- Example 1: Basic Switch -->
  <Container id="switch-sample-basic-section" class="flex flex-col gap-4">
    <Text id="switch-sample-basic-heading" type="h3" class="text-lg font-semibold">Basic Usage</Text>
    <Text id="switch-sample-basic-description" class="text-sm text-neutral-500">A standard toggle switch for boolean states.</Text>

    <Container id="switch-sample-basic-preview" class="flex items-center gap-4 rounded-lg border p-6 dark:border-neutral-700">
      <Switch
        id="switch-sample-basic"
        bind:checked={isChecked}
        onclick={async () => {
          console.log("Switch toggled to:", isChecked);
        }}
      />
      <Text id="switch-sample-basic-status" class="text-sm font-medium uppercase text-neutral-500">
        Status: {isChecked ? "Enabled" : "Disabled"}
      </Text>
    </Container>

    <CodeBlock id="switch-sample-basic-code" code={codeBlockContents.switchBasic} language="svelte" />
  </Container>

  <!-- Example 2: Disabled State -->
  <Container id="switch-sample-disabled-section" class="flex flex-col gap-4">
    <Text id="switch-sample-disabled-heading" type="h3" class="text-lg font-semibold">Disabled State</Text>
    <Text id="switch-sample-disabled-description" class="text-sm text-neutral-500">The switch can be disabled to prevent user interaction.</Text>

    <Container id="switch-sample-disabled-preview" class="flex flex-col gap-4 rounded-lg border p-6 dark:border-neutral-700">
      <Container id="switch-sample-disabled-off-row" class="flex items-center gap-4">
        <Switch id="switch-disabled-off" checked={false} disabled onclick={async () => {}} />
        <Text id="switch-disabled-off-label" class="text-xs font-medium uppercase text-neutral-400">Off & Disabled</Text>
      </Container>
      <Container id="switch-sample-disabled-on-row" class="flex items-center gap-4">
        <Switch id="switch-disabled-on" checked={true} disabled onclick={async () => {}} />
        <Text id="switch-disabled-on-label" class="text-xs font-medium uppercase text-neutral-400">On & Disabled</Text>
      </Container>
    </Container>

    <CodeBlock id="switch-sample-disabled-code" code={codeBlockContents.switchDisabled} language="svelte" />
  </Container>
</Container>
