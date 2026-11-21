<script lang="ts">
  import { documentationRegistry } from "#src/documentation/documentation.ts";
  import { findDocumentationNeighborLinks, toDocumentationPageName } from "#src/documentation/documentationNavigation.ts";
  import DocumentationPager from "#src/documentation/DocumentationPager.svelte";
  import { resolveSvelteTokenizerForLanguage } from "#src/documentation/samples/codeEditorSvelteTokenizer.ts";
  import { codeEditorDifferenceThemeMapping, codeEditorTokenThemeMapping } from "#src/documentation/samples/codeEditorThemes.ts";
  import { buildSectionNumber } from "#src/documentation/siteContent.ts";
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
  const neighborLinks = findDocumentationNeighborLinks("/documentation/cookbook");

  function buildSectionAnchorId(sectionId: string): string {
    return `cookbook-${sectionId}-container`;
  }
</script>

<Page id="cookbook-page" variant="site-page" title={pageData.title} description={pageData.description}>
  <Container id="cookbook-main-container" class="doc-page">
    <Container id="cookbook-header-container" class="doc-header layer-tone-introduction">
      <Container id="cookbook-kicker" class="doc-kicker">
        <Text id="cookbook-eyebrow" type="span" class="doc-badge">Cookbook</Text>
        <Text id="cookbook-kicker-text" type="span" class="doc-kicker-note">Guide</Text>
      </Container>
      <Text id="cookbook-title-text" type="h1" class="doc-title">{pageName}</Text>
      <Text id="cookbook-description-text" class="doc-deck">{pageData.description}</Text>

      <Container id="cookbook-contents-container" type="nav" class="doc-contents">
        <Text id="cookbook-contents-heading" type="span" class="doc-contents-heading">On this page</Text>
        <Container id="cookbook-contents-list" class="doc-contents-list">
          {#each sections as section, sectionIndex (section.id)}
            <Link id={`cookbook-contents-link-${section.id}`} href={`#${buildSectionAnchorId(section.id)}`} class="doc-contents-link">
              <Text id={`cookbook-contents-index-${section.id}`} type="span" class="doc-contents-index">{buildSectionNumber(sectionIndex + 1)}</Text>
              <Text id={`cookbook-contents-title-${section.id}`} type="span">{section.title}</Text>
            </Link>
          {/each}
        </Container>
      </Container>
    </Container>

    {#each sections as section, sectionIndex (section.id)}
      <Container id={buildSectionAnchorId(section.id)} class="doc-section">
        <Container id={`cookbook-${section.id}-head`} class="doc-section-head">
          <Text id={`cookbook-${section.id}-number`} type="span" class="doc-section-index">{buildSectionNumber(sectionIndex + 1)}</Text>
          <Text id={`cookbook-${section.id}-heading`} type="h2" class="doc-section-title">{section.title}</Text>
        </Container>

        {#if section.description}
          <Text id={`cookbook-${section.id}-description`} class="doc-prose doc-prose-muted">{section.description}</Text>
        {/if}

        {#if section.content}
          <Text id={`cookbook-${section.id}-body`} class="doc-prose">{section.content}</Text>
        {/if}

        {#if section.warning}
          <Container id={`cookbook-${section.id}-warning`} class="doc-note">
            <Text id={`cookbook-${section.id}-warning-text`} type="span">
              <Text id={`cookbook-${section.id}-warning-label`} type="span" class="doc-note-label">Note</Text>
              {section.warning}
            </Text>
          </Container>
        {/if}

        {#if section.code}
          <Container id={`cookbook-${section.id}-frame`} class="doc-code">
            <Container id={`cookbook-${section.id}-caption`} class="doc-code-caption">
              <Text id={`cookbook-${section.id}-caption-title`} type="span">{section.title}</Text>
              <Text id={`cookbook-${section.id}-caption-language`} type="span">{section.language ?? "svelte"}</Text>
            </Container>
            <Container id={`cookbook-${section.id}-code-frame`} class="doc-code-body">
              <CodeEditor
                tokenThemeMapping={codeEditorTokenThemeMapping}
                differenceThemeMapping={codeEditorDifferenceThemeMapping}
                id={`cookbook-${section.id}-code`}
                codeContent={{ sourceCode: section.code }}
                language={section.language ?? "svelte"}
                tokenizer={resolveSvelteTokenizerForLanguage(section.language ?? "svelte")}
              />
            </Container>
          </Container>
        {/if}

        {#if section.codeSamples}
          {#each section.codeSamples as codeSample, codeSampleIndex (codeSample.caption)}
            <Container id={`cookbook-${section.id}-sample-${codeSampleIndex}-frame`} class="doc-code">
              <Container id={`cookbook-${section.id}-sample-${codeSampleIndex}-caption`} class="doc-code-caption">
                <Text id={`cookbook-${section.id}-sample-${codeSampleIndex}-caption-title`} type="span">{codeSample.caption}</Text>
                <Text id={`cookbook-${section.id}-sample-${codeSampleIndex}-caption-language`} type="span">{codeSample.language}</Text>
              </Container>
              <Container id={`cookbook-${section.id}-sample-${codeSampleIndex}-code-frame`} class="doc-code-body">
                <CodeEditor
                  tokenThemeMapping={codeEditorTokenThemeMapping}
                  differenceThemeMapping={codeEditorDifferenceThemeMapping}
                  id={`cookbook-${section.id}-sample-${codeSampleIndex}-code`}
                  codeContent={{ sourceCode: codeSample.code }}
                  language={codeSample.language}
                  tokenizer={resolveSvelteTokenizerForLanguage(codeSample.language)}
                />
              </Container>
            </Container>
          {/each}
        {/if}
      </Container>
    {/each}

    <DocumentationPager idPrefix="cookbook-pager" previousLink={neighborLinks.previousLink} nextLink={neighborLinks.nextLink} />
  </Container>
</Page>
