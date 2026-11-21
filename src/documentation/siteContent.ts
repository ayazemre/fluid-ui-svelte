export const fluidUiGithubUrl = "https://github.com/ayazemre/fluid-ui-svelte";

export const landingHeroContent: LandingHeroContent = {
  eyebrow: "Svelte 5 component library",
  headline: "Build interfaces in three layers.",
  lede: "Semantic base elements, focused components, and complete workflows. Each layer builds on the one below it, so markup stays consistent from the first button to the last form.",
  primaryActionHref: "/documentation/getting-started",
  primaryActionLabel: "Get started",
  secondaryActionLabel: "View on GitHub",
};

export function buildSectionNumber(sectionOrdinal: number): string {
  return String(sectionOrdinal).padStart(2, "0");
}

export type LandingHeroContent = {
  eyebrow: string;
  headline: string;
  lede: string;
  primaryActionLabel: string;
  primaryActionHref: string;
  secondaryActionLabel: string;
};
