import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { documentationRegistry } from "../documentation/documentation.ts";

export type ComponentDocumentationItem = {
  title: string;
  description: string;
  props?: Array<unknown>;
};

export type ComponentCategoryRecord = Record<string, ComponentDocumentationItem>;

export type CompleteDocumentationRegistry = Record<string, ComponentCategoryRecord>;

function normalizeIdentifier(rawIdentifier: string): string {
  return rawIdentifier
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");
}

function convertKebabCaseToPascalCase(kebabCaseString: string): string {
  return kebabCaseString
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

export function loadDocumentationRegistry(): CompleteDocumentationRegistry {
  const registryWithoutPages = ((): CompleteDocumentationRegistry => {
    const { pages: _pages, ...componentRegistry } = documentationRegistry as CompleteDocumentationRegistry & { pages?: unknown };
    return componentRegistry as CompleteDocumentationRegistry;
  })();

  return (
    registryWithoutPages ?? {
      base: {},
      components: {},
      prebuilt: {},
    }
  );
}

function resolveSvelteComponentFilePath(categoryName: string, elementName: string): string | undefined {
  const currentDirectory = dirname(fileURLToPath(import.meta.url));
  const candidateFilenames = [`${convertKebabCaseToPascalCase(elementName)}.svelte`, `${elementName}.svelte`];

  const candidateBasePaths = [
    resolve(currentDirectory, "../lib", categoryName),
    resolve(currentDirectory, "../dist", categoryName),
    resolve(process.cwd(), "src/lib", categoryName),
    resolve(process.cwd(), "dist", categoryName),
  ];

  for (const basePath of candidateBasePaths) {
    for (const filename of candidateFilenames) {
      const prospectivePath = resolve(basePath, filename);
      if (existsSync(prospectivePath)) {
        return prospectivePath;
      }
    }
  }

  return undefined;
}

export function readSvelteComponentSource(categoryName: string, elementName: string): string {
  const resolvedPath = resolveSvelteComponentFilePath(categoryName, elementName);

  if (resolvedPath === undefined) {
    return `// Source file for ${categoryName}/${elementName} could not be located on disk.`;
  }

  try {
    return readFileSync(resolvedPath, "utf-8").trim();
  } catch (fileReadError) {
    const errorMessage = fileReadError instanceof Error ? fileReadError.message : String(fileReadError);
    return `// Error reading file at ${resolvedPath}: ${errorMessage}`;
  }
}

export function findComponentDocumentation(
  targetCategory: string,
  targetElementName: string,
): { categoryKey: string; elementKey: string; item: ComponentDocumentationItem } | undefined {
  const normalizedCategory = normalizeIdentifier(targetCategory);
  const normalizedElement = normalizeIdentifier(targetElementName);
  const registry = loadDocumentationRegistry();

  for (const [categoryKey, categoryRecord] of Object.entries(registry)) {
    if (normalizeIdentifier(categoryKey) !== normalizedCategory) {
      continue;
    }

    for (const [elementKey, documentationItem] of Object.entries(categoryRecord)) {
      if (normalizeIdentifier(elementKey) === normalizedElement) {
        return {
          categoryKey,
          elementKey,
          item: documentationItem,
        };
      }
    }
  }

  return undefined;
}

export function formatGenericDocumentation(): string {
  const registry = loadDocumentationRegistry();

  const pagesRegistry = (
    documentationRegistry as unknown as Record<
      string,
      Record<string, { title: string; description: string; sections?: Array<Record<string, unknown>> }>
    >
  ).pages;
  const gettingStartedPage = pagesRegistry?.["getting-started"];
  const architectureSection = gettingStartedPage?.sections?.find((section) => (section as { id: string }).id === "architecture") as unknown as
    | { layers: Array<{ id: string; title: string; path: string; description: string }> }
    | undefined;
  const layers = architectureSection?.layers ?? [];

  function getLayerData(layerId: string): { title: string; description: string; importPath: string } | undefined {
    const layer = layers.find((item) => item.id === layerId);
    if (layer === undefined) {
      return undefined;
    }
    return {
      description: layer.description,
      importPath: layer.path,
      title: layer.title,
    };
  }

  const categoryDescriptions: Record<string, { title: string; importPath: string; description: string }> = {
    base: getLayerData("base") ?? {
      description:
        "Lightweight wrappers around native HTML elements (Buttons, Inputs, Containers, Tables). Use them to maintain semantic consistency and accessibility without imposing heavy styles.",
      importPath: "fluid-ui-svelte/base",
      title: "Base Layer",
    },
    components: getLayerData("components") ?? {
      description:
        "Fully-featured UI elements (Accordions, Calendars, Modals, Switches) composed from the Base Layer. They include interaction logic and default styling that can be themed via CSS variables.",
      importPath: "fluid-ui-svelte/components",
      title: "Components Layer",
    },
    prebuilt: getLayerData("prebuilt") ?? {
      description:
        "High-level pre-assembled domain components (Breadcrumbs, International Inputs, Notification Areas) combining multiple primitives and workflows ready for immediate use.",
      importPath: "fluid-ui-svelte/prebuilt",
      title: "Prebuilt Layer",
    },
  };

  const introductionSection = gettingStartedPage?.sections?.find((section) => (section as { id: string }).id === "introduction") as unknown as
    | { content: string }
    | undefined;
  const libraryDescription =
    introductionSection?.content ??
    "Fluid UI is a pragmatic Svelte 5 component library designed for flexibility and ease of use. It separates low-level semantic wrappers from high-level interactive components and prebuilt domain widgets, giving you complete control over your application's architecture.";

  const outputLines: Array<string> = ["Fluid UI Svelte:", libraryDescription];

  for (const [categoryKey, categoryRecord] of Object.entries(registry)) {
    const categoryMetadata = categoryDescriptions[categoryKey];
    outputLines.push("");

    if (categoryMetadata !== undefined) {
      outputLines.push(`[${categoryKey.toUpperCase()}] ${categoryMetadata.title} (${categoryMetadata.importPath}):`);
      outputLines.push(categoryMetadata.description);
    } else {
      outputLines.push(`[${categoryKey.toUpperCase()}]:`);
    }

    outputLines.push("");
    outputLines.push("Elements:");

    for (const [elementKey, documentationItem] of Object.entries(categoryRecord)) {
      outputLines.push(`- ${categoryKey}.${elementKey}: ${documentationItem.description}`);
    }
  }

  return outputLines.join("\n");
}

export function formatElementDocumentation(targetCategory: string, targetElementName: string): string {
  const searchResult = findComponentDocumentation(targetCategory, targetElementName);

  if (searchResult === undefined) {
    const registry = loadDocumentationRegistry();
    const availablePaths: Array<string> = [];

    for (const [categoryKey, categoryRecord] of Object.entries(registry)) {
      for (const elementKey of Object.keys(categoryRecord)) {
        availablePaths.push(`${categoryKey}.${elementKey}`);
      }
    }

    return `Error: Component "${targetCategory}.${targetElementName}" not found. Available components: ${availablePaths.join(", ")}`;
  }

  const { categoryKey, elementKey, item } = searchResult;
  const svelteSourceCode = readSvelteComponentSource(categoryKey, elementKey);

  const outputLines: Array<string> = [
    `Component: ${categoryKey}.${elementKey}`,
    `Title: ${item.title}`,
    `Description: ${item.description}`,
    "Source:",
    svelteSourceCode,
  ];

  return outputLines.join("\n");
}

export function printGenericDocumentation(): void {
  console.log(formatGenericDocumentation());
}

export function printElementDocumentation(targetCategory: string, targetElementName: string): void {
  console.log(formatElementDocumentation(targetCategory, targetElementName));
}

export function printDocumentationByPath(elementPath?: string): void {
  if (elementPath === undefined || elementPath.trim() === "") {
    printGenericDocumentation();
    return;
  }

  const trimmedPath = elementPath.trim();
  const pathParts = trimmedPath.split(".");

  if (pathParts.length !== 2) {
    console.log(`Invalid element path format: "${trimmedPath}". Use "category.element" (e.g. base.button).`);
    return;
  }

  const [categoryName, elementName] = pathParts;
  printElementDocumentation(categoryName, elementName);
}
