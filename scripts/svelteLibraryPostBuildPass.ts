import { init as initializeLexer, parse as parseImportSpecifiers, type ImportSpecifier } from "es-module-lexer";
import { parse as parseSvelteAst } from "svelte/compiler";

import fileSystem from "node:fs";
import pathModule from "node:path";

// Wait for the WebAssembly-based es-module-lexer module to initialize before running code
await initializeLexer;

// With this (anchors directly to project root regardless of CWD):
const distributionDirectoryPath: string = pathModule.resolve(import.meta.dirname, "../dist");

/**
 * Transforms an individual module import or export path string:
 * 1. Converts '#src/' subpath aliases into relative directory paths inside 'dist/'.
 * 2. Rewrites the '.ts' file extension to a '.js' file extension.
 */
function transformModuleSpecifier(specifierString: string, currentFilePath: string): string {
  // Create a working copy of the input module specifier string
  let updatedSpecifierString: string = specifierString;

  // Check if the import path begins with the '#src/' subpath alias prefix
  if (updatedSpecifierString.startsWith("#src/")) {
    // Strip the '#src/' prefix to obtain the target path relative to the root of the dist folder
    const targetPathRelativeToDist: string = updatedSpecifierString.slice(5);

    // Construct the absolute path pointing to the target file inside the distribution directory
    const targetAbsoluteFilePath: string = pathModule.join(distributionDirectoryPath, targetPathRelativeToDist);

    // Get the absolute path of the directory containing the file currently being processed
    const currentDirectoryPath: string = pathModule.dirname(pathModule.resolve(currentFilePath));

    // Calculate the relative path from the current file's directory to the target file's absolute path
    let calculatedRelativePath: string = pathModule.relative(currentDirectoryPath, targetAbsoluteFilePath);

    // Normalize Windows backslashes into standard Unix forward slashes for cross-platform compatibility
    calculatedRelativePath = calculatedRelativePath.replace(/\\/g, "/");

    // Ensure the relative path explicitly starts with '.' so Node.js resolves it as a relative import
    if (!calculatedRelativePath.startsWith(".")) {
      calculatedRelativePath = `./${calculatedRelativePath}`;
    }

    // Assign the newly computed relative path to the updated specifier variable
    updatedSpecifierString = calculatedRelativePath;
  }

  // Check if the import path ends with a TypeScript '.ts' file extension
  if (updatedSpecifierString.endsWith(".ts")) {
    // Strip the last 3 characters ('.ts') and append the '.js' extension instead
    updatedSpecifierString = `${updatedSpecifierString.slice(0, -3)}.js`;
  }

  // Return the fully transformed import specifier string
  return updatedSpecifierString;
}

/**
 * Parses ECMAScript module import/export statements within a JavaScript/TypeScript code string
 * and rewrites specifiers matching '#src/' or '.ts'.
 */
function rewriteFileSpecifiers(sourceCodeContent: string, currentFilePath: string): string {
  // Declare a variable to store the array of parsed import specifiers returned by the lexer
  let parsedImportSpecifiers: readonly ImportSpecifier[];

  try {
    // Parse the source code string using es-module-lexer to locate all module specifiers
    [parsedImportSpecifiers] = parseImportSpecifiers(sourceCodeContent);
  } catch {
    // If parsing fails due to invalid syntax, return the original source code untouched
    return sourceCodeContent;
  }

  // Initialize a mutable string variable to hold the updated file content
  let updatedSourceCodeContent: string = sourceCodeContent;

  // Iterate backwards through the array of import specifiers so character offsets stay aligned during replacements
  for (let specifierIndex = parsedImportSpecifiers.length - 1; specifierIndex >= 0; specifierIndex--) {
    // Retrieve the current import specifier object from the array
    const importSpecifier: ImportSpecifier = parsedImportSpecifiers[specifierIndex];

    // Skip the loop iteration if the import specifier name string is undefined or empty
    if (!importSpecifier.n) {
      continue;
    }

    // Check if the specifier ends with '.ts' or starts with the '#src/' alias
    if (importSpecifier.n.endsWith(".ts") || importSpecifier.n.startsWith("#src/")) {
      // Generate the replacement specifier path string using the transformation helper function
      const replacementSpecifierString: string = transformModuleSpecifier(importSpecifier.n, currentFilePath);

      // Slice the source string before and after the specifier's byte boundaries (start: s, end: e) and inject the new string
      updatedSourceCodeContent =
        updatedSourceCodeContent.slice(0, importSpecifier.s) + replacementSpecifierString + updatedSourceCodeContent.slice(importSpecifier.e);
    }
  }

  // Return the transformed source code string
  return updatedSourceCodeContent;
}

