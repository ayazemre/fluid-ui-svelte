export type ParserToken = {
  type: string;
  value: string;
};

export type TokenizedLine<State> = {
  nextState: State;
  tokens: Array<ParserToken>;
};

export type LineTokenizer<State> = {
  initialState: State;
  tokenizeLine(lineText: string, previousState: State): TokenizedLine<State>;
};

export type TokenThemeMapping = Record<string, string>;

export type DifferenceThemeMapping = {
  addedGutter: string;
  addedRow: string;
  changedAddedText: string;
  changedRemovedText: string;
  gapRow: string;
  removedGutter: string;
  removedRow: string;
};

function getTailwindClassesForTokenType(tokenType: string, tokenThemeMapping: TokenThemeMapping): string {
  return tokenThemeMapping[tokenType] ?? "";
}

function doTokensRebuildLine(tokens: Array<ParserToken>, lineText: string): boolean {
  return tokens.map((token) => token.value).join("") === lineText;
}

export function tokenizeCodeLines(codeLines: Array<string>, tokenizer: LineTokenizer<unknown> | undefined): Array<Array<ParserToken>> {
  if (tokenizer === undefined) {
    return codeLines.map((codeLine) => [{ type: "plain", value: codeLine }]);
  }

  const tokenizedLines: Array<Array<ParserToken>> = [];
  let currentState: unknown = tokenizer.initialState;

  for (const codeLine of codeLines) {
    const tokenizedLine = tokenizer.tokenizeLine(codeLine, currentState);
    tokenizedLines.push(doTokensRebuildLine(tokenizedLine.tokens, codeLine) ? tokenizedLine.tokens : [{ type: "plain", value: codeLine }]);
    currentState = tokenizedLine.nextState;
  }

  return tokenizedLines;
}

function renderTokenTextPartToMarkup(tokenType: string, escapedTextPart: string, tokenThemeMapping: TokenThemeMapping): string {
  const tokenClasses = getTailwindClassesForTokenType(tokenType, tokenThemeMapping);
  if (tokenType === "plain" || tokenClasses === "") {
    return escapedTextPart;
  }
  return '<span class="' + tokenClasses + '">' + escapedTextPart + "</span>";
}

export function renderTokensToMarkup(parserTokens: Array<ParserToken>, tokenThemeMapping: TokenThemeMapping): string {
  let markupResult = "";

  for (const tokenEntry of parserTokens) {
    const escapedValue = escapeMarkupValue(tokenEntry.value);
    markupResult += renderTokenTextPartToMarkup(tokenEntry.type, escapedValue, tokenThemeMapping);
  }

  return markupResult;
}

export type DifferenceLineKind = "added" | "removed" | "unchanged";

export type ChangedTextRange = {
  end: number;
  start: number;
};

export type DifferenceLine = {
  changedRange?: ChangedTextRange;
  isPartialChange?: boolean;
  kind: DifferenceLineKind;
  modifiedLineNumber?: number;
  sourceLineNumber?: number;
  text: string;
};

export type DifferenceGapMarker = {
  kind: "gap";
  skippedLineCount: number;
};

export type CondensedDifferenceRow = DifferenceLine | DifferenceGapMarker;

export function splitCodeTextIntoLines(codeText: string): Array<string> {
  if (!codeText) {
    return [];
  }
  return codeText.split("\n");
}

function readFurthestXFromSnapshot(furthestXSnapshots: Array<Int32Array>, editDistance: number, diagonal: number): number {
  return furthestXSnapshots[editDistance]?.[diagonal + editDistance + 1] ?? 0;
}

