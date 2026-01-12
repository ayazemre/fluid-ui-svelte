<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fly, fade } from 'svelte/transition';
	import { Container, Button, Text } from '$lib/base';
	import { mergeClasses } from '$lib/utilities/common';

	export interface Notification {
		id: string | number;
		message: string;
		type?: 'info' | 'success' | 'warning' | 'error';
		duration?: number;
	}

	let {
		items = $bindable([]),
		position = 'top-right',
		variant = ''
	}: {
		items: Notification[];
		position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
		variant?: string;
	} = $props();

	function remove(id: string | number) {
		items = items.filter((i) => i.id !== id);
	}

	$effect(() => {
		items.forEach((item) => {
			if (item.duration !== undefined && item.duration > 0) {
				const timeout = setTimeout(() => {
					remove(item.id);
				}, item.duration);
				return () => clearTimeout(timeout);
			}
		});
	});

	const flyParams = {
		'top-right': { x: 100, duration: 300 },
		'top-left': { x: -100, duration: 300 },
		'bottom-right': { x: 100, duration: 300 },
		'bottom-left': { x: -100, duration: 300 }
	};
</script>

<Container
	class={mergeClasses(variant, `fluid-notification-area fluid-notification-area-${position}`)}
>
	{#each items as item (item.id)}
		<div
			animate:flip={{ duration: 300 }}
			in:fly={flyParams[position]}
			out:fade={{ duration: 200 }}
			class={mergeClasses(variant, `fluid-notification fluid-notification-${item.type || 'info'}`)}
		>
			<div class="fluid-notification-content">
				<Text>{item.message}</Text>
			</div>
			<Button onclick={async () => remove(item.id)} class="fluid-notification-close p-0!">
				<span class="text-xl leading-none">&times;</span>
			</Button>
		</div>
	{/each}
</Container>
