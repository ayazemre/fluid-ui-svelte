<script lang="ts" generics="T,U,V">
	import type { HTMLAttributes } from 'svelte/elements';
	import { mergeClasses } from '../utilities/mergeClasses.js';
	import type { Snippet } from 'svelte';

	const {
		caption = '',
		tableHeadItems,
		tableRowItems,
		tableFooterItems,
		headTemplate,
		bodyTemplate,
		footerTemplate,
		class: className = '',
		overrideDefaultStyling = false,
		...rest
	}: {
		caption?: string;
		tableHeadItems: Array<T>;
		tableRowItems: Array<Array<U>>;
		tableFooterItems: Array<V>;
		headTemplate: Snippet<[T]>;
		bodyTemplate: Snippet<[U]>;
		footerTemplate: Snippet<[V]>;
		class?: string;
		overrideDefaultStyling?: boolean;
	} & HTMLAttributes<HTMLTableElement> = $props();
</script>

<table class={mergeClasses(className, overrideDefaultStyling ? '' : 'fluid-table')}>
	{#if caption}
		<caption class={mergeClasses(className, overrideDefaultStyling ? '' : 'fluid-table-caption')}>
			{caption}
		</caption>
	{/if}
	<thead class={mergeClasses(className, overrideDefaultStyling ? '' : 'fluid-table-head')}>
		<tr class={mergeClasses(className, overrideDefaultStyling ? '' : 'fluid-table-row')}>
			{#each tableHeadItems as item}
				<th class={mergeClasses(className, overrideDefaultStyling ? '' : 'fluid-table-cell')}
					>{@render headTemplate(item)}
				</th>
			{/each}
		</tr>
	</thead>
	<tbody class={mergeClasses(className, overrideDefaultStyling ? '' : 'fluid-table-body')}>
		{#each tableRowItems as items}
			<tr class={mergeClasses(className, overrideDefaultStyling ? '' : 'fluid-table-row')}>
				{#each items as item}
					<td class={mergeClasses(className, overrideDefaultStyling ? '' : 'fluid-table-cell')}
						>{@render bodyTemplate(item)}</td
					>
				{/each}
			</tr>
		{/each}
	</tbody>
	<tfoot class={mergeClasses(className, overrideDefaultStyling ? '' : 'fluid-table-footer')}>
		<tr>
			{#each tableFooterItems as item}
				<td class={mergeClasses(className, overrideDefaultStyling ? '' : 'fluid-table-cell')}>
					{@render footerTemplate(item)}
				</td>
			{/each}
		</tr>
	</tfoot>
</table>
