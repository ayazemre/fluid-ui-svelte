#!/usr/bin/env node

import { printDocumentationByPath, printGenericDocumentation } from "./documentation.ts";

type ParsedCommandLineArguments = {
  command: string | undefined;
  targetElementPath: string | undefined;
  flags: Array<string>;
  showHelp: boolean;
};

function parseCommandLineArguments(rawArguments: Array<string>): ParsedCommandLineArguments {
  const flags: Array<string> = [];
  const positionalArguments: Array<string> = [];
  let showHelp = false;

  for (const argumentItem of rawArguments) {
    if (argumentItem === "--help" || argumentItem === "-h" || argumentItem === "help") {
      showHelp = true;
      continue;
    }

    if (argumentItem.startsWith("-")) {
      flags.push(argumentItem);
      continue;
    }

    positionalArguments.push(argumentItem);
  }

  const primaryArgument = positionalArguments[0];
  const secondaryArgument = positionalArguments[1];

  let command: string | undefined = undefined;
  let targetElementPath: string | undefined = undefined;

  if (primaryArgument !== undefined) {
    if (primaryArgument.includes(".")) {
      command = "documentation";
      targetElementPath = primaryArgument;
    } else if (primaryArgument === "documentation" || primaryArgument === "docs" || primaryArgument === "component") {
      command = "documentation";
      targetElementPath = secondaryArgument;
    } else {
      command = primaryArgument;
      targetElementPath = secondaryArgument;
    }
  }

  return {
    command,
    flags,
    showHelp,
    targetElementPath,
  };
}

function generateHelpMessage(): string {
  return `
Fluid UI Svelte CLI

Usage:
  npx fluid-ui-svelte [command] [options]
  npx fluid-ui-svelte [elementcategory.elementname]

Commands:
  (no command)                 Print generic library documentation
  documentation [path]         Print generic documentation or specific element documentation
  help                         Display this help message

Documentation Path Format:
  elementcategory.elementname  (e.g., base.button, components.modal, prebuilt.breadcrumb)

Options:
  -h, --help                   Show help and usage information

Examples:
  npx fluid-ui-svelte
  npx fluid-ui-svelte base.button
  npx fluid-ui-svelte components.modal
  npx fluid-ui-svelte prebuilt.breadcrumb
  npx fluid-ui-svelte documentation base.input-field
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

  if (parsedArguments.command === undefined || parsedArguments.command === "documentation") {
    printDocumentationByPath(parsedArguments.targetElementPath);
    return;
  }

  if (parsedArguments.command.includes(".")) {
    printDocumentationByPath(parsedArguments.command);
    return;
  }

  console.log(`Unknown command: "${parsedArguments.command}".`);
  console.log("Run 'npx fluid-ui-svelte --help' to see available commands.\n");
  printGenericDocumentation();
}

runCommandLineInterface();
