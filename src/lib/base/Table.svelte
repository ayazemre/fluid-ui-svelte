<script lang="ts" generics="T,U,V">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  import { mergeClasses } from "../utilities/common.ts";

  let {
    id,
    domReference = $bindable(null),
    caption = "",
    tableHeadItems,
    tableRowItems,
    tableFooterItems,
    headTemplate,
    bodyTemplate,
    footerTemplate,
    class: className = "",
    captionClass = "",
    headClass = "",
    bodyClass = "",
    rowClass = "",
    cellClass = "",
    footerClass = "",
    ...rest
  }: {
    id: string;
    domReference?: HTMLTableElement | null;
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
  } & Omit<HTMLAttributes<HTMLTableElement>, "id"> = $props();
</script>

<table {id} bind:this={domReference} class={mergeClasses(className, "fluid-table")} {...rest}>
  {#if caption}
    <caption class={mergeClasses(captionClass, "fluid-table-caption")}>
      {caption}
    </caption>
  {/if}
  <thead class={mergeClasses(headClass, "fluid-table-head")}>
    <tr class={mergeClasses(rowClass, "fluid-table-row")}>
      {#each tableHeadItems as item}
        <th class={mergeClasses(cellClass, "fluid-table-cell")}>{@render headTemplate(item)} </th>
      {/each}
    </tr>
  </thead>
  <tbody class={mergeClasses(bodyClass, "fluid-table-body")}>
    {#each tableRowItems as items}
      <tr class={mergeClasses(rowClass, "fluid-table-row")}>
        {#each items as item}
          <td class={mergeClasses(cellClass, "fluid-table-cell")}>{@render bodyTemplate(item)}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
  <tfoot class={mergeClasses(footerClass, "fluid-table-footer")}>
    <tr class={mergeClasses(rowClass, "fluid-table-row")}>
      {#each tableFooterItems as item}
        <td class={mergeClasses(cellClass, "fluid-table-cell")}>
          {@render footerTemplate(item)}
        </td>
      {/each}
    </tr>
  </tfoot>
</table>
