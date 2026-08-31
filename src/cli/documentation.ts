import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

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

function findDocumentationFilePath(): string | undefined {
  const currentDirectory = dirname(fileURLToPath(import.meta.url));
  const candidatePaths = [
    resolve(currentDirectory, "../documentation/documentation.ts"),
    resolve(process.cwd(), "src/documentation/documentation.ts"),
  ];

  for (const candidatePath of candidatePaths) {
    if (existsSync(candidatePath)) {
      return candidatePath;
    }
  }

  return undefined;
}

export function loadDocumentationRegistry(): CompleteDocumentationRegistry {
  const documentationFilePath = findDocumentationFilePath();

  if (documentationFilePath === undefined) {
    return {
      base: {},
      components: {},
      prebuilt: {},
    };
  }

  try {
    const fileContent = readFileSync(documentationFilePath, "utf-8");
    const registryDeclarationIndex = fileContent.indexOf("documentationRegistry =");

    if (registryDeclarationIndex === -1) {
      return {
        base: {},
        components: {},
        prebuilt: {},
      };
    }

    const objectStartIndex = fileContent.indexOf("{", registryDeclarationIndex);
    if (objectStartIndex === -1) {
      return {
        base: {},
        components: {},
        prebuilt: {},
      };
    }

    const rawObjectString = fileContent.slice(objectStartIndex);
    const sanitizedObjectString = rawObjectString.replace(/sampleComponent:\s*[a-zA-Z0-9_]+/g, "sampleComponent: null").replace(/;\s*$/, "");

    const evaluatedRegistryFunction = new Function(`return ${sanitizedObjectString}`);
    const evaluatedRegistry = evaluatedRegistryFunction() as CompleteDocumentationRegistry;

    return (
      evaluatedRegistry ?? {
        base: {},
        components: {},
        prebuilt: {},
      }
    );
  } catch (parseError) {
    const errorMessage = parseError instanceof Error ? parseError.message : String(parseError);
    console.error(`Failed to parse documentation registry: ${errorMessage}`);
    return {
      base: {},
      components: {},
      prebuilt: {},
    };
  }
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

  const categoryDescriptions: Record<string, { title: string; importPath: string; description: string }> = {
    base: {
      description:
        "Lightweight wrappers around native HTML elements (Buttons, Inputs, Containers, Tables). Use them to maintain semantic consistency and accessibility without imposing heavy styles.",
      importPath: "fluid-ui-svelte/base",
      title: "Base Layer",
    },
    components: {
      description:
        "Fully-featured UI elements (Accordions, Calendars, Modals, Switches) composed from the Base Layer. They include interaction logic and default styling that can be themed via CSS variables.",
      importPath: "fluid-ui-svelte/components",
      title: "Components Layer",
    },
    prebuilt: {
      description:
        "High-level pre-assembled domain components (Breadcrumbs, International Inputs, Notification Areas) combining multiple primitives and workflows ready for immediate use.",
      importPath: "fluid-ui-svelte/prebuilt",
      title: "Prebuilt Layer",
    },
  };

  const outputLines: Array<string> = [
    "Fluid UI Svelte:",
    "Fluid UI is a pragmatic Svelte 5 component library designed for flexibility and ease of use. It separates low-level semantic wrappers from high-level interactive components and prebuilt domain widgets, giving you complete control over your application's architecture.",
  ];

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