function computeMyersDifferenceLines(sourceLines: Array<string>, modifiedLines: Array<string>): Array<DifferenceLine> {
  const sourceLineCount = sourceLines.length;
  const modifiedLineCount = modifiedLines.length;
  const maximumEditDistance = sourceLineCount + modifiedLineCount;
  const diagonalOffset = maximumEditDistance + 1;
  const furthestXByDiagonal = new Int32Array(2 * maximumEditDistance + 3);
  const furthestXSnapshots: Array<Int32Array> = [];

  for (let editDistance = 0; editDistance <= maximumEditDistance; editDistance++) {
    furthestXSnapshots.push(furthestXByDiagonal.slice(diagonalOffset - editDistance - 1, diagonalOffset + editDistance + 2));

    for (let diagonal = -editDistance; diagonal <= editDistance; diagonal += 2) {
      const isInsertionStep =
        diagonal === -editDistance ||
        (diagonal !== editDistance &&
          (furthestXByDiagonal[diagonalOffset + diagonal - 1] ?? 0) < (furthestXByDiagonal[diagonalOffset + diagonal + 1] ?? 0));

      let currentX = isInsertionStep
        ? (furthestXByDiagonal[diagonalOffset + diagonal + 1] ?? 0)
        : (furthestXByDiagonal[diagonalOffset + diagonal - 1] ?? 0) + 1;
      let currentY = currentX - diagonal;

      while (currentX < sourceLineCount && currentY < modifiedLineCount && sourceLines[currentX] === modifiedLines[currentY]) {
        currentX += 1;
        currentY += 1;
      }

      furthestXByDiagonal[diagonalOffset + diagonal] = currentX;

      if (currentX >= sourceLineCount && currentY >= modifiedLineCount) {
        return backtrackMyersPath(furthestXSnapshots, sourceLines, modifiedLines);
      }
    }
  }

  return [];
}

function backtrackMyersPath(furthestXSnapshots: Array<Int32Array>, sourceLines: Array<string>, modifiedLines: Array<string>): Array<DifferenceLine> {
  const reversedDifferenceLines: Array<DifferenceLine> = [];
  let currentX = sourceLines.length;
  let currentY = modifiedLines.length;

  for (let editDistance = furthestXSnapshots.length - 1; editDistance >= 0; editDistance--) {
    const currentDiagonal = currentX - currentY;
    const isInsertionStep =
      currentDiagonal === -editDistance ||
      (currentDiagonal !== editDistance &&
        readFurthestXFromSnapshot(furthestXSnapshots, editDistance, currentDiagonal - 1) <
          readFurthestXFromSnapshot(furthestXSnapshots, editDistance, currentDiagonal + 1));
    const previousDiagonal = isInsertionStep ? currentDiagonal + 1 : currentDiagonal - 1;
    const previousX = readFurthestXFromSnapshot(furthestXSnapshots, editDistance, previousDiagonal);
    const previousY = previousX - previousDiagonal;
    const afterEditX = isInsertionStep ? previousX : previousX + 1;
    const afterEditY = isInsertionStep ? previousY + 1 : previousY;

    while (currentX > afterEditX && currentY > afterEditY) {
      reversedDifferenceLines.push({
        kind: "unchanged",
        modifiedLineNumber: currentY,
        sourceLineNumber: currentX,
        text: sourceLines[currentX - 1] ?? "",
      });
      currentX -= 1;
      currentY -= 1;
    }

    if (editDistance > 0 && isInsertionStep) {
      reversedDifferenceLines.push({ kind: "added", modifiedLineNumber: previousY + 1, text: modifiedLines[previousY] ?? "" });
    }
    if (editDistance > 0 && !isInsertionStep) {
      reversedDifferenceLines.push({ kind: "removed", sourceLineNumber: previousX + 1, text: sourceLines[previousX] ?? "" });
    }

    currentX = previousX;
    currentY = previousY;
  }

  return reversedDifferenceLines.reverse();
}

export function computeLineDifference(sourceCodeText: string, modifiedCodeText: string): Array<DifferenceLine> {
  const sourceLines = splitCodeTextIntoLines(sourceCodeText);
  const modifiedLines = splitCodeTextIntoLines(modifiedCodeText);
  const unorderedDifferenceLines = computeMyersDifferenceLines(sourceLines, modifiedLines);

  return orderDifferenceBlocksOriginalFirst(unorderedDifferenceLines);
}

