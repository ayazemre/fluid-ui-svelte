<script lang="ts">
	import { Container } from '$lib/base/index.js';
	import { mergeClasses } from '$lib/utilities/mergeClasses.js';
	import { fade, fly, type TransitionConfig } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	let {
		variation = '',
		componentId,
		isOpen = $bindable(false),
		position = 'left',
		closeOnBackdropClick = true,
		scrollLock = true,
		transitionFn = (node: Element, params?: any) => {
			return {};
		},
		transitionParams = {},
		backdropTransitionFn = (node: Element, params?: any) => {
			return {};
		},
		backdropTransitionParams,
		children
	}: {
		isOpen?: boolean;
		position?: 'left' | 'right' | 'top' | 'bottom';
		closeOnBackdropClick?: boolean;
		scrollLock?: boolean;
		variation?: string;
		componentId?: string;
		transitionFn?: (node: Element, params?: any) => TransitionConfig;
		transitionParams?: TransitionConfig & { x?: number; y?: number };
		backdropTransitionFn?: (node: Element, params?: any) => TransitionConfig;
		backdropTransitionParams?: TransitionConfig & { x?: number; y?: number };
		children: Snippet;
	} = $props();

	// Programmatic anchoring mapping to avoid repetitive CSS classes
	const positionClasses: Record<string, string> = {
		left: 'left-0 top-0 bottom-0 h-full border-r',
		right: 'right-0 top-0 bottom-0 h-full border-l',
		top: 'top-0 right-0 left-0 w-full border-b',
		bottom: 'bottom-0 right-0 left-0 w-full border-t'
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && isOpen) {
			isOpen = false;
		}
	};

	$effect(() => {
		if (isOpen) {
			const originalStyle = window.getComputedStyle(document.body).overflow;
			if (scrollLock) document.body.style.overflow = 'hidden';
			window.addEventListener('keydown', handleKeyDown);

			return () => {
				if (scrollLock) document.body.style.overflow = originalStyle;
				window.removeEventListener('keydown', handleKeyDown);
			};
		}
	});
</script>

{#if isOpen}
	<Container
		id={componentId}
		class={mergeClasses(variation, 'fluid-drawer-container')}
		transitionFn={backdropTransitionFn}
		transitionParams={backdropTransitionParams}
		onclick={async () => {
			if (closeOnBackdropClick) isOpen = false;
		}}
		overrideDefaultStyling
	>
		<Container
			role="dialog"
			aria-modal="true"
			onclick={(event) => event.stopPropagation()}
			class={mergeClasses(variation, `fluid-drawer-panel ${positionClasses[position]}`)}
			{transitionFn}
			{transitionParams}
			overrideDefaultStyling
		>
			{@render children()}
		</Container>
	</Container>
{/if}
