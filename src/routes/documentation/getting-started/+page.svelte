<script lang="ts">
  import { codeBlockContents } from "#src/documentation/samples/codeBlockContents.ts";
  import { documentationRegistry } from "#src/documentation/documentation.ts";
  import { Container, Link, Text } from "#src/lib/base/index.ts";
  import { CodeBlock, Page } from "#src/lib/components/index.ts";

  const pageData = (documentationRegistry as unknown as Record<string, Record<string, { title: string; description: string; sections: Array<Record<string, unknown>> }>>).pages["getting-started"];
  const introductionSection = pageData.sections.find((section) => section.id === "introduction") as unknown as { title: string; content: string };
  const architectureSection = pageData.sections.find((section) => section.id === "architecture") as unknown as { title: string; description: string; layers: Array<{ id: string; title: string; path: string; description: string }> };
  const installationSection = pageData.sections.find((section) => section.id === "installation") as unknown as { title: string; steps: Array<{ id: string; title: string; description: string; code?: string; codeKey?: string; language?: string }> };
  const usageSection = pageData.sections.find((section) => section.id === "usage") as unknown as { title: string; description: string; codeKey: string; language: string };

  function getCodeForStep(step: { code?: string; codeKey?: string }): string {
    if (step.code !== undefined) {
      return step.code;
    }
    if (step.codeKey !== undefined) {
      return (codeBlockContents as Record<string, string>)[step.codeKey] ?? "";
    }
    return "";
  }

  function getUsageCode(): string {
    return (codeBlockContents as Record<string, string>)[usageSection.codeKey] ?? "";
  }
</script>

<Page
  id="getting-started-page"
  title={pageData.title}
  description={pageData.description}
>
  <Container id="getting-started-main-container" class="flex flex-col gap-10">
    <!-- Introduction -->
    <Container id="getting-started-intro-container" class="flex flex-col gap-4 border-b pb-8 dark:border-neutral-800">
      <Text id="getting-started-heading" type="h1" class="text-3xl font-bold">{introductionSection.title}</Text>
      <Text id="getting-started-description" class="text-neutral-600 dark:text-neutral-400">
        {introductionSection.content}
      </Text>
    </Container>

    <!-- Architecture Overview -->
    <Container id="getting-started-architecture-container" class="flex flex-col gap-4">
      <Text id="getting-started-structure-heading" type="h2" class="text-xl font-semibold">{architectureSection.title}</Text>
      <Text id="getting-started-structure-description">{architectureSection.description}</Text>

      <Container id="getting-started-layers-grid" class="grid grid-cols-1 gap-6 md:grid-cols-3">
        {#each architectureSection.layers as layer (layer.id)}
          <Container id={`getting-started-${layer.id}-layer-card`} class="rounded-lg border bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
            {#if layer.id === "base"}
              <Text id={`getting-started-${layer.id}-layer-title`} type="h3" class="mb-2 font-bold text-primary-600 dark:text-primary-400">{layer.title}</Text>
            {:else if layer.id === "components"}
              <Text id={`getting-started-${layer.id}-layer-title`} type="h3" class="mb-2 font-bold text-secondary-600 dark:text-secondary-400">{layer.title}</Text>
            {:else}
              <Text id={`getting-started-${layer.id}-layer-title`} type="h3" class="mb-2 font-bold text-primary-600 dark:text-primary-400">{layer.title}</Text>
            {/if}
            <Text id={`getting-started-${layer.id}-layer-description`} class="text-sm">
              Located in <Text id={`getting-started-${layer.id}-layer-path`} type="code">{layer.path}</Text>. {layer.description}
            </Text>
          </Container>
        {/each}
      </Container>
    </Container>

    <!-- Installation Steps -->
    <Container id="getting-started-installation-container" class="flex flex-col gap-6">
      <Text id="getting-started-installation-heading" type="h2" class="text-xl font-semibold">{installationSection.title}</Text>

      <Container id="getting-started-steps-container" class="flex flex-col gap-8">
        {#each installationSection.steps as step (step.id)}
          <Container id={`getting-started-${step.id}-container`} class="flex flex-col gap-3">
            <Text id={`getting-started-${step.id}-heading`} type="h3" class="font-bold">{step.title}</Text>
            <Text id={`getting-started-${step.id}-description`} class="text-sm text-neutral-500">
              {#if step.id === "step-2"}
                Fluid UI does not inject styles automatically. This allows you to maintain library specific styling and app specific styling separately. Download the reference
                <Link id="getting-started-fluidui-css-link" href="/fluidui.css" target="_blank" class="font-bold underline">fluidui.css</Link>
                file, place it in your project (e.g., <Text id="getting-started-src-path" type="code">src/</Text>), and import it in your main CSS file.
              {:else}
                {step.description}
              {/if}
            </Text>
            <CodeBlock id={`getting-started-${step.id}-code`} code={getCodeForStep(step)} language={step.language ?? "bash"} />
          </Container>
        {/each}
      </Container>
    </Container>

    <!-- Usage -->
    <Container id="getting-started-usage-container" class="flex flex-col gap-4">
      <Text id="getting-started-usage-heading" type="h2" class="text-xl font-semibold">{usageSection.title}</Text>
      <Text id="getting-started-usage-description">{usageSection.description}</Text>
      <CodeBlock id="getting-started-usage-code" code={getUsageCode()} language={usageSection.language ?? "svelte"} />
    </Container>
  </Container>
</Page>
