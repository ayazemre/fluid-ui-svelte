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
  return `
Fluid UI Svelte CLI

Usage:
  npx fluid-ui-svelte [options]

Options:
  (no options)                   Print generic library documentation
  --documentation                 Print generic documentation, or a full component tutorial with select=
  --documentation select=<category.element>
                                 Print a full tutorial for one element

Element Path Format:
  category.element  (e.g., base.button, components.modal, prebuilt.breadcrumb)

Examples:
  npx fluid-ui-svelte
  npx fluid-ui-svelte --documentation
  npx fluid-ui-svelte --documentation select=base.button
  npx fluid-ui-svelte --documentation select=components.code-block
`;
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
