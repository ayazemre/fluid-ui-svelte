<script lang="ts">
  import { Button, Container, InputField, Text } from "../base/index.ts";
  import {
    buildHighlightedLines,
    buildViewDifferenceRows,
    canEditDifferenceRow,
    commitLineEdit,
    focusLineEditInput,
    getCodeRegionLabel,
    getDifferenceMarkerClass,
    getDifferenceRowBackground,
    getDifferenceRowContentMarkup,
    getDifferenceRowMarker,
    getDifferenceRowNumberText,
    getDisplayLineNumber,
    handleDifferenceDecision,
    handleLineEditKey,
    isChangeBlockActionRow,
    isLineBeingEdited,
    openLineEdit,
    openLineEditFromCodeKey,
    stopClickPropagation,
    tokenizeCodeLines,
    type CodeContent,
    type CodeEditorLineEditState,
    type DifferenceThemeMapping,
    type LineTokenizer,
    type TokenThemeMapping,
  } from "./codeEditor.ts";

  let {
    id,
    variant = "",
    codeContent = $bindable(),
    language = "",
    showLineNumbers = true,
    tokenizer,
    tokenThemeMapping,
    differenceThemeMapping,
    differenceContextLineCount = 2,
    condensedDifference = true,
    showDifferenceLineActions = false,
    editableDifferences = false,
  }: {
    id: string;
    variant?: string;
    codeContent: CodeContent;
    language?: string;
    showLineNumbers?: boolean;
    tokenizer?: LineTokenizer<unknown>;
    tokenThemeMapping: TokenThemeMapping;
    differenceThemeMapping: DifferenceThemeMapping;
    differenceContextLineCount?: number;
    condensedDifference?: boolean;
    showDifferenceLineActions?: boolean;
    editableDifferences?: boolean;
  } = $props();

  const isDifferenceView = $derived(codeContent.modifiedCode !== undefined);
  const sourceTokenLines = $derived(tokenizeCodeLines(codeContent.sourceCode.split("\n"), tokenizer));
  const modifiedTokenLines = $derived(
    codeContent.modifiedCode === undefined ? [] : tokenizeCodeLines(codeContent.modifiedCode.split("\n"), tokenizer),
  );
  const highlightedLines = $derived(buildHighlightedLines(sourceTokenLines, tokenThemeMapping));
  const condensedDifferenceRows = $derived(
    buildViewDifferenceRows(codeContent.sourceCode, codeContent.modifiedCode, condensedDifference, differenceContextLineCount),
  );

  const lineEditState: CodeEditorLineEditState = $state({
    caretOffset: 0,
    inputElement: null,
    modifiedLineNumber: null,
    text: "",
  });

  $effect(() => {
    focusLineEditInput(lineEditState);
  });
</script>

<Container
  id={`fluid-code-editor-${id}`}
  role="region"
  aria-label={getCodeRegionLabel(language, isDifferenceView)}
  class={["fluid-code-editor", variant].join(" ")}
