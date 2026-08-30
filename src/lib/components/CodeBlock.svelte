<script lang="ts">
  import { Container, Text } from "#src/lib/base/index.ts";

  const {
    variant = "",
    componentId,
    code = "",
    language = "",
    showLineNumbers = true,
  }: {
    variant?: string;
    componentId?: string;
    code?: string;
    language?: string;
    showLineNumbers?: boolean;
  } = $props();
</script>

<Container id={componentId} class={[variant, "fluid-code-block-container", "flex", "flex-col", "overflow-scroll"].join(" ")}>
  {#each code.split("\n") as line, index}
    <Container class={[variant, "fluid-code-block-row", "flex", "items-start"].join(" ")}>
      {#if showLineNumbers}
        <Container class={[variant, "fluid-code-block-index", "sticky", "left-0", "z-1", "min-w-10", "px-2"].join(" ")}>
          <Text class="select-none">{index}</Text>
        </Container>
      {/if}
      <Container class={[variant, "fluid-code-block-content", "flex", "flex-1", "flex-col"].join(" ")}>
        <Text type="pre">
          <Text type="code" class={["language-" + language].join(" ")}>{line}</Text>
        </Text>
      </Container>
    </Container>
  {/each}
</Container>
