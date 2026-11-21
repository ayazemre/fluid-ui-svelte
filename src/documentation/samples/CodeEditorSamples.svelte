<script lang="ts">
  import { Button, Container, Text } from "#src/lib//base/index.ts";
  import { CodeEditor } from "#src/lib/prebuilt/index.ts";

  import { codeEditorContents } from "./codeEditorContents.ts";
  import { codeEditorSvelteTokenizer } from "./codeEditorSvelteTokenizer.ts";
  import { codeEditorDifferenceThemeMapping, codeEditorTokenThemeMapping } from "./codeEditorThemes.ts";

  let reviewContent = $state({
    modifiedCode: codeEditorContents.codeEditorDifferenceModified,
    sourceCode: codeEditorContents.codeEditorDifferenceSource,
  });

  let editableContent = $state({
    modifiedCode: codeEditorContents.codeEditorDifferenceModified,
    sourceCode: codeEditorContents.codeEditorDifferenceSource,
  });

  function handleResetReview(): void {
    reviewContent.sourceCode = codeEditorContents.codeEditorDifferenceSource;
    reviewContent.modifiedCode = codeEditorContents.codeEditorDifferenceModified;
  }

  function handleResetEditableDifference(): void {
    editableContent.sourceCode = codeEditorContents.codeEditorDifferenceSource;
    editableContent.modifiedCode = codeEditorContents.codeEditorDifferenceModified;
  }
</script>

