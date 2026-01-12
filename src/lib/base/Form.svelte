<script lang="ts">
	import type { HTMLFormAttributes } from 'svelte/elements';
	import { mergeClasses } from '$lib/utilities/common';
	import type { Snippet } from 'svelte';

	const {
		class: className = '',
		overrideDefaultStyling = false,
		children,
		...rest
	}: {
		class?: string;
		overrideDefaultStyling?: boolean;
		children: Snippet;
	} & Omit<HTMLFormAttributes, 'onsubmit'> = $props();
</script>

<form
	onsubmit={(event: SubmitEvent) => event.preventDefault()}
	novalidate
	{...rest}
	class={mergeClasses(className, overrideDefaultStyling ? '' : 'fluid-form flex')}
>
	{@render children()}
</form>
