<script lang="ts">
  import { Button, Container, InputField, Text } from "../base/index.ts";
  import {
    applyDifferenceLineDecision,
    buildHighlightedLines,
    buildViewDifferenceRows,
    getCodeRegionLabel,
    getDifferenceMarkerClass,
    getDifferenceRowBackground,
    getDifferenceRowContentMarkup,
    getDifferenceRowMarker,
    getDifferenceRowNumberText,
    getDisplayLineNumber,
    getEditableModifiedLineNumber,
    getModifiedLineText,
    isChangeBlockActionRow,
    replaceModifiedCodeLine,
    tokenizeCodeLines,
    type CondensedDifferenceRow,
    type DifferenceThemeMapping,
    type LineTokenizer,
    type TokenThemeMapping,
  } from "./codeEditor.ts";

  let {
    id,
    variant = "",
    sourceCode = $bindable(),
    modifiedCode = $bindable(),
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
    sourceCode: string;
    modifiedCode?: string;
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

  const isDifferenceView = $derived(modifiedCode !== undefined);
  const sourceTokenLines = $derived(tokenizeCodeLines(sourceCode.split("\n"), tokenizer));
  const modifiedTokenLines = $derived(modifiedCode === undefined ? [] : tokenizeCodeLines(modifiedCode.split("\n"), tokenizer));
  const highlightedLines = $derived(buildHighlightedLines(sourceTokenLines, tokenThemeMapping));
  const condensedDifferenceRows = $derived(buildViewDifferenceRows(sourceCode, modifiedCode, condensedDifference, differenceContextLineCount));

  let editingModifiedLineNumber: number | null = $state(null);
  let editingLineText = $state("");
  let editingInputElement: HTMLInputElement | HTMLTextAreaElement | null = $state(null);

  let editingCaretOffset = $state(0);

  $effect(() => {
    if (editingInputElement === null) return;
    editingInputElement.focus();
    editingInputElement.setSelectionRange(editingCaretOffset, editingCaretOffset);
  });

  function isEditableDifferenceRow(differenceRow: CondensedDifferenceRow): boolean {
    return editableDifferences && getEditableModifiedLineNumber(differenceRow) !== undefined;
  }

  function isLineBeingEdited(differenceRow: CondensedDifferenceRow): boolean {
    return editingModifiedLineNumber !== null && getEditableModifiedLineNumber(differenceRow) === editingModifiedLineNumber;
  }

  function getCaretNodeAndOffsetFromPoint(clientX: number, clientY: number): { node: Node; offset: number } | null {
    if (typeof document.caretPositionFromPoint === "function") {
      const caretPosition = document.caretPositionFromPoint(clientX, clientY);
      return caretPosition ? { node: caretPosition.offsetNode, offset: caretPosition.offset } : null;
    }
    const caretRange = document.caretRangeFromPoint(clientX, clientY);
    return caretRange ? { node: caretRange.startContainer, offset: caretRange.startOffset } : null;
  }

  function getClickedCharacterOffset(clickEvent: MouseEvent): number {
    if (!(clickEvent.currentTarget instanceof Element)) return 0;
    const codeElement = clickEvent.currentTarget.querySelector(".fluid-code-editor-content > .fluid-code-editor-text");
    if (!codeElement) return 0;

    const caretNodeAndOffset = getCaretNodeAndOffsetFromPoint(clickEvent.clientX, clickEvent.clientY);
    if (!caretNodeAndOffset || !codeElement.contains(caretNodeAndOffset.node)) {
      return clickEvent.clientX < codeElement.getBoundingClientRect().left ? 0 : Number.POSITIVE_INFINITY;
    }

    const characterRange = document.createRange();
    characterRange.selectNodeContents(codeElement);
    characterRange.setEnd(caretNodeAndOffset.node, caretNodeAndOffset.offset);
    return characterRange.toString().length;
  }

  function startLineEdit(differenceRow: CondensedDifferenceRow, clickEvent?: MouseEvent): void {
    const modifiedLineNumber = getEditableModifiedLineNumber(differenceRow);
    if (!editableDifferences || modifiedLineNumber === undefined || modifiedCode === undefined) return;
    if (editingModifiedLineNumber === modifiedLineNumber) return;
    const lineText = getModifiedLineText(modifiedCode, modifiedLineNumber);
    editingLineText = lineText;
    editingCaretOffset = clickEvent === undefined ? lineText.length : Math.min(getClickedCharacterOffset(clickEvent), lineText.length);
    editingModifiedLineNumber = modifiedLineNumber;
  }

  function commitLineEdit(): void {
    if (editingModifiedLineNumber === null) return;
    const modifiedLineNumber = editingModifiedLineNumber;
    editingModifiedLineNumber = null;
    modifiedCode = replaceModifiedCodeLine(modifiedCode, modifiedLineNumber, editingLineText);
  }

  function cancelLineEdit(): void {
    editingModifiedLineNumber = null;
  }

  function handleLineEditKeydown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      event.preventDefault();
      commitLineEdit();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      cancelLineEdit();
    }
  }
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
              isEditableDifferenceRow(differenceRow) ? "fluid-code-editor-row-editable" : "",
              getDifferenceRowBackground(differenceRow.kind, differenceThemeMapping),
            ].join(" ")}
            onclick={(clickEvent) => startLineEdit(differenceRow, clickEvent)}
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
              {#if isLineBeingEdited(differenceRow)}
                <InputField
                  id={`fluid-code-editor-input-${index}-${id}`}
                  class="fluid-code-editor-input"
                  aria-label={`Edit modified line ${editingModifiedLineNumber}`}
                  spellcheck="false"
                  bind:domReference={editingInputElement}
                  bind:value={editingLineText}
                  onblur={commitLineEdit}
                  onkeydown={handleLineEditKeydown}
                />
              {:else}
                <Text
                  id={`fluid-code-editor-text-${index}-${id}`}
                  type="pre"
                  class={["fluid-code-editor-text", isEditableDifferenceRow(differenceRow) ? "fluid-code-editor-editable" : ""].join(" ")}
                  tabindex={isEditableDifferenceRow(differenceRow) ? 0 : undefined}
                  onkeydown={(event) => {
                    if (event.key === "Enter") startLineEdit(differenceRow);
                  }}
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
                <Container
                  id={`fluid-code-editor-actions-${index}-${id}`}
                  class="fluid-code-editor-actions"
                  onclick={(event) => event.stopPropagation()}
                >
                  <Button
                    id={`fluid-code-editor-accept-${index}-${id}`}
                    aria-label="Accept change"
                    class="fluid-code-editor-action fluid-code-editor-accept"
                    onclick={() => {
                      ({ sourceCode, modifiedCode } = applyDifferenceLineDecision(sourceCode, modifiedCode, differenceRow, "accepted"));
                    }}
                  >
                    ✓
                  </Button>
                  <Button
                    id={`fluid-code-editor-reject-${index}-${id}`}
                    aria-label="Reject change"
                    class="fluid-code-editor-action fluid-code-editor-reject"
                    onclick={() => {
                      ({ sourceCode, modifiedCode } = applyDifferenceLineDecision(sourceCode, modifiedCode, differenceRow, "rejected"));
                    }}
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
