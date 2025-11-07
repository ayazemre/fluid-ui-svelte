<script lang="ts">
	import Container from '$lib/base/Container.svelte';
	import type { Snippet } from 'svelte';
	import { slide, type TransitionConfig } from 'svelte/transition';
	import Button from '../base/Button.svelte';
	const {
		header,
		body,
		transitionFunction = slide,
		transitionDuration = 250
	}: {
		header: Snippet<[options: { isExpanded: boolean }]>;
		body: Snippet;
		transitionFunction?: (node: Element, params?: any) => TransitionConfig;
		transitionDuration?: number;
	} = $props();
	const componentState = $state({ isExpanded: false });
</script>

<Button
	onclick={async () => {
		componentState.isExpanded = !componentState.isExpanded;
	}}
	class="fluid-accordion-trigger"
>
	<Container class="fluid-accordion-header">
		{@render header(componentState)}
	</Container>
	{#if componentState.isExpanded}
		<Container
			transitionFn={transitionFunction}
			transitionParams={{ duration: transitionDuration }}
			class="fluid-accordion-body"
		>
			{@render body()}
		</Container>
	{/if}
</Button>
