<script lang="ts">
	import { Container, Button, Text } from '$lib/base';
	import { mergeClasses } from '$lib/utilities/common';
	import type { Snippet } from 'svelte';

	export type TabItem = {
		id: string;
		label: string | Snippet;
		content?: Snippet;
		disabled?: boolean;
	};

	let {
		items = [],
		activeTabId = $bindable(''),
		orientation = 'horizontal',
		variant = '',
		componentId = crypto.randomUUID(),
		onTabChange
	}: {
		items: Array<TabItem>;
		activeTabId?: string;
		orientation?: 'horizontal' | 'vertical';
		variant?: string;
		componentId?: string;
		onTabChange?: (tabId: string) => Promise<unknown> | void;
	} = $props();

	let effectiveTabId = $derived.by(() => {
		const selectedTab = items.find((item) => item.id === activeTabId && !item.disabled);
		return selectedTab?.id ?? items.find((item) => !item.disabled)?.id ?? '';
	});

	async function selectTab(tabId: string) {
		effectiveTabId = tabId;
		activeTabId = tabId;
		if (onTabChange) {
			await onTabChange(tabId);
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		const enabledTabs = items.filter((item) => !item.disabled);
		if (enabledTabs.length === 0) return;

		const currentIndex = enabledTabs.findIndex((item) => item.id === effectiveTabId);
		let nextIndex = -1;

		if (orientation === 'horizontal') {
			if (event.key === 'ArrowRight') {
				nextIndex = (currentIndex + 1) % enabledTabs.length;
			} else if (event.key === 'ArrowLeft') {
				nextIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
			}
		} else {
			if (event.key === 'ArrowDown') {
				nextIndex = (currentIndex + 1) % enabledTabs.length;
			} else if (event.key === 'ArrowUp') {
				nextIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
			}
		}

		if (event.key === 'Home') {
			nextIndex = 0;
		} else if (event.key === 'End') {
			nextIndex = enabledTabs.length - 1;
		}

		if (nextIndex !== -1) {
			event.preventDefault();
			const targetTab = enabledTabs[nextIndex];
			selectTab(targetTab.id);
			const tabElement = document.getElementById(`${componentId}-tab-${targetTab.id}`);
			tabElement?.focus();
		}
	}

	const activeItem = $derived(items.find((item) => item.id === effectiveTabId));
</script>

<Container
	id={componentId}
	class={mergeClasses(
		'fluid-tabs-container flex',
		orientation === 'vertical' ? 'flex-row gap-6' : 'flex-col gap-3',
		variant ? `fluid-tabs-${variant}` : '',
		variant
	)}
>
	<Container
		role="tablist"
		aria-orientation={orientation}
		onkeydown={handleKeyDown}
		tabindex={0}
		class={mergeClasses(
			'fluid-tabs-list flex',
			orientation === 'vertical' ? 'flex-col border-r' : 'flex-row border-b',
			variant ? `fluid-tabs-list-${variant}` : ''
		)}
	>
		{#each items as item (item.id)}
			<Button
				id={`${componentId}-tab-${item.id}`}
				role="tab"
				aria-selected={effectiveTabId === item.id}
				aria-controls={`${componentId}-panel-${item.id}`}
				tabindex={effectiveTabId === item.id ? 0 : -1}
				disabled={item.disabled}
				onclick={async () => {
					if (!item.disabled) {
						await selectTab(item.id);
					}
				}}
				overrideDefaultStyling
				class={mergeClasses(
					'fluid-tabs-tab cursor-pointer px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
					effectiveTabId === item.id ? 'fluid-tabs-tab-active font-semibold' : '',
					variant ? `fluid-tabs-tab-${variant}` : ''
				)}
			>
				{#if typeof item.label === 'string'}
					<Text type="span">{item.label}</Text>
				{:else}
					{@render item.label()}
				{/if}
			</Button>
		{/each}
	</Container>

	{#if activeItem && activeItem.content}
		<Container
			id={`${componentId}-panel-${activeItem.id}`}
			role="tabpanel"
			aria-labelledby={`${componentId}-tab-${activeItem.id}`}
			tabindex={0}
			class={mergeClasses('fluid-tabs-panel', variant ? `fluid-tabs-panel-${variant}` : '')}
		>
			{@render activeItem.content()}
		</Container>
	{/if}
</Container>
