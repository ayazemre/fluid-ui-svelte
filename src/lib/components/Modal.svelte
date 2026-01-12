<script lang="ts">
	import { Container } from '$lib/base';
	import { mergeClasses } from '$lib/utilities/common';
	import { fade, scale, type TransitionConfig } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	let {
		variant = '',
		componentId = crypto.randomUUID(),
		isOpen = $bindable(false),
		closeOnBackdropClick = true,
		scrollLock = true,
		transitionFn = scale,
		transitionParams = { duration: 200, start: 0.95 },
		backdropTransitionFn = fade,
		backdropTransitionParams = { duration: 200 },
		children
	}: {
		isOpen?: boolean;
		closeOnBackdropClick?: boolean;
		scrollLock?: boolean;
		variant?: string;
		componentId?: string;
		transitionFn?: (node: Element, params?: any) => TransitionConfig;
		transitionParams?: any;
		backdropTransitionFn?: (node: Element, params?: any) => TransitionConfig;
		backdropTransitionParams?: any;
		children: Snippet;
	} = $props();

	function close() {
		isOpen = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isOpen) {
			close();
		}
	}

	$effect(() => {
		if (isOpen) {
			const originalStyle = window.getComputedStyle(document.body).overflow;
			if (scrollLock) document.body.style.overflow = 'hidden';
			window.addEventListener('keydown', handleKeydown);

			return () => {
				if (scrollLock) document.body.style.overflow = originalStyle;
				window.removeEventListener('keydown', handleKeydown);
			};
		}
	});
</script>

{#if isOpen}
	<Container
		id={componentId}
		class={mergeClasses(variant, 'fluid-modal-container')}
		transitionFn={backdropTransitionFn}
		transitionParams={backdropTransitionParams}
		onclick={async () => {
			if (closeOnBackdropClick) close();
		}}
		role="dialog"
		aria-modal="true"
	>
		<div
			id="{componentId}-panel"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="presentation"
			class={mergeClasses(variant, 'fluid-modal-panel')}
			transition:transitionFn={transitionParams}
		>
			{@render children()}
		</div>
	</Container>
{/if}
