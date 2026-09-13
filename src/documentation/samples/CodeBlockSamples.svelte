<script lang="ts">
  import { Container, Text } from "#src/lib/base/index.ts";
  import { CodeBlock } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";
</script>

<Container id="code-block-samples-container" class="flex flex-col gap-4">
  <Text id="code-block-sample-description">Here is an example of the CodeBlock component.</Text>
  <Container id="code-block-sample-preview" class="flex flex-col gap-4 rounded-lg border p-4">
    <CodeBlock id="code-block-sample-example" language="svelte" code={codeBlockContents.codeBlockExample} />
  </Container>
</Container>
