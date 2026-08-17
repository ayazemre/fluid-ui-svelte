export async function globalSetup() {
  // Setup shared resources, state, or environment
  console.log('Global setup executed');
  // Run servers, create files, prepare databases, etc.
}

export async function globalTeardown() {
  // Clean up resources, state, or environment
  console.log('Global teardown executed');
  // Close servers, remove files, disconnect from databases, etc.
}
