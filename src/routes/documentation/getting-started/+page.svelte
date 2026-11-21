<script lang="ts">
  import { documentationRegistry } from "#src/documentation/documentation.ts";
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
</script>

<Page id="getting-started-page" variant="site-page" title={pageData.title} description={pageData.description}>
  <Container id="getting-started-main-container" class="article">
    <Container id="getting-started-intro-container" class="article-header layer-tone-introduction">
      <Container id="getting-started-kicker" class="article-kicker">
        <Text id="getting-started-chip" type="span" class="article-chip">Introduction</Text>
        <Text id="getting-started-kicker-text" type="span">Guide · Part 01</Text>
      </Container>
      <Text id="getting-started-heading" type="h1" class="article-title">{introductionSection.title}</Text>
      <Text id="getting-started-description" class="article-deck">{introductionSection.content}</Text>
    </Container>

    <Container id="getting-started-architecture-container" class="article-section">
      <Container id="getting-started-architecture-head" class="article-section-head">
        <Text id="getting-started-architecture-number" type="span" class="mag-section-number">01</Text>
        <Text id="getting-started-structure-heading" type="h2" class="article-section-heading">{architectureSection.title}</Text>
      </Container>
      <Text id="getting-started-structure-description" class="article-prose article-prose-muted">{architectureSection.description}</Text>

      <Container id="getting-started-layers-index" class="layer-index">
        {#each architectureSection.layers as layer (layer.id)}
          <Container id={`getting-started-${layer.id}-layer-item`} class="layer-index-item">
            <Text id={`getting-started-${layer.id}-layer-index`} type="span" class="layer-index-numeral">{layerNumerals[layer.id]}</Text>
            <Container id={`getting-started-${layer.id}-layer-heading`} class="layer-index-heading">
              <Text id={`getting-started-${layer.id}-layer-title`} type="h3" class="layer-index-title">{layer.title}</Text>
              <Text id={`getting-started-${layer.id}-layer-path`} type="code" class="layer-index-path">{layer.path}</Text>
            </Container>
            <Text id={`getting-started-${layer.id}-layer-description`} class="layer-index-summary">{layer.description}</Text>
          </Container>
        {/each}
      </Container>
    </Container>

    <Container id="getting-started-installation-container" class="article-section">
      <Container id="getting-started-installation-head" class="article-section-head">
        <Text id="getting-started-installation-number" type="span" class="mag-section-number">02</Text>
        <Text id="getting-started-installation-heading" type="h2" class="article-section-heading">{installationSection.title}</Text>
      </Container>

      <Container id="getting-started-steps-container" class="flex flex-col gap-12">
        {#each installationSection.steps as step, stepIndex (step.id)}
          <Container id={`getting-started-${step.id}-container`} class="flex flex-col gap-4">
            <Text id={`getting-started-${step.id}-heading`} type="h3" class="article-prose text-lg font-semibold">
              <Text id={`getting-started-${step.id}-index`} type="span" class="mag-section-number mr-3">
                {String(stepIndex + 1).padStart(2, "0")}
              </Text>
              {step.title}
            </Text>
            <Text id={`getting-started-${step.id}-description`} class="article-prose article-prose-muted">
              {step.description}
            </Text>
            <Container id={`getting-started-${step.id}-frame`} class="specimen dark">
              <Container id={`getting-started-${step.id}-caption`} class="specimen-caption">
                <Text id={`getting-started-${step.id}-caption-title`} type="span">{step.title}</Text>
                <Text id={`getting-started-${step.id}-caption-language`} type="span">{step.language ?? "bash"}</Text>
              </Container>
              <Container id={`getting-started-${step.id}-code-frame`} class="specimen-code">
                <CodeEditor
                  tokenThemeMapping={codeEditorTokenThemeMapping}
                  differenceThemeMapping={codeEditorDifferenceThemeMapping}
                  id={`getting-started-${step.id}-code`}
                  sourceCode={step.code}
                  language={step.language ?? "bash"}
                  tokenizer={resolveSvelteTokenizerForLanguage(step.language ?? "bash")}
                />
              </Container>
            </Container>
          </Container>
        {/each}
      </Container>
    </Container>

    <Container id="getting-started-usage-container" class="article-section">
      <Container id="getting-started-usage-head" class="article-section-head">
        <Text id="getting-started-usage-number" type="span" class="mag-section-number">03</Text>
        <Text id="getting-started-usage-heading" type="h2" class="article-section-heading">{usageSection.title}</Text>
      </Container>
      <Text id="getting-started-usage-description" class="article-prose article-prose-muted">{usageSection.description}</Text>
      <Container id="getting-started-usage-frame" class="specimen dark">
        <Container id="getting-started-usage-caption" class="specimen-caption">
          <Text id="getting-started-usage-caption-title" type="span">Usage</Text>
          <Text id="getting-started-usage-caption-language" type="span">{usageSection.language ?? "svelte"}</Text>
        </Container>
        <Container id="getting-started-usage-code-frame" class="specimen-code">
          <CodeEditor
            tokenThemeMapping={codeEditorTokenThemeMapping}
            differenceThemeMapping={codeEditorDifferenceThemeMapping}
            id="getting-started-usage-code"
            sourceCode={usageSection.code}
            language={usageSection.language ?? "svelte"}
            tokenizer={resolveSvelteTokenizerForLanguage(usageSection.language ?? "svelte")}
          />
        </Container>
      </Container>
    </Container>
  </Container>
</Page>
