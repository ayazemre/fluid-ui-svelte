import type { ParserConfiguration, ParserRule, ParserToken, TokenThemeMapping } from "#src/lib/utilities/parsers.ts";

export type {
  DiffThemeMapping,
  ParserConfiguration,
  ParserRule,
  ParserStateDefinition,
  ParserToken,
  TokenThemeMapping,
} from "#src/lib/utilities/parsers.ts";

function getTailwindClassesForTokenType(tokenType: string, tokenThemeMapping: TokenThemeMapping): string {
  return tokenThemeMapping[tokenType] ?? "";
}

function findMatchingRuleAtPosition(
  candidateRules: Array<ParserRule>,
  remainingText: string,
): {
  matchedRule: ParserRule;
  matchedText: string;
} | null {
  for (const candidateRule of candidateRules) {
    const matchResult = remainingText.match(candidateRule.pattern);
    if (matchResult && matchResult.index === 0 && matchResult[0].length > 0) {
      return { matchedRule: candidateRule, matchedText: matchResult[0] };
    }
  }
  return null;
}

function applyMatchedRuleToStateStack(stateStack: Array<string>, matchedRule: ParserRule): void {
  if (matchedRule.popState) {
    if (stateStack.length > 1) {
      stateStack.pop();
    }
    return;
  }

  if (matchedRule.pushState) {
    stateStack.push(matchedRule.pushState);
    return;
  }

  if (matchedRule.nextState) {
    stateStack[stateStack.length - 1] = matchedRule.nextState;
  }
}

export function parseCodeWithConfiguration(codeText: string, parserConfiguration: ParserConfiguration): Array<ParserToken> {
  if (!codeText) {
    return [];
  }

  if (!parserConfiguration || !parserConfiguration.states[parserConfiguration.initialState]) {
    return [{ type: "plain", value: codeText }];
  }

  const parsedTokens: Array<ParserToken> = [];
  const stateStack: Array<string> = [parserConfiguration.initialState];
  let currentPosition = 0;

  while (currentPosition < codeText.length) {
    const currentStateName = stateStack[stateStack.length - 1];
    const currentStateDefinition = parserConfiguration.states[currentStateName];

    if (!currentStateDefinition) {
      parsedTokens.push({ type: "plain", value: codeText[currentPosition] ?? "" });
      currentPosition += 1;
      continue;
    }

    const remainingText = codeText.slice(currentPosition);
    const ruleMatch = findMatchingRuleAtPosition(currentStateDefinition.rules, remainingText);

    if (!ruleMatch) {
      parsedTokens.push({ type: "plain", value: remainingText[0] ?? "" });
      currentPosition += 1;
      continue;
    }

    parsedTokens.push({ type: ruleMatch.matchedRule.token, value: ruleMatch.matchedText });
    currentPosition += ruleMatch.matchedText.length;
    applyMatchedRuleToStateStack(stateStack, ruleMatch.matchedRule);
  }

  return parsedTokens;
}

function renderTokenTextPartToHtml(tokenType: string, escapedTextPart: string, tokenThemeMapping: TokenThemeMapping): string {
  if (tokenType === "plain") {
    return escapedTextPart;
  }
  return '<span class="' + getTailwindClassesForTokenType(tokenType, tokenThemeMapping) + '">' + escapedTextPart + "</span>";
}

export function renderTokensToHtml(parserTokens: Array<ParserToken>, tokenThemeMapping: TokenThemeMapping): string {
  let htmlResult = "";

  for (const tokenEntry of parserTokens) {
    const escapedValue = escapeHtmlValue(tokenEntry.value);
    htmlResult += renderTokenTextPartToHtml(tokenEntry.type, escapedValue, tokenThemeMapping);
  }

  return htmlResult;
}

export function parseAndRenderCodeWithConfiguration(
  codeText: string,
  parserConfiguration: ParserConfiguration,
  tokenThemeMapping: TokenThemeMapping,
): string {
  const parsedTokens = parseCodeWithConfiguration(codeText, parserConfiguration);
  return renderTokensToHtml(parsedTokens, tokenThemeMapping);
}

