<script lang="ts">
  import Icon from "@iconify/svelte";

  import { fluidUiGithubUrl, landingHeroContent } from "#src/documentation/siteContent.ts";
  import { Container, Link, Text } from "#src/lib/base/index.ts";
  import { Page } from "#src/lib/components/index.ts";
</script>

<Page
  id="home-page"
  variant="site-page"
  title="Fluid UI · Svelte 5 Component Library"
  description="Fluid UI is a Svelte 5 component library built in three layers: semantic base elements, focused components, and prebuilt workflows."
  url="https://fluidui.io/"
  siteName="Fluid UI"
  keywords="Svelte 5, SvelteKit, component library, UI components, design system"
>
  <Container id="home-stage" class="home-stage">
    <Container id="home-background" aria-hidden="true" class="home-background">
      <Container id="home-background-aurora" class="home-background-aurora"></Container>
    </Container>

    <Container id="home-hero" class="home-hero">
      <Text id="home-hero-eyebrow" type="span" class="home-eyebrow">{landingHeroContent.eyebrow}</Text>
      <Text id="home-hero-heading" type="h1" class="home-title">{landingHeroContent.headline}</Text>
      <Text id="home-hero-lede" class="home-lede">{landingHeroContent.lede}</Text>
      <Container id="home-hero-actions" class="home-actions">
        <Link id="home-get-started-link" href={landingHeroContent.primaryActionHref} class="home-button home-button-primary">
          {landingHeroContent.primaryActionLabel}
          <Icon icon="ri:arrow-right-line" class="size-4" />
        </Link>
        <Link id="home-github-link" href={fluidUiGithubUrl} target="_blank" rel="noreferrer" class="home-button home-button-secondary">
          <Icon icon="ri:github-fill" class="size-4" />
          {landingHeroContent.secondaryActionLabel}
        </Link>
      </Container>
    </Container>
  </Container>
</Page>
