<script lang="ts">
  import { Container, Text } from "#src/lib/base/index.ts";
  import { CodeBlock } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";
</script>

<Container class="flex flex-col gap-4">
  <Text>Here is an example of the CodeBlock component.</Text>
  <Container class="flex flex-col gap-4 rounded-lg border p-4">
    <CodeBlock language="svelte" code={codeBlockContents.codeBlockExample} />
  </Container>
</Container>