export type DiffLineKind = "added" | "removed" | "unchanged";

export type DiffLine = {
  kind: DiffLineKind;
  modifiedLineNumber?: number;
  sourceLineNumber?: number;
  text: string;
};

export type DiffGapMarker = {
  kind: "gap";
  skippedLineCount: number;
};

export type CondensedDiffRow = DiffLine | DiffGapMarker;

export function splitCodeTextIntoLines(codeText: string): Array<string> {
  if (!codeText) {
    return [];
  }
  return codeText.split("\n");
}

function buildAddedOnlyDiffLines(modifiedLines: Array<string>): Array<DiffLine> {
  return modifiedLines.map((modifiedLine, modifiedIndex) => ({
    kind: "added" as DiffLineKind,
    modifiedLineNumber: modifiedIndex + 1,
    text: modifiedLine,
  }));
}

function buildRemovedOnlyDiffLines(sourceLines: Array<string>): Array<DiffLine> {
  return sourceLines.map((sourceLine, sourceIndex) => ({
    kind: "removed" as DiffLineKind,
    sourceLineNumber: sourceIndex + 1,
    text: sourceLine,
  }));
}

function computeSubsequenceCellValue(
  lengthTable: Array<Array<number>>,
  sourceLines: Array<string>,
  modifiedLines: Array<string>,
  sourceIndex: number,
  modifiedIndex: number,
): number {
  if (sourceLines[sourceIndex] === modifiedLines[modifiedIndex]) {
    const diagonalValue = lengthTable[sourceIndex + 1]?.[modifiedIndex + 1] ?? 0;
    return diagonalValue + 1;
  }

  const downValue = lengthTable[sourceIndex + 1]?.[modifiedIndex] ?? 0;
  const rightValue = lengthTable[sourceIndex]?.[modifiedIndex + 1] ?? 0;
  return downValue > rightValue ? downValue : rightValue;
}

function buildSubsequenceLengthTable(sourceLines: Array<string>, modifiedLines: Array<string>): Array<Array<number>> {
  const sourceLineCount = sourceLines.length;
  const modifiedLineCount = modifiedLines.length;
  const lengthTable: Array<Array<number>> = [];

  for (let sourceIndex = 0; sourceIndex <= sourceLineCount; sourceIndex++) {
    lengthTable.push(Array.from({ length: modifiedLineCount + 1 }, () => 0));
  }

  for (let sourceIndex = sourceLineCount - 1; sourceIndex >= 0; sourceIndex--) {
    const currentRow = lengthTable[sourceIndex];
    if (!currentRow) {
      continue;
    }
    for (let modifiedIndex = modifiedLineCount - 1; modifiedIndex >= 0; modifiedIndex--) {
      currentRow[modifiedIndex] = computeSubsequenceCellValue(lengthTable, sourceLines, modifiedLines, sourceIndex, modifiedIndex);
    }
  }

  return lengthTable;
}

function appendUnchangedDiffLine(diffLines: Array<DiffLine>, sourceLines: Array<string>, sourcePointer: number, modifiedPointer: number): void {
  diffLines.push({
    kind: "unchanged",
    modifiedLineNumber: modifiedPointer + 1,
    sourceLineNumber: sourcePointer + 1,
    text: sourceLines[sourcePointer] ?? "",
  });
}

function shouldTakeAddedLineBeforeRemoved(lengthTable: Array<Array<number>>, sourcePointer: number, modifiedPointer: number): boolean {
  const downValue = lengthTable[sourcePointer + 1]?.[modifiedPointer] ?? 0;
  const rightValue = lengthTable[sourcePointer]?.[modifiedPointer + 1] ?? 0;
  return rightValue >= downValue;
}

function appendRemainingSourceLinesAsRemoved(diffLines: Array<DiffLine>, sourceLines: Array<string>, sourcePointer: number): void {
  for (let remainingIndex = sourcePointer; remainingIndex < sourceLines.length; remainingIndex++) {
    diffLines.push({ kind: "removed", sourceLineNumber: remainingIndex + 1, text: sourceLines[remainingIndex] ?? "" });
  }
}

