<script lang="ts" generics="T">
	import type { HTMLAttributes } from 'svelte/elements';
	import { mergeClasses } from '../utilities/common.js';
	import type { Snippet } from 'svelte';

	const {
		type = 'ul',
		items = [],
		itemTemplate,
		class: className = '',
		itemClass = '',
		overrideDefaultStyling = false,
		...rest
	}: {
		type?: 'ol' | 'ul';
		items: Array<T>;
		itemTemplate: Snippet<[T, number]>;
		class?: string;
		itemClass?: string;
		overrideDefaultStyling?: boolean;
	} & HTMLAttributes<HTMLUListElement | HTMLOListElement> = $props();

	const classes = {
		ol: 'fluid-ordered-list',
		ul: 'fluid-unordered-list'
	};
</script>

<svelte:element
	this={type}
	{...rest}
	class={mergeClasses(className, overrideDefaultStyling ? '' : classes[type])}
>
	{#each items as item, index}
		<li class={mergeClasses(itemClass, overrideDefaultStyling ? '' : classes[type] + '-item')}>
			{@render itemTemplate(item, index)}
		</li>
	{/each}
</svelte:element>