>
  {#if isDifferenceView}
    {#if condensedDifferenceRows.length === 0}
      <Container id={`fluid-code-editor-row-empty-${id}`} class="fluid-code-editor-row">
        <Container id={`fluid-code-editor-content-empty-${id}`} class="fluid-code-editor-content">
          <Text id={`fluid-code-editor-text-empty-${id}`} type="pre">No changes</Text>
        </Container>
      </Container>
    {:else}
      {#each condensedDifferenceRows as differenceRow, index}
        {#if differenceRow.kind === "gap"}
          <Container id={`fluid-code-editor-row-gap-${index}-${id}`} class="fluid-code-editor-row">
            {#if showLineNumbers}
              <Container id={`fluid-code-editor-index-gap-${index}-${id}`} aria-hidden="true" class="fluid-code-editor-index">
                <Text id={`fluid-code-editor-number-gap-${index}-${id}`} class="fluid-code-editor-number">…</Text>
              </Container>
            {/if}
            <Container id={`fluid-code-editor-content-gap-${index}-${id}`} class="fluid-code-editor-content">
              <Text id={`fluid-code-editor-text-gap-${index}-${id}`} type="pre">
                <Text id={`fluid-code-editor-code-gap-${index}-${id}`} type="span" class={differenceThemeMapping.gapRow}>
                  {differenceRow.skippedLineCount + " unchanged lines hidden"}
                </Text>
              </Text>
            </Container>
          </Container>
        {:else}
          <Container
            id={`fluid-code-editor-row-${index}-${id}`}
            class={[
              "fluid-code-editor-row",
              canEditDifferenceRow(editableDifferences, differenceRow) ? "fluid-code-editor-row-editable" : "",
              getDifferenceRowBackground(differenceRow.kind, differenceThemeMapping),
            ].join(" ")}
            onclick={(clickEvent) => openLineEdit(lineEditState, codeContent, editableDifferences, differenceRow, clickEvent)}
          >
            {#if showLineNumbers}
              <Container id={`fluid-code-editor-index-${index}-${id}`} aria-hidden="true" class="fluid-code-editor-index">
                <Text
                  id={`fluid-code-editor-marker-${index}-${id}`}
                  type="span"
                  class={["fluid-code-editor-marker", getDifferenceMarkerClass(differenceRow.kind, differenceThemeMapping)].join(" ")}
                >
                  {getDifferenceRowMarker(differenceRow)}
                </Text>
                <Text id={`fluid-code-editor-number-${index}-${id}`} class="fluid-code-editor-number">
                  {getDifferenceRowNumberText(differenceRow)}
                </Text>
              </Container>
            {/if}
            <Container id={`fluid-code-editor-content-${index}-${id}`} class="fluid-code-editor-content">
              {#if isLineBeingEdited(lineEditState, differenceRow)}
                <InputField
                  id={`fluid-code-editor-input-${index}-${id}`}
                  class="fluid-code-editor-input"
                  aria-label={`Edit modified line ${lineEditState.modifiedLineNumber}`}
                  spellcheck="false"
                  bind:domReference={lineEditState.inputElement}
                  bind:value={lineEditState.text}
                  onblur={() => commitLineEdit(lineEditState, codeContent)}
                  onkeydown={(keyboardEvent) => handleLineEditKey(lineEditState, codeContent, keyboardEvent)}
                />
              {:else}
                <Text
                  id={`fluid-code-editor-text-${index}-${id}`}
                  type="pre"
                  class={[
                    "fluid-code-editor-text",
                    canEditDifferenceRow(editableDifferences, differenceRow) ? "fluid-code-editor-editable" : "",
                  ].join(" ")}
                  tabindex={canEditDifferenceRow(editableDifferences, differenceRow) ? 0 : undefined}
                  onkeydown={(keyboardEvent) =>
                    openLineEditFromCodeKey(lineEditState, codeContent, editableDifferences, differenceRow, keyboardEvent)}
                >
                  <Text id={`fluid-code-editor-code-${index}-${id}`} type="span" class={["fluid-code-editor-text", "language-" + language].join(" ")}
                    >{@html getDifferenceRowContentMarkup(
                      differenceRow,
                      sourceTokenLines,
                      modifiedTokenLines,
                      tokenThemeMapping,
                      differenceThemeMapping,
                    ) || "&nbsp;"}</Text
                  >
                </Text>
              {/if}
              {#if isChangeBlockActionRow(condensedDifferenceRows, index, showDifferenceLineActions)}
                <Container id={`fluid-code-editor-actions-${index}-${id}`} class="fluid-code-editor-actions" onclick={stopClickPropagation}>
                  <Button
                    id={`fluid-code-editor-accept-${index}-${id}`}
                    aria-label="Accept change"
                    class="fluid-code-editor-action fluid-code-editor-accept"
                    onclick={() => handleDifferenceDecision(codeContent, differenceRow, "accepted")}
                  >
                    ✓
                  </Button>
                  <Button
                    id={`fluid-code-editor-reject-${index}-${id}`}
                    aria-label="Reject change"
                    class="fluid-code-editor-action fluid-code-editor-reject"
                    onclick={() => handleDifferenceDecision(codeContent, differenceRow, "rejected")}
                  >
                    ✕
                  </Button>
                </Container>
              {/if}
            </Container>
          </Container>
        {/if}
      {/each}
    {/if}
  {:else}
    {#each highlightedLines as lineMarkup, index}
      <Container id={`fluid-code-editor-row-${index}-${id}`} class="fluid-code-editor-row">
        {#if showLineNumbers}
          <Container id={`fluid-code-editor-index-${index}-${id}`} aria-hidden="true" class="fluid-code-editor-index">
            <Text id={`fluid-code-editor-number-${index}-${id}`} class="fluid-code-editor-number">{getDisplayLineNumber(index)}</Text>
          </Container>
        {/if}
        <Container id={`fluid-code-editor-content-${index}-${id}`} class="fluid-code-editor-content">
          <Text id={`fluid-code-editor-text-${index}-${id}`} type="pre" class="fluid-code-editor-text">
            <Text id={`fluid-code-editor-code-${index}-${id}`} type="span" class={["fluid-code-editor-text", "language-" + language].join(" ")}
              >{@html lineMarkup || "&nbsp;"}</Text
            >
          </Text>
        </Container>
      </Container>
    {/each}
  {/if}
</Container>
