<script lang="ts">
  import { documentationRegistry } from "#src/documentation/documentation.ts";
  import { toDocumentationPageName } from "#src/documentation/documentationNavigation.ts";
  import { resolveSvelteTokenizerForLanguage } from "#src/documentation/samples/codeEditorSvelteTokenizer.ts";
  import { codeEditorDifferenceThemeMapping, codeEditorTokenThemeMapping } from "#src/documentation/samples/codeEditorThemes.ts";
  import { Container, Link, Text } from "#src/lib/base/index.ts";
  import { Page } from "#src/lib/components/index.ts";
  import { CodeEditor } from "#src/lib/prebuilt/index.ts";

  const pageData = (
    documentationRegistry as unknown as Record<
      string,
      Record<string, { title: string; description: string; sections: Array<Record<string, unknown>> }>
    >
  ).pages["cookbook"];
  const pageName = toDocumentationPageName(pageData.title);

  type CookbookSection = {
    id: string;
    title: string;
    description?: string;
    content?: string;
    code?: string;
    codeSamples?: Array<{ caption: string; code: string; language: string }>;
    language?: string;
    warning?: string;
  };

  const sections = pageData.sections as unknown as Array<CookbookSection>;

  function buildSectionAnchorId(sectionId: string): string {
    return `cookbook-${sectionId}-container`;
  }

  function buildSectionNumber(sectionIndex: number): string {
    return String(sectionIndex + 1).padStart(2, "0");
  }
</script>

<Page id="cookbook-page" variant="site-page" title={pageData.title} description={pageData.description}>
  <Container id="cookbook-main-container" class="article">
    <Container id="cookbook-header-container" class="article-header layer-tone-introduction">
      <Container id="cookbook-kicker" class="article-kicker">
        <Text id="cookbook-eyebrow" type="span" class="article-chip">Cookbook</Text>
        <Text id="cookbook-kicker-text" type="span">Guide · Part 02</Text>
      </Container>
      <Text id="cookbook-title-text" type="h1" class="article-title">{pageName}</Text>
      <Text id="cookbook-description-text" class="article-deck">{pageData.description}</Text>

      <Container id="cookbook-contents-container" type="nav" class="article-contents-wrapper">
        <Container id="cookbook-contents-list" class="article-contents">
          <Text id="cookbook-contents-heading" type="span" class="article-contents-heading">On this page</Text>
          {#each sections as section, sectionIndex (section.id)}
            <Link id={`cookbook-contents-link-${section.id}`} href={`#${buildSectionAnchorId(section.id)}`} class="article-contents-link">
              <Text id={`cookbook-contents-index-${section.id}`} type="span" class="article-contents-index">
                {buildSectionNumber(sectionIndex)}
              </Text>
              <Text id={`cookbook-contents-title-${section.id}`} type="span">{section.title}</Text>
            </Link>
          {/each}
        </Container>
      </Container>
    </Container>

    {#each sections as section, sectionIndex (section.id)}
      <Container id={buildSectionAnchorId(section.id)} class="article-section">
        <Container id={`cookbook-${section.id}-head`} class="article-section-head">
          <Text id={`cookbook-${section.id}-number`} type="span" class="mag-section-number">{buildSectionNumber(sectionIndex)}</Text>
          <Text id={`cookbook-${section.id}-heading`} type="h2" class="article-section-heading">{section.title}</Text>
        </Container>

        {#if section.description}
          <Text id={`cookbook-${section.id}-description`} class="article-prose article-prose-muted">{section.description}</Text>
        {/if}

        {#if section.content}
          <Text id={`cookbook-${section.id}-body`} class="article-prose">{section.content}</Text>
        {/if}

        {#if section.warning}
          <Container id={`cookbook-${section.id}-warning`} class="mag-callout">
            <Text id={`cookbook-${section.id}-warning-text`} type="span">
              <Text id={`cookbook-${section.id}-warning-label`} type="span" class="mag-callout-label">Note</Text>
              {section.warning}
            </Text>
          </Container>
        {/if}

        {#if section.code}
          <Container id={`cookbook-${section.id}-frame`} class="specimen dark">
            <Container id={`cookbook-${section.id}-caption`} class="specimen-caption">
              <Text id={`cookbook-${section.id}-caption-title`} type="span">{section.title}</Text>
              <Text id={`cookbook-${section.id}-caption-language`} type="span">{section.language ?? "svelte"}</Text>
            </Container>
            <Container id={`cookbook-${section.id}-code-frame`} class="specimen-code">
              <CodeEditor
                tokenThemeMapping={codeEditorTokenThemeMapping}
                differenceThemeMapping={codeEditorDifferenceThemeMapping}
                id={`cookbook-${section.id}-code`}
                sourceCode={section.code}
                language={section.language ?? "svelte"}
                tokenizer={resolveSvelteTokenizerForLanguage(section.language ?? "svelte")}
              />
            </Container>
          </Container>
        {/if}

        {#if section.codeSamples}
          {#each section.codeSamples as codeSample, codeSampleIndex (codeSample.caption)}
            <Container id={`cookbook-${section.id}-sample-${codeSampleIndex}-frame`} class="specimen dark">
              <Container id={`cookbook-${section.id}-sample-${codeSampleIndex}-caption`} class="specimen-caption">
                <Text id={`cookbook-${section.id}-sample-${codeSampleIndex}-caption-title`} type="span">{codeSample.caption}</Text>
                <Text id={`cookbook-${section.id}-sample-${codeSampleIndex}-caption-language`} type="span">{codeSample.language}</Text>
              </Container>
              <Container id={`cookbook-${section.id}-sample-${codeSampleIndex}-code-frame`} class="specimen-code">
                <CodeEditor
                  tokenThemeMapping={codeEditorTokenThemeMapping}
                  differenceThemeMapping={codeEditorDifferenceThemeMapping}
                  id={`cookbook-${section.id}-sample-${codeSampleIndex}-code`}
                  sourceCode={codeSample.code}
                  language={codeSample.language}
                  tokenizer={resolveSvelteTokenizerForLanguage(codeSample.language)}
                />
              </Container>
            </Container>
          {/each}
        {/if}
      </Container>
    {/each}
  </Container>
</Page>
