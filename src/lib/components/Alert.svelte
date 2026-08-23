<script lang="ts">
	import { Container, Text, Button } from '$lib/base';
	import { mergeClasses } from '$lib/utilities/common';
	import type { Snippet } from 'svelte';

	let {
		type = 'info',
		title,
		description,
		icon,
		children,
		dismissible = false,
		ondismiss,
		variant = '',
		componentId = crypto.randomUUID()
	}: {
		type?: 'info' | 'success' | 'warning' | 'error';
		title?: string;
		description?: string;
		icon?: Snippet;
		children?: Snippet;
		dismissible?: boolean;
		ondismiss?: (event: Event) => Promise<unknown> | void;
		variant?: string;
		componentId?: string;
	} = $props();

	let isDismissed = $state(false);

	async function handleDismiss(event: Event) {
		isDismissed = true;
		if (ondismiss) {
			await ondismiss(event);
		}
	}
</script>

{#if !isDismissed}
	<Container
		id={componentId}
		role="alert"
		class={mergeClasses(
			'fluid-alert-container flex items-start gap-3 rounded-md border p-4 text-sm',
			`fluid-alert-${type}`,
			variant ? `fluid-alert-${variant}` : '',
			variant
		)}
	>
		{#if icon}
			<Container class="fluid-alert-icon shrink-0">
				{@render icon()}
			</Container>
		{/if}

		<Container class="fluid-alert-body flex flex-1 flex-col gap-1">
			{#if title}
				<Text type="h4" class="fluid-alert-title leading-none font-semibold">{title}</Text>
			{/if}
			{#if description}
				<Text type="p" class="fluid-alert-description text-sm opacity-90">{description}</Text>
			{/if}
			{#if children}
				{@render children()}
			{/if}
		</Container>

		{#if dismissible}
			<Button
				aria-label="Dismiss alert"
				onclick={handleDismiss}
				overrideDefaultStyling
				class="fluid-alert-dismiss shrink-0 cursor-pointer p-1 opacity-70 transition-opacity hover:opacity-100"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</Button>
		{/if}
	</Container>
{/if}
