<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { createDefaultStyling } from '../utilities/createDefaultStyling.js';
	import type { Snippet } from 'svelte';
	import type { TransitionConfig } from 'svelte/transition';

	const {
		type = 'div',
		class: className = '',
		transitionFn = (node: Element, params?: any) => {
			return {};
		},
		transitionParams,
		overrideDefaultStyling = false,
		children,
		...rest
	}: {
		type?: 'div' | 'nav' | 'section' | 'main' | 'header' | 'footer' | 'aside' | 'article';
		class?: string;
		transitionFn?: (node: Element, params?: any) => TransitionConfig;
		transitionParams?: TransitionConfig;
		overrideDefaultStyling?: boolean;
		children: Snippet;
	} & HTMLAttributes<HTMLElement> = $props();
</script>

<svelte:element
	this={type}
	{...rest}
	transition:transitionFn={transitionParams}
	class={createDefaultStyling(className, 'fluid-container', overrideDefaultStyling)}
>
	{@render children()}
</svelte:element>
