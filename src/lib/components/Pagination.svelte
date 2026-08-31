<script lang="ts">
  import { Button, Container, Text } from "#src/lib/base/index.ts";

  import type { Snippet } from "svelte";

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

<Container {id} type="nav" aria-label="Pagination" class={["fluid-pagination-container", variant].join(" ")}>
  <Button
    id={`${id}-previous-button`}
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
    class={["fluid-pagination-button", variant].join(" ")}
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
        id={`${id}-page-${item.page}-button`}
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
        class={["fluid-pagination-button", item.page === currentPage ? "fluid-pagination-button-active" : "", variant].join(" ")}
      >
        {item.page}
      </Button>
    {:else}
      {#if ellipsisSnippet}
        {@render ellipsisSnippet()}
      {:else}
        <Text
          id={`${id}-ellipsis-${item.key}`}
          type="span"
          aria-hidden="true"
          class={["fluid-pagination-ellipsis flex min-w-[2.5rem] h-10 items-center justify-center text-neutral-400 select-none", variant].join(" ")}
        >
          &hellip;
        </Text>
      {/if}
    {/if}
  {/each}

  <Button
    id={`${id}-next-button`}
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
    class={["fluid-pagination-button", variant].join(" ")}
  >
    {#if nextSnippet}
      {@render nextSnippet()}
    {:else}
      Next
    {/if}
  </Button>
</Container>
