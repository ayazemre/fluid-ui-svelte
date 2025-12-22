<script lang="ts">
	import Container from '$lib/base/Container.svelte';
	import type { Snippet } from 'svelte';
	import { slide, type TransitionConfig } from 'svelte/transition';
	import Button from '../base/Button.svelte';
	import { mergeClasses } from '../utilities/mergeClasses.js';

	const {
		variation = '',
		header,
		body,
		transitionFunction = slide,
		transitionDuration = 250
	}: {
		variation?: string;
		header: Snippet<[options: { isExpanded: boolean }]>;
		body: Snippet;
		transitionFunction?: (node: Element, params?: any) => TransitionConfig;
		transitionDuration?: number;
	} = $props();
	const componentState = $state({ isExpanded: false });
</script>

<Container class={mergeClasses(variation, 'fluid-accordion-wrapper')}>
	<Button
		onclick={async () => {
			componentState.isExpanded = !componentState.isExpanded;
		}}
		class={mergeClasses(variation, 'fluid-accordion-header')}
		overrideDefaultStyling
	>
		{@render header(componentState)}
	</Button>
	{#if componentState.isExpanded}
		<Container
			transitionFn={transitionFunction}
			transitionParams={{ duration: transitionDuration }}
			class={mergeClasses(variation, 'fluid-accordion-body')}
		>
			{@render body()}
		</Container>
	{/if}
</Container>