<script lang="ts">
	import { Container } from '$lib/base';
	import { mergeClasses } from '$lib/utilities/common';

	let {
		size = 'md',
		label = 'Loading...',
		class: className = '',
		variant = '',
		componentId = crypto.randomUUID()
	}: {
		size?: 'sm' | 'md' | 'lg' | 'xl';
		label?: string;
		class?: string;
		variant?: string;
		componentId?: string;
	} = $props();

	const sizeClasses = {
		sm: 'h-4 w-4 border-2',
		md: 'h-6 w-6 border-2',
		lg: 'h-8 w-8 border-3',
		xl: 'h-12 w-12 border-4'
	};
</script>

<Container
	id={componentId}
	role="status"
	aria-label={label}
	class={mergeClasses(
		'fluid-spinner inline-block animate-spin rounded-full border-solid border-current border-t-transparent',
		sizeClasses[size],
		className,
		variant ? `fluid-spinner-${variant}` : '',
		variant
	)}
>
	<span class="sr-only">{label}</span>
</Container>
