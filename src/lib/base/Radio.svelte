<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { mergeClasses } from '$lib/utilities/common';
	import type { Snippet } from 'svelte';

	let {
		value,
		group = $bindable(''),
		disabled = false,
		label,
		variant = '',
		class: className = '',
		overrideDefaultStyling = false,
		...rest
	}: {
		value: string;
		group?: string;
		disabled?: boolean;
		label?: string | Snippet;
		variant?: string;
		class?: string;
		overrideDefaultStyling?: boolean;
	} & Omit<HTMLInputAttributes, 'type' | 'value'> = $props();
</script>

<label
	class={mergeClasses(
		className,
		overrideDefaultStyling
			? ''
			: mergeClasses(
					'fluid-radio-container inline-flex cursor-pointer items-center gap-2',
					disabled ? 'cursor-not-allowed opacity-50' : '',
					variant ? `fluid-radio-${variant}` : ''
				)
	)}
>
	<input
		type="radio"
		{value}
		bind:group
		{disabled}
		{...rest}
		class={overrideDefaultStyling ? '' : 'fluid-radio-input'}
	/>
	{#if label}
		<span class={overrideDefaultStyling ? '' : 'fluid-radio-label text-sm select-none'}>
			{#if typeof label === 'string'}
				{label}
			{:else}
				{@render label()}
			{/if}
		</span>
	{/if}
</label>
