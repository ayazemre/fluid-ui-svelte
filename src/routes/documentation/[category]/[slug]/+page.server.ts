import { error } from "@sveltejs/kit";

import { documentationRegistry } from "#src/documentation/documentation.ts";

export function load({ params }) {
  const { category, slug } = params;

  // @ts-ignore
  const categoryRegistry = documentationRegistry[category];

  if (!categoryRegistry) {
    throw error(404, "Category not found");
  }

  const componentData = categoryRegistry[slug];

  if (!componentData) {
    throw error(404, "Component not found");
  }

  // We return only the serializable data
  return {
    category,
    description: componentData.description,
    props: componentData.props,
    slug,
    title: componentData.title,
  };
}