/**
 * Uses the official Svelte compiler parser to locate <script> and <script module> AST nodes,
 * extracting precise character boundaries without regular expressions.
 */
function processSvelteComponentFile(originalFileContent: string, currentFilePath: string): string {
  try {
    // Parse the Svelte file content into a formal Abstract Syntax Tree using svelte/compiler
    const svelteAbstractSyntaxTree: any = parseSvelteAst(originalFileContent);

    // Collect instance script (<script>) and module script (<script module>) AST nodes into an array
    const scriptAstNodes: any[] = [svelteAbstractSyntaxTree.instance, svelteAbstractSyntaxTree.module].filter((astNode: any): boolean =>
      Boolean(astNode && astNode.content),
    );

    // If no script blocks exist in the Svelte component, return the original content unchanged
    if (scriptAstNodes.length === 0) {
      return originalFileContent;
    }

    // Sort script nodes in descending order by character start index so string replacements do not affect subsequent offsets
    scriptAstNodes.sort((firstNode: any, secondNode: any): number => secondNode.content.start - firstNode.content.start);

    // Working copy of the component content string
    let updatedComponentContent: string = originalFileContent;

    // Process each script block node found in the AST
    for (const scriptNode of scriptAstNodes) {
      // Extract exact character offsets for the inner script content
      const scriptContentStartIndex: number = scriptNode.content.start;
      const scriptContentEndIndex: number = scriptNode.content.end;

      // Extract the raw JavaScript code string from between the script tags
      const rawScriptBlockContent: string = updatedComponentContent.slice(scriptContentStartIndex, scriptContentEndIndex);

      // Rewrite the specifiers inside the extracted script block content
      const rewrittenScriptBlockContent: string = rewriteFileSpecifiers(rawScriptBlockContent, currentFilePath);

      // Replace the old script block with the newly rewritten script block inside the component string
      updatedComponentContent =
        updatedComponentContent.slice(0, scriptContentStartIndex) +
        rewrittenScriptBlockContent +
        updatedComponentContent.slice(scriptContentEndIndex);
    }

    return updatedComponentContent;
  } catch {
    // Fallback to returning original file content if Svelte AST parsing fails
    return originalFileContent;
  }
}

/**
 * Recursively iterates through the distribution directory and updates specifiers inside
 * JavaScript files ('.js'), declaration files ('.d.ts'), and Svelte component files ('.svelte').
 */
function processDistributionFolder(targetDirectoryPath: string): void {
  // Exit early if the target directory does not physically exist on the file system
  if (!fileSystem.existsSync(targetDirectoryPath)) {
    return;
  }

  // Read all directory entries within the current folder including their file type information
  const directoryEntries: fileSystem.Dirent[] = fileSystem.readdirSync(targetDirectoryPath, { withFileTypes: true });

  // Loop through each entry found inside the current directory
  for (const directoryEntry of directoryEntries) {
    // Construct the absolute path for the current entry
    const entryAbsolutePath: string = pathModule.join(targetDirectoryPath, directoryEntry.name);

    // If the entry is a directory, recursively process its nested contents
    if (directoryEntry.isDirectory()) {
      processDistributionFolder(entryAbsolutePath);
    }
    // If the entry is a JavaScript file or a TypeScript declaration file
    else if (directoryEntry.name.endsWith(".js") || directoryEntry.name.endsWith(".d.ts")) {
      // Read the text content of the file using UTF-8 encoding
      const originalFileContent: string = fileSystem.readFileSync(entryAbsolutePath, "utf8");

      // Process and rewrite the import specifiers within the file content
      const updatedFileContent: string = rewriteFileSpecifiers(originalFileContent, entryAbsolutePath);

      // Write the updated content back to disk only if modifications were actually made
      if (originalFileContent !== updatedFileContent) {
        fileSystem.writeFileSync(entryAbsolutePath, updatedFileContent, "utf8");
      }
    }
    // If the entry is a Svelte component file
    else if (directoryEntry.name.endsWith(".svelte")) {
      // Read the text content of the Svelte file using UTF-8 encoding
      const originalFileContent: string = fileSystem.readFileSync(entryAbsolutePath, "utf8");

      // Process the Svelte file safely using the Svelte compiler AST parser
      const updatedFileContent: string = processSvelteComponentFile(originalFileContent, entryAbsolutePath);

      // Write the updated Svelte component back to disk only if modifications were actually made
      if (originalFileContent !== updatedFileContent) {
        fileSystem.writeFileSync(entryAbsolutePath, updatedFileContent, "utf8");
      }
    }
  }
}

// Execute the distribution folder processing logic starting from the root 'dist' path
processDistributionFolder(distributionDirectoryPath);

// Output a confirmation message to the terminal console indicating completion
console.log("✔ postBuildPass complete: AST-safe rewriting completed in dist/");
