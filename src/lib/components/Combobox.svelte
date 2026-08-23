<script lang="ts">
	import { Container, Button, Text, InputField } from '$lib/base';
	import { mergeClasses } from '$lib/utilities/common';
	import {
		filterOptions,
		getNextSelectableIndex,
		type ComboboxOption
	} from '$lib/utilities/combobox';
	import { fade } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	let {
		options = [],
		value = $bindable(''),
		multiple = false,
		placeholder = 'Select option...',
		searchPlaceholder = 'Search...',
		disabled = false,
		variant = '',
		componentId = crypto.randomUUID(),
		itemTemplate
	}: {
		options: Array<ComboboxOption>;
		value?: string | string[];
		multiple?: boolean;
		placeholder?: string;
		searchPlaceholder?: string;
		disabled?: boolean;
		variant?: string;
		componentId?: string;
		itemTemplate?: Snippet<[{ option: ComboboxOption; isSelected: boolean }]>;
	} = $props();

	let isOpen = $state(false);
	let searchQuery = $state('');
	let highlightedIndex = $state(-1);

	const filteredOptions = $derived(filterOptions(options, searchQuery));

	const selectedValues = $derived(Array.isArray(value) ? value : value ? [value] : []);

	const displayLabel = $derived.by(() => {
		if (selectedValues.length === 0) return placeholder;
		if (multiple) {
			return `${selectedValues.length} selected`;
		}
		const matchingOption = options.find((option) => option.value === selectedValues[0]);
		return matchingOption ? matchingOption.label : placeholder;
	});

	function isOptionSelected(optionValue: string): boolean {
		return selectedValues.includes(optionValue);
	}

	function selectOption(option: ComboboxOption) {
		if (option.disabled) return;

		if (multiple) {
			const currentArray = Array.isArray(value) ? [...value] : [];
			const existsIndex = currentArray.indexOf(option.value);
			if (existsIndex >= 0) {
				currentArray.splice(existsIndex, 1);
			} else {
				currentArray.push(option.value);
			}
			value = currentArray;
		} else {
			value = option.value;
			isOpen = false;
			searchQuery = '';
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (!isOpen) {
			if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				isOpen = true;
			}
			return;
		}

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			highlightedIndex = getNextSelectableIndex(highlightedIndex, filteredOptions.length, 'next');
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			highlightedIndex = getNextSelectableIndex(
				highlightedIndex,
				filteredOptions.length,
				'previous'
			);
		} else if (event.key === 'Enter') {
			event.preventDefault();
			if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
				selectOption(filteredOptions[highlightedIndex]);
			}
		} else if (event.key === 'Escape') {
			event.preventDefault();
			isOpen = false;
		}
	}
</script>

<Container
	id={componentId}
	class={mergeClasses(
		'fluid-combobox-container relative inline-block w-full',
		variant ? `fluid-combobox-${variant}` : '',
		variant
	)}
	onkeydown={handleKeyDown}
>
	<Button
		aria-haspopup="listbox"
		aria-expanded={isOpen}
		{disabled}
		onclick={async () => {
			if (!disabled) isOpen = !isOpen;
		}}
		overrideDefaultStyling
		class={mergeClasses(
			'fluid-combobox-trigger flex w-full cursor-pointer items-center justify-between rounded-md border border-border bg-surface-raised px-3 py-2 text-sm text-content transition-all focus:outline-2 focus:outline-primary-500 disabled:cursor-not-allowed disabled:opacity-50',
			variant ? `fluid-combobox-trigger-${variant}` : ''
		)}
	>
		<Text
			type="span"
			class={selectedValues.length === 0 ? 'text-content-muted' : 'font-medium text-content'}
		>
			{displayLabel}
		</Text>
		<svg
			class="h-4 w-4 shrink-0 opacity-50"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</Button>

	{#if isOpen}
		<Container
			id={`${componentId}-backdrop`}
			class="fluid-combobox-backdrop fixed inset-0 z-40"
			onclick={() => (isOpen = false)}
			role="presentation"
		/>

		<Container
			id={`${componentId}-dropdown`}
			role="listbox"
			class={mergeClasses(
				'fluid-combobox-dropdown absolute top-full left-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-surface-raised p-1 shadow-lg backdrop-blur-sm',
				variant ? `fluid-combobox-dropdown-${variant}` : ''
			)}
			transitionFn={fade}
			transitionParams={{ duration: 150 }}
		>
			<Container class="p-1">
				<InputField
					bind:value={searchQuery}
					placeholder={searchPlaceholder}
					class="w-full text-xs"
					autofocus
				/>
			</Container>

			{#if filteredOptions.length === 0}
				<Container class="p-3 text-center text-xs text-content-muted">
					<Text type="span">No matching options</Text>
				</Container>
			{:else}
				{#each filteredOptions as option, index (option.value)}
					<Button
						role="option"
						aria-selected={isOptionSelected(option.value)}
						disabled={option.disabled}
						onclick={async () => selectOption(option)}
						overrideDefaultStyling
						class={mergeClasses(
							'fluid-combobox-item flex w-full cursor-pointer items-center justify-between rounded px-2.5 py-1.5 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40',
							isOptionSelected(option.value)
								? 'fluid-combobox-item-selected bg-primary-500 font-semibold text-on-accent'
								: highlightedIndex === index
									? 'bg-surface-hover text-content'
									: 'text-content hover:bg-surface-hover'
						)}
					>
						{#if itemTemplate}
							{@render itemTemplate({ option, isSelected: isOptionSelected(option.value) })}
						{:else}
							<Text type="span">{option.label}</Text>
							{#if isOptionSelected(option.value)}
								<svg
									class="h-3.5 w-3.5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2.5"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							{/if}
						{/if}
					</Button>
				{/each}
			{/if}
		</Container>
	{/if}
</Container>
