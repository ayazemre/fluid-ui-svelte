import type { LineTokenizer, ParserToken, TokenizedLine } from "#src/lib/prebuilt/codeEditor.ts";

type ParserRule = {
  id: string;
  pattern: RegExp;
  token: string;
  nextState?: string;
  popState?: boolean;
  pushState?: string;
};

type ParserStateDefinition = {
  name: string;
  rules: Array<ParserRule>;
};

type ParserConfiguration = {
  initialState: string;
  states: Record<string, ParserStateDefinition>;
};

const codeEditorSvelteGrammar: ParserConfiguration = {
  initialState: "root",
  states: {
    comment: {
      name: "comment",
      rules: [
        { id: "commentContent", pattern: /^(?:(?!-->)[\s\S])+/, token: "comment" },
        { id: "commentEnd", pattern: /^-->/, popState: true, token: "comment" },
        { id: "commentStart", pattern: /^<!--/, token: "comment" },
      ],
    },
    expression: {
      name: "expression",
      rules: [
        { id: "expressionClose", pattern: /^\}/, popState: true, token: "delimiter" },
        { id: "expressionContent", pattern: /^[^}]+/, token: "variable" },
      ],
    },
    root: {
      name: "root",
      rules: [
        { id: "scriptOpen", pattern: /^<script(\s[^>]*)?>/, pushState: "script", token: "tag" },
        { id: "styleOpen", pattern: /^<style(\s[^>]*)?>/, pushState: "style", token: "tag" },
        { id: "htmlComment", pattern: /^<!--/, pushState: "comment", token: "comment" },
        { id: "tagClose", pattern: /^<\/(?=[A-Za-z])/, pushState: "tagName", token: "delimiter" },
        { id: "tagOpen", pattern: /^<(?=[A-Za-z])/, pushState: "tagName", token: "delimiter" },
        { id: "snippetBlock", pattern: /^\{#(if|each|await|key|snippet)[^}]*\}/, token: "keyword" },
        { id: "snippetClose", pattern: /^\{\/(if|each|await|key|snippet)\}/, token: "keyword" },
        { id: "elseBlock", pattern: /^\{:else[^}]*\}/, token: "keyword" },
        { id: "thenBlock", pattern: /^\{:then[^}]*\}/, token: "keyword" },
        { id: "catchBlock", pattern: /^\{:catch[^}]*\}/, token: "keyword" },
        { id: "expressionOpen", pattern: /^\{/, pushState: "expression", token: "delimiter" },
        { id: "renderDirective", pattern: /^@render\b/, token: "keyword" },
        { id: "plainText", pattern: /^[^<{]+/, token: "plain" },
      ],
    },
    script: {
      name: "script",
      rules: [
        { id: "scriptClose", pattern: /^<\/script\s*>/, popState: true, token: "tag" },
        { id: "scriptWhitespace", pattern: /^\s+/, token: "plain" },
        { id: "scriptSingleComment", pattern: /^\/\/[^\n]*/, token: "comment" },
        { id: "scriptMultiCommentFull", pattern: /^\/\*[\s\S]*?\*\//, token: "comment" },
        { id: "scriptMultiCommentOpen", pattern: /^\/\*/, pushState: "scriptComment", token: "comment" },
        { id: "scriptDoubleString", pattern: /^"([^"\\\n]|\\.)*"/, token: "string" },
        { id: "scriptSingleString", pattern: /^'([^'\\\n]|\\.)*'/, token: "string" },
        { id: "scriptTemplateString", pattern: /^`([^`\\]|\\.)*`/, token: "string" },
        {
          id: "scriptKeyword",
          pattern:
            /^(import|from|export|let|const|function|return|if|else|for|while|async|await|new|typeof|class|extends|default|as|try|catch|switch|case|break|continue|in|of|this)\b/,
          token: "keyword",
        },
        { id: "scriptNumber", pattern: /^\b\d+(\.\d+)?\b/, token: "number" },
        { id: "scriptComponent", pattern: /^[A-Z][A-Za-z0-9]*/, token: "type" },
        { id: "scriptIdentifier", pattern: /^[A-Za-z_$][A-Za-z0-9_$]*/, token: "plain" },
        { id: "scriptPunctuation", pattern: /^[{}()[\];:,.]/, token: "delimiter" },
        { id: "scriptOperator", pattern: /^[=+\-*/<>!&|?]+/, token: "delimiter" },
      ],
    },
    scriptComment: {
      name: "scriptComment",
      rules: [
        { id: "scriptCommentContent", pattern: /^[^*]+/, token: "comment" },
        { id: "scriptCommentEnd", pattern: /^\*\//, popState: true, token: "comment" },
        { id: "scriptCommentStar", pattern: /^\*/, token: "comment" },
      ],
    },
    style: {
      name: "style",
      rules: [
        { id: "styleContent", pattern: /^[^<]+/, token: "plain" },
        { id: "styleClose", pattern: /^<\/style\s*>/, popState: true, token: "tag" },
      ],
    },
    tag: {
      name: "tag",
      rules: [
        { id: "whitespace", pattern: /^\s+/, token: "plain" },
        { id: "attributeName", pattern: /^[a-zA-Z\-:@]+/, token: "attribute" },
        { id: "equals", pattern: /^=/, token: "delimiter" },
        { id: "doubleQuotedString", pattern: /^"[^"]*"/, token: "string" },
        { id: "singleQuotedString", pattern: /^'[^']*'/, token: "string" },
        { id: "attributeExpression", pattern: /^\{[^}]+\}/, token: "variable" },
        { id: "tagEnd", pattern: /^\/?>/, popState: true, token: "delimiter" },
      ],
    },
    tagName: {
      name: "tagName",
      rules: [
        { id: "componentName", nextState: "tag", pattern: /^[A-Z][A-Za-z0-9]*/, token: "type" },
        { id: "htmlTagName", nextState: "tag", pattern: /^[a-zA-Z0-9-]+/, token: "tag" },
      ],
    },
  },
};

export type CodeEditorSvelteTokenizerState = {
  stateStack: Array<string>;
};

type RuleMatch = {
  matchedRule: ParserRule;
  matchedText: string;
};

const stickyPatternCache = new WeakMap<RegExp, RegExp>();

export const codeEditorSvelteTokenizer: LineTokenizer<CodeEditorSvelteTokenizerState> = {
  initialState: { stateStack: [codeEditorSvelteGrammar.initialState] },
  tokenizeLine: tokenizeSvelteLine,
};

export function resolveSvelteTokenizerForLanguage(language: string): LineTokenizer<CodeEditorSvelteTokenizerState> | undefined {
  if (language === "svelte" || language === "html") {
    return codeEditorSvelteTokenizer;
  }
  return undefined;
}

function getStickyPattern(pattern: RegExp): RegExp {
  const cachedStickyPattern = stickyPatternCache.get(pattern);
  if (cachedStickyPattern) {
    return cachedStickyPattern;
  }
  const patternSourceWithoutAnchor = pattern.source.startsWith("^") ? pattern.source.slice(1) : pattern.source;
  const stickyPattern = new RegExp(patternSourceWithoutAnchor, pattern.flags.replace(/[gy]/g, "") + "y");
  stickyPatternCache.set(pattern, stickyPattern);
  return stickyPattern;
}

function findMatchingRuleAtPosition(candidateRules: Array<ParserRule>, lineText: string, matchPosition: number): RuleMatch | null {
  for (const candidateRule of candidateRules) {
    const stickyPattern = getStickyPattern(candidateRule.pattern);
    stickyPattern.lastIndex = matchPosition;
    const matchResult = stickyPattern.exec(lineText);
    if (matchResult && matchResult[0].length > 0) {
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

function tokenizeSvelteLine(lineText: string, previousState: CodeEditorSvelteTokenizerState): TokenizedLine<CodeEditorSvelteTokenizerState> {
  const stateStack = [...previousState.stateStack];
  const tokens: Array<ParserToken> = [];
  let matchPosition = 0;

  while (matchPosition < lineText.length) {
    const currentStateName = stateStack[stateStack.length - 1] ?? codeEditorSvelteGrammar.initialState;
    const currentStateDefinition = codeEditorSvelteGrammar.states[currentStateName];
    const ruleMatch = currentStateDefinition ? findMatchingRuleAtPosition(currentStateDefinition.rules, lineText, matchPosition) : null;

    if (!ruleMatch) {
      tokens.push({ type: "plain", value: lineText[matchPosition] ?? "" });
      matchPosition += 1;
      continue;
    }

    tokens.push({ type: ruleMatch.matchedRule.token, value: ruleMatch.matchedText });
    matchPosition += ruleMatch.matchedText.length;
    applyMatchedRuleToStateStack(stateStack, ruleMatch.matchedRule);
  }

  return { nextState: { stateStack }, tokens };
}
