import { error } from '@sveltejs/kit';
import { componentRegistry } from '../../../../documentation/registry.js';

export function load({ params }) {
	const { category, slug } = params;

	// @ts-ignore
	const categoryRegistry = componentRegistry[category];

	if (!categoryRegistry) {
		throw error(404, 'Category not found');
	}

	const componentData = categoryRegistry[slug];

	if (!componentData) {
		throw error(404, 'Component not found');
	}

	// We return only the serializable data
	return {
		title: componentData.title,
		description: componentData.description,
		props: componentData.props,
		slug,
		category
	};
}