function appendOrderedChangeBlock(
  orderedDifferenceLines: Array<DifferenceLine>,
  unorderedDifferenceLines: Array<DifferenceLine>,
  blockStartIndex: number,
  blockEndIndex: number,
): void {
  for (let blockIndex = blockStartIndex; blockIndex < blockEndIndex; blockIndex++) {
    const blockLine = unorderedDifferenceLines[blockIndex];
    if (blockLine && blockLine.kind === "removed") {
      orderedDifferenceLines.push(blockLine);
    }
  }
  for (let blockIndex = blockStartIndex; blockIndex < blockEndIndex; blockIndex++) {
    const blockLine = unorderedDifferenceLines[blockIndex];
    if (blockLine && blockLine.kind === "added") {
      orderedDifferenceLines.push(blockLine);
    }
  }
}

function orderDifferenceBlocksOriginalFirst(unorderedDifferenceLines: Array<DifferenceLine>): Array<DifferenceLine> {
  const orderedDifferenceLines: Array<DifferenceLine> = [];
  let blockStartIndex = -1;

  for (let lineIndex = 0; lineIndex <= unorderedDifferenceLines.length; lineIndex++) {
    const currentLine = unorderedDifferenceLines[lineIndex];
    const isChangeLine = currentLine !== undefined && currentLine.kind !== "unchanged";

    if (isChangeLine) {
      if (blockStartIndex === -1) {
        blockStartIndex = lineIndex;
      }
      continue;
    }

    if (blockStartIndex !== -1) {
      appendOrderedChangeBlock(orderedDifferenceLines, unorderedDifferenceLines, blockStartIndex, lineIndex);
      blockStartIndex = -1;
    }

    if (currentLine) {
      orderedDifferenceLines.push(currentLine);
    }
  }

  return orderedDifferenceLines;
}

function collectCondensedIncludedIndexes(fullDifferenceLines: Array<DifferenceLine>, safeContextLineCount: number): Set<number> {
  const includedIndexes = new Set<number>();

  for (let lineIndex = 0; lineIndex < fullDifferenceLines.length; lineIndex++) {
    const currentLine = fullDifferenceLines[lineIndex];
    if (currentLine && currentLine.kind !== "unchanged") {
      const windowStart = lineIndex - safeContextLineCount < 0 ? 0 : lineIndex - safeContextLineCount;
      const windowEnd =
        lineIndex + safeContextLineCount > fullDifferenceLines.length - 1 ? fullDifferenceLines.length - 1 : lineIndex + safeContextLineCount;
      for (let windowIndex = windowStart; windowIndex <= windowEnd; windowIndex++) {
        includedIndexes.add(windowIndex);
      }
    }
  }

  return includedIndexes;
}

