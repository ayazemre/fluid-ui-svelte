<script lang="ts">
  import { InputField, Container, Text } from "#src/lib/base/index.ts";
  import { CodeBlock } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  let textValue = $state("");
  let passwordValue = $state("");
  let numericValue = $state("");
  let textAreaValue = $state("");
  let errorValue = $state("invalid-email@");
</script>

<Container id="input-field-samples-grid" class="grid grid-cols-1 gap-8 md:grid-cols-2">
  <!-- Basic Text -->
  <Container id="input-sample-basic-container" class="flex flex-col gap-2">
    <Text id="input-sample-basic-heading" type="h3" class="text-lg font-semibold">Basic Text</Text>
    <Text id="input-sample-basic-description" class="text-sm text-neutral-500">Standard text input with reactive binding.</Text>
    <Container id="input-sample-basic-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <InputField id="input-sample-basic-input" placeholder="Enter your name" bind:value={textValue} class="w-full" />
      <Text id="input-sample-basic-value-text" class="mt-2 text-sm text-neutral-500">Value: {textValue}</Text>
    </Container>
    <CodeBlock id="input-sample-basic-code" code={codeBlockContents.inputBasic} language="svelte" />
  </Container>

  <!-- Password -->
  <Container id="input-sample-password-container" class="flex flex-col gap-2">
    <Text id="input-sample-password-heading" type="h3" class="text-lg font-semibold">Password</Text>
    <Text id="input-sample-password-description" class="text-sm text-neutral-500">Secure entry for passwords and sensitive data.</Text>
    <Container id="input-sample-password-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <InputField id="input-sample-password-input" type="password" placeholder="Enter password" bind:value={passwordValue} class="w-full" />
      <Text id="input-sample-password-value-text" class="mt-2 text-sm text-neutral-500">Value: {passwordValue}</Text>
    </Container>
    <CodeBlock id="input-sample-password-code" code={codeBlockContents.inputPassword} language="svelte" />
  </Container>

  <!-- Textarea -->
  <Container id="input-sample-textarea-container" class="flex flex-col gap-2">
    <Text id="input-sample-textarea-heading" type="h3" class="text-lg font-semibold">Textarea</Text>
    <Text id="input-sample-textarea-description" class="text-sm text-neutral-500">Multiline text input for longer messages.</Text>
    <Container id="input-sample-textarea-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <InputField
        id="input-sample-textarea-input"
        type="textarea"
        placeholder="Enter your message..."
        bind:value={textAreaValue}
        class="h-32 w-full"
      />
      <Text id="input-sample-textarea-value-text" class="mt-2 text-sm text-neutral-500">Value: {textAreaValue}</Text>
    </Container>
    <CodeBlock id="input-sample-textarea-code" code={codeBlockContents.inputTextArea} language="svelte" />
  </Container>

  <!-- Numeric Filter -->
  <Container id="input-sample-numeric-container" class="flex flex-col gap-2">
    <Text id="input-sample-numeric-heading" type="h3" class="text-lg font-semibold">Numeric Only</Text>
    <Text id="input-sample-numeric-description" class="text-sm text-neutral-500">Using characterFilter to restrict input to digits.</Text>
    <Container id="input-sample-numeric-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <InputField
        id="input-sample-numeric-input"
        placeholder="Numbers only..."
        bind:value={numericValue}
        characterFilter={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
        class="w-full"
      />
      <Text id="input-sample-numeric-value-text" class="mt-2 text-sm text-neutral-500">Value: {numericValue}</Text>
    </Container>
    <CodeBlock id="input-sample-numeric-code" code={codeBlockContents.inputNumeric} language="svelte" />
  </Container>

  <!-- Error State -->
  <Container id="input-sample-error-container" class="flex flex-col gap-2">
    <Text id="input-sample-error-heading" type="h3" class="text-lg font-semibold">Error State</Text>
    <Text id="input-sample-error-description" class="text-sm text-neutral-500">Applying custom error styling for validation feedback.</Text>
    <Container id="input-sample-error-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <InputField id="input-sample-error-input" class="fluid-input-field-error w-full" placeholder="Error styling" bind:value={errorValue} />
      <Text id="input-sample-error-value-text" class="mt-2 text-sm text-neutral-500">Value: {errorValue}</Text>
    </Container>
    <CodeBlock id="input-sample-error-code" code={codeBlockContents.inputError} language="svelte" />
  </Container>
</Container>
