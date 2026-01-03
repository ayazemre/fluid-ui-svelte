<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { mergeClasses } from '../utilities/common.js';
	import { applyCharacterFilter } from '../utilities/inputField.js';

	let {
		type = 'text',
		value = $bindable(''),
		class: className = '',
		characterFilter,
		overrideDefaultStyling = false,
		oninput,
		...rest
	}: {
		class?: string;
		type?: 'text' | 'password';
		characterFilter?: Array<string>;
		overrideDefaultStyling?: boolean;
	} & HTMLInputAttributes = $props();
</script>

<input
	bind:value
	{type}
	oninput={(e) => {
		if (characterFilter) {
			value = applyCharacterFilter(characterFilter, value);
		}
		oninput?.(e as any);
	}}
	{...rest}
	class={mergeClasses(className, overrideDefaultStyling ? '' : 'fluid-input-field')}
/>
