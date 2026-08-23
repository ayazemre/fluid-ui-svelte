<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { mergeClasses } from '$lib/utilities/common';
	import type { Snippet } from 'svelte';

	let {
		checked = $bindable(false),
		indeterminate = false,
		disabled = false,
		label,
		variant = '',
		class: className = '',
		overrideDefaultStyling = false,
		onclick,
		...rest
	}: {
		checked?: boolean;
		indeterminate?: boolean;
		disabled?: boolean;
		label?: string | Snippet;
		variant?: string;
		class?: string;
		overrideDefaultStyling?: boolean;
		onclick?: (event: Event, checked: boolean) => Promise<unknown> | void;
	} & Omit<HTMLInputAttributes, 'checked' | 'type' | 'onclick'> = $props();

	let inputElement = $state<HTMLInputElement | null>(null);

	$effect(() => {
		if (inputElement) {
			inputElement.indeterminate = indeterminate;
		}
	});
</script>

<label
	class={mergeClasses(
		className,
		overrideDefaultStyling
			? ''
			: mergeClasses(
					'fluid-checkbox-container inline-flex cursor-pointer items-center gap-2',
					disabled ? 'cursor-not-allowed opacity-50' : '',
					variant ? `fluid-checkbox-${variant}` : ''
				)
	)}
>
	<input
		bind:this={inputElement}
		type="checkbox"
		bind:checked
		{disabled}
		onclick={async (event: Event) => {
			if (onclick) {
				await onclick(event, checked);
			}
		}}
		{...rest}
		class={overrideDefaultStyling ? '' : 'fluid-checkbox-input'}
	/>
	{#if label}
		<span class={overrideDefaultStyling ? '' : 'fluid-checkbox-label text-sm select-none'}>
			{#if typeof label === 'string'}
				{label}
			{:else}
				{@render label()}
			{/if}
		</span>
	{/if}
</label>
