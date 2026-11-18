# Tests

This document describes the test suites of the package and how to run them.

## Layout

```
tests/
  browser/       Browser suites, named *.spec.ts
```

## Running

Run every browser suite through the test script:

```
npm run test:browser
```

Run a single suite by passing its file path after the script name:

```
npm run test:browser -- tests/browser/<suite_name>.spec.ts
```
