<script lang="ts">
  import { Container, Button } from "#src/lib/base/index.ts";

  let {
    variant = "",
    componentId = crypto.randomUUID(),
    currentPage = $bindable(1),
    totalPages = 1,
    onPageChange,
  }: {
    variant?: string;
    componentId?: string;
    currentPage: number;
    totalPages: number;
    onPageChange?: (page: number) => Promise<void>;
  } = $props();

  async function goToPage(page: number) {
    if (page < 1 || page > totalPages || page === currentPage) return;
    currentPage = page;
    if (onPageChange) {
      await onPageChange(page);
    }
  }
</script>

<Container id={componentId} class={[variant, "fluid-pagination-container"].join(" ")}>
  <Button onclick={async () => goToPage(currentPage - 1)} disabled={currentPage === 1} class="fluid-pagination-button">Previous</Button>

  {#each Array.from({ length: totalPages }, (_, i) => i + 1) as page}
    <Button
      onclick={async () => goToPage(page)}
      class={[variant, "fluid-pagination-button", page === currentPage ? "fluid-pagination-button-active" : ""].join(" ")}
    >
      {page}
    </Button>
  {/each}

  <Button onclick={async () => goToPage(currentPage + 1)} disabled={currentPage === totalPages} class="fluid-pagination-button">Next</Button>
</Container>
