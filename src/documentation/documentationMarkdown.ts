import { documentationRegistry } from "./documentation.ts";
import { documentationCategoryLabels, toDocumentationPageName, type DocumentationEntry } from "./documentationNavigation.ts";

export const LLMS_RESPONSE_CONTENT_TYPE = "text/markdown; charset=utf-8";

type CookbookCodeSample = {
  caption: string;
  code: string;
  language: string;
};

type CookbookSection = {
  id: string;
  title: string;
  description?: string;
  content?: string;
  warning?: string;
  code?: string;
  language?: string;
  codeSamples?: Array<CookbookCodeSample>;
};

type GettingStartedLayer = {
  id: string;
  title: string;
  path: string;
  description: string;
};

type GettingStartedStep = {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
};

type GettingStartedSection = {
  id: string;
  title: string;
  description?: string;
  content?: string;
  code?: string;
  language?: string;
  layers?: Array<GettingStartedLayer>;
  steps?: Array<GettingStartedStep>;
};

export function buildLlmsResponse(markdown: string): Response {
  return new Response(markdown, {
    headers: {
      "Content-Type": LLMS_RESPONSE_CONTENT_TYPE,
    },
  });
}

export function buildComponentLlmsMarkdown(entry: DocumentationEntry, categoryId: string): string {
  const lines = [`# ${toDocumentationPageName(entry.title)}`, "", `Category: ${documentationCategoryLabels[categoryId]}`, "", entry.description, ""];

  if (entry.props.length > 0) {
    lines.push("## Props", "");
    lines.push(
      ...entry.props.map((propRow) => `- \`${propRow.prop}\` (type: \`${propRow.type}\`, default: \`${propRow.default}\`). ${propRow.description}`),
    );
    lines.push("");
  }

  return lines.join("\n");
}

export function buildCookbookLlmsMarkdown(): string {
  const pageData = documentationRegistry.pages.cookbook;
  const sections = pageData.sections as unknown as Array<CookbookSection>;

  const lines = [`# ${toDocumentationPageName(pageData.title)}`, "", pageData.description, ""];
  for (const section of sections) {
    lines.push(...buildCookbookSectionLines(section));
  }

  return lines.join("\n");
}

export function buildGettingStartedLlmsMarkdown(): string {
  const pageData = documentationRegistry.pages["getting-started"];
  const sections = pageData.sections as unknown as Array<GettingStartedSection>;

  const lines = [`# ${toDocumentationPageName(pageData.title)}`, "", pageData.description, ""];
  for (const section of sections) {
    lines.push(...buildGettingStartedSectionLines(section));
  }

  return lines.join("\n");
}

function buildCookbookSectionLines(section: CookbookSection): Array<string> {
  const lines = [`## ${section.title}`, ""];

  if (section.description) {
    lines.push(section.description, "");
  }

  if (section.content) {
    lines.push(section.content, "");
  }

  if (section.warning) {
    lines.push(`Note: ${section.warning}`, "");
  }

  if (section.code) {
    lines.push(buildFencedCodeBlock(section.code, section.language ?? "svelte"), "");
  }

  for (const codeSample of section.codeSamples ?? []) {
    lines.push(`### ${codeSample.caption}`, "", buildFencedCodeBlock(codeSample.code, codeSample.language), "");
  }

  return lines;
}

function buildGettingStartedSectionLines(section: GettingStartedSection): Array<string> {
  const lines = [`## ${section.title}`, ""];

  if (section.description) {
    lines.push(section.description, "");
  }

  if (section.content) {
    lines.push(section.content, "");
  }

  if (section.layers) {
    lines.push(...section.layers.map((layer) => `- ${layer.title} (\`${layer.path}\`): ${layer.description}`));
    lines.push("");
  }

  for (const step of section.steps ?? []) {
    lines.push(`### ${step.title}`, "", step.description, "", buildFencedCodeBlock(step.code, step.language), "");
  }

  if (section.code) {
    lines.push(buildFencedCodeBlock(section.code, section.language ?? "svelte"), "");
  }

  return lines;
}

function buildFencedCodeBlock(code: string, language: string): string {
  return ["```" + language, code, "```"].join("\n");
}
