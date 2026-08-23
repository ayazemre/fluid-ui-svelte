<script lang="ts">
	import { Container, Text } from '$lib/base';
	import { mergeClasses } from '$lib/utilities/common';
	import { fade } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	let {
		text,
		content,
		trigger,
		position = 'top',
		delay = 200,
		variant = '',
		componentId = crypto.randomUUID()
	}: {
		text?: string;
		content?: Snippet;
		trigger: Snippet;
		position?: 'top' | 'bottom' | 'left' | 'right';
		delay?: number;
		variant?: string;
		componentId?: string;
	} = $props();

	let isOpen = $state(false);
	let timeoutId = $state<ReturnType<typeof setTimeout> | null>(null);

	function showTooltip() {
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			isOpen = true;
		}, delay);
	}

	function hideTooltip() {
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
		isOpen = false;
	}
</script>

<Container
	id={componentId}
	class={mergeClasses(
		'fluid-tooltip-container relative inline-block',
		variant ? `fluid-tooltip-${variant}` : '',
		variant
	)}
	onmouseenter={showTooltip}
	onmouseleave={hideTooltip}
	onfocusin={showTooltip}
	onfocusout={hideTooltip}
>
	<Container
		class="fluid-tooltip-trigger inline-block"
		aria-describedby={isOpen ? `${componentId}-content` : undefined}
	>
		{@render trigger()}
	</Container>

	{#if isOpen}
		<Container
			id={`${componentId}-content`}
			role="tooltip"
			class={mergeClasses(
				'fluid-tooltip-content pointer-events-none absolute z-50',
				position === 'top' ? 'bottom-full left-1/2 mb-2 -translate-x-1/2' : '',
				position === 'bottom' ? 'top-full left-1/2 mt-2 -translate-x-1/2' : '',
				position === 'left' ? 'top-1/2 right-full mr-2 -translate-y-1/2' : '',
				position === 'right' ? 'top-1/2 left-full ml-2 -translate-y-1/2' : '',
				variant ? `fluid-tooltip-content-${variant}` : ''
			)}
			transitionFn={fade}
			transitionParams={{ duration: 150 }}
		>
			{#if content}
				{@render content()}
			{:else if text}
				<Text type="span" class="fluid-tooltip-text text-xs whitespace-nowrap">{text}</Text>
			{/if}
		</Container>
	{/if}
</Container>