<Container id="code-editor-samples-container" class="flex flex-col gap-8">
  <Text id="code-editor-sample-description">Here is an example of the CodeEditor component.</Text>
  <Container id="code-editor-sample-single-section" class="flex flex-col gap-2">
    <Text id="code-editor-sample-single-heading" type="h3" class="text-lg font-semibold">Single view</Text>
    <Text id="code-editor-sample-single-description" class="text-sm text-neutral-500">
      Pass codeContent with only sourceCode for highlighted static output.
    </Text>
    <Container id="code-editor-sample-preview" class="flex flex-col gap-4 rounded-lg border p-4">
      <CodeEditor
        tokenizer={codeEditorSvelteTokenizer}
        tokenThemeMapping={codeEditorTokenThemeMapping}
        differenceThemeMapping={codeEditorDifferenceThemeMapping}
        id="code-editor-sample-example"
        language="svelte"
        codeContent={{ sourceCode: codeEditorContents.codeEditorExample }}
      />
    </Container>
  </Container>

  <Container id="code-editor-sample-difference-section" class="flex flex-col gap-2">
    <Text id="code-editor-sample-difference-heading" type="h3" class="text-lg font-semibold">Condensed difference</Text>
    <Text id="code-editor-sample-difference-description" class="text-sm text-neutral-500">
      Set codeContent.modifiedCode to switch into difference mode. Only changed lines plus context render, the rest collapse into gap rows.
    </Text>
    <Container id="code-editor-sample-difference-preview" class="flex flex-col gap-4 rounded-lg border p-4">
      <CodeEditor
        tokenizer={codeEditorSvelteTokenizer}
        tokenThemeMapping={codeEditorTokenThemeMapping}
        differenceThemeMapping={codeEditorDifferenceThemeMapping}
        id="code-editor-sample-difference"
        language="svelte"
        codeContent={{
          sourceCode: codeEditorContents.codeEditorDifferenceSource,
          modifiedCode: codeEditorContents.codeEditorDifferenceModified,
        }}
      />
    </Container>
  </Container>

  <Container id="code-editor-sample-full-difference-section" class="flex flex-col gap-2">
    <Text id="code-editor-sample-full-difference-heading" type="h3" class="text-lg font-semibold">Full difference</Text>
    <Text id="code-editor-sample-full-difference-description" class="text-sm text-neutral-500">
      Set condensedDifference to false to render every line without collapsing unchanged sections.
    </Text>
    <Container id="code-editor-sample-full-difference-preview" class="flex flex-col gap-4 rounded-lg border p-4">
      <CodeEditor
        tokenizer={codeEditorSvelteTokenizer}
        tokenThemeMapping={codeEditorTokenThemeMapping}
        differenceThemeMapping={codeEditorDifferenceThemeMapping}
        id="code-editor-sample-full-difference"
        language="svelte"
        codeContent={{
          sourceCode: codeEditorContents.codeEditorDifferenceSource,
          modifiedCode: codeEditorContents.codeEditorDifferenceModified,
        }}
        condensedDifference={false}
      />
    </Container>
  </Container>

  <Container id="code-editor-sample-review-section" class="flex flex-col gap-2">
    <Text id="code-editor-sample-review-heading" type="h3" class="text-lg font-semibold">Difference review</Text>
    <Text id="code-editor-sample-review-description" class="text-sm text-neutral-500">
      Enable per line actions to let reviewers accept or reject each change. Each paired change has one decision: check takes the modified side, cross
      keeps the source side. Both views below share the same review state, so resolving a change updates both. Resolved lines fall back to unchanged
      until nothing remains.
    </Text>
    <Container id="code-editor-sample-review-preview" class="flex flex-col gap-4 rounded-lg border p-4">
      <Container id="code-editor-sample-review-actions" class="flex gap-2">
        <Button id="code-editor-sample-review-reset" class="fluid-button-secondary" onclick={async () => handleResetReview()}>Reset review</Button>
      </Container>
      <Text id="code-editor-sample-review-condensed-heading" type="h3" class="text-lg font-semibold">Condensed review</Text>
      <CodeEditor
        tokenizer={codeEditorSvelteTokenizer}
        tokenThemeMapping={codeEditorTokenThemeMapping}
        differenceThemeMapping={codeEditorDifferenceThemeMapping}
        id="code-editor-sample-review-condensed"
        language="svelte"
        bind:codeContent={reviewContent}
        showDifferenceLineActions
      />
      <Text id="code-editor-sample-review-full-heading" type="h3" class="text-lg font-semibold">Full file review</Text>
      <CodeEditor
        tokenizer={codeEditorSvelteTokenizer}
        tokenThemeMapping={codeEditorTokenThemeMapping}
        differenceThemeMapping={codeEditorDifferenceThemeMapping}
        id="code-editor-sample-review-full"
        language="svelte"
        bind:codeContent={reviewContent}
        condensedDifference={false}
        showDifferenceLineActions
      />
    </Container>
    <CodeEditor
      tokenizer={codeEditorSvelteTokenizer}
      tokenThemeMapping={codeEditorTokenThemeMapping}
      differenceThemeMapping={codeEditorDifferenceThemeMapping}
      id="code-editor-sample-review-code"
      language="svelte"
      codeContent={{ sourceCode: codeEditorContents.codeEditorDifferenceReview }}
    />
  </Container>

  <Container id="code-editor-sample-editable-section" class="flex flex-col gap-2">
    <Text id="code-editor-sample-editable-heading" type="h3" class="text-lg font-semibold">Editable difference</Text>
    <Text id="code-editor-sample-editable-description" class="text-sm text-neutral-500">
      Enable editableDifferences to edit added and changed lines on the modified side. Click a row, or press Enter on its code, to open an input.
      Enter or leaving the input saves the line, and Escape cancels. Edits write to the bound codeContent.modifiedCode, and the difference recomputes.
    </Text>
    <Container id="code-editor-sample-editable-preview" class="flex flex-col gap-4 rounded-lg border p-4">
      <Container id="code-editor-sample-editable-actions" class="flex gap-2">
        <Button id="code-editor-sample-editable-reset" class="fluid-button-secondary" onclick={() => handleResetEditableDifference()}
          >Reset edits</Button
        >
      </Container>
      <CodeEditor
        tokenizer={codeEditorSvelteTokenizer}
        tokenThemeMapping={codeEditorTokenThemeMapping}
        differenceThemeMapping={codeEditorDifferenceThemeMapping}
        id="code-editor-sample-editable"
        language="svelte"
        bind:codeContent={editableContent}
        editableDifferences
      />
    </Container>
  </Container>
</Container>
