<script lang="ts">
  import Icon from "@iconify/svelte";

  import { fluidUiGithubUrl, landingBreadcrumbItems, landingLayers } from "#src/documentation/siteContent.ts";
  import { Button, Container, Link, Text } from "#src/lib/base/index.ts";
  import { Accordion, Page } from "#src/lib/components/index.ts";
  import { Breadcrumb } from "#src/lib/prebuilt/index.ts";
</script>

<Page
  id="home-page"
  variant="site-page"
  title="Fluid UI"
  description="Fluid UI is a pragmatic Svelte component library featuring a layered architecture of semantic base elements, focused components, and prebuilt workflows."
>
  <Container id="home-hero-section" type="section" class="landing-hero">
    <Text id="home-hero-eyebrow" type="span" class="landing-eyebrow">Svelte 5 component library</Text>
    <Text id="home-hero-heading" type="h1" class="landing-title">Fluid UI</Text>
    <Text id="home-hero-lede" class="landing-lede">
      Semantic base elements, focused components, and prebuilt workflows. Each layer is built on the one below it.
    </Text>
    <Container id="home-hero-actions" class="landing-actions">
      <Link id="home-get-started-link" href="/documentation/getting-started" class="site-cta site-cta--solid">
        Get Started
        <Icon icon="ri:arrow-right-line" class="size-4" />
      </Link>
      <Link id="home-github-link" href={fluidUiGithubUrl} target="_blank" rel="noreferrer" class="site-cta site-cta--ghost">
        <Icon icon="ri:github-fill" class="size-4" />
        GitHub
      </Link>
    </Container>
  </Container>

  <Container id="home-layers-section" type="section" class="landing-layers-section">
    <Container id="home-layers-grid" class="landing-layers">
      {#each landingLayers as layer (layer.id)}
        <Container id={`home-layer-${layer.id}`} class={`landing-layer layer-tone-${layer.id}`}>
          <Container id={`home-layer-head-${layer.id}`} class="landing-layer-head">
            <Text id={`home-layer-numeral-${layer.id}`} type="span" class="landing-numeral">{layer.numeral}</Text>
            <Text id={`home-layer-name-${layer.id}`} type="h2" class="landing-layer-name">{layer.name}</Text>
          </Container>
          <Text id={`home-layer-summary-${layer.id}`} class="landing-layer-summary">{layer.summary}</Text>

          {#if layer.id === "base"}
            <Container id="home-layer-stage-base" class="landing-stage">
              <Button id="home-example-button-primary" class="fluid-button-primary" onclick={async () => {}}>Save</Button>
              <Button id="home-example-button-outline" class="fluid-button-outline" onclick={async () => {}}>Cancel</Button>
            </Container>
          {:else if layer.id === "components"}
            <Container id="home-layer-stage-components" class="landing-stage">
              <Accordion id="home-example-accordion">
                {#snippet header({ isExpanded })}
                  <Container id="home-example-accordion-header" class="landing-accordion-header">
                    <Text id="home-example-accordion-title">Delivery</Text>
                    <Icon icon={isExpanded ? "ri:subtract-line" : "ri:add-line"} class="size-4" />
                  </Container>
                {/snippet}
                {#snippet body()}
                  <Text id="home-example-accordion-body" class="landing-accordion-body">Orders ship within two business days.</Text>
                {/snippet}
              </Accordion>
            </Container>
          {:else}
            <Container id="home-layer-stage-prebuilt" class="landing-stage">
              <Breadcrumb id="home-example-breadcrumb" items={landingBreadcrumbItems} />
            </Container>
          {/if}
        </Container>
      {/each}
    </Container>
  </Container>

  <Container id="home-footer" type="footer" class="site-colophon">
    <Container id="home-footer-inner" class="site-colophon-inner">
      <Text id="home-footer-wordmark" type="span" class="site-colophon-wordmark">Fluid <em>UI</em></Text>
      <Text id="home-footer-copyright-text" class="site-colophon-note">{"© Fluid UI " + new Date().getFullYear()}</Text>
    </Container>
  </Container>
</Page>
