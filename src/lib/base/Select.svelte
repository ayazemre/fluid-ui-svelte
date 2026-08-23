<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import { mergeClasses } from '$lib/utilities/common';
	import type { Snippet } from 'svelte';

	let {
		value = $bindable(''),
		options = [],
		placeholder,
		children,
		class: className = '',
		overrideDefaultStyling = false,
		...rest
	}: {
		value?: string;
		options?: Array<{ value: string; label: string; disabled?: boolean }>;
		placeholder?: string;
		children?: Snippet;
		class?: string;
		overrideDefaultStyling?: boolean;
	} & Omit<HTMLSelectAttributes, 'value'> = $props();
</script>

<select
	bind:value
	{...rest}
	class={mergeClasses(
		className,
		overrideDefaultStyling
			? ''
			: 'fluid-select cursor-pointer rounded-md bg-surface-raised p-2 text-content outline-1 outline-primary-500 transition-all focus:outline-2 focus:outline-primary-500 disabled:cursor-not-allowed disabled:opacity-50'
	)}
>
	{#if placeholder}
		<option value="" disabled selected={!value}>{placeholder}</option>
	{/if}
	{#if children}
		{@render children()}
	{:else}
		{#each options as option (option.value)}
			<option value={option.value} disabled={option.disabled}>
				{option.label}
			</option>
		{/each}
	{/if}
</select>
