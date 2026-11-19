<script lang="ts">
  import type { DiffThemeMapping, ParserConfiguration, TokenThemeMapping } from "../utilities/parsers.ts";
  import type { CondensedDiffRow, DiffLine, DiffLineActionPayload } from "./codeBlock.ts";

  import { Button, Container, Text } from "../base/index.ts";
  import { defaultCodeBlockDiffTheme, defaultCodeBlockTokenTheme, svelteParserConfiguration } from "../utilities/parsers.ts";
  import {
    buildCondensedDiffRows,
    computeLineDiff,
    parseAndRenderCodeWithConfiguration,
    parseAndRenderCodeWithConfigurationToLines,
  } from "./codeBlock.ts";

  const {
    id,
    variant = "",
    sourceCode,
    modifiedCode,
    language = "",
    showLineNumbers = true,
    parserConfiguration,
    tokenThemeMapping,
    diffThemeMapping,
    diffContextLineCount = 2,
    condensedDiff = true,
    showDiffLineActions = false,
    onAcceptDiffLine,
    onRejectDiffLine,
  }: {
    id: string;
    variant?: string;
    sourceCode: string;
    modifiedCode?: string;
    language?: string;
    showLineNumbers?: boolean;
    parserConfiguration?: ParserConfiguration;
    tokenThemeMapping?: TokenThemeMapping;
    diffThemeMapping?: DiffThemeMapping;
    diffContextLineCount?: number;
    condensedDiff?: boolean;
    showDiffLineActions?: boolean;
    onAcceptDiffLine?: (payload: DiffLineActionPayload) => void;
    onRejectDiffLine?: (payload: DiffLineActionPayload) => void;
  } = $props();

  const isDiffView = $derived(modifiedCode !== undefined);

  const effectiveParserConfiguration = $derived.by(() => {
    if (parserConfiguration) {
      return parserConfiguration;
    }
    if (language === "svelte" || language === "html") {
      return svelteParserConfiguration;
    }
    return null;
  });

  const effectiveTokenThemeMapping = $derived.by(() => {
    if (tokenThemeMapping) {
      return tokenThemeMapping;
    }
    if (effectiveParserConfiguration && effectiveParserConfiguration.theme) {
      return effectiveParserConfiguration.theme;
    }
    return defaultCodeBlockTokenTheme;
  });

  const effectiveDiffThemeMapping = $derived.by(() => {
    if (diffThemeMapping) {
      return diffThemeMapping;
    }
    return defaultCodeBlockDiffTheme;
  });

  const highlightedLines = $derived.by(() => {
    if (effectiveParserConfiguration) {
      return parseAndRenderCodeWithConfigurationToLines(sourceCode, effectiveParserConfiguration, effectiveTokenThemeMapping);
    }
    return sourceCode.split("\n").map((line) => escapePlainCodeToHtml(line));
  });

  const condensedDiffRows = $derived.by((): Array<CondensedDiffRow> => {
    if (modifiedCode === undefined) {
      return [];
    }
    const fullDiffLines = computeLineDiff(sourceCode, modifiedCode);
    if (!condensedDiff) {
      return fullDiffLines;
    }
    return buildCondensedDiffRows(fullDiffLines, diffContextLineCount);
  });

  function escapePlainCodeToHtml(plainCode: string): string {
    return plainCode.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function getDisplayLineNumber(zeroBasedIndex: number): number {
    return zeroBasedIndex + 1;
  }

  function getCodeRegionLabel(activeLanguage: string, diffActive: boolean): string {
    const baseLabel = activeLanguage ? "Code snippet: " + activeLanguage : "Code snippet";
    if (diffActive) {
      return baseLabel + " (diff)";
    }
    return baseLabel;
  }

  function getDiffRowHtml(rowText: string): string {
    if (effectiveParserConfiguration) {
      return parseAndRenderCodeWithConfiguration(rowText, effectiveParserConfiguration, effectiveTokenThemeMapping);
    }
    return escapePlainCodeToHtml(rowText);
  }

  function getDiffRowBackground(diffKind: string): string {
    if (diffKind === "added") {
      return effectiveDiffThemeMapping.addedRow;
    }
    if (diffKind === "removed") {
      return effectiveDiffThemeMapping.removedRow;
    }
    return "";
  }

  function getDiffMarker(diffKind: string): string {
    if (diffKind === "added") {
      return "+";
    }
    if (diffKind === "removed") {
      return "-";
    }
    return " ";
  }

  function getDiffMarkerClass(diffKind: string): string {
    if (diffKind === "added") {
      return effectiveDiffThemeMapping.addedGutter;
    }
    if (diffKind === "removed") {
      return effectiveDiffThemeMapping.removedGutter;
    }
    return "";
  }

  function isChangeBlockActionRow(displayedRows: Array<CondensedDiffRow>, rowIndex: number): boolean {
    if (!showDiffLineActions) {
      return false;
    }
    const currentRow = displayedRows[rowIndex];
    if (!currentRow || (currentRow.kind !== "added" && currentRow.kind !== "removed")) {
      return false;
    }

    let blockStartIndex = rowIndex;
    while (blockStartIndex - 1 >= 0) {
      const precedingRow = displayedRows[blockStartIndex - 1];
      if (!precedingRow || (precedingRow.kind !== "added" && precedingRow.kind !== "removed")) {
        break;
      }
      blockStartIndex -= 1;
    }

    for (let blockIndex = blockStartIndex; blockIndex < displayedRows.length; blockIndex++) {
      const blockRow = displayedRows[blockIndex];
      if (!blockRow || (blockRow.kind !== "added" && blockRow.kind !== "removed")) {
        break;
      }
      if (blockRow.kind === "added") {
        return blockIndex === rowIndex;
      }
    }

    return rowIndex === blockStartIndex;
  }

  async function handleAcceptDiffRow(diffRow: DiffLine, rowIndex: number): Promise<void> {
    if (onAcceptDiffLine) {
      onAcceptDiffLine({ diffRow, rowIndex });
    }
  }

  async function handleRejectDiffRow(diffRow: DiffLine, rowIndex: number): Promise<void> {
    if (onRejectDiffLine) {
      onRejectDiffLine({ diffRow, rowIndex });
    }
  }

  function getDiffLineNumberText(diffKind: string, sourceLineNumber?: number): string {
    if (diffKind === "added") {
      return "";
    }
    if (sourceLineNumber === undefined) {
      return "";
    }
    return String(sourceLineNumber);
  }
</script>

<Container
  id={`fluid-code-block-${id}`}
  role="region"
  aria-label={getCodeRegionLabel(language, isDiffView)}
  class={["fluid-code-block", variant].join(" ")}
>
  {#if isDiffView}
    {#if condensedDiffRows.length === 0}
      <Container id={`fluid-code-block-row-empty-${id}`} class="fluid-code-block-row">
        <Container id={`fluid-code-block-content-empty-${id}`} class="fluid-code-block-content">
          <Text id={`fluid-code-block-text-empty-${id}`} type="pre">No changes</Text>
        </Container>
      </Container>
    {:else}
      {#each condensedDiffRows as diffRow, index}
        {#if diffRow.kind === "gap"}
          <Container id={`fluid-code-block-row-gap-${index}-${id}`} class="fluid-code-block-row">
            {#if showLineNumbers}
              <Container id={`fluid-code-block-index-gap-${index}-${id}`} aria-hidden="true" class="fluid-code-block-index">
                <Text id={`fluid-code-block-number-gap-${index}-${id}`} class="fluid-code-block-number">…</Text>
              </Container>
            {/if}
            <Container id={`fluid-code-block-content-gap-${index}-${id}`} class="fluid-code-block-content">
              <Text id={`fluid-code-block-text-gap-${index}-${id}`} type="pre">
                <span id={`fluid-code-block-code-gap-${index}-${id}`} class={effectiveDiffThemeMapping.gapRow}>
                  {diffRow.skippedLineCount + " unchanged lines hidden"}
                </span>
              </Text>
            </Container>
          </Container>
        {:else}
          <Container id={`fluid-code-block-row-${index}-${id}`} class={["fluid-code-block-row", getDiffRowBackground(diffRow.kind)].join(" ")}>
            {#if showLineNumbers}
              <Container id={`fluid-code-block-index-${index}-${id}`} aria-hidden="true" class="fluid-code-block-index">
                <Text id={`fluid-code-block-number-${index}-${id}`} class={["fluid-code-block-number", getDiffMarkerClass(diffRow.kind)].join(" ")}>
                  {getDiffMarker(diffRow.kind) + " " + getDiffLineNumberText(diffRow.kind, diffRow.sourceLineNumber)}
                </Text>
              </Container>
            {/if}
            <Container id={`fluid-code-block-content-${index}-${id}`} class="fluid-code-block-content">
              <Text id={`fluid-code-block-text-${index}-${id}`} type="pre">
                <span id={`fluid-code-block-code-${index}-${id}`} class={"language-" + language}
                  >{@html getDiffRowHtml(diffRow.text) || "&nbsp;"}</span
                >
              </Text>
            </Container>
            {#if isChangeBlockActionRow(condensedDiffRows, index)}
              <Container id={`fluid-code-block-actions-${index}-${id}`} class="fluid-code-block-actions">
                <Button
                  id={`fluid-code-block-accept-${index}-${id}`}
                  aria-label="Accept change"
                  class="fluid-button-secondary fluid-code-block-accept"
                  onclick={async () => await handleAcceptDiffRow(diffRow, index)}
                >
                  ✓
                </Button>
                <Button
                  id={`fluid-code-block-reject-${index}-${id}`}
                  aria-label="Reject change"
                  class="fluid-button-outline fluid-code-block-reject"
                  onclick={async () => await handleRejectDiffRow(diffRow, index)}
                >
                  ✕
                </Button>
              </Container>
            {/if}
          </Container>
        {/if}
      {/each}
    {/if}
  {:else}
    {#each highlightedLines as lineHtml, index}
      <Container id={`fluid-code-block-row-${index}-${id}`} class="fluid-code-block-row">
        {#if showLineNumbers}
          <Container id={`fluid-code-block-index-${index}-${id}`} aria-hidden="true" class="fluid-code-block-index">
            <Text id={`fluid-code-block-number-${index}-${id}`} class="fluid-code-block-number">{getDisplayLineNumber(index)}</Text>
          </Container>
        {/if}
        <Container id={`fluid-code-block-content-${index}-${id}`} class="fluid-code-block-content">
          <Text id={`fluid-code-block-text-${index}-${id}`} type="pre">
            <span id={`fluid-code-block-code-${index}-${id}`} class={"language-" + language}>{@html lineHtml || "&nbsp;"}</span>
          </Text>
        </Container>
      </Container>
    {/each}
  {/if}
</Container>
