<script lang="ts">
	import { Container, Button } from '$lib/base';
	import { mergeClasses } from '$lib/utilities/common';
	import { slide, type TransitionConfig } from 'svelte/transition';
	import { type Snippet } from 'svelte';

	const {
		variant = '',
		componentId,
		header,
		body,
		transitionFunction = slide,
		transitionDuration = 250
	}: {
		variant?: string;
		componentId?: string;
		header: Snippet<[options: { isExpanded: boolean }]>;
		body: Snippet;
		transitionFunction?: (node: Element, params?: any) => TransitionConfig;
		transitionDuration?: number;
	} = $props();
	const componentState = $state({ isExpanded: false });
</script>

<Container id={componentId} class={mergeClasses(variant, 'fluid-accordion-wrapper flex')}>
	<Button
		onclick={async () => {
			componentState.isExpanded = !componentState.isExpanded;
		}}
		class={mergeClasses(
			variant,
			'fluid-accordion-header flex w-full cursor-pointer flex-nowrap justify-between'
		)}
	>
		{@render header(componentState)}
	</Button>
	{#if componentState.isExpanded}
		<Container
			transitionFn={transitionFunction}
			transitionParams={{ duration: transitionDuration }}
			class={mergeClasses(variant, 'fluid-accordion-body')}
		>
			{@render body()}
		</Container>
	{/if}
</Container>
