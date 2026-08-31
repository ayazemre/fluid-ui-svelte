<script lang="ts">
  import { Container, InputField, Label, Text } from "#src/lib/base/index.ts";
  import { CodeBlock } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";
</script>

<Container id="label-samples-grid" class="grid grid-cols-1 gap-8 md:grid-cols-2">
  <!-- Standard Label -->
  <Container id="label-sample-standard-container" class="flex flex-col gap-2">
    <Text id="label-sample-standard-heading" type="h3" class="text-lg font-semibold">Standard Label</Text>
    <Text id="label-sample-standard-description" class="text-sm text-neutral-500">A label paired with an input field using the for attribute.</Text>
    <Container id="label-sample-standard-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <Container id="label-sample-standard-group" class="flex flex-col gap-1.5">
        <Label id="label-sample-standard-label" for="full-name">Full Name</Label>
        <InputField id="full-name" placeholder="John Doe" class="w-full" />
      </Container>
    </Container>
    <CodeBlock id="label-sample-standard-code" code={codeBlockContents.labelStandard} language="svelte" />
  </Container>

  <!-- Required Indicator -->
  <Container id="label-sample-required-container" class="flex flex-col gap-2">
    <Text id="label-sample-required-heading" type="h3" class="text-lg font-semibold">With Required Indicator</Text>
    <Text id="label-sample-required-description" class="text-sm text-neutral-500">A label containing an inline visual indicator for mandatory fields.</Text>
    <Container id="label-sample-required-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <Container id="label-sample-required-group" class="flex flex-col gap-1.5">
        <Label id="label-sample-required-label" for="email-address">
          Email Address <Text id="label-sample-required-star" type="span" class="text-error-500">*</Text>
        </Label>
        <InputField id="email-address" type="text" placeholder="john@example.com" class="w-full" />
      </Container>
    </Container>
    <CodeBlock id="label-sample-required-code" code={codeBlockContents.labelRequired} language="svelte" />
  </Container>

  <!-- Custom Styled -->
  <Container id="label-sample-custom-container" class="flex flex-col gap-2">
    <Text id="label-sample-custom-heading" type="h3" class="text-lg font-semibold">Custom Styled</Text>
    <Text id="label-sample-custom-description" class="text-sm text-neutral-500">A label customized with additional Tailwind CSS classes.</Text>
    <Container id="label-sample-custom-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <Container id="label-sample-custom-group" class="flex flex-col gap-1.5">
        <Label id="label-sample-custom-label" for="custom-input" class="font-semibold tracking-wide text-primary-600">Custom Styled Label</Label>
        <InputField id="custom-input" placeholder="Styled input" class="w-full" />
      </Container>
    </Container>
    <CodeBlock id="label-sample-custom-code" code={codeBlockContents.labelCustom} language="svelte" />
  </Container>
</Container>
