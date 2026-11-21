import { documentationRegistry } from "./documentation.ts";

export const documentationSidebarGroups: Array<DocumentationNavigationGroup> = [
  {
    id: "introduction",
    label: "Introduction",
    links: [
      { label: "Getting Started", slug: "getting-started", url: "/documentation/getting-started" },
      { label: "Cookbook", slug: "cookbook", url: "/documentation/cookbook" },
    ],
  },
  { id: "base", label: "Base", links: buildCategoryLinks("base", documentationRegistry.base) },
  { id: "components", label: "Components", links: buildCategoryLinks("components", documentationRegistry.components) },
  { id: "prebuilt", label: "Prebuilt", links: buildCategoryLinks("prebuilt", documentationRegistry.prebuilt) },
];

export const documentationLlmGuideLink: DocumentationNavigationLink = {
  label: "LLM Guide",
  slug: "llm-guide",
  url: "/llm-protocol",
};

export const documentationCategoryLabels: Record<string, string> = {
  base: "Base Layer",
  components: "Components Layer",
  prebuilt: "Prebuilt Layer",
};

export const documentationCategoryRegistries: Record<string, Record<string, DocumentationEntry>> = {
  base: documentationRegistry.base,
  components: documentationRegistry.components,
  prebuilt: documentationRegistry.prebuilt,
};

export function findDocumentationNeighborLinks(currentUrl: string): DocumentationNeighborLinks {
  const pagerLinks = documentationSidebarGroups.flatMap((group) => group.links);
  const currentIndex = pagerLinks.findIndex((pagerLink) => pagerLink.url === currentUrl);
  if (currentIndex === -1) {
    return { nextLink: null, previousLink: null };
  }
  return {
    nextLink: pagerLinks[currentIndex + 1] ?? null,
    previousLink: pagerLinks[currentIndex - 1] ?? null,
  };
}

export function toDocumentationPageName(registryTitle: string): string {
  return registryTitle.replace("Fluid UI - ", "");
}

function buildCategoryLinks(categoryId: string, categoryRegistry: Record<string, DocumentationEntry>): Array<DocumentationNavigationLink> {
  return Object.entries(categoryRegistry)
    .map(([slug, entry]) => ({
      label: toDocumentationPageName(entry.title),
      slug,
      url: `/documentation/${categoryId}/${slug}`,
    }))
    .sort((firstLink, secondLink) => firstLink.label.localeCompare(secondLink.label));
}

export type DocumentationEntry = {
  description: string;
  props: Array<{ default: string; description: string; prop: string; type: string }>;
  title: string;
};

export type DocumentationNavigationLink = {
  label: string;
  slug: string;
  url: string;
};

export type DocumentationNavigationGroup = {
  id: string;
  label: string;
  links: Array<DocumentationNavigationLink>;
};

export type DocumentationNeighborLinks = {
  nextLink: DocumentationNavigationLink | null;
  previousLink: DocumentationNavigationLink | null;
};
