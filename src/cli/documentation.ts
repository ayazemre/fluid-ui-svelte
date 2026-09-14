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

export type ComponentPropDocumentation = {
  default?: string;
  description?: string;
  prop?: string;
  type?: string;
};

function isPropDocumentationEntry(entry: unknown): entry is ComponentPropDocumentation {
  if (!entry || typeof entry !== "object") {
    return false;
  }
  return typeof (entry as Record<string, unknown>).prop === "string";
}

function padColumnValue(columnValue: string, columnWidth: number): string {
  if (columnValue.length >= columnWidth) {
    return columnValue;
  }
  return columnValue + " ".repeat(columnWidth - columnValue.length);
}

export function formatPropsTable(componentProps?: Array<unknown>): string {
  if (!componentProps || componentProps.length === 0) {
    return "Props: none documented.";
  }

  const tableRows: Array<{ defaultValue: string; description: string; name: string; type: string }> = [];
  for (const entry of componentProps) {
    if (!isPropDocumentationEntry(entry)) {
      continue;
    }
    tableRows.push({
      defaultValue: entry.default ?? "",
      description: entry.description ?? "",
      name: entry.prop ?? "",
      type: entry.type ?? "",
    });
  }

  if (tableRows.length === 0) {
    return "Props: none documented.";
  }

  const headerName = "Prop";
  const headerType = "Type";
  const headerDefault = "Default";
  const headerDescription = "Description";

  let nameWidth = headerName.length;
  let typeWidth = headerType.length;
  let defaultWidth = headerDefault.length;
  let descriptionWidth = headerDescription.length;

  for (const tableRow of tableRows) {
    if (tableRow.name.length > nameWidth) {
      nameWidth = tableRow.name.length;
    }
    if (tableRow.type.length > typeWidth) {
      typeWidth = tableRow.type.length;
    }
    if (tableRow.defaultValue.length > defaultWidth) {
      defaultWidth = tableRow.defaultValue.length;
    }
    if (tableRow.description.length > descriptionWidth) {
      descriptionWidth = tableRow.description.length;
    }
  }

  const outputLines: Array<string> = ["Props:"];
  outputLines.push(
    padColumnValue(headerName, nameWidth) +
      "  " +
      padColumnValue(headerType, typeWidth) +
      "  " +
      padColumnValue(headerDefault, defaultWidth) +
      "  " +
      headerDescription,
  );
  outputLines.push(
    padColumnValue("", nameWidth).replace(/ /g, "-") +
      "  " +
      padColumnValue("", typeWidth).replace(/ /g, "-") +
      "  " +
      padColumnValue("", defaultWidth).replace(/ /g, "-") +
      "  " +
      padColumnValue("", descriptionWidth).replace(/ /g, "-"),
  );

  for (const tableRow of tableRows) {
    outputLines.push(
      padColumnValue(tableRow.name, nameWidth) +
        "  " +
        padColumnValue(tableRow.type, typeWidth) +
        "  " +
        padColumnValue(tableRow.defaultValue, defaultWidth) +
        "  " +
        tableRow.description,
    );
  }

  return outputLines.join("\n");
}

function resolveCategoryImportPath(categoryKey: string): string {
  if (categoryKey === "base") {
    return "fluid-ui-svelte/base";
  }
  if (categoryKey === "components") {
    return "fluid-ui-svelte/components";
  }
  if (categoryKey === "prebuilt") {
    return "fluid-ui-svelte/prebuilt";
  }
  return "fluid-ui-svelte";
}

export function formatUsageSnippet(categoryKey: string, elementKey: string): string {
  const componentName = convertKebabCaseToPascalCase(elementKey);
  const importPath = resolveCategoryImportPath(categoryKey);
  return "<script>\n  import { " + componentName + " } from '" + importPath + "';\n</script>";
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

  outputLines.push("");
  outputLines.push("For detailed information about an element, run:");
  outputLines.push("  npx fluid-ui-svelte --documentation select=<category.element>");
  outputLines.push("Example:");
  outputLines.push("  npx fluid-ui-svelte --documentation select=components.code-block");

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

  const outputLines: Array<string> = [
    "Component: " + categoryKey + "." + elementKey,
    "Title: " + item.title,
    "Description: " + item.description,
    "Usage:",
    formatUsageSnippet(categoryKey, elementKey),
    formatPropsTable(item.props),
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
