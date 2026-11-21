import { error } from "@sveltejs/kit";

import { buildComponentLlmsMarkdown, buildLlmsResponse } from "#src/documentation/documentationMarkdown.ts";
import { documentationCategoryRegistries } from "#src/documentation/documentationNavigation.ts";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({ params }) => {
  const { category, slug } = params;

  if (!Object.hasOwn(documentationCategoryRegistries, category)) {
    error(404, "Category not found");
  }

  const categoryRegistry = documentationCategoryRegistries[category];

  if (!Object.hasOwn(categoryRegistry, slug)) {
    error(404, "Component not found");
  }

  return buildLlmsResponse(buildComponentLlmsMarkdown(categoryRegistry[slug], category));
};
