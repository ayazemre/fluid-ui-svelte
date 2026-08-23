<script lang="ts">
	import { Container } from '$lib/base';
	import { mergeClasses } from '$lib/utilities/common';

	let {
		shape = 'rectangle',
		width,
		height,
		variant = '',
		class: className = '',
		componentId = crypto.randomUUID()
	}: {
		shape?: 'rectangle' | 'circle' | 'text';
		width?: string;
		height?: string;
		variant?: string;
		class?: string;
		componentId?: string;
	} = $props();

	const shapeClasses = {
		rectangle: 'rounded-md',
		circle: 'rounded-full',
		text: 'rounded h-4 w-3/4 my-1'
	};

	const inlineStyle = $derived.by(() => {
		const styles: string[] = [];
		if (width) styles.push(`width: ${width}`);
		if (height) styles.push(`height: ${height}`);
		return styles.join('; ');
	});
</script>

<Container
	id={componentId}
	aria-hidden="true"
	class={mergeClasses(
		'fluid-skeleton animate-pulse bg-surface-sunken',
		shapeClasses[shape],
		className,
		variant ? `fluid-skeleton-${variant}` : '',
		variant
	)}
	style={inlineStyle || undefined}
/>
