export const fluidUiGithubUrl = "https://github.com/ayazemre/fluid-ui-svelte";

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
  { href: "/documentation/conventions", label: "Conventions" },
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
