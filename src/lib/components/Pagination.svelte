<script lang="ts">
  import type { Snippet } from "svelte";

  import { Button, Container, Text } from "../base/index.ts";
  import { calculatePaginationRange, isValidPageNavigation } from "./pagination.ts";

  let {
    id,
    currentPage = $bindable(1),
    totalPages = 1,
    siblingCount = 1,
    boundaryCount = 1,
    variant = "",
    onPageChange,
    previousSnippet,
    nextSnippet,
    ellipsisSnippet,
  }: {
    id: string;
    currentPage: number;
    totalPages: number;
    siblingCount?: number;
    boundaryCount?: number;
    variant?: string;
    onPageChange?: (page: number) => Promise<void>;
    previousSnippet?: Snippet;
    nextSnippet?: Snippet;
    ellipsisSnippet?: Snippet;
  } = $props();

  const paginationItems = $derived(
    calculatePaginationRange({
      boundaryCount,
      currentPage,
      siblingCount,
      totalPages,
    }),
  );
</script>

<Container id={`fluid-pagination-${id}`} type="nav" aria-label="Pagination" class={["fluid-pagination", variant].join(" ")}>
  <Button
    id={`fluid-pagination-button-previous-${id}`}
    onclick={async () => {
      if (isValidPageNavigation(currentPage - 1, currentPage, totalPages)) {
        currentPage -= 1;
        if (onPageChange) {
          await onPageChange(currentPage);
        }
      }
    }}
    disabled={currentPage <= 1}
    aria-label="Go to previous page"
    class="fluid-pagination-button"
  >
    {#if previousSnippet}
      {@render previousSnippet()}
    {:else}
      Previous
    {/if}
  </Button>

  {#each paginationItems as item (item.key)}
    {#if item.type === "page"}
      <Button
        id={`fluid-pagination-button-page-${item.page}-${id}`}
        onclick={async () => {
          if (isValidPageNavigation(item.page, currentPage, totalPages)) {
            currentPage = item.page;
            if (onPageChange) {
              await onPageChange(item.page);
            }
          }
        }}
        aria-label={`Go to page ${item.page}`}
        aria-current={item.page === currentPage ? "page" : undefined}
        class={["fluid-pagination-button", item.page === currentPage ? "fluid-pagination-button-active" : ""].join(" ")}
      >
        {item.page}
      </Button>
    {:else}
      {#if ellipsisSnippet}
        {@render ellipsisSnippet()}
      {:else}
        <Text id={`fluid-pagination-ellipsis-${item.key}-${id}`} type="span" aria-hidden="true" class="fluid-pagination-ellipsis">&hellip;</Text>
      {/if}
    {/if}
  {/each}

  <Button
    id={`fluid-pagination-button-next-${id}`}
    onclick={async () => {
      if (isValidPageNavigation(currentPage + 1, currentPage, totalPages)) {
        currentPage += 1;
        if (onPageChange) {
          await onPageChange(currentPage);
        }
      }
    }}
    disabled={currentPage >= totalPages}
    aria-label="Go to next page"
    class="fluid-pagination-button"
  >
    {#if nextSnippet}
      {@render nextSnippet()}
    {:else}
      Next
    {/if}
  </Button>
</Container>