function appendRemainingModifiedLinesAsAdded(diffLines: Array<DiffLine>, modifiedLines: Array<string>, modifiedPointer: number): void {
  for (let remainingIndex = modifiedPointer; remainingIndex < modifiedLines.length; remainingIndex++) {
    diffLines.push({ kind: "added", modifiedLineNumber: remainingIndex + 1, text: modifiedLines[remainingIndex] ?? "" });
  }
}

function walkDiffLinesFromTable(sourceLines: Array<string>, modifiedLines: Array<string>, lengthTable: Array<Array<number>>): Array<DiffLine> {
  const diffLines: Array<DiffLine> = [];
  let sourcePointer = 0;
  let modifiedPointer = 0;

  while (sourcePointer < sourceLines.length && modifiedPointer < modifiedLines.length) {
    const sourceLine = sourceLines[sourcePointer] ?? "";
    const modifiedLine = modifiedLines[modifiedPointer] ?? "";

    if (sourceLine === modifiedLine) {
      appendUnchangedDiffLine(diffLines, sourceLines, sourcePointer, modifiedPointer);
      sourcePointer += 1;
      modifiedPointer += 1;
      continue;
    }

    if (shouldTakeAddedLineBeforeRemoved(lengthTable, sourcePointer, modifiedPointer)) {
      diffLines.push({ kind: "added", modifiedLineNumber: modifiedPointer + 1, text: modifiedLine });
      modifiedPointer += 1;
    } else {
      diffLines.push({ kind: "removed", sourceLineNumber: sourcePointer + 1, text: sourceLine });
      sourcePointer += 1;
    }
  }

  appendRemainingSourceLinesAsRemoved(diffLines, sourceLines, sourcePointer);
  appendRemainingModifiedLinesAsAdded(diffLines, modifiedLines, modifiedPointer);

  return diffLines;
}

export function computeLineDiff(sourceCodeText: string, modifiedCodeText: string): Array<DiffLine> {
  const sourceLines = splitCodeTextIntoLines(sourceCodeText);
  const modifiedLines = splitCodeTextIntoLines(modifiedCodeText);

  if (sourceLines.length === 0 && modifiedLines.length === 0) {
    return [];
  }

  if (sourceLines.length === 0) {
    return buildAddedOnlyDiffLines(modifiedLines);
  }

  if (modifiedLines.length === 0) {
    return buildRemovedOnlyDiffLines(sourceLines);
  }

  const lengthTable = buildSubsequenceLengthTable(sourceLines, modifiedLines);
  const diffLines = walkDiffLinesFromTable(sourceLines, modifiedLines, lengthTable);

  return orderDiffBlocksOriginalFirst(diffLines);
}

function appendOrderedChangeBlock(
  orderedDiffLines: Array<DiffLine>,
  unorderedDiffLines: Array<DiffLine>,
  blockStartIndex: number,
  blockEndIndex: number,
): void {
  for (let blockIndex = blockStartIndex; blockIndex < blockEndIndex; blockIndex++) {
    const blockLine = unorderedDiffLines[blockIndex];
    if (blockLine && blockLine.kind === "removed") {
      orderedDiffLines.push(blockLine);
    }
  }
  for (let blockIndex = blockStartIndex; blockIndex < blockEndIndex; blockIndex++) {
    const blockLine = unorderedDiffLines[blockIndex];
    if (blockLine && blockLine.kind === "added") {
      orderedDiffLines.push(blockLine);
    }
  }
}

