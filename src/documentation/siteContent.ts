export const fluidUiGithubUrl = "https://github.com/ayazemre/fluid-ui-svelte";

export const landingHeroContent: LandingHeroContent = {
  eyebrow: "Svelte 5 component library",
  headline: "Build interfaces in three layers.",
  lede: "Semantic base elements, focused components, and complete workflows. Each layer builds on the one below it, so markup stays consistent from the first button to the last form.",
  primaryActionHref: "/documentation/getting-started",
  primaryActionLabel: "Get started",
  secondaryActionLabel: "View on GitHub",
};

export type LandingHeroContent = {
  eyebrow: string;
  headline: string;
  lede: string;
  primaryActionLabel: string;
  primaryActionHref: string;
  secondaryActionLabel: string;
};

export const layerNumerals: Record<string, string> = {
  base: "I",
  components: "II",
  prebuilt: "III",
};

export const landingLayers: Array<LandingLayer> = [
  {
    id: "base",
    name: "Base",
    numeral: "I",
    summary: "Semantic wrappers around native elements. They keep markup consistent and accept your classes.",
  },
  {
    id: "components",
    name: "Components",
    numeral: "II",
    summary: "Interactive pieces built from base elements. They hold visual behavior and no business logic.",
  },
  {
    id: "prebuilt",
    name: "Prebuilt",
    numeral: "III",
    summary: "Complete workflows assembled from base elements and components, ready to place in a page.",
  },
];

export const landingBreadcrumbItems: Array<LandingBreadcrumbItem> = [
  { href: "/", label: "Home" },
  { href: "/documentation/getting-started", label: "Documentation" },
  { href: "/documentation/cookbook", label: "Cookbook" },
];

export type LandingLayer = {
  id: string;
  name: string;
  numeral: string;
  summary: string;
};

export type LandingBreadcrumbItem = {
  href: string;
  label: string;
};
