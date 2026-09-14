<script lang="ts">
  import { Button, Container, Text } from "#src/lib//base/index.ts";
  import { applyDiffLineDecision } from "#src/lib/components/codeBlock.ts";
  import { CodeBlock } from "#src/lib/components/index.ts";

  import type { DiffLineActionPayload } from "#src/lib/components/codeBlock.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  let reviewSourceCode = $state(codeBlockContents.codeBlockDiffSource);
  let reviewModifiedCode = $state<string | undefined>(codeBlockContents.codeBlockDiffModified);

  function handleAcceptReviewLine(payload: DiffLineActionPayload): void {
    const result = applyDiffLineDecision(reviewSourceCode, reviewModifiedCode ?? "", payload.diffRow, "accepted");
    reviewSourceCode = result.sourceCode;
    reviewModifiedCode = result.modifiedCode;
  }

  function handleRejectReviewLine(payload: DiffLineActionPayload): void {
    const result = applyDiffLineDecision(reviewSourceCode, reviewModifiedCode ?? "", payload.diffRow, "rejected");
    reviewSourceCode = result.sourceCode;
    reviewModifiedCode = result.modifiedCode;
  }

  function handleResetReview(): void {
    reviewSourceCode = codeBlockContents.codeBlockDiffSource;
    reviewModifiedCode = codeBlockContents.codeBlockDiffModified;
  }
</script>

<Container id="code-block-samples-container" class="flex flex-col gap-8">
  <Text id="code-block-sample-description">Here is an example of the CodeBlock component.</Text>
  <Container id="code-block-sample-single-section" class="flex flex-col gap-2">
    <Text id="code-block-sample-single-heading" type="h3" class="text-lg font-semibold">Single view</Text>
    <Text id="code-block-sample-single-description" class="text-sm text-neutral-500">Pass sourceCode on its own for highlighted static output.</Text>
    <Container id="code-block-sample-preview" class="flex flex-col gap-4 rounded-lg border p-4">
      <CodeBlock id="code-block-sample-example" language="svelte" sourceCode={codeBlockContents.codeBlockExample} />
    </Container>
  </Container>

  <Container id="code-block-sample-diff-section" class="flex flex-col gap-2">
    <Text id="code-block-sample-diff-heading" type="h3" class="text-lg font-semibold">Condensed diff</Text>
    <Text id="code-block-sample-diff-description" class="text-sm text-neutral-500">
      Pass modifiedCode to switch into diff mode. Only changed lines plus context render, the rest collapse into gap rows.
    </Text>
    <Container id="code-block-sample-diff-preview" class="flex flex-col gap-4 rounded-lg border p-4">
      <CodeBlock
        id="code-block-sample-diff"
        language="svelte"
        sourceCode={codeBlockContents.codeBlockDiffSource}
        modifiedCode={codeBlockContents.codeBlockDiffModified}
      />
    </Container>
  </Container>

  <Container id="code-block-sample-full-diff-section" class="flex flex-col gap-2">
    <Text id="code-block-sample-full-diff-heading" type="h3" class="text-lg font-semibold">Full diff</Text>
    <Text id="code-block-sample-full-diff-description" class="text-sm text-neutral-500">
      Set condensedDiff to false to render every line without collapsing unchanged sections.
    </Text>
    <Container id="code-block-sample-full-diff-preview" class="flex flex-col gap-4 rounded-lg border p-4">
      <CodeBlock
        id="code-block-sample-full-diff"
        language="svelte"
        sourceCode={codeBlockContents.codeBlockDiffSource}
        modifiedCode={codeBlockContents.codeBlockDiffModified}
        condensedDiff={false}
      />
    </Container>
  </Container>

  <Container id="code-block-sample-review-section" class="flex flex-col gap-2">
    <Text id="code-block-sample-review-heading" type="h3" class="text-lg font-semibold">Diff review</Text>
    <Text id="code-block-sample-review-description" class="text-sm text-neutral-500">
      Enable per line actions to let reviewers accept or reject each change. Each paired change has one decision: check takes the modified side, cross
      keeps the source side. Both views below share the same review state, so resolving a change updates both. Resolved lines fall back to unchanged
      until nothing remains.
    </Text>
    <Container id="code-block-sample-review-preview" class="flex flex-col gap-4 rounded-lg border p-4">
      <Container id="code-block-sample-review-actions" class="flex gap-2">
        <Button id="code-block-sample-review-reset" class="fluid-button-secondary" onclick={async () => handleResetReview()}>Reset review</Button>
      </Container>
      <Text id="code-block-sample-review-condensed-heading" type="h3" class="text-lg font-semibold">Condensed review</Text>
      <CodeBlock
        id="code-block-sample-review-condensed"
        language="svelte"
        sourceCode={reviewSourceCode}
        modifiedCode={reviewModifiedCode}
        showDiffLineActions
        onAcceptDiffLine={handleAcceptReviewLine}
        onRejectDiffLine={handleRejectReviewLine}
      />
      <Text id="code-block-sample-review-full-heading" type="h3" class="text-lg font-semibold">Full file review</Text>
      <CodeBlock
        id="code-block-sample-review-full"
        language="svelte"
        sourceCode={reviewSourceCode}
        modifiedCode={reviewModifiedCode}
        condensedDiff={false}
        showDiffLineActions
        onAcceptDiffLine={handleAcceptReviewLine}
        onRejectDiffLine={handleRejectReviewLine}
      />
    </Container>
    <CodeBlock id="code-block-sample-review-code" language="svelte" sourceCode={codeBlockContents.codeBlockDiffReview} />
  </Container>
</Container>