function orderDiffBlocksOriginalFirst(unorderedDiffLines: Array<DiffLine>): Array<DiffLine> {
  const orderedDiffLines: Array<DiffLine> = [];
  let blockStartIndex = -1;

  for (let lineIndex = 0; lineIndex <= unorderedDiffLines.length; lineIndex++) {
    const currentLine = unorderedDiffLines[lineIndex];
    const isChangeLine = currentLine !== undefined && currentLine.kind !== "unchanged";

    if (isChangeLine) {
      if (blockStartIndex === -1) {
        blockStartIndex = lineIndex;
      }
      continue;
    }

    if (blockStartIndex !== -1) {
      appendOrderedChangeBlock(orderedDiffLines, unorderedDiffLines, blockStartIndex, lineIndex);
      blockStartIndex = -1;
    }

    if (currentLine) {
      orderedDiffLines.push(currentLine);
    }
  }

  return orderedDiffLines;
}

function collectCondensedIncludedIndexes(fullDiffLines: Array<DiffLine>, safeContextLineCount: number): Set<number> {
  const includedIndexes = new Set<number>();

  for (let lineIndex = 0; lineIndex < fullDiffLines.length; lineIndex++) {
    const currentLine = fullDiffLines[lineIndex];
    if (currentLine && currentLine.kind !== "unchanged") {
      const windowStart = lineIndex - safeContextLineCount < 0 ? 0 : lineIndex - safeContextLineCount;
      const windowEnd = lineIndex + safeContextLineCount > fullDiffLines.length - 1 ? fullDiffLines.length - 1 : lineIndex + safeContextLineCount;
      for (let windowIndex = windowStart; windowIndex <= windowEnd; windowIndex++) {
        includedIndexes.add(windowIndex);
      }
    }
  }

  return includedIndexes;
}

function assembleCondensedRowsFromIndexes(fullDiffLines: Array<DiffLine>, includedIndexes: Set<number>): Array<CondensedDiffRow> {
  const condensedRows: Array<CondensedDiffRow> = [];
  let skippedUnchangedCount = 0;

  for (let lineIndex = 0; lineIndex < fullDiffLines.length; lineIndex++) {
    if (includedIndexes.has(lineIndex)) {
      if (skippedUnchangedCount > 0) {
        condensedRows.push({ kind: "gap", skippedLineCount: skippedUnchangedCount });
        skippedUnchangedCount = 0;
      }
      const includedLine = fullDiffLines[lineIndex];
      if (includedLine) {
        condensedRows.push(includedLine);
      }
    } else {
      skippedUnchangedCount += 1;
    }
  }

  if (skippedUnchangedCount > 0) {
    condensedRows.push({ kind: "gap", skippedLineCount: skippedUnchangedCount });
  }

  return condensedRows;
}

export function buildCondensedDiffRows(fullDiffLines: Array<DiffLine>, contextLineCount: number): Array<CondensedDiffRow> {
  if (fullDiffLines.length === 0) {
    return [];
  }

  const safeContextLineCount = contextLineCount < 0 ? 0 : contextLineCount;
  const hasAnyChange = fullDiffLines.some((diffLine) => diffLine.kind !== "unchanged");
  if (!hasAnyChange) {
    return [];
  }

  const includedIndexes = collectCondensedIncludedIndexes(fullDiffLines, safeContextLineCount);
  return assembleCondensedRowsFromIndexes(fullDiffLines, includedIndexes);
}

export type DiffLineDecision = "accepted" | "rejected";

export type DiffLineActionPayload = {
  diffRow: DiffLine;
  rowIndex: number;
};

export type DiffDecisionResult = {
  modifiedCode: string;
  sourceCode: string;
};

function findDiffRowIndex(fullDiffLines: Array<DiffLine>, targetDiffRow: DiffLine): number {
  for (let lineIndex = 0; lineIndex < fullDiffLines.length; lineIndex++) {
    const candidateLine = fullDiffLines[lineIndex];
    if (!candidateLine) {
      continue;
    }
    if (
      candidateLine.kind === targetDiffRow.kind &&
      candidateLine.sourceLineNumber === targetDiffRow.sourceLineNumber &&
      candidateLine.modifiedLineNumber === targetDiffRow.modifiedLineNumber &&
      candidateLine.text === targetDiffRow.text
    ) {
      return lineIndex;
    }
  }
  return -1;
}

