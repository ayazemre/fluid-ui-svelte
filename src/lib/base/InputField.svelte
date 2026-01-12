<script lang="ts">
	import type { HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements';
	import { mergeClasses } from '$lib/utilities/common';
	import { applyCharacterFilter } from '$lib/utilities/inputField';

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
		type?: 'text' | 'password' | 'textarea';
		value?: string;
		characterFilter?: Array<string>;
		overrideDefaultStyling?: boolean;
	} & Omit<HTMLInputAttributes, 'value' | 'type'> &
		Omit<HTMLTextareaAttributes, 'value'> = $props();
</script>

{#if type === 'textarea'}
	<textarea
		bind:value
		oninput={(e) => {
			if (characterFilter) {
				value = applyCharacterFilter(characterFilter, value);
			}
			oninput?.(e as any);
		}}
		{...rest as any}
		class={mergeClasses(className, overrideDefaultStyling ? '' : 'fluid-input-field')}
	></textarea>
{:else}
	<input
		bind:value
		{type}
		oninput={(e) => {
			if (characterFilter) {
				value = applyCharacterFilter(characterFilter, value);
			}
			oninput?.(e as any);
		}}
		{...rest as any}
		class={mergeClasses(className, overrideDefaultStyling ? '' : 'fluid-input-field')}
	/>
{/if}
