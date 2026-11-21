<script lang="ts">
  import { Link, Container, Text } from "#src/lib//base/index.ts";
  import { CodeEditor } from "#src/lib/prebuilt/index.ts";

  import { codeEditorContents } from "./codeEditorContents.ts";
  import { codeEditorSvelteTokenizer } from "./codeEditorSvelteTokenizer.ts";
  import { codeEditorDifferenceThemeMapping, codeEditorTokenThemeMapping } from "./codeEditorThemes.ts";
</script>

<Container id="link-samples-grid" class="grid grid-cols-1 gap-8 md:grid-cols-2">
  <!-- Default Link -->
  <Container id="link-sample-standard-container" class="flex flex-col gap-2">
    <Text id="link-sample-standard-heading" type="h3" class="text-lg font-semibold">Standard Link</Text>
    <Text id="link-sample-standard-description" class="text-sm text-neutral-500">A basic link with default fluid styling.</Text>
    <Container id="link-sample-standard-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <Link id="link-sample-standard-link" href="/documentation/base/button">Navigate to Button</Link>
    </Container>
    <CodeEditor
      tokenizer={codeEditorSvelteTokenizer}
      tokenThemeMapping={codeEditorTokenThemeMapping}
      differenceThemeMapping={codeEditorDifferenceThemeMapping}
      id="link-sample-standard-code"
      sourceCode={codeEditorContents.linkStandard}
      language="svelte"
    />
  </Container>

  <!-- Custom Styled -->
  <Container id="link-sample-custom-container" class="flex flex-col gap-2">
    <Text id="link-sample-custom-heading" type="h3" class="text-lg font-semibold">Custom Styled</Text>
    <Text id="link-sample-custom-description" class="text-sm text-neutral-500">A link with additional Tailwind utility classes.</Text>
    <Container id="link-sample-custom-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <Link id="link-sample-custom-link" href="/documentation/base/image" class="font-bold text-primary-600 uppercase">Bold Primary Link</Link>
    </Container>
    <CodeEditor
      tokenizer={codeEditorSvelteTokenizer}
      tokenThemeMapping={codeEditorTokenThemeMapping}
      differenceThemeMapping={codeEditorDifferenceThemeMapping}
      id="link-sample-custom-code"
      sourceCode={codeEditorContents.linkCustom}
      language="svelte"
    />
  </Container>
</Container>
