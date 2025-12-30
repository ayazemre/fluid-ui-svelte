<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { mergeClasses } from '../utilities/mergeClasses.js';
	import { type Snippet } from 'svelte';

	const {
		onclick,
		class: className = '',
		overrideDefaultStyling = false,
		loadingPlaceholder,
		children,
		...rest
	}: {
		onclick: (event: Event, buttonState: { inProgress: boolean }) => Promise<unknown>;
		class?: string;
		overrideDefaultStyling?: boolean;
		loadingPlaceholder?: Snippet;
		children: Snippet;
	} & Omit<HTMLButtonAttributes, 'onclick'> = $props();

	let buttonState = $state({ inProgress: false });
</script>

<button
	type="button"
	onclick={async (event: Event) => onclick(event, buttonState)}
	{...rest}
	class={mergeClasses(className, overrideDefaultStyling ? '' : 'fluid-button')}
>
	{#if buttonState.inProgress && loadingPlaceholder}
		{@render loadingPlaceholder()}
	{:else}
		{@render children()}
	{/if}
</button>
