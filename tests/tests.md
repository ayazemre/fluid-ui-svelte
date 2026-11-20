# Tests

This document describes the test suites of the package and how to run them.

## Layout

```
tests/
  browser/
    actions.ts               Shared steps used by the browser suites
    base/                    One *.spec.ts file per base element test
    components/              One *.spec.ts file per component test
    prebuilt/                One *.spec.ts file per prebuilt element test
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
