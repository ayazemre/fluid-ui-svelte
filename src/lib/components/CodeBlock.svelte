<script lang="ts">
  import { Container, Text } from "#src/lib/base/index.ts";

  const {
    id,
    variant = "",
    code = "",
    language = "",
    showLineNumbers = true,
  }: {
    id: string;
    variant?: string;
    code?: string;
    language?: string;
    showLineNumbers?: boolean;
  } = $props();
</script>

<Container {id} class={[variant, "fluid-code-block-container", "flex", "flex-col", "overflow-scroll"].join(" ")}>
  {#each code.split("\n") as line, index}
    <Container id={`${id}-row-${index}`} class={[variant, "fluid-code-block-row", "flex", "items-start"].join(" ")}>
      {#if showLineNumbers}
        <Container
          id={`${id}-index-container-${index}`}
          class={[variant, "fluid-code-block-index", "sticky", "left-0", "z-1", "min-w-10", "px-2"].join(" ")}
        >
          <Text id={`${id}-index-${index}`} class="select-none">{index}</Text>
        </Container>
      {/if}
      <Container id={`${id}-content-${index}`} class={[variant, "fluid-code-block-content", "flex", "flex-1", "flex-col"].join(" ")}>
        <Text id={`${id}-pre-${index}`} type="pre">
          <Text id={`${id}-code-${index}`} type="code" class={["language-" + language].join(" ")}>{line}</Text>
        </Text>
      </Container>
    </Container>
  {/each}
</Container>
