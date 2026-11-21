import type { DifferenceThemeMapping, TokenThemeMapping } from "#src/lib/prebuilt/codeEditor.ts";

export const codeEditorTokenThemeMapping: TokenThemeMapping = {
  attribute: "fluid-code-token-attribute",
  comment: "fluid-code-token-comment",
  delimiter: "fluid-code-token-delimiter",
  keyword: "fluid-code-token-keyword",
  number: "fluid-code-token-number",
  string: "fluid-code-token-string",
  tag: "fluid-code-token-tag",
  type: "fluid-code-token-type",
  variable: "fluid-code-token-variable",
};

export const codeEditorDifferenceThemeMapping: DifferenceThemeMapping = {
  addedGutter: "fluid-code-difference-added-gutter",
  addedRow: "fluid-code-difference-added-row",
  changedAddedText: "fluid-code-difference-changed-added-text",
  changedRemovedText: "fluid-code-difference-changed-removed-text",
  gapRow: "fluid-code-difference-gap",
  removedGutter: "fluid-code-difference-removed-gutter",
  removedRow: "fluid-code-difference-removed-row",
};