function assembleCondensedRowsFromIndexes(fullDifferenceLines: Array<DifferenceLine>, includedIndexes: Set<number>): Array<CondensedDifferenceRow> {
  const condensedRows: Array<CondensedDifferenceRow> = [];
  let skippedUnchangedCount = 0;

  for (let lineIndex = 0; lineIndex < fullDifferenceLines.length; lineIndex++) {
    if (includedIndexes.has(lineIndex)) {
      if (skippedUnchangedCount > 0) {
        condensedRows.push({ kind: "gap", skippedLineCount: skippedUnchangedCount });
        skippedUnchangedCount = 0;
      }
      const includedLine = fullDifferenceLines[lineIndex];
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

export function buildCondensedDifferenceRows(fullDifferenceLines: Array<DifferenceLine>, contextLineCount: number): Array<CondensedDifferenceRow> {
  if (fullDifferenceLines.length === 0) {
    return [];
  }

  const safeContextLineCount = contextLineCount < 0 ? 0 : contextLineCount;
  const hasAnyChange = fullDifferenceLines.some((differenceLine) => differenceLine.kind !== "unchanged");
  if (!hasAnyChange) {
    return [];
  }

  const includedIndexes = collectCondensedIncludedIndexes(fullDifferenceLines, safeContextLineCount);
  return assembleCondensedRowsFromIndexes(fullDifferenceLines, includedIndexes);
}

export type DifferenceLineDecision = "accepted" | "rejected";

export type DifferenceDecisionResult = {
  modifiedCode: string;
  sourceCode: string;
};

function findDifferenceRowIndex(fullDifferenceLines: Array<DifferenceLine>, targetDifferenceRow: DifferenceLine): number {
  for (let lineIndex = 0; lineIndex < fullDifferenceLines.length; lineIndex++) {
    const candidateLine = fullDifferenceLines[lineIndex];
    if (!candidateLine) {
      continue;
    }
    if (
      candidateLine.kind === targetDifferenceRow.kind &&
      candidateLine.sourceLineNumber === targetDifferenceRow.sourceLineNumber &&
      candidateLine.modifiedLineNumber === targetDifferenceRow.modifiedLineNumber &&
      candidateLine.text === targetDifferenceRow.text
    ) {
      return lineIndex;
    }
  }
  return -1;
}

function findChangeBlockBounds(
  fullDifferenceLines: Array<DifferenceLine>,
  targetIndex: number,
): {
  blockEndIndex: number;
  blockStartIndex: number;
} {
  let blockStartIndex = targetIndex;
  while (blockStartIndex - 1 >= 0) {
    const precedingLine = fullDifferenceLines[blockStartIndex - 1];
    if (!precedingLine || precedingLine.kind === "unchanged") {
      break;
    }
    blockStartIndex -= 1;
  }

  let blockEndIndex = targetIndex;
  while (blockEndIndex + 1 < fullDifferenceLines.length) {
    const followingLine = fullDifferenceLines[blockEndIndex + 1];
    if (!followingLine || followingLine.kind === "unchanged") {
      break;
    }
    blockEndIndex += 1;
  }

  return { blockEndIndex, blockStartIndex };
}

function collectBlockLinesInBounds(
  fullDifferenceLines: Array<DifferenceLine>,
  blockStartIndex: number,
  blockEndIndex: number,
): Array<DifferenceLine> {
  const blockLines: Array<DifferenceLine> = [];
  for (let lineIndex = blockStartIndex; lineIndex <= blockEndIndex; lineIndex++) {
    const blockLine = fullDifferenceLines[lineIndex];
    if (blockLine) {
      blockLines.push(blockLine);
    }
  }
  return blockLines;
}

function findAnchorLineNumberBeforeBlock(
  fullDifferenceLines: Array<DifferenceLine>,
  blockStartIndex: number,
  selectLineNumber: (differenceLine: DifferenceLine) => number | undefined,
): number {
  let anchorLineNumber = 0;
  for (let lineIndex = 0; lineIndex < blockStartIndex; lineIndex++) {
    const precedingLine = fullDifferenceLines[lineIndex];
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
  fullDifferenceLines: Array<DifferenceLine>,
  blockStartIndex: number,
  removedBlockLines: Array<DifferenceLine>,
  addedBlockLines: Array<DifferenceLine>,
): DifferenceDecisionResult | null {
  const sourceInsertAt = findAnchorLineNumberBeforeBlock(fullDifferenceLines, blockStartIndex, (differenceLine) => differenceLine.sourceLineNumber);
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
  fullDifferenceLines: Array<DifferenceLine>,
  blockStartIndex: number,
  removedBlockLines: Array<DifferenceLine>,
  addedBlockLines: Array<DifferenceLine>,
): DifferenceDecisionResult | null {
  const modifiedInsertAt = findAnchorLineNumberBeforeBlock(
    fullDifferenceLines,
    blockStartIndex,
    (differenceLine) => differenceLine.modifiedLineNumber,
  );
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

export function applyDifferenceLineDecision(
  sourceCodeText: string,
  modifiedCodeInput: string | undefined,
  targetDifferenceRow: DifferenceLine,
  decision: DifferenceLineDecision,
): DifferenceDecisionResult {
  const modifiedCodeText = modifiedCodeInput ?? "";
  const fallbackResult = { modifiedCode: modifiedCodeText, sourceCode: sourceCodeText };

  if (targetDifferenceRow.kind !== "added" && targetDifferenceRow.kind !== "removed") {
    return fallbackResult;
  }

  if (decision !== "accepted" && decision !== "rejected") {
    return fallbackResult;
  }

  const fullDifferenceLines = computeLineDifference(sourceCodeText, modifiedCodeText);
  const targetIndex = findDifferenceRowIndex(fullDifferenceLines, targetDifferenceRow);
  if (targetIndex === -1) {
    return fallbackResult;
  }

  const { blockEndIndex, blockStartIndex } = findChangeBlockBounds(fullDifferenceLines, targetIndex);
  const blockLines = collectBlockLinesInBounds(fullDifferenceLines, blockStartIndex, blockEndIndex);
  const removedBlockLines = blockLines.filter((blockLine) => blockLine.kind === "removed");
  const addedBlockLines = blockLines.filter((blockLine) => blockLine.kind === "added");

  const sourceLines = splitCodeTextIntoLines(sourceCodeText);
  const modifiedLines = splitCodeTextIntoLines(modifiedCodeText);

  if (decision === "accepted") {
    return (
      applyAcceptedChangeBlock(sourceLines, modifiedCodeText, fullDifferenceLines, blockStartIndex, removedBlockLines, addedBlockLines) ??
      fallbackResult
    );
  }

  return (
    applyRejectedChangeBlock(modifiedLines, sourceCodeText, fullDifferenceLines, blockStartIndex, removedBlockLines, addedBlockLines) ??
    fallbackResult
  );
}

export function buildHighlightedLines(tokenizedLines: Array<Array<ParserToken>>, tokenThemeMapping: TokenThemeMapping): Array<string> {
  return tokenizedLines.map((tokens) => renderTokensToMarkup(tokens, tokenThemeMapping));
}

export function buildViewDifferenceRows(
  sourceCode: string,
  modifiedCode: string | undefined,
  condensedDifference: boolean,
  differenceContextLineCount: number,
): Array<CondensedDifferenceRow> {
  if (modifiedCode === undefined) {
    return [];
  }
  const fullDifferenceLines = annotateChangedRanges(computeLineDifference(sourceCode, modifiedCode));
  if (!condensedDifference) {
    return fullDifferenceLines;
  }
  return buildCondensedDifferenceRows(fullDifferenceLines, differenceContextLineCount);
}

export function escapeMarkupValue(rawValue: string): string {
  return rawValue.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function getDisplayLineNumber(zeroBasedIndex: number): number {
  return zeroBasedIndex + 1;
}

export function getCodeRegionLabel(activeLanguage: string, differenceActive: boolean): string {
  const baseLabel = activeLanguage ? "Code snippet: " + activeLanguage : "Code snippet";
  if (differenceActive) {
    return baseLabel + " (difference)";
  }
  return baseLabel;
}

export function getDifferenceRowContentMarkup(
  differenceRow: DifferenceLine,
  tokenizedSourceLines: Array<Array<ParserToken>>,
  tokenizedModifiedLines: Array<Array<ParserToken>>,
  tokenThemeMapping: TokenThemeMapping,
  differenceThemeMapping: DifferenceThemeMapping,
): string {
  const rowTokens = getDifferenceRowTokens(differenceRow, tokenizedSourceLines, tokenizedModifiedLines);

  if (differenceRow.changedRange === undefined) {
    return renderTokensToMarkup(rowTokens, tokenThemeMapping);
  }

  return renderTokensWithChangedRange(
    rowTokens,
    differenceRow.changedRange,
    tokenThemeMapping,
    getChangedTextClass(differenceRow.kind, differenceThemeMapping),
  );
}

function getDifferenceRowTokens(
  differenceRow: DifferenceLine,
  tokenizedSourceLines: Array<Array<ParserToken>>,
  tokenizedModifiedLines: Array<Array<ParserToken>>,
): Array<ParserToken> {
  if (differenceRow.kind === "added") {
    return tokenizedModifiedLines[(differenceRow.modifiedLineNumber ?? 1) - 1] ?? [];
  }
  return tokenizedSourceLines[(differenceRow.sourceLineNumber ?? 1) - 1] ?? [];
}

export function annotateChangedRanges(differenceLines: Array<DifferenceLine>): Array<DifferenceLine> {
  const annotatedLines = differenceLines.slice();
  let lineIndex = 0;

  while (lineIndex < annotatedLines.length) {
    if (annotatedLines[lineIndex]?.kind !== "removed") {
      lineIndex += 1;
      continue;
    }

    const removedStartIndex = lineIndex;
    while (annotatedLines[lineIndex]?.kind === "removed") {
      lineIndex += 1;
    }

    const addedStartIndex = lineIndex;
    while (annotatedLines[lineIndex]?.kind === "added") {
      lineIndex += 1;
    }

    pairRemovedAndAddedLines(annotatedLines, removedStartIndex, addedStartIndex, lineIndex);
  }

  return annotatedLines;
}

function pairRemovedAndAddedLines(lines: Array<DifferenceLine>, removedStartIndex: number, addedStartIndex: number, addedEndIndex: number): void {
  const pairCount = Math.min(addedStartIndex - removedStartIndex, addedEndIndex - addedStartIndex);

  for (let pairOffset = 0; pairOffset < pairCount; pairOffset++) {
    const removedIndex = removedStartIndex + pairOffset;
    const addedIndex = addedStartIndex + pairOffset;
    const removedLine = lines[removedIndex];
    const addedLine = lines[addedIndex];
    if (!removedLine || !addedLine) {
      continue;
    }

    const changedRanges = computeChangedTextRanges(removedLine.text, addedLine.text);
    if (changedRanges === undefined) {
      continue;
    }

    lines[removedIndex] = { ...removedLine, changedRange: changedRanges.removed, isPartialChange: true };
    lines[addedIndex] = { ...addedLine, changedRange: changedRanges.added, isPartialChange: true };
  }
}

function computeChangedTextRanges(
  removedText: string,
  addedText: string,
):
  | {
      added: ChangedTextRange | undefined;
      removed: ChangedTextRange | undefined;
    }
  | undefined {
  const commonPrefixLength = countCommonPrefixLength(removedText, addedText);
  const commonSuffixLength = countCommonSuffixLength(removedText.slice(commonPrefixLength), addedText.slice(commonPrefixLength));

  if (commonPrefixLength === 0 && commonSuffixLength === 0) {
    return undefined;
  }

  return {
    added: createChangedTextRange(commonPrefixLength, addedText.length - commonSuffixLength),
    removed: createChangedTextRange(commonPrefixLength, removedText.length - commonSuffixLength),
  };
}

function createChangedTextRange(start: number, end: number): ChangedTextRange | undefined {
  return end > start ? { end, start } : undefined;
}

function countCommonPrefixLength(firstText: string, secondText: string): number {
  const maximumLength = Math.min(firstText.length, secondText.length);
  let prefixLength = 0;
  while (prefixLength < maximumLength && firstText[prefixLength] === secondText[prefixLength]) {
    prefixLength += 1;
  }
  return prefixLength;
}

function countCommonSuffixLength(firstText: string, secondText: string): number {
  const maximumLength = Math.min(firstText.length, secondText.length);
  let suffixLength = 0;
  while (suffixLength < maximumLength && firstText[firstText.length - 1 - suffixLength] === secondText[secondText.length - 1 - suffixLength]) {
    suffixLength += 1;
  }
  return suffixLength;
}

function getChangedTextClass(differenceKind: DifferenceLineKind, differenceThemeMapping: DifferenceThemeMapping): string {
  if (differenceKind === "added") {
    return differenceThemeMapping.changedAddedText ?? "";
  }
  if (differenceKind === "removed") {
    return differenceThemeMapping.changedRemovedText ?? "";
  }
  return "";
}

function renderTokenValueToMarkup(tokenType: string, tokenValue: string, tokenThemeMapping: TokenThemeMapping): string {
  if (tokenValue === "") {
    return "";
  }
  return renderTokenTextPartToMarkup(tokenType, escapeMarkupValue(tokenValue), tokenThemeMapping);
}

function renderTokensWithChangedRange(
  parsedTokens: Array<ParserToken>,
  changedRange: ChangedTextRange,
  tokenThemeMapping: TokenThemeMapping,
  changedTextClass: string,
): string {
  let markupResult = "";
  let tokenStartOffset = 0;

  for (const tokenEntry of parsedTokens) {
    const tokenEndOffset = tokenStartOffset + tokenEntry.value.length;
    const changedStartInToken = Math.max(changedRange.start, tokenStartOffset) - tokenStartOffset;
    const changedEndInToken = Math.min(changedRange.end, tokenEndOffset) - tokenStartOffset;

    if (changedEndInToken <= changedStartInToken) {
      markupResult += renderTokenValueToMarkup(tokenEntry.type, tokenEntry.value, tokenThemeMapping);
    } else {
      const unchangedBeforeMarkup = renderTokenValueToMarkup(tokenEntry.type, tokenEntry.value.slice(0, changedStartInToken), tokenThemeMapping);
      const changedMarkup = renderTokenValueToMarkup(
        tokenEntry.type,
        tokenEntry.value.slice(changedStartInToken, changedEndInToken),
        tokenThemeMapping,
      );
      const unchangedAfterMarkup = renderTokenValueToMarkup(tokenEntry.type, tokenEntry.value.slice(changedEndInToken), tokenThemeMapping);
      markupResult += unchangedBeforeMarkup + wrapWithChangedClass(changedMarkup, changedTextClass) + unchangedAfterMarkup;
    }

    tokenStartOffset = tokenEndOffset;
  }

  return markupResult;
}

function wrapWithChangedClass(innerMarkup: string, changedTextClass: string): string {
  if (changedTextClass === "") {
    return innerMarkup;
  }
  return '<span class="' + changedTextClass + '">' + innerMarkup + "</span>";
}

export function getDifferenceRowBackground(differenceKind: string, differenceThemeMapping: DifferenceThemeMapping): string {
  if (differenceKind === "added") {
    return differenceThemeMapping.addedRow;
  }
  if (differenceKind === "removed") {
    return differenceThemeMapping.removedRow;
  }
  return "";
}

export function getDifferenceRowMarker(differenceRow: DifferenceLine): string {
  if (differenceRow.isPartialChange) {
    return "";
  }
  return getDifferenceMarker(differenceRow.kind);
}

export function getDifferenceRowNumberText(differenceRow: DifferenceLine): string {
  if (differenceRow.isPartialChange) {
    return "";
  }
  return getDifferenceLineNumberText(differenceRow.kind, differenceRow.sourceLineNumber);
}

export function getDifferenceMarker(differenceKind: string): string {
  if (differenceKind === "added") {
    return "+";
  }
  if (differenceKind === "removed") {
    return "-";
  }
  return " ";
}

export function getDifferenceMarkerClass(differenceKind: string, differenceThemeMapping: DifferenceThemeMapping): string {
  if (differenceKind === "added") {
    return differenceThemeMapping.addedGutter;
  }
  if (differenceKind === "removed") {
    return differenceThemeMapping.removedGutter;
  }
  return "";
}

export function getDifferenceLineNumberText(differenceKind: string, sourceLineNumber?: number): string {
  if (differenceKind === "added") {
    return "";
  }
  if (sourceLineNumber === undefined) {
    return "";
  }
  return String(sourceLineNumber);
}

export function getEditableModifiedLineNumber(differenceRow: CondensedDifferenceRow): number | undefined {
  if (differenceRow.kind !== "added") {
    return undefined;
  }
  return differenceRow.modifiedLineNumber;
}

export function getModifiedLineText(modifiedCode: string, modifiedLineNumber: number): string {
  return modifiedCode.split("\n")[modifiedLineNumber - 1] ?? "";
}

export function replaceModifiedCodeLine(modifiedCode: string | undefined, modifiedLineNumber: number, replacementLineText: string): string {
  const modifiedLines = (modifiedCode ?? "").split("\n");
  modifiedLines[modifiedLineNumber - 1] = replacementLineText;
  return modifiedLines.join("\n");
}

export function isChangeBlockActionRow(displayedRows: Array<CondensedDifferenceRow>, rowIndex: number, showDifferenceLineActions: boolean): boolean {
  if (!showDifferenceLineActions) {
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
