<script lang="ts">
  import { Container, InputField, Label, Text } from "#src/lib/base/index.ts";
  import { CodeBlock } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";
</script>

<Container class="grid grid-cols-1 gap-8 md:grid-cols-2">
  <!-- Standard Label -->
  <Container class="flex flex-col gap-2">
    <Text type="h3" class="text-lg font-semibold">Standard Label</Text>
    <Text class="text-sm text-neutral-500">A label paired with an input field using the for attribute.</Text>
    <Container class="rounded-lg border p-6 dark:border-neutral-700">
      <Container class="flex flex-col gap-1.5">
        <Label for="full-name">Full Name</Label>
        <InputField id="full-name" placeholder="John Doe" class="w-full" />
      </Container>
    </Container>
    <CodeBlock code={codeBlockContents.labelStandard} language="svelte" />
  </Container>

  <!-- Required Indicator -->
  <Container class="flex flex-col gap-2">
    <Text type="h3" class="text-lg font-semibold">With Required Indicator</Text>
    <Text class="text-sm text-neutral-500">A label containing an inline visual indicator for mandatory fields.</Text>
    <Container class="rounded-lg border p-6 dark:border-neutral-700">
      <Container class="flex flex-col gap-1.5">
        <Label for="email-address">
          Email Address <Text type="span" class="text-error-500">*</Text>
        </Label>
        <InputField id="email-address" type="text" placeholder="john@example.com" class="w-full" />
      </Container>
    </Container>
    <CodeBlock code={codeBlockContents.labelRequired} language="svelte" />
  </Container>

  <!-- Custom Styled -->
  <Container class="flex flex-col gap-2">
    <Text type="h3" class="text-lg font-semibold">Custom Styled</Text>
    <Text class="text-sm text-neutral-500">A label customized with additional Tailwind CSS classes.</Text>
    <Container class="rounded-lg border p-6 dark:border-neutral-700">
      <Container class="flex flex-col gap-1.5">
        <Label for="custom-input" class="font-semibold tracking-wide text-primary-600">Custom Styled Label</Label>
        <InputField id="custom-input" placeholder="Styled input" class="w-full" />
      </Container>
    </Container>
    <CodeBlock code={codeBlockContents.labelCustom} language="svelte" />
  </Container>
</Container>