function findChangeBlockBounds(
  fullDiffLines: Array<DiffLine>,
  targetIndex: number,
): {
  blockEndIndex: number;
  blockStartIndex: number;
} {
  let blockStartIndex = targetIndex;
  while (blockStartIndex - 1 >= 0) {
    const precedingLine = fullDiffLines[blockStartIndex - 1];
    if (!precedingLine || precedingLine.kind === "unchanged") {
      break;
    }
    blockStartIndex -= 1;
  }

  let blockEndIndex = targetIndex;
  while (blockEndIndex + 1 < fullDiffLines.length) {
    const followingLine = fullDiffLines[blockEndIndex + 1];
    if (!followingLine || followingLine.kind === "unchanged") {
      break;
    }
    blockEndIndex += 1;
  }

  return { blockEndIndex, blockStartIndex };
}

function collectBlockLinesInBounds(fullDiffLines: Array<DiffLine>, blockStartIndex: number, blockEndIndex: number): Array<DiffLine> {
  const blockLines: Array<DiffLine> = [];
  for (let lineIndex = blockStartIndex; lineIndex <= blockEndIndex; lineIndex++) {
    const blockLine = fullDiffLines[lineIndex];
    if (blockLine) {
      blockLines.push(blockLine);
    }
  }
  return blockLines;
}

function findAnchorLineNumberBeforeBlock(
  fullDiffLines: Array<DiffLine>,
  blockStartIndex: number,
  selectLineNumber: (diffLine: DiffLine) => number | undefined,
): number {
  let anchorLineNumber = 0;
  for (let lineIndex = 0; lineIndex < blockStartIndex; lineIndex++) {
    const precedingLine = fullDiffLines[lineIndex];
    if (!precedingLine) {
      continue;
    }
    const precedingNumber = selectLineNumber(precedingLine);
    if (precedingNumber !== undefined) {
      anchorLineNumber = precedingNumber;
    }
  }
  return anchorLineNumber;
}

function removeLinesAtDescendingIndexes(codeLines: Array<string>, descendingIndexes: Array<number>): Array<string> | null {
  let nextLines = codeLines.slice();
  for (const removeAt of descendingIndexes) {
    if (removeAt < 0 || removeAt >= nextLines.length) {
      return null;
    }
    nextLines = nextLines.slice(0, removeAt).concat(nextLines.slice(removeAt + 1));
  }
  return nextLines;
}

function sortLineNumbersDescending(lineNumbers: Array<number>): Array<number> {
  return lineNumbers.slice().sort((firstNumber, secondNumber) => secondNumber - firstNumber);
}

function applyAcceptedChangeBlock(
  sourceLines: Array<string>,
  modifiedCodeText: string,
  fullDiffLines: Array<DiffLine>,
  blockStartIndex: number,
  removedBlockLines: Array<DiffLine>,
  addedBlockLines: Array<DiffLine>,
): DiffDecisionResult | null {
  const sourceInsertAt = findAnchorLineNumberBeforeBlock(fullDiffLines, blockStartIndex, (diffLine) => diffLine.sourceLineNumber);
  const removedIndexes = sortLineNumbersDescending(
    removedBlockLines.map((removedLine) => (removedLine.sourceLineNumber === undefined ? -1 : removedLine.sourceLineNumber - 1)),
  );

  const keptSourceLines = removeLinesAtDescendingIndexes(sourceLines, removedIndexes);
  if (!keptSourceLines) {
    return null;
  }

  if (sourceInsertAt < 0 || sourceInsertAt > keptSourceLines.length) {
    return null;
  }

  const addedTexts = addedBlockLines.map((addedLine) => addedLine.text);
  const nextSourceLines = keptSourceLines.slice(0, sourceInsertAt).concat(addedTexts, keptSourceLines.slice(sourceInsertAt));
  return { modifiedCode: modifiedCodeText, sourceCode: nextSourceLines.join("\n") };
}

