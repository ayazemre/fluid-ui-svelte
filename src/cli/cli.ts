#!/usr/bin/env node

import { printDocumentationByPath, printGenericDocumentation } from "./documentation.ts";

type ParsedCommandLineArguments = {
  selectedElementPath: string | undefined;
  showDocumentation: boolean;
  showHelp: boolean;
  unknownArguments: Array<string>;
};

function parseCommandLineArguments(rawArguments: Array<string>): ParsedCommandLineArguments {
  let selectedElementPath: string | undefined = undefined;
  let showDocumentation = false;
  let showHelp = false;
  const unknownArguments: Array<string> = [];

  for (const argumentItem of rawArguments) {
    if (argumentItem === "--help" || argumentItem === "-h" || argumentItem === "help") {
      showHelp = true;
      continue;
    }

    if (argumentItem === "--documentation") {
      showDocumentation = true;
      continue;
    }

    if (argumentItem.startsWith("select=")) {
      selectedElementPath = argumentItem.slice("select=".length);
      continue;
    }

    unknownArguments.push(argumentItem);
  }

  return {
    selectedElementPath,
    showDocumentation,
    showHelp,
    unknownArguments,
  };
}

function generateHelpMessage(): string {
  const helpMessageLines: Array<string> = [
    "Fluid UI Svelte CLI",
    "",
    "A pragmatic Svelte 5 component library. Base wrappers, interactive components, and prebuilt domain widgets.",
    "",
    "Usage:",
    "  npx fluid-ui-svelte [options]",
    "",
    "Options:",
    "  (no options)                   Print generic library documentation",
    "  --help, -h, help               Print this help message",
    "  --documentation                Print generic documentation",
    "  --documentation select=<category.element>",
    "                                 Print a full tutorial for one element",
    "",
    "Categories:",
    "  base                           fluid-ui-svelte/base (semantic wrappers, overrideDefaultStyling)",
    "  components                     fluid-ui-svelte/components (focused primitives, variant)",
    "  prebuilt                       fluid-ui-svelte/prebuilt (turnkey workflows, variant)",
    "",
    "Element Path Format:",
    "  category.element  (e.g., base.button, components.modal, prebuilt.breadcrumb)",
    "",
    "Requirements:",
    "  Svelte 5 Runes mode, Node 24+ native TypeScript, Tailwind CSS 4 for default theme",
    "",
    "Rules:",
    "  Every element requires a mandatory id prop with scoped child ids (for example my-drawer-panel).",
    "  Compose from Base elements and prefer snippets over config objects.",
    "",
    "Examples:",
    "  npx fluid-ui-svelte",
    "  npx fluid-ui-svelte --help",
    "  npx fluid-ui-svelte --documentation",
    "  npx fluid-ui-svelte --documentation select=base.button",
    "  npx fluid-ui-svelte --documentation select=components.code-block",
    "  npx fluid-ui-svelte --documentation select=prebuilt.breadcrumb",
    "",
  ];
  return helpMessageLines.join("\n");
}

function runCommandLineInterface(): void {
  const rawArguments = process.argv.slice(2);

  if (rawArguments.length === 0) {
    printGenericDocumentation();
    return;
  }

  const parsedArguments = parseCommandLineArguments(rawArguments);

  if (parsedArguments.showHelp) {
    console.log(generateHelpMessage());
    return;
  }

  if (parsedArguments.selectedElementPath !== undefined && parsedArguments.selectedElementPath !== "") {
    printDocumentationByPath(parsedArguments.selectedElementPath);
    return;
  }

  if (parsedArguments.showDocumentation && parsedArguments.unknownArguments.length === 0) {
    printGenericDocumentation();
    return;
  }

  const unknownCommand = parsedArguments.unknownArguments[0] ?? "";
  console.log(`Unknown command: "${unknownCommand}".`);
  console.log("Run 'npx fluid-ui-svelte --help' to see available commands.\n");
  printGenericDocumentation();
}

runCommandLineInterface();
