import { error } from "@sveltejs/kit";

import {
  documentationCategoryLabels,
  documentationCategoryRegistries,
  findDocumentationNeighborLinks,
  toDocumentationPageName,
} from "#src/documentation/documentationNavigation.ts";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
  const { category, slug } = params;

  if (!Object.hasOwn(documentationCategoryRegistries, category)) {
    error(404, "Category not found");
  }

  const categoryRegistry = documentationCategoryRegistries[category];

  if (!Object.hasOwn(categoryRegistry, slug)) {
    error(404, "Component not found");
  }

  const componentData = categoryRegistry[slug];
  const neighborLinks = findDocumentationNeighborLinks(`/documentation/${category}/${slug}`);

  return {
    category,
    categoryLabel: documentationCategoryLabels[category],
    description: componentData.description,
    name: toDocumentationPageName(componentData.title),
    nextLink: neighborLinks.nextLink,
    previousLink: neighborLinks.previousLink,
    props: componentData.props,
    slug,
    title: componentData.title,
  };
};