function applyRejectedChangeBlock(
  modifiedLines: Array<string>,
  sourceCodeText: string,
  fullDiffLines: Array<DiffLine>,
  blockStartIndex: number,
  removedBlockLines: Array<DiffLine>,
  addedBlockLines: Array<DiffLine>,
): DiffDecisionResult | null {
  const modifiedInsertAt = findAnchorLineNumberBeforeBlock(fullDiffLines, blockStartIndex, (diffLine) => diffLine.modifiedLineNumber);
  const addedIndexes = sortLineNumbersDescending(
    addedBlockLines.map((addedLine) => (addedLine.modifiedLineNumber === undefined ? -1 : addedLine.modifiedLineNumber - 1)),
  );

  const keptModifiedLines = removeLinesAtDescendingIndexes(modifiedLines, addedIndexes);
  if (!keptModifiedLines) {
    return null;
  }

  if (modifiedInsertAt < 0 || modifiedInsertAt > keptModifiedLines.length) {
    return null;
  }

  const removedTexts = removedBlockLines.map((removedLine) => removedLine.text);
  const nextModifiedLines = keptModifiedLines.slice(0, modifiedInsertAt).concat(removedTexts, keptModifiedLines.slice(modifiedInsertAt));
  return { modifiedCode: nextModifiedLines.join("\n"), sourceCode: sourceCodeText };
}

export function applyDiffLineDecision(
  sourceCodeText: string,
  modifiedCodeText: string,
  targetDiffRow: DiffLine,
  decision: DiffLineDecision,
): DiffDecisionResult {
  const fallbackResult = { modifiedCode: modifiedCodeText, sourceCode: sourceCodeText };

  if (targetDiffRow.kind !== "added" && targetDiffRow.kind !== "removed") {
    return fallbackResult;
  }

  if (decision !== "accepted" && decision !== "rejected") {
    return fallbackResult;
  }

  const fullDiffLines = computeLineDiff(sourceCodeText, modifiedCodeText);
  const targetIndex = findDiffRowIndex(fullDiffLines, targetDiffRow);
  if (targetIndex === -1) {
    return fallbackResult;
  }

  const { blockEndIndex, blockStartIndex } = findChangeBlockBounds(fullDiffLines, targetIndex);
  const blockLines = collectBlockLinesInBounds(fullDiffLines, blockStartIndex, blockEndIndex);
  const removedBlockLines = blockLines.filter((blockLine) => blockLine.kind === "removed");
  const addedBlockLines = blockLines.filter((blockLine) => blockLine.kind === "added");

  const sourceLines = splitCodeTextIntoLines(sourceCodeText);
  const modifiedLines = splitCodeTextIntoLines(modifiedCodeText);

  if (decision === "accepted") {
    return (
      applyAcceptedChangeBlock(sourceLines, modifiedCodeText, fullDiffLines, blockStartIndex, removedBlockLines, addedBlockLines) ?? fallbackResult
    );
  }

  return (
    applyRejectedChangeBlock(modifiedLines, sourceCodeText, fullDiffLines, blockStartIndex, removedBlockLines, addedBlockLines) ?? fallbackResult
  );
}

export function parseAndRenderCodeWithConfigurationToLines(
  codeText: string,
  parserConfiguration: ParserConfiguration,
  tokenThemeMapping: TokenThemeMapping,
): Array<string> {
  const parsedTokens = parseCodeWithConfiguration(codeText, parserConfiguration);
  const renderedLines: Array<string> = [];
  let currentLineHtml = "";

  for (const tokenEntry of parsedTokens) {
    const tokenParts = tokenEntry.value.split("\n");
    for (let partIndex = 0; partIndex < tokenParts.length; partIndex++) {
      const textPart = tokenParts[partIndex] ?? "";
      const escapedPart = escapeHtmlValue(textPart);
      const partHtml = renderTokenTextPartToHtml(tokenEntry.type, escapedPart, tokenThemeMapping);

      if (partIndex === 0) {
        currentLineHtml += partHtml;
      } else {
        renderedLines.push(currentLineHtml);
        currentLineHtml = partHtml;
      }
    }
  }

  renderedLines.push(currentLineHtml);
  return renderedLines;
}

function escapeHtmlValue(rawValue: string): string {
  return rawValue.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
