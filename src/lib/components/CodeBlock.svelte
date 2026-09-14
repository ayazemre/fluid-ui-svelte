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
  {id}
  role="region"
  aria-label={getCodeRegionLabel(language, isDiffView)}
  class={[variant, "fluid-code-block-container", "flex", "flex-col", "overflow-auto"].join(" ")}
>
  {#if isDiffView}
    {#if condensedDiffRows.length === 0}
      <Container id={id + "-no-changes"} class={[variant, "fluid-code-block-row", "flex", "items-start"].join(" ")}>
        <Container id={id + "-no-changes-content"} class={[variant, "fluid-code-block-content", "flex", "min-w-0", "flex-1", "flex-col"].join(" ")}>
          <Text id={id + "-no-changes-text"} type="pre">No changes</Text>
        </Container>
      </Container>
    {:else}
      {#each condensedDiffRows as diffRow, index}
        {#if diffRow.kind === "gap"}
          <Container id={id + "-gap-" + index} class={[variant, "fluid-code-block-row", "flex", "items-start"].join(" ")}>
            {#if showLineNumbers}
              <Container
                id={id + "-gap-index-container-" + index}
                aria-hidden="true"
                class={[variant, "fluid-code-block-index", "sticky", "left-0", "z-1", "min-w-10", "shrink-0", "px-2"].join(" ")}
              >
                <Text id={id + "-gap-index-" + index} class="select-none">…</Text>
              </Container>
            {/if}
            <Container
              id={id + "-gap-content-" + index}
              class={[variant, "fluid-code-block-content", "flex", "min-w-0", "flex-1", "flex-col"].join(" ")}
            >
              <Text id={id + "-gap-text-" + index} type="pre">
                <span id={id + "-gap-code-" + index} class={effectiveDiffThemeMapping.gapRow}>
                  {diffRow.skippedLineCount + " unchanged lines hidden"}
                </span>
              </Text>
            </Container>
          </Container>
        {:else}
          <Container
            id={id + "-row-" + index}
            class={[variant, "fluid-code-block-row", "flex", "items-start", getDiffRowBackground(diffRow.kind)].join(" ")}
          >
            {#if showLineNumbers}
              <Container
                id={id + "-index-container-" + index}
                aria-hidden="true"
                class={[variant, "fluid-code-block-index", "sticky", "left-0", "z-1", "min-w-10", "shrink-0", "px-2"].join(" ")}
              >
                <Text id={id + "-index-" + index} class={"select-none " + getDiffMarkerClass(diffRow.kind)}>
                  {getDiffMarker(diffRow.kind) + " " + getDiffLineNumberText(diffRow.kind, diffRow.sourceLineNumber)}
                </Text>
              </Container>
            {/if}
            <Container id={id + "-content-" + index} class={[variant, "fluid-code-block-content", "flex", "min-w-0", "flex-1", "flex-col"].join(" ")}>
              <Text id={id + "-pre-" + index} type="pre">
                <span id={id + "-code-" + index} class={"language-" + language}>{@html getDiffRowHtml(diffRow.text) || "&nbsp;"}</span>
              </Text>
            </Container>
            {#if isChangeBlockActionRow(condensedDiffRows, index)}
              <Container id={id + "-actions-" + index} class={[variant, "flex", "shrink-0", "items-center", "gap-1", "px-2"].join(" ")}>
                <Button
                  id={id + "-accept-" + index}
                  aria-label="Accept change"
                  class="fluid-button-secondary"
                  onclick={async () => await handleAcceptDiffRow(diffRow, index)}
                >
                  ✓
                </Button>
                <Button
                  id={id + "-reject-" + index}
                  aria-label="Reject change"
                  class="fluid-button-outline"
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
      <Container id={id + "-row-" + index} class={[variant, "fluid-code-block-row", "flex", "items-start"].join(" ")}>
        {#if showLineNumbers}
          <Container
            id={id + "-index-container-" + index}
            aria-hidden="true"
            class={[variant, "fluid-code-block-index", "sticky", "left-0", "z-1", "min-w-10", "shrink-0", "px-2"].join(" ")}
          >
            <Text id={id + "-index-" + index} class="select-none">{getDisplayLineNumber(index)}</Text>
          </Container>
        {/if}
        <Container id={id + "-content-" + index} class={[variant, "fluid-code-block-content", "flex", "min-w-0", "flex-1", "flex-col"].join(" ")}>
          <Text id={id + "-pre-" + index} type="pre">
            <span id={id + "-code-" + index} class={"language-" + language}>{@html lineHtml || "&nbsp;"}</span>
          </Text>
        </Container>
      </Container>
    {/each}
  {/if}
</Container>
