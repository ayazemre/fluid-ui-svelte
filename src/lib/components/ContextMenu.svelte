<script lang="ts">
	import { Container } from '$lib/base';
	import { mergeClasses } from '$lib/utilities/common';
	import { calculateContextMenuPosition } from '$lib/utilities/contextMenu';
	import { fade } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	let {
		trigger,
		menu,
		variant = '',
		componentId = crypto.randomUUID(),
		onOpen,
		onClose
	}: {
		trigger: Snippet;
		menu: Snippet<[{ close: () => void }]>;
		variant?: string;
		componentId?: string;
		onOpen?: () => void;
		onClose?: () => void;
	} = $props();

	let isOpen = $state(false);
	let position = $state({ x: 0, y: 0 });
	let menuElement = $state<HTMLDivElement | null>(null);

	function open(event: MouseEvent) {
		event.preventDefault();
		const estimatedWidth = menuElement?.offsetWidth || 200;
		const estimatedHeight = menuElement?.offsetHeight || 200;
		const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
		const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 768;

		position = calculateContextMenuPosition(
			event.clientX,
			event.clientY,
			estimatedWidth,
			estimatedHeight,
			windowWidth,
			windowHeight
		);

		isOpen = true;
		onOpen?.();
	}

	function close() {
		if (isOpen) {
			isOpen = false;
			onClose?.();
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isOpen) {
			close();
		}
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

<Container
	id={componentId}
	class={mergeClasses(
		'fluid-context-menu-wrapper relative inline-block',
		variant ? `fluid-context-menu-${variant}` : '',
		variant
	)}
	oncontextmenu={open}
>
	{@render trigger()}

	{#if isOpen}
		<!-- Backdrop -->
		<Container
			id={`${componentId}-backdrop`}
			class="fluid-context-menu-backdrop fixed inset-0 z-50"
			onclick={close}
			oncontextmenu={(e) => {
				e.preventDefault();
				close();
			}}
			role="presentation"
		/>

		<!-- Menu Panel -->
		<div
			bind:this={menuElement}
			id={`${componentId}-menu`}
			role="menu"
			tabindex={-1}
			class={mergeClasses(
				'fluid-context-menu-panel fixed z-50 min-w-[160px] rounded-md border border-border bg-surface-raised p-1 shadow-xl backdrop-blur-sm focus:outline-none',
				variant ? `fluid-context-menu-panel-${variant}` : ''
			)}
			style={`left: ${position.x}px; top: ${position.y}px`}
			transition:fade={{ duration: 100 }}
		>
			{@render menu({ close })}
		</div>
	{/if}
</Container>
