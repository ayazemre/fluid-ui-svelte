export const defaultCodeBlockTokenTheme: TokenThemeMapping = {
  attribute: "text-[#0284c7] dark:text-[#38bdf8]",
  comment: "text-[#737373] italic",
  delimiter: "text-[#404040] dark:text-[#d4d4d4]",
  keyword: "text-[#9333ea] dark:text-[#c084fc]",
  number: "text-[#db2777] dark:text-[#f472b6]",
  string: "text-[#d97706] dark:text-[#fcd34d]",
  tag: "text-[#dc2626] dark:text-[#f87171]",
  type: "text-[#16a34a] dark:text-[#4ade80]",
  variable: "text-[#0891b2] dark:text-[#22d3ee]",
};

export const defaultCodeBlockDiffTheme: DiffThemeMapping = {
  addedGutter: "text-[#1a7f37] dark:text-[#3fb950]",
  addedRow: "bg-[#e6ffec] dark:bg-[#12261c]",
  gapRow: "text-[#737373] italic",
  removedGutter: "text-[#d1242c] dark:text-[#f85149]",
  removedRow: "bg-[#ffebe9] dark:bg-[#2c1618]",
};

export const svelteParserConfiguration: ParserConfiguration = {
  initialState: "root",
  states: {
    comment: {
      name: "comment",
      rules: [
        { id: "commentContent", pattern: /^[^<]+/, token: "comment" },
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
        { id: "tagClose", pattern: /^<\//, pushState: "tag", token: "delimiter" },
        { id: "tagOpen", pattern: /^<(?=[A-Za-z])/, pushState: "tag", token: "delimiter" },
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
        { id: "componentName", pattern: /^[A-Z][A-Za-z0-9]*/, token: "type" },
        { id: "htmlTagName", pattern: /^[a-zA-Z0-9-]+/, token: "tag" },
        { id: "attributeName", pattern: /^[a-zA-Z\-:@]+/, token: "attribute" },
        { id: "equals", pattern: /^=/, token: "delimiter" },
        { id: "doubleQuotedString", pattern: /^"[^"]*"/, token: "string" },
        { id: "singleQuotedString", pattern: /^'[^']*'/, token: "string" },
        { id: "attributeExpression", pattern: /^\{[^}]+\}/, token: "variable" },
        { id: "tagEnd", pattern: /^\/?>/, popState: true, token: "delimiter" },
      ],
    },
  },
};

export type ParserConfiguration = {
  initialState: string;
  states: Record<string, ParserStateDefinition>;
  theme?: TokenThemeMapping;
};

export type TokenThemeMapping = Record<string, string>;

export type DiffThemeMapping = {
  addedGutter: string;
  addedRow: string;
  gapRow: string;
  removedGutter: string;
  removedRow: string;
};

export type ParserRule = {
  id: string;
  pattern: RegExp;
  token: string;
  nextState?: string;
  popState?: boolean;
  pushState?: string;
};

export type ParserStateDefinition = {
  name: string;
  rules: Array<ParserRule>;
};

export type ParserToken = {
  type: string;
  value: string;
};
