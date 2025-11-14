<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { mergeClasses } from '../utilities/mergeClasses.js';
	import { onMount, type Snippet } from 'svelte';
	import { goto } from '$app/navigation';

	const {
		class: className = '',
		overrideDefaultStyling = false,
		children,
		...rest
	}: {
		class?: string;
		overrideDefaultStyling?: boolean;
		children: Snippet;
	} & HTMLAnchorAttributes = $props();
	let element: HTMLAnchorElement;

	onMount(() => {
		if (element) {
			element.addEventListener('click', async (event) => {
				event.preventDefault();
				event.stopPropagation();
				console.log(element.href);
				await goto(element.href);
			});
		}
	});
</script>

<a
	bind:this={element}
	{...rest}
	class={mergeClasses(className, overrideDefaultStyling ? '' : 'fluid-link')}
>
	{@render children()}</a
>
