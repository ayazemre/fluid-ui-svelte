<script lang="ts">
  import { documentationRegistry } from "#src/documentation/documentation.ts";
  import { findDocumentationNeighborLinks } from "#src/documentation/documentationNavigation.ts";
  import DocumentationPager from "#src/documentation/DocumentationPager.svelte";
  import { resolveSvelteTokenizerForLanguage } from "#src/documentation/samples/codeEditorSvelteTokenizer.ts";
  import { codeEditorDifferenceThemeMapping, codeEditorTokenThemeMapping } from "#src/documentation/samples/codeEditorThemes.ts";
  import { layerNumerals } from "#src/documentation/siteContent.ts";
  import { Container, Text } from "#src/lib/base/index.ts";
  import { Page } from "#src/lib/components/index.ts";
  import { CodeEditor } from "#src/lib/prebuilt/index.ts";

  const pageData = (
    documentationRegistry as unknown as Record<
      string,
      Record<string, { title: string; description: string; sections: Array<Record<string, unknown>> }>
    >
  ).pages["getting-started"];
  const introductionSection = pageData.sections.find((section) => section.id === "introduction") as unknown as { title: string; content: string };
  const architectureSection = pageData.sections.find((section) => section.id === "architecture") as unknown as {
    title: string;
    description: string;
    layers: Array<{ id: string; title: string; path: string; description: string }>;
  };
  const installationSection = pageData.sections.find((section) => section.id === "installation") as unknown as {
    title: string;
    steps: Array<{ id: string; title: string; description: string; code: string; language: string }>;
  };
  const usageSection = pageData.sections.find((section) => section.id === "usage") as unknown as {
    title: string;
    description: string;
    code: string;
    language: string;
  };
  const neighborLinks = findDocumentationNeighborLinks("/documentation/getting-started");
</script>

<Page id="getting-started-page" variant="site-page" title={pageData.title} description={pageData.description}>
  <Container id="getting-started-main-container" class="doc-page">
    <Container id="getting-started-intro-container" class="doc-header layer-tone-introduction">
      <Container id="getting-started-kicker" class="doc-kicker">
        <Text id="getting-started-chip" type="span" class="doc-badge">Introduction</Text>
        <Text id="getting-started-kicker-text" type="span" class="doc-kicker-note">Guide · Part 01</Text>
      </Container>
      <Text id="getting-started-heading" type="h1" class="doc-title">{introductionSection.title}</Text>
      <Text id="getting-started-description" class="doc-deck">{introductionSection.content}</Text>
    </Container>

    <Container id="getting-started-architecture-container" class="doc-section">
      <Container id="getting-started-architecture-head" class="doc-section-head">
        <Text id="getting-started-architecture-number" type="span" class="doc-section-index">01</Text>
        <Text id="getting-started-structure-heading" type="h2" class="doc-section-title">{architectureSection.title}</Text>
      </Container>
      <Text id="getting-started-structure-description" class="doc-prose doc-prose-muted">{architectureSection.description}</Text>

      <Container id="getting-started-layers-index" class="guide-layer-list">
        {#each architectureSection.layers as layer (layer.id)}
          <Container id={`getting-started-${layer.id}-layer-item`} class="guide-layer-item">
            <Text id={`getting-started-${layer.id}-layer-index`} type="span" class="guide-layer-index">{layerNumerals[layer.id]}</Text>
            <Container id={`getting-started-${layer.id}-layer-heading`} class="guide-layer-main">
              <Text id={`getting-started-${layer.id}-layer-title`} type="h3" class="guide-layer-title">{layer.title}</Text>
              <Text id={`getting-started-${layer.id}-layer-path`} type="code" class="guide-layer-path">{layer.path}</Text>
              <Text id={`getting-started-${layer.id}-layer-description`} class="guide-layer-description">{layer.description}</Text>
            </Container>
          </Container>
        {/each}
      </Container>
    </Container>

    <Container id="getting-started-installation-container" class="doc-section">
      <Container id="getting-started-installation-head" class="doc-section-head">
        <Text id="getting-started-installation-number" type="span" class="doc-section-index">02</Text>
        <Text id="getting-started-installation-heading" type="h2" class="doc-section-title">{installationSection.title}</Text>
      </Container>

      <Container id="getting-started-steps-container" class="guide-steps">
        {#each installationSection.steps as step, stepIndex (step.id)}
          <Container id={`getting-started-${step.id}-container`} class="guide-step">
            <Container id={`getting-started-${step.id}-heading-row`} class="guide-step-head">
              <Text id={`getting-started-${step.id}-index`} type="span" class="guide-step-index">{String(stepIndex + 1).padStart(2, "0")}</Text>
              <Text id={`getting-started-${step.id}-heading`} type="h3" class="guide-step-title">{step.title}</Text>
            </Container>
            <Text id={`getting-started-${step.id}-description`} class="doc-prose doc-prose-muted">{step.description}</Text>
            <Container id={`getting-started-${step.id}-frame`} class="doc-code">
              <Container id={`getting-started-${step.id}-caption`} class="doc-code-caption">
                <Text id={`getting-started-${step.id}-caption-title`} type="span">{step.title}</Text>
                <Text id={`getting-started-${step.id}-caption-language`} type="span">{step.language ?? "bash"}</Text>
              </Container>
              <Container id={`getting-started-${step.id}-code-frame`} class="doc-code-body">
                <CodeEditor
                  tokenThemeMapping={codeEditorTokenThemeMapping}
                  differenceThemeMapping={codeEditorDifferenceThemeMapping}
                  id={`getting-started-${step.id}-code`}
                  codeContent={{ sourceCode: step.code }}
                  language={step.language ?? "bash"}
                  tokenizer={resolveSvelteTokenizerForLanguage(step.language ?? "bash")}
                />
              </Container>
            </Container>
          </Container>
        {/each}
      </Container>
    </Container>

    <Container id="getting-started-usage-container" class="doc-section">
      <Container id="getting-started-usage-head" class="doc-section-head">
        <Text id="getting-started-usage-number" type="span" class="doc-section-index">03</Text>
        <Text id="getting-started-usage-heading" type="h2" class="doc-section-title">{usageSection.title}</Text>
      </Container>
      <Text id="getting-started-usage-description" class="doc-prose doc-prose-muted">{usageSection.description}</Text>
      <Container id="getting-started-usage-frame" class="doc-code">
        <Container id="getting-started-usage-caption" class="doc-code-caption">
          <Text id="getting-started-usage-caption-title" type="span">Usage</Text>
          <Text id="getting-started-usage-caption-language" type="span">{usageSection.language ?? "svelte"}</Text>
        </Container>
        <Container id="getting-started-usage-code-frame" class="doc-code-body">
          <CodeEditor
            tokenThemeMapping={codeEditorTokenThemeMapping}
            differenceThemeMapping={codeEditorDifferenceThemeMapping}
            id="getting-started-usage-code"
            codeContent={{ sourceCode: usageSection.code }}
            language={usageSection.language ?? "svelte"}
            tokenizer={resolveSvelteTokenizerForLanguage(usageSection.language ?? "svelte")}
          />
        </Container>
      </Container>
    </Container>

    <DocumentationPager idPrefix="getting-started-pager" previousLink={neighborLinks.previousLink} nextLink={neighborLinks.nextLink} />
  </Container>
</Page>
