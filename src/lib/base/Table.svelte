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
		captionClass = '',
		headClass = '',
		bodyClass = '',
		rowClass = '',
		cellClass = '',
		footerClass = '',
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
		captionClass?: string;
		headClass?: string;
		bodyClass?: string;
		rowClass?: string;
		cellClass?: string;
		footerClass?: string;
		overrideDefaultStyling?: boolean;
	} & HTMLAttributes<HTMLTableElement> = $props();
</script>

<table
	class={mergeClasses(className, overrideDefaultStyling ? '' : 'fluid-table')}
	{...rest}
>
	{#if caption}
		<caption class={mergeClasses(captionClass, overrideDefaultStyling ? '' : 'fluid-table-caption')}>
			{caption}
		</caption>
	{/if}
	<thead class={mergeClasses(headClass, overrideDefaultStyling ? '' : 'fluid-table-head')}>
		<tr class={mergeClasses(rowClass, overrideDefaultStyling ? '' : 'fluid-table-row')}>
			{#each tableHeadItems as item}
				<th class={mergeClasses(cellClass, overrideDefaultStyling ? '' : 'fluid-table-cell')}
					>{@render headTemplate(item)}
				</th>
			{/each}
		</tr>
	</thead>
	<tbody class={mergeClasses(bodyClass, overrideDefaultStyling ? '' : 'fluid-table-body')}>
		{#each tableRowItems as items}
			<tr class={mergeClasses(rowClass, overrideDefaultStyling ? '' : 'fluid-table-row')}>
				{#each items as item}
					<td class={mergeClasses(cellClass, overrideDefaultStyling ? '' : 'fluid-table-cell')}
						>{@render bodyTemplate(item)}</td
					>
				{/each}
			</tr>
		{/each}
	</tbody>
	<tfoot class={mergeClasses(footerClass, overrideDefaultStyling ? '' : 'fluid-table-footer')}>
		<tr>
			{#each tableFooterItems as item}
				<td class={mergeClasses(cellClass, overrideDefaultStyling ? '' : 'fluid-table-cell')}>
					{@render footerTemplate(item)}
				</td>
			{/each}
		</tr>
	</tfoot>
</table>
