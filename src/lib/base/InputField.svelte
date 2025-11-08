<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { mergeClasses } from '../utilities/mergeClasses.js';
	import { onMount } from 'svelte';
	import { inputFilter } from '../utilities/inputFilter.js';

	let {
		type = 'text',
		value = $bindable(''),
		class: className = '',
		characterFilter,
		overrideDefaultStyling = false,
		...rest
	}: {
		class?: string;
		type?: 'text' | 'password';
		characterFilter?: Array<string>;
		overrideDefaultStyling?: boolean;
	} & HTMLInputAttributes = $props();
	let inputElement: HTMLInputElement;
	onMount(() => {
		if (characterFilter) {
			inputElement.addEventListener('input', (event) => {
				inputFilter(event as any, characterFilter);
			});
		}
	});
</script>

<input
	bind:this={inputElement}
	bind:value
	{type}
	{...rest}
	class={mergeClasses(overrideDefaultStyling ? '' : className, 'fluid-input-field')}
/>
