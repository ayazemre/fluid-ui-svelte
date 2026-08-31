<script lang="ts">
  import { codeBlockContents } from "#src/documentation/samples/codeBlockContents.ts";
  import { Text, Link, Container } from "#src/lib/base/index.ts";
  import { CodeBlock, Page } from "#src/lib/components/index.ts";
</script>

<Page
  id="getting-started-page"
  title="Fluid UI - Getting Started"
  description="Installation and usage guide for the Fluid UI Svelte component library."
>
  <Container id="getting-started-main-container" class="flex flex-col gap-10">
    <!-- Introduction -->
    <Container id="getting-started-intro-container" class="flex flex-col gap-4 border-b pb-8 dark:border-neutral-800">
      <Text id="getting-started-heading" type="h1" class="text-3xl font-bold">Getting Started</Text>
      <Text id="getting-started-description" class="text-neutral-600 dark:text-neutral-400">
        Fluid UI is a pragmatic Svelte 5 component library designed for flexibility and ease of use. It separates low-level semantic wrappers from
        high-level interactive components, giving you complete control over your application's architecture.
      </Text>
    </Container>

    <!-- Architecture Overview -->
    <Container id="getting-started-architecture-container" class="flex flex-col gap-4">
      <Text id="getting-started-structure-heading" type="h2" class="text-xl font-semibold">Library Structure</Text>
      <Text id="getting-started-structure-description">The library is organized into three distinct layers to handle different development needs:</Text>

      <Container id="getting-started-layers-grid" class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Container id="getting-started-base-layer-card" class="rounded-lg border bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <Text id="getting-started-base-layer-title" type="h3" class="mb-2 font-bold text-primary-600 dark:text-primary-400">Base Layer</Text>
          <Text id="getting-started-base-layer-description" class="text-sm">
            Located in <Text id="getting-started-base-layer-path" type="code">fluid-ui-svelte/base</Text>. These are lightweight wrappers around native HTML elements (Buttons, Inputs,
            Containers). Use them to maintain semantic consistency and accessibility without imposing heavy styles.
          </Text>
        </Container>

        <Container id="getting-started-components-layer-card" class="rounded-lg border bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <Text id="getting-started-components-layer-title" type="h3" class="mb-2 font-bold text-secondary-600 dark:text-secondary-400">Components Layer</Text>
          <Text id="getting-started-components-layer-description" class="text-sm">
            Located in <Text id="getting-started-components-layer-path" type="code">fluid-ui-svelte/components</Text>. These are fully-featured UI elements (Accordions, Calendars, Switches)
            composed from the Base Layer. They include interaction logic and default styling that can be themed via CSS variables.
          </Text>
        </Container>

        <Container id="getting-started-prebuilt-layer-card" class="rounded-lg border bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <Text id="getting-started-prebuilt-layer-title" type="h3" class="mb-2 font-bold text-primary-600 dark:text-primary-400">Prebuilt Layer</Text>
          <Text id="getting-started-prebuilt-layer-description" class="text-sm">
            Located in <Text id="getting-started-prebuilt-layer-path" type="code">fluid-ui-svelte/prebuilt</Text>. High-level pre-assembled domain components (Breadcrumb, International
            Input, Notification Area) combining multiple primitives and workflows ready for immediate use.
          </Text>
        </Container>
      </Container>
    </Container>

    <!-- Installation Steps -->
    <Container id="getting-started-installation-container" class="flex flex-col gap-6">
      <Text id="getting-started-installation-heading" type="h2" class="text-xl font-semibold">Installation</Text>

      <Container id="getting-started-steps-container" class="flex flex-col gap-8">
        <!-- Step 1 -->
        <Container id="getting-started-step-1-container" class="flex flex-col gap-3">
          <Text id="getting-started-step-1-heading" type="h3" class="font-bold">1. Install the package</Text>
          <Text id="getting-started-step-1-description" class="text-sm text-neutral-500">Install the library using your package manager of choice.</Text>
          <CodeBlock id="getting-started-step-1-code" code={`npm install fluid-ui-svelte`} language="bash" />
        </Container>

        <!-- Step 2 -->
        <Container id="getting-started-step-2-container" class="flex flex-col gap-3">
          <Text id="getting-started-step-2-heading" type="h3" class="font-bold">2. Configure Global Styles</Text>
          <Text id="getting-started-step-2-description" class="text-sm text-neutral-500">
            Fluid UI does not inject styles automatically. This allows you to maintain library specific styling and app specific styling separately.
            Download the reference
            <Link id="getting-started-fluidui-css-link" href="/fluidui.css" target="_blank" class="font-bold underline">fluidui.css</Link>
            file, place it in your project (e.g., <Text id="getting-started-src-path" type="code">src/</Text>), and import it in your main CSS file.
          </Text>
          <CodeBlock id="getting-started-step-2-code" code={codeBlockContents.gettingStartedAppCss} language="css" />
        </Container>
      </Container>
    </Container>

    <!-- Usage -->
    <Container id="getting-started-usage-container" class="flex flex-col gap-4">
      <Text id="getting-started-usage-heading" type="h2" class="text-xl font-semibold">Usage</Text>
      <Text id="getting-started-usage-description">Import components directly from their respective layers. Svelte 5 Runes mode is required.</Text>
      <CodeBlock id="getting-started-usage-code" code={codeBlockContents.gettingStartedUsage} language="svelte" />
    </Container>
  </Container>
</Page>
