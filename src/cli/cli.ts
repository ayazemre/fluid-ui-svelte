#!/usr/bin/env node

type ParsedCommandLineArguments = {
  command: string | undefined;
  flags: Array<string>;
  showHelp: boolean;
};

function parseCommandLineArguments(rawArguments: Array<string>): ParsedCommandLineArguments {
  const flags: Array<string> = [];
  let command: string | undefined = undefined;
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

    if (command === undefined) {
      command = argumentItem;
    }
  }

  return {
    command,
    flags,
    showHelp: showHelp || rawArguments.length === 0,
  };
}

function generateHelpMessage(): string {
  return `
Fluid UI Svelte CLI

Usage:
  fluid-ui-svelte [command] [options]

Commands:
  help                   Display this help message
  documentation          Print the full library documentation
  component <name>       Print documentation for a specific component
  list                   List all available components by category

Options:
  -h, --help             Show help and usage information
  --json                 Output documentation in JSON format
  --version              Show the current library version

Examples:
  npx fluid-ui-svelte --help
  npx fluid-ui-svelte list
  npx fluid-ui-svelte component button
`;
}

function runCommandLineInterface(): void {
  const rawArguments = process.argv.slice(2);
  const parsedArguments = parseCommandLineArguments(rawArguments);

  if (parsedArguments.showHelp) {
    console.log(generateHelpMessage());
    return;
  }

  console.log(`Received command: ${parsedArguments.command ?? "none"}`);
  console.log(`Flags: ${parsedArguments.flags.join(", ") || "none"}`);
}

runCommandLineInterface();
